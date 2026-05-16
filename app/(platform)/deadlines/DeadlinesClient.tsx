"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AddDeadlineForm from "@/app/components/platform/AddDeadlineForm";

interface MatterOption {
  id: string;
  title: string;
  clientName: string;
}

interface DeadlineItem {
  id: string;
  title: string;
  description: string | null;
  dueDate: string;
  courtRule: string | null;
  jurisdiction: string | null;
  status: string;
  priority: string;
  reminderDays: number;
  completedAt: string | null;
  matterId: string;
  matter: {
    id: string;
    title: string;
    client: { id: string; name: string };
  };
}

const JURISDICTION_FLAGS: Record<string, string> = {
  NZ: "NZ",
  AU: "AU",
  UK: "UK",
  US: "US",
  CA: "CA",
};

const PRIORITY_STYLES: Record<string, string> = {
  low: "bg-navy-50 text-navy-500",
  normal: "bg-navy-100 text-navy-600",
  high: "bg-plum-50 text-plum-600",
  critical: "bg-red-50 text-red-600",
};

function isToday(date: Date): boolean {
  const now = new Date();
  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  );
}

function isThisWeek(date: Date): boolean {
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 7);
  return date >= startOfWeek && date < endOfWeek;
}

function formatDueDate(dateStr: string): string {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function groupDeadlines(deadlines: DeadlineItem[]) {
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const overdue: DeadlineItem[] = [];
  const dueToday: DeadlineItem[] = [];
  const thisWeek: DeadlineItem[] = [];
  const later: DeadlineItem[] = [];

  for (const d of deadlines) {
    if (d.status === "completed" || d.status === "waived") continue;
    const date = new Date(d.dueDate);
    date.setHours(0, 0, 0, 0);

    if (date < now && !isToday(date)) {
      overdue.push(d);
    } else if (isToday(date)) {
      dueToday.push(d);
    } else if (isThisWeek(date)) {
      thisWeek.push(d);
    } else {
      later.push(d);
    }
  }

  return { overdue, dueToday, thisWeek, later };
}

function DeadlineCard({
  deadline,
  onComplete,
  onDelete,
}: {
  deadline: DeadlineItem;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const date = new Date(deadline.dueDate);
  date.setHours(0, 0, 0, 0);
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const isOverdue = date < now && !isToday(date);
  const isDueToday = isToday(date);

  const dateColor = isOverdue
    ? "text-red-600"
    : isDueToday
      ? "text-amber-600"
      : "text-navy-600";

  return (
    <div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-card transition-all hover:shadow-card-hover">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="truncate font-semibold text-navy-700">
              {deadline.title}
            </h3>
            {deadline.priority !== "normal" && (
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${PRIORITY_STYLES[deadline.priority] || PRIORITY_STYLES.normal}`}
              >
                {deadline.priority}
              </span>
            )}
            {deadline.jurisdiction && (
              <span className="rounded-full bg-navy-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-navy-500">
                {JURISDICTION_FLAGS[deadline.jurisdiction] || deadline.jurisdiction}
              </span>
            )}
          </div>

          {deadline.courtRule && (
            <p className="mt-1 text-xs text-navy-400">{deadline.courtRule}</p>
          )}

          <Link
            href={`/matters/${deadline.matter.id}`}
            className="mt-1 inline-block text-sm text-plum-600 hover:text-plum-700 hover:underline"
          >
            {deadline.matter.title}
          </Link>
          <span className="mx-1.5 text-navy-300">&middot;</span>
          <span className="text-xs text-navy-400">
            {deadline.matter.client.name}
          </span>

          {deadline.description && (
            <p className="mt-2 text-sm text-navy-500">{deadline.description}</p>
          )}
        </div>

        <div className="flex flex-shrink-0 flex-col items-end gap-2">
          <p className={`text-sm font-semibold ${dateColor}`}>
            {formatDueDate(deadline.dueDate)}
          </p>
          <div className="flex gap-1">
            <button
              onClick={() => onComplete(deadline.id)}
              className="rounded-lg border border-forest-200 bg-forest-50 px-3 py-1.5 text-xs font-semibold text-forest-700 transition-colors hover:bg-forest-100"
            >
              Complete
            </button>
            <button
              onClick={() => onDelete(deadline.id)}
              className="rounded-lg border border-navy-200 px-3 py-1.5 text-xs font-semibold text-navy-400 transition-colors hover:bg-navy-50 hover:text-navy-600"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DeadlineGroup({
  title,
  deadlines,
  accentColor,
  onComplete,
  onDelete,
}: {
  title: string;
  deadlines: DeadlineItem[];
  accentColor: string;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  if (deadlines.length === 0) return null;

  return (
    <div>
      <div className="mb-3 flex items-center gap-2">
        <span className={`h-2 w-2 rounded-full ${accentColor}`} />
        <h2 className="text-sm font-semibold uppercase tracking-wider text-navy-500">
          {title}
        </h2>
        <span className="rounded-full bg-navy-50 px-2 py-0.5 text-xs font-medium text-navy-400">
          {deadlines.length}
        </span>
      </div>
      <div className="space-y-3">
        {deadlines.map((d) => (
          <DeadlineCard
            key={d.id}
            deadline={d}
            onComplete={onComplete}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default function DeadlinesClient({
  deadlines,
  matters,
}: {
  deadlines: DeadlineItem[];
  matters: MatterOption[];
}) {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);

  const { overdue, dueToday, thisWeek, later } = groupDeadlines(deadlines);
  const hasActiveDeadlines =
    overdue.length + dueToday.length + thisWeek.length + later.length > 0;

  const handleComplete = useCallback(
    async (id: string) => {
      try {
        const res = await fetch(`/api/deadlines/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            status: "completed",
            completedAt: new Date().toISOString(),
          }),
        });
        if (res.ok) router.refresh();
      } catch {
        // silently fail — user can retry
      }
    },
    [router],
  );

  const handleDelete = useCallback(
    async (id: string) => {
      try {
        const res = await fetch(`/api/deadlines/${id}`, { method: "DELETE" });
        if (res.ok) router.refresh();
      } catch {
        // silently fail
      }
    },
    [router],
  );

  const handleCreated = useCallback(() => {
    setShowForm(false);
    router.refresh();
  }, [router]);

  return (
    <>
      {/* Add deadline toggle */}
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-navy-400">
          {hasActiveDeadlines
            ? `${overdue.length + dueToday.length + thisWeek.length + later.length} active deadlines`
            : ""}
        </p>
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex min-h-touch items-center justify-center rounded-lg bg-navy-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-navy-600"
        >
          {showForm ? "Cancel" : "Add Deadline"}
        </button>
      </div>

      {/* Inline add form */}
      {showForm && (
        <div className="mb-8">
          <AddDeadlineForm matters={matters} onCreated={handleCreated} />
        </div>
      )}

      {/* Empty state */}
      {!hasActiveDeadlines && !showForm && (
        <div className="rounded-2xl border border-navy-100 bg-white p-12 text-center shadow-card">
          <p className="font-serif text-lg text-navy-700">No deadlines.</p>
          <p className="mt-1 text-sm text-navy-400">
            Add court deadlines to your matters.
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="mt-6 inline-flex items-center justify-center rounded-lg bg-navy-500 px-4 py-2 text-sm font-semibold text-white hover:bg-navy-600"
          >
            Add Deadline
          </button>
        </div>
      )}

      {/* Grouped deadline lists */}
      {hasActiveDeadlines && (
        <div className="space-y-8">
          <DeadlineGroup
            title="Overdue"
            deadlines={overdue}
            accentColor="bg-red-500"
            onComplete={handleComplete}
            onDelete={handleDelete}
          />
          <DeadlineGroup
            title="Due Today"
            deadlines={dueToday}
            accentColor="bg-amber-500"
            onComplete={handleComplete}
            onDelete={handleDelete}
          />
          <DeadlineGroup
            title="This Week"
            deadlines={thisWeek}
            accentColor="bg-navy-400"
            onComplete={handleComplete}
            onDelete={handleDelete}
          />
          <DeadlineGroup
            title="Later"
            deadlines={later}
            accentColor="bg-navy-300"
            onComplete={handleComplete}
            onDelete={handleDelete}
          />
        </div>
      )}
    </>
  );
}
