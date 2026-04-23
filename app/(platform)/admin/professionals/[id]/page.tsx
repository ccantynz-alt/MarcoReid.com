"use client";

import Link from "next/link";
import { useEffect, useState, use as usePromise } from "react";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

interface ProfessionalDetail {
  id: string;
  displayName: string;
  bio: string | null;
  admissionJurisdiction: string;
  admissionNumber: string;
  admissionYear: number | null;
  professionalBody: string;
  piInsurerName: string | null;
  piPolicyNumber: string | null;
  piPolicyExpiresAt: string | null;
  verifiedAt: string | null;
  verifiedBy: string | null;
  createdAt: string;
  user: { id: string; name: string | null; email: string; createdAt: string };
  practiceAreas: Array<{
    practiceArea: {
      id: string;
      name: string;
      jurisdiction: string;
      domain: string;
    };
  }>;
}

function formatDate(d: string | null) {
  if (!d) return "—";
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(d));
}

export default function AdminProfessionalDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = usePromise(params);
  const router = useRouter();
  const { data: session, status } = useSession();
  const [pro, setPro] = useState<ProfessionalDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [working, setWorking] = useState(false);
  const [showReject, setShowReject] = useState(false);
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");

  const isAdmin = (session?.user as { role?: string })?.role === "ADMIN";

  useEffect(() => {
    if (status === "authenticated" && !isAdmin) redirect("/dashboard");
  }, [status, isAdmin]);

  useEffect(() => {
    if (!isAdmin) return;
    fetch(`/api/admin/professionals/${id}`)
      .then((r) => r.json())
      .then((d) => {
        setPro(d.professional || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [isAdmin, id]);

  async function approve() {
    setWorking(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/professionals/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "approve" }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Could not approve");
      }
      router.push("/admin/professionals");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setWorking(false);
    }
  }

  async function reject() {
    if (!reason.trim()) {
      setError("Please provide a reason.");
      return;
    }
    setWorking(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/professionals/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reject", reason }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Could not reject");
      }
      router.push("/admin/professionals");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setWorking(false);
    }
  }

  if (status === "loading" || !isAdmin || loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-navy-400">Loading…</p>
      </div>
    );
  }

  if (!pro) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-16">
        <p className="font-serif text-headline text-navy-800">
          Professional not found.
        </p>
        <Link
          href="/admin/professionals"
          className="mt-4 inline-block text-sm font-medium text-navy-500 hover:text-navy-700"
        >
          ← Back to queue
        </Link>
      </div>
    );
  }

  const piExpired =
    pro.piPolicyExpiresAt &&
    new Date(pro.piPolicyExpiresAt).getTime() < Date.now();

  return (
    <div className="mx-auto max-w-4xl px-6 py-12 sm:px-8 lg:px-12">
      <Link
        href="/admin/professionals"
        className="text-sm font-medium text-navy-500 hover:text-navy-700"
      >
        ← Back to queue
      </Link>

      <div className="mt-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-plum-600">
            Verification review
          </p>
          <h1 className="mt-1 font-serif text-display text-navy-800">
            {pro.displayName}
          </h1>
          <p className="mt-1 text-navy-500">
            {pro.user.email} · applied {formatDate(pro.createdAt)}
          </p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${
            pro.verifiedAt
              ? "bg-forest-50 text-forest-600"
              : "bg-plum-50 text-plum-600"
          }`}
        >
          {pro.verifiedAt ? "Verified" : "Pending"}
        </span>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
          <h2 className="font-serif text-headline text-navy-800">Admission</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-navy-400">Jurisdiction</dt>
              <dd className="text-navy-700">{pro.admissionJurisdiction}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-navy-400">Professional body</dt>
              <dd className="text-navy-700">{pro.professionalBody}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-navy-400">Admission number</dt>
              <dd className="font-mono text-navy-700">{pro.admissionNumber}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-navy-400">Year admitted</dt>
              <dd className="text-navy-700">{pro.admissionYear ?? "—"}</dd>
            </div>
          </dl>
        </section>

        <section
          className={`rounded-2xl border p-6 shadow-card ${
            piExpired
              ? "border-red-200 bg-red-50"
              : "border-navy-100 bg-white"
          }`}
        >
          <h2 className="font-serif text-headline text-navy-800">
            Indemnity cover
          </h2>
          {piExpired && (
            <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-red-700">
              Policy expired
            </p>
          )}
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-navy-400">Insurer</dt>
              <dd className="text-navy-700">{pro.piInsurerName || "—"}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-navy-400">Policy reference</dt>
              <dd className="font-mono text-navy-700">
                {pro.piPolicyNumber || "—"}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-navy-400">Expires</dt>
              <dd className="text-navy-700">
                {formatDate(pro.piPolicyExpiresAt)}
              </dd>
            </div>
          </dl>
        </section>
      </div>

      <section className="mt-6 rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
        <h2 className="font-serif text-headline text-navy-800">
          Practice areas
        </h2>
        {pro.practiceAreas.length === 0 ? (
          <p className="mt-3 text-sm text-navy-400">None selected.</p>
        ) : (
          <div className="mt-4 flex flex-wrap gap-2">
            {pro.practiceAreas.map((pa) => (
              <span
                key={pa.practiceArea.id}
                className="rounded-full border border-navy-200 bg-navy-50 px-3 py-1 text-xs font-medium text-navy-600"
              >
                {pa.practiceArea.name}{" "}
                <span className="text-navy-400">
                  · {pa.practiceArea.jurisdiction}
                </span>
              </span>
            ))}
          </div>
        )}
      </section>

      {pro.bio && (
        <section className="mt-6 rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
          <h2 className="font-serif text-headline text-navy-800">Bio</h2>
          <p className="mt-3 whitespace-pre-wrap text-sm text-navy-600">
            {pro.bio}
          </p>
        </section>
      )}

      {error && (
        <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Decision bar */}
      {!pro.verifiedAt && (
        <div className="mt-8 rounded-2xl border border-navy-200 bg-white p-6 shadow-card">
          {!showReject ? (
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-serif text-lg text-navy-800">
                  Decision
                </p>
                <p className="text-sm text-navy-500">
                  Approving lets this professional accept matters and sign
                  off AI output.
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowReject(true)}
                  disabled={working}
                  className="rounded-lg border border-navy-300 bg-white px-4 py-2 text-sm font-semibold text-navy-700 hover:bg-navy-50 disabled:opacity-50"
                >
                  Reject
                </button>
                <button
                  onClick={approve}
                  disabled={working}
                  className="rounded-lg bg-forest-500 px-4 py-2 text-sm font-semibold text-white hover:bg-forest-600 disabled:opacity-50"
                >
                  {working ? "Approving…" : "Approve"}
                </button>
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-navy-600">
                Reason for rejection
              </label>
              <textarea
                rows={4}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="A short explanation. Will be emailed to the applicant."
                className="mt-2 block w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-sm text-navy-700 focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500"
              />
              <div className="mt-4 flex justify-end gap-2">
                <button
                  onClick={() => setShowReject(false)}
                  disabled={working}
                  className="rounded-lg border border-navy-200 bg-white px-4 py-2 text-sm font-medium text-navy-500 hover:bg-navy-50 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={reject}
                  disabled={working}
                  className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600 disabled:opacity-50"
                >
                  {working ? "Rejecting…" : "Confirm rejection"}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {pro.verifiedAt && (
        <div className="mt-8 rounded-2xl border border-forest-300 bg-forest-50 p-6">
          <p className="text-sm text-forest-700">
            Verified {formatDate(pro.verifiedAt)} by admin {pro.verifiedBy}
          </p>
        </div>
      )}
    </div>
  );
}
