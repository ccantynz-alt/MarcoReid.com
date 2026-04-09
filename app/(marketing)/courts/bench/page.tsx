import type { Metadata } from "next";
import { BRAND } from "@/lib/constants";
import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
import SchemaMarkup from "@/app/components/shared/SchemaMarkup";
import AiDisclaimer from "@/app/components/shared/AiDisclaimer";
import Reveal from "@/app/components/effects/Reveal";

export const metadata: Metadata = {
  title: "Marco Reid Bench — AI Research and Opinion Drafting for Judges",
  description:
    "Verified legal research, opinion drafting assistance, sentencing aids, and bench book tools for judges and judicial clerks. Every citation checked against authoritative public domain sources. Chambers-grade security with sovereign deployment.",
  keywords: [
    "judicial research tool",
    "bench tools for judges",
    "opinion drafting AI",
    "AI for judges",
    "judicial clerk research",
    "bench memo drafting",
    "sentencing guidelines tool",
    "citation verification judiciary",
    "courtroom AI research",
    "bench book software",
    "judicial decision support",
    "clerk workflow automation",
    "Marco Reid Bench",
  ],
  openGraph: {
    title: "Marco Reid Bench — AI Research and Opinion Drafting for Judges",
    description:
      "Verified legal research, opinion drafting assistance, sentencing aids, and bench book tools for judges and judicial clerks. Every citation checked. Chambers-grade security.",
    url: `${BRAND.url}/courts/bench`,
    type: "website",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Marco Reid Bench",
  applicationCategory: "Legal",
  operatingSystem: "Web",
  description:
    "AI-powered research and opinion drafting platform for judges and judicial clerks. Citation-verified legal research, sentencing aids, bench book tools, and clerk workflow management. Chambers-grade security with sovereign deployment option.",
  url: `${BRAND.url}/courts/bench`,
  offers: {
    "@type": "Offer",
    category: "Pilot programme",
    description: "Available through the Marco Reid Courts pilot programme",
  },
};

export default function BenchPage() {
  return (
    <>
      <SchemaMarkup schema={schema} />

      {/* ── Hero ── */}
      <section
        className="relative bg-navy-500 pt-32 pb-20 sm:pt-40 sm:pb-28"
        aria-label="Marco Reid Bench hero"
      >
        <Container className="relative text-center">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-widest text-forest-300">
              Marco Reid Bench
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-8 text-hero font-serif">
              <span className="text-white">Research and draft</span>
              <br />
              <span className="text-forest-300">from the bench.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-8 max-w-2xl text-xl leading-relaxed text-navy-200">
              Judges write opinions on Word with no research integration. Clerks
              scramble between Westlaw, Lexis, and the court library. Marco Reid
              Bench puts verified case law, statute, and policy research one
              keystroke away &mdash; with citation verification so nothing reaches
              the page that did not come from a real source.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
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
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-white to-transparent" />
      </section>

      {/* ── The Problem ── */}
      <section className="py-32 sm:py-44" aria-label="The problem">
        <Container narrow>
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-widest text-forest-600">
              The problem
            </p>
            <h2 className="mt-6 text-display font-serif text-navy-700">
              Chambers are flying blind.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 text-xl leading-relaxed text-navy-400">
              A judge writes a ruling in Microsoft Word. The clerk has Westlaw in
              one tab, Lexis in another, and the court library across the hall.
              Every citation is copied and pasted by hand. There is no
              integration between research and drafting. No system checks whether
              a cited case has been overruled. No tool verifies that a statute
              reference is still good law.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 text-xl leading-relaxed text-navy-400">
              When an opinion cites an overruled case, the court&rsquo;s
              credibility takes the damage. When a clerk misses a deadline or a
              subsequent treatment flag, the judge bears the consequence. The
              tools that exist were built for litigators, not for the bench. The
              bench deserves its own platform &mdash; purpose-built, secure, and
              relentlessly verified.
            </p>
          </Reveal>
        </Container>
      </section>

      <div className="h-px bg-navy-100 mx-auto max-w-sm" />

      {/* ── Feature Narratives ── */}
      <section className="py-32 sm:py-44" aria-label="Features">
        <Container>
          <Reveal>
            <p className="text-center text-xs font-medium uppercase tracking-widest text-forest-600">
              Built for the bench
            </p>
            <h2 className="mt-6 text-center text-display font-serif text-navy-700">
              Every tool a judge needs. Nothing they do not.
            </h2>
          </Reveal>

          {/* Verified Legal Research */}
          <Reveal delay={0.1}>
            <div className="mx-auto mt-16 max-w-3xl">
              <div className="rounded-xl border-2 border-forest-200 bg-forest-50/30 p-6 shadow-card sm:p-8">
                <p className="text-xs font-bold tracking-wider text-forest-600">
                  Verified legal research
                </p>
                <h3 className="mt-4 font-serif text-headline text-navy-700">
                  Every citation checked before it reaches your opinion.
                </h3>
                <p className="mt-4 leading-relaxed text-navy-400">
                  Marco verifies every case citation against CourtListener, every
                  statute against GovInfo and Cornell LII, and every regulatory
                  reference against its authoritative source. Each citation
                  carries a visible verification badge: Verified, Unverified, or
                  Not Found. Unverified citations are flagged visibly. Citations
                  that cannot be found are blocked from insertion into any
                  document. A judge should never have to wonder whether the case
                  they are citing still exists.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Opinion Drafting Assistant */}
          <Reveal delay={0.1}>
            <div className="mx-auto mt-6 max-w-3xl">
              <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-widest text-plum-600">
                  Opinion drafting assistant
                </p>
                <h3 className="mt-4 font-serif text-headline text-navy-700">
                  Bench memos and draft opinions in chambers&rsquo; voice.
                </h3>
                <p className="mt-4 leading-relaxed text-navy-400">
                  Draft bench memoranda, proposed orders, and full opinions with
                  AI assistance that maintains the judicial tone of your
                  chambers. The drafting assistant understands the structure of
                  judicial writing &mdash; findings of fact, conclusions of law,
                  procedural posture, standard of review. It does not write the
                  opinion for you. It accelerates the process of getting from
                  research to a well-structured first draft that your clerks can
                  refine.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Sentencing Aids */}
          <Reveal delay={0.1}>
            <div className="mx-auto mt-6 max-w-3xl">
              <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-widest text-navy-500">
                  Sentencing aids
                </p>
                <h3 className="mt-4 font-serif text-headline text-navy-700">
                  Guidelines, comparable ranges, departure factors &mdash;
                  instantly.
                </h3>
                <p className="mt-4 leading-relaxed text-navy-400">
                  Federal Sentencing Guidelines lookup with offense level
                  calculation, criminal history category cross-reference, and
                  applicable mandatory minimums. State sentencing guidelines for
                  every jurisdiction. Comparable case ranges by offense type,
                  jurisdiction, and time period. Departure and variance factors
                  with supporting case law. Every data point sourced from public
                  domain records and verified before display.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Personalized Bench Book */}
          <Reveal delay={0.1}>
            <div className="mx-auto mt-6 max-w-3xl">
              <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-widest text-forest-600">
                  Personalized bench book
                </p>
                <h3 className="mt-4 font-serif text-headline text-navy-700">
                  Your checklists. Your standards. Your courtroom.
                </h3>
                <p className="mt-4 leading-relaxed text-navy-400">
                  Custom checklists for every routine motion type: summary
                  judgment, motion to dismiss, preliminary injunctions,
                  suppression hearings, Daubert challenges. Each checklist
                  includes the legal standard, required elements, burden
                  allocation, and the key cases from your circuit. Build once,
                  use every hearing. Update when the law changes &mdash; Marco
                  alerts you when a controlling case in your bench book receives
                  negative treatment.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Confidential by Design */}
          <Reveal delay={0.1}>
            <div className="mx-auto mt-6 max-w-3xl">
              <div className="rounded-xl border-2 border-navy-200 bg-navy-50/50 p-6 shadow-card sm:p-8">
                <p className="text-xs font-bold tracking-wider text-navy-500">
                  Confidential by design
                </p>
                <h3 className="mt-4 font-serif text-headline text-navy-700">
                  Sovereign deployment. Zero training on chambers data.
                </h3>
                <p className="mt-4 leading-relaxed text-navy-400">
                  Chambers data never leaves the judicial network. Marco Reid
                  Bench offers a sovereign deployment option: on-premises or
                  private cloud within the court&rsquo;s own infrastructure.
                  Air-gapped mode for the most sensitive matters. No chambers
                  data is ever used to train AI models. No query history is
                  shared with any third party. The AI works for the court, not
                  the other way around.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Live Research During Hearings */}
          <Reveal delay={0.1}>
            <div className="mx-auto mt-6 max-w-3xl">
              <div className="rounded-xl border-2 border-plum-100 bg-plum-50/30 p-6 shadow-card sm:p-8">
                <p className="text-xs font-bold tracking-wider text-plum-600">
                  Live research during hearings
                </p>
                <h3 className="mt-4 font-serif text-headline text-navy-700">
                  Marco at the bench. Real-time case law during oral argument.
                </h3>
                <p className="mt-4 leading-relaxed text-navy-400">
                  Counsel cites a case you have not seen. You open Marco on the
                  bench iPad. Type the citation or speak it. In under three
                  seconds: the full opinion, its subsequent treatment, whether it
                  has been overruled or distinguished, and its relevance to the
                  issues before you. You do not recess to research. You do not
                  take it under advisement because you need to check a citation.
                  You verify in real time and continue the hearing.
                </p>
                <p className="mt-4 text-sm font-medium text-plum-600">
                  That is a superpower on the bench. No other tool provides it.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Multi-Jurisdictional Coverage */}
          <Reveal delay={0.1}>
            <div className="mx-auto mt-6 max-w-3xl">
              <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-widest text-forest-600">
                  Multi-jurisdictional coverage
                </p>
                <h3 className="mt-4 font-serif text-headline text-navy-700">
                  Federal. State. Foreign. International.
                </h3>
                <p className="mt-4 leading-relaxed text-navy-400">
                  Federal circuit and district court opinions. All fifty states.
                  Foreign law for comparative analysis in international disputes
                  and treaty interpretation. International tribunal decisions.
                  Every source verified through public domain databases:
                  CourtListener for US case law, GovInfo for federal statutes and
                  regulations, Cornell LII for statutory research, and official
                  government sources for foreign and international law.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Citation Graph */}
          <Reveal delay={0.1}>
            <div className="mx-auto mt-6 max-w-3xl">
              <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-widest text-plum-600">
                  Citation graph
                </p>
                <h3 className="mt-4 font-serif text-headline text-navy-700">
                  The full treatment history. Every case that touched yours.
                </h3>
                <p className="mt-4 leading-relaxed text-navy-400">
                  Subsequent treatment tracking built from public domain sources.
                  Cases that cited your authority, distinguished it, followed it,
                  questioned it, or overruled it &mdash; all mapped visually.
                  Positive treatment. Negative treatment. Neutral citations.
                  Built entirely from CourtListener and official court records.
                  No proprietary KeyCite or Shepard&rsquo;s data. Our own
                  citation graph, built from the ground up on public domain
                  materials.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Clerk Workflow Tools */}
          <Reveal delay={0.1}>
            <div className="mx-auto mt-6 max-w-3xl">
              <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-widest text-navy-500">
                  Clerk workflow tools
                </p>
                <h3 className="mt-4 font-serif text-headline text-navy-700">
                  Research assignments. Draft pipelines. Cite-checking
                  automation.
                </h3>
                <p className="mt-4 leading-relaxed text-navy-400">
                  Assign research tasks to individual clerks with deadlines and
                  priority levels. Track the progress of every bench memo from
                  assignment through research, drafting, review, and final
                  approval. Automated cite-checking runs against every citation
                  in a draft opinion before it reaches the judge&rsquo;s desk.
                  The clerk&rsquo;s workflow is structured, traceable, and
                  efficient. No more sticky notes. No more wondering who is
                  working on what.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Statistical Analysis */}
          <Reveal delay={0.1}>
            <div className="mx-auto mt-6 max-w-3xl">
              <div className="rounded-xl border-2 border-forest-200 bg-forest-50/30 p-6 shadow-card sm:p-8">
                <p className="text-xs font-bold tracking-wider text-forest-600">
                  Statistical analysis
                </p>
                <h3 className="mt-4 font-serif text-headline text-navy-700">
                  Case outcome patterns. Sentencing data. Appeal rates by issue.
                </h3>
                <p className="mt-4 leading-relaxed text-navy-400">
                  Aggregate data from public court records: how similar cases
                  have been decided across your circuit and nationwide. Sentencing
                  distributions by offense type. Appeal rates and reversal rates
                  by issue category. Motion grant and denial patterns. All
                  derived from public domain court data, anonymized and
                  aggregated. A judge making a sentencing decision or ruling on a
                  dispositive motion can see where the decision falls within the
                  distribution of comparable outcomes &mdash; not to be
                  constrained by it, but to be informed by it.
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <div className="h-px bg-navy-100 mx-auto max-w-sm" />

      {/* ── Citation Verification ── */}
      <section className="py-32 sm:py-44" aria-label="Citation verification">
        <Container>
          <Reveal>
            <p className="text-center text-xs font-medium uppercase tracking-widest text-plum-600">
              Zero hallucinations
            </p>
            <h2 className="mt-6 text-center text-display font-serif text-navy-700">
              Every citation verified before it reaches your opinion.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-center text-lg text-navy-400">
              In 2023, a New York attorney was sanctioned for submitting
              AI-fabricated citations to a federal court. That failure mode is
              unacceptable everywhere &mdash; but on the bench, it is
              catastrophic. Marco Reid Bench verifies every citation against
              authoritative public domain sources before it appears on your
              screen.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-4 sm:grid-cols-3">
            <Reveal delay={0.1}>
              <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card text-center">
                <p className="font-serif text-5xl text-forest-600">&check;</p>
                <p className="mt-4 text-lg font-semibold text-navy-700">
                  Verified
                </p>
                <p className="mt-2 text-sm text-navy-400">
                  Confirmed in authoritative source. Direct link to the full
                  opinion or statute. Safe to cite in any judicial opinion.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card text-center">
                <p className="font-serif text-5xl text-yellow-600">&minus;</p>
                <p className="mt-4 text-lg font-semibold text-navy-700">
                  Unverified
                </p>
                <p className="mt-2 text-sm text-navy-400">
                  Could not be confirmed in public domain sources. Flagged
                  visibly. Requires manual verification before reliance.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card text-center">
                <p className="font-serif text-5xl text-red-600">&times;</p>
                <p className="mt-4 text-lg font-semibold text-navy-700">
                  Not Found
                </p>
                <p className="mt-2 text-sm text-navy-400">
                  Does not appear to exist. Blocked from insertion into any
                  document or draft opinion. Period.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.35}>
            <p className="mx-auto mt-12 max-w-2xl text-center text-sm leading-relaxed text-navy-400">
              Always verify every case citation before relying on it in any
              judicial opinion or order. Marco Reid&rsquo;s citation
              verification system reduces hallucination risk but does not
              eliminate it. The professional responsibility for verifying
              citations rests with the judge and chambers staff.
            </p>
          </Reveal>
        </Container>
      </section>

      <div className="h-px bg-navy-100 mx-auto max-w-sm" />

      {/* ── Security ── */}
      <section
        className="py-32 sm:py-44 bg-navy-50"
        aria-label="Chambers-grade security"
      >
        <Container>
          <Reveal>
            <p className="text-center text-xs font-medium uppercase tracking-widest text-navy-500">
              Chambers-grade security
            </p>
            <h2 className="mt-6 text-center text-display font-serif text-navy-700">
              Judicial data deserves judicial-grade protection.
            </h2>
          </Reveal>

          <div className="mx-auto mt-16 grid max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "End-to-end encryption",
                desc: "All data encrypted at rest and in transit. TLS 1.3 minimum. FIPS 140-3 compliant encryption for the most sensitive judicial environments.",
              },
              {
                title: "Zero training guarantee",
                desc: "No chambers data, no queries, no draft opinions, and no research history are ever used to train any AI model. Your judicial work stays yours.",
              },
              {
                title: "Sovereign deployment",
                desc: "Deploy within the court's own infrastructure. On-premises or private cloud. The court controls the data, the network, and the access.",
              },
              {
                title: "Air-gapped mode",
                desc: "For sealed matters, grand jury proceedings, and the most sensitive cases. Complete network isolation with local-only operation.",
              },
              {
                title: "Immutable audit trails",
                desc: "Every query, every research result, every draft revision logged with cryptographic signatures. Append-only. Tamper-evident.",
              },
              {
                title: "Role-based access control",
                desc: "Judge, law clerk, staff attorney, court administrator. Each role sees only what they should. Granular permissions per chambers.",
              },
            ].map((item) => (
              <Reveal key={item.title} delay={0.05}>
                <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5">
                  <p className="font-semibold text-navy-700">{item.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-navy-400">
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── AI Disclaimer ── */}
      <section className="py-16" aria-label="AI disclaimer">
        <Container>
          <div className="mx-auto max-w-2xl">
            <AiDisclaimer />
          </div>
        </Container>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-32 sm:py-44" aria-label="Get started">
        <Container className="relative text-center">
          <Reveal>
            <h2 className="text-display font-serif text-forest-500">
              The bench deserves better tools.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-xl text-navy-400">
              Verified research. Structured drafting. Chambers-grade security.
              Purpose-built for judges and judicial clerks.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-12 flex flex-wrap justify-center gap-4">
              <Button href="/courts/pilot" size="lg">
                Request a pilot
              </Button>
              <Button href="/courts" variant="secondary" size="lg">
                Back to Courts
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
