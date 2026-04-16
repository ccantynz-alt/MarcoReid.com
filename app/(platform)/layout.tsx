"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import {
  CommandPaletteProvider,
  useCommandPalette,
} from "@/app/components/platform/CommandPalette";

function CommandPaletteTrigger() {
  const { open } = useCommandPalette();
  return (
    <button
      onClick={open}
      className="hidden min-h-touch items-center gap-2 rounded-lg border border-navy-200 bg-white px-3 py-1.5 text-sm text-navy-400 transition-colors hover:border-navy-300 hover:text-navy-600 sm:flex"
      aria-label="Open command palette"
    >
      <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none">
        <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="2" />
        <path d="M14 14l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <span>Search or jump to…</span>
      <kbd className="ml-2 rounded border border-navy-200 bg-navy-50 px-1.5 py-0.5 font-mono text-[10px] text-navy-500">
        ⌘K
      </kbd>
    </button>
  );
}

function PlatformShell({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-navy-400">Loading...</p>
      </div>
    );
  }

  if (status === "unauthenticated") {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-navy-50">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-navy-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 sm:px-8 lg:px-12">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="font-serif text-xl text-navy-500">
              Marco Reid
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <CommandPaletteTrigger />
            <Link
              href="/settings/profile"
              className="hidden text-sm text-navy-400 transition-colors hover:text-navy-700 sm:block"
            >
              {session?.user?.email}
            </Link>
            {(session?.user as { role?: string })?.role === "ADMIN" && (
              <Link
                href="/admin"
                className="rounded-md bg-plum-50 px-3 py-1.5 text-xs font-semibold text-plum-600"
              >
                Admin
              </Link>
            )}
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="min-h-touch rounded-lg border border-navy-200 px-4 py-2 text-sm font-medium text-navy-500 transition-colors hover:bg-navy-50"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main>{children}</main>
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
