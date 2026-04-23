import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { approveSignoff, authorizeSignoffActor } from "@/lib/signoff-actions";

interface RouteCtx {
  params: Promise<{ id: string }>;
}

export async function POST(req: NextRequest, ctx: RouteCtx) {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await ctx.params;

  const auth = await authorizeSignoffActor(id, userId);
  if ("error" in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const body = (await req.json().catch(() => ({}))) as { notes?: string };

  const updated = await approveSignoff({
    signoffId: id,
    actor: auth.actor,
    notes: body.notes ?? null,
  });

  return NextResponse.json({ signoff: updated, action: "approved" });
}
