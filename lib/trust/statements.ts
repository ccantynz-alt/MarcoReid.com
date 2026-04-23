// Per-client trust statement generator.
//
// Returns a plain-data shape with opening balance, every transaction
// in the period, and the closing balance for a single client ledger.
// Pure read; no side effects. Suitable for rendering to PDF, CSV, or
// the platform UI.

import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export interface ClientStatementInput {
  clientLedgerId: string;
  periodStart: Date;
  periodEnd: Date;
}

export interface ClientStatementLine {
  id: string;
  occurredAt: Date;
  type: string;
  status: string;
  description: string;
  bankReference: string | null;
  amount: Prisma.Decimal;
  signedAmount: Prisma.Decimal;
  runningBalance: Prisma.Decimal;
}

export interface ClientStatement {
  clientLedgerId: string;
  trustAccountId: string;
  clientId: string;
  matterId: string | null;
  reference: string;
  currency: string;
  periodStart: Date;
  periodEnd: Date;
  openingBalance: Prisma.Decimal;
  closingBalance: Prisma.Decimal;
  totalDeposits: Prisma.Decimal;
  totalWithdrawals: Prisma.Decimal;
  lines: ClientStatementLine[];
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
      return amount;
    case "WITHDRAWAL":
    case "TRANSFER_OUT":
    case "BANK_FEE":
      return amount.negated();
    case "CORRECTION":
      return amount;
    default:
      return ZERO;
  }
}

export async function generateClientStatement(
  input: ClientStatementInput,
): Promise<ClientStatement> {
  const { clientLedgerId, periodStart, periodEnd } = input;

  const ledger = await prisma.legalTrustClientLedger.findUnique({
    where: { id: clientLedgerId },
    include: {
      trustAccount: { select: { currency: true } },
    },
  });

  if (!ledger) {
    throw new Error(`Client ledger not found: ${clientLedgerId}`);
  }

  // Opening balance for the period = ledger opening balance plus
  // every signed cleared transaction strictly before periodStart.
  const priorTransactions = await prisma.legalTrustTransaction.findMany({
    where: {
      clientLedgerId,
      status: { in: ["CLEARED", "RECONCILED"] },
      occurredAt: { lt: periodStart },
    },
    select: { type: true, amount: true },
  });

  const openingBalance = priorTransactions.reduce<Prisma.Decimal>(
    (running, tx) => running.plus(signedAmount(tx.type, tx.amount)),
    ledger.openingBalance,
  );

  // Period transactions, in chronological order.
  const periodTransactions = await prisma.legalTrustTransaction.findMany({
    where: {
      clientLedgerId,
      occurredAt: { gte: periodStart, lte: periodEnd },
    },
    orderBy: { occurredAt: "asc" },
    select: {
      id: true,
      occurredAt: true,
      type: true,
      status: true,
      description: true,
      bankReference: true,
      amount: true,
    },
  });

  let runningBalance = openingBalance;
  let totalDeposits = ZERO;
  let totalWithdrawals = ZERO;

  const lines: ClientStatementLine[] = periodTransactions.map((tx) => {
    const signed = signedAmount(tx.type, tx.amount);
    runningBalance = runningBalance.plus(signed);
    if (signed.gte(ZERO)) {
      totalDeposits = totalDeposits.plus(signed);
    } else {
      totalWithdrawals = totalWithdrawals.plus(signed.abs());
    }
    return {
      id: tx.id,
      occurredAt: tx.occurredAt,
      type: tx.type,
      status: tx.status,
      description: tx.description,
      bankReference: tx.bankReference,
      amount: tx.amount,
      signedAmount: signed,
      runningBalance,
    };
  });

  return {
    clientLedgerId: ledger.id,
    trustAccountId: ledger.trustAccountId,
    clientId: ledger.clientId,
    matterId: ledger.matterId,
    reference: ledger.reference,
    currency: ledger.trustAccount.currency,
    periodStart,
    periodEnd,
    openingBalance,
    closingBalance: runningBalance,
    totalDeposits,
    totalWithdrawals,
    lines,
  };
}
