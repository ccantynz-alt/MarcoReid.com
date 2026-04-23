import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { amendSignoff, authorizeSignoffActor } from "@/lib/signoff-actions";

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

  const body = (await req.json().catch(() => ({}))) as {
    amendedOutput?: string;
    notes?: string;
  };
  const amendedOutput = body.amendedOutput?.trim();
  if (!amendedOutput) {
    return NextResponse.json(
      { error: "amendedOutput is required." },
      { status: 400 },
    );
  }

  const auth = await authorizeSignoffActor(id, userId);
  if ("error" in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const updated = await amendSignoff({
    signoffId: id,
    actor: auth.actor,
    amendedOutput,
    notes: body.notes ?? null,
  });

  return NextResponse.json({ signoff: updated, action: "amended" });
}
