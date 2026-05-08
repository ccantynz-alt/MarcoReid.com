/**
 * Employment agreement templates — NZ / AU / UK / US.
 *
 * Each variant respects the relevant employment-law tradition:
 *   - NZ: Employment Relations Act 2000 + Holidays Act 2003 + minimum
 *     entitlements. 90-day trial periods reinstated. Mandatory good-faith
 *     duty. Personal grievance rights cannot be contracted out of.
 *   - AU: Fair Work Act 2009 + National Employment Standards + applicable
 *     Modern Award. Better Off Overall Test (BOOT) where displacing an EA.
 *   - UK: Employment Rights Act 1996. Written statement of particulars
 *     mandatory under s 1 (must be given on or before day 1 of employment
 *     since 6 April 2020). Working Time Regulations 1998.
 *   - US: At-will employment (default in 49 of 50 states; Montana is
 *     exception). DTSA whistleblower notice required. State law overrides
 *     employer-favourable terms if more protective.
 */

import {
  registerTemplate,
  substitute,
  type DocumentTemplate,
  type TemplateVariable,
} from "./engine";

const SHARED_VARIABLES: TemplateVariable[] = [
  {
    key: "employerName",
    label: "Employer (full legal name)",
    required: true,
    placeholder: "[Employer's full legal name]",
    example: "Acme Holdings Limited",
  },
  {
    key: "employerAddress",
    label: "Employer registered address",
    placeholder: "[Employer's registered address]",
    example: "Level 5, 123 Queen Street, Auckland 1010",
  },
  {
    key: "employeeName",
    label: "Employee full name",
    required: true,
    placeholder: "[Employee's full legal name]",
    example: "Aroha Ngata",
  },
  {
    key: "employeeAddress",
    label: "Employee residential address",
    placeholder: "[Employee's residential address]",
    example: "27 Beach Road, Mount Maunganui",
  },
  {
    key: "position",
    label: "Position / job title",
    required: true,
    placeholder: "[Position / job title]",
    example: "Senior Software Engineer",
  },
  {
    key: "startDate",
    label: "Start date",
    required: true,
    placeholder: "[Start date]",
    example: "1 July 2026",
  },
  {
    key: "salary",
    label: "Salary / wages",
    required: true,
    placeholder: "[Salary / wages, including currency + frequency]",
    example: "NZD $145,000 per annum, paid fortnightly",
  },
  {
    key: "hoursPerWeek",
    label: "Standard hours per week",
    placeholder: "40",
    example: "40",
  },
  {
    key: "workLocation",
    label: "Place of work",
    placeholder: "[Place of work]",
    example: "Hybrid — Auckland office and remote",
  },
];

