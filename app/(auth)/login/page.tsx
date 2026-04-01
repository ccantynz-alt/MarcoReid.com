"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid email or password.");
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-50 px-6">
      <div className="w-full max-w-md">
        <div className="text-center">
          <Link href="/" className="font-serif text-3xl text-navy-500">
            AlecRae
          </Link>
          <p className="mt-2 text-sm text-navy-400">
            Sign in to your account
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
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 block w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-sm text-navy-700 placeholder-navy-300 transition-colors focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 flex w-full min-h-touch items-center justify-center rounded-lg bg-navy-500 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-navy-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-500 focus-visible:ring-offset-2 disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-navy-400">
          <Link href="/" className="font-medium text-navy-500 hover:text-navy-700">
            &larr; Back to AlecRae
          </Link>
        </p>
      </div>
    </div>
  );
}
