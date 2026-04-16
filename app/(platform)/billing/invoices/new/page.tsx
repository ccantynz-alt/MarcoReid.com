import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";
import InvoiceWizard from "./InvoiceWizard";

export const dynamic = "force-dynamic";

export default async function NewInvoicePage() {
  const userId = await getUserId();
  if (!userId) redirect("/login?next=/billing/invoices/new");

  const [clients, matters, entries, user] = await Promise.all([
    prisma.client.findMany({
      where: { userId },
      orderBy: { name: "asc" },
      select: { id: true, name: true, companyName: true, email: true },
    }),
    prisma.matter.findMany({
      where: { userId },
      orderBy: { openedAt: "desc" },
      select: { id: true, title: true, clientId: true, matterNumber: true },
    }),
    prisma.timeEntry.findMany({
      where: { userId, billable: true, invoiced: false },
      include: { matter: { select: { id: true, title: true, clientId: true } } },
      orderBy: { date: "asc" },
    }),
    prisma.user.findUnique({
      where: { id: userId },
      select: { firmName: true, name: true, email: true },
    }),
  ]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 lg:px-12">
      <Link
        href="/billing/invoices"
        className="text-sm text-navy-400 hover:text-navy-600"
      >
        &larr; All invoices
      </Link>
      <h1 className="mt-2 font-serif text-display text-navy-800">Create invoice</h1>
      <p className="mt-1 text-sm text-navy-400">
        Pick a client, select billable time entries, and recognise the work with a
        professional invoice.
      </p>

      <InvoiceWizard
        firmName={user?.firmName ?? user?.name ?? "Your firm"}
        firmEmail={user?.email ?? ""}
        clients={clients}
        matters={matters}
        entries={entries.map((e) => ({
          id: e.id,
          description: e.description,
          date: e.date.toISOString(),
          minutes: e.minutes,
          rateInCents: e.rateInCents,
          matterId: e.matterId,
          matterTitle: e.matter.title,
          clientId: e.matter.clientId,
        }))}
      />
    </div>
  );
}
