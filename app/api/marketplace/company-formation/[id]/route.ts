import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";
import { ProMatterStatus } from "@prisma/client";
import type { FormationIntakeInput } from "@/lib/marketplace/company-formation/types";

// PATCH /api/marketplace/company-formation/:id
// Updates the structured intake. Only allowed while the matter is DRAFT —
// once posted the pack is what a pro is reviewing and changes must go
// through the amendment flow.
export async function PATCH(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: Partial<FormationIntakeInput>;
  try {
    body = (await req.json()) as Partial<FormationIntakeInput>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const matter = await prisma.proMatter.findUnique({
    where: { id },
    select: { id: true, citizenUserId: true, status: true },
  });
  if (!matter) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (matter.citizenUserId !== userId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  if (matter.status !== ProMatterStatus.DRAFT) {
    return NextResponse.json({ error: "Only drafts can be edited" }, { status: 409 });
  }

  await prisma.companyFormationIntake.update({
    where: { proMatterId: matter.id },
    data: {
      proposedName: body.proposedName ?? undefined,
      alternateName: body.alternateName ?? undefined,
      purpose: body.purpose ?? undefined,
      industry: body.industry ?? undefined,
      foundersJson: body.founders ? (body.founders as object) : undefined,
      operatingCountries: body.operatingCountries ?? undefined,
      salesMarkets: body.salesMarkets ?? undefined,
      productType: body.productType ?? undefined,
      ipValue: body.ipValue ?? undefined,
      investorAppetite: body.investorAppetite ?? undefined,
      assetProtectionLevel: body.assetProtectionLevel ?? undefined,
      expectedAnnualRevenueCents: body.expectedAnnualRevenueCents ?? undefined,
      willHaveEmployees: body.willHaveEmployees ?? undefined,
      willTakeInvestment: body.willTakeInvestment ?? undefined,
      isNonProfit: body.isNonProfit ?? undefined,
      registeredOffice: body.registeredOffice ?? undefined,
    },
  });

  if (body.proposedName || body.purpose) {
    await prisma.proMatter.update({
      where: { id: matter.id },
      data: {
        summary: (body.proposedName?.trim() || "Company formation intake").slice(0, 200),
        details: (body.purpose ?? "").slice(0, 8000) || undefined,
      },
    });
  }

  return NextResponse.json({ ok: true });
}
