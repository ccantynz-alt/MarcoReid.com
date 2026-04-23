/**
 * GET /api/ledger/reports/trial-balance?asOf=YYYY-MM-DD
 */

import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "@/lib/session";
import { getTrialBalance } from "@/lib/ledger/balances";

export async function GET(req: NextRequest) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const asOfParam = req.nextUrl.searchParams.get("asOf");
  const asOf = asOfParam ? new Date(asOfParam) : undefined;

  const tb = await getTrialBalance(userId, asOf);
  return NextResponse.json({
    rows: tb.rows.map((r) => ({
      accountId: r.account.id,
      code: r.account.code,
      name: r.account.name,
      type: r.account.type,
      debit: r.debit.toFixed(2),
      credit: r.credit.toFixed(2),
    })),
    totalDebit: tb.totalDebit.toFixed(2),
    totalCredit: tb.totalCredit.toFixed(2),
    asOf: asOf?.toISOString() ?? null,
  });
}
