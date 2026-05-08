/**
 * Lease agreement templates — NZ / AU / UK / US.
 *
 * Residential tenancy variant by default — commercial leases differ
 * substantially per jurisdiction and are best authored as a separate
 * `commercial-lease` slug in a follow-up.
 *
 *   - NZ: Residential Tenancies Act 1986 (RTA). Tenancy Tribunal
 *     jurisdiction. Mandatory bond lodgement. Healthy Homes Standards.
 *   - AU: state-by-state Residential Tenancies Acts (RTA NSW 2010,
 *     RTA Vic 1997, RTA Qld 2008 etc.). NCAT / VCAT / QCAT etc.
 *   - UK: Housing Act 1988 (Assured Shorthold Tenancy default), with
 *     Tenant Fees Act 2019 + How-to-Rent guide requirements.
 *   - US: state-by-state landlord-tenant law. Default Delaware here;
 *     landlord must check state-specific security-deposit caps + notice
 *     periods + warranty-of-habitability obligations.
 */

import {
  registerTemplate,
  substitute,
  type DocumentTemplate,
  type TemplateVariable,
} from "./engine";

const SHARED_VARIABLES: TemplateVariable[] = [
  {
    key: "landlordName",
    label: "Landlord full legal name",
    required: true,
    placeholder: "[Landlord's full legal name]",
    example: "Acme Property Holdings Limited",
  },
  {
    key: "landlordAddress",
    label: "Landlord service-of-process address",
    placeholder: "[Landlord's address for service]",
    example: "PO Box 123, Auckland 1010",
  },
  {
    key: "tenantName",
    label: "Tenant(s) full legal name(s) — comma separated",
    required: true,
    placeholder: "[Tenant(s) full legal name(s)]",
    example: "Hana Smith and Tama Wilson",
  },
  {
    key: "premisesAddress",
    label: "Premises address",
    required: true,
    placeholder: "[Full street address of the premises]",
    example: "27/5 Beach Road, Mount Maunganui 3116",
  },
  {
    key: "rentAmount",
    label: "Rent amount + frequency",
    required: true,
    placeholder: "[Rent amount, currency + frequency]",
    example: "NZD $750 per week, payable weekly in advance",
  },
  {
    key: "bondAmount",
    label: "Bond / security deposit",
    placeholder: "[Bond amount + currency]",
    example: "NZD $3,000 (4 weeks' rent)",
  },
  {
    key: "termStart",
    label: "Tenancy start date",
    required: true,
    placeholder: "[Tenancy start date]",
    example: "1 July 2026",
  },
  {
    key: "termType",
    label: "Term type (fixed / periodic)",
    placeholder: "fixed",
    example: "fixed",
  },
  {
    key: "termEnd",
    label: "Fixed-term end date (if fixed term)",
    placeholder: "[End date — leave blank for periodic]",
    example: "30 June 2027",
  },
  {
    key: "executionDate",
    label: "Date of signing",
    placeholder: "[Date of signing]",
    example: "20 June 2026",
  },
];

