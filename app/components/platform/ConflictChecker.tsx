"use client";

import { useState } from "react";
import Link from "next/link";

interface Conflict {
  type: "client" | "matter";
  name: string;
  matchedOn: string;
  matterId?: string;
  clientId?: string;
}

interface CheckResult {
  conflicts: Conflict[];
  clear: boolean;
}

export default function ConflictChecker() {
  const [clientName, setClientName] = useState("");
  const [opposingParties, setOpposingParties] = useState("");
  const [relatedEntities, setRelatedEntities] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CheckResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!clientName.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/conflicts/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientName: clientName.trim(),
          opposingParties: opposingParties
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
          relatedEntities: relatedEntities
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to run conflict check");
      }

      const data: CheckResult = await res.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  function handleClear() {
    setClientName("");
    setOpposingParties("");
    setRelatedEntities("");
    setResult(null);
    setError(null);
  }

  const input =
    "w-full rounded-lg border border-navy-200 bg-white px-4 py-2.5 text-sm text-navy-700 placeholder:text-navy-300 focus:border-navy-500 focus:outline-none focus:ring-2 focus:ring-navy-100 dark:border-navy-600 dark:bg-navy-900 dark:text-white dark:placeholder:text-navy-500 dark:focus:border-navy-400 dark:focus:ring-navy-700";
  const label = "block text-sm font-medium text-navy-600 mb-1.5 dark:text-navy-300";

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className={label}>Client / party name *</label>
          <input
            required
            className={input}
            placeholder="Enter client or party name"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
          />
        </div>
        <div>
          <label className={label}>Opposing parties</label>
          <input
            className={input}
            placeholder="Comma-separated, e.g. Smith Corp, Jane Doe"
            value={opposingParties}
            onChange={(e) => setOpposingParties(e.target.value)}
          />
          <p className="mt-1 text-xs text-navy-400 dark:text-navy-500">
            Optional. Separate multiple parties with commas.
          </p>
        </div>
        <div>
          <label className={label}>Related entities</label>
          <input
            className={input}
            placeholder="Comma-separated, e.g. Acme Holdings, XYZ Ltd"
            value={relatedEntities}
            onChange={(e) => setRelatedEntities(e.target.value)}
          />
          <p className="mt-1 text-xs text-navy-400 dark:text-navy-500">
            Optional. Companies, organisations, or other related entities.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={loading || !clientName.trim()}
            className="inline-flex min-h-touch items-center justify-center rounded-lg bg-navy-500 px-7 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-navy-600 disabled:opacity-50 dark:hover:bg-navy-400"
          >
            {loading ? "Checking..." : "Run Conflict Check"}
          </button>
          {(result || error) && (
            <button
              type="button"
              onClick={handleClear}
              className="inline-flex min-h-touch items-center rounded-lg px-5 py-3 text-sm font-semibold text-navy-500 hover:text-navy-700 dark:text-navy-300 dark:hover:text-white"
            >
              Clear & New Check
            </button>
          )}
        </div>
      </form>

      {error && (
        <div className="rounded-lg border border-plum-200 bg-plum-50 p-4 dark:border-plum-700 dark:bg-plum-900/30">
          <p className="text-sm font-medium text-plum-700 dark:text-plum-300">{error}</p>
        </div>
      )}

      {result?.clear && (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-700 dark:bg-emerald-900/30">
          <div className="flex items-center gap-2">
            <svg
              className="h-5 w-5 text-emerald-600 dark:text-emerald-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
              No conflicts found
            </p>
          </div>
          <p className="mt-1 text-sm text-emerald-600 dark:text-emerald-400">
            No matching clients, opposing parties, or related entities were found in your existing
            records. You may proceed.
          </p>
        </div>
      )}

      {result && !result.clear && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-700 dark:bg-red-900/30">
          <div className="flex items-center gap-2">
            <svg
              className="h-5 w-5 text-red-600 dark:text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
            <p className="text-sm font-semibold text-red-700 dark:text-red-300">
              {result.conflicts.length} potential conflict{result.conflicts.length !== 1 ? "s" : ""}{" "}
              found
            </p>
          </div>
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            Review the following conflicts carefully before proceeding.
          </p>
          <ul className="mt-3 space-y-2">
            {result.conflicts.map((conflict, i) => (
              <li
                key={i}
                className="rounded-md border border-red-100 bg-white p-3 dark:border-red-800 dark:bg-red-900/20"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="inline-block rounded bg-red-100 px-2 py-0.5 text-xs font-semibold uppercase text-red-700 dark:bg-red-800 dark:text-red-200">
                      {conflict.type}
                    </span>
                    <p className="mt-1 text-sm font-medium text-navy-800 dark:text-white">
                      {conflict.name}
                    </p>
                    <p className="text-xs text-navy-500 dark:text-navy-400">
                      {conflict.matchedOn}
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    {conflict.clientId && (
                      <Link
                        href={`/clients/${conflict.clientId}`}
                        className="text-xs font-medium text-navy-500 underline hover:text-navy-700 dark:text-navy-300 dark:hover:text-white"
                      >
                        View client
                      </Link>
                    )}
                    {conflict.matterId && (
                      <Link
                        href={`/matters/${conflict.matterId}`}
                        className="text-xs font-medium text-navy-500 underline hover:text-navy-700 dark:text-navy-300 dark:hover:text-white"
                      >
                        View matter
                      </Link>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
