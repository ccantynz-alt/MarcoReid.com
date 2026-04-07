import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { createConnectAccountLink } from "@/lib/stripe";

export async function POST() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const base = process.env.NEXTAUTH_URL || "http://localhost:3000";
  const { url } = await createConnectAccountLink({
    userId,
    returnUrl: `${base}/dashboard/billing?connect=done`,
    refreshUrl: `${base}/dashboard/billing?connect=refresh`,
  });

  return NextResponse.json({ url });
}
