import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const {
      firmName,
      jurisdiction,
      practiceArea,
      complete,
      // New fields
      userType,
      discipline,
      professionalBody,
      registrationNumber,
      admissionJurisdiction,
      bio,
      headline,
      firmDisplayName,
      hourlyRate,
      consumerNeeds,
      displayName,
    } = body ?? {};

    const userData: {
      firmName?: string | null;
      jurisdiction?: string | null;
      practiceArea?: string | null;
      onboardedAt?: Date;
    } = {};

    // Legacy fields — preserve existing behaviour
    if (typeof firmName === "string") userData.firmName = firmName.trim() || null;
    if (typeof jurisdiction === "string")
      userData.jurisdiction = jurisdiction.trim() || null;
    if (typeof practiceArea === "string")
      userData.practiceArea = practiceArea.trim() || null;

    // admissionJurisdiction maps to User.jurisdiction for professionals
    if (typeof admissionJurisdiction === "string" && admissionJurisdiction.trim())
      userData.jurisdiction = admissionJurisdiction.trim();

    // firmDisplayName maps to User.firmName
    if (typeof firmDisplayName === "string")
      userData.firmName = firmDisplayName.trim() || null;

    // Consumer jurisdiction
    if (userType === "CONSUMER" && typeof jurisdiction === "string" && jurisdiction.trim())
      userData.jurisdiction = jurisdiction.trim();

    if (complete === true) userData.onboardedAt = new Date();

    const user = await prisma.user.update({
      where: { id: userId },
      data: userData,
      select: {
        id: true,
        firmName: true,
        jurisdiction: true,
        practiceArea: true,
        onboardedAt: true,
        name: true,
      },
    });

    // Create or update the Professional record for professional accounts
    if (userType === "PROFESSIONAL") {
      const existingPro = await prisma.professional.findUnique({
        where: { userId },
        select: { id: true, slug: true },
      });

      const resolvedDisplayName =
        typeof displayName === "string" && displayName.trim()
          ? displayName.trim()
          : user.name ?? "Professional";

      const slug = existingPro?.slug ?? generateSlug(resolvedDisplayName, userId);

      // Derive discipline-based practiceArea for the User row
      if (typeof discipline === "string" && discipline.trim()) {
        const disciplinePracticeArea =
          discipline === "LEGAL"
            ? "legal"
            : discipline === "ACCOUNTING"
              ? "accounting"
              : "legal-accounting";
        await prisma.user.update({
          where: { id: userId },
          data: { practiceArea: disciplinePracticeArea },
        });
      }

      const proData: Parameters<typeof prisma.professional.upsert>[0]["create"] = {
        userId,
        displayName: resolvedDisplayName,
        slug,
        ...(typeof professionalBody === "string" && professionalBody.trim()
          ? { professionalBody: professionalBody.trim() }
          : {}),
        ...(typeof registrationNumber === "string" && registrationNumber.trim()
          ? {
              registrationNumber: registrationNumber.trim(),
              admissionNumber: registrationNumber.trim(),
            }
          : {}),
        ...(typeof admissionJurisdiction === "string" && admissionJurisdiction.trim()
          ? { admissionJurisdiction: admissionJurisdiction.trim(), jurisdiction: admissionJurisdiction.trim() }
          : {}),
        ...(typeof bio === "string" && bio.trim()
          ? { bio: bio.trim() }
          : {}),
        ...(typeof headline === "string" && headline.trim()
          ? { headline: headline.trim() }
          : {}),
        ...(typeof firmDisplayName === "string" && firmDisplayName.trim()
          ? { firmDisplayName: firmDisplayName.trim() }
          : {}),
        ...(typeof hourlyRate === "number" && hourlyRate > 0
          ? { hourlyRateCents: Math.round(hourlyRate * 100), hourlyRateCurrency: "USD" }
          : {}),
      };

      if (existingPro) {
        await prisma.professional.update({
          where: { userId },
          data: proData,
        });
      } else {
        await prisma.professional.create({ data: proData });
      }
    }

    return NextResponse.json({ user });
  } catch {
    return NextResponse.json(
      { error: "Could not update profile." },
      { status: 500 },
    );
  }
}

function generateSlug(displayName: string, userId: string): string {
  const base = displayName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40);
  const suffix = userId.slice(-6);
  return base ? `${base}-${suffix}` : `pro-${suffix}`;
}
