import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";

export async function GET() {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const accounts = await prisma.trustAccount.findMany({
      where: { userId },
      include: { client: { select: { id: true, name: true } } },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ trustAccounts: accounts });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
