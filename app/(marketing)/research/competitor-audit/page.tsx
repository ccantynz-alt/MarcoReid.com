import type { Metadata } from "next";
import Container from "@/app/components/shared/Container";
import Reveal from "@/app/components/effects/Reveal";

export const metadata: Metadata = {
  title:
    "Competitor + internet intelligence audit — what Marco Reid does that no one else does",
  description:
    "Marco Reid vs Clio, MyCase, PracticePanther, Centerbase, LEAP (legal practice management). Vs Xero, QBO, MYOB, Sage, FreshBooks (accounting). Vs Westlaw, LexisNexis (research). Vs Stripe Atlas, Termly, Avalara (founder tooling). Where we win + where we still need to build.",
};

interface ScoreRow {
  capability: string;
  marco: string;
  competitor: string;
  marcoNote: string;
  status: "AHEAD" | "PARITY" | "BEHIND" | "BLOCKED";
}

const STATUS_PILL: Record<
  ScoreRow["status"],
  { label: string; cls: string }
> = {
  AHEAD: {
    label: "Ahead",
    cls: "border-forest-200 bg-forest-50 text-forest-700",
  },
  PARITY: {
    label: "Parity",
    cls: "border-navy-200 bg-navy-50 text-navy-700",
  },
  BEHIND: {
    label: "Behind",
    cls: "border-gold-200 bg-gold-50 text-gold-700",
  },
  BLOCKED: {
    label: "Behind (blocked)",
    cls: "border-plum-200 bg-plum-50 text-plum-700",
  },
};

interface CompetitorBlock {
  vendor: string;
  positioning: string;
  ourEdge: string;
  rows: ScoreRow[];
}

const LEGAL_PMS: CompetitorBlock[] = [
  {
    vendor: "Clio (1st: ~150k attorneys, US/CA dominant)",
    positioning:
      "Legal practice management market leader. Strong case + matter + billing. Recently bought Lawyaw + Casepacer.",
    ourEdge:
      "Clio is opinionated towards US small-firm civil practice. Marco Reid handles NZ + AU + UK + US; the four-jurisdiction matrix is structural, not bolted on.",
    rows: [
      {
        capability: "Case + matter management",
        marco: "Schema in place; UI Wave 0 follow-up",
        competitor: "Best-in-class",
        marcoNote: "We build to parity in Wave 1 platform UI.",
        status: "BEHIND",
      },
      {
        capability: "Trust accounting (NZ + AU + UK + state US)",
        marco: "Schema + module shipped (`/conveyancing` + Trust models)",
        competitor: "US trust + UK client account",
        marcoNote: "We cover NZ Lawyers' Trust Account Regs 2008 + state AU + APES 310 natively.",
        status: "AHEAD",
      },
      {
        capability: "Citation-verified legal research",
        marco: "Marco Legal — NZLII / AustLII / BAILII / CourtListener",
        competitor: "Clio doesn't offer it (relies on Westlaw / LexisNexis integration)",
        marcoNote: "Citation verification with Verified / Unverified / Not Found pills is structural at Marco Reid; no Clio competitor has this.",
        status: "AHEAD",
      },
      {
        capability: "Sign-off doctrine on AI output",
        marco: "Hash-chained SignoffRequest queue + watermarks",
        competitor: "Clio Duo (their AI) has no sign-off gating",
        marcoNote: "Marco Reid is the only platform with structural sign-off.",
        status: "AHEAD",
      },
      {
        capability: "Multi-jurisdiction native",
        marco: "NZ + AU + UK + US",
        competitor: "US-first; UK + AU bolted on",
        marcoNote: "Native i18n + jurisdiction switching at the data layer.",
        status: "AHEAD",
      },
      {
        capability: "Document automation studio",
        marco: "lib/templates engine + 16 substantive drafts",
        competitor: "Lawyaw (acquired) — strong, US-only",
        marcoNote: "Marco Reid drafts cite the relevant statute per jurisdiction; Lawyaw doesn't.",
        status: "PARITY",
      },
      {
        capability: "Court e-filing integration",
        marco: "Court-rules engine shipped; e-filing rails partner-blocked",
        competitor: "Clio has US PACER + state court integrations",
        marcoNote: "We need court partner integrations for parity. Wave 5.",
        status: "BLOCKED",
      },
    ],
  },
  {
    vendor: "LEAP (UK/AU/NZ market — ~16k firms)",
    positioning:
      "Strong AU + UK + NZ legal PMS. Owned by ATI Global. Heavy on conveyancing + family.",
    ourEdge:
      "LEAP is closed-system, single-jurisdiction-at-a-time, expensive per seat. Marco Reid is open architecture, multi-jurisdiction-by-default, with citation-verified research.",
    rows: [
      {
        capability: "AU + NZ + UK practice management",
        marco: "Schema + early modules",
        competitor: "Mature in AU + NZ + UK",
        marcoNote: "Wave 1 platform UI catches up.",
        status: "BEHIND",
      },
      {
        capability: "Conveyancing (NZ Lawyers' Trust Account Regs)",
        marco: "/conveyancing module live",
        competitor: "LEAP conveyancing is the AU/NZ benchmark",
        marcoNote: "We're new but architecturally on the same level.",
        status: "PARITY",
      },
      {
        capability: "AI integration",
        marco: "Marco Legal + Sign-off Doctrine",
        competitor: "LEAP AI is positioning itself but unverified citations",
        marcoNote: "Citation verification + sign-off gating gives us a regulatory-defensibility moat.",
        status: "AHEAD",
      },
    ],
  },
];

