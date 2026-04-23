// Three-way reconciliation engine.
//
// The three numbers that must agree at the end of any reconciliation
// period:
//   1. Bank statement balance — what the bank says we hold.
//   2. Ledger balance        — sum of every cleared transaction on
//                              the trust account in the platform.
//   3. Client ledger sum     — sum of every per-client sub-ledger
//                              balance at the period end.
//
// If any pair disagrees, the trust account is out of balance and a
// firm cannot certify the reconciliation. This module computes all
// three and returns a Prisma create-input shape for a
// LegalTrustReconciliation row.

import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export interface ReconciliationInput {
  trustAccountId: string;
  periodStart: Date;
  periodEnd: Date;
  bankStatementBalance: Prisma.Decimal | number | string;
}

export interface ReconciliationResult {
  trustAccountId: string;
  periodStart: Date;
  periodEnd: Date;
  bankStatementBalance: Prisma.Decimal;
  ledgerBalance: Prisma.Decimal;
  clientLedgerSum: Prisma.Decimal;
  variance: Prisma.Decimal;
  status: "BALANCED" | "OUT_OF_BALANCE";
  // Prisma create-input shape for LegalTrustReconciliation. Callers
  // pass this straight into prisma.legalTrustReconciliation.create.
  createInput: Prisma.LegalTrustReconciliationUncheckedCreateInput;
}

const ZERO = new Prisma.Decimal(0);

function toDecimal(value: Prisma.Decimal | number | string): Prisma.Decimal {
  if (value instanceof Prisma.Decimal) return value;
  return new Prisma.Decimal(value);
}

// Signed amount for a transaction — deposits and inbound transfers
// add to the ledger, withdrawals and outbound transfers subtract.
// Bank fees subtract; interest credits add; corrections are signed
// as recorded (positive = credit).
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

export async function runThreeWayReconciliation(
  input: ReconciliationInput,
): Promise<ReconciliationResult> {
  const { trustAccountId, periodStart, periodEnd } = input;
  const bankStatementBalance = toDecimal(input.bankStatementBalance);

  // 1. Sum every CLEARED (or RECONCILED) transaction on the trust
  //    account up to and including the period end. Reconciliations
  //    are cumulative — the ledger balance at period end is the
  //    sum of all signed cleared movements from inception, not
  //    just the period.
  const clearedTransactions = await prisma.legalTrustTransaction.findMany({
    where: {
      trustAccountId,
      status: { in: ["CLEARED", "RECONCILED"] },
      occurredAt: { lte: periodEnd },
    },
    select: { type: true, amount: true },
  });

  const account = await prisma.legalTrustAccount.findUnique({
    where: { id: trustAccountId },
    select: { openingBalance: true },
  });

  const openingBalance = account?.openingBalance ?? ZERO;

  const ledgerBalance = clearedTransactions.reduce<Prisma.Decimal>(
    (running, tx) => running.plus(signedAmount(tx.type, tx.amount)),
    openingBalance,
  );

  // 2. Sum every per-client sub-ledger balance at period end.
  //    Each client ledger's balance is its opening balance plus the
  //    signed sum of its CLEARED/RECONCILED transactions.
  const ledgers = await prisma.legalTrustClientLedger.findMany({
    where: { trustAccountId },
    select: {
      id: true,
      openingBalance: true,
      transactions: {
        where: {
          status: { in: ["CLEARED", "RECONCILED"] },
          occurredAt: { lte: periodEnd },
        },
        select: { type: true, amount: true },
      },
    },
  });

  const clientLedgerSum = ledgers.reduce<Prisma.Decimal>((running, ledger) => {
    const balance = ledger.transactions.reduce<Prisma.Decimal>(
      (acc, tx) => acc.plus(signedAmount(tx.type, tx.amount)),
      ledger.openingBalance,
    );
    return running.plus(balance);
  }, ZERO);

  // 3. Variance = bank statement minus our ledger. A positive
  //    variance means the bank holds more than our ledger records;
  //    a negative variance means the ledger over-reports.
  const variance = bankStatementBalance.minus(ledgerBalance);

  const balanced =
    variance.equals(ZERO) && ledgerBalance.equals(clientLedgerSum);

  const status = balanced ? "BALANCED" : "OUT_OF_BALANCE";

  const createInput: Prisma.LegalTrustReconciliationUncheckedCreateInput = {
    trustAccountId,
    periodStart,
    periodEnd,
    bankStatementBalance,
    ledgerBalance,
    clientLedgerSum,
    variance,
    status,
  };

  return {
    trustAccountId,
    periodStart,
    periodEnd,
    bankStatementBalance,
    ledgerBalance,
    clientLedgerSum,
    variance,
    status,
    createInput,
  };
}
