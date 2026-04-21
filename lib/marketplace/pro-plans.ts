// Pro SaaS tiers for marketplace access. A verified pro needs an active
// subscription to accept marketplace matters — the subscription carries
// the ongoing cost of platform access, while the per-matter lead fee
// (paid by the citizen) buys the intro. Three tiers so small practices
// and firms can self-select; tier-specific features (placement, seats)
// are layered on as they ship.

export type ProPlanTier = "essentials" | "pro" | "firm";

export interface ProPlan {
  tier: ProPlanTier;
  name: string;
  tagline: string;
  priceMonthlyCents: number;
  currency: string;
  features: string[];
}

export const PRO_PLANS: ProPlan[] = [
  {
    tier: "essentials",
    name: "Essentials",
    tagline: "Solo practitioners testing the marketplace.",
    priceMonthlyCents: 9900,
    currency: "NZD",
    features: [
      "Accept marketplace matters",
      "Verified profile badge",
      "Email support",
    ],
  },
  {
    tier: "pro",
    name: "Pro",
    tagline: "Serious practices that want lead flow.",
    priceMonthlyCents: 24900,
    currency: "NZD",
    features: [
      "Everything in Essentials",
      "Priority placement in pro lists",
      "Unlimited practice areas",
      "Priority email support",
    ],
  },
  {
    tier: "firm",
    name: "Firm",
    tagline: "Multi-lawyer firms with a brand to protect.",
    priceMonthlyCents: 49900,
    currency: "NZD",
    features: [
      "Everything in Pro",
      "Up to 5 team members",
      "Custom firm branding",
      "Dedicated account manager",
    ],
  },
];

export function isProPlanTier(value: unknown): value is ProPlanTier {
  return value === "essentials" || value === "pro" || value === "firm";
}

export function planByTier(tier: ProPlanTier): ProPlan | undefined {
  return PRO_PLANS.find((p) => p.tier === tier);
}

const TIER_PRICE_ENV: Record<ProPlanTier, string> = {
  essentials: "STRIPE_PRICE_PRO_ESSENTIALS",
  pro: "STRIPE_PRICE_PRO_PRO",
  firm: "STRIPE_PRICE_PRO_FIRM",
};

export function priceIdForTier(tier: ProPlanTier): string | undefined {
  return process.env[TIER_PRICE_ENV[tier]];
}

// Returns true if the subscription status indicates the pro has current
// marketplace access. Stripe "trialing" counts — the pro is paying
// (eventually) and we want frictionless onboarding during a trial.
export function hasActiveProSubscription(
  status: string | null | undefined,
): boolean {
  return status === "active" || status === "trialing";
}
