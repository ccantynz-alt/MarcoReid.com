"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type UserType = "PROFESSIONAL" | "CONSUMER";
type Discipline = "LEGAL" | "ACCOUNTING" | "BOTH";

type ConsumerNeed =
  | "IMMIGRATION"
  | "BUSINESS"
  | "PROPERTY"
  | "EMPLOYMENT"
  | "TAX"
  | "OTHER_LEGAL";

// The flow is keyed by path:
// FORK → PROFESSIONAL: P1 → P2 → P3
// FORK → CONSUMER:     C1 → C2
type Screen =
  | "FORK"
  | "P1_DISCIPLINE"
  | "P2_PRACTICE"
  | "P3_PROFILE"
  | "C1_NEEDS"
  | "C2_JURISDICTION";

// ---------------------------------------------------------------------------
// Screen metadata — title, subtitle, step label
// ---------------------------------------------------------------------------

const SCREEN_META: Record<
  Screen,
  { title: string; subtitle: string; stepOf: string }
> = {
  FORK: {
    title: "Welcome to Marco Reid",
    subtitle: "Tell us who you are so we can set up the right experience for you.",
    stepOf: "Step 1 of 4",
  },
  P1_DISCIPLINE: {
    title: "What is your discipline?",
    subtitle: "This shapes how Marco researches and what tools appear in your dashboard.",
    stepOf: "Step 2 of 4",
  },
  P2_PRACTICE: {
    title: "Your practice",
    subtitle: "We use this to calibrate Marco to your jurisdiction and professional body.",
    stepOf: "Step 3 of 4",
  },
  P3_PROFILE: {
    title: "Your public profile",
    subtitle: "Help clients and colleagues find you. These fields are optional.",
    stepOf: "Step 4 of 4",
  },
  C1_NEEDS: {
    title: "What do you need help with?",
    subtitle: "Select everything that applies. You can change this later.",
    stepOf: "Step 2 of 3",
  },
  C2_JURISDICTION: {
    title: "Where are you based?",
    subtitle: "This helps us show you the right professionals and document templates.",
    stepOf: "Step 3 of 3",
  },
};

// Progress percentages per screen
const SCREEN_PROGRESS: Record<Screen, number> = {
  FORK: 20,
  P1_DISCIPLINE: 40,
  P2_PRACTICE: 65,
  P3_PROFILE: 85,
  C1_NEEDS: 50,
  C2_JURISDICTION: 80,
};

