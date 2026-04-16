"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewClientPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    companyName: "",
    address: "",
    notes: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to create client");
      }
      router.push("/clients");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      setSubmitting(false);
    }
  }

  const input =
    "w-full rounded-lg border border-navy-200 bg-white px-4 py-2.5 text-sm text-navy-700 placeholder:text-navy-300 focus:border-navy-500 focus:outline-none focus:ring-2 focus:ring-navy-100 dark:border-navy-600 dark:bg-navy-900 dark:text-white dark:placeholder:text-navy-500 dark:focus:border-navy-400 dark:focus:ring-navy-700";
  const label = "block text-sm font-medium text-navy-600 mb-1.5 dark:text-navy-300";

  return (
    <div className="mx-auto max-w-3xl px-6 py-12 sm:px-8 lg:px-12">
      <h1 className="font-serif text-display text-navy-800 dark:text-white">New client</h1>
      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-5 rounded-2xl border border-navy-100 bg-white p-8 shadow-card dark:border-navy-700 dark:bg-navy-800"
      >
        <div>
          <label className={label}>Name *</label>
          <input
            required
            className={input}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>
        <div>
          <label className={label}>Email *</label>
          <input
            required
            type="email"
            className={input}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
        <div>
          <label className={label}>Phone</label>
          <input
            className={input}
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </div>
        <div>
          <label className={label}>Company</label>
          <input
            className={input}
            value={form.companyName}
            onChange={(e) => setForm({ ...form, companyName: e.target.value })}
          />
        </div>
        <div>
          <label className={label}>Address</label>
          <input
            className={input}
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />
        </div>
        <div>
          <label className={label}>Notes</label>
          <textarea
            rows={4}
            className={input}
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
          />
        </div>

        {error && <p className="text-sm text-plum-600 dark:text-plum-400">{error}</p>}

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex min-h-touch items-center justify-center rounded-lg bg-navy-500 px-7 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-navy-600 disabled:opacity-50 dark:hover:bg-navy-400"
          >
            {submitting ? "Creating..." : "Create client"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex min-h-touch items-center rounded-lg px-5 py-3 text-sm font-semibold text-navy-500 hover:text-navy-700 dark:text-navy-300 dark:hover:text-white"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
