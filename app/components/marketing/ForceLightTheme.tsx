"use client";

import { useEffect } from "react";

/**
 * Marketing pages were designed for the light palette only — every
 * text colour assumes a white / navy-50 background. When the user
 * has dark mode on, navy-700 text on navy-950 background becomes
 * unreadable (we caught this on /accounting and several other
 * pages). Until each marketing page gets a proper dark variant pass,
 * force light theme while a marketing route is mounted, then
 * restore the user's preference on unmount so the platform pages
 * still respect dark mode.
 */
export default function ForceLightTheme() {
  useEffect(() => {
    const html = document.documentElement;
    const hadDark = html.classList.contains("dark");
    const hadLight = html.classList.contains("light");
    html.classList.remove("dark");
    html.classList.add("light");

    return () => {
      html.classList.remove("light");
      if (hadDark) html.classList.add("dark");
      if (hadLight) html.classList.add("light");
    };
  }, []);

  return null;
}
