import type { Metadata } from "next";
import { BRAND } from "@/lib/constants";
import SchemaMarkup from "@/app/components/shared/SchemaMarkup";
import Reveal from "@/app/components/effects/Reveal";
import Button from "@/app/components/shared/Button";
import AiDisclaimer from "@/app/components/shared/AiDisclaimer";

export const metadata: Metadata = {
  title:
    "Marco Reid for Startups — Legal and Accounting Intelligence From Day One",
  description:
    "AI-powered startup lawyer and startup accountant services. Entity formation, founder agreements, fundraising legal, tax strategy, IP protection, and automated bookkeeping — from formation to funding.",
  keywords: [
    "startup lawyer",
    "startup accountant",
    "startup legal help",
    "startup formation lawyer",
    "Delaware C-Corp formation",
    "startup tax strategy",
    "SAFE note lawyer",
    "startup bookkeeping",
    "Section 83b election",
    "QSBS tax exclusion",
    "startup IP protection",
    "startup accounting",
    "startup entity formation",
    "R&D tax credit startup",
    "cap table management",
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  url: `${BRAND.url}/for-startups`,
  name: `${BRAND.name} for Startups`,
  mainEntity: [
    {
      "@type": "Question",
      name: "Should my startup be an LLC or a C-Corp?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "If you plan to raise venture capital, a Delaware C-Corp is almost always the right choice. Venture capital funds, accelerators like Y Combinator, and institutional investors are structured to invest in C-Corps — their fund documents, tax treatment, and preferred stock mechanisms all assume C-Corp structure. An LLC can work for bootstrapped businesses or lifestyle companies where pass-through taxation is more advantageous and outside investment is not planned. S-Corps are rarely appropriate for startups because they cannot have more than 100 shareholders, cannot issue preferred stock, and cannot have non-US shareholders. Your attorney should evaluate your specific fundraising plans, co-founder situation, and tax position before you file.",
      },
    },
    {
      "@type": "Question",
      name: "What is a Section 83(b) election?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A Section 83(b) election is a filing with the IRS that lets founders pay income tax on the fair market value of restricted stock at the time it is granted rather than when it vests. For early-stage founders receiving stock at a very low fair market value (often fractions of a cent per share), filing an 83(b) election means paying minimal tax now instead of potentially enormous tax later when the stock is worth substantially more. The election must be filed with the IRS within 30 days of the stock grant — this deadline is absolute and cannot be extended. Missing it can result in hundreds of thousands of dollars in unnecessary tax liability. Every founder receiving restricted stock should discuss the 83(b) election with both their attorney and accountant before the 30-day window closes.",
      },
    },
    {
      "@type": "Question",
      name: "How much equity should I give co-founders?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "There is no universal formula, but the most important principle is that equity splits should reflect each co-founder's expected contribution going forward, not just what has been contributed so far. Common structures include equal splits for co-founders contributing comparable time and expertise, and weighted splits when one founder contributes significantly more capital, domain expertise, or full-time commitment. Regardless of the split, every co-founder arrangement should include a four-year vesting schedule with a one-year cliff — this protects the company if a co-founder leaves early. Without vesting, a co-founder who departs after three months could walk away with a permanent ownership stake. An attorney experienced in startup formation can draft founder agreements that protect everyone involved.",
      },
    },
    {
      "@type": "Question",
      name: "When should a startup hire a lawyer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Before you incorporate. The decisions made at formation — entity type, jurisdiction of incorporation, founder equity structure, IP assignment, vesting schedules — are extraordinarily difficult and expensive to change later. A startup that incorporates as an LLC and later needs to convert to a C-Corp for venture funding faces legal fees, tax consequences, and delays that could have been avoided entirely with proper initial counsel. Beyond formation, you need legal counsel before signing any significant contract, before issuing equity to employees or advisors, before raising any outside capital, and before launching any product that touches regulated industries like finance, healthcare, or consumer data. Proactive legal counsel at the right moments costs a fraction of what reactive legal work costs after problems arise.",
      },
    },
  ],
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Marco Reid for Startups — Legal and Accounting Intelligence From Day One",
  description:
    "AI-powered startup legal and accounting services. Entity formation, founder agreements, fundraising legal, tax strategy, IP protection, and automated bookkeeping.",
  url: `${BRAND.url}/for-startups`,
  provider: {
    "@type": "Organization",
    name: BRAND.name,
    url: BRAND.url,
  },
};

