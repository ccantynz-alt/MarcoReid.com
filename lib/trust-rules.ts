import { JURISDICTIONS } from "./jurisdictions";

export interface TrustRuleValidation {
  valid: boolean;
  warnings: string[];
  errors: string[];
  jurisdiction: string;
  rulesApplied: string;
}

export function validateTrustTransaction(params: {
  jurisdiction: string;
  type: "DEPOSIT" | "WITHDRAWAL" | "FEE_DRAW";
  amountInCents: number;
  currentBalanceInCents: number;
  description: string;
}): TrustRuleValidation {
  const j = JURISDICTIONS[params.jurisdiction];
  const result: TrustRuleValidation = {
    valid: true,
    warnings: [],
    errors: [],
    jurisdiction: params.jurisdiction,
    rulesApplied: j?.trustAccountRules?.name || "Default rules",
  };

  // Universal rules
  if (params.type !== "DEPOSIT" && params.amountInCents > params.currentBalanceInCents) {
    result.valid = false;
    result.errors.push("Insufficient trust balance. Withdrawals cannot exceed the current balance.");
  }

  if (!params.description || params.description.trim().length < 3) {
    result.valid = false;
    result.errors.push("Trust transactions require a meaningful description for audit purposes.");
  }

  // Country-specific rules
  switch (params.jurisdiction) {
    case "NZ":
      // NZ Law Society Trust Account Regulations
      if (params.type === "FEE_DRAW" && !params.description.toLowerCase().includes("invoice")) {
        result.warnings.push("NZ Law Society: Fee draws should reference the corresponding invoice number.");
      }
      if (params.type === "WITHDRAWAL" && params.amountInCents > 10000_00) {
        result.warnings.push("NZ AML/CFT Act: Withdrawals over $10,000 may require enhanced due diligence documentation.");
      }
      break;

    case "AU":
      // State-based solicitors' trust rules
      if (params.type === "FEE_DRAW") {
        result.warnings.push("AU Trust Rules: Ensure a tax invoice or bill of costs has been provided to the client before drawing fees (Legal Profession Uniform Law s.172).");
      }
      if (params.type === "WITHDRAWAL" && params.amountInCents > 10000_00) {
        result.warnings.push("AU AML/CTF Act: Cash transactions over AUD $10,000 must be reported to AUSTRAC.");
      }
      break;

    case "UK":
      // SRA Accounts Rules 2019
      if (params.type === "FEE_DRAW") {
        result.warnings.push("SRA Accounts Rules 2019 Rule 4.3: You must give the client a bill or notification of costs before transferring funds from client account to business account.");
      }
      if (params.type === "DEPOSIT" && !params.description.toLowerCase().includes("client")) {
        result.warnings.push("SRA Rule 2.1: Ensure this deposit is correctly categorised as client money. Office money must not be held in a client account for more than 2 business days.");
      }
      break;

    case "US":
      // IOLTA state-specific
      if (params.type === "FEE_DRAW") {
        result.warnings.push("IOLTA Rules: Ensure fees have been earned and an invoice provided to the client before drawing from trust. Rules vary by state.");
      }
      if (params.type === "WITHDRAWAL") {
        result.warnings.push("IOLTA: Maintain three-way reconciliation records. Many state bars require monthly reconciliation.");
      }
      break;

    case "CA":
      // Provincial Law Society rules
      if (params.type === "FEE_DRAW") {
        result.warnings.push("Provincial Trust Rules: A statement of account must be delivered to the client before withdrawing fees (LSO By-Law 9, s.6).");
      }
      if (params.type === "DEPOSIT" && params.amountInCents > 3000_00) {
        result.warnings.push("PCMLTFA: Cash deposits over CAD $3,000 may trigger client identification requirements under FINTRAC rules.");
      }
      break;
  }

  return result;
}

export function getTrustComplianceNotes(jurisdiction: string): string[] {
  const notes: Record<string, string[]> = {
    NZ: [
      "Trust accounts must be held at an approved NZ trading bank",
      "Interest is paid to the NZ Law Foundation",
      "Three-way reconciliation required",
      "Annual audit by NZLS-approved auditor",
      "Lawyers and Conveyancers Act 2006 applies",
    ],
    AU: [
      "Trust accounts governed by state Legal Profession Acts",
      "Interest paid to state law foundation (varies by state)",
      "NSW/VIC: Legal Profession Uniform Law applies",
      "QLD: Trust Accounts Act 1973 applies",
      "Annual external audit required",
    ],
    UK: [
      "SRA Accounts Rules 2019 apply to all solicitors",
      "Client money must be kept separate from office money",
      "Annual accountant's report to SRA required",
      "Interest policy must be fair to clients",
      "Barristers generally cannot hold client money",
    ],
    US: [
      "IOLTA rules vary by state — check your state bar",
      "Three-way reconciliation recommended monthly",
      "Interest paid to state bar foundation",
      "Commingling client and personal funds is prohibited",
      "State bar audits may occur without notice",
    ],
    CA: [
      "Trust rules governed by provincial Law Societies",
      "LSO By-Law 9 applies in Ontario",
      "Accounts must be at a designated Canadian financial institution",
      "Interest paid to provincial law foundation",
      "FINTRAC reporting obligations apply",
    ],
  };
  return notes[jurisdiction] || ["Standard trust accounting rules apply."];
}
