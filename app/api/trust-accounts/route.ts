import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";

const VALID_CURRENCIES = ["USD", "NZD", "AUD", "GBP", "EUR"];

export async function GET() {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const accounts = await prisma.trustAccount.findMany({
      where: { userId },
      include: { client: { select: { id: true, name: true } } },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ trustAccounts: accounts });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const { clientId, currency } = body ?? {};

    if (!clientId || !currency) {
      return NextResponse.json(
        { error: "clientId and currency are required" },
        { status: 400 },
      );
    }

    if (!VALID_CURRENCIES.includes(currency)) {
      return NextResponse.json(
        { error: `Invalid currency. Must be one of: ${VALID_CURRENCIES.join(", ")}` },
        { status: 400 },
      );
    }

    // Verify the client belongs to this user
    const client = await prisma.client.findFirst({
      where: { id: clientId, userId },
    });
    if (!client) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    // Check for duplicate (unique constraint: userId + clientId)
    const existing = await prisma.trustAccount.findFirst({
      where: { userId, clientId },
    });
    if (existing) {
      return NextResponse.json(
        { error: "A trust account already exists for this client" },
        { status: 409 },
      );
    }

    const account = await prisma.trustAccount.create({
      data: {
        userId,
        clientId,
        currency,
        balanceInCents: 0,
      },
      include: { client: { select: { id: true, name: true } } },
    });

    return NextResponse.json({ trustAccount: account }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
