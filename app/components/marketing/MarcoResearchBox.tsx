"use client";

import { useState } from "react";
import type { MarcoDomain } from "@/lib/marco/sources";

interface Citation {
  title: string;
  citation: string;
  sourceUrl: string;
  sourceDb: string;
  status: "VERIFIED" | "UNVERIFIED" | "NOT_FOUND";
  excerpt: string;
}

interface ResearchResult {
  summary: string;
  body: string;
  citations: Citation[];
  mode: "live" | "demo";
}

interface Props {
  domain: MarcoDomain;
  defaultJurisdiction: "NZ" | "AU" | "UK" | "US";
  exampleQueries: ReadonlyArray<string>;
}

const STATUS_PILL: Record<
  Citation["status"],
  { label: string; cls: string }
> = {
  VERIFIED: {
    label: "Verified",
    cls: "bg-forest-50 text-forest-700 border-forest-200",
  },
  UNVERIFIED: {
    label: "Unverified",
    cls: "bg-gold-50 text-gold-700 border-gold-200",
  },
  NOT_FOUND: {
    label: "Not found",
    cls: "bg-plum-50 text-plum-700 border-plum-200",
  },
};

const JURISDICTION_TABS: ReadonlyArray<{
  value: "NZ" | "AU" | "UK" | "US";
  label: string;
}> = [
  { value: "NZ", label: "NZ" },
  { value: "AU", label: "AU" },
  { value: "UK", label: "UK" },
  { value: "US", label: "US" },
];

export default function MarcoResearchBox({
  domain,
  defaultJurisdiction,
  exampleQueries,
}: Props) {
  const [query, setQuery] = useState("");
  const [jurisdiction, setJurisdiction] = useState(defaultJurisdiction);
  const [result, setResult] = useState<ResearchResult | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim().length < 5) {
      setError("Ask a question of at least a few words.");
      setStatus("error");
      return;
    }
    setStatus("loading");
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/marco/research", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: query.trim(), domain, jurisdiction }),
      });
      const j = await res.json();
      if (!res.ok) {
        setError(j.error || "Marco couldn't complete the research.");
        setStatus("error");
        return;
      }
      setResult({
        summary: j.summary,
        body: j.body,
        citations: j.citations || [],
        mode: j.mode,
      });
      setStatus("idle");
    } catch {
      setError("Network error.");
      setStatus("error");
    }
  }

  return (
    <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card sm:p-8">
      <form onSubmit={handleSubmit}>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-navy-400">
            Jurisdiction
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

        <div className="mt-5">
          <label
            htmlFor="marco-query"
            className="block text-sm font-semibold text-navy-700"
          >
            Ask Marco
          </label>
          <textarea
            id="marco-query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            rows={4}
            maxLength={1000}
            className="mt-2 w-full rounded-xl border border-navy-200 bg-white px-4 py-3 text-sm text-navy-800 placeholder:text-navy-300 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-200"
            placeholder="Plain English. Be specific about facts and the position you're trying to confirm."
          />
        </div>

        {exampleQueries.length > 0 && (
          <div className="mt-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
              Try one of these
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {exampleQueries.map((eq) => (
                <button
                  key={eq}
                  type="button"
                  onClick={() => setQuery(eq)}
                  className="rounded-md border border-navy-200 bg-white px-2.5 py-1 text-xs text-navy-500 hover:border-gold-300 hover:bg-gold-50/40"
                >
                  {eq}
                </button>
              ))}
            </div>
          </div>
        )}

        {error && (
          <p
            role="alert"
            className="mt-4 rounded-lg border border-plum-200 bg-plum-50 px-3 py-2 text-sm text-plum-700"
          >
            {error}
          </p>
        )}

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-navy-400">
            Demo mode active until ANTHROPIC_API_KEY is wired. Citation
            verification logic is the same.
          </p>
          <button
            type="submit"
            disabled={status === "loading"}
            className="inline-flex items-center justify-center rounded-xl bg-gold-400 px-6 py-3 text-sm font-semibold text-navy-900 shadow-sm transition-all hover:bg-gold-300 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "loading" ? "Marco is researching…" : "Ask Marco →"}
          </button>
        </div>
      </form>

      {result && (
        <div className="mt-8 border-t border-navy-100 pt-8">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-xs font-bold uppercase tracking-wider text-navy-400">
              Marco&rsquo;s response
            </p>
            <span
              className={`rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                result.mode === "live"
                  ? "border-forest-200 bg-forest-50 text-forest-700"
                  : "border-navy-200 bg-navy-50 text-navy-600"
              }`}
            >
              {result.mode}
            </span>
          </div>
          <div className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-navy-700">
            {result.body}
          </div>

          <div className="mt-8">
            <p className="text-xs font-bold uppercase tracking-wider text-navy-400">
              Citations ({result.citations.length})
            </p>
            <ul className="mt-3 space-y-3">
              {result.citations.map((c, i) => {
                const pill = STATUS_PILL[c.status];
                return (
                  <li
                    key={`${c.sourceDb}-${i}`}
                    className="rounded-xl border border-navy-100 bg-navy-50/60 p-4"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-navy-800">
                          {c.title}
                        </p>
                        <p className="mt-1 break-all font-mono text-xs text-navy-500">
                          {c.citation}
                        </p>
                      </div>
                      <span
                        className={`shrink-0 rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${pill.cls}`}
                      >
                        {pill.label}
                      </span>
                    </div>
                    <p className="mt-3 text-xs leading-relaxed text-navy-600">
                      {c.excerpt}
                    </p>
                    {c.sourceUrl && (
                      <p className="mt-3 text-xs">
                        <a
                          href={c.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-forest-600 hover:text-forest-700 hover:underline"
                        >
                          Visit source &rarr;
                        </a>
                      </p>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <p className="mt-8 rounded-lg border border-navy-100 bg-navy-50/60 p-3 text-[11px] leading-relaxed text-navy-500">
            <strong className="text-navy-700">Watermark:</strong> Marco
            output is a research assist, not advice. Verify each VERIFIED
            citation manually + obtain professional sign-off before
            including any reference in a binding document. UNVERIFIED + NOT_FOUND
            references cannot be inserted into a signed document.
          </p>
        </div>
      )}
    </div>
  );
}
