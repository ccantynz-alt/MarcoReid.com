import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";
import TrustActions from "./TrustActions";

export const dynamic = "force-dynamic";

export default async function TrustPage() {
  const userId = await getUserId();
  if (!userId) redirect("/login");

  const [accounts, clients, matters] = await Promise.all([
    prisma.trustAccount.findMany({
      where: { userId },
      include: { client: { select: { id: true, name: true } } },
      orderBy: { createdAt: "desc" },
    }),
    prisma.client.findMany({
      where: { userId },
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    }),
    prisma.matter.findMany({
      where: { userId },
      select: { id: true, title: true, matterNumber: true },
      orderBy: { title: "asc" },
    }),
  ]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 lg:px-12">
      <h1 className="font-serif text-display text-navy-800">Trust accounts</h1>
      <p className="mt-2 text-sm text-navy-400">
        Client trust balances. Every deposit, withdrawal, and fee draw is recorded.
      </p>

      <div className="mt-8">
        <TrustActions accounts={accounts} clients={clients} matters={matters} />
      </div>
    </div>
  );
}
