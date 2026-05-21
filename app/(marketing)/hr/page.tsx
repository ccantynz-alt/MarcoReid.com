import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
import Reveal from "@/app/components/effects/Reveal";
import SchemaMarkup from "@/app/components/shared/SchemaMarkup";

export const metadata: Metadata = {
  title:
    "Marco Reid for HR and Recruitment Firms — Place Talent in the Best Firms",
  description:
    "Access verified professionals and Academy graduates. Track placements, manage commissions, and connect top legal and accounting talent with the firms that need them.",
};

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Marco Reid for HR and Recruitment Firms",
  description:
    "Recruit for the world's leading legal and accounting firms. Access verified candidates, track placements, and manage commissions in one platform.",
};

const steps = [
  {
    n: "01",
    title: "Apply as an HR partner",
    body: "Complete the partner application. We verify your agency credentials and recruitment licence before granting access.",
  },
  {
    n: "02",
    title: "Browse verified candidates",
    body: "Access a pool of credential-verified professionals and Academy graduates. Filter by specialty, jurisdiction, experience level, and availability.",
  },
  {
    n: "03",
    title: "Match to firm openings",
    body: "View active job postings from Marco Reid firms. Submit candidates directly through the platform with full qualification records attached.",
  },
  {
    n: "04",
    title: "Earn placement fees",
    body: "Commission tracked automatically. Transparent fee structures agreed upfront. Payments processed through the platform.",
  },
];

const valueProps = [
  {
    title: "Pre-verified candidate pool",
    desc: "Every professional on Marco Reid has their credentials verified against the relevant professional body. No fake qualifications. No wasted time on background checks you have already done.",
  },
  {
    title: "Academy graduates pipeline",
    desc: "Marco Reid Academy produces a steady stream of qualified lawyers and accountants across eight countries. Get early access to graduating cohorts before they hit the open market.",
  },
  {
    title: "Placement tracking and CRM",
    desc: "Track every candidate, every submission, every interview, and every placement in one system. No more spreadsheets. No more lost emails. Full pipeline visibility.",
  },
  {
    title: "Commission management",
    desc: "Agreed fee structures are locked into the platform. When a placement is confirmed, the commission is calculated automatically. Transparent for both parties.",
  },
  {
    title: "Firm relationship management",
    desc: "Build long-term relationships with law and accounting firms on the platform. See their growth, their hiring patterns, and their upcoming needs before they post a role.",
  },
  {
    title: "Multi-jurisdiction reach",
    desc: "Recruit across New Zealand, Australia, United Kingdom, United States, Canada, Ireland, Singapore, and India. One platform for global professional recruitment.",
  },
];

const stats = [
  { label: "Countries covered", value: "8" },
  { label: "Professional specialties", value: "120+" },
  { label: "Academy courses", value: "200+" },
  { label: "Verified professionals", value: "Growing" },
];

export default function HRPage() {
  return (
    <>
      <SchemaMarkup schema={schema} />

      {/* HERO */}
      <section className="relative overflow-hidden bg-navy-500 pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="animate-drift absolute -right-48 -top-48 h-[480px] w-[480px] rounded-full bg-gold-500/15 blur-[140px]" />
          <div className="animate-drift-reverse absolute -left-48 -bottom-32 h-[420px] w-[420px] rounded-full bg-plum-500/12 blur-[120px]" />
        </div>
        <Container>
          <div className="relative mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">
              HR and recruitment partners
            </p>
            <h1 className="mt-6 font-serif text-hero text-white">
              Recruit for the world&rsquo;s legal and accounting firms.
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-white/90">
              Access credential-verified professionals and Academy graduates.
              Track placements, manage commissions, and connect top talent with
              the firms that need them. One platform for the entire recruitment
              lifecycle.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button href="/contact" variant="gold" size="lg">
                Apply to become an HR partner &rarr;
              </Button>
              <Button href="/academy" variant="ghost" size="lg" className="text-white hover:text-gold-200">
                Explore the Academy &rarr;
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* STATS BAR */}
      <section className="relative -mt-8 z-10">
        <Container>
          <Reveal>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-navy-100 bg-white p-5 text-center shadow-card"
                >
                  <p className="font-serif text-2xl text-gold-500">{s.value}</p>
                  <p className="mt-1 text-xs text-navy-400">{s.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 sm:py-28">
        <Container>
          <Reveal>
            <h2 className="text-center font-serif text-display text-navy-800">
              How it works.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-navy-400">
              Four steps from application to placement fee. No complexity. No
              hidden charges. Transparent from day one.
            </p>
          </Reveal>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <Reveal key={s.n} delay={0.05}>
                <div className="flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5">
                  <p className="font-serif text-3xl text-gold-500">{s.n}</p>
                  <h3 className="mt-3 font-serif text-lg text-navy-800">
                    {s.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-navy-400">
                    {s.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* VALUE PROPS */}
      <section className="bg-navy-50 py-20 sm:py-28">
        <Container>
          <Reveal>
            <h2 className="text-center font-serif text-display text-navy-800">
              Why partner with Marco Reid.
            </h2>
          </Reveal>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {valueProps.map((v) => (
              <Reveal key={v.title} delay={0.04}>
                <div className="h-full rounded-xl border border-navy-100 bg-white p-6 shadow-card">
                  <h3 className="font-semibold text-navy-700">{v.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy-400">
                    {v.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* WHO CAN APPLY */}
      <section className="py-20 sm:py-28">
        <Container narrow>
          <Reveal>
            <h2 className="font-serif text-display text-navy-800">
              Who can apply.
            </h2>
            <p className="mt-4 text-lg text-navy-400">
              We partner with established recruitment agencies that specialise in
              legal and accounting placements. Solo recruiters with verifiable
              track records are also welcome.
            </p>
          </Reveal>
          <div className="mt-10 space-y-4">
            {[
              {
                title: "Legal recruitment agencies",
                desc: "Agencies that place lawyers, barristers, solicitors, paralegals, and legal executives across any jurisdiction.",
              },
              {
                title: "Accounting recruitment agencies",
                desc: "Agencies that place chartered accountants, CPAs, tax agents, bookkeepers, and audit professionals.",
              },
              {
                title: "Cross-border specialist recruiters",
                desc: "Recruiters with experience placing professionals in new jurisdictions. Cross-border admission guidance is built into the platform.",
              },
              {
                title: "Graduate and early-career recruiters",
                desc: "Agencies that place newly qualified professionals. Direct pipeline from Marco Reid Academy into your candidate pool.",
              },
            ].map((item) => (
              <Reveal key={item.title} delay={0.03}>
                <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card">
                  <h3 className="font-serif text-lg text-navy-800">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-navy-500">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-navy-500 py-20 sm:py-28">
        <Container className="text-center">
          <Reveal>
            <h2 className="font-serif text-display text-white">
              Ready to place the best talent?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">
              Apply to join the Marco Reid HR partner programme. Early partners
              get priority access to Academy graduates and founding-cohort firms.
            </p>
            <div className="mt-8">
              <Button href="/contact" variant="gold" size="lg">
                Apply to become an HR partner &rarr;
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
