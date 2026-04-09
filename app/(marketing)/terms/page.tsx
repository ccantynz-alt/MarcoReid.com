import type { Metadata } from "next";
import { BRAND, AI_DISCLAIMER } from "@/lib/constants";
import Container from "@/app/components/shared/Container";
import SchemaMarkup from "@/app/components/shared/SchemaMarkup";
import Reveal from "@/app/components/effects/Reveal";

export const metadata: Metadata = {
  title: "Terms of Service — Marco Reid",
  description:
    "Marco Reid terms of service. The agreement governing use of the Marco Reid professional intelligence platform for legal and accounting professionals.",
  keywords: [
    "Marco Reid terms of service",
    "legal software terms",
    "law firm software agreement",
    "SaaS terms legal professionals",
    "IOLTA software terms",
    "AI legal research terms",
  ],
};

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Marco Reid Terms of Service",
  description:
    "Terms of service for the Marco Reid professional intelligence platform.",
  url: `${BRAND.url}/terms`,
};

const sections = [
  {
    id: "acceptance",
    title: "1. Acceptance of terms and eligibility",
    content: [
      "By accessing or using the Marco Reid platform, you agree to be bound by these Terms of Service (\"Terms\"). If you do not agree, do not use the platform.",
      "Marco Reid is designed for legal and accounting professionals. By creating an account, you represent that you are at least 18 years of age and are either a licensed legal professional, a licensed accounting professional, a professional working under the supervision of a licensed professional, or an authorised representative of a firm that employs such professionals.",
      "If you are accepting these Terms on behalf of a firm or organisation, you represent that you have the authority to bind that entity.",
    ],
  },
  {
    id: "service",
    title: "2. Description of service",
    content: [
      "Marco Reid is a professional intelligence platform comprising five integrated products:",
      "Marco Reid Legal: Full-stack legal practice management including case management, billing, trust accounting, court-rules calendaring, document AI, e-signature, legal forms library, and client portal.",
      "Marco Reid Accounting: AI-powered accounting including automated bookkeeping, bank feed integration, tax compliance, receipt scanning, AI spreadsheets, and financial reporting.",
      "Marco Reid Courtroom: Courtroom technology including e-filing, deposition management, evidence presentation, and real-time transcription.",
      "Marco (The Oracle): Cross-domain AI research engine for legal, accounting, and intellectual property research with citation verification against authoritative public domain sources.",
      "Marco Reid Voice: Universal voice dictation input layer with legal and accounting vocabulary in 9 languages, available across the entire platform.",
      "Features vary by subscription tier. Not all features are available in all jurisdictions.",
    ],
  },
  {
    id: "accounts",
    title: "3. Account registration and responsibilities",
    content: [
      "You must provide accurate, complete, and current information when creating your account. You are responsible for maintaining the confidentiality of your account credentials.",
      "You are responsible for all activity that occurs under your account. Notify us immediately at security@marcoreid.com if you suspect unauthorised access.",
      "Firm administrators are responsible for managing user access within their firm and ensuring that access permissions are appropriate for each team member's role.",
      "We reserve the right to suspend or terminate accounts that violate these Terms, contain false registration information, or are used for purposes inconsistent with the platform's intended professional use.",
    ],
  },
  {
    id: "billing",
    title: "4. Subscription plans, billing, and payments",
    content: [
      "Marco Reid offers tiered subscription plans. Current pricing is published at marcoreid.com/pricing and may change with 30 days' written notice to existing subscribers.",
      "Subscriptions are billed in advance on a monthly or annual basis through Stripe. You authorise Stripe to charge your payment method on file for recurring subscription fees.",
      "Annual subscriptions receive a discount and are billed as a single annual payment. Monthly subscriptions may be cancelled at any time effective at the end of the current billing period.",
      "We do not issue refunds for partial billing periods. New subscribers may request a full refund within 14 days of their initial subscription if they are unsatisfied with the platform.",
      "Overdue payments may result in suspension of access. Accounts suspended for non-payment for more than 30 days may be terminated, with data available for export for an additional 30 days.",
    ],
  },
  {
    id: "ai-disclaimer",
    title: "5. AI research disclaimer",
    content: [
      AI_DISCLAIMER,
      "Marco's citation verification system checks citations against authoritative public domain sources including CourtListener, GovInfo, Congress.gov, Cornell LII, IRS.gov, and equivalent international sources. Citations carry a verification badge:",
      "\u2713 VERIFIED: Citation confirmed in authoritative source with direct link provided.",
      "\u26A0 UNVERIFIED: Citation could not be confirmed. Do not rely on this citation without independent verification.",
      "\u2717 NOT FOUND: Citation does not appear to exist. Do not use.",
      "Unverified citations are never auto-inserted into documents. Only verified citations may be inserted, and even then, the professional responsibility for verifying citations rests with the attorney of record.",
      "Marco Reid is a tool for professionals. It does not replace professional judgment, create any professional-client relationship, or provide advice of any kind.",
    ],
  },
  {
    id: "trust",
    title: "6. Trust accounting and IOLTA compliance",
    content: [
      "Marco Reid's trust accounting module is designed to assist attorneys with IOLTA (Interest on Lawyers' Trust Accounts) compliance. Trust accounting features are built to the strictest state bar requirements.",
      "You acknowledge that trust accounting is governed by your state bar's specific rules and that compliance is ultimately your responsibility as the attorney of record.",
      "Marco Reid provides three-way reconciliation, transaction logging, and audit trails to support compliance. These tools assist with — but do not guarantee — compliance with your jurisdiction's trust accounting requirements.",
      "Before using trust accounting features, you should verify that Marco Reid's implementation meets the specific requirements of your state bar. Contact legal@marcoreid.com for jurisdiction-specific compliance documentation.",
    ],
  },
  {
    id: "voice",
    title: "7. Voice dictation data handling",
    content: [
      "Marco Reid Voice processes audio through the OpenAI Whisper API for transcription. Audio is transmitted securely (TLS 1.3) and is not retained by OpenAI after processing.",
      "Transcription text is stored in your account and subject to the same data protections as all other platform data. Voice data is never used to train AI models.",
      "Marco Reid Voice supports 9 languages. Accuracy may vary by language, accent, audio quality, and domain-specific terminology. Always review transcriptions before use in professional documents.",
    ],
  },
  {
    id: "ip",
    title: "8. Intellectual property",
    content: [
      "The Marco Reid platform — including its code, design, features, documentation, brand identity, and AI systems — is the intellectual property of Reid & Associates Ltd and is protected under New Zealand, US, and international intellectual property law.",
      "Your content belongs to you. Documents, case notes, client data, billing records, and other content you create within the platform remain your property. By using the platform, you grant us a limited, non-exclusive licence to process your content solely to provide the service.",
      "Marco research results are generated from public domain sources. You may use verified research results in your professional work. Citation verification badges and the presentation format are proprietary to Marco Reid.",
      "You may not copy, reverse-engineer, decompile, or create derivative works of the Marco Reid platform or any component thereof.",
    ],
  },
  {
    id: "acceptable-use",
    title: "9. Acceptable use policy",
    content: [
      "You agree not to use Marco Reid to: violate any law, regulation, or professional ethics rule; infringe on intellectual property rights; transmit malware, viruses, or harmful code; attempt to gain unauthorised access to our systems or other users' data; use the platform to harass, defame, or threaten any person; scrape, crawl, or automatically extract data from the platform; resell, sublicence, or redistribute platform access without authorisation; or use AI-generated content in a manner that misrepresents it as human-authored professional advice.",
      "Violations of this policy may result in immediate suspension or termination of your account.",
    ],
  },
  {
    id: "data",
    title: "10. Data processing and privacy",
    content: [
      "Your use of Marco Reid is subject to our Privacy Policy available at marcoreid.com/privacy. The Privacy Policy describes how we collect, use, store, and protect your data, including attorney-client privileged information.",
      "By using the platform, you consent to the data processing described in our Privacy Policy. For EU/UK users, the legal bases for processing are detailed in the Privacy Policy.",
      "We will execute a Data Processing Agreement (DPA) upon request for firms that require one for regulatory compliance.",
    ],
  },
  {
    id: "third-party",
    title: "11. Third-party integrations and services",
    content: [
      "Marco Reid integrates with third-party services including Stripe (payments), Anthropic Claude API (AI research), OpenAI Whisper (voice transcription), Plaid (bank feeds), and calendar services (Google Calendar, Outlook).",
      "Your use of these integrations is subject to the respective third party's terms of service and privacy policy. Marco Reid is not responsible for the availability, accuracy, or security of third-party services beyond our contractual obligations with them.",
      "We select third-party processors based on security standards, compliance certifications, and data processing agreements.",
    ],
  },
  {
    id: "liability",
    title: "12. Limitation of liability",
    content: [
      "To the maximum extent permitted by applicable law, Marco Reid, its officers, directors, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation loss of profits, data, business opportunities, or goodwill, arising from your use of or inability to use the platform.",
      "Our total aggregate liability for all claims arising from or related to these Terms or the platform shall not exceed the total amount you paid to Marco Reid in the 12 months immediately preceding the event giving rise to the claim.",
      "Nothing in these Terms excludes or limits liability for death or personal injury caused by negligence, fraud or fraudulent misrepresentation, or any other liability that cannot be excluded or limited under applicable law.",
      "Nothing in these Terms limits your rights under the New Zealand Consumer Guarantees Act 1993 or equivalent consumer protection legislation in your jurisdiction.",
    ],
  },
  {
    id: "indemnification",
    title: "13. Indemnification",
    content: [
      "You agree to indemnify and hold harmless Reid & Associates Ltd, its officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses (including reasonable legal fees) arising from: your use of the platform; your violation of these Terms; your violation of any law or regulation; your violation of any third party's rights; or content you create, upload, or share through the platform.",
    ],
  },
  {
    id: "disputes",
    title: "14. Dispute resolution",
    content: [
      "We encourage you to contact us at legal@marcoreid.com to resolve any disputes informally before initiating formal proceedings.",
      "If informal resolution is unsuccessful, the parties agree to attempt mediation administered by the New Zealand Dispute Resolution Centre before pursuing litigation.",
      "If mediation is unsuccessful, disputes shall be resolved in the courts of Auckland, New Zealand, and you consent to the exclusive jurisdiction of those courts.",
      "Notwithstanding the foregoing, either party may seek injunctive relief in any court of competent jurisdiction to protect intellectual property rights or prevent irreparable harm.",
    ],
  },
  {
    id: "governing-law",
    title: "15. Governing law",
    content: [
      "These Terms are governed by and construed in accordance with the laws of New Zealand, without regard to conflict of law principles.",
      "For users in the European Union, nothing in these Terms affects your rights under mandatory consumer protection laws in your country of residence.",
      "For users in the United States, these Terms are subject to applicable federal and state law, including but not limited to state bar rules governing attorney conduct and trust accounting.",
    ],
  },
  {
    id: "modifications",
    title: "16. Modifications to these terms",
    content: [
      "We may update these Terms from time to time. Material changes will be communicated to registered users via email at least 30 days before they take effect.",
      "Continued use of the platform after the effective date constitutes acceptance of the updated Terms. If you do not agree to updated Terms, you may terminate your account and export your data.",
      "The date of the most recent revision is displayed at the top of this page.",
    ],
  },
  {
    id: "termination",
    title: "17. Termination",
    content: [
      "You may terminate your account at any time through your account settings or by contacting support@marcoreid.com.",
      "Upon termination, you have 30 days to export all your data in standard formats (JSON, CSV, PDF). After 30 days, your data will be permanently deleted.",
      "Trust accounting records may be retained for the minimum period required by applicable state bar rules and tax regulations, even after account termination.",
      "We may terminate or suspend your account immediately for material breach of these Terms, including violation of the acceptable use policy, non-payment, or fraudulent activity.",
      "Termination does not affect any rights or obligations that accrued prior to termination, including payment obligations for services already rendered.",
    ],
  },
  {
    id: "general",
    title: "18. Severability and entire agreement",
    content: [
      "If any provision of these Terms is held to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.",
      "These Terms, together with the Privacy Policy and any DPA executed between you and Marco Reid, constitute the entire agreement between you and Reid & Associates Ltd regarding use of the platform.",
      "Our failure to enforce any right or provision of these Terms shall not constitute a waiver of such right or provision.",
      "These Terms may not be assigned or transferred by you without our written consent. We may assign these Terms in connection with a merger, acquisition, or sale of assets.",
    ],
  },
  {
    id: "contact",
    title: "19. Contact",
    content: [
      "Legal inquiries: legal@marcoreid.com",
      "Privacy inquiries: privacy@marcoreid.com",
      "Support: support@marcoreid.com",
      "Postal address: Reid & Associates Ltd, Auckland, New Zealand.",
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <SchemaMarkup schema={schema} />

      <section className="bg-navy-500 pt-32 pb-20 sm:pt-40 sm:pb-28">
        <Container className="text-center">
          <p className="text-sm font-semibold tracking-wider text-forest-300 uppercase">
            Terms of Service
          </p>
          <h1 className="mt-6 font-serif text-hero text-white">
            The agreement between us.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-xl text-navy-200">
            Clear terms for a platform that handles your most sensitive
            professional data.
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
                These Terms of Service (&ldquo;Terms&rdquo;) govern your use
                of the Marco Reid platform operated by Reid &amp; Associates
                Ltd, a New Zealand company. By using the platform, you agree
                to these Terms in full.
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
                  Questions about these terms?
                </p>
                <p className="mt-2 text-navy-400">
                  Contact us at legal@marcoreid.com or write to Reid &amp;
                  Associates Ltd, Auckland, New Zealand. We respond to every
                  inquiry.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
