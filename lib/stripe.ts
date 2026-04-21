import Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { PAYMENT_KINDS } from "@/lib/marketplace/constants";

let _stripe: Stripe | null = null;
function getStripe() {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2026-03-25.dahlia",
    });
  }
  return _stripe;
}

export const stripe = new Proxy({} as Stripe, {
  get(_target, prop) {
    return (getStripe() as unknown as Record<string | symbol, unknown>)[prop];
  },
});

export async function getOrCreateCustomer(
  userId: string,
  email: string,
  name?: string | null,
): Promise<string> {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (user?.stripeCustomerId) return user.stripeCustomerId;

  const customer = await stripe.customers.create({
    email,
    name: name || undefined,
    metadata: { userId },
  });

  await prisma.user.update({
    where: { id: userId },
    data: { stripeCustomerId: customer.id },
  });

  return customer.id;
}

export async function createCheckoutSession(params: {
  userId: string;
  priceId: string;
  successUrl: string;
  cancelUrl: string;
}): Promise<Stripe.Checkout.Session> {
  const user = await prisma.user.findUnique({ where: { id: params.userId } });
  if (!user) throw new Error("User not found");

  const customerId = await getOrCreateCustomer(user.id, user.email, user.name);

  return stripe.checkout.sessions.create({
    mode: "subscription",
    customer: customerId,
    line_items: [{ price: params.priceId, quantity: 1 }],
    success_url: params.successUrl,
    cancel_url: params.cancelUrl,
    client_reference_id: user.id,
    metadata: { userId: user.id },
  });
}

export async function createBillingPortalSession(params: {
  customerId: string;
  returnUrl: string;
}): Promise<Stripe.BillingPortal.Session> {
  return stripe.billingPortal.sessions.create({
    customer: params.customerId,
    return_url: params.returnUrl,
  });
}

export async function createConnectAccountLink(params: {
  userId: string;
  returnUrl: string;
  refreshUrl: string;
}): Promise<{ url: string; accountId: string }> {
  const user = await prisma.user.findUnique({ where: { id: params.userId } });
  if (!user) throw new Error("User not found");

  let accountId = user.stripeConnectAccountId;
  if (!accountId) {
    const account = await stripe.accounts.create({
      type: "express",
      email: user.email,
      metadata: { userId: user.id },
      capabilities: {
        transfers: { requested: true },
        card_payments: { requested: true },
      },
    });
    accountId = account.id;
    await prisma.user.update({
      where: { id: user.id },
      data: { stripeConnectAccountId: accountId },
    });
  }

  const link = await stripe.accountLinks.create({
    account: accountId,
    return_url: params.returnUrl,
    refresh_url: params.refreshUrl,
    type: "account_onboarding",
  });

  return { url: link.url, accountId };
}

export async function createLeadFeeCheckoutSession(params: {
  lineItems: Array<{ name: string; unitAmountCents: number; currency: string }>;
  customerEmail: string;
  description: string;
  successUrl: string;
  cancelUrl: string;
  metadata: Record<string, string>;
}): Promise<Stripe.Checkout.Session> {
  return stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: params.customerEmail,
    line_items: params.lineItems.map((item) => ({
      price_data: {
        currency: item.currency,
        product_data: { name: item.name },
        unit_amount: item.unitAmountCents,
      },
      quantity: 1,
    })),
    payment_intent_data: {
      description: params.description,
      metadata: { ...params.metadata, kind: PAYMENT_KINDS.LEAD_FEE },
    },
    success_url: params.successUrl,
    cancel_url: params.cancelUrl,
    metadata: { ...params.metadata, kind: PAYMENT_KINDS.LEAD_FEE },
  });
}

export async function createMarketplaceCheckoutSession(params: {
  amountCents: number;
  currency: string;
  professionalConnectAccountId: string;
  customerEmail?: string;
  description: string;
  applicationFeeCents: number;
  successUrl?: string;
  cancelUrl?: string;
  metadata?: Record<string, string>;
}): Promise<Stripe.Checkout.Session> {
  const base = process.env.NEXTAUTH_URL || "http://localhost:3000";
  return stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: params.customerEmail,
    line_items: [
      {
        price_data: {
          currency: params.currency,
          product_data: { name: params.description },
          unit_amount: params.amountCents,
        },
        quantity: 1,
      },
    ],
    payment_intent_data: {
      capture_method: "manual",
      application_fee_amount: params.applicationFeeCents,
      transfer_data: { destination: params.professionalConnectAccountId },
      description: params.description,
      metadata: params.metadata,
    },
    success_url: params.successUrl || `${base}/marketplace/success`,
    cancel_url: params.cancelUrl || `${base}/marketplace/cancel`,
    metadata: params.metadata,
  });
}
