// Jurisdiction Configuration — Single Source of Truth
// Defines country-specific rules for all 5 target countries:
// New Zealand, Australia, United Kingdom, United States, Canada

export interface TrustAccountRule {
  name: string;
  governingBody: string;
  requiresThreeWayReconciliation: boolean;
  interestHandling: string;
  auditFrequency: string;
  notes: string;
}

export interface ProfessionalBody {
  name: string;
  abbreviation: string;
  type: "legal" | "accounting" | "tax";
  url: string;
}

export interface TaxForm {
  code: string;
  name: string;
  frequency: "annual" | "quarterly" | "monthly" | "as-needed";
  filingAuthority: string;
}

export interface VisaCategory {
  code: string;
  name: string;
  description: string;
}

export interface CourtSystem {
  name: string;
  level: "supreme" | "appellate" | "trial" | "tribunal" | "specialist";
  eFilingAvailable: boolean;
  eFilingSystem?: string;
}

export interface Jurisdiction {
  code: string;
  name: string;
  flag: string;
  currency: { code: string; symbol: string };
  legalSystem: string;
  taxAuthority: { name: string; abbreviation: string; url: string };
  taxForms: TaxForm[];
  trustAccountRules: TrustAccountRule;
  professionalBodies: ProfessionalBody[];
  courtSystems: CourtSystem[];
  visaCategories: VisaCategory[];
  legalResearchSource: { name: string; url: string } | null;
  payroll: {
    retirementScheme: string;
    employerContributions: string[];
    taxWithholding: string;
  };
  privacyLaw: string;
  dataResidency: string;
  accountingStandards: string[];
}

