import { createHash } from "crypto";

/**
 * Tamper-evidence helper. Every signed-off output is hashed at the
 * moment of action. If a later actor alters the stored output the
 * recomputed hash won't match — caught on read by `verifySignoffHash`.
 */
export function sha256(text: string): string {
  return createHash("sha256").update(text, "utf8").digest("hex");
}

/**
 * Recompute the canonical hash for a SignoffRequest. Uses amendedOutput
 * if present (post-AMEND), otherwise the original aiOutput.
 */
export function canonicalSignoffHash(opts: {
  aiOutput: string;
  amendedOutput?: string | null;
}): string {
  return sha256(opts.amendedOutput ?? opts.aiOutput);
}
