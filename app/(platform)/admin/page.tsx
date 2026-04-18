"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

interface UserRecord {
  id: string;
  email: string;
  name: string | null;
  role: string;
  firmName: string | null;
  createdAt: string;
  emailVerifiedAt?: string | null;
  subscriptionStatus?: string | null;
  onboardedAt?: string | null;
}

function formatDate(d: string) {
  return new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(
    new Date(d),
  );
}

export default function AdminPage() {
  const { data: session, status } = useSession();
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [roleFilter, setRoleFilter] = useState<"ALL" | "USER" | "ADMIN">("ALL");

  const isAdmin = (session?.user as { role?: string })?.role === "ADMIN";

  useEffect(() => {
    if (status === "authenticated" && !isAdmin) {
      redirect("/dashboard");
    }
  }, [status, isAdmin]);

  useEffect(() => {
    if (!isAdmin) return;
    fetch("/api/admin/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [isAdmin]);

  const filtered = useMemo(() => {
    let list = users;
    if (roleFilter !== "ALL") list = list.filter((u) => u.role === roleFilter);
    if (q.trim()) {
      const needle = q.toLowerCase();
      list = list.filter(
        (u) =>
          u.email.toLowerCase().includes(needle) ||
          (u.name?.toLowerCase().includes(needle) ?? false) ||
          (u.firmName?.toLowerCase().includes(needle) ?? false),
      );
    }
    return list;
  }, [users, roleFilter, q]);

  // Metrics
  const adminCount = users.filter((u) => u.role === "ADMIN").length;
  const verifiedCount = users.filter((u) => u.emailVerifiedAt).length;
  const firmCount = new Set(
    users.map((u) => u.firmName).filter((f): f is string => Boolean(f)),
  ).size;
  const onboardedCount = users.filter((u) => u.onboardedAt).length;
  const now = Date.now();
  const week = 7 * 24 * 60 * 60 * 1000;
  const signupsThisWeek = users.filter(
    (u) => now - new Date(u.createdAt).getTime() < week,
  ).length;

  if (status === "loading" || !isAdmin) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-navy-400">Loading...</p>
      </div>
    );
  }

  const metricCards = [
    { label: "Total users", value: users.length, note: `${signupsThisWeek} this week` },
    { label: "Verified emails", value: verifiedCount, note: `${users.length - verifiedCount} pending` },
    { label: "Admins", value: adminCount, note: `${users.length - adminCount} standard` },
    { label: "Unique firms", value: firmCount, note: "By firm name" },
    { label: "Completed onboarding", value: onboardedCount, note: `${users.length - onboardedCount} incomplete` },
  ];

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 lg:px-12">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-plum-600">
            Admin
          </p>
          <h1 className="mt-1 font-serif text-display text-navy-800">
            Platform dashboard
          </h1>
          <p className="mt-2 text-navy-400">
            Operate Marco Reid. User management, system health, usage.
          </p>
        </div>
        <span className="rounded-full bg-plum-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-plum-600">
          ADMIN access
        </span>
      </div>

      {/* Metric cards */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {metricCards.map((card) => (
          <div
            key={card.label}
            className="rounded-2xl border border-navy-100 bg-white p-5 shadow-card"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
              {card.label}
            </p>
            <p className="mt-2 font-serif text-3xl text-navy-800 tabular-nums">
              {loading ? "—" : card.value}
            </p>
            <p className="mt-1 text-xs text-navy-400">{card.note}</p>
          </div>
        ))}
      </div>

      {/* Quick links */}
      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        <Link
          href="/build-status"
          className="rounded-xl border border-navy-100 bg-white p-4 shadow-card transition-colors hover:border-navy-300"
        >
          <p className="font-medium text-navy-700">Build status</p>
          <p className="mt-0.5 text-xs text-navy-400">
            Live phase tracker for the whole platform
          </p>
        </Link>
        <Link
          href="/status"
          className="rounded-xl border border-navy-100 bg-white p-4 shadow-card transition-colors hover:border-navy-300"
        >
          <p className="font-medium text-navy-700">System status</p>
          <p className="mt-0.5 text-xs text-navy-400">
            Uptime and recent incidents
          </p>
        </Link>
        <Link
          href="/changelog"
          className="rounded-xl border border-navy-100 bg-white p-4 shadow-card transition-colors hover:border-navy-300"
        >
          <p className="font-medium text-navy-700">Changelog</p>
          <p className="mt-0.5 text-xs text-navy-400">
            Public platform updates
          </p>
        </Link>
      </div>

      {/* Users table */}
      <div className="mt-10">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="font-serif text-headline text-navy-800">Users</h2>
          <div className="flex flex-wrap gap-2">
            <div className="relative">
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
                placeholder="Search users..."
                className="rounded-lg border border-navy-200 bg-white py-2 pl-9 pr-3 text-sm text-navy-700 placeholder-navy-400 focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500"
              />
            </div>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value as "ALL" | "USER" | "ADMIN")}
              className="rounded-lg border border-navy-200 bg-white px-3 py-2 text-sm text-navy-700 focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500"
            >
              <option value="ALL">All roles</option>
              <option value="USER">Users only</option>
              <option value="ADMIN">Admins only</option>
            </select>
          </div>
        </div>

        <div className="mt-4 overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-card">
          {loading ? (
            <div className="p-8 text-center text-sm text-navy-400">
              Loading users…
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-8 text-center text-sm text-navy-400">
              {users.length === 0
                ? "No users registered yet."
                : "No users match that filter."}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-navy-100 bg-navy-50/50">
                    <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-navy-400">
                      User
                    </th>
                    <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-navy-400">
                      Firm
                    </th>
                    <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-navy-400">
                      Role
                    </th>
                    <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-navy-400">
                      Status
                    </th>
                    <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-navy-400">
                      Joined
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b border-navy-50 hover:bg-navy-50/50"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-navy-100 text-xs font-semibold text-navy-600">
                            {(user.name || user.email).charAt(0).toUpperCase()}
                          </span>
                          <div>
                            <p className="font-medium text-navy-700">
                              {user.name || "—"}
                            </p>
                            <p className="text-xs text-navy-400">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-navy-500">
                        {user.firmName || "—"}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider ${
                            user.role === "ADMIN"
                              ? "bg-plum-50 text-plum-600"
                              : "bg-navy-50 text-navy-500"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap items-center gap-1.5">
                          {user.emailVerifiedAt ? (
                            <span className="rounded bg-forest-50 px-1.5 py-0.5 text-[10px] font-semibold text-forest-600">
                              verified
                            </span>
                          ) : (
                            <span className="rounded bg-plum-50 px-1.5 py-0.5 text-[10px] font-semibold text-plum-600">
                              unverified
                            </span>
                          )}
                          {user.onboardedAt && (
                            <span className="rounded bg-navy-50 px-1.5 py-0.5 text-[10px] font-semibold text-navy-500">
                              onboarded
                            </span>
                          )}
                          {user.subscriptionStatus === "active" && (
                            <span className="rounded bg-forest-50 px-1.5 py-0.5 text-[10px] font-semibold text-forest-600">
                              subscribed
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-navy-400">
                        {formatDate(user.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
