/**
 * /accounting/reports — Trial balance, P&L, and balance sheet rendered
 * from POSTED journal lines.
 *
 * Single page; period-MTD and asOf-today defaults so the page is useful
 * the moment a firm has any posted entries. Each section links back to
 * the JSON API for power users / exports.
 */

import Link from "next/link";
import { redirect } from "next/navigation";
import { getUserId } from "@/lib/session";
import { getTrialBalance, getProfitAndLoss, getBalanceSheet } from "@/lib/ledger/balances";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Reports · Marco Reid",
};

function fmt(n: string | number): string {
  return new Intl.NumberFormat("en-NZ", { style: "currency", currency: "NZD" }).format(Number(n));
}

export default async function ReportsPage() {
  const userId = await getUserId();
  if (!userId) redirect("/login");

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const [tb, pnl, bs] = await Promise.all([
    getTrialBalance(userId),
    getProfitAndLoss(userId, startOfMonth, now),
    getBalanceSheet(userId, now),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-gold-600">Accounting</p>
          <h1 className="mt-2 font-serif text-4xl text-navy-700 dark:text-navy-100">Reports</h1>
          <p className="mt-2 text-navy-500 dark:text-navy-300">
            Computed live from posted journal lines.
          </p>
        </div>
        <Link href="/accounting" className="text-sm font-semibold text-navy-500 hover:text-navy-700 dark:text-navy-300">
          ← Overview
        </Link>
      </div>

      <section className="mb-10 rounded-2xl border border-navy-200 bg-white p-6 dark:border-navy-700 dark:bg-navy-900">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-serif text-2xl text-navy-700 dark:text-navy-100">Trial balance</h2>
          <Link
            href="/api/ledger/reports/trial-balance"
            className="text-xs font-semibold text-gold-600 hover:text-gold-700"
          >
            JSON
          </Link>
        </div>
        {tb.rows.length === 0 ? (
          <p className="text-sm text-navy-400">No posted entries yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-100 text-left text-xs uppercase tracking-wider text-navy-400 dark:border-navy-700">
                <th className="py-2">Account</th>
                <th className="py-2 text-right">Debit</th>
                <th className="py-2 text-right">Credit</th>
              </tr>
            </thead>
            <tbody>
              {tb.rows.map((r) => (
                <tr key={r.account.id} className="border-b border-navy-50 dark:border-navy-800">
                  <td className="py-2">
                    <span className="font-mono text-xs text-navy-400">{r.account.code}</span>{" "}
                    <span className="text-navy-700 dark:text-navy-200">{r.account.name}</span>
                  </td>
                  <td className="py-2 text-right font-mono text-navy-700 dark:text-navy-200">
                    {r.debit.greaterThan(0) ? fmt(r.debit.toFixed(2)) : ""}
                  </td>
                  <td className="py-2 text-right font-mono text-navy-700 dark:text-navy-200">
                    {r.credit.greaterThan(0) ? fmt(r.credit.toFixed(2)) : ""}
                  </td>
                </tr>
              ))}
              <tr className="border-t-2 border-navy-300 font-semibold">
                <td className="py-2 text-navy-700 dark:text-navy-100">Total</td>
                <td className="py-2 text-right font-mono text-navy-700 dark:text-navy-100">
                  {fmt(tb.totalDebit.toFixed(2))}
                </td>
                <td className="py-2 text-right font-mono text-navy-700 dark:text-navy-100">
                  {fmt(tb.totalCredit.toFixed(2))}
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </section>

      <section className="mb-10 rounded-2xl border border-navy-200 bg-white p-6 dark:border-navy-700 dark:bg-navy-900">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-serif text-2xl text-navy-700 dark:text-navy-100">
            Profit &amp; Loss · MTD
          </h2>
          <Link
            href="/api/ledger/reports/p-and-l"
            className="text-xs font-semibold text-gold-600 hover:text-gold-700"
          >
            JSON
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-navy-400">Revenue</h3>
            {pnl.revenue.length === 0 ? (
              <p className="text-sm text-navy-400">No revenue posted this period.</p>
            ) : (
              pnl.revenue.map((r) => (
                <div key={r.account.id} className="flex items-center justify-between py-1 text-sm">
                  <span className="text-navy-700 dark:text-navy-200">
                    <span className="font-mono text-xs text-navy-400">{r.account.code}</span> {r.account.name}
                  </span>
                  <span className="font-mono text-navy-700 dark:text-navy-200">{fmt(r.amount.toFixed(2))}</span>
                </div>
              ))
            )}
            <div className="mt-2 flex items-center justify-between border-t border-navy-100 pt-2 text-sm font-semibold dark:border-navy-700">
              <span className="text-navy-700 dark:text-navy-100">Total revenue</span>
              <span className="font-mono text-navy-700 dark:text-navy-100">{fmt(pnl.totalRevenue.toFixed(2))}</span>
            </div>
          </div>
          <div>
            <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-navy-400">Expenses</h3>
            {pnl.expenses.length === 0 ? (
              <p className="text-sm text-navy-400">No expenses posted this period.</p>
            ) : (
              pnl.expenses.map((e) => (
                <div key={e.account.id} className="flex items-center justify-between py-1 text-sm">
                  <span className="text-navy-700 dark:text-navy-200">
                    <span className="font-mono text-xs text-navy-400">{e.account.code}</span> {e.account.name}
                  </span>
                  <span className="font-mono text-navy-700 dark:text-navy-200">{fmt(e.amount.toFixed(2))}</span>
                </div>
              ))
            )}
            <div className="mt-2 flex items-center justify-between border-t border-navy-100 pt-2 text-sm font-semibold dark:border-navy-700">
              <span className="text-navy-700 dark:text-navy-100">Total expenses</span>
              <span className="font-mono text-navy-700 dark:text-navy-100">{fmt(pnl.totalExpense.toFixed(2))}</span>
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between rounded-lg border border-navy-200 bg-navy-50 px-4 py-3 dark:border-navy-700 dark:bg-navy-800">
          <span className="font-serif text-lg text-navy-700 dark:text-navy-100">Net income</span>
          <span className="font-serif text-lg font-semibold text-navy-700 dark:text-navy-100">
            {fmt(pnl.netIncome.toFixed(2))}
          </span>
        </div>
      </section>

      <section className="rounded-2xl border border-navy-200 bg-white p-6 dark:border-navy-700 dark:bg-navy-900">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-serif text-2xl text-navy-700 dark:text-navy-100">Balance sheet</h2>
          <Link
            href="/api/ledger/reports/balance-sheet"
            className="text-xs font-semibold text-gold-600 hover:text-gold-700"
          >
            JSON
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div>
            <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-navy-400">Assets</h3>
            {bs.assets.map((a) => (
              <div key={a.account.id} className="flex items-center justify-between py-1 text-sm">
                <span className="text-navy-700 dark:text-navy-200">{a.account.name}</span>
                <span className="font-mono text-navy-700 dark:text-navy-200">{fmt(a.amount.toFixed(2))}</span>
              </div>
            ))}
            <div className="mt-2 flex items-center justify-between border-t border-navy-100 pt-2 text-sm font-semibold dark:border-navy-700">
              <span>Total</span>
              <span className="font-mono">{fmt(bs.totalAssets.toFixed(2))}</span>
            </div>
          </div>
          <div>
            <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-navy-400">Liabilities</h3>
            {bs.liabilities.map((l) => (
              <div key={l.account.id} className="flex items-center justify-between py-1 text-sm">
                <span className="text-navy-700 dark:text-navy-200">{l.account.name}</span>
                <span className="font-mono text-navy-700 dark:text-navy-200">{fmt(l.amount.toFixed(2))}</span>
              </div>
            ))}
            <div className="mt-2 flex items-center justify-between border-t border-navy-100 pt-2 text-sm font-semibold dark:border-navy-700">
              <span>Total</span>
              <span className="font-mono">{fmt(bs.totalLiabilities.toFixed(2))}</span>
            </div>
          </div>
          <div>
            <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-navy-400">Equity</h3>
            {bs.equity.map((e) => (
              <div key={e.account.id} className="flex items-center justify-between py-1 text-sm">
                <span className="text-navy-700 dark:text-navy-200">{e.account.name}</span>
                <span className="font-mono text-navy-700 dark:text-navy-200">{fmt(e.amount.toFixed(2))}</span>
              </div>
            ))}
            <div className="flex items-center justify-between py-1 text-sm">
              <span className="text-navy-700 dark:text-navy-200">Retained earnings</span>
              <span className="font-mono text-navy-700 dark:text-navy-200">{fmt(bs.retainedEarnings.toFixed(2))}</span>
            </div>
            <div className="mt-2 flex items-center justify-between border-t border-navy-100 pt-2 text-sm font-semibold dark:border-navy-700">
              <span>Total</span>
              <span className="font-mono">{fmt(bs.totalEquity.toFixed(2))}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
