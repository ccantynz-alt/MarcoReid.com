import type { Metadata } from "next";
import { BRAND } from "@/lib/constants";
import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
import SchemaMarkup from "@/app/components/shared/SchemaMarkup";
import AiDisclaimer from "@/app/components/shared/AiDisclaimer";
import AnimatedCounter from "@/app/components/effects/AnimatedCounter";
import Reveal from "@/app/components/effects/Reveal";

export const metadata: Metadata = {
  title: "Marco Reid Accounting \u2014 AI-Powered Accounting That CPAs Trust",
  description:
    "Automated bookkeeping, bank feed integration, tax compliance, receipt scanning, AI spreadsheets, and The Oracle for accounting. Built for CPAs who demand precision.",
};

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Marco Reid Accounting",
  applicationCategory: "Accounting",
  operatingSystem: "Web",
  description: "AI-powered accounting platform with bank feed integration, automated reconciliation, tax compliance, and cross-domain Oracle research for CPAs.",
  url: `${BRAND.url}/accounting`,
};

export default function AccountingPage() {
  return (
    <>
      <SchemaMarkup schema={schema} />

      {/* Hero */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <Container className="relative text-center">
          <p className="animate-fade-up text-xs font-medium uppercase tracking-widest text-forest-600 opacity-0">
            Marco Reid Accounting
          </p>
          <h1 className="mt-8 animate-fade-up-1 text-hero font-serif opacity-0">
            <span className="text-forest-500">AI-powered accounting</span>
            <br />
            <span className="text-navy-700">that CPAs actually trust.</span>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl animate-fade-up-2 text-xl leading-relaxed text-navy-400 opacity-0">
            Xero, QuickBooks, and MYOB handle bookkeeping. Marco Reid Accounting handles everything.
            Automated reconciliation. Bank feeds that never miss a transaction. Tax compliance
            across 50 states. Receipt scanning in seconds. AI spreadsheets. And The Oracle for
            accounting &mdash; tax research that answers in seconds what used to take hours.
          </p>
          <div className="mt-12 animate-fade-up-3 opacity-0">
            <Button href="/pricing" size="lg">See pricing</Button>
          </div>
        </Container>
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent" />
      </section>

      <div className="h-px bg-navy-100 mx-auto max-w-sm" />

      {/* Stats */}
      <section className="py-32 sm:py-44" aria-label="Time savings">
        <Container>
          <Reveal>
            <h2 className="text-center text-display font-serif text-navy-700">
              The numbers speak for themselves.
            </h2>
          </Reveal>
          <div className="mt-16 grid gap-8 sm:grid-cols-3 text-center">
            <Reveal delay={0.1}>
              <p className="font-serif text-display text-navy-700">
                <AnimatedCounter end={18} suffix="h" />
              </p>
              <p className="mt-2 text-sm text-navy-400">saved per week, per CPA</p>
              <p className="mt-1 text-xs text-navy-300">Hours billed or hours lived. Your choice.</p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="font-serif text-display text-forest-600">
                <AnimatedCounter end={100} suffix="%" />
              </p>
              <p className="mt-2 text-sm text-navy-400">automated bank reconciliation</p>
              <p className="mt-1 text-xs text-navy-300">Months of manual work in minutes.</p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="font-serif text-display text-forest-600">
                <AnimatedCounter end={50} />
              </p>
              <p className="mt-2 text-sm text-navy-400">US states tax compliance</p>
              <p className="mt-1 text-xs text-navy-300">Federal and state. Always current.</p>
            </Reveal>
          </div>
        </Container>
      </section>

      <div className="h-px bg-navy-100 mx-auto max-w-sm" />

      {/* The problem */}
      <section className="py-32 sm:py-44" aria-label="The problem">
        <Container narrow>
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-widest text-forest-600">
              The problem
            </p>
            <h2 className="mt-6 text-display font-serif text-navy-700">
              CPAs are spending more time on software than on clients.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 text-xl leading-relaxed text-navy-400">
              Bank feeds in one tool. Tax filing in another. Client management somewhere else.
              Spreadsheets everywhere. Engagement letters sent through email. Receipts in a
              shoebox (or worse, a phone gallery). Every tool talks to itself and nothing else.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 text-xl leading-relaxed text-navy-400">
              Marco Reid Accounting brings every workflow into one platform. Your bank feeds,
              your reconciliation, your tax compliance, your client communication, your
              documents, your billing &mdash; all connected, all intelligent, all in one place.
            </p>
          </Reveal>
        </Container>
      </section>

      <div className="h-px bg-navy-100 mx-auto max-w-sm" />

      {/* Feature stories */}
      <section className="py-32 sm:py-44" aria-label="Features">
        <Container>
          <Reveal>
            <p className="text-center text-xs font-medium uppercase tracking-widest text-forest-600">
              Every workflow. One platform.
            </p>
            <h2 className="mt-6 text-center text-display font-serif text-navy-700">
              What Marco Reid Accounting does.
            </h2>
          </Reveal>

          <div className="mx-auto mt-16 max-w-3xl space-y-4">
            <Reveal delay={0.05}>
              <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card">
                <p className="text-xs font-semibold uppercase tracking-widest text-forest-600">Bank feeds</p>
                <h3 className="mt-4 font-serif text-headline text-navy-700">
                  Every transaction. Automatically.
                </h3>
                <p className="mt-4 leading-relaxed text-navy-400">
                  Direct bank connection via Plaid. Transactions auto-pulled, auto-categorised,
                  and matched to client records. Bank feed quality is the feature Xero and QuickBooks
                  are most known for &mdash; Marco Reid matches or exceeds their reliability from day one.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card">
                <p className="text-xs font-semibold uppercase tracking-widest text-forest-600">AI reconciliation</p>
                <h3 className="mt-4 font-serif text-headline text-navy-700">
                  Months of work. Minutes of your time.
                </h3>
                <p className="mt-4 leading-relaxed text-navy-400">
                  The AI reads every transaction, matches it against bank statements, flags
                  discrepancies, and reconciles automatically. What used to take a junior
                  accountant days now takes the platform minutes. You review. You approve. Done.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card">
                <p className="text-xs font-semibold tracking-widest text-purple-400">The Oracle for accounting</p>
                <h3 className="mt-4 font-serif text-headline text-navy-700">
                  Tax research in seconds, not hours.
                </h3>
                <p className="mt-4 leading-relaxed text-navy-400">
                  Every IRS code section, every revenue ruling, every regulatory citation &mdash;
                  verified against official sources. A CPA mid-return can query The Oracle without
                  leaving their workflow. &ldquo;Section 199A deduction threshold for a
                  qualified business&rdquo; &mdash; answered instantly, cited correctly.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card">
                <p className="text-xs font-semibold uppercase tracking-widest text-amber-400">Voice-powered entries</p>
                <h3 className="mt-4 font-serif text-headline text-navy-700">
                  Dictate journal entries. Seriously.
                </h3>
                <p className="mt-4 leading-relaxed text-navy-400">
                  &ldquo;Debit accounts receivable twelve thousand four hundred dollars, credit revenue
                  twelve thousand four hundred dollars, date March 31st, client Johnson and Associates.&rdquo;
                  Posted. Marco Reid Voice understands double-entry bookkeeping terminology,
                  GAAP conventions, and tax code references.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Everything included */}
      <section className="py-32 sm:py-44" aria-label="All features">
        <Container>
          <Reveal>
            <h2 className="text-center text-display font-serif text-navy-700">
              Everything included.
            </h2>
          </Reveal>
          <div className="mx-auto mt-16 grid max-w-3xl gap-3 sm:grid-cols-2">
            {[
              { title: "Automated bookkeeping", desc: "Journal entries, ledger management, chart of accounts" },
              { title: "Bank feed integration", desc: "Direct connection via Plaid, auto-categorisation" },
              { title: "Tax compliance", desc: "US federal and 50-state tax calculation" },
              { title: "Receipt scanning", desc: "Photo to auto-coded expense in seconds" },
              { title: "AI spreadsheets", desc: "Financial modelling with AI and voice assistance" },
              { title: "E-signatures", desc: "Engagement letters signed inside the platform" },
              { title: "The Oracle", desc: "Tax and regulatory research with citation verification" },
              { title: "Marco Reid Voice", desc: "Dictate entries, queries, and commands by speaking" },
              { title: "Client management", desc: "CRM, engagement tracking, billing" },
              { title: "Financial reporting", desc: "Automated statements, IRS and state filings" },
            ].map((f) => (
              <Reveal key={f.title} delay={0.05}>
                <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5">
                  <p className="font-semibold text-navy-700">{f.title}</p>
                  <p className="mt-2 text-sm text-navy-400">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mx-auto mt-16 max-w-2xl">
            <AiDisclaimer />
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="relative py-32 sm:py-44" aria-label="Get started">
        <Container className="relative text-center">
          <Reveal>
            <h2 className="text-display font-serif text-forest-500">
              Accounting automation
              <br />
              that CPAs trust.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-xl text-navy-400">
              From bank feeds to tax filings. One platform. Zero compromise.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-12 flex justify-center gap-4">
              <Button href="/pricing" size="lg">See pricing</Button>
              <Button href="/law" variant="secondary" size="lg">Explore Law</Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
