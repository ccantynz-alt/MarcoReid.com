import type { Metadata } from "next";
import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
import SchemaMarkup from "@/app/components/shared/SchemaMarkup";
import Reveal from "@/app/components/effects/Reveal";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title:
    "Marco Reid vs Clio — The Clio Alternative With AI Research, Voice, and Accounting",
  description:
    "Clio built great practice management. Marco Reid builds the entire operating system — AI legal research with citation verification, voice dictation in 9 languages, full accounting wing, courtroom technology, and cross-professional collaboration. One platform. One login.",
  keywords: [
    "Clio alternative",
    "Clio competitor",
    "better than Clio",
    "practice management software",
    "AI legal research",
    "legal practice management with AI",
    "law firm operating system",
    "Clio vs Marco Reid",
    "legal software 2026",
  ],
  openGraph: {
    title: "Marco Reid vs Clio — Practice Management Was Just the Beginning",
    description:
      "Clio built great practice management. Marco Reid builds the entire operating system for legal and accounting professionals.",
    url: `${BRAND.url}/compare/clio`,
    type: "website",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: BRAND.name,
  applicationCategory: "Legal",
  operatingSystem: "Web",
  description:
    "The modern alternative to Clio. AI-powered legal research, voice dictation, full accounting integration, and courtroom technology — plus everything Clio does, in one platform.",
  url: `${BRAND.url}/compare/clio`,
  offers: {
    "@type": "Offer",
    price: "99",
    priceCurrency: "USD",
    description: "Starting from $99/month for solo attorneys",
  },
};

const comparisonRows: {
  feature: string;
  traditional: string;
  marcoreid: string;
}[] = [
  {
    feature: "Case Management",
    traditional: "Yes",
    marcoreid: "Yes — AI-enhanced with predictive deadlines",
  },
  {
    feature: "AI Legal Research",
    traditional: "No — requires Westlaw or LexisNexis",
    marcoreid: "Yes — Marco with citation verification",
  },
  {
    feature: "Voice Dictation",
    traditional: "No — requires Dragon at $699",
    marcoreid: "Yes — 9 languages, legal vocabulary built in",
  },
  {
    feature: "Document AI Drafting",
    traditional: "Limited — basic templates",
    marcoreid: "Yes — full AI drafting with inline research",
  },
  {
    feature: "Trust Accounting",
    traditional: "Basic",
    marcoreid: "Yes — 50-state IOLTA compliant with audit trails",
  },
  {
    feature: "Accounting Platform",
    traditional: "No — requires QuickBooks or Xero",
    marcoreid: "Yes — full accounting wing for CPA firms",
  },
  {
    feature: "Cross-Professional Bridge",
    traditional: "No",
    marcoreid: "Yes — lawyer and accountant collaboration on shared matters",
  },
  {
    feature: "Courtroom Technology",
    traditional: "No",
    marcoreid: "Yes — e-filing, exhibits, transcription",
  },
  {
    feature: "Company Incorporation AI",
    traditional: "No",
    marcoreid: "Yes — multi-jurisdiction with tax analysis",
  },
  {
    feature: "Judge Analytics",
    traditional: "No",
    marcoreid: "Yes — ruling patterns and outcome predictions",
  },
  {
    feature: "Client Portal",
    traditional: "Yes",
    marcoreid: "Yes — enhanced with real-time matter tracking",
  },
  {
    feature: "E-Signature",
    traditional: "Add-on — extra cost",
    marcoreid: "Yes — unlimited, built in",
  },
];

