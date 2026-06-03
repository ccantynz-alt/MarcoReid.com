import type { Metadata } from "next";
import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
import Reveal from "@/app/components/effects/Reveal";

export const metadata: Metadata = {
  title: "Marco Reid for In-House Counsel — contract management, compliance tracking, and AI research for corporate legal teams",
  description:
    "Marco Reid is the platform General Counsel and in-house legal teams in the US, UK, AU, NZ, and SG use to manage contracts, track compliance obligations, control outside counsel spend, and run AI-assisted research — at a fraction of Westlaw's cost and with full matter visibility.",
};

const painPoints = [
  {
    title: "Outside counsel is slow and opaque",
    body:
      "You send a contract to external counsel. Three days later you get a marked-up Word document and a bill you didn't budget for. The business needed the answer in four hours. Marco Reid gives your team the research capability to resolve 70% of issues in-house — and gives you full visibility into the other 30% you hand to external firms.",
  },
  {
    title: "Contract review is a black hole",
    body:
      "A mid-size corporate legal team processes hundreds of contracts per quarter — NDAs, MSAs, SOWs, vendor agreements, employment contracts. Each one takes hours without proper tooling. Marco Reid's Document AI drafts, redlines, and summarises contracts from your standard playbook positions. Contracts that took days take hours. Hours take minutes.",
  },
  {
    title: "Compliance obligations multiply without a system",
    body:
      "Privacy law. Employment law. Trade regulations. Environmental obligations. Industry-specific regulation. The compliance matrix for a modern business is enormous — and it changes. Marco Reid tracks every obligation against its source, its due date, and its owner. Nothing expires unnoticed because nothing is tracked on a spreadsheet.",
  },
  {
    title: "The business can't see what legal is doing",
    body:
      "The CFO asks for a dashboard of open legal matters and their expected cost. The CHRO wants to know the status of the employment dispute. The CEO wants to know when the acquisition is closing. In-house counsel without proper matter management software cannot answer these questions quickly — and visibility gaps cost trust. Marco Reid gives the business the visibility it demands.",
  },
];

const features = [
  {
    title: "Contract lifecycle management",
    body:
      "From first draft to execution to renewal. Standard playbook positions imported once and applied on every redline. Counterparty deviations flagged automatically against your pre-approved fallback positions. Execution via built-in e-signature. Renewal alerts 90 days out. The entire contract estate in one system.",
  },
  {
    title: "Marco — research at Westlaw depth, without the Westlaw cost",
    body:
      "Case law from CourtListener (6M+ US opinions), BAILII (UK), NZLII (NZ), and Austlii (AU) — indexed, verified, and citation-treated. IRS guidance, SEC releases, HMRC manuals. Ask a question in plain language; receive sourced, verified authorities. The Oracle research capability available to in-house teams who have no Westlaw budget.",
  },
  {
    title: "Matter management with business-visible dashboards",
    body:
      "Every matter — litigation, regulatory, M&A, employment, IP, commercial — tracked by status, cost-to-date, outside counsel, and expected resolution. Business stakeholder dashboards show what they need to see without exposing privileged detail. The legal team runs on one system; the business sees what it needs.",
  },
  {
    title: "Compliance obligation register",
    body:
      "Every regulatory obligation mapped to its source statute or regulation, its due date, its owner, and its completion status. Privacy Act reviews, employment law updates, industry licence renewals, data breach notification windows — all tracked and alerted before they become incidents. The compliance register your board risk committee wants to see.",
  },
  {
    title: "Outside counsel management",
    body:
      "Matter briefings sent from Marco Reid. Budgets set before work commences. Invoices validated against LEDES billing guidelines before approval. Outside counsel performance tracked by matter type, turnaround time, and budget adherence. The GC who controls outside counsel spend controls the most significant line item in the legal budget.",
  },
  {
    title: "Marco Reid Voice — in-house vocabulary",
    body:
      "Commercial, employment, IP, and M&A vocabulary trained in. Dictate a meeting note in the elevator on the way out of the negotiation. Dictate a board memo on the commute home. Voice formats everything correctly — board memo is a board memo, attendance note is an attendance note, contract summary is a contract summary.",
  },
];

const jurisdictions = [
  {
    name: "United States",
    body:
      "GC-level features built for US corporate counsel. CourtListener case law and federal regulatory database. SEC EDGAR and IRS guidance indexed. Outside counsel management built around ABA Model Rules. Delaware entity law wired in for corporate work.",
  },
  {
    name: "United Kingdom",
    body:
      "UK GC tooling built around Companies Act 2006, GDPR (UK), and the Employment Rights Act. BAILII indexed. Companies House filings tracked. SRA-regulated external firms managed through the outside counsel module.",
  },
  {
    name: "Australia and New Zealand",
    body:
      "Corporations Act 2001 (AU) and Companies Act 1993 (NZ) obligations tracked. Austlii and NZLII indexed. Privacy Act 1988 (AU) and Privacy Act 2020 (NZ) compliance workflows built in. ASX Listing Rules obligations tracked for listed entities.",
  },
  {
    name: "Singapore",
    body:
      "Companies Act (Cap. 50), PDPA, and MAS regulatory obligations. Singapore Law Academy and SLJ indexed. ACRA annual filing obligations tracked. Common law jurisdiction — CourtListener US authorities accessible for persuasive research.",
  },
];

