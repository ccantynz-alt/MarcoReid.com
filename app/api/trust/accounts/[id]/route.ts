import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_req: Request, context: RouteContext) {
  const userId = await getUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;

  const account = await prisma.legalTrustAccount.findFirst({
    where: { id, firmId: userId },
    include: {
      ledgers: {
        orderBy: { createdAt: "desc" },
      },
      reconciliations: {
        orderBy: { periodEnd: "desc" },
        take: 5,
      },
      _count: { select: { transactions: true, ledgers: true } },
    },
  });

  if (!account) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ account });
}
