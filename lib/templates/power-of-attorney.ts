/**
 * Power of attorney templates — NZ / AU / UK / US.
 *
 * Power of attorney varieties are jurisdiction-specific. The default
 * here is a GENERAL power of attorney; jurisdiction-specific enduring
 * (NZ + AU) / lasting (UK) / durable (US) variants are noted in the
 * reviewer notes — those typically require additional formality
 * (witness + statutory form / registration with the Public Trust /
 * Office of the Public Guardian / state registry) that is not satisfied
 * by this template alone.
 *
 *   - NZ: Property Law Act 2007 (general PoA), Protection of Personal
 *     and Property Rights Act 1988 (Enduring PoA — separate statutory form).
 *   - AU: state Powers of Attorney Acts (NSW Powers of Attorney Act 2003,
 *     Vic Powers of Attorney Act 2014, Qld Powers of Attorney Act 1998).
 *   - UK: Powers of Attorney Act 1971 (general); Mental Capacity Act
 *     2005 + LPA Regulations 2007 (Lasting Power of Attorney — registered
 *     with Office of the Public Guardian).
 *   - US: Uniform Power of Attorney Act (UPOAA) where adopted; state
 *     statute otherwise. Durable POA continues after incapacity.
 */

import {
  registerTemplate,
  substitute,
  type DocumentTemplate,
  type TemplateVariable,
} from "./engine";

const SHARED_VARIABLES: TemplateVariable[] = [
  {
    key: "donorName",
    label: "Donor / principal full legal name",
    required: true,
    placeholder: "[Donor / principal full legal name]",
    example: "Hana Mereana Smith",
  },
  {
    key: "donorAddress",
    label: "Donor address",
    placeholder: "[Donor address]",
    example: "27 Beach Road, Mount Maunganui",
  },
  {
    key: "donorDateOfBirth",
    label: "Donor date of birth",
    placeholder: "[Donor date of birth]",
    example: "12 March 1975",
  },
  {
    key: "attorneyName",
    label: "Attorney / agent full legal name",
    required: true,
    placeholder: "[Attorney / agent full legal name]",
    example: "Tama Wilson",
  },
  {
    key: "attorneyAddress",
    label: "Attorney address",
    placeholder: "[Attorney address]",
    example: "12 Thames Street, Hamilton",
  },
  {
    key: "scope",
    label: "Scope (general / specific)",
    placeholder: "general",
    example: "general",
  },
  {
    key: "specificMatters",
    label: "Specific matters (if scope = specific)",
    placeholder:
      "[List the specific matters the attorney is authorised to handle — leave blank if general PoA]",
    example:
      "(1) Sale of property at 5 Beach Road, Mount Maunganui;\n(2) Operation of ANZ business cheque account no. 01-234-567",
  },
  {
    key: "effectiveDate",
    label: "Effective date",
    placeholder: "[Effective date]",
    example: "1 June 2026",
  },
  {
    key: "endDate",
    label: "End date (or 'until revoked')",
    placeholder: "until revoked",
    example: "until revoked",
  },
];

