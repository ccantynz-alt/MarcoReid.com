import type { Metadata } from "next";
import Button from "@/app/components/shared/Button";
import SchemaMarkup from "@/app/components/shared/SchemaMarkup";
import Reveal from "@/app/components/effects/Reveal";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title:
    "Marco Reid vs QuickBooks — Accounting Built for Professionals, Not Bookkeepers",
  description:
    "QuickBooks was built for small business. Marco Reid was built for the professionals who serve them. AI tax research, legal integration, IOLTA trust accounting, voice dictation in 9 languages, and professional-grade compliance — one platform.",
  keywords: [
    "QuickBooks alternative",
    "QuickBooks alternative for accountants",
    "QuickBooks competitor",
    "AI accounting software",
    "accounting software for CPA firms",
    "professional accounting platform",
    "AI tax research tool",
    "IOLTA trust accounting software",
    "accounting and legal software",
    "CPA practice management",
  ],
  openGraph: {
    title: "Marco Reid vs QuickBooks — Accounting Built for Professionals",
    description:
      "QuickBooks was built for small business. Marco Reid was built for the professionals who serve them. AI research, legal integration, and professional-grade compliance in one platform.",
    url: `${BRAND.url}/compare/quickbooks`,
    type: "website",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: BRAND.name,
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "Accounting Technology",
  operatingSystem: "Web",
  description:
    "AI-powered accounting and compliance for CPA firms. Tax research with verified citations, legal integration, IOLTA trust accounting, voice dictation in 9 languages, and professional-grade tools — one platform.",
  url: `${BRAND.url}/compare/quickbooks`,
  offers: {
    "@type": "Offer",
    price: "79",
    priceCurrency: "USD",
    priceValidUntil: "2027-12-31",
    description: "Starting from $79/month for solo CPAs",
  },
  featureList: [
    "AI-automated bookkeeping and general ledger",
    "Bank feed integration with AI categorization",
    "Multi-state tax compliance",
    "AI tax research with verified citations",
    "Legal platform integration",
    "IOLTA trust accounting",
    "Voice dictation in 9 languages",
    "Full-featured client portal",
    "Cross-professional collaboration",
    "AI document drafting",
    "Unlimited e-signatures",
    "AI-powered receipt scanning",
  ],
};

const comparisonRows: {
  feature: string;
  traditional: string;
  marcoReid: string;
  traditionalAvailable: "yes" | "basic" | "addon" | "no";
}[] = [
  {
    feature: "Bookkeeping & GL",
    traditional: "Standard general ledger and chart of accounts",
    marcoReid: "AI-automated journal entries, smart categorization, predictive coding",
    traditionalAvailable: "yes",
  },
  {
    feature: "Bank Feed Integration",
    traditional: "Direct bank connections with manual categorization",
    marcoReid: "AI categorization that learns your patterns and applies tax context",
    traditionalAvailable: "yes",
  },
  {
    feature: "Tax Compliance",
    traditional: "Basic federal filing support",
    marcoReid: "Multi-state, AI-powered with deadline tracking and regulatory alerts",
    traditionalAvailable: "basic",
  },
  {
    feature: "AI Tax Research",
    traditional: "Not available",
    marcoReid: "Marco Accounting — IRS codes, rulings, and guidance with verified citations",
    traditionalAvailable: "no",
  },
  {
    feature: "Legal Platform",
    traditional: "Not available",
    marcoReid: "Full legal wing — case management, court-rules calendaring, document AI",
    traditionalAvailable: "no",
  },
  {
    feature: "Trust Accounting (IOLTA)",
    traditional: "Not available",
    marcoReid: "50-state compliant with three-way reconciliation and audit trails",
    traditionalAvailable: "no",
  },
  {
    feature: "Voice Dictation",
    traditional: "Not available",
    marcoReid: "9 languages with accounting and legal vocabulary intelligence",
    traditionalAvailable: "no",
  },
  {
    feature: "Client Portal",
    traditional: "Limited — basic invoice viewing",
    marcoReid: "Full-featured portal with documents, messaging, payments, and status tracking",
    traditionalAvailable: "basic",
  },
  {
    feature: "Cross-Professional Bridge",
    traditional: "Not available",
    marcoReid: "Lawyer and accountant collaboration on shared client matters",
    traditionalAvailable: "no",
  },
  {
    feature: "Document AI",
    traditional: "Not available",
    marcoReid: "AI drafting for engagement letters, financial statements, and tax memos",
    traditionalAvailable: "no",
  },
  {
    feature: "E-Signature",
    traditional: "Requires third-party add-on",
    marcoReid: "Unlimited, built into every document and engagement workflow",
    traditionalAvailable: "addon",
  },
  {
    feature: "Receipt Scanning",
    traditional: "Basic OCR extraction",
    marcoReid: "AI-powered extraction with automatic tax implication tagging",
    traditionalAvailable: "basic",
  },
];

