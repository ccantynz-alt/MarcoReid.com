import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

/**
 * POST /api/professional/onboard
 *
 * Creates a Professional row tied to the current authenticated User. Always
 * lands with verifiedAt = null — an admin must approve via the verification
 * queue before this professional appears in citizen matching.
 *
 * Sign-off doctrine: a Professional's whole purpose is to be the licensed
 * human who reviews and signs off every AI output before it touches a
 * consumer. So onboarding captures admission + PI insurance up-front.
 */
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const displayName = (body.displayName as string | undefined)?.trim();
  const admissionJurisdiction = (
    body.admissionJurisdiction as string | undefined
  )?.trim();
  const admissionNumber = (body.admissionNumber as string | undefined)?.trim();
  const professionalBody = (body.professionalBody as string | undefined)?.trim();
  const bio = (body.bio as string | undefined)?.trim() || null;
  const piInsurerName =
    (body.piInsurerName as string | undefined)?.trim() || null;
  const piPolicyNumber =
    (body.piPolicyNumber as string | undefined)?.trim() || null;
  const piPolicyExpiresAtRaw = body.piPolicyExpiresAt as string | undefined;
  const admissionYearRaw = body.admissionYear;
  const practiceAreaIds = Array.isArray(body.practiceAreaIds)
    ? (body.practiceAreaIds as unknown[]).filter(
        (v): v is string => typeof v === "string",
      )
    : [];

  if (
    !displayName ||
    !admissionJurisdiction ||
    !admissionNumber ||
    !professionalBody
  ) {
    return NextResponse.json(
      {
        error:
          "displayName, admissionJurisdiction, admissionNumber and professionalBody are required",
      },
      { status: 400 },
    );
  }

  const piPolicyExpiresAt = piPolicyExpiresAtRaw
    ? new Date(piPolicyExpiresAtRaw)
    : null;
  if (piPolicyExpiresAt && Number.isNaN(piPolicyExpiresAt.getTime())) {
    return NextResponse.json(
      { error: "piPolicyExpiresAt is not a valid date" },
      { status: 400 },
    );
  }

  const admissionYear =
    typeof admissionYearRaw === "number"
      ? admissionYearRaw
      : typeof admissionYearRaw === "string" && admissionYearRaw.trim()
        ? Number.parseInt(admissionYearRaw, 10)
        : null;

  // Pro is 1:1 with User. If they already started onboarding once, update
  // the existing draft rather than creating a duplicate.
  const existing = await prisma.professional.findUnique({ where: { userId } });
  try {
    const professional = await prisma.$transaction(async (tx) => {
      const pro = existing
        ? await tx.professional.update({
            where: { userId },
            data: {
              displayName,
              admissionJurisdiction,
              admissionNumber,
              admissionYear: admissionYear ?? undefined,
              professionalBody,
              bio,
              piInsurerName,
              piPolicyNumber,
              piPolicyExpiresAt,
              // re-onboarding wipes any prior verification so it goes back
              // through the queue
              verifiedAt: null,
              verifiedBy: null,
            },
          })
        : await tx.professional.create({
            data: {
              userId,
              displayName,
              admissionJurisdiction,
              admissionNumber,
              admissionYear: admissionYear ?? undefined,
              professionalBody,
              bio,
              piInsurerName,
              piPolicyNumber,
              piPolicyExpiresAt,
            },
          });

      // Replace practice-area links wholesale.
      await tx.professionalPracticeArea.deleteMany({
        where: { professionalId: pro.id },
      });
      if (practiceAreaIds.length) {
        await tx.professionalPracticeArea.createMany({
          data: practiceAreaIds.map((practiceAreaId) => ({
            professionalId: pro.id,
            practiceAreaId,
          })),
          skipDuplicates: true,
        });
      }
      return pro;
    });

    return NextResponse.json(
      { professional, status: "submitted_for_verification" },
      { status: 201 },
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
