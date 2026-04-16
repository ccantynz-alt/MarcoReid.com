"use client";

import Link from "next/link";
import Button from "@/app/components/shared/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-6 py-24">
      <div className="mx-auto max-w-xl text-center">
        <p className="font-serif text-hero leading-none text-navy-200">500</p>
        <h1 className="mt-4 font-serif text-display text-navy-800">
          Something went wrong on our end.
        </h1>
        <p className="mt-6 text-lg text-navy-400">
          An unexpected error interrupted this page. The incident has been
          logged and our engineering team has been notified. In the meantime,
          you can try again, return home, or reach out to support.
        </p>

        {error.digest ? (
          <p className="mt-6 font-mono text-xs text-navy-400">
            Reference: {error.digest}
          </p>
        ) : null}

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={reset}
            className="inline-flex min-h-touch items-center justify-center rounded-lg border border-navy-200 bg-white px-7 py-3 text-sm font-semibold text-navy-700 transition-colors hover:bg-navy-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-500 focus-visible:ring-offset-2"
          >
            Try again
          </button>
          <Button href="/" size="lg">
            Return home
          </Button>
          <Button href="/dashboard" variant="secondary" size="lg">
            Go to dashboard
          </Button>
        </div>
        <p className="mt-8 text-sm text-navy-400">
          Still seeing this?{" "}
          <Link
            href="/contact"
            className="font-semibold text-navy-700 underline underline-offset-4 hover:text-forest-600"
          >
            Contact support
          </Link>
          {error.digest ? (
            <span> and include the reference above.</span>
          ) : (
            <span>.</span>
          )}
        </p>
      </div>
    </div>
  );
}
