"use client";

import { DISCLAIMERS } from "@/lib/legal-disclaimers";

interface Props {
  type: keyof typeof DISCLAIMERS;
  variant?: "banner" | "footer" | "modal" | "inline";
  jurisdiction?: string;
}

export default function LegalDisclaimer({
  type,
  variant = "footer",
}: Props) {
  const text = DISCLAIMERS[type];

  if (variant === "banner") {
    return (
      <div className="w-full rounded-xl border border-amber-200 bg-amber-50 px-6 py-4 dark:border-amber-800 dark:bg-amber-950/40">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-amber-400 text-[10px] font-bold text-amber-900">
            !
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              Important Notice
            </p>
            <p className="mt-1 text-sm leading-relaxed text-amber-800 dark:text-amber-300">
              {text}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "modal") {
    return (
      <div className="rounded-2xl border border-navy-200 bg-white p-6 shadow-lg dark:border-navy-700 dark:bg-navy-800">
        <div className="flex items-start gap-3">
          <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-amber-400 text-sm font-bold text-amber-900">
            !
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-serif text-lg text-navy-800 dark:text-white">
              Legal Disclaimer
            </p>
            <p className="mt-2 text-sm leading-relaxed text-navy-600 dark:text-navy-300">
              {text}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <div className="rounded-xl border border-navy-100 bg-navy-50 px-5 py-4 dark:border-navy-700 dark:bg-navy-800/50">
        <p className="text-xs font-semibold uppercase tracking-wider text-navy-500 dark:text-navy-400">
          Disclaimer
        </p>
        <p className="mt-1 text-xs leading-relaxed text-navy-500 dark:text-navy-400">
          {text}
        </p>
      </div>
    );
  }

  // variant === "footer"
  return (
    <p className="text-xs leading-relaxed text-navy-400 dark:text-navy-500">
      {text}
    </p>
  );
}
