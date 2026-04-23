import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";
import { getJurisdictionRules } from "@/lib/trust/jurisdiction-rules";

export const dynamic = "force-dynamic";

const formatDate = (d: Date) =>
  new Intl.DateTimeFormat("en-NZ", { dateStyle: "medium" }).format(d);

const formatDateTime = (d: Date) =>
  new Intl.DateTimeFormat("en-NZ", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(d);

function formatMoney(amount: Prisma.Decimal | number, currency: string) {
  const value =
    amount instanceof Prisma.Decimal ? amount.toNumber() : Number(amount);
  return new Intl.NumberFormat("en-NZ", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(value);
}

const ZERO = new Prisma.Decimal(0);

function signedAmount(
  type: string,
  amount: Prisma.Decimal,
): Prisma.Decimal {
  switch (type) {
    case "DEPOSIT":
    case "TRANSFER_IN":
    case "INTEREST_CREDIT":
    case "CORRECTION":
      return amount;
    case "WITHDRAWAL":
    case "TRANSFER_OUT":
    case "BANK_FEE":
      return amount.negated();
    default:
      return ZERO;
  }
}

const txStyles: Record<string, string> = {
  DEPOSIT: "bg-forest-50 text-forest-600",
  TRANSFER_IN: "bg-forest-50 text-forest-600",
  INTEREST_CREDIT: "bg-forest-50 text-forest-600",
  WITHDRAWAL: "bg-plum-50 text-plum-600",
  TRANSFER_OUT: "bg-plum-50 text-plum-600",
  BANK_FEE: "bg-plum-50 text-plum-600",
  CORRECTION: "bg-navy-50 text-navy-600",
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function TrustEngineAccountPage({ params }: PageProps) {
  const userId = await getUserId();
  if (!userId) redirect("/login");

  const { id } = await params;

  const account = await prisma.legalTrustAccount.findFirst({
    where: { id, firmId: userId },
    include: {
      ledgers: {
        orderBy: { createdAt: "desc" },
        include: { _count: { select: { transactions: true } } },
      },
      reconciliations: {
        orderBy: { periodEnd: "desc" },
        take: 5,
      },
    },
  });

  if (!account) notFound();

  const rules = getJurisdictionRules(account.jurisdiction);

  const recentTransactions = await prisma.legalTrustTransaction.findMany({
    where: { trustAccountId: account.id },
    orderBy: { occurredAt: "desc" },
    take: 20,
  });

  const allCleared = await prisma.legalTrustTransaction.findMany({
    where: {
      trustAccountId: account.id,
      status: { in: ["CLEARED", "RECONCILED"] },
    },
    select: { type: true, amount: true },
  });

  const ledgerBalance = allCleared.reduce<Prisma.Decimal>(
    (running, tx) => running.plus(signedAmount(tx.type, tx.amount)),
    account.openingBalance,
  );

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 lg:px-12">
      <div className="text-xs text-navy-400">
        <Link href="/trust-engine" className="hover:text-navy-600">
          Trust accounts
        </Link>
        <span className="mx-2">/</span>
        <span className="text-navy-500">{account.name}</span>
      </div>

      <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-display text-navy-800">
            {account.name}
          </h1>
          <p className="mt-2 text-navy-400">
            {account.bankName} · ····{account.bankAccountMasked} ·{" "}
            {account.currency}
          </p>
        </div>
        <Link
          href={`/trust-engine/${account.id}/reconcile`}
          className="inline-flex min-h-touch items-center justify-center rounded-lg bg-navy-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-navy-600"
        >
          Reconcile
        </Link>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-card">
          <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
            Current ledger balance
          </p>
          <p className="mt-2 font-serif text-2xl text-navy-800">
            {formatMoney(ledgerBalance, account.currency)}
          </p>
          <p className="mt-1 text-xs text-navy-400">
            Cleared transactions only
          </p>
        </div>
        <div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-card">
          <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
            Client ledgers
          </p>
          <p className="mt-2 font-serif text-2xl text-navy-800">
            {account.ledgers.length}
          </p>
          <p className="mt-1 text-xs text-navy-400">
            Per-client sub-accounts
          </p>
        </div>
        <div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-card">
          <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
            Jurisdiction
          </p>
          <p className="mt-2 font-serif text-lg text-navy-800">
            {account.jurisdiction.replace("_", " ")}
          </p>
          <p className="mt-1 text-xs text-navy-400">{rules.regulator}</p>
        </div>
        <div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-card">
          <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
            Reconciliation cadence
          </p>
          <p className="mt-2 font-serif text-lg text-navy-800">
            {rules.reconciliationCadence.toLowerCase()}
          </p>
          <p className="mt-1 text-xs text-navy-400">
            Due within {rules.reconciliationDueDays} days of period close
          </p>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
        <h2 className="font-serif text-headline text-navy-800">
          Statutory framework
        </h2>
        <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wider text-navy-400">
              Citation
            </dt>
            <dd className="mt-1 text-navy-700">{rules.citation}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wider text-navy-400">
              Mixed-payment hold period
            </dt>
            <dd className="mt-1 text-navy-700">
              {rules.mixedPaymentHoldDays} days
            </dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wider text-navy-400">
              Interest treatment
            </dt>
            <dd className="mt-1 text-navy-700">
              {rules.interestTreatment.replace("_", " ").toLowerCase()}
              {rules.interestFundName ? ` · ${rules.interestFundName}` : ""}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wider text-navy-400">
              Regulator
            </dt>
            <dd className="mt-1 text-navy-700">{rules.regulator}</dd>
          </div>
        </dl>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="font-serif text-headline text-navy-800">
            Recent transactions
          </h2>
          <div className="mt-4 overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-card">
            {recentTransactions.length === 0 ? (
              <div className="px-6 py-12 text-center text-sm text-navy-400">
                No transactions on this account yet.
              </div>
            ) : (
              <table className="w-full">
                <thead className="border-b border-navy-100 bg-navy-50/50">
                  <tr className="text-left text-xs font-semibold uppercase tracking-wide text-navy-400">
                    <th className="px-6 py-3">Date</th>
                    <th className="px-6 py-3">Type</th>
                    <th className="px-6 py-3">Description</th>
                    <th className="px-6 py-3 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTransactions.map((t) => (
                    <tr
                      key={t.id}
                      className="border-b border-navy-50 last:border-0"
                    >
                      <td className="px-6 py-4 text-xs text-navy-400">
                        {formatDate(t.occurredAt)}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                            txStyles[t.type] ?? "bg-navy-50 text-navy-500"
                          }`}
                        >
                          {t.type.replace("_", " ")}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-navy-700">
                        <p>{t.description}</p>
                        <p className="text-xs text-navy-400">
                          {t.status.toLowerCase()}
                          {t.bankReference ? ` · ${t.bankReference}` : ""}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-right text-sm font-semibold text-navy-800 tabular-nums">
                        {formatMoney(t.amount, account.currency)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        <div>
          <h2 className="font-serif text-headline text-navy-800">
            Recent reconciliations
          </h2>
          <div className="mt-4 rounded-2xl border border-navy-100 bg-white p-5 shadow-card">
            {account.reconciliations.length === 0 ? (
              <p className="text-sm text-navy-400">
                No reconciliations recorded yet. Run the first reconciliation
                from the button above.
              </p>
            ) : (
              <ul className="space-y-4">
                {account.reconciliations.map((r) => (
                  <li
                    key={r.id}
                    className="border-b border-navy-50 pb-3 last:border-0 last:pb-0"
                  >
                    <p className="text-sm font-medium text-navy-700">
                      {formatDate(r.periodStart)} → {formatDate(r.periodEnd)}
                    </p>
                    <p className="mt-1 text-xs text-navy-400">
                      Variance:{" "}
                      {formatMoney(r.variance, account.currency)} ·{" "}
                      <span
                        className={
                          r.status === "BALANCED"
                            ? "text-forest-600"
                            : "text-plum-600"
                        }
                      >
                        {r.status.replace("_", " ").toLowerCase()}
                      </span>
                    </p>
                    {r.reconciledAt ? (
                      <p className="mt-0.5 text-xs text-navy-400">
                        Signed off {formatDateTime(r.reconciledAt)}
                      </p>
                    ) : null}
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
