// Public, unauthenticated streaming endpoint for the /try demo.
//
// Contract:
//   POST /api/try/draft  { prompt: string }
//   200   -> text/plain stream of the draft (token-like chunks)
//   400   -> JSON { error } for validation failures
//   429   -> JSON { error, retryAfterSeconds } when rate-limited
//
// Streaming is plain text, not SSE: the client reads with a ReadableStream
// and appends to the DOM. SSE adds framing we don't need here and makes
// the demo harder to debug.

import { NextResponse } from "next/server";
import {
  streamDemoDraft,
  TRY_DEMO_INPUT_MAX,
} from "@/lib/ai/demo-draft";
import {
  checkAndConsume,
  clientIpFromHeaders,
  TRY_DEMO_COOKIE,
  TRY_DEMO_LIMITS,
} from "@/lib/rate-limit/in-memory";

// Force Node runtime: the Anthropic SDK uses Node streams and the canned
// fallback uses setTimeout. Edge would work for the API call but would
// require refactoring the SDK call path — not worth it for a demo.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface DraftBody {
  prompt?: unknown;
}

export async function POST(request: Request) {
  let body: DraftBody;
  try {
    body = (await request.json()) as DraftBody;
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  const rawPrompt = typeof body.prompt === "string" ? body.prompt : "";
  const prompt = rawPrompt.trim();
  if (!prompt) {
    return NextResponse.json(
      { error: "Describe your situation first — one or two sentences is enough." },
      { status: 400 },
    );
  }
  if (prompt.length > TRY_DEMO_INPUT_MAX) {
    return NextResponse.json(
      {
        error: `Keep it under ${TRY_DEMO_INPUT_MAX} characters for this demo. A real matter on the platform has no limit.`,
      },
      { status: 400 },
    );
  }

  // Rate limit: per IP and per anonymous cookie. Both must pass.
  const ip = clientIpFromHeaders(request.headers);
  const cookieHeader = request.headers.get("cookie") ?? "";
  const cookieId = readAnonCookie(cookieHeader);
  const shouldSetCookie = !cookieId;
  const anonId = cookieId ?? newAnonId();

  const check = checkAndConsume([
    {
      key: `try:ip:${ip}`,
      limit: TRY_DEMO_LIMITS.perIp.limit,
      windowSeconds: TRY_DEMO_LIMITS.perIp.windowSeconds,
    },
    {
      key: `try:anon:${anonId}`,
      limit: TRY_DEMO_LIMITS.perCookie.limit,
      windowSeconds: TRY_DEMO_LIMITS.perCookie.windowSeconds,
    },
  ]);

  if (!check.ok) {
    const minutes = Math.ceil(check.retryAfterSeconds / 60);
    const res = NextResponse.json(
      {
        error: `You've hit the free demo limit. Try again in about ${minutes} minute${minutes === 1 ? "" : "s"}, or post a real matter — a verified professional will take it from $149.`,
        retryAfterSeconds: check.retryAfterSeconds,
      },
      { status: 429 },
    );
    res.headers.set("Retry-After", String(check.retryAfterSeconds));
    if (shouldSetCookie) res.headers.append("Set-Cookie", buildCookie(anonId));
    return res;
  }

  // Stream the draft as plain text. One ReadableStream of Uint8Array chunks.
  const encoder = new TextEncoder();
  const abortController = new AbortController();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for await (const chunk of streamDemoDraft(
          { prompt },
          abortController.signal,
        )) {
          controller.enqueue(encoder.encode(chunk));
        }
      } catch (err) {
        console.error("[try] stream error:", err);
        controller.enqueue(
          encoder.encode(
            "\n\n[An unexpected error interrupted the draft. Please try again.]",
          ),
        );
      } finally {
        controller.close();
      }
    },
    cancel() {
      abortController.abort();
    },
  });

  const headers = new Headers({
    "Content-Type": "text/plain; charset=utf-8",
    "Cache-Control": "no-store, no-transform",
    "X-Accel-Buffering": "no",
  });
  if (shouldSetCookie) headers.append("Set-Cookie", buildCookie(anonId));
  return new Response(stream, { status: 200, headers });
}

function readAnonCookie(cookieHeader: string): string | null {
  if (!cookieHeader) return null;
  for (const part of cookieHeader.split(";")) {
    const [name, ...rest] = part.trim().split("=");
    if (name === TRY_DEMO_COOKIE) {
      const value = rest.join("=").trim();
      if (/^[a-zA-Z0-9_-]{8,64}$/.test(value)) return value;
    }
  }
  return null;
}

function newAnonId(): string {
  // 128-bit id, base64url. Web Crypto available in Node 20+.
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return Buffer.from(bytes)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function buildCookie(value: string): string {
  // One-year cookie. HttpOnly so JS can't read it, SameSite=Lax so normal
  // link-drop traffic works. Secure in production only (dev is http).
  const maxAge = 60 * 60 * 24 * 365;
  const parts = [
    `${TRY_DEMO_COOKIE}=${value}`,
    "Path=/",
    `Max-Age=${maxAge}`,
    "HttpOnly",
    "SameSite=Lax",
  ];
  if (process.env.NODE_ENV === "production") parts.push("Secure");
  return parts.join("; ");
}
