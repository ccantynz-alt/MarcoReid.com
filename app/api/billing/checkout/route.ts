import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { createCheckoutSession } from "@/lib/stripe";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { priceId } = (await req.json()) as { priceId?: string };
  if (!priceId) {
    return NextResponse.json({ error: "priceId required" }, { status: 400 });
  }

  const base = process.env.NEXTAUTH_URL || "http://localhost:3000";
  const checkout = await createCheckoutSession({
    userId,
    priceId,
    successUrl: `${base}/dashboard/billing?success=true`,
    cancelUrl: `${base}/pricing`,
  });

  return NextResponse.json({ url: checkout.url });
}
