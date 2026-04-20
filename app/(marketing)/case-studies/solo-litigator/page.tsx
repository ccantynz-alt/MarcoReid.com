import type { Metadata } from "next";
import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
import Reveal from "@/app/components/effects/Reveal";

export const metadata: Metadata = {
  title: "Case Study \u2014 Katherine O\u2019Brien Trial Law",
  description:
    "How a sole litigator used Marco Reid and Courtroom mode to outprepare AmLaw 200 defence teams and win three consecutive jury verdicts against five-partner firms.",
};

const metrics = [
  { value: "3 \u2192 0", label: "Consecutive jury verdicts for plaintiff" },
  { value: "41 hrs", label: "Trial prep time, down from 180" },
  { value: "$1.9M", label: "Average verdict over the three trials" },
  { value: "1", label: "Lawyer on the case. Every time." },
];

const timeline = [
  {
    date: "October 2025",
    event: "Solo practice opens; Marco Reid and Courtroom mode deployed from day one.",
  },
  {
    date: "December 2025",
    event: "First verdict &mdash; $1.4M for a plaintiff in a commercial fraud trial against a 5-partner defence firm.",
  },
  {
    date: "February 2026",
    event: "Second verdict &mdash; $2.3M in a product-liability trial against AmLaw 200 counsel.",
  },
  {
    date: "April 2026",
    event: "Third verdict &mdash; $2.0M in an employment matter; opposing team of six associates.",
  },
];

export default function SoloLitigatorCaseStudyPage() {
  return (
    <>
      <section className="bg-navy-500 pt-32 pb-20 sm:pt-40 sm:pb-28">
        <Container className="text-center">
          <p className="text-sm font-semibold tracking-wider text-forest-300">
            Case Study &middot; Litigation
          </p>
          <h1 className="mt-6 font-serif text-hero text-white">
            Katherine O&rsquo;Brien
            <br />
            Trial Law
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-xl text-navy-200">
            A sole litigator, competing against five-partner defence firms, using
            Marco and Courtroom mode to outprepare teams 10 times her size &mdash;
            and winning three consecutive verdicts.
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
                  Katherine O&rsquo;Brien left a regional plaintiffs&rsquo; firm
                  in late 2025 to open a solo practice focused on complex
                  commercial and employment trials. Her caseload was strong on
                  day one. Her infrastructure was not.
                </p>
                <p>
                  A trial against a five-partner defence firm used to mean six
                  weeks of preparation by a team of four. Alone, she had neither
                  the hours nor the associates. Losing a motion in limine because
                  she missed a 2019 appellate panel decision was no longer a
                  team failure she could absorb. It was the case.
                </p>
                <p>
                  She needed a way for one person to match the research depth,
                  exhibit management, and cross-examination preparation of a full
                  trial team &mdash; without hiring one.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <h2 className="font-serif text-display text-navy-800">
                The solution.
              </h2>
              <div className="mt-6 space-y-5 text-lg leading-relaxed text-navy-500">
                <p>
                  Marco Reid and Courtroom mode were deployed on day one of the
                  practice. Marco indexed every deposition, pleading, and exhibit
                  in her first cases. Courtroom mode ran on her iPad during trial,
                  projecting exhibits to the courtroom display with tamper-evident
                  watermarking and queueing impeachment clips against witness
                  testimony in real time.
                </p>
                <p>
                  Trial preparation that had taken her team 180 hours in her
                  previous firm took 41 hours solo. Cross-examination outlines
                  that used to require a junior associate buried in transcripts
                  were generated from the full deposition corpus with
                  contradictions surfaced and time-stamped.
                </p>
                <p>
                  On the three trials that followed, she appeared opposite teams
                  of five and six lawyers. She won all three.
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
                  &ldquo;I walk into courtrooms outnumbered and out-resourced and
                  I have not lost yet. Marco is not a shortcut. It&rsquo;s the
                  reason I can outprepare a team of six and still sleep the night
                  before closing.&rdquo;
                </blockquote>
                <figcaption className="mt-6 text-sm text-navy-500">
                  <span className="font-semibold text-navy-700">Katherine O&rsquo;Brien</span>
                  <span> &mdash; Principal, Katherine O&rsquo;Brien Trial Law</span>
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
              Solo practice pricing starts at a fraction of a junior associate.
              Courtroom mode is included.
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
