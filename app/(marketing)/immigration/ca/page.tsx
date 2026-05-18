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
  title: "Marco Reid Immigration CA — Express Entry & PNP Management",
  description:
    "Express Entry CRS calculator, PNP stream tracker, LMIA management, study permit to PGWP pipeline, and spousal sponsorship timelines. Built for Canadian immigration consultants and lawyers.",
};

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Marco Reid Immigration — Canada",
  applicationCategory: "LegalService",
  operatingSystem: "Web",
  description:
    "AI-powered Canadian immigration platform with Express Entry management, PNP stream tracking, LMIA workflows, CRS calculation, and verified IRCC policy research for regulated consultants and lawyers.",
  url: `${BRAND.url}/immigration/ca`,
};

const faqs = [
  {
    question: "Does the platform cover all Canadian immigration pathways?",
    answer:
      "Yes. Marco Reid Immigration supports every IRCC program — including Express Entry (Federal Skilled Worker, Canadian Experience Class, Federal Skilled Trades), Provincial Nominee Programs, LMIA work permits, PGWP, student permits, spousal sponsorship, and Start-up Visa. Each pathway has purpose-built workflows, document checklists, and deadline tracking.",
  },
  {
    question: "How does the Express Entry CRS calculator work?",
    answer:
      "Enter your client's age, education, language scores, work experience, and other factors. The calculator produces a Comprehensive Ranking System score, compares it against recent draw cut-offs, and models scenarios — additional language tests, Canadian experience, provincial nomination — to find the fastest path to an invitation to apply.",
  },
  {
    question: "Can the platform track all Provincial Nominee Programs?",
    answer:
      "Marco Reid Immigration monitors PNP streams across all 13 provinces and territories. It tracks eligibility criteria, occupation lists, intake windows, and processing times for each stream. When a stream opens, closes, or changes criteria, the platform alerts you and flags affected clients automatically.",
  },
  {
    question: "How does the LMIA management work?",
    answer:
      "The platform manages the full Labour Market Impact Assessment process — from job advertisement evidence and recruitment effort documentation through to the ESDC application and work permit submission. It tracks processing times, flags expiring LMIAs, and manages the transition from LMIA-supported work permits to permanent residence.",
  },
  {
    question: "Does the platform track IRCC processing times and policy changes?",
    answer:
      "Marco monitors IRCC operational bulletins, program updates, ministerial instructions, and processing time estimates. When a policy change affects an open case or a processing time shifts significantly, the platform alerts you with a summary of what changed and which cases are impacted.",
  },
  {
    question: "Is Marco Reid Immigration approved by the College of Immigration and Citizenship Consultants?",
    answer:
      "Marco Reid Immigration is a case management and research platform — it does not provide immigration advice. All advice must come from a regulated Canadian immigration consultant (RCIC) or lawyer. The platform is designed to support regulated professionals in managing their caseload efficiently.",
  },
];

