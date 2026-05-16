"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { JURISDICTIONS } from "@/lib/jurisdictions";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface KYCClient {
  id: string;
  name: string;
  kycStatus: string;
  kycVerifiedAt: string | null;
  kycRiskLevel: string | null;
  identityDocType: string | null;
  sourceOfFunds: string | null;
  isPEP: boolean;
  kycNotes: string | null;
}

interface KYCVerificationProps {
  client: KYCClient;
  jurisdiction?: string;
}

/* ------------------------------------------------------------------ */
/*  AML requirement text per jurisdiction                              */
/* ------------------------------------------------------------------ */

const AML_REQUIREMENTS: Record<string, string> = {
  NZ: "AML/CFT Act 2009 — customer due diligence required",
  AU: "AML/CTF Act 2006 — customer identification required",
  UK: "MLR 2017 — customer due diligence required",
  US: "FinCEN CDD Rule — beneficial ownership required",
  CA: "PCMLTFA — client identification required",
};

/* ------------------------------------------------------------------ */
/*  Status badge                                                       */
/* ------------------------------------------------------------------ */

const STATUS_STYLES: Record<string, string> = {
  pending:  "bg-amber-50 text-amber-700 border-amber-200",
  verified: "bg-forest-50 text-forest-700 border-forest-200",
  flagged:  "bg-red-50 text-red-700 border-red-200",
  expired:  "bg-navy-50 text-navy-500 border-navy-200",
};

const STATUS_LABELS: Record<string, string> = {
  pending:  "Pending",
  verified: "Verified",
  flagged:  "Flagged",
  expired:  "Expired",
};

