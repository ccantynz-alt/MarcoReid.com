import { NextRequest, NextResponse } from "next/server";
import { Prisma, type LegalTrustTransactionType } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";

interface RouteContext {
  params: Promise<{ id: string }>;
}

const VALID_TYPES: LegalTrustTransactionType[] = [
  "DEPOSIT",
  "WITHDRAWAL",
  "TRANSFER_IN",
  "TRANSFER_OUT",
  "INTEREST_CREDIT",
  "BANK_FEE",
  "CORRECTION",
];

export async function GET(_req: Request, context: RouteContext) {
  const userId = await getUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;

  const account = await prisma.legalTrustAccount.findFirst({
    where: { id, firmId: userId },
    select: { id: true },
  });

  if (!account) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const transactions = await prisma.legalTrustTransaction.findMany({
    where: { trustAccountId: id },
    orderBy: { occurredAt: "desc" },
    take: 100,
  });

  return NextResponse.json({ transactions });
}

export async function POST(req: NextRequest, context: RouteContext) {
  const userId = await getUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;

  const account = await prisma.legalTrustAccount.findFirst({
    where: { id, firmId: userId },
    select: { id: true },
  });

  if (!account) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const type = body.type as LegalTrustTransactionType;
  const description =
    typeof body.description === "string" ? body.description.trim() : "";
  const clientLedgerId =
    typeof body.clientLedgerId === "string" ? body.clientLedgerId : null;
  const bankReference =
    typeof body.bankReference === "string" ? body.bankReference : null;
  const occurredAtRaw = body.occurredAt;

  if (!VALID_TYPES.includes(type)) {
    return NextResponse.json(
      { error: `type must be one of: ${VALID_TYPES.join(", ")}` },
      { status: 400 },
    );
  }
  if (!description) {
    return NextResponse.json(
      { error: "description is required" },
      { status: 400 },
    );
  }

  let amount: Prisma.Decimal;
  try {
    amount = new Prisma.Decimal(
      typeof body.amount === "number" || typeof body.amount === "string"
        ? body.amount
        : 0,
    );
  } catch {
    return NextResponse.json(
      { error: "amount must be numeric" },
      { status: 400 },
    );
  }

  if (amount.lte(0)) {
    return NextResponse.json(
      { error: "amount must be greater than 0" },
      { status: 400 },
    );
  }

  // Verify client ledger belongs to this trust account.
  if (clientLedgerId) {
    const ledger = await prisma.legalTrustClientLedger.findFirst({
      where: { id: clientLedgerId, trustAccountId: id },
      select: { id: true },
    });
    if (!ledger) {
      return NextResponse.json(
        { error: "clientLedgerId does not belong to this trust account" },
        { status: 400 },
      );
    }
  }

  const occurredAt =
    typeof occurredAtRaw === "string" && !Number.isNaN(Date.parse(occurredAtRaw))
      ? new Date(occurredAtRaw)
      : new Date();

  const transaction = await prisma.legalTrustTransaction.create({
    data: {
      trustAccountId: id,
      clientLedgerId,
      type,
      amount,
      description,
      bankReference,
      occurredAt,
    },
  });

  return NextResponse.json({ transaction }, { status: 201 });
}
