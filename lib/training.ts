export interface Course {
  slug: string;
  title: string;
  description: string;
  category: "cpd-legal" | "cpd-accounting" | "cpd-tax" | "pre-qualification" | "specialist" | "compliance" | "technology" | "business-skills";
  audience: ("lawyer" | "accountant" | "student" | "public")[];
  level: "beginner" | "intermediate" | "advanced" | "expert";
  format: "video" | "interactive" | "workshop" | "webinar" | "self-paced";
  durationHours: number;
  cpdPoints: number;
  countries: string[];
  accreditations: string[]; // Which professional bodies recognise this
  price: "free" | "included" | "premium";
  modules: { title: string; durationMinutes: number }[];
  instructor?: string;
  certificateOnCompletion: boolean;
}

export interface CPDRequirement {
  country: string;
  profession: "lawyer" | "accountant";
  body: string;
  annualHours: number;
  categories?: { name: string; minHours: number }[];
  reportingPeriod: string;
  notes: string;
}

// CPD requirements by country and profession
export const CPD_REQUIREMENTS: CPDRequirement[] = [
  // NEW ZEALAND
  { country: "NZ", profession: "lawyer", body: "NZLS", annualHours: 10, categories: [{ name: "Ethics", minHours: 1 }], reportingPeriod: "1 April - 31 March", notes: "Minimum 10 hours, at least 1 hour of ethics/professional responsibility" },
  { country: "NZ", profession: "accountant", body: "CA ANZ", annualHours: 20, categories: [{ name: "Verifiable", minHours: 10 }], reportingPeriod: "1 January - 31 December", notes: "20 hours minimum, at least 10 verifiable" },

  // AUSTRALIA
  { country: "AU", profession: "lawyer", body: "State Law Societies", annualHours: 10, categories: [{ name: "Ethics & Professional Responsibility", minHours: 1 }, { name: "Practice Management & Business Skills", minHours: 1 }], reportingPeriod: "1 April - 31 March (varies by state)", notes: "10 CPD units (1 unit = 1 hour). Requirements vary by state." },
  { country: "AU", profession: "accountant", body: "CPA Australia / CA ANZ", annualHours: 20, categories: [{ name: "Verifiable", minHours: 10 }], reportingPeriod: "1 January - 31 December", notes: "20 hours minimum, verifiable activities required" },

  // UNITED KINGDOM
  { country: "UK", profession: "lawyer", body: "SRA", annualHours: 0, reportingPeriod: "Annual (no fixed hours)", notes: "SRA removed the 16-hour minimum in 2016. Solicitors must reflect on and address their learning needs. Competence Statement applies." },
  { country: "UK", profession: "accountant", body: "ICAEW / ACCA", annualHours: 20, categories: [{ name: "Verifiable", minHours: 10 }], reportingPeriod: "1 November - 31 October (ICAEW)", notes: "ACCA: 40 units (21 verifiable). ICAEW: reflect on learning needs." },

  // UNITED STATES
  { country: "US", profession: "lawyer", body: "State Bar Associations", annualHours: 12, categories: [{ name: "Ethics", minHours: 2 }], reportingPeriod: "Varies by state", notes: "CLE requirements vary by state. NY: 24 hours biennially. CA: 25 hours triennially. TX: 15 hours annually." },
  { country: "US", profession: "accountant", body: "State Boards / AICPA", annualHours: 40, categories: [{ name: "Ethics", minHours: 4 }], reportingPeriod: "Varies by state", notes: "40 hours annually or 80 biennially. Most states require ethics component." },

  // CANADA
  { country: "CA", profession: "lawyer", body: "Provincial Law Societies", annualHours: 12, categories: [{ name: "Professionalism", minHours: 3 }], reportingPeriod: "1 January - 31 December", notes: "LSO: 12 hours (3 professionalism). LSBC: 12 hours (2 ethics). Varies by province." },
  { country: "CA", profession: "accountant", body: "CPA Canada", annualHours: 20, categories: [{ name: "Verifiable", minHours: 10 }], reportingPeriod: "1 January - 31 December", notes: "20 hours minimum, verifiable activities, rolling 3-year requirement of 60 hours" },

  // IRELAND
  { country: "IE", profession: "lawyer", body: "Law Society of Ireland", annualHours: 12, categories: [{ name: "Management & Professional Development", minHours: 3 }, { name: "Regulatory Matters", minHours: 1 }], reportingPeriod: "Cycle year", notes: "12 hours minimum per cycle (3 management, 1 regulatory)" },
  { country: "IE", profession: "accountant", body: "Chartered Accountants Ireland", annualHours: 20, categories: [{ name: "Verifiable", minHours: 10 }], reportingPeriod: "1 January - 31 December", notes: "20 hours annually, 10 verifiable" },

  // SINGAPORE
  { country: "SG", profession: "lawyer", body: "Law Society of Singapore / SILE", annualHours: 10, categories: [{ name: "Ethics", minHours: 1 }], reportingPeriod: "1 January - 31 December", notes: "10 CPD points annually. At least 1 point in ethics/professional responsibility." },
  { country: "SG", profession: "accountant", body: "ISCA", annualHours: 20, categories: [{ name: "Verifiable", minHours: 10 }], reportingPeriod: "1 January - 31 December", notes: "120 hours per 3-year cycle (40/year average)" },

  // INDIA
  { country: "IN", profession: "lawyer", body: "Bar Council of India", annualHours: 0, reportingPeriod: "No formal CPD system", notes: "India does not currently have mandatory CPD for advocates. BCI has proposed but not implemented." },
  { country: "IN", profession: "accountant", body: "ICAI", annualHours: 20, categories: [{ name: "Structured", minHours: 10 }], reportingPeriod: "1 April - 31 March", notes: "60 hours per 3-year block (20/year). Structured learning required." },
];

