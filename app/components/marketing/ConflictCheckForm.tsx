"use client";

import { useState } from "react";

const JURISDICTION_TABS = [
  { value: "NZ", label: "NZ" },
  { value: "AU", label: "AU" },
  { value: "UK", label: "UK" },
  { value: "US", label: "US" },
] as const;

interface CheckResult {
  conflict: { status: "CLEAR" | "REVIEW" | "BLOCK"; note: string };
  sanctions: { status: "CLEAR" | "REVIEW" | "BLOCK"; note: string };
  pep: { status: "CLEAR" | "REVIEW" | "BLOCK"; note: string };
  adverseMedia: { status: "CLEAR" | "REVIEW" | "BLOCK"; note: string };
  riskRating: "LOW" | "MEDIUM" | "HIGH";
  recommendation: string;
}

const STATUS_PILL: Record<
  "CLEAR" | "REVIEW" | "BLOCK",
  { label: string; cls: string }
> = {
  CLEAR: { label: "Clear", cls: "bg-forest-50 text-forest-700 border-forest-200" },
  REVIEW: { label: "Review", cls: "bg-gold-50 text-gold-700 border-gold-200" },
  BLOCK: { label: "Block", cls: "bg-plum-50 text-plum-700 border-plum-200" },
};

/** Heuristic demo classifier — applies keyword + jurisdiction rules to
 *  produce a plausible-looking result. The real engine swaps in once the
 *  sanctions-list ingestion + firm matter-ledger lookups are wired. */
function classify(opts: {
  partyName: string;
  jurisdiction: string;
  partyType: string;
  countryOfOperation: string;
}): CheckResult {
  const { partyName, jurisdiction, countryOfOperation } = opts;
  const lower = partyName.toLowerCase();

  // Demo-only heuristics. None of these reflect actual list membership.
  const sanctionsHit =
    /(sanction|ofac|denied|specially designated|kim|maduro|wagner|hezbollah)/i.test(
      partyName,
    ) || /russia|north korea|iran|syria|cuba/i.test(countryOfOperation);
  const pepHit = /(minister|president|prime|senator|judge|colonel|sheikh|ambassador)/i.test(
    partyName,
  );
  const adverseHit = /(fraud|launder|insider|defaulter|breach)/i.test(lower);
  const conflictHit = lower.includes("acme"); // demo-only — pretend Acme is an existing client

  const conflict: CheckResult["conflict"] = conflictHit
    ? { status: "BLOCK", note: "Match against existing firm matter (demo-only — Acme Corp). Information-barrier check required before proceeding." }
    : { status: "CLEAR", note: "No match against firm's matter ledger." };

  const sanctions: CheckResult["sanctions"] = sanctionsHit
    ? { status: "BLOCK", note: "Potential sanctions-list match. Investigate before onboarding; SAR may be required." }
    : { status: "CLEAR", note: "No match against UN / OFAC / EU / MFAT / DFAT / OFSI consolidated lists." };

  const pep: CheckResult["pep"] = pepHit
    ? { status: "REVIEW", note: "Potential PEP match. Apply enhanced CDD; obtain senior management approval per AML/CFT Act 2009 s 22 (NZ) / AML/CTF Rules Pt 4.13 (AU)." }
    : { status: "CLEAR", note: "No match against PEP database." };

  const adverseMedia: CheckResult["adverseMedia"] = adverseHit
    ? { status: "REVIEW", note: "Adverse-media keywords in name. Check against full search results before onboarding." }
    : { status: "CLEAR", note: "No adverse-media keywords detected." };

  const blocks = [conflict, sanctions, pep, adverseMedia].filter(
    (r) => r.status === "BLOCK",
  ).length;
  const reviews = [conflict, sanctions, pep, adverseMedia].filter(
    (r) => r.status === "REVIEW",
  ).length;

  const riskRating: CheckResult["riskRating"] =
    blocks > 0 ? "HIGH" : reviews >= 2 ? "HIGH" : reviews === 1 ? "MEDIUM" : "LOW";

  let recommendation: string;
  if (blocks > 0) {
    recommendation =
      "Do not onboard without senior partner review. Likely SAR or STR filing required. Document the decision either way in the AML programme.";
  } else if (riskRating === "HIGH") {
    recommendation =
      "Apply enhanced CDD per " +
      (jurisdiction === "AU"
        ? "AML/CTF Rules Part 4.13"
        : "AML/CFT Act 2009 s 22 (NZ)") +
      ". Ongoing monitoring at high frequency.";
  } else if (riskRating === "MEDIUM") {
    recommendation = "Standard CDD with elevated monitoring. Document decision.";
  } else {
    recommendation = "Standard CDD applies. Onboard with usual review.";
  }

  return { conflict, sanctions, pep, adverseMedia, riskRating, recommendation };
}

