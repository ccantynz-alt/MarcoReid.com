import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import DisciplineModules, { detectDiscipline } from "./DisciplineModules";
import SignoffInbox from "./SignoffInbox";

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

function timeAgo(d: Date) {
  const now = Date.now();
  const diffMs = now - d.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return "Just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHrs = Math.floor(diffMin / 60);
  if (diffHrs < 24) return `${diffHrs}h ago`;
  const diffDays = Math.floor(diffHrs / 24);
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  return formatDate(d);
}

function SparkLine({ data, color, id }: { data: number[]; color: string; id: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 140;
  const h = 36;
  const pad = 2;
  const coords = data.map((v, i) => ({
    x: pad + (i / (data.length - 1)) * (w - pad * 2),
    y: pad + (h - pad * 2) - ((v - min) / range) * (h - pad * 2),
  }));
  const points = coords.map((c) => `${c.x},${c.y}`).join(" ");
  const lastPoint = coords[coords.length - 1];
  // Create area fill path
  const areaPath = `M ${coords[0].x},${coords[0].y} ${coords.map((c) => `L ${c.x},${c.y}`).join(" ")} L ${lastPoint.x},${h} L ${coords[0].x},${h} Z`;
  const gradientId = `spark-grad-${id}`;
  return (
    <svg width={w} height={h} className="mt-3" style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.15" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill={`url(#${gradientId})`} />
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Glowing end-point dot */}
      <circle cx={lastPoint.x} cy={lastPoint.y} r="4" fill={color} opacity="0.2" className="sparkline-pulse" />
      <circle cx={lastPoint.x} cy={lastPoint.y} r="2.5" fill={color} />
    </svg>
  );
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

  const userData = await prisma.user.findUnique({
    where: { id: userId },
    select: { practiceArea: true },
  });

  const discipline = detectDiscipline(userData?.practiceArea);

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
      id: "matters",
      label: "Active matters",
      value: String(activeMatters),
      note: `${totalMatters} total`,
      highlight: false,
      spark: [12, 14, 13, 15, 16, 15, 18],
      sparkColor: "var(--color-navy-500)",
      accentColor: "navy",
      trend: "+20%",
      trendUp: true,
    },
    {
      id: "hours",
      label: "Hours this week",
      value: formatHours(weekHours),
      note: `${formatHours(weekBillableHours)} billable`,
      highlight: false,
      spark: [32, 28, 35, 30, 38, 33, 36],
      sparkColor: "var(--color-forest-500)",
      accentColor: "forest",
      trend: "+9%",
      trendUp: true,
    },
    {
      id: "revenue",
      label: "Revenue (month)",
      value: formatCurrency(monthRevenue),
      note: "From billable time",
      highlight: false,
      spark: [42, 45, 41, 48, 52, 50, 55],
      sparkColor: "var(--color-forest-500)",
      accentColor: "forest",
      trend: "+10%",
      trendUp: true,
    },
    {
      id: "trust",
      label: "Trust balance",
      value: formatCurrency(trustTotal),
      note: `${trustAccounts.length} ${trustAccounts.length === 1 ? "account" : "accounts"}`,
      highlight: false,
      spark: [120, 118, 125, 122, 130, 128, 135],
      sparkColor: "var(--color-navy-500)",
      accentColor: "navy",
      trend: "+5%",
      trendUp: true,
    },
    {
      id: "deadlines",
      label: "Upcoming deadlines",
      value: String(upcomingDeadlines),
      note: overdueDeadlines > 0 ? `${overdueDeadlines} overdue` : "All on track",
      highlight: overdueDeadlines > 0,
      spark: [5, 3, 4, 2, 3, 1, 2],
      sparkColor: "var(--color-gold-500)",
      accentColor: "gold",
      trend: "-60%",
      trendUp: false,
    },
  ];

  const quickActions =
    discipline === "ACCOUNTING"
      ? [
          { label: "New client", href: "/clients/new", accent: "forest" },
          { label: "Log expense", href: "/bank-feeds", accent: "navy" },
          { label: "Bank reconciliation", href: "/bank-feeds", accent: "navy" },
          { label: "Ask Marco", href: "/marco/accounting", accent: "plum" },
        ]
      : [
          { label: "New matter", href: "/matters/new", accent: "plum" },
          { label: "New client", href: "/clients/new", accent: "forest" },
          { label: "Log time", href: "/matters", accent: "navy" },
          { label: "Ask Marco", href: "/marco", accent: "plum" },
        ];

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 lg:px-12">
      {/* Quick Stats Banner */}
      <div className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-2 rounded-xl bg-gradient-to-r from-navy-600 via-navy-500 to-navy-600 px-6 py-3 text-sm text-white shadow-lg">
        <span className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-forest-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-forest-400" />
          </span>
          <span className="font-medium">Live</span>
        </span>
        <span className="hidden h-4 w-px bg-white/20 sm:block" />
        <span className="text-white/70">
          {new Intl.DateTimeFormat("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          }).format(now)}
        </span>
        <span className="hidden h-4 w-px bg-white/20 sm:block" />
        <span className="font-semibold">{activeMatters} active matters</span>
        <span className="hidden h-4 w-px bg-white/20 sm:block" />
        <span className={overdueDeadlines > 0 ? "font-semibold text-gold-300" : "text-forest-300"}>
          {overdueDeadlines > 0
            ? `${overdueDeadlines} overdue deadlines`
            : "All deadlines on track"}
        </span>
        <span className="hidden h-4 w-px bg-white/20 sm:block" />
        <span>Trust: <span className="font-semibold tabular-nums">{formatCurrency(trustTotal)}</span></span>
      </div>

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
          <div className="mt-1 flex flex-wrap items-baseline gap-3">
            <h1 className="font-serif text-display text-navy-800">
              Welcome back{firstName ? `, ${firstName}` : ""}.
            </h1>
            {discipline === "LEGAL" && (
              <span className="inline-flex items-center rounded-full bg-forest-50 px-3 py-1 text-xs font-semibold text-forest-700">
                Legal practice
              </span>
            )}
            {discipline === "ACCOUNTING" && (
              <span className="inline-flex items-center rounded-full bg-forest-50 px-3 py-1 text-xs font-semibold text-forest-700">
                Accounting practice
              </span>
            )}
            {discipline === "GENERAL" && !userData?.practiceArea && (
              <Link
                href="/onboarding"
                className="inline-flex items-center rounded-full bg-gold-50 px-3 py-1 text-xs font-semibold text-gold-700 transition-colors hover:bg-gold-100"
              >
                Complete your profile →
              </Link>
            )}
          </div>
          <p className="mt-1 text-sm text-navy-500">
            {discipline === "LEGAL"
              ? "Your practice dashboard."
              : discipline === "ACCOUNTING"
                ? "Your accounting intelligence hub."
                : "Your professional practice hub."}
          </p>
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
            className={`group relative overflow-hidden rounded-2xl border border-navy-100 bg-white p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5`}
          >
            {/* Accent top bar */}
            <div
              className={`absolute inset-x-0 top-0 h-1 ${
                stat.accentColor === "navy"
                  ? "bg-gradient-to-r from-navy-400 to-navy-600"
                  : stat.accentColor === "forest"
                    ? "bg-gradient-to-r from-forest-400 to-forest-600"
                    : "bg-gradient-to-r from-gold-400 to-gold-600"
              }`}
            />
            <div className="flex items-start justify-between">
              <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
                {stat.label}
              </p>
              {/* Trend badge */}
              <span
                className={`inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                  stat.id === "deadlines"
                    ? stat.trendUp
                      ? "bg-red-50 text-red-600"
                      : "bg-forest-50 text-forest-600"
                    : stat.trendUp
                      ? "bg-forest-50 text-forest-600"
                      : "bg-red-50 text-red-600"
                }`}
              >
                <svg
                  viewBox="0 0 12 12"
                  className={`h-2.5 w-2.5 ${stat.trendUp ? "" : "rotate-180"}`}
                  fill="none"
                >
                  <path d="M6 2.5v7M6 2.5L3 5.5M6 2.5l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {stat.trend}
              </span>
            </div>
            <p className="mt-3 font-serif text-4xl tabular-nums text-navy-800">
              {stat.value}
            </p>
            <p className={`mt-1 text-sm ${stat.highlight ? "font-semibold text-red-600" : "text-navy-400"}`}>
              {stat.note}
            </p>
            <SparkLine data={stat.spark} color={stat.sparkColor} id={stat.id} />
          </div>
        ))}
      </div>

      {/* Sign-off inbox — only renders if user has a Professional record */}
      <SignoffInbox />

      {/* Marco prompt */}
      <div className="mt-8">
        <Link
          href="/marco"
          className="group relative block overflow-hidden rounded-2xl border border-plum-200 bg-gradient-to-br from-plum-50 via-white to-plum-50/30 p-8 shadow-card transition-all duration-300 hover:border-plum-400 hover:shadow-card-hover hover:-translate-y-0.5"
        >
          {/* Subtle background glow */}
          <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-plum-100/40 blur-3xl transition-all duration-500 group-hover:bg-plum-200/60" />
          <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-gold-100/30 blur-3xl" />
          <div className="relative flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-plum-600">
                  Ask Marco
                </p>
                <span className="inline-flex items-center gap-1 rounded-full bg-plum-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-plum-600">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-plum-400 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-plum-500" />
                  </span>
                  Ready
                </span>
              </div>
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
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-plum-500 text-white shadow-lg transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110 group-hover:shadow-plum-500/30">
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

      {/* Recent Messages */}
      <section className="mt-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="font-serif text-headline text-navy-800">
              Recent Messages
            </h2>
            <span className="inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1.5 text-[10px] font-bold leading-none text-white">
              3
            </span>
          </div>
          <Link
            href="/messages"
            className="text-sm font-medium text-navy-500 hover:text-navy-700"
          >
            View all &rarr;
          </Link>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {[
            {
              id: "msg-1",
              from: "Aroha Patel",
              initials: "AP",
              subject: "Visa Application Update",
              preview: "I have uploaded the additional documents you requested for the visa application.",
              time: "12m ago",
              unread: true,
              encrypted: true,
            },
            {
              id: "msg-2",
              from: "James Chen",
              initials: "JC",
              subject: "Thornton Acquisition - Tax",
              preview: "The section 1031 exchange analysis is complete. I am attaching the memo for your review.",
              time: "3h ago",
              unread: true,
              encrypted: true,
            },
            {
              id: "msg-3",
              from: "Sarah Mitchell",
              initials: "SM",
              subject: "Trust Reconciliation",
              preview: "March reconciliation is complete. All balances verified. Report attached.",
              time: "1d ago",
              unread: true,
              encrypted: false,
            },
          ].map((msg) => (
            <Link
              key={msg.id}
              href="/messages"
              className="group relative overflow-hidden rounded-2xl border border-navy-100 bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover"
            >
              {msg.unread && (
                <span className="absolute left-0 top-0 h-full w-1 bg-red-500 rounded-l-2xl" />
              )}
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-navy-100 font-serif text-sm font-semibold text-navy-600">
                  {msg.initials}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-bold text-navy-800">
                      {msg.from}
                    </p>
                    <span className="flex-shrink-0 text-[11px] tabular-nums text-navy-400">
                      {msg.time}
                    </span>
                  </div>
                  <p className="mt-0.5 truncate text-xs font-medium text-navy-600">
                    {msg.subject}
                  </p>
                </div>
              </div>
              <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-navy-400">
                {msg.preview}
              </p>
              <div className="mt-3 flex items-center gap-2">
                {msg.encrypted && (
                  <span className="flex items-center gap-1 text-[10px] text-forest-600">
                    <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2.5" y="5" width="7" height="5.5" rx="1" />
                      <path d="M4 5V3.5a2 2 0 014 0V5" />
                    </svg>
                    Encrypted
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent Activity Feed */}
      <section className="mt-8">
        <div className="flex items-center gap-3">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-navy-400">
            Recent Activity
          </h2>
          <div className="h-px flex-1 bg-navy-100" />
          <span className="flex items-center gap-1.5 text-xs text-navy-400">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-forest-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-forest-400" />
            </span>
            Updating
          </span>
        </div>
        <div className="relative mt-4">
          {/* Timeline connector line */}
          <div className="absolute left-[17px] top-4 bottom-4 w-px bg-gradient-to-b from-navy-200 via-navy-100 to-transparent" />
          <div className="space-y-2">
            {(() => {
              type ActivityItem = {
                id: string;
                kind: "matter" | "time";
                title: string;
                subtitle: string;
                href: string;
                date: Date;
                dotColor: string;
                icon: string;
              };
              const items: ActivityItem[] = [
                ...recentMatters.map((m) => ({
                  id: `m-${m.id}`,
                  kind: "matter" as const,
                  title: `Matter updated: ${m.title}`,
                  subtitle: m.client.name,
                  href: `/matters/${m.id}`,
                  date: m.updatedAt,
                  dotColor: "bg-plum-500",
                  icon: "matter",
                })),
                ...recentTimeEntries.map((t) => ({
                  id: `t-${t.id}`,
                  kind: "time" as const,
                  title: `Time logged: ${formatHours(t.minutes)} on ${t.matter.title}`,
                  subtitle: t.description || "No description",
                  href: `/matters`,
                  date: t.createdAt,
                  dotColor: "bg-forest-500",
                  icon: "time",
                })),
              ];
              items.sort(
                (a, b) => b.date.getTime() - a.date.getTime(),
              );
              const top8 = items.slice(0, 8);

              if (top8.length === 0) {
                return (
                  <p className="text-sm text-navy-400">
                    No recent activity to show.
                  </p>
                );
              }

              return top8.map((item, idx) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="group relative flex items-start gap-4 rounded-xl border border-transparent bg-white px-5 py-4 transition-all duration-200 hover:border-navy-100 hover:shadow-card-hover hover:-translate-y-0.5"
                >
                  {/* Activity icon circle */}
                  <span className="relative z-10 flex h-[34px] w-[34px] flex-shrink-0 items-center justify-center rounded-full border-2 border-white bg-white shadow-sm">
                    <span
                      className={`flex h-6 w-6 items-center justify-center rounded-full ${
                        item.kind === "matter"
                          ? "bg-plum-50 text-plum-500"
                          : "bg-forest-50 text-forest-500"
                      }`}
                    >
                      {item.kind === "matter" ? (
                        <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none">
                          <path d="M2 4a2 2 0 012-2h3l2 2h3a2 2 0 012 2v5a2 2 0 01-2 2H4a2 2 0 01-2-2V4z" stroke="currentColor" strokeWidth="1.5" />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none">
                          <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
                          <path d="M8 5v3l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                      )}
                    </span>
                  </span>
                  <div className="min-w-0 flex-1 pt-1">
                    <p className="truncate text-sm font-medium text-navy-700 group-hover:text-navy-900">
                      {item.title}
                    </p>
                    <p className="mt-0.5 text-xs text-navy-400">
                      {item.subtitle}
                    </p>
                  </div>
                  <span className="flex-shrink-0 pt-1.5 text-xs tabular-nums text-navy-300 group-hover:text-navy-500">
                    {timeAgo(item.date)}
                  </span>
                </Link>
              ));
            })()}
          </div>
        </div>
      </section>

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

      {/* Discipline-specific module grid */}
      <DisciplineModules practiceArea={userData?.practiceArea} />
    </div>
  );
}