// === NZ ===
registerTemplate({
  slug: "employment-agreement",
  jurisdiction: "NZ",
  label: "Individual Employment Agreement (New Zealand)",
  summary:
    "NZ Individual Employment Agreement compliant with Employment Relations Act 2000 + Holidays Act 2003 + Minimum Wage Act 1983. Includes mandatory written-agreement clauses + 90-day trial period (reinstated 2024) where applicable.",
  authorities: [
    "Employment Relations Act 2000 (mandatory written agreement under s 65)",
    "Holidays Act 2003 (minimum 4 weeks annual leave + 11 public holidays)",
    "Minimum Wage Act 1983 + Wages Protection Act 1983",
    "KiwiSaver Act 2006 (employer contributions)",
    "Health and Safety at Work Act 2015",
    "Privacy Act 2020 (employee personal information)",
  ],
  variables: [
    ...SHARED_VARIABLES,
    {
      key: "trialPeriod",
      label: "90-day trial period (yes / no)",
      placeholder: "no",
      hint: "90-day trial periods are available to all employers as of late 2023.",
    },
  ],
  reviewerNotes:
    "NZ Employment Relations Act 2000 s 65 makes the written agreement mandatory. Confirm whether the employer is using the 90-day trial period (s 67A) — if yes, ensure the trial-period clause is in the agreement BEFORE the employee starts work, otherwise it is unenforceable. Personal grievance rights cannot be contracted out of (s 4).",
  render: (values) => {
    const body = `## Individual Employment Agreement (New Zealand)

**Date:** {{startDate}}

**Between:**

(1) **{{employerName}}** of {{employerAddress}} (the **"Employer"**); and

(2) **{{employeeName}}** of {{employeeAddress}} (the **"Employee"**).

### 1. Position and duties

1.1 The Employer engages the Employee in the position of **{{position}}**, commencing on {{startDate}}.

1.2 The Employee will perform the duties of the position to a reasonable and competent standard and follow the lawful and reasonable instructions of the Employer.

### 2. Place of work

2.1 The Employee's principal place of work is {{workLocation}}.

### 3. Hours of work

3.1 The Employee's standard hours are {{hoursPerWeek}} hours per week, ordinarily worked Monday to Friday.

3.2 The parties acknowledge that some flexibility may be required from time to time, and that any work outside ordinary hours will be by agreement.

### 4. Remuneration

4.1 The Employer will pay the Employee {{salary}}, less PAYE and other lawful deductions.

4.2 The Employer will make KiwiSaver employer contributions of at least 3% of the Employee's gross earnings (or the prescribed minimum from time to time), unless the Employee has opted out under s 14 of the KiwiSaver Act 2006.

### 5. Annual leave

5.1 The Employee is entitled to four (4) weeks' paid annual leave per year of continuous employment, as required by the Holidays Act 2003.

### 6. Public holidays

6.1 The Employee is entitled to the eleven (11) public holidays each year if they would otherwise be a working day for the Employee, as required by the Holidays Act 2003.

### 7. Sick leave + bereavement leave

7.1 The Employee is entitled to ten (10) days' paid sick leave per year after six months of continuous employment, in accordance with s 65 of the Holidays Act 2003.

7.2 The Employee is entitled to bereavement leave as required by ss 69 to 71 of the Holidays Act 2003.

### 8. Confidentiality

8.1 The Employee will not disclose any confidential information of the Employer or its clients to any third party, either during or after employment, except as required by law or with the Employer's written consent.

### 9. Intellectual property

9.1 All intellectual property created by the Employee in the course of employment is owned by the Employer, and the Employee assigns to the Employer all such intellectual property and waives any moral rights in it to the maximum extent permitted by law.

### 10. Termination

10.1 Either party may terminate this agreement by giving the other party four (4) weeks' written notice.

10.2 The Employer may terminate this agreement summarily where the Employee commits serious misconduct, in accordance with the Employment Relations Act 2000.

### 11. Trial period (if applicable — see clause 11.2)

11.1 If the parties have agreed in writing that this agreement is subject to a trial period under s 67A of the Employment Relations Act 2000, the trial period clause set out below applies.

11.2 **Trial period in this agreement: {{trialPeriod}}**.

11.3 Where the trial period applies: the trial period is ninety (90) days from the start date in clause 1.1. During the trial period, the Employer may give written notice of termination at any time, and the Employee may not bring a personal grievance for unjustified dismissal under s 67B(2). All other rights (e.g. personal grievance for discrimination, harassment, unjustified disadvantage) are preserved.

### 12. Resolving employment relationship problems

12.1 The parties will deal with any employment relationship problems in good faith under Part 9 of the Employment Relations Act 2000. The first step is mediation through the Ministry of Business, Innovation and Employment.

12.2 The Employee may raise a personal grievance under s 103 within 90 days of the action giving rise to the grievance (or within 12 months in the case of sexual harassment).

### 13. Health and safety

13.1 The Employer will comply with its obligations under the Health and Safety at Work Act 2015. The Employee will take reasonable care for their own health and safety + comply with reasonable instructions and procedures.

### 14. Restraint of trade

14.1 For three (3) months after termination, the Employee will not, within the geographical area of the Employer's business, directly solicit any client or customer of the Employer with whom the Employee had material dealings in the last twelve months of employment.

14.2 The parties acknowledge that this restraint is reasonable to protect the Employer's legitimate business interests, and that the Employee has been compensated for the restraint as part of the salary in clause 4.

### 15. Privacy

15.1 The Employer will collect, hold, use, and disclose personal information about the Employee in accordance with the Privacy Act 2020.

### 16. Variation

16.1 This agreement may only be varied in writing signed by both parties.

### 17. Acknowledgment

17.1 The Employee acknowledges that they have been given a reasonable opportunity to seek independent advice on this agreement before signing.

---

**Executed as an agreement.**

For and on behalf of **{{employerName}}**:

Signature: ____________________________

Name:

Position:

Date:

**{{employeeName}}**:

Signature: ____________________________

Date:`;
    return substitute(body, SHARED_VARIABLES, values).body;
  },
});