// === NZ ===
registerTemplate({
  slug: "power-of-attorney",
  jurisdiction: "NZ",
  label: "General Power of Attorney (New Zealand)",
  summary:
    "NZ general power of attorney under the Property Law Act 2007. NOT an Enduring Power of Attorney — for EPoA covering property or personal-care/welfare during incapacity, use the statutory Form 1 / Form 2 under the Protection of Personal and Property Rights Act 1988 (signed before a witness who is a lawyer or qualified legal executive).",
  authorities: [
    "Property Law Act 2007 — general powers of attorney",
    "Protection of Personal and Property Rights Act 1988 — Enduring Powers of Attorney",
    "Land Transfer Act 2017 (where PoA used to deal with land)",
    "Public Trust Act 2001 + Trustee Act 2019",
  ],
  variables: SHARED_VARIABLES,
  reviewerNotes:
    "This is a GENERAL POA. It revokes upon the donor's loss of mental capacity. For PoA that survives incapacity, use the statutory Enduring Power of Attorney form (Form 1 — property; Form 2 — personal care and welfare) under the PPPRA 1988. EPoA must be witnessed by a lawyer or qualified legal executive who certifies that the donor understood the document. Land Transfer Act 2017 requires PoA dealing with land to be in registrable form.",
  render: (values) => {
    const body = `## General Power of Attorney

**Date:** {{effectiveDate}}

**This General Power of Attorney is granted by:**

I, **{{donorName}}** of {{donorAddress}} (date of birth {{donorDateOfBirth}}) (the **"Donor"**), appoint:

**{{attorneyName}}** of {{attorneyAddress}} (the **"Attorney"**)

to be my Attorney for the purposes set out below.

### 1. Scope

1.1 The scope of this Power of Attorney is **{{scope}}**.

1.2 If the scope is general, the Attorney may do, in my name and on my behalf, anything that I may lawfully do that is capable of being done by an attorney, including (without limitation):
(a) signing documents, including deeds;
(b) operating bank accounts in my name;
(c) buying, selling, leasing, mortgaging, or otherwise dealing with any of my real or personal property;
(d) executing any other instrument I would have authority to execute;
(e) commencing or defending legal proceedings.

1.3 If the scope is specific, the Attorney's authority is limited to the matters set out below:

{{specificMatters}}

### 2. Term

2.1 This Power of Attorney takes effect on {{effectiveDate}} and continues **{{endDate}}**.

2.2 This Power of Attorney is automatically revoked if I lose mental capacity. To grant a Power of Attorney that survives mental incapacity, I must execute an Enduring Power of Attorney under the Protection of Personal and Property Rights Act 1988.

### 3. Acts of attorney binding

3.1 Any act lawfully done by the Attorney under this Power of Attorney shall be binding on me as if I had personally done it.

### 4. Indemnity

4.1 I indemnify the Attorney against any claim arising from acts done in good faith under this Power of Attorney.

### 5. Revocation

5.1 I may revoke this Power of Attorney at any time by written notice to the Attorney + any person dealing with the Attorney.

5.2 This Power of Attorney is automatically revoked on my death.

### 6. Governing law

6.1 This Power of Attorney is governed by the laws of New Zealand.

---

**Signed by the Donor on {{effectiveDate}}:**

Signature: ____________________________

**{{donorName}}**

**Witnessed by an independent adult on {{effectiveDate}}:**

Signature: ____________________________

Name:

Address:

Occupation:`;
    return substitute(body, SHARED_VARIABLES, values).body;
  },
});

// === AU ===
registerTemplate({
  slug: "power-of-attorney",
  jurisdiction: "AU",
  label: "General Power of Attorney (Australia · default NSW)",
  summary:
    "AU general power of attorney (default NSW Powers of Attorney Act 2003). For an Enduring Power of Attorney that survives incapacity, use the prescribed state form (NSW: Form 4; Vic: Form 1; Qld: long-form Enduring PoA) — separate statutory formalities required.",
  authorities: [
    "Powers of Attorney Act 2003 (NSW) — default for this template",
    "Powers of Attorney Act 2014 (Vic), 1998 (Qld), 2000 (Tas), 1956 (SA), 1980 (NT), 2006 (ACT)",
    "Land + Property Law Act of relevant state — registration requirements where PoA deals with land",
    "Trustee Acts (state-by-state) — trustee-attorney duties",
  ],
  variables: SHARED_VARIABLES,
  reviewerNotes:
    "This is a GENERAL POA — automatically revoked on the donor's loss of capacity. For PoA that survives incapacity, use the prescribed state Enduring Power of Attorney form (NSW Form 4 under PoA Act 2003 s 19; Vic prescribed form under PoA Act 2014; Qld long-form Enduring PoA under PoA Act 1998) signed before a prescribed witness. Registration with state land registry required if PoA deals with real property. State variations are significant — VERIFY donor's state.",
  render: (values) => {
    const body = `## General Power of Attorney

**Date:** {{effectiveDate}}

**This General Power of Attorney is given by:**

I, **{{donorName}}** of {{donorAddress}} (date of birth {{donorDateOfBirth}}) (the **"Principal"**), appoint:

**{{attorneyName}}** of {{attorneyAddress}} (the **"Attorney"**)

as my Attorney to act for me in the matters set out below.

### 1. Scope

1.1 The scope of this Power of Attorney is **{{scope}}**.

1.2 If general, the Attorney may do anything lawful that I could do personally, including (without limitation):
(a) signing documents, including deeds;
(b) operating bank accounts in my name;
(c) buying, selling, leasing, or mortgaging real or personal property;
(d) commencing or defending legal proceedings;
(e) dealing with any contract, debt, or obligation owed to or by me.

1.3 If specific, the Attorney's authority is limited to:

{{specificMatters}}

### 2. Term

2.1 This Power of Attorney takes effect on {{effectiveDate}} and continues **{{endDate}}**.

2.2 This Power of Attorney is automatically revoked if I lose mental capacity. To grant a Power of Attorney that survives mental incapacity, I must execute an Enduring Power of Attorney under the relevant state legislation.

### 3. Acts of attorney binding

3.1 Any act lawfully done by the Attorney is binding on me as if done by me personally.

### 4. Indemnity

4.1 I indemnify the Attorney against any claim arising from acts done in good faith under this Power of Attorney.

### 5. Revocation

5.1 I may revoke this Power of Attorney at any time by written notice to the Attorney.

5.2 This Power of Attorney is automatically revoked on my death.

### 6. Registration

6.1 If the Attorney is to deal with real property, this Power of Attorney must be registered with the relevant state land titles registry (Land Registry Services NSW, Land Use Victoria, Titles Queensland, etc.).

### 7. Governing law

7.1 This Power of Attorney is governed by the laws of New South Wales (or the relevant state).

---

**Signed by the Principal on {{effectiveDate}}:**

Signature: ____________________________

**{{donorName}}**

**Witnessed by an independent adult (eligible witness — not the attorney or attorney's spouse) on {{effectiveDate}}:**

Signature: ____________________________

Name:

Address:

Occupation:`;
    return substitute(body, SHARED_VARIABLES, values).body;
  },
});

