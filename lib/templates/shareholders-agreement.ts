/**
 * Shareholders agreement templates — NZ / AU / UK / US (Delaware default).
 *
 * SHAs sit alongside the company constitution / bylaws and govern the
 * commercial relationship between shareholders that the constitution
 * doesn't (or shouldn't) cover: vesting, transfer restrictions,
 * pre-emptive rights, drag-along, tag-along, deadlock, and minority
 * protections.
 *
 *   - NZ: Companies Act 1993 — s 31 constitution, s 110 (issue of shares),
 *     ss 122–124 directors' duties, ss 144–149 (related-party transactions).
 *   - AU: Corporations Act 2001 — Replaceable Rules vs Constitution,
 *     Pt 2D directors' duties, Pt 2E related-party transactions.
 *   - UK: Companies Act 2006 — directors' duties (ss 171–177), pre-emption
 *     (s 561), unfair prejudice (s 994).
 *   - US: Delaware General Corporation Law + DGCL § 218 voting agreements.
 */

import {
  registerTemplate,
  substitute,
  type DocumentTemplate,
  type TemplateVariable,
} from "./engine";

const SHARED_VARIABLES: TemplateVariable[] = [
  {
    key: "companyName",
    label: "Company full legal name",
    required: true,
    placeholder: "[Company full legal name]",
    example: "Zoobicon Limited",
  },
  {
    key: "companyNumber",
    label: "Company / corporate number",
    placeholder: "[Company number / NZBN / ABN / EIN]",
    example: "NZBN 9429051234567",
  },
  {
    key: "companyAddress",
    label: "Company registered address",
    placeholder: "[Company registered address]",
    example: "Level 5, 123 Queen Street, Auckland",
  },
  {
    key: "shareholdersTable",
    label:
      "Shareholders table (one per line: name, address, share count, share class)",
    required: true,
    placeholder:
      "[List of shareholders — one per line: full name, address, number of shares, share class]",
    example:
      "Craig Canty (sole director), Auckland, 80,000 ordinary shares\nMarco Reid Holdings Pty Ltd, Auckland, 20,000 ordinary shares",
  },
  {
    key: "boardComposition",
    label: "Board composition (number of directors, who appoints)",
    placeholder:
      "[Board composition — e.g. 3 directors; founder appoints 2; major investor appoints 1]",
    example:
      "3 directors. Founders appoint 2; major shareholder (>20%) appoints 1.",
  },
  {
    key: "vestingSchedule",
    label: "Founder vesting schedule",
    placeholder: "[Vesting schedule, e.g. 4-year vest, 1-year cliff]",
    example: "4-year monthly vest with 1-year cliff",
  },
  {
    key: "effectiveDate",
    label: "Effective date",
    placeholder: "[Effective date]",
    example: "1 June 2026",
  },
];

function commonRecitals(): string {
  return `**Background:**

A. The Company is **{{companyName}}** ({{companyNumber}}), of {{companyAddress}}.

B. The shareholders of the Company at the date of this agreement are:

{{shareholdersTable}}

C. The shareholders wish to record their agreement regarding the management of the Company, the issue and transfer of shares, and the protection of their respective interests.`;
}

function commonBoardClause(governingActReference: string): string {
  return `### 2. Board composition

2.1 The Board shall consist as follows: {{boardComposition}}

2.2 Each director must comply with the directors' duties set out in ${governingActReference}, including duties of care, good faith, and disclosure of interests.

2.3 Each shareholder is responsible for the conduct of any director nominated by it.

### 3. Reserved matters

3.1 The Company shall not, without the prior written consent of shareholders holding at least 75% of the issued shares (the **"Special Majority"**), do any of the following:

(a) issue new shares (other than under an approved option pool);
(b) borrow more than NZD 250,000 in aggregate;
(c) sell or licence any material asset of the Company;
(d) commence or settle any litigation involving claims of more than NZD 100,000;
(e) enter into a related-party transaction with a director or shareholder;
(f) change the constitution or this agreement;
(g) declare a dividend;
(h) appoint or remove the Chief Executive Officer;
(i) approve the annual budget;
(j) make any acquisition or merger with another business.`;
}

function commonVestingClause(): string {
  return `### 4. Founder vesting

4.1 Founder shares are subject to vesting on the following schedule: {{vestingSchedule}}

4.2 If a founder ceases to provide services to the Company before the vesting schedule completes, the unvested portion of that founder's shares may be repurchased by the Company at the lower of (a) original issue price or (b) fair value, at the Company's option.

4.3 "Cessation of services" includes resignation, termination by the Company for cause, death, or permanent incapacity. Termination by the Company without cause results in accelerated vesting of an additional 12 months.`;
}

