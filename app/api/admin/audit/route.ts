import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-guard";

// Generic audit log view. Combines any audit-shaped tables we know about
// (AmlAuditEntry, SignoffAuditEntry — owned by sibling agents) plus a
// fallback synthesised from OracleQuery activity. Each source is probed
// separately so a missing table never breaks the page.

export const dynamic = "force-dynamic";

interface AuditRow {
  id: string;
  source: string;
  action: string;
  actor: string | null;
  detail: string | null;
  occurredAt: string;
}

function parseInt(value: string | null, def: number): number {
  if (!value) return def;
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : def;
}

export async function GET(req: NextRequest) {
  const guard = await requireAdmin();
  if (guard) return guard;

  const url = new URL(req.url);
  const page = parseInt(url.searchParams.get("page"), 1);
  const pageSize = Math.min(parseInt(url.searchParams.get("pageSize"), 50), 200);
  const actorFilter = url.searchParams.get("actor")?.trim() ?? "";
  const actionFilter = url.searchParams.get("action")?.trim() ?? "";
  const fromIso = url.searchParams.get("from");
  const toIso = url.searchParams.get("to");
  const from = fromIso ? new Date(fromIso) : null;
  const to = toIso ? new Date(toIso) : null;

  const rows: AuditRow[] = [];

  // Source 1: AmlAuditEntry (sibling-owned, may not exist).
  try {
    type R = {
      id: string;
      action: string;
      actor: string | null;
      detail: string | null;
      occurredAt: string;
    };
    const data = await prisma.$queryRawUnsafe<R[]>(
      `SELECT id, action, actor, detail, "occurredAt"::text AS "occurredAt"
       FROM "AmlAuditEntry"
       ORDER BY "occurredAt" DESC
       LIMIT 500`,
    );
    for (const r of data) {
      rows.push({ ...r, source: "aml" });
    }
  } catch {
    // table absent
  }

  // Source 2: SignoffAuditEntry (sibling-owned, may not exist).
  try {
    type R = {
      id: string;
      action: string;
      actor: string | null;
      detail: string | null;
      occurredAt: string;
    };
    const data = await prisma.$queryRawUnsafe<R[]>(
      `SELECT id, action, actor, detail, "occurredAt"::text AS "occurredAt"
       FROM "SignoffAuditEntry"
       ORDER BY "occurredAt" DESC
       LIMIT 500`,
    );
    for (const r of data) {
      rows.push({ ...r, source: "signoff" });
    }
  } catch {
    // table absent
  }

  // Source 3 fallback: synthesise from OracleQuery so the page is never
  // empty in dev. We treat each query as an "oracle.query" audit event.
  if (rows.length === 0) {
    try {
      const queries = await prisma.oracleQuery.findMany({
        orderBy: { createdAt: "desc" },
        take: 200,
        select: {
          id: true,
          query: true,
          domain: true,
          user: { select: { email: true } },
          createdAt: true,
        },
      });
      for (const q of queries) {
        rows.push({
          id: q.id,
          source: "oracle",
          action: `oracle.query.${q.domain.toLowerCase()}`,
          actor: q.user?.email ?? null,
          detail: q.query.slice(0, 160),
          occurredAt: q.createdAt.toISOString(),
        });
      }
    } catch {
      // nothing to fall back on
    }
  }

  // Filter + sort + paginate in memory. Volumes here are bounded by the
  // per-source LIMIT 500 above, so a JS-side pass is cheap.
  let filtered = rows;
  if (actorFilter) {
    const needle = actorFilter.toLowerCase();
    filtered = filtered.filter((r) =>
      (r.actor ?? "").toLowerCase().includes(needle),
    );
  }
  if (actionFilter) {
    const needle = actionFilter.toLowerCase();
    filtered = filtered.filter((r) =>
      r.action.toLowerCase().includes(needle),
    );
  }
  if (from) {
    filtered = filtered.filter((r) => new Date(r.occurredAt) >= from);
  }
  if (to) {
    filtered = filtered.filter((r) => new Date(r.occurredAt) <= to);
  }

  filtered.sort((a, b) => b.occurredAt.localeCompare(a.occurredAt));

  const total = filtered.length;
  const start = (page - 1) * pageSize;
  const pageRows = filtered.slice(start, start + pageSize);

  return NextResponse.json({
    rows: pageRows,
    total,
    page,
    pageSize,
  });
}
