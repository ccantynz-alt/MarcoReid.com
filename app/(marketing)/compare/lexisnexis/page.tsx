import type { Metadata } from "next";
import Button from "@/app/components/shared/Button";
import SchemaMarkup from "@/app/components/shared/SchemaMarkup";
import Reveal from "@/app/components/effects/Reveal";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title:
    "Marco Reid vs LexisNexis — The Complete Professional Platform for the AI Era",
  description:
    "Compare Marco Reid with LexisNexis. AI-powered legal research with citation verification, practice management, billing, trust accounting, voice dictation in 9 languages, accounting integration, courtroom technology, and cross-domain intelligence — all in one platform. Built for the AI era.",
  keywords: [
    "LexisNexis alternative",
    "AI legal research",
    "legal practice management software",
    "AI-powered legal research tool",
    "LexisNexis competitor",
    "modern legal research",
    "legal technology platform",
    "legal AI tool",
    "law firm software",
    "AI legal research platform",
    "LexisNexis alternative 2026",
    "legal research platform with practice management",
  ],
  openGraph: {
    title: "Marco Reid vs LexisNexis — Research Is Just the Beginning",
    description:
      "LexisNexis defined legal research for a generation. Marco Reid builds the complete professional platform for the next — research, management, billing, voice, accounting, and courtroom technology in one login.",
    url: `${BRAND.url}/compare/lexisnexis`,
    type: "website",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: BRAND.name,
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "Legal Technology",
  operatingSystem: "Web",
  description:
    "AI-powered legal research with citation verification, practice management, billing, trust accounting, voice dictation in 9 languages, cross-domain intelligence, and courtroom technology — one platform for the modern law and accounting practice.",
  url: `${BRAND.url}/compare/lexisnexis`,
  offers: {
    "@type": "Offer",
    price: "99",
    priceCurrency: "USD",
    priceValidUntil: "2027-12-31",
  },
  featureList: [
    "AI legal research with citation verification",
    "Practice management",
    "Billing and time tracking",
    "Trust accounting (IOLTA)",
    "Voice dictation in 9 languages",
    "Document drafting AI",
    "Client portal",
    "Accounting integration",
    "Court-rules calendaring",
    "Courtroom technology",
    "Unlimited e-signatures",
    "Cross-domain intelligence",
  ],
};

const comparisonRows = [
  {
    feature: "Legal Research",
    traditional: "Case law, statutes, and regulations",
    marcoReid: "AI-powered research with citation verification",
    traditionalAvailable: true,
    marcoReidAvailable: true,
  },
  {
    feature: "Risk Analytics",
    traditional: "Litigation analytics and company intelligence",
    marcoReid: "Roadmap",
    traditionalAvailable: true,
    marcoReidAvailable: false,
  },
  {
    feature: "Practice Management",
    traditional: "Separate tool needed",
    marcoReid: "Built in — matters, tasks, deadlines, documents",
    traditionalAvailable: false,
    marcoReidAvailable: true,
  },
  {
    feature: "Billing & Time Tracking",
    traditional: "Separate tool needed",
    marcoReid: "Built in — time entries, invoices, Stripe payments",
    traditionalAvailable: false,
    marcoReidAvailable: true,
  },
  {
    feature: "Trust Accounting (IOLTA)",
    traditional: "Separate tool needed",
    marcoReid: "Built in — IOLTA compliant, every state",
    traditionalAvailable: false,
    marcoReidAvailable: true,
  },
  {
    feature: "Voice Dictation",
    traditional: "Not available",
    marcoReid: "Built in — 9 languages, legal vocabulary",
    traditionalAvailable: false,
    marcoReidAvailable: true,
  },
  {
    feature: "Document Drafting AI",
    traditional: "Limited assistance",
    marcoReid: "Full AI drafting with verified citations inline",
    traditionalAvailable: false,
    marcoReidAvailable: true,
  },
  {
    feature: "Accounting Platform",
    traditional: "Not available",
    marcoReid: "Complete accounting wing for CPA firms",
    traditionalAvailable: false,
    marcoReidAvailable: true,
  },
  {
    feature: "Client Portal",
    traditional: "Not available",
    marcoReid: "Built in — matter tracking, messaging, payments",
    traditionalAvailable: false,
    marcoReidAvailable: true,
  },
  {
    feature: "Court-Rules Calendaring",
    traditional: "Separate tool needed",
    marcoReid: "Built in — automatic deadline calculation",
    traditionalAvailable: false,
    marcoReidAvailable: true,
  },
  {
    feature: "Courtroom Technology",
    traditional: "Not available",
    marcoReid: "Built in — e-filing, exhibits, transcription",
    traditionalAvailable: false,
    marcoReidAvailable: true,
  },
  {
    feature: "E-Signature",
    traditional: "Separate tool needed",
    marcoReid: "Unlimited, built in",
    traditionalAvailable: false,
    marcoReidAvailable: true,
  },
];

