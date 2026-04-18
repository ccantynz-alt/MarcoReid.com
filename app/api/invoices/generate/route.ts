import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";
import {
  formatInvoiceNumber,
  lineAmountCents,
  toLineItem,
  type DerivedInvoice,
} from "@/lib/invoices";

// POST /api/invoices/generate
// Body: { clientId, matterId?, timeEntryIds[], taxPercent?, notes?, dueDate? }
// Marks the time entries invoiced=true in a transaction and returns a
// derived invoice object. Invoice itself is not persisted — persistence
// arrives when the Invoice model is merged (see prisma/schema.invoice.prisma).

export async function POST(req: NextRequest) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const {
    clientId,
    matterId,
    timeEntryIds,
    taxPercent,
    notes,
    dueDate,
  } = (body ?? {}) as {
    clientId?: string;
    matterId?: string | null;
    timeEntryIds?: string[];
    taxPercent?: number;
    notes?: string;
    dueDate?: string;
  };

  if (!clientId || !Array.isArray(timeEntryIds) || timeEntryIds.length === 0) {
    return NextResponse.json(
      { error: "clientId and at least one timeEntryId required" },
      { status: 400 }
    );
  }

  const pct = typeof taxPercent === "number" && isFinite(taxPercent) ? taxPercent : 0;
  if (pct < 0 || pct > 100) {
    return NextResponse.json({ error: "taxPercent must be between 0 and 100" }, { status: 400 });
  }

  try {
    // Verify the client belongs to the user
    const client = await prisma.client.findFirst({ where: { id: clientId, userId } });
    if (!client) return NextResponse.json({ error: "Invalid client" }, { status: 400 });

    // Fetch the time entries and verify ownership + invoiced=false + matches client
    const entries = await prisma.timeEntry.findMany({
      where: { id: { in: timeEntryIds }, userId },
      include: { matter: { include: { client: true } } },
    });

    if (entries.length !== timeEntryIds.length) {
      return NextResponse.json(
        { error: "One or more time entries not found or not owned by you" },
        { status: 400 }
      );
    }

    for (const e of entries) {
      if (e.invoiced) {
        return NextResponse.json(
          { error: `Time entry ${e.id} is already invoiced` },
          { status: 400 }
        );
      }
      if (!e.billable) {
        return NextResponse.json(
          { error: `Time entry ${e.id} is not billable` },
          { status: 400 }
        );
      }
      if (e.matter.clientId !== clientId) {
        return NextResponse.json(
          { error: `Time entry ${e.id} does not belong to the selected client` },
          { status: 400 }
        );
      }
      if (matterId && e.matterId !== matterId) {
        return NextResponse.json(
          { error: `Time entry ${e.id} does not belong to the selected matter` },
          { status: 400 }
        );
      }
    }

    // Transaction: mark as invoiced
    await prisma.$transaction(
      entries.map((e) =>
        prisma.timeEntry.update({ where: { id: e.id }, data: { invoiced: true } })
      )
    );

    // Sequential invoice number: count how many invoiced entries exist for this
    // user and derive a stable sequence. We use the count of distinct
    // (matterId + ISO week) groupings as a proxy for "invoices emitted".
    const allInvoicedCount = await prisma.timeEntry.count({
      where: { userId, invoiced: true },
    });
    const year = new Date().getFullYear();
    // Rough sequence: number of invoiced entries is a stable monotonic counter
    // until the Invoice model lands. For a better number, the real Invoice
    // model will have its own unique constraint.
    const sequence = allInvoicedCount; // includes ones we just marked
    const invoiceNumber = formatInvoiceNumber(year, sequence);

    const sortedEntries = entries
      .slice()
      .sort((a, b) => a.date.getTime() - b.date.getTime());
    const first = sortedEntries[0];
    const subtotal = sortedEntries.reduce(
      (s, t) => s + lineAmountCents(t.minutes, t.rateInCents),
      0
    );
    const taxCents = Math.round((subtotal * pct) / 100);
    const total = subtotal + taxCents;
    const issuedAt = new Date();
    const dueAt = dueDate ? new Date(dueDate) : new Date(issuedAt.getTime() + 30 * 24 * 60 * 60 * 1000);

    const invoice: DerivedInvoice = {
      id: `${first.matterId}:${issuedAt.getFullYear()}-W${String(
        Math.ceil((issuedAt.getTime() - new Date(issuedAt.getFullYear(), 0, 1).getTime()) / (7 * 24 * 60 * 60 * 1000))
      ).padStart(2, "0")}`,
      invoiceNumber,
      userId,
      clientId,
      clientName: client.name,
      clientEmail: client.email,
      clientCompany: client.companyName,
      clientAddress: client.address,
      matterId: matterId ?? first.matterId,
      matterTitle: first.matter.title,
      matterNumber: first.matter.matterNumber,
      status: "DRAFT",
      issuedAt,
      dueAt,
      paidAt: null,
      subtotalCents: subtotal,
      taxCents,
      taxPercent: pct,
      totalCents: total,
      currency: "USD",
      notes: notes ?? null,
      timeEntryIds: sortedEntries.map((e) => e.id),
      lineItems: sortedEntries.map(toLineItem),
    };

    return NextResponse.json({ invoice }, { status: 201 });
  } catch (err) {
    console.error("[invoices/generate]", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
