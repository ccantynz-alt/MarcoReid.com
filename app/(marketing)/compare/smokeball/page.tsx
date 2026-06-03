import type { Metadata } from "next";
import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
import SchemaMarkup from "@/app/components/shared/SchemaMarkup";
import Reveal from "@/app/components/effects/Reveal";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Marco Reid vs Smokeball — The Complete Platform Smokeball Cannot Build",
  description:
    "Why law firms are choosing Marco Reid over Smokeball. Smokeball is strong practice management. Marco Reid adds AI research, voice dictation, and the accounting dimension Smokeball cannot match.",
};

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: BRAND.name,
  applicationCategory: "Legal",
  operatingSystem: "Web",
  url: `${BRAND.url}/compare/smokeball`,
};

const painPoints = [
  {
    pain: "Smokeball has Archie AI, but it is narrow. Document automation and time capture are useful — but they are not a deep AI research engine. You still need Westlaw or LexisNexis",
    solution: "Marco — the Oracle — delivers jurisdiction-aware legal research with citation verification across every US state, AU, NZ, and UK. Verified citations to CourtListener and authoritative sources. No Westlaw subscription needed",
  },
  {
    pain: "Smokeball has no voice dictation. Lawyers still dictate into Dragon at $699, or type everything manually",
    solution: "Marco Reid Voice is built into every input field across the entire platform. Legal vocabulary. 9 languages. Context-aware formatting that understands the difference between a contract clause and a case note",
  },
  {
    pain: "Smokeball has no accounting integration. Your clients&rsquo; CPAs operate on a completely separate platform with no shared context, no shared matter view, and no shared AI",
    solution: "Marco Reid Accounting lives under the same roof as Marco Reid Legal. Lawyers and CPAs collaborate on shared client matters inside one platform. Cross-professional bridge built in",
  },
  {
    pain: "Smokeball&rsquo;s strength is document automation for specific practice areas. It is excellent at what it does but it is not a platform — it is a collection of document tools",
    solution: "Marco Reid is the complete operating system for a law firm. Practice management, AI research, document AI, billing, trust accounting, voice, client portal, and accounting integration. One login, one platform, one price",
  },
  {
    pain: "Smokeball does not have a deep Oracle-equivalent AI research engine. Archie AI assists with documents — Marco answers complex multi-jurisdiction legal questions from first principles with verified citations",
    solution: "Marco delivers research results in under 3 seconds, with every citation verified before it reaches the attorney. The Mata v. Avianca failure mode — fabricated citations in court filings — is engineered out at the foundation",
  },
  {
    pain: "Smokeball is strong in AU, UK, and US, but it is not a unified global platform with a common AI engine and accounting dimension covering the same markets",
    solution: "Marco Reid is built globally from day one. AU, NZ, US, and UK under one platform, one login, and one Oracle that understands every jurisdiction",
  },
];

