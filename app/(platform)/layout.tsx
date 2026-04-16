"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import FloatingTimer from "@/app/components/platform/FloatingTimer";

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
      <header className="border-b border-navy-100 bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 sm:px-8 lg:px-12">
          <Link href="/dashboard" className="font-serif text-xl text-navy-500">
            Marco Reid
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-navy-400">
              {session?.user?.email}
            </span>
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
      <FloatingTimer />
    </div>
  );
}