// === AU ===
registerTemplate({
  slug: "employment-agreement",
  jurisdiction: "AU",
  label: "Employment Contract (Australia)",
  summary:
    "AU employment contract compliant with Fair Work Act 2009 + National Employment Standards. Modern Award + Enterprise Agreement override checks required. BOOT applies if the contract displaces a registered Award.",
  authorities: [
    "Fair Work Act 2009 (Cth) + Fair Work Regulations 2009",
    "National Employment Standards (NES) — Pt 2-2 of the FW Act",
    "Modern Awards (122+ industry awards — verify the applicable Award)",
    "Long Service Leave Acts (state-by-state)",
    "Work Health and Safety Acts (state-by-state harmonised)",
    "Superannuation Guarantee (Administration) Act 1992",
    "Privacy Act 1988 (Cth) + Australian Privacy Principles",
  ],
  variables: SHARED_VARIABLES,
  reviewerNotes:
    "Verify the applicable Modern Award (or Enterprise Agreement). If the contract is paying below-Award rates, the NES + Award rate prevails — the contract clause is unenforceable to that extent. Better Off Overall Test (BOOT) applies if the contract displaces an Award. Long-service leave is state-specific (NSW LSL Act 1955, Vic LSL Act 2018 etc.) and cannot be contracted out of.",
  render: (values) => {
    const body = `## Employment Contract (Australia)

**Date:** {{startDate}}

**Between:**

(1) **{{employerName}}** of {{employerAddress}} (the **"Employer"**); and

(2) **{{employeeName}}** of {{employeeAddress}} (the **"Employee"**).

### 1. Engagement and position

1.1 The Employer engages the Employee in the position of **{{position}}**, commencing on {{startDate}}.

1.2 The Employee's employment is on the terms of this contract together with the National Employment Standards (NES) under the Fair Work Act 2009 (Cth) and any applicable Modern Award or registered Enterprise Agreement.

### 2. Place of work

2.1 The Employee's principal location of work is {{workLocation}}.

### 3. Hours of work

3.1 The Employee's standard ordinary hours are {{hoursPerWeek}} hours per week, ordinarily worked Monday to Friday.

3.2 The Employee may be required to work reasonable additional hours, having regard to the matters in s 62(3) of the Fair Work Act 2009.

### 4. Remuneration

4.1 The Employer will pay the Employee {{salary}}, less PAYG withholding tax + other lawful deductions.

4.2 The Employer will pay superannuation contributions at the prescribed Superannuation Guarantee rate (rising to 12% from 1 July 2025) into the Employee's chosen complying super fund.

### 5. Annual leave

5.1 The Employee is entitled to four (4) weeks' paid annual leave per year of continuous service under s 87 of the Fair Work Act 2009 (or five (5) weeks for shift workers as defined).

### 6. Personal/carer's leave + compassionate leave

6.1 The Employee is entitled to ten (10) days' paid personal/carer's leave per year under s 96, plus two (2) days' compassionate leave per occasion under s 104.

### 7. Long service leave

7.1 The Employee is entitled to long service leave in accordance with the long service leave laws of the State or Territory in which they are employed.

### 8. Public holidays

8.1 The Employee is entitled to the public holidays applicable in their State or Territory under s 115.

### 9. Confidentiality

9.1 The Employee will not disclose any confidential information of the Employer to any third party, either during or after employment, except as required by law or with the Employer's written consent.

### 10. Intellectual property

10.1 All intellectual property created by the Employee in the course of employment is owned by the Employer.

### 11. Termination of employment

11.1 The minimum period of notice of termination is the period prescribed by s 117 of the Fair Work Act 2009 (which is determined by the Employee's period of continuous service).

11.2 Either party may terminate this contract by giving the other party {{hoursPerWeek}} weeks' written notice (or, if longer, the minimum period under s 117).

11.3 The Employer may terminate the Employee's employment without notice for serious misconduct as defined in the Fair Work Regulations 2009 r 1.07.

### 12. Restraint of trade

12.1 For three (3) months after termination, the Employee will not directly solicit any client or customer of the Employer with whom the Employee had material dealings in the last twelve (12) months.

12.2 The parties acknowledge that the restraint is reasonable to protect the Employer's legitimate business interests, and that the consideration for the restraint is included in the salary in clause 4.

### 13. Health and safety

13.1 The Employer + Employee will comply with their respective obligations under the Work Health and Safety Act 2011 (or the equivalent state/territory legislation).

### 14. Privacy

14.1 The Employer will handle the Employee's personal information in accordance with the Privacy Act 1988 (Cth) + Australian Privacy Principles.

### 15. Award + NES override

15.1 If any provision of this contract is inconsistent with the NES or any applicable Modern Award or registered Enterprise Agreement, the NES, Award, or Agreement (as applicable) prevails to the extent of the inconsistency.

### 16. Variation

16.1 This contract may only be varied in writing signed by both parties.

---

**Executed as a contract.**

For and on behalf of **{{employerName}}**:

Signature: ____________________________

Name:

Position:

Date:

**{{employeeName}}**:

Signature: ____________________________

Date:`;
    return substitute(body, SHARED_VARIABLES, values).body;
  },
});

