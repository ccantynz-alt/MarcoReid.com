import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function ClientsPage() {
  const userId = await getUserId();
  if (!userId) redirect("/login");

  const clients = await prisma.client.findMany({
    where: { userId },
    include: { _count: { select: { matters: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 lg:px-12">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-display text-navy-800 dark:text-white">Clients</h1>
        <Link
          href="/clients/new"
          className="inline-flex min-h-touch items-center justify-center rounded-lg bg-navy-500 px-7 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-navy-600 dark:hover:bg-navy-400"
        >
          Add client
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-card dark:border-navy-700 dark:bg-navy-800">
        {clients.length === 0 ? (
          <div className="p-8 text-center text-sm text-navy-400">
            No clients yet. Add your first client to get started.
          </div>
        ) : (
          <table className="w-full">
            <thead className="border-b border-navy-100 bg-navy-50/50 dark:border-navy-700 dark:bg-navy-900/50">
              <tr className="text-left text-xs font-semibold uppercase tracking-wide text-navy-400">
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Company</th>
                <th className="px-6 py-3">Matters</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((c) => (
                <tr key={c.id} className="border-b border-navy-50 last:border-0 dark:border-navy-700 dark:hover:bg-navy-700/50">
                  <td className="px-6 py-4 text-sm font-medium text-navy-700 dark:text-navy-200">{c.name}</td>
                  <td className="px-6 py-4 text-sm text-navy-500 dark:text-navy-300">{c.email}</td>
                  <td className="px-6 py-4 text-sm text-navy-500 dark:text-navy-300">{c.companyName ?? "—"}</td>
                  <td className="px-6 py-4 text-sm text-navy-500 dark:text-navy-300">{c._count.matters}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
