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
    </>
  );
}
