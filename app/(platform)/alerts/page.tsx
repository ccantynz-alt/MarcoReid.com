import Link from "next/link";
import AlertsClient from "./AlertsClient";
import LegalDisclaimer from "@/app/components/shared/LegalDisclaimer";

export default function AlertsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 lg:px-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-display text-navy-800 dark:text-white">
            Regulatory Alerts
          </h1>
          <p className="mt-2 text-lg text-navy-400 dark:text-navy-400">
            Stay informed about law and regulation changes in your jurisdictions.
          </p>
        </div>
        <Link
          href="/dashboard"
          className="text-sm text-navy-400 hover:text-navy-600 dark:hover:text-navy-300"
        >
          &larr; Dashboard
        </Link>
      </div>

      <div className="mt-8">
        <AlertsClient />
      </div>

      <div className="mt-8">
        <LegalDisclaimer type="REGULATORY_ALERTS" variant="footer" />
      </div>
    </div>
  );
}
