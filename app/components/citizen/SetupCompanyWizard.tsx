"use client";

import { useState } from "react";
import { formatFee } from "@/lib/marketplace/format";

export interface AreaOption {
  slug: string;
  name: string;
  jurisdiction: string;
  leadFeeInCents: number;
  currency: string;
  ackVersion: string;
  ackBullets: string[];
}

type Home = "NZ" | "AU";

interface FounderRow {
  name: string;
  email: string;
  equityPct: number;
  role?: string;
  residency?: string;
}

const STEPS = ["Home", "Founders", "Business", "Protection", "Preview", "Confirm"] as const;

const BLANK_FOUNDER: FounderRow = { name: "", email: "", equityPct: 0, role: "", residency: "" };

export default function SetupCompanyWizard({ areas }: { areas: AreaOption[] }) {
  const [step, setStep] = useState<number>(1);
  const [home, setHome] = useState<Home>("NZ");
  const [founders, setFounders] = useState<FounderRow[]>([{ ...BLANK_FOUNDER, equityPct: 100 }]);
  const area = areas.find((a) => a.jurisdiction === home) ?? null;

  return (
    <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card sm:p-10">
      <Stepper step={step} />

      {step === 1 && <Step1Home home={home} setHome={setHome} onNext={() => setStep(2)} />}

      {step === 2 && (
        <Step2Founders
          founders={founders}
          setFounders={setFounders}
          onBack={() => setStep(1)}
          onNext={() => setStep(3)}
        />
      )}

      {step > 2 && area && (
        <div className="text-sm text-navy-500">
          Wizard step {step} arriving in the next commit. Lead fee for{" "}
          {area.jurisdiction}: {formatFee(area.leadFeeInCents, area.currency)}.
          <div className="mt-6">
            <button
              type="button"
              onClick={() => setStep(Math.max(1, step - 1))}
              className="text-sm text-navy-500 hover:text-navy-700"
            >
              &larr; Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Stepper({ step }: { step: number }) {
  return (
    <ol className="mb-8 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wider text-navy-400">
      {STEPS.map((label, i) => {
        const n = i + 1;
        const active = step === n;
        const done = step > n;
        return (
          <li key={label} className="flex items-center gap-2">
            <span
              className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] ${
                active ? "bg-navy-700 text-white" : done ? "bg-forest-500 text-white" : "bg-navy-100 text-navy-500"
              }`}
            >
              {n}
            </span>
            <span className={active ? "text-navy-700" : "text-navy-400"}>{label}</span>
            {n < STEPS.length && <span className="mx-1 h-px w-6 bg-navy-200" aria-hidden="true" />}
          </li>
        );
      })}
    </ol>
  );
}

function Step2Founders({
  founders,
  setFounders,
  onBack,
  onNext,
}: {
  founders: FounderRow[];
  setFounders: (f: FounderRow[]) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const total = founders.reduce((s, f) => s + (Number(f.equityPct) || 0), 0);
  const allValid =
    founders.length > 0 &&
    founders.every((f) => f.name.trim() && /.+@.+\..+/.test(f.email) && f.equityPct > 0) &&
    Math.round(total) === 100;

  function update(i: number, patch: Partial<FounderRow>) {
    setFounders(founders.map((f, idx) => (idx === i ? { ...f, ...patch } : f)));
  }
  function remove(i: number) {
    if (founders.length === 1) return;
    setFounders(founders.filter((_, idx) => idx !== i));
  }
  function add() {
    setFounders([...founders, { ...BLANK_FOUNDER }]);
  }

  return (
    <div>
      <h2 className="font-serif text-2xl text-navy-800">Who are the founders?</h2>
      <p className="mt-2 text-sm text-navy-500">
        Add everyone taking equity on day one. Totals have to add to 100%.
        Residency helps Marco decide tax-treaty treatment and any foreign-
        investor reporting obligations.
      </p>
      <div className="mt-6 space-y-3">
        {founders.map((f, i) => (
          <div key={i} className="rounded-xl border border-navy-100 bg-navy-50/50 p-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="text-xs font-semibold text-navy-600">
                Name
                <input
                  type="text"
                  value={f.name}
                  onChange={(e) => update(i, { name: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-navy-200 px-3 py-2 text-sm font-normal focus:border-gold-400 focus:outline-none"
                />
              </label>
              <label className="text-xs font-semibold text-navy-600">
                Email
                <input
                  type="email"
                  value={f.email}
                  onChange={(e) => update(i, { email: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-navy-200 px-3 py-2 text-sm font-normal focus:border-gold-400 focus:outline-none"
                />
              </label>
              <label className="text-xs font-semibold text-navy-600">
                Equity %
                <input
                  type="number"
                  min={0}
                  max={100}
                  step={0.01}
                  value={f.equityPct}
                  onChange={(e) => update(i, { equityPct: Number(e.target.value) })}
                  className="mt-1 w-full rounded-lg border border-navy-200 px-3 py-2 text-sm font-normal focus:border-gold-400 focus:outline-none"
                />
              </label>
              <label className="text-xs font-semibold text-navy-600">
                Role (optional)
                <input
                  type="text"
                  value={f.role ?? ""}
                  onChange={(e) => update(i, { role: e.target.value })}
                  placeholder="CEO, CTO, Director…"
                  className="mt-1 w-full rounded-lg border border-navy-200 px-3 py-2 text-sm font-normal focus:border-gold-400 focus:outline-none"
                />
              </label>
              <label className="text-xs font-semibold text-navy-600 sm:col-span-2">
                Tax residency (country code, optional)
                <input
                  type="text"
                  value={f.residency ?? ""}
                  onChange={(e) => update(i, { residency: e.target.value.toUpperCase().slice(0, 2) })}
                  placeholder="NZ, AU, US…"
                  className="mt-1 w-full rounded-lg border border-navy-200 px-3 py-2 text-sm font-normal focus:border-gold-400 focus:outline-none"
                />
              </label>
            </div>
            {founders.length > 1 && (
              <button
                type="button"
                onClick={() => remove(i)}
                className="mt-3 text-xs text-red-600 hover:text-red-800"
              >
                Remove founder
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between text-sm">
        <button
          type="button"
          onClick={add}
          className="rounded-lg border border-navy-200 px-3 py-1.5 text-xs font-semibold text-navy-600 hover:bg-navy-50"
        >
          + Add founder
        </button>
        <p className={`text-xs ${Math.round(total) === 100 ? "text-forest-600" : "text-amber-600"}`}>
          Total equity: {total.toFixed(2)}%
        </p>
      </div>
      <div className="mt-8 flex items-center justify-between">
        <button type="button" onClick={onBack} className="text-sm text-navy-500 hover:text-navy-700">
          &larr; Back
        </button>
        <button
          type="button"
          disabled={!allValid}
          onClick={onNext}
          className="rounded-lg bg-navy-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-navy-600 disabled:cursor-not-allowed disabled:bg-navy-200"
        >
          Continue &rarr;
        </button>
      </div>
    </div>
  );
}

function Step1Home({
  home,
  setHome,
  onNext,
}: {
  home: Home;
  setHome: (h: Home) => void;
  onNext: () => void;
}) {
  return (
    <div>
      <h2 className="font-serif text-2xl text-navy-800">Where are you based?</h2>
      <p className="mt-2 text-sm text-navy-500">
        We currently ship company formation for founders tax-resident in New
        Zealand or Australia. Marco will overlay any foreign entities —
        Wyoming LLC, Delaware C-Corp, trust overlays — on top of your home
        structure.
      </p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {[
          { code: "NZ" as Home, label: "New Zealand" },
          { code: "AU" as Home, label: "Australia" },
        ].map((j) => (
          <button
            key={j.code}
            type="button"
            onClick={() => setHome(j.code)}
            className={`rounded-xl border p-5 text-left transition-colors ${
              home === j.code ? "border-gold-400 bg-gold-50" : "border-navy-100 bg-white hover:border-navy-300"
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
          onClick={onNext}
          className="rounded-lg bg-navy-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-navy-600"
        >
          Continue &rarr;
        </button>
      </div>
    </div>
  );
}
