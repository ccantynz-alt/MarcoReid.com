import type { Metadata } from "next";
import { BRAND } from "@/lib/constants";
import Container from "@/app/components/shared/Container";
import SchemaMarkup from "@/app/components/shared/SchemaMarkup";
import Reveal from "@/app/components/effects/Reveal";

export const metadata: Metadata = {
  title: "Privacy Policy — How Marco Reid Protects Your Data",
  description:
    "Marco Reid privacy policy. GDPR, NZ Privacy Act 2020, and CCPA compliant. How we collect, use, store, and protect your professional data including attorney-client privileged information.",
  keywords: [
    "Marco Reid privacy policy",
    "legal software privacy",
    "attorney data protection",
    "GDPR compliance legal tech",
    "law firm data privacy",
    "IOLTA data security",
    "attorney-client privilege software",
  ],
};

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Marco Reid Privacy Policy",
  description:
    "Privacy policy for the Marco Reid professional intelligence platform.",
  url: `${BRAND.url}/privacy`,
};

const sections = [
  {
    id: "controller",
    title: "1. Data controller",
    content: [
      "Reid & Associates Ltd (\"Marco Reid\", \"we\", \"us\") is the data controller for information collected through the Marco Reid platform. We are incorporated in New Zealand and operate under the NZ Privacy Act 2020, the EU General Data Protection Regulation (GDPR), and the California Consumer Privacy Act (CCPA).",
      "Data Protection Contact: privacy@marcoreid.com",
      "Registered Address: Reid & Associates Ltd, Auckland, New Zealand.",
    ],
  },
  {
    id: "collect",
    title: "2. Information we collect",
    content: [
      "Account information: Name, email address, firm name, professional licence number, and account credentials. We collect this when you register for an account.",
      "Professional data: Matters, clients, documents, billing records, trust account transactions, time entries, and case notes you create within the platform. This data belongs to you.",
      "AI query data: Questions you submit to Marco, our AI research engine, and the responses generated. Query data is processed to deliver research results and improve citation accuracy.",
      "Voice data: Audio recordings submitted through Marco Reid Voice for transcription. Audio is processed by OpenAI Whisper API and is not retained by OpenAI after processing. Transcriptions are stored in your account.",
      "Billing data: Payment method details are processed and stored by Stripe. We store subscription status, plan information, and transaction history. We never store full card numbers.",
      "Usage data: Pages visited, features used, response times, error logs, and device information. Collected to improve platform performance and diagnose issues.",
      "Communication data: Messages sent through the platform's secure messaging system, support requests, and contact form submissions.",
    ],
  },
  {
    id: "legal-basis",
    title: "3. Legal bases for processing (GDPR Article 6)",
    content: [
      "Contract performance (Article 6(1)(b)): Processing your professional data to deliver the Marco Reid platform services you subscribed to — case management, billing, trust accounting, AI research, and document management.",
      "Legitimate interest (Article 6(1)(f)): Platform security, fraud prevention, service improvement, and analytics. We balance our interests against your rights and freedoms.",
      "Consent (Article 6(1)(a)): Marketing communications, optional analytics, and AI training improvements. You may withdraw consent at any time without affecting prior processing.",
      "Legal obligation (Article 6(1)(c)): Tax record retention, regulatory compliance, and responding to lawful government requests.",
    ],
  },
  {
    id: "use",
    title: "4. How we use your information",
    content: [
      "Service delivery: Providing case management, billing, trust accounting, document management, AI research, voice transcription, and all other platform features.",
      "AI processing: When you query Marco, your question is sent to the Anthropic Claude API for processing. Anthropic does not retain your queries for model training. Responses are verified against public domain legal and accounting sources before display.",
      "Citation verification: Marco's verification system checks citations against CourtListener, GovInfo, IRS.gov, and other authoritative public domain sources. This process does not expose your query content to these sources.",
      "Billing and payments: Processing subscription payments, generating invoices, managing trust account transactions, and marketplace escrow payments through Stripe.",
      "Security and fraud prevention: Monitoring for unauthorised access, detecting anomalous behaviour, and maintaining audit trails required for professional compliance.",
      "Platform improvement: Aggregated, anonymised usage analytics to improve features, performance, and user experience. Individual queries are never used to train AI models without explicit consent.",
      "Communications: Transactional emails (account verification, password reset, billing), platform notifications, and support responses.",
    ],
  },
  {
    id: "privilege",
    title: "5. Attorney-client privilege and professional confidentiality",
    content: [
      "We recognise that legal professionals using Marco Reid handle attorney-client privileged information and that accountants handle confidential financial data. Our architecture is designed to protect these professional obligations.",
      "All attorney-client communications within the platform are end-to-end encrypted. We cannot read the content of privileged messages.",
      "Matter data is isolated by firm. No user can access data belonging to another firm under any circumstances. Role-based access controls enforce this at the database level.",
      "AI queries submitted to Marco are not used to train models, are not shared between firms, and are not accessible to Marco Reid staff except when required for technical support with explicit user authorisation.",
      "Audit trails are immutable and cryptographically signed, providing a legally defensible chain of custody for all platform actions.",
      "We will never voluntarily disclose privileged client data. We will resist overbroad government requests and will notify affected users unless legally prohibited from doing so.",
    ],
  },
  {
    id: "ai-practices",
    title: "6. AI-specific data practices",
    content: [
      "Marco, our AI research engine, processes queries through the Anthropic Claude API. Anthropic's data processing agreement prohibits them from using API inputs or outputs to train models.",
      "Voice transcription is processed through OpenAI's Whisper API. OpenAI does not retain API audio data after processing.",
      "Citation verification queries against public domain sources (CourtListener, GovInfo, IRS.gov) contain only citation identifiers — never your original query text or client information.",
      "Marco's hallucination prevention system verifies every citation before display. Unverified citations are clearly marked and are never auto-inserted into documents.",
      "We do not use your individual queries, documents, or client data to train, fine-tune, or improve any AI model without your explicit, informed, revocable consent.",
    ],
  },
  {
    id: "sharing",
    title: "7. Data sharing and third-party processors",
    content: [
      "We share data only with processors necessary to deliver the service. Every processor is bound by a Data Processing Agreement (DPA) that meets GDPR standards.",
      "Anthropic (Claude API): Processes AI research queries. US-based. DPA executed.",
      "Neon: Database hosting. SOC 2 compliant. DPA executed.",
      "Vercel: Application hosting and static page delivery. SOC 2 compliant. DPA executed.",
      "Stripe: Payment processing, subscription management, and marketplace payments. PCI DSS Level 1 certified. DPA executed.",
      "Mailgun: Transactional email delivery. DPA executed.",
      "We do not sell, rent, or trade your personal data to any third party. We do not share data with advertising networks, data brokers, or social media platforms.",
    ],
  },
  {
    id: "transfers",
    title: "8. International data transfers",
    content: [
      "Marco Reid is headquartered in New Zealand. Some of our processors operate in the United States.",
      "For transfers from the EU/UK to the US, we rely on Standard Contractual Clauses (SCCs) approved by the European Commission, supplemented by additional technical safeguards including encryption in transit and at rest.",
      "For transfers involving New Zealand, we comply with the NZ Privacy Act 2020 Information Privacy Principles (IPPs), which provide protections equivalent to GDPR as recognised by the European Commission's adequacy decision.",
      "US-based customers may request US-only data residency where supported by our infrastructure partners.",
    ],
  },
  {
    id: "retention",
    title: "9. Data retention and deletion",
    content: [
      "Active accounts: Your professional data is retained for as long as your account is active and your subscription is current.",
      "Closed accounts: Upon account closure, you may export all your data. After 30 days, your data is permanently deleted from our systems and backups.",
      "Legal holds: Where we are required by law to retain records (tax compliance, court orders, regulatory investigations), we will retain only the minimum data necessary and delete it when the hold expires.",
      "Billing records: Transaction history is retained for 7 years as required by tax regulations in New Zealand and the United States.",
      "Audit logs: Immutable audit logs are retained for the duration of your subscription plus 12 months, or longer if required by professional compliance obligations.",
      "Voice recordings: Audio files are deleted immediately after transcription. Transcription text is retained as part of your account data.",
    ],
  },
  {
    id: "rights",
    title: "10. Your rights",
    content: [
      "GDPR rights (EU/UK residents): Right of access (Article 15), right to rectification (Article 16), right to erasure (Article 17), right to restriction of processing (Article 18), right to data portability (Article 20), right to object (Article 21), and rights related to automated decision-making (Article 22).",
      "NZ Privacy Act rights: Access to your personal information (IPP 6), correction of your personal information (IPP 7), and the right to complain to the NZ Privacy Commissioner.",
      "CCPA rights (California residents): Right to know what personal information is collected, right to delete personal information, right to opt-out of sale of personal information (we do not sell your data), and right to non-discrimination for exercising your rights.",
      "Data portability: You may export all your data at any time in standard formats (JSON, CSV, PDF) through your account settings.",
      "To exercise any right, contact privacy@marcoreid.com. We respond to all requests within 30 days. No fee is charged for reasonable requests.",
    ],
  },
  {
    id: "cookies",
    title: "11. Cookies and tracking",
    content: [
      "Essential cookies only: We use strictly necessary cookies for authentication, session management, and CSRF protection. These cookies are required for the platform to function.",
      "No advertising cookies: We do not use advertising, retargeting, or social media tracking cookies.",
      "No third-party analytics: We do not deploy Google Analytics, Facebook Pixel, or any third-party tracking scripts.",
      "Platform analytics: We collect anonymised usage data server-side to improve performance. This data cannot be linked to individual users.",
    ],
  },
  {
    id: "children",
    title: "12. Children\u2019s privacy",
    content: [
      "Marco Reid is a professional platform designed exclusively for legal and accounting professionals. We do not knowingly collect information from anyone under 18 years of age. If we discover that a minor has created an account, we will delete it immediately.",
    ],
  },
  {
    id: "security",
    title: "13. Security measures",
    content: [
      "All data encrypted at rest (AES-256) and in transit (TLS 1.3 minimum).",
      "End-to-end encryption for attorney-client communications.",
      "Role-based access controls with firm-level data isolation.",
      "Multi-factor authentication available for all accounts.",
      "Immutable, cryptographically signed audit trails.",
      "Regular penetration testing by independent security firms.",
      "SOC 2 Type II certification in progress.",
      "FIPS 140-3 validated encryption for courtroom module data.",
      "Automated vulnerability scanning via Dependabot and npm audit.",
      "Environment variables never stored in code — always in secure hosting configuration.",
    ],
  },
  {
    id: "breach",
    title: "14. Data breach notification",
    content: [
      "In the event of a data breach that poses a risk to your rights and freedoms, we will notify the relevant supervisory authority within 72 hours as required by GDPR Article 33.",
      "We will notify the New Zealand Privacy Commissioner of serious privacy breaches as required by the NZ Privacy Act 2020.",
      "We will notify affected users promptly and honestly, describing the nature of the breach, the data affected, and the steps we are taking to mitigate harm.",
      "We will never conceal a breach. Concealment creates far greater liability than the breach itself.",
    ],
  },
  {
    id: "changes",
    title: "15. Changes to this policy",
    content: [
      "We may update this privacy policy from time to time to reflect changes in our practices, technology, or legal requirements.",
      "Material changes will be communicated to registered users via email at least 30 days before they take effect.",
      "Continued use of the platform after the effective date constitutes acceptance of the updated policy.",
      "Previous versions of this policy are available upon request.",
    ],
  },
  {
    id: "contact",
    title: "16. Contact us",
    content: [
      "Privacy inquiries: privacy@marcoreid.com",
      "General inquiries: hello@marcoreid.com",
      "Postal address: Reid & Associates Ltd, Auckland, New Zealand.",
      "NZ Privacy Commissioner: privacy.org.nz (if you are unsatisfied with our response to your privacy request).",
      "EU Data Protection Authority: Contact your local supervisory authority if you are an EU/UK resident.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <SchemaMarkup schema={schema} />

      <section className="bg-navy-500 pt-32 pb-20 sm:pt-40 sm:pb-28">
        <Container className="text-center">
          <p className="text-sm font-semibold tracking-wider text-forest-300 uppercase">
            Privacy Policy
          </p>
          <h1 className="mt-6 font-serif text-hero text-white">
            Your data belongs to you.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-xl text-navy-200">
            How Marco Reid collects, uses, and protects your professional
            data &mdash; including attorney-client privileged information.
          </p>
        </Container>
      </section>

      <section className="py-24 sm:py-36">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <p className="text-sm text-navy-400">
                Last updated: April 2026
              </p>
              <p className="mt-6 text-lg leading-relaxed text-navy-500">
                Reid &amp; Associates Ltd (&ldquo;Marco Reid&rdquo;,
                &ldquo;we&rdquo;, &ldquo;us&rdquo;) operates the Marco Reid
                professional intelligence platform. We are committed to
                protecting the privacy and confidentiality of every user,
                with particular regard to the heightened obligations of legal
                and accounting professionals. This policy is built to GDPR
                standards, which automatically satisfies the NZ Privacy Act
                2020, Australian Privacy Act 1988, UK GDPR, and CCPA
                requirements.
              </p>
            </Reveal>

            <nav className="mt-12 rounded-xl border border-navy-100 bg-navy-50 p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
                Contents
              </p>
              <ul className="mt-3 columns-2 gap-x-8 text-sm text-navy-500">
                {sections.map((s) => (
                  <li key={s.id} className="py-1">
                    <a
                      href={`#${s.id}`}
                      className="transition-colors hover:text-forest-600"
                    >
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-16 space-y-16">
              {sections.map((section, i) => (
                <Reveal key={section.id} delay={Math.min(i * 0.03, 0.3)}>
                  <div id={section.id}>
                    <h2 className="font-serif text-headline text-navy-800">
                      {section.title}
                    </h2>
                    <div className="mt-4 space-y-4">
                      {section.content.map((paragraph, j) => (
                        <p
                          key={j}
                          className="text-base leading-relaxed text-navy-500"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.2}>
              <div className="mt-20 rounded-2xl border border-navy-100 bg-navy-50 p-8">
                <p className="font-serif text-xl text-navy-700">
                  Questions about privacy?
                </p>
                <p className="mt-2 text-navy-400">
                  Contact us at privacy@marcoreid.com or write to Reid &amp;
                  Associates Ltd, Auckland, New Zealand. We respond to every
                  privacy inquiry within 30 days.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
