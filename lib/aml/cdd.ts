// lib/aml/cdd.ts
// Customer Due Diligence engine.
// Every state-changing call also writes an AmlAuditEntry row so the
// regulator audit trail is tamper-evident (append-only by convention —
// the model has no update fields and the API never updates rows).

import { createHash } from "crypto";
import type {
  AmlJurisdiction,
  CddCheckResult,
  CddCheckType,
  CddSubject,
  Prisma,
} from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { assessRisk } from "@/lib/aml/risk";

type AuditAction =
  | "PROGRAM_APPROVED"
  | "CDD_STARTED"
  | "CDD_CHECK_RAN"
  | "CDD_APPROVED"
  | "CDD_REJECTED"
  | "EDD_TRIGGERED"
  | "SAR_DRAFTED"
  | "SAR_SUBMITTED";

function sha256(payload: unknown): string {
  return createHash("sha256")
    .update(typeof payload === "string" ? payload : JSON.stringify(payload))
    .digest("hex");
}

async function writeAudit(args: {
  firmId: string;
  actorUserId?: string | null;
  action: AuditAction;
  subjectRef?: string | null;
  payload: unknown;
}): Promise<void> {
  await prisma.amlAuditEntry.create({
    data: {
      firmId: args.firmId,
      actorUserId: args.actorUserId ?? null,
      action: args.action,
      subjectRef: args.subjectRef ?? null,
      payloadSha256: sha256(args.payload ?? {}),
    },
  });
}

export interface StartCddInput {
  firmId: string;
  jurisdiction: AmlJurisdiction;
  actorUserId?: string;
  subject: {
    matterId?: string | null;
    clientId?: string | null;
    subjectType: "INDIVIDUAL" | "ENTITY";
    legalName: string;
    preferredName?: string | null;
    dateOfBirth?: Date | null;
    countryOfResidence?: string | null;
    countryOfCitizenship?: string | null;
    addressLine1?: string | null;
    addressLine2?: string | null;
    city?: string | null;
    region?: string | null;
    postalCode?: string | null;
    country?: string | null;
    entityType?: string | null;
    entityRegistrationNumber?: string | null;
    entityJurisdiction?: string | null;
  };
}

export async function startCdd(input: StartCddInput): Promise<CddSubject> {
  const subject = await prisma.cddSubject.create({
    data: {
      firmId: input.firmId,
      matterId: input.subject.matterId ?? null,
      clientId: input.subject.clientId ?? null,
      subjectType: input.subject.subjectType,
      legalName: input.subject.legalName,
      preferredName: input.subject.preferredName ?? null,
      dateOfBirth: input.subject.dateOfBirth ?? null,
      countryOfResidence: input.subject.countryOfResidence ?? null,
      countryOfCitizenship: input.subject.countryOfCitizenship ?? null,
      addressLine1: input.subject.addressLine1 ?? null,
      addressLine2: input.subject.addressLine2 ?? null,
      city: input.subject.city ?? null,
      region: input.subject.region ?? null,
      postalCode: input.subject.postalCode ?? null,
      country: input.subject.country ?? null,
      entityType: input.subject.entityType ?? null,
      entityRegistrationNumber:
        input.subject.entityRegistrationNumber ?? null,
      entityJurisdiction: input.subject.entityJurisdiction ?? null,
      status: "IN_PROGRESS",
    },
  });

  await writeAudit({
    firmId: input.firmId,
    actorUserId: input.actorUserId,
    action: "CDD_STARTED",
    subjectRef: subject.id,
    payload: { jurisdiction: input.jurisdiction, subjectId: subject.id },
  });

  return subject;
}

export interface RunCheckInput {
  subjectId: string;
  type: CddCheckType;
  result: CddCheckResult;
  vendorRef?: string | null;
  rawResultRef?: string | null;
  notes?: string | null;
  performedById?: string | null;
}

