import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";
import { ProMatterStatus } from "@prisma/client";
import ProActionButtons from "@/app/components/pro/ProActionButtons";
import { formatFee } from "@/lib/marketplace/format";
import { hasActiveProSubscription } from "@/lib/marketplace/pro-plans";

export const metadata = { title: "Queue — Marco Reid" };

export const dynamic = "force-dynamic";

// Pro queue: shows AWAITING_PRO matters in the pro's verified practice
// areas and jurisdiction, plus matters this pro has already accepted.
// PI expiry is surfaced in the gate card — acceptance is hard-blocked at
// the API when PI is missing or expired.
export default async function ProDashboardPage() {
  const userId = await getUserId();
  if (!userId) return null;

  const pro = await prisma.professional.findUnique({
    where: { userId },
    include: {
      practiceAreas: {
        include: { practiceArea: { select: { id: true, name: true, jurisdiction: true } } },
      },
      user: { select: { subscriptionStatus: true } },
    },
  });
  if (!pro) return null;

  const practiceAreaIds = pro.practiceAreas.map((p) => p.practiceAreaId);

  const piOk =
    !!pro.piPolicyExpiresAt && pro.piPolicyExpiresAt.getTime() > Date.now();
  const subscribed = hasActiveProSubscription(pro.user.subscriptionStatus);

  // Resolve the first blocking condition so the banner shows one reason,
  // not a pileup. Order mirrors the user's journey: verification →
  // insurance → self-paused → subscription.
  const blockReason: "unverified" | "pi" | "paused" | "unsubscribed" | null =
    !pro.verifiedAt
      ? "unverified"
      : !piOk
        ? "pi"
        : !pro.acceptingNewMatters
          ? "paused"
          : !subscribed
            ? "unsubscribed"
            : null;
  const canAccept = blockReason === null;

  const [available, mine] = await Promise.all([
    prisma.proMatter.findMany({
      where: {
        status: ProMatterStatus.AWAITING_PRO,
        practiceAreaId: { in: practiceAreaIds },
        jurisdiction: pro.admissionJurisdiction,
      },
      include: { practiceArea: { select: { name: true, jurisdiction: true } } },
      orderBy: { postedAt: "asc" },
    }),
    prisma.proMatter.findMany({
      where: { acceptedByProId: pro.id, status: { notIn: [ProMatterStatus.CLOSED, ProMatterStatus.CANCELLED] } },
      include: { practiceArea: { select: { name: true, jurisdiction: true } } },
      orderBy: { acceptedAt: "desc" },
    }),
  ]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
      {blockReason && (
        <div className="mb-8 rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-amber-800">
            Acceptance blocked
          </p>
          <p className="mt-2 text-sm text-amber-900">
            {blockReason === "unverified" &&
              "Your profile is pending verification by a Marco Reid admin."}
            {blockReason === "pi" &&
              "Your professional indemnity insurance is missing or expired — please update it before accepting matters."}
            {blockReason === "paused" &&
              "You have turned off new matter acceptance in settings."}
            {blockReason === "unsubscribed" &&
              "An active marketplace subscription is required to accept matters."}
          </p>
          {blockReason === "unsubscribed" && (
            <Link
              href="/pro-pricing"
              className="mt-3 inline-flex items-center rounded-lg bg-amber-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-amber-800"
            >
              Choose a plan
            </Link>
          )}
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <div>
          <section>
            <div className="flex items-center justify-between">
              <h1 className="font-serif text-3xl text-navy-800">Available matters</h1>
              <span className="text-sm text-navy-400">{available.length} waiting</span>
            </div>
            <p className="mt-2 text-sm text-navy-500">
              New matters posted by citizens in your practice areas and jurisdiction.
              Review, accept, or pass. Accepting locks this matter to you until
              sign-off or cancellation.
            </p>

            {available.length === 0 ? (
              <div className="mt-6 rounded-2xl border border-dashed border-navy-200 bg-white p-10 text-center">
                <p className="font-serif text-lg text-navy-700">No matters waiting.</p>
                <p className="mt-2 text-sm text-navy-500">
                  We&rsquo;ll surface new matters here as they&rsquo;re posted.
                </p>
              </div>
            ) : (
              <ul className="mt-6 space-y-4">
                {available.map((m) => (
                  <li
                    key={m.id}
                    className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="text-xs uppercase tracking-wider text-plum-500">
                          {m.practiceArea.name} &middot; {m.practiceArea.jurisdiction}
                        </p>
                        <p className="mt-2 font-serif text-lg text-navy-800">
                          {m.summary}
                        </p>
                      </div>
                      <span className="rounded-full bg-gold-100 px-3 py-1 text-xs font-semibold text-gold-800">
                        Lead fee {formatFee(m.leadFeeInCents, m.currency)}
                      </span>
                    </div>
                    <p className="mt-4 whitespace-pre-wrap rounded-lg bg-navy-50 p-4 text-sm text-navy-600">
                      {m.details.length > 500 ? m.details.slice(0, 500) + "…" : m.details}
                    </p>
                    <ProActionButtons matterId={m.id} canAccept={canAccept} />
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="mt-12">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-2xl text-navy-800">Your active matters</h2>
              <span className="text-sm text-navy-400">{mine.length} in progress</span>
            </div>
            {mine.length === 0 ? (
              <p className="mt-4 text-sm text-navy-500">
                No matters currently accepted.
              </p>
            ) : (
              <ul className="mt-4 space-y-3">
                {mine.map((m) => (
                  <li
                    key={m.id}
                    className="flex items-center justify-between rounded-xl border border-navy-100 bg-white p-4"
                  >
                    <div>
                      <p className="text-xs uppercase tracking-wider text-navy-400">
                        {m.practiceArea.name}
                      </p>
                      <p className="mt-1 text-sm text-navy-700">{m.summary}</p>
                    </div>
                    <Link
                      href={`/pro-matter/${m.id}`}
                      className="text-sm font-semibold text-navy-600 hover:text-navy-800"
                    >
                      Open &rarr;
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-navy-100 bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
              Your practice areas
            </p>
            <ul className="mt-3 space-y-2">
              {pro.practiceAreas.length === 0 ? (
                <li className="text-xs text-navy-400">None yet — contact support.</li>
              ) : (
                pro.practiceAreas.map((p) => (
                  <li key={p.practiceAreaId} className="text-sm text-navy-700">
                    {p.practiceArea.name}{" "}
                    <span className="text-xs text-navy-400">
                      &middot; {p.practiceArea.jurisdiction}
                    </span>
                  </li>
                ))
              )}
            </ul>
          </div>
          <div className="rounded-2xl border border-navy-100 bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
              PI insurance
            </p>
            <p className="mt-2 text-sm text-navy-700">
              {pro.piPolicyExpiresAt
                ? `Expires ${new Date(pro.piPolicyExpiresAt).toLocaleDateString()}`
                : "Not on file"}
            </p>
            <p className="mt-1 text-xs text-navy-400">
              {piOk ? "Valid" : "Action required"}
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
