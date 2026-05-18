import type { Metadata } from "next";
import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
import SchemaMarkup from "@/app/components/shared/SchemaMarkup";
import Reveal from "@/app/components/effects/Reveal";
import { BRAND, AI_DISCLAIMER } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Resources — Guides and Insights for Legal and Accounting Professionals",
  description:
    "Expert guides, practical insights, and tools for modern legal and accounting professionals. AI legal research, IOLTA compliance, voice dictation, courtroom technology, and more.",
  keywords: [
    "legal technology resources",
    "AI for lawyers guide",
    "accounting technology resources",
    "IOLTA compliance guide",
    "legal AI research",
    "law firm technology",
    "CPA technology tools",
    "voice dictation for lawyers",
  ],
};

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Marco Reid Resources",
  description:
    "Guides, insights, and tools for modern legal and accounting professionals.",
  url: `${BRAND.url}/resources`,
  publisher: {
    "@type": "Organization",
    name: BRAND.name,
    url: BRAND.url,
  },
};

const categories = [
  "All",
  "Legal Tech",
  "Accounting Tech",
  "AI in Practice",
  "Practice Management",
  "Compliance",
] as const;

interface Resource {
  title: string;
  description: string;
  category: string;
  readTime: string;
  href: string;
  badge?: "forest" | "plum";
}

const featuredGuides: Resource[] = [
  {
    title: "The Complete Guide to AI Legal Research in 2026",
    description:
      "How citation verification, hallucination prevention, and public domain sourcing are transforming legal research. Learn the methodology behind verified AI-assisted case law analysis and how to integrate it into your practice safely.",
    category: "AI in Practice",
    readTime: "18 min read",
    href: "#ai-legal-research",
    badge: "forest",
  },
  {
    title: "IOLTA Trust Accounting: A 50-State Compliance Guide",
    description:
      "Every state has its own trust accounting rules. This guide covers three-way reconciliation requirements, common violations that lead to disciplinary action, and how modern software eliminates the manual errors that put licences at risk.",
    category: "Compliance",
    readTime: "24 min read",
    href: "#iolta-compliance",
    badge: "plum",
  },
  {
    title: "AI-Powered Accounting: Moving Beyond QuickBooks",
    description:
      "Bank feeds, automated reconciliation, and AI-driven categorisation are replacing the manual bookkeeping workflows that have consumed accounting firms for decades. A practical roadmap for the transition.",
    category: "Accounting Tech",
    readTime: "15 min read",
    href: "#ai-accounting",
    badge: "forest",
  },
  {
    title: "Voice Dictation for Legal Professionals",
    description:
      "Why 99%+ accuracy matters when every Latin phrase, statutory citation, and jurisdictional term carries legal weight. How professional-grade voice dictation in 9 languages is saving attorneys 15+ hours per week.",
    category: "Legal Tech",
    readTime: "12 min read",
    href: "#voice-dictation",
    badge: "plum",
  },
];

const articles: Resource[] = [
  {
    title: "Understanding AI Citation Verification",
    description:
      "The Verified, Unverified, and Not Found badge system explained. How modern platforms prevent fabricated citations from reaching court filings, and why every attorney needs to understand the verification pipeline.",
    category: "AI in Practice",
    readTime: "10 min read",
    href: "#citation-verification",
  },
  {
    title: "Cross-Domain Intelligence: When Law Meets Accounting",
    description:
      "Immigration tax obligations, corporate formation with simultaneous entity structuring and chart of accounts setup, IP portfolio management with financial modelling. The cases where legal and accounting research must work together.",
    category: "Practice Management",
    readTime: "14 min read",
    href: "#cross-domain",
  },
  {
    title: "Courtroom Technology in 2026",
    description:
      "Electronic filing that works, evidence presentation systems, real-time AI transcription, and deposition management. How technology is transforming litigation from the courtroom floor to the judge's chambers.",
    category: "Legal Tech",
    readTime: "16 min read",
    href: "#courtroom-tech",
  },
  {
    title: "Data Privacy for Law Firms: GDPR and Beyond",
    description:
      "End-to-end encryption, data processing agreements, attorney-client privilege in the cloud, and the breach notification timelines every firm must know. A practical guide to privacy compliance in 2026.",
    category: "Compliance",
    readTime: "13 min read",
    href: "#data-privacy",
  },
  {
    title: "How Voice Dictation Saves 15+ Hours Per Week",
    description:
      "Real time-savings data from professional workflows: document drafting, case notes, billing entries, client correspondence. The maths behind the claim, and how to measure it in your own practice.",
    category: "Practice Management",
    readTime: "8 min read",
    href: "#voice-time-savings",
  },
  {
    title: "The True Cost of Fragmented Legal Software",
    description:
      "The average attorney uses 7 to 10 tools that do not talk to each other. Total cost of ownership analysis, context-switching penalties, and the hidden expense of manual data re-entry across disconnected systems.",
    category: "Practice Management",
    readTime: "11 min read",
    href: "#fragmented-software",
  },
  {
    title: "Building a Citation Verification Workflow",
    description:
      "Step-by-step guide to establishing a citation verification process using public domain sources like CourtListener, Cornell LII, and GovInfo. Protect your firm from the sanctions that follow fabricated case law.",
    category: "AI in Practice",
    readTime: "9 min read",
    href: "#verification-workflow",
  },
  {
    title: "Tax Compliance Automation for CPA Firms",
    description:
      "Federal and state tax preparation, filing status management, deadline tracking, and the AI-assisted workflows that are replacing the spreadsheet-driven compliance processes most firms still rely on.",
    category: "Accounting Tech",
    readTime: "12 min read",
    href: "#tax-compliance",
  },
];

