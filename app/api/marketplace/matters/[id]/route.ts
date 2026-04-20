import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";
import { ProMatterStatus } from "@prisma/client";
import {
  notifyMatchingProsOfNewMatter,
  fireAndForget,
} from "@/lib/marketplace/notifications";
import { MATTER_LIMITS } from "@/lib/marketplace/constants";

// Only DRAFT is editable. Once posted the pro is reading it and a
// shifting target would be unfair; the status guard on updateMany also
// prevents a race with a concurrent accept.
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
  if (summary.length > MATTER_LIMITS.SUMMARY_MAX) {
    return NextResponse.json(
      { error: `Summary must be ${MATTER_LIMITS.SUMMARY_MAX} characters or fewer` },
      { status: 400 },
    );
  }
  if (details.length < MATTER_LIMITS.DETAILS_MIN) {
    return NextResponse.json(
      { error: `Details must be at least ${MATTER_LIMITS.DETAILS_MIN} characters` },
      { status: 400 },
    );
  }
  if (details.length > MATTER_LIMITS.DETAILS_MAX) {
    return NextResponse.json(
      { error: `Details must be ${MATTER_LIMITS.DETAILS_MAX} characters or fewer` },
      { status: 400 },
    );
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
    return NextResponse.json({ error: "Only drafts can be edited" }, { status: 409 });
  }

  const targetArea = await prisma.practiceArea.findUnique({
    where: practiceAreaSlug
      ? { slug: practiceAreaSlug }
      : { id: existing.practiceAreaId },
  });
  if (!targetArea || !targetArea.active) {
    return NextResponse.json({ error: "Practice area not available" }, { status: 400 });
  }

  if (post) {
    if (!ackVersion) {
      return NextResponse.json(
        { error: "Per-area acknowledgment is required before posting" },
        { status: 400 },
      );
    }
    if (ackVersion !== targetArea.ackVersion) {
      return NextResponse.json(
        { error: "Acknowledgment version is out of date — please re-read and re-acknowledge" },
        { status: 409 },
      );
    }
  }

  const now = new Date();
  const nextStatus = post ? ProMatterStatus.AWAITING_PRO : ProMatterStatus.DRAFT;

  // Guarded update: status must still be DRAFT when we commit. Prevents
  // a race where the user is editing while a pro somehow accepted.
  const result = await prisma.proMatter.updateMany({
    where: {
      id: existing.id,
      citizenUserId: userId,
      status: ProMatterStatus.DRAFT,
    },
    data: {
      summary,
      details,
      practiceAreaId: targetArea.id,
      jurisdiction: targetArea.jurisdiction,
      leadFeeInCents: targetArea.leadFeeInCents,
      currency: targetArea.currency,
      status: nextStatus,
      ackVersion: post ? targetArea.ackVersion : null,
      ackAt: post ? now : null,
      postedAt: post ? now : null,
    },
  });

  if (result.count === 0) {
    return NextResponse.json(
      { error: "Draft state changed — please reload and try again" },
      { status: 409 },
    );
  }

  if (post) {
    fireAndForget("notifyMatchingPros", notifyMatchingProsOfNewMatter(existing.id));
  }

  return NextResponse.json({ ok: true });
}

// Cancellation is only permitted before a pro has accepted. The guarded
// updateMany prevents a concurrent accept from leaving a ghost cancel.
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
