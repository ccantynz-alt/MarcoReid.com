"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  companyName: string | null;
  matterCount: number;
  createdAt: string;
}

interface Props {
  clients: Client[];
  initialQ: string;
  initialSort: string;
}

export default function ClientsListClient({
  clients,
  initialQ,
  initialSort,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [q, setQ] = useState(initialQ);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    if (q === initialQ) return;
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams?.toString() ?? "");
      if (q) params.set("q", q);
      else params.delete("q");
      startTransition(() => router.replace(`/clients?${params.toString()}`));
    }, 300);
    return () => clearTimeout(timer);
  }, [q, initialQ, router, searchParams]);

  function setSort(sort: string) {
    const params = new URLSearchParams(searchParams?.toString() ?? "");
    params.set("sort", sort);
    startTransition(() => router.replace(`/clients?${params.toString()}`));
  }

  return (
    <>
      <div className="mt-8 flex flex-wrap items-center gap-3">
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
            placeholder="Search clients, emails, companies..."
            className="w-full rounded-lg border border-navy-200 bg-white py-2.5 pl-10 pr-4 text-sm text-navy-700 placeholder-navy-400 focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500"
          />
        </div>
        <select
          value={initialSort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-lg border border-navy-200 bg-white px-3 py-2.5 text-sm text-navy-700 focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500"
        >
          <option value="recent">Recently added</option>
          <option value="name">Name (A–Z)</option>
          <option value="company">Company (A–Z)</option>
        </select>
      </div>

      <div
        className={`mt-6 overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-card transition-opacity ${
          pending ? "opacity-60" : ""
        }`}
      >
        {clients.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <p className="font-serif text-xl text-navy-700">
              {q ? "No matches" : "No clients yet"}
            </p>
            <p className="mt-2 text-sm text-navy-400">
              {q
                ? "Try a different search term."
                : "Add your first client to get started."}
            </p>
            {!q && (
              <Link
                href="/clients/new"
                className="mt-6 inline-flex items-center justify-center rounded-lg bg-navy-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy-600"
              >
                Add client
              </Link>
            )}
          </div>
        ) : (
          <table className="w-full">
            <thead className="border-b border-navy-100 bg-navy-50/50">
              <tr className="text-left text-xs font-semibold uppercase tracking-wide text-navy-400">
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Phone</th>
                <th className="px-6 py-3">Company</th>
                <th className="px-6 py-3">Matters</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((c) => (
                <tr key={c.id} className="border-b border-navy-50 last:border-0 hover:bg-navy-50/50">
                  <td className="px-6 py-4">
                    <Link
                      href={`/clients/${c.id}`}
                      className="flex items-center gap-3"
                    >
                      <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-navy-100 text-xs font-semibold text-navy-600">
                        {c.name.charAt(0).toUpperCase()}
                      </span>
                      <span className="font-medium text-navy-700 hover:text-navy-900">
                        {c.name}
                      </span>
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-sm text-navy-500">
                    <a
                      href={`mailto:${c.email}`}
                      className="hover:text-navy-700"
                    >
                      {c.email}
                    </a>
                  </td>
                  <td className="px-6 py-4 text-sm text-navy-500">
                    {c.phone || "—"}
                  </td>
                  <td className="px-6 py-4 text-sm text-navy-500">
                    {c.companyName || "—"}
                  </td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-navy-50 px-2.5 py-0.5 text-xs font-medium text-navy-600">
                      {c.matterCount}
                    </span>
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
