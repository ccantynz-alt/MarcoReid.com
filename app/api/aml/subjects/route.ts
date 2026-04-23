import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";
import { startCdd, listSubjects } from "@/lib/aml/cdd";
import type { AmlJurisdiction } from "@prisma/client";

const ALLOWED_JURISDICTIONS: AmlJurisdiction[] = [
  "NZ_DIA",
  "AU_AUSTRAC",
  "UK_HMRC",
  "US_FINCEN",
];

export async function GET() {
  const userId = await getUserId();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // Single-user firms: the user's id is their firm id.
  const subjects = await listSubjects(userId);
  return NextResponse.json({ subjects });
}

export async function POST(req: NextRequest) {
  const userId = await getUserId();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const {
      jurisdiction,
      subjectType,
      legalName,
      preferredName,
      dateOfBirth,
      countryOfResidence,
      countryOfCitizenship,
      addressLine1,
      addressLine2,
      city,
      region,
      postalCode,
      country,
      entityType,
      entityRegistrationNumber,
      entityJurisdiction,
      matterId,
      clientId,
    } = body ?? {};

    if (!legalName || !subjectType || !jurisdiction) {
      return NextResponse.json(
        {
          error:
            "legalName, subjectType, and jurisdiction are required",
        },
        { status: 400 },
      );
    }
    if (!ALLOWED_JURISDICTIONS.includes(jurisdiction)) {
      return NextResponse.json(
        { error: "Invalid jurisdiction" },
        { status: 400 },
      );
    }
    if (subjectType !== "INDIVIDUAL" && subjectType !== "ENTITY") {
      return NextResponse.json(
        { error: "subjectType must be INDIVIDUAL or ENTITY" },
        { status: 400 },
      );
    }

    // Optional FK validation — keep noisy fail loud.
    if (matterId) {
      const m = await prisma.matter.findFirst({
        where: { id: matterId, userId },
      });
      if (!m)
        return NextResponse.json(
          { error: "matterId not found" },
          { status: 400 },
        );
    }
    if (clientId) {
      const c = await prisma.client.findFirst({
        where: { id: clientId, userId },
      });
      if (!c)
        return NextResponse.json(
          { error: "clientId not found" },
          { status: 400 },
        );
    }

    const subject = await startCdd({
      firmId: userId,
      jurisdiction,
      actorUserId: userId,
      subject: {
        matterId: matterId ?? null,
        clientId: clientId ?? null,
        subjectType,
        legalName,
        preferredName: preferredName ?? null,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        countryOfResidence: countryOfResidence ?? null,
        countryOfCitizenship: countryOfCitizenship ?? null,
        addressLine1: addressLine1 ?? null,
        addressLine2: addressLine2 ?? null,
        city: city ?? null,
        region: region ?? null,
        postalCode: postalCode ?? null,
        country: country ?? null,
        entityType: entityType ?? null,
        entityRegistrationNumber: entityRegistrationNumber ?? null,
        entityJurisdiction: entityJurisdiction ?? null,
      },
    });

    return NextResponse.json({ subject }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal error" },
      { status: 500 },
    );
  }
}
