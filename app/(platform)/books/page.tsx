/**
 * /books — General ledger overview.
 *
 * Pulls a small slice of each report directly from Prisma so the page
 * is server-rendered and free of fetch round-trips.
 */

import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";
import { BankTransactionStatus } from "@prisma/client";
import { getTrialBalance, getProfitAndLoss } from "@/lib/ledger/balances";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Accounting · Marco Reid",
  description: "General ledger, bank feeds, and reports.",
};

function fmt(amount: string): string {
  const n = Number(amount);
  return new Intl.NumberFormat("en-NZ", { style: "currency", currency: "NZD" }).format(n);
}

export default async function AccountingOverviewPage() {
  const userId = await getUserId();
  if (!userId) redirect("/login");

  const accountCount = await prisma.chartOfAccounts.count({ where: { firmId: userId } });

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const [tb, pnl, uncategorisedCount, connectionCount] = await Promise.all([
    getTrialBalance(userId),
    getProfitAndLoss(userId, startOfMonth, now),
    prisma.bankTransaction.count({
      where: { status: BankTransactionStatus.UNCATEGORISED, bankAccount: { firmId: userId } },
    }),
    prisma.bankConnection.count({ where: { firmId: userId } }),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-10">
        <p className="text-xs font-bold uppercase tracking-wider text-gold-600">Accounting</p>
        <h1 className="mt-2 font-serif text-4xl text-navy-700 dark:text-navy-100">General ledger</h1>
        <p className="mt-2 max-w-2xl text-navy-500 dark:text-navy-300">
          Marco Reid runs its own double-entry general ledger. Bank data arrives direct from neutral open-banking infrastructure (Akahu in NZ, Basiq in AU, Plaid in US, TrueLayer in UK), is suggested against your chart of accounts, and posts on your confirmation. A qualified accountant signs off on every lodgement.
        </p>
      </div>

      {accountCount === 0 && (
        <div className="mb-8 rounded-2xl border border-gold-300 bg-gold-50 p-6 dark:border-gold-700 dark:bg-gold-900/20">
          <p className="text-sm font-semibold text-gold-800 dark:text-gold-200">
            No chart of accounts yet.
          </p>
          <p className="mt-1 text-sm text-gold-700 dark:text-gold-300">
            Seed a starter chart of accounts from the COA page to get started.
          </p>
          <Link
            href="/books/coa"
            className="mt-3 inline-flex rounded-lg bg-gold-500 px-4 py-2 text-sm font-semibold text-white hover:bg-gold-600"
          >
            Set up chart of accounts
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Link
          href="/books/coa"
          className="rounded-2xl border border-navy-200 bg-white p-6 transition-shadow hover:shadow-md dark:border-navy-700 dark:bg-navy-900"
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">Accounts</p>
          <p className="mt-2 font-serif text-3xl text-navy-700 dark:text-navy-100">{accountCount}</p>
          <p className="mt-1 text-sm text-navy-500 dark:text-navy-300">Chart of accounts</p>
        </Link>
        <Link
          href="/books/transactions"
          className="rounded-2xl border border-navy-200 bg-white p-6 transition-shadow hover:shadow-md dark:border-navy-700 dark:bg-navy-900"
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">To categorise</p>
          <p className="mt-2 font-serif text-3xl text-navy-700 dark:text-navy-100">{uncategorisedCount}</p>
          <p className="mt-1 text-sm text-navy-500 dark:text-navy-300">Uncategorised transactions</p>
        </Link>
        <Link
          href="/books/banks"
          className="rounded-2xl border border-navy-200 bg-white p-6 transition-shadow hover:shadow-md dark:border-navy-700 dark:bg-navy-900"
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">Connections</p>
          <p className="mt-2 font-serif text-3xl text-navy-700 dark:text-navy-100">{connectionCount}</p>
          <p className="mt-1 text-sm text-navy-500 dark:text-navy-300">Bank feeds</p>
        </Link>
        <Link
          href="/books/reports"
          className="rounded-2xl border border-navy-200 bg-white p-6 transition-shadow hover:shadow-md dark:border-navy-700 dark:bg-navy-900"
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">Net income</p>
          <p className="mt-2 font-serif text-3xl text-navy-700 dark:text-navy-100">{fmt(pnl.netIncome.toFixed(2))}</p>
          <p className="mt-1 text-sm text-navy-500 dark:text-navy-300">Month to date</p>
        </Link>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-navy-200 bg-white p-6 dark:border-navy-700 dark:bg-navy-900">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-serif text-xl text-navy-700 dark:text-navy-100">Trial balance preview</h2>
            <Link href="/books/reports" className="text-xs font-semibold text-gold-600 hover:text-gold-700">
              Full report →
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
                {tb.rows.slice(0, 6).map((r) => (
                  <tr key={r.account.id} className="border-b border-navy-50 dark:border-navy-800">
                    <td className="py-2 text-navy-700 dark:text-navy-200">
                      <span className="font-mono text-xs text-navy-400">{r.account.code}</span>{" "}
                      {r.account.name}
                    </td>
                    <td className="py-2 text-right font-mono text-navy-700 dark:text-navy-200">
                      {r.debit.greaterThan(0) ? fmt(r.debit.toFixed(2)) : ""}
                    </td>
                    <td className="py-2 text-right font-mono text-navy-700 dark:text-navy-200">
                      {r.credit.greaterThan(0) ? fmt(r.credit.toFixed(2)) : ""}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        <section className="rounded-2xl border border-navy-200 bg-white p-6 dark:border-navy-700 dark:bg-navy-900">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-serif text-xl text-navy-700 dark:text-navy-100">Profit &amp; Loss — MTD</h2>
            <Link href="/books/reports" className="text-xs font-semibold text-gold-600 hover:text-gold-700">
              Full report →
            </Link>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-navy-500 dark:text-navy-300">Total revenue</span>
              <span className="font-mono text-navy-700 dark:text-navy-100">{fmt(pnl.totalRevenue.toFixed(2))}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-navy-500 dark:text-navy-300">Total expenses</span>
              <span className="font-mono text-navy-700 dark:text-navy-100">{fmt(pnl.totalExpense.toFixed(2))}</span>
            </div>
            <div className="border-t border-navy-100 pt-2 dark:border-navy-700">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-navy-700 dark:text-navy-100">Net income</span>
                <span className="font-mono font-semibold text-navy-700 dark:text-navy-100">
                  {fmt(pnl.netIncome.toFixed(2))}
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/books/banks"
          className="rounded-lg bg-navy-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy-600"
        >
          Connect a bank
        </Link>
        <Link
          href="/books/journal/new"
          className="rounded-lg border border-navy-300 px-5 py-2.5 text-sm font-semibold text-navy-600 hover:bg-navy-50 dark:border-navy-600 dark:text-navy-200 dark:hover:bg-navy-800"
        >
          New journal entry
        </Link>
        <Link
          href="/books/transactions"
          className="rounded-lg border border-navy-300 px-5 py-2.5 text-sm font-semibold text-navy-600 hover:bg-navy-50 dark:border-navy-600 dark:text-navy-200 dark:hover:bg-navy-800"
        >
          Review transactions
        </Link>
      </div>
    </div>
  );
}
