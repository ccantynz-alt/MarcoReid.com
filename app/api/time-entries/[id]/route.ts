import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  try {
    const entry = await prisma.timeEntry.findFirst({
      where: { id, userId },
      include: {
        matter: { select: { id: true, title: true, client: { select: { id: true, name: true } } } },
      },
    });
    if (!entry) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ timeEntry: entry });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  try {
    const existing = await prisma.timeEntry.findFirst({
      where: { id, userId },
    });
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const body = await req.json();
    const {
      matterId,
      description,
      minutes,
      rateInCents,
      date,
      billable,
      invoiced,
    } = body ?? {};

    // If matterId provided, verify user owns it
    if (matterId && matterId !== existing.matterId) {
      const matter = await prisma.matter.findFirst({ where: { id: matterId, userId } });
      if (!matter) return NextResponse.json({ error: "Invalid matter" }, { status: 400 });
    }

    if (minutes !== undefined && (typeof minutes !== "number" || minutes <= 0)) {
      return NextResponse.json({ error: "minutes must be a positive number" }, { status: 400 });
    }
    if (
      rateInCents !== undefined &&
      (typeof rateInCents !== "number" || rateInCents < 0)
    ) {
      return NextResponse.json({ error: "rateInCents must be >= 0" }, { status: 400 });
    }
    if (description !== undefined && (typeof description !== "string" || !description.trim())) {
      return NextResponse.json({ error: "description required" }, { status: 400 });
    }

    const entry = await prisma.timeEntry.update({
      where: { id },
      data: {
        ...(matterId ? { matterId } : {}),
        ...(description !== undefined ? { description: description.trim() } : {}),
        ...(minutes !== undefined ? { minutes: Math.round(minutes) } : {}),
        ...(rateInCents !== undefined ? { rateInCents: Math.round(rateInCents) } : {}),
        ...(date !== undefined ? { date: new Date(date) } : {}),
        ...(billable !== undefined ? { billable } : {}),
        ...(invoiced !== undefined ? { invoiced } : {}),
      },
      include: { matter: { select: { id: true, title: true } } },
    });
    return NextResponse.json({ timeEntry: entry });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  try {
    const existing = await prisma.timeEntry.findFirst({
      where: { id, userId },
    });
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });
    if (existing.invoiced) {
      return NextResponse.json(
        { error: "Cannot delete an invoiced time entry" },
        { status: 400 }
      );
    }
    await prisma.timeEntry.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
