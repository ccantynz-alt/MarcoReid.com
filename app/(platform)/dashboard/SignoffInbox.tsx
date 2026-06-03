import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

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
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(d);
}

const JURISDICTION_LABELS: Record<string, string> = {
  NZ: "New Zealand",
  AU: "Australia",
  UK: "United Kingdom",
  US: "United States",
  CA: "Canada",
};

export default async function SignoffInbox() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) return null;

  // Find the Professional record for this user
  const professional = await prisma.professional.findUnique({
    where: { userId },
    select: { id: true },
  });

  // Not a professional — silently render nothing
  if (!professional) return null;

  const requests = await prisma.signoffRequest.findMany({
    where: {
      professionalId: professional.id,
      status: { in: ["PENDING", "AMENDED"] },
    },
    include: {
      draft: {
        select: {
          extracted: true,
          body: true,
        },
      },
    },
    orderBy: { requestedAt: "asc" },
    take: 20,
  });

  const pendingCount = requests.length;

  return (
    <section className="mt-8">
      {/* Section heading */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="font-serif text-headline text-navy-800">
            Sign-off requests
          </h2>
          {pendingCount > 0 && (
            <span className="inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-gold-500 px-1.5 text-[10px] font-bold leading-none text-white">
              {pendingCount}
            </span>
          )}
        </div>
        <Link
          href="/signoffs"
          className="text-sm font-medium text-navy-500 hover:text-navy-700"
        >
          View all &rarr;
        </Link>
      </div>

      {pendingCount === 0 ? (
        /* Empty state */
        <div className="mt-4 flex items-center gap-4 rounded-xl border border-navy-100 bg-white p-5 shadow-card">
          <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-forest-50">
            <svg
              viewBox="0 0 20 20"
              className="h-5 w-5 text-forest-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 10l4 4 6-8" />
            </svg>
          </span>
          <div>
            <p className="text-sm font-medium text-navy-700">
              Your inbox is clear
            </p>
            <p className="text-xs text-navy-400">
              No pending sign-offs — all requests have been actioned.
            </p>
          </div>
        </div>
      ) : (
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {requests.map((req) => {
            const extracted = (req.draft?.extracted ?? null) as
              | { docTypeLabel?: string }
              | null;
            const docType =
              extracted?.docTypeLabel ?? req.kind ?? "Document review";
            const jurisdictionLabel =
              JURISDICTION_LABELS[req.jurisdiction ?? ""] ??
              req.jurisdiction ??
              "—";

            return (
              <div
                key={req.id}
                className="relative flex flex-col rounded-xl border border-navy-100 bg-white p-5 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover"
              >
                {/* Status stripe */}
                <span
                  className={`absolute left-0 top-0 h-full w-1 rounded-l-xl ${
                    req.status === "AMENDED"
                      ? "bg-amber-400"
                      : "bg-gold-400"
                  }`}
                />

                {/* Doc type + jurisdiction */}
                <div className="flex flex-wrap items-start gap-2">
                  <p className="font-serif text-base font-semibold text-navy-800">
                    {docType}
                  </p>
                  <span className="rounded-full bg-navy-50 px-2.5 py-0.5 text-[11px] font-semibold text-navy-600">
                    {jurisdictionLabel}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide ${
                      req.status === "AMENDED"
                        ? "bg-amber-50 text-amber-700"
                        : "bg-gold-50 text-gold-700"
                    }`}
                  >
                    {req.status}
                  </span>
                </div>

                {/* Requester */}
                <p className="mt-2 text-xs text-navy-400">
                  {req.requesterEmail ?? "Anonymous"} &middot;{" "}
                  {timeAgo(req.requestedAt)}
                </p>

                {/* Notes */}
                {req.requesterNotes && (
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-navy-600">
                    {req.requesterNotes}
                  </p>
                )}

                {/* Actions */}
                <div className="mt-4 flex items-center gap-2">
                  <Link
                    href={`/signoffs?id=${req.id}`}
                    className="inline-flex min-h-[44px] flex-1 items-center justify-center rounded-lg bg-navy-600 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-navy-700"
                  >
                    Review &rarr;
                  </Link>
                  <MarkCompleteButton signoffId={req.id} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

// Small client island for the Mark complete button
function MarkCompleteButton({ signoffId }: { signoffId: string }) {
  // This renders as a form so it works without JavaScript too
  return (
    <form action={`/api/signoffs/${signoffId}`} method="POST">
      <input type="hidden" name="action" value="approve" />
      <button
        type="submit"
        className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-navy-200 px-3 py-2 text-xs font-semibold text-navy-600 transition-colors hover:bg-navy-50"
      >
        Mark complete
      </button>
    </form>
  );
}
