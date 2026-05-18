import type { Metadata } from "next";
import Container from "@/app/components/shared/Container";
import Reveal from "@/app/components/effects/Reveal";
import DigestSubscribeForm from "@/app/components/marketing/DigestSubscribeForm";

export const metadata: Metadata = {
  title: "Daily intelligence digest — only what affects your specialties",
  description:
    "AI-curated regulatory + court updates, delivered daily. Picks only what matters to your specialties + jurisdictions. NZ + AU + UK + US. Free for verified professionals; once-daily, never spam.",
};

const samples = [
  {
    domain: "Legal",
    bullet:
      "**NZLS Practice Briefing 2026/05** — New Lawyers Conduct and Client Care Rules amendment on AI-generated work product. Effective 1 July 2026. Cited in your last 12 client letters.",
  },
  {
    domain: "Tax",
    bullet:
      "**IRD Public Ruling BR Pub 26/02** — GST treatment of cryptocurrency exchanges. Aligns with your unanswered question from 4 days ago in Marco Accounting research.",
  },
  {
    domain: "Court",
    bullet:
      "**[2026] NZHC 412** — Judgment on summary judgment standard delivered yesterday. Cites Westpac Securities NZ Ltd v Bell which appeared in your 31 March research session.",
  },
  {
    domain: "AML/CFT",
    bullet:
      "**MFAT sanctions register update** — 7 new individuals listed under the Russia Regulations. Your client onboarding form was updated automatically; review queue shows 0 affected matters.",
  },
];

const features = [
  {
    title: "Specialty-targeted",
    body:
      "Pick from the 56 specialties Marco Reid covers. We only surface updates that affect those branches. A family lawyer doesn't see the SMSF audit changes; a forensic accountant doesn't see the tenancy tribunal updates.",
  },
  {
    title: "Jurisdiction-scoped",
    body:
      "NZ + AU + UK + US. Pick which jurisdictions you practise in. The digest scopes to those; cross-jurisdictional matters surface where Marco detects relevance.",
  },
  {
    title: "Linked to your research history",
    body:
      "If you asked Marco a question last week, and a new ruling has just landed that bears on it, the digest tells you. Continuity, not noise.",
  },
  {
    title: "Daily / Weekdays / Weekly",
    body:
      "Pick the cadence. Daily for litigators on a 3-month ET clock. Weekdays for everyone else. Weekly for in-house counsel and partners who want the briefer.",
  },
  {
    title: "Read-time-bounded",
    body:
      "Five items, two sentences each. Ten minutes of reading at most. We index the source for one click through. The point is to never miss the thing that matters; not to drown you in everything.",
  },
  {
    title: "Free for verified professionals",
    body:
      "Marco Reid Firm + Solo subscribers get the digest at no extra charge. Public users can subscribe at no cost too &mdash; the digest is a relationship-builder, not a product.",
  },
];

export default function DigestPage() {
  return (
    <>
      <section className="bg-navy-500 pt-32 pb-20 sm:pt-40">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">
              Daily digest
            </p>
            <h1 className="mt-6 font-serif text-hero text-white">
              Only the regulatory news your practice actually needs.
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-white/90">
              An AI-curated digest of regulatory changes, court judgments,
              tax rulings, and sanctions updates &mdash; scoped to your
              specialties and jurisdictions. Five items, ten minutes of
              reading, zero noise. Daily, weekdays, or weekly.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container narrow>
          <Reveal>
            <h2 className="font-serif text-2xl text-navy-800">
              What a typical morning looks like.
            </h2>
            <p className="mt-2 text-sm text-navy-500">
              An NZ employment + tax practitioner&rsquo;s digest, indicative
              format:
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="mt-6 rounded-2xl border border-navy-100 bg-white p-6 shadow-card sm:p-8">
              <p className="font-serif text-lg text-navy-800">
                Marco Reid Daily — Tuesday, 26 May 2026
              </p>
              <ul className="mt-5 space-y-4">
                {samples.map((s, i) => (
                  <li
                    key={s.domain}
                    className="flex items-start gap-3 border-b border-navy-100 pb-4 last:border-b-0 last:pb-0"
                  >
                    <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy-100 font-mono text-xs font-bold text-navy-600">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-forest-600">
                        {s.domain}
                      </p>
                      <p
                        className="mt-1 text-sm leading-relaxed text-navy-700"
                        dangerouslySetInnerHTML={{ __html: s.bullet }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-[11px] text-navy-400">
                Reading time: 10 minutes. Each item links to the
                authoritative source. Sample shown for illustration; your
                digest reflects the specialties + jurisdictions you pick at
                subscribe.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-navy-50 py-16 sm:py-20">
        <Container narrow>
          <Reveal>
            <h2 className="text-center font-serif text-display text-navy-800">
              Subscribe.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-center text-sm text-navy-400">
              Free. Pick your jurisdictions, specialties, and cadence. We
              don&rsquo;t share your email. One-click unsubscribe in every
              issue.
            </p>
          </Reveal>
          <div className="mt-10">
            <DigestSubscribeForm />
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <Reveal>
            <h2 className="text-center font-serif text-display text-navy-800">
              How it stays useful.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-navy-400">
              Most professional newsletters fail at signal-to-noise. The
              digest is engineered around five rules.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <Reveal key={f.title} delay={0.05}>
                <div className="flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
                  <h3 className="font-serif text-lg text-navy-800">{f.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy-500">
                    {f.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
