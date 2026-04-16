"use client";

import { useState } from "react";
import { useToast } from "@/app/components/shared/Toast";
import SectionHeader from "../SectionHeader";

const FIRM_SIZES = [
  { value: "1", label: "Just me" },
  { value: "2-10", label: "2 – 10" },
  { value: "11-50", label: "11 – 50" },
  { value: "51-200", label: "51 – 200" },
  { value: "200+", label: "200+" },
];

const PRACTICE_AREAS = [
  "Litigation",
  "Corporate / commercial",
  "Property and conveyancing",
  "Family",
  "Criminal",
  "Employment",
  "Tax",
  "Estates and trusts",
  "Intellectual property",
  "Immigration",
  "Audit and assurance",
  "Bookkeeping",
  "Tax compliance",
  "Advisory",
];

const COUNTRIES = [
  "New Zealand",
  "Australia",
  "United Kingdom",
  "United States",
  "Canada",
  "Singapore",
  "Hong Kong",
  "Other",
];

const inputClass =
  "w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-navy-800 placeholder:text-navy-400 focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500";
const labelClass = "block text-sm font-medium text-navy-700";

interface FirmInitial {
  firmName: string;
  firmSize: string;
  street: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
  website: string;
  phone: string;
  practiceAreas: string[];
  defaultRateCents: number;
}

export default function FirmForm({ initial }: { initial: FirmInitial }) {
  const toast = useToast();
  const [form, setForm] = useState<FirmInitial>(initial);
  const [rateDollars, setRateDollars] = useState(
    initial.defaultRateCents > 0
      ? (initial.defaultRateCents / 100).toFixed(2)
      : ""
  );
  const [saving, setSaving] = useState(false);

  function update<K extends keyof FirmInitial>(key: K, value: FirmInitial[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function togglePracticeArea(area: string) {
    setForm((f) => {
      const has = f.practiceAreas.includes(area);
      return {
        ...f,
        practiceAreas: has
          ? f.practiceAreas.filter((p) => p !== area)
          : [...f.practiceAreas, area],
      };
    });
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const cents = Math.round((parseFloat(rateDollars) || 0) * 100);
    try {
      const res = await fetch("/api/me/firm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, defaultRateCents: cents }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error || "Save failed");
      }
      toast.success("Firm details saved");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <SectionHeader
        title="Firm"
        description="The details that appear on your invoices, engagement letters, and client portal."
      />

      <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card sm:p-8">
        <div className="flex items-center gap-5">
          <div
            aria-hidden="true"
            className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl border border-navy-200 bg-navy-50 text-navy-400"
          >
            <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M5 21V7l8-4 8 4v14M9 9h.01M9 13h.01M9 17h.01M15 9h.01M15 13h.01M15 17h.01" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-navy-700">Firm logo</p>
            <p className="text-xs text-navy-400">
              Logo upload coming soon. Used on invoices and the client portal.
            </p>
          </div>
          <button
            type="button"
            onClick={() => toast.info("Logo upload is coming soon")}
            className="rounded-lg border border-navy-200 px-4 py-2 text-sm font-medium text-navy-700 transition-colors hover:bg-navy-50"
          >
            Upload
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card sm:p-8">
        <h3 className="font-serif text-lg text-navy-800">About your firm</h3>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="firmName" className={labelClass}>Firm name</label>
            <input
              id="firmName"
              type="text"
              value={form.firmName}
              onChange={(e) => update("firmName", e.target.value)}
              className={`mt-2 ${inputClass}`}
              placeholder="Reid & Associates"
            />
          </div>
          <div>
            <label htmlFor="firmSize" className={labelClass}>Firm size</label>
            <select
              id="firmSize"
              value={form.firmSize}
              onChange={(e) => update("firmSize", e.target.value)}
              className={`mt-2 ${inputClass}`}
            >
              {FIRM_SIZES.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="rate" className={labelClass}>
              Default hourly rate
            </label>
            <div className="relative mt-2">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-navy-400">
                $
              </span>
              <input
                id="rate"
                type="number"
                step="0.01"
                min="0"
                value={rateDollars}
                onChange={(e) => setRateDollars(e.target.value)}
                className={`${inputClass} pl-8`}
                placeholder="350.00"
              />
            </div>
            <p className="mt-2 text-xs text-navy-400">
              Stored in cents, displayed in dollars. Used as the default for new time entries.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card sm:p-8">
        <h3 className="font-serif text-lg text-navy-800">Contact</h3>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="website" className={labelClass}>Website</label>
            <input
              id="website"
              type="url"
              value={form.website}
              onChange={(e) => update("website", e.target.value)}
              className={`mt-2 ${inputClass}`}
              placeholder="https://reidlaw.com"
            />
          </div>
          <div>
            <label htmlFor="phone" className={labelClass}>Phone</label>
            <input
              id="phone"
              type="tel"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              className={`mt-2 ${inputClass}`}
              placeholder="+64 9 555 0100"
            />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card sm:p-8">
        <h3 className="font-serif text-lg text-navy-800">Address</h3>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="street" className={labelClass}>Street</label>
            <input
              id="street"
              type="text"
              value={form.street}
              onChange={(e) => update("street", e.target.value)}
              className={`mt-2 ${inputClass}`}
              autoComplete="address-line1"
            />
          </div>
          <div>
            <label htmlFor="city" className={labelClass}>City</label>
            <input
              id="city"
              type="text"
              value={form.city}
              onChange={(e) => update("city", e.target.value)}
              className={`mt-2 ${inputClass}`}
              autoComplete="address-level2"
            />
          </div>
          <div>
            <label htmlFor="region" className={labelClass}>Region / state</label>
            <input
              id="region"
              type="text"
              value={form.region}
              onChange={(e) => update("region", e.target.value)}
              className={`mt-2 ${inputClass}`}
              autoComplete="address-level1"
            />
          </div>
          <div>
            <label htmlFor="postalCode" className={labelClass}>Postal code</label>
            <input
              id="postalCode"
              type="text"
              value={form.postalCode}
              onChange={(e) => update("postalCode", e.target.value)}
              className={`mt-2 ${inputClass}`}
              autoComplete="postal-code"
            />
          </div>
          <div>
            <label htmlFor="country" className={labelClass}>Country</label>
            <select
              id="country"
              value={form.country}
              onChange={(e) => update("country", e.target.value)}
              className={`mt-2 ${inputClass}`}
            >
              <option value="">Choose a country</option>
              {COUNTRIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card sm:p-8">
        <h3 className="font-serif text-lg text-navy-800">Practice areas</h3>
        <p className="mt-1 text-sm text-navy-400">Select all that apply.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {PRACTICE_AREAS.map((area) => {
            const active = form.practiceAreas.includes(area);
            return (
              <button
                type="button"
                key={area}
                onClick={() => togglePracticeArea(area)}
                aria-pressed={active}
                className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
                  active
                    ? "border-forest-500 bg-forest-500 text-white"
                    : "border-navy-200 bg-white text-navy-700 hover:border-navy-300"
                }`}
              >
                {area}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-end gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-navy-700 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-800 disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save changes"}
        </button>
      </div>
    </form>
  );
}
