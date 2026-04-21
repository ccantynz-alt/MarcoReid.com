import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";
import { createCheckoutSession } from "@/lib/stripe";
import { appBaseUrl } from "@/lib/constants";
import { isProPlanTier, priceIdForTier } from "@/lib/marketplace/pro-plans";

// POST /api/pro/subscribe  { tier: "essentials" | "pro" | "firm" }
//
// Creates a subscription Checkout for a marketplace tier. Tier is
// validated against an allow-list — we never trust a client-supplied
// Stripe priceId because that would let a pro buy any price we happen
// to have in our Stripe account (including $0 ones).
export async function POST(req: Request) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: { tier?: unknown };
  try {
    body = (await req.json()) as { tier?: unknown };
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  if (!isProPlanTier(body.tier)) {
    return NextResponse.json({ error: "Unknown plan tier" }, { status: 400 });
  }

  const priceId = priceIdForTier(body.tier);
  if (!priceId) {
    return NextResponse.json(
      { error: "This plan is not available for purchase right now" },
      { status: 503 },
    );
  }

  // A non-pro can't subscribe to marketplace access — it would just
  // burn money with no effect. Force them through the pro-registration
  // flow first. Verification can happen after payment.
  const pro = await prisma.professional.findUnique({
    where: { userId },
    select: { id: true },
  });
  if (!pro) {
    return NextResponse.json(
      { error: "Complete your professional profile before subscribing" },
      { status: 403 },
    );
  }

  const base = appBaseUrl();
  const checkout = await createCheckoutSession({
    userId,
    priceId,
    successUrl: `${base}/pro-dashboard?subscribed=1`,
    cancelUrl: `${base}/pro-pricing?canceled=1`,
  });

  return NextResponse.json({ url: checkout.url });
}
