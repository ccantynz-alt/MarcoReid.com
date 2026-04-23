"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

interface PracticeArea {
  id: string;
  slug: string;
  name: string;
  domain: "LAW" | "ACCOUNTING";
  jurisdiction: string;
  summary: string;
}

type Step = 0 | 1 | 2 | 3 | 4;

const stepMeta: { title: string; subtitle: string }[] = [
  {
    title: "Identity",
    subtitle: "How you want to appear to citizens you help.",
  },
  {
    title: "Jurisdiction & practice areas",
    subtitle: "Where you're admitted and the work you take on.",
  },
  {
    title: "Admission details",
    subtitle: "Your professional registration record.",
  },
  {
    title: "Professional indemnity insurance",
    subtitle: "Required cover before any matter is assigned.",
  },
  {
    title: "Profile & rates",
    subtitle: "A short bio and an indicative hourly rate.",
  },
];

export default function ProfessionalOnboardPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [step, setStep] = useState<Step>(0);
  const [areas, setAreas] = useState<PracticeArea[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  // Form state
  const [displayName, setDisplayName] = useState("");
  const [admissionJurisdiction, setAdmissionJurisdiction] = useState("");
  const [practiceAreaIds, setPracticeAreaIds] = useState<string[]>([]);
  const [admissionNumber, setAdmissionNumber] = useState("");
  const [admissionYear, setAdmissionYear] = useState("");
  const [professionalBody, setProfessionalBody] = useState("");
  const [piInsurerName, setPiInsurerName] = useState("");
  const [piPolicyNumber, setPiPolicyNumber] = useState("");
  const [piPolicyExpiresAt, setPiPolicyExpiresAt] = useState("");
  const [bio, setBio] = useState("");
  const [hourlyRateHint, setHourlyRateHint] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/login");
    }
  }, [status]);

  useEffect(() => {
    fetch("/api/professional/practice-areas")
      .then((r) => r.json())
      .then((d) => setAreas(d.practiceAreas || []))
      .catch(() => setAreas([]));
  }, []);

  function toggleArea(id: string) {
    setPracticeAreaIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }

  async function submit() {
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/professional/onboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          displayName,
          admissionJurisdiction,
          practiceAreaIds,
          admissionNumber,
          admissionYear: admissionYear || null,
          professionalBody,
          bio: bio + (hourlyRateHint ? `\n\nIndicative rate: ${hourlyRateHint}` : ""),
          piInsurerName,
          piPolicyNumber,
          piPolicyExpiresAt: piPolicyExpiresAt || null,
        }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Could not submit your application");
      }
      setDone(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  if (status === "loading") {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-navy-400">Loading…</p>
      </div>
    );
  }

  if (done) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-16 sm:px-8">
        <div className="rounded-2xl border border-forest-300 bg-white p-10 shadow-card">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-forest-600">
            Submitted
          </p>
          <h1 className="mt-3 font-serif text-display text-navy-800">
            Thank you. Your application is under review.
          </h1>
          <p className="mt-4 text-navy-500">
            Our verification team will check your admission record and
            indemnity cover. You will receive an email when you are cleared
            to take on matters.
          </p>
          <button
            onClick={() => router.push("/dashboard")}
            className="mt-8 rounded-lg bg-navy-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy-600"
          >
            Back to dashboard
          </button>
        </div>
      </div>
    );
  }

  const current = stepMeta[step];

  // Per-step validation guards
  const stepValid =
    (step === 0 && displayName.trim().length > 1) ||
    (step === 1 &&
      admissionJurisdiction.trim().length > 0 &&
      practiceAreaIds.length > 0) ||
    (step === 2 &&
      admissionNumber.trim().length > 0 &&
      professionalBody.trim().length > 0) ||
    (step === 3 &&
      piInsurerName.trim().length > 0 &&
      piPolicyNumber.trim().length > 0 &&
      piPolicyExpiresAt.length > 0) ||
    step === 4;

  const userName = session?.user?.name || session?.user?.email || "you";

  return (
    <div className="mx-auto max-w-3xl px-6 py-12 sm:px-8 lg:px-12">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-plum-600">
          Professional onboarding
        </p>
        <h1 className="mt-1 font-serif text-display text-navy-800">
          Join the verified panel
        </h1>
        <p className="mt-2 text-navy-500">
          Welcome, {userName}. Every AI output passes through a licensed
          professional before it is released. This profile is how citizens
          find you and how we prove your standing on every matter.
        </p>
      </div>

      {/* Progress dots */}
      <div className="mb-8 flex items-center gap-2">
        {stepMeta.map((s, i) => (
          <div key={s.title} className="flex items-center gap-2">
            <span
              className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${
                i === step
                  ? "bg-navy-500 text-white"
                  : i < step
                    ? "bg-forest-500 text-white"
                    : "bg-navy-100 text-navy-400"
              }`}
            >
              {i < step ? "✓" : i + 1}
            </span>
            {i < stepMeta.length - 1 && (
              <span
                className={`h-px w-6 ${i < step ? "bg-forest-300" : "bg-navy-100"}`}
              />
            )}
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-navy-100 bg-white p-8 shadow-card">
        <p className="text-xs font-semibold uppercase tracking-wider text-plum-600">
          Step {step + 1} of {stepMeta.length}
        </p>
        <h2 className="mt-2 font-serif text-headline text-navy-800">
          {current.title}
        </h2>
        <p className="mt-1 text-sm text-navy-500">{current.subtitle}</p>

        <div className="mt-6">
          {step === 0 && (
            <div>
              <label
                className="block text-sm font-medium text-navy-600"
                htmlFor="displayName"
              >
                Display name
              </label>
              <input
                id="displayName"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="e.g. Jane Smith"
                className="mt-2 block w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-sm text-navy-700 focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500"
              />
              <p className="mt-2 text-xs text-navy-400">
                This is how citizens see you. Use the name on your admission
                certificate.
              </p>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-5">
              <div>
                <label
                  className="block text-sm font-medium text-navy-600"
                  htmlFor="jurisdiction"
                >
                  Admission jurisdiction
                </label>
                <select
                  id="jurisdiction"
                  value={admissionJurisdiction}
                  onChange={(e) => setAdmissionJurisdiction(e.target.value)}
                  className="mt-2 block w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-sm text-navy-700 focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500"
                >
                  <option value="">Select a jurisdiction</option>
                  <option value="NZ">New Zealand</option>
                  <option value="AU">Australia</option>
                  <option value="UK">United Kingdom</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                </select>
              </div>
              <div>
                <p className="block text-sm font-medium text-navy-600">
                  Practice areas you take on
                </p>
                {areas.length === 0 ? (
                  <p className="mt-2 text-sm text-navy-400">
                    Loading practice areas…
                  </p>
                ) : (
                  <div className="mt-2 grid gap-2 sm:grid-cols-2">
                    {areas.map((a) => {
                      const checked = practiceAreaIds.includes(a.id);
                      return (
                        <button
                          type="button"
                          key={a.id}
                          onClick={() => toggleArea(a.id)}
                          className={`text-left rounded-lg border px-4 py-3 text-sm transition-colors ${
                            checked
                              ? "border-navy-500 bg-navy-50"
                              : "border-navy-200 bg-white hover:border-navy-400"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="font-medium text-navy-700">
                                {a.name}
                              </p>
                              <p className="mt-0.5 text-xs text-navy-400">
                                {a.jurisdiction} ·{" "}
                                {a.domain === "LAW" ? "Law" : "Accounting"}
                              </p>
                            </div>
                            {checked && (
                              <span className="rounded-full bg-navy-500 px-1.5 text-[10px] font-bold text-white">
                                ✓
                              </span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <div>
                <label
                  className="block text-sm font-medium text-navy-600"
                  htmlFor="professionalBody"
                >
                  Professional body
                </label>
                <input
                  id="professionalBody"
                  type="text"
                  value={professionalBody}
                  onChange={(e) => setProfessionalBody(e.target.value)}
                  placeholder="e.g. NZ Law Society, CA ANZ, NZICA"
                  className="mt-2 block w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-sm text-navy-700 focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500"
                />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    className="block text-sm font-medium text-navy-600"
                    htmlFor="admissionNumber"
                  >
                    Admission / membership number
                  </label>
                  <input
                    id="admissionNumber"
                    type="text"
                    value={admissionNumber}
                    onChange={(e) => setAdmissionNumber(e.target.value)}
                    placeholder="e.g. 12345"
                    className="mt-2 block w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-sm text-navy-700 focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500"
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium text-navy-600"
                    htmlFor="admissionYear"
                  >
                    Year admitted (optional)
                  </label>
                  <input
                    id="admissionYear"
                    type="number"
                    min="1950"
                    max="2030"
                    value={admissionYear}
                    onChange={(e) => setAdmissionYear(e.target.value)}
                    placeholder="e.g. 2014"
                    className="mt-2 block w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-sm text-navy-700 focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <div className="rounded-lg border border-plum-200 bg-plum-50 p-4 text-sm text-plum-800">
                Active professional indemnity cover is required before a
                matter can be assigned. Expired policies will block new work
                automatically.
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-navy-600"
                  htmlFor="piInsurerName"
                >
                  Insurer
                </label>
                <input
                  id="piInsurerName"
                  type="text"
                  value={piInsurerName}
                  onChange={(e) => setPiInsurerName(e.target.value)}
                  placeholder="e.g. NZLS Insurance"
                  className="mt-2 block w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-sm text-navy-700 focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500"
                />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    className="block text-sm font-medium text-navy-600"
                    htmlFor="piPolicyNumber"
                  >
                    Policy reference
                  </label>
                  <input
                    id="piPolicyNumber"
                    type="text"
                    value={piPolicyNumber}
                    onChange={(e) => setPiPolicyNumber(e.target.value)}
                    className="mt-2 block w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-sm text-navy-700 focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500"
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium text-navy-600"
                    htmlFor="piPolicyExpiresAt"
                  >
                    Policy expiry
                  </label>
                  <input
                    id="piPolicyExpiresAt"
                    type="date"
                    value={piPolicyExpiresAt}
                    onChange={(e) => setPiPolicyExpiresAt(e.target.value)}
                    className="mt-2 block w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-sm text-navy-700 focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-5">
              <div>
                <label
                  className="block text-sm font-medium text-navy-600"
                  htmlFor="bio"
                >
                  Short bio
                </label>
                <textarea
                  id="bio"
                  rows={5}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="A few sentences on your experience, sectors served, and approach."
                  className="mt-2 block w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-sm text-navy-700 focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500"
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-navy-600"
                  htmlFor="hourlyRateHint"
                >
                  Indicative hourly rate (optional)
                </label>
                <input
                  id="hourlyRateHint"
                  type="text"
                  value={hourlyRateHint}
                  onChange={(e) => setHourlyRateHint(e.target.value)}
                  placeholder="e.g. NZD 350/hr"
                  className="mt-2 block w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-sm text-navy-700 focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500"
                />
                <p className="mt-2 text-xs text-navy-400">
                  Each matter gets a fresh quote. This is a guide for citizens
                  searching the panel.
                </p>
              </div>
            </div>
          )}

          {error && (
            <div className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}
        </div>

        <div className="mt-8 flex items-center justify-between border-t border-navy-100 pt-6">
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1) as Step)}
            disabled={step === 0}
            className="text-sm font-medium text-navy-400 hover:text-navy-700 disabled:opacity-30"
          >
            ← Back
          </button>
          {step === stepMeta.length - 1 ? (
            <button
              onClick={submit}
              disabled={submitting}
              className="rounded-lg bg-navy-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy-600 disabled:opacity-50"
            >
              {submitting ? "Submitting…" : "Submit for verification"}
            </button>
          ) : (
            <button
              onClick={() => setStep((s) => Math.min(4, s + 1) as Step)}
              disabled={!stepValid}
              className="rounded-lg bg-navy-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy-600 disabled:opacity-50"
            >
              Continue →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
