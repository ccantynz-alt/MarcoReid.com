"use client";

import { useEffect, useState } from "react";
import {
  AdminLoading,
  AdminPageHeader,
  useAdminGate,
} from "../components/AdminGate";

interface RevenuePayload {
  summary: {
    activeSubscriptions: number;
    pastDue: number;
    canceled: number;
    trialing: number;
    mrrCents: number;
    arrCents: number;
    churnLast30d: number;
    churnRate: number;
  };
  weeklyTrend: Array<{
    weekStartIso: string;
    newSubscriptions: number;
    churned: number;
  }>;
  note?: string;
}

function formatMoney(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

export default function RevenuePage() {
  const { isAdmin, loading } = useAdminGate();
  const [data, setData] = useState<RevenuePayload | null>(null);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!isAdmin) return;
    fetch("/api/admin/revenue", {
      signal: AbortSignal.timeout(10_000),
    })
      .then((r) => r.json())
      .then((d) => {
        setData(d);
        setFetching(false);
      })
      .catch(() => setFetching(false));
  }, [isAdmin]);

  if (loading || !isAdmin) return <AdminLoading />;

  const summary = data?.summary;
  const trend = data?.weeklyTrend ?? [];
  const maxTrend = Math.max(1, ...trend.map((t) => t.newSubscriptions));
  const isEmpty =
    !fetching &&
    summary !== undefined &&
    summary.activeSubscriptions === 0 &&
    summary.pastDue === 0 &&
    summary.trialing === 0;

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 lg:px-12">
      <AdminPageHeader
        eyebrow="Admin / Revenue"
        title="Revenue"
        description="MRR, ARR, weekly trend, churn — pulled from current Stripe subscription state."
      />

      {fetching ? (
        <p className="mt-10 text-sm text-navy-400">Loading revenue…</p>
      ) : isEmpty ? (
        <div className="mt-10 rounded-2xl border border-dashed border-navy-200 bg-white p-10 text-center shadow-card">
          <p className="font-serif text-xl text-navy-700">
            No active subscriptions yet
          </p>
          <p className="mt-2 text-sm text-navy-400">
            When your first paying customer signs up, MRR and the weekly
            trend will populate automatically.
          </p>
        </div>
      ) : (
        <>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Stat label="MRR" value={formatMoney(summary?.mrrCents ?? 0)} />
            <Stat label="ARR" value={formatMoney(summary?.arrCents ?? 0)} />
            <Stat
              label="Active subs"
              value={(summary?.activeSubscriptions ?? 0).toLocaleString()}
              note={`${summary?.trialing ?? 0} trialing`}
            />
            <Stat
              label="Churn (30d)"
              value={`${((summary?.churnRate ?? 0) * 100).toFixed(1)}%`}
              note={`${summary?.churnLast30d ?? 0} cancellations`}
            />
          </div>

          <div className="mt-8 rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
            <h2 className="font-serif text-headline text-navy-800">
              New subscriptions — last 12 weeks
            </h2>
            <div className="mt-6 flex h-40 items-end gap-2">
              {trend.map((bucket) => {
                const heightPct = (bucket.newSubscriptions / maxTrend) * 100;
                return (
                  <div
                    key={bucket.weekStartIso}
                    className="group flex flex-1 flex-col items-center gap-1"
                    title={`${new Date(
                      bucket.weekStartIso,
                    ).toLocaleDateString()} — ${bucket.newSubscriptions} new`}
                  >
                    <div
                      className="w-full rounded-t bg-gold-400 transition-colors group-hover:bg-gold-500"
                      style={{ height: `${heightPct}%`, minHeight: 2 }}
                    />
                    <span className="text-[10px] text-navy-400">
                      {new Date(bucket.weekStartIso).toLocaleDateString(
                        "en-US",
                        { month: "short", day: "numeric" },
                      )}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {data?.note && (
            <p className="mt-4 text-xs text-navy-400">Note: {data.note}</p>
          )}
        </>
      )}
    </div>
  );
}

function Stat({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note?: string;
}) {
  return (
    <div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-card">
      <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
        {label}
      </p>
      <p className="mt-2 font-serif text-3xl text-navy-800 tabular-nums">
        {value}
      </p>
      {note && <p className="mt-1 text-xs text-navy-400">{note}</p>}
    </div>
  );
}
