import type { Metadata } from "next";
import { BRAND } from "@/lib/constants";
import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
import SchemaMarkup from "@/app/components/shared/SchemaMarkup";
import AnimatedCounter from "@/app/components/effects/AnimatedCounter";
import Reveal from "@/app/components/effects/Reveal";

/* ------------------------------------------------------------------ */
/*  Metadata                                                           */
/* ------------------------------------------------------------------ */

export const metadata: Metadata = {
  title:
    "Marco Reid Docket — AI Scheduling and Calendar Management for Courts",
  description:
    "Judicial calendar management, intelligent conflict detection, continuance cascade tracking, jury management, interpreter coordination, and courtroom assignment optimization. The docket runs itself.",
  keywords: [
    "court docket management",
    "judicial scheduling software",
    "court calendar management",
    "jury management system",
    "continuance tracking",
    "interpreter coordination courts",
    "courtroom scheduling",
    "judicial conflict detection",
    "court case scheduling software",
    "docket management system",
    "court administration software",
    "jury summons tracking",
    "voir dire scheduling",
    "courtroom assignment optimization",
    "multi-courthouse scheduling",
    "court SMS reminders",
    "public docket publication",
    "emergency hearing scheduling",
    "court caseload analytics",
    "time to disposition reporting",
  ],
  openGraph: {
    title: "Marco Reid Docket — AI Scheduling for Courts",
    description:
      "Judicial calendars, conflict detection, jury management, interpreter coordination, and continuance tracking. The docket runs itself.",
    url: `${BRAND.url}/courts/docket`,
    type: "website",
  },
};

/* ------------------------------------------------------------------ */
/*  Schema                                                             */
/* ------------------------------------------------------------------ */

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Marco Reid Docket",
  applicationCategory: "GovernmentApplication",
  operatingSystem: "Web",
  description:
    "AI-powered court scheduling and docket management. Judicial calendars, conflict detection, continuance cascade tracking, jury management, interpreter coordination, courtroom assignment, public docket publication, and multi-language reminders.",
  url: `${BRAND.url}/courts/docket`,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "Pilot programme available for qualifying courts",
  },
  featureList: [
    "Judicial calendar management across divisions",
    "Intelligent conflict detection",
    "Continuance cascade tracking",
    "Jury management and summons tracking",
    "Interpreter coordination",
    "Courtroom assignment optimization",
    "Public docket publication",
    "SMS and email reminders in multiple languages",
    "Attorney availability integration",
    "Caseload analytics and reporting",
    "Emergency scheduling",
    "Multi-courthouse support",
  ],
};

/* ------------------------------------------------------------------ */
/*  Feature data                                                       */
/* ------------------------------------------------------------------ */

