// Transactional email adapter for Marco Reid.
//
// AlecRae (Crontech family) is the sole outbound provider. In dev, when
// ALECRAE_API_KEY is unset, emails are logged to the console so flows stay
// testable without a live tenant. In any mode, send failures are enqueued
// to the EmailOutbox table and retried by drainEmailOutbox().

import { randomUUID } from "node:crypto";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
  text?: string;
  from?: string;
  messageId?: string;
  headers?: Record<string, string>;
}

interface EmailResult {
  ok: boolean;
  id?: string;
  error?: string;
  queued?: boolean; // true if the send failed and we parked it in EmailOutbox
}

const DEFAULT_FROM =
  process.env.ALECRAE_FROM_ADDRESS ||
  "Marco Reid <noreply@mail.marcoreid.com>";
const BASE_URL =
  process.env.ALECRAE_BASE_URL || "https://api.alecrae.com/v1";

// Retry policy for the AlecRae call itself. Separate from the outbox drain.
const MAX_ATTEMPTS = 3;
const BASE_BACKOFF_MS = 500;

function jitteredBackoff(attempt: number): number {
  const base = BASE_BACKOFF_MS * 2 ** (attempt - 1);
  return base + Math.floor(Math.random() * base);
}

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

interface AlecRaePayload {
  from: string;
  to: string;
  subject: string;
  html: string;
  text?: string;
  message_id: string;
  headers?: Record<string, string>;
}

async function postToAlecRae(
  apiKey: string,
  payload: AlecRaePayload
): Promise<{ ok: boolean; id?: string; error?: string }> {
  try {
    const res = await fetch(`${BASE_URL}/send`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      return { ok: false, error: `AlecRae ${res.status}: ${body}` };
    }
    const data = (await res.json().catch(() => ({}))) as { id?: string };
    return { ok: true, id: data.id ?? payload.message_id };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { ok: false, error: message };
  }
}

export async function sendEmail(params: SendEmailParams): Promise<EmailResult> {
  const apiKey = process.env.ALECRAE_API_KEY;
  const from = params.from ?? DEFAULT_FROM;
  const messageId = params.messageId ?? randomUUID();

  // Dev / unconfigured mode: log to console so flows remain testable.
  if (!apiKey) {
    // eslint-disable-next-line no-console
    console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    // eslint-disable-next-line no-console
    console.log("📧 Email (dev mode — ALECRAE_API_KEY not set)");
    // eslint-disable-next-line no-console
    console.log(`Message-ID: ${messageId}`);
    // eslint-disable-next-line no-console
    console.log(`To:      ${params.to}`);
    // eslint-disable-next-line no-console
    console.log(`From:    ${from}`);
    // eslint-disable-next-line no-console
    console.log(`Subject: ${params.subject}`);
    // eslint-disable-next-line no-console
    console.log("---");
    // eslint-disable-next-line no-console
    console.log(params.text || params.html);
    // eslint-disable-next-line no-console
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
    return { ok: true, id: `dev-${messageId}` };
  }

  const payload: AlecRaePayload = {
    from,
    to: params.to,
    subject: params.subject,
    html: params.html,
    text: params.text,
    message_id: messageId,
    headers: params.headers,
  };

  // Three attempts with jittered exponential backoff (500ms base).
  let lastError: string | undefined;
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    const res = await postToAlecRae(apiKey, payload);
    if (res.ok) {
      return { ok: true, id: res.id };
    }
    lastError = res.error;
    if (attempt < MAX_ATTEMPTS) {
      await sleep(jitteredBackoff(attempt));
    }
  }

  // Persistent failure — park it in the outbox for a later drain pass.
  try {
    await prisma.emailOutbox.create({
      data: {
        to: params.to,
        from,
        subject: params.subject,
        html: params.html,
        messageId,
        headers: (params.headers ?? {}) as Prisma.InputJsonValue,
        attemptCount: MAX_ATTEMPTS,
        lastAttemptAt: new Date(),
        status: "PENDING",
        errorMessage: lastError ?? null,
      },
    });
  } catch (err) {
    // If even the outbox insert fails, we surface the original error.
    // This is almost always a DB-outage case — the caller decides what to do.
    const message = err instanceof Error ? err.message : String(err);
    return {
      ok: false,
      error: `AlecRae failed (${lastError ?? "unknown"}); outbox enqueue failed: ${message}`,
    };
  }

  return { ok: false, error: lastError, queued: true };
}

// ----------------------------------------------------------------
// Outbox drain — called by a later cron trigger. Export only.
// ----------------------------------------------------------------