const painPoints = [
  {
    pain: "Practice management handles cases, but you still need Westlaw for research, Dragon for dictation, QuickBooks for accounting, and DocuSign for signatures. Four subscriptions. Four logins. Four invoices.",
    solution:
      "Marco Reid replaces all of them. Research, dictation, accounting, signatures, case management, billing, trust accounting, client portal — one platform, one login, one price.",
  },
  {
    pain: "No AI legal research. When you need to verify a citation or find supporting case law, you leave your practice management tool entirely. Context switch. New tab. Different login. Flow destroyed.",
    solution:
      "Hit \u2318K from anywhere in Marco Reid. Marco slides in. Search case law. Get verified citations with source links. Insert directly into your document. 25 seconds. Flow intact.",
  },
  {
    pain: "No voice dictation. Lawyers have dictated since the profession began. Traditional practice management tools offer no way to speak your research queries, case notes, or billing entries.",
    solution:
      "Marco Reid Voice is built into every input field. Legal vocabulary that knows \u201Cwhereas\u201D and \u201Cnotwithstanding\u201D are not errors. 9 languages. Speak anywhere you can type.",
  },
  {
    pain: "No accounting integration. Your CPA uses QuickBooks or Xero. Your billing data lives in one system, their financials in another. Reconciliation is manual. Cross-referencing is painful.",
    solution:
      "Marco Reid Accounting lives under the same roof. Lawyers and CPAs collaborate on shared matters. Billing flows into accounting. One source of truth for the entire client relationship.",
  },
  {
    pain: "Per-feature pricing tiers. Basic plan for case management. Higher plan for growth tools. Top plan for everything. Every additional capability costs more.",
    solution:
      "Marco Reid gives you everything in one plan. Research, dictation, documents, billing, trust accounting, client portal, e-signatures — all included from day one.",
  },
  {
    pain: "No courtroom technology. E-filing, exhibit management, deposition transcription, and evidence presentation all require separate specialist tools.",
    solution:
      "Marco Reid Courtroom handles e-filing, exhibit management, AI-powered deposition transcription, and courtroom display — connected to your case data automatically.",
  },
];

const wings = [
  {
    name: "Marco Reid Legal",
    description:
      "Full-stack practice management with AI at the core. Case management, billing, trust accounting, court-rules calendaring, document drafting, conflict checking, and client portals.",
    icon: "\u2696\uFE0F",
  },
  {
    name: "Marco Reid Accounting",
    description:
      "AI-powered accounting and compliance for CPA firms. Automated bookkeeping, bank feeds, tax compliance, receipt scanning, and financial reporting.",
    icon: "\uD83D\uDCCA",
  },
  {
    name: "Marco",
    description:
      "The cross-domain AI research engine. Legal research, accounting guidance, and IP intelligence — with every citation verified against authoritative public domain sources.",
    icon: "\uD83E\uDDE0",
  },
  {
    name: "Marco Reid Voice",
    description:
      "The universal input layer. Everywhere you can type, you can speak. Legal and accounting vocabulary in 9 languages. Context-aware formatting that knows a contract clause from a case note.",
    icon: "\uD83C\uDF99\uFE0F",
  },
  {
    name: "Marco Reid Courtroom",
    description:
      "Modern courtroom technology. E-filing, deposition management with AI transcription, evidence presentation, exhibit management, and courtroom display tools.",
    icon: "\uD83C\uDFDB\uFE0F",
  },
];

const crossDomainBenefits = [
  {
    title: "One client, one record, two professions",
    description:
      "A lawyer opens a client matter and clicks \u201CInvolve accounting professional.\u201D The CPA gets a shared matter view instantly. No duplicate data entry. No email chains. No lost context.",
  },
  {
    title: "Company incorporation with tax analysis",
    description:
      "Form an LLC in Delaware while simultaneously running the tax implications through Marco. Legal entity formation and accounting setup in a single workflow that no other platform can offer.",
  },
  {
    title: "Billing that flows into accounting",
    description:
      "Time entries become invoices. Invoices become receivables. Receivables become revenue reports. The entire financial lifecycle from a single source of truth — no reconciliation, no exports, no manual entry.",
  },
  {
    title: "Cross-domain research in one query",
    description:
      "Ask Marco about the tax implications of an immigration settlement. Get legal precedent and IRS guidance in the same response. No other platform owns both a legal engine and an accounting engine.",
  },
];

