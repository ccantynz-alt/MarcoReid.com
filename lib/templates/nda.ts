/**
 * NDA templates — mutual non-disclosure across NZ / AU / UK / US.
 *
 * Each variant respects the relevant contract-law tradition:
 *   - NZ: Contract and Commercial Law Act 2017, equity-based remedies.
 *   - AU: Common-law + state Sale of Goods Acts; equitable confidentiality.
 *   - UK: English contract law, equitable breach-of-confidence (Coco v Clark).
 *   - US: Defend Trade Secrets Act 2016 + state UTSA.
 *
 * The text is intentionally clean + signable. A reviewing professional
 * adapts to the deal; the variables capture the dealspecifics. Watermark
 * + sign-off carve-out applied by the engine.
 */

import {
  registerTemplate,
  substitute,
  type DocumentTemplate,
  type TemplateVariable,
} from "./engine";

const SHARED_VARIABLES: TemplateVariable[] = [
  {
    key: "discloserName",
    label: "Disclosing party (full legal name)",
    required: true,
    placeholder: "[Disclosing party's full legal name]",
    example: "Acme Holdings Limited",
  },
  {
    key: "discloserAddress",
    label: "Disclosing party address",
    placeholder: "[Disclosing party address]",
    example: "Level 5, 123 Queen Street, Auckland 1010, New Zealand",
  },
  {
    key: "recipientName",
    label: "Receiving party (full legal name)",
    required: true,
    placeholder: "[Receiving party's full legal name]",
    example: "Beta Industries Pty Ltd",
  },
  {
    key: "recipientAddress",
    label: "Receiving party address",
    placeholder: "[Receiving party address]",
    example: "Suite 12, 456 Collins Street, Melbourne VIC 3000, Australia",
  },
  {
    key: "purpose",
    label: "Purpose for which the information is shared",
    required: true,
    placeholder: "[Describe the purpose, e.g. evaluation of a potential acquisition]",
    example: "evaluation of a potential commercial partnership",
  },
  {
    key: "termYears",
    label: "Confidentiality period (years)",
    placeholder: "3",
    example: "3",
  },
  {
    key: "effectiveDate",
    label: "Effective date",
    placeholder: "[Effective date]",
    example: "1 June 2026",
  },
];

function ndaBody(opts: {
  jurisdiction: "NZ" | "AU" | "UK" | "US";
  governingLaw: string;
  jurisdictionForum: string;
  remediesClause: string;
  carveOuts: string;
  requestForExample?: string;
}): string {
  const { governingLaw, jurisdictionForum, remediesClause, carveOuts } = opts;
  return `## Mutual non-disclosure agreement

**Date:** {{effectiveDate}}

**Between:**

(1) **{{discloserName}}** of {{discloserAddress}} (the **"First Party"**); and

(2) **{{recipientName}}** of {{recipientAddress}} (the **"Second Party"**).

(each a **"Party"** and together the **"Parties"**).

### Background

A. The Parties wish to discuss and evaluate {{purpose}} (the **"Purpose"**).

B. In connection with the Purpose, each Party may disclose to the other certain Confidential Information.

C. The Parties wish to record their agreement regarding the protection of that Confidential Information.

### 1. Definitions

**"Confidential Information"** means any information disclosed by one Party (the **Disclosing Party**) to the other (the **Receiving Party**) that is marked or identified as confidential, or which a reasonable person in the circumstances would understand to be confidential, including but not limited to: business plans, financial information, customer lists, technical information, source code, product designs, and trade secrets.

**"Representatives"** means a Party's directors, officers, employees, professional advisers, and contractors who have a need to know the Confidential Information for the Purpose.

### 2. Obligations of confidentiality

2.1 Each Receiving Party shall:

(a) hold the Disclosing Party's Confidential Information in strict confidence;

(b) use the Confidential Information solely for the Purpose;

(c) not disclose the Confidential Information to any person other than its Representatives, who must be bound by obligations of confidentiality at least as protective as those in this agreement;

(d) protect the Confidential Information using at least the standard of care it uses to protect its own confidential information of similar sensitivity, and in any event no less than a reasonable standard of care; and

(e) on request, return or destroy the Confidential Information (and certify destruction in writing if requested), subject to retention for legal and audit purposes only.

### 3. Exclusions

The obligations in clause 2 do not apply to information that:

(a) is or becomes publicly available through no breach of this agreement;

(b) was known to the Receiving Party before disclosure, free of any obligation of confidence;

(c) is independently developed by the Receiving Party without use of the Confidential Information;

(d) is rightfully received from a third party without restriction; or

(e) is required to be disclosed by law, regulation, or order of a court or competent regulator, provided the Receiving Party gives the Disclosing Party prompt written notice (where permitted) and reasonable cooperation to seek a protective order or equivalent relief.

### 4. Term

4.1 This agreement takes effect on the date first written above and continues for {{termYears}} years.

4.2 Each Receiving Party's obligations of confidentiality survive the termination or expiry of this agreement and continue for as long as the Confidential Information retains its confidential character.

### 5. No licence; no warranty

5.1 Nothing in this agreement grants any licence under any intellectual property right.

5.2 Confidential Information is provided "as is" and without warranty of any kind. The Disclosing Party is not liable for the Receiving Party's reliance on, or any decision made on the basis of, the Confidential Information.

### 6. Remedies

${remediesClause}

### 7. ${carveOuts.length > 0 ? "Carve-outs" : "General"}

${carveOuts}

### 8. Governing law and jurisdiction

8.1 This agreement is governed by ${governingLaw}.

8.2 Each Party submits to the non-exclusive jurisdiction of ${jurisdictionForum}.

### 9. Counterparts

This agreement may be executed in counterparts (including by electronic signature), each of which is an original and which together constitute one agreement.

---

**Executed as an agreement.**

For and on behalf of **{{discloserName}}**:

Signature: ____________________________

Name:

Title:

Date:

For and on behalf of **{{recipientName}}**:

Signature: ____________________________

Name:

Title:

Date:`;
}

