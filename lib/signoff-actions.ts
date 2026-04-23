import { prisma } from "@/lib/prisma";
import { sendEmail, emailLayout } from "@/lib/email";
import { canonicalSignoffHash, sha256 } from "@/lib/signoff";
import { ProMatterStatus, SignoffStatus } from "@prisma/client";

interface ResolvedActor {
  professionalId: string;
  userId: string;
}

/**
 * Resolve the calling user to the Professional + audit-actor pair, and
 * confirm they are allowed to act on the given SignoffRequest. Returns
 * a typed error string when not authorised.
 */
export async function authorizeSignoffActor(
  signoffId: string,
  userId: string,
): Promise<{ actor: ResolvedActor; signoff: NonNullable<Awaited<ReturnType<typeof loadSignoff>>> } | { error: string; status: number }> {
  const professional = await prisma.professional.findUnique({
    where: { userId },
    select: { id: true, verifiedAt: true },
  });
  if (!professional) {
    return { error: "No pro profile", status: 403 };
  }
  if (!professional.verifiedAt) {
    return { error: "Pro is not verified", status: 403 };
  }

  const signoff = await loadSignoff(signoffId);
  if (!signoff) {
    return { error: "Not found", status: 404 };
  }
  const accepted = signoff.proMatter.acceptedByProId;
  const reviewer = signoff.reviewerId;
  if (accepted !== professional.id && reviewer && reviewer !== professional.id) {
    return { error: "Forbidden", status: 403 };
  }

  return {
    actor: { professionalId: professional.id, userId },
    signoff,
  };
}

async function loadSignoff(id: string) {
  return prisma.signoffRequest.findUnique({
    where: { id },
    include: {
      proMatter: {
        select: {
          id: true,
          acceptedByProId: true,
          citizenUserId: true,
          summary: true,
          citizen: { select: { email: true, name: true } },
        },
      },
    },
  });
}

interface AuditOpts {
  signoffId: string;
  actorUserId: string;
  action: "APPROVE" | "REJECT" | "AMEND";
  payloadSha256: string;
  notes?: string | null;
}

async function writeAudit(opts: AuditOpts) {
  await prisma.signoffAuditEntry.create({
    data: {
      signoffId: opts.signoffId,
      actorUserId: opts.actorUserId,
      action: opts.action,
      payloadSha256: opts.payloadSha256,
      notes: opts.notes ?? null,
    },
  });
}

async function notifyCitizen(opts: {
  email: string;
  name: string | null;
  matterSummary: string;
  action: "APPROVE" | "REJECT" | "AMEND";
}) {
  const { email, name, matterSummary, action } = opts;
  const headings: Record<typeof action, string> = {
    APPROVE: "Your matter has been signed off.",
    REJECT: "Update on your matter — needs another pass.",
    AMEND: "Your matter has been amended and signed off.",
  };
  const bodies: Record<typeof action, string> = {
    APPROVE: `<p>Hi ${name || "there"},</p><p>The work on your matter — <em>${matterSummary}</em> — has been reviewed and approved by a licensed professional. It is now ready for you.</p>`,
    REJECT: `<p>Hi ${name || "there"},</p><p>The professional reviewing your matter — <em>${matterSummary}</em> — flagged it for another round of work. We&rsquo;ll be in touch shortly.</p>`,
    AMEND: `<p>Hi ${name || "there"},</p><p>The professional reviewing your matter — <em>${matterSummary}</em> — made amendments and signed off the corrected version. It is now ready for you.</p>`,
  };
  const layout = emailLayout({
    preheader: headings[action],
    heading: headings[action],
    body: bodies[action],
  });
  await sendEmail({
    to: email,
    subject: headings[action],
    html: layout.html,
    text: layout.text,
  });
}

