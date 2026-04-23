"use client";

import { useEffect, useState } from "react";
import {
  AdminLoading,
  AdminPageHeader,
  useAdminGate,
} from "../components/AdminGate";

interface AuditRow {
  id: string;
  source: string;
  action: string;
  actor: string | null;
  detail: string | null;
  occurredAt: string;
}

interface Payload {
  rows: AuditRow[];
  total: number;
  page: number;
  pageSize: number;
}

export default function AuditPage() {
  const { isAdmin, loading } = useAdminGate();
  const [data, setData] = useState<Payload | null>(null);
  const [fetching, setFetching] = useState(true);
  const [page, setPage] = useState(1);
  const [actor, setActor] = useState("");
  const [action, setAction] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const load = (nextPage: number) => {
    if (!isAdmin) return;
    setFetching(true);
    const params = new URLSearchParams();
    params.set("page", String(nextPage));
    params.set("pageSize", "50");
    if (actor) params.set("actor", actor);
    if (action) params.set("action", action);
    if (from) params.set("from", new Date(from).toISOString());
    if (to) params.set("to", new Date(to).toISOString());
    fetch(`/api/admin/audit?${params.toString()}`, {
      signal: AbortSignal.timeout(10_000),
    })
      .then((r) => r.json())
      .then((d) => {
        setData(d);
        setFetching(false);
      })
      .catch(() => setFetching(false));
  };

  useEffect(() => {
    load(1);
    setPage(1);
    // intentionally only re-run on filter change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin, actor, action, from, to]);

  if (loading || !isAdmin) return <AdminLoading />;

  const totalPages = data ? Math.max(1, Math.ceil(data.total / data.pageSize)) : 1;

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 lg:px-12">
      <AdminPageHeader
        eyebrow="Admin / Audit"
        title="Audit log"
        description="Combined view of every audit-shaped event across the platform. Sortable by occurredAt desc."
      />

      <div className="mt-6 grid gap-3 sm:grid-cols-4">
        <Input
          label="Actor"
          value={actor}
          onChange={setActor}
          placeholder="email or id"
        />
        <Input
          label="Action"
          value={action}
          onChange={setAction}
          placeholder="signoff.approved"
        />
        <Input label="From" type="date" value={from} onChange={setFrom} />
        <Input label="To" type="date" value={to} onChange={setTo} />
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-card">
        {fetching ? (
          <p className="p-8 text-center text-sm text-navy-400">Loading…</p>
        ) : !data || data.rows.length === 0 ? (
          <p className="p-8 text-center text-sm text-navy-400">
            No audit events match those filters.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-navy-100 bg-navy-50/50">
                  <Th>Occurred</Th>
                  <Th>Source</Th>
                  <Th>Action</Th>
                  <Th>Actor</Th>
                  <Th>Detail</Th>
                </tr>
              </thead>
              <tbody>
                {data.rows.map((r) => (
                  <tr
                    key={`${r.source}-${r.id}`}
                    className="border-b border-navy-50 hover:bg-navy-50/40"
                  >
                    <td className="px-6 py-3 text-navy-400 text-xs whitespace-nowrap">
                      {new Date(r.occurredAt).toLocaleString()}
                    </td>
                    <td className="px-6 py-3 text-navy-500">
                      <span className="rounded bg-navy-50 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-navy-500">
                        {r.source}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-navy-700">{r.action}</td>
                    <td className="px-6 py-3 text-navy-500">
                      {r.actor || "—"}
                    </td>
                    <td className="px-6 py-3 text-navy-500 max-w-md truncate">
                      {r.detail || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {data && data.total > data.pageSize && (
        <div className="mt-4 flex items-center justify-between text-xs text-navy-500">
          <span>
            Page {page} of {totalPages} · {data.total} events
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => {
                const next = page - 1;
                setPage(next);
                load(next);
              }}
              className="rounded border border-navy-200 px-3 py-1 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              type="button"
              disabled={page >= totalPages}
              onClick={() => {
                const next = page + 1;
                setPage(next);
                load(next);
              }}
              className="rounded border border-navy-200 px-3 py-1 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-navy-400">
      {children}
    </th>
  );
}

function Input({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-xs font-semibold uppercase tracking-wider text-navy-400">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="rounded-lg border border-navy-200 bg-white px-3 py-2 text-sm text-navy-700 placeholder-navy-400 focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500"
      />
    </label>
  );
}