// === NZ ===
registerTemplate({
  slug: "lease",
  jurisdiction: "NZ",
  label: "Residential Tenancy Agreement (New Zealand)",
  summary:
    "NZ Residential Tenancy Agreement under the Residential Tenancies Act 1986. Bond lodgement with Tenancy Services within 23 working days mandatory. Healthy Homes Standards compliance required from 1 July 2025 for all rentals.",
  authorities: [
    "Residential Tenancies Act 1986 (RTA)",
    "Residential Tenancies (Healthy Homes Standards) Regulations 2019",
    "Residential Tenancies Amendment Act 2020 (insulation + smoke alarms)",
    "Tenancy Services + Tenancy Tribunal jurisdiction",
    "Privacy Act 2020",
  ],
  variables: SHARED_VARIABLES,
  reviewerNotes:
    "Bond MUST be lodged with Tenancy Services within 23 working days of receipt (s 19 RTA). Failure to lodge is a breach + offence. Healthy Homes Standards compliance statement required for new tenancies + renewals from 1 July 2025. Cannot contract out of RTA's mandatory provisions (s 11). Approved tenancy agreement form available from Tenancy Services — using a non-approved form is permitted but the mandatory provisions still apply.",
  render: (values) => {
    const body = `## Residential Tenancy Agreement

**Date:** {{executionDate}}

**Between:**

(1) **{{landlordName}}** of {{landlordAddress}} (the **"Landlord"**); and

(2) **{{tenantName}}** (the **"Tenant"**).

### 1. Premises

1.1 The Landlord lets to the Tenant the residential premises at:

**{{premisesAddress}}**

### 2. Term

2.1 The tenancy starts on **{{termStart}}** and is a **{{termType}}** tenancy.

2.2 If a fixed-term tenancy, the term ends on **{{termEnd}}**, after which the tenancy continues as a periodic tenancy unless the Landlord or Tenant gives notice to end the tenancy at the end of the fixed term in accordance with the RTA.

### 3. Rent

3.1 Rent is **{{rentAmount}}**.

3.2 Rent is payable in advance to the bank account nominated by the Landlord. The Landlord may not require more than 2 weeks' rent in advance (s 23 RTA).

### 4. Bond

4.1 The Tenant pays a bond of **{{bondAmount}}**.

4.2 The Landlord shall lodge the bond with Tenancy Services within 23 working days of receipt, in accordance with s 19 of the RTA. Failure to lodge is a breach of the RTA + an offence under s 109.

4.3 At the end of the tenancy, the bond is refunded in accordance with s 22 RTA.

### 5. Healthy Homes Standards

5.1 The Landlord confirms that the premises comply with the Healthy Homes Standards Regulations 2019 in respect of:
(a) heating;
(b) insulation;
(c) ventilation;
(d) moisture ingress and drainage;
(e) draught stopping.

5.2 A separate Healthy Homes Standards compliance statement is attached as Schedule 1.

### 6. Landlord obligations (s 45 RTA)

6.1 The Landlord shall:
(a) provide the premises in a reasonable state of cleanliness at the start of the tenancy;
(b) provide and maintain the premises in a reasonable state of repair;
(c) compensate the Tenant for any reasonable costs the Tenant incurs in repairing or remedying any breach by the Landlord;
(d) comply with all applicable building, health, and safety requirements;
(e) ensure that the premises comply with the Healthy Homes Standards.

### 7. Tenant obligations (s 40 RTA)

7.1 The Tenant shall:
(a) pay rent on time;
(b) keep the premises reasonably clean and tidy;
(c) notify the Landlord as soon as practicable of any damage to the premises or anything that needs repair;
(d) not damage the premises (intentionally or carelessly);
(e) not interfere with the Landlord's reasonable peace, comfort, or privacy;
(f) at the end of the tenancy, leave the premises in substantially the same condition as at the start, fair wear and tear excepted.

### 8. Smoke alarms

8.1 The Landlord confirms that working smoke alarms are installed in the premises (long-life photoelectric for new alarms) in accordance with the Residential Tenancies Amendment Act 2020.

### 9. Termination

9.1 Termination of this tenancy is governed by the RTA. The Landlord may terminate a periodic tenancy only on the limited grounds set out in ss 50–55 RTA (e.g. for sale to vacant-possession purchaser, owner-occupation, redevelopment).

9.2 The Tenant may terminate a periodic tenancy by giving 21 days' written notice (s 50 RTA).

### 10. Disputes

10.1 The parties may apply to the Tenancy Tribunal for resolution of any dispute arising under this agreement or the RTA.

### 11. Privacy

11.1 The Landlord will collect, hold, use, and disclose the Tenant's personal information in accordance with the Privacy Act 2020.

---

**Signed by the Landlord on {{executionDate}}:**

Signature: ____________________________

**{{landlordName}}**

**Signed by the Tenant(s) on {{executionDate}}:**

Signature: ____________________________

**{{tenantName}}**

---

**Note:** This agreement does not displace the mandatory provisions of the Residential Tenancies Act 1986. Section 11 RTA voids any contractual term that conflicts with a mandatory provision.`;
    return substitute(body, SHARED_VARIABLES, values).body;
  },
});

