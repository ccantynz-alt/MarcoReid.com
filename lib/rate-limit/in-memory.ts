// Fixed-window, in-memory rate limiter for unauthenticated public demos.
//
// This is intentionally a different shape to the token-bucket limiter in
// `lib/rate-limit.ts` (which powers authenticated per-user flows). The
// public demo at `/try` needs:
//   - per-IP and per-cookie ceilings in the same call
//   - hourly fixed windows with a friendly reset time for the UI
//   - low memory footprint with LRU-style eviction
//
// As with the token-bucket limiter, this is per-instance memory only.
// Swap the underlying Map for Redis/Upstash if we horizontally scale.
//
// SECURITY NOTE: the cookie-based limit is a soft UX nudge. It is trivially
// bypassed by clearing cookies. The real ceiling is the IP limit. Both are
// checked; exceeding either returns 429.

interface WindowEntry {
  /** Number of successful consumptions in the current window. */
  count: number;
  /** Unix ms when the current window ends. */
  resetAt: number;
  /** Unix ms when this entry was last touched (for LRU eviction). */
  touchedAt: number;
}

const DEFAULT_MAX_KEYS = 5_000;

class LruWindowStore {
  private readonly store = new Map<string, WindowEntry>();
  private readonly maxKeys: number;

  constructor(maxKeys = DEFAULT_MAX_KEYS) {
    this.maxKeys = maxKeys;
  }

  get(key: string): WindowEntry | null {
    const entry = this.store.get(key);
    if (!entry) return null;
    // Touch: move to end of Map insertion order for LRU semantics.
    this.store.delete(key);
    entry.touchedAt = Date.now();
    this.store.set(key, entry);
    return entry;
  }

  set(key: string, entry: WindowEntry) {
    if (this.store.has(key)) this.store.delete(key);
    this.store.set(key, entry);
    if (this.store.size > this.maxKeys) {
      // Evict oldest (first inserted) entry.
      const oldest = this.store.keys().next().value;
      if (oldest !== undefined) this.store.delete(oldest);
    }
  }
}

const windowStore = new LruWindowStore();

export interface WindowLimitCheck {
  key: string;
  /** Max consumptions allowed within the window. */
  limit: number;
  /** Window length in seconds. */
  windowSeconds: number;
}

export interface WindowLimitResult {
  ok: boolean;
  /** Which key (if any) was over the limit. Useful for logs and error copy. */
  blockedKey?: string;
  /** Seconds until the blocking window resets. */
  retryAfterSeconds: number;
  /** Remaining across all checks (min). */
  remaining: number;
}

/**
 * Check and consume across multiple composite limits. ALL limits must pass
 * for the request to be allowed. If any check is over the limit, the caller
 * is blocked and NO counts are incremented (so the rejection doesn't waste
 * a good IP's budget on a spammy cookie, or vice versa).
 */
export function checkAndConsume(
  checks: WindowLimitCheck[],
): WindowLimitResult {
  const now = Date.now();

  // First pass: peek at every bucket without mutating.
  let blocked: { key: string; retryAfter: number } | null = null;
  let minRemaining = Number.POSITIVE_INFINITY;

  for (const check of checks) {
    const entry = windowStore.get(check.key);
    const windowMs = check.windowSeconds * 1_000;
    const active =
      entry && entry.resetAt > now
        ? entry
        : { count: 0, resetAt: now + windowMs, touchedAt: now };

    if (active.count >= check.limit) {
      const retryAfter = Math.max(1, Math.ceil((active.resetAt - now) / 1_000));
      if (!blocked || retryAfter > blocked.retryAfter) {
        blocked = { key: check.key, retryAfter };
      }
    }
    const remaining = Math.max(0, check.limit - active.count);
    if (remaining < minRemaining) minRemaining = remaining;
  }

  if (blocked) {
    return {
      ok: false,
      blockedKey: blocked.key,
      retryAfterSeconds: blocked.retryAfter,
      remaining: 0,
    };
  }

  // Second pass: consume on every bucket.
  for (const check of checks) {
    const existing = windowStore.get(check.key);
    const windowMs = check.windowSeconds * 1_000;
    if (!existing || existing.resetAt <= now) {
      windowStore.set(check.key, {
        count: 1,
        resetAt: now + windowMs,
        touchedAt: now,
      });
    } else {
      windowStore.set(check.key, {
        count: existing.count + 1,
        resetAt: existing.resetAt,
        touchedAt: now,
      });
    }
  }

  return {
    ok: true,
    retryAfterSeconds: 0,
    remaining:
      minRemaining === Number.POSITIVE_INFINITY ? 0 : Math.max(0, minRemaining - 1),
  };
}

/**
 * Best-effort client identifier. Trusts the first entry in `x-forwarded-for`
 * (Vercel/most reverse proxies set this). Falls back to a stable hash of
 * a handful of request headers when the header is missing — not perfect,
 * but good enough to stop a single curl loop without a VPN.
 */
export function clientIpFromHeaders(headers: Headers): string {
  const xff = headers.get("x-forwarded-for");
  if (xff) {
    const first = xff.split(",")[0]?.trim();
    if (first) return first;
  }
  const realIp = headers.get("x-real-ip");
  if (realIp) return realIp.trim();

  // Fallback: cheap deterministic hash of identifying headers. Only used
  // when no IP header is present (e.g. local dev, exotic proxy setups).
  const seed = [
    headers.get("user-agent") ?? "",
    headers.get("accept-language") ?? "",
    headers.get("sec-ch-ua") ?? "",
    headers.get("sec-ch-ua-platform") ?? "",
  ].join("|");
  return `hdr:${fnv1a(seed)}`;
}

function fnv1a(input: string): string {
  let hash = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = (hash + ((hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24))) >>> 0;
  }
  return hash.toString(16);
}

export const TRY_DEMO_LIMITS = {
  perIp: { limit: 3, windowSeconds: 60 * 60 }, // 3/hr per IP
  perCookie: { limit: 6, windowSeconds: 60 * 60 }, // 6/hr per anon cookie
} as const;

export const TRY_DEMO_COOKIE = "mr_try_anon";
