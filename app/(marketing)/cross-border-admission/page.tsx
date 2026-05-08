import type { Metadata } from "next";
import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
import Reveal from "@/app/components/effects/Reveal";

export const metadata: Metadata = {
  title:
    "Cross-border admission — get licensed in NZ + AU + UK + US",
  description:
    "Marco Reid is the visa office for professionals. NZ lawyers admitted in AU under TTMRA, England via SQE, US via state reciprocity. Accountants via CA ANZ ↔ ICAEW MRA, CPA Australia, AICPA. Multi-jurisdictional practice on rails.",
};

interface PathwayBlock {
  fromLabel: string;
  toLabel: string;
  pathwayName: string;
  authority: string;
  steps: ReadonlyArray<string>;
  typicalTimeline: string;
  fees: string;
  notes?: string;
}

const LEGAL_PATHWAYS: PathwayBlock[] = [
  {
    fromLabel: "NZ-admitted lawyer",
    toLabel: "Australian admission",
    pathwayName: "TTMRA — Trans-Tasman Mutual Recognition",
    authority:
      "Trans-Tasman Mutual Recognition Act 1997 (NZ) + Trans-Tasman Mutual Recognition Act 1997 (Cth)",
    steps: [
      "Apply for admission to the Supreme Court of the relevant Australian state/territory (NSW, Vic, Qld etc.)",
      "Submit certificates of admission + good standing from NZLS",
      "Provide identity + character documentation",
      "No re-examination required under TTMRA — admission is recognised on the same terms as the equivalent local qualification",
      "Apply to the relevant law society for a practising certificate",
    ],
    typicalTimeline: "8–12 weeks",
    fees: "AUD 700–2,000 depending on state",
    notes:
      "TTMRA does not require local supplementary study. Different states have minor procedural variations.",
  },
  {
    fromLabel: "AU-admitted lawyer",
    toLabel: "NZ admission",
    pathwayName: "TTMRA — Trans-Tasman Mutual Recognition (reverse)",
    authority:
      "Lawyers and Conveyancers Act 2006 (NZ) + Trans-Tasman Mutual Recognition Act 1997",
    steps: [
      "Apply to the New Zealand Council of Legal Education for admission",
      "Submit Australian admission certificate + practising certificate + good-standing letter",
      "Identity + character checks",
      "Admission to the High Court of New Zealand",
      "Apply to NZLS for a practising certificate",
    ],
    typicalTimeline: "6–10 weeks",
    fees: "NZD 800–1,500",
  },
  {
    fromLabel: "NZ or AU-admitted lawyer",
    toLabel: "England & Wales (solicitor)",
    pathwayName: "SQE — Solicitors Qualifying Examination",
    authority: "Solicitors Regulation Authority (SRA) under Legal Services Act 2007",
    steps: [
      "Confirm eligibility under SRA's Qualified Lawyers Transfer regime — most NZ + AU lawyers are exempt from SQE1 if they have at least 2 years of qualifying work experience",
      "Pass SQE2 — practical legal skills assessment (typically 6 months prep)",
      "Demonstrate 2 years of Qualifying Work Experience (QWE) — overseas experience usually counts",
      "Complete the SRA character + suitability assessment",
      "Apply for admission as a solicitor of England and Wales",
    ],
    typicalTimeline: "6–18 months",
    fees: "GBP 4,800–6,500 (SQE fees + admission)",
    notes:
      "QLTS scheme replaced by SQE in 2021. Overseas-qualified lawyers no longer have a single transfer test — they sit SQE2 (and sometimes SQE1 if scope is too narrow).",
  },
  {
    fromLabel: "NZ or AU-admitted lawyer",
    toLabel: "US (varies by state)",
    pathwayName: "State bar reciprocity / Uniform Bar Examination",
    authority: "State bar admission rules (varies by state)",
    steps: [
      "Identify a target state. UBE states accept transferred UBE scores; non-UBE states require a state-specific bar exam.",
      "Some states (NY, CA, Connecticut, others) admit foreign-qualified lawyers without re-sitting the exam if from an LL.M. graduate of an ABA-accredited US law school",
      "Common path for NZ + AU lawyers: 1-year US LL.M. (online or in-person) → eligibility to sit NY or CA bar",
      "Pass the bar exam (UBE or state-specific) + MPRE (multistate professional responsibility examination)",
      "Character + fitness investigation",
    ],
    typicalTimeline: "12–24 months (LL.M. + bar exam path)",
    fees: "USD 25,000–80,000 (LL.M. tuition + exam fees)",
    notes:
      "Each state has its own admission rules. Marco Reid's eligibility checker walks through the state-by-state options based on the practitioner's existing qualifications.",
  },
];

