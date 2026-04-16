"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

interface Matter {
  id: string;
  title: string;
  matterNumber: string | null;
  practiceArea: string | null;
  status: string;
  openedAt: string;
  updatedAt: string;
  client: { id: string; name: string };
}

interface Props {
  matters: Matter[];
  counts: Record<string, number>;
  initialQ: string;
  initialStatus: string;
  initialSort: string;
}

const statusStyles: Record<string, string> = {
  ACTIVE: "bg-forest-50 text-forest-600",
  ON_HOLD: "bg-navy-50 text-navy-500",
  CLOSED: "bg-plum-50 text-plum-600",
};

const statusTabs = [
  { key: "ALL", label: "All" },
  { key: "ACTIVE", label: "Active" },
  { key: "ON_HOLD", label: "On hold" },
  { key: "CLOSED", label: "Closed" },
];

export default function MattersListClient({
  matters,
  counts,
  initialQ,
  initialStatus,
  initialSort,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [q, setQ] = useState(initialQ);
  const [pending, startTransition] = useTransition();

  // Debounced search
  useEffect(() => {
    if (q === initialQ) return;
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams?.toString() ?? "");
      if (q) params.set("q", q);
      else params.delete("q");
      startTransition(() => router.replace(`/matters?${params.toString()}`));
    }, 300);
    return () => clearTimeout(timer);
  }, [q, initialQ, router, searchParams]);

  function setStatus(status: string) {
    const params = new URLSearchParams(searchParams?.toString() ?? "");
    if (status === "ALL") params.delete("status");
    else params.set("status", status);
    startTransition(() => router.replace(`/matters?${params.toString()}`));
  }

  function setSort(sort: string) {
    const params = new URLSearchParams(searchParams?.toString() ?? "");
    params.set("sort", sort);
    startTransition(() => router.replace(`/matters?${params.toString()}`));
  }

  return (
    <>
      <div className="mt-8 space-y-4">
        {/* Search + sort */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <svg
              viewBox="0 0 20 20"
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400"
              fill="none"
            >
              <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="2" />
              <path d="M14 14l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search matters, clients, practice areas..."
              className="w-full rounded-lg border border-navy-200 bg-white py-2.5 pl-10 pr-4 text-sm text-navy-700 placeholder-navy-400 focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500"
            />
          </div>
          <select
            value={initialSort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-lg border border-navy-200 bg-white px-3 py-2.5 text-sm text-navy-700 focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500"
          >
            <option value="recent">Recently updated</option>
            <option value="opened">Recently opened</option>
            <option value="title">Title (A–Z)</option>
            <option value="client">Client (A–Z)</option>
            <option value="status">Status</option>
          </select>
        </div>

        {/* Status tabs */}
        <div className="flex flex-wrap gap-1 border-b border-navy-100">
          {statusTabs.map((tab) => {
            const count = counts[tab.key] ?? 0;
            const active = tab.key === initialStatus;
            return (
              <button
                key={tab.key}
                onClick={() => setStatus(tab.key)}
                className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? "border-navy-500 text-navy-700"
                    : "border-transparent text-navy-400 hover:text-navy-700"
                }`}
              >
                {tab.label}
                <span
                  className={`rounded-full px-2 py-0.5 text-xs ${
                    active ? "bg-navy-50 text-navy-600" : "bg-navy-50 text-navy-400"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Table */}
      <div
        className={`mt-6 overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-card transition-opacity ${
          pending ? "opacity-60" : ""
        }`}
      >
        {matters.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <p className="font-serif text-xl text-navy-700">
              {q || initialStatus !== "ALL" ? "No matches" : "No matters yet"}
            </p>
            <p className="mt-2 text-sm text-navy-400">
              {q || initialStatus !== "ALL"
                ? "Try different search terms or clear the status filter."
                : "Open your first matter to begin."}
            </p>
            {!q && initialStatus === "ALL" && (
              <Link
                href="/matters/new"
                className="mt-6 inline-flex items-center justify-center rounded-lg bg-navy-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy-600"
              >
                New matter
              </Link>
            )}
          </div>
        ) : (
          <table className="w-full">
            <thead className="border-b border-navy-100 bg-navy-50/50">
              <tr className="text-left text-xs font-semibold uppercase tracking-wide text-navy-400">
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3">Client</th>
                <th className="px-6 py-3">Practice area</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Opened</th>
              </tr>
            </thead>
            <tbody>
              {matters.map((m) => (
                <tr key={m.id} className="border-b border-navy-50 last:border-0 hover:bg-navy-50/50">
                  <td className="px-6 py-4">
                    <Link
                      href={`/matters/${m.id}`}
                      className="font-medium text-navy-700 hover:text-navy-900"
                    >
                      {m.title}
                    </Link>
                    {m.matterNumber && (
                      <p className="mt-0.5 text-xs text-navy-400">
                        #{m.matterNumber}
                      </p>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-navy-500">
                    {m.client.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-navy-500">
                    {m.practiceArea || "—"}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        statusStyles[m.status] ?? "bg-navy-50 text-navy-500"
                      }`}
                    >
                      {m.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-navy-500">
                    {new Intl.DateTimeFormat("en-US", {
                      dateStyle: "medium",
                    }).format(new Date(m.openedAt))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
