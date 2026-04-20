"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

interface PracticeAreaOption {
  id: string;
  slug: string;
  name: string;
  domain: "LAW" | "ACCOUNTING";
  jurisdiction: string;
  summary: string;
  intakeCopy: string;
  leadFeeInCents: number;
  currency: string;
  ackVersion: string;
  ackBullets: string[];
}

export interface DraftSeed {
  id: string;
  jurisdiction: string;
  practiceAreaSlug: string;
  summary: string;
  details: string;
}

function formatFee(cents: number, currency: string) {
  const amount = (cents / 100).toFixed(0);
  return `${currency} $${amount}`;
}

const DETAILS_MIN = 40;
const DETAILS_MAX = 8000;
const SUMMARY_MAX = 200;

export default function PostMatterForm({
  areas,
  draft,
}: {
  areas: PracticeAreaOption[];
  draft?: DraftSeed;
}) {
  const router = useRouter();
  const editing = Boolean(draft);
  const [step, setStep] = useState<1 | 2 | 3 | 4>(editing ? 3 : 1);
  const [jurisdiction, setJurisdiction] = useState<string>(draft?.jurisdiction ?? "NZ");
  const [areaSlug, setAreaSlug] = useState<string>(draft?.practiceAreaSlug ?? "");
  const [summary, setSummary] = useState(draft?.summary ?? "");
  const [details, setDetails] = useState(draft?.details ?? "");
  const [acked, setAcked] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const jurisdictionAreas = useMemo(
    () => areas.filter((a) => a.jurisdiction === jurisdiction),
    [areas, jurisdiction],
  );

  const selectedArea = useMemo(
    () => areas.find((a) => a.slug === areaSlug) ?? null,
    [areas, areaSlug],
  );

  async function submit(post: boolean) {
    if (!selectedArea) return;
    setSubmitting(true);
    setError(null);
    try {
      const url = editing
        ? `/api/marketplace/matters/${draft!.id}`
        : "/api/marketplace/matters";
      const method = editing ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          practiceAreaSlug: selectedArea.slug,
          summary,
          details,
          ackVersion: post ? selectedArea.ackVersion : undefined,
          post,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error ?? "Something went wrong");
        setSubmitting(false);
        return;
      }
      router.push("/my-matters");
    } catch {
      setError("Network error — please try again");
      setSubmitting(false);
    }
  }

  return (
    <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card sm:p-10">
      <ol className="mb-8 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-navy-400">
        {["Where", "What", "Describe", "Confirm"].map((label, i) => {
          const n = (i + 1) as 1 | 2 | 3 | 4;
          const active = step === n;
          const done = step > n;
          return (
            <li key={label} className="flex items-center gap-2">
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] ${
                  active
                    ? "bg-navy-700 text-white"
                    : done
                      ? "bg-forest-500 text-white"
                      : "bg-navy-100 text-navy-500"
                }`}
              >
                {n}
              </span>
              <span className={active ? "text-navy-700" : "text-navy-400"}>{label}</span>
              {n < 4 && <span className="mx-1 h-px w-6 bg-navy-200" aria-hidden="true" />}
            </li>
          );
        })}
      </ol>

      {step === 1 && (
        <div>
          <h2 className="font-serif text-2xl text-navy-800">Where are you based?</h2>
          <p className="mt-2 text-sm text-navy-500">
            This determines which licensed professionals can take on your
            matter. We&rsquo;re currently live in New Zealand and Australia.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              { code: "NZ", label: "New Zealand" },
              { code: "AU", label: "Australia" },
            ].map((j) => (
              <button
                key={j.code}
                type="button"
                onClick={() => setJurisdiction(j.code)}
                className={`rounded-xl border p-5 text-left transition-colors ${
                  jurisdiction === j.code
                    ? "border-gold-400 bg-gold-50"
                    : "border-navy-100 bg-white hover:border-navy-300"
                }`}
              >
                <p className="font-serif text-lg text-navy-800">{j.label}</p>
                <p className="mt-1 text-xs text-navy-400">{j.code}</p>
              </button>
            ))}
          </div>
          <div className="mt-8 flex justify-end">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="rounded-lg bg-navy-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-navy-600"
            >
              Continue &rarr;
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="font-serif text-2xl text-navy-800">
            What kind of matter is this?
          </h2>
          <p className="mt-2 text-sm text-navy-500">
            Pick the closest fit. If nothing matches, you can still post a
            general enquiry and we&rsquo;ll route it.
          </p>
          {jurisdictionAreas.length === 0 ? (
            <p className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
              No practice areas are currently live in {jurisdiction}. Check
              back soon or <a href="/contact" className="underline">contact us</a>.
            </p>
          ) : (
            <div className="mt-6 grid gap-3">
              {jurisdictionAreas.map((a) => (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => setAreaSlug(a.slug)}
                  className={`rounded-xl border p-5 text-left transition-colors ${
                    areaSlug === a.slug
                      ? "border-gold-400 bg-gold-50"
                      : "border-navy-100 bg-white hover:border-navy-300"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-serif text-lg text-navy-800">{a.name}</p>
                      <p className="mt-1 text-sm text-navy-500">{a.summary}</p>
                    </div>
                    <div className="flex-shrink-0 text-right">
                      <p className="text-xs uppercase tracking-wider text-navy-400">
                        Lead fee
                      </p>
                      <p className="mt-1 font-serif text-lg text-navy-800">
                        {formatFee(a.leadFeeInCents, a.currency)}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
          <div className="mt-8 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-sm text-navy-500 hover:text-navy-700"
            >
              &larr; Back
            </button>
            <button
              type="button"
              disabled={!areaSlug}
              onClick={() => setStep(3)}
              className="rounded-lg bg-navy-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-navy-600 disabled:cursor-not-allowed disabled:bg-navy-200"
            >
              Continue &rarr;
            </button>
          </div>
        </div>
      )}

      {step === 3 && selectedArea && (
        <div>
          <h2 className="font-serif text-2xl text-navy-800">
            Describe the problem.
          </h2>
          <p className="mt-2 text-sm text-navy-500">
            Plain English is fine. Include names, dates, and anything you
            think a lawyer or accountant would need. You&rsquo;re not
            expected to know the legal terms.
          </p>

          <div className="mt-6 rounded-lg border border-navy-100 bg-navy-50 p-4 text-sm text-navy-600">
            <p className="font-semibold text-navy-700">{selectedArea.name}</p>
            <p className="mt-1">{selectedArea.intakeCopy}</p>
          </div>

          <div className="mt-6">
            <label htmlFor="summary" className="text-sm font-semibold text-navy-700">
              One-line summary
            </label>
            <input
              id="summary"
              type="text"
              value={summary}
              onChange={(e) => setSummary(e.target.value.slice(0, SUMMARY_MAX))}
              placeholder="e.g. Landlord refusing to return bond after I moved out"
              className="mt-2 w-full rounded-lg border border-navy-200 px-4 py-2.5 text-sm focus:border-gold-400 focus:outline-none"
            />
            <p className="mt-1 text-xs text-navy-400">
              {summary.length} / {SUMMARY_MAX}
            </p>
          </div>

          <div className="mt-5">
            <label htmlFor="details" className="text-sm font-semibold text-navy-700">
              Full details
            </label>
            <textarea
              id="details"
              value={details}
              onChange={(e) => setDetails(e.target.value.slice(0, DETAILS_MAX))}
              rows={10}
              placeholder="What happened? When? Who's involved? What outcome are you hoping for?"
              className="mt-2 w-full rounded-lg border border-navy-200 px-4 py-3 text-sm focus:border-gold-400 focus:outline-none"
            />
            <p className="mt-1 text-xs text-navy-400">
              {details.length} / {DETAILS_MAX}
              {details.length < DETAILS_MIN && (
                <span className="ml-2 text-amber-600">
                  At least {DETAILS_MIN} characters required.
                </span>
              )}
            </p>
          </div>

          <div className="mt-8 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="text-sm text-navy-500 hover:text-navy-700"
            >
              &larr; Back
            </button>
            <button
              type="button"
              disabled={!summary || details.length < DETAILS_MIN}
              onClick={() => setStep(4)}
              className="rounded-lg bg-navy-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-navy-600 disabled:cursor-not-allowed disabled:bg-navy-200"
            >
              Continue &rarr;
            </button>
          </div>
        </div>
      )}

      {step === 4 && selectedArea && (
        <div>
          <h2 className="font-serif text-2xl text-navy-800">
            Confirm and post.
          </h2>
          <p className="mt-2 text-sm text-navy-500">
            Read these points carefully. They apply specifically to{" "}
            <strong>{selectedArea.name}</strong> in {selectedArea.jurisdiction}.
          </p>

          <ul className="mt-6 space-y-3">
            {selectedArea.ackBullets.map((bullet) => (
              <li
                key={bullet}
                className="flex gap-3 rounded-lg border border-navy-100 bg-navy-50 p-4"
              >
                <span
                  className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-gold-500"
                  aria-hidden="true"
                />
                <p className="text-sm text-navy-700">{bullet}</p>
              </li>
            ))}
          </ul>

          <label className="mt-6 flex items-start gap-3 rounded-lg border border-gold-200 bg-gold-50 p-4">
            <input
              type="checkbox"
              checked={acked}
              onChange={(e) => setAcked(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-navy-300 text-navy-600 focus:ring-navy-500"
            />
            <span className="text-sm text-navy-700">
              I have read the points above and understand that Marco Reid is
              a platform — not a law firm or accounting practice — and that a
              licensed professional will review any AI-assisted output before
              anything is filed, sent, or relied on.
            </span>
          </label>

          {error && (
            <p className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </p>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={() => setStep(3)}
              className="text-sm text-navy-500 hover:text-navy-700"
            >
              &larr; Back
            </button>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => submit(false)}
                disabled={submitting}
                className="rounded-lg border border-navy-200 px-5 py-2.5 text-sm font-semibold text-navy-600 hover:bg-navy-50 disabled:opacity-50"
              >
                Save as draft
              </button>
              <button
                type="button"
                onClick={() => submit(true)}
                disabled={!acked || submitting}
                className="rounded-lg bg-gold-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-gold-600 disabled:cursor-not-allowed disabled:bg-navy-200"
              >
                {submitting ? "Posting…" : `Post matter · ${formatFee(selectedArea.leadFeeInCents, selectedArea.currency)}`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
