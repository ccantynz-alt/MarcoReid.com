import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-guard";

// AI cost view. The current OracleQuery model does not yet record token
// counts on the row — the column is referenced by spec but absent from
// the schema this agent can touch. We probe via raw SQL: if a tokens
// column exists, we use it; otherwise we estimate at a flat per-query
// rate so the page is informative even before the column lands.

export const dynamic = "force-dynamic";

const ANTHROPIC_PER_1M_INPUT_USD = 3;
const ANTHROPIC_PER_1M_OUTPUT_USD = 15;
// Conservative split for an estimate: assume 60% input, 40% output tokens.
const BLENDED_PER_1M_USD =
  ANTHROPIC_PER_1M_INPUT_USD * 0.6 + ANTHROPIC_PER_1M_OUTPUT_USD * 0.4;

const ESTIMATED_TOKENS_PER_QUERY_FALLBACK = 2_000;

export async function GET() {
  const guard = await requireAdmin();
  if (guard) return guard;

  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  let queryCountThisMonth = 0;
  let totalTokens = 0;
  let activeUsersThisMonth = 0;
  let usingTokenColumn = false;

  try {
    queryCountThisMonth = await prisma.oracleQuery.count({
      where: { createdAt: { gte: monthStart } },
    });
  } catch {
    queryCountThisMonth = 0;
  }

  try {
    type R = { total: bigint | number | null };
    const rows = await prisma.$queryRawUnsafe<R[]>(
      `SELECT COALESCE(SUM("tokensUsed"), 0)::bigint AS total
       FROM "OracleQuery"
       WHERE "createdAt" >= $1`,
      monthStart,
    );
    const t = rows[0]?.total ?? 0;
    totalTokens = typeof t === "bigint" ? Number(t) : Number(t);
    usingTokenColumn = true;
  } catch {
    totalTokens = queryCountThisMonth * ESTIMATED_TOKENS_PER_QUERY_FALLBACK;
    usingTokenColumn = false;
  }

  try {
    const rows = await prisma.$queryRaw<Array<{ count: bigint | number }>>`
      SELECT COUNT(DISTINCT "userId")::int AS count
      FROM "OracleQuery"
      WHERE "createdAt" >= ${monthStart}
    `;
    const c = rows[0]?.count ?? 0;
    activeUsersThisMonth = typeof c === "bigint" ? Number(c) : Number(c);
  } catch {
    activeUsersThisMonth = 0;
  }

  const estimatedSpendUsd = (totalTokens / 1_000_000) * BLENDED_PER_1M_USD;
  const avgPerUserUsd =
    activeUsersThisMonth > 0 ? estimatedSpendUsd / activeUsersThisMonth : 0;

  return NextResponse.json({
    monthStartIso: monthStart.toISOString(),
    queryCountThisMonth,
    totalTokens,
    estimatedSpendUsd,
    activeUsersThisMonth,
    avgPerUserUsd,
    note: usingTokenColumn
      ? null
      : "tokensUsed column is not yet present on OracleQuery — figures estimated at 2,000 tokens/query.",
  });
}
