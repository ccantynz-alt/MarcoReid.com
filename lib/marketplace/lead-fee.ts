import { prisma } from "@/lib/prisma";
import { createLeadFeeCheckoutSession } from "@/lib/stripe";
import { BRAND } from "@/lib/constants";

function baseUrl() {
  return process.env.NEXTAUTH_URL || BRAND.url;
}

// Start the lead-fee Stripe Checkout for a freshly-posted matter. The matter
// sits in AWAITING_PAYMENT until the webhook confirms payment; pros don't
// see it until the status flips to AWAITING_PRO.
export async function startLeadFeeCheckoutForMatter(params: {
  matterId: string;
  citizenUserId: string;
  amountCents: number;
  currency: string;
  areaName: string;
  jurisdiction: string;
}): Promise<{ url: string }> {
  const citizen = await prisma.user.findUnique({
    where: { id: params.citizenUserId },
    select: { email: true },
  });
  if (!citizen) throw new Error("Citizen not found");

  const base = baseUrl();
  const checkout = await createLeadFeeCheckoutSession({
    amountCents: params.amountCents,
    currency: params.currency.toLowerCase(),
    customerEmail: citizen.email,
    description: `${params.areaName} — ${params.jurisdiction} — lead fee`,
    successUrl: `${base}/my-matters?paid=${params.matterId}`,
    cancelUrl: `${base}/my-matters?unpaid=${params.matterId}`,
    metadata: {
      matterId: params.matterId,
      citizenUserId: params.citizenUserId,
    },
  });

  if (!checkout.url) throw new Error("Stripe did not return a checkout URL");
  return { url: checkout.url };
}