const features = [
  {
    label: "Calendaring",
    title: "Judicial calendar management across divisions",
    description:
      "Every judge, every division, every courtroom — visible in a single unified calendar. Criminal, civil, family, probate, and traffic divisions each have their own scheduling rules, time blocks, and preferences. Marco Reid Docket absorbs those rules and presents one coherent view across the entire court. Judges see their own bench schedule. Court administrators see everything. No more walking paper calendars between offices.",
  },
  {
    label: "Conflict detection",
    title: "Intelligent conflict detection",
    description:
      "Before a hearing is set, Docket checks every dimension for conflicts: Is counsel already scheduled in another courtroom? Is the defendant scheduled for a different matter the same morning? Is a key witness unavailable? Is the date a court holiday or judicial conference day? Is the courtroom undergoing maintenance? Conflicts surface before the hearing is set — not the morning of, when the courtroom is empty and the judge is waiting.",
  },
  {
    label: "Continuances",
    title: "Continuance cascade tracking",
    description:
      "When a hearing is continued, it is never just one hearing. The motion hearing moves, so the pretrial conference moves, so the trial date moves, so the expert witness availability window shifts, so the court reporter assignment changes. In legacy systems, a clerk manually traces every downstream dependency. In Docket, one continuance triggers an automatic cascade — every linked hearing, deadline, and resource assignment updates in seconds. The clerk reviews and confirms. The system does the work.",
  },
  {
    label: "Jury management",
    title: "Jury management — summons to verdict",
    description:
      "Jury administration is one of the most labour-intensive operations in any court. Docket manages the full lifecycle: summons generation, mailing and tracking, qualification questionnaire processing, excuse and deferral handling, panel assignment, voir dire scheduling, daily attendance tracking, juror payment calculation, and no-show flagging with automated follow-up notices. Jury pools are right-sized based on historical yield rates so courts stop summoning 300 people when they need 40.",
  },
  {
    label: "Interpreters",
    title: "Interpreter coordination",
    description:
      "A Spanish-language defendant scheduled for a 9:00 a.m. hearing in Division 3 and a Mandarin-speaking witness scheduled at 9:30 a.m. in Division 7 need different interpreters with different certifications. Docket auto-matches interpreters by language, certification level, and availability. When a hearing is rescheduled, the interpreter assignment follows. When an interpreter cancels, Docket immediately searches the pool for a qualified replacement and alerts the court coordinator.",
  },
  {
    label: "Courtroom assignment",
    title: "Courtroom assignment optimization",
    description:
      "Not every case belongs in every courtroom. A multi-defendant criminal trial needs a large courtroom with a jury box. A status conference needs a small hearing room. A high-security case needs a courtroom with a secure defendant entrance. Docket matches case type, expected duration, participant count, security requirements, and ADA accessibility needs to available courtrooms — maximizing utilization while ensuring no courtroom sits empty while attorneys wait in the hallway.",
  },
  {
    label: "Public docket",
    title: "Public docket publication",
    description:
      "Every court is required to publish its daily docket. Most do it by printing a PDF and taping it to the courthouse wall, or posting a static file to a website that has not been updated since 2009. Docket auto-generates a clean, searchable, ADA-accessible public docket page updated in real time. Attorneys, journalists, and the public can search by case number, party name, judge, courtroom, or hearing type. No more calling the clerk to ask when your case is on.",
  },
  {
    label: "Reminders",
    title: "SMS and email reminders in multiple languages",
    description:
      "Failure to appear is the single largest source of wasted court time. A defendant who does not show means a bench warrant, a new hearing, and a cascading delay. Docket sends automated reminders via SMS and email — in the recipient's preferred language — at configurable intervals before the hearing date. Defendants, jurors, witnesses, and victims all receive reminders tailored to their role. Courts using automated reminders report up to 40% fewer failures to appear.",
  },
  {
    label: "Attorney sync",
    title: "Attorney availability integration",
    description:
      "Attorneys using Marco Reid Legal have real-time calendar data inside the platform. When a court schedules a hearing, Docket can check the attorney's availability before setting the date — eliminating the back-and-forth phone calls and last-minute continuance requests that clog every docket. For attorneys not on Marco Reid, standard calendar feed integration (iCal, Google Calendar, Outlook) provides the same visibility. The scheduling loop closes in seconds instead of days.",
  },
  {
    label: "Analytics",
    title: "Statistical reporting and caseload analytics",
    description:
      "Court administrators are required to report on caseload metrics: time to disposition, clearance rates, age of pending cases, continuance rates by case type, judge-level throughput. Today those reports are compiled manually from data extracted to spreadsheets. Docket generates them automatically from live scheduling data — real-time dashboards for administrators, monthly reports for judicial councils, and annual reports for state court administrator offices. No manual data entry. No stale numbers.",
  },
  {
    label: "Emergency scheduling",
    title: "Emergency scheduling — TROs, expedited motions, emergency hearings",
    description:
      "A temporary restraining order cannot wait for the regular docket cycle. An emergency custody hearing needs a courtroom today. An expedited bail review needs a judge within hours. Docket includes a dedicated emergency scheduling workflow that finds the first available judge with jurisdiction, an open courtroom, and courtroom staff — then books it, notifies all parties, and publishes the hearing to the docket. Emergency scheduling that used to require four phone calls and a hand-delivered order happens in under a minute.",
  },
  {
    label: "Multi-courthouse",
    title: "Multi-courthouse support",
    description:
      "Many jurisdictions operate from multiple courthouse locations — a main courthouse, annexes, satellite offices, and occasionally rented space for overflow. Docket manages all locations as a unified system. A judge sitting in the annex on Tuesday and the main courthouse on Thursday has one calendar. A courtroom in the satellite that is only available on Mondays is visible to every scheduler. Cross-location conflicts are detected automatically. One jurisdiction, one system, regardless of how many buildings it occupies.",
  },
];

/* ------------------------------------------------------------------ */
/*  Integration data                                                   */
/* ------------------------------------------------------------------ */