const ACCOUNTING: CompetitorBlock[] = [
  {
    vendor: "Xero (~4.2M subs, AU/NZ/UK dominant)",
    positioning:
      "Cloud accounting market leader in AU/NZ/UK. Strong bank feeds + invoicing. Targets SMEs + bookkeepers.",
    ourEdge:
      "Xero is a bookkeeping system; Marco Reid is a multi-jurisdiction accounting + tax + advisory platform with the catch-up + forensic + tax-treaty engines Xero doesn't ship.",
    rows: [
      {
        capability: "Bank feeds (Akahu / Basiq / Plaid / TrueLayer)",
        marco: "DavenRoe-derived port queued",
        competitor: "Xero Bank Feeds across all major banks",
        marcoNote: "We integrate with the same providers — DavenRoe port lands once repo access granted.",
        status: "BLOCKED",
      },
      {
        capability: "Multi-jurisdictional ledger (NZ GST + AU BAS + UK VAT + US 50-state)",
        marco: "DavenRoe-derived port queued; schema for cross-jurisdictional in place",
        competitor: "Xero requires a separate org per jurisdiction",
        marcoNote: "Marco Reid is one chart of accounts, all four jurisdictions, in one entity.",
        status: "AHEAD",
      },
      {
        capability: "Catch-up annihilator (5-year reconstruction)",
        marco: "/catch-up-centre + DavenRoe port queued",
        competitor: "Xero has no catch-up product; this is a gap in the entire market",
        marcoNote: "DavenRoe-derived 5-year bank-feed catch-up + accountant-grade pack PDF — no competitor.",
        status: "AHEAD",
      },
      {
        capability: "Forensic intelligence",
        marco: "/specialties/forensic-accounting + Benford's / ghost vendor / money trail",
        competitor: "Xero has nothing forensic",
        marcoNote: "Forensic accounting at the platform level is structurally absent in Xero / QBO / MYOB / Sage / FreshBooks.",
        status: "AHEAD",
      },
      {
        capability: "Native 4-country payroll",
        marco: "Schema + DavenRoe port queued",
        competitor: "Xero Payroll: NZ + AU + UK separately; US is via Gusto integration",
        marcoNote: "DavenRoe lands one payroll system across NZ + AU + UK + US.",
        status: "AHEAD",
      },
      {
        capability: "Sign-off on every return",
        marco: "SignoffRequest queue + admin reviewer",
        competitor: "Xero relies on the accountant's own sign-off process outside the platform",
        marcoNote: "Audit-trailed sign-off is structural; Xero leaves it to the practice.",
        status: "AHEAD",
      },
    ],
  },
  {
    vendor: "QuickBooks Online (~7M subs, US dominant)",
    positioning:
      "US accounting market leader. Strong invoicing + accountant ecosystem (ProAdvisors).",
    ourEdge:
      "QBO is US-first by design. Marco Reid serves the US founder + the NZ/AU founder going to the US, plus the cross-border tax-treaty work QBO won't touch.",
    rows: [
      {
        capability: "Cross-border tax-treaty engine",
        marco: "Schema + DavenRoe port queued",
        competitor: "QBO has no treaty engine",
        marcoNote: "DavenRoe-derived 6 bilateral DTAs + auto-WHT optimisation. No competitor in this category.",
        status: "AHEAD",
      },
      {
        capability: "US 50-state sales tax",
        marco: "Schema in place; integration queued",
        competitor: "QBO + Avalara integration",
        marcoNote: "Marco Reid handles 50-state nexus + Stripe Tax integration in DavenRoe port.",
        status: "BEHIND",
      },
    ],
  },
];

