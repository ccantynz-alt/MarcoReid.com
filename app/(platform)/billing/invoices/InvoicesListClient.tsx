"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { InvoiceStatus } from "@/lib/invoices";

type Row = {
  id: string;
  invoiceNumber: string;
  clientName: string;
  clientCompany: string | null;
  matterTitle: string | null;
  status: InvoiceStatus;
  issuedAt: string;
  dueAt: string | null;
  totalCents: number;
  currency: string;
};

type Tab = "ALL" | InvoiceStatus;

const TABS: Tab[] = ["ALL", "DRAFT", "SENT", "PAID", "OVERDUE", "VOID"];

const statusStyles: Record<InvoiceStatus, string> = {
  DRAFT: "bg-navy-50 text-navy-500",
  SENT: "bg-forest-50 text-forest-600",
  PAID: "bg-forest-100 text-forest-600",
  OVERDUE: "bg-plum-50 text-plum-600",
  VOID: "bg-navy-100 text-navy-400",
};

function formatMoney(cents: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(cents / 100);
}

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(
    new Date(iso)
  );
}

export default function InvoicesListClient({
  invoices,
  initialStatus,
  initialQuery,
}: {
  invoices: Row[];
  initialStatus: Tab;
  initialQuery: string;
}) {
  const [tab, setTab] = useState<Tab>(initialStatus);
  const [query, setQuery] = useState(initialQuery);

  const filtered = useMemo(() => {
    let rows = invoices;
    if (tab !== "ALL") rows = rows.filter((r) => r.status === tab);
    const needle = query.trim().toLowerCase();
    if (needle) {
      rows = rows.filter(
        (r) =>
          r.invoiceNumber.toLowerCase().includes(needle) ||
          r.clientName.toLowerCase().includes(needle) ||
          (r.clientCompany?.toLowerCase().includes(needle) ?? false) ||
          (r.matterTitle?.toLowerCase().includes(needle) ?? false)
      );
    }
    return rows;
  }, [invoices, tab, query]);

  const totals = useMemo(() => {
    const byStatus: Record<Tab, number> = {
      ALL: invoices.length,
      DRAFT: 0,
      SENT: 0,
      PAID: 0,
      OVERDUE: 0,
      VOID: 0,
    };
    for (const inv of invoices) byStatus[inv.status]++;
    return byStatus;
  }, [invoices]);

  return (
    <>
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <div
          role="tablist"
          aria-label="Filter by status"
          className="flex flex-wrap gap-1 rounded-xl border border-navy-100 bg-white p-1 shadow-card"
        >
          {TABS.map((t) => {
            const active = t === tab;
            return (
              <button
                key={t}
                role="tab"
                aria-selected={active}
                onClick={() => setTab(t)}
                className={`rounded-lg px-3 py-2 text-xs font-semibold uppercase tracking-wide transition-colors ${
                  active
                    ? "bg-navy-500 text-white"
                    : "text-navy-500 hover:bg-navy-50"
                }`}
              >
                {t === "ALL" ? "All" : t.charAt(0) + t.slice(1).toLowerCase()}
                <span
                  className={`ml-2 inline-flex min-w-[1.5rem] justify-center rounded-full px-1.5 text-[10px] ${
                    active ? "bg-white/20 text-white" : "bg-navy-50 text-navy-400"
                  }`}
                >
                  {totals[t]}
                </span>
              </button>
            );
          })}
        </div>
        <div className="ml-auto flex-1 sm:flex-none">
          <label htmlFor="invoice-search" className="sr-only">
            Search invoices
          </label>
          <input
            id="invoice-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by client or invoice number"
            className="w-full min-w-[18rem] rounded-lg border border-navy-200 bg-white px-4 py-2 text-sm text-navy-700 placeholder:text-navy-300 focus:border-navy-400 focus:outline-none focus:ring-2 focus:ring-navy-200"
          />
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-card">
        {filtered.length === 0 ? (
          <div className="p-10 text-center text-sm text-navy-400">
            {invoices.length === 0
              ? "No invoices yet. Generate your first invoice from your billable time."
              : "No invoices match that filter."}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px]">
              <thead className="border-b border-navy-100 bg-navy-50/50">
                <tr className="text-left text-xs font-semibold uppercase tracking-wide text-navy-400">
                  <th className="px-6 py-3">Invoice</th>
                  <th className="px-6 py-3">Client</th>
                  <th className="px-6 py-3">Matter</th>
                  <th className="px-6 py-3">Issued</th>
                  <th className="px-6 py-3">Due</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((inv) => (
                  <tr
                    key={inv.id}
                    className="border-b border-navy-50 last:border-0 hover:bg-navy-50/40"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-navy-700">
                      <Link
                        href={`/billing/invoices/${encodeURIComponent(inv.id)}`}
                        className="hover:text-navy-900"
                      >
                        {inv.invoiceNumber}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-sm text-navy-500">
                      <div className="text-navy-700">{inv.clientName}</div>
                      {inv.clientCompany && (
                        <div className="text-xs text-navy-400">
                          {inv.clientCompany}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-navy-500">
                      {inv.matterTitle ?? "—"}
                    </td>
                    <td className="px-6 py-4 text-sm text-navy-500">
                      {formatDate(inv.issuedAt)}
                    </td>
                    <td className="px-6 py-4 text-sm text-navy-500">
                      {inv.dueAt ? formatDate(inv.dueAt) : "—"}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyles[inv.status]}`}
                      >
                        {inv.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-semibold text-navy-700">
                      {formatMoney(inv.totalCents, inv.currency)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
