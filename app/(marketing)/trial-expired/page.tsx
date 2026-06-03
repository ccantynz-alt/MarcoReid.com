import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Trial expired — Marco Reid",
  description: "Your 14-day free trial of Marco Reid has ended. Upgrade to continue.",
};

export default function TrialExpiredPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-navy-900 px-6 py-20 text-center">
      {/* Logo mark */}
      <svg viewBox="0 0 32 32" className="mb-8 h-12 w-12" fill="none" aria-hidden="true">
        <path
          d="M16 2l6 10-6 10-6-10z"
          fill="url(#gold-gradient-exp)"
          stroke="#b8922e"
          strokeWidth="1"
        />
        <path
          d="M16 6l4 6.67L16 19.33l-4-6.66z"
          fill="url(#gold-inner-exp)"
          opacity="0.6"
        />
        <defs>
          <linearGradient id="gold-gradient-exp" x1="10" y1="2" x2="22" y2="22">
            <stop offset="0%" stopColor="#ebcf82" />
            <stop offset="50%" stopColor="#d4a843" />
            <stop offset="100%" stopColor="#b8922e" />
          </linearGradient>
          <linearGradient id="gold-inner-exp" x1="12" y1="6" x2="20" y2="19">
            <stop offset="0%" stopColor="#faf2de" />
            <stop offset="100%" stopColor="#ebcf82" />
          </linearGradient>
        </defs>
      </svg>

      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">
        Marco Reid
      </p>

      <h1 className="mt-4 font-serif text-4xl font-semibold text-white sm:text-5xl">
        Your free trial has ended.
      </h1>

      <p className="mx-auto mt-6 max-w-md text-lg leading-relaxed text-white/70">
        You had 14 days of full access to Marco Reid — the most advanced legal and accounting
        intelligence platform built. To continue, choose a plan that fits your practice.
      </p>

      {/* What you lose without upgrading */}
      <div className="mx-auto mt-10 max-w-sm rounded-2xl border border-white/10 bg-white/5 p-6 text-left">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">
          Everything waiting for you
        </p>
        <ul className="mt-4 space-y-2.5">
          {[
            "Marco research — verified case law and statutes",
            "Marco Reid Voice in nine languages",
            "Matters, clients, and document management",
            "Trust accounting and IOLTA compliance",
            "Time tracking, invoices, and billing",
            "Audit trail on every action",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm text-white/80">
              <svg
                viewBox="0 0 16 16"
                className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold-400"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M3 8l3.5 3.5L13 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTAs */}
      <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <Link
          href="/pricing"
          className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl bg-gold-500 px-8 py-3 text-base font-semibold text-navy-900 shadow-lg transition-all hover:bg-gold-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-900"
        >
          See pricing plans &rarr;
        </Link>
        <Link
          href="/api/auth/signout"
          className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-white/20 px-8 py-3 text-base font-medium text-white/70 transition-colors hover:border-white/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-900"
        >
          Sign out
        </Link>
      </div>

      <p className="mt-10 text-sm text-white/40">
        Questions?{" "}
        <Link href="/contact" className="underline hover:text-white/70">
          Contact the team
        </Link>
        .
      </p>
    </div>
  );
}
