"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Sample professionals (shown when database is empty)                */
/* ------------------------------------------------------------------ */

interface SampleProfessional {
  id: string;
  displayName: string;
  title: string;
  firm: string;
  type: "lawyer" | "accountant";
  specialties: string[];
  country: string;
  countryFlag: string;
  accepting: boolean;
}

const SAMPLE_PROFESSIONALS: SampleProfessional[] = [
  {
    id: "sp-1",
    displayName: "Sarah Chen",
    title: "Immigration Attorney",
    firm: "Chen & Associates",
    type: "lawyer",
    specialties: ["Immigration", "Employment", "Business Visas"],
    country: "US",
    countryFlag: "US",
    accepting: true,
  },
  {
    id: "sp-2",
    displayName: "James Whitfield",
    title: "Barrister",
    firm: "Whitfield Chambers",
    type: "lawyer",
    specialties: ["Commercial Litigation", "Contract Disputes"],
    country: "NZ",
    countryFlag: "NZ",
    accepting: true,
  },
  {
    id: "sp-3",
    displayName: "Priya Sharma",
    title: "Chartered Accountant",
    firm: "Sharma & Partners",
    type: "accountant",
    specialties: ["Tax Advisory", "Business Structuring", "GST"],
    country: "NZ",
    countryFlag: "NZ",
    accepting: true,
  },
  {
    id: "sp-4",
    displayName: "Michael O'Brien",
    title: "Solicitor",
    firm: "O'Brien Legal",
    type: "lawyer",
    specialties: ["Property", "Conveyancing", "Trusts"],
    country: "AU",
    countryFlag: "AU",
    accepting: true,
  },
  {
    id: "sp-5",
    displayName: "Emily Zhang",
    title: "CPA",
    firm: "Zhang Accounting Group",
    type: "accountant",
    specialties: ["Audit", "Financial Reporting", "IFRS"],
    country: "AU",
    countryFlag: "AU",
    accepting: false,
  },
  {
    id: "sp-6",
    displayName: "David Thompson",
    title: "Barrister and Solicitor",
    firm: "Thompson & Co",
    type: "lawyer",
    specialties: ["Criminal Defence", "Appeals"],
    country: "UK",
    countryFlag: "UK",
    accepting: true,
  },
  {
    id: "sp-7",
    displayName: "Rebecca Williams",
    title: "Chartered Tax Adviser",
    firm: "Williams Tax Advisory",
    type: "accountant",
    specialties: ["Corporation Tax", "VAT", "R&D Credits"],
    country: "UK",
    countryFlag: "UK",
    accepting: true,
  },
  {
    id: "sp-8",
    displayName: "Carlos Mendez",
    title: "Attorney at Law",
    firm: "Mendez Law Group",
    type: "lawyer",
    specialties: ["Personal Injury", "Medical Malpractice"],
    country: "US",
    countryFlag: "US",
    accepting: true,
  },
  {
    id: "sp-9",
    displayName: "Anika Patel",
    title: "CPA",
    firm: "Patel & Associates CPA",
    type: "accountant",
    specialties: ["Small Business", "Payroll", "Tax Returns"],
    country: "US",
    countryFlag: "US",
    accepting: true,
  },
  {
    id: "sp-10",
    displayName: "Thomas Reid",
    title: "Solicitor",
    firm: "Reid Family Law",
    type: "lawyer",
    specialties: ["Family Law", "Divorce", "Child Custody"],
    country: "NZ",
    countryFlag: "NZ",
    accepting: false,
  },
  {
    id: "sp-11",
    displayName: "Fatima Al-Hassan",
    title: "Chartered Accountant",
    firm: "Al-Hassan Advisory",
    type: "accountant",
    specialties: ["International Tax", "Transfer Pricing"],
    country: "UK",
    countryFlag: "UK",
    accepting: true,
  },
  {
    id: "sp-12",
    displayName: "John Mackenzie",
    title: "Attorney",
    firm: "Mackenzie IP Law",
    type: "lawyer",
    specialties: ["Intellectual Property", "Patent", "Trademark"],
    country: "AU",
    countryFlag: "AU",
    accepting: true,
  },
];

const COUNTRIES = [
  { code: "ALL", label: "All countries" },
  { code: "NZ", label: "New Zealand" },
  { code: "AU", label: "Australia" },
  { code: "UK", label: "United Kingdom" },
  { code: "US", label: "United States" },
];

const TYPES = [
  { code: "ALL", label: "All types" },
  { code: "lawyer", label: "Lawyer" },
  { code: "accountant", label: "Accountant" },
];

