"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

interface UserRecord {
  id: string;
  email: string;
  name: string | null;
  role: string;
  firmName: string | null;
  createdAt: string;
}

export default function AdminPage() {
  const { data: session, status } = useSession();
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (status === "loading" || !isAdmin) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-navy-400">Loading...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 lg:px-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-display text-navy-800 dark:text-white">
            Admin Dashboard
          </h1>
          <p className="mt-2 text-lg text-navy-400 dark:text-navy-400">
            Platform administration and user management.
          </p>
        </div>
        <span className="rounded-full bg-plum-50 px-4 py-1.5 text-xs font-bold text-plum-600 dark:bg-plum-900 dark:text-plum-300">
          ADMIN
        </span>
      </div>

      {/* Stats */}
      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card dark:border-navy-700 dark:bg-navy-800">
          <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
            Total users
          </p>
          <p className="mt-2 font-serif text-3xl text-navy-700 dark:text-navy-100">
            {loading ? "..." : users.length}
          </p>
        </div>
        <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card dark:border-navy-700 dark:bg-navy-800">
          <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
            Admin users
          </p>
          <p className="mt-2 font-serif text-3xl text-navy-700 dark:text-navy-100">
            {loading ? "..." : users.filter((u) => u.role === "ADMIN").length}
          </p>
        </div>
        <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card dark:border-navy-700 dark:bg-navy-800">
          <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
            Standard users
          </p>
          <p className="mt-2 font-serif text-3xl text-navy-700 dark:text-navy-100">
            {loading ? "..." : users.filter((u) => u.role === "USER").length}
          </p>
        </div>
      </div>

      {/* User table */}
      <div className="mt-10 overflow-hidden rounded-xl border border-navy-100 bg-white shadow-card dark:border-navy-700 dark:bg-navy-800">
        <div className="border-b border-navy-100 px-6 py-4 dark:border-navy-700">
          <h2 className="font-semibold text-navy-700 dark:text-navy-100">All users</h2>
        </div>
        {loading ? (
          <div className="p-6 text-center text-sm text-navy-400">
            Loading users...
          </div>
        ) : users.length === 0 ? (
          <div className="p-6 text-center text-sm text-navy-400">
            No users registered yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-navy-100 bg-navy-50 dark:border-navy-700 dark:bg-navy-900/50">
                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-navy-400">
                    Name
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-navy-400">
                    Email
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-navy-400">
                    Firm
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-navy-400">
                    Role
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-navy-400">
                    Joined
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-navy-50 hover:bg-navy-50 dark:border-navy-700 dark:hover:bg-navy-700/50"
                  >
                    <td className="px-6 py-4 font-medium text-navy-700 dark:text-navy-200">
                      {user.name || "—"}
                    </td>
                    <td className="px-6 py-4 text-navy-500 dark:text-navy-300">{user.email}</td>
                    <td className="px-6 py-4 text-navy-400 dark:text-navy-400">
                      {user.firmName || "—"}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                          user.role === "ADMIN"
                            ? "bg-plum-50 text-plum-600 dark:bg-plum-900 dark:text-plum-300"
                            : "bg-navy-50 text-navy-500 dark:bg-navy-700 dark:text-navy-300"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-navy-400">
                      {new Date(user.createdAt).toLocaleDateString()}
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
