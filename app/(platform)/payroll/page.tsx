"use client";

import { useState, useMemo } from "react";
import {
  calculatePayroll,
  PAYROLL_JURISDICTIONS,
  KIWISAVER_RATES,
  type PayFrequency,
  type PayrollResult,
} from "@/lib/payroll";
import LegalDisclaimer from "@/app/components/shared/LegalDisclaimer";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function currencyFor(code: string) {
  const j = PAYROLL_JURISDICTIONS.find((j) => j.code === code);
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

function fmtAnnual(amount: number, code: string): string {
  const { currency } = currencyFor(code);
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

const PAY_FREQUENCIES: { value: PayFrequency; label: string; periods: number }[] = [
  { value: "weekly", label: "Weekly", periods: 52 },
  { value: "fortnightly", label: "Fortnightly", periods: 26 },
  { value: "monthly", label: "Monthly", periods: 12 },
];

// ---------------------------------------------------------------------------
// Components
// ---------------------------------------------------------------------------

function DeductionRow({
  name,
  amount,
  jurisdiction,
}: {
  name: string;
  amount: number;
  jurisdiction: string;
}) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm text-navy-600 dark:text-navy-300">{name}</span>
      <span className="text-sm font-medium tabular-nums text-navy-700 dark:text-navy-200">
        -{fmt(amount, jurisdiction)}
      </span>
    </div>
  );
}

function CostRow({
  name,
  amount,
  jurisdiction,
}: {
  name: string;
  amount: number;
  jurisdiction: string;
}) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm text-navy-600 dark:text-navy-300">{name}</span>
      <span className="text-sm font-medium tabular-nums text-navy-700 dark:text-navy-200">
        {fmt(amount, jurisdiction)}
      </span>
    </div>
  );
}

