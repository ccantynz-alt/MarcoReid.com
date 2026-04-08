import type { Metadata } from "next";
import { BRAND } from "@/lib/constants";
import SchemaMarkup from "@/app/components/shared/SchemaMarkup";
import Reveal from "@/app/components/effects/Reveal";
import Button from "@/app/components/shared/Button";
import AiDisclaimer from "@/app/components/shared/AiDisclaimer";

export const metadata: Metadata = {
  title:
    "Immigration Help — Find an Immigration Lawyer | Marco Reid",
  description:
    "Connect with immigration attorneys who use the most advanced AI legal technology. Family visas, employment visas, asylum, DACA, naturalization, deportation defence, and business immigration.",
  keywords: [
    "immigration lawyer",
    "immigration help",
    "visa attorney",
    "immigration attorney near me",
    "green card lawyer",
    "H-1B visa attorney",
    "asylum lawyer",
    "deportation defense lawyer",
    "DACA lawyer",
    "naturalization attorney",
    "EB-5 investor visa",
    "family immigration lawyer",
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How long does immigration processing take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Processing times vary significantly by case type and USCIS service centre. Family-based green cards typically take 12 to 36 months depending on the relationship category and country of birth. Employment-based petitions range from 6 months for premium processing of H-1B petitions to several years for EB-2 and EB-3 categories with per-country backlogs. Naturalization applications currently average 6 to 12 months. An experienced immigration attorney can advise on current processing times for your specific case type and help identify strategies to reduce wait times where possible.",
      },
    },
    {
      "@type": "Question",
      name: "How much does an immigration lawyer cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Immigration attorney fees depend on the complexity of your case. Simple family petition filings may cost between $1,500 and $3,500 in attorney fees, plus USCIS filing fees. Employment-based visa petitions typically range from $3,000 to $8,000. Complex cases involving removal proceedings, appeals, or waivers can cost $5,000 to $15,000 or more. Most immigration attorneys offer an initial consultation — often free or at a reduced rate — to evaluate your case and provide a fee estimate. Government filing fees are separate and vary by form type.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need a lawyer for my immigration case?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "While you are not legally required to have an attorney for most immigration filings, professional representation significantly improves outcomes. Immigration law is one of the most complex areas of US law, with constantly changing regulations, strict deadlines, and severe consequences for errors. A single mistake on a form or a missed deadline can result in denial, deportation proceedings, or years of delay. An experienced immigration attorney understands current USCIS policies, can identify issues before they become problems, and knows how to present your case in the strongest possible light. For removal proceedings, asylum cases, and complex petitions, legal representation is strongly recommended.",
      },
    },
    {
      "@type": "Question",
      name: "What documents do I need for my visa application?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Required documents depend on the visa category. Common documents include a valid passport, birth certificate, marriage certificate (for family-based cases), employment verification letters, educational credentials, tax returns, financial evidence of support (I-864 Affidavit of Support for family cases), passport-style photographs, and medical examination results (Form I-693). Employment-based cases typically require labour condition applications, educational evaluations, and evidence of qualifications. Asylum cases require a detailed personal declaration and supporting country-conditions evidence. An immigration attorney will provide a comprehensive checklist tailored to your specific case type and circumstances.",
      },
    },
  ],
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Immigration Help — Find an Immigration Lawyer",
  description:
    "Connect with immigration attorneys who use the most advanced AI legal technology available.",
  url: `${BRAND.url}/immigration`,
  provider: {
    "@type": "Organization",
    name: BRAND.name,
    url: BRAND.url,
  },
};

