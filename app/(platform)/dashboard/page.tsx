import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

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
    upcomingDeadlines,
    overdueDeadlines,
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
    prisma.deadline.count({
      where: { userId, status: { notIn: ["completed", "waived"] } },
    }),
    prisma.deadline.count({
      where: {
        userId,
        status: { notIn: ["completed", "waived"] },
        dueDate: { lt: new Date(now.getFullYear(), now.getMonth(), now.getDate()) },
      },
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
      highlight: false,
    },
    {
      label: "Hours this week",
      value: formatHours(weekHours),
      note: `${formatHours(weekBillableHours)} billable`,
      highlight: false,
    },
    {
      label: "Revenue (month)",
      value: formatCurrency(monthRevenue),
      note: "From billable time",
      highlight: false,
    },
    {
      label: "Trust balance",
      value: formatCurrency(trustTotal),
      note: `${trustAccounts.length} ${trustAccounts.length === 1 ? "account" : "accounts"}`,
      highlight: false,
    },
    {
      label: "Upcoming deadlines",
      value: String(upcomingDeadlines),
      note: overdueDeadlines > 0 ? `${overdueDeadlines} overdue` : "All on track",
      highlight: overdueDeadlines > 0,
    },
  ];

  const quickActions = [
    { label: "New matter", href: "/matters/new", accent: "plum" },
    { label: "New client", href: "/clients/new", accent: "forest" },
    { label: "Log time", href: "/matters", accent: "navy" },
    { label: "Ask Marco", href: "/marco", accent: "plum" },
  ];

  const sections = [
    {
      label: "Practice",
      items: [
        { title: "Matters", href: "/matters", count: totalMatters, icon: "briefcase" },
        { title: "Clients", href: "/clients", count: totalClients, icon: "users" },
        { title: "Documents", href: "/documents", count: totalDocuments, icon: "file" },
        { title: "Deadlines", href: "/deadlines", count: upcomingDeadlines, icon: "calendar" },
        { title: "Conflicts", href: "/conflicts", count: null, icon: "shield" },
      ],
    },
    {
      label: "Financial",
      items: [
        { title: "Time & Billing", href: "/time", count: null, icon: "clock" },
        { title: "Invoices", href: "/billing/invoices", count: null, icon: "receipt" },
        { title: "Trust Accounts", href: "/trust", count: trustAccounts.length, icon: "vault" },
        { title: "Payroll", href: "/payroll", count: null, icon: "calculator" },
        { title: "Tax Calculator", href: "/tax-calculator", count: null, icon: "percent" },
        { title: "Bank Feeds", href: "/bank-feeds", count: null, icon: "bank" },
      ],
    },
    {
      label: "AI & Research",
      items: [
        { title: "Ask Marco", href: "/marco", count: null, icon: "brain" },
        { title: "Voice", href: "/voice", count: null, icon: "mic" },
        { title: "Predictions", href: "/predictions", count: null, icon: "chart" },
        { title: "Intelligence", href: "/intelligence", count: null, icon: "zap" },
        { title: "Practice Analytics", href: "/practice-intelligence", count: null, icon: "bar-chart" },
      ],
    },
    {
      label: "Compliance",
      items: [
        { title: "E-Signatures", href: "/signatures", count: null, icon: "pen" },
        { title: "Court E-Filing", href: "/efiling", count: null, icon: "gavel" },
        { title: "Regulatory Alerts", href: "/alerts", count: null, icon: "bell" },
        { title: "Audit Trail", href: "/audit", count: null, icon: "lock" },
      ],
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 lg:px-12">
      {/* Greeting */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm text-navy-400">
            {new Intl.DateTimeFormat("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            }).format(now)}
          </p>
          <h1 className="mt-1 font-serif text-display text-navy-800">
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
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
              {stat.label}
            </p>
            <p className="mt-3 font-serif text-4xl text-navy-800">
              {stat.value}
            </p>
            <p className={`mt-1 text-sm ${stat.highlight ? "font-semibold text-red-600" : "text-navy-400"}`}>
              {stat.note}
            </p>
          </div>
        ))}
      </div>

      {/* Marco prompt */}
      <div className="mt-8">
        <Link
          href="/marco"
          className="group block overflow-hidden rounded-2xl border border-plum-200 bg-gradient-to-br from-plum-50 to-white p-8 shadow-card transition-all hover:border-plum-400 hover:shadow-card-hover"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-plum-600">
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
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-plum-500 text-white transition-transform group-hover:translate-x-1">
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
        {sections.map((section) => (
          <div key={section.label} className="mt-8">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-navy-400 dark:text-navy-500">
              {section.label}
            </h3>
            <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {section.items.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="flex items-center justify-between rounded-xl border border-navy-100 bg-white p-4 shadow-card transition-all hover:shadow-card-hover hover:-translate-y-0.5 dark:border-navy-700 dark:bg-navy-800"
                >
                  <span className="text-sm font-medium text-navy-700 dark:text-navy-200">{item.title}</span>
                  {item.count != null && (
                    <span className="rounded-full bg-navy-50 px-2.5 py-0.5 text-xs font-medium text-navy-400 dark:bg-navy-700 dark:text-navy-300">
                      {item.count}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
