"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";

// Single source of truth for the client-side ADMIN gate. Mirrors the
// pattern used in app/(platform)/admin/page.tsx so v2 admin pages stay
// behind the same door without copy-pasting six times.
export function useAdminGate(): {
  isAdmin: boolean;
  loading: boolean;
} {
  const { data: session, status } = useSession();
  const isAdmin = (session?.user as { role?: string })?.role === "ADMIN";

  useEffect(() => {
    if (status === "authenticated" && !isAdmin) {
      redirect("/dashboard");
    }
  }, [status, isAdmin]);

  return {
    isAdmin,
    loading: status === "loading" || (status === "authenticated" && !isAdmin),
  };
}

export function AdminLoading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <p className="text-sm text-navy-400">Loading…</p>
    </div>
  );
}

export function AdminPageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-plum-600">
          {eyebrow}
        </p>
        <h1 className="mt-1 font-serif text-display text-navy-800 dark:text-navy-100">
          {title}
        </h1>
        {description && (
          <p className="mt-2 text-navy-400">{description}</p>
        )}
      </div>
      <span className="rounded-full bg-plum-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-plum-600">
        ADMIN access
      </span>
    </div>
  );
}