const ACCOUNTING_PATHWAYS: PathwayBlock[] = [
  {
    fromLabel: "CA ANZ member",
    toLabel: "ICAEW (UK)",
    pathwayName: "ICAEW Mutual Recognition Agreement",
    authority: "ICAEW Recognition of Prior Learning + MRA with CA ANZ",
    steps: [
      "Apply via ICAEW's Pathways for Members of Recognised Bodies",
      "Pass the ICAEW Tax Compliance + Audit & Assurance papers (or hold equivalent)",
      "Demonstrate continuing professional development",
      "Pay ICAEW membership + admission fees",
      "Receive ICAEW Chartered Accountant (FCA / ACA) status",
    ],
    typicalTimeline: "6–12 months",
    fees: "GBP 1,500–3,500",
  },
  {
    fromLabel: "CA ANZ member",
    toLabel: "AICPA / state CPA (US)",
    pathwayName: "International Qualification Examination (IQEX)",
    authority: "NASBA + state boards of accountancy",
    steps: [
      "Confirm CA ANZ MRA eligibility (currently held with some state boards via NASBA)",
      "Pass IQEX — a single, condensed exam covering US-specific accounting rules",
      "Apply to a state board of accountancy for CPA licensure",
      "State-by-state: some states (Guam, Washington) recognise CA ANZ via IQEX directly; others require additional state-specific work experience",
      "Receive state CPA licence",
    ],
    typicalTimeline: "6–18 months depending on state",
    fees: "USD 1,000–4,000 (IQEX + state fees)",
    notes:
      "Verify the current MRA status of the target state board with NASBA before starting.",
  },
  {
    fromLabel: "CA ANZ member",
    toLabel: "CPA Canada",
    pathwayName: "CPA Canada — CA ANZ Mutual Recognition Agreement",
    authority: "CPA Canada + provincial bodies (CPA Ontario, CPA BC etc.)",
    steps: [
      "Apply to the relevant CPA Canada provincial body",
      "Submit CA ANZ membership letter + good-standing certificate",
      "Pass the Canadian Reciprocity Examination (CRE) — covers Canadian tax + audit specifics",
      "Provincial body admission",
    ],
    typicalTimeline: "4–9 months",
    fees: "CAD 1,500–3,000",
  },
  {
    fromLabel: "AU TPB Tax Agent",
    toLabel: "NZ IRD-listed Tax Agent",
    pathwayName: "Inland Revenue agent listing",
    authority: "Tax Administration Act 1994 ss 124B–124M",
    steps: [
      "Demonstrate fitness + propriety (no relevant criminal record)",
      "Hold appropriate qualifications + practical experience",
      "Submit IR 23BS Tax Agent listing application",
      "PI insurance evidence required",
      "Listed by IRD on the agent register",
    ],
    typicalTimeline: "4–8 weeks",
    fees: "Free (IRD does not charge for listing)",
    notes:
      "AU TPB registration counts as relevant qualification. NZ-specific tax knowledge demonstrated via CPD or supervised work.",
  },
];

const HOW_HELPS = [
  {
    title: "Eligibility checker",
    body:
      "Plain-English intake captures your existing qualifications, jurisdictions of admission, year of admission, and target jurisdiction. Marco identifies the applicable pathway in seconds.",
  },
  {
    title: "Document pack assembly",
    body:
      "Good-standing letters, character certificates, transcripts, evidence of QWE — Marco generates the request templates, tracks the responses, and assembles the application pack.",
  },
  {
    title: "Application drafting",
    body:
      "SRA SQE applications, NASBA IQEX registrations, state bar applications, ICAEW MRA forms, CPA Canada CRE registrations — all drafted from your intake, signed off by a Marco Reid mentor with the relevant credential.",
  },
  {
    title: "Mentor matching",
    body:
      "We pair you with a Marco Reid member who has already made the pathway you're attempting (NZ→UK SQE, AU→US bar, CA ANZ→ICAEW). Real-time guidance through the gotchas.",
  },
  {
    title: "Audit trail",
    body:
      "Every submitted document, every confirmation receipt, every regulator response logged in RegulatorFiling + AuditLog. If a year later the regulator asks why you submitted X, you have the answer.",
  },
  {
    title: "Practice management once admitted",
    body:
      "Once you're admitted in a new jurisdiction, your Firm tenancy in Marco Reid extends automatically. Trust accounts, court rules, sign-off rails — all keyed to the new jurisdiction.",
  },
];

