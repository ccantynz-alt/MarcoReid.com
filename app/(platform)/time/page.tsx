import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";
import TimeHubClient from "./TimeHubClient";

export const dynamic = "force-dynamic";

export default async function TimePage() {
  const userId = await getUserId();
  if (!userId) redirect("/login");

  const matters = await prisma.matter.findMany({
    where: { userId },
    select: {
      id: true,
      title: true,
      client: { select: { name: true } },
    },
    orderBy: { openedAt: "desc" },
  });

  // Default rate = most recently used rate on any entry, falling back to $300/hr
  const lastEntry = await prisma.timeEntry.findFirst({
    where: { userId },
    orderBy: { createdAt: "desc" },
    select: { rateInCents: true },
  });
  const defaultRateInCents = lastEntry?.rateInCents ?? 30000;

  const matterOptions = matters.map((m) => ({
    id: m.id,
    title: m.title,
    clientName: m.client.name,
  }));

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 lg:px-12">
      <div className="flex items-baseline justify-between">
        <div>
          <h1 className="font-serif text-display text-navy-800">Time</h1>
          <p className="mt-1 text-sm text-navy-400">
            Track, review, and bill for every hour of your practice.
          </p>
        </div>
        <Link
          href="/dashboard"
          className="text-sm text-navy-400 hover:text-navy-600"
        >
          &larr; Dashboard
        </Link>
      </div>

      {matters.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-navy-100 bg-white p-8 text-center shadow-card">
          <p className="text-sm text-navy-500">
            You need at least one matter before tracking time.
          </p>
          <Link
            href="/matters/new"
            className="mt-4 inline-flex min-h-touch items-center justify-center rounded-lg bg-navy-500 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-navy-600"
          >
            Create a matter
          </Link>
        </div>
      ) : (
        <div className="mt-8">
          <TimeHubClient matters={matterOptions} defaultRateInCents={defaultRateInCents} />
        </div>
      )}
    </div>
  );
}
