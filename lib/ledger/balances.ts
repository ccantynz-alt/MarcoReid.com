/**
 * lib/ledger/balances.ts — Reports computed from POSTED journal lines.
 *
 * Every figure in every report is recomputed from the underlying
 * `JournalLine` rows. We do not cache balances on accounts; if Prisma
 * crashes mid-write or a void is applied retroactively, the only source
 * of truth is the line-level history.
 *
 * Sign convention follows accounting normal balances:
 *
 *   ASSET, EXPENSE             → debit balance  (debit - credit)
 *   LIABILITY, EQUITY, REVENUE → credit balance (credit - debit)
 *   CONTRA_ASSET               → credit balance
 *   CONTRA_LIABILITY           → debit balance
 */

import { Prisma, JournalStatus, AccountType, ChartOfAccounts } from "@prisma/client";
import { prisma } from "@/lib/prisma";

const ZERO = new Prisma.Decimal(0);

function naturalDebitAccount(type: AccountType): boolean {
  return (
    type === AccountType.ASSET ||
    type === AccountType.EXPENSE ||
    type === AccountType.CONTRA_LIABILITY
  );
}

/**
 * Sum POSTED activity on an account up to and including `asOf`.
 * Returns the signed natural balance (positive = normal side).
 */
export async function getAccountBalance(
  accountId: string,
  asOf?: Date,
): Promise<Prisma.Decimal> {
  const account = await prisma.chartOfAccounts.findUnique({
    where: { id: accountId },
    select: { type: true },
  });
  if (!account) return ZERO;

  const lines = await prisma.journalLine.findMany({
    where: {
      accountId,
      journalEntry: {
        status: JournalStatus.POSTED,
        ...(asOf ? { entryDate: { lte: asOf } } : {}),
      },
    },
    select: { debit: true, credit: true },
  });

  const debit = lines.reduce<Prisma.Decimal>((acc, l) => acc.plus(l.debit), ZERO);
  const credit = lines.reduce<Prisma.Decimal>((acc, l) => acc.plus(l.credit), ZERO);

  return naturalDebitAccount(account.type) ? debit.minus(credit) : credit.minus(debit);
}

export interface TrialBalanceRow {
  account: ChartOfAccounts;
  debit: Prisma.Decimal;
  credit: Prisma.Decimal;
}

/**
 * Trial balance: every account's posted debit and credit totals.
 * The sum of debit column should equal the sum of credit column.
 */
export async function getTrialBalance(
  firmId: string,
  asOf?: Date,
): Promise<{ rows: TrialBalanceRow[]; totalDebit: Prisma.Decimal; totalCredit: Prisma.Decimal }> {
  const accounts = await prisma.chartOfAccounts.findMany({
    where: { firmId },
    orderBy: { code: "asc" },
  });

  const rows: TrialBalanceRow[] = [];
  let totalDebit = ZERO;
  let totalCredit = ZERO;

  for (const account of accounts) {
    const lines = await prisma.journalLine.findMany({
      where: {
        accountId: account.id,
        journalEntry: {
          status: JournalStatus.POSTED,
          ...(asOf ? { entryDate: { lte: asOf } } : {}),
        },
      },
      select: { debit: true, credit: true },
    });
    const debit = lines.reduce<Prisma.Decimal>((acc, l) => acc.plus(l.debit), ZERO);
    const credit = lines.reduce<Prisma.Decimal>((acc, l) => acc.plus(l.credit), ZERO);

    if (debit.isZero() && credit.isZero()) continue;

    // Net to one side for clarity in the report — matches how a TB is
    // usually presented for review.
    const net = naturalDebitAccount(account.type) ? debit.minus(credit) : credit.minus(debit);
    const debitSide = naturalDebitAccount(account.type) ? net : net.negated();
    const row: TrialBalanceRow = {
      account,
      debit: debitSide.greaterThan(0) ? debitSide : ZERO,
      credit: debitSide.lessThan(0) ? debitSide.negated() : ZERO,
    };
    rows.push(row);
    totalDebit = totalDebit.plus(row.debit);
    totalCredit = totalCredit.plus(row.credit);
  }

  return { rows, totalDebit, totalCredit };
}

export interface PnLLine {
  account: ChartOfAccounts;
  amount: Prisma.Decimal; // signed: revenue positive, expense positive (subtracted)
}

export interface PnLReport {
  revenue: PnLLine[];
  expenses: PnLLine[];
  totalRevenue: Prisma.Decimal;
  totalExpense: Prisma.Decimal;
  netIncome: Prisma.Decimal;
  periodStart: Date;
  periodEnd: Date;
}

