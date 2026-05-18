import type { Metadata } from "next";
import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
import Reveal from "@/app/components/effects/Reveal";

export const metadata: Metadata = {
  title: "For accountants — take back the compliance work TurboTax commoditised",
  description:
    "Marco Reid is the platform NZ, AU, US, UK, and CA chartered accountants, CPAs, tax agents, and BAS agents use to deliver autonomous bookkeeping, multi-jurisdiction tax filing, cross-border structures, and Big-4-grade advisory — with your sign-off on every return and your firm's brand on every artefact. APES 110 + 305 + 310 compliant.",
};

const lostRevenue = [
  {
    title: "Bookkeeping",
    body:
      "Xero and QuickBooks autocomplete a quarter of what was a junior bookkeeper's job. Receipt scanners do another quarter. The firm bills less for what's left, which is review. Marco Reid moves the firm up the stack — autonomous bookkeeping below, your sign-off above. You bill for the judgement layer, not the data entry.",
  },
  {
    title: "GST / VAT / sales-tax compliance",
    body:
      "Stripe Tax + Avalara automated 24-state US sales tax. Robo-filers handle NZ GST and AU BAS for $30/mo. Compliance work that used to fund the SME accounting practice is gone. Marco Reid restores it as advisory work — you're the named tax agent, you sign every lodgement, the platform does the data.",
  },
  {
    title: "Cross-border tax structuring",
    body:
      "Big-4 charges $15–25k for a holdco/opco transfer-pricing memo. Most NZ + AU SME accountants can't compete because the time investment doesn't justify the fee. Marco Reid drafts the memo from the founder's facts; you peer review and sign. Same defensible position, your fee captures the relationship.",
  },
  {
    title: "Annual filings + company secretarial",
    body:
      "Cheap online services file annual returns for $50. Companies Office does it themselves. The recurring revenue that kept practices solvent has been bleeding out for a decade. Marco Reid runs the actual filing under your firm's brand, with your CA sign-off — and bundles the year's tax planning conversation around it. Recurring revenue restored, but as advisory not admin.",
  },
];

const restored = [
  {
    title: "Sign-off on every return",
    body:
      "Income tax, GST/VAT/sales tax, payroll, FBT, RWT, transfer pricing, voluntary disclosures — none of it leaves Marco Reid until your firm's chartered accountant or registered tax agent approves it through the SignoffRequest queue. Your CA designation, your TPB number, your IR-listed agent reference on every filing.",
  },
  {
    title: "Your firm's brand on every artefact",
    body:
      "White-label tax computations, financial statements, transfer-pricing memos, voluntary-disclosure narratives. Your firm's logo, your firm's letterhead, your firm's contact details. Marco Reid is “powered by” in the footer; you are the named professional.",
  },
  {
    title: "Your firm's chart of accounts and templates",
    body:
      "Override Marco Reid's default templates with your firm's standard chart of accounts, your firm's preferred GST classifications, your firm's standard journal narrations. Apply automatically to every client your firm onboards.",
  },
  {
    title: "Cross-jurisdictional reach",
    body:
      "An Auckland chartered accountant can serve a US-bound founder with US CPA co-sign on the IRS lodgements via the marketplace. A Sydney CA can serve a UK-resident retiree with UK ICAEW co-sign. Five jurisdictions from one firm, all on rails.",
  },
  {
    title: "Productivity unlock",
    body:
      "What was three days of senior associate work on a complex multi-jurisdiction return becomes 90 minutes of partner review on a pre-cited, pre-checked draft. Same fee, different margin. Solo CAs compete with Big-4 because Marco Reid did the Big-4 drudgery.",
  },
  {
    title: "Audit posture you can stake your practice on",
    body:
      "Every action in the hash-chained AuditLog. Every regulator filing in RegulatorFiling. Every working paper version in DocumentVersion. When the next IRD risk review, ATO audit, or CA ANZ practice review arrives, the answer is one signed export away.",
  },
];

const compliance = [
  {
    title: "APES 110 + 305 + 310 compliance",
    body:
      "APES 110 independence checks at engagement, APES 305 terms-of-engagement evidence collected automatically, APES 310 client-monies regime wired into the trust ledger. The standards that govern AU + NZ chartered accountants are the spine of the workflow, not a quarterly compliance project.",
  },
  {
    title: "Tax agent + BAS agent scope respected",
    body:
      "TPB-registered tax agents see the full feature set. BAS agents see the BAS-scope feature set. NZ IRD-listed agents see the agent-scope feature set. Out-of-scope lodgements are blocked at the workflow level — the platform prevents the breach before it can happen.",
  },
  {
    title: "Trust account / client monies",
    body:
      "APES 310 (AU) trust accounting wired in. NZ Chartered Accountants Australia and New Zealand bylaw requirements wired in. Akahu (NZ), Basiq (AU), Plaid (US), TrueLayer (UK) bank feeds reconciling against the client-monies ledger automatically.",
  },
  {
    title: "PI insurance friendly",
    body:
      "Marco Reid's audit posture reduces claim frequency materially. We're talking to CA ANZ Member Benefit Insurance, Lockton, and AON about formal premium discounts for Marco Reid firms. The actuaries become the marketing.",
  },
  {
    title: "CPD on autopilot",
    body:
      "Research, drafting, and review hours captured automatically as CPD activity. CA ANZ + CPA Australia + AICPA + ICAEW + CPA Canada accreditation in progress. Triennium CPD becomes a one-click export, not a year-end scramble.",
  },
  {
    title: "Direct e-filing built in",
    body:
      "IR (NZ), ATO (AU), IRS (US), HMRC (UK), CRA (CA) e-filing rails built in. Every lodgement captured in RegulatorFiling with the regulator reference, payload hash, and acknowledgement. \"Did we lodge that?\" answered in seconds.",
  },
];

