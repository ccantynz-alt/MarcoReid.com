import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";
import ClientEditForm from "@/app/components/platform/ClientEditForm";

export const dynamic = "force-dynamic";

export default async function ClientEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const userId = await getUserId();
  if (!userId) redirect("/login");

  const { id } = await params;

  const client = await prisma.client.findFirst({
    where: { id, userId },
  });

  if (!client) notFound();

  return (
    <div className="mx-auto max-w-2xl px-6 py-12 sm:px-8 lg:px-12">
      <Link
        href={`/clients/${client.id}`}
        className="inline-flex items-center gap-1 text-sm text-navy-400 transition-colors hover:text-navy-700"
      >
        &larr; Back to client
      </Link>

      <h1 className="mt-4 font-serif text-display text-navy-800">Edit client</h1>
      <p className="mt-2 text-navy-400">Update contact details for {client.name}.</p>

      <div className="mt-8 rounded-2xl border border-navy-100 bg-white p-8 shadow-card">
        <ClientEditForm
          client={{
            id: client.id,
            name: client.name,
            email: client.email,
            phone: client.phone,
            address: client.address,
            companyName: client.companyName,
            notes: client.notes,
          }}
        />
      </div>
    </div>
  );
}
