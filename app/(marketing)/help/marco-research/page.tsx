import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/app/components/shared/Container";
import Reveal from "@/app/components/effects/Reveal";

export const metadata: Metadata = {
  title: "Marco research \u2014 Help centre",
  description:
    "How to use Marco effectively: citation verification, writing good queries, the \u2318K command palette, and managing your research history.",
};

const citationStatuses = [
  {
    badge: "VERIFIED",
    badgeClass: "bg-forest-50 text-forest-600",
    desc: "The citation was found in a trusted primary source \u2014 CourtListener, GovInfo, state statute databases, or a recognised regulatory publisher \u2014 and the quoted text matches. Safe to rely on after your own review.",
  },
  {
    badge: "UNVERIFIED",
    badgeClass: "bg-plum-50 text-plum-600",
    desc: "The citation format looks real but Marco could not confirm it against a primary source. Treat it as a research lead, not a fact. Click through to see which sources Marco tried and run your own verification before using it.",
  },
  {
    badge: "NOT_FOUND",
    badgeClass: "bg-navy-100 text-navy-500",
    desc: "No matching authority exists in any of the sources we query. The citation is almost certainly a hallucination. Marco surfaces this rather than silently dropping it so you know the model tried and failed.",
  },
];

const bestPractices = [
  {
    title: "Be specific about jurisdiction",
    desc: "Add the state, country, or court. \u201cStatute of limitations for breach of written contract in New York\u201d returns a sharp answer; \u201cstatute of limitations for breach of contract\u201d returns a generic survey that you still have to narrow down yourself.",
  },
  {
    title: "Include the factual context",
    desc: "One sentence of context dramatically improves results. \u201cCan a CPA disclose client tax records to a successor accountant without written consent?\u201d is better than \u201cclient disclosure rules.\u201d",
  },
  {
    title: "Specify the domain",
    desc: "If you want case law, say case law. If you want a statute, say statute. If you want a regulatory interpretation, say so. Marco honours the instruction and returns authority of the type you asked for.",
  },
  {
    title: "Ask follow-up questions",
    desc: "Marco keeps the thread. After the first answer, ask \u201cWhat about the equivalent rule in New Jersey?\u201d or \u201cDoes this change if the agreement is oral?\u201d \u2014 you don\u2019t have to restate everything each time.",
  },
];

const faqs = [
  {
    q: "Is Marco giving me legal or financial advice?",
    a: "No. Marco is a research assistant. It surfaces authority, drafts analysis, and verifies citations \u2014 but the professional judgement, client advice, and final work product are yours. Every output is labelled accordingly.",
  },
  {
    q: "How does Marco decide which sources to search?",
    a: "Marco routes each query based on the type of authority requested and your firm\u2019s jurisdiction. US case law goes through CourtListener and federal/state reporters; statutes go through GovInfo and state legislature feeds; regulations go through agency publications. You can see the full routing on the result page.",
  },
  {
    q: "What happens when Marco is uncertain?",
    a: "Marco tells you. If confidence is low, the response is labelled as such and Marco suggests how to tighten the query. We would rather return a short, honest answer than a confident wrong one.",
  },
  {
    q: "Can I use Marco for non-US research?",
    a: "Yes. Marco covers US, UK, Australian, and New Zealand primary sources, with Canadian coverage in progress. EU coverage is on the roadmap for late 2026. Citation verification is strongest in the US and New Zealand today.",
  },
  {
    q: "How long is my query history kept?",
    a: "Queries run inside a matter live with that matter for the matter\u2019s full retention period. Ad-hoc queries live in your personal history for 12 months by default; you can change that in settings or delete individual queries at any time.",
  },
  {
    q: "Can colleagues see my queries?",
    a: "Only queries saved to a matter are visible to other authorised users of that matter. Your personal query history is private to you. Firm administrators can see aggregate usage but not the content of personal queries.",
  },
  {
    q: "Does Marco learn from my queries?",
    a: "Marco uses anonymised, opt-in signals \u2014 which citations you kept, which you rejected \u2014 to improve verification. We never train foundation models on your client data. You can opt out of the flywheel entirely in firm settings.",
  },
  {
    q: "What if Marco returns a citation that doesn\u2019t exist?",
    a: "That citation is flagged NOT_FOUND and excluded from the drafted analysis. If you see an UNVERIFIED or NOT_FOUND citation that should be verifiable, forward it to support@marcoreid.com \u2014 we use the report to tune our source routing.",
  },
];

