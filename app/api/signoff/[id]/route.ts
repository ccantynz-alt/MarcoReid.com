import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

interface RouteCtx {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/signoff/[id]
 *
 * Detailed view of a single SignoffRequest. Restricted: caller must
 * either be the assigned reviewer or the Professional accepted on
 * the parent ProMatter.
 */
export async function GET(_req: NextRequest, ctx: RouteCtx) {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await ctx.params;

  const professional = await prisma.professional.findUnique({
    where: { userId },
    select: { id: true },
  });
  if (!professional) {
    return NextResponse.json({ error: "No pro profile" }, { status: 403 });
  }

  const signoff = await prisma.signoffRequest.findUnique({
    where: { id },
    include: {
      proMatter: {
        select: {
          id: true,
          summary: true,
          details: true,
          jurisdiction: true,
          acceptedByProId: true,
          practiceArea: { select: { id: true, name: true } },
          citizen: { select: { name: true, email: true } },
        },
      },
      auditEntries: { orderBy: { occurredAt: "asc" } },
    },
  });
  if (!signoff) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const isOwner =
    signoff.reviewerId === professional.id ||
    signoff.proMatter.acceptedByProId === professional.id;
  if (!isOwner) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return NextResponse.json({ signoff });
}