function CategoryBadge({ category }: { category: string }) {
  const colours: Record<string, string> = {
    "Legal Tech": "bg-forest-50 text-forest-600",
    "Accounting Tech": "bg-plum-50 text-plum-600",
    "AI in Practice": "bg-forest-50 text-forest-600",
    "Practice Management": "bg-navy-50 text-navy-500",
    Compliance: "bg-plum-50 text-plum-600",
  };

  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${
        colours[category] ?? "bg-navy-50 text-navy-500"
      }`}
    >
      {category}
    </span>
  );
}

export default function ResourcesPage() {
  return (
    <>
      <SchemaMarkup schema={schema} />

      {/* ── Hero ── */}
      <section className="bg-navy-500 pt-32 pb-20 sm:pt-40 sm:pb-28">
        <Container className="text-center">
          <p className="text-sm font-semibold tracking-wider text-forest-300">
            Resources
          </p>
          <h1 className="mt-6 font-serif text-hero text-white">
            Guides, insights, and tools
            <br />
            for modern professionals.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-xl text-navy-200">
            Deep-dive guides on AI legal research, trust accounting compliance,
            voice dictation, courtroom technology, and everything else
            transforming law and accounting in 2026.
          </p>
        </Container>
      </section>

      {/* ── Category filter ── */}
      <section className="border-b border-navy-100 bg-white py-6">
        <Container>
          <div className="flex flex-wrap items-center gap-2" role="list" aria-label="Resource categories">
            {categories.map((cat) => (
              <span
                key={cat}
                role="listitem"
                className={`cursor-pointer rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
                  cat === "All"
                    ? "bg-navy-500 text-white"
                    : "bg-navy-50 text-navy-500 hover:bg-navy-100"
                }`}
              >
                {cat}
              </span>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Featured guides ── */}
      <section className="py-24 sm:py-36" aria-label="Featured guides">
        <Container>
          <Reveal>
            <h2 className="font-serif text-display text-navy-800">
              Featured guides.
            </h2>
            <p className="mt-4 text-lg text-navy-400">
              Comprehensive resources on the topics that matter most to legal
              and accounting professionals.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-6 sm:grid-cols-2">
            {featuredGuides.map((guide, i) => (
              <Reveal key={guide.href} delay={0.05 * (i + 1)}>
                <a
                  href={guide.href}
                  className="group flex h-full flex-col rounded-xl border border-navy-100 bg-white p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5"
                >
                  <div className="flex items-center justify-between gap-3">
                    <CategoryBadge category={guide.category} />
                    <span className="text-xs font-medium text-navy-300">
                      {guide.readTime}
                    </span>
                  </div>
                  <h3 className="mt-4 font-serif text-xl text-navy-800 group-hover:text-forest-600 transition-colors duration-200">
                    {guide.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-navy-400">
                    {guide.description}
                  </p>
                  <p className="mt-5 text-sm font-semibold text-forest-600">
                    Read guide &rarr;
                  </p>
                </a>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        <div className="h-px bg-navy-100" />
      </div>

      {/* ── Articles grid ── */}
      <section className="py-24 sm:py-36" aria-label="All articles">
        <Container>
          <Reveal>
            <h2 className="font-serif text-display text-navy-800">
              All articles.
            </h2>
            <p className="mt-4 text-lg text-navy-400">
              Practical insights on technology, compliance, and workflows for
              law firms and accounting practices.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article, i) => (
              <Reveal key={article.href} delay={0.04 * (i + 1)}>
                <a
                  href={article.href}
                  className="group flex h-full flex-col rounded-xl border border-navy-100 bg-white p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5"
                >
                  <div className="flex items-center justify-between gap-3">
                    <CategoryBadge category={article.category} />
                    <span className="text-xs font-medium text-navy-300">
                      {article.readTime}
                    </span>
                  </div>
                  <h3 className="mt-4 font-semibold text-navy-800 group-hover:text-forest-600 transition-colors duration-200">
                    {article.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-navy-400">
                    {article.description}
                  </p>
                  <p className="mt-5 text-sm font-semibold text-forest-600">
                    Read article &rarr;
                  </p>
                </a>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── AI disclaimer ── */}
      <section className="bg-navy-50 py-16" aria-label="AI disclaimer">
        <Container narrow>
          <Reveal>
            <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card">
              <div className="flex items-start gap-3">
                <span
                  className="mt-0.5 shrink-0 rounded-full bg-plum-50 px-3 py-1 text-xs font-bold text-plum-600"
                  aria-hidden="true"
                >
                  AI Disclosure
                </span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-navy-400">
                {AI_DISCLAIMER}
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 sm:py-36" aria-label="Get started">
        <Container className="text-center">
          <Reveal>
            <h2 className="font-serif text-display text-navy-800">
              Ready to transform your practice?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-lg text-navy-400">
              {BRAND.name} gives legal and accounting professionals every tool
              they need in one platform. See what it costs &mdash; or ask Marco
              anything.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button href="/pricing" size="lg">
                View pricing
              </Button>
              <Button href="/marco" variant="secondary" size="lg">
                Try Marco
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