export default function MarcoResearchPage() {
  return (
    <>
      <section className="bg-navy-500 pt-32 pb-20 sm:pt-40 sm:pb-28">
        <Container className="text-center">
          <p className="text-sm font-semibold tracking-wider text-forest-300">
            Help centre &middot; Marco research
          </p>
          <h1 className="mt-6 font-serif text-hero text-white">
            Research with Marco.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-xl text-navy-200">
            How citation verification works, how to write sharper queries, and
            when to trust the output.
          </p>
        </Container>
      </section>

      <section className="py-24 sm:py-36" aria-label="What Marco is">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <h2 className="font-serif text-headline text-navy-800">
                What Marco is &mdash; and isn&rsquo;t.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-navy-500">
                Marco is a research assistant. It reads your question, finds
                the authority that bears on it, verifies the citations against
                primary sources, and drafts a structured analysis that you can
                edit, save to a matter, or discard.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-navy-500">
                Marco is not a lawyer. Marco is not an accountant. Marco does
                not give legal or financial advice and its output is not a
                substitute for professional judgement. Every firm using Marco
                Reid is responsible for reviewing research output before it
                informs client advice or work product.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-navy-500">
                That boundary is not a disclaimer. It is the reason Marco is
                useful. Marco does the search, the cross-reference, and the
                first-draft synthesis; you do the judgement.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="bg-navy-50 py-24 sm:py-36" aria-label="Citation verification">
        <Container>
          <Reveal>
            <h2 className="font-serif text-display text-navy-800">
              Citation verification.
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-navy-400">
              Every citation Marco returns carries a status. The status tells
              you exactly how much to trust it.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-4 sm:grid-cols-3">
            {citationStatuses.map((s, i) => (
              <Reveal key={s.badge} delay={i * 0.05}>
                <div className="h-full rounded-2xl border border-navy-100 bg-white p-8 shadow-card">
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-bold tracking-wider ${s.badgeClass}`}
                  >
                    {s.badge}
                  </span>
                  <p className="mt-6 text-sm leading-relaxed text-navy-500">
                    {s.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24 sm:py-36" aria-label="Best practices">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <h2 className="font-serif text-display text-navy-800">
                Writing good queries.
              </h2>
              <p className="mt-4 text-lg text-navy-400">
                Four habits that separate productive Marco users from
                frustrated ones.
              </p>
            </Reveal>

            <div className="mt-12 space-y-8">
              {bestPractices.map((bp, i) => (
                <Reveal key={bp.title} delay={i * 0.05}>
                  <div className="rounded-2xl border border-navy-100 bg-white p-8 shadow-card">
                    <h3 className="font-serif text-xl text-navy-800">
                      {bp.title}
                    </h3>
                    <p className="mt-3 leading-relaxed text-navy-500">
                      {bp.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-navy-50 py-24 sm:py-36" aria-label="Command palette">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <h2 className="font-serif text-headline text-navy-800">
                The {"\u2318"}K command palette.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-navy-500">
                Press {"\u2318"}K on macOS or Ctrl+K on Windows from anywhere in
                the platform. The palette opens over whatever you were doing
                without losing your place. Start typing a question and Marco
                begins work the moment you hit enter.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-navy-500">
                The palette is context-aware. If you trigger it from inside a
                matter, Marco inherits that matter&rsquo;s jurisdiction, client
                context, and prior research. Trigger it from the global
                dashboard and Marco treats the query as firm-wide.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-navy-500">
                Every command palette interaction is keyboard-driven. Arrow
                keys navigate, enter confirms, escape dismisses, and {"\u2318"}S
                saves the result to the active matter.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="py-24 sm:py-36" aria-label="Inserting citations">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <h2 className="font-serif text-headline text-navy-800">
                Inserting citations into documents.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-navy-500">
                Inside the document editor, press {"\u2318"}J to open the citation
                inserter. Search your saved research or run a fresh Marco
                query, and click to insert. The citation drops in with the
                correct format for your firm&rsquo;s chosen citation style &mdash;
                Bluebook, ALWD, or the style you configured per jurisdiction.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-navy-500">
                Inserted citations remain linked to the source. If the
                underlying authority is amended, superseded, or overruled,
                Marco flags the citation in any document where it appears and
                suggests a replacement.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="bg-navy-50 py-24 sm:py-36" aria-label="Query history">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <h2 className="font-serif text-headline text-navy-800">
                Managing your query history.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-navy-500">
                Every query you run is saved to your personal history by
                default. Open &ldquo;My research&rdquo; from the sidebar to
                browse, search, and filter by date, jurisdiction, or matter.
                From any result you can re-run the query, save it to a matter,
                or delete it.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-navy-500">
                Queries saved to a matter leave your personal history and live
                with the matter instead, visible to every authorised team
                member. This is how research becomes an institutional asset
                rather than a private notebook.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="py-24 sm:py-36" aria-label="FAQ">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <h2 className="font-serif text-display text-navy-800">
                Frequently asked.
              </h2>
            </Reveal>

            <div className="mt-12 space-y-10">
              {faqs.map((f, i) => (
                <Reveal key={f.q} delay={i * 0.03}>
                  <div>
                    <h3 className="font-serif text-xl text-navy-800">
                      {f.q}
                    </h3>
                    <p className="mt-3 text-lg leading-relaxed text-navy-500">
                      {f.a}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.2}>
              <div className="mt-16 rounded-2xl border border-navy-100 bg-navy-50 p-8">
                <p className="font-serif text-xl text-navy-700">
                  Still have a question about Marco?
                </p>
                <p className="mt-2 text-navy-400">
                  Email{" "}
                  <a
                    href="mailto:support@marcoreid.com"
                    className="text-navy-600 underline-offset-4 hover:underline"
                  >
                    support@marcoreid.com
                  </a>
                  {" "}or browse the{" "}
                  <Link
                    href="/help"
                    className="text-navy-600 underline-offset-4 hover:underline"
                  >
                    rest of the help centre
                  </Link>
                  .
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
