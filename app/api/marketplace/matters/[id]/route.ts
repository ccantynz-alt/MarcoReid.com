import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";
import { ProMatterStatus } from "@prisma/client";
import { MATTER_LIMITS } from "@/lib/marketplace/constants";
import { startLeadFeeCheckoutForMatter } from "@/lib/marketplace/lead-fee";
import { stripe } from "@/lib/stripe";

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
  const nextStatus = post ? ProMatterStatus.AWAITING_PAYMENT : ProMatterStatus.DRAFT;

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
    const { url } = await startLeadFeeCheckoutForMatter({
      matterId: existing.id,
      citizenUserId: userId,
      amountCents: targetArea.leadFeeInCents,
      currency: targetArea.currency,
      areaName: targetArea.name,
      jurisdiction: targetArea.jurisdiction,
    });
    return NextResponse.json({ ok: true, checkoutUrl: url });
  }

  return NextResponse.json({ ok: true });
}

// Cancellation is only permitted before a pro has accepted. The guarded
// updateMany prevents a concurrent accept from leaving a ghost cancel.
// If the citizen already paid the lead fee (AWAITING_PRO), we refund it
// before flipping status so they don't end up paying for nothing.
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
  const cancellable: ProMatterStatus[] = [
    ProMatterStatus.DRAFT,
    ProMatterStatus.AWAITING_PAYMENT,
    ProMatterStatus.AWAITING_PRO,
  ];
  if (!cancellable.includes(matter.status)) {
    return NextResponse.json(
      { error: "This matter has been accepted and cannot be cancelled from here" },
      { status: 409 },
    );
  }

  const payment = await prisma.marketplacePayment.findFirst({
    where: { matterId: matter.id, kind: "lead-fee", status: "succeeded" },
    select: { id: true, stripePaymentIntentId: true },
  });

  // Refund first so we don't end up with a cancelled matter and a charge
  // still on the citizen's card. Stripe refunds are idempotent on the
  // PaymentIntent so retries are safe.
  if (payment) {
    try {
      await stripe.refunds.create({
        payment_intent: payment.stripePaymentIntentId,
      });
    } catch (err) {
      console.error("[marketplace/matters] lead-fee refund failed:", err);
      return NextResponse.json(
        { error: "Could not refund the lead fee — please try again or contact support" },
        { status: 502 },
      );
    }
  }

  const result = await prisma.proMatter.updateMany({
    where: { id: matter.id, status: { in: cancellable } },
    data: { status: ProMatterStatus.CANCELLED, closedAt: new Date() },
  });

  if (result.count === 0) {
    // Rare: a pro accepted between our read and our write. The refund
    // (if any) has already been submitted to Stripe — surface loudly so
    // ops can reconcile rather than silently losing the signal.
    console.error(
      "[marketplace/matters] cancel race: matter",
      matter.id,
      "was accepted mid-cancel; lead-fee refund may have fired",
    );
    return NextResponse.json(
      { error: "Matter has already been accepted and cannot be cancelled" },
      { status: 409 },
    );
  }

  if (payment) {
    await prisma.marketplacePayment.update({
      where: { id: payment.id },
      data: { status: "refunded" },
    });
  }

  return NextResponse.json({ ok: true });
}
