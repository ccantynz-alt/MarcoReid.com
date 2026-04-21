import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";
import { MatterAddonKind, ProMatterStatus } from "@prisma/client";
import { MATTER_LIMITS } from "@/lib/marketplace/constants";
import { startLeadFeeCheckoutForMatter } from "@/lib/marketplace/lead-fee";
import { parseAddonKinds, priceForAddon } from "@/lib/marketplace/addons";

export async function GET() {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const matters = await prisma.proMatter.findMany({
    where: { citizenUserId: userId },
    include: {
      practiceArea: { select: { slug: true, name: true, domain: true, jurisdiction: true } },
      acceptedBy: { select: { displayName: true, professionalBody: true } },
    },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ matters });
}

export async function POST(req: NextRequest) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { practiceAreaSlug, summary, details, ackVersion, post, addons } = (body ?? {}) as {
    practiceAreaSlug?: string;
    summary?: string;
    details?: string;
    ackVersion?: string;
    post?: boolean;
    addons?: unknown[];
  };

  const addonKinds: MatterAddonKind[] = parseAddonKinds(addons);

  if (!practiceAreaSlug || !summary || !details) {
    return NextResponse.json(
      { error: "practiceAreaSlug, summary, and details are required" },
      { status: 400 },
    );
  }
  if (summary.length > MATTER_LIMITS.SUMMARY_MAX) {
    return NextResponse.json(
      { error: `Summary must be ${MATTER_LIMITS.SUMMARY_MAX} characters or fewer` },
      { status: 400 },
    );
  }
  if (details.length < MATTER_LIMITS.DETAILS_MIN) {
    return NextResponse.json(
      { error: `Details must be at least ${MATTER_LIMITS.DETAILS_MIN} characters` },
      { status: 400 },
    );
  }
  if (details.length > MATTER_LIMITS.DETAILS_MAX) {
    return NextResponse.json(
      { error: `Details must be ${MATTER_LIMITS.DETAILS_MAX} characters or fewer` },
      { status: 400 },
    );
  }

  const area = await prisma.practiceArea.findUnique({ where: { slug: practiceAreaSlug } });
  if (!area || !area.active) {
    return NextResponse.json({ error: "Practice area not available" }, { status: 400 });
  }

  if (post && !ackVersion) {
    return NextResponse.json(
      { error: "Per-area acknowledgment is required before posting" },
      { status: 400 },
    );
  }
  if (post && ackVersion !== area.ackVersion) {
    return NextResponse.json(
      { error: "Acknowledgment version is out of date — please re-read and re-acknowledge" },
      { status: 409 },
    );
  }

  const now = new Date();
  const status = post ? ProMatterStatus.AWAITING_PAYMENT : ProMatterStatus.DRAFT;

  const matter = await prisma.proMatter.create({
    data: {
      citizenUserId: userId,
      practiceAreaId: area.id,
      jurisdiction: area.jurisdiction,
      summary,
      details,
      status,
      leadFeeInCents: area.leadFeeInCents,
      currency: area.currency,
      ackVersion: post ? area.ackVersion : null,
      ackAt: post ? now : null,
      postedAt: post ? now : null,
      addons: post
        ? {
            create: addonKinds.map((kind) => {
              const price = priceForAddon(area.jurisdiction, kind);
              return {
                kind,
                priceCents: price.cents,
                currency: area.currency,
              };
            }),
          }
        : undefined,
    },
  });

  if (post) {
    const { url } = await startLeadFeeCheckoutForMatter({
      matterId: matter.id,
      citizenUserId: userId,
      amountCents: area.leadFeeInCents,
      currency: area.currency,
      areaName: area.name,
      jurisdiction: area.jurisdiction,
      addons: addonKinds,
    });
    return NextResponse.json({ matter, checkoutUrl: url }, { status: 201 });
  }

  return NextResponse.json({ matter }, { status: 201 });
}
