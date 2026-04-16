import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";

// POST /api/me/firm
// Updates the firm associated with the authenticated user.
//
// The current schema only stores `firmName` on the User model. A first-class
// Firm model would add: size, street, city, region, postalCode, country,
// website, phone, logoUrl, defaultRateCents, and a many-to-many on practice
// areas (or a JSON column). For now we persist firmName and accept the rest,
// logging them server-side so the client UX is correct.
export async function POST(req: NextRequest) {
  const userId = await getUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const {
    firmName,
    firmSize,
    street,
    city,
    region,
    postalCode,
    country,
    website,
    phone,
    practiceAreas,
    defaultRateCents,
  } = body;

  if (firmName !== undefined && typeof firmName !== "string") {
    return NextResponse.json(
      { error: "firmName must be a string" },
      { status: 400 }
    );
  }
  if (
    defaultRateCents !== undefined &&
    (typeof defaultRateCents !== "number" || !Number.isFinite(defaultRateCents))
  ) {
    return NextResponse.json(
      { error: "defaultRateCents must be a number" },
      { status: 400 }
    );
  }
  if (
    practiceAreas !== undefined &&
    (!Array.isArray(practiceAreas) ||
      practiceAreas.some((p) => typeof p !== "string"))
  ) {
    return NextResponse.json(
      { error: "practiceAreas must be a string array" },
      { status: 400 }
    );
  }

  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(typeof firmName === "string"
          ? { firmName: firmName.trim() || null }
          : {}),
        // TODO: persist firmSize / address / website / phone / practiceAreas
        // / defaultRateCents once the Firm model exists.
      },
      select: { id: true, firmName: true },
    });

    console.log("[settings/firm] pending-schema fields", {
      userId,
      firmSize,
      street,
      city,
      region,
      postalCode,
      country,
      website,
      phone,
      practiceAreas,
      defaultRateCents,
    });

    return NextResponse.json({ user });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
