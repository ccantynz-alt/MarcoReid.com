import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import MorningBriefing from "@/app/components/platform/MorningBriefing";

export const dynamic = "force-dynamic";

function formatCurrency(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

function formatHours(minutes: number) {
  const hours = minutes / 60;
  if (hours >= 10) return `${Math.round(hours)}h`;
  return `${hours.toFixed(1)}h`;
}

function formatDate(d: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(d);
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) redirect("/login");

  // Date boundaries
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const [
    activeMatters,
    totalMatters,
    totalClients,
    totalDocuments,
    weekTimeEntries,
    monthTimeEntries,
    trustAccounts,
    recentMatters,
    recentTimeEntries,
  ] = await Promise.all([
    prisma.matter.count({ where: { userId, status: "ACTIVE" } }),
    prisma.matter.count({ where: { userId } }),
    prisma.client.count({ where: { userId } }),
    prisma.document.count({ where: { userId } }),
    prisma.timeEntry.findMany({
      where: { userId, date: { gte: startOfWeek } },
      select: { minutes: true, rateInCents: true, billable: true },
    }),
    prisma.timeEntry.findMany({
      where: { userId, date: { gte: startOfMonth } },
      select: { minutes: true, rateInCents: true, billable: true, invoiced: true },
    }),
    prisma.trustAccount.findMany({
      where: { userId },
      select: { balanceInCents: true },
    }),
    prisma.matter.findMany({
      where: { userId },
      include: { client: { select: { name: true } } },
      orderBy: { updatedAt: "desc" },
      take: 4,
    }),
    prisma.timeEntry.findMany({
      where: { userId },
      include: { matter: { select: { title: true } } },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ]);

  const weekHours = weekTimeEntries.reduce((sum, t) => sum + t.minutes, 0);
  const weekBillableHours = weekTimeEntries
    .filter((t) => t.billable)
    .reduce((sum, t) => sum + t.minutes, 0);
  const monthRevenue = monthTimeEntries
    .filter((t) => t.billable)
    .reduce((sum, t) => sum + (t.minutes / 60) * t.rateInCents, 0);
  const trustTotal = trustAccounts.reduce(
    (sum, a) => sum + a.balanceInCents,
    0,
  );

  const firstName = session?.user?.name?.split(" ")[0] || "";

  const stats = [
    {
      label: "Active matters",
      value: String(activeMatters),
      note: `${totalMatters} total`,
    },
    {
      label: "Hours this week",
      value: formatHours(weekHours),
      note: `${formatHours(weekBillableHours)} billable`,
    },
    {
      label: "Revenue (month)",
      value: formatCurrency(monthRevenue),
      note: "From billable time",
    },
    {
      label: "Trust balance",
      value: formatCurrency(trustTotal),
      note: `${trustAccounts.length} ${trustAccounts.length === 1 ? "account" : "accounts"}`,
    },
  ];

  const quickActions = [
    { label: "New matter", href: "/matters/new", accent: "plum" },
    { label: "New client", href: "/clients/new", accent: "forest" },
    { label: "Log time", href: "/matters", accent: "navy" },
    { label: "Ask Marco", href: "/marco", accent: "plum" },
  ];

  const modules = [
    { title: "Matters", href: "/matters", count: totalMatters },
    { title: "Clients", href: "/clients", count: totalClients },
    { title: "Documents", href: "/documents", count: totalDocuments },
    { title: "Trust", href: "/trust", count: trustAccounts.length },
    { title: "Voice", href: "/voice", count: null },
    { title: "Billing", href: "/billing", count: null },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Greeting */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-500">
            {new Intl.DateTimeFormat("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            }).format(now)}
          </p>
          <h1 className="mt-2 font-serif text-display text-navy-800 dark:text-white">
            Welcome back{firstName ? `, ${firstName}` : ""}.
          </h1>
        </div>
        <div className="flex gap-2">
          {quickActions.map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className={`inline-flex min-h-touch items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
                action.accent === "plum"
                  ? "bg-plum-500 text-white hover:bg-plum-600"
                  : action.accent === "forest"
                    ? "bg-forest-500 text-white hover:bg-forest-600"
                    : "border border-navy-200 bg-white text-navy-700 hover:border-navy-400"
              }`}
            >
              {action.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card transition-all hover:shadow-card-hover dark:border-navy-700 dark:bg-navy-800"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gold-600 dark:text-gold-400">
              {stat.label}
            </p>
            <p className="mt-3 font-serif text-4xl text-navy-800 dark:text-white">
              {stat.value}
            </p>
            <p className="mt-1 text-sm text-navy-400">{stat.note}</p>
          </div>
        ))}
      </div>

      {/* Marco prompt */}
      <div className="mt-6">
        <Link
          href="/marco"
          className="group block overflow-hidden rounded-2xl border border-gold-200 bg-gradient-to-br from-gold-50 via-white to-plum-50 p-8 shadow-card transition-all hover:border-gold-400 hover:shadow-card-hover dark:border-gold-800 dark:from-navy-800 dark:via-navy-800 dark:to-navy-800"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-600 dark:text-gold-400">
                Ask Marco
              </p>
              <p className="mt-2 font-serif text-2xl text-navy-800">
                What would you like to research today?
              </p>
              <p className="mt-2 text-sm text-navy-500">
                Cross-domain legal and accounting research with verified
                citations. Press{" "}
                <kbd className="rounded border border-navy-200 bg-white px-1.5 py-0.5 font-mono text-xs text-navy-600">
                  ⌘K
                </kbd>{" "}
                anywhere to summon Marco.
              </p>
            </div>
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold-500 text-white transition-transform group-hover:translate-x-1">
              <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none">
                <path
                  d="M7 5l6 5-6 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
        </Link>
      </div>

      {/* Morning Briefing — listen to your news on the commute */}
      <div className="mt-6">
        <MorningBriefing />
      </div>

      {/* Activity + recent matters */}
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {/* Recent matters */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-headline text-navy-800">
              Recent matters
            </h2>
            <Link
              href="/matters"
              className="text-sm font-medium text-navy-500 hover:text-navy-700"
            >
              View all &rarr;
            </Link>
          </div>
          <div className="mt-4 overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-card">
            {recentMatters.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <p className="font-serif text-lg text-navy-700">
                  No matters yet.
                </p>
                <p className="mt-1 text-sm text-navy-400">
                  Open your first matter to see it here.
                </p>
                <Link
                  href="/matters/new"
                  className="mt-6 inline-flex items-center justify-center rounded-lg bg-navy-500 px-4 py-2 text-sm font-semibold text-white hover:bg-navy-600"
                >
                  New matter
                </Link>
              </div>
            ) : (
              <ul className="divide-y divide-navy-50">
                {recentMatters.map((m) => (
                  <li key={m.id}>
                    <Link
                      href={`/matters/${m.id}`}
                      className="flex items-center justify-between gap-4 px-6 py-4 transition-colors hover:bg-navy-50/50"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-medium text-navy-700">
                          {m.title}
                        </p>
                        <p className="mt-0.5 truncate text-sm text-navy-400">
                          {m.client.name}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 text-xs">
                        <span
                          className={`rounded-full px-2.5 py-0.5 font-medium ${
                            m.status === "ACTIVE"
                              ? "bg-forest-50 text-forest-600"
                              : m.status === "ON_HOLD"
                                ? "bg-navy-50 text-navy-500"
                                : "bg-plum-50 text-plum-600"
                          }`}
                        >
                          {m.status}
                        </span>
                        <span className="text-navy-400">
                          {formatDate(m.updatedAt)}
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Recent activity */}
        <div>
          <h2 className="font-serif text-headline text-navy-800">Activity</h2>
          <div className="mt-4 rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
            {recentTimeEntries.length === 0 ? (
              <div className="text-center">
                <p className="text-sm text-navy-400">No activity yet.</p>
                <p className="mt-1 text-xs text-navy-400">
                  Log time, open matters, or ask Marco — it all shows up here.
                </p>
              </div>
            ) : (
              <ul className="space-y-4">
                {recentTimeEntries.map((t) => (
                  <li key={t.id} className="flex gap-3">
                    <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-forest-500" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm text-navy-700">
                        {t.description}
                      </p>
                      <p className="mt-0.5 text-xs text-navy-400">
                        {formatHours(t.minutes)} on{" "}
                        <span className="text-navy-500">
                          {t.matter.title}
                        </span>{" "}
                        · {formatDate(t.createdAt)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Module grid */}
      <div className="mt-12">
        <h2 className="font-serif text-headline text-navy-800">Modules</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((mod) => (
            <Link
              key={mod.title}
              href={mod.href}
              className="group block rounded-2xl border border-navy-100 bg-white p-6 shadow-card transition-all hover:-translate-y-0.5 hover:border-navy-300 hover:shadow-card-hover"
            >
              <div className="flex items-center justify-between">
                <p className="font-semibold text-navy-700">{mod.title}</p>
                {mod.count != null && (
                  <span className="rounded-full bg-navy-50 px-2.5 py-0.5 text-xs font-medium text-navy-500">
                    {mod.count}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
