import type { Metadata } from "next";
import { BRAND } from "@/lib/constants";
import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
import SchemaMarkup from "@/app/components/shared/SchemaMarkup";
import AiDisclaimer from "@/app/components/shared/AiDisclaimer";
import FAQ from "@/app/components/shared/FAQ";
import dynamic from "next/dynamic";

const AnimatedCounter = dynamic(() => import("@/app/components/effects/AnimatedCounter"));
import Reveal from "@/app/components/effects/Reveal";

export const metadata: Metadata = {
  title: "Marco Reid Accounting \u2014 The Most Advanced Accounting Platform on Earth",
  description:
    "Autonomous bookkeeping, payroll across five jurisdictions, GST / VAT / sales-tax filing, provisional and income tax, and a Catch-Up Centre for years-behind filers. AI does the work. A qualified accountant signs off.",
};

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Marco Reid Accounting",
  applicationCategory: "Accounting",
  operatingSystem: "Web",
  description:
    "The most advanced accounting platform on earth. Autonomous bookkeeping, payroll, GST / VAT / sales tax filing, provisional and income tax, and a Catch-Up Centre for years-behind clients. Direct e-filing to IR, IRS, ATO, HMRC, and CRA.",
  url: `${BRAND.url}/accounting`,
};

const pillars = [
  {
    tag: "Autonomous bookkeeping",
    title: "Books that close themselves.",
    body: "Bank feeds auto-pull, AI auto-codes, reconciliation auto-runs, month-end auto-closes. You review and approve. What took a junior accountant a week now takes you nine minutes. Xero and QuickBooks promised this. Marco Reid actually delivers it.",
  },
  {
    tag: "Payroll \u2014 every jurisdiction",
    title: "Pay everyone, everywhere. In one run.",
    body: "NZ PAYE, AU PAYG, US federal + 50-state withholding, UK PAYE, and CA CPP/EI \u2014 in one payroll run. Leave, KiwiSaver, superannuation, 401(k), and pension contributions calculated automatically. Direct filing with every tax authority on pay-day.",
  },
  {
    tag: "GST, VAT, sales tax",
    title: "Every return. Every period. Filed on time.",
    body: "NZ GST, AU GST, UK VAT, Canadian GST/HST, and US sales tax across all 50 states. The AI prepares every return the moment the period closes, flags anomalies, and lodges directly with the tax authority. You approve with one click.",
  },
  {
    tag: "Provisional, estimated, and income tax",
    title: "No more March 31st panic.",
    body: "Provisional tax recalculated every week against live cash-flow. Estimated tax updated after every invoice. Year-end income tax \u2014 IR3, IR4, 1040, 1120, SA100, T1, T2 \u2014 drafted the moment the year closes. No extensions. No surprises.",
  },
  {
    tag: "Catch-Up Centre",
    title: "Years behind? Caught up in weeks.",
    body: "Three years of missing GST? Ten years of unfiled US returns? Upload what you have. AI reconstructs the missing books, recalculates every period, and files everything with a qualified accountant signing off. Every missed year closed out. Fixed-fee.",
    link: { href: "/catch-up-centre", label: "Explore the Catch-Up Centre \u2192" },
  },
  {
    tag: "Marco for accounting",
    title: "Tax research in three seconds, not three hours.",
    body: "Every IRS code section, every Inland Revenue ruling, every Treasury regulation, every ATO determination \u2014 verified against official sources. Ask Marco mid-return without leaving your workflow. Citation inserted. Source linked. Done.",
  },
];

