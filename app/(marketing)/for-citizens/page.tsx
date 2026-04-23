"use client";

import { useEffect, useState } from "react";

interface PracticeArea {
  id: string;
  slug: string;
  name: string;
  domain: "LAW" | "ACCOUNTING";
  jurisdiction: string;
  summary: string;
}

export default function ForCitizensPage() {
  const [areas, setAreas] = useState<PracticeArea[]>([]);
  const [areaId, setAreaId] = useState("");
  const [jurisdiction, setJurisdiction] = useState("");
  const [summary, setSummary] = useState("");
  const [details, setDetails] = useState("");
  const [budgetHint, setBudgetHint] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    fetch("/api/professional/practice-areas")
      .then((r) => r.json())
      .then((d) => setAreas(d.practiceAreas || []))
      .catch(() => setAreas([]));
  }, []);

  // Default jurisdiction follows the chosen area for sensible mapping.
  useEffect(() => {
    const a = areas.find((x) => x.id === areaId);
    if (a && !jurisdiction) setJurisdiction(a.jurisdiction);
  }, [areaId, areas, jurisdiction]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!areaId || !summary.trim() || !email.trim()) {
      setError("Please tell us the area of help, what's happening, and your email.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/marketplace/matters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          practiceAreaId: areaId,
          jurisdiction,
          summary,
          details,
          budgetHint,
          email,
          name,
        }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Could not post your matter");
      }
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 sm:px-8">
        <div className="rounded-2xl border border-forest-300 bg-white p-10 shadow-card">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-forest-600">
            Posted
          </p>
          <h1 className="mt-3 font-serif text-display text-navy-800">
            Your matter is on the way to a verified professional.
          </h1>
          <p className="mt-4 text-navy-500">
            We&rsquo;ll match you with a licensed lawyer or accountant who
            covers your area and jurisdiction. Every draft they send back to
            you is reviewed and signed off by a real person before it
            reaches you. You&rsquo;ll get an email at{" "}
            <span className="font-medium text-navy-700">{email}</span> when
            there is news.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:px-8 lg:px-12">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">
        For citizens
      </p>
      <h1 className="mt-3 font-serif text-hero text-navy-800">
        Need a lawyer or accountant?
      </h1>
      <p className="mt-4 max-w-2xl text-xl text-navy-500">
        Describe what&rsquo;s happening. We&rsquo;ll match you with a
        verified professional in your jurisdiction. Every piece of work
        that reaches you has been reviewed and signed off by a licensed
        human &mdash; the AI does the drafting, the professional carries
        the responsibility.
      </p>

      <form
        onSubmit={submit}
        className="mt-10 space-y-6 rounded-2xl border border-navy-100 bg-white p-8 shadow-card"
      >
        <div>
          <label
            htmlFor="summary"
            className="block text-sm font-medium text-navy-600"
          >
            What&rsquo;s happening?
          </label>
          <textarea
            id="summary"
            rows={5}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="A few lines is enough. We&rsquo;ll come back to you for the rest."
            className="mt-2 block w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-sm text-navy-700 focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500"
            required
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="areaId"
              className="block text-sm font-medium text-navy-600"
            >
              Area of help
            </label>
            <select
              id="areaId"
              value={areaId}
              onChange={(e) => setAreaId(e.target.value)}
              className="mt-2 block w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-sm text-navy-700 focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500"
              required
            >
              <option value="">Select an area</option>
              {areas.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="jurisdiction"
              className="block text-sm font-medium text-navy-600"
            >
              Jurisdiction
            </label>
            <select
              id="jurisdiction"
              value={jurisdiction}
              onChange={(e) => setJurisdiction(e.target.value)}
              className="mt-2 block w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-sm text-navy-700 focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500"
            >
              <option value="">Auto-detect from area</option>
              <option value="NZ">New Zealand</option>
              <option value="AU">Australia</option>
              <option value="UK">United Kingdom</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
            </select>
          </div>
        </div>

        <div>
          <label
            htmlFor="details"
            className="block text-sm font-medium text-navy-600"
          >
            Anything else we should know? (optional)
          </label>
          <textarea
            id="details"
            rows={3}
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Background, deadlines, documents you have on hand."
            className="mt-2 block w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-sm text-navy-700 focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500"
          />
        </div>

        <div>
          <label
            htmlFor="budgetHint"
            className="block text-sm font-medium text-navy-600"
          >
            Budget guidance (optional)
          </label>
          <input
            id="budgetHint"
            type="text"
            value={budgetHint}
            onChange={(e) => setBudgetHint(e.target.value)}
            placeholder="e.g. up to NZD $500 for the first round"
            className="mt-2 block w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-sm text-navy-700 focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500"
          />
          <p className="mt-2 text-xs text-navy-400">
            A flat lead fee plus the professional&rsquo;s own quote &mdash;
            shown to you before any work starts. No surprises.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-navy-600"
            >
              Your name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 block w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-sm text-navy-700 focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-navy-600"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 block w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-sm text-navy-700 focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500"
              required
            />
          </div>
        </div>

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="flex items-center justify-between border-t border-navy-100 pt-6">
          <p className="text-xs text-navy-400">
            By submitting you agree the work will be reviewed by a licensed
            professional before release.
          </p>
          <button
            type="submit"
            disabled={submitting}
            className="rounded-lg bg-navy-500 px-6 py-3 text-sm font-semibold text-white hover:bg-navy-600 disabled:opacity-50"
          >
            {submitting ? "Posting…" : "Post your matter"}
          </button>
        </div>
      </form>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {[
          {
            title: "Verified humans",
            body: "Every professional on the panel has had their admission and indemnity cover checked.",
          },
          {
            title: "Sign-off, always",
            body: "AI drafts the work; a licensed lawyer or accountant reviews it before you see it.",
          },
          {
            title: "Tamper-evident",
            body: "Every signed-off output is hashed, so any later change is detected automatically.",
          },
        ].map((c) => (
          <div
            key={c.title}
            className="rounded-2xl border border-navy-100 bg-white p-5 shadow-card"
          >
            <p className="font-semibold text-navy-700">{c.title}</p>
            <p className="mt-2 text-sm text-navy-500">{c.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