// === AU ===
registerTemplate({
  slug: "lease",
  jurisdiction: "AU",
  label: "Residential Tenancy Agreement (Australia · default NSW)",
  summary:
    "AU residential tenancy agreement under state Residential Tenancies Acts. Default NSW (Residential Tenancies Act 2010 NSW); state-by-state variations flagged for reviewer. Bond capped at 4 weeks' rent in most states.",
  authorities: [
    "Residential Tenancies Act 2010 (NSW) — default for this template",
    "Residential Tenancies Act 1997 (Vic), 2008 (Qld), 1995 (SA), 1987 (WA), 2018 (Tas), 1997 (ACT), 1999 (NT)",
    "NCAT (NSW), VCAT (Vic), QCAT (Qld), SAT (WA), SACAT (SA), TASCAT (Tas), ACAT (ACT), NTCAT (NT)",
    "Australian Consumer Law (Schedule 2 Competition and Consumer Act 2010)",
    "Privacy Act 1988 (Cth)",
  ],
  variables: SHARED_VARIABLES,
  reviewerNotes:
    "VERIFY the state in which the premises are located — state-specific RTA applies. NSW: bond capped at 4 weeks' rent (Residential Tenancies Act 2010 s 159). Vic: bond capped at 1 month's rent (Residential Tenancies Act 1997 s 31). Some states (Vic, Qld) require landlord disclosure of material facts — failure is a breach. Mandatory minimum-housing-standards apply in Vic + Qld + ACT.",
  render: (values) => {
    const body = `## Residential Tenancy Agreement

**Date:** {{executionDate}}

**Between:**

(1) **{{landlordName}}** of {{landlordAddress}} (the **"Landlord"**); and

(2) **{{tenantName}}** (the **"Tenant"**).

### 1. Premises

1.1 The Landlord lets the residential premises at **{{premisesAddress}}** (the **"Premises"**) to the Tenant.

### 2. Term

2.1 The tenancy starts on **{{termStart}}** and is a **{{termType}}** tenancy.

2.2 For a fixed-term tenancy, the term ends on **{{termEnd}}**.

### 3. Rent

3.1 Rent is **{{rentAmount}}**, payable to the Landlord by direct deposit.

3.2 The Landlord may not increase rent during a fixed-term agreement unless the agreement provides for it. Rent increases on a periodic agreement are limited per the relevant state RTA.

### 4. Bond / Security deposit

4.1 The Tenant pays a bond of **{{bondAmount}}** to the Landlord, who must lodge the bond with the relevant state rental bond authority within the time required by the state RTA (NSW Rental Bond Online: within 10 business days; Vic RTBA: within 10 business days; Qld RTA: within 10 business days).

4.2 At the end of the tenancy, the bond is refunded in accordance with the state RTA.

### 5. Landlord obligations

5.1 The Landlord must:
(a) provide the Premises in a reasonable state of cleanliness;
(b) maintain the Premises in a reasonable state of repair;
(c) ensure the Premises meet minimum housing standards (Vic + Qld + ACT);
(d) comply with all applicable building, health, and safety requirements;
(e) provide receipts for all rent payments not paid by direct deposit;
(f) provide the Tenant with the Information Statement required by the relevant state RTA.

### 6. Tenant obligations

6.1 The Tenant must:
(a) pay rent on or before the due date;
(b) keep the Premises reasonably clean;
(c) notify the Landlord of any damage or repairs needed;
(d) not damage the Premises (intentionally or carelessly);
(e) not interfere with the reasonable peace, comfort, or privacy of neighbours;
(f) at the end of the tenancy, leave the Premises in substantially the same condition as at the start, fair wear and tear excepted.

### 7. Termination

7.1 Termination of this tenancy is governed by the relevant state RTA. The grounds + notice periods vary by state — refer to the relevant Act.

7.2 The Tenant may terminate a periodic tenancy on 21 days' notice (NSW + most states).

### 8. Disputes

8.1 The parties may apply to the relevant state tribunal (NCAT / VCAT / QCAT / SAT / SACAT / TASCAT / ACAT / NTCAT) for resolution of any dispute.

### 9. Privacy

9.1 The Landlord will handle the Tenant's personal information in accordance with the Privacy Act 1988 (Cth) + the Australian Privacy Principles.

---

**Signed by the Landlord on {{executionDate}}:**

Signature: ____________________________

**{{landlordName}}**

**Signed by the Tenant(s) on {{executionDate}}:**

Signature: ____________________________

**{{tenantName}}**

---

**Note:** This agreement does not displace the mandatory provisions of the relevant state Residential Tenancies Act. Any term that conflicts with a mandatory provision is void.`;
    return substitute(body, SHARED_VARIABLES, values).body;
  },
});