const professionalCards = [
  {
    title: "Built for CPAs",
    description:
      "QuickBooks is built for small business owners managing their own books. Marco Reid Accounting is built for the professionals those owners hire — CPAs who need professional-grade compliance tools, multi-client management, engagement tracking, and regulatory awareness that goes far beyond basic bookkeeping.",
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
          d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
        />
      </svg>
    ),
  },
  {
    title: "AI Research Engine",
    description:
      "Marco answers tax research questions in seconds with verified IRS citations. Section 199A thresholds, state nexus rules, depreciation schedules, entity election implications — ask the question, get the answer with source links. No more searching IRS.gov for 20 minutes.",
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
    title: "Legal and Accounting United",
    description:
      "The only platform with both a full legal wing and a full accounting wing under one roof. Lawyers invite CPAs into shared client matters. Billing flows into accounting. Cross-domain queries span both disciplines simultaneously. Nobody else can build this because nobody else owns both sides.",
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
    title: "Voice-Enabled Everywhere",
    description:
      "Dictate journal entries, client notes, engagement letters, and research queries by speaking. Marco Reid Voice understands double-entry bookkeeping, tax terminology, and accounting standards. Available in every input field across the platform. Nine languages from day one.",
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

export default function CompareQuickBooksPage() {
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
              Marco Reid vs QuickBooks
            </p>
            <h1 className="mt-6 font-serif text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
              Accounting Built
              <br />
              for Professionals
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-navy-200 sm:text-xl">
              QuickBooks was built for small business. Marco Reid was built for
              the professionals who serve them.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/pricing" size="lg" variant="secondary">
                See the professional platform
              </Button>
              <Button
                href="/accounting"
                size="lg"
                variant="ghost"
                className="text-white hover:text-forest-300"
              >
                Explore Marco Reid Accounting &rarr;
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Comparison Table ── */}
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
                Traditional accounting software handles the books. Marco Reid
                handles the entire practice.
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
                      Traditional Accounting Software
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
                        {row.traditionalAvailable === "yes" ? (
                          <span className="flex items-start gap-2">
                            <span
                              className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-navy-100 text-xs text-navy-500"
                              aria-hidden="true"
                            >
                              &#10003;
                            </span>
                            <span>{row.traditional}</span>
                          </span>
                        ) : row.traditionalAvailable === "basic" ? (
                          <span className="flex items-start gap-2">
                            <span
                              className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-navy-50 text-xs text-navy-400"
                              aria-hidden="true"
                            >
                              &#8776;
                            </span>
                            <span>{row.traditional}</span>
                          </span>
                        ) : row.traditionalAvailable === "addon" ? (
                          <span className="flex items-start gap-2">
                            <span
                              className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-navy-50 text-xs text-navy-400"
                              aria-hidden="true"
                            >
                              $
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
                        <span className="flex items-start gap-2">
                          <span
                            className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-forest-50 text-xs text-forest-600"
                            aria-hidden="true"
                          >
                            &#10003;
                          </span>
                          <span className="font-medium">{row.marcoReid}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── The Professional Difference ── */}
      <section
        className="bg-navy-50 py-24 sm:py-32"
        aria-label="The professional difference"
      >
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
          <Reveal>
            <div className="text-center">
              <h2 className="font-serif text-3xl text-navy-800 sm:text-4xl">
                The professional difference
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-navy-400">
                QuickBooks serves small businesses well. Marco Reid serves the
                professionals those businesses depend on &mdash; with tools
                designed for the complexity of professional practice.
              </p>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-8 sm:grid-cols-2">
            {professionalCards.map((card, i) => (
              <Reveal key={card.title} delay={0.05 * (i + 1)}>
                <div className="group h-full rounded-2xl border border-navy-100 bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-forest-50">
                    {card.icon}
                  </div>
                  <h3 className="mt-6 font-serif text-xl text-navy-800">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy-500">
                    {card.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── When You Need More Than Bookkeeping ── */}
      <section
        className="bg-white py-24 sm:py-32"
        aria-label="When you need more than bookkeeping"
      >
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <h2 className="font-serif text-3xl text-navy-800 sm:text-4xl">
                When you need more than bookkeeping
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="mt-8 space-y-6 text-base leading-relaxed text-navy-500">
                <p>
                  QuickBooks has served millions of small businesses as a
                  reliable bookkeeping tool. For a business owner tracking
                  expenses and sending invoices, it does the job well. That is a
                  meaningful contribution to small business operations, and we
                  acknowledge it.
                </p>
                <p>
                  But accounting firms are not small businesses managing their
                  own books. They are professional practices serving dozens or
                  hundreds of clients simultaneously. They need tax research at
                  their fingertips, multi-state compliance tracking, client
                  engagement management, trust accounting that meets bar
                  requirements, and the ability to collaborate with legal
                  professionals on shared matters.
                </p>
                <p>
                  They need a tool that understands the difference between
                  processing a transaction and advising a client on the tax
                  implications of that transaction. One is data entry. The other
                  is professional intelligence. Marco Reid was built for the
                  latter.
                </p>
                <p>
                  When a CPA needs to look up whether a client qualifies for the
                  Section 199A deduction, they should not have to leave their
                  accounting platform, open a browser, and search IRS.gov for 20
                  minutes. They should hit one key, ask Marco, and get a verified
                  answer with source links in under three seconds. That is the
                  difference between a bookkeeping tool and a professional
                  intelligence platform.
                </p>
              </div>
            </Reveal>
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
                Intuit has served the small business community for decades and
                built a product that millions of businesses rely on daily. Marco
                Reid is built for a different audience &mdash; the professional
                accountants and CPAs who need research, compliance, and client
                management tools that go beyond bookkeeping. Both platforms exist
                to make accounting easier. Marco Reid was built to make
                professional accounting intelligent.
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
              See the professional platform
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-navy-400">
              AI-powered accounting. Tax research with verified citations. Legal
              integration. Voice dictation. Trust accounting. Client portals.
              One login. One price.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/pricing" size="lg">
                See the professional platform
              </Button>
              <Button href="/accounting" variant="secondary" size="lg">
                Explore Marco Reid Accounting
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