const FLAG_MAP: Record<string, string> = {
  NZ: "\u{1F1F3}\u{1F1FF}",
  AU: "\u{1F1E6}\u{1F1FA}",
  UK: "\u{1F1EC}\u{1F1E7}",
  US: "\u{1F1FA}\u{1F1F8}",
};

interface DirectorySearchProps {
  hasRealData: boolean;
}

export default function DirectorySearch({ hasRealData }: DirectorySearchProps) {
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("ALL");
  const [type, setType] = useState("ALL");

  const filtered = useMemo(() => {
    let results = SAMPLE_PROFESSIONALS;

    if (query.trim()) {
      const q = query.toLowerCase();
      results = results.filter(
        (p) =>
          p.displayName.toLowerCase().includes(q) ||
          p.firm.toLowerCase().includes(q) ||
          p.specialties.some((s) => s.toLowerCase().includes(q)),
      );
    }

    if (country !== "ALL") {
      results = results.filter((p) => p.country === country);
    }

    if (type !== "ALL") {
      results = results.filter((p) => p.type === type);
    }

    return results;
  }, [query, country, type]);

  if (hasRealData) return null;

  return (
    <div>
      {/* Search and filters */}
      <div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-card">
        <div className="flex flex-col gap-4 sm:flex-row">
          {/* Search input */}
          <div className="flex-1">
            <label htmlFor="dir-search" className="sr-only">
              Search professionals
            </label>
            <div className="relative">
              <svg
                className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-300"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
              <input
                id="dir-search"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Find a lawyer or accountant near you"
                className="w-full rounded-xl border border-navy-200 bg-white py-3 pl-10 pr-4 text-sm text-navy-800 placeholder:text-navy-300 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-200"
              />
            </div>
          </div>

          {/* Country filter */}
          <div className="w-full sm:w-44">
            <label htmlFor="dir-country" className="sr-only">
              Country
            </label>
            <select
              id="dir-country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full rounded-xl border border-navy-200 bg-white px-4 py-3 text-sm text-navy-800 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-200"
            >
              {COUNTRIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          {/* Type filter */}
          <div className="w-full sm:w-36">
            <label htmlFor="dir-type" className="sr-only">
              Professional type
            </label>
            <select
              id="dir-type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full rounded-xl border border-navy-200 bg-white px-4 py-3 text-sm text-navy-800 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-200"
            >
              {TYPES.map((t) => (
                <option key={t.code} value={t.code}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <p className="mt-3 text-xs text-navy-400">
          {filtered.length} professional{filtered.length !== 1 ? "s" : ""} found
          &middot; Sample directory &mdash; verified professionals will appear as
          they join
        </p>
      </div>

      {/* Results grid */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <Link
            key={p.id}
            href="/directory"
            className="group block h-full rounded-2xl border border-navy-100 bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-300 hover:shadow-card-hover"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-navy-100 font-serif text-lg text-navy-700">
                {p.displayName.charAt(0)}
              </div>
              <div className="min-w-0">
                <h3 className="font-serif text-lg text-navy-800 group-hover:text-navy-900">
                  {p.displayName}
                </h3>
                <p className="mt-0.5 text-xs text-navy-400">
                  {p.title} &middot;{" "}
                  <span>{FLAG_MAP[p.countryFlag] ?? ""}</span>{" "}
                  {COUNTRIES.find((c) => c.code === p.country)?.label ??
                    p.country}
                </p>
                <p className="text-xs text-navy-500">{p.firm}</p>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {p.specialties.map((s) => (
                <span
                  key={s}
                  className="rounded-md border border-navy-100 bg-navy-50/60 px-2 py-0.5 text-[10px] font-semibold text-navy-600"
                >
                  {s}
                </span>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-2 text-[10px]">
              {p.accepting ? (
                <span className="rounded bg-forest-50 px-1.5 py-0.5 font-semibold text-forest-700">
                  Accepting new matters
                </span>
              ) : (
                <span className="rounded bg-navy-50 px-1.5 py-0.5 font-semibold text-navy-500">
                  Not accepting matters
                </span>
              )}
              <span className="rounded bg-gold-50 px-1.5 py-0.5 font-semibold text-gold-700">
                Verified
              </span>
              <span className="rounded bg-navy-50 px-1.5 py-0.5 font-semibold capitalize text-navy-500">
                {p.type}
              </span>
            </div>

            <div className="mt-4">
              <span className="text-sm font-semibold text-navy-500 group-hover:text-gold-600">
                View profile &rarr;
              </span>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-8 rounded-xl border border-navy-100 bg-white p-10 text-center shadow-card">
          <p className="font-serif text-xl text-navy-700">
            No professionals match your search.
          </p>
          <p className="mt-2 text-sm text-navy-400">
            Try adjusting your filters or search term.
          </p>
        </div>
      )}
    </div>
  );
}
