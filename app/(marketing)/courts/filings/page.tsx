import type { Metadata } from "next";
import { BRAND } from "@/lib/constants";
import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
import SchemaMarkup from "@/app/components/shared/SchemaMarkup";
import Reveal from "@/app/components/effects/Reveal";

/* ------------------------------------------------------------------ */
/*  Metadata                                                          */
/* ------------------------------------------------------------------ */

export const metadata: Metadata = {
  title:
    "Marco Reid Filings — E-Filing That Actually Works | AI Court Filing Software",
  description:
    "A modern wrapper over PACER, CM/ECF, CE-File, Tyler Odyssey, and eCourts. AI form auto-fill for attorneys and pro se litigants. Pre-submission validation, fee waiver applications, rejection handling, batch filing, and an open API. Fewer rejections, faster processing, every jurisdiction.",
  keywords: [
    "e-filing software",
    "court filing software",
    "PACER alternative",
    "CM/ECF filing",
    "CE-File integration",
    "Tyler Odyssey integration",
    "eCourts filing",
    "pro se e-filing",
    "self-represented litigant filing",
    "AI court filing",
    "electronic court filing",
    "legal filing software",
    "court document filing",
    "IFP fee waiver application",
    "batch court filing",
    "filing rejection handling",
    "service of process tracking",
    "court filing API",
    "multi-jurisdiction e-filing",
    "Marco Reid Filings",
  ],
};

/* ------------------------------------------------------------------ */
/*  Schema                                                            */
/* ------------------------------------------------------------------ */

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Marco Reid Filings",
  applicationCategory: "GovernmentApplication",
  operatingSystem: "Web",
  description:
    "AI-powered e-filing platform that wraps PACER, CM/ECF, CE-File, Tyler Odyssey, and eCourts into a single interface. Pre-submission validation, pro se intake wizard, fee waiver applications, and an open API for practice management vendors.",
  url: `${BRAND.url}/courts/filings`,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "Pilot programme for courts — contact for details",
  },
};

/* ------------------------------------------------------------------ */
/*  Data                                                              */
/* ------------------------------------------------------------------ */

const features = [
  {
    title: "AI form auto-fill from intake",
    description:
      "Litigants answer plain-language questions about their case. Marco Reid maps those answers to the correct court forms, fills every required field, formats attachments to specification, and produces a court-ready filing package. No form numbers memorised. No fields missed. No formatting guesswork.",
  },
  {
    title: "Multi-jurisdiction bridge",
    description:
      "PACER, CM/ECF, CE-File, Tyler Odyssey, eCourts, and dozens of state-specific systems — all accessed through one interface. Marco Reid Filings translates your document package into whatever format each court demands. One upload. Every jurisdiction.",
  },
  {
    title: "Pro se intake wizard in 100+ languages",
    description:
      "Self-represented litigants do not speak legalese. The intake wizard uses plain language, contextual help, and real-time translation in over 100 languages to walk them through every step. Divorce, small claims, restraining orders, landlord-tenant — guided from first question to filed document.",
  },
  {
    title: "Pre-submission validation",
    description:
      "Every filing is checked against court-specific rules before it leaves your screen. Page limits, font requirements, margin widths, exhibit labelling, certificate of service, signature blocks, filing fees — validated line by line. Rejections caught before the clerk ever sees the document.",
  },
  {
    title: "Fee waiver (IFP) applications",
    description:
      "In Forma Pauperis applications are generated automatically from the litigant's financial intake data. Income thresholds checked against jurisdiction-specific rules. Supporting declarations drafted. The financial barrier to justice should not be a paperwork barrier too.",
  },
  {
    title: "Service of process tracking",
    description:
      "Track every served document from generation through delivery. Proof of service forms auto-populated. Electronic service via the platform where courts allow it. Affidavits of service generated and filed. Nothing falls through the cracks between filing and service.",
  },
  {
    title: "Document assembly",
    description:
      "Exhibits bates-stamped and indexed. Declarations formatted with proper captions. Proposed orders drafted with the court's formatting requirements baked in. Tables of contents and tables of authorities generated automatically. The filing package arrives complete — not in pieces the clerk has to reassemble.",
  },
  {
    title: "Filing status tracking with real-time notifications",
    description:
      "Every filing is tracked from submission through acceptance. Real-time notifications when a document is received, when it is reviewed, when it is accepted, and when it is docketed. No more checking the court website every hour. The status comes to you.",
  },
  {
    title: "Rejection handling with AI-powered error correction",
    description:
      "When a filing is rejected, Marco Reid parses the clerk's rejection reason, identifies the specific error, suggests the correction, and regenerates the document. What used to take hours of detective work and a second filing attempt takes minutes. Most rejections resolved in a single cycle.",
  },
  {
    title: "Batch filing for high-volume firms",
    description:
      "Immigration firms filing 200 applications a month. Collection firms filing thousands. Batch upload, batch validation, batch submission, batch tracking. Every filing individually validated but submitted as a stream. Volume is not a bottleneck — it is a workflow.",
  },
  {
    title: "Open API for practice management vendors",
    description:
      "Legal aid organisations, law school clinics, practice management platforms, and court technology vendors can integrate Marco Reid Filings into their existing systems. RESTful API with webhooks, sandbox environment, and comprehensive documentation. Build on top of the filing layer instead of rebuilding it.",
  },
  {
    title: "Court-specific rule compliance",
    description:
      "Every court has its own local rules — formatting, page limits, font size, filing deadlines, cover sheet requirements, redaction rules. Marco Reid maintains a living database of court-specific requirements updated continuously. Your filing is compliant before you click submit.",
  },
];

