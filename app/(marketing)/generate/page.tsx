import type { Metadata } from "next";
import Container from "@/app/components/shared/Container";
import Reveal from "@/app/components/effects/Reveal";
import SchemaMarkup from "@/app/components/shared/SchemaMarkup";
import AiDisclaimer from "@/app/components/shared/AiDisclaimer";
import DocumentGeneratorWizard from "./DocumentGeneratorWizard";

export const metadata: Metadata = {
  title: "Generate a Legal Document — free AI-drafted documents",
  description:
    "Select a document type, answer a few questions, and get a free AI-drafted legal document in minutes. Wills, tenancy agreements, employment contracts, NDAs, and more. Review with a professional before use.",
};

const schema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Marco Reid Document Generator",
  description:
    "Free AI-drafted legal documents. Select a document type, answer questions, and generate a draft instantly.",
  applicationCategory: "LegalService",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "Free draft generation. Professional review available for $99.",
  },
};

const docTypes = [
  {
    id: "will",
    name: "Will / Testament",
    icon: "scroll",
    desc: "Last will and testament with beneficiary designations",
  },
  {
    id: "tenancy",
    name: "Tenancy Agreement",
    icon: "home",
    desc: "Residential lease between landlord and tenant",
  },
  {
    id: "employment",
    name: "Employment Agreement",
    icon: "briefcase",
    desc: "Standards-compliant employment contract",
  },
  {
    id: "privacy-policy",
    name: "Privacy Policy",
    icon: "shield",
    desc: "GDPR and privacy-law compliant privacy policy",
  },
  {
    id: "terms",
    name: "Terms & Conditions",
    icon: "file-text",
    desc: "Website or app terms of service",
  },
  {
    id: "nda",
    name: "Non-Disclosure Agreement",
    icon: "lock",
    desc: "Mutual or one-way confidentiality agreement",
  },
  {
    id: "partnership",
    name: "Partnership Agreement",
    icon: "handshake",
    desc: "Business partnership terms and governance",
  },
  {
    id: "poa",
    name: "Power of Attorney",
    icon: "stamp",
    desc: "Enduring or ordinary power of attorney",
  },
  {
    id: "constitution",
    name: "Company Constitution",
    icon: "building",
    desc: "Articles of association and governance rules",
  },
  {
    id: "loan",
    name: "Loan Agreement",
    icon: "dollar",
    desc: "Personal or business loan terms and repayment schedule",
  },
  {
    id: "contractor",
    name: "Contractor Agreement",
    icon: "wrench",
    desc: "Independent contractor services agreement",
  },
  {
    id: "demand",
    name: "Demand Letter",
    icon: "mail",
    desc: "Formal demand for payment or performance",
  },
];

const countries = [
  { code: "NZ", name: "New Zealand", flag: "🇳🇿" },
  { code: "AU", name: "Australia", flag: "🇦🇺" },
  { code: "UK", name: "United Kingdom", flag: "🇬🇧" },
  { code: "US", name: "United States", flag: "🇺🇸" },
  { code: "CA", name: "Canada", flag: "🇨🇦" },
  { code: "IE", name: "Ireland", flag: "🇮🇪" },
  { code: "SG", name: "Singapore", flag: "🇸🇬" },
];

const steps = [
  {
    n: "01",
    title: "Choose your document",
    body: "Select from 12 common legal document types. Each one is drafted against the rules of your chosen jurisdiction.",
  },
  {
    n: "02",
    title: "Select your country",
    body: "Your document will be drafted to comply with the laws and conventions of the jurisdiction you select.",
  },
  {
    n: "03",
    title: "Answer a few questions",
    body: "A short form tailored to your document type. Names, dates, key terms. Two minutes, not two hours.",
  },
  {
    n: "04",
    title: "Generate and download",
    body: "Your draft is ready instantly. Download it free, or pay $99 for a verified professional to review and sign it.",
  },
];

