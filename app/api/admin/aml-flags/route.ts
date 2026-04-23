import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-guard";

// AML oversight: in this product the CDD subject + draft SAR models are
// owned by sibling agents and may not yet exist in this schema. We probe
// via raw SQL so a missing relation is silently absent — the page just
// renders an empty state. When the models land, this resolver picks
// them up automatically.

export const dynamic = "force-dynamic";

interface CddSubjectRow {
  id: string;
  fullName: string;
  riskLevel: string;
  status: string;
  jurisdiction: string | null;
  flaggedAt: string | null;
}

interface DraftSarRow {
  id: string;
  subjectName: string;
  status: string;
  draftedAt: string | null;
}

export async function GET() {
  const guard = await requireAdmin();
  if (guard) return guard;

  let subjects: CddSubjectRow[] = [];
  try {
    subjects = await prisma.$queryRawUnsafe<CddSubjectRow[]>(
      `SELECT id,
              "fullName",
              "riskLevel",
              status,
              jurisdiction,
              "flaggedAt"::text AS "flaggedAt"
       FROM "CddSubject"
       WHERE "riskLevel" = 'HIGH' OR status = 'REQUIRES_EDD'
       ORDER BY "flaggedAt" DESC NULLS LAST
       LIMIT 200`,
    );
  } catch {
    subjects = [];
  }

  let drafts: DraftSarRow[] = [];
  try {
    drafts = await prisma.$queryRawUnsafe<DraftSarRow[]>(
      `SELECT id,
              "subjectName",
              status,
              "draftedAt"::text AS "draftedAt"
       FROM "SuspiciousActivityReport"
       WHERE status IN ('DRAFT', 'PENDING_REVIEW')
       ORDER BY "draftedAt" DESC NULLS LAST
       LIMIT 200`,
    );
  } catch {
    drafts = [];
  }

  return NextResponse.json({ subjects, drafts });
}
