/**
 * GET /api/ledger/reports/p-and-l?from=YYYY-MM-DD&to=YYYY-MM-DD
 *
 * Defaults to month-to-date if no period is supplied.
 */

import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "@/lib/session";
import { getProfitAndLoss } from "@/lib/ledger/balances";

export async function GET(req: NextRequest) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const fromParam = req.nextUrl.searchParams.get("from");
  const toParam = req.nextUrl.searchParams.get("to");

  const now = new Date();
  const start = fromParam ? new Date(fromParam) : new Date(now.getFullYear(), now.getMonth(), 1);
  const end = toParam ? new Date(toParam) : now;

  const pnl = await getProfitAndLoss(userId, start, end);

  return NextResponse.json({
    revenue: pnl.revenue.map((r) => ({
      accountId: r.account.id,
      code: r.account.code,
      name: r.account.name,
      amount: r.amount.toFixed(2),
    })),
    expenses: pnl.expenses.map((e) => ({
      accountId: e.account.id,
      code: e.account.code,
      name: e.account.name,
      amount: e.amount.toFixed(2),
    })),
    totalRevenue: pnl.totalRevenue.toFixed(2),
    totalExpense: pnl.totalExpense.toFixed(2),
    netIncome: pnl.netIncome.toFixed(2),
    periodStart: pnl.periodStart.toISOString(),
    periodEnd: pnl.periodEnd.toISOString(),
  });
}
