/**
 * lib/court-rules.ts — deadline rules across NZ / AU / UK / US courts.
 *
 * Each rule maps a triggering event ("statement of claim served",
 * "RFE issued by USCIS", "FCA judgment delivered") to a derived deadline
 * with the statutory authority. The deadline calculator at /tools/court-rules
 * uses these to produce a ready-to-paste calendar entry for the partner.
 *
 * Counts are calendar days unless explicitly noted as business days. Public
 * holidays are not yet handled (v2 wires the four public-holiday calendars).
 *
 * IMPORTANT — this catalogue is informational. It is not a substitute for
 * checking the live court rule. Marco Reid's audit posture requires the
 * partner to verify the deadline against the rule before relying on it.
 * Output from the calculator is watermarked accordingly.
 */

export type Jurisdiction = "NZ" | "AU" | "UK" | "US";

export type CountKind = "CALENDAR_DAYS" | "BUSINESS_DAYS" | "MONTHS" | "YEARS";

export interface CourtRule {
  slug: string;
  jurisdiction: Jurisdiction;
  /** Which court / tribunal / regulator this rule belongs to. */
  forum: string;
  /** Plain-English description of the triggering event. */
  trigger: string;
  /** Plain-English description of the deadline. */
  deadline: string;
  /** Number of units to count from the trigger date. */
  count: number;
  countKind: CountKind;
  /** The statutory or rule citation. */
  authority: string;
  /** Special notes, gotchas, common errors. */
  notes?: string;
  /** Tagged practice area for filtering. */
  tags: ReadonlyArray<string>;
}

