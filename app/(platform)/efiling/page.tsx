"use client";

import { useState } from "react";
import Link from "next/link";
import { COURT_FILING_SYSTEMS, type CourtFilingSystem } from "@/lib/court-efiling";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const COUNTRY_FLAGS: Record<string, string> = {
  US: "\u{1F1FA}\u{1F1F8}",
  UK: "\u{1F1EC}\u{1F1E7}",
  AU: "\u{1F1E6}\u{1F1FA}",
  CA: "\u{1F1E8}\u{1F1E6}",
  NZ: "\u{1F1F3}\u{1F1FF}",
};

const JURISDICTIONS = ["All", "NZ", "AU", "UK", "US", "CA"] as const;
type Jurisdiction = (typeof JURISDICTIONS)[number];

const FILING_TYPES = [
  "Motion",
  "Brief",
  "Complaint",
  "Answer",
  "Discovery",
  "Other",
] as const;

// ---------------------------------------------------------------------------
// Components
// ---------------------------------------------------------------------------

function FilingSystemCard({ system }: { system: CourtFilingSystem }) {
  return (
    <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-card-hover dark:border-navy-700 dark:bg-navy-800">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl" role="img" aria-label={system.country}>
            {COUNTRY_FLAGS[system.country] ?? system.country}
          </span>
          <div>
            <p className="font-semibold text-navy-700 dark:text-navy-200">
              {system.system}
            </p>
            <p className="mt-0.5 text-xs text-navy-400 dark:text-navy-500">
              {system.country}
            </p>
          </div>
        </div>
        <span className="rounded-full bg-navy-50 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-navy-500 dark:bg-navy-700 dark:text-navy-400">
          Coming Soon
        </span>
      </div>

      <div className="mt-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-navy-400 dark:text-navy-500">
          Courts covered
        </p>
        <ul className="mt-2 space-y-1">
          {system.courts.map((court) => (
            <li
              key={court}
              className="flex items-center gap-2 text-sm text-navy-600 dark:text-navy-300"
            >
              <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-navy-300 dark:bg-navy-600" />
              {court}
            </li>
          ))}
        </ul>
      </div>

      <button
        disabled
        className="mt-5 w-full rounded-lg border border-navy-200 bg-navy-50 px-4 py-2.5 text-sm font-semibold text-navy-400 dark:border-navy-600 dark:bg-navy-700 dark:text-navy-500"
      >
        Coming Soon
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function EFilingPage() {
  const [jurisdiction, setJurisdiction] = useState<Jurisdiction>("All");
  const [matter, setMatter] = useState("");
  const [court, setCourt] = useState("");
  const [filingType, setFilingType] = useState("");
  const [document, setDocument] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  const filteredSystems =
    jurisdiction === "All"
      ? COURT_FILING_SYSTEMS
      : COURT_FILING_SYSTEMS.filter((s) => s.country === jurisdiction);

  // Build court options from currently filtered jurisdiction
  const courtOptions = filteredSystems.flatMap((s) =>
    s.courts.map((c) => `${c} (${s.country})`)
  );

  function handleSubmitFiling() {
    setToast("Integration coming soon");
    setTimeout(() => setToast(null), 3000);
  }

  function handleSaveDraft() {
    setToast("Draft saved");
    setTimeout(() => setToast(null), 3000);
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 lg:px-12">
      {/* Toast */}
      {toast && (
        <div className="fixed right-6 top-20 z-50 rounded-xl border border-navy-200 bg-white px-5 py-3 text-sm font-medium text-navy-700 shadow-lg dark:border-navy-600 dark:bg-navy-800 dark:text-navy-200">
          {toast}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-display text-navy-800 dark:text-white">
            Court E-Filing
          </h1>
          <p className="mt-2 text-navy-400 dark:text-navy-500">
            Prepare and submit court filings across multiple jurisdictions from
            one place.
          </p>
        </div>
        <Link
          href="/dashboard"
          className="text-sm text-navy-400 hover:text-navy-600 dark:hover:text-navy-300"
        >
          &larr; Dashboard
        </Link>
      </div>

      {/* Jurisdiction filter tabs */}
      <div className="mt-8">
        <div className="flex rounded-lg border border-navy-200 dark:border-navy-600">
          {JURISDICTIONS.map((j) => (
            <button
              key={j}
              onClick={() => setJurisdiction(j)}
              className={`flex-1 px-3 py-2.5 text-xs font-medium transition-colors first:rounded-l-lg last:rounded-r-lg ${
                jurisdiction === j
                  ? "bg-navy-500 text-white dark:bg-navy-400 dark:text-navy-950"
                  : "bg-white text-navy-500 hover:bg-navy-50 dark:bg-navy-900 dark:text-navy-400 dark:hover:bg-navy-800"
              }`}
            >
              {j === "All" ? "All" : `${COUNTRY_FLAGS[j] ?? ""} ${j}`}
            </button>
          ))}
        </div>
      </div>

      {/* Filing system cards */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredSystems.map((system) => (
          <FilingSystemCard key={system.system} system={system} />
        ))}
      </div>

      {/* Prepare Filing section */}
      <div className="mt-12">
        <h2 className="font-serif text-headline text-navy-800 dark:text-white">
          Prepare Filing
        </h2>
        <div className="mt-4 rounded-2xl border border-navy-100 bg-white p-6 shadow-card dark:border-navy-700 dark:bg-navy-800 sm:p-8">
          <div className="grid gap-6 sm:grid-cols-2">
            {/* Matter */}
            <div>
              <label
                htmlFor="filing-matter"
                className="block text-xs font-semibold uppercase tracking-wider text-navy-400 dark:text-navy-500"
              >
                Matter
              </label>
              <select
                id="filing-matter"
                value={matter}
                onChange={(e) => setMatter(e.target.value)}
                className="mt-2 block w-full rounded-lg border border-navy-200 bg-white px-3 py-2.5 text-sm text-navy-700 shadow-sm transition-colors focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500 dark:border-navy-600 dark:bg-navy-900 dark:text-navy-200"
              >
                <option value="">Select a matter...</option>
                <option value="placeholder" disabled>
                  Matters will appear from your active cases
                </option>
              </select>
            </div>

            {/* Court selection */}
            <div>
              <label
                htmlFor="filing-court"
                className="block text-xs font-semibold uppercase tracking-wider text-navy-400 dark:text-navy-500"
              >
                Court
              </label>
              <select
                id="filing-court"
                value={court}
                onChange={(e) => setCourt(e.target.value)}
                className="mt-2 block w-full rounded-lg border border-navy-200 bg-white px-3 py-2.5 text-sm text-navy-700 shadow-sm transition-colors focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500 dark:border-navy-600 dark:bg-navy-900 dark:text-navy-200"
              >
                <option value="">Select a court...</option>
                {courtOptions.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Filing type */}
            <div>
              <label
                htmlFor="filing-type"
                className="block text-xs font-semibold uppercase tracking-wider text-navy-400 dark:text-navy-500"
              >
                Filing type
              </label>
              <select
                id="filing-type"
                value={filingType}
                onChange={(e) => setFilingType(e.target.value)}
                className="mt-2 block w-full rounded-lg border border-navy-200 bg-white px-3 py-2.5 text-sm text-navy-700 shadow-sm transition-colors focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500 dark:border-navy-600 dark:bg-navy-900 dark:text-navy-200"
              >
                <option value="">Select filing type...</option>
                {FILING_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* Document selection */}
            <div>
              <label
                htmlFor="filing-document"
                className="block text-xs font-semibold uppercase tracking-wider text-navy-400 dark:text-navy-500"
              >
                Document
              </label>
              <select
                id="filing-document"
                value={document}
                onChange={(e) => setDocument(e.target.value)}
                className="mt-2 block w-full rounded-lg border border-navy-200 bg-white px-3 py-2.5 text-sm text-navy-700 shadow-sm transition-colors focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500 dark:border-navy-600 dark:bg-navy-900 dark:text-navy-200"
              >
                <option value="">Select a document...</option>
                <option value="placeholder" disabled>
                  Documents will appear from your library
                </option>
              </select>
            </div>

            {/* Due date */}
            <div>
              <label
                htmlFor="filing-due"
                className="block text-xs font-semibold uppercase tracking-wider text-navy-400 dark:text-navy-500"
              >
                Due date
              </label>
              <input
                id="filing-due"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="mt-2 block w-full rounded-lg border border-navy-200 bg-white px-3 py-2.5 text-sm text-navy-700 shadow-sm transition-colors focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500 dark:border-navy-600 dark:bg-navy-900 dark:text-navy-200"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={handleSaveDraft}
              className="inline-flex min-h-touch items-center justify-center rounded-lg border border-navy-200 bg-white px-5 py-2.5 text-sm font-semibold text-navy-700 transition-colors hover:border-navy-400 hover:bg-navy-50 dark:border-navy-600 dark:bg-navy-800 dark:text-navy-200 dark:hover:bg-navy-700"
            >
              Save Draft
            </button>
            <button
              onClick={handleSubmitFiling}
              className="inline-flex min-h-touch items-center justify-center rounded-lg bg-navy-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-navy-600 dark:bg-navy-400 dark:text-navy-950 dark:hover:bg-navy-300"
            >
              Submit Filing
            </button>
          </div>
        </div>
      </div>

      {/* Filing History */}
      <div className="mt-12">
        <h2 className="font-serif text-headline text-navy-800 dark:text-white">
          Filing History
        </h2>
        <div className="mt-4 rounded-2xl border border-navy-100 bg-white p-12 text-center shadow-card dark:border-navy-700 dark:bg-navy-800">
          <p className="font-serif text-lg text-navy-700 dark:text-navy-300">
            No filings yet
          </p>
          <p className="mt-1 text-sm text-navy-400 dark:text-navy-500">
            Your filing history will appear here once you submit or save drafts.
          </p>
        </div>
      </div>

      {/* Footer note */}
      <div className="mt-8 rounded-2xl border border-plum-200 bg-plum-50/50 p-6 dark:border-plum-800 dark:bg-plum-950/30">
        <div className="flex items-start gap-3">
          <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-plum-500 text-white">
            <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none">
              <path
                d="M10 3a7 7 0 100 14 7 7 0 000-14zM10 7v4M10 13h.01"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <div>
            <p className="font-serif text-lg text-navy-700 dark:text-navy-200">
              Integrations in progress
            </p>
            <p className="mt-1 text-sm text-navy-500 dark:text-navy-400">
              Court e-filing integrations are being connected. Prepare your
              filings now — they will submit automatically when your court system
              is live.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