const pricing = [
  {
    name: "Solo",
    price: "$149",
    period: "/seat/month",
    description: "For solo CAs and 2-accountant firms",
    features: [
      "Marco Reid Accounting full platform",
      "Marco — Accounting research with citation verification",
      "Sign-off queue + audit ledger",
      "White-label cover pages",
      "Catch-Up Centre access",
      "Bank feed integration (NZ + AU + US + UK)",
      "Email support",
    ],
  },
  {
    name: "Firm",
    price: "$299",
    period: "/seat/month",
    description: "Full platform for boutique to mid-size practices",
    highlighted: true,
    features: [
      "Everything in Solo",
      "Firm-level chart of accounts + templates",
      "Multi-jurisdiction tax filing (NZ + AU + US + UK + CA)",
      "Transfer-pricing module",
      "Voluntary disclosure workflow",
      "Marketplace lead routing",
      "Priority sign-off queue",
      "Dedicated success manager",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For 50+ accountant firms and accounting bodies",
    features: [
      "Everything in Firm",
      "Dedicated infrastructure",
      "Custom integrations (practice management, payroll)",
      "On-premises audit-export tooling",
      "SLA + uptime guarantee",
      "Custom training for your firm",
      "Annual on-site review",
    ],
  },
];

export default function ForAccountantsPage() {
  return (
    <>
      <section className="bg-navy-500 pt-32 pb-20 sm:pt-40">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">
              For accountants
            </p>
            <h1 className="mt-6 font-serif text-hero text-white">
              Take back the compliance work TurboTax commoditised.
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-white/90">
              With your sign-off on every return. Your firm's brand on every
              filing. Your CA designation on every signed page. Marco Reid is
              the platform that turns chartered accountants, CPAs, and tax
              agents into the irreplaceable layer again — not the bypassed
              one.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button href="/contact" variant="gold" size="lg">
                Book a firm walkthrough &rarr;
              </Button>
              <Button href="/trial" variant="ghost" size="lg" className="text-white hover:text-gold-300">
                Start a free firm trial
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
              The data entry didn't lose value. The judgement above it did.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 text-xl leading-relaxed text-navy-500">
              Xero auto-codes 80% of an SME's transactions. Stripe Tax
              files US sales tax across 24 states. Receipt scanners
              handle the shoebox. The mechanical accounting work is
              done — and the firm bills less for what's left.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 text-xl leading-relaxed text-navy-500">
              The work that always justified the chartered accountant —
              the position taken, the structure designed, the position
              defended at audit — got buried under data-entry billing.
              Now the data entry is gone and so is the perceived value.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 text-xl leading-relaxed text-navy-500">
              Marco Reid surfaces the judgement layer. The platform
              handles the data; you handle the position. You sign. The
              client pays for what only a chartered accountant can do.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="bg-navy-50 py-20 sm:py-28">
        <Container>
          <Reveal>
            <h2 className="text-center font-serif text-display text-navy-800">
              What Xero, Stripe Tax, and the Big-4 took from your firm.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-navy-400">
              Four revenue lines that left accounting practices over the last
              decade. Marco Reid restores all four — with you as the named
              professional, billing your fee.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-4 sm:grid-cols-2">
            {lostRevenue.map((l) => (
              <Reveal key={l.title} delay={0.05}>
                <div className="flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
                  <h3 className="font-serif text-lg text-navy-800">{l.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy-500">{l.body}</p>
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
              What Marco Reid restores
            </p>
            <h2 className="mt-6 text-center font-serif text-display text-navy-800">
              You are the irreplaceable layer.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-navy-400">
              Six structural advantages that compound the longer your firm
              stays on Marco Reid. None of them exist for a Xero-only or
              TurboTax customer. All of them exist for yours.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {restored.map((r) => (
              <Reveal key={r.title} delay={0.05}>
                <div className="flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5">
                  <h3 className="font-serif text-lg text-navy-800">{r.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy-500">{r.body}</p>
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
              Built around the rules of your profession.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-navy-400">
              Not retrofitted around them. Marco Reid was designed from day
              one to satisfy APES 110, 305, and 310, the Tax Agent Services
              Act 2009 (AU), the NZ Tax Administration Act 1994, the CA ANZ
              and CPA Australia bylaws, and every equivalent regime that
              defines a chartered accountant's professional obligations.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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

      <section className="py-20 sm:py-28">
        <Container>
          <Reveal>
            <h2 className="text-center font-serif text-display text-navy-800">
              Pricing that respects the profession.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-navy-400">
              Per-seat SaaS. Your firm bills the client direct under your
              own engagement letter. Marco Reid is purely tooling. No
              shared revenue, no joint engagement, no fee-splitting that
              would compromise your independence.
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
                    href="/contact"
                    variant={p.highlighted ? "gold" : "secondary"}
                    className="mt-8 w-full justify-center"
                  >
                    {p.name === "Enterprise" ? "Talk to us" : "Start trial"}
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
              The first 50 firms set the template.
            </h2>
            <p className="mt-6 text-lg text-white/85">
              Every NZ + AU + US + UK + CA firm that joins in the founding
              cohort gets named on the regulatory memo, gets first pick of
              the jurisdiction-lead positions, and gets the founding-cohort
              pricing locked for life.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button href="/contact" variant="gold" size="lg">
                Join the founding cohort &rarr;
              </Button>
              <Button href="/for-attorneys" variant="ghost" size="lg" className="text-white hover:text-gold-300">
                For attorneys &rarr;
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
