import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";

export const dynamic = "force-dynamic";

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default async function TimeEntriesPage() {
  const userId = await getUserId();
  if (!userId) redirect("/login");

  const entries = await prisma.timeEntry.findMany({
    where: { userId },
    include: { matter: { select: { id: true, title: true } } },
    orderBy: { date: "desc" },
  });

  const billableEntries = entries.filter((e) => e.billable);
  const totalBillableHours = billableEntries.reduce(
    (sum, e) => sum + e.minutes / 60,
    0,
  );
  const totalBillableAmount = billableEntries.reduce(
    (sum, e) => sum + (e.minutes / 60) * (e.rateInCents / 100),
    0,
  );

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 lg:px-12">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-display text-navy-800">Time Entries</h1>
        <Link
          href="/matters"
          className="inline-flex min-h-touch items-center justify-center rounded-lg bg-navy-500 px-7 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-navy-600"
        >
          New Time Entry
        </Link>
      </div>

      {/* Stat cards */}
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
          <p className="text-xs font-semibold uppercase tracking-wide text-navy-400">
            Total Billable Hours
          </p>
          <p className="mt-2 font-serif text-3xl text-navy-800">
            {totalBillableHours.toFixed(2)}
          </p>
        </div>
        <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
          <p className="text-xs font-semibold uppercase tracking-wide text-navy-400">
            Total Billable Amount
          </p>
          <p className="mt-2 font-serif text-3xl text-navy-800">
            {usd.format(totalBillableAmount)}
          </p>
        </div>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-card">
        {entries.length === 0 ? (
          <div className="p-8 text-center text-sm text-navy-400">
            No time entries yet.
          </div>
        ) : (
          <table className="w-full">
            <thead className="border-b border-navy-100 bg-navy-50/50">
              <tr className="text-left text-xs font-semibold uppercase tracking-wide text-navy-400">
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Matter</th>
                <th className="px-6 py-3">Description</th>
                <th className="px-6 py-3 text-right">Hours</th>
                <th className="px-6 py-3 text-right">Rate</th>
                <th className="px-6 py-3">Billable</th>
                <th className="px-6 py-3 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((e) => {
                const hours = e.minutes / 60;
                const rate = e.rateInCents / 100;
                const amount = hours * rate;

                return (
                  <tr key={e.id} className="border-b border-navy-50 last:border-0">
                    <td className="px-6 py-4 text-sm text-navy-500">
                      {new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(e.date)}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-navy-700">
                      {e.matter.title}
                    </td>
                    <td className="px-6 py-4 text-sm text-navy-500">
                      {e.description}
                    </td>
                    <td className="px-6 py-4 text-right text-sm text-navy-500">
                      {hours.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-right text-sm text-navy-500">
                      {usd.format(rate)}/hr
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          e.billable
                            ? "bg-forest-50 text-forest-600"
                            : "bg-navy-50 text-navy-400"
                        }`}
                      >
                        {e.billable ? "Yes" : "No"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-medium text-navy-700">
                      {usd.format(amount)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
