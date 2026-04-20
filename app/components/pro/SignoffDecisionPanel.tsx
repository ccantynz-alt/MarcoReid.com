"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignoffDecisionPanel({
  signoffId,
  originalOutput,
}: {
  signoffId: string;
  originalOutput: string;
}) {
  const router = useRouter();
  const [mode, setMode] = useState<"idle" | "amend" | "reject">("idle");
  const [amendedOutput, setAmendedOutput] = useState(originalOutput);
  const [notes, setNotes] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function decide(decision: "approve" | "amend" | "reject") {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`/api/marketplace/signoff/${signoffId}/decide`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          decision,
          amendedOutput: decision === "amend" ? amendedOutput : undefined,
          reviewerNotes: notes || undefined,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data?.error ?? "Failed");
        setBusy(false);
        return;
      }
      router.refresh();
    } catch {
      setError("Network error");
      setBusy(false);
    }
  }

  return (
    <div className="mt-5">
      {mode === "idle" && (
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => decide("approve")}
            disabled={busy}
            className="rounded-lg bg-forest-500 px-5 py-2 text-sm font-semibold text-white hover:bg-forest-600 disabled:opacity-50"
          >
            {busy ? "…" : "Approve & release"}
          </button>
          <button
            type="button"
            onClick={() => setMode("amend")}
            disabled={busy}
            className="rounded-lg border border-navy-300 bg-white px-5 py-2 text-sm font-semibold text-navy-700 hover:bg-navy-50 disabled:opacity-50"
          >
            Amend
          </button>
          <button
            type="button"
            onClick={() => setMode("reject")}
            disabled={busy}
            className="rounded-lg border border-red-200 bg-white px-5 py-2 text-sm font-semibold text-red-700 hover:bg-red-50 disabled:opacity-50"
          >
            Reject
          </button>
          {error && <span className="text-sm text-red-600">{error}</span>}
        </div>
      )}

      {mode === "amend" && (
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-navy-500">
            Amended output
          </label>
          <textarea
            value={amendedOutput}
            onChange={(e) => setAmendedOutput(e.target.value)}
            rows={14}
            className="mt-2 w-full rounded-lg border border-navy-200 px-4 py-3 font-mono text-sm focus:border-gold-400 focus:outline-none"
          />
          <label className="mt-3 block text-xs font-semibold uppercase tracking-wider text-navy-500">
            Reviewer notes
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            placeholder="What did you change and why?"
            className="mt-2 w-full rounded-lg border border-navy-200 px-4 py-3 text-sm focus:border-gold-400 focus:outline-none"
          />
          {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
          <div className="mt-4 flex items-center gap-3">
            <button
              type="button"
              onClick={() => decide("amend")}
              disabled={busy || amendedOutput === originalOutput}
              className="rounded-lg bg-plum-600 px-5 py-2 text-sm font-semibold text-white hover:bg-plum-700 disabled:opacity-50"
            >
              {busy ? "…" : "Release amended"}
            </button>
            <button
              type="button"
              onClick={() => setMode("idle")}
              disabled={busy}
              className="text-sm text-navy-500 hover:text-navy-700"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {mode === "reject" && (
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-navy-500">
            Rejection notes
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            placeholder="Why is this output being rejected? (Required)"
            className="mt-2 w-full rounded-lg border border-navy-200 px-4 py-3 text-sm focus:border-gold-400 focus:outline-none"
          />
          {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
          <div className="mt-4 flex items-center gap-3">
            <button
              type="button"
              onClick={() => decide("reject")}
              disabled={busy || notes.trim().length < 10}
              className="rounded-lg bg-red-600 px-5 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50"
            >
              {busy ? "…" : "Reject"}
            </button>
            <button
              type="button"
              onClick={() => setMode("idle")}
              disabled={busy}
              className="text-sm text-navy-500 hover:text-navy-700"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