const jurisdictions = [
  { flag: "\uD83C\uDDF3\uD83C\uDDFF", country: "New Zealand", detail: "IR e-filing \u2022 GST \u2022 PAYE \u2022 Provisional Tax \u2022 IR3, IR4, IR526" },
  { flag: "\uD83C\uDDE6\uD83C\uDDFA", country: "Australia", detail: "ATO e-filing \u2022 BAS / GST \u2022 PAYG \u2022 STP \u2022 Payroll Tax" },
  { flag: "\uD83C\uDDFA\uD83C\uDDF8", country: "United States", detail: "IRS + state \u2022 50-state sales tax \u2022 1040 / 1120 / 1065 \u2022 941 / 940" },
  { flag: "\uD83C\uDDEC\uD83C\uDDE7", country: "United Kingdom", detail: "HMRC MTD \u2022 VAT \u2022 PAYE \u2022 Self Assessment \u2022 CT600" },
  { flag: "\uD83C\uDDE8\uD83C\uDDE6", country: "Canada", detail: "CRA \u2022 GST/HST \u2022 Provincial Tax \u2022 T1 / T2 \u2022 T4 / T4A" },
];

export default function AccountingPage() {
  return (
    <>
      <SchemaMarkup schema={schema} />

      {/* Hero */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-navy-500">
        <div className="pointer-events-none absolute inset-0">
          <div className="animate-drift absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-forest-500/25 blur-[120px]" />
          <div className="animate-drift-reverse absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-gold-400/15 blur-[100px]" />
        </div>
        <Container className="relative text-center">
          <p className="animate-fade-up text-sm font-semibold uppercase tracking-widest text-gold-400 opacity-0">
            Marco Reid Accounting
          </p>
          <h1 className="mt-8 animate-fade-up-1 text-hero font-serif text-white opacity-0">
            The most advanced
            <br />
            <span className="text-gold-300">accounting platform on earth.</span>
          </h1>
          <p className="mx-auto mt-8 max-w-3xl animate-fade-up-2 text-xl leading-relaxed text-navy-200 opacity-0">
            Autonomous bookkeeping. Payroll across five jurisdictions. GST, VAT,
            and sales tax filed automatically. Provisional and income tax, done.
            A Catch-Up Centre that cleans up ten years of missed returns. AI does
            the work &mdash; day and night. A qualified accountant signs off on
            every filing. This is the firm of the future, already running.
          </p>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 animate-fade-up-3 opacity-0 sm:flex-row">
            <Button href="/pricing" size="lg">Start using it today</Button>
            <Button href="/catch-up-centre" size="lg" variant="ghost" className="text-white hover:text-navy-200">
              Years behind? Catch-Up Centre &rarr;
            </Button>
          </div>
        </Container>
      </section>

      {/* Prestige stats */}
      <section className="py-24 sm:py-32" aria-label="Platform statistics">
        <Container>
          <Reveal>
            <p className="text-center text-xs font-semibold uppercase tracking-widest text-forest-600">
              The numbers speak for themselves
            </p>
            <h2 className="mt-6 text-center font-serif text-display text-navy-700">
              Built for the most demanding firms in the world.
            </h2>
          </Reveal>
          <div className="mt-16 grid gap-8 text-center sm:grid-cols-4">
            <Reveal delay={0.05}>
              <p className="font-serif text-display text-navy-700">
                <AnimatedCounter end={5} />
              </p>
              <p className="mt-2 text-sm text-navy-400">tax authorities</p>
              <p className="mt-1 text-xs text-navy-300">IR, IRS, ATO, HMRC, CRA</p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="font-serif text-display text-forest-600">
                <AnimatedCounter end={100} suffix="%" />
              </p>
              <p className="mt-2 text-sm text-navy-400">automated reconciliation</p>
              <p className="mt-1 text-xs text-navy-300">Zero missed transactions</p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="font-serif text-display text-forest-600">
                <AnimatedCounter end={18} suffix="h" />
              </p>
              <p className="mt-2 text-sm text-navy-400">saved per week, per accountant</p>
              <p className="mt-1 text-xs text-navy-300">Hours billed or hours lived</p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="font-serif text-display text-navy-700">
                <AnimatedCounter end={24} suffix="/7" />
              </p>
              <p className="mt-2 text-sm text-navy-400">autonomous operation</p>
              <p className="mt-1 text-xs text-navy-300">AI works while you sleep</p>
            </Reveal>
          </div>
        </Container>
      </section>

      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12"><div className="gold-divider" /></div>

      {/* Jurisdictions strip */}
      <section className="py-24 sm:py-32" aria-label="Jurisdictions covered">
        <Container>
          <Reveal>
            <p className="text-center text-xs font-semibold uppercase tracking-widest text-forest-600">
              Every major jurisdiction. One platform.
            </p>
            <h2 className="mt-6 text-center font-serif text-display text-navy-700">
              Whoever you owe. Whoever you pay.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed text-navy-400">
              Cross-border businesses have been stitching together three different
              subscriptions for a decade. Marco Reid is the first platform built
              cross-jurisdiction from the ground up.
            </p>
          </Reveal>

          <div className="mx-auto mt-16 grid max-w-5xl gap-4 md:grid-cols-2 lg:grid-cols-3">
            {jurisdictions.map((j) => (
              <Reveal key={j.country} delay={0.05}>
                <div className="h-full rounded-xl border border-navy-100 bg-white p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5">
                  <p className="font-serif text-4xl" aria-hidden>{j.flag}</p>
                  <h3 className="mt-3 font-semibold text-navy-700">{j.country}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-400">{j.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12"><div className="gold-divider" /></div>

      {/* The six pillars */}
      <section className="py-24 sm:py-32" aria-label="What Marco Reid Accounting does">
        <Container>
          <Reveal>
            <p className="text-center text-xs font-semibold uppercase tracking-widest text-forest-600">
              The six pillars
            </p>
            <h2 className="mt-6 text-center font-serif text-display text-navy-700">
              What Marco Reid Accounting actually does.
            </h2>
          </Reveal>

          <div className="mx-auto mt-16 max-w-3xl space-y-4">
            {pillars.map((p) => (
              <Reveal key={p.tag} delay={0.05}>
                <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card transition-all duration-300 hover:shadow-card-hover sm:p-8">
                  <p className="text-xs font-semibold uppercase tracking-widest text-forest-600">{p.tag}</p>
                  <h3 className="mt-4 font-serif text-headline text-navy-700">{p.title}</h3>
                  <p className="mt-4 leading-relaxed text-navy-400">{p.body}</p>
                  {p.link ? (
                    <a
                      href={p.link.href}
                      className="mt-4 inline-flex items-center text-sm font-semibold text-forest-600 transition-colors hover:text-forest-700"
                    >
                      {p.link.label}
                    </a>
                  ) : null}
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12"><div className="gold-divider" /></div>

      {/* Everything included */}
      <section className="py-24 sm:py-32" aria-label="All features">
        <Container>
          <Reveal>
            <p className="text-center text-xs font-semibold uppercase tracking-widest text-forest-600">
              Everything included
            </p>
            <h2 className="mt-6 text-center font-serif text-display text-navy-700">
              No modules to buy. No integrations to manage.
            </h2>
          </Reveal>
          <div className="mx-auto mt-16 grid max-w-4xl gap-3 sm:grid-cols-2">
            {[
              { title: "Autonomous bookkeeping", desc: "Journal entries, ledger, chart of accounts, month-end close" },
              { title: "Bank feeds", desc: "Plaid (US), Akahu (NZ), Basiq (AU), TrueLayer (UK) in one feed" },
              { title: "GST / VAT / sales tax", desc: "NZ GST, AU GST, UK VAT, CA GST/HST, US 50-state sales tax" },
              { title: "Payroll across 5 jurisdictions", desc: "PAYE, PAYG, US 50-state, UK PAYE, CA CPP/EI" },
              { title: "Provisional + income tax", desc: "IR3, IR4, 1040, 1120, 1065, SA100, T1, T2, CT600" },
              { title: "Catch-Up Centre", desc: "Years-behind filers, end-to-end AI cleanup and back-filing" },
              { title: "Receipt & invoice capture", desc: "Photo in, coded journal entry out, in under three seconds" },
              { title: "AI spreadsheets", desc: "Financial modelling, cash-flow forecasting, scenario planning" },
              { title: "Marco for accounting", desc: "Verified tax research with citations inserted at the cursor" },
              { title: "Marco Reid Voice", desc: "Dictate journal entries, invoices, and queries in plain English" },
              { title: "Engagement letters & e-sign", desc: "Draft, send, and sign engagement letters inside the platform" },
              { title: "Client portal & billing", desc: "CRM, engagement tracking, time entry, invoicing, Stripe payments" },
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

      {/* Final CTA */}
      <section className="relative bg-navy-500 py-24 sm:py-32" aria-label="Get started">
        <div className="gold-divider" />
        <Container className="relative text-center">
          <Reveal>
            <h2 className="font-serif text-display text-white">
              The firm of the future.
              <br />
              <span className="text-gold-300">Already running.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-navy-200">
              From bank feeds to tax filings. From payroll to Catch-Up. From
              Auckland to Austin to Auckland, Texas. One platform. Zero compromise.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/pricing" size="lg">Start using it today</Button>
              <Button href="/catch-up-centre" size="lg" variant="ghost" className="text-white hover:text-navy-200">
                Catch-Up Centre &rarr;
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-navy-50 py-20 sm:py-28" aria-label="Testimonial">
        <div className="mx-auto max-w-3xl px-6 sm:px-8 lg:px-12 text-center">
          <Reveal>
            <p className="text-4xl text-gold-400">&ldquo;</p>
            <p className="mt-2 font-serif text-xl italic leading-relaxed text-navy-600">
              Monthly reconciliation used to take my team an entire afternoon. With Marco Reid,
              it is automated. We review and approve in minutes. The AI tax research alone is worth
              ten times the subscription.
            </p>
            <p className="mt-6 text-sm font-semibold text-navy-700">Robert Chang, CPA</p>
            <p className="text-xs text-navy-400">Founding Partner, Chang & Associates</p>
          </Reveal>
        </div>
      </section>

      <FAQ
        items={[
          { question: "What does Marco Reid Accounting replace?", answer: "Marco Reid Accounting replaces QuickBooks, Xero, and standalone tax research tools. It includes automated bookkeeping, bank feed integration via Plaid, AI-powered reconciliation, 50-state tax compliance, receipt scanning, financial reporting, and Marco for accounting research — all in one platform." },
          { question: "How does bank feed integration work?", answer: "Marco Reid connects directly to your bank accounts via Plaid. Transactions are automatically pulled, categorised using AI, and matched to the correct accounts. You review and approve — the manual data entry is eliminated." },
          { question: "Can it handle multi-state tax compliance?", answer: "Yes. Marco Reid Accounting includes tax compliance tools for all 50 US states plus federal. Tax calculations are always current, automatically updated when regulations change, and linked to Marco for instant research on any tax code question." },
          { question: "How does Marco help with tax research?", answer: "Marco searches every IRS code section, revenue ruling, Treasury regulation, and state tax code. Every citation is verified against official sources (IRS.gov, Cornell LII, GovInfo). You can query Marco from anywhere on the platform using the command palette." },
          { question: "What does it cost?", answer: "Marco Reid Accounting starts at $79/month for solo CPAs, $149/month for the Professional tier, and $299/seat/month for the Firm tier with Marco AI research. No per-transaction fees, no per-search charges." },
          { question: "Can lawyers and accountants collaborate on the platform?", answer: "Yes. This is a capability unique to Marco Reid. Lawyers and accountants can share matters, exchange documents securely, and collaborate on cross-domain questions. A corporate restructure that needs both legal and tax analysis can be handled in one place." },
        ]}
      />
    </>
  );
}
