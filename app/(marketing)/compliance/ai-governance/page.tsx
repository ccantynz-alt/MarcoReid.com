import type { Metadata } from "next";
import Link from "next/link";
import { BRAND } from "@/lib/constants";
import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
import SchemaMarkup from "@/app/components/shared/SchemaMarkup";
import AiDisclaimer from "@/app/components/shared/AiDisclaimer";
import Reveal from "@/app/components/effects/Reveal";

export const metadata: Metadata = {
  title: "AI Governance & Model Security — Marco Reid",
  description:
    "Marco Reid's AI governance framework. Closed-model architecture, no training on client data, legal professional privilege protection, ABA Opinion 512 compliance, MinLaw Singapore AI Guide compliance, NZ IPP 3A disclosure, and AU Law Society guidance.",
};

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "AI Governance & Model Security — Marco Reid",
  description:
    "Marco Reid's closed-model AI governance framework — privilege protection, jurisdiction-by-jurisdiction AI regulatory compliance, and commitment to never training on client data.",
  url: `${BRAND.url}/compliance/ai-governance`,
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Marco Reid", item: BRAND.url },
    { "@type": "ListItem", position: 2, name: "Compliance", item: `${BRAND.url}/compliance` },
    {
      "@type": "ListItem",
      position: 3,
      name: "AI Governance",
      item: `${BRAND.url}/compliance/ai-governance`,
    },
  ],
};

const FRAMEWORK_ITEMS = [
  {
    jurisdiction: "United Kingdom",
    flag: "🇬🇧",
    rule: "UK Upper Tribunal — April 2026",
    status: "Compliant",
    detail:
      "The UK Upper Tribunal ruled in April 2026 that open-source AI tools — where query data is used to train shared models — can waive legal professional privilege over client communications. Marco Reid uses the closed Anthropic Claude API exclusively. Query data is never used to train AI models. Anthropic does not retain API data beyond the session. Legal professional privilege is fully preserved.",
    risk: "Critical",
  },
  {
    jurisdiction: "United States",
    flag: "🇺🇸",
    rule: "ABA Formal Opinion 512 — July 2024",
    status: "Compliant",
    detail:
      "ABA Opinion 512 requires explicit, informed consent from clients and attorneys before using AI tools that process matter data. Generic technology consent in engagement letters is insufficient. Marco Reid's onboarding flow includes an explicit AI disclosure and acknowledgment checkbox naming the Anthropic Claude API as the processing model. This consent is stored in our audit log.",
    risk: "High",
  },
  {
    jurisdiction: "Singapore",
    flag: "🇸🇬",
    rule: "MinLaw Generative AI Guide — 6 March 2026",
    status: "Compliant",
    detail:
      "The Singapore Ministry of Law Generative AI Guide for the legal profession (6 March 2026) requires: (a) disclosure of AI use to clients; (b) supervision of AI-generated work product; (c) confidentiality obligations for data transmitted to AI processors; and (d) human review of all AI-assisted outputs. Marco Reid implements all four requirements by design.",
    risk: "High",
  },
  {
    jurisdiction: "New Zealand",
    flag: "🇳🇿",
    rule: "NZ Privacy Amendment Act — IPP 3A (effective 1 May 2026)",
    status: "Compliant",
    detail:
      "IPP 3A requires disclosure when personal information is collected indirectly — including transmission to third-party AI processors. Marco Reid discloses the Anthropic Claude API pipeline to all NZ users at onboarding with explicit acknowledgment. The disclosure covers: AI processor identity (Anthropic), processing location (US servers), data retention policy (no post-session retention), and safeguards (contractual DPA).",
    risk: "Critical",
  },
  {
    jurisdiction: "Australia",
    flag: "🇦🇺",
    rule: "Law Society of NSW AI Guidance — 2025",
    status: "Compliant",
    detail:
      "The Law Society of NSW AI guidance requires: (a) competence obligations when using AI (solicitors must understand the tool); (b) supervision of AI-generated output; (c) confidentiality protections for client data sent to AI; and (d) disclosure to clients when AI is materially involved in work product. Marco Reid's professional toolkit complies with all four dimensions.",
    risk: "Medium",
  },
  {
    jurisdiction: "European Union",
    flag: "🇪🇺",
    rule: "EU AI Act — GPAI obligations (August 2025) + High-risk deadline (2 August 2026)",
    status: "In progress",
    detail:
      "General Purpose AI (GPAI) obligations under the EU AI Act have been in force since August 2025. Claude-class models used by Marco Reid are covered. High-risk AI classification for legal and accounting applications must be completed before 2 August 2026. Marco Reid's EU AI Act risk classification is in progress. No EU market activity will commence until classification is complete.",
    risk: "Critical",
  },
];

