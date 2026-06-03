import type { Metadata } from "next";
import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
import Reveal from "@/app/components/effects/Reveal";

export const metadata: Metadata = {
  title: "Legal practice management software by practice type — Marco Reid",
  description:
    "Marco Reid covers every legal practice area — immigration, family law, conveyancing, civil litigation, criminal law, employment, IP, corporate, personal injury, estate planning, and more. One platform. Every specialty. NZ, AU, UK, and US.",
};

const practiceTypes = [
  {
    name: "Immigration Law",
    description:
      "Visa applications, character assessments, deportation appeals, investor visas, employer sponsorships, USCIS filings, OMARA compliance. Marco handles jurisdiction-aware research across NZ, AU, UK, US, and CA immigration regimes.",
    href: "/immigration",
    available: true,
    tag: "NZ · AU · UK · US · CA",
  },
  {
    name: "Family Law",
    description:
      "Relationship property, divorce, parenting orders, adoption, domestic violence orders, financial settlements. Sensitive matter management with privilege protections and client portal access for ongoing proceedings.",
    href: "/specialties/family",
    available: true,
    tag: "NZ · AU · UK · US",
  },
  {
    name: "Property and Conveyancing",
    description:
      "Residential and commercial conveyancing, LINZ dealings, Land Registry transfers, title searches, LIM reports, settlement statements, and trust account reconciliation wired in from day one.",
    href: "/conveyancing",
    available: true,
    tag: "NZ · AU · UK",
  },
  {
    name: "Civil Litigation",
    description:
      "Pleadings, discovery, interlocutory applications, trial preparation, evidence management, and court-rules deadline calculation across district, high, and appellate courts. BAILII, NZLII, and Austlii citation-verified.",
    href: "/specialties/litigation",
    available: true,
    tag: "NZ · AU · UK · US",
  },
  {
    name: "Criminal Law",
    description:
      "Defence preparation, brief management, police disclosure handling, bail applications, sentencing submissions, and plea negotiation workflows. Matter confidentiality and client privilege enforced at the architecture level.",
    href: "/legal/practice-types",
    available: false,
    tag: "Coming soon",
  },
  {
    name: "Employment Law",
    description:
      "Personal grievance, unfair dismissal, redundancy, restraint of trade, employment agreement drafting, ERA and Employment Court filing workflows. Marco research covers ERA case law and Employment Relations Act decisions.",
    href: "/specialties/employment",
    available: true,
    tag: "NZ · AU · UK · US",
  },
  {
    name: "Intellectual Property",
    description:
      "Trademark search and filing, patent prosecution support, IP portfolio management, copyright disputes, licensing agreements. USPTO, IPONZ, IP Australia, and UKIPO databases accessible from Marco.",
    href: "/specialties/intellectual-property",
    available: true,
    tag: "NZ · AU · UK · US",
  },
  {
    name: "Corporate and Commercial",
    description:
      "Company formations, shareholder agreements, constitutional documents, M&A due diligence, commercial contracts, regulatory filings. Deed of company arrangement, Companies Act compliance across all jurisdictions.",
    href: "/specialties/commercial-corporate",
    available: true,
    tag: "NZ · AU · UK · US",
  },
  {
    name: "Personal Injury",
    description:
      "ACC levy recovery, public liability, medical negligence, and tort litigation. Settlement calculation tools, medical expert report management, and evidence bundle organisation for trial. Quantification worksheets built in.",
    href: "/legal/practice-types",
    available: false,
    tag: "Coming soon",
  },
  {
    name: "Estate Planning and Wills",
    description:
      "Wills, trusts, enduring powers of attorney, estate administration, probate applications, family trust reviews, and cross-border estate planning. Automatic asset schedule from client intake data.",
    href: "/wills",
    available: true,
    tag: "NZ · AU · UK · US",
  },
  {
    name: "Administrative and Public Law",
    description:
      "Judicial review, statutory appeals, official information requests, human rights complaints, and regulatory challenges. Administrative Tribunals and review bodies across NZ, AU, UK, and US jurisdictions.",
    href: "/legal/practice-types",
    available: false,
    tag: "Coming soon",
  },
  {
    name: "In-House Counsel",
    description:
      "Contract lifecycle management, compliance obligation tracking, outside counsel management, and business-visible matter dashboards. The platform for GCs and legal operations teams who need to move at business speed.",
    href: "/for/in-house-counsel",
    available: true,
    tag: "US · UK · AU · NZ · SG",
  },
  {
    name: "Insolvency and Restructuring",
    description:
      "Liquidation, voluntary administration, receivership, creditors' compromise, and statutory demand workflows. PPSA search and registration, insolvency register searches, and creditor communication management.",
    href: "/insolvency",
    available: true,
    tag: "NZ · AU · UK",
  },
  {
    name: "Tax Law",
    description:
      "Tax disputes, voluntary disclosures, objections, challenges to assessments, and transfer-pricing disputes. Marco's tax research covers IRD, ATO, IRS, and HMRC rulings, TIBs, and binding public rulings.",
    href: "/legal/practice-types",
    available: false,
    tag: "Coming soon",
  },
  {
    name: "Environmental Law",
    description:
      "Resource consents, RMA appeals, climate regulation compliance, environmental enforcement defence, and iwi consultation documentation. Environment Court and Planning Tribunal workflows built in for NZ practice.",
    href: "/legal/practice-types",
    available: false,
    tag: "Coming soon",
  },
  {
    name: "Elder Law",
    description:
      "Enduring powers of attorney, elder abuse, aged care facility agreements, retirement village contracts, estate disputes, and capacity assessments. Specialist workflows for practitioners serving older clients.",
    href: "/legal/practice-types",
    available: false,
    tag: "Coming soon",
  },
];

