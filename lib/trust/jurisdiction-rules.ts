// Jurisdictional rules for legal trust accounts.
// Each jurisdiction sets its own statutory citation, the regulator
// that supervises trust monies, the maximum hold period for mixed
// payments before they must be apportioned, the treatment of
// interest earned on trust funds, and the cadence at which a firm
// must run a formal three-way reconciliation.
//
// These values are encoded conservatively. Where a rule is set by
// statute (e.g. NZ Trust Account Regulations 2008, reg 12) the
// numeric values are pinned to the statute. Where the rule is
// principle-based (e.g. SRA Accounts Rules 2019, rule 8.3 — "as
// soon as possible"), we adopt the longest period commonly cited
// in regulator guidance.

import type { TrustJurisdiction } from "@prisma/client";

export type ReconciliationCadence = "MONTHLY" | "QUARTERLY";

export type InterestTreatment =
  // Interest is paid to a statutory fund for legal aid / consumer
  // compensation rather than to the client (NZ, AU, US IOLTA).
  | "STATUTORY_FUND"
  // Interest belongs to the client and must be paid out / accounted
  // for under the client's instructions (UK SRA general principle
  // for designated client accounts).
  | "PAID_TO_CLIENT"
  // Mixed model — small balances to fund, large balances to client.
  | "MIXED";

export interface JurisdictionRules {
  jurisdiction: TrustJurisdiction;
  regulator: string;
  citation: string;
  // How long mixed payments (part trust, part fees) may be held in
  // the trust account before they must be apportioned to the
  // operating account.
  mixedPaymentHoldDays: number;
  interestTreatment: InterestTreatment;
  interestFundName: string | null;
  reconciliationCadence: ReconciliationCadence;
  // Days after period close by which the reconciliation must be
  // signed off.
  reconciliationDueDays: number;
}

const RULES: Record<TrustJurisdiction, JurisdictionRules> = {
  NZ_LCA: {
    jurisdiction: "NZ_LCA",
    regulator: "New Zealand Law Society",
    citation:
      "Lawyers and Conveyancers Act (Trust Account) Regulations 2008",
    mixedPaymentHoldDays: 5,
    interestTreatment: "STATUTORY_FUND",
    interestFundName: "Lawyers Fidelity Fund",
    reconciliationCadence: "MONTHLY",
    reconciliationDueDays: 10,
  },
  AU_VIC: {
    jurisdiction: "AU_VIC",
    regulator: "Victorian Legal Services Board",
    citation: "Legal Profession Uniform Law (Vic), Part 4.2",
    mixedPaymentHoldDays: 7,
    interestTreatment: "STATUTORY_FUND",
    interestFundName: "Public Purpose Fund (Vic)",
    reconciliationCadence: "MONTHLY",
    reconciliationDueDays: 15,
  },
  AU_NSW: {
    jurisdiction: "AU_NSW",
    regulator: "Law Society of NSW",
    citation: "Legal Profession Uniform Law (NSW), Part 4.2",
    mixedPaymentHoldDays: 7,
    interestTreatment: "STATUTORY_FUND",
    interestFundName: "Public Purpose Fund (NSW)",
    reconciliationCadence: "MONTHLY",
    reconciliationDueDays: 15,
  },
  AU_QLD: {
    jurisdiction: "AU_QLD",
    regulator: "Queensland Law Society",
    citation: "Legal Profession Act 2007 (Qld), Part 3.3",
    mixedPaymentHoldDays: 7,
    interestTreatment: "STATUTORY_FUND",
    interestFundName: "Legal Practitioners Fidelity Guarantee Fund (Qld)",
    reconciliationCadence: "MONTHLY",
    reconciliationDueDays: 15,
  },
  AU_WA: {
    jurisdiction: "AU_WA",
    regulator: "Legal Practice Board of Western Australia",
    citation: "Legal Profession Act 2008 (WA), Part 9",
    mixedPaymentHoldDays: 7,
    interestTreatment: "STATUTORY_FUND",
    interestFundName: "Public Purposes Trust (WA)",
    reconciliationCadence: "MONTHLY",
    reconciliationDueDays: 15,
  },
  AU_SA: {
    jurisdiction: "AU_SA",
    regulator: "Law Society of South Australia",
    citation: "Legal Practitioners Act 1981 (SA), Schedule 2",
    mixedPaymentHoldDays: 7,
    interestTreatment: "STATUTORY_FUND",
    interestFundName: "Combined Trust Account Interest Fund (SA)",
    reconciliationCadence: "MONTHLY",
    reconciliationDueDays: 15,
  },
  AU_TAS: {
    jurisdiction: "AU_TAS",
    regulator: "Law Society of Tasmania",
    citation: "Legal Profession Act 2007 (Tas), Part 3.3",
    mixedPaymentHoldDays: 7,
    interestTreatment: "STATUTORY_FUND",
    interestFundName: "Solicitors' Trust (Tas)",
    reconciliationCadence: "MONTHLY",
    reconciliationDueDays: 15,
  },
  AU_ACT: {
    jurisdiction: "AU_ACT",
    regulator: "ACT Law Society",
    citation: "Legal Profession Act 2006 (ACT), Part 3.3",
    mixedPaymentHoldDays: 7,
    interestTreatment: "STATUTORY_FUND",
    interestFundName: "Statutory Interest Account (ACT)",
    reconciliationCadence: "MONTHLY",
    reconciliationDueDays: 15,
  },
  AU_NT: {
    jurisdiction: "AU_NT",
    regulator: "Law Society Northern Territory",
    citation: "Legal Profession Act 2006 (NT), Part 3.3",
    mixedPaymentHoldDays: 7,
    interestTreatment: "STATUTORY_FUND",
    interestFundName: "Legal Practitioners Trust Account (NT)",
    reconciliationCadence: "MONTHLY",
    reconciliationDueDays: 15,
  },
  UK_SRA: {
    jurisdiction: "UK_SRA",
    regulator: "Solicitors Regulation Authority",
    citation: "SRA Accounts Rules 2019",
    // Rule 4.3 — mixed receipts must be allocated to the correct
    // account "promptly", which the SRA enforcement guidance
    // operationalises as within 14 days.
    mixedPaymentHoldDays: 14,
    // Rule 7 — interest on a general client account is treated as
    // bona vacantia to the firm, but rule 7.1 requires fair payment
    // to the client where material; in practice firms account for
    // interest above a de minimis threshold.
    interestTreatment: "MIXED",
    interestFundName: "Client account interest (rule 7)",
    reconciliationCadence: "QUARTERLY",
    reconciliationDueDays: 5,
  },
  US_IOLTA: {
    jurisdiction: "US_IOLTA",
    regulator: "State Bar IOLTA Program",
    citation: "ABA Model Rules of Professional Conduct, rule 1.15",
    mixedPaymentHoldDays: 3,
    interestTreatment: "STATUTORY_FUND",
    interestFundName: "State IOLTA Foundation",
    reconciliationCadence: "MONTHLY",
    reconciliationDueDays: 30,
  },
};

export function getJurisdictionRules(
  jurisdiction: TrustJurisdiction,
): JurisdictionRules {
  return RULES[jurisdiction];
}

export function listJurisdictions(): JurisdictionRules[] {
  return Object.values(RULES);
}
