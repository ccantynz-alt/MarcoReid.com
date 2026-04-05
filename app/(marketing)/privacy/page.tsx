import type { Metadata } from "next";
import Container from "@/app/components/shared/Container";
import Reveal from "@/app/components/effects/Reveal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "AlecRae privacy policy. How we collect, use, and protect your data.",
};

const sections = [
  {
    title: "Information we collect",
    content:
      "We collect information you provide directly: name, email address, firm name, and account credentials. When you use The Oracle, we process your queries to deliver research results. We collect usage data such as pages visited, features used, and response times to improve the platform.",
  },
  {
    title: "How we use your information",
    content:
      "We use your information to provide and improve AlecRae services, authenticate your account, deliver research results through The Oracle, process billing, communicate platform updates, and respond to support requests. We never sell your personal data to third parties.",
  },
  {
    title: "Data security",
    content:
      "All data is encrypted in transit (TLS 1.3) and at rest (AES-256). Passwords are hashed with bcrypt. We use role-based access controls and audit logging. Our infrastructure is hosted on SOC 2 compliant providers. We conduct regular security assessments and penetration testing.",
  },
  {
    title: "Data retention",
    content:
      "Account data is retained while your account is active. Oracle query history is retained to improve research accuracy through our flywheel learning system. You may request deletion of your data at any time by contacting us. We will process deletion requests within 30 days.",
  },
  {
    title: "Third-party services",
    content:
      "We use Anthropic (Claude) for AI-powered research in The Oracle. We use Neon for database hosting. We use legal data sources (CourtListener, GovInfo) for citation verification. Each third-party service is bound by data processing agreements that protect your information.",
  },
  {
    title: "Your rights",
    content:
      "You have the right to access, correct, or delete your personal data. You may export your data at any time. You may withdraw consent for data processing. To exercise these rights, contact us at privacy@alecrae.com.",
  },
  {
    title: "Cookies",
    content:
      "We use essential cookies for authentication and session management. We do not use advertising or tracking cookies. No third-party analytics cookies are deployed.",
  },
  {
    title: "Changes to this policy",
    content:
      "We may update this privacy policy from time to time. We will notify registered users of material changes via email at least 30 days before they take effect.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <section className="bg-navy-500 pt-32 pb-20 sm:pt-40 sm:pb-28">
        <Container className="text-center">
          <h1 className="font-serif text-hero text-white">Privacy Policy</h1>
          <p className="mx-auto mt-6 max-w-xl text-xl text-navy-200">
            Your data belongs to you. Here is how we protect it.
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
                AlecRae Limited (&ldquo;AlecRae&rdquo;, &ldquo;we&rdquo;,
                &ldquo;us&rdquo;) is committed to protecting the privacy of our
                users. This policy describes how we collect, use, and safeguard
                your information when you use the AlecRae platform.
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
                  Questions about privacy?
                </p>
                <p className="mt-2 text-navy-400">
                  Contact us at privacy@alecrae.com or write to AlecRae
                  Limited, Auckland, New Zealand.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