const ARCHITECTURE_COMMITMENTS = [
  {
    title: "Closed model only",
    description:
      "Marco Reid uses only the Anthropic Claude API — a closed, proprietary model. Your query data is never exposed to open-source models where it could be ingested into shared training corpora.",
  },
  {
    title: "No training on client data",
    description:
      "Anthropic's API terms explicitly prohibit using API data to train models. Your client matters, research queries, and voice recordings are never used to improve any AI model.",
  },
  {
    title: "Encryption at rest and in transit",
    description:
      "All data is encrypted at rest (AES-256) and in transit (TLS 1.3 minimum). End-to-end encryption on attorney-client communications. No plaintext exposure at any layer.",
  },
  {
    title: "Audit log for every AI interaction",
    description:
      "Every Marco research query, every voice transcription, and every AI-generated document draft is logged in our cryptographically signed, append-only audit trail. The log cannot be modified after creation.",
  },
  {
    title: "Human review required",
    description:
      "Every AI output carries the mandatory professional disclaimer. No AI-generated citation is inserted into a document without passing citation verification. Professional judgment is the final gate.",
  },
  {
    title: "Privilege-safe architecture",
    description:
      "Data transmitted to Anthropic travels under a contractual DPA that preserves confidentiality obligations equivalent to attorney-client privilege. No waiver of privilege occurs through use of the API.",
  },
];

const statusBadge = (status: string) => {
  const styles: Record<string, string> = {
    Compliant: "bg-forest-50 text-forest-700",
    "In progress": "bg-amber-50 text-amber-700",
    "Not started": "bg-red-50 text-red-600",
  };
  return (
    <span
      className={`inline-block rounded-full px-3 py-0.5 text-xs font-bold ${styles[status] ?? "bg-navy-50 text-navy-500"}`}
    >
      {status}
    </span>
  );
};

const riskBadge = (risk: string) => {
  const styles: Record<string, string> = {
    Critical: "bg-red-50 text-red-700",
    High: "bg-orange-50 text-orange-700",
    Medium: "bg-amber-50 text-amber-700",
    Low: "bg-sky-50 text-sky-700",
  };
  return (
    <span
      className={`inline-block rounded-full px-3 py-0.5 text-xs font-bold ${styles[risk] ?? "bg-navy-50 text-navy-500"}`}
    >
      {risk}
    </span>
  );
};

