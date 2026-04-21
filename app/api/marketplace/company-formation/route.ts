import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";
import { ProMatterStatus } from "@prisma/client";
import type { FormationIntakeInput } from "@/lib/marketplace/company-formation/types";

// POST /api/marketplace/company-formation
// Kicks off a company-formation intake. Creates the DRAFT ProMatter and
// the attached CompanyFormationIntake in one transaction so the two
// rows are never out of sync.
export async function POST(req: NextRequest) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: Partial<FormationIntakeInput>;
  try {
    body = (await req.json()) as Partial<FormationIntakeInput>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const homeJurisdiction = body.homeJurisdiction;
  if (homeJurisdiction !== "NZ" && homeJurisdiction !== "AU") {
    return NextResponse.json(
      { error: "homeJurisdiction must be NZ or AU" },
      { status: 400 },
    );
  }

  const slug = homeJurisdiction === "NZ" ? "nz-company-formation" : "au-company-formation";
  const area = await prisma.practiceArea.findUnique({ where: { slug } });
  if (!area || !area.active) {
    return NextResponse.json({ error: "Company formation not available in your jurisdiction" }, { status: 400 });
  }

  const summary = (body.proposedName?.trim() || "Company formation intake").slice(0, 200);
  const details = (body.purpose?.trim() || "Company formation — details captured in the structured intake.").slice(0, 8000);

  const matter = await prisma.proMatter.create({
    data: {
      citizenUserId: userId,
      practiceAreaId: area.id,
      jurisdiction: area.jurisdiction,
      summary,
      details,
      status: ProMatterStatus.DRAFT,
      leadFeeInCents: area.leadFeeInCents,
      currency: area.currency,
      companyFormation: {
        create: {
          homeJurisdiction,
          proposedName: body.proposedName ?? null,
          alternateName: body.alternateName ?? null,
          purpose: body.purpose ?? "",
          industry: body.industry ?? null,
          foundersJson: (body.founders ?? []) as object,
          operatingCountries: body.operatingCountries ?? [homeJurisdiction],
          salesMarkets: body.salesMarkets ?? [homeJurisdiction],
          productType: body.productType ?? "MIXED",
          ipValue: body.ipValue ?? "LOW",
          investorAppetite: body.investorAppetite ?? "BOOTSTRAP",
          assetProtectionLevel: body.assetProtectionLevel ?? "STANDARD",
          expectedAnnualRevenueCents: body.expectedAnnualRevenueCents ?? null,
          willHaveEmployees: body.willHaveEmployees ?? false,
          willTakeInvestment: body.willTakeInvestment ?? false,
          isNonProfit: body.isNonProfit ?? false,
          registeredOffice: body.registeredOffice ?? null,
        },
      },
    },
    include: { companyFormation: true },
  });

  return NextResponse.json({ matter }, { status: 201 });
}
