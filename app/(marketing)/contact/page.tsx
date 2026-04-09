import type { Metadata } from "next";
import { BRAND } from "@/lib/constants";
import Container from "@/app/components/shared/Container";
import SchemaMarkup from "@/app/components/shared/SchemaMarkup";
import Reveal from "@/app/components/effects/Reveal";
import Button from "@/app/components/shared/Button";
import ContactForm from "./ContactForm";

/* ── Metadata ─────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: "Contact Marco Reid — Talk to Our Team",
  description:
    "Get in touch with Marco Reid. Questions about legal practice management, accounting automation, AI research, security, pricing, or partnerships. Every message answered within 24 hours.",
  keywords: [
    "contact Marco Reid",
    "Marco Reid support",
    "legal software support",
    "accounting software contact",
    "AI legal research enquiry",
    "law firm technology contact",
    "Marco Reid sales",
    "Marco Reid security",
    "professional intelligence platform contact",
  ],
};

/* ── Schema ────────────────────────────────────────────────────────────── */

const schema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Marco Reid",
  description:
    "Contact the Marco Reid team. Questions about legal practice management, accounting automation, AI research, security, pricing, or partnerships.",
  url: `${BRAND.url}/contact`,
  mainEntity: {
    "@type": "Organization",
    name: BRAND.name,
    url: BRAND.url,
    email: "hello@marcoreid.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Auckland",
      addressCountry: "NZ",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "support@marcoreid.com",
      },
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: "hello@marcoreid.com",
      },
      {
        "@type": "ContactPoint",
        contactType: "security",
        email: "security@marcoreid.com",
      },
    ],
  },
};

/* ── Department contacts ───────────────────────────────────────────────── */

const departments = [
  {
    name: "Sales and partnerships",
    description:
      "Pricing questions, demo requests, partnership opportunities, and enterprise enquiries.",
    email: "hello@marcoreid.com",
  },
  {
    name: "Legal enquiries",
    description:
      "Questions about our terms of service, legal compliance, licensing, or regulatory matters.",
    email: "legal@marcoreid.com",
  },
  {
    name: "Privacy",
    description:
      "Data protection requests, GDPR and CCPA enquiries, data subject access requests, and DPA questions.",
    email: "privacy@marcoreid.com",
  },
  {
    name: "Security",
    description:
      "Report a vulnerability, security concerns, SOC 2 enquiries, and penetration testing requests.",
    email: "security@marcoreid.com",
  },
  {
    name: "Support",
    description:
      "Technical support, bug reports, feature requests, and platform questions from existing customers.",
    email: "support@marcoreid.com",
  },
  {
    name: "Press and media",
    description:
      "Media enquiries, interview requests, press kits, and analyst briefings.",
    email: "hello@marcoreid.com",
  },
];

/* ── FAQ ────────────────────────────────────────────────────────────────── */

const faqs = [
  {
    question: "What is Marco Reid?",
    answer:
      "Marco Reid is a professional intelligence platform for lawyers and accountants. Five integrated products — Marco Reid Legal, Marco Reid Accounting, Marco Reid Courtroom, Marco (The Oracle), and Marco Reid Voice — share a common AI engine and deliver everything a professional firm needs in a single platform. Case management, billing, trust accounting, AI-powered research with citation verification, voice dictation in 9 languages, document drafting, e-signatures, and more.",
  },
  {
    question: "How do I get started?",
    answer:
      "Send us a message through the contact form on this page or email hello@marcoreid.com. Our team will walk you through the platform, answer your questions, and help you determine which plan is right for your firm. We provide white-glove onboarding for every new firm — you will never be left figuring things out on your own.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Marco Reid is built to courtroom-admissibility security standards. All data is encrypted at rest and in transit with TLS 1.3. Attorney-client communications use end-to-end encryption. Every action is logged in an immutable, cryptographically signed audit trail. We comply with GDPR, the NZ Privacy Act 2020, and CCPA. We execute Data Processing Agreements with every third-party processor. Visit our security page at marcoreid.com/security for full details.",
  },
  {
    question: "Do you offer a free trial?",
    answer:
      "We offer a 14-day satisfaction guarantee on all plans. If you are not completely satisfied within the first 14 days, we will issue a full refund — no questions asked. We also run an early access programme for qualifying firms. Contact us for details.",
  },
  {
    question: "Which jurisdictions do you support?",
    answer:
      "Marco Reid supports legal and accounting professionals in New Zealand, Australia, the United States, the United Kingdom, Canada, and the European Union. Our AI research engine, Marco, covers public domain case law and statutes across all US federal and state jurisdictions, as well as equivalent public domain materials for NZ, AU, and UK. Tax compliance and regulatory tools are jurisdiction-aware and updated continuously.",
  },
];

