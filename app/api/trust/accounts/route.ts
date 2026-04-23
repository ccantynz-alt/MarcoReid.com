import { NextRequest, NextResponse } from "next/server";
import { Prisma, type TrustJurisdiction } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";

const VALID_JURISDICTIONS: TrustJurisdiction[] = [
  "NZ_LCA",
  "AU_VIC",
  "AU_NSW",
  "AU_QLD",
  "AU_WA",
  "AU_SA",
  "AU_TAS",
  "AU_ACT",
  "AU_NT",
  "UK_SRA",
  "US_IOLTA",
];

export async function GET() {
  const userId = await getUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // For now firmId is the userId — Firm model lands in a later stream.
  const accounts = await prisma.legalTrustAccount.findMany({
    where: { firmId: userId },
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { ledgers: true, transactions: true } },
    },
  });

  return NextResponse.json({ accounts });
}

export async function POST(req: NextRequest) {
  const userId = await getUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const jurisdiction = body.jurisdiction as TrustJurisdiction;
  const bankName = typeof body.bankName === "string" ? body.bankName.trim() : "";
  const bankAccountMasked =
    typeof body.bankAccountMasked === "string"
      ? body.bankAccountMasked.trim()
      : "";
  const currency =
    typeof body.currency === "string" && body.currency.length > 0
      ? body.currency.toUpperCase()
      : "NZD";
  const openingBalanceRaw = body.openingBalance ?? 0;

  if (!name) {
    return NextResponse.json({ error: "name is required" }, { status: 400 });
  }
  if (!VALID_JURISDICTIONS.includes(jurisdiction)) {
    return NextResponse.json(
      { error: "jurisdiction is required" },
      { status: 400 },
    );
  }
  if (!bankName) {
    return NextResponse.json(
      { error: "bankName is required" },
      { status: 400 },
    );
  }
  if (!bankAccountMasked) {
    return NextResponse.json(
      { error: "bankAccountMasked is required (last 4 digits only)" },
      { status: 400 },
    );
  }

  let openingBalance: Prisma.Decimal;
  try {
    openingBalance = new Prisma.Decimal(
      typeof openingBalanceRaw === "number" ||
        typeof openingBalanceRaw === "string"
        ? openingBalanceRaw
        : 0,
    );
  } catch {
    return NextResponse.json(
      { error: "openingBalance must be numeric" },
      { status: 400 },
    );
  }

  const account = await prisma.legalTrustAccount.create({
    data: {
      firmId: userId,
      name,
      jurisdiction,
      bankName,
      bankAccountMasked,
      bsbOrSortCode:
        typeof body.bsbOrSortCode === "string" ? body.bsbOrSortCode : null,
      routingNumber:
        typeof body.routingNumber === "string" ? body.routingNumber : null,
      iban: typeof body.iban === "string" ? body.iban : null,
      currency,
      openingBalance,
    },
  });

  return NextResponse.json({ account }, { status: 201 });
}
