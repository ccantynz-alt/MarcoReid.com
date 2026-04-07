import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const body = await req.text();
  const sig = headers().get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !secret) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, secret);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Invalid signature";
    return NextResponse.json({ error: msg }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const s = event.data.object as Stripe.Checkout.Session;
      if (s.mode === "subscription" && s.subscription) {
        const userId =
          s.client_reference_id || (s.metadata?.userId as string | undefined);
        const sub = await stripe.subscriptions.retrieve(
          s.subscription as string,
        );
        if (userId) {
          await prisma.user.update({
            where: { id: userId },
            data: {
              stripeCustomerId: (s.customer as string) || undefined,
              stripeSubscriptionId: sub.id,
              stripePriceId: sub.items.data[0]?.price.id,
              subscriptionStatus: sub.status,
              subscriptionPeriodEnd: new Date(
                sub.current_period_end * 1000,
              ),
            },
          });
        }
      }
      break;
    }

    case "customer.subscription.updated": {
      const sub = event.data.object as Stripe.Subscription;
      await prisma.user.updateMany({
        where: { stripeSubscriptionId: sub.id },
        data: {
          stripePriceId: sub.items.data[0]?.price.id,
          subscriptionStatus: sub.status,
          subscriptionPeriodEnd: new Date(sub.current_period_end * 1000),
        },
      });
      break;
    }

    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription;
      await prisma.user.updateMany({
        where: { stripeSubscriptionId: sub.id },
        data: { subscriptionStatus: "canceled" },
      });
      break;
    }

    case "account.updated": {
      const account = event.data.object as Stripe.Account;
      await prisma.user.updateMany({
        where: { stripeConnectAccountId: account.id },
        data: {
          connectOnboarded:
            account.details_submitted === true &&
            account.charges_enabled === true,
        },
      });
      break;
    }

    case "payment_intent.amount_capturable_updated": {
      const pi = event.data.object as Stripe.PaymentIntent;
      const professionalUserId = pi.metadata?.professionalUserId;
      if (professionalUserId) {
        await prisma.marketplacePayment.upsert({
          where: { stripePaymentIntentId: pi.id },
          create: {
            stripePaymentIntentId: pi.id,
            professionalUserId,
            amountCents: pi.amount,
            applicationFeeCents: pi.application_fee_amount || 0,
            currency: pi.currency,
            status: "requires_capture",
            description: pi.description || undefined,
            matterId: pi.metadata?.matterId || undefined,
          },
          update: { status: "requires_capture" },
        });
      }
      break;
    }

    case "payment_intent.succeeded": {
      const pi = event.data.object as Stripe.PaymentIntent;
      await prisma.marketplacePayment.updateMany({
        where: { stripePaymentIntentId: pi.id },
        data: { status: "captured", capturedAt: new Date() },
      });
      break;
    }

    case "payment_intent.canceled": {
      const pi = event.data.object as Stripe.PaymentIntent;
      await prisma.marketplacePayment.updateMany({
        where: { stripePaymentIntentId: pi.id },
        data: { status: "canceled" },
      });
      break;
    }

    case "charge.refunded": {
      const charge = event.data.object as Stripe.Charge;
      if (charge.payment_intent) {
        await prisma.marketplacePayment.updateMany({
          where: { stripePaymentIntentId: charge.payment_intent as string },
          data: { status: "refunded" },
        });
      }
      break;
    }
  }

  return NextResponse.json({ received: true });
}
