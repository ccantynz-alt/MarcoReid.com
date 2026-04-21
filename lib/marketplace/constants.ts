export const MATTER_LIMITS = {
  SUMMARY_MAX: 200,
  DETAILS_MIN: 40,
  DETAILS_MAX: 8000,
} as const;

export const SIGNOFF_LIMITS = {
  REJECT_NOTES_MIN: 10,
  AMENDED_OUTPUT_MIN: 10,
  AMENDED_OUTPUT_MAX: 50_000,
} as const;

export const SIGNOFF_KINDS = {
  COMPANY_FORMATION_PACK: "company-formation-pack",
} as const;

export type SignoffKind = (typeof SIGNOFF_KINDS)[keyof typeof SIGNOFF_KINDS];
