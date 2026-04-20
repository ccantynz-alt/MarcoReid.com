"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

interface Area {
  id: string;
  slug: string;
  name: string;
  jurisdiction: string;
  domain: "LAW" | "ACCOUNTING";
  summary: string;
}

const PROFESSIONAL_BODIES: Record<string, { value: string; label: string }[]> = {
  NZ: [
    { value: "NZ Law Society", label: "New Zealand Law Society" },
    { value: "CA ANZ", label: "CA ANZ (Chartered Accountants ANZ)" },
    { value: "NZICA", label: "NZICA (NZ Institute of Chartered Accountants)" },
  ],
  AU: [
    { value: "Law Society of NSW", label: "Law Society of New South Wales" },
    { value: "Law Institute of Victoria", label: "Law Institute of Victoria" },
    { value: "Queensland Law Society", label: "Queensland Law Society" },
    { value: "Law Society of WA", label: "Law Society of Western Australia" },
    { value: "Law Society of SA", label: "Law Society of South Australia" },
    { value: "CA ANZ", label: "CA ANZ (Chartered Accountants ANZ)" },
    { value: "CPA Australia", label: "CPA Australia" },
  ],
};

export default function ProOnboardForm({ areas }: { areas: Area[] }) {
  const router = useRouter();
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [jurisdiction, setJurisdiction] = useState<"NZ" | "AU">("NZ");
  const [professionalBody, setProfessionalBody] = useState(PROFESSIONAL_BODIES.NZ[0].value);
  const [admissionNumber, setAdmissionNumber] = useState("");
  const [admissionYear, setAdmissionYear] = useState<string>("");
  const [piInsurerName, setPiInsurerName] = useState("");
  const [piPolicyNumber, setPiPolicyNumber] = useState("");
  const [piPolicyExpiresAt, setPiPolicyExpiresAt] = useState("");
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const jurisdictionAreas = useMemo(
    () => areas.filter((a) => a.jurisdiction === jurisdiction),
    [areas, jurisdiction],
  );

  const bodies = PROFESSIONAL_BODIES[jurisdiction];

  function toggleArea(slug: string) {
    setSelectedSlugs((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug],
    );
  }

  function changeJurisdiction(j: "NZ" | "AU") {
    setJurisdiction(j);
    setProfessionalBody(PROFESSIONAL_BODIES[j][0].value);
    setSelectedSlugs([]);
  }

  async function submit() {
    if (!displayName || !admissionNumber) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/marketplace/professional", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          displayName,
          bio,
          admissionJurisdiction: jurisdiction,
          admissionNumber,
          admissionYear: admissionYear ? parseInt(admissionYear, 10) : undefined,
          professionalBody,
          piInsurerName,
          piPolicyNumber,
          piPolicyExpiresAt: piPolicyExpiresAt || undefined,
          practiceAreaSlugs: selectedSlugs,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data?.error ?? "Submission failed");
        setBusy(false);
        return;
      }
      router.push("/pro-dashboard");
    } catch {
      setError("Network error — please try again");
      setBusy(false);
    }
  }

  return (
    <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card sm:p-10">
      <Section title="Your profile">
        <Field label="Display name">
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="e.g. Jane Doe"
            className="w-full rounded-lg border border-navy-200 px-4 py-2.5 text-sm focus:border-gold-400 focus:outline-none"
          />
        </Field>
        <Field label="Short bio (optional)">
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value.slice(0, 600))}
            rows={3}
            placeholder="A sentence or two about your practice, visible to citizens after you accept a matter."
            className="w-full rounded-lg border border-navy-200 px-4 py-2.5 text-sm focus:border-gold-400 focus:outline-none"
          />
        </Field>
      </Section>

      <Section title="Admission">
        <Field label="Admission jurisdiction">
          <div className="grid grid-cols-2 gap-2">
            {(["NZ", "AU"] as const).map((j) => (
              <button
                key={j}
                type="button"
                onClick={() => changeJurisdiction(j)}
                className={`rounded-lg border px-4 py-2.5 text-sm font-semibold ${
                  jurisdiction === j
                    ? "border-gold-400 bg-gold-50 text-navy-800"
                    : "border-navy-200 bg-white text-navy-500 hover:border-navy-300"
                }`}
              >
                {j === "NZ" ? "New Zealand" : "Australia"}
              </button>
            ))}
          </div>
        </Field>
        <Field label="Professional body">
          <select
            value={professionalBody}
            onChange={(e) => setProfessionalBody(e.target.value)}
            className="w-full rounded-lg border border-navy-200 px-3 py-2.5 text-sm focus:border-gold-400 focus:outline-none"
          >
            {bodies.map((b) => (
              <option key={b.value} value={b.value}>
                {b.label}
              </option>
            ))}
          </select>
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Admission / membership number">
            <input
              type="text"
              value={admissionNumber}
              onChange={(e) => setAdmissionNumber(e.target.value)}
              className="w-full rounded-lg border border-navy-200 px-4 py-2.5 text-sm focus:border-gold-400 focus:outline-none"
            />
          </Field>
          <Field label="Year of admission (optional)">
            <input
              type="number"
              value={admissionYear}
              onChange={(e) => setAdmissionYear(e.target.value)}
              min={1950}
              max={new Date().getFullYear()}
              className="w-full rounded-lg border border-navy-200 px-4 py-2.5 text-sm focus:border-gold-400 focus:outline-none"
            />
          </Field>
        </div>
      </Section>

      <Section title="PI insurance">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Insurer">
            <input
              type="text"
              value={piInsurerName}
              onChange={(e) => setPiInsurerName(e.target.value)}
              className="w-full rounded-lg border border-navy-200 px-4 py-2.5 text-sm focus:border-gold-400 focus:outline-none"
            />
          </Field>
          <Field label="Policy number">
            <input
              type="text"
              value={piPolicyNumber}
              onChange={(e) => setPiPolicyNumber(e.target.value)}
              className="w-full rounded-lg border border-navy-200 px-4 py-2.5 text-sm focus:border-gold-400 focus:outline-none"
            />
          </Field>
        </div>
        <Field label="Policy expiry date">
          <input
            type="date"
            value={piPolicyExpiresAt}
            onChange={(e) => setPiPolicyExpiresAt(e.target.value)}
            className="w-full rounded-lg border border-navy-200 px-4 py-2.5 text-sm focus:border-gold-400 focus:outline-none"
          />
          <p className="mt-1 text-xs text-navy-400">
            We check this on every matter acceptance — expired PI hard-blocks
            you from taking new work.
          </p>
        </Field>
      </Section>

      <Section title="Practice areas">
        <p className="text-sm text-navy-500">
          Choose the areas you are admitted and competent to practise in{" "}
          {jurisdiction === "NZ" ? "New Zealand" : "Australia"}. You can only
          select areas matching your admission jurisdiction.
        </p>
        <div className="mt-4 grid gap-3">
          {jurisdictionAreas.length === 0 ? (
            <p className="text-sm text-navy-400">
              No practice areas live for {jurisdiction} yet. Submit your
              profile and we&rsquo;ll email you when one of your areas opens.
            </p>
          ) : (
            jurisdictionAreas.map((a) => {
              const checked = selectedSlugs.includes(a.slug);
              return (
                <label
                  key={a.id}
                  className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors ${
                    checked
                      ? "border-gold-400 bg-gold-50"
                      : "border-navy-100 bg-white hover:border-navy-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleArea(a.slug)}
                    className="mt-1 h-4 w-4 rounded border-navy-300 text-navy-600 focus:ring-navy-500"
                  />
                  <div>
                    <p className="font-semibold text-navy-800">
                      {a.name}{" "}
                      <span className="text-xs text-navy-400">
                        · {a.domain === "LAW" ? "Law" : "Accounting"}
                      </span>
                    </p>
                    <p className="mt-1 text-sm text-navy-500">{a.summary}</p>
                  </div>
                </label>
              );
            })
          )}
        </div>
      </Section>

      {error && (
        <p className="mt-6 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="mt-8 flex items-center justify-between">
        <p className="text-xs text-navy-400">
          Your profile is unverified until a Marco Reid admin confirms your
          admission and PI. You will not see citizen matters until then.
        </p>
        <button
          type="button"
          onClick={submit}
          disabled={busy || !displayName || !admissionNumber}
          className="rounded-lg bg-navy-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-navy-600 disabled:cursor-not-allowed disabled:bg-navy-200"
        >
          {busy ? "Submitting…" : "Submit for verification"}
        </button>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8 last:mb-0">
      <h2 className="font-serif text-xl text-navy-800">{title}</h2>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-navy-500">
        {label}
      </label>
      {children}
    </div>
  );
}
