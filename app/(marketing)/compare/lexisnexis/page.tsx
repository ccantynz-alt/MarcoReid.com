import type { Metadata } from "next";
import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
import SchemaMarkup from "@/app/components/shared/SchemaMarkup";
import Reveal from "@/app/components/effects/Reveal";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Marco Reid vs LexisNexis — The AI-Native Alternative",
  description:
    "Why professionals are switching from LexisNexis to Marco Reid. Cross-domain research, verified citations, practice management, voice dictation, and one unified platform.",
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
    pain: "Pricing is never published — custom quotes through sales reps. Users report searching for cases they “knew existed” that wouldn’t populate unless they used the exact case number. One user: “I find myself crossing my fingers when I login.”",
    solution: "Marco Reid pricing is transparent and published. $99–$399/month. Unlimited searches. No surprises. Every citation verified before display.",
  },
  {
    pain: "LexisNexis is a collection of fragmented products. CourtLink docket tracking is a separate paid product not included in Lexis+ subscriptions. More cost layering for every capability",
    solution: "Marco Reid is one unified platform. Research, practice management, billing, dictation, documents, client portal — one login, one bill. Nothing costs extra",
  },
  {
    pain: "Harvey AI partnership expected to push costs $400–$600 per lawyer per year on top of existing subscriptions. One firm was quoted over £200 per lawyer for AI — after one email the price was slashed 60%. Harvey itself costs $1,000–$1,200/month per lawyer",
    solution: "Marco Reid’s Marco is included in the platform price. No AI surcharge. No Harvey-level pricing. Cross-domain research verified against public sources, from $99/month",
  },
  {
    pain: "Shepard’s Citations is powerful but locked behind the LexisNexis paywall. No alternative outside their ecosystem",
    solution: "Marco verifies citations against public domain sources — CourtListener, GovInfo, IRS.gov — no paywall, no lock-in",
  },
  {
    pain: "LexisNexis has no voice dictation. No way to speak research queries or dictate documents",
    solution: "Marco Reid Voice is the platform’s intelligence layer. Speak your research query, dictate your document, log your billing — in 9 languages",
  },
  {
    pain: "LexisNexis cannot answer questions that span legal and accounting domains simultaneously",
    solution: "Marco crosses the law-accounting boundary in a single query. Immigration tax implications? One search. One answer. Nobody else can do this",
  },
];

export default function CompareLexisNexisPage() {
  return (
    <>
      <SchemaMarkup schema={schema} />

      <section className="bg-navy-500 pt-32 pb-20 sm:pt-40 sm:pb-28">
        <Container className="text-center">
          <p className="text-sm font-semibold tracking-wider text-forest-300">
            Marco Reid vs LexisNexis
          </p>
          <h1 className="mt-6 font-serif text-hero text-white">
            LexisNexis sells research.
            <br />
            Marco Reid sells the ability to practise.
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
                    <p className="text-xs font-bold tracking-wider text-forest-600">Marco Reid</p>
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
              <Button href="/marco" variant="secondary" size="lg">Explore Marco</Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
