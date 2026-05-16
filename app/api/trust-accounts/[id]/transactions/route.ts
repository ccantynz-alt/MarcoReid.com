import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";
import { TrustTransactionType } from "@prisma/client";
import { validateTrustTransaction } from "@/lib/trust-rules";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const account = await prisma.trustAccount.findFirst({
      where: { id, userId },
    });
    if (!account) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const transactions = await prisma.trustTransaction.findMany({
      where: { trustAccountId: account.id },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ transactions, balanceInCents: account.balanceInCents });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const account = await prisma.trustAccount.findFirst({
      where: { id, userId },
    });
    if (!account) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const body = await req.json();
    const { type, amountInCents, description, matterId } = body ?? {};
    if (!type || typeof amountInCents !== "number" || !description) {
      return NextResponse.json(
        { error: "type, amountInCents, description required" },
        { status: 400 }
      );
    }
    if (!Object.values(TrustTransactionType).includes(type)) {
      return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    }
    if (amountInCents <= 0) {
      return NextResponse.json({ error: "amountInCents must be positive" }, { status: 400 });
    }

    // Country-specific trust rule validation
    const validation = validateTrustTransaction({
      jurisdiction: account.jurisdiction ?? "US",
      type: type as "DEPOSIT" | "WITHDRAWAL" | "FEE_DRAW",
      amountInCents,
      currentBalanceInCents: account.balanceInCents,
      description,
    });
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.errors.join(" "), errors: validation.errors, jurisdiction: validation.jurisdiction, rulesApplied: validation.rulesApplied },
        { status: 400 },
      );
    }

    const delta = type === TrustTransactionType.DEPOSIT ? amountInCents : -amountInCents;
    const newBalance = account.balanceInCents + delta;
    if (newBalance < 0) {
      return NextResponse.json({ error: "Insufficient trust balance" }, { status: 400 });
    }

    if (matterId) {
      const m = await prisma.matter.findFirst({ where: { id: matterId, userId } });
      if (!m) return NextResponse.json({ error: "Invalid matter" }, { status: 400 });
    }

    const [transaction] = await prisma.$transaction([
      prisma.trustTransaction.create({
        data: {
          trustAccountId: account.id,
          type: type as TrustTransactionType,
          amountInCents,
          description,
          matterId: matterId || null,
        },
      }),
      prisma.trustAccount.update({
        where: { id: account.id },
        data: { balanceInCents: newBalance },
      }),
    ]);

    return NextResponse.json({
      transaction,
      balanceInCents: newBalance,
      warnings: validation.warnings,
      rulesApplied: validation.rulesApplied,
      jurisdiction: validation.jurisdiction,
    }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