// === UK ===
registerTemplate({
  slug: "power-of-attorney",
  jurisdiction: "UK",
  label: "General (Ordinary) Power of Attorney (England & Wales)",
  summary:
    "England & Wales ordinary (general) power of attorney under the Powers of Attorney Act 1971. Revokes on donor's loss of mental capacity. For LPA covering finance or health/welfare during incapacity, use the prescribed Office of the Public Guardian forms (LP1F + LP1H) — must be registered with OPG before use.",
  authorities: [
    "Powers of Attorney Act 1971 — ordinary PoA",
    "Mental Capacity Act 2005 + LPA Regulations 2007 — Lasting Power of Attorney",
    "Office of the Public Guardian (OPG) — registration of LPA",
    "Trustee Delegation Act 1999 — PoA over trust property",
    "Land Registration Act 2002 + Land Registration Rules 2003 — PoA dealing with registered land",
  ],
  variables: SHARED_VARIABLES,
  reviewerNotes:
    "This is an ORDINARY POA under PoA Act 1971 — automatically revoked on the donor's loss of mental capacity. For LPA, use the prescribed OPG forms (LP1F for property + financial affairs; LP1H for health + welfare), with mandatory certificate provider, prescribed witnessing, and OPG registration before the LPA can be used. PoA dealing with trust property requires Trustee Delegation Act 1999 compliance.",
  render: (values) => {
    const body = `## General (Ordinary) Power of Attorney

**Date:** {{effectiveDate}}

**By this General Power of Attorney granted under section 10 of the Powers of Attorney Act 1971:**

I, **{{donorName}}** of {{donorAddress}} (date of birth {{donorDateOfBirth}}) (the **"Donor"**), appoint:

**{{attorneyName}}** of {{attorneyAddress}} (the **"Attorney"**)

to be my Attorney to act for me in the matters set out below.

### 1. Scope

1.1 The scope of this Power of Attorney is **{{scope}}**.

1.2 If general, the Attorney may, in my name and on my behalf, do anything which I can lawfully do personally and which is capable of being done by an attorney, including (without limitation):
(a) executing deeds and other documents;
(b) operating my bank and building society accounts;
(c) buying, selling, letting, mortgaging or otherwise dealing with real and personal property;
(d) commencing, defending, and settling any litigation;
(e) dealing with HM Revenue & Customs.

1.3 If specific, the Attorney's authority is limited to:

{{specificMatters}}

### 2. Term

2.1 This Power of Attorney takes effect on {{effectiveDate}} and continues **{{endDate}}**.

2.2 This Power of Attorney is automatically revoked on my mental incapacity. For a Power of Attorney that survives mental incapacity, I must use a Lasting Power of Attorney (LPA) registered with the Office of the Public Guardian.

### 3. Acts of attorney binding

3.1 Any act lawfully done by the Attorney shall be binding on me as if I had personally done it (PoA Act 1971 s 5).

### 4. Indemnity

4.1 I indemnify the Attorney against any claim or liability arising from acts done in good faith under this Power of Attorney.

### 5. Revocation

5.1 I may revoke this Power of Attorney at any time by written notice to the Attorney.

5.2 This Power of Attorney is automatically revoked on my death + on my mental incapacity.

### 6. Registered land

6.1 Where the Attorney deals with registered land, the Land Registration Act 2002 + Land Registration Rules 2003 may require registration of this Power of Attorney + a statement that it has not been revoked.

### 7. Governing law

7.1 This Power of Attorney is governed by the laws of England and Wales.

---

**Signed as a deed by the Donor on {{effectiveDate}}, in the presence of:**

Donor signature: ____________________________

**{{donorName}}**

Witness signature: ____________________________

Witness name:

Witness address:

Witness occupation:`;
    return substitute(body, SHARED_VARIABLES, values).body;
  },
});

