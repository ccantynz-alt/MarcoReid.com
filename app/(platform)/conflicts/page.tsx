"use client";

import ConflictChecker from "@/app/components/platform/ConflictChecker";
import LegalDisclaimer from "@/app/components/shared/LegalDisclaimer";

export default function ConflictsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12 sm:px-8 lg:px-12">
      <h1 className="font-serif text-display text-navy-800 dark:text-white">Conflict Check</h1>
      <p className="mt-2 text-base text-navy-500 dark:text-navy-400">
        Search for potential conflicts of interest before accepting new clients or matters.
      </p>

      <div className="mt-8 rounded-2xl border border-navy-100 bg-white p-8 shadow-card dark:border-navy-700 dark:bg-navy-800">
        <ConflictChecker />
      </div>

      <div className="mt-4">
        <LegalDisclaimer type="CONFLICTS" variant="inline" />
      </div>
    </div>
  );
}
