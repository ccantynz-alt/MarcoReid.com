import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";

export const dynamic = "force-dynamic";

const statusStyles: Record<string, string> = {
  ACTIVE: "bg-forest-50 text-forest-600 dark:bg-forest-900 dark:text-forest-300",
  ON_HOLD: "bg-navy-50 text-navy-500 dark:bg-navy-700 dark:text-navy-300",
  CLOSED: "bg-plum-50 text-plum-600 dark:bg-plum-900 dark:text-plum-300",
};

export default async function MattersPage() {
  const userId = await getUserId();
  if (!userId) redirect("/login");

  const matters = await prisma.matter.findMany({
    where: { userId },
    include: { client: { select: { id: true, name: true } } },
    orderBy: { openedAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 lg:px-12">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-display text-navy-800 dark:text-white">Matters</h1>
        <Link
          href="/matters/new"
          className="inline-flex min-h-touch items-center justify-center rounded-lg bg-navy-500 px-7 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-navy-600 dark:hover:bg-navy-400"
        >
          New matter
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-card dark:border-navy-700 dark:bg-navy-800">
        {matters.length === 0 ? (
          <div className="p-8 text-center text-sm text-navy-400">
            No matters yet. Open your first matter to begin.
          </div>
        ) : (
          <table className="w-full">
            <thead className="border-b border-navy-100 bg-navy-50/50 dark:border-navy-700 dark:bg-navy-900/50">
              <tr className="text-left text-xs font-semibold uppercase tracking-wide text-navy-400">
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3">Client</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Opened</th>
              </tr>
            </thead>
            <tbody>
              {matters.map((m) => (
                <tr key={m.id} className="border-b border-navy-50 last:border-0 dark:border-navy-700 dark:hover:bg-navy-700/50">
                  <td className="px-6 py-4 text-sm font-medium text-navy-700 dark:text-navy-200">
                    <Link href={`/matters/${m.id}`} className="hover:text-navy-900 dark:hover:text-white">
                      {m.title}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-sm text-navy-500 dark:text-navy-300">{m.client.name}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        statusStyles[m.status] ?? "bg-navy-50 text-navy-500 dark:bg-navy-700 dark:text-navy-300"
                      }`}
                    >
                      {m.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-navy-500 dark:text-navy-400">
                    {new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(m.openedAt)}
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
