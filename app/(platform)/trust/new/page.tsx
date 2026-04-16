import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";
import NewTrustAccountForm from "@/app/components/platform/NewTrustAccountForm";

export const dynamic = "force-dynamic";

export default async function NewTrustAccountPage() {
  const userId = await getUserId();
  if (!userId) redirect("/login");

  // Show clients that don't already have a trust account
  const [clients, existingAccounts] = await Promise.all([
    prisma.client.findMany({
      where: { userId },
      select: { id: true, name: true, companyName: true },
      orderBy: { name: "asc" },
    }),
    prisma.trustAccount.findMany({
      where: { userId },
      select: { clientId: true },
    }),
  ]);

  const existingClientIds = new Set(existingAccounts.map((a) => a.clientId));
  const availableClients = clients.filter((c) => !existingClientIds.has(c.id));

  return (
    <div className="mx-auto max-w-xl px-6 py-12 sm:px-8 lg:px-12">
      <Link
        href="/trust"
        className="inline-flex items-center gap-1 text-sm text-navy-400 transition-colors hover:text-navy-700"
      >
        &larr; Trust accounts
      </Link>

      <h1 className="mt-4 font-serif text-display text-navy-800">
        Open trust account
      </h1>
      <p className="mt-2 text-navy-400">
        Create a new IOLTA trust ledger for a client. One account per client.
      </p>

      <div className="mt-8 rounded-2xl border border-navy-100 bg-white p-8 shadow-card">
        {availableClients.length === 0 ? (
          <div className="text-center">
            <p className="font-serif text-lg text-navy-700">
              {clients.length === 0
                ? "Add a client first"
                : "All clients have trust accounts"}
            </p>
            <p className="mt-2 text-sm text-navy-400">
              {clients.length === 0
                ? "You need at least one client before opening a trust account."
                : "Each client can only have one trust account. Open the existing one from the trust list."}
            </p>
            <Link
              href={clients.length === 0 ? "/clients/new" : "/trust"}
              className="mt-6 inline-flex items-center justify-center rounded-lg bg-navy-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy-600"
            >
              {clients.length === 0 ? "Add client" : "Back to trust"}
            </Link>
          </div>
        ) : (
          <NewTrustAccountForm clients={availableClients} />
        )}
      </div>

      <div className="mt-6 rounded-2xl border border-plum-200 bg-plum-50/40 p-5 text-sm text-navy-600">
        <p className="font-semibold text-plum-700">Before you open</p>
        <p className="mt-2">
          You must have an actual IOLTA-compliant trust account at an authorised
          financial institution in your jurisdiction. Marco Reid is the ledger —
          not the bank. Opening an account here records that relationship and
          tracks all trust activity, but it does not move money.
        </p>
      </div>
    </div>
  );
}
