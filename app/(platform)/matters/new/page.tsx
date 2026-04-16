import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";
import NewMatterForm from "./NewMatterForm";

export const dynamic = "force-dynamic";

export default async function NewMatterPage() {
  const userId = await getUserId();
  if (!userId) redirect("/login");

  const clients = await prisma.client.findMany({
    where: { userId },
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });

  return (
    <div className="mx-auto max-w-3xl px-6 py-12 sm:px-8 lg:px-12">
      <h1 className="font-serif text-display text-navy-800 dark:text-white">New matter</h1>
      {clients.length === 0 ? (
        <p className="mt-6 text-sm text-navy-400">
          You need to add a client first.{" "}
          <a href="/clients/new" className="text-navy-600 underline dark:text-navy-300">
            Add a client
          </a>
          .
        </p>
      ) : (
        <NewMatterForm clients={clients} />
      )}
    </div>
  );
}
