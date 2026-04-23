"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import {
  AdminLoading,
  AdminPageHeader,
  useAdminGate,
} from "../../components/AdminGate";

interface UserDetail {
  id: string;
  email: string;
  name: string | null;
  role: string;
  firmName: string | null;
  jurisdiction: string | null;
  practiceArea: string | null;
  createdAt: string;
  updatedAt: string;
  emailVerifiedAt: string | null;
  onboardedAt: string | null;
  subscriptionStatus: string | null;
  stripePriceId: string | null;
  stripeSubscriptionId: string | null;
  subscriptionPeriodEnd: string | null;
  tosVersion: string | null;
  tosAcceptedAt: string | null;
  platformAckVersion: string | null;
  platformAckAt: string | null;
}

interface Payload {
  user: UserDetail;
  lastActivityAt: string | null;
}

function formatDate(d?: string | null) {
  if (!d) return "—";
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(d));
}

export default function UserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { isAdmin, loading } = useAdminGate();
  const [data, setData] = useState<Payload | null>(null);
  const [fetching, setFetching] = useState(true);
  const [impersonating, setImpersonating] = useState(false);
  const [impersonateError, setImpersonateError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAdmin) return;
    fetch(`/api/admin/users/${id}`, {
      signal: AbortSignal.timeout(10_000),
    })
      .then((r) => r.json())
      .then((d) => {
        setData(d);
        setFetching(false);
      })
      .catch(() => setFetching(false));
  }, [isAdmin, id]);

  const startImpersonation = async () => {
    setImpersonating(true);
    setImpersonateError(null);
    try {
      const res = await fetch("/api/admin/impersonate", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ userId: id }),
        signal: AbortSignal.timeout(5_000),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Failed to start impersonation");
      }
      window.location.href = "/dashboard";
    } catch (err) {
      setImpersonateError(err instanceof Error ? err.message : String(err));
      setImpersonating(false);
    }
  };

  if (loading || !isAdmin) return <AdminLoading />;

  return (
    <div className="mx-auto max-w-4xl px-6 py-12 sm:px-8 lg:px-12">
      <Link
        href="/admin"
        className="text-xs font-semibold uppercase tracking-wider text-plum-600 hover:underline"
      >
        ← Back to admin
      </Link>
      <div className="mt-3">
        <AdminPageHeader
          eyebrow="Admin / Users"
          title={data?.user.name || data?.user.email || "User"}
          description={data?.user.email}
        />
      </div>

      {fetching ? (
        <p className="mt-10 text-sm text-navy-400">Loading user…</p>
      ) : !data ? (
        <p className="mt-10 text-sm text-navy-400">User not found.</p>
      ) : (
        <>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <Card title="Profile">
              <Row label="Name">{data.user.name || "—"}</Row>
              <Row label="Email">{data.user.email}</Row>
              <Row label="Role">{data.user.role}</Row>
              <Row label="Firm">{data.user.firmName || "—"}</Row>
              <Row label="Jurisdiction">{data.user.jurisdiction || "—"}</Row>
              <Row label="Practice area">
                {data.user.practiceArea || "—"}
              </Row>
              <Row label="Created">{formatDate(data.user.createdAt)}</Row>
              <Row label="Onboarded">{formatDate(data.user.onboardedAt)}</Row>
              <Row label="Email verified">
                {formatDate(data.user.emailVerifiedAt)}
              </Row>
            </Card>

            <Card title="Subscription">
              <Row label="Status">{data.user.subscriptionStatus || "—"}</Row>
              <Row label="Price ID">{data.user.stripePriceId || "—"}</Row>
              <Row label="Subscription ID">
                {data.user.stripeSubscriptionId || "—"}
              </Row>
              <Row label="Period end">
                {formatDate(data.user.subscriptionPeriodEnd)}
              </Row>
              <Row label="Last activity">
                {formatDate(data.lastActivityAt)}
              </Row>
            </Card>

            <Card title="Consent">
              <Row label="ToS version">{data.user.tosVersion || "—"}</Row>
              <Row label="ToS accepted">
                {formatDate(data.user.tosAcceptedAt)}
              </Row>
              <Row label="Platform ack version">
                {data.user.platformAckVersion || "—"}
              </Row>
              <Row label="Platform ack accepted">
                {formatDate(data.user.platformAckAt)}
              </Row>
            </Card>

            <Card title="Actions">
              <p className="text-sm text-navy-500">
                Impersonate this user to debug their session. The admin
                banner will stay visible across the platform; end the
                session at any time from the banner or{" "}
                <code className="rounded bg-navy-50 px-1 text-xs">
                  /api/admin/impersonate/end
                </code>
                .
              </p>
              <button
                type="button"
                onClick={startImpersonation}
                disabled={impersonating}
                className="mt-4 rounded-lg bg-plum-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-plum-700 disabled:opacity-50"
              >
                {impersonating ? "Starting…" : "Impersonate user"}
              </button>
              {impersonateError && (
                <p className="mt-2 text-xs text-plum-600">{impersonateError}</p>
              )}
            </Card>
          </div>
        </>
      )}
    </div>
  );
}

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-card">
      <h2 className="font-serif text-lg text-navy-800">{title}</h2>
      <dl className="mt-3 space-y-1.5">{children}</dl>
    </div>
  );
}

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-between gap-4 text-sm">
      <dt className="text-navy-400">{label}</dt>
      <dd className="text-navy-700 text-right">{children}</dd>
    </div>
  );
}
