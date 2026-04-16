import Link from "next/link";
import { redirect } from "next/navigation";
import { getUserId } from "@/lib/session";
import { deriveInvoicesForUser, type InvoiceStatus } from "@/lib/invoices";
import InvoicesListClient from "./InvoicesListClient";

export const dynamic = "force-dynamic";

const VALID: InvoiceStatus[] = ["DRAFT", "SENT", "PAID", "OVERDUE", "VOID"];

type SearchParams = { status?: string; q?: string; clientId?: string };

export default async function InvoicesPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const userId = await getUserId();
  if (!userId) redirect("/login?next=/billing/invoices");

  const status = VALID.includes(searchParams.status as InvoiceStatus)
    ? (searchParams.status as InvoiceStatus)
    : undefined;
  const q = searchParams.q?.trim() || undefined;
  const clientId = searchParams.clientId || undefined;

  const invoices = await deriveInvoicesForUser({ userId, status, q, clientId });

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 lg:px-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link
            href="/billing"
            className="text-sm text-navy-400 hover:text-navy-600"
          >
            &larr; Billing
          </Link>
          <h1 className="mt-2 font-serif text-display text-navy-800">Invoices</h1>
          <p className="mt-1 text-sm text-navy-400">
            Generate, track, and send invoices from your recorded time.
          </p>
        </div>
        <Link
          href="/billing/invoices/new"
          className="inline-flex min-h-touch items-center justify-center rounded-lg bg-navy-500 px-7 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-navy-600"
        >
          Create invoice
        </Link>
      </div>

      <InvoicesListClient
        invoices={invoices.map((i) => ({
          id: i.id,
          invoiceNumber: i.invoiceNumber,
          clientName: i.clientName,
          clientCompany: i.clientCompany,
          matterTitle: i.matterTitle,
          status: i.status,
          issuedAt: i.issuedAt.toISOString(),
          dueAt: i.dueAt ? i.dueAt.toISOString() : null,
          totalCents: i.totalCents,
          currency: i.currency,
        }))}
        initialStatus={status ?? "ALL"}
        initialQuery={q ?? ""}
      />
    </div>
  );
}
