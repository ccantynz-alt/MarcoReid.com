import type { Metadata } from "next";
import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
import Reveal from "@/app/components/effects/Reveal";

export const metadata: Metadata = {
  title: "Marco Reid for Solicitors — client management, trust accounting, and AI research for UK, NZ, and AU law firms",
  description:
    "Marco Reid is the platform UK, NZ, and AU solicitors use to manage clients, run SRA and NZLS-compliant trust accounts, automate conveyancing workflows, meet AML/CFT obligations, and deliver AI-assisted research — with your name on every artefact and your firm in control.",
};

const challenges = [
  {
    title: "Trust accounting that survives the SRA visit",
    body:
      "SRA Accounts Rules 2019 (UK), the NZLS Rules on Client Funds 2008 (NZ), and each Australian state law society's trust accounting regime — all wired into the trust ledger from day one. Three-way reconciliation runs automatically. Every client money movement is timestamped, auditable, and hash-signed. When the compliance officer calls, the answer is one export away.",
  },
  {
    title: "Conveyancing without the chaos",
    body:
      "A residential conveyancing file has 40–60 distinct tasks and five parties — buyer, seller, lender, agent, and the other side's solicitor. Marco Reid's conveyancing workflow tracks every milestone, auto-generates standard forms, and flags when a title search, LIM, or Land Information Memorandum is overdue. Nothing falls through because nothing is manual.",
  },
  {
    title: "AML/CFT compliance that doesn't consume the fee",
    body:
      "The Anti-Money Laundering and Countering Financing of Terrorism Act 2009 (NZ) and the Proceeds of Crime Act 2002 / Money Laundering Regulations 2017 (UK) impose real obligations on law firms. Marco Reid runs CDD and EDD checks, records the results, and flags PEP and sanctions matches — before the file opens, not after the retainer is signed.",
  },
  {
    title: "Client portal that wins referrals",
    body:
      "Every client gets a branded, secure portal: matter status in plain English, all documents signed or unsigned, invoice history, next steps, and a secure message thread. When clients understand what's happening and don't have to chase by phone, they refer. The portal is the cheapest marketing spend in the firm.",
  },
];

const features = [
  {
    title: "Full trust account ledger",
    body:
      "Client ledger, office ledger, and trust bank reconciliation in one system. Every matter gets its own ledger card. Bulk transfers, receipts, and disbursements captured as they happen. Automatic three-way reconciliation report on demand — the report your auditor and your law society want to see.",
  },
  {
    title: "Marco — law research with verified citations",
    body:
      "Case law from BAILII (UK), NZLII (NZ), and Austlii (AU) indexed and verified on every query. Ask a question in plain language; receive citations with treatment history, jurisdiction flags, and a direct source link. No Westlaw subscription required for everyday research.",
  },
  {
    title: "Document AI and precedent library",
    body:
      "Standard forms auto-populated from the matter record — retainer letters, completion statements, Land Registry forms, Companies Office forms, LIM requests, standard conveyancing correspondence. Your firm's preferred clauses override every default. The library grows with every file you run.",
  },
  {
    title: "Court-Rules Calendaring",
    body:
      "Limitation periods, pleading deadlines, response windows — calculated automatically from the cause of action or claim date against the relevant court rules. England and Wales, New Zealand, and Australian state and federal courts all wired in. Nothing is missed because nothing is manually diarised.",
  },
  {
    title: "Marco Reid Voice — solicitor vocabulary",
    body:
      "Conveyancing, family, employment, commercial, and litigation vocabulary all trained in. Dictate a client attendance note on the way back from a meeting; it arrives formatted as an attendance note, tagged to the matter, timestamped, and ready for file. Not a general-purpose transcription app.",
  },
  {
    title: "Billing and LEDES-compatible time recording",
    body:
      "Every Voice session, every document draft, every research query captured as a timestamped billable activity. Time entry review before billing. Invoices generated with one click. Stripe payment collection built in. LEDES billing format for corporate clients who require it.",
  },
];

