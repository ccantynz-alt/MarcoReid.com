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
  title: "Marco Reid Immigration NZ — New Zealand Visa & AEWV Management",
  description:
    "AEWV application management, SMC points calculator, partnership visa checklists, INZ policy tracking, and employer accreditation. Built for New Zealand immigration advisers.",
};

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Marco Reid Immigration — New Zealand",
  applicationCategory: "LegalService",
  operatingSystem: "Web",
  description:
    "AI-powered New Zealand immigration platform with AEWV management, SMC points calculation, partnership visa checklists, and verified INZ policy research for licensed immigration advisers.",
  url: `${BRAND.url}/immigration/nz`,
};

const faqs = [
  {
    question: "Does the platform cover all New Zealand visa types?",
    answer:
      "Yes. Marco Reid Immigration supports every INZ visa category including AEWV, Skilled Migrant Category, partnership visas, student visas, Investor 1 and 2, Working Holiday, and visitor visas. Each visa type has purpose-built workflows, document checklists, and deadline tracking.",
  },
  {
    question: "How does the AEWV application management work?",
    answer:
      "The platform guides you through every stage of the Accredited Employer Work Visa process — from employer accreditation and job check through to the work visa application itself. It pre-fills forms from case data, tracks median wage thresholds, and flags missing documentation before submission.",
  },
  {
    question: "Can it track INZ policy changes automatically?",
    answer:
      "Marco monitors Immigration New Zealand operational manuals, immigration instructions, and ministerial directives. When a policy change affects an open case, the platform alerts you with a summary of what changed and which cases are impacted.",
  },
  {
    question: "How does the SMC points calculator work?",
    answer:
      "Enter your client's qualifications, work experience, age, and job offer details. The calculator scores them against the current Skilled Migrant Category points threshold, identifies gaps, and suggests the most efficient path to a qualifying score.",
  },
  {
    question: "Does the platform integrate with Immigration Online?",
    answer:
      "Marco Reid Immigration prepares all application data and documentation in the format required by Immigration Online. While INZ does not offer a public API, the platform ensures every form field, supporting document, and declaration is ready for submission.",
  },
  {
    question: "Is Marco Reid Immigration approved by the Immigration Advisers Authority?",
    answer:
      "Marco Reid Immigration is a case management and research platform — it does not provide immigration advice. All advice must come from a licensed immigration adviser or lawyer. The platform is designed to support licensed professionals in managing their caseload efficiently.",
  },
];