const immigrationServices = [
  {
    title: "Family-Based Immigration",
    description:
      "Spouse, parent, child, and sibling petitions. I-130 family petitions, I-485 adjustment of status, consular processing, K-1 fiance visas, and V visas for family members waiting in long backlogs. Reuniting families is the foundation of US immigration law, and the process demands precision at every step.",
  },
  {
    title: "Employment-Based Visas",
    description:
      "H-1B specialty occupation visas, L-1 intracompany transfers, O-1 extraordinary ability, TN NAFTA professionals, and EB-1 through EB-5 permanent residence categories. From initial petition through adjustment of status or consular processing, every filing prepared with the accuracy your career depends on.",
  },
  {
    title: "Investor Visas",
    description:
      "EB-5 immigrant investor visas requiring substantial capital investment in a US enterprise that creates jobs, and E-2 treaty investor visas for nationals of treaty countries. Complex financial documentation, business plan requirements, and source-of-funds analysis handled by attorneys who understand both immigration law and business formation.",
  },
  {
    title: "Naturalization and Citizenship",
    description:
      "N-400 naturalization applications, civics test preparation, interview coaching, and citizenship through derivation or acquisition. Whether you have held permanent residence for three years through marriage to a US citizen or five years through other means, the path to citizenship requires careful review of your eligibility, travel history, and any potential bars.",
  },
  {
    title: "Asylum and Refugee Status",
    description:
      "Affirmative asylum applications filed with USCIS, defensive asylum before immigration judges, withholding of removal, and protection under the Convention Against Torture. Detailed personal declarations, country-conditions evidence, and expert witness coordination for individuals fleeing persecution based on race, religion, nationality, political opinion, or membership in a particular social group.",
  },
  {
    title: "DACA and TPS",
    description:
      "Deferred Action for Childhood Arrivals initial applications and renewals, Temporary Protected Status applications and re-registration, and advance parole travel authorisation. Staying current with rapidly changing policies, court orders, and filing windows is critical — a missed deadline or incorrect filing can have irreversible consequences.",
  },
  {
    title: "Deportation Defence",
    description:
      "Removal proceedings before immigration judges, cancellation of removal for permanent residents and non-permanent residents, voluntary departure, prosecutorial discretion requests, and appeals to the Board of Immigration Appeals and federal circuit courts. When your right to remain in the country is at stake, your attorney needs every advantage available.",
  },
  {
    title: "Business Immigration",
    description:
      "Corporate immigration compliance programmes, I-9 verification and audit defence, E-Verify enrolment and management, H-1B and L-1 blanket petition programmes for employers, and PERM labour certification. For companies hiring internationally, systematic compliance prevents costly fines and protects both the employer and the sponsored employees.",
  },
];

const differentiators = [
  {
    label: "Research",
    title: "AI-Powered Case Research",
    description:
      "Marco tracks every immigration regulation, every Board of Immigration Appeals decision, every circuit court split on immigration issues, and every USCIS Policy Manual update. When your attorney researches your case, they are working with the most comprehensive, up-to-date immigration law intelligence available — with every citation verified against authoritative public sources before it reaches a filing.",
  },
  {
    label: "Visibility",
    title: "Real-Time Case Tracking",
    description:
      "Your secure client portal shows your case status, upcoming deadlines, USCIS processing time estimates for your case type and service centre, documents that have been filed, documents still needed, and exactly what happens next. No more calling your attorney's office for updates. No more uncertainty about where your case stands. Every step visible, every milestone tracked.",
  },
  {
    label: "Protection",
    title: "Secure Escrow Payments",
    description:
      "Immigration case fees are held in escrow through Stripe Connect — a transparent, protected payment system. Your funds are held securely until work is performed and milestones are reached. Full payment history visible in your client portal. No surprises, no disputes, no ambiguity about what you paid and what was delivered.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Consultation",
    description:
      "You are matched with an immigration attorney based on your case type, language needs, and location. Your initial consultation covers your immigration goals, eligibility, timeline, and a clear fee estimate before any commitment.",
  },
  {
    step: "02",
    title: "Case Evaluation",
    description:
      "Your attorney uses Marco to research the specific regulations, precedent decisions, and current USCIS policies that apply to your situation. Every angle is explored. Every potential issue is identified before filing — not after a denial.",
  },
  {
    step: "03",
    title: "Filing and Tracking",
    description:
      "Documents are prepared using AI-assisted drafting with legal vocabulary intelligence, reviewed by your attorney, and filed electronically where accepted. Every deadline is tracked automatically. Every receipt notice is logged. Nothing falls through the cracks.",
  },
  {
    step: "04",
    title: "Resolution",
    description:
      "From the day your case is filed to the day it is resolved, you receive status updates through your client portal at every stage. RFE responses are drafted quickly with verified citations. Interview preparation is thorough. You are never left wondering what happens next.",
  },
];

