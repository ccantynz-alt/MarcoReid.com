import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";
import { getJurisdictionRules } from "@/lib/trust/jurisdiction-rules";
import ReconcileForm from "./ReconcileForm";

export const dynamic = "force-dynamic";

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

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ReconcilePage({ params }: PageProps) {
  const userId = await getUserId();
  if (!userId) redirect("/login");

  const { id } = await params;

  const account = await prisma.legalTrustAccount.findFirst({
    where: { id, firmId: userId },
    include: {
      ledgers: {
        select: {
          id: true,
          openingBalance: true,
          transactions: {
            where: { status: { in: ["CLEARED", "RECONCILED"] } },
            select: { type: true, amount: true },
          },
        },
      },
    },
  });

  if (!account) notFound();

  const rules = getJurisdictionRules(account.jurisdiction);

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

  const clientLedgerSum = account.ledgers.reduce<Prisma.Decimal>(
    (running, ledger) => {
      const balance = ledger.transactions.reduce<Prisma.Decimal>(
        (acc, tx) => acc.plus(signedAmount(tx.type, tx.amount)),
        ledger.openingBalance,
      );
      return running.plus(balance);
    },
    ZERO,
  );

  const today = new Date();
  const firstOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastOfPrevMonth = new Date(firstOfMonth.getTime() - 1);
  const firstOfPrevMonth = new Date(
    lastOfPrevMonth.getFullYear(),
    lastOfPrevMonth.getMonth(),
    1,
  );

  return (
    <div className="mx-auto max-w-4xl px-6 py-12 sm:px-8 lg:px-12">
      <div className="text-xs text-navy-400">
        <Link href="/trust-engine" className="hover:text-navy-600">
          Trust accounts
        </Link>
        <span className="mx-2">/</span>
        <Link
          href={`/trust-engine/${account.id}`}
          className="hover:text-navy-600"
        >
          {account.name}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-navy-500">Reconcile</span>
      </div>

      <h1 className="mt-3 font-serif text-display text-navy-800">
        Three-way reconciliation
      </h1>
      <p className="mt-2 text-navy-400">
        Compare the bank statement balance against the platform ledger and the
        sum of every per-client ledger. Variance is computed live.
      </p>

      <div className="mt-6 rounded-2xl border border-navy-100 bg-navy-50/50 p-5 text-sm">
        <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
          Cadence reminder
        </p>
        <p className="mt-1 text-navy-600">
          {rules.regulator} requires{" "}
          <span className="font-semibold">
            {rules.reconciliationCadence.toLowerCase()}
          </span>{" "}
          reconciliation under {rules.citation}, signed off within{" "}
          {rules.reconciliationDueDays} days of period close.
        </p>
      </div>

      <ReconcileForm
        accountId={account.id}
        currency={account.currency}
        ledgerBalance={ledgerBalance.toString()}
        clientLedgerSum={clientLedgerSum.toString()}
        defaultPeriodStart={firstOfPrevMonth.toISOString().slice(0, 10)}
        defaultPeriodEnd={lastOfPrevMonth.toISOString().slice(0, 10)}
      />
    </div>
  );
}
