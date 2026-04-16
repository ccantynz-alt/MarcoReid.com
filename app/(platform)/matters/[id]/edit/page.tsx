import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";
import MatterEditForm from "@/app/components/platform/MatterEditForm";

export const dynamic = "force-dynamic";

export default async function MatterEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const userId = await getUserId();
  if (!userId) redirect("/login");

  const { id } = await params;

  const [matter, clients] = await Promise.all([
    prisma.matter.findFirst({
      where: { id, userId },
      include: { client: { select: { id: true, name: true } } },
    }),
    prisma.client.findMany({
      where: { userId },
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    }),
  ]);

  if (!matter) notFound();

  return (
    <div className="mx-auto max-w-2xl px-6 py-12 sm:px-8 lg:px-12">
      <Link
        href={`/matters/${matter.id}`}
        className="inline-flex items-center gap-1 text-sm text-navy-400 transition-colors hover:text-navy-700"
      >
        &larr; Back to matter
      </Link>

      <h1 className="mt-4 font-serif text-display text-navy-800">Edit matter</h1>
      <p className="mt-2 text-navy-400">
        Update details for {matter.title}.
      </p>

      <div className="mt-8 rounded-2xl border border-navy-100 bg-white p-8 shadow-card">
        <MatterEditForm
          matter={{
            id: matter.id,
            title: matter.title,
            matterNumber: matter.matterNumber,
            practiceArea: matter.practiceArea,
            status: matter.status,
            description: matter.description,
            clientId: matter.clientId,
            closedAt: matter.closedAt ? matter.closedAt.toISOString().slice(0, 10) : null,
          }}
          clients={clients}
        />
      </div>
    </div>
  );
}
