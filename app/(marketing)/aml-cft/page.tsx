import type { Metadata } from "next";
import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
import Reveal from "@/app/components/effects/Reveal";

export const metadata: Metadata = {
  title: "AML / CFT — Compliance built into the platform",
  description:
    "AML/CFT for NZ lawyers and accountants. Customer due diligence, risk-rating, sanctions and PEP screening, suspicious activity reporting, annual report — wired into client onboarding and matter intake. NZ AML/CFT Act 2009, AU AML/CTF Act 2006, UK MLR 2017.",
};

const features = [
  {
    title: "Customer due diligence at intake",
    body: "Standard, simplified, or enhanced CDD selected per matter. Identity capture (driver licence, passport, RealMe), beneficial-owner disclosure for entities, source-of-funds and source-of-wealth fields. Captured once, reused across every matter for the same client.",
  },
  {
    title: "Risk-rating with audit trail",
    body: "Low / Medium / High rating with the factors that drove it (PEP, high-risk jurisdiction, cash-intensive business, complex structure, structuring patterns). Every change to the rating is timestamped with the user who made it and the reason.",
  },
  {
    title: "PEP and sanctions screening",
    body: "Continuous screening against current sanctions lists (UN, OFAC, EU, NZ MFAT, AU DFAT) and PEP databases. Hits open a review task automatically; nothing slips into a closed file silently.",
  },
  {
    title: "Suspicious activity reporting",
    body: "SAR (NZ FIU) and STR (AU AUSTRAC) drafts generated from matter context, ready for review and submission. Submission status, regulator reference, and acknowledgement all tracked per report.",
  },
  {
    title: "Ongoing monitoring",
    body: "Trust account flows are watched against the risk profile. Unusual transactions raise a flag in the partner's dashboard. The flywheel learns which patterns are noise and which are real.",
  },
  {
    title: "Annual reporting",
    body: "Annual AML/CFT report drafted from the year's activity. AUSTRAC compliance report drafted for AU reporting entities. Submitted electronically once you sign off.",
  },
];

const regimes = [
  { name: "NZ AML/CFT Act 2009", body: "Reporting entities (lawyers, conveyancers, accountants, trust and company service providers) covered. DIA and FMA supervisor reporting." },
  { name: "AU AML/CTF Act 2006", body: "Designated services covered. AUSTRAC reporting (SMR, IFTI, threshold transaction). Annual compliance report." },
  { name: "UK MLR 2017", body: "Money Laundering Regulations 2017 + Proceeds of Crime Act 2002. NCA reporting via SAR Online." },
  { name: "US BSA / FinCEN", body: "Bank Secrecy Act, Beneficial Ownership Information rule, SAR filings via BSA E-Filing." },
];

export default function AmlCftPage() {
  return (
    <>
      <section className="bg-navy-500 pt-32 pb-20 sm:pt-40">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">
              AML / CFT compliance
            </p>
            <h1 className="mt-6 font-serif text-hero text-white">
              The compliance layer most platforms make you bolt on.
              We build it in.
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-white/90">
              NZ AML/CFT Act 2009. AU AML/CTF Act 2006. UK MLR 2017. US BSA.
              Marco Reid wires customer due diligence, risk-rating, sanctions
              screening, and suspicious-activity reporting into client
              onboarding and matter intake — not a quarterly project.
            </p>
            <div className="mt-10">
              <Button href="/contact" variant="gold" size="lg">
                Talk to us about AML/CFT &rarr;
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <Reveal>
            <h2 className="text-center font-serif text-display text-navy-800">
              What is wired in.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-navy-400">
              Six pieces. Together they cover the full obligation cycle for a
              reporting entity, from onboarding a new client to filing the
              annual report.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <Reveal key={f.title} delay={0.05}>
                <div className="flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5">
                  <h3 className="font-serif text-lg text-navy-800">{f.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy-500">{f.body}</p>
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
              Regimes covered.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-sm text-navy-400">
              We launch with the New Zealand and Australian regimes; UK and US
              support is rolling out alongside the broader expansion.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {regimes.map((r) => (
              <Reveal key={r.name} delay={0.05}>
                <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card">
                  <h3 className="font-serif text-lg text-navy-800">{r.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-500">{r.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <p className="mx-auto mt-10 max-w-2xl text-center text-xs text-navy-400">
            AML/CFT functionality is information-and-record support, not legal
            advice. Each firm is responsible for its own compliance programme.
            The platform makes the programme tractable; it does not replace
            the compliance officer.
          </p>
        </Container>
      </section>
    </>
  );
}
