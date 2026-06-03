"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface SignoffActionFormProps {
  signoffId: string;
}

export default function SignoffActionForm({ signoffId }: SignoffActionFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showNotes, setShowNotes] = useState<"amend" | "decline" | null>(null);
  const [notes, setNotes] = useState("");

  async function submit(action: "approve" | "amend" | "decline") {
    if ((action === "amend" || action === "decline") && !notes.trim()) {
      setError(
        action === "amend"
          ? "Please describe the amendments required."
          : "Please provide a reason for declining.",
      );
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch(`/api/signoffs/${signoffId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, notes: notes.trim() || undefined }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
      } else {
        const label =
          action === "approve"
            ? "Approved and signed."
            : action === "amend"
              ? "Amendment notes sent to the requester."
              : "Request declined.";
        setSuccess(label);
        setShowNotes(null);
        setNotes("");
        router.refresh();
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="flex items-center gap-3 rounded-xl bg-forest-50 px-4 py-3">
        <svg
          viewBox="0 0 20 20"
          className="h-5 w-5 flex-shrink-0 text-forest-500"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M5 10l4 4 6-8" />
        </svg>
        <p className="text-sm font-medium text-forest-700">{success}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Notes textarea (shown when amend or decline is selected) */}
      {showNotes && (
        <div>
          <label
            htmlFor={`notes-${signoffId}`}
            className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-navy-500"
          >
            {showNotes === "amend" ? "Amendment notes" : "Reason for declining"}
          </label>
          <textarea
            id={`notes-${signoffId}`}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            placeholder={
              showNotes === "amend"
                ? "Describe what changes are required before you can sign off…"
                : "Explain why this request is being declined…"
            }
            className="w-full rounded-xl border border-navy-200 px-4 py-3 text-sm text-navy-800 placeholder:text-navy-300 focus:border-navy-400 focus:outline-none focus:ring-2 focus:ring-navy-200"
          />
        </div>
      )}

      {error && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-xs font-medium text-red-700">
          {error}
        </p>
      )}

      {/* Action buttons */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Approve */}
        {showNotes !== "amend" && showNotes !== "decline" && (
          <button
            type="button"
            disabled={loading}
            onClick={() => submit("approve")}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-forest-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-forest-700 disabled:opacity-50"
          >
            {loading ? (
              <svg
                className="h-4 w-4 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
            ) : (
              <svg
                viewBox="0 0 20 20"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 10l4 4 6-8" />
              </svg>
            )}
            Approve &amp; sign
          </button>
        )}

        {/* Request amendments */}
        {showNotes === "amend" ? (
          <>
            <button
              type="button"
              disabled={loading}
              onClick={() => submit("amend")}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-amber-600 disabled:opacity-50"
            >
              Send amendment notes
            </button>
            <button
              type="button"
              onClick={() => { setShowNotes(null); setNotes(""); setError(null); }}
              className="inline-flex min-h-[44px] items-center rounded-lg border border-navy-200 px-4 py-2 text-sm font-medium text-navy-500 hover:bg-navy-50"
            >
              Cancel
            </button>
          </>
        ) : showNotes === "decline" ? (
          <>
            <button
              type="button"
              disabled={loading}
              onClick={() => submit("decline")}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:opacity-50"
            >
              Confirm decline
            </button>
            <button
              type="button"
              onClick={() => { setShowNotes(null); setNotes(""); setError(null); }}
              className="inline-flex min-h-[44px] items-center rounded-lg border border-navy-200 px-4 py-2 text-sm font-medium text-navy-500 hover:bg-navy-50"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={() => setShowNotes("amend")}
              className="inline-flex min-h-[44px] items-center rounded-lg border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700 transition-colors hover:bg-amber-100"
            >
              Request amendments
            </button>
            <button
              type="button"
              onClick={() => setShowNotes("decline")}
              className="inline-flex min-h-[44px] items-center rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-100"
            >
              Decline
            </button>
          </>
        )}
      </div>
    </div>
  );
}
