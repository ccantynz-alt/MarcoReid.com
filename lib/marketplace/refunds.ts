import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { PAYMENT_KINDS, PAYMENT_STATUSES } from "@/lib/marketplace/constants";

// Refund the lead-fee charge for a matter, then mark the MarketplacePayment
// row as refunded. Callers: DELETE /matters/:id (citizen cancels), and the
// Stripe webhook's auto-refund path when the matter was cancelled between
// Checkout and payment confirmation.
//
// An idempotency key scoped to the matter makes retries safe: Stripe will
// return the same refund object instead of creating a second one if the
// same matter hits refund twice (e.g. DELETE then webhook).
export async function refundLeadFeeForMatter(matterId: string): Promise<
  | { ok: true; refunded: boolean }
  | { ok: false; error: unknown }
> {
  const payment = await prisma.marketplacePayment.findFirst({
    where: {
      matterId,
      kind: PAYMENT_KINDS.LEAD_FEE,
      status: PAYMENT_STATUSES.SUCCEEDED,
    },
    select: { id: true, stripePaymentIntentId: true },
  });
  if (!payment) return { ok: true, refunded: false };

  try {
    await stripe.refunds.create(
      { payment_intent: payment.stripePaymentIntentId },
      { idempotencyKey: `refund-lead-fee-${matterId}` },
    );
  } catch (err) {
    return { ok: false, error: err };
  }

  await prisma.marketplacePayment.update({
    where: { id: payment.id },
    data: { status: PAYMENT_STATUSES.REFUNDED },
  });

  return { ok: true, refunded: true };
}
