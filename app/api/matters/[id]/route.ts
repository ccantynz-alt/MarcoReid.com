import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";
import { MatterStatus } from "@prisma/client";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const matter = await prisma.matter.findFirst({
      where: { id, userId },
      include: {
        client: true,
        documents: true,
        timeEntries: { orderBy: { date: "desc" } },
      },
    });
    if (!matter) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ matter });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const existing = await prisma.matter.findFirst({ where: { id, userId } });
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const body = await req.json();
    const { title, matterNumber, practiceArea, status, description, closedAt } = body ?? {};
    const matter = await prisma.matter.update({
      where: { id },
      data: {
        title,
        matterNumber,
        practiceArea,
        status: status as MatterStatus | undefined,
        description,
        closedAt: closedAt ? new Date(closedAt) : undefined,
      },
    });
    return NextResponse.json({ matter });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const existing = await prisma.matter.findFirst({ where: { id, userId } });
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });
    await prisma.matter.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
