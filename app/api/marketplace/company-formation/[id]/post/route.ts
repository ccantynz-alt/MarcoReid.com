import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";
import { ProMatterStatus, SignoffStatus } from "@prisma/client";
import { SIGNOFF_KINDS } from "@/lib/marketplace/constants";
import { startLeadFeeCheckoutForMatter } from "@/lib/marketplace/lead-fee";

// POST /api/marketplace/company-formation/:id/post
// Body: { ackVersion }
//
// Promotes a company-formation matter from DRAFT to AWAITING_PRO and
// seeds a PENDING SignoffRequest with the drafted pack so whoever
// accepts the matter opens straight into a review, not a blank doc.
// Requires /recommend and /draft-pack to have been run first.
export async function POST(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: { ackVersion?: string };
  try {
    body = (await req.json()) as { ackVersion?: string };
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const ackVersion = body.ackVersion;
  if (!ackVersion) {
    return NextResponse.json(
      { error: "Per-area acknowledgment is required before posting" },
      { status: 400 },
    );
  }

  const matter = await prisma.proMatter.findUnique({
    where: { id },
    select: {
      id: true,
      citizenUserId: true,
      status: true,
      leadFeeInCents: true,
      currency: true,
      jurisdiction: true,
      practiceArea: { select: { ackVersion: true, name: true } },
      companyFormation: {
        select: {
          draftPack: true,
          draftPackSha256: true,
          recommendationRationale: true,
        },
      },
    },
  });
  if (!matter) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (matter.citizenUserId !== userId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  if (matter.status !== ProMatterStatus.DRAFT) {
    return NextResponse.json({ error: "Only drafts can be posted" }, { status: 409 });
  }
  if (ackVersion !== matter.practiceArea.ackVersion) {
    return NextResponse.json(
      { error: "Acknowledgment version is out of date — please re-read and re-acknowledge" },
      { status: 409 },
    );
  }
  const cf = matter.companyFormation;
  if (!cf?.draftPack || !cf.draftPackSha256) {
    return NextResponse.json(
      { error: "Draft the formation pack before posting" },
      { status: 409 },
    );
  }

  const now = new Date();
  const promoted = await prisma.proMatter.updateMany({
    where: { id: matter.id, status: ProMatterStatus.DRAFT },
    data: {
      status: ProMatterStatus.AWAITING_PAYMENT,
      ackVersion,
      ackAt: now,
      postedAt: now,
    },
  });
  if (promoted.count === 0) {
    return NextResponse.json({ error: "Matter is no longer a draft" }, { status: 409 });
  }

  await prisma.signoffRequest.create({
    data: {
      proMatterId: matter.id,
      kind: SIGNOFF_KINDS.COMPANY_FORMATION_PACK,
      aiOutput: cf.draftPack,
      outputSha256: cf.draftPackSha256,
      rationale: cf.recommendationRationale ?? null,
      status: SignoffStatus.PENDING,
    },
  });

  const { url } = await startLeadFeeCheckoutForMatter({
    matterId: matter.id,
    citizenUserId: userId,
    amountCents: matter.leadFeeInCents,
    currency: matter.currency,
    areaName: matter.practiceArea.name,
    jurisdiction: matter.jurisdiction,
  });

  return NextResponse.json({ ok: true, checkoutUrl: url });
}