export const COURT_RULES: ReadonlyArray<CourtRule> = [
  // === NZ ===
  {
    slug: "nz-district-court-statement-of-defence",
    jurisdiction: "NZ",
    forum: "NZ District Court",
    trigger: "Statement of claim served on defendant",
    deadline: "Statement of defence must be filed",
    count: 25,
    countKind: "BUSINESS_DAYS",
    authority: "District Court Rules 2014 r 5.43",
    notes:
      "Counts working days. Outside NZ defendants get 30 working days under r 6.10.",
    tags: ["litigation", "civil"],
  },
  {
    slug: "nz-high-court-statement-of-defence",
    jurisdiction: "NZ",
    forum: "NZ High Court",
    trigger: "Statement of claim served on defendant",
    deadline: "Statement of defence must be filed",
    count: 25,
    countKind: "BUSINESS_DAYS",
    authority: "High Court Rules 2016 r 5.46",
    notes:
      "Working days. Service outside NZ extends to 30 working days under r 6.27.",
    tags: ["litigation", "civil"],
  },
  {
    slug: "nz-tenancy-tribunal-application",
    jurisdiction: "NZ",
    forum: "NZ Tenancy Tribunal",
    trigger: "14-day notice to remedy expires (rent arrears)",
    deadline: "Earliest date Tribunal application can be filed for termination",
    count: 14,
    countKind: "CALENDAR_DAYS",
    authority: "Residential Tenancies Act 1986 s 55",
    notes:
      "Notice must be in approved form. Premises must still be in arrears at filing time.",
    tags: ["tenancy"],
  },
  {
    slug: "nz-family-court-protection-final",
    jurisdiction: "NZ",
    forum: "NZ Family Court",
    trigger: "Without-notice protection order made",
    deadline: "Order becomes final unless respondent applies for hearing",
    count: 3,
    countKind: "MONTHS",
    authority: "Family Violence Act 2018 s 83(2)",
    notes:
      "Respondent has the burden of seeking a defended hearing. Otherwise the temporary order becomes final automatically.",
    tags: ["family", "protection"],
  },
  {
    slug: "nz-employment-personal-grievance",
    jurisdiction: "NZ",
    forum: "Employment Relations Authority",
    trigger: "Grievance event (eg. dismissal)",
    deadline: "Personal grievance must be raised with employer",
    count: 90,
    countKind: "CALENDAR_DAYS",
    authority: "Employment Relations Act 2000 s 114",
    notes:
      "12 months for sexual harassment grievances. Late grievances need leave under s 114(3).",
    tags: ["employment"],
  },
  {
    slug: "nz-erc-appeal",
    jurisdiction: "NZ",
    forum: "Employment Court",
    trigger: "ERA determination delivered",
    deadline: "Notice of challenge to Employment Court must be filed",
    count: 28,
    countKind: "CALENDAR_DAYS",
    authority: "Employment Relations Act 2000 s 179",
    notes: "Counts calendar days from delivery, not service.",
    tags: ["employment", "appeal"],
  },
  {
    slug: "nz-companies-act-statutory-demand",
    jurisdiction: "NZ",
    forum: "NZ High Court",
    trigger: "Statutory demand served on company",
    deadline: "Company must comply or apply to set aside",
    count: 15,
    countKind: "BUSINESS_DAYS",
    authority: "Companies Act 1993 s 289",
    notes:
      "Failure to comply gives rise to a presumption of insolvency under s 287.",
    tags: ["insolvency", "commercial"],
  },
  {
    slug: "nz-court-of-appeal-civil",
    jurisdiction: "NZ",
    forum: "NZ Court of Appeal (civil)",
    trigger: "High Court judgment delivered",
    deadline: "Notice of appeal must be filed and served",
    count: 20,
    countKind: "BUSINESS_DAYS",
    authority: "Court of Appeal (Civil) Rules 2005 r 29",
    notes: "Working days. Extension requires leave.",
    tags: ["litigation", "appeal"],
  },

  // === AU ===
  {
    slug: "au-federal-court-defence",
    jurisdiction: "AU",
    forum: "Federal Court of Australia",
    trigger: "Originating application served (or notice of appearance filed)",
    deadline: "Defence must be filed",
    count: 28,
    countKind: "CALENDAR_DAYS",
    authority: "Federal Court Rules 2011 r 16.32",
    notes:
      "Default judgment available if not filed in time. Time runs from the later of service or appearance.",
    tags: ["litigation", "civil"],
  },
  {
    slug: "au-fwc-unfair-dismissal",
    jurisdiction: "AU",
    forum: "Fair Work Commission",
    trigger: "Date of dismissal",
    deadline: "Unfair dismissal application must be lodged",
    count: 21,
    countKind: "CALENDAR_DAYS",
    authority: "Fair Work Act 2009 s 394(2)",
    notes:
      "Out-of-time applications need exceptional circumstances under s 394(3).",
    tags: ["employment"],
  },
  {
    slug: "au-fwc-general-protections",
    jurisdiction: "AU",
    forum: "Fair Work Commission",
    trigger: "Adverse action / dismissal",
    deadline: "General protections application must be lodged",
    count: 21,
    countKind: "CALENDAR_DAYS",
    authority: "Fair Work Act 2009 s 366",
    notes:
      "Same 21-day window as unfair dismissal. Different forum process from there.",
    tags: ["employment"],
  },
  {
    slug: "au-asic-statutory-demand",
    jurisdiction: "AU",
    forum: "Federal Court / state Supreme Court",
    trigger: "Statutory demand served",
    deadline: "Application to set aside must be filed and served",
    count: 21,
    countKind: "CALENDAR_DAYS",
    authority: "Corporations Act 2001 s 459G",
    notes:
      "Strict 21 days. Cannot be extended by court (David Grant & Co v Westpac).",
    tags: ["insolvency", "commercial"],
  },
  {
    slug: "au-fcfcoa-divorce",
    jurisdiction: "AU",
    forum: "Federal Circuit and Family Court of Australia",
    trigger: "Date of separation",
    deadline:
      "Earliest date divorce application can be filed (must be separated 12 months)",
    count: 12,
    countKind: "MONTHS",
    authority: "Family Law Act 1975 s 48",
    notes:
      "Resumption of cohabitation under 3 months does not break the period (s 50).",
    tags: ["family"],
  },
  {
    slug: "au-fcfcoa-property",
    jurisdiction: "AU",
    forum: "Federal Circuit and Family Court of Australia",
    trigger: "Date divorce order takes effect",
    deadline:
      "Property settlement application must be filed (or leave required)",
    count: 12,
    countKind: "MONTHS",
    authority: "Family Law Act 1975 s 44(3)",
    notes: "De facto: 24 months from separation (s 44(5)).",
    tags: ["family", "property"],
  },
  {
    slug: "au-immigration-aat-merit-review",
    jurisdiction: "AU",
    forum: "Administrative Appeals Tribunal (Migration & Refugee Division)",
    trigger: "Department of Home Affairs decision notified",
    deadline:
      "Application for merits review must be lodged (most visa refusals)",
    count: 21,
    countKind: "CALENDAR_DAYS",
    authority: "Migration Act 1958 s 347 + Migration Regulations 1994",
    notes:
      "Some categories have 28 or 70 days. Onshore vs offshore matters. Verify per visa subclass.",
    tags: ["immigration", "appeal"],
  },

  // === UK ===
  {
    slug: "uk-cpr-acknowledgement-of-service",
    jurisdiction: "UK",
    forum: "England and Wales civil courts",
    trigger: "Particulars of claim served (or claim form if PoC follow)",
    deadline: "Acknowledgement of service must be filed",
    count: 14,
    countKind: "CALENDAR_DAYS",
    authority: "Civil Procedure Rules 1998 r 10.3",
    notes: "Then 28 days from service to file the defence under r 15.4.",
    tags: ["litigation", "civil"],
  },
  {
    slug: "uk-cpr-defence",
    jurisdiction: "UK",
    forum: "England and Wales civil courts",
    trigger: "Particulars of claim served (and acknowledgement filed)",
    deadline: "Defence must be filed",
    count: 28,
    countKind: "CALENDAR_DAYS",
    authority: "Civil Procedure Rules 1998 r 15.4",
    notes:
      "If no AoS is filed, defence is due in 14 days from service. AoS extends to 28.",
    tags: ["litigation", "civil"],
  },
  {
    slug: "uk-employment-tribunal-claim",
    jurisdiction: "UK",
    forum: "Employment Tribunal",
    trigger: "Effective date of termination (or act complained of)",
    deadline: "ET1 claim must be presented to the Tribunal",
    count: 3,
    countKind: "MONTHS",
    authority: "Employment Rights Act 1996 s 111(2)",
    notes:
      "Three months less one day. ACAS Early Conciliation suspends the clock under s 207B. Discrimination: 3 months under Equality Act 2010 s 123.",
    tags: ["employment"],
  },
  {
    slug: "uk-divorce-conditional-order",
    jurisdiction: "UK",
    forum: "Family Court (England & Wales)",
    trigger: "Application for divorce filed",
    deadline:
      "Earliest date conditional order (decree nisi) can be applied for",
    count: 20,
    countKind: "CALENDAR_DAYS",
    authority: "Matrimonial Causes Act 1973 (no-fault, post Apr 2022)",
    notes:
      "Plus a further 6 weeks + 1 day from conditional order to apply for final order.",
    tags: ["family"],
  },
  {
    slug: "uk-companies-statutory-demand",
    jurisdiction: "UK",
    forum: "England and Wales courts",
    trigger: "Statutory demand served on company",
    deadline: "Company must pay or apply to restrain winding-up petition",
    count: 21,
    countKind: "CALENDAR_DAYS",
    authority: "Insolvency Act 1986 s 123(1)(a)",
    notes:
      "Failure gives rise to deemed inability to pay. Demand must be in prescribed form.",
    tags: ["insolvency", "commercial"],
  },
  {
    slug: "uk-cma-merger-phase-1",
    jurisdiction: "UK",
    forum: "Competition and Markets Authority",
    trigger: "Merger notice deemed complete",
    deadline: "Phase 1 decision deadline (clear / refer / accept undertakings)",
    count: 40,
    countKind: "BUSINESS_DAYS",
    authority: "Enterprise Act 2002 s 34A + s 73",
    notes: "CMA may extend by 20 working days for negotiated UILs.",
    tags: ["competition", "commercial"],
  },

  // === US ===
  {
    slug: "us-frcp-answer",
    jurisdiction: "US",
    forum: "US District Courts (federal)",
    trigger: "Summons and complaint served",
    deadline: "Answer or pre-answer motion must be filed",
    count: 21,
    countKind: "CALENDAR_DAYS",
    authority: "Fed. R. Civ. P. 12(a)(1)(A)(i)",
    notes:
      "60 days if waiver of service used (12(a)(1)(A)(ii)), 60 days for US, agencies, officers (12(a)(2)).",
    tags: ["litigation", "civil", "federal"],
  },
  {
    slug: "us-frcp-removal",
    jurisdiction: "US",
    forum: "US District Courts (federal)",
    trigger: "Service of complaint in state court",
    deadline: "Notice of removal to federal court must be filed",
    count: 30,
    countKind: "CALENDAR_DAYS",
    authority: "28 U.S.C. § 1446(b)",
    notes:
      "Diversity removal capped at 1 year from commencement under § 1446(c)(1) absent bad faith.",
    tags: ["litigation", "federal"],
  },
  {
    slug: "us-uscis-rfe-response",
    jurisdiction: "US",
    forum: "USCIS",
    trigger: "Request for Evidence (RFE) issued",
    deadline: "Response must be received by USCIS",
    count: 87,
    countKind: "CALENDAR_DAYS",
    authority: "8 CFR § 103.2(b)(8)(iv)",
    notes:
      "Maximum is 87 days; specific case may have shorter window stated on the RFE. Mail-time matters.",
    tags: ["immigration", "federal"],
  },
  {
    slug: "us-uscis-noid-response",
    jurisdiction: "US",
    forum: "USCIS",
    trigger: "Notice of Intent to Deny (NOID) issued",
    deadline: "Response must be received by USCIS",
    count: 30,
    countKind: "CALENDAR_DAYS",
    authority: "8 CFR § 103.2(b)(8)(iv)",
    notes:
      "Maximum 30 days. NOIDs are unforgiving; treat the receipt date conservatively.",
    tags: ["immigration", "federal"],
  },
  {
    slug: "us-eeoc-charge",
    jurisdiction: "US",
    forum: "Equal Employment Opportunity Commission",
    trigger: "Discriminatory act / adverse employment action",
    deadline: "EEOC charge must be filed",
    count: 180,
    countKind: "CALENDAR_DAYS",
    authority: "42 U.S.C. § 2000e-5(e)(1)",
    notes:
      "Extends to 300 days where state/local FEPA exists (most states). EPA: 2 yrs / 3 yrs willful, no charge needed.",
    tags: ["employment"],
  },
  {
    slug: "us-eeoc-right-to-sue",
    jurisdiction: "US",
    forum: "US District Courts (federal)",
    trigger: "EEOC right-to-sue notice issued",
    deadline: "Civil action must be filed in federal court",
    count: 90,
    countKind: "CALENDAR_DAYS",
    authority: "42 U.S.C. § 2000e-5(f)(1)",
    notes:
      "Strict. Late filing dismissed unless equitable tolling applies (rare).",
    tags: ["employment", "federal"],
  },
  {
    slug: "us-fed-circuit-appeal",
    jurisdiction: "US",
    forum: "US Court of Appeals (civil)",
    trigger: "District court judgment entered",
    deadline: "Notice of appeal must be filed",
    count: 30,
    countKind: "CALENDAR_DAYS",
    authority: "Fed. R. App. P. 4(a)(1)(A)",
    notes:
      "60 days if US is a party (FRAP 4(a)(1)(B)). 14 days extension for cross-appeal.",
    tags: ["litigation", "appeal", "federal"],
  },
  {
    slug: "us-hsr-waiting-period",
    jurisdiction: "US",
    forum: "FTC + DOJ Antitrust Division",
    trigger: "HSR filing accepted",
    deadline: "Initial waiting period expires (transaction may close)",
    count: 30,
    countKind: "CALENDAR_DAYS",
    authority: "Hart-Scott-Rodino Act, 15 U.S.C. § 18a(b)(1)",
    notes:
      "15 days for cash tender offers / bankruptcy 363 sales. Second Request resets the clock.",
    tags: ["competition", "commercial"],
  },
];

export const COURT_RULES_BY_SLUG: Record<string, CourtRule> = Object.fromEntries(
  COURT_RULES.map((r) => [r.slug, r]),
);

/**
 * Add `count` units of `kind` to a starting date. Business-day math is naive
 * for now (skips Saturday + Sunday only — public holidays not yet handled).
 */
export function applyCount(start: Date, count: number, kind: CountKind): Date {
  const d = new Date(start);
  if (kind === "CALENDAR_DAYS") {
    d.setDate(d.getDate() + count);
    return d;
  }
  if (kind === "MONTHS") {
    d.setMonth(d.getMonth() + count);
    return d;
  }
  if (kind === "YEARS") {
    d.setFullYear(d.getFullYear() + count);
    return d;
  }
  // BUSINESS_DAYS — skip Saturdays + Sundays.
  let added = 0;
  while (added < count) {
    d.setDate(d.getDate() + 1);
    const dow = d.getDay();
    if (dow !== 0 && dow !== 6) added += 1;
  }
  return d;
}
