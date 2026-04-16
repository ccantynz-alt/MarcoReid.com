import type { Metadata } from "next";
import { BRAND } from "@/lib/constants";
import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
import SchemaMarkup from "@/app/components/shared/SchemaMarkup";
import AiDisclaimer from "@/app/components/shared/AiDisclaimer";
import Reveal from "@/app/components/effects/Reveal";

export const metadata: Metadata = {
  title: "Catch-Up Centre \u2014 Years Behind on Taxes? AI Files Everything.",
  description:
    "Years of unfiled GST, income tax, provisional tax, and payroll? Marco Reid reconstructs the missing books from your bank statements and lodges every return with IR, IRS, ATO, HMRC, or CRA. AI does the work. A qualified accountant signs off.",
};

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Tax arrears and back-filing service",
  name: "Marco Reid Catch-Up Centre",
  description:
    "AI-driven catch-up of years of unfiled GST, income tax, provisional tax, and payroll. Direct e-filing to IR, IRS, ATO, HMRC, and CRA, with qualified accountant sign-off.",
  provider: {
    "@type": "Organization",
    name: BRAND.name,
    url: BRAND.url,
  },
  url: `${BRAND.url}/catch-up-centre`,
  areaServed: ["NZ", "AU", "US", "GB", "CA"],
};

const jurisdictions = [
  { flag: "\uD83C\uDDF3\uD83C\uDDFF", country: "New Zealand", filings: "GST, PAYE, Provisional Tax, Income Tax (IR3, IR4, IR526)", authority: "Inland Revenue (IR)" },
  { flag: "\uD83C\uDDE6\uD83C\uDDFA", country: "Australia", filings: "BAS/GST, PAYG, Income Tax, Payroll Tax", authority: "ATO" },
  { flag: "\uD83C\uDDFA\uD83C\uDDF8", country: "United States", filings: "Federal 1040/1120/1065, State returns, Sales Tax, Payroll 941/940", authority: "IRS + state" },
  { flag: "\uD83C\uDDEC\uD83C\uDDE7", country: "United Kingdom", filings: "VAT, PAYE, Self Assessment, Corporation Tax (CT600)", authority: "HMRC" },
  { flag: "\uD83C\uDDE8\uD83C\uDDE6", country: "Canada", filings: "GST/HST, T1/T2, Provincial Tax, Payroll (T4/T4A)", authority: "CRA + provinces" },
];

const steps = [
  {
    n: "01",
    title: "Upload everything you have.",
    body: "Bank statements. Invoices. Receipts. A shoebox of paper. A folder of PDFs. A phone camera roll. If it exists, we take it. Nothing is too messy.",
  },
  {
    n: "02",
    title: "Marco reconstructs the missing years.",
    body: "AI reads every statement and receipt, rebuilds the general ledger, reconciles bank feeds, and recreates the books for every year you're behind \u2014 three years, five years, ten years. It has never mattered.",
  },
  {
    n: "03",
    title: "Every return is drafted and priced.",
    body: "GST returns for every missed period. Provisional tax recalculated. Income tax prepared for each year. Payroll back-filings assembled. Penalties and interest calculated to the cent \u2014 with AI-drafted remission letters attached.",
  },
  {
    n: "04",
    title: "A qualified accountant signs off.",
    body: "No return leaves the platform without a human accountant reviewing every line. You see the draft. You approve it. We file it. Every lodgement is professionally reviewed \u2014 this is not a robo-filer.",
  },
  {
    n: "05",
    title: "We file directly with the tax authority.",
    body: "Direct e-filing to Inland Revenue, the IRS, the ATO, HMRC, and the CRA. You get a live dashboard showing every filing, every receipt, every outstanding item closing out in real time.",
  },
];

