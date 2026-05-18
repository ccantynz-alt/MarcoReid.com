import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";
import { rateLimit } from "@/lib/rate-limit";

export async function GET(req: NextRequest) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const matterId = req.nextUrl.searchParams.get("matterId") ?? undefined;
    const deadlines = await prisma.deadline.findMany({
      where: { userId, ...(matterId ? { matterId } : {}) },
      include: { matter: { select: { id: true, title: true, client: { select: { id: true, name: true } } } } },
      orderBy: { dueDate: "asc" },
    });
    return NextResponse.json({ deadlines });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const rl = await rateLimit({ key: `deadlines:${userId}`, limit: 30, windowSeconds: 60 });
  if (!rl.ok) return NextResponse.json({ error: "Too many requests" }, { status: 429 });

  try {
    const body = await req.json();
    const { matterId, title, description, dueDate, courtRule, jurisdiction, priority, reminderDays } = body ?? {};

    if (!matterId || !title || !dueDate) {
      return NextResponse.json({ error: "matterId, title, and dueDate are required" }, { status: 400 });
    }

    // Verify matter belongs to this user
    const matter = await prisma.matter.findFirst({ where: { id: matterId, userId } });
    if (!matter) return NextResponse.json({ error: "Invalid matter" }, { status: 400 });

    const deadline = await prisma.deadline.create({
      data: {
        userId,
        matterId,
        title,
        description: description || null,
        dueDate: new Date(dueDate),
        courtRule: courtRule || null,
        jurisdiction: jurisdiction || null,
        priority: priority || "normal",
        reminderDays: reminderDays ?? 3,
      },
      include: { matter: { select: { id: true, title: true } } },
    });

    return NextResponse.json({ deadline }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
