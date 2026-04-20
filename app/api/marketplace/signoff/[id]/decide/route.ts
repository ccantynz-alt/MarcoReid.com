import { NextResponse } from "next/server";
import { createHash } from "node:crypto";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";
import { ProMatterStatus, SignoffStatus } from "@prisma/client";
import { notifyCitizenOfRelease } from "@/lib/marketplace/notifications";

// POST /api/marketplace/signoff/:id/decide
// Body: { decision: "approve" | "amend" | "reject", amendedOutput?, reviewerNotes? }
//
// - approve: status = APPROVED, matter = SIGNED_OFF, releasedAt = now.
// - amend:   status = AMENDED,  matter = SIGNED_OFF, releasedAt = now;
//            amendedSha256 captured. The original aiOutput + outputSha256
//            remain for audit.
// - reject:  status = REJECTED, matter stays ACCEPTED so the pro can
//            draft a new sign-off request.
export async function POST(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const pro = await prisma.professional.findUnique({
    where: { userId },
    select: { id: true, verifiedAt: true },
  });
  if (!pro) return NextResponse.json({ error: "Not a professional" }, { status: 403 });
  if (!pro.verifiedAt) {
    return NextResponse.json({ error: "Your account is pending verification" }, { status: 403 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { decision, amendedOutput, reviewerNotes } = (body ?? {}) as {
    decision?: "approve" | "amend" | "reject";
    amendedOutput?: string;
    reviewerNotes?: string;
  };

  if (decision !== "approve" && decision !== "amend" && decision !== "reject") {
    return NextResponse.json({ error: "Invalid decision" }, { status: 400 });
  }

  const signoff = await prisma.signoffRequest.findUnique({
    where: { id },
    include: {
      proMatter: { select: { id: true, acceptedByProId: true, status: true } },
    },
  });
  if (!signoff) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (signoff.proMatter.acceptedByProId !== pro.id) {
    return NextResponse.json({ error: "Not your matter" }, { status: 403 });
  }
  if (signoff.status !== SignoffStatus.PENDING) {
    return NextResponse.json({ error: "Already decided" }, { status: 409 });
  }

  if (decision === "reject" && (!reviewerNotes || reviewerNotes.trim().length < 10)) {
    return NextResponse.json({ error: "Rejection requires notes (10+ chars)" }, { status: 400 });
  }
  if (decision === "amend") {
    if (!amendedOutput || amendedOutput.length < 10) {
      return NextResponse.json({ error: "Amended output is required" }, { status: 400 });
    }
    if (amendedOutput.length > 50_000) {
      return NextResponse.json({ error: "Amended output too long" }, { status: 400 });
    }
  }

  const now = new Date();

  if (decision === "approve") {
    await prisma.$transaction([
      prisma.signoffRequest.update({
        where: { id: signoff.id },
        data: {
          status: SignoffStatus.APPROVED,
          reviewerId: pro.id,
          reviewerNotes: reviewerNotes || null,
          reviewedAt: now,
          releasedAt: now,
        },
      }),
      prisma.proMatter.update({
        where: { id: signoff.proMatterId },
        data: { status: ProMatterStatus.SIGNED_OFF },
      }),
    ]);
    notifyCitizenOfRelease(signoff.id).catch((err) => {
      console.error("[marketplace] notifyCitizenOfRelease dispatch failed:", err);
    });
    return NextResponse.json({ ok: true, decision });
  }

  if (decision === "amend") {
    const amendedSha256 = createHash("sha256")
      .update(amendedOutput!, "utf8")
      .digest("hex");
    await prisma.$transaction([
      prisma.signoffRequest.update({
        where: { id: signoff.id },
        data: {
          status: SignoffStatus.AMENDED,
          reviewerId: pro.id,
          reviewerNotes: reviewerNotes || null,
          amendedOutput,
          amendedSha256,
          reviewedAt: now,
          releasedAt: now,
        },
      }),
      prisma.proMatter.update({
        where: { id: signoff.proMatterId },
        data: { status: ProMatterStatus.SIGNED_OFF },
      }),
    ]);
    notifyCitizenOfRelease(signoff.id).catch((err) => {
      console.error("[marketplace] notifyCitizenOfRelease dispatch failed:", err);
    });
    return NextResponse.json({ ok: true, decision });
  }

  // reject
  await prisma.$transaction([
    prisma.signoffRequest.update({
      where: { id: signoff.id },
      data: {
        status: SignoffStatus.REJECTED,
        reviewerId: pro.id,
        reviewerNotes: reviewerNotes!,
        reviewedAt: now,
      },
    }),
    prisma.proMatter.update({
      where: { id: signoff.proMatterId },
      data: { status: ProMatterStatus.ACCEPTED },
    }),
  ]);
  return NextResponse.json({ ok: true, decision });
}
