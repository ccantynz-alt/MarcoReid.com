import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";
import { SignoffStatus } from "@prisma/client";
import SignoffDecisionPanel from "@/app/components/pro/SignoffDecisionPanel";

export const metadata = { title: "Sign-off queue — Marco Reid" };

export const dynamic = "force-dynamic";

export default async function SignoffQueuePage() {
  const userId = await getUserId();
  if (!userId) return null;

  const pro = await prisma.professional.findUnique({
    where: { userId },
    select: { id: true, verifiedAt: true },
  });
  if (!pro) return null;

  // A pro signs off on the matters they accepted. (A future iteration can
  // add peer review where a second admitted pro signs off, but for the
  // soft launch the accepting pro is the reviewer.)
  const pending = await prisma.signoffRequest.findMany({
    where: {
      status: SignoffStatus.PENDING,
      proMatter: { acceptedByProId: pro.id },
    },
    include: {
      proMatter: {
        include: {
          practiceArea: { select: { name: true, jurisdiction: true } },
        },
      },
    },
    orderBy: { requestedAt: "asc" },
  });

  const recent = await prisma.signoffRequest.findMany({
    where: {
      status: { not: SignoffStatus.PENDING },
      proMatter: { acceptedByProId: pro.id },
    },
    include: {
      proMatter: { select: { id: true, summary: true } },
    },
    orderBy: { reviewedAt: "desc" },
    take: 10,
  });

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-12">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">
          Sign-off queue
        </p>
        <h1 className="mt-3 font-serif text-3xl text-navy-800">
          Review, amend, and release.
        </h1>
        <p className="mt-3 text-navy-500">
          Every AI-drafted output waits for your approval before it goes to
          the citizen. Each decision is stamped with your admission details
          and a tamper-evident hash.
        </p>
      </div>

      <section className="mt-8">
        <h2 className="font-serif text-xl text-navy-800">
          Pending ({pending.length})
        </h2>
        {pending.length === 0 ? (
          <p className="mt-4 rounded-2xl border border-dashed border-navy-200 bg-white p-8 text-center text-sm text-navy-500">
            Nothing to review.
          </p>
        ) : (
          <ul className="mt-4 space-y-5">
            {pending.map((s) => (
              <li
                key={s.id}
                className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-plum-500">
                      {s.proMatter.practiceArea.name} &middot;{" "}
                      {s.proMatter.practiceArea.jurisdiction} &middot; {s.kind}
                    </p>
                    <p className="mt-2 font-serif text-lg text-navy-800">
                      {s.proMatter.summary}
                    </p>
                    <p className="mt-1 text-xs text-navy-400">
                      Requested {new Date(s.requestedAt).toLocaleString()} · sha256{" "}
                      <code className="font-mono">{s.outputSha256.slice(0, 12)}…</code>
                    </p>
                  </div>
                </div>

                <div className="mt-5 rounded-lg border border-navy-100 bg-navy-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
                    AI-drafted output
                  </p>
                  <pre className="mt-2 whitespace-pre-wrap font-mono text-sm text-navy-700">
                    {s.aiOutput}
                  </pre>
                </div>

                {s.rationale && (
                  <div className="mt-3 rounded-lg border border-navy-100 bg-white p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
                      Rationale
                    </p>
                    <p className="mt-2 text-sm text-navy-700">{s.rationale}</p>
                  </div>
                )}

                <SignoffDecisionPanel signoffId={s.id} originalOutput={s.aiOutput} />
              </li>
            ))}
          </ul>
        )}
      </section>

      {recent.length > 0 && (
        <section className="mt-12">
          <h2 className="font-serif text-xl text-navy-800">Recent decisions</h2>
          <ul className="mt-4 space-y-2">
            {recent.map((s) => (
              <li
                key={s.id}
                className="flex items-center justify-between rounded-xl border border-navy-100 bg-white p-4 text-sm"
              >
                <div>
                  <span className="font-semibold text-navy-700">{s.proMatter.summary}</span>
                  <span className="ml-2 text-xs text-navy-400">
                    {s.kind} ·{" "}
                    {s.reviewedAt ? new Date(s.reviewedAt).toLocaleDateString() : ""}
                  </span>
                </div>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    s.status === "APPROVED"
                      ? "bg-forest-100 text-forest-800"
                      : s.status === "AMENDED"
                        ? "bg-plum-100 text-plum-800"
                        : "bg-red-100 text-red-700"
                  }`}
                >
                  {s.status}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <Link href="/pro-dashboard" className="text-sm text-navy-500 hover:text-navy-700">
              &larr; Back to queue
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