export async function approveSignoff(opts: {
  signoffId: string;
  actor: ResolvedActor;
  notes?: string | null;
}) {
  const sig = await loadSignoff(opts.signoffId);
  if (!sig) throw new Error("Signoff not found");
  // No content change — hash matches the stored aiOutput.
  const hash = canonicalSignoffHash({ aiOutput: sig.aiOutput });

  const now = new Date();
  const updated = await prisma.$transaction(async (tx) => {
    const u = await tx.signoffRequest.update({
      where: { id: sig.id },
      data: {
        status: SignoffStatus.APPROVED,
        reviewerId: opts.actor.professionalId,
        reviewerNotes: opts.notes ?? null,
        outputSha256: hash,
        reviewedAt: now,
        releasedAt: now,
      },
    });
    // Mark matter signed off when this is the latest action.
    await tx.proMatter.update({
      where: { id: sig.proMatterId },
      data: { status: ProMatterStatus.SIGNED_OFF },
    });
    return u;
  });

  await writeAudit({
    signoffId: sig.id,
    actorUserId: opts.actor.userId,
    action: "APPROVE",
    payloadSha256: hash,
    notes: opts.notes ?? null,
  });

  await notifyCitizen({
    email: sig.proMatter.citizen.email,
    name: sig.proMatter.citizen.name,
    matterSummary: sig.proMatter.summary,
    action: "APPROVE",
  });

  return updated;
}

export async function rejectSignoff(opts: {
  signoffId: string;
  actor: ResolvedActor;
  reason: string;
}) {
  const sig = await loadSignoff(opts.signoffId);
  if (!sig) throw new Error("Signoff not found");
  // Hash the original output (still the canonical state) so the audit
  // entry is verifiable.
  const hash = sha256(sig.aiOutput);
  const now = new Date();

  const updated = await prisma.$transaction(async (tx) => {
    const u = await tx.signoffRequest.update({
      where: { id: sig.id },
      data: {
        status: SignoffStatus.REJECTED,
        reviewerId: opts.actor.professionalId,
        reviewerNotes: opts.reason,
        reviewedAt: now,
      },
    });
    // Matter goes back to ACCEPTED so the pro can iterate.
    await tx.proMatter.update({
      where: { id: sig.proMatterId },
      data: { status: ProMatterStatus.ACCEPTED },
    });
    return u;
  });

  await writeAudit({
    signoffId: sig.id,
    actorUserId: opts.actor.userId,
    action: "REJECT",
    payloadSha256: hash,
    notes: opts.reason,
  });

  await notifyCitizen({
    email: sig.proMatter.citizen.email,
    name: sig.proMatter.citizen.name,
    matterSummary: sig.proMatter.summary,
    action: "REJECT",
  });

  return updated;
}

export async function amendSignoff(opts: {
  signoffId: string;
  actor: ResolvedActor;
  amendedOutput: string;
  notes?: string | null;
}) {
  const sig = await loadSignoff(opts.signoffId);
  if (!sig) throw new Error("Signoff not found");
  const amendedHash = sha256(opts.amendedOutput);
  // outputSha256 is recomputed against the *new canonical content*.
  const canonicalHash = canonicalSignoffHash({
    aiOutput: sig.aiOutput,
    amendedOutput: opts.amendedOutput,
  });

  const now = new Date();
  const updated = await prisma.$transaction(async (tx) => {
    const u = await tx.signoffRequest.update({
      where: { id: sig.id },
      data: {
        status: SignoffStatus.AMENDED,
        reviewerId: opts.actor.professionalId,
        reviewerNotes: opts.notes ?? null,
        amendedOutput: opts.amendedOutput,
        amendedSha256: amendedHash,
        outputSha256: canonicalHash,
        reviewedAt: now,
        releasedAt: now,
      },
    });
    await tx.proMatter.update({
      where: { id: sig.proMatterId },
      data: { status: ProMatterStatus.SIGNED_OFF },
    });
    return u;
  });

  await writeAudit({
    signoffId: sig.id,
    actorUserId: opts.actor.userId,
    action: "AMEND",
    payloadSha256: canonicalHash,
    notes: opts.notes ?? null,
  });

  await notifyCitizen({
    email: sig.proMatter.citizen.email,
    name: sig.proMatter.citizen.name,
    matterSummary: sig.proMatter.summary,
    action: "AMEND",
  });

  return updated;
}
