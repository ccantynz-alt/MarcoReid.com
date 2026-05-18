"use client";

import { useMemo, useState } from "react";
import {
  applyCount,
  type CourtRule,
  type Jurisdiction,
} from "@/lib/court-rules";

type JurisFilter = Jurisdiction | "ALL";

interface Props {
  rules: ReadonlyArray<CourtRule>;
}

const JURISDICTION_TABS: ReadonlyArray<{ value: JurisFilter; label: string }> = [
  { value: "ALL", label: "All" },
  { value: "NZ", label: "NZ" },
  { value: "AU", label: "AU" },
  { value: "UK", label: "UK" },
  { value: "US", label: "US" },
];

function fmtDate(d: Date): string {
  return d.toLocaleDateString(undefined, {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function fmtCount(count: number, kind: CourtRule["countKind"]): string {
  const unit =
    kind === "BUSINESS_DAYS"
      ? "business day"
      : kind === "MONTHS"
        ? "month"
        : kind === "YEARS"
          ? "year"
          : "day";
  return `${count} ${unit}${count === 1 ? "" : "s"}`;
}

export default function CourtRulesCalculator({ rules }: Props) {
  const [jurisdiction, setJurisdiction] = useState<JurisFilter>("ALL");
  const [query, setQuery] = useState("");
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [triggerDate, setTriggerDate] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().slice(0, 10);
  });

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rules.filter((r) => {
      if (jurisdiction !== "ALL" && r.jurisdiction !== jurisdiction)
        return false;
      if (q) {
        const hay =
          `${r.forum} ${r.trigger} ${r.deadline} ${r.authority} ${r.tags.join(
            " ",
          )}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [rules, jurisdiction, query]);

  const selected = useMemo(
    () => rules.find((r) => r.slug === selectedSlug) ?? null,
    [rules, selectedSlug],
  );

  const computed = useMemo(() => {
    if (!selected || !triggerDate) return null;
    const start = new Date(`${triggerDate}T00:00:00`);
    if (Number.isNaN(start.getTime())) return null;
    const due = applyCount(start, selected.count, selected.countKind);
    return { start, due };
  }, [selected, triggerDate]);

  return (
    <div className="grid gap-6 lg:grid-cols-[2fr_3fr]">
      {/* Rule picker */}
      <div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-card sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
          1 · Pick the triggering event
        </p>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div>
            <label className="block text-[10px] font-semibold uppercase tracking-wider text-navy-400">
              Jurisdiction
            </label>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {JURISDICTION_TABS.map((j) => (
                <button
                  key={j.value}
                  type="button"
                  onClick={() => setJurisdiction(j.value)}
                  className={`rounded-md border px-2 py-1 text-xs font-semibold transition-colors ${
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
          <div>
            <label
              htmlFor="rule-search"
              className="block text-[10px] font-semibold uppercase tracking-wider text-navy-400"
            >
              Search
            </label>
            <input
              id="rule-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. defence, RFE, EEOC"
              className="mt-2 w-full rounded-md border border-navy-200 bg-white px-2.5 py-1.5 text-xs text-navy-800 placeholder:text-navy-300 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-200"
            />
          </div>
        </div>

        <ul className="mt-4 max-h-[28rem] space-y-2 overflow-auto pr-1">
          {filtered.length === 0 ? (
            <li className="rounded-md border border-navy-100 bg-navy-50 p-3 text-xs text-navy-500">
              No rules match. Widen the filter or clear the search.
            </li>
          ) : (
            filtered.map((r) => (
              <li key={r.slug}>
                <button
                  type="button"
                  onClick={() => setSelectedSlug(r.slug)}
                  className={`block w-full rounded-lg border p-3 text-left transition-colors ${
                    selectedSlug === r.slug
                      ? "border-gold-400 bg-gold-50/60"
                      : "border-navy-100 bg-white hover:border-gold-300 hover:bg-gold-50/30"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-navy-800">
                        {r.forum}
                      </p>
                      <p className="mt-0.5 text-xs text-navy-500">
                        {r.trigger}
                      </p>
                    </div>
                    <span className="shrink-0 rounded border border-navy-200 bg-navy-50 px-1 py-0.5 text-[9px] font-bold uppercase tracking-wider text-navy-600">
                      {r.jurisdiction}
                    </span>
                  </div>
                </button>
              </li>
            ))
          )}
        </ul>
      </div>

      {/* Result panel */}
      <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
          2 · Set the trigger date
        </p>

        <div className="mt-4 flex flex-wrap items-end gap-3">
          <div>
            <label
              htmlFor="trigger-date"
              className="block text-[10px] font-semibold uppercase tracking-wider text-navy-400"
            >
              Trigger date
            </label>
            <input
              id="trigger-date"
              type="date"
              value={triggerDate}
              onChange={(e) => setTriggerDate(e.target.value)}
              className="mt-2 rounded-md border border-navy-200 bg-white px-3 py-2 text-sm text-navy-800 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-200"
            />
          </div>
          {selected && (
            <div className="flex-1 text-xs text-navy-500">
              <p className="font-medium text-navy-700">{selected.forum}</p>
              <p className="mt-0.5">{selected.deadline}</p>
            </div>
          )}
        </div>

        <div className="mt-8 border-t border-navy-100 pt-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
            3 · Computed deadline
          </p>

          {!selected ? (
            <p className="mt-4 rounded-lg border border-dashed border-navy-200 bg-navy-50/40 p-6 text-center text-sm text-navy-500">
              Pick a rule on the left to see the calculated deadline.
            </p>
          ) : !computed ? (
            <p className="mt-4 rounded-lg border border-plum-200 bg-plum-50 p-4 text-sm text-plum-700">
              Invalid trigger date. Pick a real date.
            </p>
          ) : (
            <>
              <div className="mt-4 rounded-2xl border border-gold-300 bg-gradient-to-br from-gold-50 via-white to-white p-6">
                <p className="text-xs font-bold uppercase tracking-wider text-gold-700">
                  Deadline
                </p>
                <p className="mt-2 font-serif text-3xl text-navy-800">
                  {fmtDate(computed.due)}
                </p>
                <p className="mt-2 text-sm text-navy-500">
                  {fmtCount(selected.count, selected.countKind)} from{" "}
                  {fmtDate(computed.start)}
                </p>
              </div>

              <div className="mt-6 space-y-4 text-sm">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
                    Authority
                  </p>
                  <p className="mt-1 font-mono text-sm text-navy-700">
                    {selected.authority}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
                    Trigger
                  </p>
                  <p className="mt-1 text-navy-700">{selected.trigger}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
                    Deadline
                  </p>
                  <p className="mt-1 text-navy-700">{selected.deadline}</p>
                </div>
                {selected.notes && (
                  <div className="rounded-lg border border-navy-100 bg-navy-50/60 p-3">
                    <p className="text-xs font-semibold uppercase tracking-wider text-navy-500">
                      Notes
                    </p>
                    <p className="mt-1 text-xs text-navy-600">
                      {selected.notes}
                    </p>
                  </div>
                )}
                <div className="flex flex-wrap gap-1.5">
                  {selected.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded border border-navy-100 bg-white px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-navy-500"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <p className="mt-6 rounded-lg border border-navy-100 bg-navy-50/60 p-3 text-[11px] leading-relaxed text-navy-500">
                <strong className="text-navy-700">Watermark:</strong> Verify
                this deadline against the live rule before relying on it.
                Marco Reid is a tooling vendor; the credentialled
                professional on the matter carries the regulatory authority
                for advice.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
