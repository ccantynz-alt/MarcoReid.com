export interface Service {
  slug: string;
  name: string;
  category: "legal" | "accounting" | "immigration" | "property" | "business" | "personal" | "tax" | "court";
  description: string;
  publicAccess: boolean; // Can the public self-serve this?
  professionalRequired: boolean; // Does this REQUIRE a licensed professional?
  countries: string[]; // Which countries offer this service
  forms?: string[]; // Related forms/documents
  estimatedCost?: string; // Rough guide
}

export const SERVICES: Service[] = [
  // === PERSONAL / WILLS & ESTATES ===
  { slug: "wills", name: "Wills & Testaments", category: "personal", description: "Draft, review, and register your last will and testament.", publicAccess: true, professionalRequired: false, countries: ["NZ", "AU", "UK", "US", "CA", "IE", "SG"], forms: ["Simple Will", "Mirror Wills", "Testamentary Trust Will"] },
  { slug: "enduring-power-of-attorney", name: "Enduring Power of Attorney", category: "personal", description: "Appoint someone to make decisions on your behalf if you lose capacity.", publicAccess: true, professionalRequired: false, countries: ["NZ", "AU", "UK", "US", "CA", "IE", "SG"], forms: ["EPA — Property", "EPA — Personal Care & Welfare", "LPA — Health & Welfare (UK)", "Durable POA (US)"] },
  { slug: "probate", name: "Probate & Estate Administration", category: "personal", description: "Apply for probate and administer a deceased person's estate.", publicAccess: false, professionalRequired: true, countries: ["NZ", "AU", "UK", "US", "CA", "IE", "SG"] },
  { slug: "family-trusts", name: "Family Trusts", category: "personal", description: "Establish and manage family trusts for asset protection and estate planning.", publicAccess: false, professionalRequired: true, countries: ["NZ", "AU", "UK", "US", "CA", "IE", "SG"] },

  // === PROPERTY / CONVEYANCING ===
  { slug: "conveyancing", name: "Conveyancing (Property Transfer)", category: "property", description: "Buy, sell, or transfer property with full legal support.", publicAccess: false, professionalRequired: true, countries: ["NZ", "AU", "UK", "IE"], forms: ["Sale & Purchase Agreement", "Title Search", "LIM Report (NZ)", "Section 32 (AU)"] },
  { slug: "residential-tenancy", name: "Residential Tenancy Agreements", category: "property", description: "Create and manage residential rental agreements.", publicAccess: true, professionalRequired: false, countries: ["NZ", "AU", "UK", "US", "CA", "IE", "SG"], forms: ["Residential Tenancy Agreement", "Bond Lodgement", "Lease Agreement"] },
  { slug: "commercial-lease", name: "Commercial Leases", category: "property", description: "Draft, review, and negotiate commercial lease agreements.", publicAccess: false, professionalRequired: true, countries: ["NZ", "AU", "UK", "US", "CA", "IE", "SG"] },
  { slug: "property-disputes", name: "Property Disputes", category: "property", description: "Resolve boundary disputes, easements, and property-related conflicts.", publicAccess: false, professionalRequired: true, countries: ["NZ", "AU", "UK", "US", "CA", "IE"] },

  // === BUSINESS / CORPORATE ===
  { slug: "company-formation", name: "Company Formation & Incorporation", category: "business", description: "Register a new company, set up directors, and issue shares.", publicAccess: true, professionalRequired: false, countries: ["NZ", "AU", "UK", "US", "CA", "IE", "SG"], forms: ["Company Registration", "Constitution/Articles", "Shareholder Agreement", "Director Consent"], estimatedCost: "From $199" },
  { slug: "partnership-agreements", name: "Partnership Agreements", category: "business", description: "Draft and formalise partnership agreements for business ventures.", publicAccess: true, professionalRequired: false, countries: ["NZ", "AU", "UK", "US", "CA", "IE", "SG"] },
  { slug: "shareholder-agreements", name: "Shareholder Agreements", category: "business", description: "Protect shareholder rights and define governance structures.", publicAccess: false, professionalRequired: true, countries: ["NZ", "AU", "UK", "US", "CA", "IE", "SG"] },
  { slug: "terms-and-conditions", name: "Website Terms & Conditions", category: "business", description: "Generate legally compliant terms of service for your website or app.", publicAccess: true, professionalRequired: false, countries: ["NZ", "AU", "UK", "US", "CA", "IE", "SG"] },
  { slug: "privacy-policy-generator", name: "Privacy Policy Generator", category: "business", description: "Create a privacy policy compliant with your jurisdiction's data protection laws.", publicAccess: true, professionalRequired: false, countries: ["NZ", "AU", "UK", "US", "CA", "IE", "SG"] },
  { slug: "employment-agreements", name: "Employment Agreements", category: "business", description: "Draft compliant employment contracts for your staff.", publicAccess: true, professionalRequired: false, countries: ["NZ", "AU", "UK", "US", "CA", "IE", "SG"], forms: ["Individual Employment Agreement", "Fixed-Term Contract", "Independent Contractor Agreement"] },
  { slug: "business-sale", name: "Business Sale & Purchase", category: "business", description: "Buy or sell a business with full legal and accounting support.", publicAccess: false, professionalRequired: true, countries: ["NZ", "AU", "UK", "US", "CA", "IE", "SG"] },
  { slug: "trademark-registration", name: "Trademark Registration", category: "business", description: "Register and protect your brand name, logo, or slogan.", publicAccess: true, professionalRequired: false, countries: ["NZ", "AU", "UK", "US", "CA", "IE", "SG"], forms: ["Trademark Application", "Opposition Response"], estimatedCost: "From $499" },

  // === IMMIGRATION ===
  { slug: "work-visas", name: "Work Visas & Permits", category: "immigration", description: "Apply for employer-sponsored and independent work visas.", publicAccess: false, professionalRequired: true, countries: ["NZ", "AU", "UK", "US", "CA", "IE", "SG"] },
  { slug: "residence-visas", name: "Residence & Permanent Residency", category: "immigration", description: "Apply for permanent residence through skilled, family, or investor pathways.", publicAccess: false, professionalRequired: true, countries: ["NZ", "AU", "UK", "US", "CA", "IE", "SG"] },
  { slug: "student-visas", name: "Student Visas", category: "immigration", description: "Apply for study permits and student visas.", publicAccess: true, professionalRequired: false, countries: ["NZ", "AU", "UK", "US", "CA", "IE", "SG"] },
  { slug: "partner-visas", name: "Partner & Family Visas", category: "immigration", description: "Sponsor your partner or family member for a visa.", publicAccess: false, professionalRequired: true, countries: ["NZ", "AU", "UK", "US", "CA", "IE", "SG"] },
  { slug: "citizenship", name: "Citizenship Applications", category: "immigration", description: "Apply for citizenship by naturalisation or descent.", publicAccess: true, professionalRequired: false, countries: ["NZ", "AU", "UK", "US", "CA", "IE"] },

  // === TAX & ACCOUNTING ===
  { slug: "individual-tax-returns", name: "Individual Tax Returns", category: "tax", description: "File your annual individual income tax return.", publicAccess: true, professionalRequired: false, countries: ["NZ", "AU", "UK", "US", "CA", "IE", "SG"], forms: ["IR3 (NZ)", "Individual Return (AU)", "SA100 (UK)", "1040 (US)", "T1 (CA)", "Form 11 (IE)"] },
  { slug: "company-tax-returns", name: "Company Tax Returns", category: "tax", description: "File annual corporate income tax returns.", publicAccess: false, professionalRequired: true, countries: ["NZ", "AU", "UK", "US", "CA", "IE", "SG"], forms: ["IR4 (NZ)", "Company Return (AU)", "CT600 (UK)", "1120 (US)", "T2 (CA)", "CT1 (IE)"] },
  { slug: "gst-vat-returns", name: "GST / VAT Returns", category: "tax", description: "File goods and services tax or value-added tax returns.", publicAccess: true, professionalRequired: false, countries: ["NZ", "AU", "UK", "CA", "IE", "SG"], forms: ["GST101A (NZ)", "BAS (AU)", "VAT Return (UK)", "GST/HST (CA)", "VAT3 (IE)", "GST F5 (SG)"] },
  { slug: "payroll-services", name: "Payroll Services", category: "accounting", description: "Run payroll, calculate tax, and file employer returns.", publicAccess: false, professionalRequired: true, countries: ["NZ", "AU", "UK", "US", "CA", "IE", "SG"] },
  { slug: "bookkeeping", name: "Bookkeeping", category: "accounting", description: "Ongoing bookkeeping and financial record management.", publicAccess: false, professionalRequired: false, countries: ["NZ", "AU", "UK", "US", "CA", "IE", "SG"] },
  { slug: "financial-statements", name: "Financial Statements", category: "accounting", description: "Prepare annual financial statements and accounts.", publicAccess: false, professionalRequired: true, countries: ["NZ", "AU", "UK", "US", "CA", "IE", "SG"] },
  { slug: "tax-planning", name: "Tax Planning & Advisory", category: "tax", description: "Strategic tax planning to minimise your tax obligations legally.", publicAccess: false, professionalRequired: true, countries: ["NZ", "AU", "UK", "US", "CA", "IE", "SG"] },
  { slug: "catch-up-filing", name: "Catch-Up Filing (Overdue Returns)", category: "tax", description: "Get years of overdue tax returns filed and back on track.", publicAccess: true, professionalRequired: true, countries: ["NZ", "AU", "UK", "US", "CA", "IE"], estimatedCost: "From $499/year" },

  // === LEGAL / DISPUTES ===
  { slug: "contract-drafting", name: "Contract Drafting & Review", category: "legal", description: "Draft, review, or negotiate any type of commercial contract.", publicAccess: false, professionalRequired: true, countries: ["NZ", "AU", "UK", "US", "CA", "IE", "SG"] },
  { slug: "debt-recovery", name: "Debt Recovery", category: "legal", description: "Recover unpaid debts through demand letters, mediation, or litigation.", publicAccess: true, professionalRequired: false, countries: ["NZ", "AU", "UK", "US", "CA", "IE", "SG"], forms: ["Letter of Demand", "Statutory Demand"] },
  { slug: "dispute-resolution", name: "Dispute Resolution & Mediation", category: "legal", description: "Resolve disputes through mediation, arbitration, or negotiation.", publicAccess: false, professionalRequired: true, countries: ["NZ", "AU", "UK", "US", "CA", "IE", "SG"] },
  { slug: "employment-disputes", name: "Employment Disputes", category: "legal", description: "Resolve workplace grievances, unfair dismissal, and employment claims.", publicAccess: true, professionalRequired: false, countries: ["NZ", "AU", "UK", "US", "CA", "IE", "SG"] },
  { slug: "family-law", name: "Family Law (Divorce & Separation)", category: "legal", description: "Legal support for divorce, separation, custody, and relationship property.", publicAccess: false, professionalRequired: true, countries: ["NZ", "AU", "UK", "US", "CA", "IE"] },
  { slug: "criminal-defence", name: "Criminal Defence", category: "legal", description: "Legal representation for criminal charges and proceedings.", publicAccess: false, professionalRequired: true, countries: ["NZ", "AU", "UK", "US", "CA", "IE", "SG"] },
  { slug: "personal-injury", name: "Personal Injury Claims", category: "legal", description: "Claim compensation for injuries caused by negligence.", publicAccess: true, professionalRequired: true, countries: ["AU", "UK", "US", "CA", "IE"] },
  { slug: "insolvency", name: "Insolvency & Liquidation", category: "legal", description: "Navigate business insolvency, liquidation, or personal bankruptcy.", publicAccess: false, professionalRequired: true, countries: ["NZ", "AU", "UK", "US", "CA", "IE", "SG"] },

  // === COURT ===
  { slug: "court-filing", name: "Court Filing & E-Filing", category: "court", description: "File documents with courts electronically.", publicAccess: false, professionalRequired: true, countries: ["NZ", "AU", "UK", "US", "CA", "SG"] },
  { slug: "notarisation", name: "Notarisation & Certification", category: "court", description: "Get documents notarised or certified for legal use.", publicAccess: true, professionalRequired: true, countries: ["NZ", "AU", "UK", "US", "CA", "IE", "SG"] },
  { slug: "apostille", name: "Apostille & Legalisation", category: "court", description: "Get documents authenticated for use in foreign countries.", publicAccess: true, professionalRequired: false, countries: ["NZ", "AU", "UK", "US", "CA", "IE", "SG"] },
];

