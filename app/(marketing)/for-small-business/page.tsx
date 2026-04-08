import type { Metadata } from "next";
import { BRAND } from "@/lib/constants";
import SchemaMarkup from "@/app/components/shared/SchemaMarkup";
import Reveal from "@/app/components/effects/Reveal";
import Button from "@/app/components/shared/Button";
import AiDisclaimer from "@/app/components/shared/AiDisclaimer";

export const metadata: Metadata = {
  title:
    "Marco Reid for Small Business — Legal and Accounting Help for Growing Companies",
  description:
    "Small business legal help and accounting services powered by AI. Business formation, contract review, tax strategy, compliance, IP protection, and bookkeeping — big-firm expertise without big-firm prices.",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Do I need an LLC or a corporation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The right structure depends on your goals. An LLC offers flexible management, pass-through taxation, and personal liability protection with minimal formality. A corporation (C-Corp or S-Corp) is better suited for businesses planning to raise venture capital, issue stock options, or eventually go public. S-Corps can reduce self-employment tax for profitable small businesses. Most small businesses with fewer than five owners and no plans to seek outside investment start as LLCs. A qualified attorney can analyse your specific situation — including state filing fees, tax implications, and long-term growth plans — to recommend the right entity type.",
      },
    },
    {
      "@type": "Question",
      name: "How much should a small business spend on accounting?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most small businesses spend between $1,000 and $5,000 per year on basic bookkeeping and tax preparation. Businesses with employees, inventory, or multi-state operations typically spend $5,000 to $15,000 annually. The cost depends on transaction volume, complexity of your tax situation, and whether you need monthly financial statements or just annual tax filing. AI-powered accounting tools like Marco Reid Accounting can reduce these costs by automating bank reconciliation, receipt scanning, and routine categorisation — allowing your CPA to focus on strategy rather than data entry.",
      },
    },
    {
      "@type": "Question",
      name: "When do I need a business lawyer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You need a business lawyer at formation (to choose the right entity structure and draft operating agreements), when signing significant contracts (commercial leases, vendor agreements, partnership deals), when hiring employees (employment agreements, non-competes, handbook policies), when facing regulatory compliance questions, when protecting intellectual property (trademarks, patents, trade secrets), and when disputes arise with customers, vendors, or partners. Proactive legal counsel is almost always cheaper than reactive litigation. A $500 contract review can prevent a $50,000 lawsuit.",
      },
    },
    {
      "@type": "Question",
      name: "What tax deductions can small businesses claim?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Common small business deductions include home office expenses (simplified or actual method), vehicle expenses for business use, health insurance premiums for self-employed individuals, retirement plan contributions (SEP-IRA, Solo 401k), business equipment and software (Section 179 expensing), professional development and education, marketing and advertising costs, professional services (legal, accounting, consulting fees), business travel and meals (50% for meals), and the qualified business income deduction (Section 199A) which can reduce taxable income by up to 20%. A CPA can identify deductions specific to your industry and ensure you are not leaving money on the table.",
      },
    },
  ],
};

const needs = [
  {
    title: "Business Formation",
    description:
      "LLC, C-Corp, S-Corp, partnership, sole proprietorship — each structure carries different liability protections, tax consequences, and compliance obligations. The wrong choice can cost thousands in unnecessary taxes or leave your personal assets exposed. Marco Reid professionals analyse your revenue, growth plans, and risk profile to recommend the right entity for your situation.",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M3 21h18" />
        <path d="M5 21V7l7-4 7 4v14" />
        <path d="M9 21v-6h6v6" />
      </svg>
    ),
  },
  {
    title: "Contract Review",
    description:
      "Employment contracts, vendor agreements, commercial leases, partnership deals, customer terms of service — every contract you sign is a binding legal commitment. A single unfavourable clause can cost more than the entire contract is worth. Marco Reid attorneys review contracts with AI-powered analysis that flags risks, missing protections, and non-standard terms.",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
        <path d="M14 2v6h6" />
        <path d="M16 13H8" />
        <path d="M16 17H8" />
        <path d="M10 9H8" />
      </svg>
    ),
  },
  {
    title: "Tax Strategy",
    description:
      "Entity selection for tax optimisation, quarterly estimated payments, Section 199A deductions, retirement plan contributions, home office deductions, vehicle expenses — the tax code rewards businesses that plan ahead and punishes those that do not. Marco Reid accountants use AI that tracks every deduction, credit, and filing deadline relevant to your business.",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
      </svg>
    ),
  },
  {
    title: "Compliance",
    description:
      "State registrations, annual reports, business licence renewals, employment law requirements, industry-specific regulations — miss a filing and you face penalties, lose good standing, or worse. Marco Reid tracks every compliance deadline across every jurisdiction you operate in, so nothing falls through the cracks.",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Intellectual Property",
    description:
      "Your brand name, logo, product designs, proprietary processes, and creative work are assets worth protecting. Trademark registration prevents competitors from using your name. Patents protect inventions. Trade secret policies protect internal knowledge. Marco Reid professionals search USPTO records, file applications, and monitor for infringement — so you own what you build.",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83M16.62 12l-5.74 9.94" />
      </svg>
    ),
  },
  {
    title: "Bookkeeping and Accounting",
    description:
      "Automated bank feeds, AI-powered transaction categorisation, real-time reconciliation, financial statements, and cash flow reporting — without hiring a full-time bookkeeper. Marco Reid Accounting connects to your bank accounts, scans receipts, and keeps your books current so your CPA always has clean data to work with at tax time.",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="2" y="3" width="20" height="18" rx="2" />
        <path d="M2 9h20" />
        <path d="M10 3v18" />
      </svg>
    ),
  },
];

