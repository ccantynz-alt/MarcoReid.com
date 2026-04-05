import type { Metadata } from "next";
import Container from "@/app/components/shared/Container";
import Reveal from "@/app/components/effects/Reveal";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "AlecRae terms of service. The agreement between you and AlecRae.",
};

const sections = [
  {
    title: "Acceptance of terms",
    content:
      "By accessing or using the AlecRae platform, you agree to be bound by these Terms of Service. If you do not agree to these terms, do not use the platform. These terms apply to all users, including registered account holders and visitors.",
  },
  {
    title: "Description of service",
    content:
      "AlecRae provides AI-powered practice management tools for legal and accounting professionals, including case management, billing, document management, voice dictation, and The Oracle research engine. Features may vary by subscription tier.",
  },
  {
    title: "Account responsibilities",
    content:
      "You are responsible for maintaining the confidentiality of your account credentials and for all activity under your account. You must provide accurate and complete registration information. You must notify us immediately of any unauthorised use of your account.",
  },
  {
    title: "The Oracle \u2014 AI research disclaimer",
    content:
      "The Oracle is an AI-powered research tool. While we verify citations and strive for accuracy, AI-generated content may contain errors. The Oracle does not constitute legal or financial advice. You are responsible for independently verifying all research results, citations, and legal references before relying on them in professional practice.",
  },
  {
    title: "Acceptable use",
    content:
      "You agree not to use AlecRae to violate any law or regulation, infringe on intellectual property rights, transmit malware or harmful code, attempt to gain unauthorised access to our systems, or use the platform in any manner that could damage, disable, or impair its operation.",
  },
  {
    title: "Intellectual property",
    content:
      "The AlecRae platform, including its design, code, features, and documentation, is the property of AlecRae Limited. Your content remains yours. By using the platform, you grant us a limited licence to process your data solely to provide the service.",
  },
  {
    title: "Payment and billing",
    content:
      "Paid subscriptions are billed in advance on a monthly or annual basis. Prices are listed on our pricing page and may change with 30 days notice. Refunds are available within 14 days of initial subscription. Trust account features are subject to IOLTA compliance requirements.",
  },
  {
    title: "Limitation of liability",
    content:
      "To the maximum extent permitted by law, AlecRae shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or business opportunities. Our total liability shall not exceed the amount you paid in the 12 months preceding the claim.",
  },
  {
    title: "Termination",
    content:
      "Either party may terminate this agreement at any time. Upon termination, you may export your data within 30 days. After 30 days, your data will be permanently deleted. We reserve the right to suspend or terminate accounts that violate these terms.",
  },
  {
    title: "Governing law",
    content:
      "These terms are governed by the laws of New Zealand. Any disputes shall be resolved in the courts of Auckland, New Zealand. Nothing in these terms limits your rights under the New Zealand Consumer Guarantees Act 1993.",
  },
  {
    title: "Changes to terms",
    content:
      "We may update these terms from time to time. Material changes will be communicated via email to registered users at least 30 days before they take effect. Continued use of the platform constitutes acceptance of updated terms.",
  },
];

export default function TermsPage() {
  return (
    <>
      <section className="bg-navy-500 pt-32 pb-20 sm:pt-40 sm:pb-28">
        <Container className="text-center">
          <h1 className="font-serif text-hero text-white">
            Terms of Service
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-xl text-navy-200">
            The agreement between you and AlecRae.
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
                These Terms of Service (&ldquo;Terms&rdquo;) govern your use of
                the AlecRae platform operated by AlecRae Limited, a New Zealand
                company.
              </p>
            </Reveal>

            <div className="mt-16 space-y-12">
              {sections.map((section, i) => (
                <Reveal key={section.title} delay={i * 0.05}>
                  <h2 className="font-serif text-headline text-navy-800">
                    {section.title}
                  </h2>
                  <p className="mt-4 text-lg leading-relaxed text-navy-500">
                    {section.content}
                  </p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.2}>
              <div className="mt-16 rounded-2xl border border-navy-100 bg-navy-50 p-8">
                <p className="font-serif text-xl text-navy-700">
                  Questions about these terms?
                </p>
                <p className="mt-2 text-navy-400">
                  Contact us at legal@alecrae.com or write to AlecRae Limited,
                  Auckland, New Zealand.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
