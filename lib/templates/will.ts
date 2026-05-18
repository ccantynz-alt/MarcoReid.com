/**
 * Will templates — NZ / AU / UK / US (Delaware default).
 *
 * Wills are statute-of-frauds documents with strict execution
 * requirements that vary by jurisdiction. The reviewing professional
 * MUST confirm execution + witnessing requirements per the relevant
 * Wills Act before the testator signs.
 *
 *   - NZ: Wills Act 2007 — testator + 2 witnesses (witnesses must NOT
 *     be beneficiaries or spouses of beneficiaries).
 *   - AU: state Wills Acts (largely harmonised) — testator + 2 witnesses,
 *     same beneficiary restriction. Some states permit informal wills
 *     under "dispensing power" provisions.
 *   - UK: Wills Act 1837 (still in force, much amended) — testator + 2
 *     witnesses present together, witnesses must not be beneficiaries
 *     or spouses of beneficiaries (Wills Act 1837 s 15).
 *   - US: Uniform Probate Code or state statute — generally testator +
 *     2 witnesses; some states (LA + a few others) require notary;
 *     Vermont requires 3 witnesses.
 */

import {
  registerTemplate,
  substitute,
  type DocumentTemplate,
  type TemplateVariable,
} from "./engine";

const SHARED_VARIABLES: TemplateVariable[] = [
  {
    key: "testatorName",
    label: "Testator full legal name",
    required: true,
    placeholder: "[Testator's full legal name]",
    example: "Aroha Mereana Ngata",
  },
  {
    key: "testatorAddress",
    label: "Testator residential address",
    placeholder: "[Testator's residential address]",
    example: "27 Beach Road, Mount Maunganui 3116, New Zealand",
  },
  {
    key: "testatorOccupation",
    label: "Testator occupation",
    placeholder: "[Occupation]",
    example: "Software engineer",
  },
  {
    key: "executor1Name",
    label: "First executor full name",
    required: true,
    placeholder: "[Primary executor full name]",
    example: "Marama Hinepau Ngata",
  },
  {
    key: "executor1Address",
    label: "First executor address",
    placeholder: "[Primary executor address]",
    example: "12 Thames Street, Hamilton 3204",
  },
  {
    key: "executor2Name",
    label: "Substitute executor full name (optional)",
    placeholder: "[Substitute executor — leave blank if none]",
    example: "Tama Ngata",
  },
  {
    key: "guardianName",
    label: "Guardian for minor children (if applicable)",
    placeholder: "[Guardian — leave blank if not applicable]",
    example: "Sarah Hill",
  },
  {
    key: "specificGifts",
    label: "Specific gifts (one per line)",
    placeholder:
      "[Specific gifts of money or chattels — one per line. Leave blank if none.]",
    example:
      "$10,000 to my brother Tama Ngata\nMy 1965 Stratocaster guitar to my niece Hana",
  },
  {
    key: "residuaryBeneficiary",
    label: "Residuary beneficiary",
    required: true,
    placeholder: "[Residuary beneficiary's name + relationship]",
    example: "my children in equal shares per stirpes",
  },
  {
    key: "executionDate",
    label: "Date of execution",
    placeholder: "[Date of execution]",
    example: "1 June 2026",
  },
];

function commonRevocationClause(): string {
  return `### 1. Revocation of prior wills

1.1 I revoke all prior wills and testamentary dispositions made by me.`;
}

function commonExecutorAppointment(): string {
  return `### 2. Appointment of executor

2.1 I appoint **{{executor1Name}}** of {{executor1Address}} to be the executor and trustee of this will.

2.2 If {{executor1Name}} predeceases me, refuses, or is unable to act, I appoint **{{executor2Name}}** to be the executor and trustee in their place.

2.3 The expression "my Trustee" in this will means whichever of the above persons is for the time being the executor and trustee of this will.`;
}

function commonGuardian(): string {
  return `### 3. Guardian for minor children

3.1 If at the date of my death any of my children are under the age of majority, I appoint **{{guardianName}}** to be their guardian.`;
}

function commonGiftsClauses(): string {
  return `### 4. Specific gifts

4.1 I give the following specific gifts free of all duties and taxes:

{{specificGifts}}

### 5. Residuary estate

5.1 I give the residue of my estate (after payment of debts, funeral and testamentary expenses, and all duties and taxes) to **{{residuaryBeneficiary}}**.

5.2 If any beneficiary fails to survive me by 30 days, that beneficiary's share will be divided among the surviving beneficiaries of the same class.`;
}

