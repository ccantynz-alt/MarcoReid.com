"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import TimerWidget from "@/app/components/platform/TimerWidget";
import TimeEntryQuickAdd from "@/app/components/platform/TimeEntryQuickAdd";
import TimeEntriesTable, { type TimeEntryRow } from "@/app/components/platform/TimeEntriesTable";

type Period = "today" | "week" | "month" | "all";
type SortKey = "date" | "hours" | "amount" | "matter";

interface MatterOption {
  id: string;
  title: string;
  clientName?: string;
}

interface Summary {
  count: number;
  totalMinutes: number;
  billableMinutes: number;
  billableCents: number;
  invoicedCents: number;
}

const money = (cents: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100);
const hoursLabel = (min: number) => `${(min / 60).toFixed(2)}h`;

function periodRange(p: Period): { from?: string; to?: string } {
  const now = new Date();
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);
  const end = new Date(now);
  end.setHours(23, 59, 59, 999);

  if (p === "today") {
    return { from: start.toISOString(), to: end.toISOString() };
  }
  if (p === "week") {
    const day = start.getDay(); // 0=Sun
    const diff = (day + 6) % 7; // Monday as start
    const weekStart = new Date(start);
    weekStart.setDate(weekStart.getDate() - diff);
    return { from: weekStart.toISOString(), to: end.toISOString() };
  }
  if (p === "month") {
    const monthStart = new Date(start.getFullYear(), start.getMonth(), 1);
    return { from: monthStart.toISOString(), to: end.toISOString() };
  }
  return {};
}

