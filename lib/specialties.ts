/**
 * lib/specialties.ts — the canonical catalogue of legal + accounting
 * specialties surfaced on /specialties and the per-specialty pages.
 *
 * Each row carries: slug, label, profession (LAW or ACCOUNTING), jurisdictions
 * supported, and a one-line summary. Deep-content pages may exist at
 * /specialties/[slug]; if not, the row still indexes on /specialties for SEO
 * and gets a "coming soon" stub linked to /contact for early access.
 */

export type Profession = "LAW" | "ACCOUNTING";

export interface SpecialtyRow {
  slug: string;
  label: string;
  profession: Profession;
  jurisdictions: ReadonlyArray<"NZ" | "AU" | "UK" | "US">;
  summary: string;
  /** Marker for whether a deep-content page exists at /specialties/[slug]. */
  deepPage?: boolean;
}

export const SPECIALTIES: ReadonlyArray<SpecialtyRow> = [
  // === Law: courtroom + dispute work ===
  {
    slug: "litigation",
    label: "Litigation",
    profession: "LAW",
    jurisdictions: ["NZ", "AU", "UK", "US"],
    summary:
      "Civil disputes, court applications, evidence, examinations, judgments. District through to appellate.",
    deepPage: true,
  },
  {
    slug: "criminal-defence",
    label: "Criminal defence",
    profession: "LAW",
    jurisdictions: ["NZ", "AU", "UK", "US"],
    summary:
      "Indictable, summary, and youth offences. Bail, sentencing, appeals, legal aid integration.",
  },
  {
    slug: "tenancy",
    label: "Tenancy",
    profession: "LAW",
    jurisdictions: ["NZ", "AU", "UK"],
    summary:
      "Tenancy Tribunal (NZ), NCAT/VCAT/QCAT (AU), housing disputes (UK). Bond, repairs, termination.",
  },
  {
    slug: "family",
    label: "Family law",
    profession: "LAW",
    jurisdictions: ["NZ", "AU", "UK", "US"],
    summary:
      "Divorce, parenting, child support, relationship property, protection orders, adoption.",
    deepPage: true,
  },
  {
    slug: "employment",
    label: "Employment",
    profession: "LAW",
    jurisdictions: ["NZ", "AU", "UK", "US"],
    summary:
      "ERA (NZ), Fair Work (AU), employment tribunal (UK), state + federal (US). Disputes, restructures, restraints.",
    deepPage: true,
  },
  {
    slug: "personal-injury",
    label: "Personal injury",
    profession: "LAW",
    jurisdictions: ["AU", "UK", "US"],
    summary:
      "CTP (AU), MIB (UK), tort + contingency (US). NZ excluded by ACC barring carve-outs.",
  },
  {
    slug: "defamation",
    label: "Defamation + media",
    profession: "LAW",
    jurisdictions: ["NZ", "AU", "UK", "US"],
    summary:
      "Defamation, breach of privacy, harassment under the Harmful Digital Communications Act + UK + AU statutes.",
  },

  // === Law: transactional ===
  {
    slug: "commercial-corporate",
    label: "Commercial / corporate / M&A",
    profession: "LAW",
    jurisdictions: ["NZ", "AU", "UK", "US"],
    summary:
      "Contract drafting, mergers, acquisitions, due diligence, joint ventures, shareholder agreements.",
    deepPage: true,
  },
  {
    slug: "real-estate",
    label: "Real estate / property",
    profession: "LAW",
    jurisdictions: ["NZ", "AU", "UK", "US"],
    summary:
      "Beyond conveyancing — leases, body corporate / strata, RMA, commercial property, foreign-investor approvals.",
  },
  {
    slug: "conveyancing",
    label: "Conveyancing",
    profession: "LAW",
    jurisdictions: ["NZ", "AU", "UK"],
    summary:
      "Title, LIM, AML/CFT pre-clear, conditions tracker, settlement statement, e-dealing. Already a deep module.",
  },
  {
    slug: "trusts-estates",
    label: "Trusts + estates",
    profession: "LAW",
    jurisdictions: ["NZ", "AU", "UK", "US"],
    summary:
      "Trustee duties, settlor advice, beneficiary disputes, estate administration, contested wills.",
  },
  {
    slug: "wills",
    label: "Wills register",
    profession: "LAW",
    jurisdictions: ["NZ", "AU", "UK"],
    summary:
      "Searchable register, supersession chain, encrypted at rest, annual review prompts. Already a deep module.",
  },
  {
    slug: "intellectual-property",
    label: "Intellectual property",
    profession: "LAW",
    jurisdictions: ["NZ", "AU", "UK", "US"],
    summary:
      "Patents, trademarks, copyright, trade secrets, licensing. IPONZ, IP Australia, USPTO, EUIPO, UK IPO.",
    deepPage: true,
  },
  {
    slug: "banking-finance",
    label: "Banking + finance",
    profession: "LAW",
    jurisdictions: ["NZ", "AU", "UK", "US"],
    summary:
      "Lender's counsel, secured transactions, PPSR/PPSA, syndicated lending, security enforcement.",
  },
  {
    slug: "securities",
    label: "Securities + capital markets",
    profession: "LAW",
    jurisdictions: ["NZ", "AU", "UK", "US"],
    summary:
      "IPOs, private placements, FMA / ASIC / SEC / FCA filings, FMC Act 2013, Corporations Act 2001 compliance.",
  },
  {
    slug: "construction",
    label: "Construction",
    profession: "LAW",
    jurisdictions: ["NZ", "AU", "UK"],
    summary:
      "NZS 3910, AS 2124 / 4000, NEC, JCT contracts. Defects, payment claims, adjudication, disputes.",
  },

  // === Law: regulatory + public ===
  {
    slug: "tax-disputes",
    label: "Tax disputes",
    profession: "LAW",
    jurisdictions: ["NZ", "AU", "UK", "US"],
    summary:
      "IRD risk reviews, ATO objections + AAT, HMRC enquiries, IRS audit defence. Distinct from advisory.",
  },
  {
    slug: "environmental-rma",
    label: "Environmental / RMA",
    profession: "LAW",
    jurisdictions: ["NZ", "AU"],
    summary:
      "RMA + Fast-track approvals (NZ), EPA + state environment Acts (AU). Resource consents, designations.",
  },
  {
    slug: "public-administrative",
    label: "Public + administrative",
    profession: "LAW",
    jurisdictions: ["NZ", "AU", "UK", "US"],
    summary:
      "Judicial review, Crown / Government work, regulatory advice, OIA / FOI, ombudsman.",
  },
  {
    slug: "te-tiriti-maori",
    label: "Te Tiriti / Māori legal",
    profession: "LAW",
    jurisdictions: ["NZ"],
    summary:
      "Treaty work, Māori land law (Te Ture Whenua Māori 1993), Waitangi Tribunal, Iwi negotiations.",
    deepPage: true,
  },
  {
    slug: "indigenous-au",
    label: "Indigenous legal services (AU)",
    profession: "LAW",
    jurisdictions: ["AU"],
    summary:
      "Native Title Act 1993, Land Rights Acts, ATSILS support, Aboriginal heritage protection.",
  },
  {
    slug: "immigration",
    label: "Immigration",
    profession: "LAW",
    jurisdictions: ["NZ", "AU", "UK", "US"],
    summary:
      "INZ, Home Affairs, USCIS, UKVI. LIA + RMA + lawyer practitioner classes handled. Already deep modules.",
  },
  {
    slug: "insolvency",
    label: "Insolvency",
    profession: "LAW",
    jurisdictions: ["NZ", "AU", "UK"],
    summary:
      "Liquidations, voluntary administrations, receiverships, personal bankruptcies. Already a deep module.",
  },
  {
    slug: "privacy-data",
    label: "Privacy + data protection",
    profession: "LAW",
    jurisdictions: ["NZ", "AU", "UK", "US"],
    summary:
      "Privacy Act 2020, Privacy Act 1988 + APPs, UK GDPR, CCPA/CPRA. Breach response, ROPA, DPIAs.",
  },
  {
    slug: "cybersecurity",
    label: "Cybersecurity + cyber-incident",
    profession: "LAW",
    jurisdictions: ["NZ", "AU", "UK", "US"],
    summary:
      "Ransomware response, breach notification, NCSC / ACSC engagement, IR retainers.",
  },
  {
    slug: "ai-law",
    label: "AI law",
    profession: "LAW",
    jurisdictions: ["NZ", "AU", "UK", "US"],
    summary:
      "EU AI Act compliance, Colorado AI Act, AI deployment counsel, model governance, AI-generated IP.",
  },
  {
    slug: "aml-cft",
    label: "AML / CFT",
    profession: "LAW",
    jurisdictions: ["NZ", "AU", "UK", "US"],
    summary:
      "Customer due diligence, sanctions + PEP screening, SAR/STR, ongoing monitoring. Already a deep module.",
  },
  {
    slug: "dispute-resolution",
    label: "ADR / mediation / arbitration",
    profession: "LAW",
    jurisdictions: ["NZ", "AU", "UK", "US"],
    summary:
      "Mediation, arbitration (Arbitration Act 1996 NZ, IAA / NCAT), expert determination, Med-Arb.",
  },
  {
    slug: "health-law",
    label: "Health law",
    profession: "LAW",
    jurisdictions: ["NZ", "AU", "UK", "US"],
    summary:
      "HDC (NZ), AHPRA + tribunals (AU), GMC (UK), state medical boards (US). Disciplinary + compliance.",
  },
  {
    slug: "education-law",
    label: "Education law",
    profession: "LAW",
    jurisdictions: ["NZ", "AU", "UK", "US"],
    summary:
      "Schools, universities, regulatory disputes, special education, employment of teaching staff.",
  },
  {
    slug: "sports-entertainment",
    label: "Sports + entertainment",
    profession: "LAW",
    jurisdictions: ["NZ", "AU", "UK", "US"],
    summary:
      "Athlete contracts, agency, talent, music + film, broadcast rights, league disputes.",
  },
  {
    slug: "coronial",
    label: "Coronial / inquest",
    profession: "LAW",
    jurisdictions: ["NZ", "AU", "UK"],
    summary:
      "Inquests, coronial findings, family representation, expert evidence preparation.",
  },
  {
    slug: "pro-bono",
    label: "Pro bono / Community Law",
    profession: "LAW",
    jurisdictions: ["NZ", "AU", "UK", "US"],
    summary:
      "Free legal aid for low-income citizens. CLCs (NZ), Legal Aid Commissions (AU), CABs (UK), LSC (US).",
  },

  // === Accounting: assurance + advisory ===
  {
    slug: "audit-assurance",
    label: "Audit + assurance",
    profession: "ACCOUNTING",
    jurisdictions: ["NZ", "AU", "UK", "US"],
    summary:
      "External audit, ISA / ASA standards, internal controls testing, going-concern reviews.",
    deepPage: true,
  },
  {
    slug: "business-advisory",
    label: "Business advisory / virtual CFO",
    profession: "ACCOUNTING",
    jurisdictions: ["NZ", "AU", "UK", "US"],
    summary:
      "Strategic advice, cash-flow forecasting, KPI dashboards, virtual CFO retainers, exit-readiness.",
  },
  {
    slug: "forensic-accounting",
    label: "Forensic accounting",
    profession: "ACCOUNTING",
    jurisdictions: ["NZ", "AU", "UK", "US"],
    summary:
      "Fraud investigation, litigation support, expert-witness work, Benford's Law, ghost vendor detection.",
  },
  {
    slug: "management-accounting",
    label: "Management accounting",
    profession: "ACCOUNTING",
    jurisdictions: ["NZ", "AU", "UK", "US"],
    summary:
      "Internal CFO, costing, margin analysis, CMA / FCMA-aligned. Industry-by-industry depth.",
  },

  // === Accounting: tax ===
  {
    slug: "tax-advisory",
    label: "Tax advisory",
    profession: "ACCOUNTING",
    jurisdictions: ["NZ", "AU", "UK", "US"],
    summary:
      "Tax positions, voluntary disclosures, binding rulings, audit defence. Already a deep module.",
  },
  {
    slug: "international-tax",
    label: "International tax",
    profession: "ACCOUNTING",
    jurisdictions: ["NZ", "AU", "UK", "US"],
    summary:
      "Treaty interpretation, controlled-foreign-company rules, GLoBE Pillar 1+2, expat compliance.",
  },
  {
    slug: "transfer-pricing",
    label: "Transfer pricing",
    profession: "ACCOUNTING",
    jurisdictions: ["NZ", "AU", "UK", "US"],
    summary:
      "OECD Pillar 1+2, CbC reporting, local + master file, advance pricing arrangements.",
  },
  {
    slug: "indirect-taxes",
    label: "GST / VAT / sales tax",
    profession: "ACCOUNTING",
    jurisdictions: ["NZ", "AU", "UK", "US"],
    summary:
      "NZ GST, AU GST/BAS, UK VAT, US 50-state sales tax. Multi-jurisdictional ledger from day one.",
  },
  {
    slug: "rd-tax-credits",
    label: "R&D tax credits",
    profession: "ACCOUNTING",
    jurisdictions: ["NZ", "AU", "UK", "US"],
    summary:
      "NZ R&D Tax Incentive, AU R&D Tax Incentive, UK SME + RDEC, US R&D credit + IRC §174.",
  },

  // === Accounting: specialised ===
  {
    slug: "smsf",
    label: "SMSF (self-managed super fund)",
    profession: "ACCOUNTING",
    jurisdictions: ["AU"],
    summary:
      "AU-specific. ~600,000 SMSFs in market. SISA compliance, audit, lodgement, contribution caps.",
    deepPage: true,
  },
  {
    slug: "estate-trust-accounting",
    label: "Estate + trust accounting",
    profession: "ACCOUNTING",
    jurisdictions: ["NZ", "AU", "UK", "US"],
    summary:
      "Estate administration, trust distributions, IR6 (NZ), trust returns (AU/UK/US), beneficiary statements.",
  },
  {
    slug: "not-for-profit",
    label: "Not-for-profit / charity",
    profession: "ACCOUNTING",
    jurisdictions: ["NZ", "AU", "UK", "US"],
    summary:
      "Charities Services (NZ), ACNC (AU), Charity Commission (UK), 990 + state filings (US).",
  },
  {
    slug: "public-sector",
    label: "Public sector",
    profession: "ACCOUNTING",
    jurisdictions: ["NZ", "AU", "UK", "US"],
    summary:
      "OAG (NZ), ANAO (AU), NAO (UK), GAO (US). PBE / IPSAS / GAAP-G aligned.",
  },
  {
    slug: "crypto-accounting",
    label: "Crypto / digital asset accounting",
    profession: "ACCOUNTING",
    jurisdictions: ["NZ", "AU", "UK", "US"],
    summary:
      "Token treatment, mining income, NFT cost basis, ATO crypto guidance, IRD position, IRS Form 8949.",
  },
  {
    slug: "construction-accounting",
    label: "Construction accounting",
    profession: "ACCOUNTING",
    jurisdictions: ["NZ", "AU", "UK", "US"],
    summary:
      "Long-term contracts, percentage-of-completion, retentions, subcontractor management.",
  },
  {
    slug: "ecommerce-accounting",
    label: "E-commerce accounting",
    profession: "ACCOUNTING",
    jurisdictions: ["NZ", "AU", "UK", "US"],
    summary:
      "Multi-channel inventory, marketplace fees, FX revaluation, sales-tax nexus across 24+ US states.",
  },

  // === Cross-cutting / professional services ===
  {
    slug: "engagement-letters",
    label: "Engagement letters",
    profession: "LAW",
    jurisdictions: ["NZ", "AU", "UK", "US"],
    summary:
      "APES 305 (AU), NZLS Conduct Rules, SRA Code (UK). Already a deep module.",
  },
  {
    slug: "cpd",
    label: "CPD / CLE / CPE",
    profession: "LAW",
    jurisdictions: ["NZ", "AU", "UK", "US"],
    summary:
      "Auto-logged from research + drafting + review hours. NZLS, LCA, state bars, CA ANZ, CPA AU. Already a module.",
  },
  {
    slug: "company-secretarial",
    label: "Company secretarial",
    profession: "ACCOUNTING",
    jurisdictions: ["NZ", "AU", "UK", "US"],
    summary:
      "Annual returns, board minutes, registers, regulatory filings. Marco Reid as company secretary.",
  },
  {
    slug: "incorporation",
    label: "Incorporation",
    profession: "ACCOUNTING",
    jurisdictions: ["NZ", "AU", "UK", "US"],
    summary:
      "DE C-Corp, LLC, NZ Ltd, AU Pty, UK Ltd. Marco Reid Launch — Stripe Atlas + sign-off.",
  },
];

/** Lookup table for /specialties/[slug] resolution. */
export const SPECIALTY_BY_SLUG: Record<string, SpecialtyRow> = Object.fromEntries(
  SPECIALTIES.map((s) => [s.slug, s]),
);

export const PROFESSIONS: ReadonlyArray<{ value: Profession; label: string }> = [
  { value: "LAW", label: "Legal" },
  { value: "ACCOUNTING", label: "Accounting" },
];

export const JURISDICTION_LABELS: Record<"NZ" | "AU" | "UK" | "US", string> = {
  NZ: "New Zealand",
  AU: "Australia",
  UK: "United Kingdom",
  US: "United States",
};
