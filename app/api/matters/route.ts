import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";
import { MatterStatus } from "@prisma/client";

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

  try {
    const body = await req.json();
    const { clientId, title, matterNumber, practiceArea, status, description } = body ?? {};
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
        status: (status as MatterStatus) || MatterStatus.ACTIVE,
        description: description || null,
      },
    });
    return NextResponse.json({ matter }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
