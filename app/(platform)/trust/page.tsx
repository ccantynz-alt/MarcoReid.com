import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";

export const dynamic = "force-dynamic";

const money = (cents: number, currency = "USD") =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(cents / 100);

const formatDate = (d: Date) =>
  new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(d);

export default async function TrustPage() {
  const userId = await getUserId();
  if (!userId) redirect("/login");

  // Boundaries
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const [accounts, monthTransactions, recentTransactions] = await Promise.all([
    prisma.trustAccount.findMany({
      where: { userId },
      include: {
        client: { select: { id: true, name: true, email: true } },
        _count: { select: { transactions: true } },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.trustTransaction.findMany({
      where: {
        trustAccount: { userId },
        createdAt: { gte: startOfMonth },
      },
      select: { type: true, amountInCents: true },
    }),
    prisma.trustTransaction.findMany({
      where: { trustAccount: { userId } },
      include: {
        trustAccount: {
          select: { id: true, client: { select: { name: true } } },
        },
      },
      orderBy: { createdAt: "desc" },
      take: 8,
    }),
  ]);

  const totalBalance = accounts.reduce((s, a) => s + a.balanceInCents, 0);
  const monthDeposits = monthTransactions
    .filter((t) => t.type === "DEPOSIT")
    .reduce((s, t) => s + t.amountInCents, 0);
  const monthWithdrawals = monthTransactions
    .filter((t) => t.type === "WITHDRAWAL" || t.type === "FEE_DRAW")
    .reduce((s, t) => s + t.amountInCents, 0);

  const transactionStyles: Record<string, string> = {
    DEPOSIT: "bg-forest-50 text-forest-600",
    WITHDRAWAL: "bg-plum-50 text-plum-600",
    FEE_DRAW: "bg-navy-50 text-navy-600",
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 lg:px-12">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-display text-navy-800">
            Trust accounts
          </h1>
          <p className="mt-2 text-navy-400">
            IOLTA-compliant client trust ledger.{" "}
            {accounts.length === 0
              ? "Open your first trust account to begin."
              : `${accounts.length} ${accounts.length === 1 ? "account" : "accounts"} · ${money(totalBalance)} in trust`}
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/help/trust-accounts"
            className="inline-flex items-center rounded-lg border border-navy-200 bg-white px-4 py-2 text-sm font-medium text-navy-700 transition-colors hover:border-navy-400"
          >
            IOLTA guidance
          </Link>
          <Link
            href="/trust/new"
            className="inline-flex min-h-touch items-center justify-center rounded-lg bg-navy-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-navy-600"
          >
            New trust account
          </Link>
        </div>
      </div>

      {/* Metrics */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-card">
          <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
            Total in trust
          </p>
          <p className="mt-2 font-serif text-2xl text-navy-800">
            {money(totalBalance)}
          </p>
          <p className="mt-1 text-xs text-navy-400">
            Across {accounts.length} {accounts.length === 1 ? "account" : "accounts"}
          </p>
        </div>
        <div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-card">
          <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
            Deposits this month
          </p>
          <p className="mt-2 font-serif text-2xl text-forest-600">
            {money(monthDeposits)}
          </p>
          <p className="mt-1 text-xs text-navy-400">
            Since {formatDate(startOfMonth)}
          </p>
        </div>
        <div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-card">
          <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
            Withdrawals this month
          </p>
          <p className="mt-2 font-serif text-2xl text-plum-600">
            {money(monthWithdrawals)}
          </p>
          <p className="mt-1 text-xs text-navy-400">Includes fee draws</p>
        </div>
        <div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-card">
          <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
            Reconciliation
          </p>
          <div className="mt-2 flex items-center gap-2">
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-plum-400" />
            <p className="font-serif text-lg text-navy-700">Set up required</p>
          </div>
          <p className="mt-1 text-xs text-navy-400">
            Connect bank feed for three-way
          </p>
        </div>
      </div>

      {/* Three-way reconciliation explainer */}
      <div className="mt-8 rounded-2xl border border-plum-200 bg-plum-50/50 p-6">
        <div className="flex items-start gap-3">
          <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-plum-500 text-white">
            <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none">
              <path
                d="M10 3v14M3 10h14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-serif text-xl text-navy-700">
              Three-way reconciliation
            </p>
            <p className="mt-2 text-sm text-navy-500">
              Every jurisdiction with IOLTA rules requires three-way reconciliation:
              the client ledger (this platform) matches the trust account ledger
              (this platform&rsquo;s totals) matches the actual bank statement. We
              maintain the first two automatically. The third requires a bank feed.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-forest-200 bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-forest-600">
                  1. Client ledger
                </p>
                <p className="mt-1 text-sm text-navy-600">
                  Per-client balance. Reconciled automatically.
                </p>
                <span className="mt-2 inline-flex items-center gap-1 text-xs text-forest-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-forest-500" />
                  Active
                </span>
              </div>
              <div className="rounded-lg border border-forest-200 bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-forest-600">
                  2. Trust ledger
                </p>
                <p className="mt-1 text-sm text-navy-600">
                  Aggregate of all client trust balances.
                </p>
                <span className="mt-2 inline-flex items-center gap-1 text-xs text-forest-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-forest-500" />
                  Active
                </span>
              </div>
              <div className="rounded-lg border border-plum-200 bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-plum-600">
                  3. Bank statement
                </p>
                <p className="mt-1 text-sm text-navy-600">
                  Requires Plaid or manual import.
                </p>
                <span className="mt-2 inline-flex items-center gap-1 text-xs text-plum-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-plum-500" />
                  Connect to activate
                </span>
              </div>
            </div>
            <div className="mt-4">
              <Link
                href="/settings/integrations"
                className="text-sm font-medium text-plum-600 hover:text-plum-700"
              >
                Connect bank feed in Integrations &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Accounts + recent transactions */}
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {/* Accounts list */}
        <div className="lg:col-span-2">
          <h2 className="font-serif text-headline text-navy-800">Accounts</h2>
          <div className="mt-4 overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-card">
            {accounts.length === 0 ? (
              <div className="px-6 py-16 text-center">
                <p className="font-serif text-xl text-navy-700">
                  No trust accounts yet
                </p>
                <p className="mt-2 text-sm text-navy-400">
                  Open your first client trust account. Every deposit,
                  withdrawal, and fee draw will be recorded in the ledger.
                </p>
                <Link
                  href="/trust/new"
                  className="mt-6 inline-flex items-center justify-center rounded-lg bg-navy-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy-600"
                >
                  Open trust account
                </Link>
              </div>
            ) : (
              <table className="w-full">
                <thead className="border-b border-navy-100 bg-navy-50/50">
                  <tr className="text-left text-xs font-semibold uppercase tracking-wide text-navy-400">
                    <th className="px-6 py-3">Client</th>
                    <th className="px-6 py-3">Transactions</th>
                    <th className="px-6 py-3 text-right">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {accounts.map((a) => (
                    <tr
                      key={a.id}
                      className="border-b border-navy-50 last:border-0 hover:bg-navy-50/50"
                    >
                      <td className="px-6 py-4">
                        <Link
                          href={`/trust/${a.id}`}
                          className="flex items-center gap-3"
                        >
                          <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-navy-100 text-xs font-semibold text-navy-600">
                            {a.client.name.charAt(0).toUpperCase()}
                          </span>
                          <div className="min-w-0">
                            <p className="truncate font-medium text-navy-700">
                              {a.client.name}
                            </p>
                            <p className="truncate text-xs text-navy-400">
                              {a.currency} · opened {formatDate(a.createdAt)}
                            </p>
                          </div>
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-sm text-navy-500">
                        {a._count.transactions}
                      </td>
                      <td className="px-6 py-4 text-right text-sm font-semibold text-navy-800 tabular-nums">
                        {money(a.balanceInCents, a.currency)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="border-t-2 border-navy-200 bg-navy-50">
                  <tr>
                    <td
                      colSpan={2}
                      className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-navy-500"
                    >
                      Total in trust
                    </td>
                    <td className="px-6 py-3 text-right font-serif text-lg text-navy-800 tabular-nums">
                      {money(totalBalance)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            )}
          </div>
        </div>

        {/* Recent transactions */}
        <div>
          <h2 className="font-serif text-headline text-navy-800">
            Recent activity
          </h2>
          <div className="mt-4 rounded-2xl border border-navy-100 bg-white p-5 shadow-card">
            {recentTransactions.length === 0 ? (
              <p className="text-sm text-navy-400">
                No trust transactions yet.
              </p>
            ) : (
              <ul className="space-y-4">
                {recentTransactions.map((t) => (
                  <li key={t.id}>
                    <Link
                      href={`/trust/${t.trustAccount.id}`}
                      className="block hover:opacity-80"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <p className="flex items-center gap-2">
                            <span
                              className={`rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                                transactionStyles[t.type] ?? "bg-navy-50 text-navy-500"
                              }`}
                            >
                              {t.type.replace("_", " ")}
                            </span>
                          </p>
                          <p className="mt-1 truncate text-sm text-navy-700">
                            {t.description}
                          </p>
                          <p className="mt-0.5 truncate text-xs text-navy-400">
                            {t.trustAccount.client.name} · {formatDate(t.createdAt)}
                          </p>
                        </div>
                        <span
                          className={`flex-shrink-0 text-sm font-semibold tabular-nums ${
                            t.type === "DEPOSIT"
                              ? "text-forest-600"
                              : "text-plum-600"
                          }`}
                        >
                          {t.type === "DEPOSIT" ? "+" : "−"}
                          {money(t.amountInCents)}
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
