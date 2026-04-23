import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";

export const dynamic = "force-dynamic";

function formatDate(d: Date | null | undefined) {
  if (!d) return "—";
  return new Intl.DateTimeFormat("en-AU", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(d);
}

export default async function AmlDashboardPage() {
  const userId = await getUserId();
  if (!userId) redirect("/login");

  const now = new Date();
  const in30 = new Date(now);
  in30.setDate(now.getDate() + 30);

  const [
    openSubjects,
    expiringSoon,
    sarDrafts,
    latestPrograms,
    auditTail,
    totalSubjects,
  ] = await Promise.all([
    prisma.cddSubject.findMany({
      where: {
        firmId: userId,
        status: { in: ["IN_PROGRESS", "REQUIRES_EDD"] },
      },
      orderBy: { updatedAt: "desc" },
      take: 5,
    }),
    prisma.cddSubject.findMany({
      where: {
        firmId: userId,
        status: "APPROVED",
        expiresAt: { lte: in30, gte: now },
      },
      orderBy: { expiresAt: "asc" },
      take: 5,
    }),
    prisma.sarReport.findMany({
      where: { firmId: userId, status: "DRAFT" },
      orderBy: { updatedAt: "desc" },
      take: 5,
    }),
    prisma.amlProgram.findMany({
      where: { firmId: userId },
      orderBy: [{ jurisdiction: "asc" }, { version: "desc" }],
      distinct: ["jurisdiction"],
    }),
    prisma.amlAuditEntry.findMany({
      where: { firmId: userId },
      orderBy: { occurredAt: "desc" },
      take: 8,
    }),
    prisma.cddSubject.count({ where: { firmId: userId } }),
  ]);

  const stats = [
    { label: "Open CDD", value: String(openSubjects.length), note: "In progress / EDD" },
    { label: "Expiring (30d)", value: String(expiringSoon.length), note: "Re-verify soon" },
    { label: "SAR drafts", value: String(sarDrafts.length), note: "Awaiting submission" },
    { label: "All subjects", value: String(totalSubjects), note: "Across jurisdictions" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-500">
            AML / CDD
          </p>
          <h1 className="mt-2 font-serif text-display text-navy-800 dark:text-white">
            Compliance dashboard
          </h1>
          <p className="mt-2 text-sm text-navy-400">
            AUSTRAC Tranche 2 commences 1 July 2026. Multi-jurisdiction by
            design (NZ DIA · AU AUSTRAC · UK HMRC · US FinCEN).
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/aml/subjects/new"
            className="inline-flex min-h-touch items-center justify-center rounded-lg bg-plum-500 px-4 py-2 text-sm font-semibold text-white hover:bg-plum-600"
          >
            Start CDD
          </Link>
          <Link
            href="/aml/sar/new"
            className="inline-flex min-h-touch items-center justify-center rounded-lg border border-navy-200 bg-white px-4 py-2 text-sm font-semibold text-navy-700 hover:border-navy-400"
          >
            Draft SAR
          </Link>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card dark:border-navy-700 dark:bg-navy-800"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gold-600 dark:text-gold-400">
              {s.label}
            </p>
            <p className="mt-3 font-serif text-4xl text-navy-800 dark:text-white">
              {s.value}
            </p>
            <p className="mt-1 text-sm text-navy-400">{s.note}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-headline text-navy-800">
              Open CDD subjects
            </h2>
            <Link
              href="/aml/subjects"
              className="text-sm font-medium text-navy-500 hover:text-navy-700"
            >
              View all &rarr;
            </Link>
          </div>
          <div className="mt-4 overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-card">
            {openSubjects.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <p className="font-serif text-lg text-navy-700">
                  No open CDD work.
                </p>
                <p className="mt-1 text-sm text-navy-400">
                  Start CDD on a new client to see it here.
                </p>
                <Link
                  href="/aml/subjects/new"
                  className="mt-6 inline-flex items-center justify-center rounded-lg bg-plum-500 px-4 py-2 text-sm font-semibold text-white hover:bg-plum-600"
                >
                  Start CDD
                </Link>
              </div>
            ) : (
              <ul className="divide-y divide-navy-50">
                {openSubjects.map((s) => (
                  <li key={s.id}>
                    <Link
                      href={`/aml/subjects/${s.id}`}
                      className="flex items-center justify-between gap-4 px-6 py-4 hover:bg-navy-50/50"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-medium text-navy-700">
                          {s.legalName}
                        </p>
                        <p className="mt-0.5 truncate text-sm text-navy-400">
                          {s.subjectType} · {s.countryOfResidence ?? "—"}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 text-xs">
                        <span
                          className={`rounded-full px-2.5 py-0.5 font-medium ${
                            s.riskLevel === "UNACCEPTABLE"
                              ? "bg-red-50 text-red-600"
                              : s.riskLevel === "HIGH"
                                ? "bg-plum-50 text-plum-600"
                                : s.riskLevel === "MEDIUM"
                                  ? "bg-gold-50 text-gold-700"
                                  : "bg-forest-50 text-forest-600"
                          }`}
                        >
                          {s.riskLevel}
                        </span>
                        <span className="rounded-full bg-navy-50 px-2.5 py-0.5 font-medium text-navy-500">
                          {s.status}
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="mt-8 flex items-center justify-between">
            <h2 className="font-serif text-headline text-navy-800">
              Expiring CDD (next 30 days)
            </h2>
          </div>
          <div className="mt-4 overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-card">
            {expiringSoon.length === 0 ? (
              <div className="px-6 py-8 text-center text-sm text-navy-400">
                Nothing expiring in the next 30 days.
              </div>
            ) : (
              <ul className="divide-y divide-navy-50">
                {expiringSoon.map((s) => (
                  <li key={s.id}>
                    <Link
                      href={`/aml/subjects/${s.id}`}
                      className="flex items-center justify-between gap-4 px-6 py-4 hover:bg-navy-50/50"
                    >
                      <p className="truncate font-medium text-navy-700">
                        {s.legalName}
                      </p>
                      <span className="text-xs text-navy-400">
                        Expires {formatDate(s.expiresAt)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div>
          <h2 className="font-serif text-headline text-navy-800">
            Latest programs
          </h2>
          <div className="mt-4 rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
            {latestPrograms.length === 0 ? (
              <div className="text-sm text-navy-400">
                No AML program adopted yet.{" "}
                <Link
                  href="/aml/program"
                  className="text-navy-700 underline"
                >
                  Create one
                </Link>
                .
              </div>
            ) : (
              <ul className="space-y-3">
                {latestPrograms.map((p) => (
                  <li key={p.id} className="flex items-center justify-between text-sm">
                    <span className="font-medium text-navy-700">
                      {p.jurisdiction}
                    </span>
                    <span className="text-navy-400">v{p.version}</span>
                  </li>
                ))}
              </ul>
            )}
            <Link
              href="/aml/program"
              className="mt-4 inline-block text-sm font-medium text-navy-500 hover:text-navy-700"
            >
              Manage programs &rarr;
            </Link>
          </div>

          <h2 className="mt-8 font-serif text-headline text-navy-800">
            Audit tail
          </h2>
          <div className="mt-4 rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
            {auditTail.length === 0 ? (
              <p className="text-sm text-navy-400">No AML actions yet.</p>
            ) : (
              <ul className="space-y-3 text-sm">
                {auditTail.map((a) => (
                  <li key={a.id} className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-gold-400" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium text-navy-700">
                        {a.action}
                      </p>
                      <p className="text-xs text-navy-400">
                        {formatDate(a.occurredAt)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
