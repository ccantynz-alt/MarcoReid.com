"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const KINDS = [
  { value: "draft-letter", label: "Draft letter" },
  { value: "advice-note", label: "Advice note" },
  { value: "tax-return", label: "Tax return" },
  { value: "filing", label: "Filing" },
  { value: "other", label: "Other" },
];

export default function SignoffRequestForm({ matterId }: { matterId: string }) {
  const router = useRouter();
  const [kind, setKind] = useState("draft-letter");
  const [aiOutput, setAiOutput] = useState("");
  const [rationale, setRationale] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    if (!aiOutput.trim()) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`/api/marketplace/matters/${matterId}/signoff`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, aiOutput, rationale }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data?.error ?? "Failed to create sign-off request");
        setBusy(false);
        return;
      }
      router.push("/signoff");
    } catch {
      setError("Network error");
      setBusy(false);
    }
  }

  return (
    <div>
      <div>
        <label htmlFor="kind" className="text-sm font-semibold text-navy-700">
          Kind
        </label>
        <select
          id="kind"
          value={kind}
          onChange={(e) => setKind(e.target.value)}
          className="mt-2 w-full rounded-lg border border-navy-200 px-3 py-2.5 text-sm focus:border-gold-400 focus:outline-none"
        >
          {KINDS.map((k) => (
            <option key={k.value} value={k.value}>
              {k.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4">
        <label htmlFor="aiOutput" className="text-sm font-semibold text-navy-700">
          AI-drafted output
        </label>
        <textarea
          id="aiOutput"
          value={aiOutput}
          onChange={(e) => setAiOutput(e.target.value)}
          rows={14}
          placeholder="Paste the AI-drafted output you've reviewed…"
          className="mt-2 w-full rounded-lg border border-navy-200 px-4 py-3 font-mono text-sm focus:border-gold-400 focus:outline-none"
        />
      </div>

      <div className="mt-4">
        <label htmlFor="rationale" className="text-sm font-semibold text-navy-700">
          Rationale <span className="text-navy-400">(optional)</span>
        </label>
        <textarea
          id="rationale"
          value={rationale}
          onChange={(e) => setRationale(e.target.value)}
          rows={4}
          placeholder="Why this drafting approach? Any citations, caveats, or follow-up required?"
          className="mt-2 w-full rounded-lg border border-navy-200 px-4 py-3 text-sm focus:border-gold-400 focus:outline-none"
        />
      </div>

      {error && (
        <p className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="mt-6 flex justify-end">
        <button
          type="button"
          onClick={submit}
          disabled={busy || !aiOutput.trim()}
          className="rounded-lg bg-gold-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-gold-600 disabled:cursor-not-allowed disabled:bg-navy-200"
        >
          {busy ? "Creating…" : "Create sign-off request"}
        </button>
      </div>
    </div>
  );
}
