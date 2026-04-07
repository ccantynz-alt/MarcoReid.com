"use client";

import { useState } from "react";

const products = [
  { id: "reporter", label: "Reporter (transcription)" },
  { id: "docket", label: "Docket (scheduling)" },
  { id: "filings", label: "Filings (e-filing)" },
  { id: "bench", label: "Bench (judicial AI)" },
  { id: "public", label: "Public (transparency)" },
];

export default function PilotForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const form = new FormData(e.currentTarget);
    const payload = {
      name: form.get("name"),
      role: form.get("role"),
      court: form.get("court"),
      jurisdiction: form.get("jurisdiction"),
      email: form.get("email"),
      phone: form.get("phone"),
      products: products.filter((p) => form.get(`product_${p.id}`)).map((p) => p.id),
      useCase: form.get("useCase"),
    };
    try {
      const res = await fetch("/api/courts/pilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Submission failed");
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Submission failed");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-xl border border-forest-200 bg-forest-50 p-8 text-center">
        <h2 className="font-serif text-headline text-forest-700">Request received.</h2>
        <p className="mt-4 text-navy-500">
          We&rsquo;ll be in touch within two business days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field name="name" label="Your name" required />
        <Field name="role" label="Role" placeholder="Judge, court administrator, clerk..." required />
        <Field name="court" label="Court" placeholder="e.g. Cook County Circuit Court" required />
        <Field name="jurisdiction" label="Jurisdiction" placeholder="e.g. Illinois, USA" required />
        <Field name="email" label="Work email" type="email" required />
        <Field name="phone" label="Phone" type="tel" />
      </div>

      <div>
        <label className="block text-sm font-semibold text-navy-700">Products of interest</label>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {products.map((p) => (
            <label
              key={p.id}
              className="flex items-center gap-3 rounded-lg border border-navy-100 bg-white p-3 text-sm text-navy-600"
            >
              <input
                type="checkbox"
                name={`product_${p.id}`}
                className="h-4 w-4 rounded border-navy-200 text-forest-600"
              />
              {p.label}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="useCase" className="block text-sm font-semibold text-navy-700">
          Use case
        </label>
        <textarea
          id="useCase"
          name="useCase"
          rows={5}
          required
          placeholder="What problem are you trying to solve? What does success look like?"
          className="mt-2 w-full rounded-lg border border-navy-200 bg-white p-3 text-navy-700 focus:border-forest-500 focus:outline-none focus:ring-1 focus:ring-forest-500"
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="rounded-full bg-forest-600 px-8 py-3 font-semibold text-white shadow-card transition-all hover:bg-forest-700 disabled:opacity-60"
      >
        {submitting ? "Submitting..." : "Request pilot"}
      </button>
    </form>
  );
}

function Field({
  name,
  label,
  type = "text",
  placeholder,
  required,
}: {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-semibold text-navy-700">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="mt-2 w-full rounded-lg border border-navy-200 bg-white p-3 text-navy-700 focus:border-forest-500 focus:outline-none focus:ring-1 focus:ring-forest-500"
      />
    </div>
  );
}