export default function CompareClioPage() {
  return (
    <>
      <SchemaMarkup schema={schema} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-500 pt-32 pb-20 sm:pt-40 sm:pb-28">
        {/* Gradient orbs */}
        <div
          className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgba(52,211,153,0.4) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-32 bottom-0 h-[400px] w-[400px] rounded-full opacity-15"
          style={{
            background:
              "radial-gradient(circle, rgba(168,85,247,0.4) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        <Container className="relative text-center">
          <p className="text-sm font-semibold tracking-wider text-forest-300">
            Marco Reid vs Clio
          </p>
          <h1 className="mt-6 font-serif text-hero text-white">
            Practice Management Was
            <br />
            Just the Beginning
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-navy-200">
            Clio built great practice management. Marco Reid builds the entire
            operating system &mdash; AI research, voice dictation, accounting
            integration, courtroom technology, and cross-professional
            collaboration in one platform.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button href="/pricing" size="lg" variant="secondary">
              See the full platform
            </Button>
            <Button
              href="/law"
              size="lg"
              variant="ghost"
              className="text-white hover:text-forest-300"
            >
              Explore Marco Reid Legal &rarr;
            </Button>
          </div>
        </Container>
      </section>

      {/* Pain points section */}
      <section className="py-24 sm:py-36" aria-label="Comparison">
        <Container>
          <Reveal>
            <h2 className="font-serif text-display text-navy-800">
              The pain. The solution.
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-navy-400">
              Practice management is essential. But it is only one piece of
              running a law firm. Here is what professionals encounter when
              practice management is all they have &mdash; and what changes when
              they have everything.
            </p>
          </Reveal>

          <div className="mt-16 space-y-4">
            {painPoints.map((p, i) => (
              <Reveal key={i} delay={0.05}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-red-100 bg-red-50/50 p-6">
                    <p className="text-xs font-bold tracking-wider text-red-600">
                      The gap
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-navy-600">
                      {p.pain}
                    </p>
                  </div>
                  <div className="rounded-xl border border-forest-200 bg-forest-50/50 p-6">
                    <p className="text-xs font-bold tracking-wider text-forest-600">
                      Marco Reid
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-navy-600">
                      {p.solution}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Comparison table */}
      <section
        className="bg-navy-50 py-24 sm:py-36"
        aria-label="Feature comparison table"
      >
        <Container>
          <Reveal>
            <h2 className="text-center font-serif text-display text-navy-800">
              Side by side.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-center text-lg text-navy-400">
              Practice management is where both platforms start. Here is where
              Marco Reid goes further.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mx-auto mt-16 max-w-4xl overflow-hidden rounded-xl border border-navy-100 bg-white shadow-card">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-navy-100 bg-navy-50">
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-navy-400">
                        Feature
                      </th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-navy-400">
                        Traditional Practice Management
                      </th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-forest-600">
                        Marco Reid
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonRows.map((row) => (
                      <tr
                        key={row.feature}
                        className="border-b border-navy-50"
                      >
                        <td className="px-6 py-3.5 font-medium text-navy-700">
                          {row.feature}
                        </td>
                        <td className="px-6 py-3.5 text-navy-400">
                          {row.traditional.startsWith("No") ? (
                            <span>
                              <span className="text-red-400">&#10007;</span>{" "}
                              <span className="text-navy-400">
                                {row.traditional.replace("No — ", "")}
                                {row.traditional === "No" ? "" : ""}
                              </span>
                            </span>
                          ) : row.traditional === "Basic" ? (
                            <span className="text-navy-400">
                              &#8776; Basic
                            </span>
                          ) : row.traditional.startsWith("Limited") ? (
                            <span className="text-navy-400">
                              &#8776; {row.traditional}
                            </span>
                          ) : row.traditional.startsWith("Add-on") ? (
                            <span className="text-navy-400">
                              {row.traditional}
                            </span>
                          ) : (
                            <span>
                              <span className="text-forest-500">&#10003;</span>{" "}
                              <span className="text-navy-400">
                                {row.traditional}
                              </span>
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-3.5 font-medium text-navy-700">
                          <span className="text-forest-500">&#10003;</span>{" "}
                          {row.marcoreid.replace("Yes — ", "")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Beyond Practice Management — five wings */}
      <section
        className="py-24 sm:py-36"
        aria-label="Beyond practice management"
      >
        <Container>
          <Reveal>
            <h2 className="font-serif text-display text-navy-800">
              Beyond practice management.
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-navy-400">
              Marco Reid is not one product. It is five wings that share a
              common brain, a common voice layer, and a common mission: to
              replace every piece of overpriced, underperforming software that
              legal and accounting professionals have been forced to tolerate for
              decades.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {wings.map((wing, i) => (
              <Reveal key={wing.name} delay={i * 0.08}>
                <div className="h-full rounded-xl border border-navy-100 bg-white p-6 shadow-card transition-shadow duration-300 hover:shadow-card-hover">
                  <p
                    className="text-3xl"
                    role="img"
                    aria-label={`${wing.name} icon`}
                  >
                    {wing.icon}
                  </p>
                  <h3 className="mt-4 font-serif text-lg font-semibold text-navy-800">
                    {wing.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-500">
                    {wing.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Cross-Domain Advantage */}
      <section
        className="bg-navy-50 py-24 sm:py-36"
        aria-label="Cross-domain advantage"
      >
        <Container>
          <Reveal>
            <h2 className="font-serif text-display text-navy-800">
              The cross-domain advantage.
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-navy-400">
              What happens when law and accounting work together on one platform?
              Something no practice management tool can offer &mdash; because
              none of them own both sides.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-6 sm:grid-cols-2">
            {crossDomainBenefits.map((benefit, i) => (
              <Reveal key={benefit.title} delay={i * 0.08}>
                <div className="h-full rounded-xl border border-navy-100 bg-white p-8 shadow-card">
                  <h3 className="font-serif text-lg font-semibold text-navy-800">
                    {benefit.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy-500">
                    {benefit.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Respectful acknowledgment + differentiation */}
      <section className="py-24 sm:py-36" aria-label="Our perspective">
        <Container narrow>
          <Reveal>
            <h2 className="font-serif text-display text-navy-800">
              Respect where it is due.
            </h2>
            <div className="mt-8 space-y-6 text-base leading-relaxed text-navy-500">
              <p>
                Clio pioneered cloud-based practice management for law firms. They
                proved that attorneys would trust the cloud with their case data,
                billing, and client communications. That was a meaningful
                contribution to the profession, and we acknowledge it.
              </p>
              <p>
                But practice management was always just one piece of the puzzle.
                Lawyers still need research tools, dictation software, accounting
                integration, courtroom technology, and document AI. They have been
                buying those separately, paying for each one individually, and
                losing hours every week switching between disconnected systems.
              </p>
              <p>
                Marco Reid starts where practice management ends. We build the
                entire operating system &mdash; every tool a legal or accounting
                professional touches in a day, unified under one platform, powered
                by AI that understands both disciplines. Not because the old way
                was wrong. Because professionals deserve something complete.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* CTA */}
      <section
        className="bg-navy-500 py-24 sm:py-36"
        aria-label="Get started"
      >
        <Container className="text-center">
          <Reveal>
            <h2 className="font-serif text-display text-white">
              Ready for the full operating system?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-navy-200">
              Practice management, AI research, voice dictation, accounting
              integration, courtroom technology, and cross-professional
              collaboration. One platform. One price.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button href="/pricing" size="lg" variant="secondary">
                See the full platform
              </Button>
              <Button
                href="/law"
                size="lg"
                variant="ghost"
                className="text-white hover:text-forest-300"
              >
                Explore Marco Reid Legal &rarr;
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
