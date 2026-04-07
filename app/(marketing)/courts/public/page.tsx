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
    </>
  );
}