function PathwayCard({ p }: { p: PathwayBlock }) {
  return (
    <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card sm:p-7">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-md border border-navy-200 bg-navy-50 px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-navy-700">
          {p.fromLabel}
        </span>
        <span className="text-navy-400">&rarr;</span>
        <span className="rounded-md bg-gold-50 px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-gold-700">
          {p.toLabel}
        </span>
      </div>

      <h3 className="mt-4 font-serif text-xl text-navy-800">{p.pathwayName}</h3>
      <p className="mt-2 font-mono text-xs text-navy-500">{p.authority}</p>

      <div className="mt-5">
        <p className="text-xs font-bold uppercase tracking-wider text-forest-600">
          Steps
        </p>
        <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-sm text-navy-600">
          {p.steps.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-forest-600">
            Timeline
          </p>
          <p className="mt-1 text-sm text-navy-700">{p.typicalTimeline}</p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-forest-600">
            Indicative fees
          </p>
          <p className="mt-1 text-sm text-navy-700">{p.fees}</p>
        </div>
      </div>

      {p.notes && (
        <p className="mt-4 rounded-lg border border-navy-100 bg-navy-50/60 p-3 text-xs leading-relaxed text-navy-500">
          <strong className="text-navy-700">Note:</strong> {p.notes}
        </p>
      )}
    </div>
  );
}

export default function CrossBorderAdmissionPage() {
  return (
    <>
      <section className="bg-navy-500 pt-32 pb-20 sm:pt-40">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">
              Cross-border admission
            </p>
            <h1 className="mt-6 font-serif text-hero text-white">
              Marco Reid is the visa office for professionals.
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-white/90">
              An NZ lawyer can be admitted in Australia in eight weeks under
              TTMRA. England and Wales in twelve months under SQE. New York
              in twenty-four with an LL.M. + UBE. Marco Reid runs the
              pathway end-to-end &mdash; eligibility check, document pack,
              application drafting, regulator filings, mentor matching.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button href="/contact" variant="gold" size="lg">
                Start your assessment &rarr;
              </Button>
              <Button
                href="/for-attorneys"
                variant="ghost"
                size="lg"
                className="text-white hover:text-gold-300"
              >
                For attorneys
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <Reveal>
            <h2 className="text-center font-serif text-display text-navy-800">
              Legal-side pathways.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-navy-400">
              The four highest-volume cross-admission corridors. Other
              pathways available on request &mdash; we add the
              authority + step list to the platform when a member asks.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {LEGAL_PATHWAYS.map((p) => (
              <Reveal key={p.pathwayName} delay={0.05}>
                <PathwayCard p={p} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-navy-50 py-20 sm:py-28">
        <Container>
          <Reveal>
            <h2 className="text-center font-serif text-display text-navy-800">
              Accounting-side pathways.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-navy-400">
              CA ANZ to ICAEW, AICPA, CPA Canada, and the inverse for tax
              agents. The MRA mesh is denser on the accounting side &mdash;
              expansion is generally faster than legal.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {ACCOUNTING_PATHWAYS.map((p) => (
              <Reveal key={p.pathwayName} delay={0.05}>
                <PathwayCard p={p} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <Reveal>
            <h2 className="text-center font-serif text-display text-navy-800">
              How Marco Reid runs the pathway.
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {HOW_HELPS.map((h) => (
              <Reveal key={h.title} delay={0.05}>
                <div className="flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
                  <h3 className="font-serif text-lg text-navy-800">{h.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy-500">
                    {h.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <p className="mx-auto mt-12 max-w-2xl text-center text-xs text-navy-400">
            Pathway content is informational. Each member of a regulated
            profession remains responsible for their own admission
            application + character + fitness disclosures. Marco Reid is a
            tooling vendor; the regulator decides admission.
          </p>
        </Container>
      </section>

      <section className="bg-navy-500 py-24 sm:py-32" aria-label="Get started">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-display text-white">
              Geographic monopoly is over.
            </h2>
            <p className="mt-6 text-lg text-white/85">
              An NZ-only practice is an NZ-only opportunity. Marco Reid
              turns one admission into four. Same client base, four times
              the revenue surface, identical sign-off discipline across
              every jurisdiction.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button href="/contact" variant="gold" size="lg">
                Talk to us &rarr;
              </Button>
              <Button
                href="/for-accountants"
                variant="ghost"
                size="lg"
                className="text-white hover:text-gold-300"
              >
                For accountants
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
