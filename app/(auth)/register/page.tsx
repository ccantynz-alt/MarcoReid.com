"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  PLATFORM_ACK_BULLETS,
  CURRENT_TOS_VERSION,
  CURRENT_PLATFORM_ACK_VERSION,
} from "@/lib/consent";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [firmName, setFirmName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [acked, setAcked] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
    if (!agreed) {
      setError("Please agree to the Terms of Service and Privacy Policy.");
      return;
    }
    if (!acked) {
      setError(
        "Please acknowledge the platform statement before creating your account.",
      );
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          firmName,
          email,
          password,
          tosAccepted: agreed,
          tosVersion: CURRENT_TOS_VERSION,
          platformAcked: acked,
          platformAckVersion: CURRENT_PLATFORM_ACK_VERSION,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Could not create your account. Please try again.");
        setLoading(false);
        return;
      }

      // Auto sign-in after successful registration
      const signInResult = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (signInResult?.error) {
        // Account created but auto-login failed — send to login
        router.push("/login?registered=1");
        return;
      }

      router.push("/onboarding");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-50 px-6 py-12">
      <div className="w-full max-w-md">
        <div className="text-center">
          <Link href="/" className="font-serif text-3xl text-navy-500">
            Marco Reid
          </Link>
          <p className="mt-2 text-sm text-navy-400">
            Create your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8">
          <div className="rounded-2xl border border-navy-100 bg-white p-8 shadow-card">
            {error && (
              <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-navy-600"
              >
                Full name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 block w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-sm text-navy-700 placeholder-navy-300 transition-colors focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500"
                placeholder="Jane Smith"
              />
            </div>

            <div className="mt-5">
              <label
                htmlFor="firmName"
                className="block text-sm font-medium text-navy-600"
              >
                Firm or practice name
              </label>
              <input
                id="firmName"
                name="firmName"
                type="text"
                autoComplete="organization"
                value={firmName}
                onChange={(e) => setFirmName(e.target.value)}
                className="mt-2 block w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-sm text-navy-700 placeholder-navy-300 transition-colors focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500"
                placeholder="Smith & Partners"
              />
              <p className="mt-1.5 text-xs text-navy-400">
                Optional. You can add this later.
              </p>
            </div>

            <div className="mt-5">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-navy-600"
              >
                Work email
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

            <div className="mt-5">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-navy-600"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
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
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-navy-600"
              >
                Confirm password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-2 block w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-sm text-navy-700 placeholder-navy-300 transition-colors focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500"
                placeholder="Re-enter your password"
              />
            </div>

            <div className="mt-6 flex items-start gap-3">
              <input
                id="agreed"
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-navy-300 text-navy-500 focus:ring-navy-500"
              />
              <label htmlFor="agreed" className="text-sm text-navy-500">
                I agree to the{" "}
                <Link
                  href="/terms"
                  className="font-medium text-navy-700 underline hover:text-navy-500"
                  target="_blank"
                >
                  Terms of Service
                </Link>
                ,{" "}
                <Link
                  href="/privacy"
                  className="font-medium text-navy-700 underline hover:text-navy-500"
                  target="_blank"
                >
                  Privacy Policy
                </Link>
                , and{" "}
                <Link
                  href="/acceptable-use"
                  className="font-medium text-navy-700 underline hover:text-navy-500"
                  target="_blank"
                >
                  Acceptable Use Policy
                </Link>
                .
              </label>
            </div>

            <div className="mt-6 rounded-xl border border-navy-100 bg-navy-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">
                Platform statement
              </p>
              <p className="mt-2 text-sm text-navy-600">
                Please read and acknowledge before creating your account.
              </p>
              <ul className="mt-3 space-y-2 text-sm text-navy-600">
                {PLATFORM_ACK_BULLETS.map((bullet) => (
                  <li key={bullet} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-navy-400" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex items-start gap-3 border-t border-navy-100 pt-4">
                <input
                  id="acked"
                  type="checkbox"
                  checked={acked}
                  onChange={(e) => setAcked(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-navy-300 text-navy-500 focus:ring-navy-500"
                />
                <label
                  htmlFor="acked"
                  className="text-sm font-medium text-navy-700"
                >
                  I understand and agree to the statement above.
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 flex w-full min-h-touch items-center justify-center rounded-lg bg-navy-500 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-navy-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-500 focus-visible:ring-offset-2 disabled:opacity-50"
            >
              {loading ? "Creating your account…" : "Create account"}
            </button>

            <p className="mt-4 text-center text-xs text-navy-400">
              By creating an account, you confirm that you have authority to
              bind your firm to these terms where applicable.
            </p>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-navy-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-navy-500 hover:text-navy-700"
          >
            Sign in
          </Link>
        </p>
        <p className="mt-3 text-center text-sm text-navy-400">
          <Link href="/" className="font-medium text-navy-500 hover:text-navy-700">
            &larr; Back to Marco Reid
          </Link>
        </p>
      </div>
    </div>
  );
}
