import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";
import { MatterStatus } from "@prisma/client";
import { rateLimit } from "@/lib/rate-limit";

export async function GET(req: NextRequest) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const clientId = req.nextUrl.searchParams.get("clientId") ?? undefined;
    const matters = await prisma.matter.findMany({
      where: { userId, ...(clientId ? { clientId } : {}) },
      include: { client: { select: { id: true, name: true } } },
      orderBy: { openedAt: "desc" },
    });
    return NextResponse.json({ matters });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const rl = await rateLimit({ key: `matters:${userId}`, limit: 30, windowSeconds: 60 });
  if (!rl.ok) return NextResponse.json({ error: "Too many requests" }, { status: 429 });

  try {
    const body = await req.json();
    const { clientId, title, matterNumber, practiceArea, jurisdiction, status, description } = body ?? {};
    if (!clientId || !title) {
      return NextResponse.json({ error: "clientId and title required" }, { status: 400 });
    }
    // Verify client belongs to this user
    const client = await prisma.client.findFirst({ where: { id: clientId, userId } });
    if (!client) return NextResponse.json({ error: "Invalid client" }, { status: 400 });

    const matter = await prisma.matter.create({
      data: {
        userId,
        clientId,
        title,
        matterNumber: matterNumber || null,
        practiceArea: practiceArea || null,
        jurisdiction: jurisdiction || null,
        status: (status as MatterStatus) || MatterStatus.ACTIVE,
        description: description || null,
      },
    });
    return NextResponse.json({ matter }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
