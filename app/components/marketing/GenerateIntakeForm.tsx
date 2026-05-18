"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const JURISDICTIONS = [
  { value: "NZ", label: "New Zealand" },
  { value: "AU", label: "Australia" },
  { value: "UK", label: "United Kingdom" },
  { value: "US", label: "United States" },
] as const;

type Status = "idle" | "submitting" | "error";

export default function GenerateIntakeForm() {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    const form = new FormData(e.currentTarget);
    const payload = {
      situation: String(form.get("situation") || ""),
      jurisdiction: String(form.get("jurisdiction") || "NZ"),
      contactEmail: String(form.get("contactEmail") || "").trim().toLowerCase(),
    };

    if (payload.situation.trim().length < 30) {
      setError(
        "Tell us a bit more about your situation — at least a couple of sentences.",
      );
      setStatus("error");
      return;
    }

    try {
      const res = await fetch("/api/generate/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const j = await res.json();
      if (!res.ok || !j.draftId) {
        setError(j.error || "Could not start your draft. Please try again.");
        setStatus("error");
        return;
      }
      router.push(`/generate/${j.draftId}`);
    } catch {
      setError("Network error. Please try again.");
      setStatus("error");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card sm:p-8"
    >
      <div className="space-y-5">
        <div>
          <label
            htmlFor="situation"
            className="block text-sm font-semibold text-navy-700"
          >
            What do you need a document for?
          </label>
          <p className="mt-1 text-xs text-navy-400">
            Plain English. Who&rsquo;s involved, what&rsquo;s at stake, what
            you&rsquo;re trying to achieve. The AI will figure out which
            document type applies and ask follow-up questions if it needs
            them.
          </p>
          <textarea
            id="situation"
            name="situation"
            required
            rows={6}
            className="mt-3 w-full rounded-xl border border-navy-200 bg-white px-4 py-3 text-sm text-navy-800 placeholder:text-navy-300 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-200"
            placeholder="Example: My tenant in Mt Eden hasn't paid rent in six weeks. I want to issue a 14-day notice and prepare an application to the Tenancy Tribunal if they don't pay. I'm the landlord, sole owner of the property, and I have the tenancy agreement on file."
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="jurisdiction"
              className="block text-sm font-semibold text-navy-700"
            >
              Jurisdiction
            </label>
            <select
              id="jurisdiction"
              name="jurisdiction"
              defaultValue="NZ"
              className="mt-2 w-full rounded-xl border border-navy-200 bg-white px-4 py-3 text-sm text-navy-800 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-200"
            >
              {JURISDICTIONS.map((j) => (
                <option key={j.value} value={j.value}>
                  {j.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="contactEmail"
              className="block text-sm font-semibold text-navy-700"
            >
              Email (optional)
            </label>
            <input
              id="contactEmail"
              name="contactEmail"
              type="email"
              autoComplete="email"
              className="mt-2 w-full rounded-xl border border-navy-200 bg-white px-4 py-3 text-sm text-navy-800 placeholder:text-navy-300 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-200"
              placeholder="you@example.com"
            />
            <p className="mt-1 text-xs text-navy-400">
              We&rsquo;ll send your draft link here so you can come back to
              it.
            </p>
          </div>
        </div>

        {error && (
          <p
            role="alert"
            className="rounded-xl border border-plum-200 bg-plum-50 px-4 py-3 text-sm text-plum-700"
          >
            {error}
          </p>
        )}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-navy-400">
            Free draft. Pay only when a verified professional signs it. No
            account required to start.
          </p>
          <button
            type="submit"
            disabled={status === "submitting"}
            className="inline-flex items-center justify-center rounded-xl bg-gold-400 px-6 py-3 text-sm font-semibold text-navy-900 shadow-sm transition-all hover:bg-gold-300 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "submitting" ? "Drafting…" : "Draft my document →"}
          </button>
        </div>
      </div>
    </form>
  );
}