function commonTransferClauses(): string {
  return `### 5. Restrictions on transfer

5.1 No shareholder may transfer any shares except in accordance with this clause.

5.2 **Permitted transfers:** A shareholder may transfer shares to:
(a) a wholly-owned holding entity of that shareholder;
(b) a family trust of which the shareholder is beneficiary;
(c) a spouse or descendant on death;
provided in each case the transferee enters into a deed of accession to this agreement.

5.3 **Pre-emptive rights:** Any other proposed transfer is subject to a right of first offer to the existing shareholders pro rata to their existing holdings.

### 6. Tag-along

6.1 If a shareholder (or group of shareholders acting in concert) proposes to transfer shares representing 50% or more of the issued capital to a third party, the other shareholders have the right to require the proposed transferee to purchase their shares on the same terms.

### 7. Drag-along

7.1 If shareholders holding 75% or more of the issued capital wish to accept a bona fide offer for 100% of the Company, they may require the remaining shareholders to sell their shares on the same terms, subject to standard minority protections (no greater liability than pro-rata, no non-standard restrictive covenants).

### 8. Deadlock

8.1 If the Board is deadlocked on a Special Majority matter for more than 30 days, the matter shall be referred to mediation. If mediation fails within a further 30 days, any party may invoke the buy-or-sell mechanism (Russian Roulette / Texas Shootout — to be agreed at execution).`;
}

function commonGeneralClauses(governingLaw: string, jurisdictionForum: string): string {
  return `### 9. Confidentiality

9.1 Each shareholder will keep confidential all confidential information of the Company and other shareholders, both during and after holding shares.

### 10. Restrictive covenants

10.1 No shareholder will, while holding shares and for 12 months after ceasing to hold shares, directly or indirectly engage in any business that competes with the Company in any geography in which the Company carries on business.

10.2 The parties acknowledge that the restraint is reasonable to protect the Company's legitimate business interests.

### 11. Termination

11.1 This agreement terminates upon (a) all shares being held by one person; (b) liquidation of the Company; or (c) written agreement of all shareholders.

### 12. Governing law and dispute resolution

12.1 This agreement is governed by ${governingLaw}.

12.2 The parties submit to the non-exclusive jurisdiction of ${jurisdictionForum}.

12.3 Any dispute shall first be referred to mediation, and if not resolved within 30 days, to arbitration before a single arbitrator.

### 13. Entire agreement

13.1 This agreement, together with the Company's constitution / bylaws, is the entire agreement between the parties on the matters it covers.

13.2 If there is any inconsistency between this agreement and the Company's constitution / bylaws, this agreement prevails as between the shareholders, and they will procure that the constitution / bylaws are amended to align.`;
}

function commonSignatureBlock(): string {
  return `---

**Executed as a deed on {{effectiveDate}}.**

Each shareholder named in the Background signs below.

[Signature blocks for each shareholder, including company-execution blocks for any shareholder which is itself an entity.]`;
}

// === NZ ===
registerTemplate({
  slug: "shareholders-agreement",
  jurisdiction: "NZ",
  label: "Shareholders Agreement (New Zealand)",
  summary:
    "NZ shareholders agreement compliant with Companies Act 1993 + standard NZ founder + investor protections. Includes vesting, pre-emptive rights, tag-along, drag-along, deadlock, and reserved-matters clauses.",
  authorities: [
    "Companies Act 1993 — directors' duties (ss 131–138), share issues (s 110), constitution (s 31)",
    "Securities Act 1978 + Financial Markets Conduct Act 2013 — disclosure for share issues",
    "Land Transfer Act 2017 (where shareholding includes secured rights over real property)",
    "Privacy Act 2020 — shareholder personal information",
  ],
  variables: SHARED_VARIABLES,
  reviewerNotes:
    "Confirm whether the Company has adopted a constitution under s 31 — if not, the Replaceable Rules in Schedule 1 apply. Verify Companies Office records match the shareholders table at execution (NZBN search). Drag-along threshold (75%) is conventional but adjustable. Confirm tax treatment of vesting under the Income Tax Act 2007 ED and the employee share scheme rules.",
  render: (values) => {
    const body = `## Shareholders Agreement

**This agreement is dated {{effectiveDate}}.**

${commonRecitals()}

### 1. Definitions and interpretation

1.1 In this agreement:

**"Board"** means the board of directors of the Company.

**"Special Majority"** has the meaning given in clause 3.1.

**"Permitted transferee"** has the meaning given in clause 5.2.

${commonBoardClause("Pt 8 of the Companies Act 1993")}

${commonVestingClause()}

${commonTransferClauses()}

${commonGeneralClauses("New Zealand law", "the High Court of New Zealand")}

${commonSignatureBlock()}`;
    return substitute(body, SHARED_VARIABLES, values).body;
  },
});

