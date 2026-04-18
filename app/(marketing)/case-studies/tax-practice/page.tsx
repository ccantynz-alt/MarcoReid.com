import type { Metadata } from "next";
import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
import Reveal from "@/app/components/effects/Reveal";

export const metadata: Metadata = {
  title: "Case Study \u2014 Harper Tax Advisory LLC",
  description:
    "How a 32-person US tax advisory eliminated $312,000 in annual research subscriptions and redirected 2,200 senior hours from lookups to client advisory work with Marco Reid.",
};

const metrics = [
  { value: "$312K", label: "Annual research spend eliminated" },
  { value: "2,200", label: "Senior hours redirected to advisory" },
  { value: "6.2x", label: "Faster turnaround on tax memos" },
  { value: "3 \u2192 1", label: "Research platforms consolidated" },
];

const timeline = [
  {
    date: "March 2025",
    event: "Evaluation against two incumbent research platforms on the same 40 sample queries.",
  },
  {
    date: "May 2025",
    event: "Signed a firm-wide contract. Onboarded 32 staff across two offices in nine business days.",
  },
  {
    date: "August 2025",
    event: "Cancelled two of three research subscriptions after the first quarterly renewal window.",
  },
  {
    date: "April 2026",
    event: "Launched a new Private Client Advisory group staffed by three redirected senior associates.",
  },
];

export default function TaxPracticeCaseStudyPage() {
  return (
    <>
      <section className="bg-navy-500 pt-32 pb-20 sm:pt-40 sm:pb-28">
        <Container className="text-center">
          <p className="text-sm font-semibold tracking-wider text-forest-300">
            Case Study &middot; Tax & Accounting
          </p>
          <h1 className="mt-6 font-serif text-hero text-white">
            Harper Tax Advisory LLC
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-xl text-navy-200">
            How a mid-sized US tax advisory replaced three legacy research
            subscriptions and redirected 2,200 senior hours a year to client
            advisory work.
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
                  Harper Tax Advisory is a 32-person firm in Raleigh and Boston
                  serving high-net-worth individuals, venture-backed founders,
                  and multi-state passthroughs. The work demands fluency across
                  the Internal Revenue Code, Treasury regulations, revenue
                  rulings, private letter rulings, Tax Court memoranda, and 11
                  different state tax codes.
                </p>
                <p>
                  To cover that surface area the firm carried three separate
                  research subscriptions totalling $312,000 a year. Each had
                  different interfaces, different citation formats, and gaps
                  the others covered &mdash; so every senior memo was cross-checked
                  across all three.
                </p>
                <p>
                  Managing partner Lisa Harper described the problem bluntly:
                  &ldquo;We paid three vendors for the privilege of switching
                  browser tabs all day.&rdquo;
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <h2 className="font-serif text-display text-navy-800">
                The solution.
              </h2>
              <div className="mt-6 space-y-5 text-lg leading-relaxed text-navy-500">
                <p>
                  Harper ran a structured evaluation: the same 40 real client
                  questions put to Marco and the two strongest incumbents. Marco
                  returned a complete, cited answer in 38 of 40 queries. The two
                  incumbents combined returned 34.
                </p>
                <p>
                  What made the difference was not coverage &mdash; all three
                  platforms had the primary sources &mdash; it was reasoning.
                  Marco could chain a federal partnership question into a
                  North Carolina apportionment question into a Massachusetts
                  sourcing question in one conversation, with every citation
                  verified and every intermediate assumption surfaced.
                </p>
                <p>
                  The firm signed in May, onboarded 32 staff in nine business
                  days, and cancelled the two legacy subscriptions at the next
                  renewal. Senior associates stopped writing lookup memos and
                  started writing advisory memos.
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
                  &ldquo;We didn&rsquo;t replace a research tool. We replaced the
                  unbillable half of every senior associate&rsquo;s day. The new
                  Private Client Advisory group exists because Marco gave us the
                  hours to build it.&rdquo;
                </blockquote>
                <figcaption className="mt-6 text-sm text-navy-500">
                  <span className="font-semibold text-navy-700">Lisa Harper, CPA</span>
                  <span> &mdash; Managing Partner, Harper Tax Advisory LLC</span>
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
              We run a structured evaluation against your current research stack
              using your real queries. Most firms see their decision inside two
              weeks.
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
