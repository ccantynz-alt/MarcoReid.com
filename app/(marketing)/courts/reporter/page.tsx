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
    </>
  );
}
