// lib/aml/program-template.ts
//
// Generates starter AML/CTF program documents per jurisdiction.
//
// Each program is a doctrine document the firm must hold to satisfy
// its supervisor. The text below is a starter — every firm must tailor
// the content to its own risk assessment, products, channels, and
// customer base before adoption. Nothing here is legal advice.

import type { AmlJurisdiction } from "@prisma/client";

export interface ProgramSection {
  heading: string;
  body: string;
}

export interface ProgramTemplate {
  jurisdiction: AmlJurisdiction;
  title: string;
  sections: ProgramSection[];
  markdown: string;
}

const TODAY = () =>
  new Date().toLocaleDateString("en-AU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

function toMarkdown(title: string, sections: ProgramSection[]): string {
  const header = `# ${title}\n\n_Effective from: ${TODAY()}_  \n_Version: 1.0 (starter)_  \n_Status: Draft — pending compliance officer approval_\n\n---\n\n`;
  const body = sections
    .map((s) => `## ${s.heading}\n\n${s.body.trim()}\n`)
    .join("\n");
  const footer = `\n---\n\n_This is a starter template. The firm's compliance officer must tailor every section to the firm's actual products, channels, customers, and ML/TF risk assessment before adoption. Nothing in this document is legal advice._\n`;
  return header + body + footer;
}

// ---------------------------------------------------------------
// AU — AUSTRAC (Anti-Money Laundering and Counter-Terrorism Financing
// Act 2006 (Cth) and AML/CTF Rules). Tranche 2 commences 1 July 2026,
// adding lawyers, accountants, real estate agents, and dealers in
// precious metals & stones to the reporting entity population.
// ---------------------------------------------------------------
const AU_AUSTRAC_SECTIONS: ProgramSection[] = [
  {
    heading: "1. ML/TF Risk Assessment",
    body: `The firm must identify and assess the money laundering and terrorism financing (ML/TF) risk it reasonably faces in providing designated services. The assessment must consider:

- the firm's customer types (including beneficial ownership patterns),
- the types of designated services delivered (Tranche 2 services include conveyancing, trust and company formation, management of client money, and certain accounting services),
- the methods and channels through which services are delivered (in-person, remote, intermediary),
- the foreign jurisdictions the firm deals with, with reference to FATF public statements,
- the firm's own historical incidents and near-misses.

The risk assessment is reviewed at least annually, and on any material change to the firm's business or risk environment.`,
  },
  {
    heading: "2. Customer Due Diligence (CDD)",
    body: `Before providing a designated service, the firm collects and verifies:

- the customer's full legal name, date of birth, and residential address (individuals), or
- the entity's legal name, registration number, registered address, and beneficial ownership chain (entities).

Verification uses reliable and independent sources. Simplified CDD applies only where the firm's risk assessment supports it. Enhanced CDD is mandatory for politically exposed persons, customers from FATF-listed jurisdictions, and any case where standard CDD raises suspicion or cannot be completed.

Records of CDD are retained for at least 7 years from the end of the customer relationship.`,
  },
  {
    heading: "3. Ongoing Customer Due Diligence and Monitoring",
    body: `The firm conducts ongoing monitoring of customer transactions and behaviour for consistency with the firm's knowledge of the customer, the customer's risk profile, and the customer's source of funds.

Monitoring includes transaction-pattern review and periodic re-verification of CDD information at intervals proportionate to risk: at least every 12 months for HIGH-risk customers, and at least every 24 months otherwise. Triggering events (change in beneficial ownership, change in country of residence, unusual instructions) prompt immediate re-assessment.`,
  },
  {
    heading: "4. Employee Due Diligence and Screening",
    body: `The firm screens prospective employees in roles with AML/CTF responsibilities (including the AML/CTF compliance officer, partners with sign-off authority, and staff handling client money) prior to appointment. Screening covers identity, right-to-work, criminal history (where lawful), and any relevant disciplinary history with a professional body.

Ongoing employee due diligence is performed at intervals appropriate to the role and the firm's risk assessment.`,
  },
  {
    heading: "5. AML/CTF Training",
    body: `All employees who interact with customers or handle designated services receive AML/CTF training before commencing those duties and at least annually thereafter. Training covers:

- the firm's obligations under the AML/CTF Act and Rules,
- the firm's own AML/CTF program,
- recognition of suspicious matter indicators,
- reporting obligations and the protections available to reporters.

Training is documented; the record evidences who was trained, on what content, and on which date.`,
  },
  {
    heading: "6. Independent Review",
    body: `The Part A (general) program is independently reviewed at intervals appropriate to the firm's size and risk profile, and at least every two years. The review is performed by a person who is independent of the program's operation. The review report is provided to senior management and to the AML/CTF compliance officer, with findings tracked to closure.`,
  },
  {
    heading: "7. AML/CTF Compliance Officer",
    body: `The firm appoints a named AML/CTF compliance officer at management level. The officer is responsible for the day-to-day operation of the program, for liaising with AUSTRAC, for receiving and assessing internal suspicious matter referrals, and for reporting to senior management on program effectiveness.

The compliance officer's appointment, contact details, and any change of appointment are recorded in this program.`,
  },
  {
    heading: "8. Reporting Obligations",
    body: `The firm reports to AUSTRAC:

- **Suspicious Matter Reports (SMRs)** — within 3 business days of forming a suspicion (or within 24 hours where the suspicion relates to terrorism financing),
- **Threshold Transaction Reports (TTRs)** — for cash transactions of A$10,000 or more, within 10 business days,
- **International Funds Transfer Instructions (IFTIs)** — where applicable,
- **Annual Compliance Report** — by the deadline AUSTRAC sets each year.

Tipping-off prohibitions apply: the firm and its employees must not disclose to the customer or to any third party that an SMR has been or may be made, except as permitted by law.`,
  },
  {
    heading: "9. Record-Keeping",
    body: `The firm retains, for at least 7 years:

- all CDD information and supporting documents,
- records of ongoing monitoring,
- records of all reports made to AUSTRAC,
- training records,
- this AML/CTF program and all prior versions,
- independent review reports.

Records are retained in a form that supports prompt retrieval on regulatory request.`,
  },
];

// ---------------------------------------------------------------
// NZ — DIA (AML/CFT Act 2009; lawyers and accountants supervised by
// the Department of Internal Affairs).
// ---------------------------------------------------------------
const NZ_DIA_SECTIONS: ProgramSection[] = [
  {
    heading: "1. Risk Assessment",
    body: `The firm prepares and maintains a written risk assessment under section 58 of the AML/CFT Act 2009, identifying the ML/TF risk the firm may reasonably expect to face having regard to its customers, products and services, methods of delivery, countries dealt with, and institutional arrangements.`,
  },
  {
    heading: "2. AML/CFT Programme",
    body: `The firm establishes, implements, and maintains a compliance programme that includes adequate and effective procedures, policies, and controls to detect, deter, and manage ML/TF risk and to comply with the AML/CFT Act and Regulations.`,
  },
  {
    heading: "3. Customer Due Diligence",
    body: `Standard, simplified, or enhanced CDD is performed in accordance with sections 14–30 of the Act. Beneficial ownership is identified for entity customers. Source of wealth and source of funds are obtained where enhanced CDD applies.`,
  },
  {
    heading: "4. Ongoing CDD and Account Monitoring",
    body: `The firm conducts ongoing CDD and account monitoring proportionate to risk to ensure transactions are consistent with the firm's knowledge of the customer.`,
  },
  {
    heading: "5. Suspicious Activity Reporting",
    body: `The firm reports suspicious activities to the New Zealand Police Financial Intelligence Unit via goAML as soon as practicable, and in any event within 3 working days of forming the suspicion. Tipping-off prohibitions apply.`,
  },
  {
    heading: "6. Compliance Officer, Training, and Audit",
    body: `The firm appoints a compliance officer, provides AML/CFT training to relevant staff, and arranges an independent audit of its risk assessment and programme at least every 3 years.`,
  },
];

// ---------------------------------------------------------------
// UK — HMRC (Money Laundering, Terrorist Financing and Transfer of
// Funds (Information on the Payer) Regulations 2017).
// ---------------------------------------------------------------
const UK_HMRC_SECTIONS: ProgramSection[] = [
  {
    heading: "1. Firm-Wide Risk Assessment",
    body: `The firm carries out a written risk assessment of the ML/TF risks it faces under regulation 18 of the MLR 2017, considering customers, geographic areas, products and services, transactions, and delivery channels.`,
  },
  {
    heading: "2. Policies, Controls, and Procedures",
    body: `The firm establishes and maintains policies, controls, and procedures proportionate to the size and nature of its business under regulation 19, approved by senior management and communicated to staff.`,
  },
  {
    heading: "3. Customer Due Diligence",
    body: `Standard, simplified, or enhanced CDD is applied per regulations 27–35. Politically exposed persons trigger enhanced CDD and senior management approval before establishing or continuing a business relationship.`,
  },
  {
    heading: "4. Ongoing Monitoring",
    body: `The firm conducts ongoing monitoring of business relationships per regulation 28(11), including scrutiny of transactions and keeping CDD information up to date.`,
  },
  {
    heading: "5. Suspicious Activity Reporting",
    body: `The firm's nominated officer (MLRO) considers internal disclosures and submits Suspicious Activity Reports to the National Crime Agency via SAR Online where appropriate. The tipping-off offence under section 333A POCA applies.`,
  },
  {
    heading: "6. Training, Record-Keeping, and Independent Audit",
    body: `Relevant staff receive AML training. CDD and transaction records are retained for at least 5 years. An independent audit function reviews the firm's policies and controls where the size and nature of the business requires it.`,
  },
];

// ---------------------------------------------------------------
// US — FinCEN (Bank Secrecy Act + AICPA SSARS where applicable +
// FinCEN Beneficial Ownership Information reporting for state-formed
// entities under the Corporate Transparency Act).
// ---------------------------------------------------------------
const US_FINCEN_SECTIONS: ProgramSection[] = [
  {
    heading: "1. Customer Identification and Verification",
    body: `The firm follows applicable AICPA Statements on Standards for Tax Services and any state-level AML obligations. For client-money handling, the firm collects and verifies identity for natural persons (legal name, date of birth, address, and a government-issued identifier) and for entities (legal name, registration, EIN, and beneficial ownership).`,
  },
  {
    heading: "2. Beneficial Ownership Information (CTA / FinCEN BOI)",
    body: `For state-formed reporting companies, the firm assists clients with FinCEN Beneficial Ownership Information reports, captures the beneficial-owner data set required by 31 CFR 1010.380, and tracks updates within the 30-day reporting window.`,
  },
  {
    heading: "3. Suspicious Activity Identification and Internal Escalation",
    body: `The firm maintains an internal escalation channel for suspicious activity and, where the firm itself is a covered financial institution, files Suspicious Activity Reports with FinCEN within the BSA-required timeframe.`,
  },
  {
    heading: "4. Sanctions Screening (OFAC)",
    body: `The firm screens customers and counterparties against OFAC's Specially Designated Nationals and Blocked Persons list and maintains a written sanctions compliance program proportionate to its risk.`,
  },
  {
    heading: "5. Training and Record-Keeping",
    body: `Relevant personnel receive periodic training on the firm's AML and sanctions obligations. Records are retained for at least 5 years (or longer where state law requires).`,
  },
];

const TITLES: Record<AmlJurisdiction, string> = {
  AU_AUSTRAC: "AML/CTF Program — Australia (AUSTRAC, Tranche 2)",
  NZ_DIA: "AML/CFT Programme — New Zealand (DIA-supervised)",
  UK_HMRC: "AML Policy — United Kingdom (MLR 2017, HMRC-supervised)",
  US_FINCEN: "AML & Sanctions Compliance Program — United States (FinCEN)",
};

const SECTIONS_BY_JURISDICTION: Record<AmlJurisdiction, ProgramSection[]> = {
  AU_AUSTRAC: AU_AUSTRAC_SECTIONS,
  NZ_DIA: NZ_DIA_SECTIONS,
  UK_HMRC: UK_HMRC_SECTIONS,
  US_FINCEN: US_FINCEN_SECTIONS,
};

export function generateProgramTemplate(
  jurisdiction: AmlJurisdiction,
): ProgramTemplate {
  const title = TITLES[jurisdiction];
  const sections = SECTIONS_BY_JURISDICTION[jurisdiction];
  const markdown = toMarkdown(title, sections);
  return { jurisdiction, title, sections, markdown };
}
