"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

interface MatterRow {
  id: string;
  summary: string;
  details: string;
  jurisdiction: string;
  status: string;
  leadFeeInCents: number;
  currency: string;
  createdAt: string;
  postedAt: string | null;
  acceptedAt: string | null;
  citizen: { id: string; name: string | null; email: string };
  practiceArea: {
    id: string;
    slug: string;
    name: string;
    jurisdiction: string;
  };
  acceptedBy: { id: string; displayName: string } | null;
}

interface ProOption {
  id: string;
  displayName: string;
  admissionJurisdiction: string;
  practiceAreas: Array<{ practiceArea: { id: string; name: string } }>;
}

function formatDate(d: string | null) {
  if (!d) return "—";
  return new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(
    new Date(d),
  );
}

function formatMoney(cents: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

export default function AdminMattersPage() {
  const { data: session, status } = useSession();
  const [matters, setMatters] = useState<MatterRow[]>([]);
  const [filter, setFilter] = useState<"AWAITING_PRO" | "ACCEPTED" | "all">(
    "AWAITING_PRO",
  );
  const [loading, setLoading] = useState(true);
  const [openMatter, setOpenMatter] = useState<MatterRow | null>(null);
  const [proOptions, setProOptions] = useState<ProOption[]>([]);
  const [selectedPro, setSelectedPro] = useState("");
  const [working, setWorking] = useState(false);
  const [error, setError] = useState("");

  const isAdmin = (session?.user as { role?: string })?.role === "ADMIN";

  useEffect(() => {
    if (status === "authenticated" && !isAdmin) redirect("/dashboard");
  }, [status, isAdmin]);

  const fetchMatters = () => {
    setLoading(true);
    fetch(`/api/marketplace/matters?status=${filter}`)
      .then((r) => r.json())
      .then((d) => {
        setMatters(d.matters || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    if (!isAdmin) return;
    fetchMatters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin, filter]);

  // When the admin opens a matter, load eligible pros for that jurisdiction
  // + practice area.
  useEffect(() => {
    if (!openMatter) {
      setProOptions([]);
      setSelectedPro("");
      setError("");
      return;
    }
    const params = new URLSearchParams({
      practiceAreaId: openMatter.practiceArea.id,
      jurisdiction: openMatter.jurisdiction,
    });
    fetch(`/api/marketplace/professionals?${params.toString()}`)
      .then((r) => r.json())
      .then((d) => setProOptions(d.professionals || []))
      .catch(() => setProOptions([]));
  }, [openMatter]);

  async function assign() {
    if (!openMatter || !selectedPro) return;
    setWorking(true);
    setError("");
    try {
      const res = await fetch(
        `/api/marketplace/matters/${openMatter.id}/assign`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ professionalId: selectedPro }),
        },
      );
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Could not assign");
      }
      setOpenMatter(null);
      fetchMatters();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setWorking(false);
    }
  }

  const counts = useMemo(() => {
    return {
      awaiting: matters.filter((m) => m.status === "AWAITING_PRO").length,
      accepted: matters.filter((m) => m.status === "ACCEPTED").length,
    };
  }, [matters]);

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
            Admin · Matter routing
          </p>
          <h1 className="mt-1 font-serif text-display text-navy-800">
            Citizen matters
          </h1>
          <p className="mt-2 text-navy-400">
            Posted matters waiting to be matched with a verified professional.
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
        <button
          onClick={() => setFilter("AWAITING_PRO")}
          className={`rounded-2xl border p-5 text-left shadow-card transition-colors ${
            filter === "AWAITING_PRO"
              ? "border-plum-500 bg-plum-50"
              : "border-navy-100 bg-white hover:border-navy-300"
          }`}
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-plum-600">
            Awaiting professional
          </p>
          <p className="mt-2 font-serif text-3xl text-navy-800 tabular-nums">
            {filter === "AWAITING_PRO"
              ? matters.length
              : counts.awaiting || "—"}
          </p>
        </button>
        <button
          onClick={() => setFilter("ACCEPTED")}
          className={`rounded-2xl border p-5 text-left shadow-card transition-colors ${
            filter === "ACCEPTED"
              ? "border-forest-500 bg-forest-50"
              : "border-navy-100 bg-white hover:border-navy-300"
          }`}
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-forest-600">
            With a professional
          </p>
          <p className="mt-2 font-serif text-3xl text-navy-800 tabular-nums">
            {filter === "ACCEPTED" ? matters.length : counts.accepted || "—"}
          </p>
        </button>
        <button
          onClick={() => setFilter("all")}
          className={`rounded-2xl border p-5 text-left shadow-card transition-colors ${
            filter === "all"
              ? "border-navy-500 bg-navy-50"
              : "border-navy-100 bg-white hover:border-navy-300"
          }`}
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-navy-500">
            All matters
          </p>
          <p className="mt-2 font-serif text-3xl text-navy-800 tabular-nums">
            {filter === "all" ? matters.length : "—"}
          </p>
        </button>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-card">
        {loading ? (
          <div className="p-8 text-center text-sm text-navy-400">Loading…</div>
        ) : matters.length === 0 ? (
          <div className="p-12 text-center">
            <p className="font-serif text-lg text-navy-700">
              Nothing to show.
            </p>
            <p className="mt-1 text-sm text-navy-400">
              Citizen submissions land here in real time.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-navy-100 bg-navy-50/50">
                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-navy-400">
                    Citizen
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-navy-400">
                    Summary
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-navy-400">
                    Area
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-navy-400">
                    Lead fee
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-navy-400">
                    Status
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-navy-400">
                    Posted
                  </th>
                  <th className="px-6 py-3" />
                </tr>
              </thead>
              <tbody>
                {matters.map((m) => (
                  <tr
                    key={m.id}
                    className="border-b border-navy-50 hover:bg-navy-50/50"
                  >
                    <td className="px-6 py-4">
                      <p className="font-medium text-navy-700">
                        {m.citizen.name || "—"}
                      </p>
                      <p className="text-xs text-navy-400">{m.citizen.email}</p>
                    </td>
                    <td className="px-6 py-4 max-w-xs">
                      <p className="line-clamp-2 text-navy-600">{m.summary}</p>
                    </td>
                    <td className="px-6 py-4 text-navy-500">
                      <p>{m.practiceArea.name}</p>
                      <p className="text-xs text-navy-400">{m.jurisdiction}</p>
                    </td>
                    <td className="px-6 py-4 text-navy-600 tabular-nums">
                      {formatMoney(m.leadFeeInCents, m.currency)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider ${
                          m.status === "AWAITING_PRO"
                            ? "bg-plum-50 text-plum-600"
                            : m.status === "ACCEPTED"
                              ? "bg-forest-50 text-forest-600"
                              : "bg-navy-50 text-navy-500"
                        }`}
                      >
                        {m.status === "AWAITING_PRO"
                          ? "intake"
                          : m.status === "ACCEPTED"
                            ? "assigned"
                            : m.status.toLowerCase()}
                      </span>
                      {m.acceptedBy && (
                        <p className="mt-1 text-[11px] text-navy-400">
                          {m.acceptedBy.displayName}
                        </p>
                      )}
                    </td>
                    <td className="px-6 py-4 text-navy-400">
                      {formatDate(m.postedAt || m.createdAt)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {m.status === "AWAITING_PRO" ? (
                        <button
                          onClick={() => setOpenMatter(m)}
                          className="rounded-lg bg-navy-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-navy-600"
                        >
                          Assign
                        </button>
                      ) : (
                        <span className="text-xs text-navy-400">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Assignment modal */}
      {openMatter && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-navy-900/40 px-4">
          <div className="w-full max-w-lg rounded-2xl border border-navy-100 bg-white p-6 shadow-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-plum-600">
              Assign matter
            </p>
            <h2 className="mt-1 font-serif text-headline text-navy-800">
              {openMatter.practiceArea.name}
            </h2>
            <p className="mt-2 text-sm text-navy-500">
              {openMatter.summary}
            </p>

            <div className="mt-5">
              <label className="block text-sm font-medium text-navy-600">
                Verified professional ({proOptions.length} eligible)
              </label>
              {proOptions.length === 0 ? (
                <p className="mt-2 rounded-lg border border-plum-200 bg-plum-50 px-3 py-2 text-sm text-plum-700">
                  No verified professional matches the jurisdiction +
                  practice area + active PI cover.
                </p>
              ) : (
                <select
                  value={selectedPro}
                  onChange={(e) => setSelectedPro(e.target.value)}
                  className="mt-2 block w-full rounded-lg border border-navy-200 bg-white px-3 py-2 text-sm text-navy-700 focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500"
                >
                  <option value="">Select a professional</option>
                  {proOptions.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.displayName} · {p.admissionJurisdiction}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {error && (
              <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </div>
            )}

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setOpenMatter(null)}
                disabled={working}
                className="rounded-lg border border-navy-200 bg-white px-4 py-2 text-sm font-medium text-navy-500 hover:bg-navy-50"
              >
                Cancel
              </button>
              <button
                onClick={assign}
                disabled={working || !selectedPro}
                className="rounded-lg bg-navy-500 px-4 py-2 text-sm font-semibold text-white hover:bg-navy-600 disabled:opacity-50"
              >
                {working ? "Assigning…" : "Assign"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
