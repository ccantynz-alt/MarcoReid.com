import type { Metadata } from "next";
import SpecialtyDeepPage from "@/app/components/marketing/SpecialtyDeepPage";

export const metadata: Metadata = {
  title: "Audit + assurance — ISA / ASA / IAASB-aligned",
  description:
    "Audit and assurance across NZ, AU, UK, and US. ISA / ASA / IAASB / PCAOB standards. Walkthroughs, controls testing, sampling, going-concern, audit reports — every working paper hash-chained, every opinion signed.",
};

export default function AuditAssuranceSpecialtyPage() {
  return (
    <SpecialtyDeepPage
      eyebrow="Specialty / Audit + assurance"
      title="The audit file the regulator wants to see."
      intro="Audit and assurance work is auditable by definition. Marco Reid runs the engagement on rails &mdash; planning, walkthroughs, controls testing, substantive testing, going-concern, audit report &mdash; with every working paper hash-chained and every opinion signed by the responsible engagement partner."
      jurisdictions={[
        {
          code: "NZ",
          label: "New Zealand",
          authorities: [
            "ISA (NZ) — auditing standards from XRB",
            "Auditor Regulation Act 2011 — licensed auditors",
            "FMA + External Reporting Board oversight",
            "Companies Act 1993 + FMC Act 2013 audit requirements",
            "PBE Standards for not-for-profits + public-sector",
            "CA ANZ professional + ethical standards",
          ],
          covers: [
            "FMC Reporting Entity audits (FMC Act 2013)",
            "Companies Act audits (s 196 + s 207)",
            "Charities Tier 1–4 reviews + audits",
            "Public sector audits (under OAG appointment)",
            "Trust account audits (for law firms, real estate)",
            "Special purpose audits + agreed-upon procedures",
          ],
          matters: [
            "FMC audits",
            "Charities",
            "Trust accounts",
            "AUP",
            "Going concern",
            "Group audits",
          ],
        },
        {
          code: "AU",
          label: "Australia",
          authorities: [
            "ASA — Auditing Standards (AUASB)",
            "Corporations Act 2001 audit provisions (Part 2M.4)",
            "ASIC Audit Inspection Program",
            "Registered Company Auditor (RCA) requirements",
            "ACNC for not-for-profits",
            "APES 110 + APES 410 + APES 320 ethical + quality control",
          ],
          covers: [
            "Reporting entity audits (Corps Act 2001)",
            "AFS Licence audits (RG 105)",
            "ACNC audits + reviews (Tier 1-3)",
            "Trust account audits (legal practice + real estate)",
            "SMSF audits (the AU-specific moat — see /specialties/smsf)",
            "Special purpose engagements + AUP",
          ],
          matters: [
            "Corps Act",
            "AFSL",
            "ACNC",
            "Trust audit",
            "SMSF",
            "AUP",
          ],
        },
        {
          code: "UK",
          label: "United Kingdom",
          authorities: [
            "ISA (UK) — FRC auditing standards",
            "Companies Act 2006 — audit requirements + exemptions",
            "Audit Regulation 2024 — ARGA replacing FRC",
            "PIE (Public Interest Entity) audits — premium tier",
            "Charity Commission audit + independent examination",
            "ICAEW + ICAS + ACCA + AIA professional bodies",
          ],
          covers: [
            "Companies Act statutory audits + exemptions analysis",
            "PIE audits + ARGA inspection compliance",
            "Charity Commission audits + IE",
            "Solicitors Regulation Authority (SRA) accountant's reports",
            "Group audits + components",
            "AUP + ISRS 4400 engagements",
          ],
          matters: [
            "Statutory",
            "PIE",
            "Charity",
            "SRA",
            "Group",
            "ISRS 4400",
          ],
        },
        {
          code: "US",
          label: "United States",
          authorities: [
            "PCAOB Auditing Standards (issuers)",
            "AICPA Statements on Auditing Standards (non-issuers)",
            "Sarbanes-Oxley Act 2002 — Section 404 ICFR",
            "GAAS + GAGAS (Yellow Book) for government",
            "Single Audit Act 1984 + Uniform Guidance 2 CFR 200",
            "State CPA boards + AICPA peer review",
          ],
          covers: [
            "PCAOB issuer audits + ICFR (SOX 404)",
            "AICPA non-issuer audits + reviews + compilations",
            "Single Audits (federal grant recipients > $750k)",
            "ERISA employee benefit plan audits",
            "Yellow Book government engagements",
            "Attest engagements + agreed-upon procedures (AUP)",
          ],
          matters: [
            "PCAOB",
            "SOX 404",
            "Single Audit",
            "ERISA",
            "Yellow Book",
            "AUP",
          ],
        },
      ]}
      howMarcoHelps={[
        {
          title: "Engagement planning + risk assessment",
          body:
            "ISA 315 risk assessment automated from the prior-year file + industry benchmarks. Inherent risk, control risk, materiality, performance materiality calculated and documented. Engagement partner signs the planning memo.",
        },
        {
          title: "Walkthroughs + controls testing",
          body:
            "Process narratives generated from intake, key controls identified, walkthrough checklists, sample sizes computed (ISA 530 / AU-C 530). Deviations tracked, conclusions logged.",
        },
        {
          title: "Substantive testing + sampling",
          body:
            "Sample selection (MUS, statistical, judgemental), test of details + analytical procedures, exception tracking, projection of misstatements. All hash-chained in DocumentVersion + AuditLog.",
        },
        {
          title: "Going-concern assessment",
          body:
            "ISA 570 cash-flow modelling, debt covenant testing, management plan evaluation. Key audit matter drafting if material uncertainty exists.",
        },
        {
          title: "Forensic intelligence overlay",
          body:
            "Benford's Law on transaction data, ghost vendor detection, payment-splitting analysis (forensic moat shared with /specialties/forensic-accounting). Surfaces high-risk areas before fieldwork starts.",
        },
        {
          title: "Audit report drafting + sign-off",
          body:
            "Unmodified, qualified, adverse, disclaimer — drafted to ISA 700 / AU-C 700 / PCAOB AS 3101 standards. Key audit matters surfaced. Engagement partner signs through SignoffRequest queue.",
        },
      ]}
      cta={{
        heading: "Audit work, on the same rails as the regulator's inspection.",
        body: "When ASIC, FMA, FRC, or PCAOB walks in, the working papers + sample selection + sign-offs are already where they expect them. One signed export, complete file.",
        primaryHref: "/for-accountants",
      }}
    />
  );
}
