"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

interface SignoffRef {
  id: string;
  status: string;
  requestedAt: string;
}

interface MatterRow {
  id: string;
  summary: string;
  details: string;
  status: string;
  jurisdiction: string;
  acceptedAt: string | null;
  postedAt: string | null;
  practiceArea: { id: string; name: string; jurisdiction: string };
  citizen: { name: string | null; email: string };
  signoffRequests: SignoffRef[];
}

function formatDate(d: string | null) {
  if (!d) return "—";
  return new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(
    new Date(d),
  );
}

export default function ProfessionalMattersPage() {
  const { data: session, status } = useSession();
  const [matters, setMatters] = useState<MatterRow[]>([]);
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
    fetch("/api/professional/matters")
      .then((r) => r.json())
      .then((d) => {
        setMatters(d.matters || []);
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
          Not on the panel yet
        </p>
        <h1 className="mt-2 font-serif text-display text-navy-800">
          Set up your professional profile.
        </h1>
        <p className="mt-3 text-navy-500">
          Submit your admission and indemnity details to join the verified
          panel and start receiving matters.
        </p>
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
          You&rsquo;re in the queue.
        </h1>
        <p className="mt-3 text-navy-500">
          Our verification team is reviewing your application. You will
          receive an email once you are cleared to take on matters.
        </p>
      </div>
    );
  }

  const userName = session?.user?.name || "you";

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 lg:px-12">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">
            Professional · Matters
          </p>
          <h1 className="mt-1 font-serif text-display text-navy-800">
            Your assigned matters
          </h1>
          <p className="mt-2 text-navy-400">
            {userName}, every matter here is yours to drive. Sign-off
            requests land in your <Link href="/signoff" className="text-navy-700 underline">review queue</Link>.
          </p>
        </div>
        <Link
          href="/signoff"
          className="rounded-lg bg-navy-500 px-4 py-2 text-sm font-semibold text-white hover:bg-navy-600"
        >
          Sign-off queue →
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-card">
        {matters.length === 0 ? (
          <div className="p-12 text-center">
            <p className="font-serif text-lg text-navy-700">
              No matters yet.
            </p>
            <p className="mt-1 text-sm text-navy-400">
              When the admin team assigns you a citizen matter, it will
              appear here.
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-navy-50">
            {matters.map((m) => {
              const pending = m.signoffRequests.filter(
                (s) => s.status === "PENDING",
              ).length;
              return (
                <li key={m.id} className="px-6 py-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                            m.status === "ACCEPTED"
                              ? "bg-forest-50 text-forest-600"
                              : m.status === "AWAITING_SIGNOFF"
                                ? "bg-plum-50 text-plum-600"
                                : m.status === "SIGNED_OFF"
                                  ? "bg-navy-50 text-navy-500"
                                  : "bg-navy-50 text-navy-400"
                          }`}
                        >
                          {m.status.replace(/_/g, " ").toLowerCase()}
                        </span>
                        <span className="text-xs text-navy-400">
                          {m.practiceArea.name} · {m.jurisdiction}
                        </span>
                      </div>
                      <p className="mt-2 font-medium text-navy-700">
                        {m.summary}
                      </p>
                      <p className="mt-1 text-xs text-navy-400">
                        Citizen: {m.citizen.name || m.citizen.email} ·
                        accepted {formatDate(m.acceptedAt)}
                      </p>
                    </div>
                    <div className="text-right">
                      {pending > 0 && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-plum-50 px-2 py-1 text-xs font-semibold text-plum-700">
                          {pending} sign-off
                          {pending === 1 ? "" : "s"} pending
                        </span>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
