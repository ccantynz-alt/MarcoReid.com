import { NextResponse } from "next/server";
import { createHash } from "node:crypto";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";
import { ProMatterStatus } from "@prisma/client";

// POST /api/marketplace/matters/:id/signoff
// Accepted pro submits an AI-drafted output for sign-off. The outputSha256
// is the tamper-evidence hash; if the output is altered after release,
// re-hashing reveals the mismatch. Moves the matter to AWAITING_SIGNOFF.
export async function POST(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const pro = await prisma.professional.findUnique({
    where: { userId },
    select: { id: true },
  });
  if (!pro) return NextResponse.json({ error: "Not a professional" }, { status: 403 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const { kind, aiOutput, rationale } = (body ?? {}) as {
    kind?: string;
    aiOutput?: string;
    rationale?: string;
  };
  if (!kind || !aiOutput) {
    return NextResponse.json({ error: "kind and aiOutput required" }, { status: 400 });
  }
  if (aiOutput.length > 50_000) {
    return NextResponse.json({ error: "aiOutput too long" }, { status: 400 });
  }

  const matter = await prisma.proMatter.findUnique({
    where: { id },
    select: { id: true, acceptedByProId: true, status: true },
  });
  if (!matter) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (matter.acceptedByProId !== pro.id) {
    return NextResponse.json({ error: "Not your matter" }, { status: 403 });
  }
  if (
    matter.status !== ProMatterStatus.ACCEPTED &&
    matter.status !== ProMatterStatus.AWAITING_SIGNOFF
  ) {
    return NextResponse.json(
      { error: `Matter status ${matter.status} — cannot create sign-off request` },
      { status: 409 },
    );
  }

  const outputSha256 = createHash("sha256").update(aiOutput, "utf8").digest("hex");

  const [signoff] = await prisma.$transaction([
    prisma.signoffRequest.create({
      data: {
        proMatterId: matter.id,
        kind,
        aiOutput,
        outputSha256,
        rationale: rationale || null,
      },
    }),
    prisma.proMatter.update({
      where: { id: matter.id },
      data: { status: ProMatterStatus.AWAITING_SIGNOFF },
    }),
  ]);

  return NextResponse.json({ signoff }, { status: 201 });
}
