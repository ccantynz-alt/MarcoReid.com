import type { Metadata } from "next";
import Link from "next/link";
import { BRAND } from "@/lib/constants";
import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
import SchemaMarkup from "@/app/components/shared/SchemaMarkup";
import Reveal from "@/app/components/effects/Reveal";

export const metadata: Metadata = {
  title: "PDPA Compliance Statement — Marco Reid Singapore",
  description:
    "Marco Reid's Personal Data Protection Act (PDPA) compliance statement for Singapore users. Data collection, processing, storage, DPO contact, transfer limitation safeguards, and your rights under the PDPA 2012 (amended 2020).",
};

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "PDPA Compliance Statement — Marco Reid",
  description:
    "Marco Reid's Personal Data Protection Act compliance statement for Singapore. Covers data collection, processing pipelines, DPO contact, transfer limitation safeguards, and individual rights.",
  url: `${BRAND.url}/compliance/pdpa`,
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Marco Reid", item: BRAND.url },
    { "@type": "ListItem", position: 2, name: "Compliance", item: `${BRAND.url}/compliance` },
    { "@type": "ListItem", position: 3, name: "PDPA", item: `${BRAND.url}/compliance/pdpa` },
  ],
};

const PROCESSORS = [
  {
    name: "Anthropic (Claude API)",
    location: "United States",
    purpose: "AI research query processing and response generation",
    safeguard: "Contractual data processing agreement with PDPA Transfer Limitation safeguards. Data not used for model training.",
    dataType: "Research query text",
  },
  {
    name: "Neon",
    location: "EU / United States",
    purpose: "PostgreSQL database hosting for all platform data",
    safeguard: "AES-256 encryption at rest. TLS 1.3 in transit. Contractual DPA executed.",
    dataType: "Account data, matter data, billing records",
  },
  {
    name: "Vercel",
    location: "United States",
    purpose: "Platform hosting and global edge delivery",
    safeguard: "Contractual DPA. Data processed only for delivery of platform services.",
    dataType: "Request metadata, session tokens",
  },
  {
    name: "Stripe",
    location: "United States",
    purpose: "Payment processing and subscription management",
    safeguard: "PCI DSS Level 1 certified. Contractual DPA. No card data retained by Marco Reid.",
    dataType: "Billing and payment information",
  },
  {
    name: "Mailgun",
    location: "United States",
    purpose: "Transactional email delivery (account notifications, security alerts)",
    safeguard: "Contractual DPA. Email content limited to service communications.",
    dataType: "Email address, notification content",
  },
];

const RIGHTS = [
  {
    right: "Right of Access",
    description:
      "Request a copy of your personal data held by Marco Reid. We will respond within 30 days.",
  },
  {
    right: "Right to Correction",
    description:
      "Request correction of any inaccurate or incomplete personal data. We will correct or update within 10 business days.",
  },
  {
    right: "Right to Withdraw Consent",
    description:
      "Withdraw consent to processing at any time. Withdrawal does not affect lawfulness of prior processing. Contact dpo@marcoreid.com.",
  },
  {
    right: "Right to Data Portability",
    description:
      "Receive your data in a structured, machine-readable format (JSON or CSV) suitable for transfer to another service.",
  },
  {
    right: "Right to Lodge a Complaint",
    description:
      "File a complaint with the Personal Data Protection Commission (PDPC) of Singapore at pdpc.gov.sg if you believe we have breached the PDPA.",
  },
];

