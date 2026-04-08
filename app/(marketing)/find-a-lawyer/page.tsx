import type { Metadata } from "next";
import { BRAND } from "@/lib/constants";
import SchemaMarkup from "@/app/components/shared/SchemaMarkup";
import Reveal from "@/app/components/effects/Reveal";
import Button from "@/app/components/shared/Button";
import AiDisclaimer from "@/app/components/shared/AiDisclaimer";

export const metadata: Metadata = {
  title: "Find a Lawyer — Marco Reid",
  description:
    "Find an attorney who uses the most advanced AI legal technology available. Marco Reid attorneys deliver faster research, verified citations, transparent communication, and better outcomes for every matter.",
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      name: "Marco Reid — Find a Lawyer",
      description:
        "Connect with attorneys who use Marco Reid, the most advanced AI-powered legal technology platform. Faster research, verified citations, and real-time client communication.",
      url: `${BRAND.url}/find-a-lawyer`,
      provider: {
        "@type": "Organization",
        name: BRAND.name,
        url: BRAND.url,
      },
    },
    {
      "@type": "LegalService",
      name: "Marco Reid Attorney Network",
      description:
        "Attorneys on Marco Reid use AI-powered legal research with citation verification, practice management, and secure client portals to deliver better outcomes.",
      url: `${BRAND.url}/find-a-lawyer`,
      areaServed: "US",
    },
  ],
};

