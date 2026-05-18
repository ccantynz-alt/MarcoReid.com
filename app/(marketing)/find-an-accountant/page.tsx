import type { Metadata } from "next";
import { BRAND } from "@/lib/constants";
import Container from "@/app/components/shared/Container";
import SchemaMarkup from "@/app/components/shared/SchemaMarkup";
import Reveal from "@/app/components/effects/Reveal";
import Button from "@/app/components/shared/Button";
import AiDisclaimer from "@/app/components/shared/AiDisclaimer";

export const metadata: Metadata = {
  title:
    "Find an Accountant — AI-Powered CPAs on Marco Reid",
  description:
    "Find a CPA who uses Marco Reid. AI-powered tax research, automated reconciliation, transparent reporting, and multi-state compliance. Your business deserves the most advanced accounting intelligence available.",
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      name: "Find an Accountant on Marco Reid",
      description:
        "Directory of CPAs and accounting professionals using Marco Reid, the most advanced AI-powered accounting intelligence platform for tax research, compliance, and financial reporting.",
      url: `${BRAND.url}/find-an-accountant`,
      provider: {
        "@type": "Organization",
        name: BRAND.name,
        url: BRAND.url,
      },
    },
    {
      "@type": "AccountingService",
      name: "Marco Reid Accounting",
      description:
        "AI-powered accounting platform for CPAs with real-time tax code analysis, automated bank reconciliation, client portals, and multi-jurisdiction compliance.",
      url: `${BRAND.url}/accounting`,
      provider: {
        "@type": "Organization",
        name: BRAND.name,
        url: BRAND.url,
      },
    },
  ],
};

const advantages = [
  {
    icon: (
      <svg
        className="h-6 w-6 text-forest-500"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456Z"
        />
      </svg>
    ),
    title: "AI-Powered Tax Research",
    description:
      "Your CPA has instant access to every IRS code section, revenue ruling, and regulatory guidance document. Real-time tax code analysis means no deduction is missed and every position is defensible.",
  },
  {
    icon: (
      <svg
        className="h-6 w-6 text-forest-500"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"
        />
      </svg>
    ),
    title: "Automated Reconciliation",
    description:
      "Bank feeds flow directly into the platform. AI categorises every transaction, matches receipts automatically, and reconciles in real time. Monthly close happens in minutes, not days.",
  },
  {
    icon: (
      <svg
        className="h-6 w-6 text-forest-500"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
        />
      </svg>
    ),
    title: "Transparent Reporting",
    description:
      "Your CPA gives you a secure client portal with live financial dashboards. See your profit and loss, balance sheet, cash flow, and tax position whenever you want. No more waiting for quarterly reports.",
  },
  {
    icon: (
      <svg
        className="h-6 w-6 text-forest-500"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5a17.92 17.92 0 0 1-8.716-2.247m0 0A8.966 8.966 0 0 1 3 12c0-1.264.26-2.467.732-3.559"
        />
      </svg>
    ),
    title: "Multi-State Compliance",
    description:
      "Operating in multiple states means multiple tax codes, multiple filing deadlines, and multiple compliance requirements. Marco Reid AI handles jurisdiction complexity so your CPA never misses a filing.",
  },
];

const serviceAreas = [
  {
    title: "Tax Preparation",
    description:
      "Federal and state returns for individuals, businesses, partnerships, and trusts. AI-verified against current tax code.",
  },
  {
    title: "Tax Planning",
    description:
      "Forward-looking strategies to minimise tax liability. Entity selection, retirement planning, estimated payments, and year-end optimisation.",
  },
  {
    title: "Bookkeeping",
    description:
      "Automated chart of accounts, journal entries, accounts payable, accounts receivable, and monthly close. AI-categorised bank feeds.",
  },
  {
    title: "Payroll",
    description:
      "Full payroll processing with W-2 and 1099 preparation, direct deposit, tax withholding calculations, and quarterly filings.",
  },
  {
    title: "Financial Statements",
    description:
      "GAAP-compliant profit and loss, balance sheet, cash flow, and equity statements generated from live data. Always current.",
  },
  {
    title: "Audit Support",
    description:
      "Comprehensive audit workpapers, document organisation, and response preparation. Complete audit trail from day one.",
  },
  {
    title: "Business Formation",
    description:
      "LLC, S-Corp, C-Corp, and partnership formation with proper tax elections, EIN applications, and state registrations.",
  },
  {
    title: "Estate Tax",
    description:
      "Estate and gift tax planning, fiduciary returns, trust accounting, and generation-skipping transfer strategies.",
  },
  {
    title: "International Tax",
    description:
      "Cross-border compliance for expats, foreign-owned US businesses, FBAR and FATCA reporting, and treaty analysis.",
  },
  {
    title: "Nonprofit Accounting",
    description:
      "Form 990 preparation, fund accounting, grant tracking, donor reporting, and compliance with tax-exempt requirements.",
  },
];

