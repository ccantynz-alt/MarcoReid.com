/**
 * POST /api/ledger/journal/[id]/post — promote DRAFT to POSTED.
 *
 * Re-runs the balance check via `postJournalEntry` so we never trust a
 * client-side validation. The DRAFT row's lines are re-posted as a
 * brand-new POSTED entry; the original DRAFT is removed in the same
 * transaction so we don't end up with a phantom row.
 */

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";
import { JournalStatus } from "@prisma/client";
import { postJournalEntry, JournalValidationError } from "@/lib/ledger/posting";

export async function POST(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await ctx.params;

  const draft = await prisma.journalEntry.findFirst({
    where: { id, firmId: userId, status: JournalStatus.DRAFT },
    include: { lines: true },
  });
  if (!draft) {
    return NextResponse.json({ error: "Draft entry not found" }, { status: 404 });
  }
  if (draft.lines.length < 2) {
    return NextResponse.json({ error: "Add at least two lines before posting" }, { status: 400 });
  }

  try {
    const posted = await postJournalEntry(
      {
        firmId: userId,
        entryDate: draft.entryDate,
        description: draft.description,
        reference: draft.reference ?? undefined,
        sourceType: draft.sourceType ?? "MANUAL",
        sourceRef: draft.sourceRef ?? undefined,
        lines: draft.lines.map((l) => ({
          accountId: l.accountId,
          debit: l.debit,
          credit: l.credit,
          description: l.description ?? undefined,
        })),
      },
      userId,
    );

    // Remove the original draft now that the posted entry stands.
    await prisma.$transaction([
      prisma.journalLine.deleteMany({ where: { journalEntryId: draft.id } }),
      prisma.journalEntry.delete({ where: { id: draft.id } }),
    ]);

    return NextResponse.json({ entry: posted });
  } catch (err) {
    if (err instanceof JournalValidationError) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    console.error(err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
