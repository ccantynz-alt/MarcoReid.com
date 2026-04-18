"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }
      setSent(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-50 px-6">
      <div className="w-full max-w-md">
        <div className="text-center">
          <Link href="/" className="font-serif text-3xl text-navy-500">
            Marco Reid
          </Link>
          <p className="mt-2 text-sm text-navy-400">
            Reset your password
          </p>
        </div>

        <div className="mt-8 rounded-2xl border border-navy-100 bg-white p-8 shadow-card">
          {sent ? (
            <div>
              <p className="font-serif text-xl text-navy-700">
                Check your email
              </p>
              <p className="mt-3 text-sm text-navy-500">
                If an account exists for <strong>{email}</strong>, we have sent
                a password reset link. It will expire in one hour.
              </p>
              <p className="mt-3 text-sm text-navy-400">
                Didn&rsquo;t receive it? Check your spam folder, or try again
                in a few minutes.
              </p>
              <Link
                href="/login"
                className="mt-6 flex w-full min-h-touch items-center justify-center rounded-lg bg-navy-500 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-navy-600"
              >
                Back to sign in
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <p className="text-sm text-navy-500">
                Enter the email associated with your account. We&rsquo;ll send
                you a link to reset your password.
              </p>

              {error && (
                <div className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <div className="mt-5">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-navy-600"
                >
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 block w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-sm text-navy-700 placeholder-navy-300 transition-colors focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500"
                  placeholder="you@yourfirm.com"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-6 flex w-full min-h-touch items-center justify-center rounded-lg bg-navy-500 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-navy-600 disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send reset link"}
              </button>
            </form>
          )}
        </div>

        <p className="mt-6 text-center text-sm text-navy-400">
          <Link href="/login" className="font-medium text-navy-500 hover:text-navy-700">
            &larr; Back to sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
