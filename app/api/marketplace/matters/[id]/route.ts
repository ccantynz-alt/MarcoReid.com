import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";
import { ProMatterStatus } from "@prisma/client";
import { notifyMatchingProsOfNewMatter } from "@/lib/marketplace/notifications";

// PATCH /api/marketplace/matters/:id — citizen updates their own DRAFT
// matter. Body: { summary, details, practiceAreaSlug?, ackVersion?, post? }.
// Post=true promotes from DRAFT to AWAITING_PRO (locks the snapshot).
// Once AWAITING_PRO or beyond, editing is not permitted — the pro is
// reading it and a shifting target would be unfair.
export async function PATCH(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const { summary, details, practiceAreaSlug, ackVersion, post } = (body ?? {}) as {
    summary?: string;
    details?: string;
    practiceAreaSlug?: string;
    ackVersion?: string;
    post?: boolean;
  };

  if (!summary || !details) {
    return NextResponse.json(
      { error: "summary and details are required" },
      { status: 400 },
    );
  }
  if (summary.length > 200) {
    return NextResponse.json({ error: "Summary must be 200 characters or fewer" }, { status: 400 });
  }
  if (details.length < 40) {
    return NextResponse.json({ error: "Details must be at least 40 characters" }, { status: 400 });
  }
  if (details.length > 8000) {
    return NextResponse.json({ error: "Details must be 8000 characters or fewer" }, { status: 400 });
  }

  const existing = await prisma.proMatter.findUnique({
    where: { id },
    select: { id: true, citizenUserId: true, status: true, practiceAreaId: true },
  });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (existing.citizenUserId !== userId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  if (existing.status !== ProMatterStatus.DRAFT) {
    return NextResponse.json(
      { error: "Only drafts can be edited" },
      { status: 409 },
    );
  }

  // Determine the target area — allow switching while still DRAFT.
  let targetAreaId = existing.practiceAreaId;
  let targetAreaJurisdiction: string | null = null;
  let targetAreaAckVersion: string | null = null;
  let targetAreaLeadFee: number | null = null;
  let targetAreaCurrency: string | null = null;

  const lookupSlug = practiceAreaSlug ?? undefined;
  if (lookupSlug || post) {
    const area = await prisma.practiceArea.findUnique({
      where: lookupSlug ? { slug: lookupSlug } : { id: existing.practiceAreaId },
    });
    if (!area || !area.active) {
      return NextResponse.json({ error: "Practice area not available" }, { status: 400 });
    }
    targetAreaId = area.id;
    targetAreaJurisdiction = area.jurisdiction;
    targetAreaAckVersion = area.ackVersion;
    targetAreaLeadFee = area.leadFeeInCents;
    targetAreaCurrency = area.currency;
  }

  if (post) {
    if (!ackVersion) {
      return NextResponse.json(
        { error: "Per-area acknowledgment is required before posting" },
        { status: 400 },
      );
    }
    if (ackVersion !== targetAreaAckVersion) {
      return NextResponse.json(
        { error: "Acknowledgment version is out of date — please re-read and re-acknowledge" },
        { status: 409 },
      );
    }
  }

  const now = new Date();
  const nextStatus = post ? ProMatterStatus.AWAITING_PRO : ProMatterStatus.DRAFT;

  const updated = await prisma.proMatter.update({
    where: { id: existing.id },
    data: {
      summary,
      details,
      practiceAreaId: targetAreaId,
      ...(targetAreaJurisdiction ? { jurisdiction: targetAreaJurisdiction } : {}),
      ...(targetAreaLeadFee !== null ? { leadFeeInCents: targetAreaLeadFee } : {}),
      ...(targetAreaCurrency ? { currency: targetAreaCurrency } : {}),
      status: nextStatus,
      ackVersion: post ? targetAreaAckVersion : null,
      ackAt: post ? now : null,
      postedAt: post ? now : null,
    },
  });

  if (post) {
    notifyMatchingProsOfNewMatter(updated.id).catch((err) => {
      console.error("[marketplace] notifyMatchingPros dispatch failed:", err);
    });
  }

  return NextResponse.json({ matter: updated });
}

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
