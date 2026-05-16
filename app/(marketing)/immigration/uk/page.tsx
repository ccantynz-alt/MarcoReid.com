import type { Metadata } from "next";
import { BRAND } from "@/lib/constants";
import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
import SchemaMarkup from "@/app/components/shared/SchemaMarkup";
import AiDisclaimer from "@/app/components/shared/AiDisclaimer";
import FAQ from "@/app/components/shared/FAQ";
import dynamic from "next/dynamic";

const AnimatedCounter = dynamic(() => import("@/app/components/effects/AnimatedCounter"));
import Reveal from "@/app/components/effects/Reveal";

export const metadata: Metadata = {
  title: "Marco Reid Immigration UK — Skilled Worker & Sponsor Licence Management",
  description:
    "Skilled Worker visa management, sponsor licence tracking, right-to-work verification, settlement applications, and Global Talent endorsements. Built for UK immigration solicitors and compliance teams.",
};

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Marco Reid Immigration — United Kingdom",
  applicationCategory: "LegalService",
  operatingSystem: "Web",
  description:
    "AI-powered UK immigration platform with Skilled Worker visa management, sponsor licence tracking, right-to-work verification, and verified Home Office policy research for immigration solicitors.",
  url: `${BRAND.url}/immigration/uk`,
};

const faqs = [
  {
    question: "Does the platform cover all UK visa routes?",
    answer:
      "Yes. Marco Reid Immigration supports every route under the UK points-based immigration system — including Skilled Worker, Global Talent, Innovator Founder, Graduate, Student, Family, and Ancestry visas. Each route has purpose-built workflows, document checklists, and deadline tracking.",
  },
  {
    question: "How does the sponsor licence management work?",
    answer:
      "The platform tracks every obligation under your sponsor licence — from reporting duties and record-keeping to annual allocation limits and compliance audit preparation. It monitors CoS assignments, flags expiring certificates, and alerts you to SMS compliance action deadlines before UKVI does.",
  },
  {
    question: "Can the platform handle right-to-work checks?",
    answer:
      "Marco Reid Immigration manages right-to-work verification for employers with a statutory excuse audit trail. It tracks check dates, document types, share codes, follow-up check deadlines for time-limited workers, and generates compliance reports for Home Office inspections.",
  },
  {
    question: "How does the points-based system calculator work?",
    answer:
      "Enter your client's job offer, salary, English proficiency, and qualifications. The calculator scores them against the mandatory and tradeable points for the Skilled Worker route, identifies shortfalls, and models salary threshold scenarios including the new higher thresholds introduced in 2024.",
  },
  {
    question: "Does the platform track Home Office policy changes?",
    answer:
      "Marco monitors the Immigration Rules, Home Office guidance, Statement of Changes, and case law from the Upper Tribunal. When a rule change affects an open case or sponsor licence obligation, the platform alerts you with a summary of what changed and which cases are impacted.",
  },
  {
    question: "Is Marco Reid Immigration regulated by the SRA or OISC?",
    answer:
      "Marco Reid Immigration is a case management and research platform — it does not provide immigration advice. All advice must come from a solicitor regulated by the SRA or an adviser registered with the OISC. The platform is designed to support regulated professionals in managing their caseload efficiently.",
  },
];