const steps = [
  {
    number: "01",
    title: "Describe your needs",
    description:
      "Tell us about your business, your industry, the services you need, and the states you operate in. The more detail you provide, the better your match.",
  },
  {
    number: "02",
    title: "Get matched with a CPA",
    description:
      "We connect you with a Marco Reid CPA whose expertise matches your specific requirements. Every accountant on the platform uses AI-powered tools for accuracy and speed.",
  },
  {
    number: "03",
    title: "Experience the difference",
    description:
      "Your CPA uses Marco Reid for real-time tax research, automated reconciliation, and transparent reporting. You get a secure client portal with live access to your financials.",
  },
];

const comparisonRows = [
  {
    feature: "Tax research speed",
    traditional: "Hours of manual code lookup",
    marcoReid: "Seconds. AI searches every IRS publication instantly.",
  },
  {
    feature: "Bank reconciliation",
    traditional: "Manual data entry, monthly close in days",
    marcoReid: "Automated bank feeds, AI categorisation, real-time close.",
  },
  {
    feature: "Multi-state compliance",
    traditional: "Separate tracking per jurisdiction",
    marcoReid: "AI handles every state automatically.",
  },
  {
    feature: "Client visibility",
    traditional: "Quarterly PDF reports, phone calls for updates",
    marcoReid: "Live dashboard, 24/7 portal access, instant messaging.",
  },
  {
    feature: "Deduction identification",
    traditional: "Experience-dependent, varies by accountant",
    marcoReid: "AI scans every transaction against current tax code.",
  },
  {
    feature: "Document handling",
    traditional: "Email attachments, shared drives, manual filing",
    marcoReid: "Secure document vault with AI extraction and tagging.",
  },
];

