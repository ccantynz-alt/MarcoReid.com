import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-guard";

export const dynamic = "force-dynamic";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const guard = await requireAdmin();
  if (guard) return guard;

  const { id } = await params;
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      firmName: true,
      jurisdiction: true,
      practiceArea: true,
      createdAt: true,
      updatedAt: true,
      emailVerifiedAt: true,
      onboardedAt: true,
      subscriptionStatus: true,
      stripePriceId: true,
      stripeSubscriptionId: true,
      subscriptionPeriodEnd: true,
      tosVersion: true,
      tosAcceptedAt: true,
      platformAckVersion: true,
      platformAckAt: true,
    },
  });

  if (!user) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // "Last activity" — newest OracleQuery created by this user is a
  // reasonable proxy until we land a Session table. Wrapped so a missing
  // model never breaks the page.
  let lastActivityAt: string | null = null;
  try {
    const last = await prisma.oracleQuery.findFirst({
      where: { userId: id },
      orderBy: { createdAt: "desc" },
      select: { createdAt: true },
    });
    lastActivityAt = last?.createdAt.toISOString() ?? null;
  } catch {
    lastActivityAt = null;
  }

  return NextResponse.json({ user, lastActivityAt });
}
