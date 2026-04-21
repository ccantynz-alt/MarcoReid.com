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
type ProductType = "SOFTWARE" | "PHYSICAL_GOODS" | "SERVICES" | "DIGITAL_CONTENT" | "MIXED";
type IpValue = "HIGH" | "MEDIUM" | "LOW";
type Investor = "BOOTSTRAP" | "ANGEL" | "VC" | "PE";
type Protection = "STANDARD" | "AGGRESSIVE" | "MAXIMUM";

interface FounderRow {
  name: string;
  email: string;
  equityPct: number;
  role?: string;
  residency?: string;
}

interface BusinessProfile {
  proposedName: string;
  alternateName: string;
  purpose: string;
  industry: string;
  productType: ProductType;
  operatingCountries: string[];
  salesMarkets: string[];
}

interface ProtectionProfile {
  ipValue: IpValue;
  investorAppetite: Investor;
  assetProtectionLevel: Protection;
  expectedAnnualRevenueCents: number | null;
  willHaveEmployees: boolean;
  willTakeInvestment: boolean;
  isNonProfit: boolean;
  registeredOffice: string;
}

const COUNTRIES = ["NZ", "AU", "US", "UK", "CA", "SG", "EU"] as const;
const PRODUCT_TYPES: { value: ProductType; label: string }[] = [
  { value: "SOFTWARE", label: "Software / SaaS" },
  { value: "PHYSICAL_GOODS", label: "Physical goods" },
  { value: "SERVICES", label: "Services" },
  { value: "DIGITAL_CONTENT", label: "Digital content" },
  { value: "MIXED", label: "Mixed" },
];

const STEPS = ["Home", "Founders", "Business", "Protection", "Preview", "Confirm"] as const;

const BLANK_FOUNDER: FounderRow = { name: "", email: "", equityPct: 0, role: "", residency: "" };

const BLANK_BUSINESS = (home: Home): BusinessProfile => ({
  proposedName: "",
  alternateName: "",
  purpose: "",
  industry: "",
  productType: "MIXED",
  operatingCountries: [home],
  salesMarkets: [home],
});

const BLANK_PROTECTION: ProtectionProfile = {
  ipValue: "LOW",
  investorAppetite: "BOOTSTRAP",
  assetProtectionLevel: "STANDARD",
  expectedAnnualRevenueCents: null,
  willHaveEmployees: false,
  willTakeInvestment: false,
  isNonProfit: false,
  registeredOffice: "",
};

