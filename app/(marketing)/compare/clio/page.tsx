import type { Metadata } from "next";
import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
import SchemaMarkup from "@/app/components/shared/SchemaMarkup";
import Reveal from "@/app/components/effects/Reveal";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Marco Reid vs Clio \u2014 Practice Management That Includes Everything",
  description:
    "Why professionals are switching from Clio to Marco Reid. Same great practice management, plus AI research, voice dictation, accounting integration, and document AI.",
};

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: BRAND.name,
  applicationCategory: "Legal",
  operatingSystem: "Web",
  url: `${BRAND.url}/compare/clio`,
};

const painPoints = [
  {
    pain: "Clio has no AI legal research. You still need Westlaw or LexisNexis",
    solution: "Marco Reid includes The Oracle \u2014 AI-powered legal research with verified citations. No separate subscription needed",
  },
  {
    pain: "Clio has no voice dictation. You still need Dragon at $699",
    solution: "Marco Reid Voice is built into every input field. Legal vocabulary. 9 languages. Voice commands that file, bill, and research",
  },
  {
    pain: "Clio has no accounting integration. Your CPA uses a completely different tool",
    solution: "Marco Reid Accounting lives under the same roof. Lawyers and CPAs collaborate on shared matters inside one platform",
  },
  {
    pain: "Clio\u2019s document editor is basic. You still need Word or Google Docs",
    solution: "Marco Reid Document AI drafts, reviews, and edits \u2014 with The Oracle available inline for research while you write",
  },
  {
    pain: "Clio charges per feature. Manage, Grow, Suite \u2014 you pay more for every capability",
    solution: "Marco Reid gives you everything in one plan. Research, dictation, documents, billing, trust accounting, client portal",
  },
  {
    pain: "Clio can\u2019t do trust accounting with the same rigour as a dedicated IOLTA tool",
    solution: "Marco Reid trust accounting is built IOLTA-compliant from day one with full audit logging",
  },
];

export default function CompareClioPage() {
  return (
    <>
      <SchemaMarkup schema={schema} />

      <section className="bg-navy-500 pt-32 pb-20 sm:pt-40 sm:pb-28">
        <Container className="text-center">
          <p className="text-sm font-semibold tracking-wider text-forest-300">
            Marco Reid vs Clio
          </p>
          <h1 className="mt-6 font-serif text-hero text-white">
            Clio manages your practice.
            <br />
            Marco Reid runs it.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-xl text-navy-200">
            Clio is great practice management. Marco Reid is the entire operating system &mdash;
            practice management, AI research, voice dictation, document AI, accounting,
            and client collaboration in one platform.
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
              Ready for the full operating system?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10 flex justify-center gap-4">
              <Button href="/pricing" size="lg">See pricing</Button>
              <Button href="/law" variant="secondary" size="lg">Explore Marco Reid Legal</Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
