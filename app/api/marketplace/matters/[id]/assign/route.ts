import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ProMatterStatus } from "@prisma/client";

interface RouteCtx {
  params: Promise<{ id: string }>;
}

/**
 * POST /api/marketplace/matters/[id]/assign
 *
 * Admin assigns a posted matter to a verified Professional. The matter
 * advances from AWAITING_PRO ("INTAKE") to ACCEPTED ("ASSIGNED" in the
 * chunk's wording — semantically the same: a pro is on it).
 *
 * Guards:
 *  - target professional must be verified
 *  - target professional must accept new matters
 *  - PI cover, if recorded, must not be expired
 */
export async function POST(req: NextRequest, ctx: RouteCtx) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as { role?: string })?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }
  const { id } = await ctx.params;

  const body = (await req.json().catch(() => ({}))) as {
    professionalId?: string;
  };
  const professionalId = body.professionalId?.trim();
  if (!professionalId) {
    return NextResponse.json(
      { error: "professionalId is required" },
      { status: 400 },
    );
  }

  const matter = await prisma.proMatter.findUnique({ where: { id } });
  if (!matter) {
    return NextResponse.json({ error: "Matter not found" }, { status: 404 });
  }
  if (matter.status !== ProMatterStatus.AWAITING_PRO) {
    return NextResponse.json(
      { error: `Matter is ${matter.status}, not AWAITING_PRO` },
      { status: 409 },
    );
  }

  const pro = await prisma.professional.findUnique({
    where: { id: professionalId },
  });
  if (!pro) {
    return NextResponse.json(
      { error: "Professional not found" },
      { status: 404 },
    );
  }
  if (!pro.verifiedAt) {
    return NextResponse.json(
      { error: "Professional is not verified yet" },
      { status: 400 },
    );
  }
  if (!pro.acceptingNewMatters) {
    return NextResponse.json(
      { error: "Professional is not accepting new matters" },
      { status: 400 },
    );
  }
  if (
    pro.piPolicyExpiresAt &&
    pro.piPolicyExpiresAt.getTime() < Date.now()
  ) {
    return NextResponse.json(
      { error: "Professional's PI cover has expired" },
      { status: 400 },
    );
  }

  const updated = await prisma.proMatter.update({
    where: { id },
    data: {
      acceptedByProId: pro.id,
      acceptedAt: new Date(),
      // ACCEPTED is the existing enum value for "a pro is on it" — the
      // chunk calls this "ASSIGNED".
      status: ProMatterStatus.ACCEPTED,
    },
  });

  return NextResponse.json({ matter: updated, action: "assigned" });
}
