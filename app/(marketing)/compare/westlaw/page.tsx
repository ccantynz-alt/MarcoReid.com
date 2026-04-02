import type { Metadata } from "next";
import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
import SchemaMarkup from "@/app/components/shared/SchemaMarkup";
import Reveal from "@/app/components/effects/Reveal";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "AlecRae vs Westlaw \u2014 The Modern Alternative to Westlaw",
  description:
    "Why professionals are switching from Westlaw to AlecRae. Faster research, verified citations, practice management, billing, and dictation \u2014 all in one platform at a fraction of the price.",
};

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: BRAND.name,
  applicationCategory: "Legal",
  operatingSystem: "Web",
  description: "The modern alternative to Westlaw. AI-powered legal research with citation verification, plus full practice management.",
  url: `${BRAND.url}/compare/westlaw`,
};

const painPoints = [
  {
    pain: "Westlaw costs $400\u2013$600+ per user per month for research alone",
    solution: "AlecRae includes The Oracle research, practice management, billing, trust accounting, dictation, and client portal \u2014 from $99/month",
  },
  {
    pain: "The Westlaw interface feels stuck in 2010. Clunky. Slow. Overwhelming",
    solution: "AlecRae is built for 2026. Clean, fast, designed for how lawyers actually work. Two clicks to anything",
  },
  {
    pain: "Westlaw is ONLY research. You still need Clio for case management, QuickBooks for billing, DocuSign for signatures, Dragon for dictation",
    solution: "AlecRae replaces all of them. One platform. One login. One bill",
  },
  {
    pain: "You leave your document to research. Open a new tab. Log in. Search. Copy. Switch back. Paste. Five minutes. Flow destroyed",
    solution: "Hit \u2318K. The Oracle slides in without leaving your document. Insert citation at cursor. 25 seconds. Flow intact",
  },
  {
    pain: "Westlaw has no voice dictation. No way to speak a research query",
    solution: "AlecRae Voice lets you speak your research query, dictate documents, log billing, and schedule meetings \u2014 in 9 languages",
  },
  {
    pain: "Westlaw can\u2019t answer questions that cross the legal-accounting boundary",
    solution: "The Oracle spans both law and accounting. Ask about immigration tax implications in a single query. Nobody else can do this",
  },
];

export default function CompareWestlawPage() {
  return (
    <>
      <SchemaMarkup schema={schema} />

      <section className="bg-navy-500 pt-32 pb-20 sm:pt-40 sm:pb-28">
        <Container className="text-center">
          <p className="text-sm font-semibold tracking-wider text-forest-300">
            AlecRae vs Westlaw
          </p>
          <h1 className="mt-6 font-serif text-hero text-white">
            Everything Westlaw does.
            <br />
            Plus everything it doesn&rsquo;t.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-xl text-navy-200">
            Westlaw sells access to law. AlecRae sells the ability to practise law &mdash;
            entirely, from first client contact to final invoice, powered by AI throughout.
          </p>
        </Container>
      </section>

      <section className="py-24 sm:py-36" aria-label="Comparison">
        <Container>
          <Reveal>
            <h2 className="font-serif text-display text-navy-800">
              The pain. The solution.
            </h2>
            <p className="mt-4 text-lg text-navy-400">
              Every frustration professionals have with Westlaw &mdash; and how AlecRae eliminates it.
            </p>
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
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-navy-400">Westlaw</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-forest-600">AlecRae</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: "Legal research", westlaw: true, alecrae: true },
                    { feature: "Citation verification", westlaw: true, alecrae: true },
                    { feature: "Accounting/tax research", westlaw: false, alecrae: true },
                    { feature: "Cross-domain queries", westlaw: false, alecrae: true },
                    { feature: "Case management", westlaw: false, alecrae: true },
                    { feature: "Trust accounting (IOLTA)", westlaw: false, alecrae: true },
                    { feature: "Billing & time tracking", westlaw: false, alecrae: true },
                    { feature: "Document drafting AI", westlaw: false, alecrae: true },
                    { feature: "Voice dictation (9 languages)", westlaw: false, alecrae: true },
                    { feature: "E-signatures", westlaw: false, alecrae: true },
                    { feature: "Client portal", westlaw: false, alecrae: true },
                    { feature: "Secure messaging", westlaw: false, alecrae: true },
                    { feature: "Court-rules calendaring", westlaw: false, alecrae: true },
                    { feature: "Inline research (\u2318K)", westlaw: false, alecrae: true },
                    { feature: "Starting price", westlaw: "$400+/mo", alecrae: "$99/mo" },
                  ].map((row) => (
                    <tr key={row.feature} className="border-b border-navy-50">
                      <td className="px-6 py-3 font-medium text-navy-700">{row.feature}</td>
                      <td className="px-6 py-3 text-navy-400">
                        {typeof row.westlaw === "boolean"
                          ? row.westlaw ? <span className="text-forest-500">&#10003;</span> : <span className="text-red-400">&#10007;</span>
                          : row.westlaw}
                      </td>
                      <td className="px-6 py-3 font-medium text-navy-700">
                        {typeof row.alecrae === "boolean"
                          ? row.alecrae ? <span className="text-forest-500">&#10003;</span> : <span className="text-red-400">&#10007;</span>
                          : <span className="text-forest-600">{row.alecrae}</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="py-24 sm:py-36" aria-label="Get started">
        <Container className="text-center">
          <Reveal>
            <h2 className="font-serif text-display text-navy-800">
              Ready to switch?
            </h2>
            <p className="mt-4 text-lg text-navy-400">
              Everything Westlaw does, plus everything it doesn&rsquo;t. One platform. One price.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10 flex justify-center gap-4">
              <Button href="/pricing" size="lg">See pricing</Button>
              <Button href="/law" variant="secondary" size="lg">Explore AlecRae Legal</Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
