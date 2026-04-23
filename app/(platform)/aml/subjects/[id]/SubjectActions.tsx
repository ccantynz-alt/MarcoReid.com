"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const CHECK_TYPES = [
  "IDENTITY",
  "ADDRESS",
  "PEP",
  "SANCTIONS",
  "ADVERSE_MEDIA",
  "SOURCE_OF_FUNDS",
  "BENEFICIAL_OWNERSHIP",
] as const;

interface Props {
  subjectId: string;
  status: string;
  riskLevel: string;
}

export default function SubjectActions({
  subjectId,
  status,
  riskLevel,
}: Props) {
  const router = useRouter();
  const [type, setType] = useState<string>("IDENTITY");
  const [notes, setNotes] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function runCheck() {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`/api/aml/subjects/${subjectId}/checks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, notes }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Check failed");
      setNotes("");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setBusy(false);
    }
  }

  async function approve() {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`/api/aml/subjects/${subjectId}/approve`, {
        method: "POST",
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Approval failed");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setBusy(false);
    }
  }

  const canApprove =
    status !== "APPROVED" && riskLevel !== "UNACCEPTABLE";

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
        <h3 className="font-serif text-lg text-navy-800">Run a check</h3>
        <div className="mt-4 space-y-3">
          <select
            className="w-full rounded-lg border border-navy-200 bg-white px-3 py-2 text-sm text-navy-700"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            {CHECK_TYPES.map((t) => (
              <option key={t} value={t}>
                {t.replace(/_/g, " ")}
              </option>
            ))}
          </select>
          <textarea
            className="w-full rounded-lg border border-navy-200 bg-white px-3 py-2 text-sm text-navy-700"
            rows={3}
            placeholder="Notes (optional)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          <button
            onClick={runCheck}
            disabled={busy}
            className="w-full rounded-lg bg-navy-500 px-4 py-2 text-sm font-semibold text-white hover:bg-navy-600 disabled:opacity-60"
          >
            {busy ? "Running…" : "Run check"}
          </button>
          <p className="text-xs text-navy-400">
            PEP, sanctions, and adverse-media checks route through the
            screening service automatically.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
        <h3 className="font-serif text-lg text-navy-800">Decision</h3>
        <div className="mt-4 space-y-3">
          <button
            onClick={approve}
            disabled={busy || !canApprove}
            className="w-full rounded-lg bg-forest-500 px-4 py-2 text-sm font-semibold text-white hover:bg-forest-600 disabled:opacity-50"
          >
            {status === "APPROVED" ? "Already approved" : "Approve CDD"}
          </button>
          {!canApprove && riskLevel === "UNACCEPTABLE" && (
            <p className="text-xs text-red-600">
              Subject is UNACCEPTABLE risk. Decline the relationship and,
              where required, file a SAR.
            </p>
          )}
        </div>
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
