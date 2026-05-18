import type { Metadata } from "next";
import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
import Reveal from "@/app/components/effects/Reveal";

export const metadata: Metadata = {
  title: "Insolvency — the practitioner workspace",
  description:
    "For licensed insolvency practitioners in NZ and AU. Liquidations, voluntary administrations, receiverships, and personal insolvencies — statutory deadlines, creditor registers, remuneration approvals, and ASIC / Companies Office filings on rails.",
};

const stages = [
  {
    when: "Day 0 — appointment",
    title: "Open the file in minutes",
    body:
      "Court order, resolution, or appointment instrument uploaded. Marco identifies the appointment type (liquidation, VA, receivership, bankruptcy), seeds the statutory timetable, and creates the creditor register, asset register, and remuneration ledger automatically.",
  },
  {
    when: "Day 1–7 — statutory notices",
    title: "Section notices, drafted and posted",
    body:
      "NZ s255 / s256 Companies Act 1993 notices and AU s497 / s436E Corporations Act 2001 notices drafted from the appointment record. Mail-merged to creditors, posted to ASIC or the Companies Office, lodged with the Insolvency and Trustee Service where required.",
  },
  {
    when: "Investigation phase",
    title: "Books, records, and recoveries",
    body:
      "Bank statements pulled via Akahu (NZ) or Basiq (AU). Marco reconciles director loan accounts, related-party transactions, voidable preferences, and uncommercial transactions — then drafts the s295 / s588FE recovery letters and the report to creditors.",
  },
  {
    when: "Creditor meetings",
    title: "Notices, proxies, polls",
    body:
      "Meeting notice, proxy form, and explanatory memorandum drafted. Online attendance via Zoom-or-Teams capture with synchronised minutes. Voting on resolutions, committee of inspection elections, and remuneration approvals tallied and recorded against the resolution.",
  },
  {
    when: "Distribution",
    title: "Priority waterfall, dividends, finalisation",
    body:
      "Preferential creditors (employees, IRD, ATO) ranked by statute. Secured creditor positions reconciled against PPSR (NZ) and PPSA (AU) registrations. Dividend calculations, IR / ATO clearance, final report to creditors, and deregistration application generated and lodged.",
  },
];

const built_in = [
  "NZ Companies Act 1993 — ss239AA–256 liquidation regime, ss239A–239ADW voluntary administration",
  "AU Corporations Act 2001 — Pt 5.3A administration, Pt 5.4–5.4B liquidation, Pt 5.2 receivership",
  "AU Bankruptcy Act 1966 — Pt IV personal bankruptcy, Pt X personal insolvency agreements",
  "Insolvency Practitioners Regulation Act 2019 (NZ) — licensing, accreditation, complaints",
  "ASIC RG 16 / RG 217 — remuneration disclosure and external administrators' reports",
  "ARITA Code of Professional Practice — every step keyed to the relevant paragraph",
  "PPSR (NZ) and PPSA (AU) lookups built into the secured-creditor reconciliation",
  "Statutory deadline calendar — every notice, report, and meeting on the master timetable",
];

const filings = [
  { name: "ASIC Form 524", body: "Presentation of accounts and statement — generated from the receipts and payments ledger." },
  { name: "ASIC Form 5602/5603/5604", body: "External administrator's report and statutory report to creditors." },
  { name: "NZ Companies Office", body: "Six-monthly liquidator's report (s255), final report (s257), and notice of completion." },
  { name: "Insolvency and Trustee Service NZ", body: "Bankruptcy administration filings, summary instalment orders, no-asset procedure status." },
  { name: "AFSA (AU)", body: "Bankruptcy administration filings, debt agreement annual returns, personal insolvency agreement records." },
  { name: "IR / ATO", body: "Pre-appointment tax positions reconciled, GST and PAYE/PAYG arrears computed, clearance requested before final distribution." },
];

export default function InsolvencyPage() {
  return (
    <>
      <section className="bg-navy-500 pt-32 pb-20 sm:pt-40">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">
              Insolvency practitioners
            </p>
            <h1 className="mt-6 font-serif text-hero text-white">
              Statutory work, on a statutory clock.
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-white/90">
              Liquidations, voluntary administrations, receiverships, and
              personal insolvencies run on deadlines that are not negotiable.
              Marco Reid wires the timetable, the creditor register, the
              recovery analysis, and the regulator filings into one workspace
              — so the practitioner can run more files without dropping a
              single statutory step.
            </p>
            <div className="mt-10">
              <Button href="/contact" variant="gold" size="lg">
                Talk to us about insolvency &rarr;
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <Reveal>
            <h2 className="text-center font-serif text-display text-navy-800">
              Appointment to deregistration.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-navy-400">
              Five phases. Every notice drafted from the appointment record.
              Every deadline on the master calendar. Every recovery analysis
              cited to the section that authorises it.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {stages.map((s) => (
              <Reveal key={s.title} delay={0.05}>
                <div className="flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5">
                  <p className="text-xs font-bold uppercase tracking-wider text-forest-600">
                    {s.when}
                  </p>
                  <h3 className="mt-3 font-serif text-lg text-navy-800">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy-500">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-navy-50 py-20 sm:py-28">
        <Container narrow>
          <Reveal>
            <h2 className="font-serif text-display text-navy-800">Built in, not bolted on.</h2>
            <p className="mt-4 text-lg text-navy-400">
              The statutes, the regulator codes, and the registries that govern
              an appointment — not as reference material, but as the spine
              of the workflow.
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
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <Reveal>
            <h2 className="text-center font-serif text-display text-navy-800">
              Filings, generated and lodged.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-navy-400">
              Every regulator form drafted from the same underlying record so
              the numbers tie out across ASIC, the Companies Office, AFSA, IR,
              and the ATO.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filings.map((f) => (
              <Reveal key={f.name} delay={0.05}>
                <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card">
                  <h3 className="font-serif text-lg text-navy-800">{f.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-500">{f.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <p className="mx-auto mt-12 max-w-2xl text-center text-xs text-navy-400">
            Marco Reid is a workspace for licensed insolvency practitioners. It
            does not itself accept appointments or sign reports. Every output
            is reviewed and signed by the appointed practitioner before
            release.
          </p>
        </Container>
      </section>

      <section className="bg-navy-500 py-24 sm:py-32" aria-label="Get started">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-display text-white">
              More files. Same compliance posture.
            </h2>
            <p className="mt-6 text-lg text-white/85">
              Most insolvency practices grow by hiring more analysts. Marco
              Reid lets the same partner run more files without losing the
              statutory rigour that keeps the practice insurable.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button href="/contact" variant="gold" size="lg">
                Book a walkthrough &rarr;
              </Button>
              <Button href="/pricing" variant="ghost" size="lg" className="text-white hover:text-gold-300">
                See pricing
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