const audienceLinks = [
  {
    label: "For barristers",
    href: "/for/barristers",
    description: "UK, AU, and NZ barristers' chambers",
  },
  {
    label: "For solicitors",
    href: "/for/solicitors",
    description: "UK, NZ, and AU solicitor firms",
  },
  {
    label: "For attorneys",
    href: "/for-attorneys",
    description: "US law firms and solo practitioners",
  },
  {
    label: "For in-house counsel",
    href: "/for/in-house-counsel",
    description: "GCs and corporate legal teams",
  },
  {
    label: "For immigration advisers",
    href: "/immigration-advisers",
    description: "Licensed immigration advisers (NZ, AU, UK)",
  },
];

const availableCount = practiceTypes.filter((p) => p.available).length;
const comingSoonCount = practiceTypes.filter((p) => !p.available).length;

export default function PracticeTypesPage() {
  return (
    <>
      <section className="bg-navy-500 pt-32 pb-20 sm:pt-40">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">
              By practice type
            </p>
            <h1 className="mt-6 font-serif text-hero text-white">
              Every practice area your firm handles. One platform.
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-white/90">
              {availableCount} practice areas live. {comingSoonCount} more in
              development. Across New Zealand, Australia, the United Kingdom,
              and the United States. Marco Reid is not a generic legal platform
              with practice settings bolted on — every area has its own
              workflow, vocabulary, compliance obligations, and research
              database built in.
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
                Book a walkthrough
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-forest-600">
              Practice areas
            </p>
            <h2 className="mt-4 font-serif text-display text-navy-800">
              Find your practice area.
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-navy-400">
              Each card links to the deep module for that area. Live areas
              have full functionality now. Coming soon areas are in active
              development — join the waitlist and you&rsquo;ll be first.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {practiceTypes.map((pt) => (
              <Reveal key={pt.name} delay={0.04}>
                <a
                  href={pt.href}
                  className={`group flex h-full flex-col rounded-2xl border p-6 shadow-card transition-all duration-300 ${
                    pt.available
                      ? "border-navy-100 bg-white hover:shadow-card-hover hover:-translate-y-0.5 hover:border-gold-200"
                      : "border-navy-100 bg-navy-50 cursor-default"
                  }`}
                  aria-label={pt.available ? `${pt.name} — ${pt.description}` : `${pt.name} — coming soon`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className={`font-serif text-base leading-snug ${pt.available ? "text-navy-800" : "text-navy-400"}`}>
                      {pt.name}
                    </h3>
                    {pt.available ? (
                      <span className="mt-0.5 shrink-0 rounded-full bg-forest-50 px-2 py-0.5 text-xs font-semibold text-forest-700">
                        Live
                      </span>
                    ) : (
                      <span className="mt-0.5 shrink-0 rounded-full bg-navy-100 px-2 py-0.5 text-xs font-medium text-navy-400">
                        Soon
                      </span>
                    )}
                  </div>
                  <p className={`mt-3 flex-1 text-sm leading-relaxed ${pt.available ? "text-navy-500" : "text-navy-400"}`}>
                    {pt.description}
                  </p>
                  <p className={`mt-4 text-xs font-medium ${pt.available ? "text-gold-600" : "text-navy-300"}`}>
                    {pt.tag}
                  </p>
                </a>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-navy-50 py-20 sm:py-28">
        <Container>
          <Reveal>
            <h2 className="text-center font-serif text-display text-navy-800">
              Or find your audience page.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-navy-400">
              Practice area pages cover the work. Audience pages cover
              the professional — the compliance obligations, the regulatory
              bodies, and the billing and trust account rules that govern
              how you practise, not just what you practise.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {audienceLinks.map((a) => (
              <Reveal key={a.label} delay={0.05}>
                <a
                  href={a.href}
                  className="group flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5 hover:border-gold-200"
                >
                  <h3 className="font-serif text-lg text-navy-800 group-hover:text-navy-900">
                    {a.label}
                  </h3>
                  <p className="mt-2 text-sm text-navy-400">{a.description}</p>
                  <p className="mt-4 text-sm font-semibold text-forest-600">
                    See the page &rarr;
                  </p>
                </a>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container narrow>
          <Reveal>
            <h2 className="text-center font-serif text-display text-navy-800">
              What makes Marco Reid different across every practice area.
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            <Reveal delay={0.05}>
              <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
                <h3 className="font-serif text-lg text-navy-800">Citation-verified research</h3>
                <p className="mt-3 text-sm leading-relaxed text-navy-500">
                  Every case citation verified against CourtListener, BAILII,
                  NZLII, and Austlii before it appears in any document or
                  research output. The Mata v. Avianca failure mode — AI citing
                  cases that don&rsquo;t exist — is the specific problem Marco
                  Reid is engineered to prevent.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
                <h3 className="font-serif text-lg text-navy-800">Compliance wired in, not bolted on</h3>
                <p className="mt-3 text-sm leading-relaxed text-navy-500">
                  SRA Accounts Rules. NZLS Client Fund Rules. AML/CFT
                  obligations. APES 310 client monies. Every professional
                  obligation that applies to your practice area and
                  jurisdiction is baked into the workflow — not a checklist
                  you maintain separately.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.11}>
              <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
                <h3 className="font-serif text-lg text-navy-800">Voice trained for your vocabulary</h3>
                <p className="mt-3 text-sm leading-relaxed text-navy-500">
                  Immigration vocabulary. Conveyancing vocabulary. IP
                  vocabulary. Employment vocabulary. Marco Reid Voice is
                  trained on the terminology each practice area actually
                  uses — not a general-purpose transcription engine that
                  corrects your Latin into plain English.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <p className="mx-auto mt-12 max-w-2xl rounded-2xl border border-navy-100 bg-navy-50 p-6 text-sm leading-relaxed text-navy-500">
              <strong className="text-navy-700">Research disclaimer:</strong> Marco
              is an AI research tool. All outputs must be verified by a qualified
              professional before reliance. Marco Reid does not provide legal
              advice. It provides research and drafting tools for legal
              professionals, who retain full professional responsibility for
              every output they rely on and every advice they give.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="bg-navy-50 py-20 sm:py-28">
        <Container narrow>
          <Reveal>
            <h2 className="text-center font-serif text-display text-navy-800">
              Don&rsquo;t see your practice area?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-navy-400">
              The list above covers the most common areas. We add practice
              types as firms onboard who practise them. Tell us what you
              need — we build it with the same rigour every other area carries.
            </p>
          </Reveal>
          <p className="mt-8 text-center">
            <a
              href="/contact"
              className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-navy-200 bg-white px-6 py-3 text-sm font-semibold text-navy-700 shadow-sm transition-all hover:border-gold-300 hover:shadow-md"
            >
              Request a practice area &rarr;
            </a>
          </p>
        </Container>
      </section>

      <section className="bg-navy-500 py-24 sm:py-32" aria-label="Get started">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-display text-white">
              From $99/month. Every practice area. No lock-in.
            </h2>
            <p className="mt-6 text-lg text-white/85">
              Every firm that joins the founding cohort gets founding-cohort
              pricing locked for life, first access to new practice area
              modules, and direct input into the feature roadmap. The platform
              is built by professionals who understand the practice. Join them.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button href="/trial" variant="gold" size="lg">
                Start free trial &rarr;
              </Button>
              <Button
                href="/pricing"
                variant="ghost"
                size="lg"
                className="text-white hover:text-gold-300"
              >
                See pricing &rarr;
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
