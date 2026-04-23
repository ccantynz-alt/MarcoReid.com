import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";
import ProgramEditor from "./ProgramEditor";

export const dynamic = "force-dynamic";

export default async function ProgramPage() {
  const userId = await getUserId();
  if (!userId) redirect("/login");

  const programs = await prisma.amlProgram.findMany({
    where: { firmId: userId },
    orderBy: [{ jurisdiction: "asc" }, { version: "desc" }],
  });

  return (
    <div className="mx-auto max-w-5xl px-6 py-12 sm:px-8 lg:px-12">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-500">
          AML / CTF program
        </p>
        <h1 className="mt-2 font-serif text-display text-navy-800">
          Your firm&apos;s programs
        </h1>
        <p className="mt-2 text-sm text-navy-400">
          Each jurisdiction holds its own versioned doctrine document. The
          starter template seeds the next version; tailor the content to your
          firm&apos;s actual ML/TF risk before adopting.
        </p>
      </div>

      <div className="mt-8 rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
        <h2 className="font-serif text-lg text-navy-800">
          Adopted versions
        </h2>
        {programs.length === 0 ? (
          <p className="mt-3 text-sm text-navy-400">
            No program adopted yet.
          </p>
        ) : (
          <table className="mt-4 w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-wide text-navy-500">
              <tr>
                <th className="py-2">Jurisdiction</th>
                <th className="py-2">Version</th>
                <th className="py-2">Effective from</th>
                <th className="py-2">SHA-256</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-50">
              {programs.map((p) => (
                <tr key={p.id}>
                  <td className="py-2 font-medium text-navy-700">
                    {p.jurisdiction}
                  </td>
                  <td className="py-2 text-navy-500">v{p.version}</td>
                  <td className="py-2 text-navy-500">
                    {new Intl.DateTimeFormat("en-AU", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    }).format(p.effectiveFrom)}
                  </td>
                  <td className="py-2 font-mono text-xs text-navy-400">
                    {p.documentSha256.slice(0, 16)}…
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="mt-8">
        <ProgramEditor />
      </div>
    </div>
  );
}
