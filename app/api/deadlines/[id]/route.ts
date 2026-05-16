import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const existing = await prisma.deadline.findFirst({ where: { id, userId } });
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const body = await req.json();
    const { title, description, dueDate, courtRule, jurisdiction, status, priority, reminderDays, completedAt } = body ?? {};

    const deadline = await prisma.deadline.update({
      where: { id },
      data: {
        ...(title !== undefined ? { title } : {}),
        ...(description !== undefined ? { description } : {}),
        ...(dueDate !== undefined ? { dueDate: new Date(dueDate) } : {}),
        ...(courtRule !== undefined ? { courtRule } : {}),
        ...(jurisdiction !== undefined ? { jurisdiction } : {}),
        ...(status !== undefined ? { status } : {}),
        ...(priority !== undefined ? { priority } : {}),
        ...(reminderDays !== undefined ? { reminderDays } : {}),
        ...(completedAt !== undefined ? { completedAt: completedAt ? new Date(completedAt) : null } : {}),
      },
    });

    return NextResponse.json({ deadline });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const existing = await prisma.deadline.findFirst({ where: { id, userId } });
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

    await prisma.deadline.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
