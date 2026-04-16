"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

const STORAGE_KEY = "mr:theme";

function getSystemPreference(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === "dark") {
    root.classList.add("dark");
    root.classList.remove("light");
  } else if (theme === "light") {
    root.classList.remove("dark");
    root.classList.add("light");
  } else {
    // system
    root.classList.remove("light");
    if (getSystemPreference() === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>("system");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    const initial = stored && ["light", "dark", "system"].includes(stored) ? stored : "system";
    setThemeState(initial);
    applyTheme(initial);
  }, []);

  useEffect(() => {
    if (theme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => applyTheme("system");
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [theme]);

  function setTheme(next: Theme) {
    setThemeState(next);
    localStorage.setItem(STORAGE_KEY, next);
    applyTheme(next);
  }

  return { theme, setTheme } as const;
}

/** Compact toggle button for the header bar. Cycles: system -> light -> dark */
export default function DarkModeToggle() {
  const { theme, setTheme } = useTheme();

  function cycle() {
    const order: Theme[] = ["system", "light", "dark"];
    const idx = order.indexOf(theme);
    setTheme(order[(idx + 1) % order.length]);
  }

  const label =
    theme === "dark" ? "Dark" : theme === "light" ? "Light" : "Auto";

  return (
    <button
      type="button"
      onClick={cycle}
      className="inline-flex min-h-touch items-center gap-1.5 rounded-lg border border-navy-200 px-3 py-2 text-sm font-medium text-navy-500 transition-colors hover:bg-navy-50 dark:border-navy-600 dark:text-navy-300 dark:hover:bg-navy-800"
      aria-label={`Theme: ${label}. Click to change.`}
      title={`Theme: ${label}`}
    >
      {theme === "dark" ? (
        /* Moon icon */
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
          />
        </svg>
      ) : theme === "light" ? (
        /* Sun icon */
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
          />
        </svg>
      ) : (
        /* Monitor/system icon */
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25z"
          />
        </svg>
      )}
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}

/** Radio-card style selector for a settings page */
export function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  const options: { value: Theme; label: string; desc: string; icon: React.ReactNode }[] = [
    {
      value: "light",
      label: "Light",
      desc: "Always use light mode",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
        </svg>
      ),
    },
    {
      value: "dark",
      label: "Dark",
      desc: "Always use dark mode",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
        </svg>
      ),
    },
    {
      value: "system",
      label: "System",
      desc: "Match your operating system",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {options.map((opt) => {
        const selected = theme === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => setTheme(opt.value)}
            className={`flex flex-col items-center gap-2 rounded-xl border-2 p-5 text-center transition-all ${
              selected
                ? "border-navy-500 bg-navy-50 dark:border-gold-400 dark:bg-navy-800"
                : "border-navy-100 bg-white hover:border-navy-200 dark:border-navy-700 dark:bg-navy-800 dark:hover:border-navy-600"
            }`}
          >
            <span className={selected ? "text-navy-700 dark:text-gold-400" : "text-navy-400 dark:text-navy-400"}>
              {opt.icon}
            </span>
            <span className={`text-sm font-semibold ${selected ? "text-navy-700 dark:text-white" : "text-navy-600 dark:text-navy-300"}`}>
              {opt.label}
            </span>
            <span className="text-xs text-navy-400 dark:text-navy-400">
              {opt.desc}
            </span>
          </button>
        );
      })}
    </div>
  );
}
