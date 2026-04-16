import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const accentRing: Record<string, string> = {
  plum: "border-plum-200 hover:border-plum-400 dark:border-plum-700 dark:hover:border-plum-500",
  forest: "border-forest-200 hover:border-forest-400 dark:border-forest-700 dark:hover:border-forest-500",
  navy: "border-navy-100 hover:border-navy-300 dark:border-navy-700 dark:hover:border-navy-600",
};

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) redirect("/login");

  const [matters, clients, documents, trustAccounts, timeEntries] =
    await Promise.all([
      prisma.matter.count({ where: { userId } }),
      prisma.client.count({ where: { userId } }),
      prisma.document.count({ where: { userId } }),
      prisma.trustAccount.count({ where: { userId } }),
      prisma.timeEntry.count({ where: { userId } }),
    ]);

  const cards: {
    title: string;
    desc: string;
    href: string;
    accent: "plum" | "forest" | "navy";
    count?: string | null;
    cta?: string;
  }[] = [
    {
      title: "Marco",
      desc: "Ask anything. Legal and accounting research with verified citations.",
      href: "/marco",
      accent: "plum",
      cta: "Ask Marco",
    },
    {
      title: "Voice",
      desc: "Dictate anywhere. Powered by Marco Reid Voice.",
      href: "/voice",
      accent: "forest",
    },
    {
      title: "Matters",
      desc: "Manage your active cases and engagements.",
      href: "/matters",
      accent: "navy",
      count: String(matters),
    },
    {
      title: "Clients",
      desc: "Your client directory and CRM.",
      href: "/clients",
      accent: "navy",
      count: String(clients),
    },
    {
      title: "Documents",
      desc: "Files, drafts, and templates.",
      href: "/documents",
      accent: "navy",
      count: String(documents),
    },
    {
      title: "Trust",
      desc: "IOLTA trust accounts and ledger.",
      href: "/trust",
      accent: "navy",
      count: String(trustAccounts),
    },
    {
      title: "Time",
      desc: "Time tracking and billable entries.",
      href: "/matters",
      accent: "navy",
      count: String(timeEntries),
    },
    {
      title: "Billing",
      desc: "Subscriptions, invoices, and marketplace payments.",
      href: "/billing",
      accent: "navy",
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 lg:px-12">
      <h1 className="font-serif text-display text-navy-800 dark:text-white">
        Welcome back{session?.user?.name ? `, ${session.user.name}` : ""}.
      </h1>
      <p className="mt-2 text-lg text-navy-400 dark:text-navy-400">
        Your Marco Reid dashboard. This is where your practice lives.
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className={`group block rounded-2xl border bg-white p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5 dark:bg-navy-800 ${accentRing[item.accent]}`}
          >
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-navy-700 dark:text-navy-100">{item.title}</h2>
              {item.cta ? (
                <span className="rounded-full bg-plum-50 px-2.5 py-0.5 text-xs font-medium text-plum-600 dark:bg-plum-900 dark:text-plum-300">
                  {item.cta}
                </span>
              ) : item.count != null ? (
                <span className="rounded-full bg-navy-50 px-2.5 py-0.5 text-xs font-medium text-navy-400 dark:bg-navy-700 dark:text-navy-300">
                  {item.count}
                </span>
              ) : null}
            </div>
            <p className="mt-2 text-sm text-navy-400 dark:text-navy-400">{item.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
