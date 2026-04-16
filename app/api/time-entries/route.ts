import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";

type SortKey = "date" | "hours" | "amount" | "matter";

export async function GET(req: NextRequest) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const sp = req.nextUrl.searchParams;
    const q = sp.get("q")?.trim() || undefined;
    const matterId = sp.get("matterId") || undefined;
    const billableParam = sp.get("billable");
    const invoicedParam = sp.get("invoiced");
    const from = sp.get("from") || undefined;
    const to = sp.get("to") || undefined;
    const sort = (sp.get("sort") as SortKey | null) || "date";

    const billable =
      billableParam === "true" ? true : billableParam === "false" ? false : undefined;
    const invoiced =
      invoicedParam === "true" ? true : invoicedParam === "false" ? false : undefined;

    const where: Prisma.TimeEntryWhereInput = {
      userId,
      ...(matterId ? { matterId } : {}),
      ...(billable !== undefined ? { billable } : {}),
      ...(invoiced !== undefined ? { invoiced } : {}),
      ...(from || to
        ? {
            date: {
              ...(from ? { gte: new Date(from) } : {}),
              ...(to ? { lte: new Date(to) } : {}),
            },
          }
        : {}),
      ...(q
        ? {
            OR: [
              { description: { contains: q, mode: "insensitive" } },
              { matter: { title: { contains: q, mode: "insensitive" } } },
            ],
          }
        : {}),
    };

    // For date/matter we can sort at DB level. For hours/amount we sort in memory
    // because amount is derived.
    const orderBy: Prisma.TimeEntryOrderByWithRelationInput =
      sort === "matter"
        ? { matter: { title: "asc" } }
        : sort === "hours"
          ? { minutes: "desc" }
          : { date: "desc" };

    const rawEntries = await prisma.timeEntry.findMany({
      where,
      include: { matter: { select: { id: true, title: true, client: { select: { id: true, name: true } } } } },
      orderBy,
    });

    const timeEntries =
      sort === "amount"
        ? [...rawEntries].sort(
            (a, b) =>
              Math.round((b.minutes / 60) * b.rateInCents) -
              Math.round((a.minutes / 60) * a.rateInCents)
          )
        : rawEntries;

    // Summary
    let totalMinutes = 0;
    let billableMinutes = 0;
    let billableCents = 0;
    let invoicedCents = 0;
    for (const e of timeEntries) {
      totalMinutes += e.minutes;
      const cents = Math.round((e.minutes / 60) * e.rateInCents);
      if (e.billable) {
        billableMinutes += e.minutes;
        billableCents += cents;
        if (e.invoiced) invoicedCents += cents;
      }
    }

    return NextResponse.json({
      timeEntries,
      summary: {
        count: timeEntries.length,
        totalMinutes,
        billableMinutes,
        billableCents,
        invoicedCents,
      },
    });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const { matterId, description, minutes, rateInCents, date, billable, invoiced } = body ?? {};
    if (
      !matterId ||
      typeof description !== "string" ||
      !description.trim() ||
      typeof minutes !== "number" ||
      !Number.isFinite(minutes) ||
      minutes <= 0 ||
      typeof rateInCents !== "number" ||
      !Number.isFinite(rateInCents) ||
      rateInCents < 0 ||
      !date
    ) {
      return NextResponse.json(
        {
          error:
            "matterId, description, minutes (>0), rateInCents (>=0), and date are required",
        },
        { status: 400 }
      );
    }
    const matter = await prisma.matter.findFirst({ where: { id: matterId, userId } });
    if (!matter) return NextResponse.json({ error: "Invalid matter" }, { status: 400 });

    const entry = await prisma.timeEntry.create({
      data: {
        userId,
        matterId,
        description: description.trim(),
        minutes: Math.round(minutes),
        rateInCents: Math.round(rateInCents),
        date: new Date(date),
        billable: billable ?? true,
        invoiced: invoiced ?? false,
      },
      include: { matter: { select: { id: true, title: true } } },
    });
    return NextResponse.json({ timeEntry: entry }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
