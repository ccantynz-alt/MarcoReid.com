import type { Metadata } from "next";
import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
import Reveal from "@/app/components/effects/Reveal";

export const metadata: Metadata = {
  title: "Case Study \u2014 Chen & Associates Immigration Law",
  description:
    "How a 14-lawyer immigration firm cut visa research from 4.5 hours to 25 seconds per matter, recovering 1,530 billable hours per year with Marco Reid.",
};

const metrics = [
  { value: "4.5 hrs \u2192 25s", label: "Research time per visa matter" },
  { value: "1,530", label: "Hours recovered annually" },
  { value: "340", label: "Matters processed monthly" },
  { value: "$486K", label: "Recovered billable capacity" },
];

const timeline = [
  {
    date: "July 2025",
    event: "Initial discovery call. 14 lawyers; 3,900 matters per year.",
  },
  {
    date: "August 2025",
    event: "2-week pilot on H-1B intake team. 60% of queries answered without escalation on day one.",
  },
  {
    date: "September 2025",
    event: "Firm-wide rollout. Replaced two legacy research subscriptions in the same month.",
  },
  {
    date: "January 2026",
    event: "First quarterly review: 1,530 hours recovered since rollout. Two senior paralegals shifted to client-facing advisory work.",
  },
];

export default function ImmigrationFirmCaseStudyPage() {
  return (
    <>
      <section className="bg-navy-500 pt-32 pb-20 sm:pt-40 sm:pb-28">
        <Container className="text-center">
          <p className="text-sm font-semibold tracking-wider text-forest-300">
            Case Study &middot; Immigration
          </p>
          <h1 className="mt-6 font-serif text-hero text-white">
            Chen & Associates
            <br />
            Immigration Law
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-xl text-navy-200">
            How a 14-lawyer firm reduced visa research from 4.5 hours to 25
            seconds per matter &mdash; and recovered 1,530 billable hours a year.
          </p>
        </Container>
      </section>

      <section className="py-24 sm:py-36">
        <Container>
          <div className="mx-auto max-w-3xl space-y-16">
            <Reveal>
              <h2 className="font-serif text-display text-navy-800">
                The challenge.
              </h2>
              <div className="mt-6 space-y-5 text-lg leading-relaxed text-navy-500">
                <p>
                  Chen & Associates handles H-1B, L-1, O-1, and EB-5 matters for
                  technology employers and their families across 34 US consulates.
                  Each matter requires research into the current USCIS policy
                  manual, recent AAO precedent decisions, consulate-specific
                  practice notes, and country-condition reports &mdash; often all
                  four in the same filing.
                </p>
                <p>
                  By early 2025 the average senior associate was spending 4.5 hours
                  on research per matter. Across 340 matters a month, that was
                  18,360 hours a year &mdash; mostly repetitive lookups that never
                  produced a novel legal argument.
                </p>
                <p>
                  Managing partner David Chen wanted the firm&rsquo;s experts doing
                  expert work. He did not want to hire five more associates to
                  absorb volume that was growing 22 percent year-on-year.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <h2 className="font-serif text-display text-navy-800">
                The solution.
              </h2>
              <div className="mt-6 space-y-5 text-lg leading-relaxed text-navy-500">
                <p>
                  The firm rolled out Marco Reid across the entire practice in
                  September 2025. Marco was configured with the firm&rsquo;s
                  internal precedent library, every AAO decision from 2015
                  onwards, and the live USCIS policy manual as primary sources.
                </p>
                <p>
                  Research queries that previously took an associate 4.5 hours
                  now return a drafted memo with verified citations in 25 seconds
                  on average. Every citation links back to the exact paragraph
                  of the source. Every memo is logged to the matter audit trail.
                </p>
                <p>
                  Intake flows were rebuilt around Marco. Paralegals now ask Marco
                  the initial eligibility and risk-flag questions directly inside
                  the matter workspace, and escalate to lawyers only when a
                  real legal judgement is required &mdash; rather than for
                  procedural lookups.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="font-serif text-display text-navy-800">Results.</h2>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {metrics.map((m) => (
                  <div
                    key={m.label}
                    className="rounded-2xl border border-navy-100 bg-white p-8 shadow-card"
                  >
                    <p className="font-serif text-4xl text-forest-600">{m.value}</p>
                    <p className="mt-2 text-sm text-navy-400">{m.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <figure className="rounded-2xl border border-navy-100 bg-navy-50 p-10">
                <blockquote className="font-serif text-2xl leading-snug text-navy-800">
                  &ldquo;We don&rsquo;t think of Marco as a research tool anymore.
                  It&rsquo;s a partner that never gets tired and never forgets an
                  AAO footnote. My associates are writing harder cases and
                  advising clients instead of chasing policy manual updates.&rdquo;
                </blockquote>
                <figcaption className="mt-6 text-sm text-navy-500">
                  <span className="font-semibold text-navy-700">David Chen</span>
                  <span> &mdash; Managing Partner, Chen & Associates Immigration Law</span>
                </figcaption>
              </figure>
            </Reveal>

            <Reveal delay={0.2}>
              <h2 className="font-serif text-display text-navy-800">Timeline.</h2>
              <div className="mt-8 space-y-6">
                {timeline.map((t) => (
                  <div key={t.date} className="flex gap-6 border-l-2 border-navy-100 pl-6">
                    <div className="w-32 shrink-0 text-sm font-semibold text-navy-700">
                      {t.date}
                    </div>
                    <p className="text-navy-500">{t.event}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="bg-navy-50 py-24 sm:py-36">
        <Container className="text-center">
          <Reveal>
            <h2 className="font-serif text-display text-navy-800">
              Ready to see what Marco Reid can do for your firm?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-navy-400">
              We onboard immigration practices in under two weeks, including
              precedent indexing and a dedicated solutions engineer.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button href="/contact" size="lg">
                Book a demo
              </Button>
              <Button href="/case-studies" variant="secondary" size="lg">
                Back to case studies
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