const steps = [
  {
    number: "01",
    title: "Upload",
    description:
      "Upload your documents or generate them from intake answers. Marco Reid identifies the filing type, the destination court, and the applicable rules automatically.",
  },
  {
    number: "02",
    title: "Validate",
    description:
      "Every page, every field, every formatting requirement checked against the target court's specific rules. Errors flagged with plain-language explanations and one-click fixes.",
  },
  {
    number: "03",
    title: "File",
    description:
      "One click. Marco Reid translates your package into the court's required format and submits through the appropriate system — PACER, CM/ECF, CE-File, Tyler Odyssey, or direct upload.",
  },
  {
    number: "04",
    title: "Track",
    description:
      "Real-time status updates from submission through docketing. Rejection alerts with AI-powered correction suggestions. Confirmation when your filing is accepted and stamped.",
  },
];

const integrations = [
  {
    system: "PACER / CM/ECF",
    scope: "All US federal courts",
    description:
      "Direct integration with the federal court filing system. Case search, document retrieval, and electronic filing through a single interface.",
  },
  {
    system: "Tyler Odyssey",
    scope: "1,500+ state and local courts",
    description:
      "The largest state court e-filing network in the US. Marco Reid connects to every Odyssey-powered jurisdiction without separate logins or accounts.",
  },
  {
    system: "CE-File",
    scope: "California state courts",
    description:
      "California's statewide e-filing system across superior courts. Full support for civil, family, probate, and small claims filings.",
  },
  {
    system: "eCourts",
    scope: "New Jersey, New York, and expanding",
    description:
      "State-specific electronic court systems with jurisdiction-aware formatting and submission rules applied automatically.",
  },
  {
    system: "JEFS / eFiling",
    scope: "Hawaii, Texas, Illinois, and more",
    description:
      "Jurisdiction-specific filing systems integrated under one roof. Each court's requirements mapped, each court's formatting enforced.",
  },
  {
    system: "International courts",
    scope: "Expanding globally",
    description:
      "Courts in New Zealand, Australia, the United Kingdom, and the EU are on the roadmap. Same interface, same validation, different jurisdiction.",
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */

export default function FilingsPage() {
  return (
    <>
      <SchemaMarkup schema={schema} />

      {/* ── Hero ── */}
      <section
        className="relative bg-navy-500 pt-32 pb-20 sm:pt-40 sm:pb-28"
        aria-label="Marco Reid Filings hero"
      >
        <Container className="relative text-center">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-widest text-forest-400">
              Marco Reid Filings
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-8 text-hero font-serif">
              <span className="text-white">E-filing that doesn&rsquo;t</span>
              <br />
              <span className="text-forest-400">make people cry.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-8 max-w-2xl text-xl leading-relaxed text-navy-200">
              More than 70% of civil cases have at least one self-represented
              litigant. PACER was built in 2001. CM/ECF rejects filings for
              margins that are half a point too narrow. Every jurisdiction runs a
              different system with different rules, different formats, and
              different ways to fail. Marco Reid Filings is one interface for
              all of them &mdash; with AI that fills forms, validates rules, and
              files to every court from a single screen.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-12 flex flex-wrap justify-center gap-4">
              <Button href="/courts/pilot" size="lg" variant="secondary">
                Request a pilot
              </Button>
              <Button href="/courts" size="lg" variant="ghost" className="text-white hover:text-forest-400">
                Back to Courts &rarr;
              </Button>
            </div>
          </Reveal>
        </Container>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* ── The Problem ── */}
      <section className="py-32 sm:py-44" aria-label="The problem with e-filing today">
        <Container narrow>
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-widest text-forest-600">
              The problem
            </p>
            <h2 className="mt-6 text-display font-serif text-navy-700">
              E-filing is broken. Everyone knows it.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 text-xl leading-relaxed text-navy-400">
              PACER was built in 2001 and still charges ten cents a page to read
              public court records. CM/ECF was designed when Internet Explorer 6
              was the standard browser. Every state bolted on its own system
              &mdash; Tyler Odyssey in some jurisdictions, CE-File in
              California, eCourts in New Jersey, something homegrown everywhere
              else. Attorneys maintain separate accounts, separate credentials,
              and separate mental models for every court they file in.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 text-xl leading-relaxed text-navy-400">
              Pro se litigants have it worse. The forms assume legal training.
              The instructions assume familiarity with local rules. The rejection
              notices assume you know what &ldquo;non-conforming certificate of
              service&rdquo; means. Seventy percent of civil litigants are
              representing themselves, and the filing systems were never built
              for them. They were barely built for lawyers.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 text-xl leading-relaxed text-navy-400">
              The result: rejected filings, missed deadlines, wasted clerk time,
              and a justice system that punishes people for not understanding
              software that even attorneys struggle with. Marco Reid Filings
              replaces the frustration with a single, intelligent interface that
              handles every court, every format, and every rule &mdash;
              automatically.
            </p>
          </Reveal>
        </Container>
      </section>

      <div className="h-px bg-navy-100 mx-auto max-w-sm" />

      {/* ── Features ── */}
      <section className="py-32 sm:py-44" aria-label="Filing features">
        <Container>
          <Reveal>
            <p className="text-center text-xs font-medium uppercase tracking-widest text-forest-600">
              Capabilities
            </p>
            <h2 className="mt-6 text-center text-display font-serif text-navy-700">
              Everything a filing system should do.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed text-navy-400">
              Twelve capabilities that turn e-filing from a source of dread
              into a solved problem. For attorneys, for pro se litigants, for
              legal aid clinics, and for the courts themselves.
            </p>
          </Reveal>

          <div className="mx-auto mt-20 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={0.05 * (i % 3)}>
                <div className="group h-full rounded-xl border border-navy-100 bg-white p-8 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5">
                  <p className="text-xs font-semibold uppercase tracking-widest text-forest-600">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-4 font-serif text-headline text-navy-700">
                    {f.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-navy-400">
                    {f.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <div className="h-px bg-navy-100 mx-auto max-w-sm" />

      {/* ── How It Works ── */}
      <section className="py-32 sm:py-44" aria-label="How filing works">
        <Container>
          <Reveal>
            <p className="text-center text-xs font-medium uppercase tracking-widest text-forest-600">
              The workflow
            </p>
            <h2 className="mt-6 text-center text-display font-serif text-navy-700">
              Four steps. One screen. Every court.
            </h2>
          </Reveal>

          <div className="mx-auto mt-20 grid max-w-4xl gap-px overflow-hidden rounded-2xl border border-navy-100 bg-navy-100 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={0.08 * i}>
                <div className="flex h-full flex-col bg-white p-8">
                  <p className="font-serif text-display text-forest-500">
                    {s.number}
                  </p>
                  <h3 className="mt-4 font-serif text-headline text-navy-700">
                    {s.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-navy-400">
                    {s.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <div className="h-px bg-navy-100 mx-auto max-w-sm" />

      {/* ── Integrations ── */}
      <section className="py-32 sm:py-44" aria-label="Court system integrations">
        <Container>
          <Reveal>
            <p className="text-center text-xs font-medium uppercase tracking-widest text-forest-600">
              Integrations
            </p>
            <h2 className="mt-6 text-center text-display font-serif text-navy-700">
              Every court system. One connection.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed text-navy-400">
              Marco Reid Filings connects to the court systems attorneys and
              litigants already use &mdash; and handles the translation layer
              so you never think about file formats, field mappings, or
              jurisdiction-specific submission rules again.
            </p>
          </Reveal>

          <div className="mx-auto mt-20 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {integrations.map((intg, i) => (
              <Reveal key={intg.system} delay={0.05 * (i % 3)}>
                <div className="h-full rounded-xl border border-navy-100 bg-white p-8 shadow-card">
                  <h3 className="font-serif text-headline text-navy-700">
                    {intg.system}
                  </h3>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-forest-600">
                    {intg.scope}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-navy-400">
                    {intg.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <div className="h-px bg-navy-100 mx-auto max-w-sm" />

      {/* ── The Vision ── */}
      <section className="py-32 sm:py-44" aria-label="The vision for e-filing">
        <Container narrow>
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-widest text-forest-600">
              The vision
            </p>
            <h2 className="mt-6 text-display font-serif text-navy-700">
              Filing should be invisible.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 text-xl leading-relaxed text-navy-400">
              A lawyer drafts a motion. They click file. The document is
              validated, formatted, submitted, and docketed &mdash; and the
              lawyer never leaves their editor. A pro se litigant answers
              questions in their own language. The forms fill themselves. The
              filing happens. Justice is not obstructed by technology that was
              supposed to make it faster.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 text-xl leading-relaxed text-navy-400">
              That is the standard. Not aspirational. Not a roadmap item. The
              standard that Marco Reid Filings is built to deliver for every
              court in every jurisdiction on earth.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ── CTA ── */}
      <section
        className="relative bg-navy-500 py-32 sm:py-44"
        aria-label="Request a pilot"
      >
        <Container className="relative text-center">
          <Reveal>
            <h2 className="text-display font-serif text-white">
              Run a pilot in your court.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-xl text-xl leading-relaxed text-navy-200">
              Court procurement is relationship-driven. Tell us about your
              jurisdiction, your current systems, and what breaks most often.
              We will put a working pilot in your hands within 30 days.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-12 flex flex-wrap justify-center gap-4">
              <Button href="/courts/pilot" size="lg" variant="secondary">
                Request a pilot
              </Button>
              <Button href="/courts" size="lg" variant="ghost" className="text-white hover:text-forest-400">
                Back to Courts &rarr;
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
