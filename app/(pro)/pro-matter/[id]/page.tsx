import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";
import SignoffRequestForm from "@/app/components/pro/SignoffRequestForm";

export const metadata = { title: "Matter — Marco Reid" };

export const dynamic = "force-dynamic";

const statusLabels: Record<string, string> = {
  ACCEPTED: "Accepted",
  AWAITING_SIGNOFF: "Awaiting sign-off",
  SIGNED_OFF: "Signed off",
  CLOSED: "Closed",
  CANCELLED: "Cancelled",
};

export default async function ProMatterPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const userId = await getUserId();
  if (!userId) return null;

  const pro = await prisma.professional.findUnique({
    where: { userId },
    select: { id: true, verifiedAt: true },
  });
  if (!pro) return null;

  const matter = await prisma.proMatter.findUnique({
    where: { id },
    include: {
      practiceArea: { select: { name: true, jurisdiction: true } },
      signoffRequests: { orderBy: { requestedAt: "desc" } },
    },
  });

  if (!matter || matter.acceptedByProId !== pro.id) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-12">
      <nav className="mb-4 text-sm">
        <Link href="/pro-dashboard" className="text-navy-500 hover:text-navy-700">
          &larr; Back to queue
        </Link>
      </nav>

      <div className="rounded-2xl border border-navy-100 bg-white p-8 shadow-card">
        <p className="text-xs uppercase tracking-wider text-plum-500">
          {matter.practiceArea.name} &middot; {matter.practiceArea.jurisdiction}
        </p>
        <h1 className="mt-3 font-serif text-3xl text-navy-800">{matter.summary}</h1>
        <div className="mt-4 flex items-center gap-3 text-sm">
          <span className="rounded-full bg-forest-100 px-3 py-1 text-xs font-semibold text-forest-800">
            {statusLabels[matter.status] ?? matter.status}
          </span>
          {matter.acceptedAt && (
            <span className="text-navy-400">
              Accepted {new Date(matter.acceptedAt).toLocaleDateString()}
            </span>
          )}
        </div>

        <div className="mt-6 rounded-lg border border-navy-100 bg-navy-50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
            Citizen&rsquo;s description
          </p>
          <p className="mt-2 whitespace-pre-wrap text-sm text-navy-700">
            {matter.details}
          </p>
        </div>
      </div>

      <section className="mt-8 rounded-2xl border border-navy-100 bg-white p-8 shadow-card">
        <h2 className="font-serif text-2xl text-navy-800">
          Draft a sign-off request
        </h2>
        <p className="mt-2 text-sm text-navy-500">
          Paste the AI-drafted output you&rsquo;ve reviewed. Submitting it
          here creates a tamper-evident hash and moves the matter to
          awaiting sign-off. Once you approve (or amend and approve) the
          draft, the output is released to the citizen.
        </p>
        <div className="mt-6">
          <SignoffRequestForm matterId={matter.id} />
        </div>
      </section>

      {matter.signoffRequests.length > 0 && (
        <section className="mt-8">
          <h2 className="font-serif text-2xl text-navy-800">Sign-off history</h2>
          <ul className="mt-4 space-y-3">
            {matter.signoffRequests.map((s) => (
              <li
                key={s.id}
                className="rounded-xl border border-navy-100 bg-white p-5"
              >
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-navy-700">{s.kind}</p>
                  <span className="text-xs font-semibold uppercase tracking-wider text-navy-400">
                    {s.status}
                  </span>
                </div>
                <p className="mt-1 text-xs text-navy-400">
                  {new Date(s.requestedAt).toLocaleString()} · sha256{" "}
                  <code className="font-mono">{s.outputSha256.slice(0, 12)}…</code>
                </p>
                {s.status === "PENDING" && (
                  <Link
                    href={`/signoff?focus=${s.id}`}
                    className="mt-3 inline-block text-sm font-semibold text-navy-600 hover:text-navy-800"
                  >
                    Review and decide &rarr;
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
