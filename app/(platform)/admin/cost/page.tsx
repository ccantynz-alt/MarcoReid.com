"use client";

import { useEffect, useState } from "react";
import {
  AdminLoading,
  AdminPageHeader,
  useAdminGate,
} from "../components/AdminGate";

interface CostPayload {
  monthStartIso: string;
  queryCountThisMonth: number;
  totalTokens: number;
  estimatedSpendUsd: number;
  activeUsersThisMonth: number;
  avgPerUserUsd: number;
  note: string | null;
}

function formatMoney(usd: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(usd);
}

export default function CostPage() {
  const { isAdmin, loading } = useAdminGate();
  const [data, setData] = useState<CostPayload | null>(null);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!isAdmin) return;
    fetch("/api/admin/cost", {
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

  const isEmpty =
    !fetching && data !== null && data.queryCountThisMonth === 0;

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 lg:px-12">
      <AdminPageHeader
        eyebrow="Admin / AI Cost"
        title="AI cost — current month"
        description="Tokens consumed and estimated spend across Marco. Resets at the first of each month."
      />

      {fetching ? (
        <p className="mt-10 text-sm text-navy-400">Loading…</p>
      ) : isEmpty ? (
        <div className="mt-10 rounded-2xl border border-dashed border-navy-200 bg-white p-10 text-center shadow-card">
          <p className="font-serif text-xl text-navy-700">
            No AI activity this month yet
          </p>
          <p className="mt-2 text-sm text-navy-400">
            Once Marco starts answering queries, token usage and spend will
            appear here.
          </p>
        </div>
      ) : data ? (
        <>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Stat
              label="Estimated spend"
              value={formatMoney(data.estimatedSpendUsd)}
              note="Anthropic blended rate"
            />
            <Stat
              label="Tokens consumed"
              value={data.totalTokens.toLocaleString()}
              note={`${data.queryCountThisMonth.toLocaleString()} queries`}
            />
            <Stat
              label="Active users (MTD)"
              value={data.activeUsersThisMonth.toLocaleString()}
            />
            <Stat
              label="Avg per active user"
              value={formatMoney(data.avgPerUserUsd)}
            />
          </div>
          {data.note && (
            <p className="mt-4 text-xs text-navy-400">Note: {data.note}</p>
          )}
        </>
      ) : null}
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
