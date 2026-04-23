"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

interface SignoffRow {
  id: string;
  kind: string;
  aiOutput: string;
  status: string;
  requestedAt: string;
  proMatter: {
    id: string;
    summary: string;
    jurisdiction: string;
    practiceArea: { id: string; name: string };
    citizen: { name: string | null; email: string };
  };
}

function preview(text: string, n = 200) {
  if (text.length <= n) return text;
  return text.slice(0, n).trimEnd() + "…";
}

function formatTimeAgo(d: string) {
  const ms = Date.now() - new Date(d).getTime();
  const min = Math.floor(ms / 60000);
  if (min < 1) return "just now";
  if (min < 60) return `${min}m ago`;
  const hrs = Math.floor(min / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export default function SignoffQueuePage() {
  const { data: session, status } = useSession();
  const [signoffs, setSignoffs] = useState<SignoffRow[]>([]);
  const [profile, setProfile] = useState<{
    id: string;
    verifiedAt: string | null;
  } | null>(null);
  const [hasProfile, setHasProfile] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") redirect("/login");
  }, [status]);

  useEffect(() => {
    if (status !== "authenticated") return;
    fetch("/api/signoff?status=PENDING")
      .then((r) => r.json())
      .then((d) => {
        setSignoffs(d.signoffs || []);
        setProfile(d.professional || null);
        setHasProfile(Boolean(d.professional));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [status]);

  if (status === "loading" || loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-navy-400">Loading…</p>
      </div>
    );
  }

  if (hasProfile === false) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-plum-600">
          Pro profile required
        </p>
        <h1 className="mt-2 font-serif text-display text-navy-800">
          You need a verified professional profile to sign off work.
        </h1>
        <Link
          href="/professional/onboard"
          className="mt-6 inline-block rounded-lg bg-navy-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy-600"
        >
          Start onboarding →
        </Link>
      </div>
    );
  }

  if (profile && !profile.verifiedAt) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-plum-600">
          Verification pending
        </p>
        <h1 className="mt-2 font-serif text-display text-navy-800">
          You can&rsquo;t sign off work until your profile is verified.
        </h1>
        <p className="mt-3 text-navy-500">
          We&rsquo;ll email you the moment that&rsquo;s done.
        </p>
      </div>
    );
  }

  const userName = session?.user?.name || "you";

  return (
    <div className="mx-auto max-w-5xl px-6 py-12 sm:px-8 lg:px-12">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">
            Sign-off queue
          </p>
          <h1 className="mt-1 font-serif text-display text-navy-800">
            Pending review
          </h1>
          <p className="mt-2 text-navy-400">
            {userName}, every output below is waiting on you. Nothing
            reaches a citizen until you approve, amend, or reject it.
          </p>
        </div>
        <Link
          href="/professional/matters"
          className="text-sm font-medium text-navy-500 hover:text-navy-700"
        >
          ← Your matters
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-card">
        {signoffs.length === 0 ? (
          <div className="p-12 text-center">
            <p className="font-serif text-lg text-navy-700">
              Inbox zero. Nothing to review.
            </p>
            <p className="mt-1 text-sm text-navy-400">
              When the platform drafts an output for one of your matters,
              it will land here.
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-navy-50">
            {signoffs.map((s) => (
              <li key={s.id}>
                <Link
                  href={`/signoff/${s.id}`}
                  className="block px-6 py-5 transition-colors hover:bg-navy-50/50"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-plum-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-plum-600">
                          {s.kind}
                        </span>
                        <span className="text-xs text-navy-400">
                          {s.proMatter.practiceArea.name} ·{" "}
                          {s.proMatter.jurisdiction}
                        </span>
                      </div>
                      <p className="mt-2 font-medium text-navy-700">
                        {s.proMatter.summary}
                      </p>
                      <p className="mt-1 line-clamp-2 text-sm text-navy-500">
                        {preview(s.aiOutput)}
                      </p>
                      <p className="mt-2 text-xs text-navy-400">
                        Requested {formatTimeAgo(s.requestedAt)} · matter
                        ref {s.proMatter.id.slice(-6)}
                      </p>
                    </div>
                    <span className="rounded-lg bg-navy-500 px-3 py-1.5 text-xs font-semibold text-white">
                      Review →
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