// Course catalog
export const COURSES: Course[] = [
  // === CPD — LEGAL ===
  { slug: "ethics-professional-responsibility", title: "Ethics & Professional Responsibility", description: "Core ethics obligations for legal practitioners. Covers conflicts of interest, client confidentiality, trust accounting ethics, and professional conduct standards.", category: "cpd-legal", audience: ["lawyer"], level: "intermediate", format: "interactive", durationHours: 2, cpdPoints: 2, countries: ["NZ", "AU", "UK", "US", "CA", "IE", "SG"], accreditations: ["NZLS", "State Law Societies (AU)", "ABA", "Provincial Law Societies (CA)", "LSI", "SILE"], price: "included", modules: [{ title: "Duty to the Court vs Duty to the Client", durationMinutes: 30 }, { title: "Conflict of Interest — Identification & Management", durationMinutes: 30 }, { title: "Client Money & Trust Accounting Ethics", durationMinutes: 30 }, { title: "Professional Misconduct & Complaints", durationMinutes: 30 }], certificateOnCompletion: true },

  { slug: "aml-cft-for-lawyers", title: "AML/CFT Compliance for Legal Professionals", description: "Anti-money laundering and counter-financing of terrorism obligations for lawyers. Customer due diligence, suspicious transaction reporting, and risk assessment.", category: "cpd-legal", audience: ["lawyer"], level: "intermediate", format: "interactive", durationHours: 3, cpdPoints: 3, countries: ["NZ", "AU", "UK", "US", "CA", "IE", "SG"], accreditations: ["NZLS", "SRA", "ABA"], price: "included", modules: [{ title: "AML/CFT Framework Overview", durationMinutes: 30 }, { title: "Customer Due Diligence in Practice", durationMinutes: 45 }, { title: "Suspicious Transaction Identification", durationMinutes: 30 }, { title: "Risk Assessment & Ongoing Monitoring", durationMinutes: 30 }, { title: "Jurisdiction-Specific Obligations", durationMinutes: 45 }], certificateOnCompletion: true },

  { slug: "ai-in-legal-practice", title: "AI in Legal Practice — Competence & Ethics", description: "How to use AI tools ethically and competently in legal practice. Covers duty of competence with AI, citation verification, supervision of AI outputs, and client disclosure.", category: "cpd-legal", audience: ["lawyer"], level: "beginner", format: "interactive", durationHours: 2, cpdPoints: 2, countries: ["NZ", "AU", "UK", "US", "CA", "IE", "SG"], accreditations: ["NZLS", "SRA", "ABA", "State Bars"], price: "free", modules: [{ title: "AI Fundamentals for Lawyers", durationMinutes: 30 }, { title: "Duty of Competence — Model Rule 1.1 and AI", durationMinutes: 30 }, { title: "Supervision of AI Outputs — Rule 5.3", durationMinutes: 30 }, { title: "Citation Verification & Hallucination Prevention", durationMinutes: 30 }], instructor: "Marco Reid Academy", certificateOnCompletion: true },

  { slug: "trust-accounting-masterclass", title: "Trust Accounting Masterclass", description: "Complete guide to trust accounting across jurisdictions. IOLTA (US), SRA Accounts Rules (UK), Law Society regulations (NZ/AU/CA/IE), and practical reconciliation workshops.", category: "cpd-legal", audience: ["lawyer"], level: "advanced", format: "workshop", durationHours: 4, cpdPoints: 4, countries: ["NZ", "AU", "UK", "US", "CA", "IE", "SG"], accreditations: ["NZLS", "State Law Societies (AU)", "SRA", "State Bars (US)", "Provincial Law Societies (CA)"], price: "included", modules: [{ title: "Trust Accounting Fundamentals", durationMinutes: 45 }, { title: "Three-Way Reconciliation Workshop", durationMinutes: 60 }, { title: "Jurisdiction-Specific Rules Deep Dive", durationMinutes: 60 }, { title: "Common Errors & Audit Preparation", durationMinutes: 45 }, { title: "Using Marco Reid Trust Module", durationMinutes: 30 }], certificateOnCompletion: true },

  // === CPD — ACCOUNTING ===
  { slug: "ethics-for-accountants", title: "Ethics & Professional Standards for Accountants", description: "Ethical obligations for accounting professionals. Covers independence, objectivity, confidentiality, and the IESBA Code of Ethics.", category: "cpd-accounting", audience: ["accountant"], level: "intermediate", format: "interactive", durationHours: 2, cpdPoints: 2, countries: ["NZ", "AU", "UK", "US", "CA", "IE", "SG", "IN"], accreditations: ["CA ANZ", "CPA Australia", "ICAEW", "ACCA", "AICPA", "CPA Canada", "CAI", "ISCA", "ICAI"], price: "included", modules: [{ title: "IESBA Code of Ethics Overview", durationMinutes: 30 }, { title: "Independence & Objectivity", durationMinutes: 30 }, { title: "Confidentiality & Client Information", durationMinutes: 30 }, { title: "Ethical Dilemmas — Case Studies", durationMinutes: 30 }], certificateOnCompletion: true },

  { slug: "gst-vat-masterclass", title: "GST / VAT / Sales Tax Masterclass", description: "Complete guide to indirect taxation across 7 jurisdictions. NZ GST, AU GST, UK VAT, US sales tax, CA GST/HST, IE VAT, SG GST. Practical filing workshops included.", category: "cpd-tax", audience: ["accountant"], level: "intermediate", format: "workshop", durationHours: 6, cpdPoints: 6, countries: ["NZ", "AU", "UK", "US", "CA", "IE", "SG"], accreditations: ["CA ANZ", "CPA Australia", "CIOT", "ATT", "AICPA", "CPA Canada"], price: "included", modules: [{ title: "NZ GST — Fundamentals & Returns", durationMinutes: 45 }, { title: "AU GST — BAS & Special Rules", durationMinutes: 45 }, { title: "UK VAT — MTD & Reverse Charge", durationMinutes: 45 }, { title: "US Sales Tax — Multi-State Complexity", durationMinutes: 45 }, { title: "CA GST/HST — Provincial Variations", durationMinutes: 45 }, { title: "IE VAT & SG GST", durationMinutes: 30 }, { title: "Cross-Border GST/VAT", durationMinutes: 45 }], certificateOnCompletion: true },

  { slug: "aml-for-accountants", title: "AML/CFT Compliance for Accountants", description: "Anti-money laundering obligations specific to accounting professionals. CDD, STR filing, risk assessment, and jurisdiction-specific requirements.", category: "cpd-accounting", audience: ["accountant"], level: "intermediate", format: "interactive", durationHours: 3, cpdPoints: 3, countries: ["NZ", "AU", "UK", "US", "CA", "IE", "SG"], accreditations: ["CA ANZ", "ICAEW", "ACCA", "AICPA"], price: "included", modules: [{ title: "AML Framework for Accountants", durationMinutes: 30 }, { title: "Client Due Diligence — Practical Guide", durationMinutes: 45 }, { title: "Suspicious Transaction Recognition", durationMinutes: 30 }, { title: "Risk Assessment for Accounting Firms", durationMinutes: 30 }, { title: "Reporting to FINTRAC/AUSTRAC/NCA/FinCEN", durationMinutes: 45 }], certificateOnCompletion: true },

  { slug: "cloud-accounting-mastery", title: "Cloud Accounting — From Xero/QB to Marco Reid", description: "Migration masterclass: move your practice from Xero, QuickBooks, MYOB, or Sage to Marco Reid. Data migration, workflow setup, and client onboarding.", category: "technology", audience: ["accountant"], level: "beginner", format: "self-paced", durationHours: 4, cpdPoints: 4, countries: ["NZ", "AU", "UK", "US", "CA", "IE", "SG"], accreditations: ["CA ANZ", "CPA Australia"], price: "free", modules: [{ title: "Why Migrate — The One-Platform Advantage", durationMinutes: 30 }, { title: "Data Migration from Xero", durationMinutes: 45 }, { title: "Data Migration from QuickBooks", durationMinutes: 45 }, { title: "Data Migration from MYOB/Sage", durationMinutes: 30 }, { title: "Setting Up Your Marco Reid Practice", durationMinutes: 45 }, { title: "Client Onboarding Workflows", durationMinutes: 45 }], instructor: "Marco Reid Academy", certificateOnCompletion: true },

  { slug: "tax-planning-strategies", title: "Advanced Tax Planning Strategies", description: "Jurisdiction-aware tax planning for accountants. Trust structures, entity selection, cross-border planning, and year-end strategies.", category: "cpd-tax", audience: ["accountant"], level: "advanced", format: "workshop", durationHours: 5, cpdPoints: 5, countries: ["NZ", "AU", "UK", "US", "CA", "IE"], accreditations: ["CA ANZ", "CPA Australia", "CIOT", "AICPA", "CPA Canada", "ITI"], price: "premium", modules: [{ title: "Entity Selection — Tax Implications by Jurisdiction", durationMinutes: 60 }, { title: "Trust Structures for Tax Planning", durationMinutes: 60 }, { title: "Cross-Border Tax Planning", durationMinutes: 60 }, { title: "Year-End Tax Strategies", durationMinutes: 45 }, { title: "Capital Gains Planning", durationMinutes: 45 }, { title: "Practical Case Studies", durationMinutes: 30 }], certificateOnCompletion: true },

  { slug: "payroll-compliance-multi-jurisdiction", title: "Multi-Jurisdiction Payroll Compliance", description: "Run payroll correctly across NZ, AU, UK, US, CA. PAYE, PAYG, NI, FICA, CPP/EI, KiwiSaver, Super, pension auto-enrolment.", category: "cpd-accounting", audience: ["accountant"], level: "intermediate", format: "interactive", durationHours: 4, cpdPoints: 4, countries: ["NZ", "AU", "UK", "US", "CA"], accreditations: ["CA ANZ", "CPA Australia", "CIOT", "AICPA"], price: "included", modules: [{ title: "NZ Payroll — PAYE, KiwiSaver, ACC", durationMinutes: 45 }, { title: "AU Payroll — PAYG, Super, STP", durationMinutes: 45 }, { title: "UK Payroll — PAYE, NI, Pension", durationMinutes: 45 }, { title: "US Payroll — Federal + 50 States", durationMinutes: 45 }, { title: "CA Payroll — CPP, EI, Provincial", durationMinutes: 30 }], certificateOnCompletion: true },

  // === PRE-QUALIFICATION ===
  { slug: "law-foundations", title: "Foundations of Law — Pre-Qualification Program", description: "Comprehensive introduction to legal systems, constitutional law, contract law, tort law, criminal law, and property law. Designed for aspiring lawyers.", category: "pre-qualification", audience: ["student"], level: "beginner", format: "self-paced", durationHours: 40, cpdPoints: 0, countries: ["NZ", "AU", "UK", "US", "CA", "IE", "SG", "IN"], accreditations: [], price: "premium", modules: [{ title: "Legal Systems & Sources of Law", durationMinutes: 180 }, { title: "Constitutional Law Fundamentals", durationMinutes: 180 }, { title: "Contract Law", durationMinutes: 240 }, { title: "Tort Law", durationMinutes: 240 }, { title: "Criminal Law", durationMinutes: 240 }, { title: "Property Law", durationMinutes: 180 }, { title: "Administrative Law", durationMinutes: 120 }, { title: "Legal Research & Writing", durationMinutes: 240 }, { title: "Professional Ethics", durationMinutes: 120 }, { title: "Practical Legal Skills", durationMinutes: 180 }], instructor: "Marco Reid Academy", certificateOnCompletion: true },

  { slug: "accounting-foundations", title: "Foundations of Accounting — Pre-Qualification Program", description: "Complete introduction to accounting principles, financial reporting, management accounting, taxation, and auditing. Designed for aspiring accountants.", category: "pre-qualification", audience: ["student"], level: "beginner", format: "self-paced", durationHours: 40, cpdPoints: 0, countries: ["NZ", "AU", "UK", "US", "CA", "IE", "SG", "IN"], accreditations: [], price: "premium", modules: [{ title: "Accounting Principles & Double Entry", durationMinutes: 180 }, { title: "Financial Reporting & Statements", durationMinutes: 240 }, { title: "Management Accounting", durationMinutes: 180 }, { title: "Taxation Fundamentals", durationMinutes: 240 }, { title: "Auditing & Assurance", durationMinutes: 180 }, { title: "Business Law for Accountants", durationMinutes: 120 }, { title: "Ethics & Professional Standards", durationMinutes: 120 }, { title: "Technology in Accounting", durationMinutes: 120 }, { title: "Practical Case Studies", durationMinutes: 180 }, { title: "Exam Preparation", durationMinutes: 120 }], instructor: "Marco Reid Academy", certificateOnCompletion: true },

  // === SPECIALIST ===
  { slug: "immigration-law-specialist", title: "Immigration Law Specialist Certificate", description: "Specialist certification in immigration law across NZ, AU, UK, US, CA. Visa categories, application processes, appeals, and compliance.", category: "specialist", audience: ["lawyer"], level: "advanced", format: "workshop", durationHours: 20, cpdPoints: 20, countries: ["NZ", "AU", "UK", "US", "CA"], accreditations: ["NZLS", "MIA (NZ)"], price: "premium", modules: [{ title: "Immigration Law Foundations", durationMinutes: 120 }, { title: "NZ Immigration — AEWV, SMC, Partnership", durationMinutes: 120 }, { title: "AU Immigration — 482, 189, 190", durationMinutes: 120 }, { title: "UK Immigration — Skilled Worker, Global Talent", durationMinutes: 120 }, { title: "US Immigration — H-1B, EB, Family-Based", durationMinutes: 120 }, { title: "CA Immigration — Express Entry, PNP", durationMinutes: 120 }, { title: "Cross-Border Immigration Issues", durationMinutes: 60 }, { title: "Appeals & Judicial Review", durationMinutes: 60 }, { title: "Practice Management for Immigration", durationMinutes: 60 }, { title: "Ethics in Immigration Practice", durationMinutes: 60 }, { title: "Practical Assessment", durationMinutes: 120 }, { title: "Certification Exam", durationMinutes: 120 }], instructor: "Marco Reid Academy", certificateOnCompletion: true },

  // === BUSINESS SKILLS ===
  { slug: "practice-growth", title: "Growing Your Professional Practice", description: "Business development, marketing, pricing strategy, client retention, and firm management for lawyers and accountants.", category: "business-skills", audience: ["lawyer", "accountant"], level: "intermediate", format: "self-paced", durationHours: 4, cpdPoints: 4, countries: ["NZ", "AU", "UK", "US", "CA", "IE", "SG"], accreditations: ["NZLS (Practice Management)", "State Law Societies (AU)", "ABA"], price: "included", modules: [{ title: "Client Acquisition Strategies", durationMinutes: 45 }, { title: "Pricing Your Services", durationMinutes: 45 }, { title: "Building Referral Networks", durationMinutes: 30 }, { title: "Client Retention & Satisfaction", durationMinutes: 30 }, { title: "Firm Financial Management", durationMinutes: 45 }, { title: "Team Building & Delegation", durationMinutes: 45 }], certificateOnCompletion: true },

  { slug: "marco-reid-certification", title: "Marco Reid Certified Professional", description: "Become a Marco Reid Certified Professional. Master every feature of the platform and earn the right to display the Marco Reid Certified badge.", category: "technology", audience: ["lawyer", "accountant"], level: "intermediate", format: "interactive", durationHours: 8, cpdPoints: 8, countries: ["NZ", "AU", "UK", "US", "CA", "IE", "SG", "IN"], accreditations: ["Marco Reid Academy"], price: "free", modules: [{ title: "Platform Overview & Navigation", durationMinutes: 30 }, { title: "Matter Management Mastery", durationMinutes: 45 }, { title: "Client & CRM Features", durationMinutes: 30 }, { title: "Document AI & Editor", durationMinutes: 45 }, { title: "Trust Accounting Deep Dive", durationMinutes: 60 }, { title: "Marco AI Research Engine", durationMinutes: 60 }, { title: "Voice Dictation Mastery", durationMinutes: 30 }, { title: "Time, Billing & Invoicing", durationMinutes: 45 }, { title: "Compliance & Audit Trail", durationMinutes: 30 }, { title: "Payroll & Tax Tools", durationMinutes: 45 }, { title: "Practice Intelligence & Analytics", durationMinutes: 30 }, { title: "Certification Exam (50 questions)", durationMinutes: 60 }], instructor: "Marco Reid Academy", certificateOnCompletion: true },
];