// === UK ===
registerTemplate({
  slug: "employment-agreement",
  jurisdiction: "UK",
  label: "Statement of Employment Particulars + Contract (England & Wales)",
  summary:
    "UK contract of employment doubling as the s 1 Employment Rights Act 1996 written statement of particulars. Mandatory delivery on or before day 1 since 6 April 2020. Working Time Regulations 1998 + statutory minimum holiday + sick pay + auto-enrolment pension.",
  authorities: [
    "Employment Rights Act 1996 (s 1 written statement, s 86 notice, s 94 unfair dismissal)",
    "Equality Act 2010 (protected characteristics, reasonable adjustments)",
    "Working Time Regulations 1998 (28 days inc. bank holidays minimum)",
    "Pensions Act 2008 (auto-enrolment)",
    "Statutory Sick Pay (Social Security Contributions and Benefits Act 1992)",
    "UK GDPR + Data Protection Act 2018",
  ],
  variables: SHARED_VARIABLES,
  reviewerNotes:
    "S 1 ERA 1996 makes the written statement mandatory on or before day 1. Failure to provide attracts 2-4 weeks' pay compensation under s 38 EA 2002 if also raised in another claim. Confirm pension auto-enrolment status (Pensions Regulator). Confirm statutory minimum holiday is met (28 days inclusive of bank holidays, pro-rata for part-time).",
  render: (values) => {
    const body = `## Statement of Employment Particulars and Contract of Employment

This document is both:
(a) the contract of employment between the parties; and
(b) the written statement of particulars required by section 1 of the Employment Rights Act 1996.

**Date:** {{startDate}}

**Between:**

(1) **{{employerName}}** of {{employerAddress}} (the **"Employer"**); and

(2) **{{employeeName}}** of {{employeeAddress}} (the **"Employee"**).

### 1. Job title + duties

1.1 The Employee is employed in the position of **{{position}}**.

1.2 The Employee will perform such duties as may reasonably be required by the Employer consistent with the position.

### 2. Date of commencement

2.1 The Employee's continuous employment with the Employer began (or will begin) on {{startDate}}.

2.2 No employment with a previous employer counts as part of the Employee's continuous employment with the Employer.

### 3. Place of work

3.1 The Employee's normal place of work is {{workLocation}}.

### 4. Hours of work

4.1 The Employee's normal hours are {{hoursPerWeek}} hours per week.

4.2 The Employee may be required to work additional hours necessary for the proper performance of duties, subject to the Working Time Regulations 1998 and the Employee's right to opt out of the 48-hour weekly maximum.

### 5. Remuneration

5.1 The Employer will pay the Employee {{salary}}, subject to deductions for PAYE income tax + National Insurance contributions.

5.2 The Employer will enrol the Employee into a qualifying pension scheme under the Pensions Act 2008 auto-enrolment regime, unless an exemption applies. The Employee may opt out within 1 month of enrolment.

### 6. Holiday entitlement

6.1 The Employee is entitled to 28 days' paid holiday per holiday year (inclusive of bank and public holidays), pro-rated for part-time work, in accordance with the Working Time Regulations 1998.

### 7. Sickness absence

7.1 The Employee will be paid Statutory Sick Pay (SSP) in accordance with the Social Security Contributions and Benefits Act 1992 from the fourth qualifying day of incapacity, subject to compliance with the Employer's sickness reporting procedures.

### 8. Confidentiality

8.1 The Employee will keep confidential all confidential information of the Employer + its clients during and after employment, save where disclosure is permitted by the Employer or required by law.

### 9. Intellectual property

9.1 All inventions, designs, copyright works, and other intellectual property created by the Employee in the course of employment vest in the Employer in accordance with the Patents Act 1977, the Copyright, Designs and Patents Act 1988, and the Registered Designs Act 1949.

### 10. Notice of termination

10.1 The minimum statutory notice periods under s 86 of the Employment Rights Act 1996 apply.

10.2 Either party may terminate this contract by giving the other party three (3) months' written notice (or, if longer, the minimum statutory period under s 86).

10.3 The Employer may terminate without notice in cases of gross misconduct.

### 11. Disciplinary + grievance procedures

11.1 The Employer's disciplinary and grievance procedures (set out in the Employee Handbook) apply. They follow the ACAS Code of Practice on Disciplinary and Grievance Procedures.

### 12. Restrictive covenants

12.1 For three (3) months after termination, the Employee will not, within the United Kingdom, solicit business from any client of the Employer with whom the Employee had material dealings in the 12 months before termination.

12.2 The parties acknowledge that this covenant is reasonable to protect the Employer's legitimate business interests.

### 13. Data protection

13.1 The Employer will process the Employee's personal data in accordance with the UK GDPR + Data Protection Act 2018, as set out in the Employee Privacy Notice.

### 14. Collective agreements

14.1 No collective agreements directly affect the terms of the Employee's employment unless expressly stated.

### 15. Governing law and jurisdiction

15.1 This contract is governed by the laws of England and Wales, and the parties submit to the exclusive jurisdiction of the courts of England and Wales (with the exception of Employment Tribunal claims, which are dealt with under the relevant Tribunal rules).

---

**Signed:**

For and on behalf of **{{employerName}}**:

Signature: ____________________________

Name:

Position:

Date:

**{{employeeName}}**:

Signature: ____________________________

Date:`;
    return substitute(body, SHARED_VARIABLES, values).body;
  },
});

