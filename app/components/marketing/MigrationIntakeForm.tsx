"use client";

import { useState } from "react";

const SOURCES = [
  { value: "CLIO", label: "Clio" },
  { value: "LEAP", label: "LEAP" },
  { value: "ACTIONSTEP", label: "actionstep" },
  { value: "XERO", label: "Xero" },
  { value: "MYOB", label: "MYOB" },
  { value: "QUICKBOOKS", label: "QuickBooks" },
  { value: "IRESS", label: "iress" },
  { value: "AFFINITY", label: "Affinity" },
  { value: "OTHER", label: "Something else" },
] as const;

type Status = "idle" | "submitting" | "success" | "error";

export default function MigrationIntakeForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    const form = new FormData(e.currentTarget);
    const payload = {
      email: String(form.get("email") || ""),
      contactName: String(form.get("contactName") || ""),
      firmName: String(form.get("firmName") || ""),
      jurisdiction: String(form.get("jurisdiction") || ""),
      fromSystem: String(form.get("fromSystem") || ""),
      estimatedClients: Number(form.get("estimatedClients") || 0) || undefined,
      estimatedMatters: Number(form.get("estimatedMatters") || 0) || undefined,
      needsTrustData: form.get("needsTrustData") === "on",
      needsTimeData: form.get("needsTimeData") === "on",
      needsDocuments: form.get("needsDocuments") === "on",
      notes: String(form.get("notes") || ""),
    };

    try {
      const res = await fetch("/api/migration/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || `Submit failed (${res.status})`);
      }
      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-forest-200 bg-forest-50 p-8 text-center">
        <p className="font-serif text-xl text-forest-700">Got it.</p>
        <p className="mt-2 text-sm text-forest-600">
          A migration engineer reads every intake. You will hear back within
          24 hours, in writing, with the shape of what we will do and the
          fixed fee.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-2xl border border-navy-100 bg-white p-8 shadow-card"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name" name="contactName" required />
        <Field label="Email" name="email" type="email" required />
        <Field label="Firm name" name="firmName" />
        <Field label="Jurisdiction (NZ, AU, UK, US, CA)" name="jurisdiction" />
      </div>

      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-navy-600">
          Migrating from
        </label>
        <select
          name="fromSystem"
          required
          defaultValue=""
          className="mt-2 w-full rounded-lg border border-navy-200 bg-white px-3 py-2.5 text-sm text-navy-700 focus:border-navy-400 focus:outline-none"
        >
          <option value="" disabled>
            Choose a source system
          </option>
          {SOURCES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Approx. clients" name="estimatedClients" type="number" />
        <Field label="Approx. open matters" name="estimatedMatters" type="number" />
      </div>

      <fieldset className="space-y-2">
        <legend className="text-xs font-semibold uppercase tracking-wider text-navy-600">
          What needs to come across
        </legend>
        <Checkbox name="needsTrustData" label="Trust ledger and history" />
        <Checkbox name="needsTimeData" label="Time entries and billing history" />
        <Checkbox name="needsDocuments" label="Documents and matter files" />
      </fieldset>

      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-navy-600">
          Anything we should know
        </label>
        <textarea
          name="notes"
          rows={4}
          className="mt-2 w-full resize-none rounded-lg border border-navy-200 bg-white px-3 py-2.5 text-sm text-navy-700 focus:border-navy-400 focus:outline-none"
          placeholder="Custom fields, weird workflows, regulatory deadlines we should know about..."
        />
      </div>

      {error && (
        <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex min-h-touch items-center justify-center rounded-lg bg-navy-500 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-600 disabled:opacity-50"
      >
        {status === "submitting" ? "Sending..." : "Request a migration scope"}
      </button>

      <p className="text-xs text-navy-400">
        We do not share migration intake data with anyone. The engineer who
        reads this is on our team.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-wider text-navy-600">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        className="mt-2 w-full rounded-lg border border-navy-200 bg-white px-3 py-2.5 text-sm text-navy-700 focus:border-navy-400 focus:outline-none"
      />
    </div>
  );
}

function Checkbox({ name, label }: { name: string; label: string }) {
  return (
    <label className="flex items-center gap-3 text-sm text-navy-600">
      <input
        type="checkbox"
        name={name}
        className="h-4 w-4 rounded border-navy-300 text-navy-500 focus:ring-navy-400"
      />
      {label}
    </label>
  );
}