export const JURISDICTIONS: Record<string, Jurisdiction> = {
  // ---------------------------------------------------------------------------
  // NEW ZEALAND
  // ---------------------------------------------------------------------------
  NZ: {
    code: "NZ",
    name: "New Zealand",
    flag: "\u{1F1F3}\u{1F1FF}",
    currency: { code: "NZD", symbol: "$" },
    legalSystem: "Common law, based on English law with statutory modifications",
    taxAuthority: {
      name: "Inland Revenue",
      abbreviation: "IR",
      url: "https://www.ird.govt.nz",
    },
    taxForms: [
      {
        code: "IR3",
        name: "Individual Income Tax Return",
        frequency: "annual",
        filingAuthority: "Inland Revenue",
      },
      {
        code: "IR4",
        name: "Company Income Tax Return",
        frequency: "annual",
        filingAuthority: "Inland Revenue",
      },
      {
        code: "IR526",
        name: "Provisional Tax Return",
        frequency: "quarterly",
        filingAuthority: "Inland Revenue",
      },
      {
        code: "GST101A",
        name: "GST Return",
        frequency: "monthly",
        filingAuthority: "Inland Revenue",
      },
      {
        code: "IR348",
        name: "Employer Monthly Schedule",
        frequency: "monthly",
        filingAuthority: "Inland Revenue",
      },
    ],
    trustAccountRules: {
      name: "NZ Law Society Trust Account Regulations",
      governingBody: "Lawyers and Conveyancers Act 2006",
      requiresThreeWayReconciliation: true,
      interestHandling: "Interest paid to New Zealand Law Foundation",
      auditFrequency: "Quarterly reconciliation required",
      notes:
        "All lawyers holding client funds must maintain trust accounts in compliance with the Lawyers and Conveyancers Act 2006 and associated regulations. Trust account records must be available for inspection by the New Zealand Law Society at any time.",
    },
    professionalBodies: [
      {
        name: "New Zealand Law Society",
        abbreviation: "NZLS",
        type: "legal",
        url: "https://www.lawsociety.org.nz",
      },
      {
        name: "Chartered Accountants Australia and New Zealand",
        abbreviation: "CA ANZ",
        type: "accounting",
        url: "https://www.charteredaccountantsanz.com",
      },
      {
        name: "Tax Agents Institute of New Zealand",
        abbreviation: "TINZ",
        type: "tax",
        url: "https://www.taxagents.co.nz",
      },
    ],
    courtSystems: [
      {
        name: "Supreme Court of New Zealand",
        level: "supreme",
        eFilingAvailable: false,
      },
      {
        name: "Court of Appeal",
        level: "appellate",
        eFilingAvailable: false,
      },
      {
        name: "High Court",
        level: "trial",
        eFilingAvailable: false,
      },
      {
        name: "District Court",
        level: "trial",
        eFilingAvailable: false,
      },
      {
        name: "Employment Court",
        level: "specialist",
        eFilingAvailable: false,
      },
      {
        name: "Māori Land Court",
        level: "specialist",
        eFilingAvailable: false,
      },
      {
        name: "Environment Court",
        level: "specialist",
        eFilingAvailable: false,
      },
    ],
    visaCategories: [
      {
        code: "SMC",
        name: "Skilled Migrant Category",
        description:
          "Points-based residence visa for skilled workers with a job offer or relevant work experience in New Zealand",
      },
      {
        code: "ESS",
        name: "Essential Skills",
        description:
          "Temporary work visa for workers filling roles where no suitable New Zealand citizens or residents are available",
      },
      {
        code: "AEWV",
        name: "Accredited Employer Work Visa",
        description:
          "Work visa for migrants with a job offer from an accredited New Zealand employer",
      },
      {
        code: "PARTNERSHIP",
        name: "Partnership Visa",
        description:
          "Visa for partners of New Zealand citizens, residents, or eligible work/student visa holders",
      },
      {
        code: "STUDENT",
        name: "Student Visa",
        description:
          "Visa for international students enrolled in approved courses at New Zealand education providers",
      },
      {
        code: "INV1",
        name: "Investor 1 Category",
        description:
          "Residence visa for high-value investors willing to invest a minimum of NZD 10 million in New Zealand for 3 years",
      },
      {
        code: "INV2",
        name: "Investor 2 Category",
        description:
          "Residence visa for investors willing to invest a minimum of NZD 3 million in New Zealand for 4 years",
      },
    ],
    legalResearchSource: {
      name: "New Zealand Legal Information Institute",
      url: "https://www.nzlii.org",
    },
    payroll: {
      retirementScheme: "KiwiSaver",
      employerContributions: [
        "Employer minimum contribution: 3% of gross salary",
        "Employee contribution rates: 3%, 4%, 6%, 8%, or 10% of gross salary",
        "Employer contributions subject to ESCT (Employer Superannuation Contribution Tax)",
      ],
      taxWithholding: "PAYE (Pay As You Earn) withholding",
    },
    privacyLaw: "Privacy Act 2020",
    dataResidency:
      "No strict data residency requirements, but Privacy Act 2020 includes cross-border disclosure principles (Information Privacy Principle 12)",
    accountingStandards: [
      "NZ IFRS (New Zealand equivalents to International Financial Reporting Standards)",
      "NZ GAAP — Tier 1: NZ IFRS (large, publicly accountable entities)",
      "NZ GAAP — Tier 2: NZ IFRS Reduced Disclosure Regime",
      "NZ GAAP — Tier 3: NZ IFRS for NFPs or Simple Format Reporting",
      "NZ GAAP — Tier 4: Cash-based reporting for small NFPs",
    ],
  },

  // ---------------------------------------------------------------------------
  // AUSTRALIA
  // ---------------------------------------------------------------------------
  AU: {
    code: "AU",
    name: "Australia",
    flag: "\u{1F1E6}\u{1F1FA}",
    currency: { code: "AUD", symbol: "$" },
    legalSystem:
      "Common law, federal system with state and territory jurisdictions",
    taxAuthority: {
      name: "Australian Taxation Office",
      abbreviation: "ATO",
      url: "https://www.ato.gov.au",
    },
    taxForms: [
      {
        code: "ITR",
        name: "Individual Tax Return",
        frequency: "annual",
        filingAuthority: "Australian Taxation Office",
      },
      {
        code: "CTR",
        name: "Company Tax Return",
        frequency: "annual",
        filingAuthority: "Australian Taxation Office",
      },
      {
        code: "BAS",
        name: "Business Activity Statement",
        frequency: "quarterly",
        filingAuthority: "Australian Taxation Office",
      },
      {
        code: "IAS",
        name: "Instalment Activity Statement",
        frequency: "monthly",
        filingAuthority: "Australian Taxation Office",
      },
      {
        code: "STP",
        name: "Single Touch Payroll",
        frequency: "as-needed",
        filingAuthority: "Australian Taxation Office",
      },
    ],
    trustAccountRules: {
      name: "State-based Trust Account Regulations",
      governingBody:
        "State Law Societies and Legal Services Regulators (NSW Solicitors' Rules, VIC Legal Profession Uniform Law, QLD Trust Accounts Act 1973)",
      requiresThreeWayReconciliation: true,
      interestHandling:
        "Interest paid to state-based law foundations (e.g., Law Foundation of NSW, Victoria Law Foundation)",
      auditFrequency: "Quarterly reconciliation required",
      notes:
        "Trust account rules are governed at the state and territory level. Each state Law Society imposes its own regulations, though broad alignment exists under the Legal Profession Uniform Law framework adopted by NSW and Victoria. Queensland retains separate legislation under the Trust Accounts Act 1973.",
    },
    professionalBodies: [
      {
        name: "Law Council of Australia",
        abbreviation: "LCA",
        type: "legal",
        url: "https://www.lawcouncil.asn.au",
      },
      {
        name: "Law Society of New South Wales",
        abbreviation: "LSNSW",
        type: "legal",
        url: "https://www.lawsociety.com.au",
      },
      {
        name: "Law Institute of Victoria",
        abbreviation: "LIV",
        type: "legal",
        url: "https://www.liv.asn.au",
      },
      {
        name: "Queensland Law Society",
        abbreviation: "QLS",
        type: "legal",
        url: "https://www.qls.com.au",
      },
      {
        name: "Law Society of South Australia",
        abbreviation: "LSSA",
        type: "legal",
        url: "https://www.lawsocietysa.asn.au",
      },
      {
        name: "Law Society of Western Australia",
        abbreviation: "LSWA",
        type: "legal",
        url: "https://www.lawsocietywa.asn.au",
      },
      {
        name: "Law Society of Tasmania",
        abbreviation: "LST",
        type: "legal",
        url: "https://www.lstas.com.au",
      },
      {
        name: "CPA Australia",
        abbreviation: "CPA",
        type: "accounting",
        url: "https://www.cpaaustralia.com.au",
      },
      {
        name: "Chartered Accountants Australia and New Zealand",
        abbreviation: "CA ANZ",
        type: "accounting",
        url: "https://www.charteredaccountantsanz.com",
      },
      {
        name: "Tax Practitioners Board",
        abbreviation: "TPB",
        type: "tax",
        url: "https://www.tpb.gov.au",
      },
    ],
    courtSystems: [
      {
        name: "High Court of Australia",
        level: "supreme",
        eFilingAvailable: true,
        eFilingSystem: "High Court e-filing portal",
      },
      {
        name: "Federal Court of Australia",
        level: "appellate",
        eFilingAvailable: true,
        eFilingSystem: "Federal Court eLodgment",
      },
      {
        name: "Federal Circuit and Family Court of Australia",
        level: "trial",
        eFilingAvailable: true,
        eFilingSystem: "Commonwealth Courts Portal",
      },
      {
        name: "State/Territory Supreme Courts",
        level: "appellate",
        eFilingAvailable: true,
        eFilingSystem: "Varies by state (e.g., NSW Online Registry, VIC RedCrest)",
      },
      {
        name: "District/County Courts",
        level: "trial",
        eFilingAvailable: false,
      },
      {
        name: "Magistrates' Courts",
        level: "trial",
        eFilingAvailable: false,
      },
      {
        name: "Administrative Appeals Tribunal",
        level: "tribunal",
        eFilingAvailable: true,
        eFilingSystem: "AAT online lodgement",
      },
    ],
    visaCategories: [
      {
        code: "482",
        name: "Temporary Skill Shortage (TSS) Visa",
        description:
          "Employer-sponsored temporary visa for skilled workers in occupations on approved lists (Short-term, Medium-term, or Labour Agreement streams)",
      },
      {
        code: "189",
        name: "Skilled Independent Visa",
        description:
          "Points-based permanent residence visa for skilled workers not sponsored by an employer, state, or family member",
      },
      {
        code: "190",
        name: "Skilled Nominated Visa",
        description:
          "Permanent residence visa for skilled workers nominated by an Australian state or territory government",
      },
      {
        code: "491",
        name: "Skilled Work Regional (Provisional) Visa",
        description:
          "Provisional visa for skilled workers nominated by a state/territory or sponsored by an eligible family member to live and work in regional Australia",
      },
      {
        code: "186",
        name: "Employer Nomination Scheme (ENS) Visa",
        description:
          "Permanent residence visa for skilled workers nominated by an Australian employer",
      },
      {
        code: "500",
        name: "Student Visa",
        description:
          "Visa for international students enrolled in full-time study at registered Australian education institutions",
      },
      {
        code: "820/801",
        name: "Partner Visa (onshore)",
        description:
          "Two-stage visa for partners of Australian citizens, permanent residents, or eligible New Zealand citizens (820 temporary, leading to 801 permanent)",
      },
    ],
    legalResearchSource: {
      name: "Australasian Legal Information Institute",
      url: "https://www.austlii.edu.au",
    },
    payroll: {
      retirementScheme: "Superannuation",
      employerContributions: [
        "Superannuation Guarantee: 11.5% of ordinary time earnings (rising to 12% by 1 July 2025)",
        "Payroll tax: state-based, rates vary (e.g., NSW 5.45%, VIC 4.85%, QLD 4.75%)",
        "Workers' compensation insurance premiums (state-based)",
      ],
      taxWithholding: "PAYG (Pay As You Go) withholding",
    },
    privacyLaw: "Privacy Act 1988 (including 2022 reforms)",
    dataResidency:
      "Australian Privacy Principle 8 (APP 8) governs cross-border disclosure of personal information. No blanket data localisation requirement, but disclosure must meet APP 8 conditions.",
    accountingStandards: [
      "AASB (Australian Accounting Standards Board) standards",
      "IFRS-aligned (Australia adopted IFRS from 2005)",
    ],
  },

  // ---------------------------------------------------------------------------
  // UNITED KINGDOM
  // ---------------------------------------------------------------------------
  UK: {
    code: "UK",
    name: "United Kingdom",
    flag: "\u{1F1EC}\u{1F1E7}",
    currency: { code: "GBP", symbol: "£" },
    legalSystem:
      "Common law (England & Wales), mixed civil/common law (Scotland), common law (Northern Ireland)",
    taxAuthority: {
      name: "His Majesty's Revenue and Customs",
      abbreviation: "HMRC",
      url: "https://www.gov.uk/government/organisations/hm-revenue-customs",
    },
    taxForms: [
      {
        code: "SA100",
        name: "Self Assessment Tax Return",
        frequency: "annual",
        filingAuthority: "HMRC",
      },
      {
        code: "CT600",
        name: "Corporation Tax Return",
        frequency: "annual",
        filingAuthority: "HMRC",
      },
      {
        code: "VAT Return",
        name: "VAT Return (Making Tax Digital)",
        frequency: "quarterly",
        filingAuthority: "HMRC",
      },
      {
        code: "RTI",
        name: "Real Time Information (payroll)",
        frequency: "as-needed",
        filingAuthority: "HMRC",
      },
      {
        code: "P11D",
        name: "Benefits in Kind Return",
        frequency: "annual",
        filingAuthority: "HMRC",
      },
    ],
    trustAccountRules: {
      name: "SRA Accounts Rules 2019",
      governingBody: "Solicitors Regulation Authority (SRA)",
      requiresThreeWayReconciliation: true,
      interestHandling:
        "Interest policy required; firms must have a policy for paying a fair sum of interest to clients on client money held",
      auditFrequency:
        "Annual accountant's report required (submitted within 6 months of the end of the accounting period)",
      notes:
        "Solicitors must hold client money in a designated client account at a bank or building society approved by the SRA. Client money must be kept separate from the firm's own money. The SRA Accounts Rules 2019 replaced the previous 2011 rules with a principles-based approach.",
    },
    professionalBodies: [
      {
        name: "Solicitors Regulation Authority",
        abbreviation: "SRA",
        type: "legal",
        url: "https://www.sra.org.uk",
      },
      {
        name: "Bar Standards Board",
        abbreviation: "BSB",
        type: "legal",
        url: "https://www.barstandardsboard.org.uk",
      },
      {
        name: "Institute of Chartered Accountants in England and Wales",
        abbreviation: "ICAEW",
        type: "accounting",
        url: "https://www.icaew.com",
      },
      {
        name: "Association of Chartered Certified Accountants",
        abbreviation: "ACCA",
        type: "accounting",
        url: "https://www.accaglobal.com",
      },
      {
        name: "Chartered Institute of Taxation",
        abbreviation: "CIOT",
        type: "tax",
        url: "https://www.tax.org.uk",
      },
      {
        name: "Association of Taxation Technicians",
        abbreviation: "ATT",
        type: "tax",
        url: "https://www.att.org.uk",
      },
    ],
    courtSystems: [
      {
        name: "Supreme Court of the United Kingdom",
        level: "supreme",
        eFilingAvailable: false,
      },
      {
        name: "Court of Appeal (Civil and Criminal Divisions)",
        level: "appellate",
        eFilingAvailable: true,
        eFilingSystem: "HMCTS e-filing (CE-File)",
      },
      {
        name: "High Court of Justice (King's Bench Division)",
        level: "trial",
        eFilingAvailable: true,
        eFilingSystem: "HMCTS CE-File",
      },
      {
        name: "High Court of Justice (Chancery Division)",
        level: "trial",
        eFilingAvailable: true,
        eFilingSystem: "HMCTS CE-File",
      },
      {
        name: "High Court of Justice (Family Division)",
        level: "trial",
        eFilingAvailable: true,
        eFilingSystem: "HMCTS e-filing",
      },
      {
        name: "Crown Court",
        level: "trial",
        eFilingAvailable: false,
      },
      {
        name: "County Court",
        level: "trial",
        eFilingAvailable: true,
        eFilingSystem: "HMCTS Money Claims Online / Possession Claims Online",
      },
      {
        name: "Magistrates' Court",
        level: "trial",
        eFilingAvailable: false,
      },
      {
        name: "Employment Tribunal",
        level: "tribunal",
        eFilingAvailable: true,
        eFilingSystem: "HMCTS online submission",
      },
      {
        name: "First-tier Tribunal (Tax Chamber)",
        level: "tribunal",
        eFilingAvailable: true,
        eFilingSystem: "HMCTS online submission",
      },
    ],
    visaCategories: [
      {
        code: "SKILLED_WORKER",
        name: "Skilled Worker Visa",
        description:
          "Visa for workers with a job offer from a UK employer holding a valid sponsor licence, in an eligible occupation meeting salary thresholds",
      },
      {
        code: "GLOBAL_TALENT",
        name: "Global Talent Visa",
        description:
          "Visa for leaders or potential leaders in academia, research, arts, culture, or digital technology, endorsed by a recognised UK body",
      },
      {
        code: "INNOVATOR_FOUNDER",
        name: "Innovator Founder Visa",
        description:
          "Visa for experienced business people seeking to establish an innovative business in the UK, endorsed by an approved body",
      },
      {
        code: "GRADUATE",
        name: "Graduate Visa",
        description:
          "Post-study work visa allowing graduates of UK higher education institutions to stay and work for 2 years (3 years for PhD graduates)",
      },
      {
        code: "STUDENT",
        name: "Student Visa",
        description:
          "Visa for international students with a confirmed place at a licensed UK student sponsor (formerly Tier 4)",
      },
      {
        code: "FAMILY",
        name: "Family Visa (Spouse/Partner)",
        description:
          "Visa for partners, spouses, or family members of British citizens or persons settled in the UK",
      },
      {
        code: "ANCESTRY",
        name: "Ancestry Visa",
        description:
          "Visa for Commonwealth citizens with a grandparent born in the UK, allowing them to live and work in the UK for 5 years",
      },
    ],
    legalResearchSource: {
      name: "British and Irish Legal Information Institute",
      url: "https://www.bailii.org",
    },
    payroll: {
      retirementScheme: "Workplace Auto-Enrolment Pension",
      employerContributions: [
        "Employer National Insurance: 13.8% on earnings above the secondary threshold",
        "Employee National Insurance: 8% on earnings between primary threshold and upper earnings limit, 2% above",
        "Auto-enrolment pension: employer minimum 3% of qualifying earnings",
        "Auto-enrolment pension: employee minimum 5% of qualifying earnings (total minimum 8%)",
      ],
      taxWithholding: "PAYE (Pay As You Earn) withholding",
    },
    privacyLaw: "UK GDPR + Data Protection Act 2018",
    dataResidency:
      "UK GDPR governs international transfers. Transfers allowed to countries with UK adequacy decisions or via appropriate safeguards (Standard Contractual Clauses, Binding Corporate Rules).",
    accountingStandards: [
      "FRS 102 (The Financial Reporting Standard applicable in the UK and Republic of Ireland)",
      "FRS 105 (The Financial Reporting Standard applicable to the Micro-entities Regime)",
      "UK-adopted International Financial Reporting Standards (UK-adopted IFRS)",
    ],
  },

  // ---------------------------------------------------------------------------
  // UNITED STATES
  // ---------------------------------------------------------------------------
  US: {
    code: "US",
    name: "United States",
    flag: "\u{1F1FA}\u{1F1F8}",
    currency: { code: "USD", symbol: "$" },
    legalSystem:
      "Common law, federal system with 50 state jurisdictions, District of Columbia, and territories",
    taxAuthority: {
      name: "Internal Revenue Service",
      abbreviation: "IRS",
      url: "https://www.irs.gov",
    },
    taxForms: [
      {
        code: "1040",
        name: "U.S. Individual Income Tax Return",
        frequency: "annual",
        filingAuthority: "Internal Revenue Service",
      },
      {
        code: "1120",
        name: "U.S. Corporation Income Tax Return (C-Corp)",
        frequency: "annual",
        filingAuthority: "Internal Revenue Service",
      },
      {
        code: "1065",
        name: "U.S. Return of Partnership Income",
        frequency: "annual",
        filingAuthority: "Internal Revenue Service",
      },
      {
        code: "1120-S",
        name: "U.S. Income Tax Return for an S Corporation",
        frequency: "annual",
        filingAuthority: "Internal Revenue Service",
      },
      {
        code: "941",
        name: "Employer's Quarterly Federal Tax Return",
        frequency: "quarterly",
        filingAuthority: "Internal Revenue Service",
      },
      {
        code: "940",
        name: "Employer's Annual Federal Unemployment (FUTA) Tax Return",
        frequency: "annual",
        filingAuthority: "Internal Revenue Service",
      },
      {
        code: "W-2",
        name: "Wage and Tax Statement",
        frequency: "annual",
        filingAuthority: "Internal Revenue Service / Social Security Administration",
      },
      {
        code: "1099",
        name: "1099 Series (Miscellaneous/Non-Employee Compensation)",
        frequency: "annual",
        filingAuthority: "Internal Revenue Service",
      },
      {
        code: "STATE_SALES_TAX",
        name: "State Sales Tax Return",
        frequency: "quarterly",
        filingAuthority: "State Department of Revenue (varies by state)",
      },
    ],
    trustAccountRules: {
      name: "IOLTA (Interest on Lawyers' Trust Accounts)",
      governingBody:
        "State bar associations and state supreme courts (50+ separate regulatory regimes)",
      requiresThreeWayReconciliation: true,
      interestHandling:
        "Interest earned on pooled client funds paid to the state bar foundation or IOLTA program to fund legal aid and access to justice",
      auditFrequency:
        "Monthly reconciliation recommended; frequency of external audit varies by state (annual in most jurisdictions)",
      notes:
        "IOLTA rules are state-specific. Each state bar sets its own trust account requirements. The ABA Model Rules of Professional Conduct (Rule 1.15) provide baseline guidance. Three-way reconciliation (bank statement vs. client ledger vs. trust ledger) is standard practice. Random audits by state bar are common.",
    },
    professionalBodies: [
      {
        name: "American Bar Association",
        abbreviation: "ABA",
        type: "legal",
        url: "https://www.americanbar.org",
      },
      {
        name: "American Institute of Certified Public Accountants",
        abbreviation: "AICPA",
        type: "accounting",
        url: "https://www.aicpa.org",
      },
      {
        name: "State Bar Associations (50+)",
        abbreviation: "State Bars",
        type: "legal",
        url: "https://www.americanbar.org/groups/bar_services/resources/state_local_bar_associations/",
      },
      {
        name: "State Boards of Accountancy",
        abbreviation: "State BOAs",
        type: "accounting",
        url: "https://nasba.org",
      },
    ],
    courtSystems: [
      {
        name: "Supreme Court of the United States",
        level: "supreme",
        eFilingAvailable: true,
        eFilingSystem: "Supreme Court Electronic Filing System",
      },
      {
        name: "United States Courts of Appeals (13 Circuits)",
        level: "appellate",
        eFilingAvailable: true,
        eFilingSystem: "PACER / CM/ECF",
      },
      {
        name: "United States District Courts (94 Districts)",
        level: "trial",
        eFilingAvailable: true,
        eFilingSystem: "PACER / CM/ECF",
      },
      {
        name: "United States Bankruptcy Courts",
        level: "specialist",
        eFilingAvailable: true,
        eFilingSystem: "PACER / CM/ECF",
      },
      {
        name: "United States Tax Court",
        level: "specialist",
        eFilingAvailable: true,
        eFilingSystem: "Tax Court e-filing (DAWSON)",
      },
      {
        name: "United States Court of Federal Claims",
        level: "specialist",
        eFilingAvailable: true,
        eFilingSystem: "CM/ECF",
      },
    ],
    visaCategories: [
      {
        code: "H-1B",
        name: "H-1B Specialty Occupation Visa",
        description:
          "Temporary work visa for specialty occupation workers in fields requiring a bachelor's degree or higher (e.g., IT, engineering, medicine). Subject to annual cap.",
      },
      {
        code: "H-2A",
        name: "H-2A Temporary Agricultural Worker Visa",
        description:
          "Temporary visa for seasonal agricultural workers when domestic workers are unavailable",
      },
      {
        code: "H-2B",
        name: "H-2B Temporary Non-Agricultural Worker Visa",
        description:
          "Temporary visa for seasonal non-agricultural workers (e.g., hospitality, landscaping). Subject to annual cap.",
      },
      {
        code: "L-1A",
        name: "L-1A Intracompany Transferee (Manager/Executive)",
        description:
          "Visa for managers and executives transferring from a foreign office to a U.S. office of the same employer",
      },
      {
        code: "L-1B",
        name: "L-1B Intracompany Transferee (Specialized Knowledge)",
        description:
          "Visa for employees with specialized knowledge transferring from a foreign office to a U.S. office of the same employer",
      },
      {
        code: "O-1A",
        name: "O-1A Visa (Extraordinary Ability — Sciences/Business/Education/Athletics)",
        description:
          "Visa for individuals with extraordinary ability or achievement in sciences, education, business, or athletics",
      },
      {
        code: "O-1B",
        name: "O-1B Visa (Extraordinary Ability — Arts)",
        description:
          "Visa for individuals with extraordinary ability in the arts or extraordinary achievement in the motion picture or television industry",
      },
      {
        code: "E-1",
        name: "E-1 Treaty Trader Visa",
        description:
          "Visa for nationals of treaty countries engaged in substantial trade between their country and the United States",
      },
      {
        code: "E-2",
        name: "E-2 Treaty Investor Visa",
        description:
          "Visa for nationals of treaty countries who invest a substantial amount of capital in a U.S. business",
      },
      {
        code: "EB-1",
        name: "EB-1 Employment-Based First Preference",
        description:
          "Immigrant visa for priority workers: persons of extraordinary ability, outstanding professors/researchers, and multinational managers/executives",
      },
      {
        code: "EB-2",
        name: "EB-2 Employment-Based Second Preference",
        description:
          "Immigrant visa for professionals with advanced degrees or persons of exceptional ability. Includes National Interest Waiver (NIW).",
      },
      {
        code: "EB-3",
        name: "EB-3 Employment-Based Third Preference",
        description:
          "Immigrant visa for skilled workers (minimum 2 years training/experience), professionals (bachelor's degree), and other workers",
      },
      {
        code: "EB-4",
        name: "EB-4 Employment-Based Fourth Preference",
        description:
          "Immigrant visa for special immigrants including religious workers, certain international organization employees, and other categories",
      },
      {
        code: "EB-5",
        name: "EB-5 Employment-Based Fifth Preference (Immigrant Investor)",
        description:
          "Immigrant visa for investors who invest a minimum amount (currently USD 1,050,000, or USD 800,000 in a Targeted Employment Area) and create at least 10 full-time jobs",
      },
      {
        code: "F-1",
        name: "F-1 Student Visa",
        description:
          "Non-immigrant visa for full-time students at accredited U.S. academic institutions. Allows limited on-campus employment and OPT/CPT.",
      },
      {
        code: "J-1",
        name: "J-1 Exchange Visitor Visa",
        description:
          "Visa for participants in approved exchange visitor programs (research scholars, professors, au pairs, interns, etc.)",
      },
      {
        code: "K-1",
        name: "K-1 Fiancé(e) Visa",
        description:
          "Visa for the fiancé(e) of a U.S. citizen to enter the U.S. for the purpose of marriage within 90 days of arrival",
      },
      {
        code: "TN",
        name: "TN Visa (USMCA/NAFTA Professional)",
        description:
          "Non-immigrant visa for Canadian and Mexican citizens in designated professional occupations under the United States-Mexico-Canada Agreement",
      },
    ],
    legalResearchSource: {
      name: "CourtListener / Cornell LII",
      url: "https://www.courtlistener.com",
    },
    payroll: {
      retirementScheme: "401(k) and IRA-based retirement plans",
      employerContributions: [
        "Social Security (OASDI): 6.2% employer, 6.2% employee (on wages up to the annual wage base limit)",
        "Medicare: 1.45% employer, 1.45% employee (no wage cap; additional 0.9% employee surtax on earnings above $200,000)",
        "FUTA (Federal Unemployment Tax): 6.0% employer on first $7,000 per employee (effective rate typically 0.6% after state credits)",
        "401(k) employer match: varies by employer (common matches range from 3% to 6% of salary)",
        "State unemployment insurance (SUTA): rates vary by state and employer experience rating",
        "State withholding tax: varies by state (some states have no income tax)",
      ],
      taxWithholding: "Federal income tax withholding (based on Form W-4 elections)",
    },
    privacyLaw:
      "No comprehensive federal privacy law. Sectoral framework: HIPAA (health), GLBA (financial), FERPA (education), CCPA/CPRA (California consumer privacy), state-level privacy laws expanding (Virginia VCDPA, Colorado CPA, Connecticut CTDPA, etc.)",
    dataResidency:
      "No federal data localisation requirements. Some sector-specific and state-level rules apply (e.g., certain government contracts, financial data). Cross-border transfers governed by contractual arrangements.",
    accountingStandards: [
      "US GAAP (ASC — Accounting Standards Codification, issued by FASB)",
      "PCAOB standards (for public company audits)",
    ],
  },

  // ---------------------------------------------------------------------------
  // CANADA
  // ---------------------------------------------------------------------------
  CA: {
    code: "CA",
    name: "Canada",
    flag: "\u{1F1E8}\u{1F1E6}",
    currency: { code: "CAD", symbol: "$" },
    legalSystem:
      "Common law (9 provinces and territories), civil law (Quebec), bijuridical at the federal level",
    taxAuthority: {
      name: "Canada Revenue Agency",
      abbreviation: "CRA",
      url: "https://www.canada.ca/en/revenue-agency.html",
    },
    taxForms: [
      {
        code: "T1",
        name: "Individual Income Tax and Benefit Return",
        frequency: "annual",
        filingAuthority: "Canada Revenue Agency",
      },
      {
        code: "T2",
        name: "Corporation Income Tax Return",
        frequency: "annual",
        filingAuthority: "Canada Revenue Agency",
      },
      {
        code: "T4",
        name: "Statement of Remuneration Paid (Employment Income)",
        frequency: "annual",
        filingAuthority: "Canada Revenue Agency",
      },
      {
        code: "T4A",
        name: "Statement of Pension, Retirement, Annuity, and Other Income",
        frequency: "annual",
        filingAuthority: "Canada Revenue Agency",
      },
      {
        code: "GST/HST Return",
        name: "GST/HST Return",
        frequency: "quarterly",
        filingAuthority: "Canada Revenue Agency",
      },
      {
        code: "T5",
        name: "Statement of Investment Income",
        frequency: "annual",
        filingAuthority: "Canada Revenue Agency",
      },
    ],
    trustAccountRules: {
      name: "Provincial Law Society Trust Account Rules",
      governingBody:
        "Provincial Law Societies — LSO (Law Society of Ontario) By-Law 9, Law Society of British Columbia Rules, Barreau du Québec rules, and other provincial Law Society regulations",
      requiresThreeWayReconciliation: true,
      interestHandling:
        "Interest on pooled trust accounts paid to provincial law foundations (e.g., Law Foundation of Ontario, Law Foundation of BC)",
      auditFrequency:
        "Annual trust account reports required; spot audits by Law Societies at any time",
      notes:
        "Trust accounts must be maintained at a designated Canadian chartered bank, trust company, or credit union approved by the relevant provincial Law Society. Each province sets its own detailed rules. The Federation of Law Societies of Canada provides a Model Code but enforcement is provincial.",
    },
    professionalBodies: [
      {
        name: "Federation of Law Societies of Canada",
        abbreviation: "FLSC",
        type: "legal",
        url: "https://flsc.ca",
      },
      {
        name: "Law Society of Ontario",
        abbreviation: "LSO",
        type: "legal",
        url: "https://lso.ca",
      },
      {
        name: "Law Society of British Columbia",
        abbreviation: "LSBC",
        type: "legal",
        url: "https://www.lawsociety.bc.ca",
      },
      {
        name: "Barreau du Québec",
        abbreviation: "BQ",
        type: "legal",
        url: "https://www.barreau.qc.ca",
      },
      {
        name: "Law Society of Alberta",
        abbreviation: "LSA",
        type: "legal",
        url: "https://www.lawsociety.ab.ca",
      },
      {
        name: "CPA Canada",
        abbreviation: "CPA",
        type: "accounting",
        url: "https://www.cpacanada.ca",
      },
      {
        name: "Provincial CPA Bodies",
        abbreviation: "Provincial CPAs",
        type: "accounting",
        url: "https://www.cpacanada.ca",
      },
    ],
    courtSystems: [
      {
        name: "Supreme Court of Canada",
        level: "supreme",
        eFilingAvailable: true,
        eFilingSystem: "Supreme Court of Canada e-filing portal",
      },
      {
        name: "Federal Court of Appeal",
        level: "appellate",
        eFilingAvailable: true,
        eFilingSystem: "Federal Courts e-filing",
      },
      {
        name: "Federal Court",
        level: "trial",
        eFilingAvailable: true,
        eFilingSystem: "Federal Courts e-filing",
      },
      {
        name: "Provincial/Territorial Courts of Appeal",
        level: "appellate",
        eFilingAvailable: false,
      },
      {
        name: "Provincial/Territorial Superior Courts",
        level: "trial",
        eFilingAvailable: false,
      },
      {
        name: "Provincial Courts",
        level: "trial",
        eFilingAvailable: false,
      },
      {
        name: "Tax Court of Canada",
        level: "specialist",
        eFilingAvailable: true,
        eFilingSystem: "Tax Court of Canada e-filing",
      },
    ],
    visaCategories: [
      {
        code: "FSW",
        name: "Federal Skilled Worker (Express Entry)",
        description:
          "Points-based immigration pathway through Express Entry for skilled workers with foreign work experience in eligible NOC occupations",
      },
      {
        code: "CEC",
        name: "Canadian Experience Class (Express Entry)",
        description:
          "Express Entry pathway for individuals with at least 1 year of skilled work experience in Canada within the last 3 years",
      },
      {
        code: "FST",
        name: "Federal Skilled Trades (Express Entry)",
        description:
          "Express Entry pathway for skilled tradespeople with a qualifying offer of employment or certificate of qualification in an eligible trade",
      },
      {
        code: "PNP",
        name: "Provincial Nominee Program",
        description:
          "Immigration pathway for workers nominated by a Canadian province or territory based on local labour market needs. Can be linked to Express Entry.",
      },
      {
        code: "PGWP",
        name: "Post-Graduation Work Permit",
        description:
          "Open work permit for international students who graduated from a designated learning institution (DLI) in Canada. Duration matches program length (up to 3 years).",
      },
      {
        code: "LMIA_WP",
        name: "LMIA-based Work Permit",
        description:
          "Employer-specific work permit requiring a positive Labour Market Impact Assessment (LMIA) from Employment and Social Development Canada",
      },
      {
        code: "STUDENT",
        name: "Study Permit",
        description:
          "Permit for international students accepted to a designated learning institution (DLI) in Canada. Allows limited part-time work.",
      },
      {
        code: "SPOUSAL",
        name: "Spousal Sponsorship",
        description:
          "Family class sponsorship for spouses, common-law partners, and conjugal partners of Canadian citizens or permanent residents",
      },
      {
        code: "SUV",
        name: "Start-up Visa",
        description:
          "Permanent residence pathway for entrepreneurs with a qualifying business concept supported by a designated Canadian angel investor, venture capital fund, or business incubator",
      },
    ],
    legalResearchSource: {
      name: "Canadian Legal Information Institute",
      url: "https://www.canlii.org",
    },
    payroll: {
      retirementScheme: "CPP (Canada Pension Plan) / QPP (Quebec Pension Plan) and RRSP",
      employerContributions: [
        "CPP: 5.95% employee, 5.95% employer (on pensionable earnings between basic exemption and maximum, 2024 rates)",
        "CPP2: Second additional CPP contributions on earnings above first ceiling (phased in 2024-2025)",
        "EI (Employment Insurance): 1.66% employee, employer pays 1.4x the employee rate (2.324%)",
        "QPP (Quebec Pension Plan): applies in Quebec in lieu of CPP, with separate rates",
        "Provincial employer health taxes in some provinces (e.g., Ontario EHT, Quebec HSF)",
      ],
      taxWithholding:
        "Federal and provincial/territorial income tax withholding at source",
    },
    privacyLaw:
      "PIPEDA (Personal Information Protection and Electronic Documents Act) at the federal level, plus provincial privacy legislation: PIPA (Alberta), PIPA (British Columbia), Quebec Privacy Law (Law 25, modernised 2023-2024)",
    dataResidency:
      "No blanket federal data localisation requirement. PIPEDA Principle 8 governs cross-border transfers and requires comparable protection. Some provinces (British Columbia, Nova Scotia) restrict public-sector data from being stored outside Canada.",
    accountingStandards: [
      "IFRS (mandatory for publicly accountable enterprises)",
      "ASPE (Accounting Standards for Private Enterprises — Canadian GAAP for private companies)",
      "ASNPO (Accounting Standards for Not-for-Profit Organizations)",
      "PSAS (Public Sector Accounting Standards)",
    ],
  },

  IE: {
    code: "IE",
    name: "Ireland",
    flag: "\u{1F1EE}\u{1F1EA}",
    currency: { code: "EUR", symbol: "€" },
    legalSystem: "Common law",
    taxAuthority: { name: "Revenue Commissioners", abbreviation: "Revenue", url: "https://revenue.ie" },
    taxForms: [
      { code: "CT1", name: "Corporation Tax return", frequency: "annual", filingAuthority: "Revenue" },
      { code: "Form 11", name: "Income Tax return (self-assessed)", frequency: "annual", filingAuthority: "Revenue" },
      { code: "VAT3", name: "VAT return", frequency: "monthly", filingAuthority: "Revenue" },
      { code: "P35", name: "Employer annual return", frequency: "annual", filingAuthority: "Revenue" },
      { code: "Form 46G", name: "Third-party returns", frequency: "annual", filingAuthority: "Revenue" },
    ],
    trustAccountRules: {
      name: "Solicitors Accounts Regulations 2014 (S.I. No. 516/2014)",
      governingBody: "Law Society of Ireland",
      requiresThreeWayReconciliation: true,
      interestHandling: "Interest to Law Society compensation fund or client as appropriate",
      auditFrequency: "Annual — reporting accountant's report to Law Society",
    },
    professionalBodies: [
      { name: "Law Society of Ireland", abbreviation: "LSI", type: "legal", url: "https://lawsociety.ie" },
      { name: "Bar Council of Ireland", abbreviation: "BCI", type: "legal", url: "https://lawlibrary.ie" },
      { name: "Chartered Accountants Ireland", abbreviation: "CAI", type: "accounting", url: "https://charteredaccountants.ie" },
      { name: "Irish Tax Institute", abbreviation: "ITI", type: "tax", url: "https://taxinstitute.ie" },
      { name: "CPA Ireland", abbreviation: "CPA", type: "accounting", url: "https://cpaireland.ie" },
    ],
    courtSystems: [
      { name: "Supreme Court", level: "supreme", eFilingAvailable: false },
      { name: "Court of Appeal", level: "appellate", eFilingAvailable: false },
      { name: "High Court", level: "trial", eFilingAvailable: true, eFilingSystem: "Courts Service Online" },
      { name: "Circuit Court", level: "trial", eFilingAvailable: true, eFilingSystem: "Courts Service Online" },
      { name: "District Court", level: "trial", eFilingAvailable: false },
      { name: "Workplace Relations Commission", level: "tribunal", eFilingAvailable: true },
    ],
    visaCategories: [
      { code: "CSEP", name: "Critical Skills Employment Permit", description: "High-skill workers in shortage occupations" },
      { code: "GEP", name: "General Employment Permit", description: "Standard employer-sponsored work permit" },
      { code: "IIP", name: "Immigrant Investor Programme", description: "Investment-based residence (€1M+)" },
      { code: "SUP", name: "Start-Up Entrepreneur Programme", description: "Entrepreneurs with innovative business" },
      { code: "STAMP4", name: "Stamp 4 (Residence)", description: "Long-term residence permission" },
    ],
    legalResearchSource: { name: "BAILII (Irish section)", url: "https://bailii.org" },
    payroll: {
      retirementScheme: "Occupational pension / PRSA",
      employerContributions: ["Employer PRSI 11.05%", "Pension contributions (voluntary)"],
      taxWithholding: "PAYE (pay-as-you-earn) via Revenue Online Service (ROS)",
    },
    privacyLaw: "EU GDPR (directly applicable) + Data Protection Act 2018",
    accountingStandards: ["FRS 102 (most common)", "EU-adopted IFRS (public companies)", "FRS 101 (reduced disclosure)"],
  },

  SG: {
    code: "SG",
    name: "Singapore",
    flag: "\u{1F1F8}\u{1F1EC}",
    currency: { code: "SGD", symbol: "$" },
    legalSystem: "Common law (English-based)",
    taxAuthority: { name: "Inland Revenue Authority of Singapore", abbreviation: "IRAS", url: "https://iras.gov.sg" },
    taxForms: [
      { code: "Form C-S", name: "Corporate income tax (simplified)", frequency: "annual", filingAuthority: "IRAS" },
      { code: "Form C", name: "Corporate income tax (full)", frequency: "annual", filingAuthority: "IRAS" },
      { code: "Form B", name: "Individual income tax (self-employed)", frequency: "annual", filingAuthority: "IRAS" },
      { code: "GST F5", name: "GST return", frequency: "quarterly", filingAuthority: "IRAS" },
      { code: "IR8A", name: "Employer return of employee remuneration", frequency: "annual", filingAuthority: "IRAS" },
    ],
    trustAccountRules: {
      name: "Legal Profession (Solicitors' Accounts) Rules",
      governingBody: "Law Society of Singapore",
      requiresThreeWayReconciliation: true,
      interestHandling: "Interest as directed by court or Law Society rules",
      auditFrequency: "Annual — accountant's report to Law Society",
    },
    professionalBodies: [
      { name: "Law Society of Singapore", abbreviation: "LawSoc", type: "legal", url: "https://lawsociety.org.sg" },
      { name: "Singapore Academy of Law", abbreviation: "SAL", type: "legal", url: "https://sal.org.sg" },
      { name: "Institute of Singapore Chartered Accountants", abbreviation: "ISCA", type: "accounting", url: "https://isca.org.sg" },
      { name: "Singapore Institute of Accredited Tax Professionals", abbreviation: "SIATP", type: "tax", url: "https://siatp.org.sg" },
    ],
    courtSystems: [
      { name: "Court of Appeal", level: "appellate", eFilingAvailable: true, eFilingSystem: "eLitigation" },
      { name: "High Court (General Division)", level: "trial", eFilingAvailable: true, eFilingSystem: "eLitigation" },
      { name: "State Courts", level: "trial", eFilingAvailable: true, eFilingSystem: "eLitigation (ICMS)" },
      { name: "Family Justice Courts", level: "specialist", eFilingAvailable: true, eFilingSystem: "iFAMS" },
      { name: "Singapore International Commercial Court", level: "specialist", eFilingAvailable: true, eFilingSystem: "eLitigation" },
      { name: "Singapore International Arbitration Centre", level: "tribunal", eFilingAvailable: true },
    ],
    visaCategories: [
      { code: "EP", name: "Employment Pass", description: "Professionals earning ≥SGD $5,000/month" },
      { code: "SPass", name: "S Pass", description: "Mid-skilled workers earning ≥SGD $3,150/month" },
      { code: "PEP", name: "Personalised Employment Pass", description: "High-earning professionals (flexible)" },
      { code: "ONE", name: "ONE Pass", description: "Top talent across any sector (≥SGD $30K/month)" },
      { code: "EntrePass", name: "Entrepreneur Pass", description: "Entrepreneurs starting businesses in Singapore" },
      { code: "DP", name: "Dependant's Pass", description: "Family of EP/S Pass holders" },
    ],
    legalResearchSource: { name: "Singapore Law Watch / LawNet", url: "https://lawnet.sg" },
    payroll: {
      retirementScheme: "CPF (Central Provident Fund)",
      employerContributions: ["CPF employer 17% (age ≤55, on first SGD $6,800/month)", "Skills Development Levy 0.25%"],
      taxWithholding: "No withholding — employees file individually (unique to Singapore)",
    },
    privacyLaw: "Personal Data Protection Act 2012 (PDPA) — amended 2020",
    accountingStandards: ["SFRS(I) (Singapore Financial Reporting Standards, IFRS-converged)", "SFRS for Small Entities"],
  },
};

