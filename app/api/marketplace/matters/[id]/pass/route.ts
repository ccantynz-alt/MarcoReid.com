import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";
import { ProMatterStatus } from "@prisma/client";

// POST /api/marketplace/matters/:id/pass
// A pro explicitly passes on a matter. Currently this is a soft no-op
// (we don't persist per-pro passes yet) — returns 204 to dismiss from
// the dashboard client-side until a proper pass record is modelled.
export async function POST(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const pro = await prisma.professional.findUnique({
    where: { userId },
    select: { id: true },
  });
  if (!pro) return NextResponse.json({ error: "Not a professional" }, { status: 403 });

  const matter = await prisma.proMatter.findUnique({
    where: { id },
    select: { status: true },
  });
  if (!matter) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (matter.status !== ProMatterStatus.AWAITING_PRO) {
    return NextResponse.json({ error: "Matter not available" }, { status: 409 });
  }

  return NextResponse.json({ ok: true });
}
