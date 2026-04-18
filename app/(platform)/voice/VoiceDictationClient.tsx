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

  return (
    <div className="space-y-10">
      <VoiceRecorder
        onTranscript={handleTranscript}
        surface="dashboard"
        placeholder="Dictate anywhere. Your words become text."
      />

      <div>
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-2xl text-navy-700 dark:text-navy-100">Latest transcript</h2>
          <button
            type="button"
            onClick={copyLatest}
            disabled={!latestText}
            className="inline-flex min-h-touch items-center justify-center rounded-full border border-navy-200 bg-white px-4 py-1.5 text-sm font-medium text-navy-700 transition-colors hover:bg-navy-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-navy-600 dark:bg-navy-800 dark:text-navy-200 dark:hover:bg-navy-700"
          >
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
        <textarea
          value={latestText}
          onChange={(e) => setLatestText(e.target.value)}
          placeholder="Your transcribed text will appear here…"
          className="mt-4 h-48 w-full rounded-2xl border border-navy-100 bg-white p-5 text-base leading-relaxed text-navy-700 shadow-card focus:border-forest-400 focus:outline-none dark:border-navy-700 dark:bg-navy-800 dark:text-white dark:placeholder:text-navy-500"
        />
      </div>

      <div>
        <h2 className="font-serif text-2xl text-navy-700 dark:text-navy-100">Recent dictations</h2>
        {transcripts.length === 0 ? (
          <p className="mt-4 text-sm text-navy-400">
            No dictations yet. Start recording above.
          </p>
        ) : (
          <ul className="mt-4 space-y-3">
            {transcripts.slice(0, 10).map((t) => (
              <li
                key={t.id}
                className="rounded-xl border border-navy-100 bg-white p-4 shadow-card dark:border-navy-700 dark:bg-navy-800"
              >
                <div className="flex items-center justify-between text-xs text-navy-400">
                  <span>{new Date(t.createdAt).toLocaleString()}</span>
                  <span>
                    {t.language ? t.language.toUpperCase() : ""}
                    {t.durationMs
                      ? ` · ${(t.durationMs / 1000).toFixed(1)}s`
                      : ""}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-navy-700 line-clamp-3 dark:text-navy-200">
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
