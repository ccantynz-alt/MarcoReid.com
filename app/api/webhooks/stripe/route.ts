import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { ProMatterStatus } from "@prisma/client";
import {
  fireAndForget,
  notifyMatchingProsOfNewMatter,
} from "@/lib/marketplace/notifications";
import { PAYMENT_KINDS, PAYMENT_STATUSES } from "@/lib/marketplace/constants";
import { refundLeadFeeForMatter } from "@/lib/marketplace/refunds";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const body = await req.text();
  const sig = (await headers()).get("stripe-signature");
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const sub: any = await stripe.subscriptions.retrieve(
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
              subscriptionPeriodEnd: sub.current_period_end
                ? new Date(sub.current_period_end * 1000)
                : undefined,
            },
          });
        }
      } else if (
        s.mode === "payment" &&
        s.metadata?.kind === PAYMENT_KINDS.LEAD_FEE &&
        s.metadata?.matterId &&
        s.payment_status === "paid" &&
        s.payment_intent
      ) {
        const matterId = s.metadata.matterId;
        const pi = await stripe.paymentIntents.retrieve(s.payment_intent as string);

        // Promote the matter only if it's still awaiting payment. Anything
        // else (already promoted, cancelled, replayed event) we ignore —
        // Stripe retries the webhook freely and we must be idempotent.
        const promoted = await prisma.proMatter.updateMany({
          where: { id: matterId, status: ProMatterStatus.AWAITING_PAYMENT },
          data: { status: ProMatterStatus.AWAITING_PRO },
        });

        await prisma.marketplacePayment.upsert({
          where: { stripePaymentIntentId: pi.id },
          create: {
            stripePaymentIntentId: pi.id,
            kind: PAYMENT_KINDS.LEAD_FEE,
            payerUserId: s.metadata.citizenUserId || undefined,
            professionalUserId: null,
            amountCents: pi.amount,
            applicationFeeCents: 0,
            currency: pi.currency,
            status: PAYMENT_STATUSES.SUCCEEDED,
            description: pi.description || undefined,
            matterId,
            capturedAt: new Date(),
          },
          update: { status: PAYMENT_STATUSES.SUCCEEDED, capturedAt: new Date() },
        });

        if (promoted.count > 0) {
          fireAndForget(
            "notifyMatchingProsOfNewMatter",
            notifyMatchingProsOfNewMatter(matterId),
          );
        } else {
          // Matter wasn't in AWAITING_PAYMENT — either a replayed event
          // (harmless) or the citizen cancelled between Checkout and the
          // webhook landing. If the matter is now CANCELLED, refund so
          // we never keep money for a dead matter.
          const current = await prisma.proMatter.findUnique({
            where: { id: matterId },
            select: { status: true },
          });
          if (current?.status === ProMatterStatus.CANCELLED) {
            const refund = await refundLeadFeeForMatter(matterId);
            if (!refund.ok) {
              console.error(
                "[webhooks/stripe] auto-refund after cancel-during-checkout failed:",
                refund.error,
              );
            }
          }
        }
      }
      break;
    }

    case "customer.subscription.updated": {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const sub = event.data.object as any;
      await prisma.user.updateMany({
        where: { stripeSubscriptionId: sub.id },
        data: {
          stripePriceId: sub.items?.data?.[0]?.price?.id,
          subscriptionStatus: sub.status,
          subscriptionPeriodEnd: sub.current_period_end
            ? new Date(sub.current_period_end * 1000)
            : undefined,
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
            status: PAYMENT_STATUSES.REQUIRES_CAPTURE,
            description: pi.description || undefined,
            matterId: pi.metadata?.matterId || undefined,
          },
          update: { status: PAYMENT_STATUSES.REQUIRES_CAPTURE },
        });
      }
      break;
    }

    case "payment_intent.succeeded": {
      const pi = event.data.object as Stripe.PaymentIntent;
      await prisma.marketplacePayment.updateMany({
        where: { stripePaymentIntentId: pi.id },
        data: { status: PAYMENT_STATUSES.CAPTURED, capturedAt: new Date() },
      });
      break;
    }

    case "payment_intent.canceled": {
      const pi = event.data.object as Stripe.PaymentIntent;
      await prisma.marketplacePayment.updateMany({
        where: { stripePaymentIntentId: pi.id },
        data: { status: PAYMENT_STATUSES.CANCELED },
      });
      break;
    }

    case "charge.refunded": {
      const charge = event.data.object as Stripe.Charge;
      if (charge.payment_intent) {
        await prisma.marketplacePayment.updateMany({
          where: { stripePaymentIntentId: charge.payment_intent as string },
          data: { status: PAYMENT_STATUSES.REFUNDED },
        });
      }
      break;
    }
  }

  return NextResponse.json({ received: true });
}
