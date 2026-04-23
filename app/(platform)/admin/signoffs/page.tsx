"use client";

import { useEffect, useState } from "react";
import {
  AdminLoading,
  AdminPageHeader,
  useAdminGate,
} from "../components/AdminGate";

interface SignoffRow {
  id: string;
  kind: string;
  status: string;
  requestedAt: string;
  proMatter: { id: string; summary: string; jurisdiction: string } | null;
  reviewer: { id: string; displayName: string } | null;
}

function ageOf(iso: string): string {
  const ms = Date.now() - new Date(iso).getTime();
  const minutes = Math.floor(ms / 60_000);
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 48) return `${hours}h`;
  const days = Math.floor(hours / 24);
  return `${days}d`;
}

export default function SignoffsPage() {
  const { isAdmin, loading } = useAdminGate();
  const [rows, setRows] = useState<SignoffRow[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!isAdmin) return;
    fetch("/api/admin/signoffs", {
      signal: AbortSignal.timeout(10_000),
    })
      .then((r) => r.json())
      .then((d) => {
        setRows(d.signoffs ?? []);
        setFetching(false);
      })
      .catch(() => setFetching(false));
  }, [isAdmin]);

  if (loading || !isAdmin) return <AdminLoading />;

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 lg:px-12">
      <AdminPageHeader
        eyebrow="Admin / Signoffs"
        title="Sign-off oversight"
        description="Read-only global view of every pending professional sign-off. Admins observe; professionals act."
      />

      <div className="mt-8 overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-card">
        {fetching ? (
          <p className="p-8 text-center text-sm text-navy-400">Loading…</p>
        ) : rows.length === 0 ? (
          <p className="p-8 text-center text-sm text-navy-400">
            No pending sign-offs. Queue is clear.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-navy-100 bg-navy-50/50">
                  <Th>Matter</Th>
                  <Th>Kind</Th>
                  <Th>Reviewer</Th>
                  <Th>Jurisdiction</Th>
                  <Th>Age</Th>
                  <Th>Requested</Th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr
                    key={r.id}
                    className="border-b border-navy-50 hover:bg-navy-50/40"
                  >
                    <td className="px-6 py-3 text-navy-700">
                      {r.proMatter?.summary || "—"}
                    </td>
                    <td className="px-6 py-3 text-navy-500">{r.kind}</td>
                    <td className="px-6 py-3 text-navy-500">
                      {r.reviewer?.displayName || "Unassigned"}
                    </td>
                    <td className="px-6 py-3 text-navy-500">
                      {r.proMatter?.jurisdiction || "—"}
                    </td>
                    <td className="px-6 py-3 text-navy-700 tabular-nums">
                      {ageOf(r.requestedAt)}
                    </td>
                    <td className="px-6 py-3 text-navy-400 text-xs">
                      {new Date(r.requestedAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
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
