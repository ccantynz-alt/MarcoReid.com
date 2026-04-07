"use client";

import Button from "@/app/components/shared/Button";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mx-auto max-w-md px-6 text-center">
        <p className="font-serif text-hero text-navy-200">Error</p>
        <h1 className="mt-4 font-serif text-headline text-navy-800">
          Something went wrong.
        </h1>
        <p className="mt-4 text-lg text-navy-400">
          An unexpected error occurred. Please try again.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <button
            onClick={reset}
            className="rounded-lg border border-navy-200 px-6 py-3 text-sm font-semibold text-navy-600 transition-colors hover:bg-navy-50"
          >
            Try again
          </button>
          <Button href="/">Return home</Button>
        </div>
      </div>
    </div>
  );
}
