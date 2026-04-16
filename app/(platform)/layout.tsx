"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import DarkModeToggle from "@/app/components/shared/DarkModeToggle";

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center dark:bg-navy-950">
        <p className="text-sm text-navy-400">Loading...</p>
      </div>
    );
  }

  if (status === "unauthenticated") {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-navy-50 dark:bg-navy-950">
      {/* Top bar */}
      <header className="border-b border-navy-100 bg-white/80 backdrop-blur-sm dark:border-navy-700 dark:bg-navy-900/80">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 sm:px-8 lg:px-12">
          <Link href="/dashboard" className="font-serif text-xl text-navy-500 dark:text-navy-100">
            Marco Reid
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-navy-400 sm:inline dark:text-navy-400">
              {session?.user?.email}
            </span>
            {(session?.user as { role?: string })?.role === "ADMIN" && (
              <Link
                href="/admin"
                className="rounded-md bg-plum-50 px-3 py-1.5 text-xs font-semibold text-plum-600 dark:bg-plum-900 dark:text-plum-300"
              >
                Admin
              </Link>
            )}
            <Link
              href="/settings"
              className="inline-flex min-h-touch items-center rounded-lg border border-navy-200 px-3 py-2 text-sm font-medium text-navy-500 transition-colors hover:bg-navy-50 dark:border-navy-600 dark:text-navy-300 dark:hover:bg-navy-800"
              title="Settings"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </Link>
            <DarkModeToggle />
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="min-h-touch rounded-lg border border-navy-200 px-4 py-2 text-sm font-medium text-navy-500 transition-colors hover:bg-navy-50 dark:border-navy-600 dark:text-navy-300 dark:hover:bg-navy-800"
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