const separateTools = [
  { name: "Legal Research Platform", cost: "$400–800+/mo" },
  { name: "Practice Management", cost: "$49–149/mo" },
  { name: "Billing Software", cost: "$30–80/mo" },
  { name: "Trust Accounting", cost: "$50–150/mo" },
  { name: "Voice Dictation", cost: "$15–60/mo" },
  { name: "E-Signature", cost: "$25–50/mo" },
  { name: "Document Drafting", cost: "$20–80/mo" },
  { name: "Client Portal", cost: "$30–100/mo" },
];

const differentiators = [
  {
    title: "Unified Platform",
    description:
      "Every tool in one login. Research, case management, billing, trust accounting, documents, e-signatures, client portal, calendaring, voice dictation, and courtroom technology. No integrations to maintain, no data silos, no context switching between disconnected products.",
    icon: (
      <svg
        className="h-8 w-8 text-forest-500"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
        />
      </svg>
    ),
  },
  {
    title: "AI-Native Architecture",
    description:
      "Built with AI at the core, not retrofitted onto a platform designed before artificial intelligence existed. Citation verification, document drafting, cross-domain research, and intelligent workflows designed around AI from the first line of code.",
    icon: (
      <svg
        className="h-8 w-8 text-forest-500"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
        />
      </svg>
    ),
  },
  {
    title: "Cross-Domain Intelligence",
    description:
      "Ask a question that spans law and accounting in a single query. Immigration tax implications, corporate formation with chart of accounts, entity structuring with compliance analysis. No other platform connects both disciplines in one search.",
    icon: (
      <svg
        className="h-8 w-8 text-forest-500"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
        />
      </svg>
    ),
  },
  {
    title: "Professional Voice Layer",
    description:
      "Lawyers have always dictated. Marco Reid Voice captures dictation in 9 languages with legal vocabulary intelligence that knows &ldquo;whereas&rdquo; and &ldquo;notwithstanding&rdquo; are terms of art, not errors. Speak anywhere you can type &mdash; research queries, documents, billing entries, matter notes.",
    icon: (
      <svg
        className="h-8 w-8 text-forest-500"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"
        />
      </svg>
    ),
  },
];

