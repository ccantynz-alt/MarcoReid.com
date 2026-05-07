import type { Metadata } from "next";
import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
import Reveal from "@/app/components/effects/Reveal";

export const metadata: Metadata = {
  title: "Compliance records — the audit posture",
  description:
    "What Marco Reid keeps, how long for, and how it survives a regulator audit. Append-only audit log, hash-chained tamper evidence, per-record retention floors, legal-hold override, and signed regulator exports.",
};

const ledgers = [
  {
    title: "AuditLog — every action, every record",
    body:
      "Every CRUD on every record, plus logins, exports, sign-offs, consents, and regulator submissions. Append-only — no UPDATE, no DELETE. Each row hashes the prior row's hash, so the chain is tamper-evident even if the database itself is compromised.",
  },
  {
    title: "DocumentVersion — supersede, never delete",
    body:
      "Every document revision is preserved with a sha256 content hash. Three years on, a regulator can ask for the v3 that the partner relied on, and we return the exact bytes with a hash that proves it.",
  },
  {
    title: "CommunicationRecord — file notes are not optional",
    body:
      "Email, SMS, voice call, portal message, letter, in-person note. IAA Standard 26 (NZ) and OMARA Code Pt 6 (AU) require contemporaneous file notes. The platform writes the file note as a by-product of the work — there is no second job.",
  },
  {
    title: "RegulatorFiling — every lodgement, with a receipt",
    body:
      "Every filing to IR, IRD, ATO, ASIC, AFSA, AUSTRAC, FIU, INZ, Home Affairs, USCIS, CRA, HMRC. Payload hashed, regulator reference captured, response stored. \"Did we lodge that?\" answered in seconds, not days.",
  },
  {
    title: "AccessGrant — who could see what, when",
    body:
      "Every permission grant, revoke, role change, and impersonation. Privacy-regulator inquiries about \"who could see this client's data on Date X\" answered from the ledger, not from anyone's memory.",
  },
  {
    title: "PrivacyBreachIncident — the register that has to exist",
    body:
      "NZ Privacy Act 2020 s114 — notify within 72hrs of awareness where serious harm is likely. AU NDB scheme — assess within 30 days, notify if eligible. GDPR Art 33 — 72hrs to the supervisor. The register tracks the clock, the assessment, the notification, the remediation.",
  },
  {
    title: "ComplaintRecord — IAA, OMARA, NZLS, TPB, ARITA",
    body:
      "Every regulator that issues a code of conduct expects a complaint register. One ledger, every forum, every status, every external reference number.",
  },
  {
    title: "AmlAssessment + SuspiciousActivityReport",
    body:
      "CDD, risk-rating with the factors that drove it, sanctions and PEP screening, SARs to the FIU (NZ) and STRs to AUSTRAC (AU). All append-only. All retained for the full statutory period.",
  },
  {
    title: "SignoffRequest — the human gate on AI",
    body:
      "Every consumer-facing AI output passes through a sign-off queue and is approved by a licensed professional before release. Who signed, when, with what review. The shield against UPL, FTC §5, and reliance suits.",
  },
  {
    title: "Consent + ToS audit — the evidentiary record",
    body:
      "Versioned ToS, versioned platform acknowledgment, signup IP, signup user agent, timestamps. The acknowledgment carves out non-waivable CGA 1993 (NZ) and ACL (AU) consumer rights — owning the carve-out is what makes the rest enforceable.",
  },
];

const retention = [
  { authority: "NZ AML/CFT Act 2009", floor: "5 years from end of relationship", scope: "CDD, transaction records, SARs, risk assessments, programme, audit reports" },
  { authority: "AU AML/CTF Act 2006", floor: "7 years", scope: "KYC, TTRs, IFTIs, SMRs, AML/CTF Program, board approvals" },
  { authority: "NZ Tax Administration Act 1994 s22", floor: "7 years", scope: "Books, working papers, tax-agent records" },
  { authority: "AU TAA 1953 + ITAA 1997", floor: "5 years (some 7)", scope: "Tax records, TPB service records, transfer-pricing docs (5 yrs from lodgement)" },
  { authority: "NZ Lawyers' Trust Account Regs 2008", floor: "6 years", scope: "Trust ledger, statements, reconciliations" },
  { authority: "NZ Lawyers and Conveyancers Act 2006", floor: "7 years typical", scope: "Client files, engagement, conduct records" },
  { authority: "AU APES 305 / 310", floor: "7 years", scope: "Engagement letters, client-monies records" },
  { authority: "NZ IAA Code of Conduct 2014", floor: "7 years from completion", scope: "Written agreement, statement of services, file notes" },
  { authority: "AU OMARA Code of Conduct 2021", floor: "7 years", scope: "Client agreement, file notes, Form 956" },
  { authority: "AU ASIC RG 217 + ARITA Code", floor: "7 years post-administration", scope: "Receipts/payments, time records, remuneration disclosures" },
  { authority: "NZ Privacy Act 2020 + AU Privacy Act 1988", floor: "Only as long as necessary", scope: "Subject to the carve-outs above where they apply" },
  { authority: "GDPR (any EU subjects)", floor: "Per Art 5(1)(e), 30(1) ROPA continuously current", scope: "DPIAs, ROPA, consent records, processor list" },
];

