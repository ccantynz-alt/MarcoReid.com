"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  draftId: string;
  defaultEmail: string;
  jurisdictionLabel: string;
}

type Status = "idle" | "submitting" | "error";

export default function SignoffRequestForm({
  draftId,
  defaultEmail,
  jurisdictionLabel,
}: Props) {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    const form = new FormData(e.currentTarget);
    const payload = {
      requesterEmail: String(form.get("requesterEmail") || "")
        .trim()
        .toLowerCase(),
      requesterNotes: String(form.get("requesterNotes") || "").trim(),
    };

    if (!payload.requesterEmail || !payload.requesterEmail.includes("@")) {
      setError("Please give us an email so the professional can reach you.");
      setStatus("error");
      return;
    }

    try {
      const res = await fetch(`/api/generate/${draftId}/signoff`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const j = await res.json();
      if (!res.ok) {
        setError(j.error || "Could not submit your request.");
        setStatus("error");
        return;
      }
      router.push(`/generate/${draftId}`);
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label
          htmlFor="requesterEmail"
          className="block text-sm font-semibold text-navy-700"
        >
          Your email
        </label>
        <input
          id="requesterEmail"
          name="requesterEmail"
          type="email"
          required
          autoComplete="email"
          defaultValue={defaultEmail}
          className="mt-2 w-full rounded-xl border border-navy-200 bg-white px-4 py-3 text-sm text-navy-800 placeholder:text-navy-300 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-200"
          placeholder="you@example.com"
        />
        <p className="mt-1 text-xs text-navy-400">
          We&rsquo;ll let you know when the professional reviews your draft.
        </p>
      </div>

      <div>
        <label
          htmlFor="requesterNotes"
          className="block text-sm font-semibold text-navy-700"
        >
          Notes for the reviewer (optional)
        </label>
        <textarea
          id="requesterNotes"
          name="requesterNotes"
          rows={5}
          maxLength={2000}
          className="mt-2 w-full rounded-xl border border-navy-200 bg-white px-4 py-3 text-sm text-navy-800 placeholder:text-navy-300 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-200"
          placeholder="Anything we should know? Deadlines, counterparty preferences, specific clauses you'd like reviewed."
        />
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
          Routed to a verified professional in {jurisdictionLabel}. No payment
          captured at this step &mdash; the reviewer confirms scope + price
          before any work begins.
        </p>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center justify-center rounded-xl bg-gold-400 px-6 py-3 text-sm font-semibold text-navy-900 shadow-sm transition-all hover:bg-gold-300 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting"
            ? "Sending…"
            : "Send for sign-off →"}
        </button>
      </div>
    </form>
  );
}
