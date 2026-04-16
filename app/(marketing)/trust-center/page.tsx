import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
import Reveal from "@/app/components/effects/Reveal";

export const metadata: Metadata = {
  title: "Trust Center",
  description:
    "Every security, compliance, data-handling, and audit artefact Marco Reid maintains \u2014 in one place. SOC 2, GDPR, NZ Privacy Act, data residency, sub-processors, and DPAs.",
};

const compliance = [
  {
    standard: "SOC 2 Type II",
    status: "In progress",
    desc: "6-month observed audit currently underway. Report expected Q3 2026.",
  },
  {
    standard: "GDPR",
    status: "Built-in",
    desc: "Privacy by design. Right to erasure, data portability, consent management.",
  },
  {
    standard: "CCPA",
    status: "Built-in",
    desc: "California consumer privacy rights implemented across all data flows.",
  },
  {
    standard: "NZ Privacy Act 2020",
    status: "Built-in",
    desc: "Full compliance with New Zealand privacy requirements and OPC guidance.",
  },
  {
    standard: "UK GDPR",
    status: "Built-in",
    desc: "Post-Brexit UK data protection compliance under the Data Protection Act 2018.",
  },
  {
    standard: "IOLTA compliance",
    status: "In progress",
    desc: "50-state trust accounting analysis under review by legal tech counsel.",
  },
  {
    standard: "WCAG 2.1 AA",
    status: "Built-in",
    desc: "Accessibility compliance across every user-facing interface.",
  },
];

const subprocessors = [
  {
    name: "Anthropic",
    purpose: "Primary model provider for Marco research and reasoning.",
    data: "Query prompts and context windows. No model training on customer data.",
  },
  {
    name: "OpenAI",
    purpose: "Secondary model provider for specific reasoning tasks.",
    data: "Query prompts only. Zero-retention enterprise agreement.",
  },
  {
    name: "Stripe",
    purpose: "Firm billing, invoicing, and client payment processing.",
    data: "Firm billing details and, for client invoicing, client payment identifiers.",
  },
  {
    name: "Neon",
    purpose: "Primary relational database provider across all regions.",
    data: "Encrypted firm and matter data in customer-assigned regions only.",
  },
];

const regions = [
  { region: "United States", location: "Virginia (us-east)" },
  { region: "Australia / NZ", location: "Sydney (ap-southeast)" },
  { region: "United Kingdom", location: "London (eu-west)" },
  { region: "European Union", location: "Frankfurt (eu-central)" },
];

const reports = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Security Architecture", href: "/security" },
  { label: "Data Processing Addendum (DPA)", href: "/contact" },
];

const statusStyles: Record<string, string> = {
  "Built-in": "bg-forest-50 text-forest-600",
  "In progress": "bg-plum-50 text-plum-600",
  Planned: "bg-navy-50 text-navy-500",
};

