import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";
import { ProMatterStatus } from "@prisma/client";
import { createMarketplaceCheckoutSession } from "@/lib/stripe";

// POST /api/marketplace/checkout
// Body: { matterId }
//
// Starts the consumer-fee checkout for the accepted pro. Everything that
// matters (amount, currency, destination pro, ownership) is derived from
// the DB — never trusted from the client. Earlier versions took
// amountCents + professionalUserId from the request body, which let an
// attacker pay $0 or redirect funds to an unrelated Connect account.
export async function POST(req: Request) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: { matterId?: string };
  try {
    body = (await req.json()) as { matterId?: string };
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  if (!body.matterId) {
    return NextResponse.json({ error: "matterId is required" }, { status: 400 });
  }

  const matter = await prisma.proMatter.findUnique({
    where: { id: body.matterId },
    select: {
      id: true,
      citizenUserId: true,
      status: true,
      currency: true,
      consumerFeeInCents: true,
      citizen: { select: { email: true } },
      practiceArea: { select: { name: true, jurisdiction: true } },
      acceptedBy: {
        select: {
          user: {
            select: { id: true, stripeConnectAccountId: true, connectOnboarded: true },
          },
        },
      },
    },
  });
  if (!matter) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (matter.citizenUserId !== userId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Only pay once sign-off is released. Pre-release the matter is still in
  // flight; post-close it's done and paid. Either side of that window is
  // a bug or an attack.
  if (
    matter.status !== ProMatterStatus.AWAITING_SIGNOFF &&
    matter.status !== ProMatterStatus.SIGNED_OFF
  ) {
    return NextResponse.json(
      { error: "Matter is not ready for payment" },
      { status: 409 },
    );
  }

  const pro = matter.acceptedBy?.user;
  if (!pro?.stripeConnectAccountId || !pro.connectOnboarded) {
    return NextResponse.json(
      { error: "Professional not onboarded to Stripe Connect" },
      { status: 409 },
    );
  }

  if (!matter.consumerFeeInCents || matter.consumerFeeInCents <= 0) {
    return NextResponse.json(
      { error: "No consumer fee has been set on this matter" },
      { status: 409 },
    );
  }

  const existing = await prisma.marketplacePayment.findFirst({
    where: {
      matterId: matter.id,
      status: { in: ["requires_capture", "succeeded"] },
    },
    select: { id: true },
  });
  if (existing) {
    return NextResponse.json(
      { error: "A payment has already been started for this matter" },
      { status: 409 },
    );
  }

  const amountCents = matter.consumerFeeInCents;
  const applicationFeeCents = Math.round(amountCents * 0.1);

  const checkout = await createMarketplaceCheckoutSession({
    amountCents,
    currency: matter.currency.toLowerCase(),
    professionalConnectAccountId: pro.stripeConnectAccountId,
    customerEmail: matter.citizen.email,
    description: `${matter.practiceArea.name} — ${matter.practiceArea.jurisdiction}`,
    applicationFeeCents,
    metadata: {
      professionalUserId: pro.id,
      matterId: matter.id,
    },
  });

  return NextResponse.json({ url: checkout.url });
}
