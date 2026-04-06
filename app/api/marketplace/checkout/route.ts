import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createMarketplaceCheckoutSession } from "@/lib/stripe";

export async function POST(req: Request) {
  const body = (await req.json()) as {
    professionalUserId?: string;
    amountCents?: number;
    description?: string;
    matterId?: string;
    customerEmail?: string;
  };

  if (!body.professionalUserId || !body.amountCents || !body.description) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const professional = await prisma.user.findUnique({
    where: { id: body.professionalUserId },
  });
  if (!professional?.stripeConnectAccountId || !professional.connectOnboarded) {
    return NextResponse.json(
      { error: "Professional not onboarded to Stripe Connect" },
      { status: 400 },
    );
  }

  const applicationFeeCents = Math.round(body.amountCents * 0.1);

  const checkout = await createMarketplaceCheckoutSession({
    amountCents: body.amountCents,
    professionalConnectAccountId: professional.stripeConnectAccountId,
    customerEmail: body.customerEmail,
    description: body.description,
    applicationFeeCents,
    metadata: {
      professionalUserId: professional.id,
      matterId: body.matterId || "",
    },
  });

  return NextResponse.json({ url: checkout.url });
}
