import type { Metadata } from "next";
import { BRAND } from "@/lib/constants";
import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
import SchemaMarkup from "@/app/components/shared/SchemaMarkup";
import Reveal from "@/app/components/effects/Reveal";

export const metadata: Metadata = {
  title: "Marco Reid Public — Open Justice, Finally Open",
  description:
    "Livestreaming, searchable transcripts, opinion publication, public docket access, press portals, and open data APIs. The transparency every constitution promises and few courts deliver. Marco Reid Public makes open courts real.",
  keywords: [
    "public court access",
    "court transparency technology",
    "open justice",
    "court livestreaming",
    "searchable court transcripts",
    "public docket access",
    "court opinion publication",
    "open courts technology",
    "PACER alternative",
    "free court records",
    "court transparency software",
    "open data court API",
    "court press portal",
    "court accessibility",
    "public court records",
    "Sixth Amendment open courts",
    "court hearing livestream",
    "court case alerts",
    "juror information portal",
    "court technology platform",
  ],
  openGraph: {
    title: "Marco Reid Public — Open Justice, Finally Open",
    description:
      "Livestreaming, searchable transcripts, opinion publication, and public docket access. The constitutional promise of open courts, delivered by technology.",
    url: `${BRAND.url}/courts/public`,
    type: "website",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Marco Reid Public",
  applicationCategory: "Legal",
  operatingSystem: "Web",
  description:
    "Court transparency platform: hearing livestreams, searchable transcript archives, opinion publication, public docket access, press portals, open data APIs, and accessibility compliance.",
  url: `${BRAND.url}/courts/public`,
  offers: {
    "@type": "Offer",
    category: "Government / Court Administration",
  },
};

const problems = [
  {
    stat: "$3.50",
    label: "per page",
    detail:
      "Court transcripts cost dollars per page. A single hearing transcript can run hundreds of dollars. The public right to access becomes a privilege reserved for those who can afford it.",
  },
  {
    stat: "6+",
    label: "months",
    detail:
      "Published opinions routinely take months to appear on court websites. Decisions that shape rights and obligations sit in filing cabinets while the public waits.",
  },
  {
    stat: "$0.10",
    label: "per page on PACER",
    detail:
      "The federal court system charges the public to access its own records. PACER generated over $150 million in fees in a single year from citizens trying to read public documents.",
  },
  {
    stat: "0",
    label: "livestreams",
    detail:
      "The vast majority of courtrooms offer no remote access at all. Live access ends at the courtroom door. If you cannot physically be present, you cannot observe justice being administered.",
  },
];

const features = [
  {
    icon: "\u{1F4F9}",
    title: "Hearing livestream",
    desc: "Public stream with closed captioning, accessible on any device. Desktop, tablet, phone. No app to download, no login required. The courtroom door is now a URL.",
    color: "bg-forest-50",
    textColor: "text-forest-600",
  },
  {
    icon: "\u{1F50D}",
    title: "Searchable transcript archive",
    desc: "Every word, every hearing, instantly searchable by keyword, date, case number, or speaker. Full-text search across years of proceedings in milliseconds.",
    color: "bg-navy-50",
    textColor: "text-navy-600",
  },
  {
    icon: "\u{1F4DC}",
    title: "Opinion publication",
    desc: "Auto-publish opinions the moment they are filed, with citation linking, case cross-references, and hyperlinked statutory references. No six-month backlog.",
    color: "bg-plum-50",
    textColor: "text-plum-600",
  },
  {
    icon: "\u{1F4CB}",
    title: "Public docket access",
    desc: "Plain-language case summaries accessible without legal training. Case status, upcoming hearings, filed documents, and party information in clear, readable format.",
    color: "bg-forest-50",
    textColor: "text-forest-600",
  },
  {
    icon: "\u{1F512}",
    title: "Granular sealing controls",
    desc: "Automatic redaction for sealed matters, juvenile proceedings, confidential filings, and protected identities. Transparency where appropriate, privacy where mandated.",
    color: "bg-navy-50",
    textColor: "text-navy-600",
  },
  {
    icon: "\u{1F4F0}",
    title: "Press portal",
    desc: "Verified press credentials, embargoed releases before publication, media access management, and dedicated press contact channels. Structured access for the Fourth Estate.",
    color: "bg-plum-50",
    textColor: "text-plum-600",
  },
  {
    icon: "\u{1F4E1}",
    title: "Open data API",
    desc: "Bulk access for researchers, journalists, legal academics, and civic technologists. Structured data exports, rate-limited public endpoints, and developer documentation.",
    color: "bg-forest-50",
    textColor: "text-forest-600",
  },
  {
    icon: "\u{1F310}",
    title: "Multi-language transcripts",
    desc: "Auto-translated transcripts for non-English-speaking communities. Court proceedings should not be inaccessible because of the language a citizen speaks.",
    color: "bg-navy-50",
    textColor: "text-navy-600",
  },
  {
    icon: "\u267F",
    title: "Accessibility compliance",
    desc: "WCAG 2.2 AA compliant. Screen reader support, closed captioning on all streams, high-contrast mode, keyboard navigation, and scalable text. Justice is for everyone.",
    color: "bg-plum-50",
    textColor: "text-plum-600",
  },
  {
    icon: "\u{1F514}",
    title: "Case alerts",
    desc: "The public can subscribe to updates for cases they follow. New filings, hearing dates, opinion releases, and status changes delivered by email or in-app notification.",
    color: "bg-forest-50",
    textColor: "text-forest-600",
  },
  {
    icon: "\u{1F3DB}",
    title: "Juror information portal",
    desc: "Reporting instructions, courthouse parking, estimated service duration, payment status, and schedule updates. Reduce no-shows and frustrated jurors with clear, accessible information.",
    color: "bg-navy-50",
    textColor: "text-navy-600",
  },
  {
    icon: "\u{1F4E2}",
    title: "Community notification",
    desc: "Court closures, weather delays, schedule changes, and emergency notices pushed to the public in real time. No more showing up to a locked courthouse.",
    color: "bg-plum-50",
    textColor: "text-plum-600",
  },
];

const beneficiaries = [
  {
    title: "Media and press",
    desc: "Real-time access to proceedings, searchable transcripts for fact-checking, embargoed opinion releases, and a dedicated portal that replaces hours of phone calls to the clerk's office.",
    icon: "\u{1F4F0}",
  },
  {
    title: "Researchers and academics",
    desc: "Bulk data access through open APIs, structured datasets for empirical legal studies, and historical transcript archives that turn years of proceedings into searchable knowledge.",
    icon: "\u{1F4DA}",
  },
  {
    title: "Self-represented litigants",
    desc: "Plain-language docket summaries, clear hearing schedules, accessible filing information, and case status updates that do not require a law degree to understand.",
    icon: "\u{1F464}",
  },
  {
    title: "General public",
    desc: "Livestreamed hearings accessible from any device, case alerts for matters of public interest, multi-language transcripts, and the ability to observe the justice system without taking a day off work.",
    icon: "\u{1F465}",
  },
  {
    title: "Attorneys",
    desc: "Instant access to transcripts, opinion notifications the moment they are published, docket monitoring across jurisdictions, and research-ready archives that feed directly into Marco Reid Legal.",
    icon: "\u2696\uFE0F",
  },
  {
    title: "Court administrators",
    desc: "Reduced clerk workload from public information requests, automated opinion publication, configurable sealing controls, analytics on public engagement, and compliance with open-records mandates.",
    icon: "\u{1F3DB}\uFE0F",
  },
];

export default function PublicPage() {
  return (
    <>
      <SchemaMarkup schema={schema} />

      {/* ── Hero ── */}
      <section className="bg-navy-500 pt-32 pb-20 sm:pt-40 sm:pb-28">
        <Container className="text-center">
          <Reveal>
            <p className="text-sm font-semibold tracking-wider text-forest-300">
              Marco Reid Public
            </p>
            <h1 className="mt-6 font-serif text-hero text-white">
              Open justice, finally open.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-navy-200">
              Open courts are a constitutional principle. In practice,
              transcripts cost dollars per page, opinions take months to
              publish, and live access ends at the courtroom door. Marco Reid
              Public turns every proceeding into searchable, streamable,
              downloadable public record &mdash; with sealing controls that
              protect what the law requires to stay sealed.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button href="/courts/pilot" size="lg" variant="primary">
                Request a pilot
              </Button>
              <Button href="/courts" size="lg" variant="secondary">
                Back to Courts
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── The Problem ── */}
      <section className="py-24 sm:py-36" aria-label="The problem">
        <Container>
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-wider text-plum-600">
              The problem
            </p>
            <h2 className="mt-4 font-serif text-display text-navy-800">
              A constitutional right behind a paywall.
            </h2>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-navy-400">
              The First and Sixth Amendments guarantee the public&rsquo;s right
              to observe court proceedings. State constitutions echo the
              principle. International covenants enshrine it. Yet in practice,
              access to the justice system is obstructed by cost, delay,
              geography, and technology that has not kept pace with the digital
              era.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {problems.map((p, i) => (
              <Reveal key={p.stat} delay={0.1 + i * 0.05}>
                <div className="rounded-2xl border border-navy-100 bg-white p-8 shadow-card">
                  <p className="font-serif text-display text-navy-700">
                    {p.stat}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-forest-600">
                    {p.label}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-navy-400">
                    {p.detail}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        <div className="h-px bg-navy-100" />
      </div>

      {/* ── Features ── */}
      <section className="py-24 sm:py-36" aria-label="Features">
        <Container>
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-wider text-forest-600">
              What Marco Reid Public does
            </p>
            <h2 className="mt-4 font-serif text-display text-navy-800">
              Twelve capabilities. One transparent courthouse.
            </h2>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-navy-400">
              Every tool a court needs to meet its constitutional obligation to
              the public &mdash; and every tool the public deserves to hold the
              court system accountable.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={0.05 + i * 0.03}>
                <div className="group rounded-2xl border border-navy-100 bg-white p-8 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5">
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${f.color}`}
                    >
                      <span className="text-lg" aria-hidden="true">
                        {f.icon}
                      </span>
                    </div>
                    <div>
                      <h3
                        className={`font-serif text-headline ${f.textColor}`}
                      >
                        {f.title}
                      </h3>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-navy-400">
                    {f.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        <div className="h-px bg-navy-100" />
      </div>

      {/* ── Constitutional Mandate ── */}
      <section
        className="bg-navy-50 py-24 sm:py-36"
        aria-label="Constitutional mandate"
      >
        <Container>
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-wider text-navy-500">
              The constitutional mandate
            </p>
            <h2 className="mt-4 font-serif text-display text-navy-800">
              Why transparency is not optional.
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-navy-200 bg-white p-10 shadow-card">
                <p className="text-xs font-bold uppercase tracking-wider text-plum-600">
                  Sixth Amendment
                </p>
                <blockquote className="mt-6 font-serif text-xl leading-relaxed text-navy-700">
                  &ldquo;In all criminal prosecutions, the accused shall enjoy
                  the right to a speedy and public trial&hellip;&rdquo;
                </blockquote>
                <p className="mt-6 text-sm leading-relaxed text-navy-400">
                  The framers did not write &ldquo;public trial accessible only
                  to those who can afford a transcript.&rdquo; They did not
                  write &ldquo;public trial available six months after the fact
                  once the opinion is uploaded to a government website.&rdquo;
                  They wrote <em>public trial</em>. Period. Technology now
                  exists to honour the full meaning of that guarantee.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="rounded-2xl border border-navy-200 bg-white p-10 shadow-card">
                <p className="text-xs font-bold uppercase tracking-wider text-forest-600">
                  Richmond Newspapers v. Virginia (1980)
                </p>
                <blockquote className="mt-6 font-serif text-xl leading-relaxed text-navy-700">
                  &ldquo;The right of access to criminal trials is implicit in
                  the guarantees of the First Amendment.&rdquo;
                </blockquote>
                <p className="mt-6 text-sm leading-relaxed text-navy-400">
                  The Supreme Court held that the public and press have a
                  constitutional right to attend criminal trials. Chief Justice
                  Burger wrote that open trials serve as a check on the judicial
                  process, encourage witness honesty, and assure the public that
                  justice is being administered fairly. Marco Reid Public is the
                  technology that makes this right real for everyone, not just
                  those who can physically attend.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <div className="mt-12 rounded-2xl bg-navy-500 p-8 sm:p-12">
              <h3 className="font-serif text-headline text-white">
                Public trust requires public access.
              </h3>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-navy-200">
                When courts operate behind closed doors &mdash; even
                unintentionally, through cost barriers and outdated technology
                &mdash; public confidence erodes. When citizens can see their
                justice system in action, watch proceedings in real time, read
                opinions the day they are issued, and search the public record
                freely, trust is not assumed. It is earned. Marco Reid Public
                gives courts the infrastructure to earn that trust every single
                day.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── Who Benefits ── */}
      <section className="py-24 sm:py-36" aria-label="Who benefits">
        <Container>
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-wider text-forest-600">
              Who benefits
            </p>
            <h2 className="mt-4 font-serif text-display text-navy-800">
              Transparency serves everyone.
            </h2>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-navy-400">
              Open courts are not a niche feature. Every stakeholder in the
              justice system &mdash; from the journalist in the press gallery to
              the citizen following a case from home &mdash; benefits when
              courts are genuinely accessible.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {beneficiaries.map((b, i) => (
              <Reveal key={b.title} delay={0.05 + i * 0.05}>
                <div className="rounded-2xl border border-navy-100 bg-white p-8 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-50">
                    <span className="text-xl" aria-hidden="true">
                      {b.icon}
                    </span>
                  </div>
                  <h3 className="mt-5 font-serif text-headline text-navy-700">
                    {b.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy-400">
                    {b.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        <div className="h-px bg-navy-100" />
      </div>

      {/* ── Privacy and Sealing ── */}
      <section className="py-24 sm:py-36" aria-label="Privacy and sealing">
        <Container>
          <Reveal>
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-plum-50">
                <span className="text-xl" aria-hidden="true">
                  &#128274;
                </span>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-plum-600">
                  Transparency with guardrails
                </p>
                <h2 className="font-serif text-display text-navy-800">
                  Open does not mean exposed.
                </h2>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-navy-400">
              Transparency is a principle, not an absolute. Some proceedings
              must remain sealed. Some identities must be protected. Some
              filings contain information that the law requires to stay
              confidential. Marco Reid Public gives court administrators
              granular, rule-based controls that honour every sealing order,
              privacy statute, and protective order &mdash; automatically.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Sealed matter redaction",
                desc: "Sealed cases are automatically excluded from public streams, transcript archives, and docket searches. No manual intervention required.",
              },
              {
                title: "Juvenile proceeding protection",
                desc: "Juvenile matters are fully shielded by default. No public access to any aspect of the proceeding, in compliance with every state and federal statute.",
              },
              {
                title: "Confidential filing detection",
                desc: "Documents marked confidential are automatically withheld from public docket views. Redacted versions can be published at the court's discretion.",
              },
              {
                title: "Protective order enforcement",
                desc: "When a protective order is entered, the system automatically restricts access to covered materials across all public-facing surfaces.",
              },
              {
                title: "Identity protection",
                desc: "Victim names, minor identities, informant details, and other protected identifiers are redacted from transcripts and docket entries automatically.",
              },
              {
                title: "Audit trail on access",
                desc: "Every access to every public record is logged. Courts know who accessed what, when, and from where. Accountability in both directions.",
              },
            ].map((f, i) => (
              <Reveal key={f.title} delay={0.05 + i * 0.03}>
                <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5">
                  <h3 className="font-semibold text-navy-700">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-400">
                    {f.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        <div className="h-px bg-navy-100" />
      </div>

      {/* ── Integration with Courts suite ── */}
      <section
        className="py-24 sm:py-36"
        aria-label="Integration with Marco Reid Courtroom"
      >
        <Container narrow>
          <Reveal>
            <h2 className="font-serif text-display text-navy-800">
              Part of the Marco Reid Courtroom suite.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 text-xl leading-relaxed text-navy-400">
              Marco Reid Public is not a standalone product. It is one wing of
              the Marco Reid Courtroom platform &mdash; sharing the same
              transcript engine, the same document management layer, the same
              security infrastructure, and the same administrative controls.
              When a court adopts Marco Reid Courtroom, public transparency
              capabilities are built in from day one. Transcripts generated by
              Marco Reid Reporter flow directly into the public archive.
              Opinions drafted through Marco Reid Bench are published the
              moment they are filed. Docket entries from the case management
              system appear in the public portal in real time. One platform.
              Every stakeholder served.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ── CTA ── */}
      <section
        className="bg-navy-500 py-24 sm:py-36"
        aria-label="Get started"
      >
        <Container className="text-center">
          <Reveal>
            <h2 className="font-serif text-display text-white">
              The courthouse door is a URL now.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-navy-200">
              Courts that adopt Marco Reid Public do not just meet their
              transparency obligations. They exceed them. They set the standard
              for what open justice looks like in the digital era. Request a
              pilot to see it in action.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button href="/courts/pilot" size="lg" variant="primary">
                Request a pilot
              </Button>
              <Button href="/courts" size="lg" variant="secondary">
                Back to Courts
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
