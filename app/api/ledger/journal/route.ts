/**
 * GET  /api/ledger/journal — paginated journal entries for this firm.
 * POST /api/ledger/journal — create a DRAFT entry (lines optional).
 *
 * DRAFT creation is a plain insert; posting (DRAFT → POSTED) lives at
 * `/api/ledger/journal/[id]/post` so the balance check happens in one
 * place.
 */

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";
import { JournalStatus, Prisma } from "@prisma/client";

const PAGE_SIZE = 50;

export async function GET(req: NextRequest) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const page = Math.max(1, Number(req.nextUrl.searchParams.get("page")) || 1);
  const status = req.nextUrl.searchParams.get("status") as JournalStatus | null;

  const where: Prisma.JournalEntryWhereInput = { firmId: userId };
  if (status && Object.values(JournalStatus).includes(status)) {
    where.status = status;
  }

  const [entries, total] = await Promise.all([
    prisma.journalEntry.findMany({
      where,
      include: { lines: { include: { account: true } } },
      orderBy: { entryDate: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.journalEntry.count({ where }),
  ]);

  return NextResponse.json({ entries, total, page, pageSize: PAGE_SIZE });
}

export async function POST(req: NextRequest) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const { entryDate, description, reference, lines } = body ?? {};
    if (!entryDate || !description) {
      return NextResponse.json({ error: "entryDate and description required" }, { status: 400 });
    }

    const last = await prisma.journalEntry.findFirst({
      where: { firmId: userId },
      orderBy: { entryNumber: "desc" },
      select: { entryNumber: true },
    });
    const entryNumber = (last?.entryNumber ?? 0) + 1;

    const entry = await prisma.journalEntry.create({
      data: {
        firmId: userId,
        entryNumber,
        entryDate: new Date(entryDate),
        description,
        reference: reference || null,
        sourceType: "MANUAL",
        status: JournalStatus.DRAFT,
        lines: Array.isArray(lines) && lines.length > 0
          ? {
              create: lines.map((l: { accountId: string; debit?: string; credit?: string; description?: string }) => ({
                accountId: l.accountId,
                debit: new Prisma.Decimal(l.debit ?? 0),
                credit: new Prisma.Decimal(l.credit ?? 0),
                description: l.description,
              })),
            }
          : undefined,
      },
      include: { lines: true },
    });

    return NextResponse.json({ entry }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