export default function GeneratePage() {
  return (
    <>
      <SchemaMarkup schema={schema} />

      {/* HERO */}
      <section className="relative overflow-hidden bg-navy-500 pt-32 pb-20 sm:pt-40">
        <div className="pointer-events-none absolute inset-0">
          <div className="animate-drift absolute -right-48 -top-48 h-[480px] w-[480px] rounded-full bg-gold-500/15 blur-[140px]" />
          <div className="animate-drift-reverse absolute -left-48 -bottom-32 h-[420px] w-[420px] rounded-full bg-forest-500/12 blur-[120px]" />
        </div>
        <Container>
          <div className="relative mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">
              Document generator
            </p>
            <h1 className="mt-6 font-serif text-hero text-white">
              Generate a Legal Document.
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-white/90">
              Free AI-drafted documents. Select a type, answer a few questions,
              and get a professionally formatted draft in minutes. Review with a
              professional before use.
            </p>
            <p className="mt-4 text-sm text-white/70">
              No account required. No Marco Reid output is legally binding until
              a licensed professional signs it.
            </p>
          </div>
        </Container>
      </section>

      {/* STEP INDICATORS */}
      <section className="relative -mt-10 z-10">
        <Container>
          <Reveal>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {steps.map((s) => (
                <div
                  key={s.n}
                  className="flex flex-col rounded-2xl border border-navy-100 bg-white p-5 shadow-card"
                >
                  <p className="font-serif text-2xl text-gold-500">{s.n}</p>
                  <h3 className="mt-2 font-serif text-base text-navy-800">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-navy-500">
                    {s.body}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* WIZARD */}
      <section className="py-20 sm:py-28">
        <Container>
          <Reveal>
            <h2 className="text-center font-serif text-display text-navy-800">
              Start your document.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-navy-400">
              Choose a document type, select your country, and answer the
              questions. Your draft is generated instantly.
            </p>
          </Reveal>
          <div className="mt-12">
            <DocumentGeneratorWizard
              docTypes={docTypes}
              countries={countries}
            />
          </div>
        </Container>
      </section>

      {/* DOCUMENT TYPES GRID */}
      <section className="bg-navy-50 py-20 sm:py-28">
        <Container>
          <Reveal>
            <h2 className="text-center font-serif text-display text-navy-800">
              What you can draft.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-navy-400">
              Twelve document types across seven jurisdictions. Hundreds more
              drafts available once you describe what you need.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {docTypes.map((d) => (
              <Reveal key={d.id} delay={0.03}>
                <div className="rounded-xl border border-navy-100 bg-white p-5 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5">
                  <h3 className="font-serif text-lg text-navy-800">{d.name}</h3>
                  <p className="mt-2 text-sm text-navy-500">{d.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* SIGN-OFF SECTION */}
      <section className="py-20 sm:py-28">
        <Container narrow>
          <Reveal>
            <h2 className="font-serif text-display text-navy-800">
              Why the sign-off matters.
            </h2>
            <p className="mt-4 text-lg text-navy-400">
              An AI-drafted document without professional review is a starting
              point, not a finished one. Marco Reid&rsquo;s sign-off is what
              turns a draft into a document a court, bank, regulator, or
              counterparty will accept.
            </p>
          </Reveal>

          <div className="mt-10 space-y-4">
            <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card">
              <h3 className="font-serif text-lg text-navy-800">
                Drafts are watermarked until signed
              </h3>
              <p className="mt-2 text-sm text-navy-500">
                Every page of every unsigned draft carries the watermark
                &ldquo;DRAFT &mdash; Not legal/tax advice. Pending professional
                review.&rdquo; You can share it, mark it up, refine it. You
                can&rsquo;t use it as a binding instrument.
              </p>
            </div>
            <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card">
              <h3 className="font-serif text-lg text-navy-800">
                Signed documents carry the professional&rsquo;s credentials
              </h3>
              <p className="mt-2 text-sm text-navy-500">
                Once signed: &ldquo;Reviewed and signed by [Name], [Bar No. / CA
                designation / TPB registration], [Jurisdiction], [Date].&rdquo;
                Stamped on every page.
              </p>
            </div>
            <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-forest-50 text-sm font-bold text-forest-700">
                  $99
                </span>
                <div>
                  <h3 className="font-serif text-lg text-navy-800">
                    Professional review from $99
                  </h3>
                  <p className="mt-1 text-sm text-navy-500">
                    A verified attorney or accountant in your jurisdiction
                    reviews, amends, and signs. Their credentials on every page.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* AI DISCLAIMER */}
      <section className="pb-20">
        <Container narrow>
          <AiDisclaimer />
        </Container>
      </section>
    </>
  );
}
