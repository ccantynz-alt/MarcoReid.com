import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";

export async function GET(req: NextRequest) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const matterId = req.nextUrl.searchParams.get("matterId") ?? undefined;
    const timeEntries = await prisma.timeEntry.findMany({
      where: { userId, ...(matterId ? { matterId } : {}) },
      include: { matter: { select: { id: true, title: true } } },
      orderBy: { date: "desc" },
    });
    return NextResponse.json({ timeEntries });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const { matterId, description, minutes, rateInCents, date, billable } = body ?? {};
    if (
      !matterId ||
      !description ||
      typeof minutes !== "number" ||
      typeof rateInCents !== "number" ||
      !date
    ) {
      return NextResponse.json(
        { error: "matterId, description, minutes, rateInCents, date required" },
        { status: 400 }
      );
    }
    const matter = await prisma.matter.findFirst({ where: { id: matterId, userId } });
    if (!matter) return NextResponse.json({ error: "Invalid matter" }, { status: 400 });

    const entry = await prisma.timeEntry.create({
      data: {
        userId,
        matterId,
        description,
        minutes,
        rateInCents,
        date: new Date(date),
        billable: billable ?? true,
      },
    });
    return NextResponse.json({ timeEntry: entry }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
