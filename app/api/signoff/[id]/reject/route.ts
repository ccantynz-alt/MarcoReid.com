import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { rejectSignoff, authorizeSignoffActor } from "@/lib/signoff-actions";

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

  const body = (await req.json().catch(() => ({}))) as { reason?: string };
  const reason = body.reason?.trim();
  if (!reason) {
    return NextResponse.json(
      { error: "Reason is required for rejection." },
      { status: 400 },
    );
  }

  const auth = await authorizeSignoffActor(id, userId);
  if ("error" in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const updated = await rejectSignoff({
    signoffId: id,
    actor: auth.actor,
    reason,
  });

  return NextResponse.json({ signoff: updated, action: "rejected" });
}