// === NZ ===
registerTemplate({
  slug: "nda",
  jurisdiction: "NZ",
  label: "Mutual NDA (New Zealand)",
  summary:
    "Mutual non-disclosure under NZ Contract and Commercial Law Act 2017. Equity-based confidentiality remedies preserved. NZ governing law + High Court jurisdiction.",
  authorities: [
    "Contract and Commercial Law Act 2017",
    "Privacy Act 2020 (s 22 IPP 6 disclosure exceptions)",
    "AB Consultants Ltd v Barton [1983] 3 All ER 193 (equitable confidentiality, persuasive in NZ)",
  ],
  variables: SHARED_VARIABLES,
  render: (values) => {
    const body = ndaBody({
      jurisdiction: "NZ",
      governingLaw: "New Zealand law",
      jurisdictionForum: "the High Court of New Zealand",
      remediesClause: `6.1 The Parties acknowledge that damages alone may not be an adequate remedy for breach of this agreement and that the Disclosing Party is entitled to seek injunctive relief, specific performance, and an account of profits in addition to any other remedy at law or in equity.`,
      carveOuts: `7.1 Nothing in this agreement excludes or limits any non-waivable right under the Consumer Guarantees Act 1993, the Privacy Act 2020, or the Fair Trading Act 1986.\n\n7.2 The Parties agree that the Disclosing Party may issue a notice under s 22 of the Privacy Act 2020 to confirm that the disclosure of personal information under this agreement is for the Purpose and is consistent with Information Privacy Principle 11.`,
    });
    return substitute(body, SHARED_VARIABLES, values).body;
  },
});

// === AU ===
registerTemplate({
  slug: "nda",
  jurisdiction: "AU",
  label: "Mutual NDA (Australia)",
  summary:
    "Mutual non-disclosure under Australian common law. Equitable confidentiality preserved (Coco v Clark applies in AU). Privacy Act 1988 carve-outs included.",
  authorities: [
    "Australian common law of contract",
    "Privacy Act 1988 (Cth) + Australian Privacy Principles (APPs)",
    "Coco v AN Clark (Engineers) Ltd [1969] RPC 41 (equitable breach of confidence)",
    "Australian Consumer Law (Schedule 2 of the Competition and Consumer Act 2010)",
  ],
  variables: SHARED_VARIABLES,
  render: (values) => {
    const body = ndaBody({
      jurisdiction: "AU",
      governingLaw:
        "the laws of New South Wales and the Commonwealth of Australia",
      jurisdictionForum:
        "the Supreme Court of New South Wales and the Federal Court of Australia",
      remediesClause: `6.1 The Parties acknowledge that damages alone may be inadequate and that the Disclosing Party is entitled to seek interlocutory and final injunctive relief, specific performance, and equitable relief for breach of confidence in addition to any other remedy at law.`,
      carveOuts: `7.1 Nothing in this agreement excludes, restricts, or modifies any non-excludable consumer guarantee under the Australian Consumer Law (Schedule 2 of the Competition and Consumer Act 2010 (Cth)).\n\n7.2 Each Party agrees to handle personal information disclosed under this agreement in accordance with the Privacy Act 1988 (Cth) and the Australian Privacy Principles, and to notify the other Party promptly of any eligible data breach under the Notifiable Data Breaches scheme.`,
    });
    return substitute(body, SHARED_VARIABLES, values).body;
  },
});

