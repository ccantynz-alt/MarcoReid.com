import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";
import { ProMatterStatus } from "@prisma/client";
import { recommendStructure } from "@/lib/marketplace/company-formation/recommender";
import type {
  FormationIntakeInput,
  FounderInput,
} from "@/lib/marketplace/company-formation/types";

// POST /api/marketplace/company-formation/:id/recommend
// Runs the deterministic structure recommender against the saved intake
// and persists the resulting plan + rationale. Re-runnable while the
// matter is DRAFT — a later call overwrites the previous recommendation.
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
    return NextResponse.json({ error: "Only drafts can be recomputed" }, { status: 409 });
  }
  if (!matter.companyFormation) {
    return NextResponse.json({ error: "No formation intake on this matter" }, { status: 400 });
  }

  const i = matter.companyFormation;

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

  const { plan, rationale } = recommendStructure(input);

  await prisma.companyFormationIntake.update({
    where: { proMatterId: matter.id },
    data: {
      structurePlan: plan as unknown as object,
      recommendationRationale: rationale,
      recommendedAt: new Date(),
    },
  });

  return NextResponse.json({ plan, rationale });
}