// Back-navigation map
const BACK_FROM: Partial<Record<Screen, Screen>> = {
  P1_DISCIPLINE: "FORK",
  P2_PRACTICE: "P1_DISCIPLINE",
  P3_PROFILE: "P2_PRACTICE",
  C1_NEEDS: "FORK",
  C2_JURISDICTION: "C1_NEEDS",
};

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function CheckIcon() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 8l3.5 3.5L13 5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ScalesIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 3v18M5 6l-2 6h4L5 6zm14 0l-2 6h4L19 6zM3 21h18M8 21a4 4 0 01-4-4h8a4 4 0 01-4 4zm8 0a4 4 0 01-4-4h8a4 4 0 01-4 4z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DiamondIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 2l10 10-10 10L2 12 12 2z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PersonIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M4 20c0-4 3.6-7 8-7s8 3 8 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function OnboardingPage() {
  const router = useRouter();

  // --- State ---
  const [screen, setScreen] = useState<Screen>("FORK");
  const [userType, setUserType] = useState<UserType | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Professional fields
  const [discipline, setDiscipline] = useState<Discipline | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [professionalBody, setProfessionalBody] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [admissionJurisdiction, setAdmissionJurisdiction] = useState("");
  const [practiceArea, setPracticeArea] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [bio, setBio] = useState("");
  const [headline, setHeadline] = useState("");
  const [firmDisplayName, setFirmDisplayName] = useState("");
  const [credentialsConfirmed, setCredentialsConfirmed] = useState(false);

  // Consumer fields
  const [consumerNeeds, setConsumerNeeds] = useState<ConsumerNeed[]>([]);
  const [consumerJurisdiction, setConsumerJurisdiction] = useState("");

  // --- Helpers ---
  const meta = SCREEN_META[screen];
  const progress = SCREEN_PROGRESS[screen];
  const backTarget = BACK_FROM[screen];

  function toggleConsumerNeed(need: ConsumerNeed) {
    setConsumerNeeds((prev) =>
      prev.includes(need) ? prev.filter((n) => n !== need) : [...prev, need]
    );
  }

  // P2 is valid when all required fields are filled
  const p2Valid =
    displayName.trim().length > 0 &&
    professionalBody.trim().length > 0 &&
    registrationNumber.trim().length > 0 &&
    admissionJurisdiction.length > 0 &&
    practiceArea.trim().length > 0;

  // P3 is valid when credentials checkbox is ticked
  const p3Valid = credentialsConfirmed;

  // --- API call ---
  async function submitProfessional() {
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/me/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: AbortSignal.timeout(15_000),
        body: JSON.stringify({
          userType: "PROFESSIONAL",
          discipline,
          displayName: displayName.trim(),
          professionalBody: professionalBody.trim(),
          registrationNumber: registrationNumber.trim(),
          admissionJurisdiction,
          practiceArea: practiceArea.trim(),
          hourlyRate: hourlyRate ? parseFloat(hourlyRate) : undefined,
          bio: bio.trim() || undefined,
          headline: headline.trim() || undefined,
          firmDisplayName: firmDisplayName.trim() || undefined,
          complete: true,
        }),
      });
      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        throw new Error(data.error ?? "Could not save your profile.");
      }
      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setSaving(false);
    }
  }

  async function submitConsumer() {
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/me/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: AbortSignal.timeout(15_000),
        body: JSON.stringify({
          userType: "CONSUMER",
          consumerNeeds,
          jurisdiction: consumerJurisdiction,
          complete: true,
        }),
      });
      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        throw new Error(data.error ?? "Could not save your preferences.");
      }
      router.push("/generate");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setSaving(false);
    }
  }

  async function skipOnboarding() {
    setSaving(true);
    try {
      await fetch("/api/me/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: AbortSignal.timeout(10_000),
        body: JSON.stringify({ complete: true }),
      });
    } catch {
      // best-effort
    }
    router.push("/dashboard");
    router.refresh();
  }

  // --- Shared input style ---
  const inputClass =
    "mt-2 block w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-sm text-navy-700 placeholder-navy-300 focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500 min-h-[44px]";
  const labelClass = "block text-sm font-medium text-navy-600";

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-navy-50">
      {/* Progress bar */}
      <div className="fixed left-0 right-0 top-0 z-50 h-1 bg-navy-100">
        <div
          className="h-full bg-navy-500 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Onboarding progress"
        />
      </div>

      {/* Top nav */}
      <div className="mx-auto flex max-w-4xl items-center justify-between px-6 pt-8">
        <Link
          href="/"
          className="font-serif text-2xl text-navy-500"
          aria-label="Marco Reid home"
        >
          Marco Reid
        </Link>
        {screen === "P3_PROFILE" && (
          <button
            onClick={skipOnboarding}
            className="min-h-[44px] text-sm font-medium text-navy-400 hover:text-navy-700"
            aria-label="Skip onboarding and go to dashboard"
          >
            Skip for now &rarr;
          </button>
        )}
      </div>

      {/* Main content */}
      <div className="mx-auto max-w-2xl px-6 py-14">
        {/* Step counter */}
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-plum-500">
          {meta.stepOf}
        </p>

        {/* Heading */}
        <h1 className="mt-4 font-serif text-4xl leading-tight text-navy-800 sm:text-5xl">
          {meta.title}
        </h1>
        <p className="mt-4 text-lg text-navy-500">{meta.subtitle}</p>

        {/* Error banner */}
        {error && (
          <div
            className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            role="alert"
          >
            {error}
          </div>
        )}

        {/* --- Step body with fade-transition key --- */}
        <div key={screen} className="mt-10 animate-fadeIn">

          {/* ================================================================
              FORK SCREEN
          ================================================================ */}
          {screen === "FORK" && (
            <div className="grid gap-5 sm:grid-cols-2">
              {/* Professional card */}
              <button
                onClick={() => {
                  setUserType("PROFESSIONAL");
                  setScreen("P1_DISCIPLINE");
                }}
                className={`group relative flex min-h-[220px] w-full cursor-pointer flex-col rounded-2xl border-2 p-7 text-left transition-all duration-200 hover:-translate-y-1 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-navy-500 focus-visible:ring-offset-2 ${
                  userType === "PROFESSIONAL"
                    ? "border-amber-400 bg-navy-800 shadow-xl"
                    : "border-navy-200 bg-navy-800 hover:border-amber-400"
                }`}
                aria-label="I am a lawyer, attorney, or accountant — set up a professional account"
              >
                {/* Badge */}
                <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/40 bg-amber-400/10 px-2.5 py-1 text-xs font-semibold text-amber-300">
                  Professional account
                </span>

                <div className="mt-4 flex items-start gap-3">
                  <ScalesIcon className="mt-0.5 h-8 w-8 flex-shrink-0 text-amber-400" />
                  <div>
                    <p className="font-serif text-xl text-white">
                      I&rsquo;m a lawyer, attorney, or accountant
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-navy-300">
                      Set up your practice, manage clients, and use Marco for
                      research and document drafting.
                    </p>
                  </div>
                </div>

                {/* Selection indicator */}
                {userType === "PROFESSIONAL" && (
                  <span
                    aria-hidden="true"
                    className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-amber-400 text-navy-900"
                  >
                    <CheckIcon />
                  </span>
                )}

                <div className="mt-auto pt-5">
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-amber-300 group-hover:gap-2 transition-all">
                    Set up professional account
                    <span aria-hidden="true">&rarr;</span>
                  </span>
                </div>
              </button>

              {/* Consumer card */}
              <button
                onClick={() => {
                  setUserType("CONSUMER");
                  setScreen("C1_NEEDS");
                }}
                className={`group relative flex min-h-[220px] w-full cursor-pointer flex-col rounded-2xl border-2 p-7 text-left transition-all duration-200 hover:-translate-y-1 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-navy-500 focus-visible:ring-offset-2 ${
                  userType === "CONSUMER"
                    ? "border-amber-400 bg-white shadow-xl"
                    : "border-navy-200 bg-white hover:border-amber-400"
                }`}
                aria-label="I need legal or accounting help — set up a consumer account"
              >
                {/* Badge */}
                <span className="inline-flex items-center gap-1.5 rounded-full border border-navy-200 bg-navy-50 px-2.5 py-1 text-xs font-semibold text-navy-500">
                  Consumer account
                </span>

                <div className="mt-4 flex items-start gap-3">
                  <PersonIcon className="mt-0.5 h-8 w-8 flex-shrink-0 text-navy-600" />
                  <div>
                    <p className="font-serif text-xl text-navy-800">
                      I need legal or accounting help
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-navy-500">
                      Generate documents, find a verified professional, and
                      track your application — all in one place.
                    </p>
                  </div>
                </div>

                {/* Selection indicator */}
                {userType === "CONSUMER" && (
                  <span
                    aria-hidden="true"
                    className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-amber-400 text-navy-900"
                  >
                    <CheckIcon />
                  </span>
                )}

                <div className="mt-auto pt-5">
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-navy-600 group-hover:gap-2 transition-all">
                    Get started
                    <span aria-hidden="true">&rarr;</span>
                  </span>
                </div>
              </button>
            </div>
          )}

          {/* ================================================================
              P1 — DISCIPLINE
          ================================================================ */}
          {screen === "P1_DISCIPLINE" && (
            <div className="grid gap-4 sm:grid-cols-3">
              {(
                [
                  {
                    value: "LEGAL" as Discipline,
                    label: "Lawyer / Attorney / Barrister",
                    icon: <ScalesIcon className="h-7 w-7" />,
                  },
                  {
                    value: "ACCOUNTING" as Discipline,
                    label: "Chartered Accountant / CPA / Tax Advisor",
                    icon: <DiamondIcon className="h-7 w-7" />,
                  },
                  {
                    value: "BOTH" as Discipline,
                    label: "Both — law and accounting",
                    icon: (
                      <div className="flex items-center gap-0.5">
                        <ScalesIcon className="h-5 w-5" />
                        <span aria-hidden="true" className="text-navy-400">+</span>
                        <DiamondIcon className="h-5 w-5" />
                      </div>
                    ),
                  },
                ] as const
              ).map(({ value, label, icon }) => (
                <button
                  key={value}
                  onClick={() => setDiscipline(value)}
                  className={`flex min-h-[160px] w-full flex-col items-center justify-center gap-3 rounded-2xl border-2 p-6 text-center transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-navy-500 focus-visible:ring-offset-2 ${
                    discipline === value
                      ? "border-amber-400 bg-navy-800 text-white shadow-lg"
                      : "border-navy-200 bg-white text-navy-700 hover:border-navy-300"
                  }`}
                  aria-pressed={discipline === value}
                  aria-label={label}
                >
                  <span
                    className={
                      discipline === value ? "text-amber-400" : "text-navy-500"
                    }
                  >
                    {icon}
                  </span>
                  <span className="text-sm font-semibold leading-snug">
                    {label}
                  </span>
                  {discipline === value && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-400 text-navy-900">
                      <CheckIcon />
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}

          {/* ================================================================
              P2 — PRACTICE DETAILS
          ================================================================ */}
          {screen === "P2_PRACTICE" && (
            <div className="rounded-2xl border border-navy-100 bg-white p-8 shadow-card">
              <div className="grid gap-5">
                {/* Display name */}
                <div>
                  <label className={labelClass} htmlFor="displayName">
                    Your professional name{" "}
                    <span className="text-red-500" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="displayName"
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className={inputClass}
                    placeholder="Jane Smith"
                    autoComplete="name"
                    aria-required="true"
                  />
                </div>

                {/* Professional body */}
                <div>
                  <label className={labelClass} htmlFor="professionalBody">
                    Professional body{" "}
                    <span className="text-red-500" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="professionalBody"
                    type="text"
                    value={professionalBody}
                    onChange={(e) => setProfessionalBody(e.target.value)}
                    className={inputClass}
                    placeholder="e.g. NZLS, ICAA, ABA, AICPA"
                    aria-required="true"
                  />
                </div>

                {/* Registration / admission number */}
                <div>
                  <label className={labelClass} htmlFor="registrationNumber">
                    Bar number / Admission number / Registration number{" "}
                    <span className="text-red-500" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="registrationNumber"
                    type="text"
                    value={registrationNumber}
                    onChange={(e) => setRegistrationNumber(e.target.value)}
                    className={inputClass}
                    placeholder="e.g. 123456"
                    aria-required="true"
                  />
                </div>

                {/* Jurisdiction */}
                <div>
                  <label className={labelClass} htmlFor="admissionJurisdiction">
                    Primary jurisdiction{" "}
                    <span className="text-red-500" aria-hidden="true">*</span>
                  </label>
                  <select
                    id="admissionJurisdiction"
                    value={admissionJurisdiction}
                    onChange={(e) => setAdmissionJurisdiction(e.target.value)}
                    className={inputClass}
                    aria-required="true"
                  >
                    <option value="">Select a jurisdiction</option>
                    <option value="NZ">New Zealand</option>
                    <option value="AU">Australia</option>
                    <option value="UK">United Kingdom</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>

                {/* Practice area */}
                <div>
                  <label className={labelClass} htmlFor="practiceArea">
                    Practice area / speciality{" "}
                    <span className="text-red-500" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="practiceArea"
                    type="text"
                    value={practiceArea}
                    onChange={(e) => setPracticeArea(e.target.value)}
                    className={inputClass}
                    placeholder="e.g. Immigration law, Employment law"
                    aria-required="true"
                  />
                </div>

                {/* Hourly rate (optional) */}
                <div>
                  <label className={labelClass} htmlFor="hourlyRate">
                    Hourly rate{" "}
                    <span className="text-xs font-normal text-navy-400">
                      (optional)
                    </span>
                  </label>
                  <div className="relative mt-2">
                    <span
                      className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-sm text-navy-400"
                      aria-hidden="true"
                    >
                      $
                    </span>
                    <input
                      id="hourlyRate"
                      type="number"
                      min={0}
                      step={1}
                      value={hourlyRate}
                      onChange={(e) => setHourlyRate(e.target.value)}
                      className={`${inputClass} mt-0 pl-8`}
                      placeholder="350"
                      aria-label="Hourly rate in dollars"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================
              P3 — PROFILE (bio, headline, firm, credentials checkbox)
          ================================================================ */}
          {screen === "P3_PROFILE" && (
            <div className="rounded-2xl border border-navy-100 bg-white p-8 shadow-card">
              <div className="grid gap-5">
                {/* Headline */}
                <div>
                  <label className={labelClass} htmlFor="headline">
                    Professional headline{" "}
                    <span className="text-xs font-normal text-navy-400">
                      (optional)
                    </span>
                  </label>
                  <input
                    id="headline"
                    type="text"
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    className={inputClass}
                    placeholder="Immigration specialist with 15 years of experience"
                    maxLength={120}
                  />
                </div>

                {/* Bio */}
                <div>
                  <label className={labelClass} htmlFor="bio">
                    Short bio{" "}
                    <span className="text-xs font-normal text-navy-400">
                      (optional, max 300 characters)
                    </span>
                  </label>
                  <textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value.slice(0, 300))}
                    className={`${inputClass} min-h-[100px] resize-none`}
                    placeholder="Tell potential clients and colleagues a little about your practice."
                    maxLength={300}
                    rows={4}
                    aria-describedby="bioCounter"
                  />
                  <p
                    id="bioCounter"
                    className="mt-1 text-right text-xs text-navy-400"
                    aria-live="polite"
                  >
                    {bio.length} / 300
                  </p>
                </div>

                {/* Firm display name */}
                <div>
                  <label className={labelClass} htmlFor="firmDisplayName">
                    Firm display name{" "}
                    <span className="text-xs font-normal text-navy-400">
                      (optional)
                    </span>
                  </label>
                  <input
                    id="firmDisplayName"
                    type="text"
                    value={firmDisplayName}
                    onChange={(e) => setFirmDisplayName(e.target.value)}
                    className={inputClass}
                    placeholder="Smith & Partners"
                    autoComplete="organization"
                  />
                </div>

                {/* Credentials confirmation — required */}
                <div className="mt-2 rounded-xl border border-navy-100 bg-navy-50 p-5">
                  <label
                    className="flex cursor-pointer items-start gap-3"
                    htmlFor="credentialsConfirmed"
                  >
                    <input
                      id="credentialsConfirmed"
                      type="checkbox"
                      checked={credentialsConfirmed}
                      onChange={(e) => setCredentialsConfirmed(e.target.checked)}
                      className="mt-0.5 h-5 w-5 flex-shrink-0 cursor-pointer rounded border-navy-300 accent-navy-600"
                      aria-required="true"
                    />
                    <span className="text-sm leading-relaxed text-navy-600">
                      I confirm that I am a licensed professional and that the
                      credentials I have provided are accurate. I understand that
                      Marco Reid may display this information to clients and
                      colleagues searching for professionals on the platform.
                    </span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================
              C1 — CONSUMER NEEDS (multi-select tiles)
          ================================================================ */}
          {screen === "C1_NEEDS" && (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {(
                [
                  { value: "IMMIGRATION" as ConsumerNeed, label: "Immigration", emoji: "✈" },
                  { value: "BUSINESS" as ConsumerNeed, label: "Business / Company formation", emoji: "🏢" },
                  { value: "PROPERTY" as ConsumerNeed, label: "Property / Conveyancing", emoji: "🏠" },
                  { value: "EMPLOYMENT" as ConsumerNeed, label: "Employment", emoji: "💼" },
                  { value: "TAX" as ConsumerNeed, label: "Tax / Accounting", emoji: "📊" },
                  { value: "OTHER_LEGAL" as ConsumerNeed, label: "Other legal matter", emoji: "⚖" },
                ] as const
              ).map(({ value, label, emoji }) => {
                const selected = consumerNeeds.includes(value);
                return (
                  <button
                    key={value}
                    onClick={() => toggleConsumerNeed(value)}
                    className={`flex min-h-[120px] w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 p-5 text-center transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-navy-500 focus-visible:ring-offset-2 ${
                      selected
                        ? "border-amber-400 bg-navy-800 text-white shadow-md"
                        : "border-navy-200 bg-white text-navy-700 hover:border-navy-300"
                    }`}
                    aria-pressed={selected}
                    aria-label={label}
                  >
                    <span className="text-2xl" aria-hidden="true">
                      {emoji}
                    </span>
                    <span className="text-sm font-semibold leading-snug">
                      {label}
                    </span>
                    {selected && (
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-400 text-navy-900">
                        <CheckIcon />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* ================================================================
              C2 — CONSUMER JURISDICTION
          ================================================================ */}
          {screen === "C2_JURISDICTION" && (
            <div className="rounded-2xl border border-navy-100 bg-white p-8 shadow-card">
              <label className={labelClass} htmlFor="consumerJurisdiction">
                Country{" "}
                <span className="text-red-500" aria-hidden="true">*</span>
              </label>
              <select
                id="consumerJurisdiction"
                value={consumerJurisdiction}
                onChange={(e) => setConsumerJurisdiction(e.target.value)}
                className={inputClass}
                aria-required="true"
              >
                <option value="">Select your country</option>
                <option value="NZ">New Zealand</option>
                <option value="AU">Australia</option>
                <option value="UK">United Kingdom</option>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="OTHER">Other</option>
              </select>

              <p className="mt-5 rounded-xl border border-navy-100 bg-navy-50 p-4 text-sm leading-relaxed text-navy-500">
                <strong className="text-navy-700">
                  A note on the documents you generate.
                </strong>{" "}
                Marco Reid generates documents for research and informational
                purposes only. Nothing generated here constitutes legal advice
                or creates a professional relationship. Always review any
                document with a qualified professional before using it.
              </p>
            </div>
          )}
        </div>

        {/* ================================================================
            Navigation footer
        ================================================================ */}
        <div className="mt-10 flex items-center justify-between gap-4">
          {/* Back button */}
          {backTarget ? (
            <button
              onClick={() => setScreen(backTarget)}
              className="min-h-[44px] px-2 text-sm font-medium text-navy-400 hover:text-navy-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-navy-500 focus-visible:ring-offset-2"
              aria-label="Go back to previous step"
            >
              &larr; Back
            </button>
          ) : (
            <div aria-hidden="true" />
          )}

          {/* Step dots */}
          <div className="flex items-center gap-2" aria-hidden="true">
            {(userType === "CONSUMER"
              ? (["FORK", "C1_NEEDS", "C2_JURISDICTION"] as Screen[])
              : (["FORK", "P1_DISCIPLINE", "P2_PRACTICE", "P3_PROFILE"] as Screen[])
            ).map((s) => (
              <span
                key={s}
                className={`h-2 w-2 rounded-full transition-colors ${
                  s === screen
                    ? "bg-navy-500"
                    : SCREEN_PROGRESS[s] < SCREEN_PROGRESS[screen]
                      ? "bg-navy-300"
                      : "bg-navy-100"
                }`}
              />
            ))}
          </div>

          {/* Forward / submit buttons */}
          <div className="flex items-center gap-3">
            {/* FORK — no explicit "Continue" button; cards navigate directly */}
            {screen === "FORK" && (
              <p className="text-sm text-navy-400">
                Select one to continue
              </p>
            )}

            {/* P1 */}
            {screen === "P1_DISCIPLINE" && (
              <button
                onClick={() => {
                  if (!discipline) return;
                  setScreen("P2_PRACTICE");
                }}
                disabled={!discipline}
                className="min-h-[44px] rounded-lg bg-navy-500 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-600 disabled:cursor-not-allowed disabled:opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-navy-500 focus-visible:ring-offset-2"
                aria-label="Continue to practice details"
              >
                Continue &rarr;
              </button>
            )}

            {/* P2 */}
            {screen === "P2_PRACTICE" && (
              <button
                onClick={() => {
                  if (!p2Valid) return;
                  setScreen("P3_PROFILE");
                }}
                disabled={!p2Valid}
                className="min-h-[44px] rounded-lg bg-navy-500 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-600 disabled:cursor-not-allowed disabled:opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-navy-500 focus-visible:ring-offset-2"
                aria-label="Continue to profile"
              >
                Continue &rarr;
              </button>
            )}

            {/* P3 — submit */}
            {screen === "P3_PROFILE" && (
              <button
                onClick={submitProfessional}
                disabled={!p3Valid || saving}
                className="min-h-[44px] rounded-lg bg-navy-500 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-600 disabled:cursor-not-allowed disabled:opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-navy-500 focus-visible:ring-offset-2"
                aria-label="Complete setup and go to dashboard"
              >
                {saving ? "Setting up..." : "Go to dashboard →"}
              </button>
            )}

            {/* C1 */}
            {screen === "C1_NEEDS" && (
              <button
                onClick={() => setScreen("C2_JURISDICTION")}
                disabled={consumerNeeds.length === 0}
                className="min-h-[44px] rounded-lg bg-navy-500 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-600 disabled:cursor-not-allowed disabled:opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-navy-500 focus-visible:ring-offset-2"
                aria-label="Continue to jurisdiction selection"
              >
                Continue &rarr;
              </button>
            )}

            {/* C2 — submit */}
            {screen === "C2_JURISDICTION" && (
              <button
                onClick={submitConsumer}
                disabled={!consumerJurisdiction || saving}
                className="min-h-[44px] rounded-lg bg-navy-500 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-600 disabled:cursor-not-allowed disabled:opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-navy-500 focus-visible:ring-offset-2"
                aria-label="Complete setup and generate documents"
              >
                {saving ? "Setting up..." : "Get started →"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