const jurisdictions = [
  {
    name: "United Kingdom (England and Wales)",
    body:
      "SRA Accounts Rules 2019 compliance built in. BAILII indexed. Land Registry, Companies House, and HMCTS court filing integration on roadmap. AML/CFT under the Money Laundering Regulations 2017 wired into the client onboarding flow.",
  },
  {
    name: "New Zealand",
    body:
      "NZLS Rules on Client Funds 2008 wired into the trust ledger. LINZ (Land Information New Zealand) integrations for property titles and dealings. AML/CFT Act 2009 CDD workflow built in. District Court, High Court, Court of Appeal deadline rules in the calendaring engine.",
  },
  {
    name: "Australia",
    body:
      "State-by-state trust accounting rules (NSW, VIC, QLD, WA, SA, ACT, TAS, NT) all built in. Austlii indexed. Land title and PEXA integration on roadmap. AML/CTF Act 2006 obligations wired into client onboarding. State law society-specific CPD tracking.",
  },
];

const compliance = [
  {
    title: "SRA Accounts Rules 2019 (UK)",
    body:
      "Every requirement of the SRA Accounts Rules — client money segregation, promptness of payment, three-way reconciliation, maintaining ledgers — is baked into the workflow. The platform makes the compliant path the only path.",
  },
  {
    title: "NZLS Client Fund Rules (NZ)",
    body:
      "The NZLS Rules on Client Funds 2008 govern every NZ law firm. Marco Reid's trust module is built to those rules — separate ledger cards, monthly reconciliation, interest attribution, and the audit trail your NZLS inspector expects.",
  },
  {
    title: "AML/CFT obligations (NZ, UK, AU)",
    body:
      "Customer Due Diligence and Enhanced Due Diligence at client onboarding. PEP and sanctions screening against OFAC, UN, and NZ/AU equivalents. Suspicious transaction reporting workflow. The AML/CFT compliance file builds itself as the matter progresses.",
  },
  {
    title: "CPD tracking across jurisdictions",
    body:
      "Research, drafting, and review hours captured automatically as CPD activities. NZLS, Law Society (England and Wales), and Australian state law society CPD requirements tracked and exported for practising certificate renewal — one click, not a year-end scramble.",
  },
];

