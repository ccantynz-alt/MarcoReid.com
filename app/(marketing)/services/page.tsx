import type { Metadata } from "next";
import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
import Reveal from "@/app/components/effects/Reveal";
import SchemaMarkup from "@/app/components/shared/SchemaMarkup";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title:
    "AI-Powered Legal Services — 98% Done Before Your Attorney Signs Off | AlecRae",
  description:
    "Multi-jurisdiction company formation, trademark protection, IP strategy, contract drafting, and tax structuring. AI does the heavy lifting. A licensed attorney on the platform reviews and files. One platform. Every jurisdiction.",
};

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "AlecRae Services",
  description:
    "AI-powered legal and accounting services with licensed attorney sign-off.",
  url: `${BRAND.url}/services`,
};

const services = [
  {
    title: "Brand & IP Protection",
    subtitle: "Multi-jurisdiction trademark and IP strategy",
    desc: "Tell us your brand name, where you operate, and what you sell. The Oracle analyses trademark conflicts across every jurisdiction, generates filing-ready applications for NZ, US, AU, UK, and EU via the Madrid Protocol, and produces the complete IP protection strategy — holding structures, licensing agreements, and enforcement recommendations. A licensed IP attorney on the platform reviews everything and files.",
    steps: [
      "Enter your brand, products, and target markets",
      "AI runs conflict searches across USPTO, IPONZ, WIPO, EUIPO, and IP Australia",
      "AI generates filing-ready trademark applications for every jurisdiction",
      "AI recommends IP holding structure and licensing strategy",
      "Licensed IP attorney reviews, advises, and files",
      "Platform tracks renewals, deadlines, and opposition proceedings",
    ],
    badge: "Most popular",
  },
  {
    title: "Company Formation",
    subtitle: "Multi-jurisdiction entity setup in one workflow",
    desc: "Tell us where your company will operate and what it does. AlecRae simultaneously analyses the legal structure (liability protection, corporate veil, regulatory requirements) and the tax implications (entity selection, transfer pricing, withholding tax, double tax agreements) across every jurisdiction. It generates every document — articles of incorporation, constitutions, shareholder agreements, IP assignments, intercompany licences. Your attorney reviews and files.",
    steps: [
      "Specify countries, business activity, directors, and shareholders",
      "AI analyses legal liability and tax implications simultaneously",
      "AI recommends optimal structure — holding, operating, and IP entities",
      "AI generates every formation document, pre-populated",
      "Licensed corporate attorney reviews, advises, and files",
      "Platform tracks annual returns, compliance deadlines, and filings forever",
    ],
    badge: "Highest value",
  },
  {
    title: "Contract Drafting & Review",
    subtitle: "AI-drafted, attorney-approved contracts",
    desc: "Need a partnership agreement, SaaS terms, employment contract, NDA, licensing deal, or any commercial agreement? Describe what you need in plain language. The AI drafts a complete, jurisdiction-specific contract using current law. It flags risks, suggests protective clauses, and identifies missing provisions. Your attorney reviews the final document before execution.",
    steps: [
      "Describe the agreement in plain language",
      "AI drafts complete contract with jurisdiction-specific clauses",
      "AI flags risks, missing provisions, and one-sided terms",
      "AI generates alternative clause options where trade-offs exist",
      "Licensed attorney reviews, negotiates, and finalises",
      "E-signature built into the platform",
    ],
    badge: "Coming soon",
  },
  {
    title: "Tax Structure Analysis",
    subtitle: "Cross-jurisdiction tax optimisation",
    desc: "Operating across borders? AlecRae analyses your corporate structure and identifies tax optimisation opportunities — transfer pricing, double tax agreements, withholding tax, R&D credits, GST/VAT zero-rating, and entity selection. The AI generates a comprehensive tax strategy with specific recommendations. Your accountant reviews and implements.",
    steps: [
      "Enter your corporate structure and revenue flows",
      "AI analyses tax implications across every jurisdiction",
      "AI identifies optimisation opportunities and risks",
      "AI generates transfer pricing documentation",
      "Licensed accountant reviews, advises, and implements",
      "Platform monitors ongoing compliance and filing deadlines",
    ],
    badge: "Coming soon",
  },
  {
    title: "Immigration & Visa Strategy",
    subtitle: "Legal + tax analysis for cross-border moves",
    desc: "Moving countries? Hiring international talent? AlecRae is the only platform that simultaneously analyses the immigration law AND the tax implications of a cross-border move. Visa eligibility, work permits, tax residency changes, departure tax, arrival obligations, double tax treaty benefits — all in one workflow.",
    steps: [
      "Describe the immigration scenario",
      "AI analyses visa eligibility and requirements",
      "AI simultaneously analyses tax implications of the move",
      "AI generates complete application preparation pack",
      "Licensed immigration attorney reviews and files",
      "Licensed accountant handles tax transition planning",
    ],
    badge: "Coming soon",
  },
  {
    title: "Estate & Succession Planning",
    subtitle: "Cross-border asset protection and succession",
    desc: "Assets in multiple countries? Business succession to plan? AlecRae analyses the legal and tax implications of estate planning across jurisdictions — wills, trusts, family trusts, succession planning, estate tax, gift tax, and cross-border inheritance. AI generates the strategy. Your attorney and accountant execute it.",
    steps: [
      "Enter assets, jurisdictions, and beneficiaries",
      "AI analyses legal estate planning options per jurisdiction",
      "AI simultaneously analyses tax implications",
      "AI generates trust deeds, wills, and succession documents",
      "Licensed attorney and accountant review and execute",
      "Platform monitors ongoing trustee obligations and filing deadlines",
    ],
    badge: "Coming soon",
  },
];

