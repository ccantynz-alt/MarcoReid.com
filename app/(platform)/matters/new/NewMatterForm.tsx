"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  clients: { id: string; name: string }[];
}

export default function NewMatterForm({ clients }: Props) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    clientId: clients[0]?.id ?? "",
    title: "",
    matterNumber: "",
    practiceArea: "",
    status: "ACTIVE",
    description: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/matters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to create matter");
      }
      router.push("/matters");
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
    <form
      onSubmit={handleSubmit}
      className="mt-8 space-y-5 rounded-2xl border border-navy-100 bg-white p-8 shadow-card dark:border-navy-700 dark:bg-navy-800"
    >
      <div>
        <label className={label}>Client *</label>
        <select
          required
          className={input}
          value={form.clientId}
          onChange={(e) => setForm({ ...form, clientId: e.target.value })}
        >
          {clients.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className={label}>Title *</label>
        <input
          required
          className={input}
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
      </div>
      <div>
        <label className={label}>Matter number</label>
        <input
          className={input}
          value={form.matterNumber}
          onChange={(e) => setForm({ ...form, matterNumber: e.target.value })}
        />
      </div>
      <div>
        <label className={label}>Practice area</label>
        <input
          className={input}
          placeholder="Immigration, Tax, Family..."
          value={form.practiceArea}
          onChange={(e) => setForm({ ...form, practiceArea: e.target.value })}
        />
      </div>
      <div>
        <label className={label}>Status</label>
        <select
          className={input}
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option value="ACTIVE">Active</option>
          <option value="ON_HOLD">On hold</option>
          <option value="CLOSED">Closed</option>
        </select>
      </div>
      <div>
        <label className={label}>Description</label>
        <textarea
          rows={4}
          className={input}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
      </div>

      {error && <p className="text-sm text-plum-600 dark:text-plum-400">{error}</p>}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex min-h-touch items-center justify-center rounded-lg bg-navy-500 px-7 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-navy-600 disabled:opacity-50 dark:hover:bg-navy-400"
        >
          {submitting ? "Creating..." : "Create matter"}
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
  );
}