export default function TimeHubClient({
  matters,
  defaultRateInCents,
}: {
  matters: MatterOption[];
  defaultRateInCents: number;
}) {
  const [period, setPeriod] = useState<Period>("week");
  const [entries, setEntries] = useState<TimeEntryRow[]>([]);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [q, setQ] = useState("");
  const [matterFilter, setMatterFilter] = useState<string>("");
  const [billableFilter, setBillableFilter] = useState<"all" | "yes" | "no">("all");
  const [invoicedFilter, setInvoicedFilter] = useState<"all" | "yes" | "no">("all");
  const [sort, setSort] = useState<SortKey>("date");

  const fetchEntries = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const range = periodRange(period);
      const params = new URLSearchParams();
      if (q.trim()) params.set("q", q.trim());
      if (matterFilter) params.set("matterId", matterFilter);
      if (billableFilter !== "all") params.set("billable", billableFilter === "yes" ? "true" : "false");
      if (invoicedFilter !== "all") params.set("invoiced", invoicedFilter === "yes" ? "true" : "false");
      if (range.from) params.set("from", range.from);
      if (range.to) params.set("to", range.to);
      params.set("sort", sort);

      const res = await fetch(`/api/time-entries?${params.toString()}`, { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to load time entries");
      const data = await res.json();
      setEntries(data.timeEntries ?? []);
      setSummary(data.summary ?? null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, [period, q, matterFilter, billableFilter, invoicedFilter, sort]);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  // Refresh when the timer widget or quick-add posts a new entry
  useEffect(() => {
    const handler = () => fetchEntries();
    window.addEventListener("mr:time-entry:created", handler);
    return () => window.removeEventListener("mr:time-entry:created", handler);
  }, [fetchEntries]);

  const tabCls = (active: boolean) =>
    `min-h-touch rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
      active
        ? "bg-navy-500 text-white shadow-sm"
        : "bg-white text-navy-500 border border-navy-200 hover:bg-navy-50"
    }`;

  const periodLabel = useMemo(
    () =>
      period === "today"
        ? "today"
        : period === "week"
          ? "this week"
          : period === "month"
            ? "this month"
            : "all time",
    [period]
  );

  return (
    <div className="space-y-6">
      {/* Timer + Quick add */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <TimerWidget matters={matters} defaultRateInCents={defaultRateInCents} />
        </div>
        <div className="lg:col-span-2">
          <TimeEntryQuickAdd
            matters={matters}
            defaultRateInCents={defaultRateInCents}
            onCreated={fetchEntries}
          />
        </div>
      </div>

      {/* Summary + tabs */}
      <div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-card">
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" className={tabCls(period === "today")} onClick={() => setPeriod("today")}>
            Today
          </button>
          <button type="button" className={tabCls(period === "week")} onClick={() => setPeriod("week")}>
            This week
          </button>
          <button type="button" className={tabCls(period === "month")} onClick={() => setPeriod("month")}>
            This month
          </button>
          <button type="button" className={tabCls(period === "all")} onClick={() => setPeriod("all")}>
            All time
          </button>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <SummaryStat
            label="Total hours"
            value={summary ? hoursLabel(summary.totalMinutes) : "—"}
            sub={summary ? `${summary.count} ${summary.count === 1 ? "entry" : "entries"}` : ""}
          />
          <SummaryStat
            label="Billable hours"
            value={summary ? hoursLabel(summary.billableMinutes) : "—"}
            accent="forest"
            sub={periodLabel}
          />
          <SummaryStat
            label="Billable amount"
            value={summary ? money(summary.billableCents) : "—"}
            accent="forest"
          />
          <SummaryStat
            label="Invoiced"
            value={summary ? money(summary.invoicedCents) : "—"}
            accent="plum"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-2xl border border-navy-100 bg-white p-4 shadow-card">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <label className="block text-xs font-medium text-navy-500" htmlFor="flt-q">
              Search
            </label>
            <input
              id="flt-q"
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Description or matter"
              className="mt-1 w-full rounded-lg border border-navy-200 bg-white px-3 py-2 text-sm text-navy-700 placeholder:text-navy-300 focus:border-navy-500 focus:outline-none focus:ring-2 focus:ring-navy-100"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-navy-500" htmlFor="flt-matter">
              Matter
            </label>
            <select
              id="flt-matter"
              value={matterFilter}
              onChange={(e) => setMatterFilter(e.target.value)}
              className="mt-1 w-full rounded-lg border border-navy-200 bg-white px-3 py-2 text-sm text-navy-700 focus:border-navy-500 focus:outline-none focus:ring-2 focus:ring-navy-100"
            >
              <option value="">All matters</option>
              {matters.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.title}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-navy-500" htmlFor="flt-billable">
              Billable
            </label>
            <select
              id="flt-billable"
              value={billableFilter}
              onChange={(e) => setBillableFilter(e.target.value as "all" | "yes" | "no")}
              className="mt-1 w-full rounded-lg border border-navy-200 bg-white px-3 py-2 text-sm text-navy-700 focus:border-navy-500 focus:outline-none focus:ring-2 focus:ring-navy-100"
            >
              <option value="all">All</option>
              <option value="yes">Billable only</option>
              <option value="no">Non-billable</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-navy-500" htmlFor="flt-invoiced">
              Invoiced
            </label>
            <select
              id="flt-invoiced"
              value={invoicedFilter}
              onChange={(e) => setInvoicedFilter(e.target.value as "all" | "yes" | "no")}
              className="mt-1 w-full rounded-lg border border-navy-200 bg-white px-3 py-2 text-sm text-navy-700 focus:border-navy-500 focus:outline-none focus:ring-2 focus:ring-navy-100"
            >
              <option value="all">All</option>
              <option value="yes">Invoiced</option>
              <option value="no">Open</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-navy-500" htmlFor="flt-sort">
              Sort by
            </label>
            <select
              id="flt-sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="mt-1 w-full rounded-lg border border-navy-200 bg-white px-3 py-2 text-sm text-navy-700 focus:border-navy-500 focus:outline-none focus:ring-2 focus:ring-navy-100"
            >
              <option value="date">Date</option>
              <option value="hours">Hours</option>
              <option value="amount">Amount</option>
              <option value="matter">Matter</option>
            </select>
          </div>
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-plum-200 bg-plum-50 px-4 py-3 text-sm text-plum-700">
          {error}
        </div>
      )}

      <div aria-busy={loading}>
        <TimeEntriesTable entries={entries} matters={matters} onChanged={fetchEntries} />
      </div>
    </div>
  );
}

function SummaryStat({
  label,
  value,
  sub,
  accent = "navy",
}: {
  label: string;
  value: string;
  sub?: string;
  accent?: "navy" | "forest" | "plum" | "gold";
}) {
  const colors: Record<string, string> = {
    navy: "text-navy-800",
    forest: "text-forest-700",
    plum: "text-plum-700",
    gold: "text-gold-700",
  };
  return (
    <div className="rounded-xl border border-navy-100 bg-navy-50/40 p-4">
      <div className="text-xs font-semibold uppercase tracking-wide text-navy-400">{label}</div>
      <div className={`mt-1 text-2xl font-semibold tabular-nums ${colors[accent] ?? colors.navy}`}>
        {value}
      </div>
      {sub && <div className="mt-0.5 text-xs text-navy-400">{sub}</div>}
    </div>
  );
}
