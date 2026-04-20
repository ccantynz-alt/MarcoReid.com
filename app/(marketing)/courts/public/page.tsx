import type { Metadata } from "next";
import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
import Reveal from "@/app/components/effects/Reveal";

export const metadata: Metadata = {
  title: "Marco Reid Public \u2014 Open Justice, Finally Open",
  description:
    "Livestreaming, searchable transcripts, opinion publication, public docket access. The transparency every constitution promises and few courts deliver.",
};

export default function PublicPage() {
  return (
    <>
      <section className="relative flex min-h-[80vh] items-center justify-center">
        <Container className="text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-forest-600">
            Marco Reid Public
          </p>
          <h1 className="mt-8 text-hero font-serif">
            <span className="text-forest-500">Open justice,</span>
            <br />
            <span className="text-navy-700">finally open.</span>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-xl leading-relaxed text-navy-400">
            Open courts are a constitutional principle. In practice, transcripts cost dollars per
            page, opinions take months to publish, and live access ends at the courtroom door.
            Marco Reid Public turns every proceeding into searchable, streamable, downloadable
            public record &mdash; with sealing controls baked in.
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
                Transparency is a promise courts rarely keep.
              </h2>
              <p>
                The principle of open courts is enshrined in the Constitution. In practice,
                &ldquo;open&rdquo; means you can physically sit in a courtroom &mdash; if you
                can take a day off work, find the right building, navigate the security line,
                and arrive before every seat is taken. For the vast majority of Americans,
                courts are effectively closed institutions. Proceedings happen behind doors
                that are technically unlocked but practically inaccessible.
              </p>
              <p>
                Published opinions take months to appear on court websites &mdash; if they
                appear at all. Transcripts cost dollars per page through PACER. Docket entries
                are written in codes that only lawyers can parse. For the 25 million US
                residents with limited English proficiency, court records might as well not
                exist. The gap between the promise of open justice and the reality of public
                access has never been wider.
              </p>
              <p>
                Marco Reid Public closes that gap. It turns every public proceeding into
                a livestream, every opinion into a searchable record, and every docket entry
                into plain language &mdash; in 100+ languages. Sealing controls stay granular
                and automatic so sealed matters remain sealed. Open justice finally becomes open.
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
                title: "Livestream with real-time captions",
                desc: "Hearings are livestreamed from the courtroom with real-time closed captions in multiple languages. The public can watch from anywhere &mdash; no courthouse visit required.",
              },
              {
                step: "2",
                title: "Searchable transcripts and opinions",
                desc: "Transcripts and judicial opinions are published immediately after proceedings and made freely searchable. No per-page fees. No weeks-long delays. Full-text search across the entire court record.",
              },
              {
                step: "3",
                title: "Press portal for journalists",
                desc: "A dedicated press portal provides streamlined access for journalists &mdash; press credentials, embargoed releases, bulk data exports, and real-time alerts on cases of public interest.",
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
              { title: "Hearing livestream", desc: "Public stream with closed captioning" },
              { title: "Transcript search", desc: "Every word, every hearing, instantly searchable" },
              { title: "Opinion publication", desc: "Auto-publish with citation linking" },
              { title: "Public docket access", desc: "Plain-language case summaries" },
              { title: "Sealing controls", desc: "Granular redaction for sealed matters" },
              { title: "Press portal", desc: "Press credentials, embargoed releases" },
              { title: "Open data API", desc: "Bulk access for researchers and journalists" },
              { title: "Multi-language", desc: "Auto-translated transcripts for the public" },
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

      <section className="bg-navy-50/40 py-32" aria-label="Open justice means open access">
        <Container>
          <Reveal>
            <h2 className="text-center text-display font-serif text-navy-700">
              Open justice means open access.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-center text-lg text-navy-400">
              The Sixth Amendment guarantees public trials. In practice, &ldquo;public&rdquo;
              means you can physically sit in a courtroom &mdash; if you can take a day off work,
              find the right building, and arrive before seats fill up. Marco Reid Public brings
              the courthouse to every screen.
            </p>
          </Reveal>
          <div className="mx-auto mt-16 grid max-w-4xl gap-6 md:grid-cols-3">
            {[
              {
                title: "Hearing livestreams",
                desc: "Every public hearing is streamed live with closed captioning. Families, journalists, and civic observers can watch from anywhere. No travel, no missed work, no turned-away-at-the-door. Sealed proceedings stay sealed &mdash; access controls are granular and automatic.",
              },
              {
                title: "Searchable opinion database",
                desc: "Published opinions become instantly searchable the moment they are filed. Full-text search, citation linking, and topic classification make it easy for lawyers, researchers, and the public to find the law that governs their lives &mdash; without a Westlaw subscription.",
              },
              {
                title: "Multi-language translation",
                desc: "For the 25 million US residents with limited English proficiency, court records might as well not exist. Marco auto-translates transcripts, opinions, and docket entries into 100+ languages, making the justice system legible to the communities it serves.",
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

      <section className="py-32" aria-label="Impact">
        <Container className="text-center">
          <Reveal>
            <p className="mx-auto max-w-3xl text-2xl font-serif leading-snug text-navy-700 md:text-3xl">
              &ldquo;Only <span className="text-forest-500">12%</span> of Americans can name all
              three branches of government. Public access to justice starts with public access
              to courts.&rdquo;
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
              Marco Reid Public deploys alongside your existing court website and integrates
              with your case management system. Livestreaming, searchable transcripts, and
              multi-language access go live in days, not months. Start with a single courtroom
              or go court-wide &mdash; the pilot is free.
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
