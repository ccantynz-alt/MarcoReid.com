import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";

export const dynamic = "force-dynamic";

const money = (cents: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100);

export default async function MatterDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const userId = await getUserId();
  if (!userId) redirect("/login");

  const matter = await prisma.matter.findFirst({
    where: { id, userId },
    include: {
      client: true,
      documents: { orderBy: { createdAt: "desc" } },
      timeEntries: { orderBy: { date: "desc" } },
    },
  });
  if (!matter) notFound();

  const billableCents = matter.timeEntries
    .filter((t) => t.billable)
    .reduce((sum, t) => sum + Math.round((t.minutes / 60) * t.rateInCents), 0);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 lg:px-12">
      <Link href="/matters" className="text-sm text-navy-400 hover:text-navy-600">
        &larr; All matters
      </Link>
      <h1 className="mt-3 font-serif text-display text-navy-800">{matter.title}</h1>
      <p className="mt-1 text-sm text-navy-400">
        {matter.client.name}
        {matter.practiceArea ? ` • ${matter.practiceArea}` : ""} • {matter.status}
      </p>

      {/* Quick actions bar */}
      <div className="mt-4 flex gap-3">
        <Link
          href="/matters"
          className="inline-flex items-center rounded-full border border-navy-200 bg-white px-4 py-1.5 text-sm font-medium text-navy-700 shadow-card transition-colors hover:bg-navy-50"
        >
          + Add Time Entry
        </Link>
        <Link
          href="/trust"
          className="inline-flex items-center rounded-full border border-navy-200 bg-white px-4 py-1.5 text-sm font-medium text-navy-700 shadow-card transition-colors hover:bg-navy-50"
        >
          View Trust Account
        </Link>
      </div>

      {/* Quick stats bar */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-card text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-navy-400">Documents</p>
          <p className="mt-1 text-2xl font-bold text-navy-800">{matter.documents.length}</p>
        </div>
        <div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-card text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-navy-400">Time Entries</p>
          <p className="mt-1 text-2xl font-bold text-navy-800">{matter.timeEntries.length}</p>
        </div>
        <div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-card text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-navy-400">Billable Total</p>
          <p className="mt-1 text-2xl font-bold text-forest-600">{money(billableCents)}</p>
        </div>
      </div>

      {matter.description && (
        <div className="mt-6 rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-navy-400">Description</h2>
          <p className="mt-2 whitespace-pre-wrap text-sm text-navy-600">{matter.description}</p>
        </div>
      )}

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
          <h2 className="font-semibold text-navy-700">Documents ({matter.documents.length})</h2>
          {matter.documents.length === 0 ? (
            <p className="mt-3 text-sm text-navy-400">No documents yet.</p>
          ) : (
            <ul className="mt-3 divide-y divide-navy-50">
              {matter.documents.map((d) => (
                <li key={d.id} className="py-3 text-sm">
                  <div className="font-medium text-navy-700">{d.title}</div>
                  <div className="text-xs text-navy-400">
                    {d.fileName} • {d.kind}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
          <div className="flex items-baseline justify-between">
            <h2 className="font-semibold text-navy-700">
              Time entries ({matter.timeEntries.length})
            </h2>
            <span className="text-sm font-semibold text-forest-600">
              {money(billableCents)} billable
            </span>
          </div>
          {matter.timeEntries.length === 0 ? (
            <p className="mt-3 text-sm text-navy-400">No time entries yet.</p>
          ) : (
            <ul className="mt-3 divide-y divide-navy-50">
              {matter.timeEntries.map((t) => (
                <li key={t.id} className="py-3 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium text-navy-700">{t.description}</span>
                    <span className="text-navy-500">{(t.minutes / 60).toFixed(2)}h</span>
                  </div>
                  <div className="text-xs text-navy-400">
                    {new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(t.date)} •{" "}
                    {money(t.rateInCents)}/hr {t.billable ? "" : "• non-billable"}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Matter notes */}
      <div className="mt-6 rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-navy-400">Notes</h2>
        <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-navy-600">
          {matter.description || "No notes for this matter yet."}
        </p>
      </div>
    </div>
  );
}
