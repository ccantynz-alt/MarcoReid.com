import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/marketplace/professionals
 *
 * Admin-only. Lists verified professionals available for assignment.
 * Supports ?practiceAreaId= and ?jurisdiction= filters so the admin
 * assignment UI can narrow to suitable pros.
 */
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as { role?: string })?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const practiceAreaId = req.nextUrl.searchParams.get("practiceAreaId");
  const jurisdiction = req.nextUrl.searchParams.get("jurisdiction");

  const professionals = await prisma.professional.findMany({
    where: {
      verifiedAt: { not: null },
      acceptingNewMatters: true,
      ...(jurisdiction ? { admissionJurisdiction: jurisdiction } : {}),
      ...(practiceAreaId
        ? {
            practiceAreas: {
              some: { practiceAreaId },
            },
          }
        : {}),
    },
    select: {
      id: true,
      displayName: true,
      admissionJurisdiction: true,
      professionalBody: true,
      piPolicyExpiresAt: true,
      practiceAreas: {
        select: {
          practiceArea: { select: { id: true, name: true } },
        },
      },
    },
    orderBy: { displayName: "asc" },
  });

  // Drop pros whose PI cover has lapsed — they cannot accept work.
  const now = Date.now();
  const eligible = professionals.filter(
    (p) => !p.piPolicyExpiresAt || p.piPolicyExpiresAt.getTime() >= now,
  );

  return NextResponse.json({ professionals: eligible });
}
