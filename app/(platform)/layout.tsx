"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import {
  CommandPaletteProvider,
  useCommandPalette,
} from "@/app/components/platform/CommandPalette";
import FloatingTimer from "@/app/components/platform/FloatingTimer";
import DarkModeToggle from "@/app/components/shared/DarkModeToggle";

const platformNav = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/matters", label: "Matters" },
  { href: "/clients", label: "Clients" },
  { href: "/documents", label: "Documents" },
  { href: "/marco", label: "Marco" },
  { href: "/voice", label: "Voice" },
  { href: "/time", label: "Time" },
  { href: "/trust", label: "Trust" },
  { href: "/aml", label: "AML" },
  { href: "/billing", label: "Billing" },
  { href: "/news", label: "News" },
];

function CommandPaletteTrigger() {
  const { open } = useCommandPalette();
  return (
    <button
      onClick={open}
      className="hidden items-center gap-2 rounded-lg border border-navy-200 bg-white/60 px-3 py-1.5 text-sm text-navy-400 transition-colors hover:border-gold-400 hover:text-navy-600 dark:border-navy-600 dark:bg-navy-800/60 dark:text-navy-400 dark:hover:border-gold-400 dark:hover:text-navy-200 lg:flex"
      aria-label="Open command palette"
    >
      <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none">
        <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="2" />
        <path d="M14 14l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <span className="max-w-[120px] truncate">Search…</span>
      <kbd className="rounded border border-navy-200 bg-navy-50 px-1.5 py-0.5 font-mono text-[10px] text-navy-400 dark:border-navy-600 dark:bg-navy-700">
        ⌘K
      </kbd>
    </button>
  );
}

function PlatformShell({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-navy-50 dark:bg-navy-950">
        <div className="text-center">
          <p className="font-serif text-2xl text-navy-500">Marco Reid</p>
          <p className="mt-2 text-sm text-navy-400">Loading your practice…</p>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-navy-50 dark:bg-navy-950">
      <a
        href="#platform-main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:rounded-lg focus:bg-navy-500 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg"
      >
        Skip to content
      </a>

      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-navy-100/60 bg-white/80 backdrop-blur-xl dark:border-navy-700/60 dark:bg-navy-900/80">
        {/* Gold prestige line */}
        <div className="gold-divider" />

        {/* Primary row */}
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="flex items-center gap-2 font-serif text-xl text-navy-500 dark:text-navy-100">
              <span className="text-gold-500">&diams;</span>
              Marco Reid
            </Link>
            <CommandPaletteTrigger />
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/settings/profile"
              className="hidden items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm text-navy-400 transition-colors hover:text-navy-700 dark:text-navy-400 dark:hover:text-navy-200 sm:flex"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-navy-100 text-[10px] font-semibold text-navy-600 dark:bg-navy-700 dark:text-navy-300">
                {(session?.user?.name || session?.user?.email || "U").charAt(0).toUpperCase()}
              </span>
              <span className="hidden max-w-[140px] truncate lg:inline">
                {session?.user?.name || session?.user?.email}
              </span>
            </Link>
            {(session?.user as { role?: string })?.role === "ADMIN" && (
              <Link
                href="/admin"
                className="rounded-md bg-gold-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-gold-700 dark:bg-gold-900 dark:text-gold-300"
              >
                Admin
              </Link>
            )}
            <DarkModeToggle />
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="rounded-lg border border-navy-200 px-3 py-1.5 text-xs font-medium text-navy-500 transition-colors hover:bg-navy-50 dark:border-navy-600 dark:text-navy-300 dark:hover:bg-navy-800"
            >
              Sign out
            </button>
          </div>
        </div>

        {/* Navigation row */}
        <div className="border-t border-navy-100/40 dark:border-navy-700/40">
          <nav className="mx-auto flex max-w-7xl items-center gap-1 overflow-x-auto px-4 sm:px-6 lg:px-8" aria-label="Platform navigation">
            {platformNav.map((link) => {
              const isActive = pathname === link.href || pathname?.startsWith(link.href + "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative flex items-center whitespace-nowrap px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "text-navy-800 dark:text-white"
                      : "text-navy-400 hover:text-navy-700 dark:text-navy-400 dark:hover:text-navy-200"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-gold-400" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <main id="platform-main">{children}</main>
      <FloatingTimer />
    </div>
  );
}

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CommandPaletteProvider>
      <PlatformShell>{children}</PlatformShell>
    </CommandPaletteProvider>
  );
}
