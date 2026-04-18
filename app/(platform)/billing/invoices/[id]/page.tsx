import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";
import { findDerivedInvoiceById, formatMoney } from "@/lib/invoices";
import InvoiceActions from "./InvoiceActions";

export const dynamic = "force-dynamic";

function formatDate(date: Date | null | undefined) {
  if (!date) return "—";
  return new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(date);
}

const statusStyles: Record<string, string> = {
  DRAFT: "bg-navy-50 text-navy-500",
  SENT: "bg-forest-50 text-forest-600",
  PAID: "bg-forest-100 text-forest-600",
  OVERDUE: "bg-plum-50 text-plum-600",
  VOID: "bg-navy-100 text-navy-400",
};

export default async function InvoiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const userId = await getUserId();
  const { id } = await params;
  if (!userId) redirect(`/login?next=/billing/invoices/${id}`);

  const invoiceId = decodeURIComponent(id);
  const [invoice, user] = await Promise.all([
    findDerivedInvoiceById(userId, invoiceId),
    prisma.user.findUnique({
      where: { id: userId },
      select: { firmName: true, name: true, email: true },
    }),
  ]);
  if (!invoice) notFound();

  const firmName = user?.firmName ?? user?.name ?? "Your firm";
  const firmEmail = user?.email ?? "";

  return (
    <div className="mx-auto max-w-4xl px-6 py-12 sm:px-8 lg:px-12">
      <div className="no-print mb-6 flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/billing/invoices"
          className="text-sm text-navy-400 hover:text-navy-600"
        >
          &larr; All invoices
        </Link>
        <InvoiceActions
          invoiceId={invoice.id}
          invoiceNumber={invoice.invoiceNumber}
          clientEmail={invoice.clientEmail}
        />
      </div>

      <article className="invoice-sheet rounded-2xl border border-navy-100 bg-white p-10 shadow-card print:border-0 print:shadow-none">
        <header className="flex flex-wrap items-start justify-between gap-6 border-b border-navy-100 pb-6">
          <div>
            <h1 className="font-serif text-3xl text-navy-800">{firmName}</h1>
            {firmEmail && (
              <p className="text-sm text-navy-500">{firmEmail}</p>
            )}
          </div>
          <div className="text-right">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-navy-400">
              Invoice
            </div>
            <div className="mt-1 font-serif text-2xl text-navy-800">
              {invoice.invoiceNumber}
            </div>
            <span
              className={`mt-2 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                statusStyles[invoice.status] ?? "bg-navy-50 text-navy-500"
              }`}
            >
              {invoice.status}
            </span>
          </div>
        </header>

        <section className="mt-8 grid gap-6 sm:grid-cols-2">
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wide text-navy-400">
              Bill to
            </h2>
            <div className="mt-2 text-sm text-navy-700">
              <div className="font-semibold">{invoice.clientName}</div>
              {invoice.clientCompany && <div>{invoice.clientCompany}</div>}
              {invoice.clientEmail && (
                <div className="text-navy-500">{invoice.clientEmail}</div>
              )}
              {invoice.clientAddress && (
                <div className="mt-1 whitespace-pre-wrap text-navy-500">
                  {invoice.clientAddress}
                </div>
              )}
            </div>
          </div>
          <dl className="grid grid-cols-2 gap-3 text-sm sm:text-right">
            <div className="sm:col-span-2">
              <dt className="text-xs font-semibold uppercase tracking-wide text-navy-400">
                Issued
              </dt>
              <dd className="text-navy-700">{formatDate(invoice.issuedAt)}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-xs font-semibold uppercase tracking-wide text-navy-400">
                Due
              </dt>
              <dd className="text-navy-700">{formatDate(invoice.dueAt)}</dd>
            </div>
            {invoice.matterTitle && (
              <div className="sm:col-span-2">
                <dt className="text-xs font-semibold uppercase tracking-wide text-navy-400">
                  Matter
                </dt>
                <dd className="text-navy-700">
                  {invoice.matterTitle}
                  {invoice.matterNumber ? ` — ${invoice.matterNumber}` : ""}
                </dd>
              </div>
            )}
          </dl>
        </section>

        <section className="mt-8">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-navy-400">
            Services rendered
          </h2>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-navy-200 text-left text-xs font-semibold uppercase tracking-wide text-navy-400">
                  <th className="py-2 pr-4">Date</th>
                  <th className="py-2 pr-4">Description</th>
                  <th className="py-2 pr-4 text-right">Hours</th>
                  <th className="py-2 pr-4 text-right">Rate</th>
                  <th className="py-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {invoice.lineItems.map((li: { id: string; date: Date; description: string; minutes: number; rateInCents: number; amountCents: number }) => (
                  <tr key={li.id} className="border-b border-navy-50 align-top">
                    <td className="py-3 pr-4 text-navy-500">
                      {new Intl.DateTimeFormat("en-US", {
                        dateStyle: "medium",
                      }).format(li.date)}
                    </td>
                    <td className="py-3 pr-4 text-navy-700">{li.description}</td>
                    <td className="py-3 pr-4 text-right text-navy-500">
                      {(li.minutes / 60).toFixed(2)}
                    </td>
                    <td className="py-3 pr-4 text-right text-navy-500">
                      {formatMoney(li.rateInCents, invoice.currency)}
                    </td>
                    <td className="py-3 text-right font-medium text-navy-700">
                      {formatMoney(li.amountCents, invoice.currency)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-6 flex flex-col items-end">
          <dl className="w-full max-w-xs space-y-1 text-sm">
            <div className="flex justify-between text-navy-500">
              <dt>Subtotal</dt>
              <dd>{formatMoney(invoice.subtotalCents, invoice.currency)}</dd>
            </div>
            <div className="flex justify-between text-navy-500">
              <dt>Tax ({invoice.taxPercent.toFixed(2)}%)</dt>
              <dd>{formatMoney(invoice.taxCents, invoice.currency)}</dd>
            </div>
            <div className="flex justify-between border-t border-navy-200 pt-2 font-semibold text-navy-800">
              <dt>Total due</dt>
              <dd>{formatMoney(invoice.totalCents, invoice.currency)}</dd>
            </div>
          </dl>
        </section>

        {invoice.notes && (
          <section className="mt-8 rounded-xl bg-navy-50 p-4 text-sm text-navy-600">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-navy-400">
              Notes
            </h3>
            <p className="mt-1 whitespace-pre-wrap">{invoice.notes}</p>
          </section>
        )}

        <footer className="mt-10 border-t border-navy-100 pt-6 text-xs text-navy-400">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <div className="font-semibold text-navy-500">Payment terms</div>
              <p className="mt-1">
                Payment due within 30 days of issue. Late payments may incur
                interest at the prevailing statutory rate.
              </p>
            </div>
            <div>
              <div className="font-semibold text-navy-500">Remittance</div>
              <p className="mt-1">
                Bank: [Bank name]
                <br />
                Account: [Account number]
                <br />
                Reference: {invoice.invoiceNumber}
              </p>
            </div>
          </div>
          <p className="mt-6 text-center text-[10px] uppercase tracking-[0.2em] text-navy-300">
            Thank you for your custom
          </p>
        </footer>
      </article>

      <style>{`
        @media print {
          html, body { background: #fff !important; }
          .no-print { display: none !important; }
          main, header { background: #fff !important; }
          .invoice-sheet { box-shadow: none !important; border: 0 !important; padding: 0 !important; }
          a[href]:after { content: "" !important; }
          @page { margin: 18mm; }
        }
      `}</style>
    </div>
  );
}
