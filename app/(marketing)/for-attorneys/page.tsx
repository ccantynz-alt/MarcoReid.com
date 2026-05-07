import type { Metadata } from "next";
import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
import Reveal from "@/app/components/effects/Reveal";

export const metadata: Metadata = {
  title: "For attorneys — take back the formation revenue Atlas commoditised",
  description:
    "Marco Reid is the platform NZ, AU, US, and UK attorneys use to deliver Stripe Atlas-grade incorporation, full SaaS legal packs, and cross-border tax structures — with your sign-off on every output and your firm's brand on every artefact. Rule 5.4 compliant.",
};

const lostRevenue = [
  {
    title: "Entity formation",
    body:
      "Atlas does what was a $5–10k Cooley engagement for $500. The mechanical filing got commoditised. Marco Reid puts the filing behind your sign-off — you bill the founder for the structure, the review, and the relationship. The mechanics happen on rails.",
  },
  {
    title: "SaaS legal pack",
    body:
      "Termly does ToS / Privacy / AUP / Cookie templates for $99/mo. Founders skip the lawyer. Marco Reid drafts the same artefacts — but they don't release until you sign. The founder gets a real legal pack, not a template-mill PDF, and you bill for the work that matters.",
  },
  {
    title: "Cross-border tax structure",
    body:
      "Big-4 charges $15k for an Option-A-vs-Option-B transfer-pricing memo. Marco Reid drafts the holdco/opco model from the founder's facts — you and your accountant peer review and sign. Same defensible position, your fee captures the judgement layer.",
  },
  {
    title: "Annual compliance",
    body:
      "Atlas reminds founders to file the Delaware franchise tax. Marco Reid runs the actual annual filing — but with your firm's name on the lodgement and your sign-off on the return. Recurring revenue by default, not by hustle.",
  },
];

const restored = [
  {
    title: "Sign-off on every output",
    body:
      "Bylaws, ToS, Privacy Policy, transfer-pricing memo, annual filing — none of it leaves Marco Reid until your firm's licensed practitioner approves it through the SignoffRequest queue. Your name and bar number on every artefact. The structural moat that Atlas can't replicate.",
  },
  {
    title: "Your firm's brand on every artefact",
    body:
      "White-label cover pages. Your firm's logo, your firm's letterhead, your firm's contact details. Marco Reid is “powered by” in the footer; you are the named professional. The founder's binder reads like your firm produced it — because professionally, you did.",
  },
  {
    title: "Your firm's preferred clauses",
    body:
      "Override Marco Reid's default templates with your firm's standard wording. Your favourite arbitration clause, your liability cap, your data-residency carve-out — applied automatically to every founder you onboard.",
  },
  {
    title: "Cross-jurisdictional reach",
    body:
      "A Wellington solicitor can serve a US-bound founder with US co-counsel signing the US-law artefacts via the marketplace. A Sydney accountant can serve a NZ founder with the NZ-tax artefacts. Geographic monopoly is over; the rail is.",
  },
  {
    title: "Productivity unlock",
    body:
      "Three days of associate work becomes 45 minutes of partner review on a pre-cited, pre-checked draft. Same fee, different margin. Solo firms compete with biglaw because Marco Reid did the biglaw drudgery.",
  },
  {
    title: "Audit posture you can stake your practice on",
    body:
      "Every action lands in the hash-chained AuditLog. Every filing in RegulatorFiling. Every document version in DocumentVersion. When the next NZLS audit, OMARA review, or LSB inquiry arrives, the answer is one signed export away.",
  },
];

const compliance = [
  {
    title: "Rule 5.4 / Lawyers and Conveyancers Act compliance",
    body:
      "Marco Reid is a tooling vendor. You bill the founder; we bill you. No fee-splitting, no percentage-of-engagement, no joint client. Two engagement letters, two transactions, two relationships. The model that survives every bar's conduct review.",
  },
  {
    title: "Trust account integration",
    body:
      "NZ Lawyers' Trust Account Regulations 2008 wired in. AU jurisdictional trust regimes wired in. Akahu (NZ) and Basiq (AU) bank feeds reconciling against the trust ledger automatically. The audit trail your auditor wants is the audit trail you already have.",
  },
  {
    title: "PI insurance friendly",
    body:
      "Marco Reid's audit posture reduces claim frequency materially. We're talking to NZLS PII Scheme broker (Marsh) and Lawcover (AU) about formal premium discounts for Marco Reid firms. Watch this space.",
  },
  {
    title: "CPD on autopilot",
    body:
      "Research, drafting, and review hours captured automatically as CPD activity. NZLS, Law Council of Australia, and US state bar accreditation in progress. Your practising certificate renewal becomes a one-click export, not a year-end scramble.",
  },
];

