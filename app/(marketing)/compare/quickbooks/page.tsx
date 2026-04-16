import type { Metadata } from "next";
import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
import SchemaMarkup from "@/app/components/shared/SchemaMarkup";
import Reveal from "@/app/components/effects/Reveal";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Marco Reid vs QuickBooks — AI-Powered Accounting That Does More",
  description:
    "Why CPAs are switching from QuickBooks to Marco Reid Accounting. Bank feeds, AI reconciliation, tax research, voice entries, and integration with the legal side.",
};

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: BRAND.name,
  applicationCategory: "Accounting",
  operatingSystem: "Web",
  url: `${BRAND.url}/compare/quickbooks`,
};

const painPoints = [
  {
    pain: "QuickBooks has no AI tax research. CPAs still call taxation agents or spend 20 minutes searching IRS.gov manually for every question",
    solution: "Marco for Accounting answers tax research questions in seconds with verified IRS citations. Section 199A threshold? Answered in 3 seconds, with source link. No phone call needed",
  },
  {
    pain: "QuickBooks has no voice input. Every journal entry, every expense, every note is typed manually",
    solution: "Marco Reid Voice understands double-entry bookkeeping. Dictate journal entries, expenses, and client notes by speaking",
  },
  {
    pain: "QuickBooks has zero integration with legal practice. Lawyers and accountants working on the same client use completely separate systems",
    solution: "Marco Reid Accounting and Marco Reid Legal share the same platform. Lawyers invite CPAs into shared matters. One platform for both professions",
  },
  {
    pain: "QuickBooks reconciliation is manual and tedious. Hours every month matching transactions",
    solution: "Marco Reid AI reconciliation reads every transaction, matches it against bank statements, and reconciles automatically. You review and approve",
  },
  {
    pain: "Users report 400–600% price increases when forced from Desktop to Online. One user: “70% increase for the same basic features I’ve used for two decades.” Features constantly moved to higher tiers",
    solution: "Marco Reid Accounting includes everything — bank feeds, tax compliance, receipt scanning, Marco research, Voice dictation — in one plan. Transparent pricing. No forced migrations. No surprise tier changes",
  },
  {
    pain: "Pages take 10 seconds to load in 2025. “Everything takes twice as long in QBO than Desktop.” Customer support described as “utterley shocked at the lack of service” — reps who are not accountants",
    solution: "Marco Reid is built for speed. Every page under 1 second. Every Marco query under 3 seconds. Support powered by Marco with account context. 95% of queries resolved instantly",
  },
];

export default function CompareQuickBooksPage() {
  return (
    <>
      <SchemaMarkup schema={schema} />

      <section className="bg-navy-500 pt-32 pb-20 sm:pt-40 sm:pb-28">
        <Container className="text-center">
          <p className="text-sm font-semibold tracking-wider text-forest-300">
            Marco Reid vs QuickBooks
          </p>
          <h1 className="mt-6 font-serif text-hero text-white">
            QuickBooks does bookkeeping.
            <br />
            Marco Reid does everything.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-xl text-navy-200">
            Automated reconciliation. AI tax research. Voice journal entries.
            Cross-professional collaboration with lawyers. And bank feeds that
            match or exceed QuickBooks reliability from day one.
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
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-navy-400">QuickBooks</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-forest-600">Marco Reid</th>
                  </tr>
                </thead>
                <tbody>
                  {([
                    { feature: "Bookkeeping", quickbooks: true, marcoreid: true },
                    { feature: "Bank feed integration", quickbooks: true, marcoreid: true },
                    { feature: "AI tax research", quickbooks: false, marcoreid: true },
                    { feature: "Voice input", quickbooks: false, marcoreid: "9 languages" },
                    { feature: "AI reconciliation", quickbooks: "Manual", marcoreid: true },
                    { feature: "50-state tax compliance", quickbooks: "Limited", marcoreid: true },
                    { feature: "Legal collaboration", quickbooks: false, marcoreid: true },
                    { feature: "Receipt scanning", quickbooks: true, marcoreid: true },
                    { feature: "Financial reporting", quickbooks: true, marcoreid: true },
                    { feature: "AI spreadsheets", quickbooks: false, marcoreid: true },
                    { feature: "Starting price", quickbooks: "$99/mo (after price increase)", marcoreid: "$79/mo" },
                  ] as const).map((row, i) => (
                    <tr key={row.feature} className={`border-b border-navy-50 ${i % 2 === 1 ? "bg-navy-50/50" : ""}`}>
                      <td className="px-6 py-3 font-medium text-navy-700">{row.feature}</td>
                      <td className="px-6 py-3 text-navy-400">
                        {typeof row.quickbooks === "boolean"
                          ? row.quickbooks ? <span className="text-forest-500">&#10003;</span> : <span className="text-red-400">&#10007;</span>
                          : row.quickbooks}
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

      <section className="py-24 sm:py-36" aria-label="Get started">
        <Container className="text-center">
          <Reveal>
            <h2 className="font-serif text-display text-navy-800">
              Ready for accounting that thinks?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10 flex justify-center gap-4">
              <Button href="/pricing" size="lg">See pricing</Button>
              <Button href="/accounting" variant="secondary" size="lg">Explore Marco Reid Accounting</Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
