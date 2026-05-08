import type { Metadata } from "next";
import SpecialtyDeepPage from "@/app/components/marketing/SpecialtyDeepPage";

export const metadata: Metadata = {
  title:
    "Forensic accounting — fraud, litigation support, expert-witness work",
  description:
    "Forensic accounting module across NZ, AU, UK, and US. Benford's Law, ghost vendor detection, money trail, payment splitting. ISA 240 + AICPA SSFS + ACFE Fraud Tree + ARITA Code. Court-admissible report drafting with sign-off on every output.",
};

export default function ForensicAccountingSpecialtyPage() {
  return (
    <SpecialtyDeepPage
      eyebrow="Specialty / Forensic accounting"
      title="Fraud detection + expert-witness work, on the same audit-trail spine."
      intro="Forensic accounting is litigation evidence. Marco Reid surfaces the anomalies, applies the standard, drafts the report &mdash; and the credentialled forensic specialist signs every output before it reaches a court, regulator, or insurer. Hash-chained AuditLog + DocumentVersion ensures the chain of custody is unbroken from intake to expert opinion."
      jurisdictions={[
        {
          code: "NZ",
          label: "New Zealand",
          authorities: [
            "Crimes Act 1961 — fraud, dishonesty offences",
            "Companies Act 1993 — directors' duties + insolvent trading recoveries",
            "Insolvency Act 2006 — voidable transactions, voidable preferences",
            "Evidence Act 2006 — expert-witness standards, hearsay, propensity",
            "ISA (NZ) 240 — auditor's responsibility for fraud (XRB)",
            "Serious Fraud Office Act 1990 — major-fraud investigations",
            "CA ANZ Code of Ethics — APES 110 + APES 215 (forensic accounting)",
          ],
          covers: [
            "Voidable transaction recoveries (Companies Act ss 292–296A)",
            "Asset tracing for liquidators + trustees in bankruptcy",
            "Section 261 examination support (Companies Act)",
            "Expert reports under Evidence Act + High Court Rules Sch 4",
            "SFO referrals + fraud-investigation support",
            "Family Court financial-disclosure forensics (relationship property)",
            "Cybercrime + ransomware-payment forensic analysis",
          ],
          matters: [
            "Voidable transactions",
            "Asset trace",
            "S 261 examination",
            "Expert report",
            "Relationship-property forensics",
            "Cybercrime trace",
          ],
        },
        {
          code: "AU",
          label: "Australia",
          authorities: [
            "Corporations Act 2001 — Pt 5.4 + Pt 5.4B liquidation, voidable transactions (s 588FE)",
            "Crimes Act 1900 (NSW) + state criminal codes — fraud, deception",
            "ASIC Act 2001 — ASIC investigations + s 19 examinations",
            "ARITA Code of Professional Practice — investigation methodology",
            "ASA 240 + APES 110 + APES 215 (forensic accounting standard)",
            "Federal Court Rules + UCPR (NSW) — expert-witness Code of Conduct",
          ],
          covers: [
            "Voidable transactions under s 588FE — uncommercial, preferences, related-party",
            "Section 530A books-and-records analysis",
            "Section 596A + 596B examination support",
            "Insolvent trading recovery support (s 588G)",
            "ASIC s 19 examination preparation + supporting evidence",
            "Expert reports under FCA Practice Note + Harman undertakings",
            "AUSTRAC investigation support — money-laundering-trail analysis",
          ],
          matters: [
            "S 588FE",
            "596A examination",
            "Insolvent trading",
            "ASIC s 19",
            "AUSTRAC trace",
            "Expert report",
          ],
        },
        {
          code: "UK",
          label: "United Kingdom",
          authorities: [
            "Insolvency Act 1986 — preferences (s 239), undervalue transactions (s 238), wrongful trading (s 214)",
            "Fraud Act 2006 — fraud by false representation, abuse of position, failure to disclose",
            "Proceeds of Crime Act 2002 — money laundering + confiscation",
            "Companies Act 2006 — directors' duties + breach-of-trust recoveries",
            "ACCA / ICAEW Code of Ethics + ICAEW Forensic Standards",
            "CPR Pt 35 — expert evidence + duty to the court",
          ],
          covers: [
            "Insolvency Act preference + undervalue claim analysis (Insolvency Act 1986 ss 238–245)",
            "Wrongful trading evaluations (s 214) — when did the directors know?",
            "POCA confiscation calculations + benefit-of-criminal-conduct quantum",
            "SFO + NCA evidence preparation",
            "CPR Pt 35 expert reports — Single Joint Expert + party-appointed",
            "Family Division forensic accounting (financial remedies)",
            "FCA disciplinary investigation support",
          ],
          matters: [
            "Preference claim",
            "Wrongful trading",
            "POCA confiscation",
            "SFO / NCA",
            "Pt 35 expert",
            "Financial remedies",
          ],
        },
        {
          code: "US",
          label: "United States",
          authorities: [
            "Defend Trade Secrets Act 2016 — trade-secret misappropriation damages",
            "Sarbanes-Oxley Act 2002 — financial-reporting integrity + internal controls",
            "Bankruptcy Code — preference (§ 547), fraudulent transfer (§ 548), avoidance powers",
            "Federal Rules of Evidence — Rule 702 (Daubert), Rule 703 (expert basis), Rule 705",
            "AICPA Statement on Standards for Forensic Services (SSFS)",
            "PCAOB AS 2401 — fraud in financial-statement audits",
            "RICO 18 USC § 1962 — pattern of racketeering analysis",
          ],
          covers: [
            "Bankruptcy avoidance actions — preference + fraudulent transfer analysis",
            "Daubert-compliant expert reports + deposition preparation",
            "SOX 404 internal-control deficiencies + restatement support",
            "DTSA + state UTSA trade-secret damages quantification",
            "RICO predicate-act analysis + pattern proof",
            "FCPA + AML investigation support",
            "Securities fraud — earnings-management + revenue-recognition forensics",
          ],
          matters: [
            "Preference / fraudulent transfer",
            "Daubert expert",
            "SOX 404",
            "DTSA damages",
            "RICO",
            "FCPA",
            "Securities fraud",
          ],
        },
      ]}
      howMarcoHelps={[
        {
          title: "Benford's Law on every dataset",
          body:
            "First-digit + second-digit Benford analysis on transaction tables, expense reimbursements, journal entries. Variance from expected distribution flagged with statistical significance. Mark Nigrini methodology applied; output cited in the report.",
        },
        {
          title: "Ghost vendor detection",
          body:
            "Vendor master + transaction join surfaces vendors that share addresses with employees, vendors that only invoice round numbers, vendors that only invoice just-under-approval-thresholds, vendors with no W-9 / IR3 / ABN on file.",
        },
        {
          title: "Money trail + tracing",
          body:
            "Following funds through bank statements, intermediate accounts, related-party loans, loan-account drawdowns. Outputs a directed graph the report can visualise as Schedule A.",
        },
        {
          title: "Payment splitting + structuring",
          body:
            "Detects payments split to stay under approval thresholds (procurement) or reporting thresholds (AML). Standard pattern Marco surfaces in the AML/CFT module too — same algorithm, different surface.",
        },
        {
          title: "Daubert / Pt 35 / FCA Practice Note expert reports",
          body:
            "Court-admissible expert report drafting per the relevant procedural code. Reviewer must hold the credential the court will accept (CFE / CA ANZ Forensic Specialist / CPA-FCPA / AICPA-CFF). Marco drafts; the named expert signs.",
        },
        {
          title: "Hash-chained chain of custody",
          body:
            "Every input source, every methodology applied, every reference relied on logged in DocumentVersion + AuditLog. The opposing expert's first cross-examination is \"how did you handle the data?\" — the audit trail answers in seconds, not days.",
        },
      ]}
      cta={{
        heading:
          "Forensic work is litigation evidence. We build it on a litigation-grade audit trail.",
        body: "Benford's, ghost-vendor, money-trail, payment-splitting — automated. Expert-report drafting per Daubert / Pt 35 / FCA / Evidence Act 2006 — drafted, reviewed, signed. The chain of custody never breaks because the platform records every step.",
        primaryHref: "/for-accountants",
      }}
    />
  );
}
