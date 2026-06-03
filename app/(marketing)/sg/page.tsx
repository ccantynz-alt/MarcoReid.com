import type { Metadata } from "next";
import Link from "next/link";
import { BRAND } from "@/lib/constants";
import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
import SchemaMarkup from "@/app/components/shared/SchemaMarkup";
import AiDisclaimer from "@/app/components/shared/AiDisclaimer";
import Reveal from "@/app/components/effects/Reveal";

export const metadata: Metadata = {
  title: "Marco Reid Singapore — Professional Intelligence for SG Law & Accounting",
  description:
    "PDPA-compliant AI platform for Singapore law firms, accounting practices, and legal professionals. MinLaw AI Guide compliant. Law Society Cloud Guidance compliant. Built for the Singapore market.",
};

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Marco Reid — Singapore",
  applicationCategory: "LegalService",
  operatingSystem: "Web",
  description:
    "AI-powered professional intelligence platform for Singapore legal and accounting professionals. PDPA compliant, MinLaw Generative AI Guide compliant, Law Society of Singapore Cloud Computing Guidance compliant.",
  url: `${BRAND.url}/sg`,
  offers: {
    "@type": "Offer",
    priceCurrency: "SGD",
    availability: "https://schema.org/InStock",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Marco Reid", item: BRAND.url },
    { "@type": "ListItem", position: 2, name: "Singapore", item: `${BRAND.url}/sg` },
  ],
};

const COMPLIANCE_ITEMS = [
  {
    label: "PDPA 2012 (amended 2020)",
    detail: "Personal Data Protection Act compliance with full PDPC data protection obligations.",
    icon: "🛡️",
  },
  {
    label: "MinLaw AI Guide — March 2026",
    detail: "Ministry of Law Generative AI Guide for legal practice compliance built in from day one.",
    icon: "⚖️",
  },
  {
    label: "Law Society Cloud Guidance 3.4.1",
    detail: "Cloud computing guidance note compliance for law firms storing and processing client data.",
    icon: "☁️",
  },
  {
    label: "Legal Profession (Solicitors' Accounts) Rules",
    detail: "Trust accounting built to Singapore Solicitors' Accounts Rules — three-way reconciliation, full audit trail.",
    icon: "📋",
  },
  {
    label: "ACRA Integration",
    detail: "Accounting and Corporate Regulatory Authority integration for company filings, director searches, and compliance.",
    icon: "🏛️",
  },
  {
    label: "CPF Payroll Compliance",
    detail: "Central Provident Fund contribution calculations, CPF submissions, and payroll compliance built into Marco Reid Accounting.",
    icon: "💼",
  },
];

const PRODUCTS = [
  {
    name: "Marco Reid Legal",
    description:
      "Case management, document drafting, time and billing, trust accounting (Solicitors' Accounts Rules), court filing, conflict checking, and client portal — purpose-built for Singapore law practices.",
    href: "/law",
    tag: "Law",
  },
  {
    name: "Marco Reid Accounting",
    description:
      "ACRA-integrated accounting, CPF payroll compliance, GST filing, IRAS reporting, and AI-powered financial research for Singapore CPA firms and accounting practices.",
    href: "/accounting",
    tag: "Accounting",
  },
  {
    name: "Marco — The Oracle",
    description:
      "Singapore statute database, SGD court case research, ACRA regulatory guidance, IRAS interpretations, and cross-domain legal-accounting intelligence in a single AI research engine.",
    href: "/oracle",
    tag: "AI Research",
  },
  {
    name: "Marco Reid Voice",
    description:
      "Professional dictation with Singapore English, Mandarin, Tamil, and Malay vocabulary. Legal and accounting terminology built in. Instantly formats dictation to the document type in context.",
    href: "/dictation",
    tag: "Voice",
  },
  {
    name: "Marco Reid Courtroom",
    description:
      "Evidence presentation, deposition management, AI transcription, and courtroom display tools for Singapore Supreme Court and State Courts proceedings.",
    href: "/courtroom",
    tag: "Courtroom",
  },
];