function commonTrusteePowers(): string {
  return `### 6. Trustee powers

6.1 My Trustee may exercise all of the powers of a trustee under the relevant trust legislation in the jurisdiction of administration.

6.2 In addition, my Trustee may:
(a) postpone the sale and conversion of any asset for as long as my Trustee thinks fit;
(b) invest trust money in any investment my Trustee thinks fit, as if my Trustee were absolutely entitled to it;
(c) pay any amount to which a minor beneficiary is entitled to that beneficiary's parent or guardian, whose receipt is a sufficient discharge;
(d) advance capital to a beneficiary at any time my Trustee thinks fit, on account of that beneficiary's contingent or vested interest.`;
}

function commonAttestationNote(): string {
  return `## Important — execution + witnessing requirements

A will is not valid until executed in accordance with the Wills Act of the relevant jurisdiction. The reviewing professional MUST walk the testator through:

(a) the testator signing the will at the foot of the document;
(b) two competent adult witnesses present together at the time of signing;
(c) the witnesses signing the will in the presence of the testator and each other;
(d) the witnesses being NOT beneficiaries or spouses of beneficiaries (gift to a witness is void in NZ, AU, UK; varies in US states).

A will signed without proper witnessing is not a will. Marco Reid drafts; the licensed practitioner attends execution.`;
}

// === NZ ===
registerTemplate({
  slug: "will",
  jurisdiction: "NZ",
  label: "Will (New Zealand)",
  summary:
    "NZ will compliant with Wills Act 2007. Standard residuary structure, specific gifts, executor + substitute executor, guardianship clause, trustee powers under Trusts Act 2019. Execution: testator + 2 witnesses (witnesses must not be beneficiaries or spouses).",
  authorities: [
    "Wills Act 2007 — execution + revocation + witness requirements",
    "Trusts Act 2019 — trustee duties + powers",
    "Administration Act 1969 — executor duties",
    "Family Protection Act 1955 — claims by family members",
    "Property (Relationships) Act 1976 — surviving spouse rights",
  ],
  variables: SHARED_VARIABLES,
  reviewerNotes:
    "Family Protection Act 1955 claims (surviving spouse, children, grandchildren) survive any contrary will provision — discuss with the testator. Wills Act 2007 s 14 cures formal-validity defects but is not a substitute for compliant execution. Witnesses cannot be beneficiaries (s 13).",
  render: (values) => {
    const body = `## Last Will and Testament

**This is the last will and testament of:**

I, **{{testatorName}}**, of {{testatorAddress}}, {{testatorOccupation}}, declare this to be my last will and testament.

${commonRevocationClause()}

${commonExecutorAppointment()}

${commonGuardian()}

${commonGiftsClauses()}

${commonTrusteePowers()}

### 7. Statutory rights preserved

7.1 Nothing in this will affects any rights any person may have under the Family Protection Act 1955, the Property (Relationships) Act 1976, or the Law Reform (Testamentary Promises) Act 1949.

### 8. Funeral and burial

8.1 I direct that my funeral arrangements and the disposition of my body be as my Trustee thinks fit, having regard to any wishes I may have expressed in writing.

---

**Signed by the testator on {{executionDate}}:**

Signature: ____________________________

**{{testatorName}}**

**Witnessed by us, both being present at the same time, who at the request of the testator, in their presence and in the presence of each other, signed below as witnesses:**

First witness:

Signature: ____________________________

Name:

Address:

Occupation:

Second witness:

Signature: ____________________________

Name:

Address:

Occupation:

---

${commonAttestationNote()}

This will is governed by the laws of New Zealand. Wills Act 2007 ss 11 + 13 govern the formal-validity requirements: testator must sign at the foot in the presence of two witnesses who are present together at the time of signing, and the witnesses must sign in the testator's presence. Witnesses cannot be beneficiaries.`;
    return substitute(body, SHARED_VARIABLES, values).body;
  },
});