export default function CatchUpCentrePage() {
  return (
    <>
      <SchemaMarkup schema={schema} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-500 pt-36 pb-24 sm:pt-44 sm:pb-32 lg:pt-52">
        <div className="pointer-events-none absolute inset-0">
          <div className="animate-drift absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-gold-400/20 blur-[120px]" />
          <div className="animate-drift-reverse absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-forest-500/15 blur-[100px]" />
        </div>
        <Container className="relative text-center">
          <p className="animate-fade-up text-sm font-semibold tracking-wider text-gold-400 opacity-0">
            The Marco Reid Catch-Up Centre
          </p>
          <h1 className="mt-6 animate-fade-up-1 font-serif text-hero text-white opacity-0">
            Years behind on your taxes?
            <br />
            <span className="text-gold-300">We catch you up. Automatically.</span>
          </h1>
          <p className="mx-auto mt-8 max-w-3xl animate-fade-up-2 text-xl leading-relaxed text-navy-200 opacity-0">
            Three years unfiled. Five years unfiled. Ten years unfiled. It has never mattered.
            Upload what you have. Marco reconstructs the missing books, recalculates every
            GST and provisional tax period, prepares every income tax return, and files
            everything directly with Inland Revenue, the IRS, the ATO, HMRC, or the CRA.
            A qualified accountant signs off before a single return leaves the platform.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 animate-fade-up-3 opacity-0 sm:flex-row">
            <Button href="/contact" size="lg">Start catching up today</Button>
            <Button href="#how-it-works" size="lg" variant="ghost" className="text-white hover:text-navy-200">
              How it works &rarr;
            </Button>
          </div>
          <p className="mx-auto mt-8 max-w-xl animate-fade-up-3 text-sm text-navy-300 opacity-0">
            Confidential. Fixed fee. No judgement. Tax debt negotiation and penalty remission included.
          </p>
        </Container>
      </section>

      {/* Three paths — who this is for */}
      <section className="py-24 sm:py-32" aria-label="Who this is for">
        <Container>
          <Reveal>
            <p className="text-center text-xs font-semibold uppercase tracking-widest text-forest-600">
              Built for the people the big firms won&rsquo;t call back
            </p>
            <h2 className="mt-6 text-center font-serif text-display text-navy-700">
              You are not alone. And you are not in trouble.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed text-navy-400">
              Tens of thousands of small businesses, sole traders, contractors, and
              professionals are one, three, or ten years behind on their returns.
              The longer you wait, the bigger it feels. Marco Reid makes it small again.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            <Reveal delay={0.05}>
              <div className="h-full rounded-xl border border-navy-100 bg-white p-8 shadow-card">
                <p className="text-xs font-bold uppercase tracking-wider text-forest-600">The sole trader</p>
                <h3 className="mt-4 font-serif text-headline text-navy-700">
                  Three years of GST returns. Two of income tax. Forgotten.
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-navy-400">
                  You stopped filing when the business got hard. IR has been sending letters.
                  You already know what the penalties are. Upload your bank feed and invoices.
                  We close every year by the end of the month.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="h-full rounded-xl border border-navy-100 bg-white p-8 shadow-card">
                <p className="text-xs font-bold uppercase tracking-wider text-forest-600">The growing company</p>
                <h3 className="mt-4 font-serif text-headline text-navy-700">
                  PAYE and payroll tax arrears. Investors asking questions.
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-navy-400">
                  Due diligence starts in six weeks. Payroll filings are behind.
                  Provisional tax was underpaid three years running. We reconstruct
                  everything, file the arrears, and hand your CFO a clean data room.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="h-full rounded-xl border border-navy-100 bg-white p-8 shadow-card">
                <p className="text-xs font-bold uppercase tracking-wider text-forest-600">The professional</p>
                <h3 className="mt-4 font-serif text-headline text-navy-700">
                  Ten years of unfiled US returns while living abroad.
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-navy-400">
                  You&rsquo;re a New Zealander who forgot they&rsquo;re still a US person.
                  Or an expat whose CPA stopped responding four tax years ago. Streamlined
                  filing, FBAR catch-up, state residuals &mdash; we run the whole program.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12"><div className="gold-divider" /></div>

      {/* How it works */}
      <section id="how-it-works" className="py-24 sm:py-32" aria-label="How the Catch-Up Centre works">
        <Container>
          <Reveal>
            <p className="text-center text-xs font-semibold uppercase tracking-widest text-forest-600">
              The five-step catch-up
            </p>
            <h2 className="mt-6 text-center font-serif text-display text-navy-700">
              From shoebox to signed-off, in weeks. Not years.
            </h2>
          </Reveal>

          <ol className="mx-auto mt-16 max-w-3xl space-y-4">
            {steps.map((step) => (
              <Reveal key={step.n} delay={0.05}>
                <li className="flex gap-6 rounded-xl border border-navy-100 bg-white p-6 shadow-card sm:p-8">
                  <span className="shrink-0 font-serif text-4xl text-gold-500 sm:text-5xl">{step.n}</span>
                  <div>
                    <h3 className="font-serif text-headline text-navy-700">{step.title}</h3>
                    <p className="mt-3 leading-relaxed text-navy-400">{step.body}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12"><div className="gold-divider" /></div>

      {/* Jurisdictions */}
      <section className="py-24 sm:py-32" aria-label="Jurisdictions">
        <Container>
          <Reveal>
            <p className="text-center text-xs font-semibold uppercase tracking-widest text-forest-600">
              Every major jurisdiction. One platform.
            </p>
            <h2 className="mt-6 text-center font-serif text-display text-navy-700">
              Whoever you owe, we file with them directly.
            </h2>
          </Reveal>

          <div className="mx-auto mt-16 grid max-w-5xl gap-4 md:grid-cols-2 lg:grid-cols-3">
            {jurisdictions.map((j) => (
              <Reveal key={j.country} delay={0.05}>
                <div className="h-full rounded-xl border border-navy-100 bg-white p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5">
                  <p className="font-serif text-4xl" aria-hidden>{j.flag}</p>
                  <h3 className="mt-3 font-semibold text-navy-700">{j.country}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-400">{j.filings}</p>
                  <p className="mt-3 text-xs font-semibold text-forest-600">
                    E-files directly with {j.authority}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12"><div className="gold-divider" /></div>

      {/* What we include */}
      <section className="py-24 sm:py-32" aria-label="Included in every catch-up">
        <Container>
          <Reveal>
            <p className="text-center text-xs font-semibold uppercase tracking-widest text-forest-600">
              Included in every catch-up engagement
            </p>
            <h2 className="mt-6 text-center font-serif text-display text-navy-700">
              No surprises. No side-quests. No &ldquo;that&rsquo;ll be extra.&rdquo;
            </h2>
          </Reveal>

          <div className="mx-auto mt-16 grid max-w-4xl gap-3 sm:grid-cols-2">
            {[
              { title: "Bank-feed reconstruction", desc: "Every missing period rebuilt from statements and receipts" },
              { title: "GST / VAT back-filing", desc: "Every missed period lodged, with interest and penalties calculated" },
              { title: "Provisional tax recalc", desc: "Every open year recalculated and reconciled against payments made" },
              { title: "Income tax preparation", desc: "IR3 / 1040 / BAS / SA100 / T1 for every year still open" },
              { title: "Payroll back-filing", desc: "PAYE, PAYG, US 941/940, UK PAYE, and CA T4/T4A arrears" },
              { title: "Penalty remission letters", desc: "AI-drafted remission and hardship applications" },
              { title: "Tax debt negotiation", desc: "Instalment arrangements and hardship support, handled end-to-end" },
              { title: "Qualified accountant sign-off", desc: "Every lodgement professionally reviewed before filing" },
              { title: "Live progress dashboard", desc: "See every filing close out in real time, from any device" },
              { title: "Fixed-fee engagement", desc: "Quoted up-front. No hourly meter. No hidden costs." },
            ].map((f) => (
              <Reveal key={f.title} delay={0.05}>
                <div className="rounded-xl border border-navy-100 bg-white p-5 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5">
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
      <section className="relative bg-navy-500 py-24 sm:py-32" aria-label="Start catching up">
        <div className="gold-divider" />
        <Container className="relative text-center">
          <Reveal>
            <h2 className="font-serif text-display text-white">
              The longer you wait, the larger it gets.
              <br />
              <span className="text-gold-300">Today is a good day to end it.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-navy-200">
              Every conversation is confidential. Every engagement is fixed-fee.
              Every filing is signed off by a qualified accountant.
              You will know exactly what you owe &mdash; and exactly when it is over.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-10 flex justify-center gap-4">
              <Button href="/contact" size="lg">Book a confidential intake call</Button>
              <Button href="/accounting" size="lg" variant="ghost" className="text-white hover:text-navy-200">
                Explore Accounting &rarr;
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
