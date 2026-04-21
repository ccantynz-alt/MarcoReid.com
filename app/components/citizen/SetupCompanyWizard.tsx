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

const STEPS = ["Home", "Founders", "Business", "Protection", "Preview", "Confirm"] as const;

export default function SetupCompanyWizard({ areas }: { areas: AreaOption[] }) {
  const [step, setStep] = useState<number>(1);
  const [home, setHome] = useState<Home>("NZ");
  const area = areas.find((a) => a.jurisdiction === home) ?? null;

  return (
    <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card sm:p-10">
      <Stepper step={step} />

      {step === 1 && <Step1Home home={home} setHome={setHome} onNext={() => setStep(2)} />}

      {step > 1 && area && (
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
