"use client";

import { useEffect, useState } from "react";
import {
  AdminLoading,
  AdminPageHeader,
  useAdminGate,
} from "../components/AdminGate";

interface CddSubject {
  id: string;
  fullName: string;
  riskLevel: string;
  status: string;
  jurisdiction: string | null;
  flaggedAt: string | null;
}

interface DraftSar {
  id: string;
  subjectName: string;
  status: string;
  draftedAt: string | null;
}

interface Payload {
  subjects: CddSubject[];
  drafts: DraftSar[];
}

export default function AmlFlagsPage() {
  const { isAdmin, loading } = useAdminGate();
  const [data, setData] = useState<Payload | null>(null);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!isAdmin) return;
    fetch("/api/admin/aml-flags", {
      signal: AbortSignal.timeout(10_000),
    })
      .then((r) => r.json())
      .then((d) => {
        setData(d);
        setFetching(false);
      })
      .catch(() => setFetching(false));
  }, [isAdmin]);

  if (loading || !isAdmin) return <AdminLoading />;

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 lg:px-12">
      <AdminPageHeader
        eyebrow="Admin / AML"
        title="AML oversight"
        description="Read-only global view of CDD subjects in HIGH risk or requiring EDD, plus draft SARs."
      />

      <section className="mt-8">
        <h2 className="font-serif text-headline text-navy-800">
          CDD subjects — elevated risk
        </h2>
        <div className="mt-3 overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-card">
          {fetching ? (
            <p className="p-8 text-center text-sm text-navy-400">Loading…</p>
          ) : !data || data.subjects.length === 0 ? (
            <p className="p-8 text-center text-sm text-navy-400">
              No subjects currently flagged for HIGH risk or EDD.
            </p>
          ) : (
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-navy-100 bg-navy-50/50">
                  <Th>Subject</Th>
                  <Th>Risk</Th>
                  <Th>Status</Th>
                  <Th>Jurisdiction</Th>
                  <Th>Flagged</Th>
                </tr>
              </thead>
              <tbody>
                {data.subjects.map((s) => (
                  <tr
                    key={s.id}
                    className="border-b border-navy-50 hover:bg-navy-50/40"
                  >
                    <td className="px-6 py-3 text-navy-700">{s.fullName}</td>
                    <td className="px-6 py-3">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                          s.riskLevel === "HIGH"
                            ? "bg-plum-50 text-plum-600"
                            : "bg-gold-50 text-gold-700"
                        }`}
                      >
                        {s.riskLevel}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-navy-500">{s.status}</td>
                    <td className="px-6 py-3 text-navy-500">
                      {s.jurisdiction || "—"}
                    </td>
                    <td className="px-6 py-3 text-navy-400 text-xs">
                      {s.flaggedAt
                        ? new Date(s.flaggedAt).toLocaleString()
                        : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-serif text-headline text-navy-800">Draft SARs</h2>
        <div className="mt-3 overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-card">
          {fetching ? (
            <p className="p-8 text-center text-sm text-navy-400">Loading…</p>
          ) : !data || data.drafts.length === 0 ? (
            <p className="p-8 text-center text-sm text-navy-400">
              No draft suspicious activity reports.
            </p>
          ) : (
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-navy-100 bg-navy-50/50">
                  <Th>Subject</Th>
                  <Th>Status</Th>
                  <Th>Drafted</Th>
                </tr>
              </thead>
              <tbody>
                {data.drafts.map((d) => (
                  <tr
                    key={d.id}
                    className="border-b border-navy-50 hover:bg-navy-50/40"
                  >
                    <td className="px-6 py-3 text-navy-700">{d.subjectName}</td>
                    <td className="px-6 py-3 text-navy-500">{d.status}</td>
                    <td className="px-6 py-3 text-navy-400 text-xs">
                      {d.draftedAt
                        ? new Date(d.draftedAt).toLocaleString()
                        : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-navy-400">
      {children}
    </th>
  );
}
