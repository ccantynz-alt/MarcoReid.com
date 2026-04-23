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

export default async function SarListPage() {
  const userId = await getUserId();
  if (!userId) redirect("/login");

  const reports = await prisma.sarReport.findMany({
    where: { firmId: userId },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-5xl px-6 py-12 sm:px-8 lg:px-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-500">
            Suspicious activity
          </p>
          <h1 className="mt-2 font-serif text-display text-navy-800">
            SAR drafts
          </h1>
          <p className="mt-2 text-sm text-navy-400">
            Tipping-off prohibitions apply. Do not disclose to the subject.
          </p>
        </div>
        <Link
          href="/aml/sar/new"
          className="inline-flex min-h-touch items-center justify-center rounded-lg bg-plum-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-plum-600"
        >
          New SAR
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-card">
        {reports.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <p className="font-serif text-lg text-navy-700">
              No SAR drafts.
            </p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-navy-50 text-left text-xs uppercase tracking-wide text-navy-500">
              <tr>
                <th className="px-6 py-3">Created</th>
                <th className="px-6 py-3">Jurisdiction</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Narrative excerpt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-50">
              {reports.map((r) => (
                <tr key={r.id} className="hover:bg-navy-50/40">
                  <td className="px-6 py-3 text-navy-500">
                    {formatDate(r.createdAt)}
                  </td>
                  <td className="px-6 py-3 text-navy-700">
                    {r.jurisdiction}
                  </td>
                  <td className="px-6 py-3">
                    <span className="rounded-full bg-navy-50 px-2.5 py-0.5 text-xs font-medium text-navy-500">
                      {r.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-navy-500">
                    {r.narrative.slice(0, 80)}
                    {r.narrative.length > 80 ? "…" : ""}
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