export function getCoursesByCountry(countryCode: string): Course[] {
  return COURSES.filter(c => c.countries.includes(countryCode));
}

export function getCoursesByAudience(audience: "lawyer" | "accountant" | "student" | "public"): Course[] {
  return COURSES.filter(c => c.audience.includes(audience));
}

export function getCPDRequirements(country: string, profession: "lawyer" | "accountant"): CPDRequirement | undefined {
  return CPD_REQUIREMENTS.find(r => r.country === country && r.profession === profession);
}

export const TRAINING_CATEGORIES = [
  { slug: "cpd-legal", name: "CPD — Legal", description: "Continuing professional development for lawyers", icon: "scale" },
  { slug: "cpd-accounting", name: "CPD — Accounting", description: "Continuing professional development for accountants", icon: "calculator" },
  { slug: "cpd-tax", name: "CPD — Tax", description: "Tax-specific professional development", icon: "percent" },
  { slug: "pre-qualification", name: "Pre-Qualification", description: "Programs for aspiring professionals", icon: "graduation" },
  { slug: "specialist", name: "Specialist Certificates", description: "Advanced specialist certifications", icon: "award" },
  { slug: "compliance", name: "Compliance", description: "Regulatory compliance training", icon: "shield" },
  { slug: "technology", name: "Technology", description: "Platform mastery and technology skills", icon: "laptop" },
  { slug: "business-skills", name: "Business Skills", description: "Practice management and growth", icon: "chart" },
] as const;
