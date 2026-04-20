"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

interface Pro {
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
  acceptingNewMatters: boolean;
  user: { email: string; name: string | null };
  practiceAreas: { practiceArea: { name: string; jurisdiction: string; domain: string } }[];
  createdAt: string;
}

export default function AdminProfessionalsPage() {
  const { data: session, status } = useSession();
  const [pros, setPros] = useState<Pro[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const isAdmin = (session?.user as { role?: string })?.role === "ADMIN";

  useEffect(() => {
    if (status === "authenticated" && !isAdmin) {
      redirect("/dashboard");
    }
  }, [status, isAdmin]);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/professionals");
    const data = await res.json();
    setPros(data.professionals ?? []);
    setLoading(false);
  }

  useEffect(() => {
    if (isAdmin) load();
  }, [isAdmin]);

  async function act(id: string, action: "verify" | "unverify") {
    setBusyId(id);
    setError(null);
    try {
      const res = await fetch(`/api/admin/professionals/${id}/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data?.error ?? "Failed");
        setBusyId(null);
        return;
      }
      await load();
      setBusyId(null);
    } catch {
      setError("Network error");
      setBusyId(null);
    }
  }

  if (!isAdmin) return null;

  const pending = pros.filter((p) => !p.verifiedAt);
  const verified = pros.filter((p) => !!p.verifiedAt);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <nav className="mb-6 text-sm">
        <Link href="/admin" className="text-navy-500 hover:text-navy-700 dark:text-navy-300">
          &larr; Admin home
        </Link>
      </nav>
      <h1 className="font-serif text-3xl text-navy-800 dark:text-white">
        Professional verification
      </h1>
      <p className="mt-2 text-sm text-navy-500 dark:text-navy-300">
        Confirm admission with the professional body, check PI currency, and
        verify. Unverified pros cannot accept matters.
      </p>

      {error && (
        <p className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </p>
      )}

      {loading ? (
        <p className="mt-8 text-navy-400">Loading…</p>
      ) : (
        <>
          <Section title={`Pending verification (${pending.length})`}>
            {pending.length === 0 ? (
              <p className="text-sm text-navy-400">No pending applications.</p>
            ) : (
              <ProTable pros={pending} busyId={busyId} onAction={act} />
            )}
          </Section>

          <Section title={`Verified (${verified.length})`} className="mt-10">
            {verified.length === 0 ? (
              <p className="text-sm text-navy-400">No verified professionals yet.</p>
            ) : (
              <ProTable pros={verified} busyId={busyId} onAction={act} />
            )}
          </Section>
        </>
      )}
    </div>
  );
}

function Section({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={className}>
      <h2 className="mt-8 font-serif text-xl text-navy-800 dark:text-white">
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function ProTable({
  pros,
  busyId,
  onAction,
}: {
  pros: Pro[];
  busyId: string | null;
  onAction: (id: string, action: "verify" | "unverify") => void;
}) {
  return (
    <ul className="space-y-3">
      {pros.map((p) => {
        const piOk =
          !!p.piPolicyExpiresAt && new Date(p.piPolicyExpiresAt).getTime() > Date.now();
        return (
          <li
            key={p.id}
            className="rounded-xl border border-navy-100 bg-white p-5 dark:border-navy-700 dark:bg-navy-800"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="font-serif text-lg text-navy-800 dark:text-white">
                  {p.displayName}{" "}
                  <span className="text-xs text-navy-400">{p.user.email}</span>
                </p>
                <p className="mt-1 text-sm text-navy-500 dark:text-navy-300">
                  {p.professionalBody} · {p.admissionJurisdiction} · #{p.admissionNumber}
                  {p.admissionYear ? ` · ${p.admissionYear}` : ""}
                </p>
                <p className="mt-1 text-sm text-navy-500 dark:text-navy-300">
                  PI: {p.piInsurerName ?? "—"} · {p.piPolicyNumber ?? "—"} ·{" "}
                  {p.piPolicyExpiresAt ? (
                    <span className={piOk ? "text-forest-700" : "text-red-600"}>
                      exp {new Date(p.piPolicyExpiresAt).toLocaleDateString()}
                    </span>
                  ) : (
                    <span className="text-red-600">missing</span>
                  )}
                </p>
                {p.practiceAreas.length > 0 && (
                  <p className="mt-2 text-xs text-navy-500">
                    Areas:{" "}
                    {p.practiceAreas
                      .map((a) => `${a.practiceArea.name} (${a.practiceArea.jurisdiction})`)
                      .join(", ")}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2">
                {p.verifiedAt ? (
                  <>
                    <span className="rounded-full bg-forest-100 px-3 py-1 text-xs font-semibold text-forest-800">
                      Verified {new Date(p.verifiedAt).toLocaleDateString()}
                    </span>
                    <button
                      type="button"
                      onClick={() => onAction(p.id, "unverify")}
                      disabled={busyId === p.id}
                      className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-50 disabled:opacity-50"
                    >
                      Unverify
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => onAction(p.id, "verify")}
                    disabled={busyId === p.id}
                    className="rounded-lg bg-forest-500 px-4 py-2 text-sm font-semibold text-white hover:bg-forest-600 disabled:opacity-50"
                  >
                    {busyId === p.id ? "…" : "Verify"}
                  </button>
                )}
              </div>
            </div>
            {p.bio && (
              <p className="mt-3 rounded-lg bg-navy-50 p-3 text-sm text-navy-700 dark:bg-navy-900 dark:text-navy-300">
                {p.bio}
              </p>
            )}
          </li>
        );
      })}
    </ul>
  );
}
