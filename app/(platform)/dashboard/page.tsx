import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) redirect("/login");

  const [matters, clients, documents, trustAccounts, timeEntries] = await Promise.all([
    prisma.matter.count({ where: { userId } }),
    prisma.client.count({ where: { userId } }),
    prisma.document.count({ where: { userId } }),
    prisma.trustAccount.count({ where: { userId } }),
    prisma.timeEntry.count({ where: { userId } }),
  ]);

  const cards: {
    title: string;
    desc: string;
    count: string | null;
    href: string;
  }[] = [
    {
      title: "Matters",
      desc: "Manage your active cases and engagements",
      count: String(matters),
      href: "/matters",
    },
    {
      title: "Clients",
      desc: "Your client directory and CRM",
      count: String(clients),
      href: "/clients",
    },
    {
      title: "The Oracle",
      desc: "AI-powered legal and accounting research",
      count: null,
      href: "/oracle",
    },
    {
      title: "Documents",
      desc: "Files, drafts, and templates",
      count: String(documents),
      href: "/documents",
    },
    {
      title: "Trust",
      desc: "Client trust accounts and ledgers",
      count: String(trustAccounts),
      href: "/trust",
    },
    {
      title: "Time",
      desc: "Time tracking and billable entries",
      count: String(timeEntries),
      href: "/matters",
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 lg:px-12">
      <h1 className="font-serif text-display text-navy-800">
        Welcome back{session?.user?.name ? `, ${session.user.name}` : ""}.
      </h1>
      <p className="mt-2 text-lg text-navy-400">
        Your AlecRae dashboard. This is where your practice lives.
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="block rounded-2xl border border-navy-100 bg-white p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-navy-700">{item.title}</h2>
              {item.count !== null && (
                <span className="rounded-full bg-navy-50 px-2.5 py-0.5 text-xs font-medium text-navy-400">
                  {item.count}
                </span>
              )}
            </div>
            <p className="mt-2 text-sm text-navy-400">{item.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