// === UK ===
registerTemplate({
  slug: "lease",
  jurisdiction: "UK",
  label: "Assured Shorthold Tenancy (England & Wales)",
  summary:
    "England & Wales Assured Shorthold Tenancy under Housing Act 1988 (default form). Tenant Fees Act 2019 prohibits most fees other than rent + deposit. Deposit must be protected in an authorised TDP scheme within 30 days. How-to-Rent guide must be served before the tenancy.",
  authorities: [
    "Housing Act 1988 — Assured Shorthold Tenancies",
    "Tenant Fees Act 2019 — fee restrictions + 5-week deposit cap",
    "Deregulation Act 2015 + Housing Act 2004 ss 213–215 — deposit protection",
    "Consumer Rights Act 2015 — unfair-terms control",
    "How-to-Rent guide (most recent version) — must be served before granting the tenancy",
    "UK GDPR + Data Protection Act 2018",
  ],
  variables: SHARED_VARIABLES,
  reviewerNotes:
    "Deposit must be lodged with an authorised Tenancy Deposit Protection scheme (TDS / DPS / MyDeposits) within 30 days of receipt under Housing Act 2004 s 213. Failure means the landlord cannot serve s 21 notice + faces 1–3× deposit penalty. Tenant Fees Act 2019 limits permitted payments — verify no prohibited fees in the agreement. How-to-Rent guide MUST be served before tenancy + on each renewal. EPC + gas safety certificate + smoke alarm + carbon monoxide alarm requirements verified separately.",
  render: (values) => {
    const body = `## Assured Shorthold Tenancy Agreement

**Date:** {{executionDate}}

**This Agreement is made between:**

(1) **{{landlordName}}** of {{landlordAddress}} (the **"Landlord"**); and

(2) **{{tenantName}}** (the **"Tenant"**).

### 1. The Property

1.1 The Landlord lets the property at **{{premisesAddress}}** (the **"Property"**) to the Tenant.

### 2. Term

2.1 The tenancy is an Assured Shorthold Tenancy under the Housing Act 1988.

2.2 The tenancy starts on **{{termStart}}** for a **{{termType}}** term.

2.3 Where fixed term, the fixed term ends on **{{termEnd}}**, after which the tenancy will continue as a statutory periodic tenancy unless terminated.

### 3. Rent

3.1 The rent is **{{rentAmount}}**, payable in advance by bank transfer to the Landlord.

3.2 The Landlord may not require any payment from the Tenant other than rent, refundable holding deposit, refundable tenancy deposit, and certain limited permitted payments under the Tenant Fees Act 2019.

### 4. Deposit

4.1 The Tenant pays a deposit of **{{bondAmount}}** (which must not exceed 5 weeks' rent — Tenant Fees Act 2019 s 5).

4.2 The Landlord must protect the deposit in an authorised Tenancy Deposit Protection scheme within 30 days of receipt + serve the prescribed information on the Tenant within the same period (Housing Act 2004 ss 213–215).

4.3 At the end of the tenancy, the deposit is refunded after deduction for any reasonable damages or unpaid rent.

### 5. Landlord obligations

5.1 The Landlord shall:
(a) maintain the structure and exterior of the Property;
(b) maintain the installations for the supply of water, gas, electricity, and sanitation;
(c) maintain the installations for space heating + heating water;
(d) ensure the Property is fit for human habitation throughout the tenancy (Homes (Fitness for Human Habitation) Act 2018);
(e) provide a valid Energy Performance Certificate (EPC), Gas Safety Certificate, and Electrical Installation Condition Report (EICR);
(f) install smoke alarms + carbon monoxide alarms (where applicable) per the Smoke and Carbon Monoxide Alarm (England) Regulations 2015;
(g) serve the current "How to Rent" guide before granting the tenancy.

### 6. Tenant obligations

6.1 The Tenant shall:
(a) pay the rent on the due date;
(b) keep the interior of the Property in good and clean condition;
(c) not damage the Property (intentionally or by neglect);
(d) not cause nuisance or annoyance to neighbours;
(e) notify the Landlord of any disrepair as soon as practicable;
(f) at the end of the tenancy, return the Property in the same condition as at the start, fair wear and tear excepted.

### 7. Use of the Property

7.1 The Tenant shall use the Property as a private dwelling only. The Tenant shall not run a business from the Property without the Landlord's written consent.

### 8. Right to entry

8.1 The Landlord may enter the Property on reasonable prior notice (at least 24 hours in writing) at reasonable times to inspect, carry out repairs, or show the Property to prospective new tenants/buyers.

### 9. Termination

9.1 The Tenant may end a periodic tenancy by giving the Landlord at least one month's notice in writing.

9.2 The Landlord may end the tenancy by serving:
(a) a section 8 notice (where the Tenant is in breach — 14 days for ground 8 rent arrears; longer for other grounds);
(b) a section 21 notice (no-fault — at least 2 months' notice; abolition pending under the Renters (Reform) Bill).

### 10. Governing law

10.1 This Agreement is governed by the laws of England and Wales. The parties submit to the exclusive jurisdiction of the courts of England and Wales.

### 11. Data protection

11.1 The Landlord will process the Tenant's personal data in accordance with the UK GDPR + Data Protection Act 2018.

---

**Signed by the Landlord on {{executionDate}}:**

Signature: ____________________________

**{{landlordName}}**

**Signed by the Tenant(s) on {{executionDate}}:**

Signature: ____________________________

**{{tenantName}}**

---

**Note:** This Agreement does not exclude any term implied by statute. Any term in conflict with a mandatory statutory provision (Housing Act 1988, Tenant Fees Act 2019, Consumer Rights Act 2015) is void to the extent of the conflict.`;
    return substitute(body, SHARED_VARIABLES, values).body;
  },
});

