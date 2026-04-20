import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";

// POST /api/marketplace/professional
// Creates a Professional profile for the current user. Pro is NOT verified
// by this call — an admin must set verifiedAt via the admin verification
// screen before the pro can accept matters.
export async function POST(req: Request) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const existing = await prisma.professional.findUnique({ where: { userId } });
  if (existing) {
    return NextResponse.json(
      { error: "A professional profile already exists for this user" },
      { status: 409 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const {
    displayName,
    bio,
    admissionJurisdiction,
    admissionNumber,
    admissionYear,
    professionalBody,
    piInsurerName,
    piPolicyNumber,
    piPolicyExpiresAt,
    practiceAreaSlugs,
  } = (body ?? {}) as {
    displayName?: string;
    bio?: string;
    admissionJurisdiction?: string;
    admissionNumber?: string;
    admissionYear?: number;
    professionalBody?: string;
    piInsurerName?: string;
    piPolicyNumber?: string;
    piPolicyExpiresAt?: string;
    practiceAreaSlugs?: string[];
  };

  if (!displayName || !admissionJurisdiction || !admissionNumber || !professionalBody) {
    return NextResponse.json(
      { error: "displayName, admissionJurisdiction, admissionNumber, and professionalBody are required" },
      { status: 400 },
    );
  }
  if (!["NZ", "AU"].includes(admissionJurisdiction)) {
    return NextResponse.json(
      { error: "Only NZ and AU admissions are accepted at this stage" },
      { status: 400 },
    );
  }

  const selectedAreas = Array.isArray(practiceAreaSlugs) && practiceAreaSlugs.length > 0
    ? await prisma.practiceArea.findMany({
        where: { slug: { in: practiceAreaSlugs }, active: true },
        select: { id: true, jurisdiction: true },
      })
    : [];

  // Areas must all match the pro's admission jurisdiction — a NZ-admitted
  // lawyer cannot claim AU practice areas.
  const badJurisdiction = selectedAreas.find((a) => a.jurisdiction !== admissionJurisdiction);
  if (badJurisdiction) {
    return NextResponse.json(
      { error: "Practice areas must match your admission jurisdiction" },
      { status: 400 },
    );
  }

  let piExpires: Date | null = null;
  if (piPolicyExpiresAt) {
    const parsed = new Date(piPolicyExpiresAt);
    if (isNaN(parsed.getTime())) {
      return NextResponse.json({ error: "Invalid piPolicyExpiresAt" }, { status: 400 });
    }
    piExpires = parsed;
  }

  const pro = await prisma.professional.create({
    data: {
      userId,
      displayName,
      bio: bio || null,
      admissionJurisdiction,
      admissionNumber,
      admissionYear: admissionYear ?? null,
      professionalBody,
      piInsurerName: piInsurerName || null,
      piPolicyNumber: piPolicyNumber || null,
      piPolicyExpiresAt: piExpires,
      practiceAreas: {
        create: selectedAreas.map((a) => ({ practiceAreaId: a.id })),
      },
    },
  });

  return NextResponse.json({ pro }, { status: 201 });
}
