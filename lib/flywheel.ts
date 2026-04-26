import { prisma } from "@/lib/prisma";
import type {
  LearningEventKind,
  LearningEventSeverity,
  Prisma,
} from "@prisma/client";

/**
 * Platform flywheel — one tiny helper module that every meaningful
 * code path can call without thinking. Writes to LearningEvent. Never
 * throws — flywheel logging must never break a request.
 *
 * The four signal streams:
 *
 *   USAGE        : a feature was touched (telemetry)
 *   AI_QUERY     : a Marco query happened
 *   AI_FEEDBACK  : a Marco answer was rated
 *   WORKFLOW     : a sign-off cycle progressed
 *   REGULATORY   : a statute / tax change was detected
 *
 * Per-firm rollups land in FirmHealthSnapshot via the nightly job; this
 * module is only the write side of the loop.
 */

export interface RecordEventInput {
  kind: LearningEventKind;
  severity?: LearningEventSeverity;
  userId?: string;
  surface?: string;
  practiceArea?: string;
  jurisdiction?: string;

  marcoQueryId?: string;
  marcoFeedbackId?: string;
  signoffRequestId?: string;
  proMatterId?: string;
  voiceTranscriptId?: string;
  regulatoryUpdateId?: string;

  payload?: Prisma.InputJsonValue;
  scoreDelta?: number;
}

/**
 * Record any flywheel event. Fire-and-forget — caller does not need
 * to await unless they care about ordering. We swallow errors with a
 * log line so a flywheel failure can never break the originating
 * request.
 */
export async function recordEvent(input: RecordEventInput): Promise<void> {
  try {
    await prisma.learningEvent.create({
      data: {
        kind: input.kind,
        severity: input.severity ?? "INFO",
        userId: input.userId,
        surface: input.surface,
        practiceArea: input.practiceArea,
        jurisdiction: input.jurisdiction,
        marcoQueryId: input.marcoQueryId,
        marcoFeedbackId: input.marcoFeedbackId,
        signoffRequestId: input.signoffRequestId,
        proMatterId: input.proMatterId,
        voiceTranscriptId: input.voiceTranscriptId,
        regulatoryUpdateId: input.regulatoryUpdateId,
        payload: input.payload,
        scoreDelta: input.scoreDelta,
      },
    });
  } catch (err) {
    console.error("[flywheel] failed to record event", err);
  }
}

/** Convenience for telemetry. */
export function recordUsage(
  userId: string | undefined,
  surface: string,
  payload?: Prisma.InputJsonValue
) {
  return recordEvent({
    kind: "USAGE",
    userId,
    surface,
    payload,
  });
}

/** Convenience for AI feedback. Maps 1-5 stars to a severity bucket. */
export function recordAiFeedback(
  userId: string,
  marcoQueryId: string,
  marcoFeedbackId: string,
  rating: number,
  payload?: Prisma.InputJsonValue
) {
  const severity: LearningEventSeverity =
    rating >= 4 ? "POSITIVE" : rating <= 2 ? "NEGATIVE" : "INFO";
  return recordEvent({
    kind: "AI_FEEDBACK",
    severity,
    userId,
    surface: "marco-chat",
    marcoQueryId,
    marcoFeedbackId,
    payload,
    scoreDelta: rating - 3, // -2..+2
  });
}

/** Convenience for sign-off workflow events. */
export function recordWorkflow(
  userId: string | undefined,
  signoffRequestId: string,
  proMatterId: string,
  outcome: "REQUESTED" | "APPROVED" | "REJECTED" | "AMENDED" | "RELEASED",
  payload?: Prisma.InputJsonValue
) {
  const severity: LearningEventSeverity =
    outcome === "APPROVED" || outcome === "RELEASED"
      ? "POSITIVE"
      : outcome === "REJECTED"
      ? "CRITICAL"
      : outcome === "AMENDED"
      ? "NEGATIVE"
      : "INFO";

  return recordEvent({
    kind: "WORKFLOW",
    severity,
    userId,
    surface: "signoff",
    signoffRequestId,
    proMatterId,
    payload: { outcome, ...((payload as object) ?? {}) },
  });
}

/**
 * Flag a detected regulatory change. The detector (whether a cron, a
 * manual editor, or a future agent) calls this once per change; the
 * matcher then walks open ProMatter rows that match the practice
 * areas and writes per-matter LearningEvents tagged REGULATORY.
 */
export async function flagRegulatoryUpdate(input: {
  jurisdiction: string;
  regime: string;
  citation: string;
  title: string;
  summary: string;
  effectiveAt?: Date;
  sourceUrl?: string;
  practiceAreas: string[];
  severity?: LearningEventSeverity;
}): Promise<string | null> {
  try {
    const update = await prisma.regulatoryUpdate.create({
      data: {
        jurisdiction: input.jurisdiction,
        regime: input.regime,
        citation: input.citation,
        title: input.title,
        summary: input.summary,
        effectiveAt: input.effectiveAt,
        sourceUrl: input.sourceUrl,
        practiceAreas: input.practiceAreas,
        severity: input.severity ?? "INFO",
      },
    });

    // Match against open matters in the same practice areas + jurisdiction.
    const affected = await prisma.proMatter.findMany({
      where: {
        jurisdiction: input.jurisdiction,
        status: { in: ["AWAITING_PRO", "ACCEPTED", "AWAITING_SIGNOFF"] },
        practiceArea: { slug: { in: input.practiceAreas } },
      },
      select: {
        id: true,
        citizenUserId: true,
        practiceArea: { select: { slug: true } },
      },
    });

    await Promise.all(
      affected.map((m) =>
        recordEvent({
          kind: "REGULATORY",
          severity: input.severity ?? "INFO",
          userId: m.citizenUserId,
          surface: "regulatory-radar",
          practiceArea: m.practiceArea.slug,
          jurisdiction: input.jurisdiction,
          proMatterId: m.id,
          regulatoryUpdateId: update.id,
        })
      )
    );

    return update.id;
  } catch (err) {
    console.error("[flywheel] failed to flag regulatory update", err);
    return null;
  }
}
