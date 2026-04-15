import Link from "next/link";
import Button from "@/app/components/shared/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-6 py-24">
      <div className="mx-auto max-w-xl text-center">
        <p className="font-serif text-hero leading-none text-navy-200">404</p>
        <h1 className="mt-4 font-serif text-display text-navy-800">
          We couldn&rsquo;t find that page.
        </h1>
        <p className="mt-6 text-lg text-navy-400">
          The link may be out of date, or the page may have moved. If you typed
          the URL, double-check for typos. If you followed a link from inside
          the app and think this is a bug, our team would like to know.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button href="/" size="lg">
            Return home
          </Button>
          <Button href="/dashboard" variant="secondary" size="lg">
            Go to dashboard
          </Button>
        </div>
        <p className="mt-8 text-sm text-navy-400">
          Still stuck?{" "}
          <Link
            href="/contact"
            className="font-semibold text-navy-700 underline underline-offset-4 hover:text-forest-600"
          >
            Contact support
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
