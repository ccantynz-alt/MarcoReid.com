import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";
import { runThreeWayReconciliation } from "@/lib/trust/reconciliation";

interface RouteContext {
  params: Promise<{ id: string }>;
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

  const periodStartRaw = body.periodStart;
  const periodEndRaw = body.periodEnd;
  const bankStatementBalance = body.bankStatementBalance;
  const notes = typeof body.notes === "string" ? body.notes : null;

  if (
    typeof periodStartRaw !== "string" ||
    Number.isNaN(Date.parse(periodStartRaw))
  ) {
    return NextResponse.json(
      { error: "periodStart must be an ISO date string" },
      { status: 400 },
    );
  }
  if (
    typeof periodEndRaw !== "string" ||
    Number.isNaN(Date.parse(periodEndRaw))
  ) {
    return NextResponse.json(
      { error: "periodEnd must be an ISO date string" },
      { status: 400 },
    );
  }
  if (
    typeof bankStatementBalance !== "number" &&
    typeof bankStatementBalance !== "string"
  ) {
    return NextResponse.json(
      { error: "bankStatementBalance must be numeric" },
      { status: 400 },
    );
  }

  const periodStart = new Date(periodStartRaw);
  const periodEnd = new Date(periodEndRaw);

  if (periodEnd < periodStart) {
    return NextResponse.json(
      { error: "periodEnd must be on or after periodStart" },
      { status: 400 },
    );
  }

  const result = await runThreeWayReconciliation({
    trustAccountId: id,
    periodStart,
    periodEnd,
    bankStatementBalance,
  });

  const reconciliation = await prisma.legalTrustReconciliation.create({
    data: {
      ...result.createInput,
      notes,
      reconciledById: userId,
      reconciledAt: result.status === "BALANCED" ? new Date() : null,
    },
  });

  return NextResponse.json({ reconciliation, summary: result }, { status: 201 });
}