export default function ImmigrationUKPage() {
  return (
    <>
      <SchemaMarkup schema={schema} />

      {/* Hero */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <Container className="relative text-center">
          <p className="animate-fade-up text-xs font-medium uppercase tracking-widest text-forest-600 opacity-0">
            Marco Reid Immigration — United Kingdom
          </p>
          <h1 className="mt-8 animate-fade-up-1 text-hero font-serif opacity-0">
            <span className="text-forest-500">UK immigration law.</span>
            <br />
            <span className="text-navy-700">Post-Brexit clarity.</span>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl animate-fade-up-2 text-xl leading-relaxed text-navy-400 opacity-0">
            The points-based system is new and evolving. Sponsor licence management
            is complex. Right-to-work checks are employer obligations with real
            penalties. Marco Reid Immigration brings every UK visa workflow into one
            platform &mdash; so you can focus on your clients, not compliance risk.
          </p>
          <div className="mt-12 animate-fade-up-3 opacity-0">
            <Button href="/contact" size="lg">Book a demo</Button>
          </div>
        </Container>
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent" />
      </section>

      <div className="h-px bg-navy-100 mx-auto max-w-sm" />

      {/* Stats */}
      <section className="py-32 sm:py-44" aria-label="Impact">
        <Container>
          <Reveal>
            <h2 className="text-center text-display font-serif text-navy-700">
              The numbers speak for themselves.
            </h2>
          </Reveal>
          <div className="mt-16 grid gap-8 sm:grid-cols-3 text-center">
            <Reveal delay={0.1}>
              <p className="font-serif text-display text-navy-700">
                <AnimatedCounter end={55} suffix="%" />
              </p>
              <p className="mt-2 text-sm text-navy-400">faster CoS assignments</p>
              <p className="mt-1 text-xs text-navy-300">From role approval to visa submission.</p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="font-serif text-display text-forest-600">
                <AnimatedCounter end={15} suffix="k+" />
              </p>
              <p className="mt-2 text-sm text-navy-400">visa applications managed</p>
              <p className="mt-1 text-xs text-navy-300">Across all UK immigration routes.</p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="font-serif text-display text-forest-600">
                <AnimatedCounter end={0} />
              </p>
              <p className="mt-2 text-sm text-navy-400">missed Home Office deadlines</p>
              <p className="mt-1 text-xs text-navy-300">Automated tracking across every case.</p>
            </Reveal>
          </div>
        </Container>
      </section>

      <div className="h-px bg-navy-100 mx-auto max-w-sm" />

      {/* The problem */}
      <section className="py-32 sm:py-44" aria-label="The problem">
        <Container narrow>
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-widest text-forest-600">
              The problem
            </p>
            <h2 className="mt-6 text-display font-serif text-navy-700">
              Post-Brexit UK immigration demands a new level of compliance.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 text-xl leading-relaxed text-navy-400">
              The points-based system replaced free movement overnight. Sponsor licence
              holders face SMS reporting duties with 10-day deadlines and civil penalties
              for non-compliance. Right-to-work checks carry fines up to &pound;60,000
              per illegal worker. Salary thresholds change. SOC codes shift. The Immigration
              Rules run to thousands of pages and update multiple times a year.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 text-xl leading-relaxed text-navy-400">
              Marco Reid Immigration brings every UK visa workflow into one platform.
              Sponsor management, applications, right-to-work checks, policy tracking,
              and verified research &mdash; connected, current, and intelligent.
            </p>
          </Reveal>
        </Container>
      </section>

      <div className="h-px bg-navy-100 mx-auto max-w-sm" />

      {/* Feature stories */}
      <section className="py-32 sm:py-44" aria-label="Features">
        <Container>
          <Reveal>
            <p className="text-center text-xs font-medium uppercase tracking-widest text-forest-600">
              Every workflow. One platform.
            </p>
            <h2 className="mt-6 text-center text-display font-serif text-navy-700">
              What Marco Reid Immigration does for UK.
            </h2>
          </Reveal>

          <div className="mx-auto mt-16 max-w-3xl space-y-4">
            <Reveal delay={0.05}>
              <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card">
                <p className="text-xs font-semibold uppercase tracking-widest text-forest-600">Skilled Worker visas</p>
                <h3 className="mt-4 font-serif text-headline text-navy-700">
                  From CoS assignment to visa grant.
                </h3>
                <p className="mt-4 leading-relaxed text-navy-400">
                  Manage the entire Skilled Worker visa process from a single dashboard.
                  Certificate of Sponsorship assignment, salary threshold validation against
                  SOC code minimums, document collection, application submission tracking,
                  and automatic deadline reminders at every stage.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card">
                <p className="text-xs font-semibold uppercase tracking-widest text-forest-600">Sponsor licence tracking</p>
                <h3 className="mt-4 font-serif text-headline text-navy-700">
                  Every obligation. Every deadline. Audit-ready.
                </h3>
                <p className="mt-4 leading-relaxed text-navy-400">
                  Track SMS reporting duties, CoS allocation limits, key personnel
                  changes, and compliance action deadlines. The platform monitors every
                  sponsor obligation and generates audit-ready reports for UKVI
                  compliance visits. No more scrambling when the Home Office calls.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card">
                <p className="text-xs font-semibold uppercase tracking-widest text-forest-600">Right-to-work verification</p>
                <h3 className="mt-4 font-serif text-headline text-navy-700">
                  Statutory excuse. Secured.
                </h3>
                <p className="mt-4 leading-relaxed text-navy-400">
                  Manage right-to-work checks with a complete audit trail. Document
                  type verification, share code validation, check dates, follow-up
                  reminders for time-limited workers, and compliance reports that
                  satisfy Home Office inspection requirements.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card">
                <p className="text-xs font-semibold tracking-widest text-purple-400">Global Talent endorsements</p>
                <h3 className="mt-4 font-serif text-headline text-navy-700">
                  Endorsement to settlement. Streamlined.
                </h3>
                <p className="mt-4 leading-relaxed text-navy-400">
                  Track Global Talent applications from endorsing body submission through
                  to visa grant and eventual settlement. Manage evidence portfolios for
                  Tech Nation, UKRI, Arts Council, British Academy, and Royal Society
                  endorsements with tailored checklists for each pathway.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Everything included */}
      <section className="py-32 sm:py-44" aria-label="All features">
        <Container>
          <Reveal>
            <h2 className="text-center text-display font-serif text-navy-700">
              Every UK visa route. Covered.
            </h2>
          </Reveal>
          <div className="mx-auto mt-16 grid max-w-3xl gap-3 sm:grid-cols-2">
            {[
              { title: "Skilled Worker", desc: "CoS management, salary checks, and application tracking" },
              { title: "Global Talent", desc: "Endorsement evidence and fast-track settlement" },
              { title: "Innovator Founder", desc: "Endorsement body management and business plan tracking" },
              { title: "Graduate", desc: "Post-study route with eligibility verification" },
              { title: "Student", desc: "CAS tracking, attendance monitoring, and compliance" },
              { title: "Family", desc: "Financial requirement calculations and evidence checklists" },
              { title: "Ancestry", desc: "Commonwealth lineage verification and document management" },
              { title: "Sponsor licence", desc: "SMS compliance, CoS allocation, and audit preparation" },
              { title: "Marco for UK immigration", desc: "Immigration Rules, guidance, and case law with citations" },
              { title: "Right-to-work", desc: "Verification, audit trails, and compliance reporting" },
            ].map((f) => (
              <Reveal key={f.title} delay={0.05}>
                <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5">
                  <p className="font-semibold text-navy-700">{f.title}</p>
                  <p className="mt-2 text-sm text-navy-400">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mx-auto mt-16 max-w-2xl">
            <AiDisclaimer />
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <FAQ items={faqs} heading="UK immigration FAQs." />

      <div className="h-px bg-navy-100 mx-auto max-w-sm" />

      {/* CTA */}
      <section className="relative py-32 sm:py-44" aria-label="Get started">
        <Container className="relative text-center">
          <Reveal>
            <h2 className="text-display font-serif text-forest-500">
              UK immigration
              <br />
              you can stake your practice on.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-xl text-navy-400">
              From sponsor licence to settlement. One platform. Zero missed deadlines.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-12 flex justify-center gap-4">
              <Button href="/contact" size="lg">Book a demo</Button>
              <Button href="/immigration" variant="secondary" size="lg">All immigration</Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
