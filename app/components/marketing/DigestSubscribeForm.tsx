"use client";

import { useState } from "react";

const JURISDICTIONS = [
  { value: "NZ", label: "New Zealand" },
  { value: "AU", label: "Australia" },
  { value: "UK", label: "United Kingdom" },
  { value: "US", label: "United States" },
] as const;

const SPECIALTY_GROUPS: ReadonlyArray<{
  group: string;
  options: ReadonlyArray<{ value: string; label: string }>;
}> = [
  {
    group: "Legal",
    options: [
      { value: "litigation", label: "Litigation" },
      { value: "family", label: "Family law" },
      { value: "employment", label: "Employment" },
      { value: "commercial-corporate", label: "Commercial / corporate" },
      { value: "intellectual-property", label: "IP" },
      { value: "real-estate", label: "Property" },
      { value: "tax-disputes", label: "Tax disputes" },
      { value: "trusts-estates", label: "Trusts + estates" },
      { value: "immigration", label: "Immigration" },
      { value: "insolvency", label: "Insolvency" },
      { value: "aml-cft", label: "AML / CFT" },
    ],
  },
  {
    group: "Accounting",
    options: [
      { value: "audit-assurance", label: "Audit + assurance" },
      { value: "tax-advisory", label: "Tax advisory" },
      { value: "forensic-accounting", label: "Forensic accounting" },
      { value: "smsf", label: "SMSF (AU)" },
      { value: "international-tax", label: "International tax" },
      { value: "transfer-pricing", label: "Transfer pricing" },
      { value: "indirect-taxes", label: "GST / VAT / sales tax" },
      { value: "rd-tax-credits", label: "R&D tax credits" },
      { value: "business-advisory", label: "Business advisory" },
    ],
  },
];

const FREQUENCIES = [
  { value: "DAILY", label: "Daily" },
  { value: "WEEKDAYS", label: "Weekdays only" },
  { value: "WEEKLY", label: "Weekly" },
] as const;

export default function DigestSubscribeForm() {
  const [email, setEmail] = useState("");
  const [jurisdictions, setJurisdictions] = useState<Set<string>>(
    new Set(["NZ"]),
  );
  const [specialties, setSpecialties] = useState<Set<string>>(new Set());
  const [frequency, setFrequency] = useState<
    (typeof FREQUENCIES)[number]["value"]
  >("DAILY");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [error, setError] = useState<string | null>(null);

  function toggle(set: Set<string>, setter: (s: Set<string>) => void) {
    return (value: string) => {
      const next = new Set(set);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      setter(next);
    };
  }

  const toggleJurisdiction = toggle(jurisdictions, setJurisdictions);
  const toggleSpecialty = toggle(specialties, setSpecialties);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!email.trim() || !email.includes("@")) {
      setError("A valid email is required.");
      setStatus("error");
      return;
    }
    if (jurisdictions.size === 0) {
      setError("Pick at least one jurisdiction.");
      setStatus("error");
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch("/api/digest/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          jurisdictions: Array.from(jurisdictions),
          specialties: Array.from(specialties),
          frequency,
        }),
      });
      const j = await res.json();
      if (!res.ok) {
        setError(j.error || "Could not subscribe.");
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setError("Network error.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="mx-auto max-w-xl rounded-2xl border border-forest-300 bg-forest-50/30 p-8 text-center shadow-card">
        <p className="font-serif text-2xl text-navy-800">
          You&rsquo;re on the list.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-navy-600">
          We&rsquo;ll send you the first digest as soon as the publishing
          rail is live. In the meantime, look around the platform &mdash;
          /generate, /directory, /tools/court-rules, /marco/legal, and the
          rest.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-2xl rounded-2xl border border-navy-100 bg-white p-6 shadow-card sm:p-8"
    >
      <div className="space-y-5">
        <div>
          <label
            htmlFor="digest-email"
            className="block text-sm font-semibold text-navy-700"
          >
            Email
          </label>
          <input
            id="digest-email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full rounded-xl border border-navy-200 bg-white px-4 py-2.5 text-sm text-navy-800 placeholder:text-navy-300 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-200"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
            Jurisdictions (pick at least one)
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {JURISDICTIONS.map((j) => {
              const active = jurisdictions.has(j.value);
              return (
                <button
                  key={j.value}
                  type="button"
                  onClick={() => toggleJurisdiction(j.value)}
                  className={`rounded-md border px-3 py-1.5 text-xs font-semibold transition-colors ${
                    active
                      ? "border-forest-300 bg-forest-50 text-navy-800"
                      : "border-navy-200 bg-white text-navy-500 hover:border-forest-300"
                  }`}
                >
                  {j.label}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
            Specialties (optional — empty = all)
          </p>
          <div className="mt-3 space-y-3">
            {SPECIALTY_GROUPS.map((g) => (
              <div key={g.group}>
                <p className="text-[10px] font-bold uppercase tracking-wider text-navy-500">
                  {g.group}
                </p>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {g.options.map((s) => {
                    const active = specialties.has(s.value);
                    return (
                      <button
                        key={s.value}
                        type="button"
                        onClick={() => toggleSpecialty(s.value)}
                        className={`rounded-md border px-2 py-1 text-[11px] font-semibold transition-colors ${
                          active
                            ? "border-gold-300 bg-gold-50 text-navy-800"
                            : "border-navy-200 bg-white text-navy-500 hover:border-gold-300"
                        }`}
                      >
                        {s.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
            Cadence
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {FREQUENCIES.map((f) => (
              <button
                key={f.value}
                type="button"
                onClick={() => setFrequency(f.value)}
                className={`rounded-md border px-3 py-1.5 text-xs font-semibold transition-colors ${
                  frequency === f.value
                    ? "border-navy-400 bg-navy-50 text-navy-800"
                    : "border-navy-200 bg-white text-navy-500 hover:border-navy-400"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <p
            role="alert"
            className="rounded-xl border border-plum-200 bg-plum-50 px-4 py-3 text-sm text-plum-700"
          >
            {error}
          </p>
        )}

        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-navy-400">
            Free. One-click unsubscribe in every issue.
          </p>
          <button
            type="submit"
            disabled={status === "submitting"}
            className="inline-flex items-center justify-center rounded-xl bg-gold-400 px-6 py-3 text-sm font-semibold text-navy-900 shadow-sm transition-all hover:bg-gold-300 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "submitting" ? "Subscribing…" : "Subscribe →"}
          </button>
        </div>
      </div>
    </form>
  );
}