export default function CompareSmokeballPage() {
  return (
    <>
      <SchemaMarkup schema={schema} />

      <section className="bg-navy-500 pt-32 pb-20 sm:pt-40 sm:pb-28">
        <Container className="text-center">
          <p className="text-sm font-semibold tracking-wider text-forest-300">
            Marco Reid vs Smokeball
          </p>
          <h1 className="mt-6 font-serif text-hero text-white">
            Smokeball manages documents.
            <br />
            Marco Reid runs your entire practice.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-xl text-navy-200">
            Smokeball earns its 4.8-star rating with excellent document automation and time capture.
            Marco Reid is the complete operating system &mdash; everything Smokeball does, plus deep
            AI research, voice dictation, and the accounting dimension Smokeball cannot match.
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
                    <p
                      className="mt-3 text-sm leading-relaxed text-navy-600"
                      dangerouslySetInnerHTML={{ __html: p.pain }}
                    />
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

      <section className="bg-navy-50 py-24 sm:py-36" aria-label="Feature comparison">
        <Container>
          <Reveal>
            <h2 className="text-center font-serif text-display text-navy-800">
              Side by side.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mx-auto mt-16 max-w-3xl overflow-hidden rounded-xl border border-navy-100 bg-white shadow-card">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-navy-100 bg-navy-50">
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-navy-400">Feature</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-navy-400">Smokeball</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-forest-600">Marco Reid</th>
                  </tr>
                </thead>
                <tbody>
                  {([
                    { feature: "Practice management", smokeball: true, marcoreid: true },
                    { feature: "Document automation", smokeball: true, marcoreid: true },
                    { feature: "Time capture and billing", smokeball: true, marcoreid: true },
                    { feature: "Trust accounting", smokeball: true, marcoreid: true },
                    { feature: "Deep AI legal research (Oracle)", smokeball: "Archie AI — limited", marcoreid: "Marco — full Oracle engine" },
                    { feature: "Citation verification", smokeball: false, marcoreid: "CourtListener verified" },
                    { feature: "Voice dictation", smokeball: false, marcoreid: "Built-in, 9 languages" },
                    { feature: "Accounting integration", smokeball: false, marcoreid: true },
                    { feature: "Cross-professional CPA collaboration", smokeball: false, marcoreid: true },
                    { feature: "Document AI drafting with inline research", smokeball: "Automation only", marcoreid: "Full AI drafting + Oracle inline" },
                    { feature: "E-signatures", smokeball: "Add-on", marcoreid: "Built-in" },
                    { feature: "Client portal", smokeball: true, marcoreid: true },
                    { feature: "AU / NZ market", smokeball: true, marcoreid: true },
                    { feature: "US market", smokeball: true, marcoreid: true },
                    { feature: "UK market", smokeball: true, marcoreid: true },
                    { feature: "Unified global AI engine", smokeball: false, marcoreid: true },
                  ] as const).map((row, i) => (
                    <tr key={row.feature} className={`border-b border-navy-50 ${i % 2 === 1 ? "bg-navy-50/50" : ""}`}>
                      <td className="px-6 py-3 font-medium text-navy-700">{row.feature}</td>
                      <td className="px-6 py-3 text-navy-400">
                        {typeof row.smokeball === "boolean"
                          ? row.smokeball ? <span className="text-forest-500">&#10003;</span> : <span className="text-red-400">&#10007;</span>
                          : row.smokeball}
                      </td>
                      <td className="px-6 py-3 font-medium text-navy-700">
                        {typeof row.marcoreid === "boolean"
                          ? row.marcoreid ? <span className="text-forest-500">&#10003;</span> : <span className="text-red-400">&#10007;</span>
                          : <span className="text-forest-600">{row.marcoreid}</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="py-24 sm:py-36" aria-label="Why professionals switch">
        <Container>
          <Reveal>
            <h2 className="text-center font-serif text-display text-navy-800">
              Why professionals make the switch.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-center text-navy-500">
              Smokeball is excellent at document automation. Marco Reid is the platform for firms
              that need everything else too.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                heading: "One login for law and accounting",
                body: "Lawyers and CPAs sharing client matters on one platform is not a Smokeball feature. It is a Marco Reid exclusive.",
              },
              {
                heading: "AI research that actually verifies citations",
                body: "Archie AI assists with documents. Marco answers complex legal questions with citations verified against authoritative public domain sources before they reach you.",
              },
              {
                heading: "Voice built in, not bolted on",
                body: "Every input field across the entire platform accepts voice. Legal vocabulary. No Dragon subscription. No extra hardware.",
              },
              {
                heading: "The platform, not the toolset",
                body: "Smokeball is a collection of document tools. Marco Reid is the operating system for the entire firm — from first client contact to final invoice.",
              },
            ].map((card, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card h-full">
                  <p className="font-serif text-lg text-navy-800">{card.heading}</p>
                  <p className="mt-3 text-sm leading-relaxed text-navy-500">{card.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-navy-500 py-24 sm:py-36" aria-label="AI disclaimer">
        <Container className="text-center">
          <Reveal>
            <p className="mx-auto max-w-2xl text-sm text-navy-300">
              Marco is an AI research tool. All outputs must be verified by a qualified professional.
              Marco Reid does not provide legal advice. It provides legal research tools for qualified
              attorneys. Always verify every citation before reliance in any court filing or legal
              document.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="py-24 sm:py-36" aria-label="Get started">
        <Container className="text-center">
          <Reveal>
            <h2 className="font-serif text-display text-navy-800">
              Ready for the full legal operating system?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10 flex justify-center gap-4">
              <Button href="/trial" size="lg">Start your free trial &rarr;</Button>
              <Button href="/law" variant="secondary" size="lg">Explore Marco Reid Legal</Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
