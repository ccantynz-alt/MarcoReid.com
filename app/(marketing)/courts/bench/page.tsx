import type { Metadata } from "next";
import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
import Reveal from "@/app/components/effects/Reveal";

export const metadata: Metadata = {
  title: "Marco Reid Bench \u2014 Marco AI for Judges",
  description:
    "Verified case law and statute research, opinion drafting assistance, sentencing aids. Marco at the judge's elbow, never hallucinating.",
};

export default function BenchPage() {
  return (
    <>
      <section className="relative flex min-h-[80vh] items-center justify-center">
        <Container className="text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-forest-600">
            Marco Reid Bench
          </p>
          <h1 className="mt-8 text-hero font-serif">
            <span className="text-forest-500">Research and draft</span>
            <br />
            <span className="text-navy-700">from the bench.</span>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-xl leading-relaxed text-navy-400">
            Judges write opinions on Word with no research integration. Clerks scramble between
            Westlaw, Lexis, and the court library. Marco Reid Bench puts verified case law,
            statute, and policy research one keystroke away &mdash; with citation verification
            so nothing reaches the page that didn&rsquo;t come from a real source.
          </p>
          <div className="mt-12 flex justify-center gap-4">
            <Button href="/courts/pilot" size="lg">Request a pilot</Button>
            <Button href="/courts" variant="secondary" size="lg">Back to Courts</Button>
          </div>
        </Container>
      </section>

      {/* Problem narrative */}
      <section className="bg-navy-50 py-32" aria-label="The problem">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-3xl space-y-6 text-lg leading-relaxed text-navy-500">
              <h2 className="text-display font-serif text-navy-700">
                The bench deserves better tools.
              </h2>
              <p>
                Judges spend hours researching opinions, often relying on overworked clerks and
                tools that were designed for law firms, not the judiciary. Westlaw and Lexis are
                built for associates billing by the hour &mdash; not for a judge who needs an
                answer in chambers before a hearing resumes. The result is a research process
                that is slow, fragmented, and prone to citation errors that undermine the
                credibility of the court.
              </p>
              <p>
                No commercial software is built specifically for the bench. Judges draft opinions
                in Word with no integrated research. Clerks toggle between multiple platforms,
                manually verifying citations and cross-referencing case histories. Sentencing
                decisions are made with guidelines pulled from PDFs and spreadsheets. The gap
                between how judges work and how technology could support them has never been wider.
              </p>
              <p>
                Marco Reid Bench closes that gap. It is purpose-built for judicial chambers &mdash;
                verified research, AI-assisted opinion drafting, and sentencing aids in a single
                sovereign platform that never trains on your data and never hallucinates a citation.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* How it works */}
      <section className="py-32" aria-label="How it works">
        <Container>
          <Reveal>
            <h2 className="text-center text-display font-serif text-navy-700">
              How it works.
            </h2>
          </Reveal>
          <div className="mx-auto mt-16 grid max-w-4xl gap-12 md:grid-cols-3">
            {[
              {
                step: "1",
                title: "Query from chambers",
                desc: "The judge asks Marco a research question &mdash; natural language, no boolean operators. Verified citations with full-text sources are returned in seconds, not hours.",
              },
              {
                step: "2",
                title: "Draft with AI assistance",
                desc: "Marco assists in drafting bench memos and opinions in your chambers&rsquo; voice. Every citation is checked against the live corpus. Nothing reaches the page that isn&rsquo;t real.",
              },
              {
                step: "3",
                title: "Access sentencing aids and references",
                desc: "Look up sentencing guidelines, comparable case ranges, and multi-jurisdictional references &mdash; federal, state, foreign, and international law &mdash; from one interface.",
              },
            ].map((s) => (
              <Reveal key={s.step} delay={0.1}>
                <div className="text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-forest-500 text-lg font-bold text-white">
                    {s.step}
                  </div>
                  <p className="mt-4 text-lg font-semibold text-navy-700">{s.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-navy-400">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-32" aria-label="Features">
        <Container>
          <Reveal>
            <h2 className="text-center text-display font-serif text-navy-700">
              What it does.
            </h2>
          </Reveal>
          <div className="mx-auto mt-16 grid max-w-3xl gap-3 sm:grid-cols-2">
            {[
              { title: "Verified research", desc: "Case law, statute, regulation — every citation checked" },
              { title: "Opinion drafting", desc: "Bench memos and draft opinions in chambers' voice" },
              { title: "Sentencing aids", desc: "Guidelines lookup, comparable case ranges" },
              { title: "Bench book", desc: "Personalised checklists for routine motions" },
              { title: "Confidential by design", desc: "Sovereign deployment, zero training on chambers data" },
              { title: "Marco at the bench", desc: "Live research during hearings" },
              { title: "Multi-jurisdictional", desc: "Federal, state, foreign and international law" },
              { title: "Citation graph", desc: "Subsequent treatment, overruling, distinguishing" },
            ].map((f) => (
              <Reveal key={f.title} delay={0.05}>
                <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card">
                  <p className="font-semibold text-navy-700">{f.title}</p>
                  <p className="mt-2 text-sm text-navy-400">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Day on the bench */}
      <section className="bg-navy-50/40 py-32" aria-label="A day on the bench">
        <Container>
          <Reveal>
            <h2 className="text-center text-display font-serif text-navy-700">
              A day on the bench.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-center text-lg text-navy-400">
              From morning docket to final opinion, Marco Reid Bench works alongside chambers
              staff at every stage &mdash; never replacing judgment, always accelerating it.
            </p>
          </Reveal>
          <div className="mx-auto mt-16 grid max-w-4xl gap-6 md:grid-cols-3">
            {[
              {
                time: "8:30 AM",
                title: "Morning docket review",
                desc: "Before the first hearing, Marco has already prepared AI-generated briefs for every matter on the calendar. Key precedents are surfaced, conflicts are flagged, and the judge walks into the courtroom prepared \u2014 not scrambling.",
              },
              {
                time: "11:00 AM",
                title: "Mid-hearing citation check",
                desc: "Counsel cites a case the judge hasn\u2019t seen. One keystroke and Marco verifies it in real time \u2014 confirming it hasn\u2019t been overruled, distinguishing it from the facts at hand, and surfacing contrary authority. No recess needed.",
              },
              {
                time: "3:00 PM",
                title: "Opinion drafting",
                desc: "Back in chambers, the judge outlines a ruling. Marco drafts supporting analysis in chambers\u2019 voice, inserting verified citations, checking for subsequent treatment, and formatting to local rules. Hours of work become minutes of review.",
              },
            ].map((card) => (
              <Reveal key={card.title} delay={0.05}>
                <div className="rounded-xl border border-navy-100 bg-white p-8 shadow-card">
                  <p className="text-xs font-semibold uppercase tracking-widest text-forest-600">
                    {card.time}
                  </p>
                  <p className="mt-3 text-lg font-semibold text-navy-700">{card.title}</p>
                  <p className="mt-3 text-sm leading-relaxed text-navy-400">{card.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Impact stat */}
      <section className="py-32" aria-label="Impact">
        <Container className="text-center">
          <Reveal>
            <p className="mx-auto max-w-3xl text-2xl font-serif leading-snug text-navy-700 md:text-3xl">
              &ldquo;Judges report spending <span className="text-forest-500">40%</span> of their
              time on administrative tasks. Marco Reid Bench gives that time back.&rdquo;
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-12">
              <Button href="/courts/pilot" size="lg">
                Start a pilot in your courthouse
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Pilot CTA */}
      <section className="bg-navy-50 py-32" aria-label="Get started">
        <Container className="text-center">
          <Reveal>
            <h2 className="text-display font-serif text-navy-700">
              Request a pilot for your court.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-navy-400">
              Marco Reid Bench deploys on your infrastructure with zero data leaving chambers.
              We work with courts of every size &mdash; from single-judge rural courts to
              multi-division state systems. Start with a 90-day pilot and see the difference
              purpose-built judicial technology makes.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Button href="/courts/pilot" size="lg">Request a pilot</Button>
              <Button href="/contact" variant="secondary" size="lg">Talk to our team</Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
