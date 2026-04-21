import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ProMatterStatus, SignoffStatus } from "@prisma/client";
import { formatFee } from "@/lib/marketplace/format";
import { MATTER_STATUS_PRESENTATION } from "@/lib/marketplace/matter-status";

export const metadata = { title: "Matters — Admin — Marco Reid" };

export const dynamic = "force-dynamic";

const STALE_HOURS = 48;
const MATTER_PAGE_SIZE = 200;

function relative(d: Date | null | undefined): string {
  if (!d) return "—";
  const ms = Date.now() - new Date(d).getTime();
  const h = Math.floor(ms / (1000 * 60 * 60));
  if (h < 1) return "just now";
  if (h < 24) return `${h}h ago`;
  const days = Math.floor(h / 24);
  return `${days}d ago`;
}

export default async function AdminMattersPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");
  if ((session.user as { role?: string }).role !== "ADMIN") redirect("/dashboard");

  const staleBefore = new Date(Date.now() - STALE_HOURS * 60 * 60 * 1000);

  const [active, stuck, statusGroups, pendingSignoffs] = await Promise.all([
    prisma.proMatter.findMany({
      where: {
        status: { notIn: [ProMatterStatus.CLOSED, ProMatterStatus.CANCELLED] },
      },
      include: {
        practiceArea: { select: { name: true, slug: true, jurisdiction: true } },
        citizen: { select: { email: true, name: true } },
        acceptedBy: { select: { displayName: true, professionalBody: true } },
      },
      orderBy: { createdAt: "desc" },
      take: MATTER_PAGE_SIZE,
    }),
    prisma.proMatter.findMany({
      where: {
        status: ProMatterStatus.AWAITING_PRO,
        postedAt: { lt: staleBefore },
      },
      include: {
        practiceArea: { select: { name: true, jurisdiction: true } },
        citizen: { select: { email: true, name: true } },
      },
      orderBy: { postedAt: "asc" },
      take: MATTER_PAGE_SIZE,
    }),
    prisma.proMatter.groupBy({
      by: ["status"],
      _count: { _all: true },
    }),
    prisma.signoffRequest.count({
      where: { status: SignoffStatus.PENDING },
    }),
  ]);

  const byStatus = new Map<ProMatterStatus, number>(
    statusGroups.map((g) => [g.status, g._count._all]),
  );
  const countFor = (s: ProMatterStatus) => byStatus.get(s) ?? 0;

  const counts = {
    total: statusGroups.reduce((acc, g) => acc + g._count._all, 0),
    draft: countFor(ProMatterStatus.DRAFT),
    awaiting: countFor(ProMatterStatus.AWAITING_PRO),
    accepted: countFor(ProMatterStatus.ACCEPTED),
    awaitingSignoff: countFor(ProMatterStatus.AWAITING_SIGNOFF),
    signedOff: countFor(ProMatterStatus.SIGNED_OFF),
    cancelled: countFor(ProMatterStatus.CANCELLED),
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 lg:px-12">
      <nav className="mb-4 text-sm">
        <Link href="/admin" className="text-navy-500 hover:text-navy-700">
          &larr; Admin home
        </Link>
      </nav>

      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-plum-600">
        Admin &middot; Marketplace
      </p>
      <h1 className="mt-1 font-serif text-display text-navy-800">
        Matters
      </h1>
      <p className="mt-2 text-navy-400">
        Every citizen-posted matter across the marketplace. Spot stalled matters, check the sign-off backlog.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard label="Total" value={counts.total} tone="navy" />
        <MetricCard label="Waiting for a pro" value={counts.awaiting} tone="amber" note={`${stuck.length} stuck > ${STALE_HOURS}h`} />
        <MetricCard label="Active with pro" value={counts.accepted + counts.awaitingSignoff} tone="forest" note={`${counts.awaitingSignoff} in sign-off`} />
        <MetricCard label="Pending sign-offs" value={pendingSignoffs} tone="plum" />
      </div>

      {stuck.length > 0 && (
        <section className="mt-10">
          <h2 className="font-serif text-2xl text-navy-800">
            Stalled matters
          </h2>
          <p className="mt-2 text-sm text-navy-500">
            Posted more than {STALE_HOURS} hours ago and still unaccepted. Consider direct outreach or broadening the practice area pool.
          </p>
          <ul className="mt-5 space-y-3">
            {stuck.map((m) => (
              <li
                key={m.id}
                className="rounded-2xl border border-amber-200 bg-amber-50 p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-amber-700">
                      {m.practiceArea.name} &middot; {m.practiceArea.jurisdiction}
                    </p>
                    <p className="mt-1 font-serif text-lg text-navy-800">
                      {m.summary}
                    </p>
                    <p className="mt-1 text-xs text-navy-500">
                      {m.citizen.name || m.citizen.email} · posted {relative(m.postedAt)}
                    </p>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-amber-800">
                    {formatFee(m.leadFeeInCents, m.currency)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-12">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-2xl text-navy-800">
            All active matters
          </h2>
          <span className="text-sm text-navy-400">{active.length} live</span>
        </div>

        {active.length === 0 ? (
          <div className="mt-5 rounded-2xl border border-dashed border-navy-200 bg-white p-10 text-center">
            <p className="text-sm text-navy-500">
              No active matters right now.
            </p>
          </div>
        ) : (
          <div className="mt-5 overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-card">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-navy-100 bg-navy-50/50">
                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-navy-400">
                      Matter
                    </th>
                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-navy-400">
                      Citizen
                    </th>
                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-navy-400">
                      Pro
                    </th>
                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-navy-400">
                      Status
                    </th>
                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-navy-400">
                      Posted
                    </th>
                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-navy-400">
                      Fee
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {active.map((m) => (
                    <tr
                      key={m.id}
                      className="border-b border-navy-50 last:border-b-0 hover:bg-navy-50/50"
                    >
                      <td className="px-5 py-4">
                        <p className="text-xs uppercase tracking-wider text-plum-500">
                          {m.practiceArea.name} &middot; {m.practiceArea.jurisdiction}
                        </p>
                        <p className="mt-1 max-w-md truncate font-medium text-navy-700">
                          {m.summary}
                        </p>
                      </td>
                      <td className="px-5 py-4 text-navy-500">
                        <p className="text-xs">{m.citizen.name || "—"}</p>
                        <p className="text-xs text-navy-400">{m.citizen.email}</p>
                      </td>
                      <td className="px-5 py-4 text-navy-500">
                        {m.acceptedBy ? (
                          <>
                            <p className="text-xs font-medium text-navy-700">
                              {m.acceptedBy.displayName}
                            </p>
                            <p className="text-xs text-navy-400">
                              {m.acceptedBy.professionalBody}
                            </p>
                          </>
                        ) : (
                          <span className="text-xs text-navy-400">—</span>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${MATTER_STATUS_PRESENTATION[m.status].tone}`}
                        >
                          {MATTER_STATUS_PRESENTATION[m.status].label.toLowerCase()}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-xs text-navy-400">
                        {relative(m.postedAt)}
                      </td>
                      <td className="px-5 py-4 text-xs font-semibold text-navy-600">
                        {formatFee(m.leadFeeInCents, m.currency)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>

      <section className="mt-12">
        <h2 className="font-serif text-2xl text-navy-800">Totals by status</h2>
        <dl className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { k: "Draft", v: counts.draft },
            { k: "Awaiting pro", v: counts.awaiting },
            { k: "Accepted", v: counts.accepted },
            { k: "Awaiting sign-off", v: counts.awaitingSignoff },
            { k: "Signed off", v: counts.signedOff },
            { k: "Cancelled", v: counts.cancelled },
          ].map((r) => (
            <div
              key={r.k}
              className="flex items-baseline justify-between rounded-xl border border-navy-100 bg-white p-4"
            >
              <dt className="text-sm text-navy-500">{r.k}</dt>
              <dd className="font-serif text-2xl text-navy-800 tabular-nums">
                {r.v}
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}

function MetricCard({
  label,
  value,
  tone,
  note,
}: {
  label: string;
  value: number;
  tone: "navy" | "amber" | "forest" | "plum";
  note?: string;
}) {
  const toneMap = {
    navy: "border-navy-100",
    amber: "border-amber-200 bg-amber-50/30",
    forest: "border-forest-200 bg-forest-50/30",
    plum: "border-plum-200 bg-plum-50/30",
  };
  return (
    <div className={`rounded-2xl border bg-white p-5 shadow-card ${toneMap[tone]}`}>
      <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
        {label}
      </p>
      <p className="mt-2 font-serif text-3xl text-navy-800 tabular-nums">
        {value}
      </p>
      {note && <p className="mt-1 text-xs text-navy-400">{note}</p>}
    </div>
  );
}