const pricing = [
  {
    name: "Solo",
    price: "$199",
    period: "/seat/month",
    description: "For sole practitioners and 2–3 fee earner firms",
    features: [
      "Marco Reid Legal full platform",
      "Marco — Law research with citation verification",
      "Trust account ledger (SRA / NZLS / AU state rules)",
      "Conveyancing workflow module",
      "AML/CFT onboarding workflow",
      "Client portal",
      "Marco Reid Voice — solicitor vocabulary",
      "Email support",
    ],
  },
  {
    name: "Firm",
    price: "$399",
    period: "/seat/month",
    description: "Full platform for boutique to mid-size solicitor firms",
    highlighted: true,
    features: [
      "Everything in Solo",
      "Firm-level precedent and clause library",
      "Multi-jurisdiction matter management",
      "LEDES billing and corporate client reporting",
      "Conflict checking across all matters",
      "Marketplace lead routing",
      "Priority sign-off queue",
      "Dedicated success manager",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For 50+ fee earner firms and law societies",
    features: [
      "Everything in Firm",
      "Dedicated infrastructure",
      "Custom PMS and DMS integrations",
      "On-premises audit-export tooling",
      "SLA + uptime guarantee",
      "Custom vocabulary training for Voice",
      "Annual on-site compliance review",
    ],
  },
];

export default function ForSolicitorsPage() {
  return (
    <>
      <section className="bg-navy-500 pt-32 pb-20 sm:pt-40">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">
              For solicitors
            </p>
            <h1 className="mt-6 font-serif text-hero text-white">
              Client work done. Trust account clean. SRA visit ready.
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-white/90">
              Marco Reid is the platform UK, NZ, and AU solicitors use to run
              every client matter — from the first attendance note to the final
              bill — on a platform that treats compliance as infrastructure, not
              an afterthought. SRA Accounts Rules. NZLS Client Fund Rules.
              AML/CFT obligations. Wired in from day one.
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
                Book a firm walkthrough
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
              The compliance burden grew. The fee didn&rsquo;t.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 text-xl leading-relaxed text-navy-500">
              A solicitor in 2026 carries the same professional obligations as
              their predecessor in 2000 — plus AML/CFT, GDPR/Privacy Act
              compliance, and cybersecurity obligations that didn&rsquo;t exist
              then. The regulatory overhead has multiplied. The billable rate
              has not kept pace.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 text-xl leading-relaxed text-navy-500">
              The firms that survive the next decade are the ones that turn
              compliance into a competitive advantage — not a cost centre. Every
              AML check that runs automatically is an hour freed for advice.
              Every trust account reconciliation that produces itself is a
              morning reclaimed.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 text-xl leading-relaxed text-navy-500">
              Marco Reid runs the compliance infrastructure. You run the legal
              practice.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="bg-navy-50 py-20 sm:py-28">
        <Container>
          <Reveal>
            <h2 className="text-center font-serif text-display text-navy-800">
              Built for the way solicitors actually work.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-navy-400">
              Not a generic legal platform with jurisdiction settings bolted on.
              Every module designed around the client-facing, compliance-heavy,
              trust-account-bearing practice of a UK, NZ, or AU solicitor.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-4 sm:grid-cols-2">
            {challenges.map((c) => (
              <Reveal key={c.title} delay={0.05}>
                <div className="flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
                  <h3 className="font-serif text-lg text-navy-800">{c.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy-500">{c.body}</p>
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
              Every tool a solicitor firm needs. None they do not.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-navy-400">
              Six modules that cover the full matter lifecycle — from client
              onboarding to fee collection — with compliance baked into every
              step.
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
              hallucination risk; it does not eliminate the solicitor&rsquo;s
              professional obligation to verify every authority before advising
              a client or filing with a court.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="bg-navy-50 py-20 sm:py-28">
        <Container>
          <Reveal>
            <h2 className="text-center font-serif text-display text-navy-800">
              Built for your jurisdiction.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-navy-400">
              The rules differ between the SRA, NZLS, and each Australian state
              law society. Marco Reid reflects each regime — not a generic
              platform with compliance settings on a toggle.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-4 sm:grid-cols-3">
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

      <section className="py-20 sm:py-28">
        <Container>
          <Reveal>
            <h2 className="text-center font-serif text-display text-navy-800">
              The compliance architecture, in detail.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-navy-400">
              Solicitors operate under the most prescriptive professional
              rules in the common law world. Marco Reid was built to those
              rules — not retrofitted around them.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-4 sm:grid-cols-2">
            {compliance.map((c) => (
              <Reveal key={c.title} delay={0.05}>
                <div className="flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
                  <h3 className="font-serif text-lg text-navy-800">{c.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy-500">{c.body}</p>
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
              From $199/month. No lock-in.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-navy-400">
              Monthly subscription. Cancel any time. Your client money is
              always yours — Marco Reid never holds, comingles, or accesses
              client funds. The trust ledger is your ledger; we just
              keep it reconciled.
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
              The SRA visit. The NZLS inspection. The client audit. All already done.
            </h2>
            <p className="mt-6 text-lg text-white/85">
              Every solicitor firm that joins the founding cohort gets founding-cohort
              pricing locked for life, first access to new court filing integrations,
              and direct input into the compliance workflow roadmap. The profession
              shaped this platform. The profession should lead it.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button href="/trial" variant="gold" size="lg">
                Start free trial &rarr;
              </Button>
              <Button
                href="/for/barristers"
                variant="ghost"
                size="lg"
                className="text-white hover:text-gold-300"
              >
                For barristers &rarr;
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
