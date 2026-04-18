import type { Metadata } from "next";
import Container from "@/app/components/shared/Container";
import Reveal from "@/app/components/effects/Reveal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Marco Reid privacy policy. How we collect, use, protect, and share your data under GDPR, CCPA, and NZ Privacy Act 2020.",
};

const sections = [
  {
    title: "1. Who we are",
    content:
      'Reid & Associates Ltd ("Marco Reid", "we", "us", "our") is the data controller responsible for your personal data. We are a New Zealand company operating the Marco Reid platform globally. For privacy enquiries, contact our Privacy Officer at privacy@marcoreid.com or write to: Privacy Officer, Reid & Associates Ltd, Auckland, New Zealand.',
  },
  {
    title: "2. Information we collect",
    content:
      "We collect and process the following categories of personal data:\n\nAccount Information: Name, email address, firm name, and hashed password (bcrypt) when you register. We never store plaintext passwords.\n\nProfessional Information: Practice area, jurisdiction, and professional credentials where provided.\n\nClient Data: Information you upload about your clients, including names, contact details, matter information, documents, time entries, trust account records, and related data. You are the data controller for your Client Data; we process it on your behalf.\n\nResearch Data: Queries submitted to Marco, including the question, domain, jurisdiction, context, and the AI-generated response. Citations generated and their verification status. User feedback (ratings, comments) on research results.\n\nVoice Data: Audio recordings submitted for transcription via Marco Reid Voice, transcribed text, duration, detected language, and the surface from which dictation was initiated.\n\nPayment Data: Billing information processed by Stripe. We do not store credit card numbers — Stripe handles all payment card data as a PCI DSS Level 1 certified processor.\n\nUsage Data: Pages visited, features used, response times, IP address, browser type, device type, and session duration. Collected to improve platform performance and reliability.\n\nCommunication Data: Emails, support requests, and other communications with us.",
  },
  {
    title: "3. Legal bases for processing (GDPR)",
    content:
      "We process your personal data under the following legal bases:\n\nContract Performance (Article 6(1)(b)): Processing your Account Information and Client Data is necessary to provide the Platform services you have contracted for.\n\nLegitimate Interests (Article 6(1)(f)): Processing Usage Data and Research Data to improve the Platform, maintain security, and develop our flywheel learning system. Our legitimate interest is providing and improving professional tools; we have balanced this against your rights and determined the processing is proportionate.\n\nConsent (Article 6(1)(a)): Where required, we obtain your explicit consent before processing — for example, for marketing communications or processing voice data through third-party services. You may withdraw consent at any time.\n\nLegal Obligation (Article 6(1)(c)): We may process data where necessary to comply with legal obligations, including tax, regulatory, and law enforcement requirements.",
  },
  {
    title: "4. How we use your information",
    content:
      "We use your information to: (a) provide, maintain, and improve the Platform; (b) authenticate your identity and manage your account; (c) deliver AI-powered research results through Marco, including citation verification; (d) process voice dictation and return transcriptions; (e) process billing and subscription management via Stripe; (f) facilitate marketplace transactions between professionals via Stripe Connect; (g) maintain trust account ledger records; (h) improve research accuracy through our flywheel learning system (aggregating query patterns and feedback); (i) communicate platform updates, security alerts, and service notifications; (j) respond to support requests; (k) detect and prevent fraud, abuse, and security incidents; and (l) comply with legal obligations. We never sell your personal data to third parties. We do not use your data for advertising. We do not use Client Data or Voice Data to train third-party AI models.",
  },
  {
    title: "5. Data sharing and third-party services",
    content:
      "We share data with the following categories of service providers, each bound by data processing agreements:\n\nAI Processing: Anthropic (Claude API) — processes research queries to generate AI Output. Query text is sent to Anthropic for processing. Anthropic's data retention policies apply to data in transit.\n\nVoice Processing: OpenAI (Whisper API) — processes audio recordings for transcription. Audio data is transmitted to OpenAI. OpenAI's API data usage policies apply.\n\nPayment Processing: Stripe — processes all payment transactions, subscription billing, and marketplace payments. Stripe is PCI DSS Level 1 certified.\n\nDatabase Hosting: Neon — hosts our PostgreSQL database. All data is encrypted at rest (AES-256) and in transit (TLS 1.3).\n\nCitation Verification: CourtListener, GovInfo, IRS.gov, Cornell LII, NZLII, AustLII, USPTO — public legal and government databases queried to verify citations. Only citation metadata is sent; no personal data is transmitted.\n\nWe do not sell, rent, or trade your personal data. We may disclose data if required by law, court order, or governmental regulation, or if necessary to protect our rights or the safety of our users.",
  },
  {
    title: "6. International data transfers",
    content:
      "Reid & Associates Ltd is based in New Zealand. Your data may be processed in jurisdictions outside your own, including New Zealand, the United States (where Anthropic, OpenAI, Stripe, and Neon operate), and other countries where our service providers maintain infrastructure. For transfers from the EU/EEA/UK, we rely on: (a) adequacy decisions (New Zealand has an EU adequacy decision); (b) Standard Contractual Clauses (SCCs) with service providers in non-adequate jurisdictions; and (c) the service provider's own compliance frameworks (e.g., Stripe's and Anthropic's GDPR compliance programmes). We implement appropriate safeguards to ensure your data receives equivalent protection regardless of where it is processed.",
  },
  {
    title: "7. Data retention",
    content:
      "Account Data: Retained while your account is active and for 30 days after termination to allow data export. After 30 days, permanently deleted.\n\nClient Data: Retained while your account is active. Permanently deleted within 30 days of account termination, except where retention is required by law.\n\nResearch Data (Queries and Citations): Retained to improve research accuracy through our flywheel learning system. After account termination, research data is anonymised (stripped of user identifiers) and retained in aggregate form only.\n\nVoice Data: Audio files are not permanently stored after transcription. Transcribed text is retained as part of your account data and deleted upon account termination.\n\nPayment Records: Retained for 7 years as required by New Zealand tax law and applicable financial regulations.\n\nUsage Data: Retained in aggregate, anonymised form indefinitely for platform improvement. Personally identifiable usage data is deleted within 90 days.\n\nYou may request earlier deletion of your data at any time (see Section 8).",
  },
  {
    title: "8. Your rights",
    content:
      "Depending on your jurisdiction, you have some or all of the following rights:\n\nRight of Access: Request a copy of all personal data we hold about you.\n\nRight to Rectification: Request correction of inaccurate or incomplete data.\n\nRight to Erasure (\"Right to be Forgotten\"): Request deletion of your personal data, subject to legal retention requirements.\n\nRight to Data Portability: Receive your data in a structured, commonly used, machine-readable format (JSON or CSV).\n\nRight to Restrict Processing: Request that we limit how we process your data in certain circumstances.\n\nRight to Object: Object to processing based on legitimate interests, including profiling.\n\nRight to Withdraw Consent: Where processing is based on consent, withdraw it at any time without affecting the lawfulness of prior processing.\n\nRight to Lodge a Complaint: File a complaint with your local data protection authority. For NZ users: the Office of the Privacy Commissioner (privacy.org.nz). For EU users: your local supervisory authority. For UK users: the Information Commissioner's Office (ico.org.uk). For Australian users: the Office of the Australian Information Commissioner (oaic.gov.au).\n\nTo exercise any of these rights, contact privacy@marcoreid.com. We will respond within 30 days (or sooner where required by law). We may verify your identity before processing requests.",
  },
  {
    title: "9. California residents (CCPA/CPRA)",
    content:
      "If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA) as amended by the CPRA:\n\nRight to Know: You may request the categories and specific pieces of personal information we have collected, the sources, the business purpose, and the categories of third parties with whom we share it.\n\nRight to Delete: You may request deletion of your personal information, subject to certain exceptions.\n\nRight to Opt-Out of Sale: We do not sell your personal information. We do not share your personal information for cross-context behavioural advertising.\n\nRight to Non-Discrimination: We will not discriminate against you for exercising your CCPA rights.\n\nFor the purposes of the CCPA, the categories of personal information we collect include: identifiers (name, email), professional information, commercial information (subscription data), internet activity (usage data), and inferences (research patterns). We collect this information for the business purposes described in Section 4. To submit a CCPA request, contact privacy@marcoreid.com with the subject line \"CCPA Request\".",
  },
  {
    title: "10. New Zealand Privacy Act 2020",
    content:
      "As a New Zealand company, we comply with the Privacy Act 2020 and the Information Privacy Principles (IPPs). You have the right to: (a) access your personal information (IPP 6); (b) request correction of your personal information (IPP 7); and (c) complain to the Privacy Commissioner if you believe we have breached the Privacy Act. We collect personal information directly from you (IPP 2), for lawful purposes connected to our functions (IPP 1), by lawful and fair means (IPP 4). We take reasonable steps to ensure data quality (IPP 8) and security (IPP 5). We do not use your information for purposes other than those for which it was collected without your consent (IPP 10), and we do not disclose it except as described in this policy (IPP 11).",
  },
  {
    title: "11. Data security",
    content:
      "We implement comprehensive security measures to protect your data:\n\nEncryption: All data is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption.\n\nAuthentication: Passwords are hashed using bcrypt with a cost factor of 12. We support multi-factor authentication.\n\nAccess Controls: Role-based access controls ensure data is accessible only to authorised personnel and systems.\n\nInfrastructure: Hosted on SOC 2 compliant infrastructure with regular security assessments.\n\nAudit Logging: Comprehensive, immutable audit trails track all data access and modifications.\n\nBreach Notification: In the event of a data breach affecting your personal data, we will notify you and the relevant supervisory authority within 72 hours as required by GDPR, or as soon as practicable under other applicable laws, including a description of the breach, likely consequences, and measures taken.",
  },
  {
    title: "12. Cookies and tracking",
    content:
      "We use essential cookies only:\n\nAuthentication Cookies: Maintain your login session. Strictly necessary for the Platform to function. Cannot be disabled.\n\nSession Cookies: Temporary cookies that expire when you close your browser.\n\nWe do not use: advertising cookies, tracking cookies, third-party analytics cookies, social media cookies, or any cookie-based cross-site tracking. Because we use only strictly necessary cookies, consent is not required under GDPR Article 5(3) of the ePrivacy Directive. However, our cookie banner informs you of this practice for transparency.",
  },
  {
    title: "13. Children's privacy",
    content:
      "The Platform is designed for professional use by adults. We do not knowingly collect personal data from anyone under the age of 18. If we learn that we have collected personal data from a child under 18, we will delete it promptly. If you believe we have inadvertently collected data from a minor, please contact privacy@marcoreid.com immediately.",
  },
  {
    title: "14. Automated decision-making",
    content:
      "The Platform uses automated processing in the following ways: (a) Marco research engine uses AI to generate research results and verify citations — this is an assistive tool and does not make decisions with legal effect on users; (b) domain detection automatically categorises your research queries (legal, accounting, IP, cross-domain) to route them appropriately; and (c) query pattern analysis identifies common research topics in aggregate. None of these involve solely automated decision-making that produces legal effects or similarly significantly affects you within the meaning of GDPR Article 22. All AI Output requires your professional review and judgement before use.",
  },
  {
    title: "15. Changes to this policy",
    content:
      "We may update this Privacy Policy from time to time. Material changes will be communicated to registered users via email at least thirty (30) days before they take effect. The \"Last updated\" date at the top reflects the most recent revision. We encourage you to review this policy periodically. Your continued use of the Platform after changes take effect constitutes acceptance of the updated policy.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <section className="bg-navy-500 pt-32 pb-20 sm:pt-40 sm:pb-28">
        <Container className="text-center">
          <h1 className="font-serif text-hero text-white">Privacy Policy</h1>
          <p className="mx-auto mt-6 max-w-xl text-xl text-navy-200">
            Your data belongs to you. Here is exactly how we protect it.
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
              <p className="mt-6 text-lg text-navy-500">
                Reid &amp; Associates Ltd (&ldquo;Marco Reid&rdquo;,
                &ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is
                committed to protecting the privacy and security of your
                personal data. This Privacy Policy describes how we collect, use,
                store, share, and protect your information when you use the Marco
                Reid platform, and your rights regarding that information.
              </p>
              <p className="mt-4 text-lg text-navy-500">
                This policy applies to all users worldwide and addresses
                requirements under the EU General Data Protection Regulation
                (GDPR), UK GDPR, New Zealand Privacy Act 2020, Australian
                Privacy Act 1988, California Consumer Privacy Act (CCPA/CPRA),
                and other applicable data protection laws.
              </p>
            </Reveal>

            <div className="mt-16 space-y-12">
              {sections.map((section, i) => (
                <Reveal key={section.title} delay={i * 0.05}>
                  <h2 className="font-serif text-headline text-navy-800">
                    {section.title}
                  </h2>
                  <p className="mt-4 text-lg leading-relaxed text-navy-500 whitespace-pre-line">
                    {section.content}
                  </p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.2}>
              <div className="mt-16 rounded-2xl border border-navy-100 bg-navy-50 p-8">
                <p className="font-serif text-xl text-navy-700">
                  Questions about privacy?
                </p>
                <p className="mt-2 text-navy-400">
                  Contact our Privacy Officer at privacy@marcoreid.com or write
                  to Privacy Officer, Reid &amp; Associates Ltd, Auckland, New
                  Zealand.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
