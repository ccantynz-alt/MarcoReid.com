/**
 * Directors' / board resolution templates — NZ / AU / UK / US.
 *
 * Standard written-resolution-of-the-board document recording a
 * decision the board has made (or is about to make) outside a formal
 * meeting. Each variant satisfies the relevant company-law requirements
 * for written resolutions to be valid + binding on the company.
 *
 *   - NZ: Companies Act 1993 — directors may act by written resolution
 *     where the constitution permits (s 167); standard practice for
 *     SMEs.
 *   - AU: Corporations Act 2001 + Replaceable Rules s 248A — written
 *     circulating resolution signed by all directors valid.
 *   - UK: Companies Act 2006 + Articles — directors may pass written
 *     resolutions if Articles permit. Model Articles Reg 8 allows it.
 *   - US: DGCL § 141(f) — board may act without a meeting if all
 *     directors consent in writing or by electronic transmission.
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
    placeholder: "[Company number / NZBN / ACN / EIN]",
    example: "NZBN 9429051234567",
  },
  {
    key: "directors",
    label: "Directors signing (one per line)",
    required: true,
    placeholder: "[Directors — one per line]",
    example: "Craig Canty\nMarama Wilson\nTama Ngata",
  },
  {
    key: "resolutionSubject",
    label: "Resolution subject (short heading)",
    required: true,
    placeholder: "[Subject]",
    example: "Approval of US Delaware C-Corp incorporation",
  },
  {
    key: "resolutionBody",
    label: "Resolution text (the operative resolutions)",
    required: true,
    placeholder: "[Resolution text — usually one or more 'IT IS RESOLVED THAT' paragraphs]",
    example:
      "IT IS RESOLVED THAT:\n(a) the Company approve the incorporation of a Delaware C-Corporation as a wholly-owned subsidiary;\n(b) the directors of the Company be authorised to take all steps reasonably necessary to effect such incorporation, including signing all documents on behalf of the Company.",
  },
  {
    key: "resolutionDate",
    label: "Date of the resolution",
    placeholder: "[Date]",
    example: "1 June 2026",
  },
];

// === NZ ===
registerTemplate({
  slug: "directors-resolution",
  jurisdiction: "NZ",
  label: "Directors' Resolution by Written Consent (NZ)",
  summary:
    "NZ written directors' resolution under Companies Act 1993. Confirms the directors' decision outside a board meeting; signed by all directors. Recording it in the minute book is a directors' duty under s 189.",
  authorities: [
    "Companies Act 1993 — directors' duties (ss 131–138), interest disclosure (s 139), board procedure (s 167)",
    "Companies Act 1993 s 189 — directors' obligation to keep company records",
    "Companies Act 1993 s 145 — disclosure of interest in transactions",
  ],
  variables: SHARED_VARIABLES,
  reviewerNotes:
    "Verify the company's constitution permits written resolutions of directors (most NZ constitutions do). If any director has an interest in the matter under s 139, disclosure must be made + the interested director cannot vote (s 144) unless the constitution permits. Resolution must be filed in the company's minute book per s 189(1)(d).",
  render: (values) => {
    const body = `## Resolution of the Directors of {{companyName}}

**Company:** {{companyName}} ({{companyNumber}})
**Date:** {{resolutionDate}}

**Subject:** {{resolutionSubject}}

### Background

The Directors of the Company resolve the following matters by written resolution under the Company's constitution and section 167 of the Companies Act 1993.

### Resolutions

{{resolutionBody}}

### Disclosure of interests

Each Director signing this resolution confirms that, in respect of the matters resolved, they have made any disclosure of interest required under section 139 of the Companies Act 1993, or that no such interest exists.

### Effective

This resolution takes effect on {{resolutionDate}} and is to be filed in the Company's minute book in accordance with section 189(1)(d) of the Companies Act 1993.

---

**Signed by all Directors:**

{{directors}}

Director signature: ____________________________

Date: {{resolutionDate}}

(Repeat the signature block for each director.)`;
    return substitute(body, SHARED_VARIABLES, values).body;
  },
});

// === AU ===
registerTemplate({
  slug: "directors-resolution",
  jurisdiction: "AU",
  label: "Directors' Resolution by Written Consent (AU)",
  summary:
    "AU circulating written resolution of directors under Corporations Act 2001 s 248A (Replaceable Rule). Signed by all directors. Resolution takes effect when signed by the last director.",
  authorities: [
    "Corporations Act 2001 (Cth) s 248A — circulating written resolution",
    "Corporations Act 2001 s 191 — director's duty to disclose material personal interest",
    "Corporations Act 2001 s 195 — voting on matters in which director has material personal interest (proprietary companies)",
    "Corporations Act 2001 s 251A — minute books",
  ],
  variables: SHARED_VARIABLES,
  reviewerNotes:
    "S 248A is a Replaceable Rule — verify the company's constitution doesn't displace it. Where the constitution applies, its written-resolution mechanism governs. S 191 disclosure of material personal interest is mandatory. For proprietary companies, s 195 prevents an interested director from voting (subject to certain exceptions). Record in minute book under s 251A.",
  render: (values) => {
    const body = `## Circulating Resolution of the Directors of {{companyName}}

**Company:** {{companyName}} ({{companyNumber}})
**Date:** {{resolutionDate}}

**Subject:** {{resolutionSubject}}

### Resolutions

The undersigned, being all of the directors of {{companyName}}, hereby pass the following resolutions by way of circulating written resolution under section 248A of the Corporations Act 2001 (Cth) (or under the Company's Constitution where applicable):

{{resolutionBody}}

### Disclosure of material personal interests

Each director signing this resolution confirms that, in respect of the matters resolved, any material personal interest has been disclosed in accordance with section 191 of the Corporations Act 2001, or that no such interest exists. Where applicable, no director with such an interest has voted on the relevant resolution under section 195.

### Effective

This resolution takes effect on the date signed by the last director and is to be entered in the Company's minute book under section 251A.

---

**Signed by all Directors:**

{{directors}}

Director signature: ____________________________

Date:

(Repeat the signature block for each director.)`;
    return substitute(body, SHARED_VARIABLES, values).body;
  },
});

// === UK ===
registerTemplate({
  slug: "directors-resolution",
  jurisdiction: "UK",
  label: "Directors' Written Resolution (England & Wales)",
  summary:
    "UK written resolution of directors under the Articles of Association (Model Articles for private companies, Reg 8). Signed by all directors entitled to vote.",
  authorities: [
    "Companies Act 2006 — directors' duties (ss 171–177), interest declaration (s 177)",
    "Model Articles for Private Companies Limited by Shares (Companies (Model Articles) Regulations 2008) Reg 8 — directors' written resolutions",
    "Companies Act 2006 s 248 — minutes of directors' meetings + written resolutions",
  ],
  variables: SHARED_VARIABLES,
  reviewerNotes:
    "Verify the Articles permit directors' written resolutions — Model Articles Reg 8 does for private companies. Disclosure of director's interest under s 177 CA 2006 (proposed transactions) or s 182 (existing transactions) required. Resolution must be entered in the directors' minute book + retained for 10 years (s 248).",
  render: (values) => {
    const body = `## Directors' Written Resolution of {{companyName}}

**Company:** {{companyName}} ({{companyNumber}})
**Date:** {{resolutionDate}}

**Subject:** {{resolutionSubject}}

### Background

The undersigned, being all of the directors of {{companyName}} entitled to vote on the matters below, pass the following resolutions in writing under the Company's Articles of Association (Model Articles Reg 8 or equivalent):

### Resolutions

{{resolutionBody}}

### Declaration of interests

Each director signing this resolution confirms that any interest in the matters resolved has been declared in accordance with section 177 of the Companies Act 2006 (proposed transactions) or section 182 (existing transactions), or that no such interest exists.

### Effective

This resolution takes effect on the date signed by the last director, and shall be entered in the Company's directors' minute book in accordance with section 248 of the Companies Act 2006.

---

**Signed:**

{{directors}}

Director signature: ____________________________

Date:

(Repeat the signature block for each director.)`;
    return substitute(body, SHARED_VARIABLES, values).body;
  },
});

// === US ===
registerTemplate({
  slug: "directors-resolution",
  jurisdiction: "US",
  label: "Action by Unanimous Written Consent of the Board (US · Delaware default)",
  summary:
    "US Action by Unanimous Written Consent of the Board under DGCL § 141(f). Signed by all directors; takes effect when the last director signs. Standard tool for board decisions outside a meeting.",
  authorities: [
    "Delaware General Corporation Law (DGCL) § 141(f) — action by written consent of directors",
    "Model Business Corporation Act § 8.21 — equivalent in MBCA states",
    "DGCL § 144 — interested-director transactions (disclosure + disinterested approval)",
    "Section 102(b)(7) DGCL — exculpation provisions in the Certificate of Incorporation",
  ],
  variables: SHARED_VARIABLES,
  reviewerNotes:
    "DGCL § 141(f) requires consent of ALL directors (unanimous), not just a majority. If any director objects, the board must hold a meeting under DGCL § 141. For interested-director transactions under DGCL § 144, the resolution must include disclosure + a finding of fairness OR approval by disinterested directors. Some matters (Cert of Inc amendments, mergers) require additional stockholder action under DGCL.",
  render: (values) => {
    const body = `## Action by Unanimous Written Consent of the Board of Directors of {{companyName}}

**Corporation:** {{companyName}} ({{companyNumber}})
**Effective:** {{resolutionDate}}

**Subject:** {{resolutionSubject}}

The undersigned, being all of the members of the Board of Directors of {{companyName}}, a Delaware corporation (the "**Corporation**"), hereby take the following action by unanimous written consent in lieu of a meeting, in accordance with Section 141(f) of the Delaware General Corporation Law:

### Resolutions

{{resolutionBody}}

### Interested-director acknowledgment

To the extent any director has an interest in any of the foregoing matters, such interest has been fully disclosed prior to this Consent + the relevant resolution has been considered in compliance with DGCL § 144. Where required, the relevant transaction has been authorised by the affirmative votes of a majority of the disinterested directors.

### Effectiveness; filing

This Consent takes effect on the date the last director signs. The Corporation's Secretary shall file this Consent with the minutes of proceedings of the Board.

---

**Executed by all Directors:**

{{directors}}

Director signature: ____________________________

Date:

(Repeat the signature block for each director.)`;
    return substitute(body, SHARED_VARIABLES, values).body;
  },
});
