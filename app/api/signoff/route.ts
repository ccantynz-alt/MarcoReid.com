import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { SignoffStatus } from "@prisma/client";

/**
 * GET /api/signoff
 *
 * Returns SignoffRequest rows assigned to the current Professional.
 * Optional ?status=PENDING|APPROVED|REJECTED|AMENDED filter (default
 * PENDING) and ordered by requestedAt ascending so the oldest review
 * surfaces first.
 */
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const professional = await prisma.professional.findUnique({
    where: { userId },
    select: { id: true, verifiedAt: true },
  });
  if (!professional) {
    return NextResponse.json({ signoffs: [], professional: null });
  }

  const statusParam = req.nextUrl.searchParams.get("status");
  const status =
    statusParam &&
    (Object.values(SignoffStatus) as string[]).includes(statusParam)
      ? (statusParam as SignoffStatus)
      : SignoffStatus.PENDING;

  // Reviewer is set when the pro acts. Until then, surface any signoff
  // belonging to a matter accepted by this pro.
  const signoffs = await prisma.signoffRequest.findMany({
    where: {
      status,
      OR: [
        { reviewerId: professional.id },
        { proMatter: { acceptedByProId: professional.id } },
      ],
    },
    include: {
      proMatter: {
        select: {
          id: true,
          summary: true,
          jurisdiction: true,
          practiceArea: { select: { id: true, name: true } },
          citizen: { select: { name: true, email: true } },
        },
      },
    },
    orderBy: { requestedAt: "asc" },
  });

  return NextResponse.json({
    signoffs,
    professional: { id: professional.id, verifiedAt: professional.verifiedAt },
  });
}