// === UK ===
registerTemplate({
  slug: "nda",
  jurisdiction: "UK",
  label: "Mutual NDA (England & Wales)",
  summary:
    "Mutual non-disclosure under English law. Equitable breach-of-confidence (Coco v Clark) preserved. UK GDPR + DPA 2018 references.",
  authorities: [
    "English law of contract",
    "Data Protection Act 2018 + UK GDPR",
    "Coco v AN Clark (Engineers) Ltd [1969] RPC 41",
    "Faccenda Chicken Ltd v Fowler [1986] 1 All ER 617",
  ],
  variables: SHARED_VARIABLES,
  render: (values) => {
    const body = ndaBody({
      jurisdiction: "UK",
      governingLaw: "the laws of England and Wales",
      jurisdictionForum: "the courts of England and Wales",
      remediesClause: `6.1 The Parties acknowledge that damages alone may be an inadequate remedy and that the Disclosing Party is entitled to seek interim and final injunctive relief, specific performance, an account of profits, and any other equitable relief, in each case in addition to damages.`,
      carveOuts: `7.1 Each Party shall comply with the UK GDPR and the Data Protection Act 2018 in respect of any personal data disclosed under this agreement, and shall notify the other Party promptly of any personal data breach involving such data.\n\n7.2 Nothing in this agreement excludes liability for fraud, fraudulent misrepresentation, or any other liability that cannot be excluded as a matter of law.`,
    });
    return substitute(body, SHARED_VARIABLES, values).body;
  },
});

// === US ===
registerTemplate({
  slug: "nda",
  jurisdiction: "US",
  label: "Mutual NDA (United States · Delaware)",
  summary:
    "Mutual non-disclosure under Delaware law (default for cross-state US deals). Defend Trade Secrets Act notice required (s 1833(b)). Whistleblower carve-out included.",
  authorities: [
    "Defend Trade Secrets Act of 2016, 18 U.S.C. § 1833(b) (whistleblower notice required)",
    "Delaware Uniform Trade Secrets Act, Del. Code tit. 6, ch. 20",
    "Restatement (Second) of Contracts",
    "Faccenda Chicken Ltd v Fowler [1986] 1 All ER 617 (persuasive on customer info)",
  ],
  variables: SHARED_VARIABLES,
  render: (values) => {
    const body = ndaBody({
      jurisdiction: "US",
      governingLaw:
        "the laws of the State of Delaware, without regard to its conflict-of-laws principles",
      jurisdictionForum:
        "the state and federal courts located in New Castle County, Delaware",
      remediesClause: `6.1 The Parties acknowledge that money damages alone would be an inadequate remedy for breach of this agreement and that the Disclosing Party is entitled, without bond and in addition to any other remedies available at law or in equity, to seek temporary, preliminary, and permanent injunctive relief and specific performance.

6.2 In the event of misappropriation of trade secrets, the Disclosing Party may pursue all remedies under the Defend Trade Secrets Act of 2016, 18 U.S.C. §§ 1836–1839, and the Delaware Uniform Trade Secrets Act, Del. Code tit. 6, ch. 20, including injunctive relief, damages, and exemplary damages and attorneys' fees in cases of willful and malicious misappropriation.`,
      carveOuts: `7.1 **Whistleblower notice (DTSA s 1833(b)):** An individual is not held criminally or civilly liable under any federal or state trade-secret law for the disclosure of a trade secret that (a) is made in confidence to a federal, state, or local government official, either directly or indirectly, or to an attorney, and is made solely for the purpose of reporting or investigating a suspected violation of law; or (b) is made in a complaint or other document filed in a lawsuit or other proceeding, if the filing is made under seal.\n\n7.2 Nothing in this agreement prevents either Party from communicating with, providing information to, or filing a charge with the Securities and Exchange Commission, the Equal Employment Opportunity Commission, the National Labor Relations Board, the Occupational Safety and Health Administration, or any other federal, state, or local government agency.`,
    });
    return substitute(body, SHARED_VARIABLES, values).body;
  },
  reviewerNotes:
    "DTSA whistleblower notice in clause 7.1 is mandatory for the Disclosing Party to be eligible for exemplary damages and attorneys' fees. Do not remove. Verify Delaware governing-law choice fits the deal — substitute the relevant state-law equivalent if not Delaware.",
});