export default function ImmigrationCAPage() {
  return (
    <>
      <SchemaMarkup schema={schema} />

      {/* Hero */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <Container className="relative text-center">
          <p className="animate-fade-up text-xs font-medium uppercase tracking-widest text-forest-600 opacity-0">
            Marco Reid Immigration — Canada
          </p>
          <h1 className="mt-8 animate-fade-up-1 text-hero font-serif opacity-0">
            <span className="text-forest-500">Canadian immigration law.</span>
            <br />
            <span className="text-navy-700">Every pathway. Every province.</span>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl animate-fade-up-2 text-xl leading-relaxed text-navy-400 opacity-0">
            Express Entry draws change weekly. 80+ PNP streams across 13 provinces
            and territories. LMIA processing times are unpredictable. Marco Reid
            Immigration brings every Canadian immigration pathway into one platform
            &mdash; so you can focus on your clients, not the complexity.
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
                <AnimatedCounter end={50} suffix="%" />
              </p>
              <p className="mt-2 text-sm text-navy-400">faster application preparation</p>
              <p className="mt-1 text-xs text-navy-300">Across Express Entry and PNP streams.</p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="font-serif text-display text-forest-600">
                <AnimatedCounter end={22} suffix="k+" />
              </p>
              <p className="mt-2 text-sm text-navy-400">immigration applications managed</p>
              <p className="mt-1 text-xs text-navy-300">Express Entry, PNP, LMIA, and more.</p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="font-serif text-display text-forest-600">
                <AnimatedCounter end={0} />
              </p>
              <p className="mt-2 text-sm text-navy-400">missed IRCC deadlines</p>
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
              Canadian immigration has more pathways than any practitioner can track alone.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 text-xl leading-relaxed text-navy-400">
              Express Entry draw cut-offs shift every round. Provincial Nominee Programs
              run 80+ streams across 13 jurisdictions, each with different occupation lists,
              scoring criteria, and intake windows. LMIA processing times swing from weeks
              to months. Category-based draws target specific NOC codes. And IRCC portal
              changes break workflows without warning.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 text-xl leading-relaxed text-navy-400">
              Marco Reid Immigration brings every Canadian pathway into one platform.
              Express Entry, PNP, LMIA, study permits, sponsorship, and verified
              research &mdash; connected, current, and intelligent.
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
              What Marco Reid Immigration does for CA.
            </h2>
          </Reveal>

          <div className="mx-auto mt-16 max-w-3xl space-y-4">
            <Reveal delay={0.05}>
              <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card">
                <p className="text-xs font-semibold uppercase tracking-widest text-forest-600">Express Entry management</p>
                <h3 className="mt-4 font-serif text-headline text-navy-700">
                  CRS scores. Draw tracking. ITA to landing.
                </h3>
                <p className="mt-4 leading-relaxed text-navy-400">
                  Manage Express Entry profiles from initial CRS calculation through to
                  permanent residence. The platform tracks draw rounds, models score
                  improvements, monitors profile expiry dates, and manages the 60-day
                  ITA deadline with automatic document collection workflows. FSW, CEC,
                  and FST &mdash; all in one place.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card">
                <p className="text-xs font-semibold uppercase tracking-widest text-forest-600">PNP stream tracker</p>
                <h3 className="mt-4 font-serif text-headline text-navy-700">
                  13 provinces. 80+ streams. One dashboard.
                </h3>
                <p className="mt-4 leading-relaxed text-navy-400">
                  Track Provincial Nominee Program streams across every jurisdiction.
                  Ontario, BC, Alberta, Saskatchewan, Manitoba, Nova Scotia, and every
                  other province and territory &mdash; with eligibility criteria, occupation
                  lists, intake windows, and processing times updated in real time.
                  When a stream opens or criteria change, you know immediately.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card">
                <p className="text-xs font-semibold uppercase tracking-widest text-forest-600">LMIA management</p>
                <h3 className="mt-4 font-serif text-headline text-navy-700">
                  From recruitment to work permit. Streamlined.
                </h3>
                <p className="mt-4 leading-relaxed text-navy-400">
                  Manage the full LMIA lifecycle &mdash; job advertisement evidence,
                  recruitment effort documentation, wage analysis, ESDC submission,
                  and work permit application. Track processing times across streams,
                  flag expiring LMIAs, and manage the transition to permanent residence
                  through Express Entry or PNP.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card">
                <p className="text-xs font-semibold tracking-widest text-purple-400">CRS calculator</p>
                <h3 className="mt-4 font-serif text-headline text-navy-700">
                  Model every scenario. Maximise the score.
                </h3>
                <p className="mt-4 leading-relaxed text-navy-400">
                  The Comprehensive Ranking System calculator scores your client against
                  current draw thresholds. Age, education, language, experience, Canadian
                  experience, arranged employment, and provincial nomination &mdash;
                  weighted and totalled instantly. Model scenarios like retaking IELTS,
                  gaining Canadian experience, or securing a PNP nomination.
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
              Every Canadian pathway. Covered.
            </h2>
          </Reveal>
          <div className="mx-auto mt-16 grid max-w-3xl gap-3 sm:grid-cols-2">
            {[
              { title: "Express Entry (FSW)", desc: "CRS calculation, draw tracking, and ITA management" },
              { title: "Canadian Experience Class", desc: "NOC verification and Canadian work history tracking" },
              { title: "Federal Skilled Trades", desc: "Trade certification and job offer management" },
              { title: "Provincial Nominee Programs", desc: "80+ streams across 13 jurisdictions tracked" },
              { title: "PGWP", desc: "Study permit to post-graduation work permit pipeline" },
              { title: "LMIA work permits", desc: "Recruitment evidence, wage analysis, and ESDC submission" },
              { title: "Student permits", desc: "DLI verification, SDS processing, and condition tracking" },
              { title: "Spousal sponsorship", desc: "Timeline management and document checklists" },
              { title: "Start-up Visa", desc: "Designated organisation endorsement and business planning" },
              { title: "Marco for CA immigration", desc: "IRPA, IRPR, and IRCC policy research with citations" },
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
      <FAQ items={faqs} heading="Canadian immigration FAQs." />

      <div className="h-px bg-navy-100 mx-auto max-w-sm" />

      {/* CTA */}
      <section className="relative py-32 sm:py-44" aria-label="Get started">
        <Container className="relative text-center">
          <Reveal>
            <h2 className="text-display font-serif text-forest-500">
              Canadian immigration
              <br />
              you can stake your practice on.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-xl text-navy-400">
              From Express Entry to permanent residence. One platform. Zero missed deadlines.
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
