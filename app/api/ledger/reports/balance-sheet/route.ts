/**
 * GET /api/ledger/reports/balance-sheet?asOf=YYYY-MM-DD
 *
 * Defaults to today if no `asOf` is supplied.
 */

import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "@/lib/session";
import { getBalanceSheet } from "@/lib/ledger/balances";

export async function GET(req: NextRequest) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const asOfParam = req.nextUrl.searchParams.get("asOf");
  const asOf = asOfParam ? new Date(asOfParam) : new Date();

  const bs = await getBalanceSheet(userId, asOf);
  return NextResponse.json({
    assets: bs.assets.map((a) => ({
      accountId: a.account.id,
      code: a.account.code,
      name: a.account.name,
      amount: a.amount.toFixed(2),
    })),
    liabilities: bs.liabilities.map((l) => ({
      accountId: l.account.id,
      code: l.account.code,
      name: l.account.name,
      amount: l.amount.toFixed(2),
    })),
    equity: bs.equity.map((e) => ({
      accountId: e.account.id,
      code: e.account.code,
      name: e.account.name,
      amount: e.amount.toFixed(2),
    })),
    totalAssets: bs.totalAssets.toFixed(2),
    totalLiabilities: bs.totalLiabilities.toFixed(2),
    totalEquity: bs.totalEquity.toFixed(2),
    retainedEarnings: bs.retainedEarnings.toFixed(2),
    asOf: bs.asOf.toISOString(),
  });
}
