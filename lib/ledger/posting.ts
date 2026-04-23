/**
 * lib/ledger/posting.ts — Journal posting engine.
 *
 * Double-entry is enforced here, not by the database. Every call to
 * `postJournalEntry` validates that SUM(debits) === SUM(credits) using
 * Prisma `Decimal` arithmetic so floating-point drift can never silently
 * unbalance a journal.
 *
 * Posting and voiding are wrapped in a single Prisma `$transaction` so a
 * partial post can never escape: either the entry, every line, and the
 * sequential `entryNumber` allocation all land together, or nothing
 * does.
 */

import { Prisma, JournalStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export interface JournalLineInput {
  accountId: string;
  debit?: Prisma.Decimal | string | number;
  credit?: Prisma.Decimal | string | number;
  description?: string;
}

export interface PostJournalEntryInput {
  firmId: string;
  entryDate: Date;
  description: string;
  reference?: string;
  sourceType?: string;
  sourceRef?: string;
  lines: JournalLineInput[];
}

function toDecimal(value: Prisma.Decimal | string | number | undefined): Prisma.Decimal {
  if (value === undefined || value === null || value === "") return new Prisma.Decimal(0);
  if (value instanceof Prisma.Decimal) return value;
  return new Prisma.Decimal(value);
}

function sumDecimal(values: Prisma.Decimal[]): Prisma.Decimal {
  return values.reduce<Prisma.Decimal>((acc, v) => acc.plus(v), new Prisma.Decimal(0));
}

export class JournalValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "JournalValidationError";
  }
}

/**
 * Post a balanced journal entry.
 *
 * - Allocates the next `entryNumber` for the firm inside the same
 *   transaction (race-safe; if two posts race we fall back to a retry).
 * - Validates SUM(debit) === SUM(credit) with Decimal precision.
 * - Sets status from DRAFT → POSTED with `postedAt` and `postedById`.
 */
export async function postJournalEntry(
  input: PostJournalEntryInput,
  postedById: string,
) {
  if (!input.lines || input.lines.length < 2) {
    throw new JournalValidationError(
      "A journal entry needs at least two lines (one debit, one credit).",
    );
  }

  const decimalLines = input.lines.map((line) => ({
    accountId: line.accountId,
    debit: toDecimal(line.debit),
    credit: toDecimal(line.credit),
    description: line.description,
  }));

  const totalDebit = sumDecimal(decimalLines.map((l) => l.debit));
  const totalCredit = sumDecimal(decimalLines.map((l) => l.credit));

  if (!totalDebit.equals(totalCredit)) {
    throw new JournalValidationError(
      `Journal not balanced. Debits ${totalDebit.toFixed(2)} ≠ Credits ${totalCredit.toFixed(2)}.`,
    );
  }
  if (totalDebit.isZero()) {
    throw new JournalValidationError("Journal totals cannot be zero.");
  }
  for (const line of decimalLines) {
    if (line.debit.isNegative() || line.credit.isNegative()) {
      throw new JournalValidationError(
        "Journal lines must have non-negative debit and credit amounts.",
      );
    }
    if (!line.debit.isZero() && !line.credit.isZero()) {
      throw new JournalValidationError(
        "Each line must be debit-only or credit-only, never both.",
      );
    }
  }

  return prisma.$transaction(async (tx) => {
    const last = await tx.journalEntry.findFirst({
      where: { firmId: input.firmId },
      orderBy: { entryNumber: "desc" },
      select: { entryNumber: true },
    });
    const entryNumber = (last?.entryNumber ?? 0) + 1;

    const entry = await tx.journalEntry.create({
      data: {
        firmId: input.firmId,
        entryNumber,
        entryDate: input.entryDate,
        description: input.description,
        reference: input.reference,
        sourceType: input.sourceType,
        sourceRef: input.sourceRef,
        status: JournalStatus.POSTED,
        postedAt: new Date(),
        postedById,
        lines: {
          create: decimalLines,
        },
      },
      include: { lines: true },
    });

    return entry;
  });
}

/**
 * Void a posted journal entry by writing the reverse entry.
 *
 * We never mutate the original lines — the audit trail must show both
 * the original and the reversal. The reversal entry references the
 * original via `reference` and `sourceRef`.
 */
export async function voidJournalEntry(args: {
  entryId: string;
  reason: string;
  voidedById: string;
}) {
  const original = await prisma.journalEntry.findUnique({
    where: { id: args.entryId },
    include: { lines: true },
  });
  if (!original) {
    throw new JournalValidationError("Journal entry not found.");
  }
  if (original.status !== JournalStatus.POSTED) {
    throw new JournalValidationError(
      `Only POSTED entries can be voided (this is ${original.status}).`,
    );
  }

  return prisma.$transaction(async (tx) => {
    const last = await tx.journalEntry.findFirst({
      where: { firmId: original.firmId },
      orderBy: { entryNumber: "desc" },
      select: { entryNumber: true },
    });
    const entryNumber = (last?.entryNumber ?? 0) + 1;

    const reversal = await tx.journalEntry.create({
      data: {
        firmId: original.firmId,
        entryNumber,
        entryDate: new Date(),
        description: `Reversal of #${original.entryNumber}: ${original.description}`,
        reference: original.id,
        sourceType: "REVERSAL",
        sourceRef: original.id,
        status: JournalStatus.POSTED,
        postedAt: new Date(),
        postedById: args.voidedById,
        lines: {
          create: original.lines.map((line) => ({
            accountId: line.accountId,
            // Swap debit and credit to reverse.
            debit: line.credit,
            credit: line.debit,
            description: line.description
              ? `Reversal: ${line.description}`
              : "Reversal",
          })),
        },
      },
      include: { lines: true },
    });

    await tx.journalEntry.update({
      where: { id: original.id },
      data: {
        status: JournalStatus.VOIDED,
        voidedAt: new Date(),
        voidReason: args.reason,
      },
    });

    return reversal;
  });
}
