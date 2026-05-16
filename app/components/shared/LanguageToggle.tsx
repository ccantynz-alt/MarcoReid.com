"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n";

const STORAGE_KEY = "mr:locale";

export function useLocale() {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Locale | null;
    const initial =
      stored && (stored === "en" || stored === "fr") ? stored : "en";
    setLocaleState(initial);
  }, []);

  function setLocale(next: Locale) {
    setLocaleState(next);
    localStorage.setItem(STORAGE_KEY, next);
    window.dispatchEvent(
      new CustomEvent("locale-change", { detail: { locale: next } }),
    );
  }

  return { locale, setLocale } as const;
}

/** Compact EN | FR toggle for the header bar. */
export default function LanguageToggle() {
  const { locale, setLocale } = useLocale();

  return (
    <div
      role="radiogroup"
      aria-label="Language"
      className="inline-flex min-h-touch items-center rounded-lg border border-navy-200 text-sm font-medium dark:border-navy-600"
    >
      <button
        type="button"
        role="radio"
        aria-checked={locale === "en"}
        onClick={() => setLocale("en")}
        className={`rounded-l-lg px-3 py-2 transition-colors ${
          locale === "en"
            ? "bg-navy-500 text-white dark:bg-gold-500 dark:text-navy-900"
            : "text-navy-500 hover:bg-navy-50 dark:text-navy-300 dark:hover:bg-navy-800"
        }`}
      >
        EN
      </button>
      <button
        type="button"
        role="radio"
        aria-checked={locale === "fr"}
        onClick={() => setLocale("fr")}
        className={`rounded-r-lg px-3 py-2 transition-colors ${
          locale === "fr"
            ? "bg-navy-500 text-white dark:bg-gold-500 dark:text-navy-900"
            : "text-navy-500 hover:bg-navy-50 dark:text-navy-300 dark:hover:bg-navy-800"
        }`}
      >
        FR
      </button>
    </div>
  );
}
