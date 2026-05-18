import Container from "@/app/components/shared/Container";
import Reveal from "@/app/components/effects/Reveal";
import MarcoResearchBox from "@/app/components/marketing/MarcoResearchBox";
import {
  type MarcoDomain,
  type MarcoSource,
} from "@/lib/marco/sources";

interface Props {
  domain: MarcoDomain;
  eyebrow: string;
  title: string;
  intro: string;
  sources: ReadonlyArray<MarcoSource>;
  exampleQueries: ReadonlyArray<string>;
  defaultJurisdiction: "NZ" | "AU" | "UK" | "US";
  /** Below the fold: bullet points describing this centre's verification rules. */
  verificationRules: ReadonlyArray<string>;
}

const JURISDICTION_LABEL: Record<string, string> = {
  NZ: "NZ",
  AU: "AU",
  UK: "UK",
  US: "US",
  CA: "CA",
  EU: "EU",
  GLOBAL: "Global",
};

const AUTHORITY_LABEL: Record<MarcoSource["authorityKinds"][number], string> = {
  STATUTE: "Statute",
  CASE_LAW: "Case law",
  REGULATION: "Regulation",
  RULING: "Ruling",
  STANDARD: "Standard",
  GUIDE: "Guide",
  DATASET: "Dataset",
};

export default function MarcoCentrePage({
  domain,
  eyebrow,
  title,
  intro,
  sources,
  exampleQueries,
  defaultJurisdiction,
  verificationRules,
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
            <p className="mt-6 text-xl leading-relaxed text-white/90">
              {intro}
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container narrow>
          <Reveal>
            <MarcoResearchBox
              domain={domain}
              defaultJurisdiction={defaultJurisdiction}
              exampleQueries={exampleQueries}
            />
          </Reveal>
        </Container>
      </section>

      <section className="bg-navy-50 py-20 sm:py-28">
        <Container>
          <Reveal>
            <h2 className="text-center font-serif text-display text-navy-800">
              Sources Marco draws from.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-navy-400">
              Every citation Marco surfaces is matched against this catalogue.
              No matched source = no insertion into a signed document. Period.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sources.map((s) => (
              <Reveal key={s.slug} delay={0.03}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block h-full rounded-2xl border border-navy-100 bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-300 hover:shadow-card-hover"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-serif text-lg text-navy-800 group-hover:text-navy-900">
                      {s.name}
                    </h3>
                    <div className="flex shrink-0 flex-wrap gap-1">
                      {s.jurisdictions.map((j) => (
                        <span
                          key={j}
                          className="rounded border border-navy-200 bg-navy-50 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-navy-600"
                        >
                          {JURISDICTION_LABEL[j] ?? j}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-navy-500">
                    {s.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {s.authorityKinds.map((k) => (
                      <span
                        key={k}
                        className="rounded-md bg-forest-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-forest-700"
                      >
                        {AUTHORITY_LABEL[k]}
                      </span>
                    ))}
                  </div>
                  <p className="mt-4 break-all font-mono text-[11px] text-navy-400">
                    {s.url}
                  </p>
                </a>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container narrow>
          <Reveal>
            <h2 className="font-serif text-display text-navy-800">
              Verification rules.
            </h2>
            <p className="mt-4 text-lg text-navy-400">
              The structural commitments that make every Marco answer
              defensible. These are non-negotiable; they are encoded in the
              research API, not just promised in marketing copy.
            </p>
          </Reveal>

          <ul className="mt-10 space-y-3">
            {verificationRules.map((r) => (
              <Reveal key={r} delay={0.03}>
                <li className="flex items-start gap-3 rounded-xl border border-navy-100 bg-white p-5 text-sm leading-relaxed text-navy-600 shadow-card">
                  <span className="mt-0.5 text-forest-500">&#10003;</span>
                  <span>{r}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
