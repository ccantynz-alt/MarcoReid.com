"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type ClientOption = {
  id: string;
  name: string;
  companyName: string | null;
  email: string;
};
type MatterOption = {
  id: string;
  title: string;
  clientId: string;
  matterNumber: string | null;
};
type EntryRow = {
  id: string;
  description: string;
  date: string;
  minutes: number;
  rateInCents: number;
  matterId: string;
  matterTitle: string;
  clientId: string;
};

function money(cents: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    cents / 100
  );
}
function lineAmount(minutes: number, rate: number) {
  return Math.round((minutes / 60) * rate);
}
function hours(minutes: number) {
  return (minutes / 60).toFixed(2);
}
function defaultDueDate() {
  const d = new Date();
  d.setDate(d.getDate() + 30);
  return d.toISOString().slice(0, 10);
}

export default function InvoiceWizard({
  firmName,
  firmEmail,
  clients,
  matters,
  entries,
}: {
  firmName: string;
  firmEmail: string;
  clients: ClientOption[];
  matters: MatterOption[];
  entries: EntryRow[];
}) {
  const router = useRouter();
  const [clientId, setClientId] = useState<string>("");
  const [matterId, setMatterId] = useState<string>("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [taxPercent, setTaxPercent] = useState<number>(0);
  const [dueDate, setDueDate] = useState<string>(defaultDueDate());
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const client = clients.find((c) => c.id === clientId) ?? null;

  const mattersForClient = useMemo(
    () => matters.filter((m) => !clientId || m.clientId === clientId),
    [matters, clientId]
  );

  const eligibleEntries = useMemo(() => {
    if (!clientId) return [] as EntryRow[];
    return entries.filter(
      (e) => e.clientId === clientId && (!matterId || e.matterId === matterId)
    );
  }, [entries, clientId, matterId]);

  // When client changes, drop selections that no longer qualify
  function onClientChange(next: string) {
    setClientId(next);
    setMatterId("");
    setSelected(new Set());
  }
  function onMatterChange(next: string) {
    setMatterId(next);
    setSelected((old) => {
      const copy = new Set<string>();
      for (const id of old) {
        const e = entries.find((x) => x.id === id);
        if (e && (!next || e.matterId === next)) copy.add(id);
      }
      return copy;
    });
  }
  function toggleEntry(id: string) {
    setSelected((old) => {
      const copy = new Set(old);
      if (copy.has(id)) copy.delete(id);
      else copy.add(id);
      return copy;
    });
  }
  function selectAllVisible() {
    setSelected(new Set(eligibleEntries.map((e) => e.id)));
  }
  function clearSelection() {
    setSelected(new Set());
  }

  const chosen = eligibleEntries.filter((e) => selected.has(e.id));
  const subtotal = chosen.reduce(
    (s, e) => s + lineAmount(e.minutes, e.rateInCents),
    0
  );
  const taxCents = Math.round((subtotal * taxPercent) / 100);
  const total = subtotal + taxCents;

  async function submit() {
    if (!clientId) {
      setError("Select a client first");
      return;
    }
    if (chosen.length === 0) {
      setError("Select at least one time entry");
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/invoices/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientId,
          matterId: matterId || null,
          timeEntryIds: chosen.map((c) => c.id),
          taxPercent,
          notes: notes || undefined,
          dueDate,
        }),
      });
      const data = (await res.json()) as {
        invoice?: { id: string; invoiceNumber: string };
        error?: string;
      };
      if (!res.ok || !data.invoice) {
        setError(data.error || "Failed to generate invoice");
        setSubmitting(false);
        return;
      }
      router.push(`/billing/invoices/${encodeURIComponent(data.invoice.id)}`);
    } catch {
      setError("Network error");
      setSubmitting(false);
    }
  }

  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
      <div className="space-y-6">
        {/* Step 1: client */}
        <section className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-navy-400">
            Step 1 — Client
          </h2>
          <label htmlFor="client-select" className="sr-only">
            Client
          </label>
          <select
            id="client-select"
            value={clientId}
            onChange={(e) => onClientChange(e.target.value)}
            className="mt-3 w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-sm text-navy-700 focus:border-navy-400 focus:outline-none focus:ring-2 focus:ring-navy-200"
          >
            <option value="">Select a client…</option>
            {clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
                {c.companyName ? ` — ${c.companyName}` : ""}
              </option>
            ))}
          </select>
        </section>

        {/* Step 2: matter */}
        <section className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-navy-400">
            Step 2 — Matter (optional)
          </h2>
          <label htmlFor="matter-select" className="sr-only">
            Matter
          </label>
          <select
            id="matter-select"
            value={matterId}
            onChange={(e) => onMatterChange(e.target.value)}
            disabled={!clientId}
            className="mt-3 w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-sm text-navy-700 focus:border-navy-400 focus:outline-none focus:ring-2 focus:ring-navy-200 disabled:bg-navy-50 disabled:text-navy-300"
          >
            <option value="">All matters for this client</option>
            {mattersForClient.map((m) => (
              <option key={m.id} value={m.id}>
                {m.title}
                {m.matterNumber ? ` — ${m.matterNumber}` : ""}
              </option>
            ))}
          </select>
        </section>

        {/* Step 3: entries */}
        <section className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-navy-400">
              Step 3 — Billable time entries
            </h2>
            <div className="flex gap-2 text-xs">
              <button
                type="button"
                onClick={selectAllVisible}
                disabled={eligibleEntries.length === 0}
                className="rounded-md border border-navy-200 px-2 py-1 text-navy-500 hover:bg-navy-50 disabled:opacity-50"
              >
                Select all
              </button>
              <button
                type="button"
                onClick={clearSelection}
                disabled={selected.size === 0}
                className="rounded-md border border-navy-200 px-2 py-1 text-navy-500 hover:bg-navy-50 disabled:opacity-50"
              >
                Clear
              </button>
            </div>
          </div>
          <div className="mt-3">
            {!clientId ? (
              <p className="py-6 text-center text-sm text-navy-400">
                Pick a client to see uninvoiced billable time.
              </p>
            ) : eligibleEntries.length === 0 ? (
              <p className="py-6 text-center text-sm text-navy-400">
                No uninvoiced billable time for this selection.
              </p>
            ) : (
              <ul className="divide-y divide-navy-50">
                {eligibleEntries.map((e) => {
                  const checked = selected.has(e.id);
                  const amt = lineAmount(e.minutes, e.rateInCents);
                  return (
                    <li key={e.id}>
                      <label className="flex cursor-pointer items-start gap-3 py-3">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleEntry(e.id)}
                          className="mt-1 h-4 w-4 rounded border-navy-300 text-navy-500 focus:ring-navy-400"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-baseline justify-between gap-2">
                            <span className="text-sm font-medium text-navy-700">
                              {e.description}
                            </span>
                            <span className="text-sm font-semibold text-navy-700">
                              {money(amt)}
                            </span>
                          </div>
                          <div className="mt-0.5 text-xs text-navy-400">
                            {new Intl.DateTimeFormat("en-US", {
                              dateStyle: "medium",
                            }).format(new Date(e.date))}{" "}
                            • {hours(e.minutes)}h @ {money(e.rateInCents)}/hr •{" "}
                            {e.matterTitle}
                          </div>
                        </div>
                      </label>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </section>

        {/* Step 4: tax + notes + due date */}
        <section className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-navy-400">
            Step 4 — Tax, due date, notes
          </h2>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="tax-percent"
                className="block text-xs font-semibold text-navy-500"
              >
                Tax percentage
              </label>
              <input
                id="tax-percent"
                type="number"
                min={0}
                max={100}
                step={0.01}
                value={taxPercent}
                onChange={(e) => setTaxPercent(Number(e.target.value) || 0)}
                className="mt-1 w-full rounded-lg border border-navy-200 bg-white px-3 py-2 text-sm text-navy-700 focus:border-navy-400 focus:outline-none focus:ring-2 focus:ring-navy-200"
              />
            </div>
            <div>
              <label
                htmlFor="due-date"
                className="block text-xs font-semibold text-navy-500"
              >
                Due date
              </label>
              <input
                id="due-date"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="mt-1 w-full rounded-lg border border-navy-200 bg-white px-3 py-2 text-sm text-navy-700 focus:border-navy-400 focus:outline-none focus:ring-2 focus:ring-navy-200"
              />
            </div>
          </div>
          <div className="mt-4">
            <label
              htmlFor="notes"
              className="block text-xs font-semibold text-navy-500"
            >
              Notes (optional)
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Payment terms, thank-you note, matter-specific commentary…"
              className="mt-1 w-full rounded-lg border border-navy-200 bg-white px-3 py-2 text-sm text-navy-700 focus:border-navy-400 focus:outline-none focus:ring-2 focus:ring-navy-200"
            />
          </div>
        </section>
      </div>

      {/* Preview pane */}
      <aside className="lg:sticky lg:top-6 lg:self-start">
        <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
          <div className="text-xs font-semibold uppercase tracking-wide text-navy-400">
            Preview
          </div>
          <h3 className="mt-2 font-serif text-xl text-navy-800">{firmName}</h3>
          <p className="text-xs text-navy-400">{firmEmail}</p>

          <div className="mt-5 rounded-lg bg-navy-50 p-3 text-xs text-navy-500">
            <div className="font-semibold text-navy-700">Bill to</div>
            <div className="mt-1">
              {client ? (
                <>
                  <div className="text-navy-700">{client.name}</div>
                  {client.companyName && <div>{client.companyName}</div>}
                  <div>{client.email}</div>
                </>
              ) : (
                <span className="italic text-navy-400">No client selected</span>
              )}
            </div>
          </div>

          <ul className="mt-5 max-h-48 space-y-2 overflow-y-auto text-xs text-navy-500">
            {chosen.length === 0 ? (
              <li className="italic text-navy-400">No line items selected</li>
            ) : (
              chosen.map((e) => (
                <li key={e.id} className="flex justify-between gap-2">
                  <span className="truncate">{e.description}</span>
                  <span className="whitespace-nowrap font-medium text-navy-700">
                    {money(lineAmount(e.minutes, e.rateInCents))}
                  </span>
                </li>
              ))
            )}
          </ul>

          <dl className="mt-5 space-y-1 border-t border-navy-100 pt-4 text-sm">
            <div className="flex justify-between text-navy-500">
              <dt>Subtotal</dt>
              <dd>{money(subtotal)}</dd>
            </div>
            <div className="flex justify-between text-navy-500">
              <dt>Tax ({taxPercent.toFixed(2)}%)</dt>
              <dd>{money(taxCents)}</dd>
            </div>
            <div className="flex justify-between border-t border-navy-100 pt-2 font-semibold text-navy-800">
              <dt>Total</dt>
              <dd>{money(total)}</dd>
            </div>
          </dl>

          {error && (
            <p className="mt-4 rounded-md bg-plum-50 px-3 py-2 text-xs text-plum-600">
              {error}
            </p>
          )}

          <button
            type="button"
            onClick={submit}
            disabled={submitting || !clientId || chosen.length === 0}
            className="mt-5 w-full rounded-lg bg-navy-500 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-600 disabled:opacity-50"
          >
            {submitting ? "Generating…" : "Generate invoice"}
          </button>
          <p className="mt-3 text-[11px] leading-relaxed text-navy-400">
            Selected time entries will be marked as invoiced. You can preview and
            send from the next screen.
          </p>
        </div>
      </aside>
    </div>
  );
}
