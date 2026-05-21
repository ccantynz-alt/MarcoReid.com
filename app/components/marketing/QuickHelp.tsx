"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

const QUICK_OPTIONS = [
  {
    label: "I need a document",
    href: "/generate",
    desc: "AI-drafted wills, contracts, and agreements",
  },
  {
    label: "I need a professional",
    href: "/find-a-lawyer",
    desc: "Find a verified lawyer or accountant",
  },
  {
    label: "I'm a professional",
    href: "/pricing",
    desc: "See plans for lawyers and accountants",
  },
  {
    label: "I'm looking for a job",
    href: "/academy",
    desc: "Training, CPD, and career pathways",
  },
] as const;

export default function QuickHelp() {
  const [open, setOpen] = useState(false);

  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setOpen(false);
  }, []);

  useEffect(() => {
    if (open) {
      window.addEventListener("keydown", handleEscape);
      return () => window.removeEventListener("keydown", handleEscape);
    }
  }, [open, handleEscape]);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Expanded panel */}
      <div
        className={`absolute bottom-16 right-0 w-72 overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-lg transition-all duration-300 ease-out ${
          open
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-3 scale-95 opacity-0"
        }`}
      >
        {/* Gold accent line */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-gold-300 to-transparent" />

        <div className="p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
            How can we help?
          </p>
          <div className="mt-3 space-y-1">
            {QUICK_OPTIONS.map((opt) => (
              <Link
                key={opt.href}
                href={opt.href}
                onClick={() => setOpen(false)}
                className="group block rounded-xl px-3 py-2.5 transition-colors hover:bg-navy-50"
              >
                <span className="text-sm font-medium text-navy-700 group-hover:text-navy-900">
                  {opt.label}
                </span>
                <span className="mt-0.5 block text-xs text-navy-400 group-hover:text-navy-500">
                  {opt.desc}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Toggle button */}
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        aria-expanded={open}
        aria-label={open ? "Close quick help" : "Open quick help"}
        className="flex h-12 w-12 min-h-touch min-w-touch items-center justify-center rounded-full bg-gold-400 text-navy-900 shadow-lg transition-all duration-300 hover:bg-gold-300 hover:shadow-xl hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2"
      >
        {open ? (
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827m0 0v.75m0-3.839a3.012 3.012 0 00-1.023.439c-.31.233-.515.537-.612.882M12 18h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )}
      </button>
    </div>
  );
}