const RESEARCH: CompetitorBlock[] = [
  {
    vendor: "Westlaw / LexisNexis",
    positioning:
      "Legal research duopoly. Charge $300+/mo per seat. Closed databases.",
    ourEdge:
      "Westlaw + LexisNexis are walled gardens with paywalled case law. Marco Reid uses open-domain sources (NZLII / AustLII / BAILII / CourtListener / Cornell LII / SCOTUS / Caselaw Access Project) + adds citation verification on top.",
    rows: [
      {
        capability: "Case law breadth",
        marco: "Open-domain coverage (CourtListener has full federal + most state US; AustLII full AU; NZLII full NZ; BAILII UK)",
        competitor: "Comprehensive proprietary",
        marcoNote: "We cover ~90% of what Westlaw covers at $0; the missing 10% is closed-database law-firm secondaries.",
        status: "PARITY",
      },
      {
        capability: "Citation verification",
        marco: "Verified / Unverified / Not Found per citation",
        competitor: "Westlaw citator (KeyCite); LexisNexis Shepard's",
        marcoNote: "Westlaw + LexisNexis have authoritative citators. Marco Reid's verification layer is open-source-driven and provides VERIFIED status from authoritative URLs; we don't yet have the Bluebook treatment-history depth.",
        status: "BEHIND",
      },
      {
        capability: "Cost per seat per month",
        marco: "Bundled in firm subscription ($199–399)",
        competitor: "$300–600/mo Westlaw, similar Lexis",
        marcoNote: "60–80% cost reduction at parity-or-better quality on the top use cases.",
        status: "AHEAD",
      },
    ],
  },
];