export async function getProfitAndLoss(
  firmId: string,
  periodStart: Date,
  periodEnd: Date,
): Promise<PnLReport> {
  const accounts = await prisma.chartOfAccounts.findMany({
    where: {
      firmId,
      type: { in: [AccountType.REVENUE, AccountType.EXPENSE] },
    },
    orderBy: { code: "asc" },
  });

  const revenue: PnLLine[] = [];
  const expenses: PnLLine[] = [];
  let totalRevenue = ZERO;
  let totalExpense = ZERO;

  for (const account of accounts) {
    const lines = await prisma.journalLine.findMany({
      where: {
        accountId: account.id,
        journalEntry: {
          status: JournalStatus.POSTED,
          entryDate: { gte: periodStart, lte: periodEnd },
        },
      },
      select: { debit: true, credit: true },
    });
    const debit = lines.reduce<Prisma.Decimal>((acc, l) => acc.plus(l.debit), ZERO);
    const credit = lines.reduce<Prisma.Decimal>((acc, l) => acc.plus(l.credit), ZERO);

    if (account.type === AccountType.REVENUE) {
      const amount = credit.minus(debit);
      if (!amount.isZero()) {
        revenue.push({ account, amount });
        totalRevenue = totalRevenue.plus(amount);
      }
    } else {
      const amount = debit.minus(credit);
      if (!amount.isZero()) {
        expenses.push({ account, amount });
        totalExpense = totalExpense.plus(amount);
      }
    }
  }

  return {
    revenue,
    expenses,
    totalRevenue,
    totalExpense,
    netIncome: totalRevenue.minus(totalExpense),
    periodStart,
    periodEnd,
  };
}

export interface BalanceSheetSection {
  account: ChartOfAccounts;
  amount: Prisma.Decimal;
}

export interface BalanceSheetReport {
  assets: BalanceSheetSection[];
  liabilities: BalanceSheetSection[];
  equity: BalanceSheetSection[];
  totalAssets: Prisma.Decimal;
  totalLiabilities: Prisma.Decimal;
  totalEquity: Prisma.Decimal;
  retainedEarnings: Prisma.Decimal;
  asOf: Date;
}

/**
 * Balance sheet snapshot. Retained earnings are computed as the running
 * net income from all POSTED journal entries up to `asOf`, so we never
 * need a period-close routine before producing a balance sheet.
 */
export async function getBalanceSheet(firmId: string, asOf?: Date): Promise<BalanceSheetReport> {
  const at = asOf ?? new Date();
  const accounts = await prisma.chartOfAccounts.findMany({
    where: { firmId },
    orderBy: { code: "asc" },
  });

  const assets: BalanceSheetSection[] = [];
  const liabilities: BalanceSheetSection[] = [];
  const equity: BalanceSheetSection[] = [];
  let totalAssets = ZERO;
  let totalLiabilities = ZERO;
  let totalEquity = ZERO;
  let retainedRevenue = ZERO;
  let retainedExpense = ZERO;

  for (const account of accounts) {
    const lines = await prisma.journalLine.findMany({
      where: {
        accountId: account.id,
        journalEntry: {
          status: JournalStatus.POSTED,
          entryDate: { lte: at },
        },
      },
      select: { debit: true, credit: true },
    });
    const debit = lines.reduce<Prisma.Decimal>((acc, l) => acc.plus(l.debit), ZERO);
    const credit = lines.reduce<Prisma.Decimal>((acc, l) => acc.plus(l.credit), ZERO);

    switch (account.type) {
      case AccountType.ASSET: {
        const amount = debit.minus(credit);
        if (!amount.isZero()) {
          assets.push({ account, amount });
          totalAssets = totalAssets.plus(amount);
        }
        break;
      }
      case AccountType.CONTRA_ASSET: {
        const amount = credit.minus(debit);
        if (!amount.isZero()) {
          assets.push({ account, amount: amount.negated() });
          totalAssets = totalAssets.minus(amount);
        }
        break;
      }
      case AccountType.LIABILITY: {
        const amount = credit.minus(debit);
        if (!amount.isZero()) {
          liabilities.push({ account, amount });
          totalLiabilities = totalLiabilities.plus(amount);
        }
        break;
      }
      case AccountType.CONTRA_LIABILITY: {
        const amount = debit.minus(credit);
        if (!amount.isZero()) {
          liabilities.push({ account, amount: amount.negated() });
          totalLiabilities = totalLiabilities.minus(amount);
        }
        break;
      }
      case AccountType.EQUITY: {
        const amount = credit.minus(debit);
        if (!amount.isZero()) {
          equity.push({ account, amount });
          totalEquity = totalEquity.plus(amount);
        }
        break;
      }
      case AccountType.REVENUE:
        retainedRevenue = retainedRevenue.plus(credit.minus(debit));
        break;
      case AccountType.EXPENSE:
        retainedExpense = retainedExpense.plus(debit.minus(credit));
        break;
    }
  }

  const retainedEarnings = retainedRevenue.minus(retainedExpense);
  totalEquity = totalEquity.plus(retainedEarnings);

  return {
    assets,
    liabilities,
    equity,
    totalAssets,
    totalLiabilities,
    totalEquity,
    retainedEarnings,
    asOf: at,
  };
}