export default function TrustCenterPage() {
  return (
    <>
      <section className="bg-navy-500 pt-32 pb-20 sm:pt-40 sm:pb-28">
        <Container className="text-center">
          <p className="text-sm font-semibold tracking-wider text-forest-300">
            Trust Center
          </p>
          <h1 className="mt-6 font-serif text-hero text-white">
            Your trust is our foundation.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-xl text-navy-200">
            Every security posture, compliance attestation, data-handling
            practice, and audit artefact Marco Reid maintains &mdash;
            consolidated in one place, updated as we ship.
          </p>
        </Container>
      </section>

      <section className="py-24 sm:py-36" aria-label="Compliance matrix">
        <Container>
          <Reveal>
            <h2 className="font-serif text-display text-navy-800">
              Compliance matrix.
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-navy-400">
              Built to the strictest standard in each jurisdiction we operate in.
              Satisfies everything else automatically.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-12 overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-card">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-navy-100 bg-navy-50">
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-navy-400">
                      Standard
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-navy-400">
                      Status
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-navy-400">
                      Details
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {compliance.map((c) => (
                    <tr key={c.standard} className="border-b border-navy-50 last:border-b-0">
                      <td className="px-6 py-4 font-medium text-navy-700">
                        {c.standard}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${statusStyles[c.status] ?? "bg-navy-50 text-navy-500"}`}
                        >
                          {c.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-navy-400">{c.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-navy-50 py-24 sm:py-36" aria-label="Security architecture">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <h2 className="font-serif text-display text-navy-800">
                Security architecture.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-navy-500">
                FIPS 140-3 encryption at rest and in transit. Immutable audit
                trails. Cryptographic chain of custody on every document.
                Tamper-evident signatures on every record. Multi-factor
                authentication mandatory. Zero-knowledge architecture on the
                roadmap.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-navy-500">
                The full security architecture &mdash; every control, every
                standard, every threat model &mdash; is documented publicly.
              </p>
              <div className="mt-8">
                <Button href="/security" size="md">
                  Read the security page
                </Button>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-navy-100 bg-white p-8 shadow-card">
                <p className="text-sm font-semibold uppercase tracking-wider text-navy-400">
                  At a glance
                </p>
                <ul className="mt-6 space-y-4 text-navy-500">
                  <li className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-forest-500" />
                    <span>FIPS 140-3 validated cryptography end-to-end</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-forest-500" />
                    <span>Cryptographically signed, append-only audit trail</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-forest-500" />
                    <span>Region-pinned data residency per firm</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-forest-500" />
                    <span>MFA required; passkeys and hardware keys supported</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-forest-500" />
                    <span>No customer data used to train AI models</span>
                  </li>
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="py-24 sm:py-36" aria-label="Data residency">
        <Container>
          <Reveal>
            <h2 className="font-serif text-display text-navy-800">
              Data residency.
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-navy-400">
              Each firm is assigned a data region at signup. All data lives and
              is processed exclusively in that region. A US attorney&rsquo;s
              data never touches the Sydney server. An Australian CPA&rsquo;s
              data never touches Virginia.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {regions.map((r) => (
                <div
                  key={r.region}
                  className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card"
                >
                  <p className="font-semibold text-navy-700">{r.region}</p>
                  <p className="mt-1 text-sm text-navy-400">{r.location}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-navy-50 py-24 sm:py-36" aria-label="Sub-processors">
        <Container>
          <Reveal>
            <h2 className="font-serif text-display text-navy-800">
              Sub-processors.
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-navy-400">
              The full list of third parties we rely on to operate the
              platform. Every one has a signed data processing agreement and
              region-appropriate data-handling commitments.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-12 overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-card">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-navy-100 bg-navy-50">
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-navy-400">
                      Sub-processor
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-navy-400">
                      Purpose
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-navy-400">
                      Data category
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {subprocessors.map((s) => (
                    <tr key={s.name} className="border-b border-navy-50 last:border-b-0">
                      <td className="px-6 py-4 font-medium text-navy-700">
                        {s.name}
                      </td>
                      <td className="px-6 py-4 text-navy-500">{s.purpose}</td>
                      <td className="px-6 py-4 text-navy-400">{s.data}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="py-24 sm:py-36" aria-label="Certifications and reports">
        <Container>
          <Reveal>
            <h2 className="font-serif text-display text-navy-800">
              Certifications & reports.
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-navy-400">
              The artefacts that matter for your procurement, InfoSec, and legal
              teams.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              {reports.map((r) => (
                <Link
                  key={r.label}
                  href={r.href}
                  className="group flex items-center justify-between rounded-2xl border border-navy-100 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover"
                >
                  <p className="font-semibold text-navy-700 group-hover:text-forest-600">
                    {r.label}
                  </p>
                  <span className="text-navy-400 transition-transform group-hover:translate-x-1">
                    &rarr;
                  </span>
                </Link>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-navy-50 py-24 sm:py-36" aria-label="Contact">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-3xl rounded-2xl border border-navy-100 bg-white p-10 shadow-card">
              <h2 className="font-serif text-display text-navy-800">
                Contact.
              </h2>
              <p className="mt-4 text-lg text-navy-500">
                Two direct channels for the two most common requests.
              </p>
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-navy-400">
                    Security
                  </p>
                  <p className="mt-2 text-navy-500">
                    Vulnerability reports, penetration test coordination, or
                    security questionnaires.
                  </p>
                  <a
                    href="mailto:security@marcoreid.com"
                    className="mt-3 inline-block font-semibold text-navy-700 underline underline-offset-4 hover:text-forest-600"
                  >
                    security@marcoreid.com
                  </a>
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-navy-400">
                    Privacy
                  </p>
                  <p className="mt-2 text-navy-500">
                    Data subject requests, DPA execution, or processing
                    questions from your legal team.
                  </p>
                  <a
                    href="mailto:privacy@marcoreid.com"
                    className="mt-3 inline-block font-semibold text-navy-700 underline underline-offset-4 hover:text-forest-600"
                  >
                    privacy@marcoreid.com
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
