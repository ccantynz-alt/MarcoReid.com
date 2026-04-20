import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";
import { ProMatterStatus } from "@prisma/client";

// DELETE /api/marketplace/matters/:id — citizen cancels their own matter.
// Only permitted before a pro has accepted. Once accepted, the matter
// must run its course or be closed through a separate workflow.
// Uses updateMany guarded on status so a race with a pro's accept call
// can't leave a ghosted matter behind.
export async function DELETE(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const matter = await prisma.proMatter.findUnique({
    where: { id },
    select: { id: true, citizenUserId: true, status: true },
  });
  if (!matter) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (matter.citizenUserId !== userId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  if (
    matter.status !== ProMatterStatus.DRAFT &&
    matter.status !== ProMatterStatus.AWAITING_PRO
  ) {
    return NextResponse.json(
      { error: "This matter has been accepted and cannot be cancelled from here" },
      { status: 409 },
    );
  }

  const result = await prisma.proMatter.updateMany({
    where: {
      id: matter.id,
      status: { in: [ProMatterStatus.DRAFT, ProMatterStatus.AWAITING_PRO] },
    },
    data: {
      status: ProMatterStatus.CANCELLED,
      closedAt: new Date(),
    },
  });

  if (result.count === 0) {
    return NextResponse.json(
      { error: "Matter has already been accepted and cannot be cancelled" },
      { status: 409 },
    );
  }

  return NextResponse.json({ ok: true });
}
