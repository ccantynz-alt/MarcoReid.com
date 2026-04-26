import type { Metadata } from "next";
import Container from "@/app/components/shared/Container";
import Reveal from "@/app/components/effects/Reveal";
import MigrationIntakeForm from "@/app/components/marketing/MigrationIntakeForm";

export const metadata: Metadata = {
  title: "Migrating from Clio, LEAP, Xero, MYOB, QuickBooks",
  description:
    "Switch to Marco Reid in days, not weeks. We import your clients, matters, time entries, trust accounts, and documents from Clio, LEAP, actionstep, Xero, MYOB, QuickBooks, and others. Fixed-fee migration with a sign-off at every step.",
};

const sources = [
  { name: "Clio", body: "Clients, matters, time, trust transactions, documents, custom fields, calendar." },
  { name: "LEAP", body: "Matters, contacts, documents, time, trust ledger, costs, precedent library." },
  { name: "actionstep", body: "Matters, contacts, time, billing, documents, workflow steps." },
  { name: "Xero", body: "Chart of accounts, contacts, invoices, bank feeds, GST returns, payroll history." },
  { name: "MYOB", body: "Accounts, contacts, jobs, invoices, payroll, GST, BAS history." },
  { name: "QuickBooks", body: "Accounts, customers, vendors, invoices, payroll, sales tax, P&L history." },
  { name: "iress / Affinity", body: "Trust ledger, matter financials, time records, document management." },
  { name: "Other", body: "CSV, OFX, PDF — if it has structure we can read, we can import it." },
];

const steps = [
  { n: "01", title: "Scope call", body: "30 minutes. We map your data shapes, agree what we will and will not migrate, and quote a fixed fee." },
  { n: "02", title: "Sandbox import", body: "Your data lands in a sandbox firm. You and a partner walk through it. Anything off, we fix before the live cutover." },
  { n: "03", title: "Cutover weekend", body: "Final delta migration over a weekend. Monday morning you sign in to Marco Reid with everything where it should be." },
  { n: "04", title: "Two weeks of hand-holding", body: "Direct line to a migration engineer for two weeks post-cutover. Every weird corner gets resolved fast." },
];

export default function MigrationPage() {
  return (
    <>
      <section className="bg-navy-500 pt-32 pb-20 sm:pt-40">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">
              Migration
            </p>
            <h1 className="mt-6 font-serif text-hero text-white">
              Switching is the hard part. We do it for you.
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-white/90">
              Most firms stay on a tool they have outgrown because the cost of
              switching feels worse than the cost of staying. We've built the
              migrations so the cost of switching is a weekend and a fixed
              fee, not a quarter and a fight.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <Reveal>
            <h2 className="text-center font-serif text-display text-navy-800">
              Sources we read.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-navy-400">
              Each source has a tested importer that handles the shape of the
              data, the encoding quirks, and the date-of-birth-in-American
              edge cases.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {sources.map((s) => (
              <Reveal key={s.name} delay={0.05}>
                <div className="flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
                  <h3 className="font-serif text-lg text-navy-800">{s.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy-500">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-navy-50 py-20 sm:py-28">
        <Container>
          <Reveal>
            <h2 className="text-center font-serif text-display text-navy-800">
              Four steps. One weekend cutover.
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <Reveal key={s.n} delay={0.05}>
                <div className="flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
                  <p className="font-serif text-3xl text-gold-500">{s.n}</p>
                  <h3 className="mt-3 font-serif text-lg text-navy-800">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy-500">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container narrow>
          <Reveal>
            <h2 className="text-center font-serif text-display text-navy-800">
              Tell us what you have.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-center text-lg text-navy-400">
              Fill this in. A migration engineer reads it, mirrors back what
              we'll need, and sets up a scope call in 24 hours.
            </p>
          </Reveal>
          <div className="mt-12">
            <MigrationIntakeForm />
          </div>
        </Container>
      </section>
    </>
  );
}