export default function ImmigrationNZPage() {
  return (
    <>
      <SchemaMarkup schema={schema} />

      {/* Hero */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <Container className="relative text-center">
          <p className="animate-fade-up text-xs font-medium uppercase tracking-widest text-forest-600 opacity-0">
            Marco Reid Immigration — New Zealand
          </p>
          <h1 className="mt-8 animate-fade-up-1 text-hero font-serif opacity-0">
            <span className="text-forest-500">New Zealand immigration law.</span>
            <br />
            <span className="text-navy-700">Simplified.</span>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl animate-fade-up-2 text-xl leading-relaxed text-navy-400 opacity-0">
            AEWV applications take hours of manual form-filling. INZ policy changes constantly.
            Visa conditions are complex and easy to miss. Marco Reid Immigration brings every
            New Zealand visa workflow into one platform &mdash; so you can focus on your clients,
            not your paperwork.
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
                <AnimatedCounter end={65} suffix="%" />
              </p>
              <p className="mt-2 text-sm text-navy-400">faster AEWV applications</p>
              <p className="mt-1 text-xs text-navy-300">From accreditation to visa grant.</p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="font-serif text-display text-forest-600">
                <AnimatedCounter end={12} suffix="k+" />
              </p>
              <p className="mt-2 text-sm text-navy-400">visa applications managed</p>
              <p className="mt-1 text-xs text-navy-300">Across all INZ visa categories.</p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="font-serif text-display text-forest-600">
                <AnimatedCounter end={0} />
              </p>
              <p className="mt-2 text-sm text-navy-400">missed INZ deadlines</p>
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
              New Zealand immigration is a moving target.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 text-xl leading-relaxed text-navy-400">
              AEWV replaced six previous work visa categories overnight. The Skilled Migrant
              Category points threshold changes without warning. Partnership visa evidence
              requirements fill binders. Employer accreditation adds another layer of compliance.
              And INZ processing times stretch from weeks to months.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 text-xl leading-relaxed text-navy-400">
              Marco Reid Immigration brings every NZ visa workflow into one platform. Applications,
              document checklists, policy updates, points calculations, and verified research &mdash;
              connected, current, and intelligent.
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
              What Marco Reid Immigration does for NZ.
            </h2>
          </Reveal>

          <div className="mx-auto mt-16 max-w-3xl space-y-4">
            <Reveal delay={0.05}>
              <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card">
                <p className="text-xs font-semibold uppercase tracking-widest text-forest-600">AEWV management</p>
                <h3 className="mt-4 font-serif text-headline text-navy-700">
                  Accredited Employer Work Visas, end to end.
                </h3>
                <p className="mt-4 leading-relaxed text-navy-400">
                  Manage the three-stage AEWV process from a single dashboard. Employer accreditation,
                  job check, and work visa application &mdash; with median wage validation, job
                  advertisement evidence tracking, and automatic deadline reminders at every stage.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card">
                <p className="text-xs font-semibold uppercase tracking-widest text-forest-600">SMC points calculator</p>
                <h3 className="mt-4 font-serif text-headline text-navy-700">
                  Know the score before you apply.
                </h3>
                <p className="mt-4 leading-relaxed text-navy-400">
                  The Skilled Migrant Category points calculator scores your client against the
                  current threshold in real time. Qualifications, work experience, age, salary,
                  and regional employment &mdash; weighted and totalled instantly. Identify gaps
                  and plan the fastest path to selection.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card">
                <p className="text-xs font-semibold uppercase tracking-widest text-forest-600">Partnership visas</p>
                <h3 className="mt-4 font-serif text-headline text-navy-700">
                  Document checklists that leave nothing to chance.
                </h3>
                <p className="mt-4 leading-relaxed text-navy-400">
                  Partnership visa applications live or die on evidence. The platform generates
                  tailored document checklists based on relationship type and duration, tracks
                  evidence collection progress, and flags gaps before submission.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card">
                <p className="text-xs font-semibold tracking-widest text-purple-400">INZ policy tracking</p>
                <h3 className="mt-4 font-serif text-headline text-navy-700">
                  Policy changes, the moment they happen.
                </h3>
                <p className="mt-4 leading-relaxed text-navy-400">
                  Immigration instructions, operational manuals, and ministerial directives &mdash;
                  monitored and summarised automatically. When a change affects your open cases,
                  you know immediately. No more discovering policy shifts from a declined application.
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
              Every NZ visa type. Covered.
            </h2>
          </Reveal>
          <div className="mx-auto mt-16 grid max-w-3xl gap-3 sm:grid-cols-2">
            {[
              { title: "AEWV", desc: "Accreditation, job check, and work visa in one workflow" },
              { title: "Skilled Migrant Category", desc: "Points calculator and EOI management" },
              { title: "Partnership visas", desc: "Evidence checklists and timeline tracking" },
              { title: "Student visas", desc: "Enrolment verification and condition monitoring" },
              { title: "Investor 1 & 2", desc: "Investment tracking and compliance reporting" },
              { title: "Working Holiday", desc: "Eligibility checks and application management" },
              { title: "Employer accreditation", desc: "Renewal tracking and compliance audits" },
              { title: "Marco for NZ immigration", desc: "INZ instructions and policy research with citations" },
              { title: "Visitor visas", desc: "Purpose-specific checklists and bona fide checks" },
              { title: "Residence from work", desc: "Pathway tracking from work visa to residence" },
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
      <FAQ items={faqs} heading="New Zealand immigration FAQs." />

      <div className="h-px bg-navy-100 mx-auto max-w-sm" />

      {/* CTA */}
      <section className="relative py-32 sm:py-44" aria-label="Get started">
        <Container className="relative text-center">
          <Reveal>
            <h2 className="text-display font-serif text-forest-500">
              New Zealand immigration
              <br />
              you can stake your practice on.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-xl text-navy-400">
              From AEWV to residence. One platform. Zero missed deadlines.
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