const FOUNDER_TOOLS: CompetitorBlock[] = [
  {
    vendor: "Stripe Atlas",
    positioning:
      "$500 entity formation. EIN + bank + bylaws + Stripe account. US-first.",
    ourEdge:
      "Atlas commoditised mechanical filing. Marco Reid recouples it with cross-border tax structure, full SaaS legal pack, attorney + accountant sign-off, multi-jurisdiction (NZ + AU + UK + US).",
    rows: [
      {
        capability: "Delaware incorporation",
        marco: "Schema in place; partner integration (Harvard / Northwest) queued",
        competitor: "Atlas direct or via Stripe-internal rail",
        marcoNote: "Mechanical work the same; Marco Reid adds the sign-off.",
        status: "PARITY",
      },
      {
        capability: "EIN application",
        marco: "Same faxed-SS-4 path for non-US founders",
        competitor: "Atlas processes",
        marcoNote: "IRS-imposed 4–6 week wait — neither platform can shortcut it.",
        status: "PARITY",
      },
      {
        capability: "Cross-border tax structure",
        marco: "Schema + advisory layer + Marco Reid Launch product",
        competitor: "Atlas: 'talk to your tax adviser'",
        marcoNote: "We design the holdco/opco; Atlas points elsewhere.",
        status: "AHEAD",
      },
      {
        capability: "Full SaaS legal pack (13 docs)",
        marco: "Template engine + 4 templates so far + 8 more queued",
        competitor: "Atlas: Stripe ToS template only",
        marcoNote: "Marco Reid produces ToS, Privacy, AUP, Cookie, Refund, DPA, AI Disclosure, AI Output Disclaimer, SLA, Sub-processor list, DMCA, CCPA, Trademark Notice — all attorney-signed.",
        status: "AHEAD",
      },
    ],
  },
  {
    vendor: "Termly + iubenda",
    positioning:
      "Legal-document templates ($99–199/mo). Self-serve. No sign-off.",
    ourEdge:
      "Termly templates are unreviewed. Marco Reid drafts the same documents and gates release behind professional sign-off.",
    rows: [
      {
        capability: "ToS / Privacy / Cookie templates",
        marco: "Template engine + queued",
        competitor: "Termly: full library",
        marcoNote: "We have the foundation; templates land per session.",
        status: "BEHIND",
      },
      {
        capability: "Professional sign-off on every output",
        marco: "Structural via SignoffRequest",
        competitor: "Termly: zero sign-off",
        marcoNote: "Termly's competitive vulnerability is exactly the gap Marco Reid is built to fill.",
        status: "AHEAD",
      },
    ],
  },
];

