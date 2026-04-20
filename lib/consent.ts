// Consent versions. Bump these whenever the wording changes so we can tell
// per-user which revision they accepted. Never mutate a shipped string —
// create a new version.

export const CURRENT_TOS_VERSION = "2026-04-20";
export const CURRENT_PLATFORM_ACK_VERSION = "2026-04-20";

// The platform acknowledgment shown at signup, in addition to the standard
// Terms / Privacy / Acceptable Use agreement. Deliberately plain-language —
// plain-language consent carries more evidentiary weight than fine print and
// is harder for a regulator or court to set aside as unconscionable.
//
// Note the final bullet: we explicitly preserve non-waivable consumer rights.
// Under NZ Consumer Guarantees Act 1993 s 43 and AU Consumer Law s 64 those
// rights cannot be contracted away for consumer transactions, and pretending
// otherwise would be a Fair Trading Act / ACL breach in its own right.
// Acknowledging the carve-out strengthens the enforceability of everything
// else.
export const PLATFORM_ACK_BULLETS: readonly string[] = [
  "Marco Reid is a technology platform. It is not a law firm, accounting firm, or licensed professional service provider.",
  "AI-generated output is informational only. It is not legal, tax, financial, or accounting advice, and it does not create a professional relationship.",
  "I will not rely on AI output in any filing, return, transaction, or decision unless a licensed professional has reviewed and signed it off inside the platform.",
  "Any dispute with Marco Reid is resolved by binding arbitration in Auckland, New Zealand under the Terms of Service, on an individual basis only — not as part of a class, consolidated, or representative action.",
  "None of the above limits non-waivable rights under the NZ Consumer Guarantees Act 1993, the Australian Consumer Law, or equivalent consumer protection law in my jurisdiction.",
];
