import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ isTrial: false }, { status: 200 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { isTrialAccount: true, trialEndsAt: true },
  });

  if (!user?.isTrialAccount || !user.trialEndsAt) {
    return NextResponse.json({ isTrial: false });
  }

  const now = new Date();
  const expired = user.trialEndsAt < now;
  const daysRemaining = expired
    ? 0
    : Math.ceil((user.trialEndsAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  return NextResponse.json({
    isTrial: true,
    expired,
    daysRemaining,
    trialEndsAt: user.trialEndsAt.toISOString(),
  });
}
