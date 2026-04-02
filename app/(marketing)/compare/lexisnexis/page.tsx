import type { Metadata } from "next";
import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
import SchemaMarkup from "@/app/components/shared/SchemaMarkup";
import Reveal from "@/app/components/effects/Reveal";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "AlecRae vs LexisNexis \u2014 The AI-Native Alternative",
  description:
    "Why professionals are switching from LexisNexis to AlecRae. Cross-domain research, verified citations, practice management, voice dictation, and one unified platform.",
};

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: BRAND.name,
  applicationCategory: "Legal",
  operatingSystem: "Web",
  url: `${BRAND.url}/compare/lexisnexis`,
};

const painPoints = [
  {
    pain: "LexisNexis pricing is opaque and expensive. Enterprise contracts. Per-search charges. Surprise bills",
    solution: "AlecRae pricing is transparent and published. $99\u2013$399/month. Unlimited searches. No surprises",
  },
  {
    pain: "LexisNexis is a collection of fragmented products. Research in one tool, practice management in another, analytics in a third",
    solution: "AlecRae is one unified platform. Research, practice management, billing, dictation, documents, client portal \u2014 one login",
  },
  {
    pain: "LexisNexis invested in Harvey AI for research but still has no integrated practice management, dictation, or accounting",
    solution: "AlecRae has its own Oracle AI research PLUS practice management, voice dictation, document AI, and full accounting \u2014 all built together",
  },
  {
    pain: "Shepard\u2019s Citations is powerful but locked behind the LexisNexis paywall. No alternative outside their ecosystem",
    solution: "The Oracle verifies citations against public domain sources \u2014 CourtListener, GovInfo, IRS.gov \u2014 no paywall, no lock-in",
  },
  {
    pain: "LexisNexis has no voice dictation. No way to speak research queries or dictate documents",
    solution: "AlecRae Voice is the platform\u2019s intelligence layer. Speak your research query, dictate your document, log your billing \u2014 in 9 languages",
  },
  {
    pain: "LexisNexis cannot answer questions that span legal and accounting domains simultaneously",
    solution: "The Oracle crosses the law-accounting boundary in a single query. Immigration tax implications? One search. One answer. Nobody else can do this",
  },
];

export default function CompareLexisNexisPage() {
  return (
    <>
      <SchemaMarkup schema={schema} />

      <section className="bg-navy-500 pt-32 pb-20 sm:pt-40 sm:pb-28">
        <Container className="text-center">
          <p className="text-sm font-semibold tracking-wider text-forest-300">
            AlecRae vs LexisNexis
          </p>
          <h1 className="mt-6 font-serif text-hero text-white">
            LexisNexis sells research.
            <br />
            AlecRae sells the ability to practise.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-xl text-navy-200">
            Cross-domain AI research, verified citations, practice management,
            billing, voice dictation, document AI, and client collaboration &mdash;
            unified in one platform built for the AI era.
          </p>
        </Container>
      </section>

      <section className="py-24 sm:py-36" aria-label="Comparison">
        <Container>
          <Reveal>
            <h2 className="font-serif text-display text-navy-800">
              The pain. The solution.
            </h2>
          </Reveal>

          <div className="mt-16 space-y-4">
            {painPoints.map((p, i) => (
              <Reveal key={i} delay={0.05}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-red-100 bg-red-50/50 p-6">
                    <p className="text-xs font-bold tracking-wider text-red-600">The pain</p>
                    <p className="mt-3 text-sm leading-relaxed text-navy-600">{p.pain}</p>
                  </div>
                  <div className="rounded-xl border border-forest-200 bg-forest-50/50 p-6">
                    <p className="text-xs font-bold tracking-wider text-forest-600">AlecRae</p>
                    <p className="mt-3 text-sm leading-relaxed text-navy-600">{p.solution}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24 sm:py-36" aria-label="Get started">
        <Container className="text-center">
          <Reveal>
            <h2 className="font-serif text-display text-navy-800">
              Ready for the AI era?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10 flex justify-center gap-4">
              <Button href="/pricing" size="lg">See pricing</Button>
              <Button href="/oracle" variant="secondary" size="lg">Explore The Oracle</Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