export default function CompareLexisNexisPage() {
  return (
    <>
      <SchemaMarkup schema={schema} />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-navy-500 pt-32 pb-24 sm:pt-40 sm:pb-32">
        {/* Gradient orbs */}
        <div
          className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-forest-500/20 blur-[120px]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-plum-500/15 blur-[100px]"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-6xl px-6 text-center sm:px-8 lg:px-12">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-widest text-forest-300">
              Marco Reid vs Traditional Research Platforms
            </p>
            <h1 className="mt-6 font-serif text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
              Research Is Just the Beginning
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-navy-200 sm:text-xl">
              LexisNexis defined legal research for a generation. Marco Reid
              builds the complete professional platform for the next &mdash;
              research, management, billing, voice, accounting, and courtroom
              technology in one login.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/pricing" size="lg" variant="secondary">
                Experience the complete platform
              </Button>
              <Button
                href="/law"
                size="lg"
                variant="ghost"
                className="text-white hover:text-forest-300"
              >
                Explore Marco Reid Legal
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Side-by-Side Comparison Table ── */}
      <section
        className="bg-white py-24 sm:py-32"
        aria-label="Feature comparison"
      >
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
          <Reveal>
            <div className="text-center">
              <h2 className="font-serif text-3xl text-navy-800 sm:text-4xl">
                Side by side
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-navy-400">
                Traditional research platforms handle one job brilliantly.
                Marco Reid handles every job in your practice.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mx-auto mt-16 max-w-4xl overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b-2 border-navy-100">
                    <th className="pb-4 pr-6 text-xs font-bold uppercase tracking-wider text-navy-400">
                      Feature
                    </th>
                    <th className="pb-4 pr-6 text-xs font-bold uppercase tracking-wider text-navy-400">
                      Traditional Research Platforms
                    </th>
                    <th className="pb-4 text-xs font-bold uppercase tracking-wider text-forest-600">
                      Marco Reid
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row) => (
                    <tr
                      key={row.feature}
                      className="border-b border-navy-50 transition-colors hover:bg-navy-50/50"
                    >
                      <td className="py-4 pr-6 font-medium text-navy-700">
                        {row.feature}
                      </td>
                      <td className="py-4 pr-6 text-navy-400">
                        {row.traditionalAvailable ? (
                          <span className="flex items-start gap-2">
                            <span
                              className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-navy-100 text-xs text-navy-500"
                              aria-hidden="true"
                            >
                              &#10003;
                            </span>
                            <span>{row.traditional}</span>
                          </span>
                        ) : (
                          <span className="flex items-start gap-2">
                            <span
                              className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-50 text-xs text-red-400"
                              aria-hidden="true"
                            >
                              &#10007;
                            </span>
                            <span className="text-navy-300">
                              {row.traditional}
                            </span>
                          </span>
                        )}
                      </td>
                      <td className="py-4 text-navy-700">
                        {row.marcoReidAvailable ? (
                          <span className="flex items-start gap-2">
                            <span
                              className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-forest-50 text-xs text-forest-600"
                              aria-hidden="true"
                            >
                              &#10003;
                            </span>
                            <span className="font-medium">
                              {row.marcoReid}
                            </span>
                          </span>
                        ) : (
                          <span className="flex items-start gap-2">
                            <span
                              className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-navy-100 text-xs text-navy-400"
                              aria-hidden="true"
                            >
                              &#8594;
                            </span>
                            <span className="text-navy-400">
                              {row.marcoReid}
                            </span>
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── One Platform vs Many ── */}
      <section
        className="bg-navy-50 py-24 sm:py-32"
        aria-label="The real cost of separate tools"
      >
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
          <Reveal>
            <div className="text-center">
              <h2 className="font-serif text-3xl text-navy-800 sm:text-4xl">
                One platform vs many
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-navy-400">
                Research-only platforms leave professionals assembling the rest
                of their stack from 5&ndash;8 separate subscriptions. The costs
                add up. So does the friction.
              </p>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            {/* Separate tools column */}
            <Reveal delay={0.05}>
              <div className="rounded-2xl border border-navy-100 bg-white p-8 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wider text-navy-400">
                  The fragmented approach
                </p>
                <p className="mt-2 font-serif text-2xl text-navy-800">
                  5&ndash;8 separate subscriptions
                </p>

                <div className="mt-8 space-y-3">
                  {separateTools.map((tool) => (
                    <div
                      key={tool.name}
                      className="flex items-center justify-between rounded-lg bg-navy-50/70 px-4 py-3"
                    >
                      <span className="text-sm text-navy-600">
                        {tool.name}
                      </span>
                      <span className="text-sm font-medium text-navy-400">
                        {tool.cost}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-navy-100 pt-6">
                  <span className="text-sm font-semibold text-navy-600">
                    Estimated total
                  </span>
                  <span className="text-lg font-bold text-red-500">
                    $619&ndash;$1,470+/mo
                  </span>
                </div>

                <p className="mt-4 text-xs text-navy-300">
                  Plus the cost of managing separate logins, separate billing
                  cycles, separate support channels, and the time lost switching
                  between disconnected tools every day.
                </p>
              </div>
            </Reveal>

            {/* Marco Reid column */}
            <Reveal delay={0.15}>
              <div className="rounded-2xl border-2 border-forest-200 bg-white p-8 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wider text-forest-600">
                  The Marco Reid approach
                </p>
                <p className="mt-2 font-serif text-2xl text-navy-800">
                  One platform. Everything included.
                </p>

                <div className="mt-8 space-y-3">
                  {[
                    "AI-powered legal research with citation verification",
                    "Practice management — matters, tasks, deadlines",
                    "Billing and time tracking with Stripe payments",
                    "Trust accounting — IOLTA-compliant, every state",
                    "Voice dictation — legal vocabulary, 9 languages",
                    "Document drafting AI with inline research",
                    "Unlimited e-signatures",
                    "Client portal with secure messaging and payments",
                    "Court-rules calendaring with automatic deadlines",
                    "Courtroom technology — e-filing, exhibits, transcription",
                    "Marco Reid Accounting — cross-domain intelligence",
                  ].map((feature) => (
                    <div
                      key={feature}
                      className="flex items-start gap-3 rounded-lg bg-forest-50/50 px-4 py-3"
                    >
                      <span
                        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-forest-100 text-xs text-forest-600"
                        aria-hidden="true"
                      >
                        &#10003;
                      </span>
                      <span className="text-sm text-navy-600">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-forest-100 pt-6">
                  <span className="text-sm font-semibold text-navy-600">
                    Starting at
                  </span>
                  <span className="text-lg font-bold text-forest-600">
                    $99/mo
                  </span>
                </div>

                <p className="mt-4 text-xs text-navy-400">
                  One login. One bill. One platform that handles your entire
                  practice. No integrations to manage. No data silos. No context
                  switching.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── The Next Generation ── */}
      <section
        className="bg-white py-24 sm:py-32"
        aria-label="The next generation of professional intelligence"
      >
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
          <Reveal>
            <div className="text-center">
              <h2 className="font-serif text-3xl text-navy-800 sm:text-4xl">
                The next generation
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-navy-400">
                Not a research tool with features bolted on. A complete
                professional intelligence platform, built from scratch for how
                modern firms actually work.
              </p>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-8 sm:grid-cols-2">
            {differentiators.map((d, i) => (
              <Reveal key={d.title} delay={0.05 * (i + 1)}>
                <div className="group rounded-2xl border border-navy-100 bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-forest-50">
                    {d.icon}
                  </div>
                  <h3 className="mt-6 font-serif text-xl text-navy-800">
                    {d.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy-500">
                    {d.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Respect Section ── */}
      <section
        className="bg-navy-50 py-16 sm:py-20"
        aria-label="Acknowledgement"
      >
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-base leading-relaxed text-navy-500">
                LexisNexis has served the legal profession for decades and
                established a foundational standard for legal research and risk
                analytics. Marco Reid is built for a different era &mdash; one
                where professionals need research, practice management, billing,
                voice dictation, accounting, and courtroom technology unified in
                a single AI-native platform. Both exist to serve professionals.
                Marco Reid was built to serve them completely.
              </p>
              <p className="mt-4 text-sm text-navy-400">
                Marco Reid is not affiliated with, endorsed by, or connected to
                LexisNexis or RELX Group in any way.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section
        className="bg-white py-24 sm:py-32"
        aria-label="Call to action"
      >
        <div className="mx-auto max-w-6xl px-6 text-center sm:px-8 lg:px-12">
          <Reveal>
            <h2 className="font-serif text-3xl text-navy-800 sm:text-4xl">
              Experience the complete platform
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-navy-400">
              Research. Management. Billing. Trust accounting. Voice. Documents.
              Courtroom technology. Accounting. One login. One price.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
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
