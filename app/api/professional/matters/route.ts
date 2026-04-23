import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/professional/matters
 *
 * Returns the matters assigned to the currently authenticated
 * Professional. Used by the /professional/matters dashboard.
 */
export async function GET() {
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
    return NextResponse.json(
      { matters: [], professional: null, status: "no_profile" },
      { status: 200 },
    );
  }

  const matters = await prisma.proMatter.findMany({
    where: { acceptedByProId: professional.id },
    include: {
      practiceArea: { select: { id: true, name: true, jurisdiction: true } },
      citizen: { select: { name: true, email: true } },
      signoffRequests: {
        select: { id: true, status: true, requestedAt: true },
        orderBy: { requestedAt: "desc" },
      },
    },
    orderBy: { acceptedAt: "desc" },
  });

  return NextResponse.json({
    matters,
    professional: { id: professional.id, verifiedAt: professional.verifiedAt },
  });
}