function StatusBadge({ status }: { status: string }) {
  const style = STATUS_STYLES[status] ?? STATUS_STYLES.pending;
  const label = STATUS_LABELS[status] ?? status;
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-0.5 text-xs font-semibold ${style}`}
    >
      {label}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Risk guidance                                                      */
/* ------------------------------------------------------------------ */

const RISK_GUIDANCE: Record<string, { label: string; description: string; colour: string }> = {
  low: {
    label: "Low",
    description: "Standard client, domestic, known business",
    colour: "text-forest-600",
  },
  medium: {
    label: "Medium",
    description: "International client, complex structure, high-value matter",
    colour: "text-amber-600",
  },
  high: {
    label: "High",
    description: "PEP, unusual source of funds, sanctioned country",
    colour: "text-red-600",
  },
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function KYCVerification({ client, jurisdiction }: KYCVerificationProps) {
  const router = useRouter();

  /* Expand / collapse the form */
  const [expanded, setExpanded] = useState(false);

  /* Form state */
  const [identityDocType, setIdentityDocType] = useState(client.identityDocType ?? "");
  const [identityDocRef, setIdentityDocRef] = useState("");
  const [sourceOfFunds, setSourceOfFunds] = useState(client.sourceOfFunds ?? "");
  const [isPEP, setIsPEP] = useState(client.isPEP);
  const [kycRiskLevel, setKycRiskLevel] = useState(client.kycRiskLevel ?? "");
  const [kycNotes, setKycNotes] = useState(client.kycNotes ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /* Jurisdiction info */
  const jurisdictionCode = jurisdiction?.toUpperCase();
  const jurisdictionData = jurisdictionCode ? JURISDICTIONS[jurisdictionCode] : undefined;
  const amlRequirement = jurisdictionCode ? AML_REQUIREMENTS[jurisdictionCode] : undefined;

  /* ---------------------------------------------------------------- */
  /*  Submit verification                                              */
  /* ---------------------------------------------------------------- */

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!identityDocType || !sourceOfFunds || !kycRiskLevel) {
      setError("Please complete all required fields before verifying.");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(`/api/clients/${client.id}/kyc`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kycStatus: "verified",
          kycRiskLevel,
          identityDocType,
          identityDocRef: identityDocRef.trim() || null,
          sourceOfFunds,
          isPEP,
          kycNotes: kycNotes.trim() || null,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Verification failed.");
      router.refresh();
      setExpanded(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSaving(false);
    }
  }

  /* ---------------------------------------------------------------- */
  /*  Flag client                                                      */
  /* ---------------------------------------------------------------- */

  async function handleFlag() {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`/api/clients/${client.id}/kyc`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kycStatus: "flagged",
          kycRiskLevel: kycRiskLevel || "high",
          identityDocType: identityDocType || null,
          identityDocRef: identityDocRef.trim() || null,
          sourceOfFunds: sourceOfFunds || null,
          isPEP,
          kycNotes: kycNotes.trim() || null,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Could not flag client.");
      router.refresh();
      setExpanded(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSaving(false);
    }
  }

  /* ---------------------------------------------------------------- */
  /*  Render                                                           */
  /* ---------------------------------------------------------------- */

  const inputClass =
    "mt-1 block w-full rounded-lg border border-navy-200 bg-white px-4 py-2.5 text-sm text-navy-700 focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500";

  const selectClass =
    "mt-1 block w-full rounded-lg border border-navy-200 bg-white px-4 py-2.5 text-sm text-navy-700 focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500";

  return (
    <div className="rounded-2xl border border-navy-100 bg-white shadow-card">
      {/* Header bar */}
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors hover:bg-navy-50/40"
      >
        <div className="flex items-center gap-3">
          {/* Shield icon */}
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy-100">
            <svg
              className="h-5 w-5 text-navy-600"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-navy-800">
              AML / KYC Verification
            </h3>
            <p className="mt-0.5 text-xs text-navy-400">
              Anti-Money Laundering &amp; Know Your Client
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <StatusBadge status={client.kycStatus} />
          <svg
            className={`h-4 w-4 text-navy-400 transition-transform ${expanded ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </button>

      {/* Verification summary (always visible when verified) */}
      {client.kycStatus === "verified" && !expanded && (
        <div className="border-t border-navy-50 px-6 py-4">
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-navy-500">
            {client.kycVerifiedAt && (
              <span>
                Verified{" "}
                {new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(
                  new Date(client.kycVerifiedAt),
                )}
              </span>
            )}
            {client.kycRiskLevel && (
              <span>
                Risk:{" "}
                <span className={RISK_GUIDANCE[client.kycRiskLevel]?.colour ?? ""}>
                  {RISK_GUIDANCE[client.kycRiskLevel]?.label ?? client.kycRiskLevel}
                </span>
              </span>
            )}
            {client.identityDocType && (
              <span>ID: {client.identityDocType.replace("_", " ")}</span>
            )}
            {client.sourceOfFunds && (
              <span>Source of funds: {client.sourceOfFunds}</span>
            )}
            {client.isPEP && (
              <span className="font-semibold text-red-600">PEP</span>
            )}
          </div>
        </div>
      )}

      {/* Expanded form */}
      {expanded && (
        <div className="border-t border-navy-100 px-6 py-6">
          {/* Jurisdiction-specific requirement */}
          {amlRequirement && jurisdictionData && (
            <div className="mb-6 rounded-lg border border-navy-100 bg-navy-50/50 px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-navy-500">
                {jurisdictionData.flag} {jurisdictionData.name} requirement
              </p>
              <p className="mt-1 text-sm text-navy-700">{amlRequirement}</p>
            </div>
          )}

          {/* If no specific jurisdiction, show all */}
          {!jurisdictionCode && (
            <div className="mb-6 rounded-lg border border-navy-100 bg-navy-50/50 px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-navy-500">
                Jurisdiction requirements
              </p>
              <ul className="mt-2 space-y-1">
                {Object.entries(AML_REQUIREMENTS).map(([code, req]) => {
                  const j = JURISDICTIONS[code];
                  return (
                    <li key={code} className="text-xs text-navy-600">
                      <span className="font-medium">
                        {j?.flag} {j?.name ?? code}:
                      </span>{" "}
                      {req}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          <form onSubmit={handleVerify} className="space-y-5">
            {/* Identity document */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="kyc-doc-type"
                  className="block text-sm font-medium text-navy-600"
                >
                  Identity document type <span className="text-red-500">*</span>
                </label>
                <select
                  id="kyc-doc-type"
                  value={identityDocType}
                  onChange={(e) => setIdentityDocType(e.target.value)}
                  className={selectClass}
                >
                  <option value="">Select document type</option>
                  <option value="passport">Passport</option>
                  <option value="drivers_licence">Driver&apos;s licence</option>
                  <option value="national_id">National ID</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="kyc-doc-ref"
                  className="block text-sm font-medium text-navy-600"
                >
                  Document reference number
                </label>
                <input
                  id="kyc-doc-ref"
                  type="text"
                  value={identityDocRef}
                  onChange={(e) => setIdentityDocRef(e.target.value)}
                  placeholder="e.g. AB1234567"
                  className={inputClass}
                />
              </div>
            </div>

            {/* Source of funds */}
            <div>
              <label
                htmlFor="kyc-source"
                className="block text-sm font-medium text-navy-600"
              >
                Source of funds <span className="text-red-500">*</span>
              </label>
              <select
                id="kyc-source"
                value={sourceOfFunds}
                onChange={(e) => setSourceOfFunds(e.target.value)}
                className={selectClass}
              >
                <option value="">Select source of funds</option>
                <option value="employment">Employment</option>
                <option value="business">Business</option>
                <option value="investment">Investment</option>
                <option value="inheritance">Inheritance</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* PEP check */}
            <div className="rounded-lg border border-navy-100 bg-navy-50/30 px-4 py-3">
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={isPEP}
                  onChange={(e) => setIsPEP(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-navy-300 text-navy-600 focus:ring-navy-500"
                />
                <div>
                  <span className="text-sm font-medium text-navy-700">
                    Politically Exposed Person (PEP)
                  </span>
                  <p className="mt-0.5 text-xs text-navy-400">
                    Is this client, or a close associate/family member, a current or former
                    senior political figure, government official, or senior executive of a
                    state-owned enterprise?
                  </p>
                </div>
              </label>
            </div>

            {/* Risk assessment */}
            <div>
              <label
                htmlFor="kyc-risk"
                className="block text-sm font-medium text-navy-600"
              >
                Risk assessment <span className="text-red-500">*</span>
              </label>
              <select
                id="kyc-risk"
                value={kycRiskLevel}
                onChange={(e) => setKycRiskLevel(e.target.value)}
                className={selectClass}
              >
                <option value="">Select risk level</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              {/* Risk guidance */}
              <div className="mt-3 space-y-1.5">
                {Object.entries(RISK_GUIDANCE).map(([key, g]) => (
                  <div key={key} className="flex items-start gap-2 text-xs">
                    <span
                      className={`mt-px inline-block h-2 w-2 flex-shrink-0 rounded-full ${
                        key === "low"
                          ? "bg-forest-400"
                          : key === "medium"
                            ? "bg-amber-400"
                            : "bg-red-400"
                      }`}
                    />
                    <span className="text-navy-500">
                      <span className={`font-semibold ${g.colour}`}>{g.label}:</span>{" "}
                      {g.description}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div>
              <label
                htmlFor="kyc-notes"
                className="block text-sm font-medium text-navy-600"
              >
                Verification notes
              </label>
              <textarea
                id="kyc-notes"
                rows={3}
                value={kycNotes}
                onChange={(e) => setKycNotes(e.target.value)}
                placeholder="Observations, additional checks performed, documents sighted..."
                className={inputClass}
              />
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3 border-t border-navy-100 pt-5">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center rounded-lg bg-forest-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-forest-700 disabled:opacity-50"
              >
                {saving ? "Saving..." : "Mark as Verified"}
              </button>
              <button
                type="button"
                onClick={handleFlag}
                disabled={saving}
                className="inline-flex items-center rounded-lg border border-red-200 bg-white px-5 py-2.5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50"
              >
                Flag for Review
              </button>
              <button
                type="button"
                onClick={() => setExpanded(false)}
                className="inline-flex items-center rounded-lg border border-navy-200 bg-white px-5 py-2.5 text-sm font-medium text-navy-600 transition-colors hover:border-navy-400"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
