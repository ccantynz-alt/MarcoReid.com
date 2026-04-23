"use client";

import { useEffect, useState } from "react";

const COOKIE_NAME = "marco_impersonation";

interface ImpersonationState {
  impersonatingUserId: string;
  name: string | null;
  email: string;
  startedAt: string;
}

function readCookie(): ImpersonationState | null {
  if (typeof document === "undefined") return null;
  const raw = document.cookie
    .split("; ")
    .find((c) => c.startsWith(`${COOKIE_NAME}=`));
  if (!raw) return null;
  const value = decodeURIComponent(raw.split("=")[1] || "");
  if (!value) return null;
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

export default function ImpersonationBanner() {
  const [state, setState] = useState<ImpersonationState | null>(null);
  const [ending, setEnding] = useState(false);

  useEffect(() => {
    setState(readCookie());
    // Re-poll the cookie occasionally — admin may end impersonation in
    // a different tab and the banner here should disappear.
    const interval = setInterval(() => setState(readCookie()), 5_000);
    return () => clearInterval(interval);
  }, []);

  if (!state) return null;

  const end = async () => {
    setEnding(true);
    try {
      await fetch("/api/admin/impersonate/end", {
        method: "POST",
        signal: AbortSignal.timeout(5_000),
      });
    } catch {
      // ignore — cookie clear below
    }
    document.cookie = `${COOKIE_NAME}=; path=/; max-age=0`;
    setState(null);
    setEnding(false);
    window.location.href = "/admin";
  };

  return (
    <div className="sticky top-0 z-40 border-b border-plum-300 bg-plum-50 px-4 py-2 text-sm text-plum-800">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
        <span>
          Impersonating:{" "}
          <strong>{state.name || state.email}</strong>{" "}
          <span className="text-plum-600">({state.email})</span>
        </span>
        <button
          type="button"
          onClick={end}
          disabled={ending}
          className="rounded-lg border border-plum-300 bg-white px-3 py-1 text-xs font-medium text-plum-700 transition-colors hover:bg-plum-100 disabled:opacity-50"
        >
          {ending ? "Ending…" : "End session"}
        </button>
      </div>
    </div>
  );
}
