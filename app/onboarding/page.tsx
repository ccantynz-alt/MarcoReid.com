"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Step = 0 | 1 | 2 | 3 | 4;

const steps: { title: string; subtitle: string }[] = [
  {
    title: "Welcome to Marco Reid",
    subtitle: "A short walk-through to get you set up. Takes about two minutes.",
  },
  {
    title: "Tell us about your practice",
    subtitle:
      "We&rsquo;ll use this to tailor Marco&rsquo;s research to your jurisdiction and domain.",
  },
  {
    title: "Meet Marco",
    subtitle:
      "Your AI-powered research assistant. Cross-domain. Citation-verified.",
  },
  {
    title: "Explore the platform",
    subtitle:
      "Matters, clients, documents, trust accounting, billing — all in one place.",
  },
  {
    title: "You&rsquo;re ready",
    subtitle: "Your dashboard is waiting. Let&rsquo;s build your practice.",
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(0);
  const [firmName, setFirmName] = useState("");
  const [jurisdiction, setJurisdiction] = useState("");
  const [practiceArea, setPracticeArea] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function saveProfile() {
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/me/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firmName, jurisdiction, practiceArea }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Could not save your profile.");
      }
      setStep(2);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSaving(false);
    }
  }

  async function completeOnboarding() {
    setSaving(true);
    try {
      await fetch("/api/me/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ complete: true }),
      });
      router.push("/dashboard");
      router.refresh();
    } catch {
      router.push("/dashboard");
    }
  }

  const current = steps[step];

  return (
    <div className="min-h-screen bg-navy-50">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-navy-100">
        <div
          className="h-full bg-navy-500 transition-all duration-500 ease-out"
          style={{ width: `${((step + 1) / steps.length) * 100}%` }}
        />
      </div>

      {/* Top nav */}
      <div className="mx-auto flex max-w-4xl items-center justify-between px-6 pt-8">
        <Link href="/" className="font-serif text-2xl text-navy-500">
          Marco Reid
        </Link>
        <button
          onClick={completeOnboarding}
          className="text-sm font-medium text-navy-400 hover:text-navy-700"
        >
          Skip onboarding &rarr;
        </button>
      </div>

      <div className="mx-auto max-w-2xl px-6 py-16">
        {/* Step counter */}
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-plum-500">
          Step {step + 1} of {steps.length}
        </p>

        {/* Step header */}
        <h1
          className="mt-4 font-serif text-4xl leading-tight text-navy-800 sm:text-5xl"
          dangerouslySetInnerHTML={{ __html: current.title }}
        />
        <p
          className="mt-4 text-lg text-navy-500"
          dangerouslySetInnerHTML={{ __html: current.subtitle }}
        />

        {/* Step body */}
        <div className="mt-10">
          {step === 0 && (
            <div className="rounded-2xl border border-navy-100 bg-white p-8 shadow-card">
              <ul className="space-y-4 text-navy-600">
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-forest-500">
                    <svg viewBox="0 0 20 20" className="h-3 w-3 text-white" fill="none">
                      <path d="M5 10l3.5 3.5L15 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <span>Set up your firm profile and jurisdiction</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-forest-500">
                    <svg viewBox="0 0 20 20" className="h-3 w-3 text-white" fill="none">
                      <path d="M5 10l3.5 3.5L15 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <span>Meet Marco, your AI research assistant</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-forest-500">
                    <svg viewBox="0 0 20 20" className="h-3 w-3 text-white" fill="none">
                      <path d="M5 10l3.5 3.5L15 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <span>Tour the dashboard, matters, clients, and trust accounts</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-forest-500">
                    <svg viewBox="0 0 20 20" className="h-3 w-3 text-white" fill="none">
                      <path d="M5 10l3.5 3.5L15 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <span>Start working. Your first 14 days are on us.</span>
                </li>
              </ul>
            </div>
          )}

          {step === 1 && (
            <div className="rounded-2xl border border-navy-100 bg-white p-8 shadow-card">
              {error && (
                <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-navy-600" htmlFor="firmName">
                  Firm or practice name
                </label>
                <input
                  id="firmName"
                  type="text"
                  value={firmName}
                  onChange={(e) => setFirmName(e.target.value)}
                  className="mt-2 block w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-sm text-navy-700 placeholder-navy-300 focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500"
                  placeholder="Smith & Partners"
                />
              </div>
              <div className="mt-5">
                <label className="block text-sm font-medium text-navy-600" htmlFor="jurisdiction">
                  Primary jurisdiction
                </label>
                <select
                  id="jurisdiction"
                  value={jurisdiction}
                  onChange={(e) => setJurisdiction(e.target.value)}
                  className="mt-2 block w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-sm text-navy-700 focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500"
                >
                  <option value="">Select a jurisdiction</option>
                  <option value="US-FEDERAL">United States — Federal</option>
                  <option value="US-CA">United States — California</option>
                  <option value="US-NY">United States — New York</option>
                  <option value="US-TX">United States — Texas</option>
                  <option value="US-FL">United States — Florida</option>
                  <option value="US-OTHER">United States — Other state</option>
                  <option value="NZ">New Zealand</option>
                  <option value="AU">Australia</option>
                  <option value="UK">United Kingdom</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
              <div className="mt-5">
                <label className="block text-sm font-medium text-navy-600" htmlFor="practiceArea">
                  Primary practice area
                </label>
                <select
                  id="practiceArea"
                  value={practiceArea}
                  onChange={(e) => setPracticeArea(e.target.value)}
                  className="mt-2 block w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-sm text-navy-700 focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500"
                >
                  <option value="">Select a practice area</option>
                  <option value="litigation">Litigation</option>
                  <option value="corporate">Corporate</option>
                  <option value="tax">Tax</option>
                  <option value="accounting">Accounting / CPA</option>
                  <option value="immigration">Immigration</option>
                  <option value="ip">Intellectual property</option>
                  <option value="real-estate">Real estate</option>
                  <option value="family">Family</option>
                  <option value="estates">Estates &amp; trusts</option>
                  <option value="criminal">Criminal defence</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="rounded-2xl border border-navy-100 bg-white p-8 shadow-card">
              <p className="font-serif text-2xl text-navy-700">Meet Marco.</p>
              <p className="mt-3 text-navy-500">
                Marco is your cross-domain research assistant. Legal, accounting,
                tax, and IP — in one conversation. Every citation is verified
                against authoritative public-domain sources.
              </p>
              <div className="mt-6 rounded-xl border border-navy-100 bg-navy-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">Example query</p>
                <p className="mt-2 font-serif text-lg text-navy-700">
                  &ldquo;What are the tax implications of a Section 83(b) election
                  for a co-founder in California, and does the timing affect
                  early-exercise ISOs?&rdquo;
                </p>
                <p className="mt-3 text-sm text-navy-400">
                  Marco returns: cross-domain analysis, relevant IRS revenue
                  rulings, California-specific guidance, verified IRC citations
                  with direct links, and a clear answer — in seconds.
                </p>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <div className="rounded-lg border border-forest-300/50 bg-forest-500/5 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-forest-600">Verified</p>
                  <p className="mt-1 text-sm text-navy-500">
                    Confirmed in authoritative source with direct link
                  </p>
                </div>
                <div className="rounded-lg border border-plum-200 bg-plum-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-plum-600">Unverified</p>
                  <p className="mt-1 text-sm text-navy-500">
                    Could not confirm. Flagged before you use it.
                  </p>
                </div>
                <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-red-600">Not found</p>
                  <p className="mt-1 text-sm text-navy-500">
                    Does not exist. Blocked from insertion.
                  </p>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="rounded-2xl border border-navy-100 bg-white p-8 shadow-card">
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { title: "Matters", desc: "Cases, engagements, and the work that happens inside them." },
                  { title: "Clients", desc: "Contacts, firms, relationship history, trust balances." },
                  { title: "Documents", desc: "Drafts, filings, evidence — linked to matters, versioned." },
                  { title: "Trust accounting", desc: "IOLTA-ready ledger with three-way reconciliation." },
                  { title: "Time & billing", desc: "Track time, generate invoices, get paid via Stripe." },
                  { title: "Voice", desc: "Dictate anywhere. Files, logs, schedules, research — by voice." },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-xl border border-navy-100 bg-navy-50 p-5"
                  >
                    <p className="font-semibold text-navy-700">{item.title}</p>
                    <p className="mt-1 text-sm text-navy-500">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="rounded-2xl border border-forest-300 bg-white p-8 shadow-card">
              <p className="font-serif text-2xl text-navy-700">
                You&rsquo;re set up.
              </p>
              <p className="mt-3 text-navy-500">
                Your account is ready. When you open the dashboard next, you can
                add your first client, open a matter, or ask Marco anything.
              </p>
              <p className="mt-4 text-sm text-navy-400">
                Tip: press <kbd className="rounded border border-navy-200 bg-navy-50 px-1.5 py-0.5 font-mono text-xs">⌘K</kbd> anywhere to summon Marco.
              </p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="mt-10 flex items-center justify-between">
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1) as Step)}
            disabled={step === 0}
            className="text-sm font-medium text-navy-400 hover:text-navy-700 disabled:opacity-0"
          >
            &larr; Back
          </button>

          <div className="flex gap-2">
            {steps.map((_, i) => (
              <span
                key={i}
                className={`h-2 w-2 rounded-full transition-colors ${
                  i === step
                    ? "bg-navy-500"
                    : i < step
                      ? "bg-navy-300"
                      : "bg-navy-100"
                }`}
              />
            ))}
          </div>

          {step === 1 ? (
            <button
              onClick={saveProfile}
              disabled={saving}
              className="rounded-lg bg-navy-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-600 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Continue"}
            </button>
          ) : step === 4 ? (
            <button
              onClick={completeOnboarding}
              disabled={saving}
              className="rounded-lg bg-navy-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-600 disabled:opacity-50"
            >
              Go to dashboard &rarr;
            </button>
          ) : (
            <button
              onClick={() => setStep((s) => Math.min(4, s + 1) as Step)}
              className="rounded-lg bg-navy-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-600"
            >
              Continue &rarr;
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