// === US ===
registerTemplate({
  slug: "employment-agreement",
  jurisdiction: "US",
  label: "Employment Agreement (United States · default Delaware governing law)",
  summary:
    "US at-will employment agreement (default in 49 states; Montana is the exception). Includes DTSA whistleblower notice (mandatory for exemplary-damages eligibility), invention assignment, and customary restrictive covenants. State law overrides employer-favourable terms if more protective.",
  authorities: [
    "Fair Labor Standards Act (FLSA) — minimum wage + overtime + exempt classification",
    "Title VII Civil Rights Act 1964 + ADA + ADEA + Equal Pay Act",
    "Family and Medical Leave Act 1993 (FMLA — 12 weeks unpaid leave eligibility)",
    "Defend Trade Secrets Act 2016 (DTSA) — including s 1833(b) whistleblower notice",
    "Employee Retirement Income Security Act (ERISA) — benefit plan governance",
    "State employment laws — vary significantly (CA FEHA, NY HRL, etc. often more protective)",
    "Worker Adjustment and Retraining Notification Act (WARN) — 60-day mass-layoff notice",
  ],
  variables: SHARED_VARIABLES,
  reviewerNotes:
    "DTSA s 1833(b) whistleblower notice in clause 11 is mandatory for the Employer to be eligible for exemplary damages and attorneys' fees in trade-secret claims. Do not remove. Verify state law: CA bans most employee non-compete clauses outright (Bus & Prof Code s 16600); MN, ND, OK ban on similar grounds; FTC non-compete rule paused by court but watch for resumption. NY + IL impose disclosure requirements. NY has wage-transparency obligations.",
  render: (values) => {
    const body = `## Employment Agreement

**Effective:** {{startDate}}

**Between:**

(1) **{{employerName}}** of {{employerAddress}} (the **"Company"**); and

(2) **{{employeeName}}** of {{employeeAddress}} (the **"Employee"**).

### 1. At-will employment

1.1 The Employee's employment with the Company is **at-will**. Either the Employee or the Company may terminate the employment relationship at any time, with or without cause, with or without notice, subject only to the notice obligations in clause 10 below and any applicable federal, state, or local law.

1.2 No representation, oral or written, by anyone other than the Chief Executive Officer of the Company expressly + in writing modifying the at-will relationship is binding.

### 2. Position + duties

2.1 The Employee will serve as **{{position}}**, reporting to such officer of the Company as the Chief Executive Officer designates.

2.2 The Employee will devote substantially all working time + attention to the business of the Company.

### 3. Place of work

3.1 The Employee's principal place of work is {{workLocation}}.

### 4. Compensation

4.1 The Employee will be paid {{salary}}, less applicable federal + state withholdings + deductions.

4.2 The Employee's exempt / non-exempt status under the Fair Labor Standards Act will be determined by the Employee's actual duties.

### 5. Benefits

5.1 The Employee is eligible to participate in the Company's standard benefit plans (medical, dental, vision, 401(k), etc.) on the terms set forth in the applicable plan documents, which control to the extent of any inconsistency.

### 6. Vacation + leave

6.1 The Employee is entitled to vacation in accordance with the Company's policies, plus all leave required by federal + state law (FMLA, state PFL, jury duty, military leave, etc.).

### 7. Confidentiality

7.1 The Employee will not, during or after employment, use or disclose Confidential Information of the Company except in the proper performance of duties or with the Company's prior written consent or as required by law.

### 8. Invention assignment

8.1 The Employee assigns to the Company all right, title, and interest in any invention, discovery, design, or work of authorship made by the Employee during employment that relates to the Company's business or that is created using the Company's resources.

### 9. Restrictive covenants

9.1 During employment + for twelve (12) months after termination, the Employee will not solicit any employee, contractor, customer, or vendor of the Company with whom the Employee had material contact in the twelve months before termination.

9.2 During employment + for six (6) months after termination, the Employee will not engage in any business that directly competes with the Company in the geographic area in which the Employee performed services. **This non-compete clause is unenforceable in California, Minnesota, North Dakota, and Oklahoma. Where unenforceable, only the non-solicit + non-disclosure obligations apply.**

### 10. Notice of termination

10.1 Either party may terminate this Agreement on two (2) weeks' written notice (subject to clause 1 — at-will). The Company may terminate the Employee's employment without notice for cause, including without limitation: material breach of this Agreement, gross misconduct, or commission of a felony.

10.2 If the Company terminates the Employee without cause, the Company will pay the Employee any earned-but-unpaid salary + accrued vacation through the termination date.

### 11. DTSA whistleblower notice (Defend Trade Secrets Act, 18 U.S.C. § 1833(b))

11.1 An individual is not held criminally or civilly liable under any federal or state trade-secret law for the disclosure of a trade secret that:

(a) is made in confidence to a federal, state, or local government official, either directly or indirectly, or to an attorney; and is made solely for the purpose of reporting or investigating a suspected violation of law; or

(b) is made in a complaint or other document filed in a lawsuit or other proceeding, if the filing is made under seal.

11.2 An individual who files a lawsuit for retaliation by an employer for reporting a suspected violation of law may disclose the trade secret to the attorney of the individual + use the trade secret in the court proceeding, if the individual: (i) files any document containing the trade secret under seal; and (ii) does not disclose the trade secret except pursuant to court order.

### 12. Government-agency reporting carve-out

12.1 Nothing in this Agreement prevents the Employee from communicating with, providing information to, or filing a charge with the Equal Employment Opportunity Commission, the Securities and Exchange Commission, the National Labor Relations Board, the Occupational Safety and Health Administration, or any other federal, state, or local government agency.

### 13. Section 409A compliance

13.1 The Company intends that this Agreement comply with Section 409A of the Internal Revenue Code or be exempt from it. Any payment that is "deferred compensation" under § 409A will be paid at the times + in the form required by § 409A.

### 14. Governing law + jurisdiction

14.1 This Agreement is governed by the laws of the State of Delaware (or the state in which the Employee primarily works, where state law is more protective and applicable).

14.2 Any dispute arising under this Agreement will be resolved in the state or federal courts located in New Castle County, Delaware (or the appropriate court in the Employee's state of work where required).

### 15. Entire agreement

15.1 This Agreement, together with the plan documents referenced above, is the entire agreement between the parties and supersedes any prior understanding, written or oral.

---

**Acknowledged + agreed:**

For and on behalf of **{{employerName}}**:

Signature: ____________________________

Name:

Title:

Date:

**{{employeeName}}**:

Signature: ____________________________

Date:`;
    return substitute(body, SHARED_VARIABLES, values).body;
  },
});
