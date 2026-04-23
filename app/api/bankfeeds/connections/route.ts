/**
 * GET  /api/bankfeeds/connections — list this firm's bank connections.
 * POST /api/bankfeeds/connections — initiate a new connection.
 *
 * The POST is intentionally a stub: real OAuth handshakes for each
 * provider (Akahu / Basiq / Plaid / TrueLayer) require credentials in
 * the env. Until those are wired, the endpoint records a `BankConnection`
 * row in `ERROR` status with a clear message so the UI can show it.
 */

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";
import { BankFeedProvider, BankFeedStatus } from "@prisma/client";
import { getAdapter } from "@/lib/bankfeeds";

export async function GET() {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const connections = await prisma.bankConnection.findMany({
    where: { firmId: userId },
    include: { bankAccounts: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ connections });
}

export async function POST(req: NextRequest) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const { provider, institutionName } = body ?? {};
    if (!provider || !Object.values(BankFeedProvider).includes(provider)) {
      return NextResponse.json({ error: "Invalid provider" }, { status: 400 });
    }

    const adapter = getAdapter(provider);
    const configured = adapter.isConfigured();

    const connection = await prisma.bankConnection.create({
      data: {
        firmId: userId,
        provider,
        providerAccountId: `pending-${Date.now()}`,
        institutionName: institutionName || `${adapter.name} Connection`,
        status: configured ? BankFeedStatus.PAUSED : BankFeedStatus.ERROR,
        errorMessage: configured
          ? "Connection created. Complete the provider OAuth flow to activate."
          : `${adapter.name} keys are not configured. See README and .env.example.`,
      },
    });

    return NextResponse.json(
      {
        connection,
        configured,
        message: configured
          ? "Connection record created. Complete OAuth to start receiving transactions."
          : `Bank feed connections require ${adapter.name} keys to be configured. See README.`,
      },
      { status: 201 },
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
