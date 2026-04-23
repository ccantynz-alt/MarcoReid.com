/**
 * GET /api/bankfeeds/transactions?status=UNCATEGORISED&page=1
 *
 * Lists this firm's bank transactions, newest first. Defaults to
 * UNCATEGORISED so the queue surfaces work to do.
 */

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";
import { BankTransactionStatus, Prisma } from "@prisma/client";

const PAGE_SIZE = 50;

export async function GET(req: NextRequest) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const page = Math.max(1, Number(req.nextUrl.searchParams.get("page")) || 1);
  const statusParam = req.nextUrl.searchParams.get("status") as BankTransactionStatus | null;

  const where: Prisma.BankTransactionWhereInput = { bankAccount: { firmId: userId } };
  if (statusParam && Object.values(BankTransactionStatus).includes(statusParam)) {
    where.status = statusParam;
  }

  const [transactions, total] = await Promise.all([
    prisma.bankTransaction.findMany({
      where,
      include: { bankAccount: true },
      orderBy: { occurredAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.bankTransaction.count({ where }),
  ]);

  return NextResponse.json({ transactions, total, page, pageSize: PAGE_SIZE });
}
