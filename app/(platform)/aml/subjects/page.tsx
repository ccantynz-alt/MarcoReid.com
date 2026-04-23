import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";
import { Prisma } from "@prisma/client";

export const dynamic = "force-dynamic";

interface SearchParams {
  q?: string;
  status?: string;
}

export default async function SubjectsListPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const userId = await getUserId();
  if (!userId) redirect("/login");

  const params = await searchParams;
  const q = params.q?.trim() || "";
  const statusFilter = params.status || "";

  const where: Prisma.CddSubjectWhereInput = { firmId: userId };
  if (q) {
    where.OR = [
      { legalName: { contains: q, mode: "insensitive" } },
      { preferredName: { contains: q, mode: "insensitive" } },
      { entityRegistrationNumber: { contains: q, mode: "insensitive" } },
    ];
  }
  if (statusFilter) {
    where.status = statusFilter as Prisma.CddSubjectWhereInput["status"];
  }

  const subjects = await prisma.cddSubject.findMany({
    where,
    orderBy: { updatedAt: "desc" },
    include: { _count: { select: { checks: true } } },
  });

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 lg:px-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-display text-navy-800 dark:text-white">
            CDD subjects
          </h1>
          <p className="mt-2 text-navy-400">
            {subjects.length === 0
              ? "No subjects yet."
              : `${subjects.length} ${subjects.length === 1 ? "subject" : "subjects"}`}
          </p>
        </div>
        <Link
          href="/aml/subjects/new"
          className="inline-flex min-h-touch items-center justify-center rounded-lg bg-plum-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-plum-600"
        >
          Start CDD
        </Link>
      </div>

      <form className="mt-6 flex flex-wrap gap-3" action="/aml/subjects" method="get">
        <input
          type="text"
          name="q"
          defaultValue={q}
          placeholder="Search by name or registration number…"
          className="flex-1 min-w-[240px] rounded-lg border border-navy-200 bg-white px-4 py-2.5 text-sm text-navy-700 focus:border-navy-500 focus:outline-none focus:ring-2 focus:ring-navy-100"
        />
        <select
          name="status"
          defaultValue={statusFilter}
          className="rounded-lg border border-navy-200 bg-white px-3 py-2.5 text-sm text-navy-700"
        >
          <option value="">All statuses</option>
          <option value="NOT_STARTED">Not started</option>
          <option value="IN_PROGRESS">In progress</option>
          <option value="REQUIRES_EDD">Requires EDD</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
          <option value="EXPIRED">Expired</option>
        </select>
        <button
          type="submit"
          className="rounded-lg bg-navy-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-navy-600"
        >
          Filter
        </button>
      </form>

      <div className="mt-8 overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-card">
        {subjects.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <p className="font-serif text-lg text-navy-700">
              No subjects match.
            </p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-navy-50 text-left text-xs uppercase tracking-wide text-navy-500">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Type</th>
                <th className="px-6 py-3">Risk</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Checks</th>
                <th className="px-6 py-3">Expires</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-50">
              {subjects.map((s) => (
                <tr key={s.id} className="hover:bg-navy-50/40">
                  <td className="px-6 py-3">
                    <Link
                      href={`/aml/subjects/${s.id}`}
                      className="font-medium text-navy-700 hover:text-navy-900"
                    >
                      {s.legalName}
                    </Link>
                  </td>
                  <td className="px-6 py-3 text-navy-500">{s.subjectType}</td>
                  <td className="px-6 py-3">
                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
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
                  </td>
                  <td className="px-6 py-3 text-navy-500">{s.status}</td>
                  <td className="px-6 py-3 text-navy-500">
                    {s._count.checks}
                  </td>
                  <td className="px-6 py-3 text-navy-500">
                    {s.expiresAt
                      ? new Intl.DateTimeFormat("en-AU", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }).format(s.expiresAt)
                      : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
