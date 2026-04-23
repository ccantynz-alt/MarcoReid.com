/**
 * /accounting/journal/new — multi-line journal entry form.
 *
 * Server component that fetches the COA, then hands off to the client
 * component that owns the dynamic line editor.
 */

import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";
import NewJournalEntryForm from "./NewJournalEntryForm";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "New journal entry · Marco Reid",
};

export default async function NewJournalEntryPage() {
  const userId = await getUserId();
  if (!userId) redirect("/login");

  const accounts = await prisma.chartOfAccounts.findMany({
    where: { firmId: userId, isActive: true },
    select: { id: true, code: true, name: true, type: true },
    orderBy: { code: "asc" },
  });

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-gold-600">Accounting</p>
          <h1 className="mt-2 font-serif text-4xl text-navy-700 dark:text-navy-100">New journal entry</h1>
          <p className="mt-2 text-navy-500 dark:text-navy-300">
            Debits must equal credits before you can post.
          </p>
        </div>
        <Link
          href="/accounting/journal"
          className="text-sm font-semibold text-navy-500 hover:text-navy-700 dark:text-navy-300"
        >
          ← All entries
        </Link>
      </div>

      <NewJournalEntryForm accounts={accounts} />
    </div>
  );
}
