"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams?.get("token") || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }
      setSuccess(true);
      setTimeout(() => router.push("/login"), 2000);
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  if (!token) {
    return (
      <div className="rounded-2xl border border-navy-100 bg-white p-8 shadow-card">
        <p className="font-serif text-xl text-navy-700">
          Invalid reset link
        </p>
        <p className="mt-3 text-sm text-navy-500">
          This reset link is missing its token or has been tampered with.
          Please request a new password reset.
        </p>
        <Link
          href="/forgot-password"
          className="mt-6 flex w-full min-h-touch items-center justify-center rounded-lg bg-navy-500 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-600"
        >
          Request new link
        </Link>
      </div>
    );
  }

  if (success) {
    return (
      <div className="rounded-2xl border border-forest-300 bg-white p-8 shadow-card">
        <p className="font-serif text-xl text-navy-700">
          Password reset
        </p>
        <p className="mt-3 text-sm text-navy-500">
          Your password has been updated. Redirecting you to sign in&hellip;
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="rounded-2xl border border-navy-100 bg-white p-8 shadow-card">
        <p className="text-sm text-navy-500">
          Choose a new password for your Marco Reid account.
        </p>

        {error && (
          <div className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="mt-5">
          <label htmlFor="password" className="block text-sm font-medium text-navy-600">
            New password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 block w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-sm text-navy-700 placeholder-navy-300 transition-colors focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500"
            placeholder="At least 8 characters"
          />
        </div>

        <div className="mt-5">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-navy-600">
            Confirm new password
          </label>
          <input
            id="confirmPassword"
            type="password"
            autoComplete="new-password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-2 block w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-sm text-navy-700 placeholder-navy-300 transition-colors focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500"
            placeholder="Re-enter your password"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 flex w-full min-h-touch items-center justify-center rounded-lg bg-navy-500 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-navy-600 disabled:opacity-50"
        >
          {loading ? "Updating..." : "Set new password"}
        </button>
      </div>
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-50 px-6 py-12">
      <div className="w-full max-w-md">
        <div className="text-center">
          <Link href="/" className="font-serif text-3xl text-navy-500">
            Marco Reid
          </Link>
          <p className="mt-2 text-sm text-navy-400">
            Set a new password
          </p>
        </div>

        <div className="mt-8">
          <Suspense fallback={null}>
            <ResetPasswordForm />
          </Suspense>
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
