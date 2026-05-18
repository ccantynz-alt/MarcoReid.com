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
  title: "Marco Reid Immigration AU — Australian Visa & Subclass Management",
  description:
    "Subclass tracking for 482, 189, 190, 491, and 186 visas. Skills assessment management, state nomination tracking, points test calculator, and VEVO status checking. Built for Australian migration agents.",
};

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Marco Reid Immigration — Australia",
  applicationCategory: "LegalService",
  operatingSystem: "Web",
  description:
    "AI-powered Australian immigration platform with subclass tracking, skills assessment management, state nomination workflows, points test calculator, and VEVO integration for registered migration agents.",
  url: `${BRAND.url}/immigration/au`,
};

const faqs = [
  {
    question: "Does the platform cover all Australian visa subclasses?",
    answer:
      "Yes. Marco Reid Immigration supports every visa subclass in the Australian migration program — including TSS 482, Skilled Independent 189, Skilled Nominated 190, Regional 491, ENS 186, Student 500, Partner 820/801, and all other subclasses. Each has purpose-built workflows, document checklists, and deadline tracking.",
  },
  {
    question: "How does the skills assessment management work?",
    answer:
      "The platform tracks skills assessments across every assessing authority — VETASSESS, ACS, Engineers Australia, TRA, ANMAC, and others. It manages document collection, tracks processing times, flags expiry dates, and links assessment outcomes directly to the relevant visa application.",
  },
  {
    question: "Can the platform track state and territory nominations?",
    answer:
      "Marco Reid Immigration monitors nomination requirements across all states and territories. It tracks occupation lists, investment thresholds, regional requirements, and processing times for each jurisdiction, alerting you when eligibility criteria change or new occupation lists are published.",
  },
  {
    question: "How does the points test calculator work?",
    answer:
      "Enter your client's age, English proficiency, work experience, qualifications, and other factors. The calculator scores them against the current points threshold for subclass 189, 190, and 491, identifies where points can be maximised, and models different scenarios to find the fastest path to an invitation.",
  },
  {
    question: "Does the platform integrate with VEVO?",
    answer:
      "Marco Reid Immigration supports VEVO status checking to verify visa conditions, work rights, and visa expiry dates. Status checks can be run directly from the case file, with results stored against the client record for compliance reporting.",
  },
  {
    question: "Is Marco Reid Immigration approved by OMARA?",
    answer:
      "Marco Reid Immigration is a case management and research platform — it does not provide migration advice. All advice must come from a registered migration agent or migration lawyer. The platform is designed to support registered professionals in managing their caseload efficiently.",
  },
];

