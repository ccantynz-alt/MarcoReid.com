import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";

export const dynamic = "force-dynamic";

const kindStyles: Record<string, string> = {
  CONTRACT: "bg-forest-50 text-forest-600",
  LETTER: "bg-navy-50 text-navy-500",
  COURT_FILING: "bg-plum-50 text-plum-600",
  EVIDENCE: "bg-amber-50 text-amber-600",
  INVOICE: "bg-sky-50 text-sky-600",
  RECEIPT: "bg-emerald-50 text-emerald-600",
  OTHER: "bg-navy-50 text-navy-400",
};

export default async function DocumentsPage() {
  const userId = await getUserId();
  if (!userId) redirect("/login");

  const documents = await prisma.document.findMany({
    where: { userId },
    include: {
      matter: { select: { id: true, title: true } },
      client: { select: { id: true, name: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 lg:px-12">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-display text-navy-800">Documents</h1>
        <button
          disabled
          className="inline-flex min-h-touch items-center justify-center rounded-lg bg-navy-500 px-7 py-3 text-sm font-semibold text-white shadow-sm transition-all disabled:cursor-not-allowed disabled:opacity-50"
        >
          Upload Document
        </button>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-card">
        {documents.length === 0 ? (
          <div className="p-8 text-center text-sm text-navy-400">
            No documents yet.
          </div>
        ) : (
          <table className="w-full">
            <thead className="border-b border-navy-100 bg-navy-50/50">
              <tr className="text-left text-xs font-semibold uppercase tracking-wide text-navy-400">
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3">File Name</th>
                <th className="px-6 py-3">Kind</th>
                <th className="px-6 py-3">Matter</th>
                <th className="px-6 py-3">Client</th>
                <th className="px-6 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((d) => (
                <tr key={d.id} className="border-b border-navy-50 last:border-0">
                  <td className="px-6 py-4 text-sm font-medium text-navy-700">
                    {d.title}
                  </td>
                  <td className="px-6 py-4 text-sm text-navy-500">
                    {d.fileName}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        kindStyles[d.kind] ?? "bg-navy-50 text-navy-400"
                      }`}
                    >
                      {d.kind.replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-navy-500">
                    {d.matter?.title ?? "\u2014"}
                  </td>
                  <td className="px-6 py-4 text-sm text-navy-500">
                    {d.client?.name ?? "\u2014"}
                  </td>
                  <td className="px-6 py-4 text-sm text-navy-500">
                    {new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(d.createdAt)}
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