/* ── Page ───────────────────────────────────────────────────────────────── */

export default function ContactPage() {
  return (
    <>
      <SchemaMarkup schema={schema} />

      {/* ── Hero ── */}
      <section
        className="bg-navy-500 pt-32 pb-20 sm:pt-40 sm:pb-28"
        aria-label="Contact hero"
      >
        <Container className="text-center">
          <h1 className="font-serif text-hero text-white">Get in touch.</h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-navy-200">
            Questions about the platform, pricing, security, or partnership
            opportunities? We&rsquo;d love to hear from you. Every message is
            answered within 24&nbsp;hours.
          </p>
        </Container>
      </section>

      {/* ── Form + Contact Details ── */}
      <section className="py-24 sm:py-36" aria-label="Contact form and details">
        <Container>
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
            {/* Left column — form */}
            <div>
              <Reveal>
                <p className="text-xs font-medium uppercase tracking-widest text-forest-600">
                  Send a message
                </p>
                <h2 className="mt-4 font-serif text-display text-navy-800">
                  Start a conversation.
                </h2>
                <p className="mt-4 text-lg text-navy-400">
                  Whether you have questions about legal practice management,
                  accounting automation, AI research, or want to explore a
                  partnership &mdash; we are here to help.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <ContactForm />
              </Reveal>
            </div>

            {/* Right column — contact details */}
            <div>
              <Reveal delay={0.05}>
                <p className="text-xs font-medium uppercase tracking-widest text-forest-600">
                  Contact details
                </p>
                <h2 className="mt-4 font-serif text-display text-navy-800">
                  Reach us directly.
                </h2>
              </Reveal>

              {/* General email */}
              <Reveal delay={0.1}>
                <div className="mt-10 rounded-xl border border-navy-100 bg-white p-6 shadow-card">
                  <h3 className="font-serif text-headline text-navy-700">
                    General enquiries
                  </h3>
                  <a
                    href="mailto:hello@marcoreid.com"
                    className="mt-3 inline-block text-lg font-medium text-forest-600 transition-colors hover:text-forest-700"
                  >
                    hello@marcoreid.com
                  </a>
                  <p className="mt-3 text-sm leading-relaxed text-navy-400">
                    Sales, pricing, demos, partnerships, and everything else. If
                    you are not sure who to contact, start here.
                  </p>
                </div>
              </Reveal>

              {/* Company details */}
              <Reveal delay={0.15}>
                <div className="mt-4 rounded-xl border border-navy-100 bg-white p-6 shadow-card">
                  <h3 className="font-serif text-headline text-navy-700">
                    Company
                  </h3>
                  <dl className="mt-3 space-y-3 text-sm">
                    <div>
                      <dt className="font-medium text-navy-600">
                        Registered entity
                      </dt>
                      <dd className="text-navy-400">Reid &amp; Associates Ltd</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-navy-600">Location</dt>
                      <dd className="text-navy-400">Auckland, New Zealand</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-navy-600">Markets</dt>
                      <dd className="text-navy-400">
                        NZ, AU, US, UK, CA, EU
                      </dd>
                    </div>
                  </dl>
                </div>
              </Reveal>

              {/* Response guarantee */}
              <Reveal delay={0.2}>
                <div className="mt-4 rounded-xl border border-forest-200 bg-forest-50 p-6">
                  <h3 className="font-serif text-headline text-forest-700">
                    Response guarantee
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-forest-600">
                    Every message answered within 24 hours. Most are answered
                    within a few hours during New Zealand business hours
                    (NZST). We do not use automated replies &mdash; a real
                    person reads and responds to every enquiry.
                  </p>
                </div>
              </Reveal>

              {/* Quick links */}
              <Reveal delay={0.25}>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href="mailto:support@marcoreid.com"
                    className="inline-flex min-h-touch items-center rounded-lg border border-navy-200 bg-white px-4 py-2.5 text-sm font-medium text-navy-600 transition-all hover:border-navy-300 hover:shadow-sm"
                  >
                    support@marcoreid.com
                  </a>
                  <a
                    href="mailto:security@marcoreid.com"
                    className="inline-flex min-h-touch items-center rounded-lg border border-navy-200 bg-white px-4 py-2.5 text-sm font-medium text-navy-600 transition-all hover:border-navy-300 hover:shadow-sm"
                  >
                    security@marcoreid.com
                  </a>
                  <a
                    href="mailto:privacy@marcoreid.com"
                    className="inline-flex min-h-touch items-center rounded-lg border border-navy-200 bg-white px-4 py-2.5 text-sm font-medium text-navy-600 transition-all hover:border-navy-300 hover:shadow-sm"
                  >
                    privacy@marcoreid.com
                  </a>
                  <a
                    href="mailto:legal@marcoreid.com"
                    className="inline-flex min-h-touch items-center rounded-lg border border-navy-200 bg-white px-4 py-2.5 text-sm font-medium text-navy-600 transition-all hover:border-navy-300 hover:shadow-sm"
                  >
                    legal@marcoreid.com
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        <div className="h-px bg-navy-100" />
      </div>

      {/* ── Department Cards ── */}
      <section
        className="py-24 sm:py-36"
        aria-label="Department contacts"
      >
        <Container>
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-widest text-forest-600">
              Departments
            </p>
            <h2 className="mt-4 font-serif text-display text-navy-800">
              Talk to the right team.
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-navy-400">
              Know exactly what you need? Reach the right department directly.
              Every address below is monitored by a dedicated team member.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {departments.map((dept, i) => (
              <Reveal
                key={dept.name}
                delay={0.05 * i}
              >
                <div className="flex h-full flex-col rounded-xl border border-navy-100 bg-white p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5">
                  <h3 className="font-serif text-xl text-navy-700">
                    {dept.name}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-navy-400">
                    {dept.description}
                  </p>
                  <a
                    href={`mailto:${dept.email}`}
                    className="mt-4 inline-block text-sm font-semibold text-forest-600 transition-colors hover:text-forest-700"
                  >
                    {dept.email} &rarr;
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        <div className="h-px bg-navy-100" />
      </div>

      {/* ── FAQ ── */}
      <section className="py-24 sm:py-36" aria-label="Frequently asked questions">
        <Container>
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-widest text-forest-600">
              Frequently asked questions
            </p>
            <h2 className="mt-4 font-serif text-display text-navy-800">
              Common questions, straight answers.
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-navy-400">
              Can&rsquo;t find the answer you need? Send us a message above and
              we will get back to you within 24&nbsp;hours.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-6 lg:grid-cols-2">
            {faqs.map((faq, i) => (
              <Reveal key={faq.question} delay={0.05 * i}>
                <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card h-full">
                  <h3 className="font-serif text-xl text-navy-700">
                    {faq.question}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-navy-400">
                    {faq.answer}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Footer CTA ── */}
      <section
        className="bg-navy-500 py-24 sm:py-36"
        aria-label="Get started"
      >
        <Container className="text-center">
          <Reveal>
            <h2 className="font-serif text-display text-white">
              Ready to see what Marco Reid can do?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-xl text-navy-200">
              One platform. Every tool your firm needs. AI-powered legal and
              accounting intelligence built for professionals who refuse to
              settle.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button href="/pricing" size="lg" variant="secondary">
                View pricing
              </Button>
              <Button
                href="/about"
                size="lg"
                variant="ghost"
                className="text-white hover:text-navy-200"
              >
                Learn about us &rarr;
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
