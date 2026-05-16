import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";
import DeadlinesClient from "./DeadlinesClient";

export const dynamic = "force-dynamic";

export default async function DeadlinesPage() {
  const userId = await getUserId();
  if (!userId) redirect("/login");

  const [deadlines, matters] = await Promise.all([
    prisma.deadline.findMany({
      where: { userId },
      include: {
        matter: {
          select: { id: true, title: true, client: { select: { id: true, name: true } } },
        },
      },
      orderBy: { dueDate: "asc" },
    }),
    prisma.matter.findMany({
      where: { userId },
      select: { id: true, title: true, client: { select: { name: true } } },
      orderBy: { openedAt: "desc" },
    }),
  ]);

  const serialized = deadlines.map((d) => ({
    id: d.id,
    title: d.title,
    description: d.description,
    dueDate: d.dueDate.toISOString(),
    courtRule: d.courtRule,
    jurisdiction: d.jurisdiction,
    status: d.status,
    priority: d.priority,
    reminderDays: d.reminderDays,
    completedAt: d.completedAt?.toISOString() ?? null,
    matterId: d.matterId,
    matter: d.matter,
  }));

  const matterOptions = matters.map((m) => ({
    id: m.id,
    title: m.title,
    clientName: m.client.name,
  }));

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 lg:px-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-display text-navy-800">Deadlines</h1>
          <p className="mt-2 text-navy-400">
            Court-rules deadline calendar. Never miss a filing date.
          </p>
        </div>
        <Link
          href="/dashboard"
          className="text-sm text-navy-400 hover:text-navy-600"
        >
          &larr; Dashboard
        </Link>
      </div>

      <div className="mt-8">
        <DeadlinesClient deadlines={serialized} matters={matterOptions} />
      </div>
    </div>
  );
}