const principles = [
  {
    title: "Append-only, by design",
    body:
      "Audit-relevant tables accept INSERT only. Soft-delete is a tombstone row, not a vanished one. Even an admin cannot rewrite history.",
  },
  {
    title: "Hash chain on every entry",
    body:
      "Each AuditLog row hashes the prior row's hash. A regulator export ships with the chain head and a verification script — tampering is detectable end-to-end.",
  },
  {
    title: "WORM-style storage",
    body:
      "Audit objects are written to S3 Object Lock (or equivalent compliant immutable storage). The bucket policy refuses overwrite, even from the root account.",
  },
  {
    title: "Signed regulator exports",
    body:
      "Audit pulls export as a signed bundle: PDF + JSON + manifest, with chain head, document hashes, and our signing certificate. The auditor verifies in minutes.",
  },
  {
    title: "Right-to-erasure with statutory carve-out",
    body:
      "Privacy Act erasure requests are honoured except where TAA, AML/CFT, or professional rules mandate retention. The data subject is told which section requires it — the platform does not silently refuse.",
  },
  {
    title: "Per-tenant isolation",
    body:
      "Every audit row carries the firm identifier. Cross-tenant reads are not possible from application code; the database enforces row-level scoping.",
  },
];

export default function ComplianceRecordsPage() {
  return (
    <>
      <section className="bg-navy-500 pt-32 pb-20 sm:pt-40">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">
              Compliance records
            </p>
            <h1 className="mt-6 font-serif text-hero text-white">
              The audit posture, on the record.
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-white/90">
              What we keep, how long for, how we prove the chain is unbroken,
              and how we hand it to a regulator. The platform's compliance
              spine is published — not assumed — so the firms that bet on us
              can answer the next IAA, OMARA, ASIC, ATO, or IRD audit from a
              single export.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button href="/trust-center" variant="gold" size="lg">
                Trust centre &rarr;
              </Button>
              <Button href="/data-residency" variant="ghost" size="lg" className="text-white hover:text-gold-300">
                Data residency
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <Reveal>
            <h2 className="text-center font-serif text-display text-navy-800">
              Ten ledgers. One spine.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-navy-400">
              Every action the platform takes lands in one of these ten
              append-only ledgers. Together they cover the full obligation
              surface for a NZ or AU professional services firm.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ledgers.map((l) => (
              <Reveal key={l.title} delay={0.05}>
                <div className="flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5">
                  <h3 className="font-serif text-lg text-navy-800">{l.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy-500">{l.body}</p>
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
              Retention floors.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-navy-400">
              Each record is held to the strictest applicable floor. Default
              platform floor is seven years. Legal-hold flags extend
              indefinitely until released.
            </p>
          </Reveal>

          <div className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-card">
            <table className="w-full text-left text-sm">
              <thead className="bg-navy-50 text-xs uppercase tracking-wider text-navy-500">
                <tr>
                  <th className="px-5 py-3 font-semibold">Authority</th>
                  <th className="px-5 py-3 font-semibold">Floor</th>
                  <th className="px-5 py-3 font-semibold">Scope</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-100 text-navy-600">
                {retention.map((r) => (
                  <tr key={r.authority}>
                    <td className="px-5 py-4 font-medium text-navy-800">{r.authority}</td>
                    <td className="px-5 py-4 whitespace-nowrap">{r.floor}</td>
                    <td className="px-5 py-4 leading-relaxed text-navy-500">{r.scope}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <Reveal>
            <h2 className="text-center font-serif text-display text-navy-800">
              Architectural rules.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-navy-400">
              The principles that make the audit posture honest. Without
              these, "we keep records" is marketing. With them, it is a
              standard a regulator can stand on.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {principles.map((p) => (
              <Reveal key={p.title} delay={0.05}>
                <div className="flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
                  <h3 className="font-serif text-lg text-navy-800">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy-500">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <p className="mx-auto mt-12 max-w-2xl text-center text-xs text-navy-400">
            This page describes the audit posture of the Marco Reid platform.
            It is not legal advice. Each firm remains responsible for its own
            compliance programme; the platform makes the programme tractable
            and auditable. For the canonical model definitions see
            prisma/schema.prisma.
          </p>
        </Container>
      </section>

      <section className="bg-navy-500 py-24 sm:py-32" aria-label="Trust">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-display text-white">
              Bet your practice on the chain.
            </h2>
            <p className="mt-6 text-lg text-white/85">
              The audit comes. The insurer asks. The complainant escalates.
              The answer is one signed export away.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button href="/contact" variant="gold" size="lg">
                Talk to us about compliance &rarr;
              </Button>
              <Button href="/security" variant="ghost" size="lg" className="text-white hover:text-gold-300">
                Security
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
