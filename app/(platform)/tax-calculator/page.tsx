"use client";

import { useState, useMemo } from "react";
import {
  calculateGST,
  calculateIncomeTax,
  calculateCorporateTax,
  TAX_JURISDICTIONS,
  US_STATE_SALES_TAX,
  CA_PROVINCIAL_TAX,
  type TaxResult,
} from "@/lib/tax-calculator";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function currencyFor(code: string) {
  const j = TAX_JURISDICTIONS.find((j) => j.code === code);
  return { currency: j?.currency ?? "USD", symbol: j?.symbol ?? "$" };
}

function fmt(amount: number, code: string): string {
  const { currency } = currencyFor(code);
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

function pct(rate: number): string {
  return `${(rate * 100).toFixed(2)}%`;
}

// ---------------------------------------------------------------------------
// Tabs
// ---------------------------------------------------------------------------

type TabKey = "gst" | "income" | "corporate";

const TABS: { key: TabKey; label: string }[] = [
  { key: "gst", label: "GST / VAT" },
  { key: "income", label: "Income Tax" },
  { key: "corporate", label: "Corporate Tax" },
];

// ---------------------------------------------------------------------------
// US State Sales Tax Table
// ---------------------------------------------------------------------------

function USStateTaxTable() {
  const [search, setSearch] = useState("");

  const states = useMemo(() => {
    const entries = Object.entries(US_STATE_SALES_TAX);
    if (!search.trim()) return entries;
    const q = search.toLowerCase();
    return entries.filter(
      ([abbr, s]) =>
        s.state.toLowerCase().includes(q) || abbr.toLowerCase().includes(q),
    );
  }, [search]);

  return (
    <div className="mt-6 rounded-2xl border border-navy-100 bg-white p-6 shadow-card dark:border-navy-700 dark:bg-navy-800">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-navy-400 dark:text-navy-500">
          US State + Local Sales Tax Rates
        </h3>
        <input
          type="text"
          placeholder="Search states..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-navy-200 bg-white px-3 py-2 text-sm text-navy-700 shadow-sm transition-colors focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500 dark:border-navy-600 dark:bg-navy-900 dark:text-navy-200 sm:w-64"
        />
      </div>
      <div className="mt-4 max-h-96 overflow-y-auto">
        <table className="w-full text-left text-sm">
          <thead className="sticky top-0 bg-white dark:bg-navy-800">
            <tr className="border-b border-navy-100 dark:border-navy-700">
              <th className="pb-2 pr-4 font-semibold text-navy-500 dark:text-navy-400">
                State
              </th>
              <th className="pb-2 pr-4 text-right font-semibold text-navy-500 dark:text-navy-400">
                State Rate
              </th>
              <th className="pb-2 pr-4 text-right font-semibold text-navy-500 dark:text-navy-400">
                Avg Local
              </th>
              <th className="pb-2 text-right font-semibold text-navy-500 dark:text-navy-400">
                Combined
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-navy-50 dark:divide-navy-700">
            {states.map(([abbr, s]) => (
              <tr key={abbr} className="hover:bg-navy-25 dark:hover:bg-navy-750">
                <td className="py-2 pr-4 text-navy-700 dark:text-navy-200">
                  <span className="font-medium">{abbr}</span>{" "}
                  <span className="text-navy-400 dark:text-navy-500">
                    {s.state}
                  </span>
                </td>
                <td className="py-2 pr-4 text-right tabular-nums text-navy-600 dark:text-navy-300">
                  {s.rate.toFixed(2)}%
                </td>
                <td className="py-2 pr-4 text-right tabular-nums text-navy-600 dark:text-navy-300">
                  {s.avgLocalRate.toFixed(2)}%
                </td>
                <td className="py-2 text-right tabular-nums font-medium text-navy-800 dark:text-white">
                  {s.combinedRate.toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {states.length === 0 && (
          <p className="py-6 text-center text-sm text-navy-400 dark:text-navy-500">
            No states match your search.
          </p>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// CA Provincial Tax Table
// ---------------------------------------------------------------------------

function CAProvincialTaxTable() {
  const provinces = Object.entries(CA_PROVINCIAL_TAX).sort((a, b) =>
    a[1].province.localeCompare(b[1].province),
  );

  return (
    <div className="mt-6 rounded-2xl border border-navy-100 bg-white p-6 shadow-card dark:border-navy-700 dark:bg-navy-800">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-navy-400 dark:text-navy-500">
        Canadian Provincial Sales Tax Breakdown
      </h3>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-navy-100 dark:border-navy-700">
              <th className="pb-2 pr-4 font-semibold text-navy-500 dark:text-navy-400">
                Province
              </th>
              <th className="pb-2 pr-4 text-right font-semibold text-navy-500 dark:text-navy-400">
                Type
              </th>
              <th className="pb-2 pr-4 text-right font-semibold text-navy-500 dark:text-navy-400">
                GST
              </th>
              <th className="pb-2 pr-4 text-right font-semibold text-navy-500 dark:text-navy-400">
                PST/QST
              </th>
              <th className="pb-2 text-right font-semibold text-navy-500 dark:text-navy-400">
                Combined
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-navy-50 dark:divide-navy-700">
            {provinces.map(([abbr, p]) => (
              <tr key={abbr}>
                <td className="py-2 pr-4 text-navy-700 dark:text-navy-200">
                  <span className="font-medium">{abbr}</span>{" "}
                  <span className="text-navy-400 dark:text-navy-500">
                    {p.province}
                  </span>
                </td>
                <td className="py-2 pr-4 text-right">
                  <span
                    className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                      p.type === "HST"
                        ? "bg-forest-50 text-forest-700 dark:bg-forest-900/30 dark:text-forest-400"
                        : p.type === "GST+QST"
                          ? "bg-plum-50 text-plum-700 dark:bg-plum-900/30 dark:text-plum-400"
                          : p.type === "GST only"
                            ? "bg-navy-50 text-navy-600 dark:bg-navy-700 dark:text-navy-300"
                            : "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                    }`}
                  >
                    {p.type}
                  </span>
                </td>
                <td className="py-2 pr-4 text-right tabular-nums text-navy-600 dark:text-navy-300">
                  {p.gstRate}%
                </td>
                <td className="py-2 pr-4 text-right tabular-nums text-navy-600 dark:text-navy-300">
                  {p.pstRate > 0 ? `${p.pstRate}%` : "—"}
                </td>
                <td className="py-2 text-right tabular-nums font-medium text-navy-800 dark:text-white">
                  {p.combinedRate}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Tax Result Display
// ---------------------------------------------------------------------------

function TaxResultDisplay({
  result,
  jurisdiction,
}: {
  result: TaxResult;
  jurisdiction: string;
}) {
  return (
    <div className="space-y-6">
      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-card dark:border-navy-700 dark:bg-navy-800">
          <p className="text-xs font-semibold uppercase tracking-wider text-navy-400 dark:text-navy-500">
            {result.taxType === "GST" || result.taxType === "VAT" || result.taxType === "Sales Tax" || result.taxType === "GST"
              ? "Gross amount"
              : "Gross income"}
          </p>
          <p className="mt-2 font-serif text-2xl text-navy-800 dark:text-white">
            {fmt(result.grossAmount, jurisdiction)}
          </p>
        </div>
        <div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-card dark:border-navy-700 dark:bg-navy-800">
          <p className="text-xs font-semibold uppercase tracking-wider text-navy-400 dark:text-navy-500">
            Tax amount
          </p>
          <p className="mt-2 font-serif text-2xl text-plum-600 dark:text-plum-400">
            {fmt(result.taxAmount, jurisdiction)}
          </p>
        </div>
        <div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-card dark:border-navy-700 dark:bg-navy-800">
          <p className="text-xs font-semibold uppercase tracking-wider text-navy-400 dark:text-navy-500">
            Net amount
          </p>
          <p className="mt-2 font-serif text-2xl text-forest-600 dark:text-forest-400">
            {fmt(result.netAmount, jurisdiction)}
          </p>
        </div>
      </div>

      {/* Effective rate */}
      <div className="rounded-2xl border border-plum-200 bg-plum-50/50 p-6 dark:border-plum-800 dark:bg-plum-950/30">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-plum-600 dark:text-plum-400">
              Effective rate
            </p>
            <p className="mt-1 text-sm text-navy-500 dark:text-navy-400">
              {result.taxType}
            </p>
          </div>
          <p className="font-serif text-4xl text-plum-600 dark:text-plum-400">
            {(result.effectiveRate * 100).toFixed(2)}%
          </p>
        </div>
      </div>

      {/* Breakdown table */}
      <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card dark:border-navy-700 dark:bg-navy-800">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-navy-400 dark:text-navy-500">
          Bracket breakdown
        </h3>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-navy-100 dark:border-navy-700">
                <th className="pb-2 pr-4 font-semibold text-navy-500 dark:text-navy-400">
                  Bracket
                </th>
                <th className="pb-2 pr-4 text-right font-semibold text-navy-500 dark:text-navy-400">
                  Rate
                </th>
                <th className="pb-2 text-right font-semibold text-navy-500 dark:text-navy-400">
                  Tax
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-50 dark:divide-navy-700">
              {result.breakdown.map((row, i) => (
                <tr key={i}>
                  <td className="py-2.5 pr-4 text-navy-700 dark:text-navy-200">
                    {row.bracket}
                  </td>
                  <td className="py-2.5 pr-4 text-right tabular-nums text-navy-600 dark:text-navy-300">
                    {row.rate < 0 ? `(${pct(Math.abs(row.rate))})` : pct(row.rate)}
                  </td>
                  <td
                    className={`py-2.5 text-right tabular-nums font-medium ${
                      row.tax < 0
                        ? "text-forest-600 dark:text-forest-400"
                        : "text-navy-800 dark:text-white"
                    }`}
                  >
                    {row.tax < 0 ? `(${fmt(Math.abs(row.tax), jurisdiction)})` : fmt(row.tax, jurisdiction)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-navy-200 dark:border-navy-600">
                <td className="pt-3 pr-4 font-semibold text-navy-800 dark:text-white">
                  Total
                </td>
                <td className="pt-3 pr-4 text-right tabular-nums font-semibold text-navy-800 dark:text-white">
                  {(result.effectiveRate * 100).toFixed(2)}%
                </td>
                <td className="pt-3 text-right tabular-nums font-semibold text-plum-600 dark:text-plum-400">
                  {fmt(result.taxAmount, jurisdiction)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// GST/VAT Tab
// ---------------------------------------------------------------------------

function GSTTab() {
  const [jurisdiction, setJurisdiction] = useState("NZ");
  const [amount, setAmount] = useState("1000");
  const [inclusive, setInclusive] = useState(false);
  const [rateType, setRateType] = useState<"standard" | "reduced" | "zero">("standard");

  const parsedAmount = Math.max(0, Number(amount) || 0);

  const result = useMemo<TaxResult | null>(() => {
    if (parsedAmount <= 0) return null;
    try {
      return calculateGST({ jurisdiction, amount: parsedAmount, inclusive, rate: rateType });
    } catch {
      return null;
    }
  }, [jurisdiction, parsedAmount, inclusive, rateType]);

  const jInfo = TAX_JURISDICTIONS.find((j) => j.code === jurisdiction);
  const hasReduced = jurisdiction === "UK";

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card dark:border-navy-700 dark:bg-navy-800 sm:p-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Jurisdiction */}
          <div>
            <label
              htmlFor="gst-jurisdiction"
              className="block text-xs font-semibold uppercase tracking-wider text-navy-400 dark:text-navy-500"
            >
              Jurisdiction
            </label>
            <select
              id="gst-jurisdiction"
              value={jurisdiction}
              onChange={(e) => {
                setJurisdiction(e.target.value);
                if (e.target.value !== "UK" && rateType === "reduced") {
                  setRateType("standard");
                }
              }}
              className="mt-2 block w-full rounded-lg border border-navy-200 bg-white px-3 py-2.5 text-sm text-navy-700 shadow-sm transition-colors focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500 dark:border-navy-600 dark:bg-navy-900 dark:text-navy-200"
            >
              {TAX_JURISDICTIONS.map((j) => (
                <option key={j.code} value={j.code}>
                  {j.flag} {j.name}
                </option>
              ))}
            </select>
          </div>

          {/* Amount */}
          <div>
            <label
              htmlFor="gst-amount"
              className="block text-xs font-semibold uppercase tracking-wider text-navy-400 dark:text-navy-500"
            >
              Amount ({jInfo?.symbol ?? "$"})
            </label>
            <input
              id="gst-amount"
              type="text"
              inputMode="numeric"
              value={amount}
              onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ""))}
              placeholder="1000"
              className="mt-2 block w-full rounded-lg border border-navy-200 bg-white px-3 py-2.5 text-sm text-navy-700 shadow-sm transition-colors focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500 dark:border-navy-600 dark:bg-navy-900 dark:text-navy-200"
            />
          </div>

          {/* Inclusive / Exclusive toggle */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-navy-400 dark:text-navy-500">
              Tax included?
            </label>
            <div className="mt-2 flex rounded-lg border border-navy-200 dark:border-navy-600">
              <button
                onClick={() => setInclusive(false)}
                className={`flex-1 px-3 py-2.5 text-xs font-medium transition-colors first:rounded-l-lg last:rounded-r-lg ${
                  !inclusive
                    ? "bg-navy-500 text-white dark:bg-navy-400 dark:text-navy-950"
                    : "bg-white text-navy-500 hover:bg-navy-50 dark:bg-navy-900 dark:text-navy-400 dark:hover:bg-navy-800"
                }`}
              >
                Exclusive
              </button>
              <button
                onClick={() => setInclusive(true)}
                className={`flex-1 px-3 py-2.5 text-xs font-medium transition-colors first:rounded-l-lg last:rounded-r-lg ${
                  inclusive
                    ? "bg-navy-500 text-white dark:bg-navy-400 dark:text-navy-950"
                    : "bg-white text-navy-500 hover:bg-navy-50 dark:bg-navy-900 dark:text-navy-400 dark:hover:bg-navy-800"
                }`}
              >
                Inclusive
              </button>
            </div>
          </div>

          {/* Rate type */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-navy-400 dark:text-navy-500">
              Rate type
            </label>
            <div className="mt-2 flex rounded-lg border border-navy-200 dark:border-navy-600">
              <button
                onClick={() => setRateType("standard")}
                className={`flex-1 px-2 py-2.5 text-xs font-medium transition-colors first:rounded-l-lg ${
                  !hasReduced ? "last:rounded-none" : ""
                } ${
                  rateType === "standard"
                    ? "bg-navy-500 text-white dark:bg-navy-400 dark:text-navy-950"
                    : "bg-white text-navy-500 hover:bg-navy-50 dark:bg-navy-900 dark:text-navy-400 dark:hover:bg-navy-800"
                }`}
              >
                Standard
              </button>
              {hasReduced && (
                <button
                  onClick={() => setRateType("reduced")}
                  className={`flex-1 px-2 py-2.5 text-xs font-medium transition-colors ${
                    rateType === "reduced"
                      ? "bg-navy-500 text-white dark:bg-navy-400 dark:text-navy-950"
                      : "bg-white text-navy-500 hover:bg-navy-50 dark:bg-navy-900 dark:text-navy-400 dark:hover:bg-navy-800"
                  }`}
                >
                  Reduced
                </button>
              )}
              <button
                onClick={() => setRateType("zero")}
                className={`flex-1 px-2 py-2.5 text-xs font-medium transition-colors last:rounded-r-lg ${
                  rateType === "zero"
                    ? "bg-navy-500 text-white dark:bg-navy-400 dark:text-navy-950"
                    : "bg-white text-navy-500 hover:bg-navy-50 dark:bg-navy-900 dark:text-navy-400 dark:hover:bg-navy-800"
                }`}
              >
                Zero
              </button>
            </div>
          </div>
        </div>
      </div>

      {result ? (
        <TaxResultDisplay result={result} jurisdiction={jurisdiction} />
      ) : (
        <div className="rounded-2xl border border-navy-100 bg-white p-12 text-center shadow-card dark:border-navy-700 dark:bg-navy-800">
          <p className="font-serif text-lg text-navy-700 dark:text-navy-300">
            Enter an amount to calculate tax.
          </p>
          <p className="mt-1 text-sm text-navy-400 dark:text-navy-500">
            Supports GST (NZ, AU, CA), VAT (UK), and Sales Tax (US).
          </p>
        </div>
      )}

      {/* Jurisdiction-specific reference tables */}
      {jurisdiction === "US" && <USStateTaxTable />}
      {jurisdiction === "CA" && <CAProvincialTaxTable />}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Income Tax Tab
// ---------------------------------------------------------------------------

function IncomeTaxTab() {
  const [jurisdiction, setJurisdiction] = useState("NZ");
  const [income, setIncome] = useState("85000");
  const [filingStatus, setFilingStatus] = useState<"single" | "married">("single");

  const parsedIncome = Math.max(0, Number(income) || 0);

  const result = useMemo<TaxResult | null>(() => {
    if (parsedIncome <= 0) return null;
    try {
      return calculateIncomeTax({
        jurisdiction,
        annualIncome: parsedIncome,
        filingStatus,
      });
    } catch {
      return null;
    }
  }, [jurisdiction, parsedIncome, filingStatus]);

  const jInfo = TAX_JURISDICTIONS.find((j) => j.code === jurisdiction);

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card dark:border-navy-700 dark:bg-navy-800 sm:p-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Jurisdiction */}
          <div>
            <label
              htmlFor="income-jurisdiction"
              className="block text-xs font-semibold uppercase tracking-wider text-navy-400 dark:text-navy-500"
            >
              Jurisdiction
            </label>
            <select
              id="income-jurisdiction"
              value={jurisdiction}
              onChange={(e) => setJurisdiction(e.target.value)}
              className="mt-2 block w-full rounded-lg border border-navy-200 bg-white px-3 py-2.5 text-sm text-navy-700 shadow-sm transition-colors focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500 dark:border-navy-600 dark:bg-navy-900 dark:text-navy-200"
            >
              {TAX_JURISDICTIONS.map((j) => (
                <option key={j.code} value={j.code}>
                  {j.flag} {j.name}
                </option>
              ))}
            </select>
          </div>

          {/* Annual income */}
          <div>
            <label
              htmlFor="annual-income"
              className="block text-xs font-semibold uppercase tracking-wider text-navy-400 dark:text-navy-500"
            >
              Annual income ({jInfo?.symbol ?? "$"})
            </label>
            <input
              id="annual-income"
              type="text"
              inputMode="numeric"
              value={income}
              onChange={(e) => setIncome(e.target.value.replace(/[^0-9.]/g, ""))}
              placeholder="85000"
              className="mt-2 block w-full rounded-lg border border-navy-200 bg-white px-3 py-2.5 text-sm text-navy-700 shadow-sm transition-colors focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500 dark:border-navy-600 dark:bg-navy-900 dark:text-navy-200"
            />
          </div>

          {/* Filing status (US only) */}
          <div
            className={`transition-opacity ${
              jurisdiction === "US" ? "opacity-100" : "pointer-events-none opacity-30"
            }`}
          >
            <label className="block text-xs font-semibold uppercase tracking-wider text-navy-400 dark:text-navy-500">
              Filing status
            </label>
            <div className="mt-2 flex rounded-lg border border-navy-200 dark:border-navy-600">
              <button
                onClick={() => setFilingStatus("single")}
                disabled={jurisdiction !== "US"}
                className={`flex-1 px-3 py-2.5 text-xs font-medium transition-colors first:rounded-l-lg last:rounded-r-lg ${
                  filingStatus === "single"
                    ? "bg-navy-500 text-white dark:bg-navy-400 dark:text-navy-950"
                    : "bg-white text-navy-500 hover:bg-navy-50 dark:bg-navy-900 dark:text-navy-400 dark:hover:bg-navy-800"
                }`}
              >
                Single
              </button>
              <button
                onClick={() => setFilingStatus("married")}
                disabled={jurisdiction !== "US"}
                className={`flex-1 px-3 py-2.5 text-xs font-medium transition-colors first:rounded-l-lg last:rounded-r-lg ${
                  filingStatus === "married"
                    ? "bg-navy-500 text-white dark:bg-navy-400 dark:text-navy-950"
                    : "bg-white text-navy-500 hover:bg-navy-50 dark:bg-navy-900 dark:text-navy-400 dark:hover:bg-navy-800"
                }`}
              >
                Married
              </button>
            </div>
            {jurisdiction !== "US" && (
              <p className="mt-1 text-xs text-navy-400 dark:text-navy-500">
                US only
              </p>
            )}
          </div>
        </div>
      </div>

      {result ? (
        <TaxResultDisplay result={result} jurisdiction={jurisdiction} />
      ) : (
        <div className="rounded-2xl border border-navy-100 bg-white p-12 text-center shadow-card dark:border-navy-700 dark:bg-navy-800">
          <p className="font-serif text-lg text-navy-700 dark:text-navy-300">
            Enter an annual income to see the tax breakdown.
          </p>
          <p className="mt-1 text-sm text-navy-400 dark:text-navy-500">
            All calculations use official 2024/25 tax rates.
          </p>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Corporate Tax Tab
// ---------------------------------------------------------------------------

function CorporateTaxTab() {
  const [jurisdiction, setJurisdiction] = useState("NZ");
  const [profit, setProfit] = useState("500000");
  const [isSmallBusiness, setIsSmallBusiness] = useState(false);

  const parsedProfit = Math.max(0, Number(profit) || 0);

  const result = useMemo<TaxResult | null>(() => {
    if (parsedProfit <= 0) return null;
    try {
      return calculateCorporateTax({
        jurisdiction,
        taxableProfit: parsedProfit,
        isSmallBusiness,
      });
    } catch {
      return null;
    }
  }, [jurisdiction, parsedProfit, isSmallBusiness]);

  const jInfo = TAX_JURISDICTIONS.find((j) => j.code === jurisdiction);
  const showSmallBiz = jurisdiction === "AU" || jurisdiction === "UK" || jurisdiction === "CA";

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card dark:border-navy-700 dark:bg-navy-800 sm:p-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Jurisdiction */}
          <div>
            <label
              htmlFor="corp-jurisdiction"
              className="block text-xs font-semibold uppercase tracking-wider text-navy-400 dark:text-navy-500"
            >
              Jurisdiction
            </label>
            <select
              id="corp-jurisdiction"
              value={jurisdiction}
              onChange={(e) => setJurisdiction(e.target.value)}
              className="mt-2 block w-full rounded-lg border border-navy-200 bg-white px-3 py-2.5 text-sm text-navy-700 shadow-sm transition-colors focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500 dark:border-navy-600 dark:bg-navy-900 dark:text-navy-200"
            >
              {TAX_JURISDICTIONS.map((j) => (
                <option key={j.code} value={j.code}>
                  {j.flag} {j.name}
                </option>
              ))}
            </select>
          </div>

          {/* Taxable profit */}
          <div>
            <label
              htmlFor="taxable-profit"
              className="block text-xs font-semibold uppercase tracking-wider text-navy-400 dark:text-navy-500"
            >
              Taxable profit ({jInfo?.symbol ?? "$"})
            </label>
            <input
              id="taxable-profit"
              type="text"
              inputMode="numeric"
              value={profit}
              onChange={(e) => setProfit(e.target.value.replace(/[^0-9.]/g, ""))}
              placeholder="500000"
              className="mt-2 block w-full rounded-lg border border-navy-200 bg-white px-3 py-2.5 text-sm text-navy-700 shadow-sm transition-colors focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500 dark:border-navy-600 dark:bg-navy-900 dark:text-navy-200"
            />
          </div>

          {/* Small business toggle */}
          <div
            className={`transition-opacity ${
              showSmallBiz ? "opacity-100" : "pointer-events-none opacity-30"
            }`}
          >
            <label className="block text-xs font-semibold uppercase tracking-wider text-navy-400 dark:text-navy-500">
              Small business?
            </label>
            <div className="mt-2 flex rounded-lg border border-navy-200 dark:border-navy-600">
              <button
                onClick={() => setIsSmallBusiness(false)}
                disabled={!showSmallBiz}
                className={`flex-1 px-3 py-2.5 text-xs font-medium transition-colors first:rounded-l-lg last:rounded-r-lg ${
                  !isSmallBusiness
                    ? "bg-navy-500 text-white dark:bg-navy-400 dark:text-navy-950"
                    : "bg-white text-navy-500 hover:bg-navy-50 dark:bg-navy-900 dark:text-navy-400 dark:hover:bg-navy-800"
                }`}
              >
                Standard
              </button>
              <button
                onClick={() => setIsSmallBusiness(true)}
                disabled={!showSmallBiz}
                className={`flex-1 px-3 py-2.5 text-xs font-medium transition-colors first:rounded-l-lg last:rounded-r-lg ${
                  isSmallBusiness
                    ? "bg-navy-500 text-white dark:bg-navy-400 dark:text-navy-950"
                    : "bg-white text-navy-500 hover:bg-navy-50 dark:bg-navy-900 dark:text-navy-400 dark:hover:bg-navy-800"
                }`}
              >
                Small Biz
              </button>
            </div>
            {!showSmallBiz && (
              <p className="mt-1 text-xs text-navy-400 dark:text-navy-500">
                AU, UK, CA only
              </p>
            )}
            {showSmallBiz && (
              <p className="mt-1 text-xs text-navy-400 dark:text-navy-500">
                {jurisdiction === "AU"
                  ? "Turnover < $50M"
                  : jurisdiction === "UK"
                    ? "Profits under £50K"
                    : "Canadian-controlled private"}
              </p>
            )}
          </div>
        </div>
      </div>

      {result ? (
        <TaxResultDisplay result={result} jurisdiction={jurisdiction} />
      ) : (
        <div className="rounded-2xl border border-navy-100 bg-white p-12 text-center shadow-card dark:border-navy-700 dark:bg-navy-800">
          <p className="font-serif text-lg text-navy-700 dark:text-navy-300">
            Enter a taxable profit to see the corporate tax breakdown.
          </p>
          <p className="mt-1 text-sm text-navy-400 dark:text-navy-500">
            All calculations use official 2024/25 corporate tax rates.
          </p>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function TaxCalculatorPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("gst");

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 lg:px-12">
      {/* Header */}
      <div>
        <h1 className="font-serif text-display text-navy-800 dark:text-white">
          Tax calculator
        </h1>
        <p className="mt-2 text-navy-400 dark:text-navy-500">
          Calculate GST/VAT, income tax, and corporate tax across five
          jurisdictions. Uses 2024/25 tax rates.
        </p>
      </div>

      {/* Tabs */}
      <div className="mt-8 border-b border-navy-100 dark:border-navy-700">
        <nav className="-mb-px flex gap-6" aria-label="Tax calculator tabs">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`whitespace-nowrap border-b-2 pb-3 text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? "border-navy-500 text-navy-800 dark:border-navy-300 dark:text-white"
                  : "border-transparent text-navy-400 hover:border-navy-200 hover:text-navy-600 dark:text-navy-500 dark:hover:border-navy-600 dark:hover:text-navy-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab content */}
      <div className="mt-8">
        {activeTab === "gst" && <GSTTab />}
        {activeTab === "income" && <IncomeTaxTab />}
        {activeTab === "corporate" && <CorporateTaxTab />}
      </div>

      {/* Disclaimer */}
      <p className="mt-8 text-xs text-navy-400 dark:text-navy-500">
        This calculator provides estimates based on standard 2024/25 tax rates.
        It does not account for tax credits, deductions (beyond the standard
        deduction for US), rebates, surcharges, or other individual
        circumstances. US income tax is federal only and does not include state
        taxes. Canadian income tax shows federal rates only. Consult a qualified
        tax professional for precise calculations.
      </p>
    </div>
  );
}
