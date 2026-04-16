"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { ThemeSelector } from "@/app/components/shared/DarkModeToggle";

export default function SettingsPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-navy-400">Loading...</p>
      </div>
    );
  }

  if (status === "unauthenticated") {
    redirect("/login");
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-12 sm:px-8 lg:px-12">
      <h1 className="font-serif text-display text-navy-800 dark:text-white">
        Settings
      </h1>
      <p className="mt-2 text-lg text-navy-400 dark:text-navy-400">
        Manage your account preferences.
      </p>

      {/* Profile section */}
      <section className="mt-10 rounded-2xl border border-navy-100 bg-white p-8 shadow-card dark:border-navy-700 dark:bg-navy-800">
        <h2 className="text-xl font-semibold text-navy-800 dark:text-white">
          Profile
        </h2>
        <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-navy-400 dark:text-navy-400">Name</dt>
            <dd className="text-navy-700 dark:text-navy-200">
              {session?.user?.name || "Not set"}
            </dd>
          </div>
          <div>
            <dt className="text-navy-400 dark:text-navy-400">Email</dt>
            <dd className="text-navy-700 dark:text-navy-200">
              {session?.user?.email || "Not set"}
            </dd>
          </div>
        </dl>
      </section>

      {/* Theme section */}
      <section className="mt-8 rounded-2xl border border-navy-100 bg-white p-8 shadow-card dark:border-navy-700 dark:bg-navy-800">
        <h2 className="text-xl font-semibold text-navy-800 dark:text-white">
          Theme
        </h2>
        <p className="mt-1 text-sm text-navy-400 dark:text-navy-400">
          Choose how Marco Reid looks. Your preference is saved locally to this
          browser.
        </p>
        <div className="mt-6">
          <ThemeSelector />
        </div>
      </section>
    </div>
  );
}