export default function AiGovernancePage() {
  return (
    <>
      <SchemaMarkup schema={schema} />
      <SchemaMarkup schema={breadcrumbSchema} />

      {/* ================================================================ */}
      {/* HERO                                                              */}
      {/* ================================================================ */}
      <section className="relative overflow-hidden bg-navy-500 pt-32 pb-24 sm:pt-40 sm:pb-32">
        <div className="pointer-events-none absolute inset-0">
          <div className="animate-drift absolute -right-48 -top-48 h-[480px] w-[480px] rounded-full bg-gold-500/10 blur-[140px]" />
          <div className="animate-drift-reverse absolute -left-48 -bottom-32 h-[420px] w-[420px] rounded-full bg-forest-500/8 blur-[120px]" />
        </div>

        <Container>
          <div className="relative mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">
              Compliance &mdash; AI Governance
            </p>
            <h1 className="mt-6 font-serif text-hero text-white">
              AI governance and model security.
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-navy-100">
              The legal industry is navigating a critical moment: AI tools that waive
              privilege, regulators that mandate disclosure, and clients who demand
              transparency. Marco Reid&rsquo;s architecture was built for this moment.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/security" size="lg" variant="gold">
                View security architecture →
              </Button>
              <Button href="/compliance" size="lg" variant="ghost" className="text-white hover:text-gold-300">
                Full compliance matrix →
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* ================================================================ */}
      {/* THE PRIVILEGE PROBLEM                                             */}
      {/* ================================================================ */}
      <section className="border-b border-red-200 bg-red-50 py-10">
        <Container>
          <div className="flex items-start gap-4">
            <span className="shrink-0 text-red-600" aria-hidden="true">⚠</span>
            <div>
              <p className="font-semibold text-red-900">
                UK Upper Tribunal — April 2026: Open-source AI can waive legal professional privilege.
              </p>
              <p className="mt-2 text-sm leading-relaxed text-red-800">
                The UK Upper Tribunal ruled in April 2026 that transmitting client matter data
                to open-source AI models — where data can be ingested into shared training corpora —
                may constitute a waiver of legal professional privilege. Marco Reid uses only the
                closed Anthropic Claude API with contractual non-training guarantees. Your client
                data never touches an open-source model.{" "}
                <Link href="/compliance/ai-governance#privilege" className="font-semibold underline hover:text-red-700">
                  Read our full analysis →
                </Link>
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ================================================================ */}
      {/* ARCHITECTURE COMMITMENTS                                          */}
      {/* ================================================================ */}
      <section className="py-20 sm:py-28">
        <Container>
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-500">
              Architecture commitments
            </p>
            <h2 className="mt-3 max-w-3xl font-serif text-display text-navy-800">
              Built to protect privilege and preserve confidentiality.
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-navy-500">
              Six non-negotiable commitments that every session, every query, and every
              document on Marco Reid is held to — without exception.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ARCHITECTURE_COMMITMENTS.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.06}>
                <div className="flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-forest-50">
                    <span className="text-sm font-bold text-forest-700" aria-hidden="true">
                      ✓
                    </span>
                  </div>
                  <h3 className="mt-4 font-serif text-lg text-navy-800">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-500">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ================================================================ */}
      {/* JURISDICTION-BY-JURISDICTION FRAMEWORK                            */}
      {/* ================================================================ */}
      <section id="framework" className="bg-navy-50 py-20 sm:py-28">
        <Container>
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-500">
              Regulatory framework — jurisdiction by jurisdiction
            </p>
            <h2 className="mt-3 font-serif text-display text-navy-800">
              AI governance compliance status.
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-navy-500">
              Every jurisdiction where Marco Reid operates has issued AI governance
              guidance for legal professionals. Our compliance status against each.
            </p>
          </Reveal>

          <div className="mt-12 space-y-4">
            {FRAMEWORK_ITEMS.map((item, i) => (
              <Reveal key={item.jurisdiction} delay={i * 0.06}>
                <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card sm:p-8">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl" aria-hidden="true">{item.flag}</span>
                      <div>
                        <p className="font-semibold text-navy-800">{item.jurisdiction}</p>
                        <p className="text-sm text-navy-400">{item.rule}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {riskBadge(item.risk)}
                      {statusBadge(item.status)}
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-navy-500">{item.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ================================================================ */}
      {/* PRIVILEGE ANALYSIS                                                */}
      {/* ================================================================ */}
      <section id="privilege" className="py-20 sm:py-28">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-500">
                Legal professional privilege
              </p>
              <h2 className="mt-3 font-serif text-display text-navy-800">
                Why the model matters.
              </h2>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-navy-500">
                <p>
                  The April 2026 UK Upper Tribunal ruling created an urgent dividing line in
                  legal AI adoption: closed API models vs. open-source models. The distinction
                  is not academic. Open-source models — including many marketed as
                  &ldquo;enterprise-grade&rdquo; — can ingest API data into shared training corpora.
                  When attorney-client communications pass through such a model, privilege may
                  be waived. Courts in multiple jurisdictions are applying similar reasoning.
                </p>
                <p>
                  Marco Reid uses only the Anthropic Claude API. Anthropic&rsquo;s API data usage
                  policy explicitly prohibits using API inputs to train models. This is backed by
                  a contractual Data Processing Agreement executed with Marco Reid. The combination
                  of contractual prohibition, closed model architecture, and session-only data
                  retention creates a defensible privilege-preservation posture that open-source
                  alternatives cannot match.
                </p>
                <p>
                  It is also notable that Thomson Reuters CoCounsel Legal — the primary
                  enterprise competitor in this space — is built on the same Anthropic Claude
                  Agent SDK. Both platforms use the same underlying model. Our competitive advantage
                  is platform breadth, not model differentiation. The choice of Anthropic is both
                  technically sound and privilege-defensible across every jurisdiction we operate in.
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ================================================================ */}
      {/* AI DISCLAIMER                                                     */}
      {/* ================================================================ */}
      <section className="bg-navy-50 py-12">
        <Container narrow>
          <AiDisclaimer />
        </Container>
      </section>

      {/* ================================================================ */}
      {/* CTA                                                               */}
      {/* ================================================================ */}
      <section className="bg-navy-500 py-20 sm:py-28">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <h2 className="font-serif text-display text-white">
                Questions about AI governance?
              </h2>
              <p className="mt-4 text-lg text-navy-200">
                Our compliance team can provide jurisdiction-specific AI governance
                documentation and answer questions about privilege preservation.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button href="/contact" size="lg" variant="gold">
                  Talk to our compliance team →
                </Button>
                <Button href="/security" size="lg" variant="ghost" className="text-white hover:text-gold-300">
                  Security architecture →
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
