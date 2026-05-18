/**
 * lib/marco/sources.ts — citation source catalogue for Marco research.
 *
 * Three research domains (Legal / Accounting / Forensic), each with a
 * catalogue of authoritative public-domain sources. The verifier checks
 * every citation in a Marco response against these sources before
 * surfacing it; un-resolvable citations are flagged as NOT_FOUND so the
 * professional reviewing the output can decide whether to use them.
 *
 * Adding a new source: append to the array. The verifier reads the slug,
 * url, and jurisdictions when matching citations.
 */

export type MarcoDomain = "LEGAL" | "ACCOUNTING" | "FORENSIC";

export interface MarcoSource {
  slug: string;
  domain: MarcoDomain;
  name: string;
  url: string;
  description: string;
  jurisdictions: ReadonlyArray<"NZ" | "AU" | "UK" | "US" | "CA" | "EU" | "GLOBAL">;
  /** Categories of authority this source carries. */
  authorityKinds: ReadonlyArray<
    | "STATUTE"
    | "CASE_LAW"
    | "REGULATION"
    | "RULING"
    | "STANDARD"
    | "GUIDE"
    | "DATASET"
  >;
}

export const MARCO_SOURCES: ReadonlyArray<MarcoSource> = [
  // === Legal — NZ ===
  {
    slug: "legislation-govt-nz",
    domain: "LEGAL",
    name: "legislation.govt.nz",
    url: "https://www.legislation.govt.nz",
    description:
      "Official New Zealand consolidated statutes + regulations. Public domain.",
    jurisdictions: ["NZ"],
    authorityKinds: ["STATUTE", "REGULATION"],
  },
  {
    slug: "nzlii",
    domain: "LEGAL",
    name: "New Zealand Legal Information Institute (NZLII)",
    url: "http://www.nzlii.org",
    description:
      "Free access to NZ case law, tribunals, and legal scholarship.",
    jurisdictions: ["NZ"],
    authorityKinds: ["CASE_LAW", "STATUTE"],
  },
  {
    slug: "courts-of-nz",
    domain: "LEGAL",
    name: "Courts of New Zealand",
    url: "https://www.courtsofnz.govt.nz",
    description: "Supreme Court, Court of Appeal, and High Court judgments.",
    jurisdictions: ["NZ"],
    authorityKinds: ["CASE_LAW"],
  },

  // === Legal — AU ===
  {
    slug: "austlii",
    domain: "LEGAL",
    name: "Australasian Legal Information Institute (AustLII)",
    url: "https://www.austlii.edu.au",
    description:
      "Comprehensive AU + NZ case law, statutes, and treaties. Free access.",
    jurisdictions: ["AU", "NZ"],
    authorityKinds: ["CASE_LAW", "STATUTE", "REGULATION"],
  },
  {
    slug: "federal-register-of-legislation",
    domain: "LEGAL",
    name: "Federal Register of Legislation (AU)",
    url: "https://www.legislation.gov.au",
    description: "Authoritative AU Commonwealth statutes + delegated legislation.",
    jurisdictions: ["AU"],
    authorityKinds: ["STATUTE", "REGULATION"],
  },
  {
    slug: "high-court-of-australia",
    domain: "LEGAL",
    name: "High Court of Australia",
    url: "https://www.hcourt.gov.au",
    description: "Final appellate court of Australia. Authoritative judgments.",
    jurisdictions: ["AU"],
    authorityKinds: ["CASE_LAW"],
  },

  // === Legal — UK ===
  {
    slug: "bailii",
    domain: "LEGAL",
    name: "British and Irish Legal Information Institute (BAILII)",
    url: "https://www.bailii.org",
    description: "UK + Ireland case law and statutes. Free access.",
    jurisdictions: ["UK"],
    authorityKinds: ["CASE_LAW", "STATUTE"],
  },
  {
    slug: "legislation-gov-uk",
    domain: "LEGAL",
    name: "legislation.gov.uk",
    url: "https://www.legislation.gov.uk",
    description: "Official UK statutes + statutory instruments.",
    jurisdictions: ["UK"],
    authorityKinds: ["STATUTE", "REGULATION"],
  },

  // === Legal — US ===
  {
    slug: "courtlistener",
    domain: "LEGAL",
    name: "CourtListener (Free Law Project)",
    url: "https://www.courtlistener.com",
    description:
      "Federal + state US case law with API access. Bulk dataset available.",
    jurisdictions: ["US"],
    authorityKinds: ["CASE_LAW"],
  },
  {
    slug: "caselaw-access-project",
    domain: "LEGAL",
    name: "Caselaw Access Project (Harvard)",
    url: "https://case.law",
    description: "Every US state and federal case from 1658 onward. Free, indexed.",
    jurisdictions: ["US"],
    authorityKinds: ["CASE_LAW"],
  },
  {
    slug: "cornell-lii",
    domain: "LEGAL",
    name: "Cornell Legal Information Institute",
    url: "https://www.law.cornell.edu",
    description:
      "US Code, CFR, Supreme Court opinions, state law primers.",
    jurisdictions: ["US"],
    authorityKinds: ["STATUTE", "REGULATION", "CASE_LAW"],
  },
  {
    slug: "supreme-court-us",
    domain: "LEGAL",
    name: "Supreme Court of the United States",
    url: "https://www.supremecourt.gov",
    description: "Slip opinions and bound volumes of SCOTUS decisions.",
    jurisdictions: ["US"],
    authorityKinds: ["CASE_LAW"],
  },

  // === Accounting — NZ ===
  {
    slug: "ird-govt-nz",
    domain: "ACCOUNTING",
    name: "Inland Revenue (IR) — NZ",
    url: "https://www.ird.govt.nz",
    description:
      "Tax legislation, rulings, public statements, operational statements.",
    jurisdictions: ["NZ"],
    authorityKinds: ["STATUTE", "RULING", "GUIDE"],
  },
  {
    slug: "taxtechnical-ird",
    domain: "ACCOUNTING",
    name: "Tax Technical (IRD)",
    url: "https://www.taxtechnical.ird.govt.nz",
    description:
      "Public Rulings (BR Pub series), Operational Statements, Question We've Been Asked.",
    jurisdictions: ["NZ"],
    authorityKinds: ["RULING", "GUIDE"],
  },

  // === Accounting — AU ===
  {
    slug: "ato",
    domain: "ACCOUNTING",
    name: "Australian Taxation Office",
    url: "https://www.ato.gov.au",
    description:
      "ATO rulings (TR / TD / GSTR / PR / CR), Practice Statements, decision impact statements.",
    jurisdictions: ["AU"],
    authorityKinds: ["RULING", "GUIDE"],
  },
  {
    slug: "tpb-gov-au",
    domain: "ACCOUNTING",
    name: "Tax Practitioners Board (AU)",
    url: "https://www.tpb.gov.au",
    description:
      "Tax Agent Services Act, Code of Professional Conduct, registration regime.",
    jurisdictions: ["AU"],
    authorityKinds: ["STATUTE", "REGULATION", "GUIDE"],
  },

  // === Accounting — UK ===
  {
    slug: "hmrc",
    domain: "ACCOUNTING",
    name: "HM Revenue & Customs (HMRC)",
    url: "https://www.gov.uk/government/organisations/hm-revenue-customs",
    description: "UK tax law, HMRC manuals, Statements of Practice.",
    jurisdictions: ["UK"],
    authorityKinds: ["STATUTE", "RULING", "GUIDE"],
  },

  // === Accounting — US ===
  {
    slug: "irs-gov",
    domain: "ACCOUNTING",
    name: "Internal Revenue Service (IRS)",
    url: "https://www.irs.gov",
    description:
      "IRC, Treasury regulations, revenue rulings, revenue procedures, IRMs.",
    jurisdictions: ["US"],
    authorityKinds: ["STATUTE", "REGULATION", "RULING", "GUIDE"],
  },

  // === Accounting — CA ===
  {
    slug: "cra",
    domain: "ACCOUNTING",
    name: "Canada Revenue Agency (CRA)",
    url: "https://www.canada.ca/en/revenue-agency.html",
    description: "ITA, Income Tax Folios, Interpretation Bulletins.",
    jurisdictions: ["CA"],
    authorityKinds: ["STATUTE", "RULING", "GUIDE"],
  },

  // === Forensic ===
  {
    slug: "iaasb",
    domain: "FORENSIC",
    name: "International Auditing and Assurance Standards Board",
    url: "https://www.iaasb.org",
    description: "ISA standards including ISA 240 (fraud) and ISA 315.",
    jurisdictions: ["GLOBAL"],
    authorityKinds: ["STANDARD"],
  },
  {
    slug: "aicpa-forensic",
    domain: "FORENSIC",
    name: "AICPA Forensic & Litigation Services",
    url: "https://www.aicpa-cima.com",
    description:
      "AICPA Statement on Standards for Forensic Services, fraud reporting standards.",
    jurisdictions: ["US"],
    authorityKinds: ["STANDARD", "GUIDE"],
  },
  {
    slug: "acfe",
    domain: "FORENSIC",
    name: "Association of Certified Fraud Examiners",
    url: "https://www.acfe.com",
    description:
      "ACFE Fraud Tree, Report to the Nations, fraud-investigation methodology.",
    jurisdictions: ["GLOBAL"],
    authorityKinds: ["STANDARD", "DATASET", "GUIDE"],
  },
  {
    slug: "benford-research",
    domain: "FORENSIC",
    name: "Benford's Law applied research (peer-reviewed)",
    url: "https://en.wikipedia.org/wiki/Benford%27s_law",
    description:
      "Statistical fraud-detection method based on first-digit distribution. Mark Nigrini's work + ACFE guidance.",
    jurisdictions: ["GLOBAL"],
    authorityKinds: ["STANDARD"],
  },
  {
    slug: "arita",
    domain: "FORENSIC",
    name: "Australian Restructuring Insolvency & Turnaround Association",
    url: "https://www.arita.com.au",
    description:
      "ARITA Code of Professional Practice, insolvency-investigation standards.",
    jurisdictions: ["AU"],
    authorityKinds: ["STANDARD", "GUIDE"],
  },
  {
    slug: "asic-rg-forensic",
    domain: "FORENSIC",
    name: "ASIC Regulatory Guides (forensic-relevant)",
    url: "https://asic.gov.au",
    description:
      "RG 16 (external administrators' reports), RG 217 (remuneration), RG 84 (forensic investigation).",
    jurisdictions: ["AU"],
    authorityKinds: ["GUIDE", "REGULATION"],
  },
];

export function sourcesForDomain(domain: MarcoDomain): MarcoSource[] {
  return MARCO_SOURCES.filter((s) => s.domain === domain);
}

export const DOMAIN_LABELS: Record<MarcoDomain, string> = {
  LEGAL: "Marco Legal",
  ACCOUNTING: "Marco Accounting",
  FORENSIC: "Marco Forensic",
};
