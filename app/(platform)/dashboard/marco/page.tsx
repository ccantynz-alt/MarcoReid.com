import { redirect } from "next/navigation";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import MarcoChat from "@/app/components/marco/MarcoChat";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Marco — Marco Reid",
  description:
    "Ask Marco anything. Cross-domain legal and accounting research with verified citations.",
};

const EXAMPLE_PROMPTS = [
  {
    domain: "Tax",
    title: "Section 83(b) elections for California startups",
    query:
      "What are the tax implications of Section 83(b) elections for a co-founder in California, and does the timing affect early-exercise ISOs?",
  },
  {
    domain: "Civil procedure",
    title: "FRCP 26(b)(1) eDiscovery amendments",
    query:
      "Summarise FRCP 26(b)(1) recent amendments affecting eDiscovery scope and proportionality.",
  },
  {
    domain: "Cross-domain",
    title: "R&D tax credit pre-incorporation",
    query:
      "Can I claim the R&D tax credit for software developed before incorporation, and what's the proper accounting treatment?",
  },
  {
    domain: "Corporate",
    title: "Delaware Chancery on DAO governance",
    query:
      "What's the latest on Delaware Court of Chancery rulings on DAO governance and fiduciary duties?",
  },
  {
    domain: "NZ tax",
    title: "GST on crypto staking rewards",
    query:
      "NZ GST treatment of cryptocurrency staking rewards for professional services firms.",
  },
  {
    domain: "IP",
    title: "USPTO continuation vs divisional",
    query:
      "Difference between USPTO continuation and divisional applications for a pending patent application.",
  },
];

function groupByTime(queries: { id: string; query: string; createdAt: Date; domain: string }[]) {
  const now = Date.now();
  const day = 24 * 60 * 60 * 1000;
  const groups: Record<string, typeof queries> = {
    Today: [],
    Yesterday: [],
    "Last 7 days": [],
    Older: [],
  };
  queries.forEach((q) => {
    const age = now - q.createdAt.getTime();
    if (age < day) groups.Today.push(q);
    else if (age < 2 * day) groups.Yesterday.push(q);
    else if (age < 7 * day) groups["Last 7 days"].push(q);
    else groups.Older.push(q);
  });
  return groups;
}

const domainColors: Record<string, string> = {
  LEGAL: "bg-navy-50 text-navy-600",
  ACCOUNTING: "bg-forest-50 text-forest-600",
  CROSS_DOMAIN: "bg-plum-50 text-plum-600",
  IP: "bg-gold-50 text-navy-600",
};

export default async function MarcoPage() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) redirect("/login");

  const recentQueries = await prisma.marcoQuery.findMany({
    where: { userId },
    select: { id: true, query: true, createdAt: true, domain: true },
    orderBy: { createdAt: "desc" },
    take: 30,
  });

  const grouped = groupByTime(recentQueries);
  const hasHistory = recentQueries.length > 0;

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-12">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-plum-600">
            Marco
          </p>
          <h1 className="mt-2 font-serif text-display text-navy-800">
            What would you like to research?
          </h1>
          <p className="mt-2 text-navy-500">
            Cross-domain legal and accounting research with verified citations.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        {/* Main chat */}
        <div>
          <MarcoChat />

          {/* Example prompts — shown alongside the chat */}
          <div className="mt-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
              Try asking Marco
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {EXAMPLE_PROMPTS.map((p) => (
                <div
                  key={p.title}
                  className="rounded-xl border border-navy-100 bg-white p-4 shadow-card transition-colors hover:border-plum-300"
                >
                  <p className="text-xs font-semibold uppercase tracking-wider text-plum-600">
                    {p.domain}
                  </p>
                  <p className="mt-1 font-medium text-navy-700">{p.title}</p>
                  <p className="mt-1 text-sm text-navy-500 line-clamp-2">
                    {p.query}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar — recent queries */}
        <aside className="lg:sticky lg:top-8 lg:self-start">
          <div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-card">
            <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
              Recent queries
            </p>

            {!hasHistory ? (
              <p className="mt-3 text-sm text-navy-400">
                Your query history will appear here.
              </p>
            ) : (
              <div className="mt-4 space-y-5">
                {Object.entries(grouped).map(([label, items]) => {
                  if (items.length === 0) return null;
                  return (
                    <div key={label}>
                      <p className="text-xs font-semibold uppercase tracking-wider text-navy-300">
                        {label}
                      </p>
                      <ul className="mt-2 space-y-2">
                        {items.slice(0, 8).map((q) => (
                          <li key={q.id}>
                            <Link
                              href={`/marco?q=${q.id}`}
                              className="group block rounded-lg border border-transparent px-2 py-1.5 text-sm transition-colors hover:border-navy-100 hover:bg-navy-50"
                            >
                              <div className="flex items-start gap-2">
                                <span
                                  className={`mt-0.5 flex-shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider ${
                                    domainColors[q.domain] ?? "bg-navy-50 text-navy-500"
                                  }`}
                                >
                                  {q.domain.slice(0, 3)}
                                </span>
                                <span className="line-clamp-2 text-navy-600 group-hover:text-navy-900">
                                  {q.query}
                                </span>
                              </div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="mt-4 rounded-2xl border border-plum-200 bg-gradient-to-br from-plum-50 to-white p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-plum-600">
              Pro tip
            </p>
            <p className="mt-2 text-sm text-navy-600">
              Press{" "}
              <kbd className="rounded border border-navy-200 bg-white px-1.5 py-0.5 font-mono text-xs">
                ⌘K
              </kbd>{" "}
              from anywhere to ask Marco without leaving what you&rsquo;re doing.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
