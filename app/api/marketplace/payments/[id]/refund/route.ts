import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getServerSession(authOptions);
  const sessionUser = session?.user as { id?: string; role?: string } | undefined;
  if (!sessionUser?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const payment = await prisma.marketplacePayment.findUnique({
    where: { id },
  });
  if (!payment) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (
    payment.professionalUserId !== sessionUser.id &&
    sessionUser.role !== "ADMIN"
  ) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  if (payment.status === "requires_capture") {
    await stripe.paymentIntents.cancel(payment.stripePaymentIntentId);
    const updated = await prisma.marketplacePayment.update({
      where: { id: payment.id },
      data: { status: "canceled" },
    });
    return NextResponse.json({ payment: updated });
  }

  await stripe.refunds.create({
    payment_intent: payment.stripePaymentIntentId,
  });

  const updated = await prisma.marketplacePayment.update({
    where: { id: payment.id },
    data: { status: "refunded" },
  });

  return NextResponse.json({ payment: updated });
}
