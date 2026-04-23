/**
 * /books/journal — list of journal entries.
 *
 * Most-recent first. Each row shows the running debit/credit totals so
 * an unbalanced DRAFT is visible at a glance.
 */

import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";
import { JournalStatus, Prisma } from "@prisma/client";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Journal entries · Marco Reid",
};

function fmt(amount: Prisma.Decimal): string {
  return new Intl.NumberFormat("en-NZ", { style: "currency", currency: "NZD" }).format(
    Number(amount.toFixed(2)),
  );
}

const STATUS_BADGE: Record<JournalStatus, string> = {
  DRAFT: "bg-gold-100 text-gold-800 dark:bg-gold-900/30 dark:text-gold-300",
  POSTED: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  VOIDED: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
};

export default async function JournalPage() {
  const userId = await getUserId();
  if (!userId) redirect("/login");

  const entries = await prisma.journalEntry.findMany({
    where: { firmId: userId },
    include: { lines: true },
    orderBy: { entryDate: "desc" },
    take: 100,
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-gold-600">Accounting</p>
          <h1 className="mt-2 font-serif text-4xl text-navy-700 dark:text-navy-100">Journal entries</h1>
          <p className="mt-2 text-navy-500 dark:text-navy-300">{entries.length} entries.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/books" className="text-sm font-semibold text-navy-500 hover:text-navy-700 dark:text-navy-300">
            ← Overview
          </Link>
          <Link
            href="/books/journal/new"
            className="rounded-lg bg-navy-500 px-4 py-2 text-sm font-semibold text-white hover:bg-navy-600"
          >
            New entry
          </Link>
        </div>
      </div>

      {entries.length === 0 ? (
        <div className="rounded-2xl border border-navy-200 bg-white p-8 text-center dark:border-navy-700 dark:bg-navy-900">
          <p className="text-navy-500 dark:text-navy-300">No journal entries yet.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-navy-200 bg-white dark:border-navy-700 dark:bg-navy-900">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-100 text-left text-xs uppercase tracking-wider text-navy-400 dark:border-navy-700">
                <th className="px-6 py-3">#</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Description</th>
                <th className="px-6 py-3">Source</th>
                <th className="px-6 py-3 text-right">Debit</th>
                <th className="px-6 py-3 text-right">Credit</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((e) => {
                const debit = e.lines.reduce<Prisma.Decimal>((acc, l) => acc.plus(l.debit), new Prisma.Decimal(0));
                const credit = e.lines.reduce<Prisma.Decimal>((acc, l) => acc.plus(l.credit), new Prisma.Decimal(0));
                return (
                  <tr key={e.id} className="border-b border-navy-50 dark:border-navy-800">
                    <td className="px-6 py-3 font-mono text-navy-500">{e.entryNumber}</td>
                    <td className="px-6 py-3 text-navy-700 dark:text-navy-200">
                      {e.entryDate.toISOString().slice(0, 10)}
                    </td>
                    <td className="px-6 py-3 text-navy-700 dark:text-navy-200">{e.description}</td>
                    <td className="px-6 py-3 text-xs text-navy-400">{e.sourceType ?? "—"}</td>
                    <td className="px-6 py-3 text-right font-mono text-navy-700 dark:text-navy-200">{fmt(debit)}</td>
                    <td className="px-6 py-3 text-right font-mono text-navy-700 dark:text-navy-200">{fmt(credit)}</td>
                    <td className="px-6 py-3">
                      <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${STATUS_BADGE[e.status]}`}>
                        {e.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
