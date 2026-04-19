"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";

interface BriefingSection {
  title: string;
  items: Array<{ headline: string; source: string; link: string }>;
}

interface BriefingData {
  greeting: string;
  date: string;
  sections: BriefingSection[];
  script: string;
  headlineCount: number;
}

export default function MorningBriefing() {
  const [briefing, setBriefing] = useState<BriefingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [currentLine, setCurrentLine] = useState(-1);
  const synthRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    fetch("/api/news/briefing")
      .then(async (res) => {
        if (!res.ok) return;
        const data = await res.json();
        setBriefing(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const speak = useCallback(() => {
    if (!briefing?.script) return;
    if (playing) {
      window.speechSynthesis.cancel();
      setPlaying(false);
      setCurrentLine(-1);
      return;
    }

    const lines = briefing.script.split("\n").filter((l) => l.trim());
    let lineIndex = 0;

    function speakLine() {
      if (lineIndex >= lines.length) {
        setPlaying(false);
        setCurrentLine(-1);
        return;
      }

      const utterance = new SpeechSynthesisUtterance(lines[lineIndex]);
      synthRef.current = utterance;

      // Use a professional-sounding voice if available
      const voices = window.speechSynthesis.getVoices();
      const preferred = voices.find(
        (v) =>
          v.name.includes("Samantha") ||
          v.name.includes("Daniel") ||
          v.name.includes("Karen") ||
          v.name.includes("Google UK English") ||
          (v.lang.startsWith("en") && v.name.includes("Premium")),
      );
      if (preferred) utterance.voice = preferred;

      utterance.rate = 0.95;
      utterance.pitch = 1.0;

      setCurrentLine(lineIndex);

      utterance.onend = () => {
        lineIndex++;
        speakLine();
      };

      utterance.onerror = () => {
        setPlaying(false);
        setCurrentLine(-1);
      };

      window.speechSynthesis.speak(utterance);
    }

    setPlaying(true);
    speakLine();
  }, [briefing, playing]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  if (loading) {
    return (
      <div className="animate-pulse rounded-2xl border border-navy-100 bg-white p-6 dark:border-navy-700 dark:bg-navy-800">
        <div className="h-4 w-1/3 rounded bg-navy-100 dark:bg-navy-700" />
        <div className="mt-3 h-6 w-2/3 rounded bg-navy-100 dark:bg-navy-700" />
      </div>
    );
  }

  if (!briefing) return null;

  const lines = briefing.script.split("\n").filter((l) => l.trim());

  return (
    <div className="rounded-2xl border border-gold-200 bg-gradient-to-br from-gold-50 via-white to-navy-50 p-6 shadow-card dark:border-gold-800 dark:from-navy-800 dark:via-navy-800 dark:to-navy-900">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-600 dark:text-gold-400">
            Morning Briefing
          </p>
          <p className="mt-1 font-serif text-xl text-navy-800 dark:text-white">
            {briefing.greeting}
          </p>
          <p className="mt-1 text-sm text-navy-400">{briefing.date}</p>
        </div>

        {/* Play / Stop button */}
        <button
          onClick={speak}
          className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full transition-all ${
            playing
              ? "bg-red-500 text-white shadow-lg shadow-red-500/30 animate-pulse"
              : "bg-gold-500 text-white shadow-lg shadow-gold-500/30 hover:bg-gold-600 hover:scale-105"
          }`}
          aria-label={playing ? "Stop briefing" : "Play briefing"}
          title={playing ? "Stop" : "Listen to your briefing"}
        >
          {playing ? (
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
              <rect x="6" y="6" width="12" height="12" rx="2" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
      </div>

      {/* Briefing content */}
      {briefing.sections.length > 0 ? (
        <div className="mt-5 space-y-4">
          {briefing.sections.map((section) => (
            <div key={section.title}>
              <p className="text-xs font-semibold uppercase tracking-wider text-navy-400 dark:text-navy-400">
                {section.title}
              </p>
              <ul className="mt-2 space-y-2">
                {section.items.map((item, i) => (
                  <li key={i}>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`block rounded-lg px-3 py-2 text-sm transition-colors hover:bg-gold-50 dark:hover:bg-navy-700 ${
                        playing && currentLine >= 0
                          ? "opacity-60"
                          : ""
                      }`}
                    >
                      <span className="font-medium text-navy-700 dark:text-navy-200">
                        {item.headline}
                      </span>
                      <span className="ml-2 text-xs text-navy-400">
                        {item.source}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-4 text-sm text-navy-400">
          No new articles this morning. Check back shortly.
        </p>
      )}

      {/* Transcript when playing */}
      {playing && (
        <div className="mt-4 rounded-xl border border-gold-200 bg-white/50 p-4 dark:border-gold-800 dark:bg-navy-900/50">
          <p className="text-xs font-semibold uppercase tracking-wider text-gold-600 dark:text-gold-400">
            Now reading
          </p>
          <p className="mt-2 text-sm text-navy-700 dark:text-navy-200">
            {lines[currentLine] || "..."}
          </p>
        </div>
      )}

      <div className="mt-4 flex items-center justify-between">
        <p className="text-xs text-navy-400">
          {briefing.headlineCount} articles from {briefing.sections.length} categories
        </p>
        <Link
          href="/news"
          className="text-xs font-medium text-gold-600 hover:text-gold-700 dark:text-gold-400"
        >
          Full news feed &rarr;
        </Link>
      </div>
    </div>
  );
}
