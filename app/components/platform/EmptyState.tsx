"use client";

import Link from "next/link";

interface Props {
  icon:
    | "briefcase"
    | "users"
    | "file"
    | "clock"
    | "vault"
    | "mic"
    | "pen"
    | "calendar"
    | "shield"
    | "chart"
    | "bell"
    | "search";
  title: string;
  description: string;
  action?: { label: string; href: string };
  secondaryAction?: { label: string; href: string };
}

const icons: Record<Props["icon"], React.ReactNode> = {
  briefcase: (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <rect x="6" y="16" width="36" height="24" rx="4" stroke="currentColor" strokeWidth="2.5" />
      <path d="M16 16V12a4 4 0 014-4h8a4 4 0 014 4v4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M6 26h36" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="24" cy="26" r="2" fill="currentColor" />
    </svg>
  ),
  users: (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <circle cx="20" cy="16" r="6" stroke="currentColor" strokeWidth="2.5" />
      <path d="M8 38c0-6.627 5.373-12 12-12s12 5.373 12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="34" cy="18" r="4" stroke="currentColor" strokeWidth="2.5" />
      <path d="M36 28c3.314 0 6 2.686 6 6v4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  ),
  file: (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <path d="M14 6h14l12 12v24a4 4 0 01-4 4H14a4 4 0 01-4-4V10a4 4 0 014-4z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M28 6v12h12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 28h12M18 34h8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  ),
  clock: (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="2.5" />
      <path d="M24 14v10l7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  vault: (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <rect x="6" y="8" width="36" height="32" rx="4" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="24" cy="24" r="8" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="24" cy="24" r="2" fill="currentColor" />
      <path d="M24 16v-2M24 34v-2M16 24h-2M34 24h-2" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M12 40v4M36 40v4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  ),
  mic: (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <rect x="16" y="6" width="16" height="24" rx="8" stroke="currentColor" strokeWidth="2.5" />
      <path d="M10 26a14 14 0 0028 0" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M24 40v4M18 44h12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  ),
  pen: (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <path d="M34 8l6 6-22 22H12v-6L34 8z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M28 14l6 6" stroke="currentColor" strokeWidth="2.5" />
      <path d="M12 42h24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  ),
  calendar: (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <rect x="6" y="10" width="36" height="32" rx="4" stroke="currentColor" strokeWidth="2.5" />
      <path d="M6 20h36" stroke="currentColor" strokeWidth="2.5" />
      <path d="M16 6v8M32 6v8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="16" cy="28" r="2" fill="currentColor" />
      <circle cx="24" cy="28" r="2" fill="currentColor" />
      <circle cx="32" cy="28" r="2" fill="currentColor" />
      <circle cx="16" cy="34" r="2" fill="currentColor" />
      <circle cx="24" cy="34" r="2" fill="currentColor" />
    </svg>
  ),
  shield: (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <path d="M24 4L8 12v12c0 10.667 6.667 18.667 16 22 9.333-3.333 16-11.333 16-22V12L24 4z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M18 24l4 4 8-8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  chart: (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <path d="M6 42h36" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="10" y="22" width="6" height="20" rx="2" stroke="currentColor" strokeWidth="2.5" />
      <rect x="21" y="12" width="6" height="30" rx="2" stroke="currentColor" strokeWidth="2.5" />
      <rect x="32" y="6" width="6" height="36" rx="2" stroke="currentColor" strokeWidth="2.5" />
    </svg>
  ),
  bell: (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <path d="M18 38a6 6 0 0012 0" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M12 30V22a12 12 0 0124 0v8l4 4H8l4-4z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
    </svg>
  ),
  search: (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <circle cx="22" cy="22" r="14" stroke="currentColor" strokeWidth="2.5" />
      <path d="M32 32l10 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M16 22h12M22 16v12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  ),
};

export default function EmptyState({
  icon,
  title,
  description,
  action,
  secondaryAction,
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-16 animate-fade-up opacity-0">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-navy-50 text-navy-400">
        {icons[icon]}
      </div>
      <h3 className="mt-6 font-serif text-lg text-navy-700">{title}</h3>
      <p className="mt-2 max-w-sm mx-auto text-center text-sm text-navy-400">
        {description}
      </p>
      {(action || secondaryAction) && (
        <div className="mt-6 flex items-center gap-4">
          {action && (
            <Link
              href={action.href}
              className="inline-flex items-center justify-center rounded-lg bg-navy-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-navy-600 hover:shadow-md active:scale-[0.98]"
            >
              {action.label}
            </Link>
          )}
          {secondaryAction && (
            <Link
              href={secondaryAction.href}
              className="text-sm font-medium text-navy-500 transition-colors hover:text-navy-700"
            >
              {secondaryAction.label}
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