const integrations = [
  {
    product: "Marco Reid Reporter",
    connection:
      "When a hearing is scheduled, Reporter automatically assigns transcription resources. Continuances cascade to Reporter assignments. Every hearing has a transcript — no separate booking required.",
  },
  {
    product: "Marco Reid Filings",
    connection:
      "E-filed motions that require a hearing trigger automatic scheduling suggestions. Judges see the motion and the proposed hearing date in one view. Filing deadlines auto-calculate from the hearing date.",
  },
  {
    product: "Marco Reid Bench",
    connection:
      "Judges reviewing their daily docket can pull up case research, prior rulings, and sentencing data directly from the calendar view. The docket is not just a schedule — it is a launchpad for preparation.",
  },
  {
    product: "Marco Reid Public",
    connection:
      "The public-facing docket page, livestreaming schedule, and transcript publication all draw from Docket data. One source of truth, zero manual duplication.",
  },
  {
    product: "Marco Reid Legal",
    connection:
      "Attorney calendars sync bidirectionally. Court deadlines calculated from hearing dates push directly into the attorney's matter timeline. Court-rules calendaring and Docket speak the same language.",
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function DocketPage() {
  return (
    <>
      <SchemaMarkup schema={schema} />

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section
        className="relative bg-navy-500 pt-32 pb-20 sm:pt-40 sm:pb-28"
        aria-label="Marco Reid Docket hero"
      >
        <Container className="relative text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-forest-400">
            Marco Reid Docket
          </p>
          <h1 className="mt-8 text-hero font-serif text-white">
            The docket runs itself.
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-xl leading-relaxed text-navy-200">
            Judges&rsquo; calendars live on whiteboards and Outlook. Continuances cascade
            through paper trails. Interpreters double-book. Jury pools no-show.
            Marco Reid Docket replaces every scheduling tool a court owns with one
            intelligent calendar that detects conflicts before they happen and resolves
            them before anyone notices.
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Button href="/courts/pilot" size="lg" variant="secondary">
              Request a pilot
            </Button>
            <Button href="/courts" size="lg" variant="ghost" className="text-white hover:text-forest-300">
              Back to Courts
            </Button>
          </div>
        </Container>
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -top-1/2 left-1/2 h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-forest-500/5 blur-3xl" />
        </div>
      </section>

      {/* ── The Problem ───────────────────────────────────────── */}
      <section className="py-24 sm:py-36" aria-label="Why court scheduling is broken">
        <Container narrow>
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-widest text-forest-600">
              The problem
            </p>
            <h2 className="mt-6 text-display font-serif text-navy-700">
              Court scheduling is broken in every jurisdiction on earth.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 text-lg leading-relaxed text-navy-400">
              A single continuance in a criminal matter triggers a chain reaction: the
              pretrial conference shifts, the trial date moves, the expert witness window
              closes, the court reporter reassignment fails, and three other hearings
              that depended on that courtroom are now homeless. In most courts, a clerk
              discovers this cascade by hand — tracing dependencies across paper
              calendars, sticky notes, and an Outlook account shared between four people.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 text-lg leading-relaxed text-navy-400">
              Interpreters are double-booked because no system cross-references language
              needs against availability across courtrooms. Jury pools are over-summoned
              because historical yield data lives in a spreadsheet nobody updates. Conflict
              detection is nonexistent — attorneys discover they are scheduled in two
              courtrooms simultaneously when they arrive at the courthouse. Emergency
              hearings require four phone calls and a hand-delivered order because the
              scheduling system cannot find an open courtroom in real time.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 text-lg leading-relaxed text-navy-400">
              Every one of these failures wastes judicial time, delays justice, and costs
              the public money. Marco Reid Docket eliminates all of them — not with
              incremental improvements to a broken process, but by replacing the process
              entirely with an intelligent system that understands how courts actually
              operate.
            </p>
          </Reveal>
        </Container>
      </section>

      <div className="mx-auto h-px max-w-sm bg-navy-100" />

      {/* ── Stats ─────────────────────────────────────────────── */}
      <section className="py-24 sm:py-36" aria-label="Impact metrics">
        <Container>
          <Reveal>
            <h2 className="text-center text-display font-serif text-navy-700">
              What changes when the docket is intelligent.
            </h2>
          </Reveal>
          <div className="mt-16 grid gap-8 text-center sm:grid-cols-3">
            <Reveal delay={0.1}>
              <p className="font-serif text-display text-forest-600">
                <AnimatedCounter end={40} suffix="%" />
              </p>
              <p className="mt-2 text-sm font-medium text-navy-600">
                Reduction in continuances
              </p>
              <p className="mt-1 max-w-xs mx-auto text-xs leading-relaxed text-navy-400">
                Conflict detection catches scheduling collisions before they become
                continuance requests. Fewer continuances means faster case resolution.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="font-serif text-display text-navy-700">
                <AnimatedCounter end={0} suffix=" double-bookings" />
              </p>
              <p className="mt-2 text-sm font-medium text-navy-600">
                Zero double-bookings
              </p>
              <p className="mt-1 max-w-xs mx-auto text-xs leading-relaxed text-navy-400">
                Every hearing is checked against every participant, every courtroom,
                and every resource before it is confirmed. Conflicts are structurally
                impossible.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="font-serif text-display text-forest-600">
                <AnimatedCounter end={90} suffix="%" />
              </p>
              <p className="mt-2 text-sm font-medium text-navy-600">
                Juror compliance rate
              </p>
              <p className="mt-1 max-w-xs mx-auto text-xs leading-relaxed text-navy-400">
                Automated multi-language reminders via SMS and email bring juror
                appearance rates from industry averages of 50&ndash;60% to above 90%.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <div className="mx-auto h-px max-w-sm bg-navy-100" />

      {/* ── Features (detailed blocks) ────────────────────────── */}
      <section className="py-24 sm:py-36" aria-label="Docket features">
        <Container>
          <Reveal>
            <p className="text-center text-xs font-medium uppercase tracking-widest text-forest-600">
              Twelve capabilities. One calendar.
            </p>
            <h2 className="mt-6 text-center text-display font-serif text-navy-700">
              Everything a court docket needs.
            </h2>
          </Reveal>

          <div className="mx-auto mt-16 max-w-4xl space-y-6">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={0.05 * (i % 6)}>
                <div className="rounded-2xl border border-navy-100 bg-white p-8 shadow-card sm:p-10">
                  <div className="flex items-baseline justify-between gap-4">
                    <p className="text-xs font-semibold uppercase tracking-widest text-forest-600">
                      {f.label}
                    </p>
                    <p className="hidden text-xs text-navy-300 sm:block">
                      {String(i + 1).padStart(2, "0")} / {features.length}
                    </p>
                  </div>
                  <h3 className="mt-4 font-serif text-headline text-navy-700">
                    {f.title}
                  </h3>
                  <p className="mt-4 leading-relaxed text-navy-400">
                    {f.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <div className="mx-auto h-px max-w-sm bg-navy-100" />

      {/* ── Platform integration ──────────────────────────────── */}
      <section className="py-24 sm:py-36" aria-label="Platform integration">
        <Container>
          <Reveal>
            <p className="text-center text-xs font-medium uppercase tracking-widest text-forest-600">
              One platform
            </p>
            <h2 className="mt-6 text-center text-display font-serif text-navy-700">
              Docket does not live in isolation.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed text-navy-400">
              Every Marco Reid Courts product shares a common data layer. When Docket
              schedules a hearing, the rest of the platform already knows.
            </p>
          </Reveal>

          <div className="mx-auto mt-16 max-w-4xl space-y-4">
            {integrations.map((item, i) => (
              <Reveal key={item.product} delay={0.08 * i}>
                <div className="rounded-xl border border-navy-100 bg-white p-8 shadow-card">
                  <h3 className="font-serif text-headline text-navy-700">
                    {item.product}
                  </h3>
                  <p className="mt-3 leading-relaxed text-navy-400">
                    {item.connection}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <div className="mx-auto h-px max-w-sm bg-navy-100" />

      {/* ── The vision ────────────────────────────────────────── */}
      <section className="py-24 sm:py-36" aria-label="The vision">
        <Container narrow>
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-widest text-forest-600">
              The vision
            </p>
            <h2 className="mt-6 text-display font-serif text-navy-700">
              A court that never loses a day to scheduling.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 text-lg leading-relaxed text-navy-400">
              Judicial time is the scarcest resource in the justice system. Every hour
              lost to a continuance, a double-booking, or an empty courtroom is an hour
              that a defendant, a victim, or a family waited for justice and did not
              receive it. The docket is not an administrative convenience. It is the
              circulatory system of the court.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 text-lg leading-relaxed text-navy-400">
              Marco Reid Docket treats it that way. Every hearing, every participant,
              every resource, every dependency — managed in one system that is smarter
              than any whiteboard, faster than any clerk with a phone, and more reliable
              than any shared Outlook calendar. The docket runs itself so the court can
              focus on what it exists to do: deliver justice.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section
        className="relative bg-navy-500 py-24 sm:py-36"
        aria-label="Request a pilot"
      >
        <Container className="relative text-center">
          <Reveal>
            <h2 className="text-display font-serif text-white">
              Run a pilot in your court.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-navy-200">
              Court procurement is relationship-driven. Tell us about your jurisdiction,
              your caseload, and your scheduling pain points. We will put a working pilot
              of Marco Reid Docket in your hands within 30 days — configured to your
              court&rsquo;s rules, divisions, and courtrooms.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-12 flex flex-wrap justify-center gap-4">
              <Button href="/courts/pilot" size="lg" variant="secondary">
                Request a pilot
              </Button>
              <Button href="/courts" size="lg" variant="ghost" className="text-white hover:text-forest-300">
                Back to Courts
              </Button>
            </div>
          </Reveal>
        </Container>
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -bottom-1/2 right-0 h-[600px] w-[600px] rounded-full bg-forest-500/5 blur-3xl" />
        </div>
      </section>
    </>
  );
}