export function getServicesByCountry(countryCode: string): Service[] {
  return SERVICES.filter(s => s.countries.includes(countryCode));
}

export function getServicesByCategory(category: Service["category"]): Service[] {
  return SERVICES.filter(s => s.category === category);
}

export function getPublicServices(countryCode: string): Service[] {
  return SERVICES.filter(s => s.countries.includes(countryCode) && s.publicAccess);
}

export function getProfessionalServices(countryCode: string): Service[] {
  return SERVICES.filter(s => s.countries.includes(countryCode) && s.professionalRequired);
}

export const SERVICE_CATEGORIES = [
  { slug: "personal", name: "Personal & Family", icon: "user", description: "Wills, estates, powers of attorney" },
  { slug: "property", name: "Property", icon: "home", description: "Buying, selling, renting property" },
  { slug: "business", name: "Business & Corporate", icon: "briefcase", description: "Company formation, contracts, trademarks" },
  { slug: "immigration", name: "Immigration", icon: "globe", description: "Visas, residency, citizenship" },
  { slug: "tax", name: "Tax", icon: "calculator", description: "Tax returns, GST/VAT, tax planning" },
  { slug: "accounting", name: "Accounting", icon: "chart", description: "Bookkeeping, payroll, financial statements" },
  { slug: "legal", name: "Legal & Disputes", icon: "scale", description: "Contracts, disputes, litigation" },
  { slug: "court", name: "Court & Filing", icon: "gavel", description: "Court filings, notarisation, apostille" },
] as const;