// === AU ===
registerTemplate({
  slug: "shareholders-agreement",
  jurisdiction: "AU",
  label: "Shareholders Agreement (Australia)",
  summary:
    "AU shareholders agreement under Corporations Act 2001. Standard Australian founder + investor protections. Replaceable Rules vs Constitution flagged for reviewer; Pt 2E related-party transactions referenced.",
  authorities: [
    "Corporations Act 2001 (Cth) — directors' duties (ss 180–184), share issues, related-party transactions (Pt 2E)",
    "ASIC Regulatory Guides — RG 60 (oppression), RG 71 (related parties)",
    "Personal Property Securities Act 2009 (where shares secure obligations)",
    "Privacy Act 1988 (Cth)",
  ],
  variables: SHARED_VARIABLES,
  reviewerNotes:
    "Confirm whether the Company has a Constitution or relies on Replaceable Rules in s 141 of the Corporations Act 2001. ASIC company-extract verification of shareholder details before execution. Pt 2E (related-party transactions) requires shareholder approval for transactions between directors and the Company that benefit the director — verify reserved-matters clause covers this. Stamp duty on share transfers — state-by-state.",
  render: (values) => {
    const body = `## Shareholders Agreement

**This agreement is dated {{effectiveDate}}.**

${commonRecitals()}

### 1. Definitions and interpretation

1.1 In this agreement, capitalised terms have the meanings given throughout.

${commonBoardClause("Part 2D of the Corporations Act 2001 (Cth)")}

${commonVestingClause()}

${commonTransferClauses()}

${commonGeneralClauses("the laws of New South Wales and the Commonwealth of Australia", "the Supreme Court of New South Wales and the Federal Court of Australia")}

${commonSignatureBlock()}`;
    return substitute(body, SHARED_VARIABLES, values).body;
  },
});

// === UK ===
registerTemplate({
  slug: "shareholders-agreement",
  jurisdiction: "UK",
  label: "Shareholders Agreement (England & Wales)",
  summary:
    "England & Wales shareholders agreement under Companies Act 2006. Includes standard pre-emption (s 561), unfair prejudice (s 994) preserved, Articles vs SHA hierarchy clear.",
  authorities: [
    "Companies Act 2006 — directors' duties (ss 171–177), pre-emption (s 561), share transfers, unfair prejudice (s 994)",
    "UK GDPR + Data Protection Act 2018",
    "Financial Services and Markets Act 2000 (where private-equity)",
    "Stamp Duty: Stamp duty on share transfers (Stamp Act 1891 as amended)",
  ],
  variables: SHARED_VARIABLES,
  reviewerNotes:
    "Confirm Articles of Association are aligned with this SHA — where conflict exists, the Articles prevail in matters of corporate constitution but the SHA binds the parties contractually. Pre-emption rights under s 561 CA 2006 may need disapplication by special resolution. Stamp duty (0.5%) on share transfers >£1k.",
  render: (values) => {
    const body = `## Shareholders' Agreement

**This agreement is dated {{effectiveDate}}.**

${commonRecitals()}

### 1. Definitions and interpretation

1.1 In this agreement, capitalised terms have the meanings given throughout.

${commonBoardClause("ss 171–177 of the Companies Act 2006")}

${commonVestingClause()}

${commonTransferClauses()}

${commonGeneralClauses("the laws of England and Wales", "the courts of England and Wales")}

${commonSignatureBlock()}`;
    return substitute(body, SHARED_VARIABLES, values).body;
  },
});

