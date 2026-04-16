"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface MatterOption {
  id: string;
  title: string;
  clientName?: string;
}

interface Props {
  entry: {
    id: string;
    matterId: string;
    description: string;
    minutes: number;
    rateInCents: number;
    date: string; // ISO
    billable: boolean;
    invoiced: boolean;
  };
  matters: MatterOption[];
}

export default function EditTimeEntryForm({ entry, matters }: Props) {
  const router = useRouter();
  const [form, setForm] = useState({
    matterId: entry.matterId,
    description: entry.description,
    hours: (entry.minutes / 60).toFixed(2),
    rateInCents: entry.rateInCents,
    date: entry.date.slice(0, 10),
    billable: entry.billable,
    invoiced: entry.invoiced,
  });
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const hoursNum = parseFloat(form.hours);
    if (!Number.isFinite(hoursNum) || hoursNum <= 0) {
      setError("Hours must be > 0");
      return;
    }
    if (!form.description.trim()) {
      setError("Description is required");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch(`/api/time-entries/${entry.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          matterId: form.matterId,
          description: form.description.trim(),
          minutes: Math.round(hoursNum * 60),
          rateInCents: form.rateInCents,
          date: new Date(form.date).toISOString(),
          billable: form.billable,
          invoiced: form.invoiced,
        }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.error || "Failed to save");
      }
      router.push("/time");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      setSubmitting(false);
    }
  }

  async function handleDelete() {
    if (!window.confirm("Delete this time entry?")) return;
    setDeleting(true);
    setError(null);
    try {
      const res = await fetch(`/api/time-entries/${entry.id}`, { method: "DELETE" });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.error || "Failed to delete");
      }
      router.push("/time");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      setDeleting(false);
    }
  }

  const input =
    "w-full rounded-lg border border-navy-200 bg-white px-4 py-2.5 text-sm text-navy-700 placeholder:text-navy-300 focus:border-navy-500 focus:outline-none focus:ring-2 focus:ring-navy-100";
  const label = "block text-sm font-medium text-navy-600 mb-1.5";

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 space-y-5 rounded-2xl border border-navy-100 bg-white p-8 shadow-card"
    >
      <div>
        <label className={label} htmlFor="ed-matter">
          Matter *
        </label>
        <select
          id="ed-matter"
          required
          className={input}
          value={form.matterId}
          onChange={(e) => setForm({ ...form, matterId: e.target.value })}
        >
          {matters.map((m) => (
            <option key={m.id} value={m.id}>
              {m.title}
              {m.clientName ? ` — ${m.clientName}` : ""}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className={label} htmlFor="ed-desc">
          Description *
        </label>
        <input
          id="ed-desc"
          required
          className={input}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className={label} htmlFor="ed-hours">
            Hours *
          </label>
          <input
            id="ed-hours"
            required
            type="number"
            step="0.01"
            min="0"
            className={input}
            value={form.hours}
            onChange={(e) => setForm({ ...form, hours: e.target.value })}
          />
        </div>
        <div>
          <label className={label} htmlFor="ed-rate">
            Rate ($/hr)
          </label>
          <input
            id="ed-rate"
            type="number"
            step="0.01"
            min="0"
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
        <div>
          <label className={label} htmlFor="ed-date">
            Date
          </label>
          <input
            id="ed-date"
            type="date"
            className={input}
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-6">
        <label className="flex cursor-pointer items-center gap-2 text-sm text-navy-600">
          <input
            type="checkbox"
            checked={form.billable}
            onChange={(e) => setForm({ ...form, billable: e.target.checked })}
            className="h-4 w-4 rounded border-navy-300 text-forest-600 focus:ring-forest-500"
          />
          Billable
        </label>
        <label className="flex cursor-pointer items-center gap-2 text-sm text-navy-600">
          <input
            type="checkbox"
            checked={form.invoiced}
            onChange={(e) => setForm({ ...form, invoiced: e.target.checked })}
            className="h-4 w-4 rounded border-navy-300 text-plum-600 focus:ring-plum-500"
          />
          Invoiced
        </label>
      </div>

      {error && <p className="rounded-lg bg-plum-50 px-3 py-2 text-sm text-plum-700">{error}</p>}

      <div className="flex flex-wrap items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex min-h-touch items-center justify-center rounded-lg bg-navy-500 px-7 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-navy-600 disabled:opacity-50"
        >
          {submitting ? "Saving…" : "Save changes"}
        </button>
        <Link
          href="/time"
          className="inline-flex min-h-touch items-center rounded-lg px-5 py-3 text-sm font-semibold text-navy-500 hover:text-navy-700"
        >
          Cancel
        </Link>
        <div className="ml-auto">
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting || entry.invoiced}
            title={entry.invoiced ? "Invoiced entries cannot be deleted" : "Delete entry"}
            className="inline-flex min-h-touch items-center justify-center rounded-lg border border-plum-300 bg-white px-5 py-3 text-sm font-semibold text-plum-700 transition-all hover:bg-plum-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {deleting ? "Deleting…" : "Delete entry"}
          </button>
        </div>
      </div>
    </form>
  );
}
