"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

interface ProfessionalRow {
  id: string;
  displayName: string;
  admissionJurisdiction: string;
  admissionNumber: string;
  professionalBody: string;
  piPolicyExpiresAt: string | null;
  verifiedAt: string | null;
  createdAt: string;
  user: { id: string; name: string | null; email: string };
  practiceAreas: Array<{
    practiceArea: { id: string; name: string; jurisdiction: string };
  }>;
}

function formatDate(d: string | null) {
  if (!d) return "—";
  return new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(
    new Date(d),
  );
}

export default function AdminProfessionalsPage() {
  const { data: session, status } = useSession();
  const [pros, setPros] = useState<ProfessionalRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"unverified" | "verified" | "all">(
    "unverified",
  );

  const isAdmin = (session?.user as { role?: string })?.role === "ADMIN";

  useEffect(() => {
    if (status === "authenticated" && !isAdmin) redirect("/dashboard");
  }, [status, isAdmin]);

  useEffect(() => {
    if (!isAdmin) return;
    setLoading(true);
    const verifiedParam =
      filter === "verified" ? "true" : filter === "all" ? "all" : "false";
    fetch(`/api/admin/professionals?verified=${verifiedParam}`)
      .then((r) => r.json())
      .then((d) => {
        setPros(d.professionals || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [isAdmin, filter]);

  const counts = useMemo(() => {
    const total = pros.length;
    const expiringSoon = pros.filter((p) => {
      if (!p.piPolicyExpiresAt) return false;
      const days =
        (new Date(p.piPolicyExpiresAt).getTime() - Date.now()) /
        (1000 * 60 * 60 * 24);
      return days < 30 && days > 0;
    }).length;
    return { total, expiringSoon };
  }, [pros]);

  if (status === "loading" || !isAdmin) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-navy-400">Loading…</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 lg:px-12">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-plum-600">
            Admin · Verification queue
          </p>
          <h1 className="mt-1 font-serif text-display text-navy-800">
            Professionals
          </h1>
          <p className="mt-2 text-navy-400">
            Approve admission and indemnity. A professional cannot be
            assigned to a matter until you sign them off.
          </p>
        </div>
        <Link
          href="/admin"
          className="text-sm font-medium text-navy-500 hover:text-navy-700"
        >
          ← Admin home
        </Link>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-card">
          <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
            In queue
          </p>
          <p className="mt-2 font-serif text-3xl text-navy-800 tabular-nums">
            {loading ? "—" : counts.total}
          </p>
          <p className="mt-1 text-xs text-navy-400">
            {filter === "unverified"
              ? "awaiting review"
              : filter === "verified"
                ? "verified"
                : "all professionals"}
          </p>
        </div>
        <div className="rounded-2xl border border-plum-200 bg-plum-50 p-5 shadow-card">
          <p className="text-xs font-semibold uppercase tracking-wider text-plum-600">
            PI expiring &lt; 30d
          </p>
          <p className="mt-2 font-serif text-3xl text-plum-800 tabular-nums">
            {loading ? "—" : counts.expiringSoon}
          </p>
          <p className="mt-1 text-xs text-plum-600">
            cover lapses block matter assignment
          </p>
        </div>
        <div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-card">
          <label className="block text-xs font-semibold uppercase tracking-wider text-navy-400">
            Show
          </label>
          <select
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value as "unverified" | "verified" | "all")
            }
            className="mt-2 w-full rounded-lg border border-navy-200 bg-white px-3 py-2 text-sm text-navy-700 focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500"
          >
            <option value="unverified">Awaiting verification</option>
            <option value="verified">Verified</option>
            <option value="all">All</option>
          </select>
        </div>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-card">
        {loading ? (
          <div className="p-8 text-center text-sm text-navy-400">Loading…</div>
        ) : pros.length === 0 ? (
          <div className="p-12 text-center">
            <p className="font-serif text-lg text-navy-700">
              {filter === "unverified"
                ? "No applications awaiting review."
                : "Nothing to show."}
            </p>
            <p className="mt-1 text-sm text-navy-400">
              When a professional submits onboarding it will appear here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-navy-100 bg-navy-50/50">
                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-navy-400">
                    Name
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-navy-400">
                    Jurisdiction
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-navy-400">
                    Practice areas
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-navy-400">
                    Admission
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-navy-400">
                    PI expiry
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-navy-400">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {pros.map((p) => (
                  <tr
                    key={p.id}
                    className="border-b border-navy-50 hover:bg-navy-50/50"
                  >
                    <td className="px-6 py-4">
                      <p className="font-medium text-navy-700">
                        {p.displayName}
                      </p>
                      <p className="text-xs text-navy-400">{p.user.email}</p>
                    </td>
                    <td className="px-6 py-4 text-navy-500">
                      {p.admissionJurisdiction}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {p.practiceAreas.length === 0 ? (
                          <span className="text-xs text-navy-400">—</span>
                        ) : (
                          p.practiceAreas.map((pa) => (
                            <span
                              key={pa.practiceArea.id}
                              className="rounded bg-navy-50 px-1.5 py-0.5 text-[10px] font-medium text-navy-500"
                            >
                              {pa.practiceArea.name}
                            </span>
                          ))
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-navy-500">
                      <p>{p.professionalBody}</p>
                      <p className="text-xs text-navy-400">
                        #{p.admissionNumber}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-navy-500">
                      {formatDate(p.piPolicyExpiresAt)}
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        href={`/admin/professionals/${p.id}`}
                        className="rounded-lg border border-navy-300 bg-white px-3 py-1.5 text-xs font-semibold text-navy-700 hover:bg-navy-50"
                      >
                        View →
                      </Link>
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
