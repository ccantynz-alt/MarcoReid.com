"use client";

import { useState } from "react";

interface MatterOption {
  id: string;
  title: string;
  clientName?: string;
}

export default function TimeEntryQuickAdd({
  matters,
  defaultRateInCents = 30000,
  onCreated,
}: {
  matters: MatterOption[];
  defaultRateInCents?: number;
  onCreated?: () => void;
}) {
  const [form, setForm] = useState({
    date: new Date().toISOString().slice(0, 10),
    matterId: matters[0]?.id ?? "",
    hours: "",
    description: "",
    rateInCents: defaultRateInCents,
    billable: true,
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    const hoursNum = parseFloat(form.hours);
    if (!Number.isFinite(hoursNum) || hoursNum <= 0) {
      setError("Enter hours as a decimal (e.g. 0.25)");
      return;
    }
    if (!form.matterId) {
      setError("Matter is required");
      return;
    }
    if (!form.description.trim()) {
      setError("Description is required");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/time-entries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          matterId: form.matterId,
          description: form.description.trim(),
          minutes: Math.round(hoursNum * 60),
          rateInCents: form.rateInCents,
          date: new Date(form.date).toISOString(),
          billable: form.billable,
        }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.error || "Failed to save");
      }
      setSuccess(true);
      setForm((f) => ({ ...f, hours: "", description: "" }));
      onCreated?.();
      try {
        window.dispatchEvent(new CustomEvent("mr:time-entry:created"));
      } catch {}
      setTimeout(() => setSuccess(false), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setSubmitting(false);
    }
  }

  const input =
    "w-full rounded-lg border border-navy-200 bg-white px-3 py-2 text-sm text-navy-700 placeholder:text-navy-300 focus:border-navy-500 focus:outline-none focus:ring-2 focus:ring-navy-100";
  const label = "block text-xs font-medium text-navy-500 mb-1";

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-navy-100 bg-white p-5 shadow-card"
      aria-label="Quick add time entry"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-navy-700">Quick add</h3>
        <span className="text-xs text-navy-400">Manual entry</span>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-6">
        <div className="sm:col-span-2">
          <label className={label} htmlFor="qa-date">
            Date
          </label>
          <input
            id="qa-date"
            type="date"
            className={input}
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
        </div>
        <div className="sm:col-span-4">
          <label className={label} htmlFor="qa-matter">
            Matter
          </label>
          <select
            id="qa-matter"
            className={input}
            value={form.matterId}
            onChange={(e) => setForm({ ...form, matterId: e.target.value })}
            required
          >
            <option value="">Select…</option>
            {matters.map((m) => (
              <option key={m.id} value={m.id}>
                {m.title}
                {m.clientName ? ` — ${m.clientName}` : ""}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-1">
          <label className={label} htmlFor="qa-hours">
            Hours
          </label>
          <input
            id="qa-hours"
            type="number"
            step="0.01"
            min="0"
            inputMode="decimal"
            className={input}
            placeholder="0.25"
            value={form.hours}
            onChange={(e) => setForm({ ...form, hours: e.target.value })}
            required
          />
        </div>

        <div className="sm:col-span-3">
          <label className={label} htmlFor="qa-desc">
            Description
          </label>
          <input
            id="qa-desc"
            type="text"
            className={input}
            placeholder="What was this for?"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          />
        </div>

        <div className="sm:col-span-1">
          <label className={label} htmlFor="qa-rate">
            Rate ($/hr)
          </label>
          <input
            id="qa-rate"
            type="number"
            min="0"
            step="0.01"
            className={input}
            value={(form.rateInCents / 100).toFixed(2)}
            onChange={(e) =>
              setForm({
                ...form,
                rateInCents: Math.round(parseFloat(e.target.value || "0") * 100),
              })
            }
          />
        </div>

        <div className="sm:col-span-1 flex items-end">
          <label className="flex cursor-pointer items-center gap-2 pb-2 text-sm text-navy-600">
            <input
              type="checkbox"
              checked={form.billable}
              onChange={(e) => setForm({ ...form, billable: e.target.checked })}
              className="h-4 w-4 rounded border-navy-300 text-forest-600 focus:ring-forest-500"
            />
            Billable
          </label>
        </div>
      </div>

      {error && (
        <p className="mt-3 rounded-lg bg-plum-50 px-3 py-2 text-sm text-plum-700">{error}</p>
      )}
      {success && (
        <p className="mt-3 rounded-lg bg-forest-50 px-3 py-2 text-sm text-forest-700">
          Time entry added.
        </p>
      )}

      <div className="mt-4 flex items-center justify-end">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex min-h-touch items-center justify-center rounded-lg bg-navy-500 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-navy-600 disabled:opacity-50"
        >
          {submitting ? "Adding…" : "Add entry"}
        </button>
      </div>
    </form>
  );
}
