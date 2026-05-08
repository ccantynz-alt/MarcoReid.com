import type { Metadata } from "next";
import Container from "@/app/components/shared/Container";
import Reveal from "@/app/components/effects/Reveal";
import ConflictCheckForm from "@/app/components/marketing/ConflictCheckForm";

export const metadata: Metadata = {
  title: "Conflict + KYC + AML check — one intake, three checks",
  description:
    "Run a unified conflict check, KYC capture, and AML/CFT sanctions + PEP screening from a single intake. NZ AML/CFT Act 2009, AU AML/CTF Act 2006, UK MLR 2017, US BSA. Audit-trailed and sign-off-ready.",
};

const screenedLists = [
  {
    name: "UN Consolidated Sanctions List",
    coverage: "Global — UN Security Council resolutions",
    cadence: "Daily refresh",
  },
  {
    name: "OFAC SDN + non-SDN lists (US)",
    coverage: "US Treasury Specially Designated Nationals + sectoral",
    cadence: "Real-time on update",
  },
  {
    name: "EU Consolidated Sanctions List",
    coverage: "EU Council financial restrictions",
    cadence: "Daily refresh",
  },
  {
    name: "MFAT Sanctions Register (NZ)",
    coverage: "NZ-imposed sanctions per the United Nations Act 1946",
    cadence: "Daily refresh",
  },
  {
    name: "DFAT Consolidated List (AU)",
    coverage: "AU Autonomous Sanctions Regulations 2011",
    cadence: "Daily refresh",
  },
  {
    name: "OFSI Consolidated List (UK)",
    coverage: "UK financial sanctions",
    cadence: "Daily refresh",
  },
  {
    name: "PEP database (politically-exposed persons)",
    coverage: "Heads of state, ministers, senior judges, military, SOEs",
    cadence: "Continuous monitoring",
  },
  {
    name: "Adverse media (negative-news search)",
    coverage:
      "Indexed news + court filings flagging fraud, sanctions, terror, financial crime",
    cadence: "Continuous",
  },
];

const regimes = [
  {
    name: "NZ AML/CFT Act 2009",
    body:
      "Reporting entities (lawyers, conveyancers, accountants, TCSPs) covered. Standard / simplified / enhanced CDD per matter risk. SAR filings to NZ FIU; annual report to DIA / FMA.",
  },
  {
    name: "AU AML/CTF Act 2006",
    body:
      "Designated services covered. AUSTRAC reporting (SMR, IFTI, threshold transaction). Enhanced CDD for foreign politically exposed persons mandatory.",
  },
  {
    name: "UK MLR 2017 + Proceeds of Crime Act 2002",
    body:
      "Money Laundering Regulations 2017 + POCA 2002. NCA reporting via SAR Online. Beneficial ownership disclosure to PSC register.",
  },
  {
    name: "US BSA + FinCEN BOI",
    body:
      "Bank Secrecy Act, Beneficial Ownership Information rule (Corporate Transparency Act 2021). SAR filings via BSA E-Filing.",
  },
];

const conflictChecks = [
  {
    title: "Same-party conflict",
    body:
      "Has the firm acted for this counterparty before? Marco scans the firm's matter ledger for direct prior representation and surfaces the prior matter for review.",
  },
  {
    title: "Adverse-party conflict",
    body:
      "Is this party currently or recently adverse to an existing client? Marco compares against open matters and the recent closed-matter window per Lawyers Conduct and Client Care Rules.",
  },
  {
    title: "Director / shareholder overlap",
    body:
      "Common directors, ultimate beneficial owners, or controlling shareholders surfaced via NZBN / ASIC / Companies House lookups. Catches the conflicts that party-name searches miss.",
  },
  {
    title: "Information barrier integrity",
    body:
      "If the firm has Chinese-wall arrangements in place, Marco flags whether the new matter respects them or breaches them.",
  },
];

export default function ConflictCheckPage() {
  return (
    <>
      <section className="bg-navy-500 pt-32 pb-20 sm:pt-40">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">
              Tools / Conflict + KYC + AML
            </p>
            <h1 className="mt-6 font-serif text-hero text-white">
              One intake. Three checks. Audit-trailed.
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-white/90">
              Conflict check against your firm&rsquo;s matter ledger, KYC
              capture for the new client, and AML/CFT sanctions + PEP
              screening &mdash; all from a single onboarding intake. NZ
              AML/CFT Act 2009. AU AML/CTF Act 2006. UK MLR 2017. US BSA.
              Hash-chained AuditLog row per check.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container narrow>
          <Reveal>
            <ConflictCheckForm />
          </Reveal>
        </Container>
      </section>

      <section className="bg-navy-50 py-20 sm:py-28">
        <Container>
          <Reveal>
            <h2 className="text-center font-serif text-display text-navy-800">
              Four conflict checks. Run on every new matter.
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-4 sm:grid-cols-2">
            {conflictChecks.map((c) => (
              <Reveal key={c.title} delay={0.05}>
                <div className="flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
                  <h3 className="font-serif text-lg text-navy-800">
                    {c.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy-500">
                    {c.body}
                  </p>
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
              Sanctions + PEP lists screened.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-navy-400">
              Every named party + beneficial owner is screened against
              these lists at intake and continuously thereafter. Hits open
              an AmlAssessment review task automatically.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {screenedLists.map((l) => (
              <Reveal key={l.name} delay={0.04}>
                <div className="flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-5 shadow-card">
                  <h3 className="font-serif text-base text-navy-800">
                    {l.name}
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-navy-500">
                    {l.coverage}
                  </p>
                  <p className="mt-3 text-[10px] font-bold uppercase tracking-wider text-forest-600">
                    {l.cadence}
                  </p>
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
              Regimes covered.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-sm text-navy-400">
              Marco Reid runs the regime that applies to your firm&rsquo;s
              jurisdiction; if you act cross-border, all four run in
              parallel.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {regimes.map((r) => (
              <Reveal key={r.name} delay={0.05}>
                <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card">
                  <h3 className="font-serif text-lg text-navy-800">{r.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-500">
                    {r.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <p className="mx-auto mt-10 max-w-2xl text-center text-xs text-navy-400">
            Sanctions + PEP screening is informational support, not
            compliance certification. Each firm is responsible for its own
            AML/CFT compliance programme. Marco Reid makes the programme
            tractable + auditable; it does not replace the compliance
            officer.
          </p>
        </Container>
      </section>
    </>
  );
}
