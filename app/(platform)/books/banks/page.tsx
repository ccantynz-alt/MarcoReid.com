/**
 * /books/banks — Bank connection list + connect CTAs.
 *
 * Each provider gets its own Connect button. Until provider keys are
 * configured the button posts a stub explaining what's needed. When
 * keys are present the button creates a PAUSED connection ready for
 * the OAuth handshake.
 */

import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";
import { ALL_PROVIDERS, PROVIDER_LABEL, getAdapter } from "@/lib/bankfeeds";
import { BankFeedProvider, BankFeedStatus } from "@prisma/client";
import BanksClient from "./BanksClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Bank feeds · Marco Reid",
};

const STATUS_BADGE: Record<BankFeedStatus, string> = {
  ACTIVE: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  PAUSED: "bg-gold-100 text-gold-800 dark:bg-gold-900/30 dark:text-gold-300",
  ERROR: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  REVOKED: "bg-navy-100 text-navy-700 dark:bg-navy-800 dark:text-navy-300",
};

export default async function BanksPage() {
  const userId = await getUserId();
  if (!userId) redirect("/login");

  const connections = await prisma.bankConnection.findMany({
    where: { firmId: userId },
    include: { bankAccounts: true },
    orderBy: { createdAt: "desc" },
  });

  const providerStatus: Record<BankFeedProvider, boolean> = {
    AKAHU: getAdapter("AKAHU").isConfigured(),
    BASIQ: getAdapter("BASIQ").isConfigured(),
    PLAID: getAdapter("PLAID").isConfigured(),
    TRUELAYER: getAdapter("TRUELAYER").isConfigured(),
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-gold-600">Accounting</p>
          <h1 className="mt-2 font-serif text-4xl text-navy-700 dark:text-navy-100">Bank feeds</h1>
          <p className="mt-2 max-w-2xl text-navy-500 dark:text-navy-300">
            Marco Reid pulls bank data direct from neutral open-banking infrastructure providers — never via a competitor's API.
          </p>
        </div>
        <Link href="/books" className="text-sm font-semibold text-navy-500 hover:text-navy-700 dark:text-navy-300">
          ← Overview
        </Link>
      </div>

      <section className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {ALL_PROVIDERS.map((p) => (
          <div
            key={p}
            className="rounded-2xl border border-navy-200 bg-white p-5 dark:border-navy-700 dark:bg-navy-900"
          >
            <p className="text-xs font-bold uppercase tracking-wider text-gold-600">
              {p === "AKAHU" ? "New Zealand" : p === "BASIQ" ? "Australia" : p === "PLAID" ? "United States" : "United Kingdom"}
            </p>
            <h3 className="mt-2 font-serif text-xl text-navy-700 dark:text-navy-100">{PROVIDER_LABEL[p]}</h3>
            <p className="mt-1 text-xs text-navy-400">
              {providerStatus[p] ? "Keys configured" : "Keys not configured"}
            </p>
            <BanksClient provider={p} configured={providerStatus[p]} />
          </div>
        ))}
      </section>

      <h2 className="mb-4 font-serif text-2xl text-navy-700 dark:text-navy-100">Your connections</h2>
      {connections.length === 0 ? (
        <div className="rounded-2xl border border-navy-200 bg-white p-8 text-center dark:border-navy-700 dark:bg-navy-900">
          <p className="text-navy-500 dark:text-navy-300">No bank connections yet.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-navy-200 bg-white dark:border-navy-700 dark:bg-navy-900">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-100 text-left text-xs uppercase tracking-wider text-navy-400 dark:border-navy-700">
                <th className="px-6 py-3">Institution</th>
                <th className="px-6 py-3">Provider</th>
                <th className="px-6 py-3">Accounts</th>
                <th className="px-6 py-3">Last synced</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {connections.map((c) => (
                <tr key={c.id} className="border-b border-navy-50 dark:border-navy-800">
                  <td className="px-6 py-3 text-navy-700 dark:text-navy-200">{c.institutionName}</td>
                  <td className="px-6 py-3 text-xs text-navy-400">{PROVIDER_LABEL[c.provider]}</td>
                  <td className="px-6 py-3 text-navy-700 dark:text-navy-200">{c.bankAccounts.length}</td>
                  <td className="px-6 py-3 text-xs text-navy-400">
                    {c.lastSyncedAt ? c.lastSyncedAt.toISOString().slice(0, 16).replace("T", " ") : "Never"}
                  </td>
                  <td className="px-6 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${STATUS_BADGE[c.status]}`}>
                      {c.status}
                    </span>
                    {c.errorMessage && (
                      <p className="mt-1 text-xs text-navy-400">{c.errorMessage}</p>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
