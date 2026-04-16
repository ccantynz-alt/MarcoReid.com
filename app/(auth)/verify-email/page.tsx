"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type State = "verifying" | "success" | "already" | "error";

function VerifyEmailInner() {
  const searchParams = useSearchParams();
  const token = searchParams?.get("token") || "";
  const [state, setState] = useState<State>("verifying");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setState("error");
      setMessage("This verification link is missing its token.");
      return;
    }

    fetch("/api/auth/verify-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          setState("error");
          setMessage(data.error || "Could not verify your email.");
          return;
        }
        if (data.alreadyVerified) {
          setState("already");
        } else {
          setState("success");
        }
        setMessage(data.message);
      })
      .catch(() => {
        setState("error");
        setMessage("Something went wrong. Please try again.");
      });
  }, [token]);

  if (state === "verifying") {
    return (
      <div className="rounded-2xl border border-navy-100 bg-white p-8 shadow-card text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-navy-200 border-t-navy-500" />
        <p className="mt-4 text-navy-500">Verifying your email&hellip;</p>
      </div>
    );
  }

  if (state === "success" || state === "already") {
    return (
      <div className="rounded-2xl border border-forest-300 bg-white p-8 shadow-card">
        <p className="font-serif text-2xl text-navy-700">
          {state === "already" ? "Already verified" : "Email verified"}
        </p>
        <p className="mt-3 text-sm text-navy-500">{message}</p>
        <Link
          href="/dashboard"
          className="mt-6 flex w-full min-h-touch items-center justify-center rounded-lg bg-navy-500 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-600"
        >
          Go to dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-red-200 bg-white p-8 shadow-card">
      <p className="font-serif text-2xl text-navy-700">Verification failed</p>
      <p className="mt-3 text-sm text-navy-500">{message}</p>
      <Link
        href="/login"
        className="mt-6 flex w-full min-h-touch items-center justify-center rounded-lg bg-navy-500 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-600"
      >
        Back to sign in
      </Link>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-50 px-6 py-12">
      <div className="w-full max-w-md">
        <div className="text-center">
          <Link href="/" className="font-serif text-3xl text-navy-500">
            Marco Reid
          </Link>
        </div>
        <div className="mt-8">
          <Suspense fallback={null}>
            <VerifyEmailInner />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