// === AU ===
registerTemplate({
  slug: "will",
  jurisdiction: "AU",
  label: "Will (Australia · default NSW)",
  summary:
    "AU will compliant with state Wills Acts (NSW Succession Act 2006 default). Standard residuary structure, executor + substitute, guardianship, trustee powers. Execution: testator + 2 witnesses; witness must not be a beneficiary (s 10 Succession Act). State-specific dispensing power available under s 8.",
  authorities: [
    "Succession Act 2006 (NSW) — Pt 2.1 formal validity, Pt 2.2 dispensing power, Ch 3 family provision",
    "Trustee Act 1925 (NSW) + harmonised state Trustee Acts",
    "Wills Act 1968 (ACT), Wills Act 1936 (SA), Wills Act 1992 (Vic), Wills Act 1997 (Tas),  Succession Act 1981 (Qld), Wills Act 1970 (WA), Wills Act 2000 (NT)",
    "Family Provision regimes — state-by-state — preserve eligible-person claims",
  ],
  variables: SHARED_VARIABLES,
  reviewerNotes:
    "Confirm the testator's domicile state — variant will applies (NSW Succession Act / Vic Wills Act 1997 / Qld Succession Act 1981 etc.). Family-provision claims by eligible persons (spouse, de facto partner, child, dependent grandchild, etc.) survive contrary will terms. Dispensing powers (s 8 NSW Succession Act etc.) cure some defects but are not a substitute for proper execution. Witness must not be a beneficiary (s 10 NSW Succession Act).",
  render: (values) => {
    const body = `## Last Will and Testament

I, **{{testatorName}}**, of {{testatorAddress}}, {{testatorOccupation}}, declare this to be my last will and testament.

${commonRevocationClause()}

${commonExecutorAppointment()}

${commonGuardian()}

${commonGiftsClauses()}

${commonTrusteePowers()}

### 7. Family provision

7.1 I am aware of the family-provision regime in the jurisdiction of my domicile. Nothing in this will is intended to defeat any eligible person's right to apply for further provision under the Succession Act of the relevant state.

### 8. Funeral and burial

8.1 I express my wishes regarding my funeral and the disposition of my body in a separate written document. My Trustee shall have regard to those wishes but is not bound by them.

---

**Signed by the testator on {{executionDate}}:**

Signature: ____________________________

**{{testatorName}}**

**Signed by us, both being present at the same time, in the presence of the testator and in the presence of each other:**

First witness:

Signature: ____________________________

Name:

Address:

Occupation:

Second witness:

Signature: ____________________________

Name:

Address:

Occupation:

---

${commonAttestationNote()}

This will is governed by the laws of the state in which the testator is domiciled at the date of execution (default: New South Wales). Confirm formal-validity requirements per the relevant state Wills Act. NSW Succession Act 2006 s 6 + s 10: testator + 2 witnesses; witness must not be a beneficiary.`;
    return substitute(body, SHARED_VARIABLES, values).body;
  },
});

// === UK ===
registerTemplate({
  slug: "will",
  jurisdiction: "UK",
  label: "Will (England & Wales)",
  summary:
    "England & Wales will compliant with Wills Act 1837 (as amended). Testator + 2 witnesses present together; witnesses cannot be beneficiaries or spouses (s 15). Inheritance Tax planning notes flagged for the reviewer to discuss separately with the testator.",
  authorities: [
    "Wills Act 1837 — formal validity (s 9) + witness requirements (s 15)",
    "Inheritance (Provision for Family and Dependants) Act 1975",
    "Trustee Act 2000 — trustee duties + powers",
    "Inheritance Tax Act 1984 — IHT thresholds + exemptions",
    "Mental Capacity Act 2005 — capacity to make a will (Banks v Goodfellow)",
  ],
  variables: SHARED_VARIABLES,
  reviewerNotes:
    "Inheritance Tax planning is critical — reviewer should discuss IHT nil-rate band (£325k) + residence nil-rate band (£175k where main residence passes to direct descendants) + spouse exemption. Inheritance (Provision for Family and Dependants) Act 1975 claims survive contrary will provisions. Capacity test from Banks v Goodfellow (1870) LR 5 QB 549 — Mental Capacity Act 2005 supplements. Witness gift rule under s 15 Wills Act 1837 voids the gift, not the will.",
  render: (values) => {
    const body = `## Last Will and Testament

This is the last will of me **{{testatorName}}** of {{testatorAddress}}, {{testatorOccupation}}.

${commonRevocationClause()}

${commonExecutorAppointment()}

${commonGuardian()}

${commonGiftsClauses()}

${commonTrusteePowers()}

### 7. Inheritance Tax

7.1 My Trustee shall pay all Inheritance Tax due on my estate from the residue, save for tax on any gift specifically directed to be made tax-free.

### 8. Family provision

8.1 I am aware of the Inheritance (Provision for Family and Dependants) Act 1975. Nothing in this will defeats any claim that may be made under that Act.

### 9. Funeral

9.1 My funeral arrangements and the disposition of my body are at my Trustee's discretion, having regard to any wishes I have expressed in writing.

---

**Signed by the testator in our joint presence on {{executionDate}}:**

Signature: ____________________________

**{{testatorName}}**

**Signed by us in the presence of the testator and of each other:**

First witness:

Signature: ____________________________

Name:

Address:

Occupation:

Second witness:

Signature: ____________________________

Name:

Address:

Occupation:

---

${commonAttestationNote()}

Wills Act 1837 s 9 (as amended): the testator must sign (or acknowledge a previously made signature) in the presence of two witnesses present at the same time; each witness must sign in the testator's presence. Wills Act 1837 s 15 voids any gift to a witness or witness's spouse.`;
    return substitute(body, SHARED_VARIABLES, values).body;
  },
});