const howWeHelp = [
  {
    title: "Find the Right Professional",
    description:
      "Not every attorney understands small business. Not every CPA specialises in your industry. Marco Reid matches you with professionals who focus on businesses like yours — attorneys who draft operating agreements every week and accountants who optimise tax strategies for your entity type. No cold calls. No guesswork.",
    label: "Matched expertise",
  },
  {
    title: "AI-Powered Efficiency",
    description:
      "Your professionals use Marco Reid tools that make them dramatically faster and more thorough. Legal research that took hours now takes minutes. Bank reconciliation that consumed entire afternoons is automated. That efficiency translates directly to lower bills and better work product for your business.",
    label: "Faster, better, less expensive",
  },
  {
    title: "One Platform for Everything",
    description:
      "Legal, accounting, and tax under one roof. Your attorney and accountant collaborate inside the same platform, sharing the information they need without you playing messenger. Entity formation flows directly into chart of accounts setup. Contract reviews inform tax planning. Everything connected. Nothing lost.",
    label: "Legal + accounting + tax",
  },
];

const stats = [
  {
    figure: "82%",
    context: "of small businesses fail due to cash flow problems",
    solution:
      "Marco Reid Accounting automates financial tracking, reconciliation, and cash flow reporting — so you see problems before they become fatal.",
  },
  {
    figure: "53%",
    context: "of small businesses face a legal dispute in their first five years",
    solution:
      "Marco Reid Legal connects you with attorneys who use AI-powered research and document drafting to resolve issues faster and at lower cost.",
  },
  {
    figure: "40+",
    context: "hours per year spent by small businesses on tax compliance alone",
    solution:
      "Marco Reid automates receipt scanning, categorisation, quarterly estimates, and filing preparation — giving you those hours back.",
  },
];

const faqs = [
  {
    question: "Do I need an LLC or a corporation?",
    answer:
      "It depends on your goals. An LLC is the most popular choice for small businesses because it combines personal liability protection with simple management and pass-through taxation — profits flow to your personal return without corporate-level tax. A corporation makes more sense if you plan to raise outside investment (investors typically require C-Corp structure), want to issue stock options to employees, or if your income is high enough that S-Corp election would save you meaningful self-employment tax. Most small businesses with straightforward operations and no immediate plans for venture capital start as LLCs. Your attorney and accountant should evaluate your specific numbers before you file.",
  },
  {
    question: "How much should a small business spend on accounting?",
    answer:
      "Basic bookkeeping and annual tax preparation for a simple small business typically costs $1,000 to $5,000 per year. If you have employees, inventory, multi-state operations, or complex transactions, expect $5,000 to $15,000 annually. Monthly financial statement preparation adds cost but provides the visibility you need to make informed decisions. AI-powered tools like Marco Reid Accounting can significantly reduce these costs by automating routine work — bank feeds, receipt scanning, categorisation, reconciliation — so your CPA spends their time on strategic advice rather than data entry. The most expensive accounting decision is no accounting at all: businesses that fly blind on their finances are the ones that fail.",
  },
  {
    question: "When do I need a business lawyer?",
    answer:
      "At formation — to choose the right entity structure, draft an operating agreement, and register in the correct jurisdictions. Before signing any significant contract — commercial leases, vendor agreements, partnership deals, franchise agreements. When hiring employees — employment agreements, non-compete clauses, employee handbooks, and compliance with federal and state labour laws. When protecting intellectual property — trademark registration, patent applications, trade secret policies. When a dispute arises — demand letters, mediation, or litigation. And whenever a decision feels risky. A $500 contract review today prevents a $50,000 lawsuit tomorrow. Proactive legal counsel is always cheaper than reactive litigation.",
  },
  {
    question: "What tax deductions can small businesses claim?",
    answer:
      "The most commonly missed deductions include home office expenses (the simplified method allows $5 per square foot up to 300 square feet), vehicle expenses for business use (standard mileage rate or actual expenses), health insurance premiums for self-employed individuals, retirement contributions (SEP-IRA allows up to 25% of net self-employment income), Section 179 equipment expensing (deduct the full cost of qualifying equipment in the year purchased), and the qualified business income deduction under Section 199A (up to 20% of qualified business income for eligible pass-through entities). Other frequently overlooked deductions: professional development, software subscriptions, business insurance, and professional services fees. A CPA who specialises in small business taxation will identify deductions specific to your industry and situation.",
  },
];