const whyDifferent = [
  {
    title: "AI does 98% of the work",
    desc: "Other platforms make you fill in forms and then hand everything to a human who starts from scratch. AlecRae\u2019s AI analyses your situation, generates every document, and delivers a complete package. The attorney reviews a finished product — not a blank page.",
  },
  {
    title: "Legal + accounting simultaneously",
    desc: "Every other platform does legal OR accounting. Never both. When AlecRae recommends a corporate structure, it has already analysed the tax implications. When it files a trademark, it has already considered the IP holding structure. No other tool on Earth does this.",
  },
  {
    title: "Your attorney is ON the platform",
    desc: "No emailing PDFs back and forth. No printing and scanning. The attorney who reviews your documents is on AlecRae, using the same platform, seeing the same AI analysis. They review, they sign off, they file. All inside one system.",
  },
  {
    title: "Every jurisdiction. One workflow.",
    desc: "Need a company in NZ, a trademark in the US, and a tax structure across both? One workflow. One platform. One set of documents. Not four different services in four different countries with four different logins.",
  },
  {
    title: "Ongoing compliance forever",
    desc: "Formation is day one. AlecRae tracks annual returns, trademark renewals, tax filing deadlines, regulatory changes, and compliance obligations across every jurisdiction, every entity, every year. The client never falls out of compliance.",
  },
  {
    title: "98% cheaper than traditional",
    desc: "A multi-jurisdiction corporate structure with IP protection traditionally costs $20,000\u2013$50,000+ in legal fees alone. AlecRae generates the same documents for a fraction of the cost. The attorney\u2019s time is spent reviewing, not drafting. That\u2019s where the savings come from.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <SchemaMarkup schema={schema} />

      {/* Hero */}
      <section className="bg-navy-500 pt-32 pb-20 sm:pt-40 sm:pb-28">
        <Container className="text-center">
          <Reveal>
            <p className="text-sm font-semibold tracking-wider text-forest-300">
              AI-Powered Legal Services
            </p>
            <h1 className="mt-6 font-serif text-hero text-white">
              98% done before your
              <br />
              attorney signs off.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-xl text-navy-200">
              The most advanced AI on Earth generates every document, analyses every
              jurisdiction, and delivers a complete legal package. A licensed attorney
              on the platform reviews and files. One workflow. Every country.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10 flex justify-center gap-4">
              <Button href="/pricing" size="lg">
                View pricing
              </Button>
              <Button href="/contact" variant="secondary" size="lg">
                Talk to us
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* How it works */}
      <section className="py-24 sm:py-36" aria-label="How it works">
        <Container>
          <Reveal>
            <h2 className="font-serif text-display text-navy-800">
              How it works.
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-navy-400">
              Three steps. That&rsquo;s it.
            </p>
          </Reveal>
          <div className="mt-16 grid gap-6 sm:grid-cols-3">
            {[
              {
                step: "01",
                title: "Tell us what you need",
                desc: "Describe your situation in plain language. Where does your business operate? What do you need to protect? The AI asks the right follow-up questions.",
              },
              {
                step: "02",
                title: "AI generates everything",
                desc: "The Oracle analyses legal and tax implications simultaneously across every jurisdiction. Generates every document. Flags every risk. Recommends the optimal strategy.",
              },
              {
                step: "03",
                title: "Attorney reviews & files",
                desc: "A licensed attorney on the platform reviews the complete package. They advise, adjust, sign off, and file. You get the final product with professional assurance.",
              },
            ].map((s) => (
              <Reveal key={s.step} delay={0.05}>
                <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card">
                  <span className="text-4xl font-bold text-forest-500/20">
                    {s.step}
                  </span>
                  <h3 className="mt-4 font-semibold text-navy-700">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy-400">
                    {s.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        <div className="h-px bg-navy-100" />
      </div>

      {/* Services */}
      <section className="py-24 sm:py-36" aria-label="Services">
        <Container>
          <Reveal>
            <h2 className="font-serif text-display text-navy-800">
              Services.
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-navy-400">
              Every service follows the same model: AI generates 98% of the work.
              A licensed professional on the platform delivers the final 2%.
            </p>
          </Reveal>

          <div className="mt-16 space-y-6">
            {services.map((s) => (
              <Reveal key={s.title} delay={0.05}>
                <div className="rounded-xl border border-navy-100 bg-white p-8 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-serif text-xl text-navy-700">
                        {s.title}
                      </h3>
                      <p className="mt-1 text-sm font-medium text-forest-600">
                        {s.subtitle}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${
                        s.badge === "Most popular"
                          ? "bg-forest-50 text-forest-600"
                          : s.badge === "Highest value"
                            ? "bg-plum-50 text-plum-600"
                            : "bg-navy-50 text-navy-500"
                      }`}
                    >
                      {s.badge}
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-navy-400">
                    {s.desc}
                  </p>
                  <div className="mt-6">
                    <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
                      The workflow
                    </p>
                    <ol className="mt-3 space-y-2">
                      {s.steps.map((step, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-sm text-navy-500"
                        >
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-navy-100 text-xs font-bold text-navy-500">
                            {i + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        <div className="h-px bg-navy-100" />
      </div>

      {/* Why different */}
      <section className="py-24 sm:py-36" aria-label="Why different">
        <Container>
          <Reveal>
            <h2 className="font-serif text-display text-navy-800">
              Why this is different from everything else.
            </h2>
          </Reveal>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyDifferent.map((w) => (
              <Reveal key={w.title} delay={0.05}>
                <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5">
                  <h3 className="font-semibold text-navy-700">{w.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy-400">
                    {w.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* The attorney angle */}
      <section className="bg-navy-50 py-24 sm:py-36" aria-label="For attorneys">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <div>
                <p className="text-sm font-semibold tracking-wider text-forest-600">
                  For attorneys and accountants
                </p>
                <h2 className="mt-4 font-serif text-display text-navy-800">
                  The clients come to you.
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-navy-400">
                  Every AI-generated document needs a licensed professional to review
                  and sign off. That&rsquo;s you. AlecRae delivers a stream of clients who
                  need your expertise — with 98% of the work already done. You review
                  a finished package, not a blank page. Your effective hourly rate
                  goes through the roof.
                </p>
                <p className="mt-4 text-lg leading-relaxed text-navy-400">
                  Join the platform. Set your availability. Clients find you. The AI
                  does the drafting. You do the judgment work. Everyone wins.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="space-y-4">
                {[
                  {
                    metric: "98%",
                    label: "of drafting done by AI before you see it",
                  },
                  {
                    metric: "4x",
                    label:
                      "more clients per hour — review, not draft",
                  },
                  {
                    metric: "0",
                    label:
                      "PDFs emailed back and forth — everything on-platform",
                  },
                  {
                    metric: "\u221E",
                    label:
                      "jurisdictions — the AI handles cross-border complexity",
                  },
                ].map((m) => (
                  <div
                    key={m.label}
                    className="flex items-center gap-4 rounded-xl border border-navy-100 bg-white p-4 shadow-card"
                  >
                    <span className="text-3xl font-bold text-forest-600">
                      {m.metric}
                    </span>
                    <span className="text-sm text-navy-500">{m.label}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-navy-500 py-24 sm:py-36">
        <Container className="text-center">
          <Reveal>
            <h2 className="font-serif text-display text-white">
              Ready to protect your business?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-xl text-navy-200">
              Tell us what you need. The AI does the rest.
              A licensed professional signs off.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10 flex justify-center gap-4">
              <Button href="/pricing" size="lg">
                Get started
              </Button>
              <Button href="/contact" variant="secondary" size="lg">
                Talk to us
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