const faqs = [
  {
    question: "How long does immigration processing take?",
    answer:
      "Processing times vary significantly by case type and USCIS service centre. Family-based green cards typically take 12 to 36 months depending on the relationship category and country of birth. Employment-based petitions range from 6 months for premium processing of H-1B petitions to several years for EB-2 and EB-3 categories with per-country backlogs. Naturalization applications currently average 6 to 12 months. An experienced immigration attorney can advise on current processing times for your specific case type and help identify strategies to reduce wait times where possible.",
  },
  {
    question: "How much does an immigration lawyer cost?",
    answer:
      "Immigration attorney fees depend on the complexity of your case. Simple family petition filings may cost between $1,500 and $3,500 in attorney fees, plus USCIS filing fees. Employment-based visa petitions typically range from $3,000 to $8,000. Complex cases involving removal proceedings, appeals, or waivers can cost $5,000 to $15,000 or more. Most immigration attorneys offer an initial consultation — often free or at a reduced rate — to evaluate your case and provide a fee estimate. Government filing fees are separate and vary by form type.",
  },
  {
    question: "Do I need a lawyer for my immigration case?",
    answer:
      "While you are not legally required to have an attorney for most immigration filings, professional representation significantly improves outcomes. Immigration law is one of the most complex areas of US law, with constantly changing regulations, strict deadlines, and severe consequences for errors. A single mistake on a form or a missed deadline can result in denial, deportation proceedings, or years of delay. For removal proceedings, asylum cases, and complex petitions, legal representation is strongly recommended.",
  },
  {
    question: "What documents do I need for my visa application?",
    answer:
      "Required documents depend on the visa category. Common documents include a valid passport, birth certificate, marriage certificate for family-based cases, employment verification letters, educational credentials, tax returns, financial evidence of support, passport-style photographs, and medical examination results. Employment-based cases typically require labour condition applications and educational evaluations. Asylum cases require a detailed personal declaration and supporting country-conditions evidence. An immigration attorney will provide a comprehensive checklist tailored to your specific case type.",
  },
];

