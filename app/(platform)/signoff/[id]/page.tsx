"use client";

import Link from "next/link";
import { useEffect, useState, use as usePromise } from "react";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

interface AuditEntry {
  id: string;
  action: string;
  payloadSha256: string;
  notes: string | null;
  occurredAt: string;
  actorUserId: string;
}

interface SignoffDetail {
  id: string;
  kind: string;
  aiOutput: string;
  outputSha256: string;
  amendedOutput: string | null;
  amendedSha256: string | null;
  rationale: string | null;
  status: string;
  reviewerNotes: string | null;
  requestedAt: string;
  reviewedAt: string | null;
  releasedAt: string | null;
  proMatter: {
    id: string;
    summary: string;
    details: string;
    jurisdiction: string;
    practiceArea: { id: string; name: string };
    citizen: { name: string | null; email: string };
  };
  auditEntries: AuditEntry[];
}

function formatDate(d: string | null) {
  if (!d) return "—";
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(d));
}

type Mode = "view" | "approve" | "reject" | "amend";

export default function SignoffReviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = usePromise(params);
  const router = useRouter();
  const { status } = useSession();
  const [signoff, setSignoff] = useState<SignoffDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<Mode>("view");
  const [working, setWorking] = useState(false);
  const [error, setError] = useState("");
  const [reason, setReason] = useState("");
  const [amendText, setAmendText] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") redirect("/login");
  }, [status]);

  useEffect(() => {
    if (status !== "authenticated") return;
    fetch(`/api/signoff/${id}`)
      .then((r) => r.json())
      .then((d) => {
        setSignoff(d.signoff || null);
        setAmendText(d.signoff?.amendedOutput || d.signoff?.aiOutput || "");
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id, status]);

  async function act(
    endpoint: "approve" | "reject" | "amend",
    body: Record<string, unknown>,
  ) {
    setWorking(true);
    setError("");
    try {
      const res = await fetch(`/api/signoff/${id}/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Could not record decision");
      }
      router.push("/signoff");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setWorking(false);
    }
  }

  if (status === "loading" || loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-navy-400">Loading…</p>
      </div>
    );
  }

  if (!signoff) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-16">
        <p className="font-serif text-headline text-navy-800">
          Sign-off request not found.
        </p>
        <Link
          href="/signoff"
          className="mt-4 inline-block text-sm font-medium text-navy-500 hover:text-navy-700"
        >
          ← Back to queue
        </Link>
      </div>
    );
  }

  const isPending = signoff.status === "PENDING";
  const released = signoff.status === "APPROVED" || signoff.status === "AMENDED";

  return (
    <div className="mx-auto max-w-4xl px-6 py-12 sm:px-8 lg:px-12">
      <Link
        href="/signoff"
        className="text-sm font-medium text-navy-500 hover:text-navy-700"
      >
        ← Back to queue
      </Link>

      <div className="mt-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">
            Sign-off review · {signoff.kind}
          </p>
          <h1 className="mt-1 font-serif text-display text-navy-800">
            {signoff.proMatter.summary}
          </h1>
          <p className="mt-1 text-navy-500">
            {signoff.proMatter.practiceArea.name} ·{" "}
            {signoff.proMatter.jurisdiction} · citizen{" "}
            {signoff.proMatter.citizen.name || signoff.proMatter.citizen.email}
          </p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${
            signoff.status === "PENDING"
              ? "bg-plum-50 text-plum-600"
              : signoff.status === "APPROVED"
                ? "bg-forest-50 text-forest-600"
                : signoff.status === "AMENDED"
                  ? "bg-gold-50 text-gold-700"
                  : "bg-red-50 text-red-600"
          }`}
        >
          {signoff.status}
        </span>
      </div>

      {/* Matter context */}
      <section className="mt-8 rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
        <h2 className="font-serif text-headline text-navy-800">
          Matter context
        </h2>
        <p className="mt-3 whitespace-pre-wrap text-sm text-navy-600">
          {signoff.proMatter.details}
        </p>
      </section>

      {/* AI output */}
      <section className="mt-6 rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-headline text-navy-800">
            AI-generated output
          </h2>
          <span className="font-mono text-[10px] text-navy-400">
            sha256 · {signoff.outputSha256.slice(0, 12)}…
          </span>
        </div>
        {signoff.rationale && (
          <p className="mt-3 rounded-lg border border-navy-100 bg-navy-50 p-3 text-xs text-navy-500">
            <span className="font-semibold text-navy-700">Rationale:</span>{" "}
            {signoff.rationale}
          </p>
        )}
        <pre className="mt-4 max-h-[480px] overflow-auto whitespace-pre-wrap rounded-lg border border-navy-100 bg-navy-50/40 p-4 font-sans text-sm text-navy-700">
          {signoff.aiOutput}
        </pre>
      </section>

      {signoff.amendedOutput && (
        <section className="mt-6 rounded-2xl border border-gold-200 bg-gold-50/30 p-6 shadow-card">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-headline text-navy-800">
              Amended version
            </h2>
            <span className="font-mono text-[10px] text-navy-400">
              sha256 · {signoff.amendedSha256?.slice(0, 12)}…
            </span>
          </div>
          <pre className="mt-4 max-h-[480px] overflow-auto whitespace-pre-wrap rounded-lg border border-gold-200 bg-white p-4 font-sans text-sm text-navy-700">
            {signoff.amendedOutput}
          </pre>
        </section>
      )}

      {signoff.reviewerNotes && (
        <section className="mt-6 rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
          <h2 className="font-serif text-headline text-navy-800">
            Reviewer notes
          </h2>
          <p className="mt-3 whitespace-pre-wrap text-sm text-navy-600">
            {signoff.reviewerNotes}
          </p>
        </section>
      )}

      {/* Action panel */}
      {isPending && (
        <section className="mt-8 rounded-2xl border border-navy-200 bg-white p-6 shadow-card">
          {mode === "view" && (
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-serif text-lg text-navy-800">
                  Your decision
                </p>
                <p className="text-sm text-navy-500">
                  Approve to release, amend to send a corrected version,
                  or reject for another pass. Every choice is hashed and
                  audit-logged.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setMode("reject")}
                  className="rounded-lg border border-red-300 bg-white px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
                >
                  Reject
                </button>
                <button
                  onClick={() => setMode("amend")}
                  className="rounded-lg border border-gold-400 bg-white px-4 py-2 text-sm font-semibold text-gold-700 hover:bg-gold-50"
                >
                  Amend
                </button>
                <button
                  onClick={() => setMode("approve")}
                  className="rounded-lg bg-forest-500 px-4 py-2 text-sm font-semibold text-white hover:bg-forest-600"
                >
                  Approve
                </button>
              </div>
            </div>
          )}

          {mode === "approve" && (
            <div>
              <p className="font-serif text-lg text-navy-800">
                Approve and release
              </p>
              <label className="mt-4 block text-sm font-medium text-navy-600">
                Optional notes
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="mt-2 block w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-sm text-navy-700 focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500"
              />
              {error && (
                <div className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                  {error}
                </div>
              )}
              <div className="mt-4 flex justify-end gap-2">
                <button
                  onClick={() => setMode("view")}
                  className="rounded-lg border border-navy-200 bg-white px-4 py-2 text-sm font-medium text-navy-500 hover:bg-navy-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => act("approve", { notes })}
                  disabled={working}
                  className="rounded-lg bg-forest-500 px-4 py-2 text-sm font-semibold text-white hover:bg-forest-600 disabled:opacity-50"
                >
                  {working ? "Approving…" : "Confirm approval"}
                </button>
              </div>
            </div>
          )}

          {mode === "reject" && (
            <div>
              <p className="font-serif text-lg text-navy-800">
                Send back for another pass
              </p>
              <label className="mt-4 block text-sm font-medium text-navy-600">
                Reason (visible to the citizen and audit log)
              </label>
              <textarea
                rows={4}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="What needs to change before this can go out?"
                className="mt-2 block w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-sm text-navy-700 focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500"
              />
              {error && (
                <div className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                  {error}
                </div>
              )}
              <div className="mt-4 flex justify-end gap-2">
                <button
                  onClick={() => setMode("view")}
                  className="rounded-lg border border-navy-200 bg-white px-4 py-2 text-sm font-medium text-navy-500 hover:bg-navy-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => act("reject", { reason })}
                  disabled={working || !reason.trim()}
                  className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600 disabled:opacity-50"
                >
                  {working ? "Rejecting…" : "Confirm rejection"}
                </button>
              </div>
            </div>
          )}

          {mode === "amend" && (
            <div>
              <p className="font-serif text-lg text-navy-800">
                Write the corrected version
              </p>
              <p className="mt-1 text-sm text-navy-500">
                The corrected text is what the citizen receives. The
                original AI draft and your amendment are both hashed and
                kept on file.
              </p>
              <label className="mt-4 block text-sm font-medium text-navy-600">
                Amended output
              </label>
              <textarea
                rows={14}
                value={amendText}
                onChange={(e) => setAmendText(e.target.value)}
                className="mt-2 block w-full rounded-lg border border-navy-200 bg-white px-4 py-3 font-mono text-sm text-navy-700 focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500"
              />
              <label className="mt-4 block text-sm font-medium text-navy-600">
                Optional notes
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="mt-2 block w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-sm text-navy-700 focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500"
              />
              {error && (
                <div className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                  {error}
                </div>
              )}
              <div className="mt-4 flex justify-end gap-2">
                <button
                  onClick={() => setMode("view")}
                  className="rounded-lg border border-navy-200 bg-white px-4 py-2 text-sm font-medium text-navy-500 hover:bg-navy-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() =>
                    act("amend", { amendedOutput: amendText, notes })
                  }
                  disabled={working || !amendText.trim()}
                  className="rounded-lg bg-gold-500 px-4 py-2 text-sm font-semibold text-white hover:bg-gold-600 disabled:opacity-50"
                >
                  {working ? "Amending…" : "Sign off the amendment"}
                </button>
              </div>
            </div>
          )}
        </section>
      )}

      {released && (
        <div className="mt-8 rounded-2xl border border-forest-300 bg-forest-50 p-5 text-sm text-forest-700">
          Released to citizen on {formatDate(signoff.releasedAt)}.
        </div>
      )}

      {/* Audit trail */}
      <section className="mt-8 rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
        <h2 className="font-serif text-headline text-navy-800">
          Audit trail
        </h2>
        {signoff.auditEntries.length === 0 ? (
          <p className="mt-3 text-sm text-navy-400">
            No actions recorded yet.
          </p>
        ) : (
          <ul className="mt-4 space-y-3">
            {signoff.auditEntries.map((a) => (
              <li
                key={a.id}
                className="rounded-lg border border-navy-100 bg-navy-50/40 p-3 text-sm"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded bg-navy-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                    {a.action}
                  </span>
                  <span className="text-navy-500">
                    {formatDate(a.occurredAt)}
                  </span>
                  <span className="font-mono text-[10px] text-navy-400">
                    sha256 · {a.payloadSha256.slice(0, 12)}…
                  </span>
                </div>
                {a.notes && (
                  <p className="mt-2 text-navy-600">{a.notes}</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
