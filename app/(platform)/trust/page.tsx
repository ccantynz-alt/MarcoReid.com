import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function TrustPage() {
  const userId = await getUserId();
  if (!userId) redirect("/login");

  const accounts = await prisma.trustAccount.findMany({
    where: { userId },
    include: { client: { select: { id: true, name: true } } },
    orderBy: { createdAt: "desc" },
  });

  const money = (cents: number, currency: string) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency }).format(cents / 100);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 lg:px-12">
      <h1 className="font-serif text-display text-navy-800">Trust accounts</h1>
      <p className="mt-2 text-sm text-navy-400">
        Client trust balances. Every deposit, withdrawal, and fee draw is recorded.
      </p>

      <div className="mt-8 overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-card">
        {accounts.length === 0 ? (
          <div className="p-8 text-center text-sm text-navy-400">No trust accounts yet.</div>
        ) : (
          <table className="w-full">
            <thead className="border-b border-navy-100 bg-navy-50/50">
              <tr className="text-left text-xs font-semibold uppercase tracking-wide text-navy-400">
                <th className="px-6 py-3">Client</th>
                <th className="px-6 py-3">Currency</th>
                <th className="px-6 py-3 text-right">Balance</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((a) => (
                <tr key={a.id} className="border-b border-navy-50 last:border-0">
                  <td className="px-6 py-4 text-sm font-medium text-navy-700">{a.client.name}</td>
                  <td className="px-6 py-4 text-sm text-navy-500">{a.currency}</td>
                  <td className="px-6 py-4 text-right text-sm font-semibold text-forest-600">
                    {money(a.balanceInCents, a.currency)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
