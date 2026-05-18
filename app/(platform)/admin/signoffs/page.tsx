import { redirect } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import SignoffApproveForm from "@/app/components/platform/SignoffApproveForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Sign-off queue · Admin",
};

const JURISDICTION_LABELS: Record<string, string> = {
  NZ: "New Zealand",
  AU: "Australia",
  UK: "United Kingdom",
  US: "United States",
};

function relTime(d: Date): string {
  const ms = Date.now() - d.getTime();
  const min = Math.round(ms / 60000);
  if (min < 60) return `${min}m ago`;
  const hr = Math.round(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const day = Math.round(hr / 24);
  return `${day}d ago`;
}

export default async function AdminSignoffsPage() {
  const session = await getServerSession(authOptions);
  const role = (session?.user as { role?: string } | undefined)?.role;
  if (!session) redirect("/login");
  if (role !== "ADMIN") redirect("/dashboard");

  const requests = await prisma.signoffRequest.findMany({
    where: { status: "PENDING" },
    orderBy: { requestedAt: "asc" },
    include: {
      draft: true,
    },
    take: 100,
  });

  const allCount = await prisma.signoffRequest.count();
  const approvedCount = await prisma.signoffRequest.count({
    where: { status: "APPROVED" },
  });
  const rejectedCount = await prisma.signoffRequest.count({
    where: { status: "REJECTED" },
  });
  const amendedCount = await prisma.signoffRequest.count({
    where: { status: "AMENDED" },
  });

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 lg:px-12">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-plum-600">
            Admin · Sign-off queue
          </p>
          <h1 className="mt-1 font-serif text-display text-navy-800">
            Pending sign-offs
          </h1>
          <p className="mt-2 text-navy-400">
            Public-document drafts and citizen-pro matters waiting for a
            credentialled professional to review. Marco Reid platform admins
            stand in for the marketplace Professional supply side until
            Wave 4 ships.
          </p>
        </div>
        <Link
          href="/admin"
          className="rounded-lg border border-navy-200 px-3 py-1.5 text-xs font-medium text-navy-500 hover:bg-navy-50"
        >
          ← Back to admin
        </Link>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-4">
        <div className="rounded-2xl border border-gold-200 bg-gold-50/60 p-5 shadow-card">
          <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
            Pending
          </p>
          <p className="mt-2 font-serif text-3xl text-navy-800 tabular-nums">
            {requests.length}
          </p>
          <p className="mt-1 text-xs text-navy-400">Oldest first below</p>
        </div>
        <div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-card">
          <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
            Approved
          </p>
          <p className="mt-2 font-serif text-3xl text-navy-800 tabular-nums">
            {approvedCount}
          </p>
          <p className="mt-1 text-xs text-navy-400">All-time</p>
        </div>
        <div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-card">
          <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
            Amended
          </p>
          <p className="mt-2 font-serif text-3xl text-navy-800 tabular-nums">
            {amendedCount}
          </p>
          <p className="mt-1 text-xs text-navy-400">Returned for changes</p>
        </div>
        <div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-card">
          <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
            Rejected
          </p>
          <p className="mt-2 font-serif text-3xl text-navy-800 tabular-nums">
            {rejectedCount}
          </p>
          <p className="mt-1 text-xs text-navy-400">All-time · {allCount} total</p>
        </div>
      </div>

      {/* Queue */}
      <div className="mt-10 space-y-4">
        {requests.length === 0 ? (
          <div className="rounded-2xl border border-navy-100 bg-white p-12 text-center shadow-card">
            <p className="font-serif text-xl text-navy-800">
              The queue is clear.
            </p>
            <p className="mt-2 text-sm text-navy-400">
              No sign-off requests pending. New public document drafts that
              get sent for sign-off will land here.
            </p>
          </div>
        ) : (
          requests.map((req) => {
            const draft = req.draft;
            const extracted = (draft?.extracted ?? null) as
              | { docTypeLabel?: string; confidence?: string }
              | null;
            const docTypeLabel = extracted?.docTypeLabel ?? req.kind;
            const jurisdictionLabel =
              JURISDICTION_LABELS[req.jurisdiction ?? ""] ??
              req.jurisdiction ??
              "—";

            return (
              <div
                key={req.id}
                className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-serif text-lg text-navy-800">
                        {docTypeLabel}
                      </h3>
                      <span className="rounded-md border border-navy-200 bg-navy-50 px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-navy-700">
                        {req.jurisdiction ?? "—"}
                      </span>
                      <span className="rounded-md bg-gold-50 px-2 py-0.5 text-xs font-semibold uppercase tracking-wider text-gold-700">
                        {req.status}
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-navy-400">
                      Requested {relTime(req.requestedAt)} &middot;{" "}
                      {jurisdictionLabel} &middot; ref{" "}
                      {req.id.slice(0, 8)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-navy-400">Requester</p>
                    <p className="text-sm font-medium text-navy-700">
                      {req.requesterEmail || "—"}
                    </p>
                  </div>
                </div>

                {req.requesterNotes && (
                  <div className="mt-4 rounded-xl border border-navy-100 bg-navy-50/60 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
                      Requester notes
                    </p>
                    <p className="mt-2 text-sm text-navy-700">
                      {req.requesterNotes}
                    </p>
                  </div>
                )}

                <details className="mt-4">
                  <summary className="cursor-pointer text-xs font-semibold uppercase tracking-wider text-navy-500 hover:text-navy-700">
                    View draft body
                  </summary>
                  <pre className="mt-3 max-h-96 overflow-auto whitespace-pre-wrap break-words rounded-xl border border-navy-100 bg-white p-4 font-serif text-sm leading-relaxed text-navy-800">
                    {req.aiOutput}
                  </pre>
                  <p className="mt-2 text-[10px] text-navy-400">
                    Output sha256: {req.outputSha256?.slice(0, 16)}…
                  </p>
                </details>

                <div className="mt-6 border-t border-navy-100 pt-6">
                  <SignoffApproveForm
                    signoffId={req.id}
                    defaultJurisdiction={req.jurisdiction ?? ""}
                  />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
