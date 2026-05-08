/**
 * lib/audit.ts — the hash-chained audit-write helper.
 *
 * Every API route that mutates state should call writeAuditLog(...) once the
 * mutation has succeeded. The helper computes a sha256 hash over the canonical
 * JSON of the row plus the prior row's hash, so a regulator export can verify
 * the chain end-to-end and detect any tampering.
 *
 * Use verifyAuditChain() inside a regulator-export function to walk the entire
 * chain and confirm every row hashes correctly. If any row's prevHash does not
 * match the prior row's hash, or its hash does not recompute, the chain is
 * broken and the breakpoint is returned.
 *
 * This is the spine published on /compliance-records. Without writes flowing
 * through here the published audit posture is marketing copy; with writes
 * flowing through here it is a structural guarantee.
 */

import { createHash } from "node:crypto";
import { Prisma } from "@prisma/client";
import type { AuditAction } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export interface WriteAuditLogParams {
  actorId?: string | null;
  actorEmail?: string | null;
  action: AuditAction;
  resourceType: string;
  resourceId: string;
  /** Pre-mutation snapshot, for UPDATE / DELETE actions. */
  before?: unknown;
  /** Post-mutation snapshot, for CREATE / UPDATE actions. */
  after?: unknown;
  ipAddress?: string | null;
  userAgent?: string | null;
}

/**
 * Canonicalises the row payload for hashing. The stable key order is the
 * contract — change it and you break verification of every prior row. Add
 * new fields at the end of the object only.
 */
function canonicalise(input: {
  actorId: string | null;
  actorEmail: string | null;
  action: AuditAction;
  resourceType: string;
  resourceId: string;
  before: unknown;
  after: unknown;
  ipAddress: string | null;
  userAgent: string | null;
  createdAt: string;
}): string {
  return JSON.stringify({
    actorId: input.actorId,
    actorEmail: input.actorEmail,
    action: input.action,
    resourceType: input.resourceType,
    resourceId: input.resourceId,
    before: input.before ?? null,
    after: input.after ?? null,
    ipAddress: input.ipAddress,
    userAgent: input.userAgent,
    createdAt: input.createdAt,
  });
}

function sha256(input: string): string {
  return createHash("sha256").update(input).digest("hex");
}

/**
 * Append a row to the AuditLog. The row's hash is sha256(prevHash || canonical),
 * where prevHash is the most-recent existing row's hash (or empty string for
 * the first row). The chain is single-threaded against the entire AuditLog
 * table — multi-tenancy is enforced by query scoping at read time, not at
 * write time, so a single global chain remains tamper-evident.
 */
export async function writeAuditLog(params: WriteAuditLogParams): Promise<void> {
  const prev = await prisma.auditLog.findFirst({
    orderBy: { createdAt: "desc" },
    select: { hash: true },
  });

  const createdAt = new Date();
  const canonical = canonicalise({
    actorId: params.actorId ?? null,
    actorEmail: params.actorEmail ?? null,
    action: params.action,
    resourceType: params.resourceType,
    resourceId: params.resourceId,
    before: params.before,
    after: params.after,
    ipAddress: params.ipAddress ?? null,
    userAgent: params.userAgent ?? null,
    createdAt: createdAt.toISOString(),
  });

  const prevHash = prev?.hash ?? null;
  const hash = sha256((prevHash ?? "") + canonical);

  await prisma.auditLog.create({
    data: {
      actorId: params.actorId ?? null,
      actorEmail: params.actorEmail ?? null,
      action: params.action,
      resourceType: params.resourceType,
      resourceId: params.resourceId,
      before: (params.before ?? Prisma.JsonNull) as Prisma.InputJsonValue,
      after: (params.after ?? Prisma.JsonNull) as Prisma.InputJsonValue,
      ipAddress: params.ipAddress ?? null,
      userAgent: params.userAgent ?? null,
      prevHash,
      hash,
      createdAt,
    },
  });
}

export interface VerifyAuditChainResult {
  valid: boolean;
  rowsChecked: number;
  /** id of the first row whose chain integrity could not be verified. */
  firstBrokenId?: string;
  reason?:
    | "PREV_HASH_MISMATCH"
    | "HASH_MISMATCH"
    | "EMPTY";
}

/**
 * Walk the entire AuditLog in createdAt-asc order and verify every row's
 * hash recomputes against (prevHash || canonical(row)). Used by the regulator
 * export endpoint to ship a chain attestation alongside the data.
 */
export async function verifyAuditChain(): Promise<VerifyAuditChainResult> {
  const rows = await prisma.auditLog.findMany({
    orderBy: { createdAt: "asc" },
  });

  if (rows.length === 0) {
    return { valid: true, rowsChecked: 0, reason: "EMPTY" };
  }

  let expectedPrevHash: string | null = null;

  for (const row of rows) {
    if (row.prevHash !== expectedPrevHash) {
      return {
        valid: false,
        rowsChecked: rows.indexOf(row),
        firstBrokenId: row.id,
        reason: "PREV_HASH_MISMATCH",
      };
    }

    const canonical = canonicalise({
      actorId: row.actorId,
      actorEmail: row.actorEmail,
      action: row.action,
      resourceType: row.resourceType,
      resourceId: row.resourceId,
      before: row.before,
      after: row.after,
      ipAddress: row.ipAddress,
      userAgent: row.userAgent,
      createdAt: row.createdAt.toISOString(),
    });

    const recomputed = sha256((row.prevHash ?? "") + canonical);

    if (recomputed !== row.hash) {
      return {
        valid: false,
        rowsChecked: rows.indexOf(row),
        firstBrokenId: row.id,
        reason: "HASH_MISMATCH",
      };
    }

    expectedPrevHash = row.hash;
  }

  return { valid: true, rowsChecked: rows.length };
}