// === US ===
registerTemplate({
  slug: "shareholders-agreement",
  jurisdiction: "US",
  label: "Stockholders Agreement (United States · Delaware)",
  summary:
    "Delaware stockholders agreement under DGCL. Includes vesting, ROFR, drag-along, tag-along, voting agreement under DGCL § 218. Reviewer must check securities-law exemptions (Reg D, Section 4(a)(2)) for any related share issuance.",
  authorities: [
    "Delaware General Corporation Law (DGCL) — including § 218 voting agreements",
    "Securities Act 1933 + Securities Exchange Act 1934",
    "Internal Revenue Code §§ 83 + 409A — vesting tax treatment + 83(b) elections",
    "State corporate law (where company is domiciled outside Delaware)",
  ],
  variables: SHARED_VARIABLES,
  reviewerNotes:
    "If founders are receiving stock subject to vesting, FILE 83(b) ELECTION within 30 days of grant — failure to do so creates a substantial tax problem at vesting. Reg D / Rule 506(b) or 506(c) exemption typically applies to private issuance; verify accredited-investor status of new shareholders. State-law variation — verify Delaware DGCL applies vs. CA, NY, etc. Voting agreement under DGCL § 218 enforceable.",
  render: (values) => {
    const body = `## Stockholders Agreement of {{companyName}}

**This Agreement is entered into as of {{effectiveDate}}.**

${commonRecitals()}

### 1. Definitions

Capitalised terms have the meanings given throughout this Agreement.

### 2. Board composition

2.1 The Board shall consist as follows: {{boardComposition}}

2.2 Each Stockholder agrees to vote all shares held by it to elect the Board as composed under clause 2.1, in accordance with DGCL § 218.

### 3. Reserved matters

3.1 The Company shall not, without the affirmative vote of holders of at least 75% of the outstanding voting stock (the **"Supermajority Vote"**), take any of the following actions:

(a) issue new shares (other than under an approved option pool);
(b) incur indebtedness in excess of USD 250,000 in aggregate;
(c) sell, license, or transfer any material asset of the Company;
(d) commence or settle litigation involving claims in excess of USD 100,000;
(e) enter into related-party transactions;
(f) amend the Certificate of Incorporation or Bylaws;
(g) declare or pay any dividend;
(h) hire or terminate the Chief Executive Officer;
(i) approve the annual operating budget;
(j) effect any merger, consolidation, sale of substantially all assets, or initial public offering.

${commonVestingClause()}

### 5. Restrictions on transfer

5.1 No Stockholder may sell, transfer, assign, or otherwise dispose of any shares except in accordance with this Agreement and applicable federal and state securities laws.

5.2 **Permitted Transfers:** A Stockholder may transfer shares to a Permitted Transferee (a wholly-owned holding entity, family trust, or upon death to spouse or descendant) provided the transferee executes a joinder to this Agreement.

5.3 **Right of First Refusal:** All other transfers are subject to a right of first refusal in favour of the Company first, then the other Stockholders pro rata.

### 6. Tag-Along

6.1 If a Stockholder or group of Stockholders proposes to transfer shares representing 50% or more of the outstanding voting stock to a third party, all other Stockholders have a right to participate in the sale on the same terms.

### 7. Drag-Along

7.1 If holders of 75% of the outstanding voting stock approve a bona fide offer for 100% of the Company (whether by stock sale, merger, or asset sale), all other Stockholders shall sell their shares on the same terms, subject to standard minority protections.

### 8. Information rights

8.1 The Company shall deliver to each Stockholder holding 5% or more of the voting stock: (a) annual audited financial statements within 120 days of fiscal year-end; (b) quarterly unaudited financial statements within 45 days of quarter-end.

### 9. Confidentiality

9.1 Each Stockholder agrees to maintain the confidentiality of the Company's confidential information.

### 10. Restrictive covenants

10.1 During the period each Stockholder holds shares and for 12 months thereafter, that Stockholder will not engage in any business that directly competes with the Company. **Note: This non-compete is unenforceable in California (Bus & Prof Code § 16600), Minnesota, North Dakota, and Oklahoma. Where unenforceable, only the non-solicit and non-disclosure obligations apply.**

### 11. 83(b) Election

11.1 Each founder receiving shares subject to vesting acknowledges that they may file an election under Section 83(b) of the Internal Revenue Code within 30 days of receipt to be taxed at the time of receipt rather than at vesting. Founders are strongly encouraged to consult their tax adviser. The Company will provide a Section 83(b) election form on request.

### 12. Termination

12.1 This Agreement terminates upon (a) all shares being held by one person, (b) liquidation of the Company, (c) initial public offering of the Company's common stock, or (d) written agreement of all Stockholders.

### 13. Governing law

13.1 This Agreement is governed by the laws of the State of Delaware, without regard to its conflict-of-laws principles.

13.2 Each Stockholder consents to the exclusive jurisdiction of the state and federal courts located in New Castle County, Delaware.

### 14. Entire agreement

14.1 This Agreement, together with the Certificate of Incorporation and the Bylaws, is the entire agreement between the parties on the matters it covers.

${commonSignatureBlock()}`;
    return substitute(body, SHARED_VARIABLES, values).body;
  },
});
