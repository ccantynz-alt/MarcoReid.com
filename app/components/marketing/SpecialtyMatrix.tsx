"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { SpecialtyRow, Profession } from "@/lib/specialties";

type ProfFilter = Profession | "ALL";
type JurisFilter = "NZ" | "AU" | "UK" | "US" | "ALL";

interface Props {
  specialties: ReadonlyArray<SpecialtyRow>;
}

const PROFESSION_TABS: ReadonlyArray<{ value: ProfFilter; label: string }> = [
  { value: "ALL", label: "All professions" },
  { value: "LAW", label: "Legal" },
  { value: "ACCOUNTING", label: "Accounting" },
];

const JURISDICTION_TABS: ReadonlyArray<{ value: JurisFilter; label: string }> = [
  { value: "ALL", label: "All" },
  { value: "NZ", label: "NZ" },
  { value: "AU", label: "AU" },
  { value: "UK", label: "UK" },
  { value: "US", label: "US" },
];

export default function SpecialtyMatrix({ specialties }: Props) {
  const [profession, setProfession] = useState<ProfFilter>("ALL");
  const [jurisdiction, setJurisdiction] = useState<JurisFilter>("ALL");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return specialties.filter((s) => {
      if (profession !== "ALL" && s.profession !== profession) return false;
      if (jurisdiction !== "ALL" && !s.jurisdictions.includes(jurisdiction))
        return false;
      if (q) {
        const hay = `${s.label} ${s.summary}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [specialties, profession, jurisdiction, query]);

  return (
    <div>
      {/* Controls */}
      <div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-card sm:p-6">
        <div className="grid gap-5 sm:grid-cols-3">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-navy-400">
              Profession
            </label>
            <div className="mt-2 flex flex-wrap gap-2">
              {PROFESSION_TABS.map((p) => (
                <button
                  key={p.value}
                  type="button"
                  onClick={() => setProfession(p.value)}
                  className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
                    profession === p.value
                      ? "border-gold-300 bg-gold-50 text-navy-800"
                      : "border-navy-200 bg-white text-navy-500 hover:border-gold-300 hover:text-navy-700"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

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
                  className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
                    jurisdiction === j.value
                      ? "border-forest-300 bg-forest-50 text-navy-800"
                      : "border-navy-200 bg-white text-navy-500 hover:border-forest-300 hover:text-navy-700"
                  }`}
                >
                  {j.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label
              htmlFor="specialty-search"
              className="block text-xs font-semibold uppercase tracking-wider text-navy-400"
            >
              Search
            </label>
            <input
              id="specialty-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. trust, crypto, RMA"
              className="mt-2 w-full rounded-lg border border-navy-200 bg-white px-3 py-2 text-sm text-navy-800 placeholder:text-navy-300 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-200"
            />
          </div>
        </div>

        <p className="mt-4 text-xs text-navy-400">
          Showing {filtered.length} of {specialties.length} specialties.
          Click any row for the deep module (where one exists) or to register
          interest.
        </p>
      </div>

      {/* Results grid */}
      {filtered.length === 0 ? (
        <p className="mt-8 rounded-xl border border-navy-100 bg-white p-8 text-center text-sm text-navy-500 shadow-card">
          No specialties match those filters. Try widening the jurisdiction
          or clearing the search.
        </p>
      ) : (
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((s) => {
            const href = s.deepPage
              ? `/specialties/${s.slug}`
              : (`/${s.slug}` as const); /* fall back to legacy module if exists */
            // Legacy module routes (existing pages elsewhere on the site)
            const legacy: Record<string, string> = {
              conveyancing: "/conveyancing",
              wills: "/wills",
              "aml-cft": "/aml-cft",
              "engagement-letters": "/engagement-letters",
              cpd: "/cpd",
              insolvency: "/insolvency",
              "tax-advisory": "/tax-advisors",
              immigration: "/immigration-advisers",
              incorporation: "/launch",
            };
            const finalHref = s.deepPage
              ? `/specialties/${s.slug}`
              : (legacy[s.slug] ?? "/contact");

            return (
              <Link
                key={s.slug}
                href={finalHref}
                className="group block rounded-2xl border border-navy-100 bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-300 hover:shadow-card-hover"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-serif text-lg text-navy-800 group-hover:text-navy-900">
                    {s.label}
                  </h3>
                  <span
                    className={`shrink-0 rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                      s.profession === "LAW"
                        ? "bg-plum-50 text-plum-700"
                        : "bg-forest-50 text-forest-700"
                    }`}
                  >
                    {s.profession === "LAW" ? "Legal" : "Acc."}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-navy-500">
                  {s.summary}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-1.5">
                  {s.jurisdictions.map((j) => (
                    <span
                      key={j}
                      className="rounded border border-navy-200 bg-navy-50 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-navy-500"
                    >
                      {j}
                    </span>
                  ))}
                  {s.deepPage && (
                    <span className="ml-auto text-[10px] font-bold uppercase tracking-wider text-gold-600">
                      Deep module
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