const startupNeeds = [
  {
    title: "Entity Formation",
    description:
      "Delaware C-Corp, LLC, S-Corp — the entity you choose determines your tax obligations, liability exposure, and ability to raise capital. Marco Reid professionals use AI analysis to recommend the optimal structure based on your fundraising plans, co-founder count, and growth trajectory. Formation documents drafted, e-signed, and filed — often within days, not weeks.",
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
    title: "Founder Agreements",
    description:
      "Operating agreements, vesting schedules, IP assignment clauses, non-compete and non-solicitation provisions — every co-founder relationship needs a legal foundation before the company writes its first line of code. Marco Reid attorneys draft agreements that protect everyone at the table and prevent disputes that destroy companies.",
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
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    title: "Fundraising Legal",
    description:
      "SAFE notes, convertible notes, priced rounds, cap table management — raising capital means navigating securities law, investor term sheets, and dilution math simultaneously. Marco Reid attorneys have the AI tools to draft and review fundraising documents with precision, while your accountant models the financial impact of every term.",
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
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
  },
  {
    title: "Tax Strategy",
    description:
      "R&D tax credits, Section 83(b) elections, Qualified Small Business Stock (QSBS) exclusion, state tax nexus planning — the tax decisions you make in year one can save or cost hundreds of thousands of dollars over the life of your company. Marco Reid accountants use AI to identify every credit, deduction, and election available to your startup from day one.",
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
    title: "IP Protection",
    description:
      "Trademark your brand name before a competitor takes it. File provisional patents on your core innovations. Implement trade secret policies that protect proprietary technology. Marco Reid professionals search USPTO records, file applications, draft IP assignment agreements for every contributor, and monitor for infringement — so you own what you build.",
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
    title: "Bookkeeping and Compliance",
    description:
      "Automated bank feeds, AI-powered transaction categorisation, real-time reconciliation, state registration tracking, and annual report deadlines — all handled from day one. Marco Reid Accounting connects to your accounts on incorporation day so your books are clean from the first dollar. No catch-up bookkeeping. No tax-time panic.",
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

const timeline = [
  {
    step: "01",
    title: "Form Your Entity",
    description:
      "AI analyses your fundraising plans, co-founder structure, and growth trajectory to recommend the right entity type and jurisdiction. Formation documents drafted, reviewed by your attorney, e-signed, and filed — with your EIN application submitted the same day.",
  },
  {
    step: "02",
    title: "Protect Your IP",
    description:
      "Trademark search and filing for your brand name. IP assignment agreements for every founder, employee, and contractor. Provisional patent applications for core innovations. Trade secret policies drafted and implemented. Your intellectual property is protected before you write a press release or pitch a single investor.",
  },
  {
    step: "03",
    title: "Set Up Finances",
    description:
      "Bank accounts connected, chart of accounts configured for your industry, automated categorisation active, and tax compliance calendar set — all within the first week. Your CPA sees real-time financial data from day one. Section 83(b) elections filed within the 30-day deadline. R&D credit tracking begins immediately.",
  },
  {
    step: "04",
    title: "Raise Capital",
    description:
      "SAFE notes or convertible note agreements drafted with verified legal research. Cap table modelled with dilution scenarios. Investor data room populated through the secure document vault. Your attorney and accountant collaborate inside the same platform — so term sheet review includes both legal analysis and financial modelling simultaneously.",
  },
];

const differentiators = [
  {
    label: "Intelligence",
    title: "Cross-Domain Intelligence",
    description:
      "Most platforms separate legal and accounting into different tools, different logins, different professionals who never talk to each other. Marco Reid connects both. When you ask about entity formation, the answer includes both the legal structure analysis and the tax implications. When you review a term sheet, your attorney and CPA see the same data. One platform. One brain. Both disciplines.",
  },
  {
    label: "Speed",
    title: "Speed That Matches Yours",
    description:
      "Startups move fast. Traditional law firms do not. Marco Reid attorneys use AI-powered legal research that turns hours of case law review into minutes. Document drafting that used to take days happens in hours. Your startup cannot afford to wait two weeks for a contract review while a deal sits on the table. Marco Reid professionals work at the speed your business demands.",
  },
  {
    label: "Visibility",
    title: "Total Transparency",
    description:
      "Your client portal shows every document, every invoice, every milestone, and every deadline in real time. No calling your attorney's office for status updates. No wondering whether your accountant filed the election on time. Every action is logged, every communication is recorded, and every dollar is accounted for. You see exactly what your professionals see.",
  },
];

const faqs = [
  {
    question: "Should my startup be an LLC or a C-Corp?",
    answer:
      "If you plan to raise venture capital, a Delaware C-Corp is almost always the right choice. Venture capital funds, accelerators like Y Combinator, and institutional investors are structured to invest in C-Corps — their fund documents, tax treatment, and preferred stock mechanisms all assume C-Corp structure. An LLC can work for bootstrapped businesses or lifestyle companies where pass-through taxation is more advantageous and outside investment is not planned. S-Corps are rarely appropriate for startups because they cannot have more than 100 shareholders, cannot issue preferred stock, and cannot have non-US shareholders. Your attorney should evaluate your specific fundraising plans, co-founder situation, and tax position before you file.",
  },
  {
    question: "What is a Section 83(b) election?",
    answer:
      "A Section 83(b) election is a filing with the IRS that lets founders pay income tax on the fair market value of restricted stock at the time it is granted rather than when it vests. For early-stage founders receiving stock at a very low fair market value — often fractions of a cent per share — filing an 83(b) election means paying minimal tax now instead of potentially enormous tax later when the stock is worth substantially more. The election must be filed with the IRS within 30 days of the stock grant. This deadline is absolute and cannot be extended. Missing it can result in hundreds of thousands of dollars in unnecessary tax liability. Every founder receiving restricted stock should discuss the 83(b) election with both their attorney and accountant before the 30-day window closes.",
  },
  {
    question: "How much equity should I give co-founders?",
    answer:
      "There is no universal formula, but the most important principle is that equity splits should reflect each co-founder's expected contribution going forward, not just what has been contributed so far. Common structures include equal splits for co-founders contributing comparable time and expertise, and weighted splits when one founder contributes significantly more capital, domain expertise, or full-time commitment. Regardless of the split, every co-founder arrangement should include a four-year vesting schedule with a one-year cliff — this protects the company if a co-founder leaves early. Without vesting, a co-founder who departs after three months could walk away with a permanent ownership stake. An attorney experienced in startup formation can draft founder agreements that protect everyone involved.",
  },
  {
    question: "When should a startup hire a lawyer?",
    answer:
      "Before you incorporate. The decisions made at formation — entity type, jurisdiction of incorporation, founder equity structure, IP assignment, vesting schedules — are extraordinarily difficult and expensive to change later. A startup that incorporates as an LLC and later needs to convert to a C-Corp for venture funding faces legal fees, tax consequences, and delays that could have been avoided with proper initial counsel. Beyond formation, you need legal counsel before signing any significant contract, before issuing equity to employees or advisors, before raising any outside capital, and before launching any product that touches regulated industries. Proactive legal counsel at the right moments costs a fraction of what reactive legal work costs after problems arise.",
  },
];

export default function ForStartupsPage() {
  return (
    <>
      <SchemaMarkup schema={pageSchema} />
      <SchemaMarkup schema={faqSchema} />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-navy-500 pt-32 pb-24 sm:pt-40 sm:pb-32">
        <div
          className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-forest-500/20 blur-[120px]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-plum-500/15 blur-[100px]"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-6xl px-6 sm:px-8 lg:px-12 text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-forest-300">
            Marco Reid for Startups
          </p>
          <h1 className="mt-6 font-serif text-hero text-white">
            Launch Smarter.
            <br />
            Scale Faster.
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-xl leading-relaxed text-navy-200">
            AI-powered legal and accounting intelligence for startups from day
            one. Entity formation, founder agreements, tax strategy, IP
            protection, and automated bookkeeping — everything you need from
            incorporation to your first raise and beyond.
          </p>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href="/find-a-lawyer" size="lg" variant="secondary">
              Find a Startup Lawyer
            </Button>
            <Button
              href="/find-an-accountant"
              size="lg"
              className="bg-white text-navy-700 hover:bg-navy-50"
            >
              Find a Startup Accountant
            </Button>
          </div>
        </div>
      </section>

      {/* ── What Every Startup Needs ── */}
      <section className="py-24 sm:py-36" aria-label="What every startup needs">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
          <Reveal>
            <p className="text-center text-xs font-medium uppercase tracking-widest text-forest-600">
              The Foundation
            </p>
            <h2 className="mt-4 text-center font-serif text-display text-navy-800">
              What Every Startup Needs
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-navy-400">
              The legal and financial decisions you make in year one determine
              whether your startup thrives or spends years cleaning up avoidable
              mistakes. Get them right from the start.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {startupNeeds.map((need, i) => (
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

      <div className="mx-auto h-px max-w-sm bg-navy-100" aria-hidden="true" />

      {/* ── From Formation to Funding ── */}
      <section
        className="py-24 sm:py-36"
        aria-label="From formation to funding"
      >
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
          <Reveal>
            <p className="text-center text-xs font-medium uppercase tracking-widest text-forest-600">
              The Journey
            </p>
            <h2 className="mt-4 text-center font-serif text-display text-navy-800">
              From Formation to Funding
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-navy-400">
              Four stages. One platform. Every legal and financial milestone
              handled by professionals using the most advanced AI tools
              available.
            </p>
          </Reveal>

          <div className="mx-auto mt-16 max-w-3xl space-y-6">
            {timeline.map((step, i) => (
              <Reveal key={step.step} delay={0.1 * (i + 1)}>
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

      {/* ── Why Startups Choose Marco Reid ── */}
      <section
        className="bg-navy-50 py-24 sm:py-36"
        aria-label="Why startups choose Marco Reid"
      >
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
          <Reveal>
            <p className="text-center text-xs font-medium uppercase tracking-widest text-forest-600">
              The Advantage
            </p>
            <h2 className="mt-4 text-center font-serif text-display text-navy-800">
              Why Startups Choose Marco Reid
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {differentiators.map((item, i) => (
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

      {/* ── FAQ ── */}
      <section className="py-24 sm:py-36" aria-label="Frequently asked questions">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
          <Reveal>
            <p className="text-center text-xs font-medium uppercase tracking-widest text-forest-600">
              Frequently Asked Questions
            </p>
            <h2 className="mt-4 text-center font-serif text-display text-navy-800">
              Startup Questions, Answered
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-navy-400">
              The questions every founder asks — with thorough, practical
              answers from professionals who work with startups every day.
            </p>
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
      <section className="py-24 sm:py-36" aria-label="Find your startup team">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12 text-center">
          <Reveal>
            <h2 className="font-serif text-display text-navy-800">
              Build on the Right Foundation
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-navy-400">
              The legal and financial decisions you make today shape your
              startup for years. Find professionals who use the most advanced
              AI tools ever built — so you get it right the first time.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/find-a-lawyer" size="lg">
                Find a Startup Lawyer
              </Button>
              <Button href="/find-an-accountant" variant="secondary" size="lg">
                Find a Startup Accountant
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