const advantages = [
  {
    title: "AI-Powered Research",
    description:
      "Your attorney uses Marco \u2014 the most advanced legal research AI ever built. Every question answered with verified case law, statutes, and regulatory guidance sourced from authoritative public domain databases.",
    icon: (
      <svg
        className="h-8 w-8 text-forest-500"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
        <path d="M11 8v6M8 11h6" />
      </svg>
    ),
  },
  {
    title: "Faster Turnaround",
    description:
      "Marco Reid saves attorneys 15\u201320 hours every week. Research that once took 4\u20136 hours now takes 20\u201340 minutes. Document drafting that took half a day is done in under an hour. Your matter moves faster.",
    icon: (
      <svg
        className="h-8 w-8 text-forest-500"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    title: "Transparent Communication",
    description:
      "Every Marco Reid client gets a secure portal. Track your matter status in plain English, view every document, message your attorney directly, sign documents online, and pay invoices \u2014 all in one place.",
    icon: (
      <svg
        className="h-8 w-8 text-forest-500"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <path d="M8 10h8M8 14h4" />
      </svg>
    ),
  },
  {
    title: "Verified Citations",
    description:
      "Every case citation your attorney relies on is verified against authoritative public domain sources. No fabricated case law. No hallucinated rulings. Every citation links to the original source document.",
    icon: (
      <svg
        className="h-8 w-8 text-forest-500"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M9 12l2 2 4-4" />
        <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" />
      </svg>
    ),
  },
];

const practiceAreas = [
  {
    name: "Immigration Law",
    description:
      "Visa petitions, green cards, naturalization, asylum, and removal defence. AI-powered USCIS form automation and RFE drafting.",
    icon: (
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    name: "Corporate Law",
    description:
      "Business formation, mergers and acquisitions, contracts, corporate governance, and commercial transactions.",
    icon: (
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
        <path d="M12 12v.01" />
      </svg>
    ),
  },
  {
    name: "Family Law",
    description:
      "Divorce, custody, child support, adoption, and prenuptial agreements. Sensitive matters handled with precision.",
    icon: (
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    name: "Criminal Defence",
    description:
      "Misdemeanour and felony defence, white-collar crime, DUI, appeals, and post-conviction relief.",
    icon: (
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    name: "Real Estate Law",
    description:
      "Residential and commercial transactions, title disputes, landlord-tenant matters, zoning, and land use.",
    icon: (
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    name: "Employment Law",
    description:
      "Wrongful termination, discrimination, wage disputes, employment contracts, and workplace compliance.",
    icon: (
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    name: "Estate Planning",
    description:
      "Wills, trusts, probate, powers of attorney, estate administration, and asset protection strategies.",
    icon: (
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
  },
  {
    name: "Intellectual Property",
    description:
      "Patents, trademarks, copyrights, trade secrets, licensing, and IP litigation with USPTO integration.",
    icon: (
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    ),
  },
  {
    name: "Personal Injury",
    description:
      "Auto accidents, medical malpractice, slip and fall, product liability, and wrongful death claims.",
    icon: (
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  {
    name: "Tax Law",
    description:
      "Tax disputes, IRS audits, tax court litigation, state and federal tax controversy, and tax planning.",
    icon: (
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    name: "Bankruptcy",
    description:
      "Chapter 7, Chapter 11, Chapter 13 filings, creditor representation, debt restructuring, and asset protection.",
    icon: (
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="1" y="4" width="22" height="16" rx="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
  },
  {
    name: "Civil Litigation",
    description:
      "Contract disputes, business torts, class actions, appeals, and complex commercial litigation.",
    icon: (
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 3v18M3 12l3-3 3 3M15 12l3-3 3 3M3 12h18" />
      </svg>
    ),
  },
];

const steps = [
  {
    number: "01",
    title: "Tell us about your matter",
    description:
      "Describe your legal need and location. Whether it is an immigration petition, a business dispute, a family matter, or a real estate closing, we match you with the right expertise.",
  },
  {
    number: "02",
    title: "Get matched with Marco Reid attorneys",
    description:
      "We connect you with attorneys in your area who use Marco Reid daily. These are professionals who have chosen the most advanced legal technology available to serve their clients.",
  },
  {
    number: "03",
    title: "Experience the difference",
    description:
      "Your attorney uses AI-powered research, verified citations, intelligent document drafting, and a secure client portal. You get faster results, better communication, and complete transparency.",
  },
];

export default function FindALawyerPage() {
  return (
    <>
      <SchemaMarkup schema={schema} />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-navy-500 pt-32 pb-24 sm:pt-40 sm:pb-32">
        {/* Gradient orbs */}
        <div
          className="pointer-events-none absolute -top-40 left-1/4 h-[500px] w-[500px] rounded-full bg-forest-500/20 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-20 right-1/4 h-[400px] w-[400px] rounded-full bg-plum-500/15 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-6xl px-6 sm:px-8 lg:px-12 text-center">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-widest text-forest-400">
              Marco Reid Attorney Network
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-8 font-serif text-hero text-white">
              Find the Right Attorney
              <br />
              for Your Matter
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-8 max-w-2xl text-xl leading-relaxed text-navy-200">
              Marco Reid attorneys use the most advanced AI legal technology
              ever built. When you work with a Marco Reid attorney, you get
              faster research, verified citations, transparent communication,
              and better outcomes &mdash; every time.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-12">
              <Button href="#practice-areas" variant="secondary" size="lg">
                Browse practice areas
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Why Choose a Marco Reid Attorney ── */}
      <section className="bg-white py-24 sm:py-36" aria-label="Why choose a Marco Reid attorney">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-widest text-forest-600">
              The Marco Reid advantage
            </p>
            <h2 className="mt-6 font-serif text-display text-navy-800">
              Why choose a Marco Reid attorney.
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-6 sm:grid-cols-2">
            {advantages.map((item, i) => (
              <Reveal key={item.title} delay={0.05 + i * 0.05}>
                <div className="rounded-xl border border-navy-100 bg-white p-8 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5">
                  <div className="mb-5">{item.icon}</div>
                  <h3 className="font-serif text-xl font-semibold text-navy-700">
                    {item.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-navy-400">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="h-px bg-navy-100 mx-auto max-w-sm" />

      {/* ── Practice Areas ── */}
      <section
        id="practice-areas"
        className="bg-white py-24 sm:py-36"
        aria-label="Practice areas"
      >
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
          <Reveal>
            <p className="text-center text-xs font-medium uppercase tracking-widest text-forest-600">
              Practice areas
            </p>
            <h2 className="mt-6 text-center font-serif text-display text-navy-800">
              Find an attorney by practice area.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-navy-400">
              Marco Reid attorneys span every major practice area. Each uses
              AI-powered legal research, verified citations, and a secure client
              portal to serve you better.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {practiceAreas.map((area, i) => (
              <Reveal key={area.name} delay={0.03 + i * 0.03}>
                <div className="group flex h-full flex-col rounded-xl border border-navy-100 bg-white p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5">
                  <div className="mb-4 text-navy-400 transition-colors duration-300 group-hover:text-forest-500">
                    {area.icon}
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-navy-700">
                    {area.name}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-navy-400">
                    {area.description}
                  </p>
                  <p className="mt-4 text-sm font-semibold text-forest-600 transition-colors duration-300 group-hover:text-forest-500">
                    Find attorneys &rarr;
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="h-px bg-navy-100 mx-auto max-w-sm" />

      {/* ── How It Works ── */}
      <section className="bg-white py-24 sm:py-36" aria-label="How it works">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
          <Reveal>
            <p className="text-center text-xs font-medium uppercase tracking-widest text-forest-600">
              How it works
            </p>
            <h2 className="mt-6 text-center font-serif text-display text-navy-800">
              Three steps to better legal help.
            </h2>
          </Reveal>

          <div className="mx-auto mt-16 max-w-3xl space-y-8">
            {steps.map((step, i) => (
              <Reveal key={step.number} delay={0.05 + i * 0.1}>
                <div className="flex gap-6 rounded-xl border border-navy-100 bg-white p-8 shadow-card">
                  <div className="flex-shrink-0">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-navy-500 font-serif text-lg font-bold text-white">
                      {step.number}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-navy-700">
                      {step.title}
                    </h3>
                    <p className="mt-2 leading-relaxed text-navy-400">
                      {step.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="h-px bg-navy-100 mx-auto max-w-sm" />

      {/* ── The Marco Reid Advantage — Comparison ── */}
      <section
        className="bg-white py-24 sm:py-36"
        aria-label="The Marco Reid advantage"
      >
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
          <Reveal>
            <p className="text-center text-xs font-medium uppercase tracking-widest text-forest-600">
              The difference
            </p>
            <h2 className="mt-6 text-center font-serif text-display text-navy-800">
              The Marco Reid advantage.
            </h2>
          </Reveal>

          <div className="mx-auto mt-16 max-w-4xl">
            <Reveal delay={0.1}>
              <div className="overflow-hidden rounded-xl border border-navy-100 shadow-card">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-navy-100 bg-navy-50">
                      <th className="px-6 py-4 text-sm font-semibold text-navy-600">
                        Workflow
                      </th>
                      <th className="px-6 py-4 text-sm font-semibold text-navy-400">
                        Traditional attorney
                      </th>
                      <th className="px-6 py-4 text-sm font-semibold text-forest-600">
                        Marco Reid attorney
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-navy-100">
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium text-navy-700">
                        Legal research
                      </td>
                      <td className="px-6 py-4 text-sm text-navy-400">
                        4&ndash;6 hours of manual searching
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-forest-600">
                        20&ndash;40 minutes with AI and verified citations
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium text-navy-700">
                        Document drafting
                      </td>
                      <td className="px-6 py-4 text-sm text-navy-400">
                        3&ndash;4 hours of manual drafting
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-forest-600">
                        30&ndash;60 minutes with AI-assisted drafting
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium text-navy-700">
                        Client updates
                      </td>
                      <td className="px-6 py-4 text-sm text-navy-400">
                        Phone tag and missed calls
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-forest-600">
                        Real-time portal with status, documents, and messaging
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium text-navy-700">
                        Citation accuracy
                      </td>
                      <td className="px-6 py-4 text-sm text-navy-400">
                        Manual verification of every source
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-forest-600">
                        Automated verification against authoritative sources
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium text-navy-700">
                        Court deadlines
                      </td>
                      <td className="px-6 py-4 text-sm text-navy-400">
                        Manual calendar tracking
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-forest-600">
                        Automatic court-rules calendaring by jurisdiction
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium text-navy-700">
                        Document signing
                      </td>
                      <td className="px-6 py-4 text-sm text-navy-400">
                        Separate e-signature service or in-person
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-forest-600">
                        Built-in e-signature, no extra cost
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="h-px bg-navy-100 mx-auto max-w-sm" />

      {/* ── AI Disclaimer ── */}
      <section className="bg-white py-16" aria-label="AI disclaimer">
        <div className="mx-auto max-w-2xl px-6 sm:px-8 lg:px-12">
          <AiDisclaimer />
        </div>
      </section>

      {/* ── CTA: Are You an Attorney? ── */}
      <section className="bg-navy-50 py-24 sm:py-36" aria-label="For attorneys">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12 text-center">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-widest text-forest-600">
              For professionals
            </p>
            <h2 className="mt-6 font-serif text-display text-navy-800">
              Are you an attorney?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-4 max-w-xl text-lg text-navy-400">
              Join the platform that gives you your practice back. AI-powered
              research, case management, billing, trust accounting, document
              drafting, and a client portal &mdash; all in one place. Your
              clients find you here. Give them a reason to stay.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-10 flex justify-center gap-4">
              <Button href="/pricing" size="lg">
                See pricing
              </Button>
              <Button href="/law" variant="secondary" size="lg">
                Explore Marco Reid Legal
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
