import type { Metadata } from "next";
import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
import SchemaMarkup from "@/app/components/shared/SchemaMarkup";
import Reveal from "@/app/components/effects/Reveal";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Security \u2014 How Marco Reid Protects Your Data",
  description:
    "FIPS 140-3 encryption, immutable audit trails, chain of custody tracking, zero-knowledge architecture, and courtroom-admissible security. The most secure professional platform ever built.",
};

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Marco Reid Security",
  description: "Security architecture and compliance for the Marco Reid professional intelligence platform.",
  url: `${BRAND.url}/security`,
};

const securityFeatures = [
  {
    title: "FIPS 140-3 encryption",
    desc: "All data encrypted at rest and in transit using Federal Information Processing Standard validated cryptographic modules. The standard required by US federal courts for electronic evidence.",
    badge: "Federal standard",
  },
  {
    title: "Immutable audit trails",
    desc: "Every action on the platform is logged in a cryptographically signed, append-only audit trail. No record can be modified or deleted after creation. This creates a legally defensible chain of evidence admissible in court.",
    badge: "Court-admissible",
  },
  {
    title: "Chain of custody tracking",
    desc: "Every document and recording has a complete chain of custody: who created it, who accessed it, who modified it, when, and from where. If opposing counsel challenges a document, the chain of custody proves its integrity.",
    badge: "Evidence-grade",
  },
  {
    title: "Tamper-evident architecture",
    desc: "If any data is modified outside the normal application flow \u2014 by a database administrator, a compromised system, or any other means \u2014 cryptographic signatures break and the system flags it immediately. Integrity is mathematically provable.",
    badge: "Cryptographic",
  },
  {
    title: "End-to-end encryption",
    desc: "All attorney-client and CPA-client communications are end-to-end encrypted. Messages, documents, and files are encrypted before they leave the sender\u2019s device and can only be decrypted by the intended recipient.",
    badge: "Privilege-protected",
  },
  {
    title: "Court-admissible metadata",
    desc: "All documents preserve original metadata: creation date, author, modification history, device information. This metadata is itself immutable and cryptographically signed, meeting Federal Rules of Evidence requirements for ESI.",
    badge: "Rules-compliant",
  },
  {
    title: "Zero-knowledge architecture",
    desc: "The ultimate security goal: even Marco Reid as a company cannot access client data. Encryption keys held exclusively by the firm. Marco Reid processes encrypted data without ever decrypting it. The gold standard for privilege protection.",
    badge: "Coming soon",
  },
  {
    title: "Multi-factor authentication",
    desc: "MFA mandatory for all accounts. Time-based one-time passwords, hardware security keys, and biometric authentication supported. No account can be accessed with a password alone.",
    badge: "Required",
  },
];

const compliance = [
  { standard: "SOC 2 Type II", status: "Planned", desc: "6-month observed audit of sustained security controls" },
  { standard: "GDPR", status: "Built-in", desc: "Privacy by design \u2014 right to erasure, data portability, consent management" },
  { standard: "NZ Privacy Act 2020", status: "Built-in", desc: "Full compliance with NZ privacy requirements" },
  { standard: "Australian Privacy Act", status: "Built-in", desc: "Compliant with 2022 reforms and enhanced enforcement" },
  { standard: "CCPA", status: "Built-in", desc: "California consumer privacy rights implemented" },
  { standard: "UK GDPR", status: "Built-in", desc: "Post-Brexit UK data protection compliance" },
  { standard: "IOLTA compliance", status: "In progress", desc: "50-state trust accounting analysis with legal tech lawyer" },
  { standard: "WCAG 2.1 AA", status: "Built-in", desc: "Accessibility compliance across all interfaces" },
];

export default function SecurityPage() {
  return (
    <>
      <SchemaMarkup schema={schema} />

      <section className="bg-navy-500 pt-32 pb-20 sm:pt-40 sm:pb-28">
        <Container className="text-center">
          <p className="text-sm font-semibold tracking-wider text-forest-300">
            Security
          </p>
          <h1 className="mt-6 font-serif text-hero text-white">
            The most secure professional
            <br />
            platform ever built.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-xl text-navy-200">
            Attorney-client privilege is sacred. Client financial data is irreplaceable.
            Marco Reid security is built to courtroom admissibility standards &mdash;
            not just &ldquo;good enough for SaaS.&rdquo;
          </p>
        </Container>
      </section>

      <section className="py-24 sm:py-36" aria-label="Security features">
        <Container>
          <Reveal>
            <h2 className="font-serif text-display text-navy-800">
              Security architecture.
            </h2>
            <p className="mt-4 text-lg text-navy-400">
              Every feature designed for the most sensitive data in the professional world.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-4 sm:grid-cols-2">
            {securityFeatures.map((f) => (
              <Reveal key={f.title} delay={0.05}>
                <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-semibold text-navy-700">{f.title}</h3>
                    <span className="shrink-0 rounded-full bg-forest-50 px-3 py-1 text-xs font-bold text-forest-600">
                      {f.badge}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-navy-400">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12"><div className="h-px bg-navy-100" /></div>

      <section className="py-24 sm:py-36" aria-label="Compliance">
        <Container>
          <Reveal>
            <h2 className="font-serif text-display text-navy-800">
              Compliance.
            </h2>
            <p className="mt-4 text-lg text-navy-400">
              Built to the strictest standard. Satisfies everything else automatically.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-16 overflow-hidden rounded-xl border border-navy-100 bg-white shadow-card">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-navy-100 bg-navy-50">
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-navy-400">Standard</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-navy-400">Status</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-navy-400">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {compliance.map((c) => (
                    <tr key={c.standard} className="border-b border-navy-50">
                      <td className="px-6 py-4 font-medium text-navy-700">{c.standard}</td>
                      <td className="px-6 py-4">
                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                          c.status === "Built-in" ? "bg-forest-50 text-forest-600" :
                          c.status === "Planned" ? "bg-navy-50 text-navy-500" :
                          "bg-plum-50 text-plum-600"
                        }`}>{c.status}</span>
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

      <section className="bg-navy-50 py-24 sm:py-36" aria-label="Data residency">
        <Container>
          <Reveal>
            <h2 className="font-serif text-display text-navy-800">
              Your data stays in your jurisdiction.
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-navy-400">
              Each firm is assigned a data region at signup. All data is stored exclusively
              in that region. A US lawyer&rsquo;s data never touches the Sydney server.
              An Australian CPA&rsquo;s data never touches the Virginia server.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { region: "United States", location: "Virginia (us-east)" },
                { region: "Australia / NZ", location: "Sydney (ap-southeast)" },
                { region: "United Kingdom", location: "London (eu-west)" },
                { region: "European Union", location: "Frankfurt (eu-central)" },
              ].map((r) => (
                <div key={r.region} className="rounded-xl border border-navy-100 bg-white p-5 shadow-card">
                  <p className="font-semibold text-navy-700">{r.region}</p>
                  <p className="mt-1 text-sm text-navy-400">{r.location}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="py-24 sm:py-36" aria-label="Get started">
        <Container className="text-center">
          <Reveal>
            <h2 className="font-serif text-display text-navy-800">
              Security questions?
            </h2>
            <p className="mt-4 text-lg text-navy-400">
              We take security as seriously as you do. Get in touch.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10 flex justify-center gap-4">
              <Button href="/contact" size="lg">Contact us</Button>
              <Button href="/pricing" variant="secondary" size="lg">View pricing</Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