export default function FindAnAccountantPage() {
  return (
    <>
      <SchemaMarkup schema={schema} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-500 pt-32 pb-20 sm:pt-40 sm:pb-28">
        {/* Gradient orbs */}
        <div
          className="pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-forest-500/20 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-20 -right-20 h-[400px] w-[400px] rounded-full bg-plum-500/15 blur-3xl"
          aria-hidden="true"
        />
        <Container className="relative text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-forest-300">
            Marco Reid Accountant Directory
          </p>
          <h1 className="mt-6 font-serif text-hero text-white">
            Find the Right Accountant
            <br />
            for Your Business
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-navy-200">
            Marco Reid CPAs use the most advanced AI-powered accounting
            technology ever built. When your accountant works with Marco Reid,
            your business gets faster tax research, automated reconciliation,
            and reporting transparency that traditional firms cannot match.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Button href="#how-it-works" size="lg" variant="secondary">
              Find a CPA
            </Button>
          </div>
        </Container>
      </section>

      {/* Why Choose a Marco Reid Accountant */}
      <section
        className="py-24 sm:py-36"
        aria-label="Why choose a Marco Reid accountant"
      >
        <Container>
          <Reveal>
            <p className="text-center text-xs font-medium uppercase tracking-widest text-forest-600">
              The Marco Reid difference
            </p>
            <h2 className="mt-6 text-center font-serif text-display text-navy-800">
              Why choose a Marco Reid accountant.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-navy-400">
              Every CPA on the Marco Reid platform works with AI tools that
              transform how accounting is done. Here is what that means for
              your business.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-6 sm:grid-cols-2">
            {advantages.map((advantage, index) => (
              <Reveal key={advantage.title} delay={0.05 * (index + 1)}>
                <div className="rounded-xl border border-navy-100 bg-white p-8 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-forest-50">
                    {advantage.icon}
                  </div>
                  <h3 className="mt-5 font-serif text-headline text-navy-700">
                    {advantage.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-navy-400">
                    {advantage.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <div className="mx-auto h-px max-w-sm bg-navy-100" />

      {/* Service Areas */}
      <section className="py-24 sm:py-36" aria-label="Service areas">
        <Container>
          <Reveal>
            <p className="text-center text-xs font-medium uppercase tracking-widest text-forest-600">
              Expertise across every discipline
            </p>
            <h2 className="mt-6 text-center font-serif text-display text-navy-800">
              Service areas.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-navy-400">
              Marco Reid CPAs cover every accounting discipline. Whether you
              need a straightforward tax return or complex international
              compliance, there is a professional on the platform with the
              expertise you need.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {serviceAreas.map((area) => (
              <Reveal key={area.title} delay={0.05}>
                <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5">
                  <h3 className="font-semibold text-navy-700">{area.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-400">
                    {area.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <div className="mx-auto h-px max-w-sm bg-navy-100" />

      {/* How It Works */}
      <section
        id="how-it-works"
        className="py-24 sm:py-36"
        aria-label="How it works"
      >
        <Container>
          <Reveal>
            <p className="text-center text-xs font-medium uppercase tracking-widest text-forest-600">
              Simple process
            </p>
            <h2 className="mt-6 text-center font-serif text-display text-navy-800">
              How it works.
            </h2>
          </Reveal>

          <div className="mx-auto mt-16 max-w-3xl space-y-6">
            {steps.map((step, index) => (
              <Reveal key={step.number} delay={0.1 * (index + 1)}>
                <div className="flex gap-6 rounded-xl border border-navy-100 bg-white p-8 shadow-card">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-navy-500">
                    <span className="font-serif text-xl font-bold text-white">
                      {step.number}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-serif text-headline text-navy-700">
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
        </Container>
      </section>

      <div className="mx-auto h-px max-w-sm bg-navy-100" />

      {/* The Marco Reid Advantage — Comparison Table */}
      <section
        className="py-24 sm:py-36"
        aria-label="Marco Reid advantage comparison"
      >
        <Container>
          <Reveal>
            <p className="text-center text-xs font-medium uppercase tracking-widest text-forest-600">
              Side by side
            </p>
            <h2 className="mt-6 text-center font-serif text-display text-navy-800">
              The Marco Reid advantage.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-navy-400">
              See what changes when your accountant works with AI-powered
              professional intelligence instead of legacy tools.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mx-auto mt-16 max-w-4xl overflow-hidden rounded-xl border border-navy-100 bg-white shadow-card">
              {/* Table header */}
              <div className="grid grid-cols-3 border-b border-navy-100 bg-navy-50 px-6 py-4">
                <p className="text-sm font-semibold text-navy-600">Feature</p>
                <p className="text-sm font-semibold text-navy-400">
                  Traditional CPA
                </p>
                <p className="text-sm font-semibold text-forest-600">
                  Marco Reid CPA
                </p>
              </div>
              {/* Table rows */}
              {comparisonRows.map((row, index) => (
                <div
                  key={row.feature}
                  className={`grid grid-cols-3 px-6 py-5 ${
                    index < comparisonRows.length - 1
                      ? "border-b border-navy-50"
                      : ""
                  }`}
                >
                  <p className="pr-4 text-sm font-medium text-navy-700">
                    {row.feature}
                  </p>
                  <p className="pr-4 text-sm text-navy-400">
                    {row.traditional}
                  </p>
                  <p className="text-sm font-medium text-forest-600">
                    {row.marcoReid}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      <div className="mx-auto h-px max-w-sm bg-navy-100" />

      {/* CTA: Are You a CPA? */}
      <section className="bg-navy-50 py-24 sm:py-36" aria-label="CPA signup">
        <Container className="text-center">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-widest text-forest-600">
              For accounting professionals
            </p>
            <h2 className="mt-6 font-serif text-display text-navy-800">
              Are you a CPA?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-navy-400">
              Join the platform that gives you your profession back. AI-powered
              tax research, automated reconciliation, transparent client
              portals, and the most advanced accounting intelligence ever built.
              All in one subscription.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10 flex justify-center gap-4">
              <Button href="/pricing" size="lg">
                See pricing
              </Button>
              <Button href="/accounting" variant="secondary" size="lg">
                Explore Accounting
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* AI Disclaimer */}
      <section className="py-16" aria-label="AI disclaimer">
        <Container>
          <div className="mx-auto max-w-2xl">
            <AiDisclaimer />
          </div>
        </Container>
      </section>
    </>
  );
}
