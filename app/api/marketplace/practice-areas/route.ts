import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/marketplace/practice-areas?jurisdiction=NZ&domain=LAW
// Public: returns active practice areas, optionally filtered.
export async function GET(req: NextRequest) {
  const jurisdiction = req.nextUrl.searchParams.get("jurisdiction") ?? undefined;
  const domain = req.nextUrl.searchParams.get("domain") ?? undefined;

  const areas = await prisma.practiceArea.findMany({
    where: {
      active: true,
      ...(jurisdiction ? { jurisdiction } : {}),
      ...(domain === "LAW" || domain === "ACCOUNTING" ? { domain } : {}),
    },
    orderBy: [{ priority: "desc" }, { name: "asc" }],
    select: {
      id: true,
      slug: true,
      name: true,
      domain: true,
      jurisdiction: true,
      summary: true,
      intakeCopy: true,
      leadFeeInCents: true,
      currency: true,
      ackVersion: true,
      ackBullets: true,
    },
  });

  return NextResponse.json({ areas });
}
