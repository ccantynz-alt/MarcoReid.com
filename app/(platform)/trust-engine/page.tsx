import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";
import { getJurisdictionRules } from "@/lib/trust/jurisdiction-rules";

export const dynamic = "force-dynamic";

const formatDate = (d: Date) =>
  new Intl.DateTimeFormat("en-NZ", { dateStyle: "medium" }).format(d);

const statusStyles: Record<string, string> = {
  ACTIVE: "bg-forest-50 text-forest-600",
  INACTIVE: "bg-navy-50 text-navy-500",
  CLOSED: "bg-plum-50 text-plum-600",
};

export default async function TrustEnginePage() {
  const userId = await getUserId();
  if (!userId) redirect("/login");

  const accounts = await prisma.legalTrustAccount.findMany({
    where: { firmId: userId },
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { ledgers: true, transactions: true } },
      reconciliations: {
        orderBy: { periodEnd: "desc" },
        take: 1,
        select: { status: true, periodEnd: true },
      },
    },
  });

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 lg:px-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-display text-navy-800">
            Trust accounts
          </h1>
          <p className="mt-2 text-navy-400">
            Jurisdiction-aware ledger with three-way reconciliation.{" "}
            {accounts.length === 0
              ? "Open your first trust account to begin."
              : `${accounts.length} ${
                  accounts.length === 1 ? "account" : "accounts"
                } across ${
                  new Set(accounts.map((a) => a.jurisdiction)).size
                } ${
                  new Set(accounts.map((a) => a.jurisdiction)).size === 1
                    ? "jurisdiction"
                    : "jurisdictions"
                }.`}
          </p>
        </div>
        <Link
          href="/trust-engine/new"
          className="inline-flex min-h-touch items-center justify-center rounded-lg bg-navy-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-navy-600"
        >
          New trust account
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-card">
        {accounts.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <p className="font-serif text-xl text-navy-700">
              No trust accounts yet
            </p>
            <p className="mt-2 text-sm text-navy-400">
              Set up the first account for your firm. The engine will track
              every per-client sub-ledger and run three-way reconciliation
              against the bank statement on the cadence required by the
              jurisdiction you select.
            </p>
            <Link
              href="/trust-engine/new"
              className="mt-6 inline-flex items-center justify-center rounded-lg bg-navy-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy-600"
            >
              Open trust account
            </Link>
          </div>
        ) : (
          <table className="w-full">
            <thead className="border-b border-navy-100 bg-navy-50/50">
              <tr className="text-left text-xs font-semibold uppercase tracking-wide text-navy-400">
                <th className="px-6 py-3">Account</th>
                <th className="px-6 py-3">Jurisdiction</th>
                <th className="px-6 py-3">Bank</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Last reconciliation</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((a) => {
                const rules = getJurisdictionRules(a.jurisdiction);
                const lastRecon = a.reconciliations[0];
                return (
                  <tr
                    key={a.id}
                    className="border-b border-navy-50 last:border-0 hover:bg-navy-50/50"
                  >
                    <td className="px-6 py-4">
                      <Link
                        href={`/trust-engine/${a.id}`}
                        className="block"
                      >
                        <p className="font-medium text-navy-700">{a.name}</p>
                        <p className="text-xs text-navy-400">
                          {a.currency} · opened {formatDate(a.openedAt)} ·{" "}
                          {a._count.ledgers} client ledger
                          {a._count.ledgers === 1 ? "" : "s"}
                        </p>
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-sm text-navy-500">
                      <p className="font-medium text-navy-700">
                        {a.jurisdiction.replace("_", " ")}
                      </p>
                      <p className="text-xs text-navy-400">
                        {rules.regulator}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-sm text-navy-500">
                      <p>{a.bankName}</p>
                      <p className="text-xs text-navy-400">
                        ····{a.bankAccountMasked}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`rounded px-2 py-1 text-[10px] font-semibold uppercase tracking-wider ${
                          statusStyles[a.status] ?? "bg-navy-50 text-navy-500"
                        }`}
                      >
                        {a.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-navy-500">
                      {lastRecon ? (
                        <>
                          <p className="text-navy-700">
                            {formatDate(lastRecon.periodEnd)}
                          </p>
                          <p className="text-xs text-navy-400">
                            {lastRecon.status.replace("_", " ").toLowerCase()}
                          </p>
                        </>
                      ) : (
                        <span className="text-xs text-navy-400">
                          Not yet reconciled
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