export default function ConflictCheckForm() {
  const [partyName, setPartyName] = useState("");
  const [partyType, setPartyType] = useState("INDIVIDUAL");
  const [jurisdiction, setJurisdiction] = useState<"NZ" | "AU" | "UK" | "US">(
    "NZ",
  );
  const [countryOfOperation, setCountryOfOperation] = useState("New Zealand");
  const [result, setResult] = useState<CheckResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (partyName.trim().length < 2) {
      setError("Party name is required.");
      return;
    }
    setSubmitting(true);
    // Demo-mode runs entirely client-side; the real check posts to an API
    // wired to the firm matter ledger + sanctions data feeds.
    setTimeout(() => {
      setResult(
        classify({
          partyName: partyName.trim(),
          jurisdiction,
          partyType,
          countryOfOperation: countryOfOperation.trim(),
        }),
      );
      setSubmitting(false);
    }, 350);
  }

  return (
    <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card sm:p-8">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-navy-400">
            Firm jurisdiction
          </label>
          <div className="mt-2 flex flex-wrap gap-2">
            {JURISDICTION_TABS.map((j) => (
              <button
                key={j.value}
                type="button"
                onClick={() => setJurisdiction(j.value)}
                className={`rounded-md border px-3 py-1.5 text-xs font-semibold transition-colors ${
                  jurisdiction === j.value
                    ? "border-forest-300 bg-forest-50 text-navy-800"
                    : "border-navy-200 bg-white text-navy-500 hover:border-forest-300"
                }`}
              >
                {j.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="party-name"
              className="block text-sm font-semibold text-navy-700"
            >
              Party name
            </label>
            <input
              id="party-name"
              type="text"
              required
              value={partyName}
              onChange={(e) => setPartyName(e.target.value)}
              className="mt-2 w-full rounded-xl border border-navy-200 bg-white px-4 py-2.5 text-sm text-navy-800 placeholder:text-navy-300 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-200"
              placeholder="Full legal name of individual or entity"
            />
          </div>
          <div>
            <label
              htmlFor="party-type"
              className="block text-sm font-semibold text-navy-700"
            >
              Party type
            </label>
            <select
              id="party-type"
              value={partyType}
              onChange={(e) => setPartyType(e.target.value)}
              className="mt-2 w-full rounded-xl border border-navy-200 bg-white px-4 py-2.5 text-sm text-navy-800 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-200"
            >
              <option value="INDIVIDUAL">Individual</option>
              <option value="COMPANY">Company / corporation</option>
              <option value="TRUST">Trust</option>
              <option value="PARTNERSHIP">Partnership</option>
              <option value="OTHER">Other entity</option>
            </select>
          </div>
        </div>

        <div>
          <label
            htmlFor="country-op"
            className="block text-sm font-semibold text-navy-700"
          >
            Primary country of operation
          </label>
          <input
            id="country-op"
            type="text"
            value={countryOfOperation}
            onChange={(e) => setCountryOfOperation(e.target.value)}
            className="mt-2 w-full rounded-xl border border-navy-200 bg-white px-4 py-2.5 text-sm text-navy-800 placeholder:text-navy-300 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-200"
            placeholder="e.g. New Zealand, Russia, UAE"
          />
          <p className="mt-1 text-[10px] text-navy-400">
            Sanctioned jurisdictions automatically elevate risk rating to HIGH.
          </p>
        </div>

        {error && (
          <p
            role="alert"
            className="rounded-xl border border-plum-200 bg-plum-50 px-4 py-3 text-sm text-plum-700"
          >
            {error}
          </p>
        )}

        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-navy-400">
            Demo mode: runs heuristics client-side. Real engine runs against
            live sanctions-list feeds + firm matter ledger.
          </p>
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center justify-center rounded-xl bg-gold-400 px-6 py-3 text-sm font-semibold text-navy-900 shadow-sm transition-all hover:bg-gold-300 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Running checks…" : "Run all checks →"}
          </button>
        </div>
      </form>

      {result && (
        <div className="mt-8 border-t border-navy-100 pt-8">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-xs font-bold uppercase tracking-wider text-navy-400">
              Risk rating
            </p>
            <span
              className={`rounded-md border px-3 py-1 text-sm font-bold uppercase tracking-wider ${
                result.riskRating === "HIGH"
                  ? "border-plum-200 bg-plum-50 text-plum-700"
                  : result.riskRating === "MEDIUM"
                    ? "border-gold-200 bg-gold-50 text-gold-700"
                    : "border-forest-200 bg-forest-50 text-forest-700"
              }`}
            >
              {result.riskRating}
            </span>
          </div>

          <ul className="mt-5 space-y-3">
            {[
              { label: "Conflict", r: result.conflict },
              { label: "Sanctions", r: result.sanctions },
              { label: "PEP", r: result.pep },
              { label: "Adverse media", r: result.adverseMedia },
            ].map(({ label, r }) => {
              const pill = STATUS_PILL[r.status];
              return (
                <li
                  key={label}
                  className="rounded-xl border border-navy-100 bg-navy-50/60 p-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-navy-800">
                      {label}
                    </p>
                    <span
                      className={`rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${pill.cls}`}
                    >
                      {pill.label}
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-navy-600">
                    {r.note}
                  </p>
                </li>
              );
            })}
          </ul>

          <div className="mt-6 rounded-2xl border border-gold-300 bg-gradient-to-br from-gold-50 via-white to-white p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-gold-700">
              Recommendation
            </p>
            <p className="mt-2 text-sm leading-relaxed text-navy-700">
              {result.recommendation}
            </p>
          </div>

          <p className="mt-6 rounded-lg border border-navy-100 bg-navy-50/60 p-3 text-[11px] leading-relaxed text-navy-500">
            <strong className="text-navy-700">Watermark:</strong> Demo
            output. Real production check runs against UN / OFAC / EU /
            MFAT / DFAT / OFSI feeds + firm matter ledger; result captured
            in AmlAssessment + AuditLog. The firm&rsquo;s compliance officer
            signs off the decision either way.
          </p>
        </div>
      )}
    </div>
  );
}
