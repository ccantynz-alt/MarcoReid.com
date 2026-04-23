import { NextRequest, NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "node:crypto";

export const runtime = "nodejs";

// Receives AlecRae (Crontech-family transactional email) delivery webhooks.
// Expected event types: delivered, bounced, complained, opened, clicked.
// Signature is HMAC-SHA256 of the raw request body using
// ALECRAE_WEBHOOK_SECRET. The header may include an optional "sha256="
// prefix — we accept either form.

function verifySignature(
  rawBody: string,
  signatureHeader: string | null,
  secret: string
): boolean {
  if (!signatureHeader) return false;

  const provided = signatureHeader.startsWith("sha256=")
    ? signatureHeader.slice("sha256=".length)
    : signatureHeader;

  const expected = createHmac("sha256", secret).update(rawBody).digest("hex");

  // Both strings must be the same length before timingSafeEqual, or the
  // comparison itself throws.
  if (provided.length !== expected.length) return false;

  try {
    return timingSafeEqual(
      Buffer.from(provided, "hex"),
      Buffer.from(expected, "hex")
    );
  } catch {
    return false;
  }
}

interface AlecRaeEvent {
  event?: string;
  message_id?: string;
  to?: string;
  occurred_at?: string;
  [key: string]: unknown;
}

export async function POST(req: NextRequest) {
  const secret = process.env.ALECRAE_WEBHOOK_SECRET;
  if (!secret) {
    // Don't leak config state to callers — just 401 every request.
    return NextResponse.json(
      { error: "Webhook not configured" },
      { status: 401 }
    );
  }

  const rawBody = await req.text();
  const signature = req.headers.get("x-alecrae-signature");

  if (!verifySignature(rawBody, signature, secret)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let event: AlecRaeEvent;
  try {
    event = JSON.parse(rawBody) as AlecRaeEvent;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Structured log — a later stream will hook this into the email audit
  // trail (delivered/bounced/complained counters per message_id). For now
  // we keep it observable via stdout.
  // eslint-disable-next-line no-console
  console.info("[alecrae.webhook]", {
    event: event.event,
    messageId: event.message_id,
    to: event.to,
    occurredAt: event.occurred_at,
  });

  return NextResponse.json({ ok: true });
}