// === US ===
registerTemplate({
  slug: "power-of-attorney",
  jurisdiction: "US",
  label: "Power of Attorney (United States · default Delaware UPOAA)",
  summary:
    "US general power of attorney under the Uniform Power of Attorney Act (UPOAA) — default Delaware. For DURABLE POA (survives incapacity), include the durability declaration in clause 2. For HEALTH-CARE POA (medical decisions), use a separate state-specific advance-directive instrument.",
  authorities: [
    "Uniform Power of Attorney Act (UPOAA) — adopted by ~30 states + Delaware",
    "Delaware Code Title 12 §§ 49A-101 et seq. (Delaware UPOAA)",
    "State POA statute where UPOAA not adopted (CA, NY, TX, FL etc.)",
    "Health-care advance directives — state-specific statutes",
    "26 U.S.C. § 6109 — IRS Form 2848 required for IRS representation",
  ],
  variables: SHARED_VARIABLES,
  reviewerNotes:
    "Default DURABLE POA — survives donor's incapacity (clause 2). Remove the durability declaration to make it non-durable (revoked on incapacity). VERIFY state — UPOAA adopted in DE, AK, AR, CO, CT, HI, ID, IL, IA, ME, MD, MN, MT, NE, NV, NH, NM, NC, ND, OH, OK, OR, PA, SC, SD, TX, UT, VA, WV, WI, WY (~30 states). CA, NY, MA, FL have own statutes. Health-care POA requires a separate state-specific advance-directive instrument. Notarisation required in most states; some states require 2 witnesses + notary.",
  render: (values) => {
    const body = `## Durable Power of Attorney

**Effective:** {{effectiveDate}}

**This Durable Power of Attorney is granted by:**

I, **{{donorName}}** of {{donorAddress}} (date of birth {{donorDateOfBirth}}) ("**Principal**"), do hereby appoint:

**{{attorneyName}}** of {{attorneyAddress}} ("**Agent**" or "**Attorney-in-Fact**")

as my agent to act for me as set forth in this instrument.

### 1. Scope of authority

1.1 The scope of this Power of Attorney is **{{scope}}**.

1.2 If general, my Agent shall have full power and authority to act for me with respect to all matters that I could lawfully act for myself, including (without limitation):
(a) real-property transactions;
(b) tangible-personal-property transactions;
(c) stocks, bonds, and other securities;
(d) banking and other financial-institution transactions;
(e) business operating transactions;
(f) insurance and annuity transactions;
(g) estate, trust, and other beneficiary transactions;
(h) claims and litigation;
(i) personal and family maintenance;
(j) benefits from governmental programs or civil or military service;
(k) retirement-plan transactions;
(l) tax matters (including IRS Form 2848 representation, where state law requires).

1.3 If specific, the scope is limited to:

{{specificMatters}}

### 2. Durability

2.1 **This Power of Attorney is durable.** It shall not be affected by my subsequent disability or incapacity. This declaration is made in accordance with applicable state law (Delaware Code Title 12 § 49A-104, or equivalent under the Uniform Power of Attorney Act in adopted states).

### 3. Effective date and term

3.1 This Power of Attorney takes effect on {{effectiveDate}} and continues **{{endDate}}**, unless earlier revoked or terminated as provided herein.

### 4. Acts of agent binding

4.1 All acts lawfully done by my Agent shall have the same effect as if done by me. Third parties may rely on my Agent's authority unless they have actual notice of revocation.

### 5. Indemnification

5.1 I hold harmless and indemnify my Agent from any liability arising from any act or omission performed in good faith under this Power of Attorney.

### 6. Revocation

6.1 I may revoke this Power of Attorney at any time by:
(a) written notice to my Agent;
(b) executing a subsequent Power of Attorney that expressly revokes this one;
(c) my death.

### 7. Successor agent

7.1 If my Agent is unable or unwilling to serve, I appoint __________________ as my Successor Agent with the same authority.

### 8. Compensation

8.1 My Agent shall be entitled to reasonable compensation for services performed under this Power of Attorney + reimbursement of expenses reasonably incurred.

### 9. Governing law

9.1 This Power of Attorney is governed by the laws of the State of Delaware (or the state in which I am domiciled at the time of execution).

### 10. Severability

10.1 If any provision is held unenforceable, the remaining provisions shall remain in full effect.

---

**Signed by the Principal on {{executionDate}}:**

Signature: ____________________________

**{{donorName}}**

### Notary acknowledgment

State of __________________
County of __________________

On {{effectiveDate}}, before me, a Notary Public, personally appeared {{donorName}}, who is personally known to me (or proved to me on the basis of satisfactory evidence) to be the person whose name is subscribed to this instrument, and acknowledged to me that they executed the same in their authorised capacity.

Notary Public: ____________________________

My commission expires: __________________

---

**Important state-specific overlays:** Many states require additional formalities — 2 witnesses (in addition to notary), specific statutory acknowledgment language, or a separate principal's-acknowledgment form. VERIFY state law before relying on this instrument.`;
    return substitute(body, SHARED_VARIABLES, values).body;
  },
});