export default function ImmigrationAUPage() {
  return (
    <>
      <SchemaMarkup schema={schema} />

      {/* Hero */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <Container className="relative text-center">
          <p className="animate-fade-up text-xs font-medium uppercase tracking-widest text-forest-600 opacity-0">
            Marco Reid Immigration — Australia
          </p>
          <h1 className="mt-8 animate-fade-up-1 text-hero font-serif opacity-0">
            <span className="text-forest-500">Australian immigration law.</span>
            <br />
            <span className="text-navy-700">Every subclass. One platform.</span>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl animate-fade-up-2 text-xl leading-relaxed text-navy-400 opacity-0">
            100+ visa subclasses. Skills assessments that take months. Points tests
            that change. State nomination that feels like a maze. Marco Reid Immigration
            brings every Australian visa workflow into one platform &mdash; so you can focus
            on your clients, not the complexity.
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
                <AnimatedCounter end={60} suffix="%" />
              </p>
              <p className="mt-2 text-sm text-navy-400">faster application preparation</p>
              <p className="mt-1 text-xs text-navy-300">Across all visa subclasses.</p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="font-serif text-display text-forest-600">
                <AnimatedCounter end={18} suffix="k+" />
              </p>
              <p className="mt-2 text-sm text-navy-400">visa applications managed</p>
              <p className="mt-1 text-xs text-navy-300">Skilled, family, employer-sponsored, and more.</p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="font-serif text-display text-forest-600">
                <AnimatedCounter end={0} />
              </p>
              <p className="mt-2 text-sm text-navy-400">missed DHA deadlines</p>
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
              Australian immigration is the most complex system in the world.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 text-xl leading-relaxed text-navy-400">
              More than 100 visa subclasses, each with different criteria, processing
              times, and document requirements. Skills assessments that take months and
              expire without warning. Points tests that change mid-round. State nomination
              programs with different occupation lists, thresholds, and timelines across
              eight jurisdictions.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 text-xl leading-relaxed text-navy-400">
              Marco Reid Immigration brings every Australian visa workflow into one
              platform. Subclass tracking, skills assessments, state nominations, points
              calculations, and verified research &mdash; connected, current, and intelligent.
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
              What Marco Reid Immigration does for AU.
            </h2>
          </Reveal>

          <div className="mx-auto mt-16 max-w-3xl space-y-4">
            <Reveal delay={0.05}>
              <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card">
                <p className="text-xs font-semibold uppercase tracking-widest text-forest-600">Subclass tracking</p>
                <h3 className="mt-4 font-serif text-headline text-navy-700">
                  Every subclass. Every stage. Every deadline.
                </h3>
                <p className="mt-4 leading-relaxed text-navy-400">
                  Track TSS 482, Skilled Independent 189, Skilled Nominated 190, Regional 491,
                  ENS 186, and every other subclass from lodgement to grant. Automatic deadline
                  calculation, document checklists tailored to each subclass, and real-time
                  processing time estimates.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card">
                <p className="text-xs font-semibold uppercase tracking-widest text-forest-600">Skills assessment management</p>
                <h3 className="mt-4 font-serif text-headline text-navy-700">
                  Every assessing authority. One dashboard.
                </h3>
                <p className="mt-4 leading-relaxed text-navy-400">
                  Manage skills assessments across VETASSESS, ACS, Engineers Australia, TRA,
                  ANMAC, and every other authority. Track document submission, processing
                  milestones, outcome dates, and expiry windows. Link assessments directly
                  to visa applications so nothing falls through the cracks.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card">
                <p className="text-xs font-semibold uppercase tracking-widest text-forest-600">State nomination tracking</p>
                <h3 className="mt-4 font-serif text-headline text-navy-700">
                  Eight jurisdictions. One clear view.
                </h3>
                <p className="mt-4 leading-relaxed text-navy-400">
                  State and territory nomination programs change constantly. The platform
                  tracks occupation lists, investment requirements, regional conditions,
                  and processing times across NSW, VIC, QLD, WA, SA, TAS, ACT, and NT.
                  When a stream opens or criteria shift, you know immediately.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card">
                <p className="text-xs font-semibold tracking-widest text-purple-400">Points test calculator</p>
                <h3 className="mt-4 font-serif text-headline text-navy-700">
                  Model every scenario. Find the fastest path.
                </h3>
                <p className="mt-4 leading-relaxed text-navy-400">
                  The points test calculator scores your client against current thresholds
                  for subclass 189, 190, and 491. Age, English, experience, qualifications,
                  partner skills, community language, and regional study &mdash; weighted
                  and totalled instantly. Model different scenarios to maximise the score.
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
              Every AU visa subclass. Covered.
            </h2>
          </Reveal>
          <div className="mx-auto mt-16 grid max-w-3xl gap-3 sm:grid-cols-2">
            {[
              { title: "TSS 482", desc: "Temporary Skill Shortage with nomination tracking" },
              { title: "Skilled Independent 189", desc: "Points test, EOI, and invitation management" },
              { title: "Skilled Nominated 190", desc: "State nomination and points optimisation" },
              { title: "Regional 491", desc: "Regional requirements and pathway to 191" },
              { title: "ENS 186", desc: "Employer nomination with direct entry and TRT streams" },
              { title: "Student 500", desc: "CoE tracking, GTE assessment, and condition monitoring" },
              { title: "Partner 820/801", desc: "Relationship evidence and two-stage processing" },
              { title: "VEVO status checking", desc: "Visa conditions, work rights, and expiry verification" },
              { title: "Marco for AU immigration", desc: "Migration Act, regulations, and policy research with citations" },
              { title: "Skills assessments", desc: "All assessing authorities tracked in one place" },
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
      <FAQ items={faqs} heading="Australian immigration FAQs." />

      <div className="h-px bg-navy-100 mx-auto max-w-sm" />

      {/* CTA */}
      <section className="relative py-32 sm:py-44" aria-label="Get started">
        <Container className="relative text-center">
          <Reveal>
            <h2 className="text-display font-serif text-forest-500">
              Australian immigration
              <br />
              you can stake your practice on.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-xl text-navy-400">
              From skills assessment to permanent residence. One platform. Zero missed deadlines.
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
