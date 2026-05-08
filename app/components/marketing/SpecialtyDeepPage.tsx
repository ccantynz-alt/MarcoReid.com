import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
import Reveal from "@/app/components/effects/Reveal";

export interface SpecialtyJurisdictionBlock {
  code: "NZ" | "AU" | "UK" | "US";
  label: string;
  /** Key statutes / instruments that govern this practice in this jurisdiction. */
  authorities: string[];
  /** What we cover in this specialty for this jurisdiction. */
  covers: string[];
  /** Common matter types the specialty handles. */
  matters?: string[];
}

export interface SpecialtyHowMarcoHelps {
  title: string;
  body: string;
}

interface Props {
  eyebrow: string;
  title: string;
  intro: string;
  jurisdictions: SpecialtyJurisdictionBlock[];
  howMarcoHelps: SpecialtyHowMarcoHelps[];
  /** Bottom CTA copy. */
  cta: { heading: string; body: string; primaryHref?: string };
}

export default function SpecialtyDeepPage({
  eyebrow,
  title,
  intro,
  jurisdictions,
  howMarcoHelps,
  cta,
}: Props) {
  return (
    <>
      <section className="bg-navy-500 pt-32 pb-20 sm:pt-40">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">
              {eyebrow}
            </p>
            <h1 className="mt-6 font-serif text-hero text-white">{title}</h1>
            <p className="mt-6 text-xl leading-relaxed text-white/90">{intro}</p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button href="/generate" variant="gold" size="lg">
                Generate a document &rarr;
              </Button>
              <Button
                href="/specialties"
                variant="ghost"
                size="lg"
                className="text-white hover:text-gold-300"
              >
                All specialties
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <Reveal>
            <h2 className="text-center font-serif text-display text-navy-800">
              Coverage by jurisdiction.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-navy-400">
              The statutes, the regulators, and the matter types Marco Reid
              handles for this specialty in each market.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-6 lg:grid-cols-2">
            {jurisdictions.map((j) => (
              <Reveal key={j.code} delay={0.05}>
                <div className="flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-6 shadow-card sm:p-8">
                  <div className="flex items-center gap-3">
                    <span className="rounded-md border border-navy-200 bg-navy-50 px-2 py-1 text-xs font-bold uppercase tracking-wider text-navy-700">
                      {j.code}
                    </span>
                    <h3 className="font-serif text-2xl text-navy-800">
                      {j.label}
                    </h3>
                  </div>

                  <div className="mt-6">
                    <p className="text-xs font-semibold uppercase tracking-wider text-forest-600">
                      Authorities
                    </p>
                    <ul className="mt-3 space-y-2 text-sm text-navy-600">
                      {j.authorities.map((a) => (
                        <li key={a} className="flex items-start gap-2">
                          <span className="mt-0.5 text-forest-500">&#10003;</span>
                          <span>{a}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6">
                    <p className="text-xs font-semibold uppercase tracking-wider text-forest-600">
                      What we cover
                    </p>
                    <ul className="mt-3 space-y-2 text-sm text-navy-600">
                      {j.covers.map((c) => (
                        <li key={c} className="flex items-start gap-2">
                          <span className="mt-0.5 text-forest-500">&#10003;</span>
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {j.matters && j.matters.length > 0 && (
                    <div className="mt-6">
                      <p className="text-xs font-semibold uppercase tracking-wider text-forest-600">
                        Common matters
                      </p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {j.matters.map((m) => (
                          <span
                            key={m}
                            className="rounded-md border border-navy-100 bg-navy-50 px-2 py-1 text-xs text-navy-600"
                          >
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-navy-50 py-20 sm:py-28">
        <Container>
          <Reveal>
            <h2 className="text-center font-serif text-display text-navy-800">
              How Marco Reid helps.
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {howMarcoHelps.map((h) => (
              <Reveal key={h.title} delay={0.05}>
                <div className="flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
                  <h3 className="font-serif text-lg text-navy-800">{h.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy-500">
                    {h.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <p className="mx-auto mt-12 max-w-2xl text-center text-xs text-navy-400">
            Marco Reid is a workspace and tooling vendor. It is not itself
            licensed to practise. Every consumer-facing output passes
            through SignoffRequest and is approved by a credentialled
            practitioner in the relevant jurisdiction before release.
          </p>
        </Container>
      </section>

      <section className="bg-navy-500 py-24 sm:py-32" aria-label="Get started">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-display text-white">
              {cta.heading}
            </h2>
            <p className="mt-6 text-lg text-white/85">{cta.body}</p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button
                href={cta.primaryHref ?? "/contact"}
                variant="gold"
                size="lg"
              >
                Talk to us &rarr;
              </Button>
              <Button
                href="/generate"
                variant="ghost"
                size="lg"
                className="text-white hover:text-gold-300"
              >
                Generate a document
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
