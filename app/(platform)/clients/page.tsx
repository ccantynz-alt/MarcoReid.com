import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";
import type { Prisma } from "@prisma/client";
import ClientsListClient from "@/app/components/platform/ClientsListClient";
import Breadcrumb from "@/app/components/platform/Breadcrumb";
import EmptyState from "@/app/components/platform/EmptyState";

export const dynamic = "force-dynamic";

interface SearchParams {
  q?: string;
  sort?: string;
}

export default async function ClientsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const userId = await getUserId();
  if (!userId) redirect("/login");

  const params = await searchParams;
  const q = params.q?.trim() || "";
  const sort = params.sort || "recent";

  const where: Prisma.ClientWhereInput = { userId };
  if (q) {
    where.OR = [
      { name: { contains: q, mode: "insensitive" } },
      { email: { contains: q, mode: "insensitive" } },
      { companyName: { contains: q, mode: "insensitive" } },
      { phone: { contains: q, mode: "insensitive" } },
    ];
  }

  const orderBy: Prisma.ClientOrderByWithRelationInput =
    sort === "name"
      ? { name: "asc" }
      : sort === "company"
        ? { companyName: "asc" }
        : { createdAt: "desc" };

  const clients = await prisma.client.findMany({
    where,
    include: { _count: { select: { matters: true } } },
    orderBy,
  });

  const total = await prisma.client.count({ where: { userId } });

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 lg:px-12">
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Clients" },
        ]}
      />

      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-display text-navy-800">Clients</h1>
          <p className="mt-2 text-navy-400">
            {total === 0
              ? "No clients yet."
              : `${total} ${total === 1 ? "client" : "clients"}`}
          </p>
        </div>
        <Link
          href="/clients/new"
          className="inline-flex min-h-touch items-center justify-center rounded-lg bg-navy-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-navy-600"
        >
          Add client
        </Link>
      </div>

      {total === 0 ? (
        <div className="mt-8">
          <EmptyState
            icon="users"
            title="No clients yet"
            description="Add your first client to start building your practice."
            action={{ label: "Add client", href: "/clients/new" }}
          />
        </div>
      ) : (
        <ClientsListClient
          clients={clients.map((c) => ({
            id: c.id,
            name: c.name,
            email: c.email,
            phone: c.phone,
            companyName: c.companyName,
            matterCount: c._count.matters,
            createdAt: c.createdAt.toISOString(),
          }))}
          initialQ={q}
          initialSort={sort}
        />
      )}
    </div>
  );
}
