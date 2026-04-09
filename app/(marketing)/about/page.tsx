import type { Metadata } from "next";
import { BRAND } from "@/lib/constants";
import SchemaMarkup from "@/app/components/shared/SchemaMarkup";
import Reveal from "@/app/components/effects/Reveal";
import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";

export const metadata: Metadata = {
  title: "About Marco Reid — Professional Intelligence for Law and Accounting",
  description:
    "Marco Reid is building the most advanced professional intelligence platform for lawyers and accountants. Five integrated products. One platform. Built in Auckland, New Zealand for the world.",
  keywords: [
    "Marco Reid",
    "legal technology",
    "accounting software",
    "AI legal research",
    "professional intelligence",
    "law practice management",
    "Auckland New Zealand",
    "legal AI platform",
  ],
};

const schema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Marco Reid",
  description:
    "The operating system for legal and accounting professionals. AI-powered practice management, research, voice dictation, billing, trust accounting, and courtroom technology in one platform.",
  url: BRAND.url,
  foundingDate: "2026",
  founder: {
    "@type": "Person",
    name: "Craig Cantyn",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Auckland",
    addressCountry: "NZ",
  },
};

const stats = [
  {
    value: "5",
    label: "Integrated products",
    detail: "Legal, Accounting, Courtroom, Marco, Voice",
  },
  {
    value: "9",
    label: "Languages",
    detail: "Voice dictation from day one",
  },
  {
    value: "60+",
    label: "Features",
    detail: "Practice management, billing, trust, research, voice, documents",
  },
  {
    value: "50",
    label: "States",
    detail: "IOLTA trust accounting compliance",
  },
  {
    value: "Zero",
    label: "Unverified citations",
    detail: "In document drafts — every source checked",
  },
];

const wings = [
  {
    name: "Marco Reid Legal",
    description:
      "Full-stack legal practice management. Case management, billing, trust accounting, court-rules calendaring, document AI, e-signatures, client portals, depositions, and courtroom technology — every tool a law firm needs in one platform.",
    href: "/law",
  },
  {
    name: "Marco Reid Accounting",
    description:
      "AI-powered accounting and compliance. Automated bookkeeping, bank feed integration, tax compliance across every jurisdiction, receipt scanning, financial reporting, and intelligent spreadsheets built for modern CPA firms.",
    href: "/accounting",
  },
  {
    name: "Marco Reid Courtroom",
    description:
      "Courtroom technology and e-filing. Evidence presentation, exhibit management, deposition recording with AI transcription, courtroom display tools, and electronic filing integration with state and federal courts.",
    href: "/courtroom",
  },
  {
    name: "Marco",
    description:
      "The cross-domain AI research engine. Legal research, accounting guidance, intellectual property, and regulatory compliance — spanning both disciplines simultaneously. Every citation verified against authoritative public domain sources.",
    href: "/oracle",
  },
  {
    name: "Marco Reid Voice",
    description:
      "The universal voice and dictation input layer. Everywhere you can type, you can speak. Legal and accounting vocabulary intelligence in 9 languages. Context-aware formatting that knows a contract clause from a case note.",
    href: "/dictation",
  },
];

const principles = [
  {
    title: "Professionals first",
    description:
      "Marco Reid is built for lawyers and accountants — not consumers, not hobbyists. Every feature is designed around real professional workflows, real compliance requirements, and real billable-hour economics.",
  },
  {
    title: "Verification over speed",
    description:
      "Every citation is verified against authoritative public domain sources before it reaches a document. Every regulatory reference links to the official source. Speed without accuracy is a liability. We refuse to ship either without the other.",
  },
  {
    title: "Privacy is sacred",
    description:
      "Attorney-client privilege is not a feature — it is a foundation. End-to-end encryption, GDPR compliance from day one, immutable audit trails, and a zero-knowledge architecture goal. Your clients' data is your responsibility. We treat it that way.",
  },
  {
    title: "One platform, not ten",
    description:
      "The average attorney toggles between 7 to 10 disconnected tools every day. Marco Reid replaces the entire stack — research, case management, billing, trust accounting, documents, voice, and courtroom technology — with one login and one bill.",
  },
];

