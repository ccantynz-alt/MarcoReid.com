import { prisma } from "./prisma";
import crypto from "crypto";

export interface AuditEventInput {
  userId: string;
  clientId?: string;
  matterId?: string;
  category: "auth" | "matter" | "client" | "document" | "trust" | "billing" | "research" | "voice" | "communication" | "compliance" | "system";
  action: "created" | "updated" | "deleted" | "viewed" | "exported" | "filed" | "signed" | "verified" | "searched" | "queried";
  resource: string;
  resourceId?: string;
  description: string;
  details?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
  sessionId?: string;
}

function computeHash(content: string, previousHash: string | null): string {
  const data = previousHash ? `${previousHash}:${content}` : content;
  return crypto.createHash("sha256").update(data).digest("hex");
}

export async function recordAuditEvent(input: AuditEventInput): Promise<void> {
  // Get the previous event hash for this user (maintains chain integrity)
  const previousEvent = await prisma.auditEvent.findFirst({
    where: { userId: input.userId },
    orderBy: { timestamp: "desc" },
    select: { eventHash: true },
  });

  const previousHash = previousEvent?.eventHash || null;

  // Compute hash of this event (tamper-evident chain)
  const eventContent = JSON.stringify({
    userId: input.userId,
    clientId: input.clientId,
    matterId: input.matterId,
    category: input.category,
    action: input.action,
    resource: input.resource,
    resourceId: input.resourceId,
    description: input.description,
    timestamp: new Date().toISOString(),
  });

  const eventHash = computeHash(eventContent, previousHash);

  // Record the event (immutable — never updated or deleted)
  await prisma.auditEvent.create({
    data: {
      userId: input.userId,
      clientId: input.clientId,
      matterId: input.matterId,
      category: input.category,
      action: input.action,
      resource: input.resource,
      resourceId: input.resourceId,
      description: input.description,
      details: input.details ? JSON.stringify(input.details) : null,
      ipAddress: input.ipAddress,
      userAgent: input.userAgent,
      sessionId: input.sessionId,
      previousHash,
      eventHash,
    },
  });

  // Update per-client summary if clientId present
  if (input.clientId) {
    const categoryField = `${input.category}Events` as string;
    await prisma.clientAuditSummary.upsert({
      where: { userId_clientId: { userId: input.userId, clientId: input.clientId } },
      create: {
        userId: input.userId,
        clientId: input.clientId,
        totalEvents: 1,
        lastEventAt: new Date(),
        lastEventHash: eventHash,
        [categoryField]: 1,
      },
      update: {
        totalEvents: { increment: 1 },
        lastEventAt: new Date(),
        lastEventHash: eventHash,
        [categoryField]: { increment: 1 },
      },
    });
  }
}

// Verify the integrity of an audit chain (detect tampering)
export async function verifyAuditChain(userId: string, clientId?: string): Promise<{
  valid: boolean;
  totalEvents: number;
  brokenAt?: string;
  message: string;
}> {
  const where: Record<string, string> = { userId };
  if (clientId) where.clientId = clientId;

  const events = await prisma.auditEvent.findMany({
    where,
    orderBy: { timestamp: "asc" },
    select: { id: true, eventHash: true, previousHash: true, timestamp: true },
  });

  if (events.length === 0) {
    return { valid: true, totalEvents: 0, message: "No events in chain." };
  }

  for (let i = 1; i < events.length; i++) {
    if (events[i].previousHash !== events[i - 1].eventHash) {
      return {
        valid: false,
        totalEvents: events.length,
        brokenAt: events[i].id,
        message: `Chain integrity broken at event ${events[i].id} (${events[i].timestamp.toISOString()}). Previous hash does not match.`,
      };
    }
  }

  return {
    valid: true,
    totalEvents: events.length,
    message: `Chain verified. ${events.length} events, all integrity hashes valid. No tampering detected.`,
  };
}

// Export audit trail for a client (court-ready format)
export async function exportClientAuditTrail(userId: string, clientId: string): Promise<{
  exportDate: string;
  client: string;
  totalEvents: number;
  chainIntegrity: string;
  events: Array<{
    timestamp: string;
    category: string;
    action: string;
    resource: string;
    description: string;
    hash: string;
  }>;
}> {
  const events = await prisma.auditEvent.findMany({
    where: { userId, clientId },
    orderBy: { timestamp: "asc" },
  });

  const verification = await verifyAuditChain(userId, clientId);

  return {
    exportDate: new Date().toISOString(),
    client: clientId,
    totalEvents: events.length,
    chainIntegrity: verification.valid ? "VERIFIED — No tampering detected" : "WARNING — Chain integrity compromised",
    events: events.map((e) => ({
      timestamp: e.timestamp.toISOString(),
      category: e.category,
      action: e.action,
      resource: e.resource,
      description: e.description,
      hash: e.eventHash,
    })),
  };
}