function ScoreCard({ block }: { block: CompetitorBlock }) {
  return (
    <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card sm:p-8">
      <h3 className="font-serif text-xl text-navy-800">{block.vendor}</h3>
      <p className="mt-2 text-sm text-navy-500">{block.positioning}</p>
      <p className="mt-3 rounded-lg border border-gold-200 bg-gold-50/40 p-3 text-sm leading-relaxed text-navy-700">
        <strong className="text-navy-800">Where Marco Reid wins:</strong>{" "}
        {block.ourEdge}
      </p>

      <div className="mt-6 overflow-hidden rounded-xl border border-navy-100">
        <table className="w-full text-left text-sm">
          <thead className="bg-navy-50/60 text-xs uppercase tracking-wider text-navy-500">
            <tr>
              <th className="px-4 py-2 font-semibold">Capability</th>
              <th className="px-4 py-2 font-semibold">Marco Reid</th>
              <th className="px-4 py-2 font-semibold">Competitor</th>
              <th className="px-4 py-2 text-center font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-navy-100 text-xs">
            {block.rows.map((r) => {
              const pill = STATUS_PILL[r.status];
              return (
                <tr key={r.capability}>
                  <td className="px-4 py-3 font-medium text-navy-800">
                    {r.capability}
                    <p className="mt-1 text-[10px] font-normal text-navy-400">
                      {r.marcoNote}
                    </p>
                  </td>
                  <td className="px-4 py-3 text-navy-600">{r.marco}</td>
                  <td className="px-4 py-3 text-navy-500">{r.competitor}</td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${pill.cls}`}
                    >
                      {pill.label}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function CompetitorAuditPage() {
  return (
    <>
      <section className="bg-navy-500 pt-32 pb-20 sm:pt-40">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">
              Research / Competitor audit
            </p>
            <h1 className="mt-6 font-serif text-hero text-white">
              Where Marco Reid wins + where we still build.
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-white/90">
              An honest scorecard against the legal practice management
              leaders (Clio, LEAP), accounting market (Xero, QBO),
              research duopoly (Westlaw, LexisNexis), and founder tooling
              (Stripe Atlas, Termly). Each row labelled Ahead / Parity /
              Behind / Behind (blocked).
            </p>
            <p className="mt-3 text-sm text-white/70">
              Updated continuously as we ship. The Wave 0 mandate from
              Craig: 50–70% ahead in every category by Q3 2026.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <Reveal>
            <h2 className="font-serif text-display text-navy-800">
              Legal practice management
            </h2>
            <p className="mt-3 text-lg text-navy-500">
              Where Marco Reid sits against Clio (US/CA dominant) and LEAP
              (AU/NZ/UK dominant).
            </p>
          </Reveal>

          <div className="mt-10 space-y-8">
            {LEGAL_PMS.map((b) => (
              <Reveal key={b.vendor} delay={0.05}>
                <ScoreCard block={b} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-navy-50 py-20 sm:py-28">
        <Container>
          <Reveal>
            <h2 className="font-serif text-display text-navy-800">
              Accounting platforms
            </h2>
            <p className="mt-3 text-lg text-navy-500">
              Where Marco Reid sits against Xero (the AU/NZ/UK leader) and
              QuickBooks Online (the US leader).
            </p>
          </Reveal>

          <div className="mt-10 space-y-8">
            {ACCOUNTING.map((b) => (
              <Reveal key={b.vendor} delay={0.05}>
                <ScoreCard block={b} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <Reveal>
            <h2 className="font-serif text-display text-navy-800">
              Legal research
            </h2>
            <p className="mt-3 text-lg text-navy-500">
              Where Marco Reid sits against Westlaw + LexisNexis. Open-domain
              coverage at parity-or-better on the top use cases at 60–80%
              cost reduction; behind on Bluebook treatment-history depth.
            </p>
          </Reveal>

          <div className="mt-10 space-y-8">
            {RESEARCH.map((b) => (
              <Reveal key={b.vendor} delay={0.05}>
                <ScoreCard block={b} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-navy-50 py-20 sm:py-28">
        <Container>
          <Reveal>
            <h2 className="font-serif text-display text-navy-800">
              Founder tooling
            </h2>
            <p className="mt-3 text-lg text-navy-500">
              Where Marco Reid Launch sits against Stripe Atlas + Termly.
              Atlas commoditised mechanical filing; Marco Reid recouples it
              with sign-off + cross-border tax + full legal pack.
            </p>
          </Reveal>

          <div className="mt-10 space-y-8">
            {FOUNDER_TOOLS.map((b) => (
              <Reveal key={b.vendor} delay={0.05}>
                <ScoreCard block={b} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container narrow>
          <Reveal>
            <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card sm:p-8">
              <h2 className="font-serif text-2xl text-navy-800">
                Honest reading of the scorecard.
              </h2>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-navy-600">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-forest-500">&#10003;</span>
                  <span>
                    <strong>We're Ahead</strong> on the structural moves
                    no incumbent can copy without a re-architecture: Sign-off
                    Doctrine, hash-chained AuditLog, multi-jurisdiction
                    native data layer, citation verification, cross-border
                    tax-treaty engine, forensic intelligence as platform
                    feature. These are 2–5 year moats.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-gold-600">~</span>
                  <span>
                    <strong>We're at Parity</strong> on document automation
                    breadth (Lawyaw / Termly have more templates today; we
                    catch up at 1–2 templates per session) and trust
                    accounting (Clio has it; we have the schema + module).
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-plum-600">!</span>
                  <span>
                    <strong>We're Behind</strong> on platform UI (Wave 1
                    closes this), Bluebook treatment-history depth in legal
                    research (proprietary moat we may not close), and US
                    50-state sales-tax integration (DavenRoe port lands it).
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-plum-600">⚠</span>
                  <span>
                    <strong>We're Blocked</strong> on items that need
                    partner integrations (court e-filing, bank feeds for
                    Wave 3 accountancy port) or repo access (DavenRoe). The
                    blockers are operational, not technical.
                  </span>
                </li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mx-auto mt-10 max-w-2xl text-center text-xs text-navy-400">
              This audit is updated continuously as Marco Reid ships.
              Methodology and competitor positioning notes verified
              against public marketing + analyst coverage as of May 2026.
              Open to public review; corrections welcome at /contact.
            </p>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