export default function ImmigrationPage() {
  return (
    <>
      <SchemaMarkup schema={pageSchema} />
      <SchemaMarkup schema={faqSchema} />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-navy-500 pt-32 pb-24 sm:pt-40 sm:pb-32">
        {/* Gradient orbs */}
        <div
          className="pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full opacity-20 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(56,152,116,0.6) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-32 -right-32 h-[400px] w-[400px] rounded-full opacity-15 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(126,90,161,0.5) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-6xl px-6 sm:px-8 lg:px-12 text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-forest-300">
            Immigration Help
          </p>
          <h1 className="mt-6 font-serif text-hero text-white">
            Navigate Immigration
            <br />
            with Confidence
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-xl leading-relaxed text-navy-200">
            Connect with immigration attorneys who use the most advanced AI
            legal technology available. From family petitions to asylum cases,
            employment visas to naturalization — find a professional who has
            the tools to handle your case with precision.
          </p>
          <div className="mt-12">
            <Button href="/find-a-lawyer" size="lg" variant="secondary">
              Find an Immigration Attorney
            </Button>
          </div>
        </div>
      </section>

      {/* ── Immigration Services ── */}
      <section className="py-24 sm:py-36" aria-label="Immigration services">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
          <Reveal>
            <p className="text-center text-xs font-medium uppercase tracking-widest text-forest-600">
              Immigration Services
            </p>
            <h2 className="mt-6 text-center font-serif text-display text-navy-800">
              Comprehensive immigration representation.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-navy-400">
              Marco Reid attorneys handle every category of immigration law.
              Whatever your situation, there is an attorney on the platform with
              the experience and technology to help.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {immigrationServices.map((service, i) => (
              <Reveal key={service.title} delay={0.05 + i * 0.03}>
                <div className="group h-full rounded-xl border border-navy-100 bg-white p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5">
                  <h3 className="font-serif text-lg text-navy-800">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy-400">
                    {service.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto h-px max-w-sm bg-navy-100" aria-hidden="true" />

      {/* ── Why Marco Reid Attorneys Are Different ── */}
      <section
        className="py-24 sm:py-36"
        aria-label="Why Marco Reid attorneys are different"
      >
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
          <Reveal>
            <p className="text-center text-xs font-medium uppercase tracking-widest text-forest-600">
              The Advantage
            </p>
            <h2 className="mt-6 text-center font-serif text-display text-navy-800">
              Why Marco Reid attorneys are different.
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {differentiators.map((item, i) => (
              <Reveal key={item.title} delay={0.1 + i * 0.1}>
                <div className="h-full rounded-xl border border-navy-100 bg-white p-8 shadow-card">
                  <p className="text-xs font-semibold uppercase tracking-widest text-forest-600">
                    {item.label}
                  </p>
                  <h3 className="mt-4 font-serif text-xl text-navy-800">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-navy-400">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto h-px max-w-sm bg-navy-100" aria-hidden="true" />

      {/* ── Understanding the Process ── */}
      <section className="py-24 sm:py-36" aria-label="Understanding the process">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
          <Reveal>
            <p className="text-center text-xs font-medium uppercase tracking-widest text-forest-600">
              How It Works
            </p>
            <h2 className="mt-6 text-center font-serif text-display text-navy-800">
              Understanding the process.
            </h2>
          </Reveal>

          <div className="mx-auto mt-16 max-w-3xl space-y-6">
            {processSteps.map((step, i) => (
              <Reveal key={step.step} delay={0.1 + i * 0.1}>
                <div className="flex gap-6 rounded-xl border border-navy-100 bg-white p-6 shadow-card sm:p-8">
                  <div className="flex-shrink-0">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-navy-500 font-serif text-lg font-bold text-white">
                      {step.step}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-serif text-xl text-navy-800">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-navy-400">
                      {step.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto h-px max-w-sm bg-navy-100" aria-hidden="true" />

      {/* ── FAQ ── */}
      <section className="py-24 sm:py-36" aria-label="Frequently asked questions">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
          <Reveal>
            <p className="text-center text-xs font-medium uppercase tracking-widest text-forest-600">
              Frequently Asked Questions
            </p>
            <h2 className="mt-6 text-center font-serif text-display text-navy-800">
              Immigration questions, answered.
            </h2>
          </Reveal>

          <div className="mx-auto mt-16 max-w-3xl space-y-5">
            {faqs.map((faq, i) => (
              <Reveal key={faq.question} delay={0.05 + i * 0.05}>
                <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card sm:p-8">
                  <h3 className="font-serif text-lg text-navy-800">
                    {faq.question}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-navy-400">
                    {faq.answer}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto h-px max-w-sm bg-navy-100" aria-hidden="true" />

      {/* ── CTA ── */}
      <section className="py-24 sm:py-36" aria-label="Find an immigration attorney">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12 text-center">
          <Reveal>
            <h2 className="font-serif text-display text-navy-800">
              Find an Immigration Attorney
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-navy-400">
              Connect with an immigration professional who uses the most
              advanced legal technology available. Your case deserves precision,
              speed, and an attorney who never misses a deadline.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-12 flex flex-wrap justify-center gap-4">
              <Button href="/find-a-lawyer" size="lg">
                Find an Immigration Attorney
              </Button>
              <Button href="/law" variant="secondary" size="lg">
                Explore Marco Reid Legal
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── AI Disclaimer ── */}
      <section className="pb-24" aria-label="AI disclaimer">
        <div className="mx-auto max-w-2xl px-6 sm:px-8 lg:px-12">
          <AiDisclaimer />
        </div>
      </section>
    </>
  );
}
