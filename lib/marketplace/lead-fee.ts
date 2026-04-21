import { prisma } from "@/lib/prisma";
import { createLeadFeeCheckoutSession } from "@/lib/stripe";
import { appBaseUrl } from "@/lib/constants";
import { MatterAddonKind } from "@prisma/client";
import { priceForAddon } from "@/lib/marketplace/addons";

// Start the lead-fee Stripe Checkout for a freshly-posted matter. The matter
// sits in AWAITING_PAYMENT until the webhook confirms payment; pros don't
// see it until the status flips to AWAITING_PRO. Selected add-ons ride in
// the same Checkout as additional line items so they share the PaymentIntent
// with the lead fee — a cancel-before-accept refund sweeps the lot.
export async function startLeadFeeCheckoutForMatter(params: {
  matterId: string;
  citizenUserId: string;
  amountCents: number;
  currency: string;
  areaName: string;
  jurisdiction: string;
  addons?: MatterAddonKind[];
}): Promise<{ url: string }> {
  const citizen = await prisma.user.findUnique({
    where: { id: params.citizenUserId },
    select: { email: true },
  });
  if (!citizen) throw new Error("Citizen not found");

  const currency = params.currency.toLowerCase();
  const lineItems: Array<{ name: string; unitAmountCents: number; currency: string }> = [
    {
      name: `${params.areaName} — ${params.jurisdiction} — lead fee`,
      unitAmountCents: params.amountCents,
      currency,
    },
  ];
  for (const kind of params.addons ?? []) {
    const addon = priceForAddon(params.jurisdiction, kind);
    lineItems.push({
      name: addon.label,
      unitAmountCents: addon.cents,
      currency,
    });
  }

  const base = appBaseUrl();
  const checkout = await createLeadFeeCheckoutSession({
    lineItems,
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
