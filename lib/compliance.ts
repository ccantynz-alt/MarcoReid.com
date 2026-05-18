/**
 * Marco Reid — Regulatory Compliance Matrix
 *
 * This is the single source of truth for what legal, regulatory, and
 * professional compliance requirements apply in each jurisdiction.
 *
 * Every item must be addressed before launch in that country.
 * Status: "compliant" | "in-progress" | "not-started" | "not-applicable"
 */

export type ComplianceStatus = "compliant" | "in-progress" | "not-started" | "not-applicable";

export interface ComplianceItem {
  requirement: string;
  category: "data-privacy" | "professional-regulation" | "financial-regulation" | "ai-regulation" | "consumer-protection" | "tax-authority" | "trust-accounting" | "aml-kyc";
  description: string;
  risk: "critical" | "high" | "medium" | "low";
  status: ComplianceStatus;
  action: string;
}

export interface CountryCompliance {
  code: string;
  name: string;
  items: ComplianceItem[];
}

export const COMPLIANCE_MATRIX: Record<string, CountryCompliance> = {
  NZ: {
    code: "NZ",
    name: "New Zealand",
    items: [
      // DATA PRIVACY
      {
        requirement: "Privacy Act 2020 compliance",
        category: "data-privacy",
        description: "All personal data must comply with NZ Privacy Act 2020 Information Privacy Principles (IPPs). Data breach notification mandatory within 72 hours to Privacy Commissioner.",
        risk: "critical",
        status: "in-progress",
        action: "Implement IPP-compliant data handling, breach notification system, privacy impact assessment process",
      },
      {
        requirement: "Cross-border data transfer",
        category: "data-privacy",
        description: "NZ has EU adequacy status. Data can flow to NZ freely from EU. Transfers OUT of NZ require comparable protections under IPP 12.",
        risk: "high",
        status: "in-progress",
        action: "Document data flows. If hosting outside NZ, ensure receiving country has comparable protections or contractual safeguards.",
      },
      {
        requirement: "Data residency — client preference",
        category: "data-privacy",
        description: "NZ law firms may require data stored within NZ or AU. No legal mandate but strong professional expectation.",
        risk: "medium",
        status: "not-started",
        action: "Offer NZ/AU data residency option via Crontech region selection.",
      },

      // PROFESSIONAL REGULATION
      {
        requirement: "NZLS (NZ Law Society) — not providing legal advice",
        category: "professional-regulation",
        description: "Marco Reid must NOT be positioned as providing legal advice. Only licensed NZ lawyers (holding a practising certificate) can provide legal advice under the Lawyers and Conveyancers Act 2006.",
        risk: "critical",
        status: "compliant",
        action: "AI disclaimer on every research output. Platform positioned as tool FOR professionals, not as professional itself.",
      },
      {
        requirement: "CA ANZ — not providing accounting advice",
        category: "professional-regulation",
        description: "Accounting features must not position Marco Reid as providing accounting or tax advice. Tax agent registration required under the Tax Administration Act 1994 for anyone preparing tax returns for others.",
        risk: "critical",
        status: "compliant",
        action: "AI disclaimer present. Catch-Up Centre requires qualified accountant sign-off before filing.",
      },
      {
        requirement: "Trust account — Lawyers and Conveyancers Act 2006",
        category: "trust-accounting",
        description: "Client trust money must be held in designated trust accounts at approved NZ banks. Three-way reconciliation required. Interest to NZ Law Foundation. Annual audit by approved auditor.",
        risk: "critical",
        status: "in-progress",
        action: "Implement NZ-specific trust accounting rules in trust module. Validate against NZLS Trust Account Regulations.",
      },

      // FINANCIAL REGULATION
      {
        requirement: "AML/CFT — Anti-Money Laundering",
        category: "aml-kyc",
        description: "NZ lawyers and accountants are 'reporting entities' under the Anti-Money Laundering and Countering Financing of Terrorism Act 2009. Must conduct customer due diligence (CDD).",
        risk: "critical",
        status: "not-started",
        action: "Build CDD workflow into client onboarding. ID verification, source of funds, PEP screening.",
      },
      {
        requirement: "IR — Tax agent registration",
        category: "tax-authority",
        description: "Anyone preparing tax returns for others must be a registered tax agent with Inland Revenue. Marco Reid's Catch-Up Centre must have registered tax agents reviewing filings.",
        risk: "critical",
        status: "in-progress",
        action: "Ensure Catch-Up Centre workflow requires sign-off by registered NZ tax agent.",
      },

      // CONSUMER PROTECTION
      {
        requirement: "Consumer Guarantees Act 1993 + Fair Trading Act 1986",
        category: "consumer-protection",
        description: "SaaS subscriptions must comply with NZ consumer protection. Auto-renewal terms must be clearly disclosed. Cooling-off periods for some contracts.",
        risk: "medium",
        status: "in-progress",
        action: "Clear subscription terms, easy cancellation, refund policy compliant with CGA.",
      },
    ],
  },

  AU: {
    code: "AU",
    name: "Australia",
    items: [
      // DATA PRIVACY
      {
        requirement: "Privacy Act 1988 (2022 reforms) — APPs",
        category: "data-privacy",
        description: "Must comply with Australian Privacy Principles (APPs). Mandatory data breach notification to OAIC within 30 days. 2022 reforms increased penalties to $50M or 30% of turnover.",
        risk: "critical",
        status: "in-progress",
        action: "Implement APP-compliant data handling. Notifiable Data Breaches scheme compliance.",
      },
      {
        requirement: "Data residency — government and regulated sectors",
        category: "data-privacy",
        description: "Australian government clients may require data stored onshore. No blanket mandate but strong procurement preference.",
        risk: "medium",
        status: "not-started",
        action: "Offer AU data residency option.",
      },

      // PROFESSIONAL REGULATION
      {
        requirement: "State Law Societies — practising certificates",
        category: "professional-regulation",
        description: "Each state has its own Law Society or Legal Services Board. Lawyers must hold a current practising certificate. Software must not provide legal advice. Different trust accounting rules per state.",
        risk: "critical",
        status: "compliant",
        action: "AI disclaimer present. State-specific trust rules needed in trust module.",
      },
      {
        requirement: "Tax Practitioners Board (TPB) registration",
        category: "professional-regulation",
        description: "Tax agents, BAS agents, and tax (financial) advisers must be registered with the TPB under TASA 2009. Marco Reid cannot prepare BAS or tax returns without a registered agent.",
        risk: "critical",
        status: "in-progress",
        action: "Catch-Up Centre requires TPB-registered agent sign-off.",
      },
      {
        requirement: "Trust accounts — state-based rules",
        category: "trust-accounting",
        description: "Each state has different trust accounting regulations. NSW: Legal Profession Uniform Law. VIC: same. QLD: Trust Accounts Act 1973. SA, WA, TAS: separate regimes.",
        risk: "critical",
        status: "not-started",
        action: "Implement state-specific trust accounting rules. Start with NSW/VIC (Uniform Law) then QLD.",
      },

      // AML/KYC
      {
        requirement: "AML/CTF Act 2006",
        category: "aml-kyc",
        description: "Legal practitioners are designated services under AML/CTF. Customer identification procedures, suspicious matter reporting to AUSTRAC.",
        risk: "critical",
        status: "not-started",
        action: "Build AML/CTF customer identification into client onboarding workflow.",
      },

      // CONSUMER PROTECTION
      {
        requirement: "Australian Consumer Law (ACL)",
        category: "consumer-protection",
        description: "ACL applies to SaaS. Unfair contract terms provisions. Consumer guarantees for services. ACCC enforcement.",
        risk: "medium",
        status: "in-progress",
        action: "Review terms of service against ACL unfair contract terms provisions.",
      },
    ],
  },

  UK: {
    code: "UK",
    name: "United Kingdom",
    items: [
      // DATA PRIVACY
      {
        requirement: "UK GDPR + Data Protection Act 2018",
        category: "data-privacy",
        description: "Full GDPR compliance required post-Brexit via UK GDPR. ICO enforcement. Data breach notification within 72 hours. DPIA required for high-risk processing. Fines up to £17.5M or 4% turnover.",
        risk: "critical",
        status: "in-progress",
        action: "Complete DPIA. Appoint UK representative if no UK establishment. Implement data subject rights (access, erasure, portability).",
      },
      {
        requirement: "UK data residency — adequacy decisions",
        category: "data-privacy",
        description: "UK has adequacy decisions with EU, NZ, and others. Data can flow freely to adequate countries. Transfers to US require appropriate safeguards (UK International Data Transfer Agreement).",
        risk: "high",
        status: "not-started",
        action: "Document international data transfers. Implement UK IDTA or SCCs where needed.",
      },

      // PROFESSIONAL REGULATION
      {
        requirement: "SRA (Solicitors Regulation Authority) compliance",
        category: "professional-regulation",
        description: "Solicitors regulated by SRA under the Legal Services Act 2007. SRA Standards and Regulations apply. Software handling client money must comply with SRA Accounts Rules 2019.",
        risk: "critical",
        status: "in-progress",
        action: "Trust accounting must implement SRA Accounts Rules 2019 specifically. Not IOLTA.",
      },
      {
        requirement: "BSB (Bar Standards Board) — barristers",
        category: "professional-regulation",
        description: "Barristers regulated by BSB. Different rules from solicitors. Barristers generally cannot hold client money (with limited exceptions).",
        risk: "medium",
        status: "not-started",
        action: "Ensure platform supports barrister-mode with no trust accounting (not applicable for most barristers).",
      },
      {
        requirement: "SRA Accounts Rules 2019 — client money",
        category: "trust-accounting",
        description: "Client money must be kept in a client account at a bank/building society approved by the SRA. Must not mix client and office money. Annual accountant's report to SRA. Interest policy required.",
        risk: "critical",
        status: "not-started",
        action: "Build UK-specific trust accounting module following SRA Accounts Rules 2019.",
      },

      // AML/KYC
      {
        requirement: "Money Laundering Regulations 2017 (MLR 2017)",
        category: "aml-kyc",
        description: "UK solicitors and accountants are subject to MLR 2017. Must conduct customer due diligence, ongoing monitoring, suspicious activity reporting to NCA (UKFIU). Firm-wide risk assessment required.",
        risk: "critical",
        status: "not-started",
        action: "Build MLR 2017 compliant CDD workflow. SAR filing integration with NCA.",
      },

      // AI REGULATION
      {
        requirement: "UK AI regulation framework",
        category: "ai-regulation",
        description: "UK uses sector-specific AI regulation (no single AI Act like EU). SRA has issued guidance on AI use in legal practice. Must be transparent about AI-generated content.",
        risk: "medium",
        status: "compliant",
        action: "AI disclaimer present on all research outputs. Transparency about AI use maintained.",
      },

      // CONSUMER PROTECTION
      {
        requirement: "Consumer Rights Act 2015",
        category: "consumer-protection",
        description: "Digital content and services provisions apply to SaaS. Right to refund within 14 days (distance selling). Unfair terms regulations.",
        risk: "medium",
        status: "in-progress",
        action: "Implement 14-day cooling-off period for UK subscribers. Review terms against CRA 2015.",
      },
    ],
  },

  US: {
    code: "US",
    name: "United States",
    items: [
      // DATA PRIVACY
      {
        requirement: "CCPA/CPRA (California) + state privacy laws",
        category: "data-privacy",
        description: "No federal privacy law. CCPA/CPRA (California), VCDPA (Virginia), CPA (Colorado), CTDPA (Connecticut), and growing list of state laws. Must comply with each state where users reside.",
        risk: "critical",
        status: "in-progress",
        action: "Implement CCPA/CPRA compliance (right to delete, right to know, opt-out of sale). Extend to other state laws.",
      },
      {
        requirement: "HIPAA — if handling health-related legal matters",
        category: "data-privacy",
        description: "If law firms use Marco Reid for health law, medical malpractice, or personal injury with medical records, HIPAA may apply. Business Associate Agreement (BAA) may be required.",
        risk: "high",
        status: "not-started",
        action: "Prepare BAA template. Implement HIPAA-compliant data handling option for health-related matters.",
      },
      {
        requirement: "GLBA — if handling financial data",
        category: "data-privacy",
        description: "Gramm-Leach-Bliley Act applies to financial data. If accounting clients have banking/financial data flowing through the platform, GLBA safeguards apply.",
        risk: "medium",
        status: "not-started",
        action: "Implement GLBA safeguards for accounting module handling financial data.",
      },

      // PROFESSIONAL REGULATION
      {
        requirement: "ABA Model Rules — unauthorised practice of law (UPL)",
        category: "professional-regulation",
        description: "Each state defines UPL differently. AI cannot practice law. Platform must clearly be a tool for licensed attorneys, not a substitute. Some states (Florida, Texas) have strict UPL enforcement.",
        risk: "critical",
        status: "compliant",
        action: "AI disclaimer on all outputs. Terms of service restrict access to licensed professionals.",
      },
      {
        requirement: "State bar ethics opinions on AI",
        category: "professional-regulation",
        description: "Multiple state bars have issued ethics opinions on AI use (CA, NY, FL, TX). Lawyers must supervise AI output, verify citations, maintain competence. Marco Reid's verification system addresses this.",
        risk: "high",
        status: "compliant",
        action: "Citation verification system with badges (Verified/Unverified/Not Found) addresses duty to verify.",
      },
      {
        requirement: "IOLTA — 50-state trust accounting",
        category: "trust-accounting",
        description: "Every state has IOLTA rules. Most require monthly reconciliation, separate trust accounts, and specific record-keeping. State bar audits can happen without notice.",
        risk: "critical",
        status: "in-progress",
        action: "Trust module implements IOLTA basics. Need state-specific rule validation for each state.",
      },
      {
        requirement: "AICPA professional standards",
        category: "professional-regulation",
        description: "CPAs must follow AICPA Code of Professional Conduct. AI-generated tax research must be reviewed by CPA before reliance. No engagement letters without CPA oversight.",
        risk: "high",
        status: "compliant",
        action: "Catch-Up Centre requires CPA sign-off. AI disclaimer on all accounting research.",
      },

      // AML/KYC
      {
        requirement: "FinCEN — Beneficial Ownership Rule (2024)",
        category: "aml-kyc",
        description: "New FinCEN beneficial ownership reporting requirements effective 2024. Law firms handling corporate formations must report beneficial owners. CTA (Corporate Transparency Act) compliance.",
        risk: "high",
        status: "not-started",
        action: "Build beneficial ownership reporting into company incorporation workflow.",
      },

      // AI REGULATION
      {
        requirement: "State AI regulations (emerging)",
        category: "ai-regulation",
        description: "Colorado AI Act (2024), NYC Local Law 144 (hiring AI), and growing state-level AI regulation. No federal AI law yet. Must monitor and adapt.",
        risk: "medium",
        status: "in-progress",
        action: "Monitor state AI legislation. Maintain transparency about AI use. Human-in-the-loop for all consequential decisions.",
      },

      // CONSUMER PROTECTION
      {
        requirement: "FTC Act Section 5 + state UDAP laws",
        category: "consumer-protection",
        description: "FTC enforces against unfair/deceptive practices. State UDAP (Unfair and Deceptive Acts and Practices) laws vary. Auto-renewal must comply with state auto-renewal laws (CA SB-313).",
        risk: "medium",
        status: "in-progress",
        action: "Auto-renewal disclosure compliant with CA auto-renewal law. Clear cancellation process.",
      },
    ],
  },

  CA: {
    code: "CA",
    name: "Canada",
    items: [
      // DATA PRIVACY
      {
        requirement: "PIPEDA + provincial privacy laws",
        category: "data-privacy",
        description: "PIPEDA governs private sector data handling federally. Quebec has its own Law 25 (strongest in Canada). BC and Alberta have PIPA. Must comply with applicable provincial law.",
        risk: "critical",
        status: "not-started",
        action: "Implement PIPEDA compliance. Special attention to Quebec Law 25 (mandatory privacy impact assessments, consent requirements).",
      },
      {
        requirement: "Data residency — Canadian data sovereignty",
        category: "data-privacy",
        description: "BC FIPPA and Nova Scotia PIIDPA require public body data to be stored in Canada. Law societies may have similar expectations for client data.",
        risk: "high",
        status: "not-started",
        action: "Offer Canadian data residency option. Document where data is stored and processed.",
      },

      // PROFESSIONAL REGULATION
      {
        requirement: "Provincial Law Societies — 13 jurisdictions",
        category: "professional-regulation",
        description: "Each province has its own Law Society with different rules. LSO (Ontario), LSBC (British Columbia), Barreau du Québec (Quebec — civil law + French language). Must not provide legal advice.",
        risk: "critical",
        status: "compliant",
        action: "AI disclaimer present. Platform positioned as professional tool.",
      },
      {
        requirement: "Provincial trust accounting rules",
        category: "trust-accounting",
        description: "Each Law Society has different trust accounting rules. LSO By-Law 9 (Ontario). LSBC Rules (BC). Barreau du Québec rules. Some require specific bank designations.",
        risk: "critical",
        status: "not-started",
        action: "Implement province-specific trust accounting rules, starting with Ontario (LSO) and BC (LSBC).",
      },
      {
        requirement: "CPA Canada + provincial CPA bodies",
        category: "professional-regulation",
        description: "CPAs regulated provincially. CPA Ontario, CPA Quebec (Ordre des CPA du Québec — French language). Tax preparation governed by CRA rules.",
        risk: "high",
        status: "in-progress",
        action: "Ensure Catch-Up Centre has CPA sign-off. Quebec may require French-language support.",
      },

      // AML/KYC
      {
        requirement: "PCMLTFA — Proceeds of Crime (Money Laundering) and Terrorist Financing Act",
        category: "aml-kyc",
        description: "Canadian lawyers and accountants are subject to PCMLTFA. Must verify client identity, report suspicious transactions to FINTRAC. Law societies have separate AML rules.",
        risk: "critical",
        status: "not-started",
        action: "Build FINTRAC-compliant client identification into onboarding. STR (Suspicious Transaction Report) workflow.",
      },

      // AI REGULATION
      {
        requirement: "AIDA — Artificial Intelligence and Data Act (proposed)",
        category: "ai-regulation",
        description: "Canada's proposed AI regulation (part of Bill C-27). Would regulate high-impact AI systems. Currently in legislative process. May require AI impact assessments.",
        risk: "medium",
        status: "in-progress",
        action: "Monitor AIDA progress. Prepare AI impact assessment framework.",
      },

      // CONSUMER PROTECTION
      {
        requirement: "Competition Act + provincial consumer protection",
        category: "consumer-protection",
        description: "Federal Competition Act + provincial acts (Ontario CPA 2002, Quebec CPA). Auto-renewal terms must be clearly disclosed. Quebec requires French-language terms.",
        risk: "medium",
        status: "not-started",
        action: "Quebec: French-language terms and UI required. All provinces: clear auto-renewal disclosure.",
      },
      {
        requirement: "Quebec — French language requirements",
        category: "consumer-protection",
        description: "Charter of the French Language (Bill 96, 2022) requires French-language availability for commercial software used in Quebec. Terms, privacy policy, and UI must be available in French.",
        risk: "high",
        status: "not-started",
        action: "Build French-language support for Quebec market. Translate terms, privacy policy, and core UI.",
      },
    ],
  },
};

// Summary helpers

export function getComplianceScore(code: string): { total: number; compliant: number; inProgress: number; notStarted: number; percentage: number } {
  const country = COMPLIANCE_MATRIX[code];
  if (!country) return { total: 0, compliant: 0, inProgress: 0, notStarted: 0, percentage: 0 };

  const items = country.items;
  const total = items.length;
  const compliant = items.filter(i => i.status === "compliant").length;
  const inProgress = items.filter(i => i.status === "in-progress").length;
  const notStarted = items.filter(i => i.status === "not-started").length;
  const percentage = Math.round((compliant / total) * 100);

  return { total, compliant, inProgress, notStarted, percentage };
}

export function getCriticalBlockers(code: string): ComplianceItem[] {
  const country = COMPLIANCE_MATRIX[code];
  if (!country) return [];
  return country.items.filter(i => i.risk === "critical" && i.status !== "compliant");
}

export function getAllCriticalBlockers(): Array<{ country: string; items: ComplianceItem[] }> {
  return Object.entries(COMPLIANCE_MATRIX).map(([code, country]) => ({
    country: country.name,
    items: country.items.filter(i => i.risk === "critical" && i.status !== "compliant"),
  })).filter(c => c.items.length > 0);
}
