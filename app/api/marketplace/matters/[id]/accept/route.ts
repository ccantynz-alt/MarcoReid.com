import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";
import { ProMatterStatus } from "@prisma/client";
import {
  notifyCitizenOfAcceptance,
  fireAndForget,
} from "@/lib/marketplace/notifications";
import { hasActiveProSubscription } from "@/lib/marketplace/pro-plans";

// POST /api/marketplace/matters/:id/accept
// A verified, PI-current professional claims an AWAITING_PRO matter.
// Uses an optimistic update guarded on status to avoid race conditions —
// if two pros click Accept at the same time, only one wins.
export async function POST(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [pro, matter] = await Promise.all([
    prisma.professional.findUnique({
      where: { userId },
      include: {
        practiceAreas: { select: { practiceAreaId: true } },
        user: { select: { subscriptionStatus: true } },
      },
    }),
    prisma.proMatter.findUnique({
      where: { id },
      select: { id: true, status: true, practiceAreaId: true, jurisdiction: true },
    }),
  ]);
  if (!pro) return NextResponse.json({ error: "Not a professional" }, { status: 403 });

  if (!pro.verifiedAt) {
    return NextResponse.json(
      { error: "Your account is pending verification" },
      { status: 403 },
    );
  }
  if (!pro.acceptingNewMatters) {
    return NextResponse.json(
      { error: "You have turned off new matter acceptance" },
      { status: 403 },
    );
  }
  if (!pro.piPolicyExpiresAt || pro.piPolicyExpiresAt.getTime() <= Date.now()) {
    return NextResponse.json(
      { error: "Professional indemnity insurance is missing or expired" },
      { status: 403 },
    );
  }
  if (!hasActiveProSubscription(pro.user.subscriptionStatus)) {
    return NextResponse.json(
      {
        error:
          "An active Marco Reid marketplace subscription is required before you can accept matters.",
      },
      { status: 402 },
    );
  }

  if (!matter) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (matter.status !== ProMatterStatus.AWAITING_PRO) {
    return NextResponse.json({ error: "This matter is not available" }, { status: 409 });
  }
  if (matter.jurisdiction !== pro.admissionJurisdiction) {
    return NextResponse.json(
      { error: "Jurisdiction mismatch — you are not admitted in the matter's jurisdiction" },
      { status: 403 },
    );
  }
  if (!pro.practiceAreas.some((p) => p.practiceAreaId === matter.practiceAreaId)) {
    return NextResponse.json(
      { error: "Practice area not in your verified list" },
      { status: 403 },
    );
  }

  // Guard on status so concurrent accepts can't both win.
  const result = await prisma.proMatter.updateMany({
    where: { id: matter.id, status: ProMatterStatus.AWAITING_PRO },
    data: {
      status: ProMatterStatus.ACCEPTED,
      acceptedByProId: pro.id,
      acceptedAt: new Date(),
    },
  });

  if (result.count === 0) {
    return NextResponse.json({ error: "Already taken" }, { status: 409 });
  }

  fireAndForget("notifyCitizenOfAcceptance", notifyCitizenOfAcceptance(matter.id));

  return NextResponse.json({ ok: true });
}