export default function ForSmallBusinessPage() {
  return (
    <>
      <SchemaMarkup schema={faqSchema} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-500 pt-32 pb-24 sm:pt-40 sm:pb-32">
        {/* Gradient orbs */}
        <div
          className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-forest-500/20 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-plum-500/20 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-6xl px-6 sm:px-8 lg:px-12 text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-forest-300">
            Marco Reid for Small Business
          </p>
          <h1 className="mt-6 font-serif text-hero text-white">
            Legal and Accounting Intelligence
            <br />
            for Small Business
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-xl leading-relaxed text-navy-200">
            Big-firm expertise without big-firm prices. Marco Reid connects your
            business with attorneys and accountants who use the most advanced AI
            tools ever built — so you get better work, faster turnaround, and
            lower bills.
          </p>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href="/find-a-lawyer" size="lg" variant="secondary">
              Find a Lawyer
            </Button>
            <Button
              href="/find-an-accountant"
              size="lg"
              className="bg-white text-navy-700 hover:bg-navy-50"
            >
              Find an Accountant
            </Button>
          </div>
        </div>
      </section>

      {/* What Small Businesses Need */}
      <section className="py-24 sm:py-36" aria-label="What small businesses need">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
          <Reveal>
            <p className="text-center text-xs font-medium uppercase tracking-widest text-forest-600">
              Built for your business
            </p>
            <h2 className="mt-4 text-center font-serif text-display text-navy-800">
              What Small Businesses Need
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-navy-400">
              Running a business means wearing every hat. Marco Reid
              professionals handle the legal and financial complexity so you can
              focus on what you do best.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {needs.map((need, i) => (
              <Reveal key={need.title} delay={0.05 * (i + 1)}>
                <div className="group h-full rounded-xl border border-navy-100 bg-white p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-navy-50 text-navy-600">
                    {need.icon}
                  </div>
                  <h3 className="mt-5 font-serif text-lg text-navy-700">
                    {need.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy-400">
                    {need.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="h-px bg-navy-100 mx-auto max-w-sm" />

      {/* How Marco Reid Helps */}
      <section
        className="bg-navy-50 py-24 sm:py-36"
        aria-label="How Marco Reid helps your business"
      >
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
          <Reveal>
            <h2 className="text-center font-serif text-display text-navy-800">
              How Marco Reid Helps Your Business
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-navy-400">
              Marco Reid is not a law firm and not an accounting firm. It is the
              platform that makes your law firm and accounting firm dramatically
              more effective.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {howWeHelp.map((item, i) => (
              <Reveal key={item.title} delay={0.1 * (i + 1)}>
                <div className="h-full rounded-xl border border-navy-100 bg-white p-8 shadow-card">
                  <p className="text-xs font-semibold uppercase tracking-widest text-forest-600">
                    {item.label}
                  </p>
                  <h3 className="mt-4 font-serif text-xl text-navy-700">
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

      {/* The Numbers That Matter */}
      <section className="py-24 sm:py-36" aria-label="The numbers that matter">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
          <Reveal>
            <h2 className="text-center font-serif text-display text-navy-800">
              The Numbers That Matter
            </h2>
          </Reveal>

          <div className="mt-16 space-y-6">
            {stats.map((stat, i) => (
              <Reveal key={stat.figure} delay={0.1 * (i + 1)}>
                <div className="rounded-xl border border-navy-100 bg-white p-8 shadow-card sm:flex sm:items-start sm:gap-8">
                  <div className="flex-shrink-0">
                    <p className="font-serif text-5xl font-bold text-forest-600 sm:text-6xl">
                      {stat.figure}
                      {stat.figure !== "40+" && ""}
                    </p>
                  </div>
                  <div className="mt-4 sm:mt-0">
                    <p className="text-lg font-semibold text-navy-700">
                      {stat.context}
                    </p>
                    <p className="mt-2 leading-relaxed text-navy-400">
                      {stat.solution}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="h-px bg-navy-100 mx-auto max-w-sm" />

      {/* Common Questions — FAQ */}
      <section className="py-24 sm:py-36" aria-label="Common questions">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
          <Reveal>
            <h2 className="text-center font-serif text-display text-navy-800">
              Common Questions
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-navy-400">
              Straightforward answers to the questions small business owners ask
              most often.
            </p>
          </Reveal>

          <div className="mx-auto mt-16 max-w-3xl space-y-6">
            {faqs.map((faq, i) => (
              <Reveal key={faq.question} delay={0.05 * (i + 1)}>
                <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card">
                  <h3 className="font-serif text-lg text-navy-700">
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

      {/* AI Disclaimer */}
      <section aria-label="AI disclaimer">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
          <AiDisclaimer />
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 sm:py-36" aria-label="Find your team">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12 text-center">
          <Reveal>
            <h2 className="font-serif text-display text-navy-800">
              Find Your Team
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-navy-400">
              Every small business deserves a great lawyer and a great
              accountant. Marco Reid helps you find both — and gives them the
              tools to serve you better than ever before.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/find-a-lawyer" size="lg">
                Find a Lawyer
              </Button>
              <Button href="/find-an-accountant" variant="secondary" size="lg">
                Find an Accountant
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
