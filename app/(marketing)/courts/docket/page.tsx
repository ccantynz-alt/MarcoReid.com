import type { Metadata } from "next";
import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
import Reveal from "@/app/components/effects/Reveal";

export const metadata: Metadata = {
  title: "Marco Reid Docket \u2014 AI Scheduling for Courts",
  description:
    "Judicial calendars, conflict detection, jury management, interpreter coordination, and continuance tracking. The docket runs itself.",
};

export default function DocketPage() {
  return (
    <>
      <section className="relative flex min-h-[80vh] items-center justify-center">
        <Container className="text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-forest-600">
            Marco Reid Docket
          </p>
          <h1 className="mt-8 text-hero font-serif">
            <span className="text-forest-500">The docket</span>
            <br />
            <span className="text-navy-700">runs itself.</span>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-xl leading-relaxed text-navy-400">
            Judges&rsquo; calendars are run on whiteboards and Outlook. Continuances cascade.
            Interpreters double-book. Jury pools no-show. Marco Reid Docket replaces every
            scheduling tool a court owns with one intelligent calendar that detects conflicts
            before they happen.
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
              { title: "Judge calendars", desc: "Bench schedules across every division" },
              { title: "Conflict detection", desc: "Counsel availability, witness conflicts, holidays" },
              { title: "Continuance tracking", desc: "Cascading reschedules across linked matters" },
              { title: "Jury management", desc: "Summons, voir dire, payment, no-show flags" },
              { title: "Interpreter booking", desc: "Auto-match by language and certification" },
              { title: "Courtroom assignment", desc: "Optimised by case type and capacity" },
              { title: "Docket publication", desc: "Public-facing daily docket, auto-updated" },
              { title: "SMS reminders", desc: "Defendants, jurors, witnesses — multi-language" },
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
