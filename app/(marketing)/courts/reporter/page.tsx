import type { Metadata } from "next";
import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
import Reveal from "@/app/components/effects/Reveal";

export const metadata: Metadata = {
  title: "Marco Reid Reporter \u2014 Real-Time AI Court Transcription",
  description:
    "End the court reporter shortage. Real-time AI transcription with speaker diarisation, legal terminology, certified output, and 100+ languages.",
};

export default function ReporterPage() {
  return (
    <>
      <section className="relative flex min-h-[80vh] items-center justify-center">
        <Container className="text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-forest-600">
            Marco Reid Reporter
          </p>
          <h1 className="mt-8 text-hero font-serif">
            <span className="text-forest-500">Real-time transcription.</span>
            <br />
            <span className="text-navy-700">Every word, every hearing.</span>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-xl leading-relaxed text-navy-400">
            The US is short more than 11,000 stenographers and the gap is widening every year.
            Marco Reid Reporter is the answer: real-time AI transcription trained on legal
            vocabulary, with speaker diarisation, certified output, and support for 100+ languages.
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
                Courts cannot find reporters.
              </h2>
              <p>
                There is an 11,000+ stenographer shortage nationwide, and it is getting worse
                every year. The average court reporter is over 55. Fewer than 300 new reporters
                graduate annually, while thousands retire. Courts across the country are canceling
                hearings, delaying depositions, and compromising the record because there simply
                are not enough reporters to go around.
              </p>
              <p>
                The cost is staggering. A human court reporter charges $300&ndash;$500 per day
                &mdash; when one is available. Many proceedings go entirely unrecorded because no
                reporter could be booked. In rural jurisdictions, courts rely on aging digital
                recording equipment with no real-time capability and no searchable output.
                Attorneys wait weeks or months for transcripts. Appeals stall. Justice slows to
                a crawl.
              </p>
              <p>
                Marco Reid Reporter solves the shortage by putting AI transcription in every
                courtroom. Real-time, legally certified, speaker-identified, and searchable the
                moment the hearing ends &mdash; at a fraction of the cost.
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
                title: "AI transcribes in real time",
                desc: "Marco listens to courtroom audio and transcribes with sub-second latency. Legal vocabulary &mdash; case names, statutory citations, Latin terms, court formalities &mdash; is recognized with precision that general-purpose tools cannot match.",
              },
              {
                step: "2",
                title: "Speaker identification",
                desc: "The system separates judge, counsel, witness, and interpreter automatically. Each speaker is labeled in the transcript so the record is clear, organized, and ready for citation without manual cleanup.",
              },
              {
                step: "3",
                title: "Certified, searchable output",
                desc: "The moment the hearing ends, a certified transcript is available &mdash; timestamped, searchable, and exportable in every standard format. No weeks-long turnaround. No per-page fees. Attorneys can cite testimony within hours.",
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
              { title: "Real-time transcript", desc: "Sub-second latency on the bench monitor" },
              { title: "Speaker diarisation", desc: "Judge, counsel, witness, interpreter — labelled" },
              { title: "Legal terminology", desc: "Trained on case law, statutes, Latin terms, court formalities" },
              { title: "Certified output", desc: "Court-admissible PDF with chain of custody" },
              { title: "100+ languages", desc: "Live translation for interpreter coverage" },
              { title: "Search & timestamps", desc: "Jump to any utterance by keyword or time" },
              { title: "Redaction tools", desc: "Auto-flag PII for sealed proceedings" },
              { title: "Offline mode", desc: "Records and transcribes without internet" },
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

      <section className="bg-navy-50/40 py-32" aria-label="The stenographer shortage is real">
        <Container>
          <Reveal>
            <h2 className="text-center text-display font-serif text-navy-700">
              The stenographer shortage is real.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-center text-lg text-navy-400">
              There are more than 11,000 unfilled court reporter positions nationwide. Courts
              cancel hearings, delay trials, and compromise the record because there simply
              aren&rsquo;t enough stenographers to go around. The pipeline is shrinking, not growing.
              Marco Reid Reporter is the path forward.
            </p>
          </Reveal>
          <div className="mx-auto mt-16 grid max-w-4xl gap-6 md:grid-cols-3">
            {[
              {
                title: "AI transcription at 1/10th the cost",
                desc: "A human court reporter costs $300&ndash;$500 per day &mdash; when you can find one. Marco Reid Reporter delivers real-time, legally certified transcription at a fraction of the cost, freeing budgets for the courtroom services that need them most.",
              },
              {
                title: "100+ languages for diverse communities",
                desc: "In courtrooms across the country, parties speak Mandarin, Spanish, Arabic, Tagalog, and dozens more. Marco transcribes and translates in real time, giving every participant equal access to the record &mdash; no interpreter scheduling delays.",
              },
              {
                title: "Instant searchable transcripts",
                desc: "Traditional court reporting means weeks of turnaround for a transcript. With Marco, the searchable, time-stamped record is available the moment the hearing ends. Attorneys can cite testimony within hours, not months. Appeals move faster.",
              },
            ].map((card) => (
              <Reveal key={card.title} delay={0.05}>
                <div className="rounded-xl border border-navy-100 bg-white p-8 shadow-card">
                  <p className="text-lg font-semibold text-navy-700">{card.title}</p>
                  <p className="mt-3 text-sm leading-relaxed text-navy-400">{card.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-32" aria-label="Impact">
        <Container className="text-center">
          <Reveal>
            <p className="mx-auto max-w-3xl text-2xl font-serif leading-snug text-navy-700 md:text-3xl">
              &ldquo;The average court reporter earns <span className="text-forest-500">$300&ndash;$500/day</span>.
              There are <span className="text-forest-500">11,000+</span> unfilled positions
              nationwide. AI transcription makes justice accessible again.&rdquo;
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
              Marco Reid Reporter deploys on existing courtroom audio infrastructure &mdash; no
              new hardware required. Start with a single courtroom or roll it out across every
              division. The pilot is free, installs in a day, and produces court-admissible
              transcripts from day one.
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
