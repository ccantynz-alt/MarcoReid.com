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

      {/* Problem narrative */}
      <section className="bg-navy-50 py-32" aria-label="The problem">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-3xl space-y-6 text-lg leading-relaxed text-navy-500">
              <h2 className="text-display font-serif text-navy-700">
                Scheduling should not be this hard.
              </h2>
              <p>
                Court scheduling is managed with decades-old software &mdash; or worse, whiteboards
                and shared Outlook calendars. Continuances pile up and cascade across linked matters.
                Interpreter bookings fall through because no system checks availability in real time.
                Parties are not notified until it is too late, and defendants miss hearings they never
                knew were moved.
              </p>
              <p>
                Public access to court schedules is nonexistent in many jurisdictions. Lawyers call
                the clerk&rsquo;s office to confirm hearing dates. Jurors show up on the wrong day.
                Witnesses wait for hours because the docket ran long and nobody sent an update. Every
                inefficiency costs the court money and erodes public trust in the system.
              </p>
              <p>
                Marco Reid Docket replaces every scheduling tool a court owns with one intelligent
                calendar. It detects conflicts before they happen, notifies every party automatically,
                and publishes a live public docket &mdash; so nobody has to call the clerk to find out
                when their case is being heard.
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
                title: "Schedule with conflict detection",
                desc: "Cases are scheduled with automatic checks against counsel availability, witness conflicts, interpreter bookings, courtroom capacity, and judicial holidays. Conflicts are flagged before they are created.",
              },
              {
                step: "2",
                title: "Notify parties and interpreters",
                desc: "Parties, lawyers, interpreters, and witnesses are notified via SMS and email in their preferred language. Continuances trigger cascading updates so no one is left in the dark.",
              },
              {
                step: "3",
                title: "Publish the docket in real time",
                desc: "A public-facing docket is auto-updated throughout the day. Anyone &mdash; press, public, parties &mdash; can see what is happening in any courtroom, right now.",
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

      {/* The scheduling nightmare, solved */}
      <section className="bg-navy-50/40 py-32" aria-label="The scheduling nightmare, solved">
        <Container>
          <Reveal>
            <h2 className="text-center text-display font-serif text-navy-700">
              The scheduling nightmare, solved.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-center text-lg text-navy-400">
              Today, court scheduling runs on phone calls, faxes, and manual calendars.
              Clerks spend hours coordinating parties who never answer. Continuances cascade
              across linked matters and nobody is notified until it is too late. Marco Reid
              Docket replaces all of it with intelligence.
            </p>
          </Reveal>
          <div className="mx-auto mt-16 grid max-w-4xl gap-6 md:grid-cols-3">
            {[
              {
                title: "AI-optimised scheduling",
                desc: "Marco analyses judge availability, courtroom capacity, case complexity, and lawyer schedules to propose optimal hearing times. Double-bookings and cascading continuances become impossible &mdash; the system will not allow a conflict to be created in the first place.",
              },
              {
                title: "Automated conflict detection",
                desc: "Every time a hearing is scheduled, moved, or cancelled, Marco checks against every linked matter, every party\u2019s calendar, every interpreter booking, and every courtroom reservation. Conflicts are flagged and resolved before they reach the docket &mdash; not after a defendant shows up to an empty courtroom.",
              },
              {
                title: "SMS & email reminders",
                desc: "Defendants, witnesses, jurors, and lawyers receive automated reminders via SMS and email in their preferred language &mdash; 7 days, 3 days, and 24 hours before their hearing. Courts using automated reminders report reducing no-show rates by 60% or more.",
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

      {/* Impact stat */}
      <section className="py-32" aria-label="Impact">
        <Container className="text-center">
          <Reveal>
            <p className="mx-auto max-w-3xl text-2xl font-serif leading-snug text-navy-700 md:text-3xl">
              &ldquo;Courts report <span className="text-forest-500">15&ndash;25%</span> no-show
              rates for hearings. Automated reminders reduce this to
              under <span className="text-forest-500">5%</span>.&rdquo;
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
              Marco Reid Docket integrates with your existing case management system and
              replaces the patchwork of scheduling tools your court relies on today. Start
              with a single division or roll it out court-wide &mdash; the pilot is free
              and takes less than a week to deploy.
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