export default function SetupCompanyWizard({ areas }: { areas: AreaOption[] }) {
  const [step, setStep] = useState<number>(1);
  const [home, setHome] = useState<Home>("NZ");
  const [founders, setFounders] = useState<FounderRow[]>([{ ...BLANK_FOUNDER, equityPct: 100 }]);
  const [business, setBusiness] = useState<BusinessProfile>(BLANK_BUSINESS("NZ"));
  const [protection, setProtection] = useState<ProtectionProfile>(BLANK_PROTECTION);
  const area = areas.find((a) => a.jurisdiction === home) ?? null;

  return (
    <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card sm:p-10">
      <Stepper step={step} />

      {step === 1 && (
        <Step1Home
          home={home}
          setHome={(h) => {
            setHome(h);
            setBusiness((b) => ({
              ...b,
              operatingCountries: b.operatingCountries.includes(h) ? b.operatingCountries : [h, ...b.operatingCountries],
              salesMarkets: b.salesMarkets.includes(h) ? b.salesMarkets : [h, ...b.salesMarkets],
            }));
          }}
          onNext={() => setStep(2)}
        />
      )}

      {step === 2 && (
        <Step2Founders
          founders={founders}
          setFounders={setFounders}
          onBack={() => setStep(1)}
          onNext={() => setStep(3)}
        />
      )}

      {step === 3 && (
        <Step3Business
          home={home}
          business={business}
          setBusiness={setBusiness}
          onBack={() => setStep(2)}
          onNext={() => setStep(4)}
        />
      )}

      {step === 4 && (
        <Step4Protection
          home={home}
          protection={protection}
          setProtection={setProtection}
          onBack={() => setStep(3)}
          onNext={() => setStep(5)}
        />
      )}

      {step > 4 && area && (
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

function Step4Protection({
  home,
  protection,
  setProtection,
  onBack,
  onNext,
}: {
  home: Home;
  protection: ProtectionProfile;
  setProtection: (p: ProtectionProfile) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const currency = home === "NZ" ? "NZD" : "AUD";
  const revenueDollars =
    protection.expectedAnnualRevenueCents != null ? protection.expectedAnnualRevenueCents / 100 : "";

  return (
    <div>
      <h2 className="font-serif text-2xl text-navy-800">How protected do you want to be?</h2>
      <p className="mt-2 text-sm text-navy-500">
        Marco uses these signals to decide whether you need a bare home
        company, a trust overlay, a separate IP-holding entity, or a Cook
        Islands international trust. Aggressive tiers cost more to maintain
        and attract more professional scrutiny.
      </p>

      <Radio
        label="How valuable is the IP?"
        hint="If the business lives or dies on proprietary software, patents, or trade secrets, say HIGH so Marco splits it into its own holding entity."
        value={protection.ipValue}
        onChange={(v) => setProtection({ ...protection, ipValue: v as IpValue })}
        options={[
          { value: "LOW", label: "Low — commodity product or service" },
          { value: "MEDIUM", label: "Medium — some proprietary assets" },
          { value: "HIGH", label: "High — IP is the business" },
        ]}
      />

      <Radio
        label="Investor appetite"
        hint="VC/PE-track founders usually need a US C-Corp on top; bootstrappers usually don't."
        value={protection.investorAppetite}
        onChange={(v) => setProtection({ ...protection, investorAppetite: v as Investor })}
        options={[
          { value: "BOOTSTRAP", label: "Bootstrapped — no outside money planned" },
          { value: "ANGEL", label: "Angel — friends, family, or angel syndicate" },
          { value: "VC", label: "Venture — targeting institutional VC" },
          { value: "PE", label: "Private equity / late stage" },
        ]}
      />

      <Radio
        label="Asset-protection tier"
        hint="Decides the entity count and the tolerance for complexity. MAXIMUM includes a Cook Islands overlay."
        value={protection.assetProtectionLevel}
        onChange={(v) => setProtection({ ...protection, assetProtectionLevel: v as Protection })}
        options={[
          { value: "STANDARD", label: "Standard — single company, nothing fancy" },
          { value: "AGGRESSIVE", label: "Aggressive — trust overlay + corporate trustee" },
          { value: "MAXIMUM", label: "Maximum — offshore trust layer on top" },
        ]}
      />

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="text-xs font-semibold text-navy-600">
          Expected year-1 revenue ({currency})
          <input
            type="number"
            min={0}
            step={1000}
            value={revenueDollars}
            onChange={(e) =>
              setProtection({
                ...protection,
                expectedAnnualRevenueCents: e.target.value ? Math.round(Number(e.target.value) * 100) : null,
              })
            }
            placeholder="e.g. 250000"
            className="mt-1 w-full rounded-lg border border-navy-200 px-3 py-2 text-sm font-normal focus:border-gold-400 focus:outline-none"
          />
        </label>
        <label className="text-xs font-semibold text-navy-600">
          Registered office (optional)
          <input
            type="text"
            value={protection.registeredOffice}
            onChange={(e) => setProtection({ ...protection, registeredOffice: e.target.value })}
            placeholder="Street address in your home jurisdiction"
            className="mt-1 w-full rounded-lg border border-navy-200 px-3 py-2 text-sm font-normal focus:border-gold-400 focus:outline-none"
          />
        </label>
      </div>

      <div className="mt-5 space-y-2">
        <Toggle
          label="Will you hire employees?"
          value={protection.willHaveEmployees}
          onChange={(v) => setProtection({ ...protection, willHaveEmployees: v })}
        />
        <Toggle
          label="Will you take outside investment in the next 12 months?"
          value={protection.willTakeInvestment}
          onChange={(v) => setProtection({ ...protection, willTakeInvestment: v })}
        />
        <Toggle
          label="Is this a non-profit / charity?"
          value={protection.isNonProfit}
          onChange={(v) => setProtection({ ...protection, isNonProfit: v })}
        />
      </div>

      <div className="mt-8 flex items-center justify-between">
        <button type="button" onClick={onBack} className="text-sm text-navy-500 hover:text-navy-700">
          &larr; Back
        </button>
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

function Radio({
  label,
  hint,
  value,
  onChange,
  options,
}: {
  label: string;
  hint?: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="mt-5">
      <p className="text-xs font-semibold text-navy-600">{label}</p>
      {hint && <p className="mt-1 text-xs text-navy-400">{hint}</p>}
      <div className="mt-2 grid gap-2">
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(o.value)}
            className={`rounded-lg border px-3 py-2 text-left text-sm transition-colors ${
              value === o.value
                ? "border-gold-400 bg-gold-50 text-navy-800"
                : "border-navy-200 bg-white text-navy-600 hover:border-navy-300"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function Toggle({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-3 rounded-lg border border-navy-100 bg-navy-50/40 px-3 py-2 text-sm text-navy-700">
      <input
        type="checkbox"
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 rounded border-navy-300 text-navy-600 focus:ring-navy-500"
      />
      {label}
    </label>
  );
}

function Step3Business({
  home,
  business,
  setBusiness,
  onBack,
  onNext,
}: {
  home: Home;
  business: BusinessProfile;
  setBusiness: (b: BusinessProfile) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const valid = business.purpose.trim().length >= 40 && business.operatingCountries.length > 0 && business.salesMarkets.length > 0;

  function toggleMarket(field: "operatingCountries" | "salesMarkets", code: string) {
    const current = business[field];
    const next = current.includes(code)
      ? current.filter((c) => c !== code)
      : [...current, code];
    setBusiness({ ...business, [field]: next });
  }

  return (
    <div>
      <h2 className="font-serif text-2xl text-navy-800">What is the business?</h2>
      <p className="mt-2 text-sm text-navy-500">
        Plain-English is fine. The purpose drives how Marco structures IP
        ownership and trading flow — the more specific the better.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="text-xs font-semibold text-navy-600">
          Proposed company name
          <input
            type="text"
            value={business.proposedName}
            onChange={(e) => setBusiness({ ...business, proposedName: e.target.value })}
            placeholder="e.g. Kowhai Labs"
            className="mt-1 w-full rounded-lg border border-navy-200 px-3 py-2 text-sm font-normal focus:border-gold-400 focus:outline-none"
          />
        </label>
        <label className="text-xs font-semibold text-navy-600">
          Alternate name (backup)
          <input
            type="text"
            value={business.alternateName}
            onChange={(e) => setBusiness({ ...business, alternateName: e.target.value })}
            className="mt-1 w-full rounded-lg border border-navy-200 px-3 py-2 text-sm font-normal focus:border-gold-400 focus:outline-none"
          />
        </label>
      </div>

      <label className="mt-5 block text-xs font-semibold text-navy-600">
        What will the business do? (40+ chars)
        <textarea
          value={business.purpose}
          onChange={(e) => setBusiness({ ...business, purpose: e.target.value.slice(0, 2000) })}
          rows={5}
          placeholder="We build a SaaS product that helps hospitality venues manage staff rostering. We'll sell to venues in NZ, AU, and the US via a self-serve signup."
          className="mt-1 w-full rounded-lg border border-navy-200 px-3 py-2 text-sm font-normal focus:border-gold-400 focus:outline-none"
        />
        <span className="mt-1 block text-xs text-navy-400">{business.purpose.length} / 2000</span>
      </label>

      <label className="mt-5 block text-xs font-semibold text-navy-600">
        Industry (optional)
        <input
          type="text"
          value={business.industry}
          onChange={(e) => setBusiness({ ...business, industry: e.target.value })}
          placeholder="Hospitality tech, fintech, e-commerce…"
          className="mt-1 w-full rounded-lg border border-navy-200 px-3 py-2 text-sm font-normal focus:border-gold-400 focus:outline-none"
        />
      </label>

      <div className="mt-5">
        <p className="text-xs font-semibold text-navy-600">Product type</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {PRODUCT_TYPES.map((p) => (
            <button
              key={p.value}
              type="button"
              onClick={() => setBusiness({ ...business, productType: p.value })}
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                business.productType === p.value
                  ? "border-gold-400 bg-gold-50 text-navy-800"
                  : "border-navy-200 bg-white text-navy-600 hover:border-navy-300"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <MarketToggle
        label="Countries you'll operate from"
        hint="Where staff, servers, or day-to-day activity actually live."
        selected={business.operatingCountries}
        required={home}
        onToggle={(c) => toggleMarket("operatingCountries", c)}
      />
      <MarketToggle
        label="Countries you'll sell into"
        hint="Where your customers are. US customers usually trigger a Wyoming or Delaware overlay."
        selected={business.salesMarkets}
        required={home}
        onToggle={(c) => toggleMarket("salesMarkets", c)}
      />

      <div className="mt-8 flex items-center justify-between">
        <button type="button" onClick={onBack} className="text-sm text-navy-500 hover:text-navy-700">
          &larr; Back
        </button>
        <button
          type="button"
          disabled={!valid}
          onClick={onNext}
          className="rounded-lg bg-navy-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-navy-600 disabled:cursor-not-allowed disabled:bg-navy-200"
        >
          Continue &rarr;
        </button>
      </div>
    </div>
  );
}

function MarketToggle({
  label,
  hint,
  selected,
  required,
  onToggle,
}: {
  label: string;
  hint: string;
  selected: string[];
  required: string;
  onToggle: (code: string) => void;
}) {
  return (
    <div className="mt-5">
      <p className="text-xs font-semibold text-navy-600">{label}</p>
      <p className="mt-1 text-xs text-navy-400">{hint}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {COUNTRIES.map((c) => {
          const isSelected = selected.includes(c);
          const isRequired = c === required;
          return (
            <button
              key={c}
              type="button"
              onClick={() => !isRequired && onToggle(c)}
              disabled={isRequired}
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                isSelected
                  ? "border-gold-400 bg-gold-50 text-navy-800"
                  : "border-navy-200 bg-white text-navy-600 hover:border-navy-300"
              } ${isRequired ? "cursor-not-allowed opacity-80" : ""}`}
              title={isRequired ? "Always included — home jurisdiction" : undefined}
            >
              {c}
            </button>
          );
        })}
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