export default function SingaporePage() {
  return (
    <>
      <SchemaMarkup schema={schema} />
      <SchemaMarkup schema={breadcrumbSchema} />

      {/* ================================================================ */}
      {/* HERO                                                              */}
      {/* ================================================================ */}
      <section className="relative overflow-hidden bg-navy-500 pt-32 pb-24 sm:pt-40 sm:pb-32">
        <div className="pointer-events-none absolute inset-0">
          <div className="animate-drift absolute -right-48 -top-48 h-[520px] w-[520px] rounded-full bg-gold-500/10 blur-[140px]" />
          <div className="animate-drift-reverse absolute -left-48 -bottom-32 h-[440px] w-[440px] rounded-full bg-forest-500/8 blur-[120px]" />
        </div>

        <Container>
          <div className="relative mx-auto max-w-3xl text-center">
            <p className="text-6xl" aria-label="Singapore flag">🇸🇬</p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">
              Marco Reid — Singapore
            </p>
            <h1 className="mt-6 font-serif text-hero text-white">
              Professional intelligence built for Singapore.
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-navy-100">
              PDPA compliant. MinLaw AI Guide compliant. Law Society Cloud Guidance compliant.
              The most advanced AI platform for Singapore legal and accounting professionals.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/trial" size="lg" variant="gold">
                Start free trial →
              </Button>
              <Button href="/contact" size="lg" variant="ghost" className="text-white hover:text-gold-300">
                Talk to our Singapore team →
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* ================================================================ */}
      {/* DATA PROCESSING DISCLOSURE — IPP 3A / PDPA                      */}
      {/* ================================================================ */}
      <section className="border-b border-amber-200 bg-amber-50 py-5">
        <Container>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-4">
            <span className="shrink-0 text-amber-600" aria-hidden="true">🔒</span>
            <p className="text-sm leading-relaxed text-amber-900">
              <strong>AI processing disclosure (PDPA Transfer Limitation obligation):</strong>{" "}
              AI processing on Marco Reid occurs via the Anthropic Claude API (servers in the United States).
              All data transfers are protected by contractual safeguards meeting PDPA Transfer Limitation
              requirements under the Personal Data Protection Act 2012 (amended 2020). Your data is never
              used to train AI models.{" "}
              <Link href="/compliance/pdpa" className="font-semibold underline hover:text-amber-700">
                View our PDPA compliance statement →
              </Link>
            </p>
          </div>
        </Container>
      </section>

      {/* ================================================================ */}
      {/* COMPLIANCE GRID                                                   */}
      {/* ================================================================ */}
      <section className="py-20 sm:py-28">
        <Container>
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-500">
              Regulatory compliance
            </p>
            <h2 className="mt-3 max-w-3xl font-serif text-display text-navy-800">
              Built to Singapore&rsquo;s professional standards.
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-navy-500">
              Every regulatory obligation that applies to Singapore legal and accounting
              professionals is addressed before you log in, not after.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {COMPLIANCE_ITEMS.map((item, i) => (
              <Reveal key={item.label} delay={i * 0.06}>
                <div className="flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
                  <span className="text-2xl" aria-hidden="true">{item.icon}</span>
                  <h3 className="mt-3 font-serif text-lg text-navy-800">{item.label}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-500">{item.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ================================================================ */}
      {/* PRODUCTS                                                          */}
      {/* ================================================================ */}
      <section className="bg-navy-50 py-20 sm:py-28">
        <Container>
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-500">
              Five wings. One platform.
            </p>
            <h2 className="mt-3 max-w-3xl font-serif text-display text-navy-800">
              Everything Singapore professionals need.
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.map((product, i) => (
              <Reveal key={product.name} delay={i * 0.07}>
                <Link
                  href={product.href}
                  className="group flex h-full flex-col justify-between rounded-2xl border border-navy-100 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-gold-300 hover:shadow-card-hover"
                >
                  <div>
                    <span className="inline-block rounded-full bg-forest-50 px-3 py-1 text-xs font-semibold text-forest-700">
                      {product.tag}
                    </span>
                    <h3 className="mt-3 font-serif text-xl text-navy-800 group-hover:text-navy-900">
                      {product.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-navy-500">
                      {product.description}
                    </p>
                  </div>
                  <p className="mt-5 text-xs font-semibold text-gold-600 group-hover:text-gold-700">
                    Learn more →
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ================================================================ */}
      {/* DPO + DATA PROTECTION                                             */}
      {/* ================================================================ */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2">
            <Reveal>
              <div className="rounded-2xl border border-navy-100 bg-white p-8 shadow-card">
                <p className="text-xs font-bold uppercase tracking-wider text-gold-600">
                  Data Protection Officer
                </p>
                <h3 className="mt-4 font-serif text-2xl text-navy-800">
                  Your data, protected.
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-navy-500">
                  Marco Reid has designated a Data Protection Officer as required under the
                  Personal Data Protection Act 2012. Contact our DPO for any PDPA-related
                  enquiries, data access requests, or consent withdrawal requests.
                </p>
                <div className="mt-6 rounded-xl border border-navy-100 bg-navy-50 p-4">
                  <p className="text-xs font-bold text-navy-600 uppercase tracking-wider">DPO Contact</p>
                  <p className="mt-2 font-semibold text-navy-800">dpo@marcoreid.com</p>
                  <p className="mt-1 text-xs text-navy-400">
                    Response within 2 business days. Subject access requests fulfilled within 30 days.
                  </p>
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Button href="/compliance/pdpa" variant="secondary" size="sm">
                    PDPA compliance statement
                  </Button>
                  <Button href="/privacy" variant="ghost" size="sm">
                    Privacy policy →
                  </Button>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-forest-200 bg-forest-50 p-8">
                <p className="text-xs font-bold uppercase tracking-wider text-forest-700">
                  Singapore Law Society LIFT Programme
                </p>
                <h3 className="mt-4 font-serif text-2xl text-navy-800">
                  The LIFT programme partner channel.
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-navy-600">
                  Marco Reid participates in the Law Society of Singapore&rsquo;s Legal Industry
                  Framework for Transformation (LIFT) programme, supporting Singapore law firms
                  in their technology adoption journey. LIFT member firms receive dedicated
                  onboarding, implementation support, and training resources.
                </p>
                <ul className="mt-4 space-y-2">
                  {[
                    "Law Society endorsed technology pathway",
                    "LIFT member firm dedicated onboarding",
                    "Singapore Bar-aligned feature set",
                    "Local customer success support",
                  ].map((point) => (
                    <li key={point} className="flex items-start gap-2 text-sm text-navy-700">
                      <span className="mt-0.5 shrink-0 text-forest-600" aria-hidden="true">✓</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ================================================================ */}
      {/* CTA                                                               */}
      {/* ================================================================ */}
      <section className="bg-navy-500 py-20 sm:py-28">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <p className="text-6xl" aria-label="Singapore flag">🇸🇬</p>
              <h2 className="mt-6 font-serif text-display text-white">
                Start today.
              </h2>
              <p className="mt-4 text-lg text-navy-200">
                Join Singapore law firms and accounting practices already using Marco Reid.
                Free trial. No credit card required. Singapore SGD pricing.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button href="/trial" size="lg" variant="gold">
                  Start free trial →
                </Button>
                <Button href="/contact" size="lg" variant="ghost" className="text-white hover:text-gold-300">
                  Talk to our Singapore team →
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ================================================================ */}
      {/* AI DISCLAIMER                                                     */}
      {/* ================================================================ */}
      <section className="py-12">
        <Container narrow>
          <AiDisclaimer />
        </Container>
      </section>

      {/* ================================================================ */}
      {/* COMPLIANCE FOOTER NOTE                                            */}
      {/* ================================================================ */}
      <section className="pb-12">
        <Container narrow>
          <p className="text-center text-xs text-navy-400">
            Marco Reid is a technology platform, not a law firm or accounting practice.
            All professional services in Singapore are delivered by independently licensed
            professionals registered with the Law Society of Singapore, the Institute of
            Singapore Chartered Accountants (ISCA), or other relevant Singaporean regulatory
            bodies. Consumer-facing outputs are reviewed by a credentialled professional
            before release.
          </p>
        </Container>
      </section>
    </>
  );
}
