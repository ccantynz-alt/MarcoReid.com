import { redirect } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import SignoffActionForm from "@/app/components/platform/SignoffActionForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Sign-off requests · Marco Reid",
  description:
    "Review and action documents submitted by clients for your professional sign-off.",
};

function timeAgo(d: Date): string {
  const ms = Date.now() - d.getTime();
  const min = Math.floor(ms / 60000);
  if (min < 1) return "Just now";
  if (min < 60) return `${min}m ago`;
  const hrs = Math.floor(min / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days}d ago`;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(d);
}

const JURISDICTION_LABELS: Record<string, string> = {
  NZ: "New Zealand",
  AU: "Australia",
  UK: "United Kingdom",
  US: "United States",
  CA: "Canada",
};

const STATUS_STYLES: Record<
  string,
  { badge: string; label: string }
> = {
  PENDING: {
    badge: "bg-gold-50 text-gold-700 border border-gold-200",
    label: "Pending",
  },
  IN_REVIEW: {
    badge: "bg-navy-50 text-navy-700 border border-navy-200",
    label: "In review",
  },
  APPROVED: {
    badge: "bg-forest-50 text-forest-700 border border-forest-200",
    label: "Approved",
  },
  AMENDED: {
    badge: "bg-amber-50 text-amber-700 border border-amber-200",
    label: "Amended",
  },
  REJECTED: {
    badge: "bg-red-50 text-red-700 border border-red-200",
    label: "Rejected",
  },
};

type FilterTab = "all" | "pending" | "in_review" | "completed";

function getStatusFilter(tab: FilterTab): string[] | undefined {
  switch (tab) {
    case "pending":
      return ["PENDING", "AMENDED"];
    case "in_review":
      return ["IN_REVIEW"];
    case "completed":
      return ["APPROVED", "REJECTED"];
    default:
      return undefined;
  }
}

interface PageProps {
  searchParams: Promise<{ tab?: string; id?: string }>;
}

export default async function SignoffsPage({ searchParams }: PageProps) {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) redirect("/login");

  // Must be a professional
  const professional = await prisma.professional.findUnique({
    where: { userId },
    select: { id: true, displayName: true },
  });
  if (!professional) redirect("/dashboard");

  const params = await searchParams;
  const activeTab = (params.tab ?? "all") as FilterTab;
  const highlightId = params.id ?? null;

  const statusFilter = getStatusFilter(activeTab);

  const allRequests = await prisma.signoffRequest.findMany({
    where: {
      professionalId: professional.id,
      ...(statusFilter ? { status: { in: statusFilter } } : {}),
    },
    include: {
      draft: {
        select: {
          extracted: true,
          body: true,
          contactEmail: true,
          jurisdiction: true,
        },
      },
    },
    orderBy: { requestedAt: "desc" },
    take: 100,
  });

  // Stat counts (always across all statuses)
  const [pendingCount, approvedCount, amendedCount, totalCount] =
    await Promise.all([
      prisma.signoffRequest.count({
        where: {
          professionalId: professional.id,
          status: { in: ["PENDING", "AMENDED"] },
        },
      }),
      prisma.signoffRequest.count({
        where: { professionalId: professional.id, status: "APPROVED" },
      }),
      prisma.signoffRequest.count({
        where: { professionalId: professional.id, status: "AMENDED" },
      }),
      prisma.signoffRequest.count({
        where: { professionalId: professional.id },
      }),
    ]);

  const tabs: { id: FilterTab; label: string; count?: number }[] = [
    { id: "all", label: "All", count: totalCount },
    { id: "pending", label: "Pending", count: pendingCount },
    { id: "in_review", label: "Under review" },
    { id: "completed", label: "Completed" },
  ];

  return (
    <div className="mx-auto max-w-5xl px-6 py-12 sm:px-8 lg:px-12">
      {/* Page heading */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">
            Professional inbox
          </p>
          <h1 className="mt-1 font-serif text-display text-navy-800">
            Sign-off requests
          </h1>
          <p className="mt-2 max-w-xl text-sm text-navy-400">
            Documents submitted by clients for your professional review and
            sign-off. Each request carries a verifiable output hash.
          </p>
        </div>
        <Link
          href="/dashboard"
          className="rounded-lg border border-navy-200 px-3 py-1.5 text-xs font-medium text-navy-500 hover:bg-navy-50"
        >
          &larr; Dashboard
        </Link>
      </div>

      {/* Stat cards */}
      <div className="mt-8 grid gap-4 sm:grid-cols-4">
        <div className="rounded-2xl border border-gold-200 bg-gold-50/60 p-5 shadow-card">
          <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
            Pending
          </p>
          <p className="mt-2 font-serif text-3xl tabular-nums text-navy-800">
            {pendingCount}
          </p>
          <p className="mt-1 text-xs text-navy-400">Awaiting action</p>
        </div>
        <div className="rounded-2xl border border-forest-200 bg-forest-50/60 p-5 shadow-card">
          <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
            Approved
          </p>
          <p className="mt-2 font-serif text-3xl tabular-nums text-navy-800">
            {approvedCount}
          </p>
          <p className="mt-1 text-xs text-navy-400">All-time</p>
        </div>
        <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-5 shadow-card">
          <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
            Amended
          </p>
          <p className="mt-2 font-serif text-3xl tabular-nums text-navy-800">
            {amendedCount}
          </p>
          <p className="mt-1 text-xs text-navy-400">Returned for changes</p>
        </div>
        <div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-card">
          <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
            Total
          </p>
          <p className="mt-2 font-serif text-3xl tabular-nums text-navy-800">
            {totalCount}
          </p>
          <p className="mt-1 text-xs text-navy-400">All requests ever</p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="mt-8 flex gap-1 overflow-x-auto rounded-xl border border-navy-100 bg-white p-1 shadow-card">
        {tabs.map((tab) => (
          <Link
            key={tab.id}
            href={`/signoffs?tab=${tab.id}`}
            className={`flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
              activeTab === tab.id
                ? "bg-navy-600 text-white shadow-sm"
                : "text-navy-500 hover:bg-navy-50 hover:text-navy-700"
            }`}
          >
            {tab.label}
            {tab.count != null && tab.count > 0 && (
              <span
                className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                  activeTab === tab.id
                    ? "bg-white/20 text-white"
                    : "bg-navy-100 text-navy-500"
                }`}
              >
                {tab.count}
              </span>
            )}
          </Link>
        ))}
      </div>

      {/* Request list */}
      <div className="mt-6 space-y-4">
        {allRequests.length === 0 ? (
          <div className="rounded-2xl border border-navy-100 bg-white p-12 text-center shadow-card">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-forest-50">
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6 text-forest-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 13l4 4L19 7" />
              </svg>
            </span>
            <p className="mt-4 font-serif text-lg text-navy-800">
              No requests to show
            </p>
            <p className="mt-1 text-sm text-navy-400">
              {activeTab === "all"
                ? "You have not received any sign-off requests yet."
                : "No requests in this category."}
            </p>
          </div>
        ) : (
          allRequests.map((req) => {
            const extracted = (req.draft?.extracted ?? null) as
              | { docTypeLabel?: string }
              | null;
            const docType =
              extracted?.docTypeLabel ?? req.kind ?? "Document review";
            const jurisdictionLabel =
              JURISDICTION_LABELS[req.jurisdiction ?? ""] ??
              req.jurisdiction ??
              "—";
            const statusStyle =
              STATUS_STYLES[req.status] ?? STATUS_STYLES.PENDING;
            const isHighlighted = highlightId === req.id;

            return (
              <div
                key={req.id}
                id={`req-${req.id}`}
                className={`rounded-2xl border bg-white p-6 shadow-card transition-all ${
                  isHighlighted
                    ? "border-gold-300 ring-2 ring-gold-200"
                    : "border-navy-100"
                }`}
              >
                {/* Header row */}
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-serif text-lg text-navy-800">
                        {docType}
                      </h3>
                      <span className="rounded-md border border-navy-200 bg-navy-50 px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-navy-700">
                        {req.jurisdiction ?? "—"}
                      </span>
                      <span
                        className={`rounded-md px-2 py-0.5 text-xs font-semibold uppercase tracking-wider ${statusStyle.badge}`}
                      >
                        {statusStyle.label}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-navy-400">
                      Submitted {timeAgo(req.requestedAt)} &middot;{" "}
                      {jurisdictionLabel} &middot; ref {req.id.slice(0, 8)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-navy-400">Requester</p>
                    <p className="text-sm font-medium text-navy-700">
                      {req.requesterEmail ?? "—"}
                    </p>
                  </div>
                </div>

                {/* Requester notes */}
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

                {/* Amendment notes (if any) */}
                {req.reviewerNotes && (
                  <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50/60 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-amber-700">
                      Amendment notes sent
                    </p>
                    <p className="mt-2 text-sm text-amber-800">
                      {req.reviewerNotes}
                    </p>
                  </div>
                )}

                {/* Draft body (collapsible) */}
                {req.aiOutput && (
                  <details className="mt-4">
                    <summary className="cursor-pointer select-none text-xs font-semibold uppercase tracking-wider text-navy-500 hover:text-navy-700">
                      View draft document
                    </summary>
                    <pre className="mt-3 max-h-80 overflow-auto whitespace-pre-wrap break-words rounded-xl border border-navy-100 bg-white p-4 font-serif text-sm leading-relaxed text-navy-800">
                      {req.aiOutput}
                    </pre>
                    {req.outputSha256 && (
                      <p className="mt-2 font-mono text-[10px] text-navy-400">
                        sha256: {req.outputSha256.slice(0, 32)}&hellip;
                      </p>
                    )}
                  </details>
                )}

                {/* Action buttons — only for actionable statuses */}
                {(req.status === "PENDING" || req.status === "AMENDED" || req.status === "IN_REVIEW") && (
                  <div className="mt-6 border-t border-navy-100 pt-6">
                    <SignoffActionForm signoffId={req.id} />
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* AI disclaimer */}
      <p className="mt-8 rounded-xl border border-navy-100 bg-white p-4 text-xs leading-relaxed text-navy-400">
        <strong className="text-navy-600">Important:</strong> This content is
        generated by AI for research and informational purposes only. It does
        not constitute legal advice, tax advice, or professional advice of any
        kind. Always verify AI-generated content with your own professional
        judgment before signing off. Your sign-off attests that you have
        reviewed the document and it meets the required standard for the
        stated jurisdiction.
      </p>
    </div>
  );
}