// === US ===
registerTemplate({
  slug: "lease",
  jurisdiction: "US",
  label: "Residential Lease Agreement (United States · default Delaware)",
  summary:
    "US residential lease agreement (default Delaware). Landlord-tenant law is state-specific — security-deposit caps, notice periods, warranty-of-habitability standards, lead-based paint disclosure (federal) all vary. Reviewer must confirm state-specific overlays.",
  authorities: [
    "State landlord-tenant law (default: Delaware Title 25, Ch. 53)",
    "Federal Lead-Based Paint Hazard Reduction Act 1992 (42 U.S.C. § 4852d) — pre-1978 disclosure",
    "Fair Housing Act (42 U.S.C. §§ 3601–3619) — anti-discrimination",
    "Servicemembers Civil Relief Act (50 U.S.C. § 3955) — military-tenant protections",
    "Local rent-control ordinances (e.g. NYC, SF, LA, Oakland, Berkeley) where applicable",
  ],
  variables: SHARED_VARIABLES,
  reviewerNotes:
    "VERIFY state of premises — landlord-tenant law is fundamentally state-specific. CA + NY + WA + OR have strong tenant protections; TX is more landlord-friendly. Security-deposit caps vary (CA: 1 month for unfurnished; NY: 1 month; DE: 1 month for non-furnished, 1 year leases; TX: no statutory cap). LEAD-PAINT DISCLOSURE FORM (EPA Form 7411) MANDATORY for premises built before 1978 — failure attracts triple-damages liability. Local rent-control ordinances may override.",
  render: (values) => {
    const body = `## Residential Lease Agreement

**Effective:** {{executionDate}}

**Between:**

(1) **{{landlordName}}** of {{landlordAddress}} ("**Landlord**"); and

(2) **{{tenantName}}** ("**Tenant**").

### 1. Premises

Landlord leases to Tenant the residential premises located at **{{premisesAddress}}** (the "**Premises**").

### 2. Term

2.1 The Lease term is a **{{termType}}** tenancy beginning on **{{termStart}}** and (if a fixed term) ending on **{{termEnd}}**.

2.2 Holdover after the end of a fixed term creates a month-to-month tenancy on the same terms (unless modified by Landlord in writing).

### 3. Rent

3.1 Tenant shall pay rent of **{{rentAmount}}** to Landlord, in advance, on the first day of each rental period.

3.2 Late payment of rent more than 5 days after the due date may incur a late fee of 5% of the monthly rent, to the extent permitted by applicable state law.

### 4. Security Deposit

4.1 Tenant shall pay a security deposit of **{{bondAmount}}** to Landlord at the start of the tenancy.

4.2 Landlord shall hold the security deposit in accordance with applicable state law. In Delaware, security deposits exceeding 1 month's rent must be held in escrow.

4.3 Within the period required by state law (Delaware: 20 days after end of tenancy; CA: 21 days; NY: 14 days), Landlord shall return the security deposit, less any deductions for unpaid rent or damages beyond ordinary wear and tear, with an itemized statement.

### 5. Use of Premises

5.1 Tenant shall use the Premises only as a private residence and shall not conduct any business from the Premises without Landlord's written consent.

5.2 Tenant shall not engage in any unlawful activity at the Premises.

### 6. Landlord's obligations + warranty of habitability

6.1 Landlord covenants that the Premises are fit for habitation and shall:
(a) maintain the structure, plumbing, electrical, heating, and ventilation systems;
(b) comply with all applicable building, housing, and health codes;
(c) provide reasonable notice (typically 24–48 hours, per state law) before entry except in emergency.

6.2 Landlord acknowledges the implied warranty of habitability under state law, which cannot be waived by Tenant.

### 7. Tenant's obligations

7.1 Tenant shall:
(a) pay rent on time;
(b) keep the Premises clean and sanitary;
(c) dispose of garbage in a clean and sanitary manner;
(d) not damage the Premises (intentionally or negligently);
(e) not disturb the peaceable enjoyment of neighbouring tenants;
(f) at the end of the tenancy, return the Premises in the same condition as at the start, ordinary wear and tear excepted.

### 8. Federal Lead-Based Paint Disclosure

8.1 If the Premises were built before 1978, Landlord shall provide Tenant with the EPA-required Lead-Based Paint Disclosure Form (Form 7411) and the EPA pamphlet "Protect Your Family From Lead in Your Home" before signing this Lease.

### 9. Fair Housing

9.1 Landlord does not discriminate on the basis of race, colour, national origin, religion, sex (including gender identity and sexual orientation), familial status, or disability, in accordance with the Fair Housing Act + applicable state and local fair housing law.

### 10. Termination

10.1 Either party may terminate a month-to-month tenancy by giving written notice as required by state law (Delaware: 60 days for landlord; 30 days for tenant; varies by state).

10.2 For breach of the Lease, the non-breaching party may give a notice to cure or quit per state law before terminating or filing for eviction.

### 11. Servicemembers Civil Relief Act

11.1 If Tenant is a member of the armed forces who receives a permanent change of station or deployment of 90 days or more, Tenant may terminate this Lease on 30 days' written notice + provide proof of orders, in accordance with 50 U.S.C. § 3955.

### 12. Eviction

12.1 Eviction (where authorised) shall proceed only by judicial process. Landlord shall not engage in self-help eviction (lockouts, utility shutoffs).

### 13. Governing law

13.1 This Lease is governed by the laws of the State of Delaware (or the state in which the Premises are located).

13.2 Any dispute shall be brought in the state court of competent jurisdiction in the county where the Premises are located.

### 14. Severability

14.1 If any term of this Lease is held unenforceable, the remaining terms remain in full force.

---

**Signed by Landlord on {{executionDate}}:**

Signature: ____________________________

**{{landlordName}}**

**Signed by Tenant(s) on {{executionDate}}:**

Signature: ____________________________

**{{tenantName}}**

---

**Important:** State-specific landlord-tenant law overrides any conflicting term in this Lease. Local rent-control ordinances + lead-paint disclosure + state-specific security-deposit + entry-notice rules MUST be verified separately for each tenancy.`;
    return substitute(body, SHARED_VARIABLES, values).body;
  },
});
