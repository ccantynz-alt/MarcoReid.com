import type { Metadata } from "next";
import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
import SchemaMarkup from "@/app/components/shared/SchemaMarkup";
import Reveal from "@/app/components/effects/Reveal";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "AlecRae vs QuickBooks \u2014 AI-Powered Accounting That Does More",
  description:
    "Why CPAs are switching from QuickBooks to AlecRae Accounting. Bank feeds, AI reconciliation, tax research, voice entries, and integration with the legal side.",
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
    pain: "QuickBooks has no AI tax research. CPAs still call taxation agents or search IRS.gov manually",
    solution: "The Oracle for Accounting answers tax research questions in seconds with verified IRS citations. No phone call needed",
  },
  {
    pain: "QuickBooks has no voice input. Every journal entry, every expense, every note is typed manually",
    solution: "AlecRae Voice understands double-entry bookkeeping. Dictate journal entries, expenses, and client notes by speaking",
  },
  {
    pain: "QuickBooks has zero integration with legal practice. Lawyers and accountants working on the same client use completely separate systems",
    solution: "AlecRae Accounting and AlecRae Legal share the same platform. Lawyers invite CPAs into shared matters. One platform for both professions",
  },
  {
    pain: "QuickBooks reconciliation is manual and tedious. Hours every month matching transactions",
    solution: "AlecRae AI reconciliation reads every transaction, matches it against bank statements, and reconciles automatically. You review and approve",
  },
  {
    pain: "QuickBooks pricing keeps increasing. Features get moved to higher tiers. Add-ons for everything",
    solution: "AlecRae Accounting includes everything \u2014 bank feeds, tax compliance, receipt scanning, Oracle research, Voice dictation \u2014 in one plan",
  },
  {
    pain: "QuickBooks customer support is notoriously poor. Long wait times. Outsourced agents who don\u2019t understand accounting",
    solution: "AlecRae support is powered by The Oracle \u2014 ask your question, get an instant answer with account context. 95% of queries resolved without a human",
  },
];

export default function CompareQuickBooksPage() {
  return (
    <>
      <SchemaMarkup schema={schema} />

      <section className="bg-navy-500 pt-32 pb-20 sm:pt-40 sm:pb-28">
        <Container className="text-center">
          <p className="text-sm font-semibold tracking-wider text-forest-300">
            AlecRae vs QuickBooks
          </p>
          <h1 className="mt-6 font-serif text-hero text-white">
            QuickBooks does bookkeeping.
            <br />
            AlecRae does everything.
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
              Ready for accounting that thinks?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10 flex justify-center gap-4">
              <Button href="/pricing" size="lg">See pricing</Button>
              <Button href="/accounting" variant="secondary" size="lg">Explore AlecRae Accounting</Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
