// lib/aml/risk.ts
//
// Deterministic CDD risk scoring.
//
// Rules (in precedence order):
//   1. UNACCEPTABLE  if the country of residence is on a hardcoded
//                    sanctions/grey-list. We start with the FATF
//                    public statement jurisdictions (subject to
//                    high-risk countermeasures): NK (DPRK), IR (Iran),
//                    MM (Myanmar). The list is intentionally narrow and
//                    is intended to be overridden by jurisdiction-aware
//                    policy in a later iteration.
//   2. HIGH          if any PEP, SANCTIONS, or ADVERSE_MEDIA check
//                    returned HIT.
//   3. MEDIUM        if SOURCE_OF_FUNDS is missing or unverified.
//   4. LOW           otherwise.

import type { CddCheck, CddRiskLevel, CddSubject } from "@prisma/client";

// ISO 3166-1 alpha-2 codes for FATF "public statement" jurisdictions.
// Kept narrow on purpose; firm-level policy can extend this in future.
export const HIGH_RISK_COUNTRIES: ReadonlySet<string> = new Set([
  "KP", // Democratic People's Republic of Korea
  "NK", // alias
  "IR", // Iran
  "MM", // Myanmar
]);

export interface AssessRiskInput {
  subject: Pick<CddSubject, "countryOfResidence" | "countryOfCitizenship">;
  checks: Pick<CddCheck, "type" | "result">[];
}

export function assessRisk(input: AssessRiskInput): CddRiskLevel {
  const { subject, checks } = input;

  const country = (
    subject.countryOfResidence ??
    subject.countryOfCitizenship ??
    ""
  )
    .trim()
    .toUpperCase();

  if (country && HIGH_RISK_COUNTRIES.has(country)) {
    return "UNACCEPTABLE";
  }

  const hasScreeningHit = checks.some(
    (c) =>
      (c.type === "PEP" ||
        c.type === "SANCTIONS" ||
        c.type === "ADVERSE_MEDIA") &&
      c.result === "HIT",
  );
  if (hasScreeningHit) return "HIGH";

  const sofChecks = checks.filter((c) => c.type === "SOURCE_OF_FUNDS");
  const sofVerified =
    sofChecks.length > 0 && sofChecks.some((c) => c.result === "CLEAR");
  if (!sofVerified) return "MEDIUM";

  return "LOW";
}
