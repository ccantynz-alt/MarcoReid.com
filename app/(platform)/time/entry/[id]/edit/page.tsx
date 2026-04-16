import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";
import EditTimeEntryForm from "./EditTimeEntryForm";

export const dynamic = "force-dynamic";

export default async function EditTimeEntryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const userId = await getUserId();
  if (!userId) redirect("/login");
  const { id } = await params;

  const [entry, matters] = await Promise.all([
    prisma.timeEntry.findFirst({
      where: { id, userId },
    }),
    prisma.matter.findMany({
      where: { userId },
      select: { id: true, title: true, client: { select: { name: true } } },
      orderBy: { openedAt: "desc" },
    }),
  ]);
  if (!entry) notFound();

  return (
    <div className="mx-auto max-w-3xl px-6 py-12 sm:px-8 lg:px-12">
      <Link href="/time" className="text-sm text-navy-400 hover:text-navy-600">
        &larr; Time
      </Link>
      <h1 className="mt-3 font-serif text-display text-navy-800">Edit time entry</h1>
      <p className="mt-1 text-sm text-navy-400">
        Adjust details, rates, or billable status.
      </p>

      <EditTimeEntryForm
        entry={{
          id: entry.id,
          matterId: entry.matterId,
          description: entry.description,
          minutes: entry.minutes,
          rateInCents: entry.rateInCents,
          date: entry.date.toISOString(),
          billable: entry.billable,
          invoiced: entry.invoiced,
        }}
        matters={matters.map((m) => ({
          id: m.id,
          title: m.title,
          clientName: m.client.name,
        }))}
      />
    </div>
  );
}
