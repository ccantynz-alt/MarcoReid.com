import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/app/components/shared/Container";
import Reveal from "@/app/components/effects/Reveal";

export const metadata: Metadata = {
  title: "Data Residency",
  description:
    "Where Marco Reid stores your data, by jurisdiction. NZ data stays in Australasia. AU data stays in Australia. EU and UK data stay in their region. Plain answers.",
};

interface Region {
  jurisdiction: string;
  flag: string;
  primary: string;
  backup: string;
  legal: string;
  status: "live" | "rolling-out";
}

const regions: Region[] = [
  {
    jurisdiction: "New Zealand",
    flag: "NZ",
    primary: "AWS Sydney (ap-southeast-2)",
    backup: "AWS Sydney — multi-AZ replication",
    legal: "Privacy Act 2020 · OPC guidance · Cloud Computing Code of Practice",
    status: "live",
  },
  {
    jurisdiction: "Australia",
    flag: "AU",
    primary: "AWS Sydney (ap-southeast-2)",
    backup: "AWS Sydney — multi-AZ replication",
    legal: "Privacy Act 1988 · APP cross-border principles",
    status: "live",
  },
  {
    jurisdiction: "United Kingdom",
    flag: "UK",
    primary: "AWS London (eu-west-2)",
    backup: "AWS Ireland (eu-west-1)",
    legal: "UK GDPR · Data Protection Act 2018 · ICO guidance",
    status: "rolling-out",
  },
  {
    jurisdiction: "European Union",
    flag: "EU",
    primary: "AWS Frankfurt (eu-central-1)",
    backup: "AWS Ireland (eu-west-1)",
    legal: "GDPR · EDPB Schrems II safeguards · standard contractual clauses",
    status: "rolling-out",
  },
  {
    jurisdiction: "United States",
    flag: "US",
    primary: "AWS Oregon (us-west-2)",
    backup: "AWS Virginia (us-east-1)",
    legal: "CCPA / CPRA · HIPAA-eligible architecture · state breach laws",
    status: "rolling-out",
  },
  {
    jurisdiction: "Canada",
    flag: "CA",
    primary: "AWS Canada Central (ca-central-1)",
    backup: "AWS Canada Central — multi-AZ replication",
    legal: "PIPEDA · provincial privacy laws (Quebec Law 25, etc.)",
    status: "rolling-out",
  },
];

export default function DataResidencyPage() {
  return (
    <>
      <section className="bg-navy-500 pt-32 pb-20 sm:pt-40">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">
              Data Residency
            </p>
            <h1 className="mt-6 font-serif text-hero text-white">
              Your data stays where the law puts it.
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-white/90">
              No surprises, no &quot;global cloud,&quot; no data quietly crossing borders.
              We pin every customer&rsquo;s data to a region at the moment their firm signs up,
              and we never move it without your written instruction.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <Reveal>
            <h2 className="text-center font-serif text-display text-navy-800">
              Where your data lives.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-navy-400">
              Marco Reid hosts customer data in the region matched to the firm&rsquo;s primary
              jurisdiction. Replication and backup never leave the region.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {regions.map((r) => (
              <Reveal key={r.flag} delay={0.05}>
                <div className="flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5">
                  <div className="flex items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-500 font-serif text-xs font-bold text-white">
                      {r.flag}
                    </span>
                    <span
                      className={`text-[10px] font-semibold uppercase tracking-wider ${
                        r.status === "live" ? "text-forest-600" : "text-gold-600"
                      }`}
                    >
                      {r.status === "live" ? "Live" : "Rolling out"}
                    </span>
                  </div>
                  <h3 className="mt-4 font-serif text-xl text-navy-800">{r.jurisdiction}</h3>
                  <dl className="mt-4 space-y-3 text-sm">
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wider text-navy-400">
                        Primary
                      </dt>
                      <dd className="mt-1 text-navy-700">{r.primary}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wider text-navy-400">
                        Backup
                      </dt>
                      <dd className="mt-1 text-navy-700">{r.backup}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wider text-navy-400">
                        Governed by
                      </dt>
                      <dd className="mt-1 text-navy-500">{r.legal}</dd>
                    </div>
                  </dl>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-navy-50 py-20 sm:py-28">
        <Container narrow>
          <Reveal>
            <h2 className="font-serif text-display text-navy-800">
              The plain-English guarantees.
            </h2>
          </Reveal>

          <div className="mt-12 space-y-5">
            {[
              {
                title: "We never move your data without your written instruction.",
                body: "If your firm is provisioned in the New Zealand region, your data does not silently move to a US region for a feature that happens to be cheaper there. Region pinning is part of your contract.",
              },
              {
                title: "Sub-processors are listed and updated in public.",
                body: "Stripe, Plaid, Akahu, OpenAI, and AWS are our material sub-processors. The current list lives at the Trust Center and we email customers fourteen days before any change.",
              },
              {
                title: "Cross-border transfers use real safeguards.",
                body: "Where a transfer is unavoidable (e.g. Stripe-hosted card data leaves region for the card networks), we use standard contractual clauses, GDPR Schrems II safeguards, and Privacy Act 2020 IPP-12 disclosures.",
              },
              {
                title: "AI inference happens inside your region where the provider supports it.",
                body: "OpenAI and Anthropic regional endpoints are used wherever available. Where they are not yet, we publish exactly which workloads route out of region and the safeguards that apply.",
              },
              {
                title: "You can export everything, any time.",
                body: "Full account export in JSON and PDF, including matter files, time entries, trust account history, Marco research transcripts, and every audit-trail event. No throttle, no fee, no dark pattern.",
              },
              {
                title: "On termination we delete on a schedule you can verify.",
                body: "Soft-deletion within 24 hours, hard-deletion within thirty days unless you ask for an extended hold for litigation. We provide a deletion certificate on request.",
              },
            ].map((g) => (
              <Reveal key={g.title} delay={0.05}>
                <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card">
                  <h3 className="font-serif text-lg text-navy-800">{g.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-500">{g.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-12 rounded-2xl bg-navy-500 p-8 text-center">
            <p className="font-serif text-xl text-white">
              Have a question about a specific transfer?
            </p>
            <p className="mt-3 text-sm text-white/85">
              Email <span className="font-semibold text-gold-300">privacy@marcoreid.com</span>.
              Our DPO replies within two business days, in writing, with the answer you can attach to your file.
            </p>
            <p className="mt-6">
              <Link
                href="/trust-center"
                className="inline-flex items-center text-sm font-semibold text-gold-300 hover:text-gold-200"
              >
                Read the full Trust Center &rarr;
              </Link>
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
