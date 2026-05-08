"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  signoffId: string;
  defaultJurisdiction: string;
}

type Status = "idle" | "approving" | "rejecting" | "error";

const CREDENTIAL_OPTIONS = [
  "Barrister & Solicitor (NZ)",
  "Solicitor (NZ)",
  "Australian Legal Practitioner",
  "Australian Solicitor",
  "Australian Barrister",
  "Solicitor of England and Wales",
  "Barrister (UK)",
  "US Attorney",
  "Chartered Accountant (CA ANZ)",
  "CPA Australia",
  "CPA (US)",
  "ICAEW Member",
  "Tax Agent (NZ)",
  "Tax Agent (AU)",
  "Registered Insolvency Practitioner (NZ)",
  "Registered Liquidator (AU)",
  "Licensed Immigration Adviser (NZ)",
  "Registered Migration Agent (AU)",
] as const;

export default function SignoffApproveForm({
  signoffId,
  defaultJurisdiction,
}: Props) {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [credential, setCredential] = useState<string>(
    CREDENTIAL_OPTIONS[0],
  );
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [reviewerNotes, setReviewerNotes] = useState("");
  const [jurisdiction, setJurisdiction] = useState(defaultJurisdiction);

  async function approve() {
    setStatus("approving");
    setError(null);
    try {
      const res = await fetch(`/api/admin/signoffs/${signoffId}/approve`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          credential,
          registrationNumber: registrationNumber.trim(),
          jurisdiction: jurisdiction.trim() || defaultJurisdiction,
          reviewerNotes: reviewerNotes.trim() || null,
        }),
      });
      const j = await res.json();
      if (!res.ok) {
        setError(j.error || "Could not approve.");
        setStatus("error");
        return;
      }
      router.refresh();
    } catch {
      setError("Network error.");
      setStatus("error");
    }
  }

  async function reject() {
    if (!reviewerNotes.trim()) {
      setError("Please add a note explaining why this is rejected.");
      setStatus("error");
      return;
    }
    setStatus("rejecting");
    setError(null);
    try {
      const res = await fetch(`/api/admin/signoffs/${signoffId}/reject`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reviewerNotes: reviewerNotes.trim() }),
      });
      const j = await res.json();
      if (!res.ok) {
        setError(j.error || "Could not reject.");
        setStatus("error");
        return;
      }
      router.refresh();
    } catch {
      setError("Network error.");
      setStatus("error");
    }
  }

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-navy-500">
        Review action
      </p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor={`credential-${signoffId}`}
            className="block text-xs font-semibold text-navy-600"
          >
            Credential of approver
          </label>
          <select
            id={`credential-${signoffId}`}
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-navy-200 bg-white px-3 py-2 text-sm text-navy-800 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-200"
          >
            {CREDENTIAL_OPTIONS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor={`reg-${signoffId}`}
            className="block text-xs font-semibold text-navy-600"
          >
            Registration / bar number
          </label>
          <input
            id={`reg-${signoffId}`}
            type="text"
            value={registrationNumber}
            onChange={(e) => setRegistrationNumber(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-navy-200 bg-white px-3 py-2 text-sm text-navy-800 placeholder:text-navy-300 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-200"
            placeholder="e.g. NZ Bar 12345"
          />
        </div>
        <div>
          <label
            htmlFor={`juris-${signoffId}`}
            className="block text-xs font-semibold text-navy-600"
          >
            Jurisdiction of admission
          </label>
          <input
            id={`juris-${signoffId}`}
            type="text"
            value={jurisdiction}
            onChange={(e) => setJurisdiction(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-navy-200 bg-white px-3 py-2 text-sm text-navy-800 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-200"
          />
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor={`notes-${signoffId}`}
            className="block text-xs font-semibold text-navy-600"
          >
            Reviewer notes (required for rejection)
          </label>
          <textarea
            id={`notes-${signoffId}`}
            rows={3}
            value={reviewerNotes}
            onChange={(e) => setReviewerNotes(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-navy-200 bg-white px-3 py-2 text-sm text-navy-800 placeholder:text-navy-300 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-200"
            placeholder="Brief notes about the review. Stamped on the audit trail."
          />
        </div>
      </div>

      {error && (
        <p
          role="alert"
          className="mt-4 rounded-lg border border-plum-200 bg-plum-50 px-3 py-2 text-xs text-plum-700"
        >
          {error}
        </p>
      )}

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={approve}
          disabled={status === "approving" || status === "rejecting"}
          className="inline-flex items-center justify-center rounded-lg bg-forest-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-forest-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "approving" ? "Approving…" : "Approve & sign"}
        </button>
        <button
          type="button"
          onClick={reject}
          disabled={status === "approving" || status === "rejecting"}
          className="inline-flex items-center justify-center rounded-lg border border-plum-300 bg-white px-4 py-2 text-sm font-semibold text-plum-700 transition-colors hover:bg-plum-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "rejecting" ? "Rejecting…" : "Reject"}
        </button>
      </div>
    </div>
  );
}