const useCases = [
  {
    title: "The $500M acquisition NDA turned in four hours",
    body:
      "Counterparty sends a 12-page NDA at 9am. Business needs sign-off by 1pm for the board call. Marco Reid's Document AI redlines against your standard playbook in 8 minutes, flags the three deviations that matter, and prepares a one-page summary for the GC. Reviewed, approved, and returned before the business hits the deadline.",
  },
  {
    title: "The employment claim that didn't become a trial",
    body:
      "An employment complaint arrives. The HR team and GC need to understand the exposure in 24 hours. Marco Reid queries the relevant employment case law for the jurisdiction, identifies the leading authority on the specific issue, and produces a cited legal risk summary — verified, sourced, ready for the GC to sign off. Outside counsel is briefed with context, not from scratch. The advice is better and it costs less.",
  },
  {
    title: "The compliance renewal nobody noticed",
    body:
      "The financial services licence requires a renewal filing 60 days before expiry. Without a system, it goes in a calendar someone forgets to check. With Marco Reid's compliance obligation register, the GC gets an alert at 90 days, 60 days, and 30 days. The filing goes in on time. The board never hears about it — which is exactly right.",
  },
];

const pricing = [
  {
    name: "Team",
    price: "$299",
    period: "/seat/month",
    description: "For legal teams of 2–10 lawyers",
    features: [
      "Marco Reid Legal full platform",
      "Marco — Law research with citation verification",
      "Contract lifecycle management",
      "Compliance obligation register",
      "Matter management with stakeholder dashboards",
      "Outside counsel management",
      "Marco Reid Voice — in-house vocabulary",
      "Email support",
    ],
  },
  {
    name: "Department",
    price: "$499",
    period: "/seat/month",
    description: "Full platform for 10–50 lawyer legal departments",
    highlighted: true,
    features: [
      "Everything in Team",
      "Multi-jurisdiction compliance tracking",
      "LEDES billing validation for outside counsel",
      "Board-level reporting dashboards",
      "Workflow automation for standard contract types",
      "API access for integration with ERP and CLM systems",
      "Dedicated success manager",
      "Priority support",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For 50+ lawyer departments and global legal operations",
    features: [
      "Everything in Department",
      "Dedicated infrastructure",
      "Custom integrations (SAP, Salesforce, Workday)",
      "Single sign-on (SSO) and SCIM provisioning",
      "Advanced analytics and matter benchmarking",
      "SLA + uptime guarantee",
      "Annual on-site legal operations review",
    ],
  },
];

export default function ForInHouseCounselPage() {
  return (
    <>
      <section className="bg-navy-500 pt-32 pb-20 sm:pt-40">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">
              For in-house counsel
            </p>
            <h1 className="mt-6 font-serif text-hero text-white">
              The business has full visibility. Outside counsel is under control. Your team is ahead.
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-white/90">
              Marco Reid is the platform General Counsel and in-house legal teams
              in the US, UK, AU, NZ, and SG use to manage every matter, every
              contract, and every compliance obligation — with the research depth
              of Westlaw at a fraction of the cost, and the business visibility
              your CEO and board have been asking for.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button href="/trial" variant="gold" size="lg">
                Start free trial &rarr;
              </Button>
              <Button
                href="/contact"
                variant="ghost"
                size="lg"
                className="text-white hover:text-gold-300"
              >
                Book a GC walkthrough
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container narrow>
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-forest-600">
              The problem
            </p>
            <h2 className="mt-6 font-serif text-display text-navy-800">
              In-house counsel is the most productive lawyer in the building. The tools don&rsquo;t reflect that.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 text-xl leading-relaxed text-navy-500">
              A GC in 2026 is responsible for legal risk, compliance, contracts,
              employment, IP, M&A, regulatory filings, outside counsel management,
              and board reporting — simultaneously, without the support structure
              a law firm takes for granted.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 text-xl leading-relaxed text-navy-500">
              Most in-house teams run this on a combination of Word, Excel,
              Outlook, and institutional memory. That combination breaks at scale.
              It breaks when someone leaves. It breaks under board scrutiny. It
              breaks the moment the business needs an answer faster than the
              outside counsel can bill.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 text-xl leading-relaxed text-navy-500">
              Marco Reid replaces the spreadsheet with a system. The system that
              lets a two-lawyer in-house team punch well above its weight.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="bg-navy-50 py-20 sm:py-28">
        <Container>
          <Reveal>
            <h2 className="text-center font-serif text-display text-navy-800">
              The four problems every in-house team has. All solved.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-navy-400">
              Not retrofitted from a law firm platform. Built from the ground up
              for the in-house reality: business speed, cost pressure, board
              visibility, and no research budget.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-4 sm:grid-cols-2">
            {painPoints.map((p) => (
              <Reveal key={p.title} delay={0.05}>
                <div className="flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
                  <h3 className="font-serif text-lg text-navy-800">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy-500">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <Reveal>
            <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-forest-600">
              Platform features
            </p>
            <h2 className="mt-6 text-center font-serif text-display text-navy-800">
              Built for the in-house reality.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-navy-400">
              Six modules that address the full scope of in-house legal work —
              from the NDA that needs to turn in four hours to the board
              compliance report that needs to be ready on Monday.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <Reveal key={f.title} delay={0.05}>
                <div className="flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5">
                  <h3 className="font-serif text-lg text-navy-800">{f.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy-500">{f.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <p className="mx-auto mt-12 max-w-2xl rounded-2xl border border-navy-100 bg-navy-50 p-6 text-sm leading-relaxed text-navy-500">
              <strong className="text-navy-700">Research disclaimer:</strong> Marco
              is an AI research tool. All outputs must be verified by a qualified
              professional before reliance. Citation verification reduces
              hallucination risk; it does not eliminate the obligation of
              in-house counsel to verify every authority before advising the
              business or filing with a court or regulator.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="bg-navy-50 py-20 sm:py-28">
        <Container>
          <Reveal>
            <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-forest-600">
              In practice
            </p>
            <h2 className="mt-6 text-center font-serif text-display text-navy-800">
              What it looks like in the field.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-navy-400">
              Three scenarios from real in-house legal work. The same
              situations your team faces. The difference Marco Reid makes
              in each.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-4 sm:grid-cols-3">
            {useCases.map((u) => (
              <Reveal key={u.title} delay={0.05}>
                <div className="flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
                  <h3 className="font-serif text-lg text-navy-800">{u.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy-500">{u.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <Reveal>
            <h2 className="text-center font-serif text-display text-navy-800">
              Built for your jurisdiction.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-navy-400">
              In-house legal teams work across borders. Marco Reid reflects the
              regulatory and legal landscape of every jurisdiction your
              business operates in.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {jurisdictions.map((j) => (
              <Reveal key={j.name} delay={0.05}>
                <div className="flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
                  <h3 className="font-serif text-lg text-navy-800">{j.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy-500">{j.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-navy-50 py-20 sm:py-28">
        <Container>
          <Reveal>
            <h2 className="text-center font-serif text-display text-navy-800">
              From $299/month. No lock-in.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-navy-400">
              Monthly subscription. Cancel any time. No per-matter fee. No
              percentage of outside counsel savings. Your data is always yours
              — exportable in full, on demand.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-6 sm:grid-cols-3">
            {pricing.map((p) => (
              <Reveal key={p.name} delay={0.05}>
                <div
                  className={`flex h-full flex-col rounded-2xl border p-8 shadow-card ${
                    p.highlighted
                      ? "border-gold-300 bg-gradient-to-br from-gold-50 via-white to-white ring-2 ring-gold-200"
                      : "border-navy-100 bg-white"
                  }`}
                >
                  <div>
                    <h3 className="font-serif text-2xl text-navy-800">{p.name}</h3>
                    <p className="mt-2 text-sm text-navy-400">{p.description}</p>
                    <p className="mt-6">
                      <span className="font-serif text-4xl text-navy-800">{p.price}</span>
                      {p.period && <span className="text-navy-400">{p.period}</span>}
                    </p>
                  </div>
                  <ul className="mt-8 flex-1 space-y-3 text-sm text-navy-600">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <span className="mt-0.5 text-forest-500">&#10003;</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    href={p.name === "Enterprise" ? "/contact" : "/trial"}
                    variant={p.highlighted ? "gold" : "secondary"}
                    className="mt-8 w-full justify-center"
                  >
                    {p.name === "Enterprise" ? "Talk to us" : "Start free trial"}
                  </Button>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-navy-500 py-24 sm:py-32" aria-label="Get started">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-display text-white">
              The business deserves a legal team that moves at business speed.
            </h2>
            <p className="mt-6 text-lg text-white/85">
              Every in-house team that joins the founding cohort gets
              founding-cohort pricing locked for life, first access to the
              outside counsel management and board reporting features, and
              direct input into the legal operations roadmap. Build the
              department your CEO actually sees.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button href="/trial" variant="gold" size="lg">
                Start free trial &rarr;
              </Button>
              <Button
                href="/legal/practice-types"
                variant="ghost"
                size="lg"
                className="text-white hover:text-gold-300"
              >
                All practice types &rarr;
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