// === US ===
registerTemplate({
  slug: "will",
  jurisdiction: "US",
  label: "Last Will and Testament (United States · default Delaware)",
  summary:
    "US will under the Uniform Probate Code (default for UPC states) and Delaware-specific provisions. Testator + 2 witnesses; witness cannot be an interested witness without affecting the gift (purging-statute states). Self-proving affidavit included to streamline probate.",
  authorities: [
    "Uniform Probate Code (Article II — intestacy, wills, and donative transfers)",
    "Delaware Code Title 12 — decedents' estates and fiduciary relations",
    "State-specific wills statutes — verify per testator domicile",
    "Internal Revenue Code §§ 2001–2058 — federal estate + GST tax",
  ],
  variables: SHARED_VARIABLES,
  reviewerNotes:
    "VERIFY testator's state of domicile — every US state has its own probate code. UPC + Delaware default used here. Some states (LA, etc.) require additional formalities (notary). Vermont requires 3 witnesses. Federal estate tax exemption is $13.99M per individual (2025) — discuss whether estate planning beyond the basic will is needed (revocable living trust often preferred to avoid probate). Self-proving affidavit (last clause) avoids witness-testimony at probate.",
  render: (values) => {
    const body = `## Last Will and Testament of {{testatorName}}

I, **{{testatorName}}**, of {{testatorAddress}}, {{testatorOccupation}}, being of sound mind and memory, declare this to be my Last Will and Testament.

### Article 1 — Revocation

I revoke all prior wills and codicils made by me.

### Article 2 — Personal Representative (Executor)

I nominate **{{executor1Name}}** of {{executor1Address}} as Personal Representative of my estate.

If {{executor1Name}} is unable or unwilling to serve, I nominate **{{executor2Name}}** as successor Personal Representative.

I direct that no bond shall be required of any Personal Representative serving under this will.

### Article 3 — Guardian for minor children

If at my death any of my children are minors, I nominate **{{guardianName}}** as their guardian.

### Article 4 — Specific gifts

I give the following specific gifts:

{{specificGifts}}

### Article 5 — Residuary estate

I give the residue of my estate to **{{residuaryBeneficiary}}**, after payment of all debts, expenses of administration, and taxes.

### Article 6 — Survivorship

A beneficiary who fails to survive me by 30 days will be deemed to have predeceased me for purposes of this will.

### Article 7 — Powers of Personal Representative

My Personal Representative shall have all powers granted by Delaware law (or the law of the state in which my estate is administered), including without limitation the power to:

(a) sell, lease, or mortgage real or personal property;
(b) compromise + settle claims;
(c) make tax elections, including elections under the Internal Revenue Code;
(d) distribute property in cash or in kind, or partly in each;
(e) employ accountants, attorneys, investment advisers, and others.

### Article 8 — Tax apportionment

All estate, inheritance, and similar taxes shall be paid out of the residue of my estate without apportionment.

### Article 9 — Governing law

This will is to be construed and administered under the laws of the State of Delaware (or, where I am domiciled in another US state at my death, the law of that state).

---

**Signed by me on {{executionDate}}:**

Signature: ____________________________

**{{testatorName}}**

**Witnesses' attestation:**

The testator signed this will, declared it to be the testator's last will, and signed in our joint presence. We, in the presence of the testator and each other, sign as witnesses.

First witness:

Signature: ____________________________

Name:

Address:

Second witness:

Signature: ____________________________

Name:

Address:

---

### Self-Proving Affidavit (UPC § 2-504)

State of __________________
County of __________________

We, **{{testatorName}}**, the testator, and the witnesses whose names are signed to the attached or foregoing instrument, being first duly sworn, declare to the undersigned officer that the testator signed and executed the instrument as testator's last will and that testator signed willingly + executed it as a free and voluntary act for the purposes therein expressed; that each of the witnesses, in the presence of the testator and of each other, signed the will as a witness; and that to the best of each witness's knowledge the testator was 18 years of age or older, of sound mind, and under no constraint or undue influence.

Testator: ____________________________

Witness 1: ____________________________

Witness 2: ____________________________

Subscribed, sworn, and acknowledged before me by the testator and witnesses on the date stated above.

Notary Public: ____________________________

My commission expires: __________________

---

${commonAttestationNote()}

US wills must comply with the law of the testator's domicile. UPC § 2-502 requires testator + 2 witnesses signing in the testator's presence (and Vermont requires 3). Self-proving affidavit per UPC § 2-504 (and most state equivalents) avoids the need for witness testimony at probate. State-specific notary or "interested witness" purging-statute requirements MUST be verified by the reviewing attorney.`;
    return substitute(body, SHARED_VARIABLES, values).body;
  },
});
