/**
 * POST /api/bankfeeds/transactions/[id]/categorise
 *   body: { accountId: string }
 *
 * Confirms a categorisation: posts a balanced two-line journal entry
 * and marks the transaction RECONCILED. The double-entry is anchored
 * by the bank account's mapped ledger account (or a fallback Bank
 * account if the bank account isn't mapped yet) on one side, and the
 * user-chosen account on the other.
 *
 * Sign convention: positive `amount` on the bank tx means money in
 * (debit Bank, credit Revenue/Other). Negative means money out (debit
 * Expense/Asset, credit Bank).
 */

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";
import { Prisma, BankTransactionStatus, AccountSubType } from "@prisma/client";
import { postJournalEntry, JournalValidationError } from "@/lib/ledger/posting";

export async function POST(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await ctx.params;
  const body = await req.json().catch(() => ({}));
  const { accountId } = body ?? {};
  if (!accountId) {
    return NextResponse.json({ error: "accountId required" }, { status: 400 });
  }

  const tx = await prisma.bankTransaction.findFirst({
    where: { id, bankAccount: { firmId: userId } },
    include: { bankAccount: true },
  });
  if (!tx) return NextResponse.json({ error: "Transaction not found" }, { status: 404 });

  // Find the bank's ledger account. If none mapped yet, find or fail
  // gracefully on the firm's first BANK account.
  let bankLedgerAccountId = tx.bankAccount.ledgerAccountId;
  if (!bankLedgerAccountId) {
    const fallback = await prisma.chartOfAccounts.findFirst({
      where: { firmId: userId, subType: AccountSubType.BANK, isActive: true },
      orderBy: { code: "asc" },
    });
    if (!fallback) {
      return NextResponse.json(
        { error: "No bank account in chart of accounts. Seed your COA first." },
        { status: 400 },
      );
    }
    bankLedgerAccountId = fallback.id;
    await prisma.bankAccount.update({
      where: { id: tx.bankAccount.id },
      data: { ledgerAccountId: bankLedgerAccountId },
    });
  }

  // Confirm the chosen account belongs to this firm.
  const chosen = await prisma.chartOfAccounts.findFirst({
    where: { id: accountId, firmId: userId },
  });
  if (!chosen) {
    return NextResponse.json({ error: "Account not in this firm's COA" }, { status: 400 });
  }

  const amount = new Prisma.Decimal(tx.amount).abs();
  const moneyIn = new Prisma.Decimal(tx.amount).greaterThanOrEqualTo(0);

  const lines = moneyIn
    ? [
        { accountId: bankLedgerAccountId, debit: amount, credit: new Prisma.Decimal(0) },
        { accountId: chosen.id, debit: new Prisma.Decimal(0), credit: amount },
      ]
    : [
        { accountId: chosen.id, debit: amount, credit: new Prisma.Decimal(0) },
        { accountId: bankLedgerAccountId, debit: new Prisma.Decimal(0), credit: amount },
      ];

  try {
    const entry = await postJournalEntry(
      {
        firmId: userId,
        entryDate: tx.occurredAt,
        description: tx.description,
        reference: tx.providerTxId,
        sourceType: "BANK_IMPORT",
        sourceRef: tx.id,
        lines,
      },
      userId,
    );

    // Reconcile the bank transaction against the first line for traceability.
    await prisma.bankTransaction.update({
      where: { id: tx.id },
      data: {
        status: BankTransactionStatus.RECONCILED,
        suggestedAccountId: chosen.id,
        matchedJournalLineId: entry.lines[0]?.id ?? null,
      },
    });

    return NextResponse.json({ entry });
  } catch (err) {
    if (err instanceof JournalValidationError) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    console.error(err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