const DEAD_LETTER_AFTER_MS = 24 * 60 * 60 * 1000; // 24h

export interface DrainResult {
  scanned: number;
  sent: number;
  deadLettered: number;
  retried: number;
}

/**
 * Iterate EmailOutbox rows in PENDING status. For each, try to send via
 * AlecRae again. On success mark SENT. On failure increment attemptCount
 * and, if the row is older than 24h, move it to DEAD_LETTER.
 *
 * This function does not schedule itself — a separate cron trigger (wired
 * in a later stream) is the entry point.
 */
export async function drainEmailOutbox(): Promise<DrainResult> {
  const apiKey = process.env.ALECRAE_API_KEY;
  // Without a configured tenant there is nothing we can do.
  if (!apiKey) return { scanned: 0, sent: 0, deadLettered: 0, retried: 0 };

  const pending = await prisma.emailOutbox.findMany({
    where: { status: "PENDING" },
    orderBy: { createdAt: "asc" },
    take: 100,
  });

  let sent = 0;
  let deadLettered = 0;
  let retried = 0;
  const now = Date.now();

  for (const row of pending) {
    const payload: AlecRaePayload = {
      from: row.from,
      to: row.to,
      subject: row.subject,
      html: row.html,
      message_id: row.messageId,
      headers:
        row.headers && typeof row.headers === "object"
          ? (row.headers as Record<string, string>)
          : undefined,
    };

    const res = await postToAlecRae(apiKey, payload);
    if (res.ok) {
      await prisma.emailOutbox.update({
        where: { id: row.id },
        data: {
          status: "SENT",
          lastAttemptAt: new Date(),
          attemptCount: row.attemptCount + 1,
          errorMessage: null,
        },
      });
      sent++;
      continue;
    }

    const ageMs = now - row.createdAt.getTime();
    if (ageMs >= DEAD_LETTER_AFTER_MS) {
      await prisma.emailOutbox.update({
        where: { id: row.id },
        data: {
          status: "DEAD_LETTER",
          lastAttemptAt: new Date(),
          attemptCount: row.attemptCount + 1,
          errorMessage: res.error ?? "exceeded 24h retry window",
        },
      });
      deadLettered++;
    } else {
      await prisma.emailOutbox.update({
        where: { id: row.id },
        data: {
          lastAttemptAt: new Date(),
          attemptCount: row.attemptCount + 1,
          errorMessage: res.error ?? null,
        },
      });
      retried++;
    }
  }

  return { scanned: pending.length, sent, deadLettered, retried };
}

// ----------------------------------------------------------------
// Shared branded email layout (unchanged).
// ----------------------------------------------------------------

export function emailLayout(opts: {
  preheader: string;
  heading: string;
  body: string;
  cta?: { href: string; label: string };
  footer?: string;
}): { html: string; text: string } {
  const { preheader, heading, body, cta, footer } = opts;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${heading}</title>
</head>
<body style="margin:0;padding:0;background:#f5f7fa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#2d3748;">
  <div style="display:none;max-height:0;overflow:hidden;">${preheader}</div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f5f7fa;padding:48px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="560" cellspacing="0" cellpadding="0" style="background:#ffffff;border-radius:16px;box-shadow:0 1px 2px rgba(0,0,0,0.04);overflow:hidden;">
          <tr>
            <td style="padding:40px 40px 24px;">
              <p style="margin:0;font-family:Georgia,serif;font-size:24px;color:#1a2545;letter-spacing:-0.5px;">Marco Reid</p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 40px 8px;">
              <h1 style="margin:0;font-family:Georgia,serif;font-size:28px;line-height:1.25;color:#1a2545;font-weight:normal;">${heading}</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 40px 32px;font-size:16px;line-height:1.6;color:#4a5568;">
              ${body}
            </td>
          </tr>
          ${cta
            ? `<tr><td style="padding:0 40px 40px;">
                 <a href="${cta.href}" style="display:inline-block;padding:14px 28px;background:#1a2545;color:#ffffff;text-decoration:none;border-radius:10px;font-weight:600;font-size:15px;">${cta.label}</a>
               </td></tr>`
            : ""}
          <tr>
            <td style="padding:24px 40px 40px;border-top:1px solid #edf1f7;font-size:13px;color:#9aa4b8;">
              ${footer || "Reid &amp; Associates Ltd · Auckland, New Zealand"}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const text = [
    heading,
    "",
    body.replace(/<[^>]+>/g, ""),
    cta ? `\n${cta.label}: ${cta.href}\n` : "",
    footer || "Reid & Associates Ltd, Auckland, New Zealand",
  ].join("\n");

  return { html, text };
}
