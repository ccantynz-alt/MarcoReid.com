import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";
import TrustTransactionForm from "@/app/components/platform/TrustTransactionForm";

export const dynamic = "force-dynamic";

const money = (cents: number, currency = "USD") =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(cents / 100);

const formatDate = (d: Date) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(d);

const formatTime = (d: Date) =>
  new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(d);

export default async function TrustAccountDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const userId = await getUserId();
  if (!userId) redirect("/login");

  const { id } = await params;

  const account = await prisma.trustAccount.findFirst({
    where: { id, userId },
    include: {
      client: true,
      transactions: {
        orderBy: { createdAt: "desc" },
        include: {
          matter: { select: { id: true, title: true, matterNumber: true } },
        },
      },
    },
  });
  if (!account) notFound();

  // Build a running balance for each transaction (showing chronological balance)
  const txsChronological = [...account.transactions].sort(
    (a, b) => a.createdAt.getTime() - b.createdAt.getTime(),
  );
  let running = 0;
  const withRunning = txsChronological.map((t) => {
    running +=
      t.type === "DEPOSIT" ? t.amountInCents : -t.amountInCents;
    return { ...t, runningBalance: running };
  });
  withRunning.reverse();

  const matters = await prisma.matter.findMany({
    where: { userId, clientId: account.clientId, status: "ACTIVE" },
    select: { id: true, title: true, matterNumber: true },
    orderBy: { openedAt: "desc" },
  });

  const totalDeposits = account.transactions
    .filter((t) => t.type === "DEPOSIT")
    .reduce((s, t) => s + t.amountInCents, 0);
  const totalWithdrawals = account.transactions
    .filter((t) => t.type === "WITHDRAWAL" || t.type === "FEE_DRAW")
    .reduce((s, t) => s + t.amountInCents, 0);

  const transactionStyles: Record<string, string> = {
    DEPOSIT: "bg-forest-50 text-forest-700",
    WITHDRAWAL: "bg-plum-50 text-plum-700",
    FEE_DRAW: "bg-navy-50 text-navy-700",
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 lg:px-12">
      <Link
        href="/trust"
        className="inline-flex items-center gap-1 text-sm text-navy-400 transition-colors hover:text-navy-700"
      >
        &larr; All trust accounts
      </Link>

      {/* Header */}
      <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-navy-100 font-serif text-2xl text-navy-600">
            {account.client.name.charAt(0).toUpperCase()}
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-plum-600">
              Trust account
            </p>
            <h1 className="mt-1 font-serif text-display text-navy-800">
              {account.client.name}
            </h1>
            <p className="mt-1 text-sm text-navy-400">
              Opened {formatDate(account.createdAt)} · {account.currency}
            </p>
          </div>
        </div>
        <Link
          href={`/clients/${account.clientId}`}
          className="text-sm font-medium text-navy-500 hover:text-navy-700"
        >
          View client &rarr;
        </Link>
      </div>

      {/* Balance metrics */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-card">
          <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
            Current balance
          </p>
          <p className="mt-2 font-serif text-3xl text-navy-800 tabular-nums">
            {money(account.balanceInCents, account.currency)}
          </p>
        </div>
        <div className="rounded-2xl border border-forest-200 bg-white p-5 shadow-card">
          <p className="text-xs font-semibold uppercase tracking-wider text-forest-600">
            Total deposits
          </p>
          <p className="mt-2 font-serif text-2xl text-forest-600 tabular-nums">
            {money(totalDeposits, account.currency)}
          </p>
        </div>
        <div className="rounded-2xl border border-plum-200 bg-white p-5 shadow-card">
          <p className="text-xs font-semibold uppercase tracking-wider text-plum-600">
            Total disbursed
          </p>
          <p className="mt-2 font-serif text-2xl text-plum-600 tabular-nums">
            {money(totalWithdrawals, account.currency)}
          </p>
        </div>
      </div>

      {/* Transaction form + ledger */}
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {/* New transaction */}
        <div>
          <h2 className="font-serif text-headline text-navy-800">
            New transaction
          </h2>
          <div className="mt-4 rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
            <TrustTransactionForm
              accountId={account.id}
              currentBalance={account.balanceInCents}
              currency={account.currency}
              matters={matters}
            />
          </div>

          <div className="mt-4 rounded-2xl border border-plum-200 bg-plum-50/40 p-5 text-sm text-navy-600">
            <p className="font-semibold text-plum-700">IOLTA reminder</p>
            <p className="mt-1">
              Trust funds must be held in a separate trust account at an
              authorised bank. This ledger records your activity — it does not
              move money. Always reconcile against your bank statement.
            </p>
          </div>
        </div>

        {/* Full ledger */}
        <div className="lg:col-span-2">
          <h2 className="font-serif text-headline text-navy-800">Ledger</h2>
          <div className="mt-4 overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-card">
            {withRunning.length === 0 ? (
              <div className="px-6 py-16 text-center">
                <p className="font-serif text-lg text-navy-700">
                  No transactions yet
                </p>
                <p className="mt-1 text-sm text-navy-400">
                  Record your first deposit to begin the ledger.
                </p>
              </div>
            ) : (
              <table className="w-full">
                <thead className="border-b border-navy-100 bg-navy-50/50">
                  <tr className="text-left text-xs font-semibold uppercase tracking-wide text-navy-400">
                    <th className="px-5 py-3">Date</th>
                    <th className="px-5 py-3">Type</th>
                    <th className="px-5 py-3">Description</th>
                    <th className="px-5 py-3 text-right">Amount</th>
                    <th className="px-5 py-3 text-right">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {withRunning.map((t) => (
                    <tr key={t.id} className="border-b border-navy-50 last:border-0">
                      <td className="px-5 py-3 text-xs text-navy-500">
                        <div>{formatDate(t.createdAt)}</div>
                        <div className="text-navy-400">{formatTime(t.createdAt)}</div>
                      </td>
                      <td className="px-5 py-3">
                        <span
                          className={`rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                            transactionStyles[t.type] ?? "bg-navy-50 text-navy-500"
                          }`}
                        >
                          {t.type.replace("_", " ")}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-sm text-navy-700">
                        <div>{t.description}</div>
                        {t.matter && (
                          <Link
                            href={`/matters/${t.matter.id}`}
                            className="mt-0.5 block text-xs text-navy-400 hover:text-navy-600"
                          >
                            {t.matter.matterNumber
                              ? `#${t.matter.matterNumber} · `
                              : ""}
                            {t.matter.title}
                          </Link>
                        )}
                      </td>
                      <td
                        className={`px-5 py-3 text-right text-sm font-semibold tabular-nums ${
                          t.type === "DEPOSIT" ? "text-forest-600" : "text-plum-600"
                        }`}
                      >
                        {t.type === "DEPOSIT" ? "+" : "−"}
                        {money(t.amountInCents, account.currency)}
                      </td>
                      <td className="px-5 py-3 text-right text-sm text-navy-600 tabular-nums">
                        {money(t.runningBalance, account.currency)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
