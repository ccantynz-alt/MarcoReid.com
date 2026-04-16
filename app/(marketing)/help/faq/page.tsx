import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/app/components/shared/Container";
import Reveal from "@/app/components/effects/Reveal";

export const metadata: Metadata = {
  title: "FAQ \u2014 Help centre",
  description:
    "Common questions about Marco Reid: what the platform is, how security works, how AI accuracy is handled, billing, integrations, and support.",
};

type Faq = { q: string; a: string };
type Group = { heading: string; intro: string; items: Faq[] };

const groups: Group[] = [
  {
    heading: "About Marco Reid",
    intro:
      "The basics \u2014 what Marco Reid is, who it is for, and how it fits into a professional practice.",
    items: [
      {
        q: "What is Marco Reid?",
        a: "Marco Reid is a practice-management platform for attorneys and accountants. It combines an AI research assistant (Marco), matter and client management, trust accounting, document handling, voice dictation, and billing into a single workspace.",
      },
      {
        q: "Who is it built for?",
        a: "Solo practitioners, small firms, and mid-sized professional firms in the US, UK, Australia, and New Zealand. Each firm is assigned a data region at sign-up; data never leaves that region.",
      },
      {
        q: "How is Marco different from generic AI tools?",
        a: "Marco verifies every citation against primary sources before returning a result, routes queries by jurisdiction, and integrates with the rest of your practice \u2014 matters, documents, trust accounts. Generic AI tools do none of that.",
      },
      {
        q: "Do you replace my existing software?",
        a: "For most solo and small firms, yes. Marco Reid replaces the practice-management tool, the research subscription, and the dictation tool. Many firms also retire a separate time-tracking tool. Larger firms often keep specialised document-review or e-discovery tools alongside Marco Reid.",
      },
      {
        q: "Can I try Marco Reid before I pay?",
        a: "Yes. Every new firm starts on a 14-day trial of the full Firm tier with no card required. Nothing is downgraded when the trial ends \u2014 the workspace becomes read-only until you choose a plan.",
      },
    ],
  },
  {
    heading: "Security & privacy",
    intro:
      "Attorney-client privilege and client financial confidentiality are not features, they are the baseline. Here is how we protect them.",
    items: [
      {
        q: "Where is my data stored?",
        a: "In the region you select at sign-up: Virginia (US), Sydney (Australia and NZ), London (UK), or Frankfurt (EU). Data never leaves that region. A US attorney\u2019s data never touches the Sydney server, and vice versa.",
      },
      {
        q: "Is my data encrypted?",
        a: "Yes, in transit (TLS 1.3) and at rest (AES-256). Passwords are hashed with bcrypt. We use FIPS 140-3 validated cryptographic modules, the standard required by US federal courts for electronic evidence.",
      },
      {
        q: "Can Marco Reid employees read my client data?",
        a: "No member of our team can access matter contents, document bodies, or query content without a documented, audited customer-authorised support case. We are moving to a zero-knowledge architecture where even that access is impossible.",
      },
      {
        q: "Do you train AI models on my data?",
        a: "No. We never train foundation models on your firm\u2019s data. Marco improves through anonymised, opt-in signals about citation verification \u2014 which citations you kept, which you rejected \u2014 not through learning the substance of your work.",
      },
      {
        q: "What certifications do you hold?",
        a: "SOC 2 Type II is in progress (six-month observed audit). GDPR, NZ Privacy Act 2020, UK GDPR, Australian Privacy Act, and CCPA compliance is built in. WCAG 2.1 AA accessibility is standard across the platform.",
      },
    ],
  },
  {
    heading: "AI and accuracy",
    intro:
      "AI is powerful and AI is fallible. Marco is built so you can tell the difference.",
    items: [
      {
        q: "Does Marco give legal or financial advice?",
        a: "No. Marco is a research assistant. It surfaces authority, drafts analysis, and verifies citations, but professional judgement and client advice remain yours. Output is labelled accordingly.",
      },
      {
        q: "How do you prevent hallucinated citations?",
        a: "Every citation is verified against a primary source before it appears in a response. VERIFIED citations were found and matched. UNVERIFIED citations failed verification and are flagged. NOT_FOUND citations are excluded from the drafted analysis entirely.",
      },
      {
        q: "Which AI models do you use?",
        a: "We use Anthropic\u2019s Claude family as the foundation model, selected for its strong performance on legal and financial reasoning and its refusal to fabricate citations under pressure. Our citation verification layer sits on top of the model, not inside it.",
      },
      {
        q: "What happens when Marco is wrong?",
        a: "Marco is designed to tell you when confidence is low rather than guess confidently. If you see a wrong answer, report it from the result page \u2014 we review every flagged result and use it to tune routing and verification. We never argue with a user about an incorrect answer.",
      },
      {
        q: "Can I use Marco for jurisdictions outside your primary coverage?",
        a: "You can run queries against any jurisdiction, but verification is strongest where we have the best primary-source coverage: US federal and state, England and Wales, Australian federal and state, and New Zealand. Coverage expands on a published roadmap.",
      },
    ],
  },
  {
    heading: "Billing",
    intro: "Money questions, answered simply.",
    items: [
      {
        q: "How is Marco Reid priced?",
        a: "Per seat, with a small fixed platform fee at the Firm and Scale tiers. Monthly and annual billing are both available; annual is roughly 15% cheaper. Current pricing is on the pricing page.",
      },
      {
        q: "What counts as a seat?",
        a: "Any user with sign-in access to your firm workspace. Read-only external collaborators \u2014 for example, a client reviewing a document \u2014 are free and do not count against your seat total.",
      },
      {
        q: "Do you offer refunds?",
        a: "Full refund within 14 days of initial subscription, no questions. After that, pro-rata refunds for unused time when the cancellation is driven by a material platform issue we can\u2019t resolve. Full terms on the refund policy page.",
      },
      {
        q: "Can I pay by invoice rather than card?",
        a: "Yes for annual subscriptions at the Scale tier. Contact billing@marcoreid.com with your firm details and preferred payment terms.",
      },
    ],
  },
  {
    heading: "Integrations",
    intro:
      "Marco Reid aims to be the workspace, not an island. Here is how it connects.",
    items: [
      {
        q: "Which calendar and email systems do you support?",
        a: "Google Workspace and Microsoft 365 are both supported. Calendar events sync bidirectionally to matters; email threads can be filed to a matter with a single keyboard shortcut.",
      },
      {
        q: "Can I connect my accounting system?",
        a: "Yes. Xero, QuickBooks Online, and MYOB are supported today. Invoices raised in Marco Reid post to the connected accounting system; time entries and disbursements flow the same way. We do not replace your firm\u2019s general ledger.",
      },
      {
        q: "Is there an API?",
        a: "A read-only API is available on the Scale tier. A read-write API is on the roadmap for 2026. Webhooks for major events \u2014 invoice issued, matter opened, reconciliation completed \u2014 are available on the Firm and Scale tiers.",
      },
    ],
  },
  {
    heading: "Support",
    intro: "When things go wrong, or when you just need a hand.",
    items: [
      {
        q: "How do I get help?",
        a: "Email support@marcoreid.com from the account on file. Average first response is under four hours during business days in your region. Scale-tier firms get a named success manager and a dedicated Slack channel.",
      },
      {
        q: "Is there phone support?",
        a: "We prefer email because it creates a record both sides can refer back to. Scheduled video calls are available on request for onboarding, migrations, and major issues on any tier.",
      },
      {
        q: "Do you help with migrating from another system?",
        a: "Yes. Our team runs structured migrations from Clio, MyCase, PracticePanther, Karbon, and a handful of smaller platforms at no charge for annual subscriptions. Custom migrations from bespoke systems are quoted per engagement.",
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <>
      <section className="bg-navy-500 pt-32 pb-20 sm:pt-40 sm:pb-28">
        <Container className="text-center">
          <p className="text-sm font-semibold tracking-wider text-forest-300">
            Help centre &middot; FAQ
          </p>
          <h1 className="mt-6 font-serif text-hero text-white">
            Frequently asked questions.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-xl text-navy-200">
            Answers to the questions we hear most often from firms evaluating
            and running on Marco Reid.
          </p>
        </Container>
      </section>

      <section className="py-24 sm:py-36">
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="space-y-20">
              {groups.map((group, gi) => (
                <Reveal key={group.heading} delay={gi * 0.05}>
                  <div>
                    <h2 className="font-serif text-display text-navy-800">
                      {group.heading}
                    </h2>
                    <p className="mt-4 text-lg text-navy-400">{group.intro}</p>

                    <div className="mt-10 space-y-8">
                      {group.items.map((item) => (
                        <div key={item.q}>
                          <h3 className="font-serif text-xl text-navy-800">
                            {item.q}
                          </h3>
                          <p className="mt-3 text-lg leading-relaxed text-navy-500">
                            {item.a}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.2}>
              <div className="mt-20 rounded-2xl border border-navy-100 bg-navy-50 p-8">
                <p className="font-serif text-xl text-navy-700">
                  Question not covered here?
                </p>
                <p className="mt-2 text-navy-400">
                  Email{" "}
                  <a
                    href="mailto:support@marcoreid.com"
                    className="text-navy-600 underline-offset-4 hover:underline"
                  >
                    support@marcoreid.com
                  </a>
                  {" "}or browse the{" "}
                  <Link
                    href="/help"
                    className="text-navy-600 underline-offset-4 hover:underline"
                  >
                    help centre home
                  </Link>
                  .
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
