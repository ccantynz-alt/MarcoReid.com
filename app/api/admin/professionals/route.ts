import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/admin/professionals?verified=false
 *
 * Admin-only. Lists Professional rows for the verification queue.
 * Default filters to unverified — that is what the queue exists for.
 */
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as { role?: string })?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const verifiedParam = req.nextUrl.searchParams.get("verified");
  const where =
    verifiedParam === "true"
      ? { verifiedAt: { not: null } }
      : verifiedParam === "all"
        ? {}
        : { verifiedAt: null };

  const professionals = await prisma.professional.findMany({
    where,
    include: {
      user: { select: { id: true, name: true, email: true } },
      practiceAreas: {
        include: {
          practiceArea: {
            select: { id: true, slug: true, name: true, jurisdiction: true },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ professionals });
}
