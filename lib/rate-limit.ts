// Token-bucket style rate limiter.
//
// This implementation is in-memory and therefore per-instance. In a
// multi-instance deployment (serverless, multiple regions, etc.)
// you should swap the `bucketStore` for a Redis/Upstash KV backing.
// The `RateLimitStore` interface below makes that substitution trivial.

interface Bucket {
  tokens: number;
  updatedAt: number;
}

export interface RateLimitStore {
  get(key: string): Promise<Bucket | null>;
  set(key: string, bucket: Bucket): Promise<void>;
}

// In-memory store — fine for a single-instance dev environment or
// preview builds. Not appropriate for horizontally scaled production.
class MemoryStore implements RateLimitStore {
  private store = new Map<string, Bucket>();

  async get(key: string) {
    return this.store.get(key) ?? null;
  }

  async set(key: string, bucket: Bucket) {
    this.store.set(key, bucket);
    // Opportunistic cleanup of very old entries.
    if (this.store.size > 10_000) {
      const cutoff = Date.now() - 24 * 60 * 60 * 1000;
      for (const [k, b] of this.store) {
        if (b.updatedAt < cutoff) this.store.delete(k);
      }
    }
  }
}

const defaultStore: RateLimitStore = new MemoryStore();

export interface RateLimitOptions {
  /** Unique key identifying the caller (usually `userId:endpoint`). */
  key: string;
  /** Maximum number of tokens in the bucket. */
  limit: number;
  /** Seconds over which the bucket fully refills. */
  windowSeconds: number;
  /** Optional custom store. Defaults to in-memory. */
  store?: RateLimitStore;
}

export interface RateLimitResult {
  ok: boolean;
  remaining: number;
  resetIn: number; // seconds until next full refill
}

export async function rateLimit(
  opts: RateLimitOptions,
): Promise<RateLimitResult> {
  const store = opts.store ?? defaultStore;
  const now = Date.now();
  const refillPerSecond = opts.limit / opts.windowSeconds;

  const existing = await store.get(opts.key);
  let tokens: number;
  if (!existing) {
    tokens = opts.limit;
  } else {
    const elapsedSeconds = Math.max(0, (now - existing.updatedAt) / 1000);
    tokens = Math.min(
      opts.limit,
      existing.tokens + elapsedSeconds * refillPerSecond,
    );
  }

  if (tokens < 1) {
    const secondsUntilOneToken = (1 - tokens) / refillPerSecond;
    await store.set(opts.key, { tokens, updatedAt: now });
    return {
      ok: false,
      remaining: 0,
      resetIn: Math.ceil(secondsUntilOneToken),
    };
  }

  tokens -= 1;
  await store.set(opts.key, { tokens, updatedAt: now });
  return {
    ok: true,
    remaining: Math.floor(tokens),
    resetIn: Math.ceil((opts.limit - tokens) / refillPerSecond),
  };
}

// Pre-configured limits for the main AI endpoints. Tuned conservatively
// for initial launch. Revisit once usage data exists.
export const LIMITS = {
  // Marco research queries — expensive, high-value.
  marcoQuery: { limit: 60, windowSeconds: 60 * 60 }, // 60 queries / hour
  // Voice transcription — per-user, bursty workloads allowed.
  voiceTranscribe: { limit: 120, windowSeconds: 60 * 60 }, // 120 / hour
  // Auth endpoints — lower limit to deter brute force.
  authForgotPassword: { limit: 5, windowSeconds: 15 * 60 }, // 5 / 15 min
  authRegister: { limit: 10, windowSeconds: 60 * 60 }, // 10 / hour per IP
} as const;

// Helper: build a response when the limit is exceeded. Sets retry-after header.
export function rateLimitResponse(result: RateLimitResult) {
  return new Response(
    JSON.stringify({
      error: "Rate limit exceeded. Please try again shortly.",
      retryAfter: result.resetIn,
    }),
    {
      status: 429,
      headers: {
        "Content-Type": "application/json",
        "Retry-After": String(result.resetIn),
        "X-RateLimit-Remaining": String(result.remaining),
      },
    },
  );
}
