"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const JURISDICTIONS = [
  { value: "AU_AUSTRAC", label: "Australia — AUSTRAC SMR" },
  { value: "NZ_DIA", label: "New Zealand — Police FIU SAR (goAML)" },
  { value: "UK_HMRC", label: "United Kingdom — NCA SAR" },
  { value: "US_FINCEN", label: "United States — FinCEN SAR" },
];

interface SubjectOption {
  id: string;
  legalName: string;
  riskLevel: string;
  status: string;
}

export default function NewSarPage() {
  const router = useRouter();
  const [subjects, setSubjects] = useState<SubjectOption[]>([]);
  const [filter, setFilter] = useState("");
  const [selectedSubjectId, setSelectedSubjectId] = useState("");
  const [jurisdiction, setJurisdiction] = useState("AU_AUSTRAC");
  const [narrative, setNarrative] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/aml/subjects")
      .then((r) => r.json())
      .then((d) => setSubjects(d.subjects ?? []))
      .catch(() => undefined);
  }, []);

  const filtered = subjects.filter((s) =>
    s.legalName.toLowerCase().includes(filter.toLowerCase()),
  );

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/aml/sar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jurisdiction,
          narrative,
          subjectId: selectedSubjectId || undefined,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Failed to draft SAR");
      router.push("/aml/sar");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      setBusy(false);
    }
  }

  const input =
    "w-full rounded-lg border border-navy-200 bg-white px-4 py-2.5 text-sm text-navy-700 focus:border-navy-500 focus:outline-none focus:ring-2 focus:ring-navy-100";
  const label = "block text-sm font-medium text-navy-600 mb-1.5";

  return (
    <div className="mx-auto max-w-3xl px-6 py-12 sm:px-8 lg:px-12">
      <h1 className="font-serif text-display text-navy-800">
        Draft SAR
      </h1>
      <p className="mt-2 text-sm text-navy-400">
        Tipping-off prohibitions apply. Save as draft now; submit through the
        regulator portal once internal review is complete.
      </p>

      <form
        onSubmit={submit}
        className="mt-8 space-y-5 rounded-2xl border border-navy-100 bg-white p-8 shadow-card"
      >
        <div>
          <label className={label}>Jurisdiction *</label>
          <select
            className={input}
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

        <div>
          <label className={label}>Linked CDD subject (optional)</label>
          <input
            className={input}
            placeholder="Search subjects…"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <div className="mt-2 max-h-40 overflow-y-auto rounded-lg border border-navy-100 bg-navy-50/40">
            {filtered.length === 0 ? (
              <p className="p-3 text-xs text-navy-400">
                No matches.
              </p>
            ) : (
              <ul className="divide-y divide-navy-100">
                {filtered.slice(0, 20).map((s) => (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedSubjectId(s.id)}
                      className={`flex w-full items-center justify-between px-3 py-2 text-left text-sm hover:bg-white ${
                        selectedSubjectId === s.id
                          ? "bg-white font-medium text-navy-800"
                          : "text-navy-600"
                      }`}
                    >
                      <span>{s.legalName}</span>
                      <span className="text-xs text-navy-400">
                        {s.riskLevel} · {s.status}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {selectedSubjectId && (
            <p className="mt-2 text-xs text-navy-500">
              Linked subject:{" "}
              <button
                type="button"
                onClick={() => setSelectedSubjectId("")}
                className="underline"
              >
                clear
              </button>
            </p>
          )}
        </div>

        <div>
          <label className={label}>Narrative *</label>
          <textarea
            required
            rows={14}
            minLength={20}
            className={input}
            placeholder="Describe the circumstances giving rise to the suspicion: what was observed, when, by whom, what enquiries were made, and why the conduct is suspicious. Be factual."
            value={narrative}
            onChange={(e) => setNarrative(e.target.value)}
          />
          <p className="mt-1 text-xs text-navy-400">
            {narrative.length} characters · minimum 20.
          </p>
        </div>

        {error && (
          <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">
            {error}
          </p>
        )}

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-lg border border-navy-200 px-4 py-2 text-sm font-medium text-navy-600 hover:bg-navy-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={busy || narrative.trim().length < 20}
            className="rounded-lg bg-plum-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-plum-600 disabled:opacity-60"
          >
            {busy ? "Saving…" : "Save draft"}
          </button>
        </div>
      </form>
    </div>
  );
}
