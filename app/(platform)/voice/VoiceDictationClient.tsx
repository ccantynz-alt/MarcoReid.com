"use client";

import { useState } from "react";
import VoiceRecorder from "@/app/components/voice/VoiceRecorder";

export interface TranscriptItem {
  id: string;
  text: string;
  language: string | null;
  durationMs: number | null;
  createdAt: string;
}

interface Props {
  initialTranscripts: TranscriptItem[];
}

export default function VoiceDictationClient({ initialTranscripts }: Props) {
  const [transcripts, setTranscripts] = useState<TranscriptItem[]>(initialTranscripts);
  const [latestText, setLatestText] = useState<string>(
    initialTranscripts[0]?.text ?? ""
  );
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  async function refreshList() {
    try {
      const res = await fetch("/api/voice/transcripts", { cache: "no-store" });
      if (!res.ok) return;
      const data = (await res.json()) as { transcripts: TranscriptItem[] };
      setTranscripts(data.transcripts);
    } catch {
      // ignore
    }
  }

  function handleTranscript(text: string) {
    setLatestText(text);
    refreshList();
  }

  async function copyLatest() {
    if (!latestText) return;
    try {
      await navigator.clipboard.writeText(latestText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  }

  async function deleteTranscript(id: string) {
    if (!confirm("Delete this transcript? This cannot be undone.")) return;
    try {
      const res = await fetch(`/api/voice/transcripts/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setTranscripts((prev) => prev.filter((t) => t.id !== id));
      }
    } catch {
      // ignore
    }
  }

  function exportAll() {
    if (transcripts.length === 0) return;
    const content = transcripts
      .map(
        (t) =>
          `[${new Date(t.createdAt).toLocaleString()}]${t.language ? ` (${t.language.toUpperCase()})` : ""}${t.durationMs ? ` ${(t.durationMs / 1000).toFixed(1)}s` : ""}\n${t.text}`
      )
      .join("\n\n---\n\n");
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transcripts.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  const filteredTranscripts = transcripts.filter((t) =>
    searchQuery === ""
      ? true
      : t.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-10">
      <VoiceRecorder
        onTranscript={handleTranscript}
        surface="dashboard"
        placeholder="Dictate anywhere. Your words become text."
      />

      <div>
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-2xl text-navy-700">Latest transcript</h2>
          <button
            type="button"
            onClick={copyLatest}
            disabled={!latestText}
            className="inline-flex min-h-touch items-center justify-center rounded-full border border-navy-200 bg-white px-4 py-1.5 text-sm font-medium text-navy-700 transition-colors hover:bg-navy-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
        <textarea
          value={latestText}
          onChange={(e) => setLatestText(e.target.value)}
          placeholder="Your transcribed text will appear here…"
          className="mt-4 h-48 w-full rounded-2xl border border-navy-100 bg-white p-5 text-base leading-relaxed text-navy-700 shadow-card focus:border-forest-400 focus:outline-none"
        />
      </div>

      <div>
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-2xl text-navy-700">Recent dictations</h2>
          <button
            type="button"
            onClick={exportAll}
            disabled={transcripts.length === 0}
            className="inline-flex min-h-touch items-center justify-center rounded-full border border-navy-200 bg-white px-4 py-1.5 text-sm font-medium text-navy-700 transition-colors hover:bg-navy-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Export All
          </button>
        </div>

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search transcripts…"
          className="mt-4 w-full rounded-xl border border-navy-100 bg-white px-4 py-2.5 text-sm text-navy-700 shadow-card focus:border-forest-400 focus:outline-none"
        />

        {filteredTranscripts.length === 0 ? (
          <p className="mt-4 text-sm text-navy-400">
            {transcripts.length === 0
              ? "No dictations yet. Start recording above."
              : "No transcripts match your search."}
          </p>
        ) : (
          <ul className="mt-4 space-y-3">
            {filteredTranscripts.slice(0, 10).map((t) => (
              <li
                key={t.id}
                className="rounded-xl border border-navy-100 bg-white p-4 shadow-card"
              >
                <div className="flex items-center justify-between text-xs text-navy-400">
                  <span>{new Date(t.createdAt).toLocaleString()}</span>
                  <div className="flex items-center gap-2">
                    <span>
                      {t.language ? t.language.toUpperCase() : ""}
                      {t.durationMs
                        ? ` · ${(t.durationMs / 1000).toFixed(1)}s`
                        : ""}
                    </span>
                    <button
                      type="button"
                      onClick={() => deleteTranscript(t.id)}
                      className="ml-1 rounded p-0.5 text-navy-300 transition-colors hover:bg-red-50 hover:text-red-500"
                      title="Delete transcript"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                        <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.519.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-navy-700 line-clamp-3">
                  {t.text}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
