import type { Metadata } from "next";
import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
import Reveal from "@/app/components/effects/Reveal";

export const metadata: Metadata = {
  title: "Tax advisors — the practitioner workspace",
  description:
    "For tax agents and tax advisors in NZ and AU. Client tax positions, IRD / ATO correspondence, ruling requests, voluntary disclosures, transfer pricing, and tax research with verified citations — built for TPB-registered agents and CA ANZ tax practitioners.",
};

const features = [
  {
    title: "Client tax position dashboard",
    body:
      "Provisional, terminal, and outstanding obligations across IR (NZ) and the ATO (AU). Per-entity view of GST, PAYE/PAYG, FBT, RWT, and income tax exposure. Marco surfaces what is overdue, what is upcoming, and what is at risk before the IRD letter arrives.",
  },
  {
    title: "Voluntary disclosures",
    body:
      "Marco drafts the voluntary disclosure narrative from the engagement record — pre-notification vs post-notification framing, shortfall penalty mitigation under s141G, ATO Practice Statement PS LA 2008/19 thresholds. The agent reviews and signs.",
  },
  {
    title: "Binding ruling requests",
    body:
      "Private ruling (IR) and private binding ruling (ATO) drafts assembled from a structured fact pattern. Marco cites every authority — the section, the public ruling, the case — and verifies each citation against the source before the agent reviews.",
  },
  {
    title: "Transfer pricing",
    body:
      "Local file, master file, and CBC report scaffolding for AU s815 and NZ Subpart GC. Comparable-search workflow, contemporaneous documentation library, and a defensible audit trail for every benchmarking decision.",
  },
  {
    title: "Audit and dispute support",
    body:
      "When the audit notice arrives, the file is already organised. Marco indexes the engagement records, drafts the response under s17 / s17B (NZ) and Pt IVC TAA 1953 (AU), and tracks every information request, deadline, and submission.",
  },
  {
    title: "Marco for tax — verified research",
    body:
      "Every citation is verified against the authoritative source. ITAA 1936, ITAA 1997, GST Act 1985 (NZ), Tax Administration Act 1994, Public Rulings, BR Pubs, TR / TD / GSTR series. No hallucinated authority. Verified, Unverified, and Not Found badges shown explicitly.",
  },
];

const regimes = [
  {
    name: "NZ IRD — tax agents",
    body:
      "Tax agent listing under Tax Administration Act 1994 ss124B–124M. EOT regime, agent-listed status, myIR linkage. Marco respects the listing scope and never lodges outside it.",
  },
  {
    name: "AU TPB — registered tax agents",
    body:
      "Tax Agent Services Act 2009 obligations baked in. Code of Professional Conduct items 1–14 surfaced at the workflow point where they apply. Annual declaration evidence collected as a by-product of normal work.",
  },
  {
    name: "AU TPB — BAS agents",
    body:
      "BAS agent scope respected — Marco prevents an out-of-scope lodgement attempt before it leaves the agent's screen, and surfaces the section that defines the limit so there is no ambiguity at audit.",
  },
  {
    name: "CA ANZ / CPA Australia",
    body:
      "APES 110 independence checks at engagement, APES 220 taxation services compliance, APES 305 terms-of-engagement evidence, and CPD logged automatically as research, drafting, and review hours accrue.",
  },
];

const built_in = [
  "Income Tax Act 2007 (NZ) — every Subpart and section indexed",
  "Goods and Services Tax Act 1985 (NZ) — registration, taxable supplies, zero-rating",
  "Tax Administration Act 1994 (NZ) — assessments, disputes, secrecy, penalties",
  "ITAA 1936 + ITAA 1997 (AU) — every Division and section indexed",
  "GST Act 1999 (AU) — supplies, attribution, GSTR rulings cross-linked",
  "Tax Agent Services Act 2009 (AU) and the Code of Professional Conduct",
  "IRD Public Rulings (BR Pub series) and Operational Statements",
  "ATO Public Rulings (TR, TD, GSTR, PR, CR), Practice Statements, and Decision Impact Statements",
];

export default function TaxAdvisorsPage() {
  return (
    <>
      <section className="bg-navy-500 pt-32 pb-20 sm:pt-40">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">
              Tax advisors
            </p>
            <h1 className="mt-6 font-serif text-hero text-white">
              The advisory file, finally on rails.
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-white/90">
              Tax advisory work is judgement-dense and citation-heavy. Marco
              Reid puts the client position, the authority, and the
              correspondence in one workspace — so the partner spends time on
              the judgement call, not on rebuilding the audit trail at year
              end.
            </p>
            <div className="mt-10">
              <Button href="/contact" variant="gold" size="lg">
                Talk to us about tax advisory &rarr;
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <Reveal>
            <h2 className="text-center font-serif text-display text-navy-800">
              What is wired in.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-navy-400">
              Six surfaces the advisory practice touches every week. Each one
              backed by a verified citation layer so the position is defensible
              the moment it is taken — not three years later when the IRD
              letter arrives.
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
        </Container>
      </section>

      <section className="bg-navy-50 py-20 sm:py-28">
        <Container>
          <Reveal>
            <h2 className="text-center font-serif text-display text-navy-800">
              Regulatory scope respected.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-sm text-navy-400">
              The platform knows the difference between a tax agent, a BAS
              agent, and a chartered tax adviser — and prevents an
              out-of-scope action before it is taken.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {regimes.map((r) => (
              <Reveal key={r.name} delay={0.05}>
                <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card">
                  <h3 className="font-serif text-lg text-navy-800">{r.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-500">{r.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container narrow>
          <Reveal>
            <h2 className="font-serif text-display text-navy-800">
              The library Marco actually reads from.
            </h2>
            <p className="mt-4 text-lg text-navy-400">
              When Marco answers a tax question it cites a section, a public
              ruling, or a decision — and verifies that the citation says
              what the answer claims it says. Verified, Unverified, and Not
              Found are the only three labels permitted.
            </p>
          </Reveal>
          <ul className="mt-10 space-y-3">
            {built_in.map((line) => (
              <Reveal key={line} delay={0.03}>
                <li className="flex items-start gap-3 rounded-xl border border-navy-100 bg-white p-5 text-sm text-navy-600 shadow-card">
                  <span className="mt-0.5 text-forest-500">&#10003;</span>
                  <span>{line}</span>
                </li>
              </Reveal>
            ))}
          </ul>

          <p className="mt-12 text-center text-xs text-navy-400">
            Marco Reid is a workspace for tax practitioners. It does not itself
            give tax advice. Every position released to a client is reviewed
            and signed by a tax agent or chartered tax adviser registered in
            the relevant jurisdiction.
          </p>
        </Container>
      </section>

      <section className="bg-navy-500 py-24 sm:py-32" aria-label="Get started">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-display text-white">
              The advisory practice that scales without losing the citation.
            </h2>
            <p className="mt-6 text-lg text-white/85">
              More clients, same partner, same defensibility. The audit trail
              writes itself; the partner spends the saved hours where
              judgement actually matters.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button href="/contact" variant="gold" size="lg">
                Book a walkthrough &rarr;
              </Button>
              <Button href="/accounting" variant="ghost" size="lg" className="text-white hover:text-gold-300">
                Explore Accounting
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