export default function AboutPage() {
  return (
    <>
      <SchemaMarkup schema={schema} />

      {/* ── Hero ── */}
      <section className="bg-navy-500 pt-32 pb-20 sm:pt-40 sm:pb-28">
        <Container className="text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-forest-400">
            About Marco Reid
          </p>
          <h1 className="mt-6 font-serif text-hero text-white">
            Built by professionals.
            <br />
            For professionals.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-navy-200">
            Marco Reid is building the operating system for legal and accounting
            professionals. Five integrated products under one roof. Built in
            Auckland, New Zealand for the world.
          </p>
        </Container>
      </section>

      {/* ── The Problem ── */}
      <section className="py-24 sm:py-36" aria-label="The problem">
        <Container narrow>
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-widest text-forest-600">
              The problem
            </p>
            <h2 className="mt-4 font-serif text-display text-navy-800">
              Professionals are drowning in software.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 text-xl leading-relaxed text-navy-400">
              The average attorney uses 7 to 10 different tools that do not talk
              to each other. Research in one tab. Case management in another.
              Billing somewhere else entirely. Trust accounting in a spreadsheet
              that nobody trusts. Client calls falling through the cracks because
              the CRM lives in a different universe from the calendar.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 text-xl leading-relaxed text-navy-400">
              Accountants face the same fragmentation. Bookkeeping in one
              platform. Tax compliance in another. Client management in a third.
              Bank reconciliation that still requires manual exports and imports
              between systems that should have been connected a decade ago.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 text-xl leading-relaxed text-navy-500 font-medium">
              The result: the average attorney spends more time on
              administrative work than on actual legal work. The tools are
              fragmented, expensive, and none of them were built with AI at the
              core. That is the problem Marco Reid was founded to solve.
            </p>
          </Reveal>
        </Container>
      </section>

      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        <div className="h-px bg-navy-100" />
      </div>

      {/* ── The Vision ── */}
      <section className="py-24 sm:py-36" aria-label="The vision">
        <Container narrow>
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-widest text-forest-600">
              The vision
            </p>
            <h2 className="mt-4 font-serif text-display text-navy-800">
              One platform that replaces everything.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 text-xl leading-relaxed text-navy-400">
              Marco Reid is a single, unified platform that handles everything a
              legal or accounting professional touches in a day. AI-powered
              intelligence that understands both law and accounting. Voice
              dictation in 9 languages. Citation-verified research that prevents
              hallucinated case law from ever reaching a court filing.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 text-xl leading-relaxed text-navy-400">
              Practice management, billing, trust accounting, courtroom
              technology, document drafting, e-signatures, client portals,
              depositions, company incorporation, and secure messaging — all
              under one roof, powered by an AI engine that no single-product
              competitor can replicate.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 text-xl leading-relaxed text-navy-500 font-medium">
              The platform handles the machine work. The professional handles the
              judgment work. That is the only division of labour that has ever
              made sense.
            </p>
          </Reveal>
        </Container>
      </section>

      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        <div className="h-px bg-navy-100" />
      </div>

      {/* ── By the Numbers ── */}
      <section className="py-24 sm:py-36" aria-label="By the numbers">
        <Container>
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-widest text-forest-600">
              By the numbers
            </p>
            <h2 className="mt-4 font-serif text-display text-navy-800">
              The scope of Marco Reid.
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {stats.map((stat, i) => (
              <Reveal
                key={stat.label}
                delay={0.05 * i}
                className={
                  i === stats.length - 1
                    ? "sm:col-span-2 lg:col-span-1"
                    : ""
                }
              >
                <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card h-full">
                  <p className="font-serif text-5xl text-navy-800">
                    {stat.value}
                  </p>
                  <p className="mt-3 text-sm font-semibold uppercase tracking-wide text-navy-700">
                    {stat.label}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-navy-400">
                    {stat.detail}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        <div className="h-px bg-navy-100" />
      </div>

      {/* ── The Five Wings ── */}
      <section className="py-24 sm:py-36" aria-label="The five wings">
        <Container>
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-widest text-forest-600">
              The platform
            </p>
            <h2 className="mt-4 font-serif text-display text-navy-800">
              Five wings. One brain.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-navy-400">
              Marco Reid is not one product. It is a constellation of five
              wings that share a common AI engine, a common voice layer, and a
              common mission: to replace every piece of disconnected software
              that professionals have been forced to tolerate.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {wings.map((wing, i) => (
              <Reveal
                key={wing.name}
                delay={0.05 * i}
                className={
                  i === wings.length - 1
                    ? "sm:col-span-2 lg:col-span-1"
                    : ""
                }
              >
                <a
                  href={wing.href}
                  className="block rounded-xl border border-navy-100 bg-white p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5 h-full"
                >
                  <h3 className="font-serif text-xl text-navy-700">
                    {wing.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy-400">
                    {wing.description}
                  </p>
                  <p className="mt-4 text-sm font-semibold text-forest-600">
                    Learn more &rarr;
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

      {/* ── Our Principles ── */}
      <section className="py-24 sm:py-36" aria-label="Our principles">
        <Container>
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-widest text-forest-600">
              What we believe
            </p>
            <h2 className="mt-4 font-serif text-display text-navy-800">
              Our principles.
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-8 sm:grid-cols-2">
            {principles.map((principle, i) => (
              <Reveal key={principle.title} delay={0.05 * i}>
                <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card h-full">
                  <h3 className="font-serif text-xl text-navy-700">
                    {principle.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-navy-400">
                    {principle.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        <div className="h-px bg-navy-100" />
      </div>

      {/* ── Built in New Zealand ── */}
      <section className="py-24 sm:py-36" aria-label="Built in New Zealand">
        <Container narrow>
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-widest text-forest-600">
              Headquarters
            </p>
            <h2 className="mt-4 font-serif text-display text-navy-800">
              Built in New Zealand. Serving the world.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 text-xl leading-relaxed text-navy-400">
              Marco Reid is headquartered in Auckland, New Zealand — home to
              Reid &amp; Associates Ltd, the company behind the platform.
              Founded by Craig Cantyn with a single conviction: that
              professionals deserve tools as sophisticated as the work they do.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 text-xl leading-relaxed text-navy-400">
              New Zealand&rsquo;s Privacy Act 2020 is among the strongest
              privacy frameworks in the world. Building here means privacy is
              not an afterthought — it is a foundation. The platform is built to
              GDPR standard from day one, ensuring compliance across every
              jurisdiction we serve.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 text-xl leading-relaxed text-navy-400">
              Marco Reid operates through a Delaware C-Corp for US operations,
              with a dedicated IP holding entity that protects every line of
              code, every trademark, and every patent independently from
              operating activities. Corporate structure built for the long term.
            </p>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card text-center">
                <p className="font-serif text-2xl text-navy-800">
                  Auckland, NZ
                </p>
                <p className="mt-2 text-sm text-navy-400">
                  Global headquarters
                </p>
              </div>
              <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card text-center">
                <p className="font-serif text-2xl text-navy-800">
                  Delaware, US
                </p>
                <p className="mt-2 text-sm text-navy-400">
                  US operations
                </p>
              </div>
              <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card text-center">
                <p className="font-serif text-2xl text-navy-800">Global</p>
                <p className="mt-2 text-sm text-navy-400">
                  NZ, AU, US, UK, CA, EU
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── CTA ── */}
      <section className="bg-navy-500 py-24 sm:py-36" aria-label="Get started">
        <Container className="text-center">
          <Reveal>
            <h2 className="font-serif text-display text-white">
              Ready to see what Marco Reid can do?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-xl text-navy-200">
              One platform. Every tool your firm needs. Built for the
              professionals who refuse to settle for anything less.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button href="/pricing" size="lg" variant="secondary">
                View pricing
              </Button>
              <Button href="/contact" size="lg" variant="ghost" className="text-white hover:text-navy-200">
                Contact us &rarr;
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