export default function PdpaPage() {
  return (
    <>
      <SchemaMarkup schema={schema} />
      <SchemaMarkup schema={breadcrumbSchema} />

      {/* ================================================================ */}
      {/* HERO                                                              */}
      {/* ================================================================ */}
      <section className="bg-navy-500 pt-32 pb-20 sm:pt-40 sm:pb-28">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-4xl" aria-label="Singapore flag">🇸🇬</p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">
              Singapore Compliance
            </p>
            <h1 className="mt-4 font-serif text-hero text-white">
              PDPA Compliance Statement
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-navy-200">
              Personal Data Protection Act 2012 (amended 2020) — Marco Reid&rsquo;s
              obligations, data processing pipeline, and your rights as a Singapore user.
            </p>
            <p className="mt-4 text-sm text-navy-400">
              Effective: 1 January 2021 &middot; Last reviewed: June 2026
            </p>
          </div>
        </Container>
      </section>

      {/* ================================================================ */}
      {/* DPO CONTACT — PROMINENT                                           */}
      {/* ================================================================ */}
      <section className="border-b border-forest-200 bg-forest-50 py-10">
        <Container>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-forest-700">
                Data Protection Officer (DPO)
              </p>
              <p className="mt-1 text-lg font-semibold text-navy-800">
                dpo@marcoreid.com
              </p>
              <p className="mt-1 text-sm text-navy-500">
                Designated DPO per PDPA Section 11. Responds within 2 business days.
                Subject access requests fulfilled within 30 days.
              </p>
            </div>
            <div className="shrink-0">
              <a
                href="mailto:dpo@marcoreid.com"
                className="inline-flex min-h-[44px] items-center rounded-xl bg-forest-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-forest-700"
              >
                Contact DPO →
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* ================================================================ */}
      {/* SUPERVISORY AUTHORITY                                             */}
      {/* ================================================================ */}
      <section className="py-16 sm:py-24">
        <Container>
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-500">
              Supervisory authority
            </p>
            <h2 className="mt-3 font-serif text-display text-navy-800">
              PDPC — Personal Data Protection Commission.
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-navy-500">
              The Personal Data Protection Commission (PDPC) of Singapore is the
              competent supervisory authority for PDPA compliance. Singapore users
              may lodge complaints directly with the PDPC at{" "}
              <a
                href="https://www.pdpc.gov.sg"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-navy-700 underline hover:text-gold-600"
              >
                pdpc.gov.sg
              </a>
              .
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ================================================================ */}
      {/* WHAT WE COLLECT                                                   */}
      {/* ================================================================ */}
      <section className="bg-navy-50 py-20 sm:py-28">
        <Container>
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-500">
              Data collection
            </p>
            <h2 className="mt-3 font-serif text-display text-navy-800">
              What we collect and why.
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                category: "Account information",
                data: "Name, email address, firm name, hashed password.",
                purpose: "Account creation and authentication. Required to provide the platform.",
              },
              {
                category: "Professional information",
                data: "Practice area, jurisdiction, professional credentials (where provided).",
                purpose: "Personalise the platform experience and jurisdictional features.",
              },
              {
                category: "Client data",
                data: "Information you upload about your clients: names, contact details, matter information, documents, time entries, trust records.",
                purpose: "Delivering case management, billing, and document services. You are the data controller for client data; we process it on your behalf.",
              },
              {
                category: "Research queries",
                data: "Queries submitted to Marco, AI-generated responses, citation verification status, user feedback.",
                purpose: "Delivering AI research results and improving research accuracy.",
              },
              {
                category: "Voice data",
                data: "Audio recordings submitted for transcription, transcribed text, detected language.",
                purpose: "Delivering dictation and transcription services via Marco Reid Voice.",
              },
              {
                category: "Payment data",
                data: "Billing information processed by Stripe. No card numbers stored by Marco Reid.",
                purpose: "Subscription billing and invoice management.",
              },
            ].map((item, i) => (
              <Reveal key={item.category} delay={i * 0.05}>
                <div className="flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
                  <p className="text-xs font-bold uppercase tracking-wider text-gold-600">
                    {item.category}
                  </p>
                  <p className="mt-3 text-sm font-medium text-navy-700">{item.data}</p>
                  <p className="mt-2 text-sm leading-relaxed text-navy-400">{item.purpose}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ================================================================ */}
      {/* AI PROCESSING PIPELINE DISCLOSURE                                 */}
      {/* ================================================================ */}
      <section className="py-20 sm:py-28">
        <Container>
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-500">
              AI processing pipeline
            </p>
            <h2 className="mt-3 font-serif text-display text-navy-800">
              How AI processing works.
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-navy-500">
              When you submit a research query or voice recording, data is transmitted
              to third-party processors operating under contractual safeguards. This
              disclosure is required under both the PDPA Transfer Limitation obligation
              (Singapore) and NZ Privacy Amendment Act IPP 3A (New Zealand).
            </p>
          </Reveal>

          <div className="mt-12 rounded-2xl border border-amber-200 bg-amber-50 p-6 sm:p-8">
            <div className="flex items-start gap-3">
              <span className="shrink-0 text-amber-600" aria-hidden="true">⚠</span>
              <div>
                <p className="font-semibold text-amber-900">AI processing disclosure</p>
                <p className="mt-2 text-sm leading-relaxed text-amber-800">
                  AI processing on Marco Reid occurs via the Anthropic Claude API. Anthropic operates
                  servers in the United States. All data transmitted to Anthropic is protected by a
                  Data Processing Agreement with contractual safeguards meeting the PDPA Transfer
                  Limitation requirements under Section 26 of the PDPA 2012 (amended 2020).
                  Your data is never used to train AI models. Anthropic does not retain API data
                  beyond the API session.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ================================================================ */}
      {/* TRANSFER LIMITATION TABLE                                         */}
      {/* ================================================================ */}
      <section className="bg-navy-50 py-20 sm:py-28">
        <Container>
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-500">
              Transfer limitation (PDPA Section 26)
            </p>
            <h2 className="mt-3 font-serif text-display text-navy-800">
              Third-party processors and safeguards.
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-navy-500">
              Every processor that handles Singapore user data operates under a
              contractual Data Processing Agreement meeting PDPA Transfer Limitation
              requirements. No data is transferred without a legal basis.
            </p>
          </Reveal>

          <div className="mt-12 overflow-x-auto rounded-2xl border border-navy-100 bg-white shadow-card">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-navy-100 bg-navy-50">
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-navy-400">Processor</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-navy-400">Location</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-navy-400">Purpose</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-navy-400">Data type</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-navy-400">Safeguard</th>
                </tr>
              </thead>
              <tbody>
                {PROCESSORS.map((p, i) => (
                  <tr key={p.name} className={`border-b border-navy-50 last:border-0 ${i % 2 === 0 ? "" : "bg-navy-50/40"}`}>
                    <td className="px-6 py-4 font-semibold text-navy-700 whitespace-nowrap">{p.name}</td>
                    <td className="px-6 py-4 text-navy-500 whitespace-nowrap">{p.location}</td>
                    <td className="px-6 py-4 text-navy-500">{p.purpose}</td>
                    <td className="px-6 py-4 text-navy-500">{p.dataType}</td>
                    <td className="px-6 py-4 text-xs leading-relaxed text-navy-400">{p.safeguard}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      {/* ================================================================ */}
      {/* YOUR RIGHTS                                                       */}
      {/* ================================================================ */}
      <section className="py-20 sm:py-28">
        <Container>
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-500">
              Your rights
            </p>
            <h2 className="mt-3 font-serif text-display text-navy-800">
              Rights under the PDPA.
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {RIGHTS.map((item, i) => (
              <Reveal key={item.right} delay={i * 0.05}>
                <div className="flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
                  <p className="text-xs font-bold uppercase tracking-wider text-forest-600">
                    {item.right}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-navy-500">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ================================================================ */}
      {/* BREACH NOTIFICATION                                               */}
      {/* ================================================================ */}
      <section className="bg-navy-50 py-16 sm:py-20">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-3xl rounded-2xl border border-navy-100 bg-white p-8 shadow-card">
              <p className="text-xs font-bold uppercase tracking-wider text-gold-600">
                Breach notification
              </p>
              <h3 className="mt-4 font-serif text-2xl text-navy-800">
                How we respond to data incidents.
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-navy-500">
                In the event of a data breach that may result in significant harm to
                affected individuals, Marco Reid will notify: (a) the Personal Data
                Protection Commission (PDPC) as soon as practicable and within the
                timeframe required under the PDPA mandatory breach notification
                obligation (effective 1 February 2021); and (b) affected individuals
                as soon as practicable with information about the breach, likely
                consequences, and measures taken.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-navy-500">
                All security incidents are logged in our immutable audit trail.
                Our incident response plan is reviewed quarterly. For security
                concerns, contact{" "}
                <a
                  href="mailto:dpo@marcoreid.com"
                  className="font-semibold text-navy-700 underline hover:text-gold-600"
                >
                  dpo@marcoreid.com
                </a>
                .
              </p>
            </div>
          </Reveal>
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
                Questions about your data?
              </h2>
              <p className="mt-4 text-lg text-navy-200">
                Contact our Data Protection Officer at any time. We respond within 2
                business days. Subject access requests fulfilled within 30 days.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button href="mailto:dpo@marcoreid.com" size="lg" variant="gold">
                  Contact DPO →
                </Button>
                <Button href="/privacy" size="lg" variant="ghost" className="text-white hover:text-gold-300">
                  Full privacy policy →
                </Button>
              </div>
              <p className="mt-6 text-sm text-navy-400">
                Singapore supervisory authority: Personal Data Protection Commission (PDPC) —{" "}
                <a
                  href="https://www.pdpc.gov.sg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-white"
                >
                  pdpc.gov.sg
                </a>
              </p>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
