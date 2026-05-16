"use client";

import { useState } from "react";
import Link from "next/link";
import {
  predictOutcome,
  MATTER_TYPES_FOR_PREDICTION,
  type OutcomePrediction,
} from "@/lib/outcome-prediction";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const JURISDICTIONS = [
  { code: "US", label: "United States" },
  { code: "UK", label: "United Kingdom" },
  { code: "NZ", label: "New Zealand" },
  { code: "AU", label: "Australia" },
  { code: "CA", label: "Canada" },
];

const PRACTICE_AREAS = [
  "Litigation",
  "Immigration",
  "Tax",
  "Corporate",
  "Employment",
  "Real Estate",
  "Family",
  "IP / Technology",
  "Criminal",
  "Regulatory",
];

// ---------------------------------------------------------------------------
// Confidence Gauge
// ---------------------------------------------------------------------------

function ConfidenceGauge({ score }: { score: number }) {
  const color =
    score > 70
      ? "text-forest-600 dark:text-forest-400"
      : score >= 40
        ? "text-amber-600 dark:text-amber-400"
        : "text-red-600 dark:text-red-400";

  const ringColor =
    score > 70
      ? "stroke-forest-500"
      : score >= 40
        ? "stroke-amber-500"
        : "stroke-red-500";

  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg className="h-36 w-36 -rotate-90" viewBox="0 0 120 120">
        <circle
          cx="60"
          cy="60"
          r="54"
          fill="none"
          className="stroke-navy-100 dark:stroke-navy-700"
          strokeWidth="8"
        />
        <circle
          cx="60"
          cy="60"
          r="54"
          fill="none"
          className={ringColor}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.6s ease-out" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`font-serif text-3xl font-bold ${color}`}>
          {score}%
        </span>
        <span className="text-xs text-navy-400 dark:text-navy-500">
          confidence
        </span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Outcome Badge
// ---------------------------------------------------------------------------

function OutcomeBadge({
  outcome,
}: {
  outcome: OutcomePrediction["predictedOutcome"];
}) {
  const config = {
    "likely-success": {
      label: "Likely Success",
      className:
        "bg-forest-50 text-forest-700 border-forest-200 dark:bg-forest-900/30 dark:text-forest-300 dark:border-forest-700",
    },
    uncertain: {
      label: "Uncertain",
      className:
        "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-700",
    },
    "likely-failure": {
      label: "Likely Failure",
      className:
        "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700",
    },
  };

  const c = config[outcome];

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3.5 py-1.5 text-sm font-semibold ${c.className}`}
    >
      {c.label}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Impact Indicator
// ---------------------------------------------------------------------------

function ImpactIndicator({ impact }: { impact: "positive" | "negative" | "neutral" }) {
  if (impact === "positive") {
    return (
      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-forest-100 dark:bg-forest-900/40">
        <svg viewBox="0 0 20 20" className="h-3 w-3 text-forest-600 dark:text-forest-400" fill="none">
          <path d="M5 10l3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    );
  }
  if (impact === "negative") {
    return (
      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/40">
        <svg viewBox="0 0 20 20" className="h-3 w-3 text-red-600 dark:text-red-400" fill="none">
          <path d="M6 6l8 8M14 6l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </span>
    );
  }
  return (
    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-navy-100 dark:bg-navy-700">
      <span className="h-1.5 w-1.5 rounded-full bg-navy-400 dark:bg-navy-500" />
    </span>
  );
}

// ---------------------------------------------------------------------------
// Results Display
// ---------------------------------------------------------------------------

function PredictionResults({ prediction }: { prediction: OutcomePrediction }) {
  return (
    <div className="space-y-6">
      {/* Top summary row */}
      <div className="grid gap-4 sm:grid-cols-3">
        {/* Confidence gauge */}
        <div className="flex flex-col items-center rounded-2xl border border-navy-100 bg-white p-6 shadow-card dark:border-navy-700 dark:bg-navy-800">
          <ConfidenceGauge score={prediction.confidenceScore} />
          <div className="mt-4 text-center">
            <OutcomeBadge outcome={prediction.predictedOutcome} />
          </div>
        </div>

        {/* Key stats */}
        <div className="flex flex-col gap-4 sm:col-span-2">
          <div className="grid flex-1 gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-card dark:border-navy-700 dark:bg-navy-800">
              <p className="text-xs font-semibold uppercase tracking-wider text-navy-400 dark:text-navy-500">
                Similar cases analysed
              </p>
              <p className="mt-2 font-serif text-2xl text-navy-800 dark:text-white">
                {prediction.similarCases.toLocaleString()}
              </p>
            </div>
            <div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-card dark:border-navy-700 dark:bg-navy-800">
              <p className="text-xs font-semibold uppercase tracking-wider text-navy-400 dark:text-navy-500">
                Avg time to resolution
              </p>
              <p className="mt-2 font-serif text-2xl text-navy-800 dark:text-white">
                {prediction.avgTimeToResolution}
              </p>
            </div>
            {prediction.avgSettlementAmount && (
              <div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-card dark:border-navy-700 dark:bg-navy-800 sm:col-span-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-navy-400 dark:text-navy-500">
                  Typical settlement range
                </p>
                <p className="mt-2 font-serif text-2xl text-plum-600 dark:text-plum-400">
                  {prediction.avgSettlementAmount}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Factors table */}
      <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card dark:border-navy-700 dark:bg-navy-800">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-navy-400 dark:text-navy-500">
          Contributing factors
        </h3>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-navy-100 dark:border-navy-700">
                <th className="pb-2 pr-4 font-semibold text-navy-500 dark:text-navy-400">
                  Factor
                </th>
                <th className="pb-2 pr-4 text-center font-semibold text-navy-500 dark:text-navy-400">
                  Impact
                </th>
                <th className="pb-2 text-right font-semibold text-navy-500 dark:text-navy-400">
                  Weight
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-50 dark:divide-navy-700">
              {prediction.factors.map((f, i) => (
                <tr key={i}>
                  <td className="py-3 pr-4 text-navy-700 dark:text-navy-200">
                    {f.factor}
                  </td>
                  <td className="py-3 pr-4 text-center">
                    <div className="flex justify-center">
                      <ImpactIndicator impact={f.impact} />
                    </div>
                  </td>
                  <td className="py-3 text-right tabular-nums font-medium text-navy-800 dark:text-white">
                    {(f.weight * 100).toFixed(0)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recommendations */}
      <div className="rounded-2xl border border-plum-200 bg-gradient-to-br from-plum-50 to-white p-6 dark:border-plum-800 dark:from-plum-950/30 dark:to-navy-800">
        <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-plum-600 dark:text-plum-400">
          AI Recommendations
        </h3>
        <ol className="mt-4 space-y-3">
          {prediction.recommendations.map((rec, i) => (
            <li key={i} className="flex gap-3">
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-plum-100 text-xs font-bold text-plum-700 dark:bg-plum-900/40 dark:text-plum-300">
                {i + 1}
              </span>
              <p className="text-sm leading-relaxed text-navy-700 dark:text-navy-200">
                {rec}
              </p>
            </li>
          ))}
        </ol>
      </div>

      {/* Disclaimer */}
      <div className="rounded-xl border border-navy-100 bg-navy-50/50 px-6 py-4 dark:border-navy-700 dark:bg-navy-800/50">
        <p className="text-xs leading-relaxed text-navy-500 dark:text-navy-400">
          Predictions are based on historical case data and statistical patterns.
          They do not constitute legal advice and should not be the sole basis for
          strategic decisions. Actual outcomes depend on jurisdiction-specific
          facts, judicial discretion, and factors not captured in historical data.
          Always apply independent professional judgment.
        </p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function PredictionsPage() {
  const [matterType, setMatterType] = useState(MATTER_TYPES_FOR_PREDICTION[0]);
  const [jurisdiction, setJurisdiction] = useState("US");
  const [practiceArea, setPracticeArea] = useState("Litigation");
  const [prediction, setPrediction] = useState<OutcomePrediction | null>(null);

  const handlePredict = () => {
    const result = predictOutcome({
      matterType,
      jurisdiction,
      practiceArea,
    });
    setPrediction(result);
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 lg:px-12">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-display text-navy-800 dark:text-white">
            Outcome Prediction
          </h1>
          <p className="mt-2 text-lg text-navy-400 dark:text-navy-500">
            AI-powered analysis of likely outcomes based on historical case data.
          </p>
        </div>
        <Link
          href="/dashboard"
          className="text-sm text-navy-400 hover:text-navy-600 dark:hover:text-navy-300"
        >
          &larr; Dashboard
        </Link>
      </div>

      {/* Input form */}
      <div className="mt-8 rounded-2xl border border-navy-100 bg-white p-6 shadow-card dark:border-navy-700 dark:bg-navy-800 sm:p-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Matter type */}
          <div>
            <label
              htmlFor="matter-type"
              className="block text-xs font-semibold uppercase tracking-wider text-navy-400 dark:text-navy-500"
            >
              Matter type
            </label>
            <select
              id="matter-type"
              value={matterType}
              onChange={(e) => setMatterType(e.target.value)}
              className="mt-2 block w-full rounded-lg border border-navy-200 bg-white px-3 py-2.5 text-sm text-navy-700 shadow-sm transition-colors focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500 dark:border-navy-600 dark:bg-navy-900 dark:text-navy-200"
            >
              {MATTER_TYPES_FOR_PREDICTION.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Jurisdiction */}
          <div>
            <label
              htmlFor="jurisdiction"
              className="block text-xs font-semibold uppercase tracking-wider text-navy-400 dark:text-navy-500"
            >
              Jurisdiction
            </label>
            <select
              id="jurisdiction"
              value={jurisdiction}
              onChange={(e) => setJurisdiction(e.target.value)}
              className="mt-2 block w-full rounded-lg border border-navy-200 bg-white px-3 py-2.5 text-sm text-navy-700 shadow-sm transition-colors focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500 dark:border-navy-600 dark:bg-navy-900 dark:text-navy-200"
            >
              {JURISDICTIONS.map((j) => (
                <option key={j.code} value={j.code}>
                  {j.label}
                </option>
              ))}
            </select>
          </div>

          {/* Practice area */}
          <div>
            <label
              htmlFor="practice-area"
              className="block text-xs font-semibold uppercase tracking-wider text-navy-400 dark:text-navy-500"
            >
              Practice area
            </label>
            <select
              id="practice-area"
              value={practiceArea}
              onChange={(e) => setPracticeArea(e.target.value)}
              className="mt-2 block w-full rounded-lg border border-navy-200 bg-white px-3 py-2.5 text-sm text-navy-700 shadow-sm transition-colors focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500 dark:border-navy-600 dark:bg-navy-900 dark:text-navy-200"
            >
              {PRACTICE_AREAS.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={handlePredict}
            className="inline-flex min-h-touch items-center justify-center rounded-lg bg-plum-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-plum-600 hover:shadow-md dark:bg-plum-600 dark:hover:bg-plum-500"
          >
            <svg
              viewBox="0 0 20 20"
              className="mr-2 h-4 w-4"
              fill="none"
            >
              <path
                d="M10 2v2m0 12v2m8-8h-2M4 10H2m14.14-5.14l-1.42 1.42M5.28 14.72l-1.42 1.42m11.28 0l-1.42-1.42M5.28 5.28L3.86 3.86"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            Predict Outcome
          </button>
        </div>
      </div>

      {/* Results */}
      <div className="mt-8">
        {prediction ? (
          <PredictionResults prediction={prediction} />
        ) : (
          <div className="rounded-2xl border border-navy-100 bg-white p-12 text-center shadow-card dark:border-navy-700 dark:bg-navy-800">
            <p className="font-serif text-lg text-navy-700 dark:text-navy-300">
              Select a matter type and click Predict Outcome.
            </p>
            <p className="mt-1 text-sm text-navy-400 dark:text-navy-500">
              Marco will analyse historical case data across{" "}
              {(47283 + 12450 + 8920 + 34100).toLocaleString()}+ outcomes to
              generate a prediction.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