// ---------------------------------------------------------------------------
// Helper functions
// ---------------------------------------------------------------------------

/**
 * Get a jurisdiction by its country code.
 * Throws if the code is not found.
 */
export function getJurisdiction(code: string): Jurisdiction {
  const jurisdiction = JURISDICTIONS[code.toUpperCase()];
  if (!jurisdiction) {
    throw new Error(
      `Unknown jurisdiction code: "${code}". Valid codes: ${Object.keys(JURISDICTIONS).join(", ")}`
    );
  }
  return jurisdiction;
}

/**
 * Get all jurisdiction codes.
 */
export function getJurisdictionCodes(): string[] {
  return Object.keys(JURISDICTIONS);
}

/**
 * Get all jurisdictions as an array.
 */
export function getJurisdictionList(): Jurisdiction[] {
  return Object.values(JURISDICTIONS);
}

/**
 * Look up a jurisdiction by currency code.
 */
export function getJurisdictionByCurrency(currencyCode: string): Jurisdiction | undefined {
  return Object.values(JURISDICTIONS).find(
    (j) => j.currency.code === currencyCode.toUpperCase()
  );
}

/**
 * Get all professional bodies of a given type across all jurisdictions.
 */
export function getProfessionalBodiesByType(
  type: "legal" | "accounting" | "tax"
): Array<ProfessionalBody & { jurisdictionCode: string }> {
  return Object.entries(JURISDICTIONS).flatMap(([code, j]) =>
    j.professionalBodies
      .filter((pb) => pb.type === type)
      .map((pb) => ({ ...pb, jurisdictionCode: code }))
  );
}

/**
 * Check whether a jurisdiction supports e-filing for any court.
 */
export function hasEFiling(code: string): boolean {
  const jurisdiction = getJurisdiction(code);
  return jurisdiction.courtSystems.some((c) => c.eFilingAvailable);
}
