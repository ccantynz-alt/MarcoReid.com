import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-guard";

// Marco Reid does not yet ship a dedicated Subscription model — Stripe
// subscription state is denormalised onto User (subscriptionStatus,
// stripePriceId, subscriptionPeriodEnd). Until the Subscription model
// lands we derive MRR / ARR from those fields. The endpoint is shaped
// so the page never has to change when the model arrives — only this
// resolver does.

export const dynamic = "force-dynamic";

interface PricePoint {
  priceId: string;
  amountCents: number;
  interval: "month" | "year";
}

function knownPrices(): PricePoint[] {
  // Best-effort price catalogue. Real $ values would normally live in
  // Stripe; until we wire a Stripe price-list call (and cache it), we
  // estimate from the env-defined price IDs at flat assumed amounts.
  // When a real subscription model lands, replace this with prisma data.
  return [];
}

interface WeeklyBucket {
  weekStartIso: string;
  newSubscriptions: number;
  churned: number;
}

export async function GET() {
  const guard = await requireAdmin();
  if (guard) return guard;

  let activeSubs = 0;
  let pastDue = 0;
  let canceled = 0;
  let trialing = 0;
  try {
    const grouped = await prisma.user.groupBy({
      by: ["subscriptionStatus"],
      where: { subscriptionStatus: { not: null } },
      _count: { _all: true },
    });
    for (const g of grouped) {
      const n = g._count._all;
      switch (g.subscriptionStatus) {
        case "active":
          activeSubs = n;
          break;
        case "past_due":
          pastDue = n;
          break;
        case "canceled":
          canceled = n;
          break;
        case "trialing":
          trialing = n;
          break;
      }
    }
  } catch {
    // model missing — empty state below will render
  }

  // Naive MRR estimate: $99/mo per active subscription. Real figure will
  // come from the eventual Subscription model with per-row priceCents.
  const ASSUMED_MONTHLY_CENTS = 9900;
  const mrrCents = activeSubs * ASSUMED_MONTHLY_CENTS;
  const arrCents = mrrCents * 12;

  // 12-week revenue trend — bucketed by created-week of currently-active
  // subscriptions. Approximation: signups become MRR.
  const weeklyTrend: WeeklyBucket[] = [];
  try {
    const now = new Date();
    for (let i = 11; i >= 0; i--) {
      const weekStart = new Date(now);
      weekStart.setDate(weekStart.getDate() - i * 7);
      weekStart.setHours(0, 0, 0, 0);
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 7);
      const newSubscriptions = await prisma.user.count({
        where: {
          subscriptionStatus: { in: ["active", "trialing"] },
          createdAt: { gte: weekStart, lt: weekEnd },
        },
      });
      weeklyTrend.push({
        weekStartIso: weekStart.toISOString(),
        newSubscriptions,
        churned: 0,
      });
    }
  } catch {
    // empty trend
  }

  // Churn (last 30d): users whose subscriptionStatus is "canceled" and
  // updatedAt within the window. Coarse but directional.
  let churnLast30d = 0;
  try {
    const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    churnLast30d = await prisma.user.count({
      where: {
        subscriptionStatus: "canceled",
        updatedAt: { gte: since },
      },
    });
  } catch {
    churnLast30d = 0;
  }

  const churnRate =
    activeSubs + churnLast30d > 0
      ? churnLast30d / (activeSubs + churnLast30d)
      : 0;

  return NextResponse.json({
    summary: {
      activeSubscriptions: activeSubs,
      pastDue,
      canceled,
      trialing,
      mrrCents,
      arrCents,
      churnLast30d,
      churnRate,
    },
    weeklyTrend,
    priceCatalogue: knownPrices(),
    note: "MRR/ARR is estimated at $99/mo per active subscription until the Subscription model lands.",
  });
}