export async function runCheck(input: RunCheckInput) {
  const subject = await prisma.cddSubject.findUnique({
    where: { id: input.subjectId },
  });
  if (!subject) throw new Error(`CddSubject ${input.subjectId} not found`);

  const check = await prisma.cddCheck.create({
    data: {
      subjectId: input.subjectId,
      type: input.type,
      result: input.result,
      vendorRef: input.vendorRef ?? null,
      rawResultRef: input.rawResultRef ?? null,
      notes: input.notes ?? null,
      performedById: input.performedById ?? null,
    },
  });

  // Re-score risk after each check.
  const allChecks = await prisma.cddCheck.findMany({
    where: { subjectId: input.subjectId },
  });
  const newRisk = assessRisk({ subject, checks: allChecks });
  if (newRisk !== subject.riskLevel) {
    await prisma.cddSubject.update({
      where: { id: input.subjectId },
      data: { riskLevel: newRisk },
    });
  }

  await writeAudit({
    firmId: subject.firmId,
    actorUserId: input.performedById,
    action: "CDD_CHECK_RAN",
    subjectRef: subject.id,
    payload: {
      checkId: check.id,
      type: input.type,
      result: input.result,
      vendorRef: input.vendorRef ?? null,
    },
  });

  return check;
}

export interface ApproveCddInput {
  subjectId: string;
  approverUserId: string;
  // CDD typically expires; default 24 months for low/medium, 12 for high.
  expiresAt?: Date;
}

export async function approveCdd(input: ApproveCddInput) {
  const subject = await prisma.cddSubject.findUnique({
    where: { id: input.subjectId },
  });
  if (!subject) throw new Error(`CddSubject ${input.subjectId} not found`);

  const now = new Date();
  const expires =
    input.expiresAt ??
    (() => {
      const d = new Date(now);
      const months = subject.riskLevel === "HIGH" ? 12 : 24;
      d.setMonth(d.getMonth() + months);
      return d;
    })();

  const updated = await prisma.cddSubject.update({
    where: { id: input.subjectId },
    data: {
      status: "APPROVED",
      expiresAt: expires,
    },
  });

  await writeAudit({
    firmId: subject.firmId,
    actorUserId: input.approverUserId,
    action: "CDD_APPROVED",
    subjectRef: subject.id,
    payload: {
      approverUserId: input.approverUserId,
      riskLevel: updated.riskLevel,
      expiresAt: expires.toISOString(),
    },
  });

  return updated;
}

export interface TriggerEddInput {
  subjectId: string;
  reason: string;
  actorUserId?: string;
}

export async function triggerEdd(input: TriggerEddInput) {
  const subject = await prisma.cddSubject.findUnique({
    where: { id: input.subjectId },
  });
  if (!subject) throw new Error(`CddSubject ${input.subjectId} not found`);

  const updated = await prisma.cddSubject.update({
    where: { id: input.subjectId },
    data: {
      status: "REQUIRES_EDD",
      riskLevel:
        subject.riskLevel === "UNACCEPTABLE" ? "UNACCEPTABLE" : "HIGH",
    },
  });

  await writeAudit({
    firmId: subject.firmId,
    actorUserId: input.actorUserId,
    action: "EDD_TRIGGERED",
    subjectRef: subject.id,
    payload: { reason: input.reason },
  });

  return updated;
}

// Read helpers (no audit writes — read-only)
export async function listSubjects(firmId: string) {
  return prisma.cddSubject.findMany({
    where: { firmId },
    orderBy: { updatedAt: "desc" },
    include: { _count: { select: { checks: true } } },
  });
}

export async function getSubject(id: string) {
  return prisma.cddSubject.findUnique({
    where: { id },
    include: {
      checks: { orderBy: { performedAt: "desc" } },
      beneficialOwners: true,
      sourceOfFunds: true,
    },
  });
}

export type SubjectWithRelations = Prisma.CddSubjectGetPayload<{
  include: { checks: true; beneficialOwners: true; sourceOfFunds: true };
}>;
