import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";
import { ProMatterStatus } from "@prisma/client";
import { renderFormationPack, hashPack } from "@/lib/marketplace/company-formation/pack";
import type {
  FormationIntakeInput,
  FounderInput,
  StructurePlan,
} from "@/lib/marketplace/company-formation/types";

// POST /api/marketplace/company-formation/:id/draft-pack
// Renders the markdown formation pack from the saved intake + structure
// plan and stores it alongside a sha256 fingerprint so downstream copies
// are tamper-evident. Requires `recommend` to have been run first.
export async function POST(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const matter = await prisma.proMatter.findUnique({
    where: { id },
    select: {
      id: true,
      citizenUserId: true,
      status: true,
      companyFormation: true,
    },
  });
  if (!matter) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (matter.citizenUserId !== userId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  if (matter.status !== ProMatterStatus.DRAFT) {
    return NextResponse.json({ error: "Only drafts can be re-packed" }, { status: 409 });
  }
  if (!matter.companyFormation) {
    return NextResponse.json({ error: "No formation intake on this matter" }, { status: 400 });
  }

  const i = matter.companyFormation;
  if (!i.structurePlan || !i.recommendationRationale) {
    return NextResponse.json(
      { error: "Run /recommend before drafting the pack" },
      { status: 409 },
    );
  }
  if (i.homeJurisdiction !== "NZ" && i.homeJurisdiction !== "AU") {
    return NextResponse.json({ error: "Unsupported home jurisdiction" }, { status: 400 });
  }

  const input: FormationIntakeInput = {
    homeJurisdiction: i.homeJurisdiction as "NZ" | "AU",
    proposedName: i.proposedName ?? undefined,
    alternateName: i.alternateName ?? undefined,
    purpose: i.purpose,
    industry: i.industry ?? undefined,
    founders: (i.foundersJson as unknown as FounderInput[]) ?? [],
    operatingCountries: i.operatingCountries,
    salesMarkets: i.salesMarkets,
    productType: i.productType as FormationIntakeInput["productType"],
    ipValue: i.ipValue as FormationIntakeInput["ipValue"],
    investorAppetite: i.investorAppetite as FormationIntakeInput["investorAppetite"],
    assetProtectionLevel: i.assetProtectionLevel as FormationIntakeInput["assetProtectionLevel"],
    expectedAnnualRevenueCents: i.expectedAnnualRevenueCents ?? undefined,
    willHaveEmployees: i.willHaveEmployees,
    willTakeInvestment: i.willTakeInvestment,
    isNonProfit: i.isNonProfit,
    registeredOffice: i.registeredOffice ?? undefined,
  };

  const plan = i.structurePlan as unknown as StructurePlan;
  const pack = renderFormationPack(input, plan, i.recommendationRationale);
  const sha = await hashPack(pack);

  await prisma.companyFormationIntake.update({
    where: { proMatterId: matter.id },
    data: {
      draftPack: pack,
      draftPackSha256: sha,
      draftedAt: new Date(),
    },
  });

  return NextResponse.json({ pack, sha256: sha });
}
