import type { TimeEntry, Matter, Client } from "@prisma/client";
import { prisma } from "@/lib/prisma";

// ------------------------------------------------------------------
// Invoice derivation layer.
//
// Until the Invoice model is merged into the live Prisma schema
// (see prisma/schema.invoice.prisma), we derive invoices at request
// time from TimeEntry rows. Invoiced time entries are grouped by
// matter + ISO week of the earliest date to form a reproducible
// pseudo-invoice identity.
// ------------------------------------------------------------------

export type InvoiceStatus = "DRAFT" | "SENT" | "PAID" | "VOID" | "OVERDUE";

export type InvoiceLineItem = {
  id: string;
  date: Date;
  description: string;
  minutes: number;
  rateInCents: number;
  amountCents: number;
};

export type DerivedInvoice = {
  id: string;
  invoiceNumber: string;
  userId: string;
  clientId: string;
  clientName: string;
  clientEmail: string | null;
  clientCompany: string | null;
  clientAddress: string | null;
  matterId: string | null;
  matterTitle: string | null;
  matterNumber: string | null;
  status: InvoiceStatus;
  issuedAt: Date;
  dueAt: Date | null;
  paidAt: Date | null;
  subtotalCents: number;
  taxCents: number;
  taxPercent: number;
  totalCents: number;
  currency: string;
  notes: string | null;
  timeEntryIds: string[];
  lineItems: InvoiceLineItem[];
};

export function lineAmountCents(minutes: number, rateInCents: number): number {
  return Math.round((minutes / 60) * rateInCents);
}

export function toLineItem(entry: TimeEntry): InvoiceLineItem {
  return {
    id: entry.id,
    date: entry.date,
    description: entry.description,
    minutes: entry.minutes,
    rateInCents: entry.rateInCents,
    amountCents: lineAmountCents(entry.minutes, entry.rateInCents),
  };
}

export function getIsoWeek(date: Date): { year: number; week: number } {
  // ISO 8601 week — Thursday-based
  const target = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = target.getUTCDay() || 7;
  target.setUTCDate(target.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(target.getUTCFullYear(), 0, 1));
  const week = Math.ceil(((target.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return { year: target.getUTCFullYear(), week };
}

export function pseudoInvoiceKey(matterId: string, earliestDate: Date): string {
  const { year, week } = getIsoWeek(earliestDate);
  return `${matterId}:${year}-W${String(week).padStart(2, "0")}`;
}

export function formatInvoiceNumber(year: number, sequence: number): string {
  return `INV-${year}-${String(sequence).padStart(4, "0")}`;
}

// --------------------------------------------------------------
// Derive pseudo-invoices from invoiced TimeEntry rows.
// Groups by matter + ISO week. Status is DRAFT for all derived
// items (no persistence yet), unless the overridden status map
// (e.g. from PATCH call log) supplies otherwise.
// --------------------------------------------------------------

type DeriveArgs = {
  userId: string;
  q?: string;
  status?: InvoiceStatus;
  clientId?: string;
};

export async function deriveInvoicesForUser({
  userId,
  q,
  status,
  clientId,
}: DeriveArgs): Promise<DerivedInvoice[]> {
  const entries = await prisma.timeEntry.findMany({
    where: { userId, invoiced: true, ...(clientId ? { matter: { clientId } } : {}) },
    include: { matter: { include: { client: true } } },
    orderBy: { date: "asc" },
  });

  const groups = new Map<
    string,
    { key: string; entries: (TimeEntry & { matter: Matter & { client: Client } })[] }
  >();
  for (const e of entries) {
    const earliest = e.date;
    const key = pseudoInvoiceKey(e.matterId, earliest);
    const g = groups.get(key);
    if (g) {
      g.entries.push(e);
    } else {
      groups.set(key, { key, entries: [e] });
    }
  }

  // Deterministic invoice numbering by earliest-date order
  const sorted = Array.from(groups.values()).sort(
    (a, b) => a.entries[0].date.getTime() - b.entries[0].date.getTime()
  );

  const invoices: DerivedInvoice[] = sorted.map((g, idx) => {
    const first = g.entries[0];
    const subtotal = g.entries.reduce(
      (s, t) => s + lineAmountCents(t.minutes, t.rateInCents),
      0
    );
    const issued = first.date;
    return {
      id: g.key,
      invoiceNumber: formatInvoiceNumber(issued.getFullYear(), idx + 1),
      userId,
      clientId: first.matter.clientId,
      clientName: first.matter.client.name,
      clientEmail: first.matter.client.email,
      clientCompany: first.matter.client.companyName,
      clientAddress: first.matter.client.address,
      matterId: first.matterId,
      matterTitle: first.matter.title,
      matterNumber: first.matter.matterNumber,
      status: "DRAFT",
      issuedAt: issued,
      dueAt: new Date(issued.getTime() + 30 * 24 * 60 * 60 * 1000),
      paidAt: null,
      subtotalCents: subtotal,
      taxCents: 0,
      taxPercent: 0,
      totalCents: subtotal,
      currency: "USD",
      notes: null,
      timeEntryIds: g.entries.map((e) => e.id),
      lineItems: g.entries
        .slice()
        .sort((a, b) => a.date.getTime() - b.date.getTime())
        .map(toLineItem),
    };
  });

  let filtered = invoices;
  if (status) filtered = filtered.filter((i) => i.status === status);
  if (q) {
    const needle = q.toLowerCase();
    filtered = filtered.filter(
      (i) =>
        i.invoiceNumber.toLowerCase().includes(needle) ||
        i.clientName.toLowerCase().includes(needle) ||
        (i.clientCompany?.toLowerCase().includes(needle) ?? false) ||
        (i.matterTitle?.toLowerCase().includes(needle) ?? false)
    );
  }
  return filtered;
}

export async function findDerivedInvoiceById(
  userId: string,
  id: string
): Promise<DerivedInvoice | null> {
  const all = await deriveInvoicesForUser({ userId });
  return all.find((i) => i.id === id) ?? null;
}

export function formatMoney(cents: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(cents / 100);
}

export const INVOICE_STATUSES: InvoiceStatus[] = [
  "DRAFT",
  "SENT",
  "PAID",
  "OVERDUE",
  "VOID",
];
