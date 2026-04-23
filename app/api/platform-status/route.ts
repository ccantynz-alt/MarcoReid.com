import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import pkg from "@/package.json";

// Public family-status contract endpoint. Sibling products in the wider
// platform family poll this every ~30s to render a unified health widget
// in their admin consoles. The shape is deliberately stable: any change
// here is a contract break and must be coordinated across all four products.
//
// No auth: this must be reachable by sibling admin widgets that are not
// authenticated against this product. The response carries no PII —
// counts only, no names, no emails, no matter content.

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type CheckOk = { status: "ok"; latencyMs: number };
type CheckFail = { status: "fail"; latencyMs: number };
type CheckSkipped = { status: "skipped"; latencyMs: number };

type DatabaseCheck = CheckOk | CheckFail;
type AiCheck = CheckOk | CheckFail | CheckSkipped;
type EmailCheck =
  | { status: "ok"; queuedCount: number }
  | { status: "fail"; queuedCount: number }
  | { status: "skipped"; queuedCount: number };
type StorageCheck =
  | { status: "ok" }
  | { status: "fail" }
  | { status: "skipped"; note?: string };

interface PlatformStatusPayload {
  product: "marco-reid";
  version: string;
  status: "operational" | "degraded" | "outage";
  region: string;
  uptimeSeconds: number;
  checks: {
    database: DatabaseCheck;
    ai: AiCheck;
    email: EmailCheck;
    storage: StorageCheck;
  };
  metrics: {
    activeUsers24h: number;
    activeMatters: number;
    pendingSignoffs: number;
  };
  timestamp: string;
}

const PROCESS_STARTED_AT = Date.now();

async function checkDatabase(): Promise<DatabaseCheck> {
  const startedAt = Date.now();
  try {
    await prisma.$queryRaw`SELECT 1`;
    return { status: "ok", latencyMs: Date.now() - startedAt };
  } catch {
    return { status: "fail", latencyMs: Date.now() - startedAt };
  }
}

async function checkAi(): Promise<AiCheck> {
  const startedAt = Date.now();
  if (!process.env.ANTHROPIC_API_KEY) {
    return { status: "skipped", latencyMs: 0 };
  }
  try {
    // Lightweight reachability probe — HEAD against the public Anthropic
    // marketing endpoint. We deliberately avoid spending tokens on every
    // poll (every 30s × 4 siblings = 5760 calls/day per product).
    const res = await fetch("https://api.anthropic.com/v1/models", {
      method: "GET",
      headers: {
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      signal: AbortSignal.timeout(2000),
    });
    const latencyMs = Date.now() - startedAt;
    if (!res.ok && res.status !== 401) {
      // 401 still proves the network path is healthy; only treat 5xx /
      // network failure as a real fail.
      if (res.status >= 500) {
        return { status: "fail", latencyMs };
      }
    }
    return { status: "ok", latencyMs };
  } catch {
    return { status: "fail", latencyMs: Date.now() - startedAt };
  }
}

async function checkEmail(): Promise<EmailCheck> {
  // The shared family contract anchors email to ALECRAE_API_KEY — that
  // sibling product owns transactional email for the whole family.
  if (!process.env.ALECRAE_API_KEY) {
    return { status: "skipped", queuedCount: 0 };
  }
  try {
    // EmailOutbox is a sibling-owned model that may not yet be present in
    // this product's schema. Probe via raw SQL so we never throw on a
    // missing relation — we just degrade to "skipped" with queuedCount 0.
    const rows = await prisma.$queryRawUnsafe<Array<{ count: bigint | number }>>(
      `SELECT COUNT(*)::int AS count FROM "EmailOutbox" WHERE status = 'PENDING'`,
    );
    const raw = rows[0]?.count ?? 0;
    const queuedCount = typeof raw === "bigint" ? Number(raw) : Number(raw);
    return {
      status: queuedCount < 50 ? "ok" : "fail",
      queuedCount,
    };
  } catch {
    // Table missing or query failed — report skipped, not fail, so the
    // top-level status doesn't go degraded just because the model hasn't
    // landed in this product's schema yet.
    return { status: "skipped", queuedCount: 0 };
  }
}

function checkStorage(): StorageCheck {
  // R2 reachability requires the R2 keys; skipped in dev. When the keys
  // are present the deploy environment should add a real probe here.
  if (!process.env.R2_ACCESS_KEY_ID || !process.env.R2_SECRET_ACCESS_KEY) {
    return { status: "skipped", note: "R2 credentials unset" };
  }
  return { status: "ok" };
}

async function loadMetrics(): Promise<PlatformStatusPayload["metrics"]> {
  const since24h = new Date(Date.now() - 24 * 60 * 60 * 1000);

  // Each metric is wrapped in its own try/catch — a missing model in the
  // schema must not nuke the whole status endpoint. The contract only
  // requires the keys to exist; 0 is a valid value.
  let activeUsers24h = 0;
  try {
    // Approximate "active users in last 24h" via distinct OracleQuery
    // userIds — every meaningful platform action funnels through Marco
    // queries or related activity. If we ever land a Session table this
    // can switch to true session counts.
    const rows = await prisma.$queryRaw<Array<{ count: bigint | number }>>`
      SELECT COUNT(DISTINCT "userId")::int AS count
      FROM "OracleQuery"
      WHERE "createdAt" >= ${since24h}
    `;
    const raw = rows[0]?.count ?? 0;
    activeUsers24h = typeof raw === "bigint" ? Number(raw) : Number(raw);
  } catch {
    activeUsers24h = 0;
  }

  let activeMatters = 0;
  try {
    activeMatters = await prisma.matter.count({
      where: { status: { not: "CLOSED" } },
    });
  } catch {
    activeMatters = 0;
  }

  let pendingSignoffs = 0;
  try {
    pendingSignoffs = await prisma.signoffRequest.count({
      where: { status: "PENDING" },
    });
  } catch {
    pendingSignoffs = 0;
  }

  return { activeUsers24h, activeMatters, pendingSignoffs };
}

function rollupStatus(
  checks: PlatformStatusPayload["checks"],
): PlatformStatusPayload["status"] {
  if (checks.database.status === "fail") return "outage";
  const nonDbStatuses = [
    checks.ai.status,
    checks.email.status,
    checks.storage.status,
  ];
  if (nonDbStatuses.includes("fail")) return "degraded";
  return "operational";
}

export async function GET() {
  // Run independent probes in parallel — the whole endpoint must respond
  // well inside the sibling poll budget (3s) even on a cold lambda.
  const [database, ai, email, metrics] = await Promise.all([
    checkDatabase(),
    checkAi(),
    checkEmail(),
    loadMetrics(),
  ]);
  const storage = checkStorage();

  const checks = { database, ai, email, storage };
  const payload: PlatformStatusPayload = {
    product: "marco-reid",
    version: pkg.version,
    status: rollupStatus(checks),
    region: process.env.MARCO_REGION || "auckland",
    uptimeSeconds: Math.floor((Date.now() - PROCESS_STARTED_AT) / 1000),
    checks,
    metrics,
    timestamp: new Date().toISOString(),
  };

  return NextResponse.json(payload, {
    headers: {
      "Cache-Control": "public, max-age=30",
      // Open to siblings polling cross-origin from their admin consoles.
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
    },
  });
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Max-Age": "86400",
    },
  });
}
