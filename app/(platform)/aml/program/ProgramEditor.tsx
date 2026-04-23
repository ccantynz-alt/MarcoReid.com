"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const JURISDICTIONS = [
  { value: "AU_AUSTRAC", label: "Australia — AUSTRAC (Tranche 2)" },
  { value: "NZ_DIA", label: "New Zealand — DIA" },
  { value: "UK_HMRC", label: "United Kingdom — HMRC" },
  { value: "US_FINCEN", label: "United States — FinCEN" },
];

export default function ProgramEditor() {
  const router = useRouter();
  const [jurisdiction, setJurisdiction] = useState("AU_AUSTRAC");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedMsg, setSavedMsg] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetch(`/api/aml/program/template?jurisdiction=${jurisdiction}`)
      .then((r) => r.json())
      .then((d) => {
        if (cancelled) return;
        setBody(d.template?.markdown || "");
      })
      .catch(() => undefined)
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [jurisdiction]);

  async function adopt() {
    setBusy(true);
    setError(null);
    setSavedMsg(null);
    try {
      const res = await fetch("/api/aml/program", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jurisdiction, documentBody: body }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Adoption failed");
      setSavedMsg(`Adopted v${data.program.version} for ${jurisdiction}.`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
      <h2 className="font-serif text-lg text-navy-800">
        Draft a new version
      </h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
        <div>
          <label className="block text-sm font-medium text-navy-600 mb-1.5">
            Jurisdiction
          </label>
          <select
            className="w-full rounded-lg border border-navy-200 bg-white px-3 py-2 text-sm text-navy-700"
            value={jurisdiction}
            onChange={(e) => setJurisdiction(e.target.value)}
          >
            {JURISDICTIONS.map((j) => (
              <option key={j.value} value={j.value}>
                {j.label}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={adopt}
          disabled={busy || loading || body.trim().length === 0}
          className="rounded-lg bg-plum-500 px-4 py-2 text-sm font-semibold text-white hover:bg-plum-600 disabled:opacity-60"
        >
          {busy ? "Adopting…" : "Adopt as new version"}
        </button>
      </div>

      <textarea
        className="mt-4 h-[480px] w-full rounded-lg border border-navy-200 bg-navy-50/40 px-4 py-3 font-mono text-xs text-navy-700"
        value={loading ? "Loading template…" : body}
        onChange={(e) => setBody(e.target.value)}
        readOnly={loading}
      />

      {error && (
        <p className="mt-3 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">
          {error}
        </p>
      )}
      {savedMsg && (
        <p className="mt-3 rounded-lg bg-forest-50 px-4 py-2 text-sm text-forest-700">
          {savedMsg}
        </p>
      )}
    </div>
  );
}
