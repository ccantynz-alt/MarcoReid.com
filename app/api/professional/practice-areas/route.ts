import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/professional/practice-areas
 *
 * Returns the catalogue of active PracticeArea rows for the onboarding
 * multi-select. Public — no PII here, just the catalogue.
 */
export async function GET() {
  const areas = await prisma.practiceArea.findMany({
    where: { active: true },
    select: {
      id: true,
      slug: true,
      name: true,
      domain: true,
      jurisdiction: true,
      summary: true,
    },
    orderBy: [{ jurisdiction: "asc" }, { priority: "desc" }, { name: "asc" }],
  });
  return NextResponse.json({ practiceAreas: areas });
}