const pricing = [
  {
    name: "Solo",
    price: "$199",
    period: "/seat/month",
    description: "For solo practitioners and 2-lawyer firms",
    features: [
      "Marco Reid Legal full platform",
      "Marco — Law research with citation verification",
      "Sign-off queue + audit ledger",
      "White-label cover pages",
      "$99/formation tooling fee (you mark up)",
      "Trust account integration (NZ + AU)",
      "Email support",
    ],
  },
  {
    name: "Firm",
    price: "$399",
    period: "/seat/month",
    description: "Full platform for boutique to mid-size firms",
    highlighted: true,
    features: [
      "Everything in Solo",
      "Firm-level template overrides",
      "Multi-jurisdiction support (NZ + AU + US + UK)",
      "Conflict checking + matter routing",
      "Marketplace lead routing",
      "Priority sign-off queue",
      "Dedicated success manager",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For 50+ lawyer firms and bar associations",
    features: [
      "Everything in Firm",
      "Dedicated infrastructure",
      "Custom integrations (PMS, DMS, billing)",
      "On-premises audit-export tooling",
      "SLA + uptime guarantee",
      "Custom training for your firm",
      "Annual on-site review",
    ],
  },
];

export default function ForAttorneysPage() {
  return (
    <>
      <section className="bg-navy-500 pt-32 pb-20 sm:pt-40">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">
              For attorneys
            </p>
            <h1 className="mt-6 font-serif text-hero text-white">
              Take back the formation revenue Atlas commoditised.
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-white/90">
              With your sign-off on every output. Your firm's brand on every
              artefact. Your bar number on every signed page. Marco Reid is
              the platform that turns attorneys into the irreplaceable layer
              again — not the bypassed one.
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
              The mechanical work didn't lose value. The delivery did.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 text-xl leading-relaxed text-navy-500">
              Stripe Atlas does in seven days what was a five-figure Cooley
              engagement: Cert of Incorporation, bylaws, EIN, Mercury account,
              founder pack. For $500.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 text-xl leading-relaxed text-navy-500">
              The work Cooley did was always two things bundled: the
              mechanical filing and the professional sign-off. Atlas
              decoupled them and the bundle collapsed. Now the founder buys
              filing for $500 and skips the sign-off entirely.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 text-xl leading-relaxed text-navy-500">
              That's the revenue every attorney lost — and the trust
              every founder lost.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="bg-navy-50 py-20 sm:py-28">
        <Container>
          <Reveal>
            <h2 className="text-center font-serif text-display text-navy-800">
              What Atlas, Termly, and the Big-4 took from your firm.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-navy-400">
              Four revenue lines that left attorney practices over the last
              decade. Marco Reid restores all four — with you as the
              named professional, billing your fee.
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
              stays on Marco Reid. None of them exist for an Atlas customer.
              All of them exist for yours.
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
              one to satisfy ABA Model Rule 5.4, the NZ Lawyers and
              Conveyancers Act 2006, the AU Legal Profession Acts, and every
              equivalent regime that protects the bar's monopoly on legal
              services.
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

      <section className="py-20 sm:py-28">
        <Container>
          <Reveal>
            <h2 className="text-center font-serif text-display text-navy-800">
              Pricing that respects the bar.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-navy-400">
              Per-seat SaaS. Per-formation tooling fee that you pass through
              as a cost line on your invoice. No fee-splitting, no
              percentage-of-engagement, no shared revenue with your client.
              Two transactions, two engagement letters, two relationships.
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
              Every NZ + AU + US + UK firm that joins in the founding cohort
              gets named on the regulatory memo, gets first pick of the
              jurisdiction-lead positions, and gets the founding-cohort
              pricing locked for life.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button href="/contact" variant="gold" size="lg">
                Join the founding cohort &rarr;
              </Button>
              <Button href="/for-accountants" variant="ghost" size="lg" className="text-white hover:text-gold-300">
                For accountants &rarr;
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