function PaySlip({
  result,
  jurisdiction,
  payFrequency,
  annualSalary,
}: {
  result: PayrollResult;
  jurisdiction: string;
  payFrequency: PayFrequency;
  annualSalary: number;
}) {
  const jInfo = PAYROLL_JURISDICTIONS.find((j) => j.code === jurisdiction);
  const freqLabel = PAY_FREQUENCIES.find((f) => f.value === payFrequency)?.label ?? payFrequency;
  const periods = PAY_FREQUENCIES.find((f) => f.value === payFrequency)?.periods ?? 12;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card dark:border-navy-700 dark:bg-navy-800">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-navy-400 dark:text-navy-500">
              {freqLabel} pay slip
            </p>
            <p className="mt-1 font-serif text-2xl text-navy-800 dark:text-white">
              {jInfo?.name ?? jurisdiction}
            </p>
            <p className="mt-1 text-sm text-navy-400 dark:text-navy-500">
              Annual salary: {fmtAnnual(annualSalary, jurisdiction)} &middot; 2024/25 rates
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs font-semibold uppercase tracking-wider text-navy-400 dark:text-navy-500">
              Net pay
            </p>
            <p className="mt-1 font-serif text-3xl text-forest-600 dark:text-forest-400">
              {fmt(result.netPay, jurisdiction)}
            </p>
            <p className="mt-1 text-xs text-navy-400 dark:text-navy-500">
              per {payFrequency === "fortnightly" ? "fortnight" : payFrequency === "weekly" ? "week" : "month"}
            </p>
          </div>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-card dark:border-navy-700 dark:bg-navy-800">
          <p className="text-xs font-semibold uppercase tracking-wider text-navy-400 dark:text-navy-500">
            Gross pay
          </p>
          <p className="mt-2 font-serif text-2xl text-navy-800 dark:text-white">
            {fmt(result.grossPay, jurisdiction)}
          </p>
          <p className="mt-1 text-xs text-navy-400 dark:text-navy-500">
            {fmtAnnual(annualSalary, jurisdiction)} / yr
          </p>
        </div>
        <div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-card dark:border-navy-700 dark:bg-navy-800">
          <p className="text-xs font-semibold uppercase tracking-wider text-navy-400 dark:text-navy-500">
            Total deductions
          </p>
          <p className="mt-2 font-serif text-2xl text-plum-600 dark:text-plum-400">
            {fmt(
              result.employeeDeductions.reduce((s, d) => s + d.amount, 0),
              jurisdiction,
            )}
          </p>
          <p className="mt-1 text-xs text-navy-400 dark:text-navy-500">
            {fmtAnnual(
              result.employeeDeductions.reduce((s, d) => s + d.amount, 0) * periods,
              jurisdiction,
            )} / yr
          </p>
        </div>
        <div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-card dark:border-navy-700 dark:bg-navy-800">
          <p className="text-xs font-semibold uppercase tracking-wider text-navy-400 dark:text-navy-500">
            Total cost to employer
          </p>
          <p className="mt-2 font-serif text-2xl text-navy-800 dark:text-white">
            {fmt(result.totalEmployerCost, jurisdiction)}
          </p>
          <p className="mt-1 text-xs text-navy-400 dark:text-navy-500">
            {fmtAnnual(result.totalEmployerCost * periods, jurisdiction)} / yr
          </p>
        </div>
      </div>

      {/* Detailed breakdown */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Employee deductions */}
        <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card dark:border-navy-700 dark:bg-navy-800">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-navy-400 dark:text-navy-500">
            Employee deductions
          </h3>
          <div className="mt-4 divide-y divide-navy-50 dark:divide-navy-700">
            {result.employeeDeductions.map((d) => (
              <DeductionRow
                key={d.name}
                name={d.name}
                amount={d.amount}
                jurisdiction={jurisdiction}
              />
            ))}
          </div>
          <div className="mt-3 border-t-2 border-navy-200 pt-3 dark:border-navy-600">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-navy-700 dark:text-navy-200">
                Total deductions
              </span>
              <span className="font-semibold tabular-nums text-plum-600 dark:text-plum-400">
                -{fmt(
                  result.employeeDeductions.reduce((s, d) => s + d.amount, 0),
                  jurisdiction,
                )}
              </span>
            </div>
          </div>
          <div className="mt-4 border-t-2 border-navy-200 pt-4 dark:border-navy-600">
            <div className="flex items-center justify-between">
              <span className="font-serif text-lg text-navy-800 dark:text-white">
                Net pay
              </span>
              <span className="font-serif text-xl tabular-nums text-forest-600 dark:text-forest-400">
                {fmt(result.netPay, jurisdiction)}
              </span>
            </div>
          </div>
        </div>

        {/* Employer costs */}
        <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card dark:border-navy-700 dark:bg-navy-800">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-navy-400 dark:text-navy-500">
            Employer on-costs
          </h3>
          <div className="mt-4">
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-navy-600 dark:text-navy-300">
                Gross salary
              </span>
              <span className="text-sm font-medium tabular-nums text-navy-700 dark:text-navy-200">
                {fmt(result.grossPay, jurisdiction)}
              </span>
            </div>
          </div>
          <div className="divide-y divide-navy-50 dark:divide-navy-700">
            {result.employerCosts.map((c) => (
              <CostRow
                key={c.name}
                name={c.name}
                amount={c.amount}
                jurisdiction={jurisdiction}
              />
            ))}
          </div>
          <div className="mt-3 border-t-2 border-navy-200 pt-3 dark:border-navy-600">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-navy-700 dark:text-navy-200">
                Additional employer costs
              </span>
              <span className="font-semibold tabular-nums text-navy-700 dark:text-navy-200">
                +{fmt(
                  result.employerCosts.reduce((s, c) => s + c.amount, 0),
                  jurisdiction,
                )}
              </span>
            </div>
          </div>
          <div className="mt-4 border-t-2 border-navy-200 pt-4 dark:border-navy-600">
            <div className="flex items-center justify-between">
              <span className="font-serif text-lg text-navy-800 dark:text-white">
                Total cost to employer
              </span>
              <span className="font-serif text-xl tabular-nums text-navy-800 dark:text-white">
                {fmt(result.totalEmployerCost, jurisdiction)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Annual summary */}
      <div className="rounded-2xl border border-plum-200 bg-plum-50/50 p-6 dark:border-plum-800 dark:bg-plum-950/30">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-plum-600 dark:text-plum-400">
          Annual summary
        </h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-4">
          <div>
            <p className="text-xs text-navy-400 dark:text-navy-500">Gross salary</p>
            <p className="mt-1 font-serif text-lg text-navy-800 dark:text-white">
              {fmtAnnual(annualSalary, jurisdiction)}
            </p>
          </div>
          <div>
            <p className="text-xs text-navy-400 dark:text-navy-500">Total tax</p>
            <p className="mt-1 font-serif text-lg text-plum-600 dark:text-plum-400">
              {fmtAnnual(result.incomeTax * periods, jurisdiction)}
            </p>
          </div>
          <div>
            <p className="text-xs text-navy-400 dark:text-navy-500">Annual net pay</p>
            <p className="mt-1 font-serif text-lg text-forest-600 dark:text-forest-400">
              {fmtAnnual(result.netPay * periods, jurisdiction)}
            </p>
          </div>
          <div>
            <p className="text-xs text-navy-400 dark:text-navy-500">Employer total cost</p>
            <p className="mt-1 font-serif text-lg text-navy-800 dark:text-white">
              {fmtAnnual(result.totalEmployerCost * periods, jurisdiction)}
            </p>
          </div>
        </div>
      </div>

      {/* Effective rates */}
      <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card dark:border-navy-700 dark:bg-navy-800">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-navy-400 dark:text-navy-500">
          Effective rates
        </h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div>
            <p className="text-xs text-navy-400 dark:text-navy-500">Effective tax rate</p>
            <p className="mt-1 font-serif text-2xl text-navy-800 dark:text-white">
              {annualSalary > 0
                ? ((result.incomeTax * periods / annualSalary) * 100).toFixed(1)
                : "0.0"}
              %
            </p>
          </div>
          <div>
            <p className="text-xs text-navy-400 dark:text-navy-500">Total deduction rate</p>
            <p className="mt-1 font-serif text-2xl text-plum-600 dark:text-plum-400">
              {annualSalary > 0
                ? ((result.employeeDeductions.reduce((s, d) => s + d.amount, 0) * periods / annualSalary) * 100).toFixed(1)
                : "0.0"}
              %
            </p>
          </div>
          <div>
            <p className="text-xs text-navy-400 dark:text-navy-500">Employer on-cost rate</p>
            <p className="mt-1 font-serif text-2xl text-navy-800 dark:text-white">
              {annualSalary > 0
                ? ((result.employerCosts.reduce((s, c) => s + c.amount, 0) * periods / annualSalary) * 100).toFixed(1)
                : "0.0"}
              %
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function PayrollPage() {
  const [jurisdiction, setJurisdiction] = useState("NZ");
  const [salary, setSalary] = useState("85000");
  const [payFrequency, setPayFrequency] = useState<PayFrequency>("monthly");
  const [kiwiSaverRate, setKiwiSaverRate] = useState<number>(3);

  const annualSalary = Math.max(0, Number(salary) || 0);

  const result = useMemo<PayrollResult | null>(() => {
    if (annualSalary <= 0) return null;
    try {
      return calculatePayroll({
        jurisdiction,
        annualSalary,
        payFrequency,
        kiwiSaverRate: jurisdiction === "NZ" ? kiwiSaverRate : undefined,
      });
    } catch {
      return null;
    }
  }, [jurisdiction, annualSalary, payFrequency, kiwiSaverRate]);

  const jInfo = PAYROLL_JURISDICTIONS.find((j) => j.code === jurisdiction);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 lg:px-12">
      {/* Header */}
      <div>
        <h1 className="font-serif text-display text-navy-800 dark:text-white">
          Payroll calculator
        </h1>
        <p className="mt-2 text-navy-400 dark:text-navy-500">
          Calculate take-home pay, deductions, and employer costs across five
          jurisdictions. Uses 2024/25 tax rates.
        </p>
      </div>

      {/* Input form */}
      <div className="mt-8 rounded-2xl border border-navy-100 bg-white p-6 shadow-card dark:border-navy-700 dark:bg-navy-800 sm:p-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
              {PAYROLL_JURISDICTIONS.map((j) => (
                <option key={j.code} value={j.code}>
                  {j.flag} {j.name} ({j.currency})
                </option>
              ))}
            </select>
          </div>

          {/* Annual salary */}
          <div>
            <label
              htmlFor="salary"
              className="block text-xs font-semibold uppercase tracking-wider text-navy-400 dark:text-navy-500"
            >
              Annual salary ({jInfo?.symbol ?? "$"})
            </label>
            <input
              id="salary"
              type="text"
              inputMode="numeric"
              value={salary}
              onChange={(e) => {
                const v = e.target.value.replace(/[^0-9.]/g, "");
                setSalary(v);
              }}
              placeholder="85000"
              className="mt-2 block w-full rounded-lg border border-navy-200 bg-white px-3 py-2.5 text-sm text-navy-700 shadow-sm transition-colors focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500 dark:border-navy-600 dark:bg-navy-900 dark:text-navy-200"
            />
          </div>

          {/* Pay frequency */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-navy-400 dark:text-navy-500">
              Pay frequency
            </label>
            <div className="mt-2 flex rounded-lg border border-navy-200 dark:border-navy-600">
              {PAY_FREQUENCIES.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setPayFrequency(f.value)}
                  className={`flex-1 px-2 py-2.5 text-xs font-medium transition-colors first:rounded-l-lg last:rounded-r-lg ${
                    payFrequency === f.value
                      ? "bg-navy-500 text-white dark:bg-navy-400 dark:text-navy-950"
                      : "bg-white text-navy-500 hover:bg-navy-50 dark:bg-navy-900 dark:text-navy-400 dark:hover:bg-navy-800"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* KiwiSaver (NZ only) */}
          <div
            className={`transition-opacity ${jurisdiction === "NZ" ? "opacity-100" : "pointer-events-none opacity-30"}`}
          >
            <label
              htmlFor="kiwisaver"
              className="block text-xs font-semibold uppercase tracking-wider text-navy-400 dark:text-navy-500"
            >
              KiwiSaver rate
            </label>
            <select
              id="kiwisaver"
              value={kiwiSaverRate}
              onChange={(e) => setKiwiSaverRate(Number(e.target.value))}
              disabled={jurisdiction !== "NZ"}
              className="mt-2 block w-full rounded-lg border border-navy-200 bg-white px-3 py-2.5 text-sm text-navy-700 shadow-sm transition-colors focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500 disabled:opacity-50 dark:border-navy-600 dark:bg-navy-900 dark:text-navy-200"
            >
              {KIWISAVER_RATES.map((r) => (
                <option key={r} value={r}>
                  {r}%
                </option>
              ))}
            </select>
            {jurisdiction !== "NZ" && (
              <p className="mt-1 text-xs text-navy-400 dark:text-navy-500">
                NZ only
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Results */}
      {result ? (
        <div className="mt-8">
          <PaySlip
            result={result}
            jurisdiction={jurisdiction}
            payFrequency={payFrequency}
            annualSalary={annualSalary}
          />
        </div>
      ) : (
        <div className="mt-8 rounded-2xl border border-navy-100 bg-white p-12 text-center shadow-card dark:border-navy-700 dark:bg-navy-800">
          <p className="font-serif text-lg text-navy-700 dark:text-navy-300">
            Enter an annual salary to see the breakdown.
          </p>
          <p className="mt-1 text-sm text-navy-400 dark:text-navy-500">
            All calculations use official 2024/25 tax rates and thresholds.
          </p>
        </div>
      )}

      {/* Disclaimer */}
      <div className="mt-8">
        <LegalDisclaimer type="PAYROLL" variant="footer" />
      </div>
    </div>
  );
}
