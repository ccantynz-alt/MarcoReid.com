import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";
import { MatterStatus, Prisma } from "@prisma/client";
import MattersListClient from "@/app/components/platform/MattersListClient";

export const dynamic = "force-dynamic";

interface SearchParams {
  q?: string;
  status?: string;
  sort?: string;
}

export default async function MattersPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const userId = await getUserId();
  if (!userId) redirect("/login");

  const params = await searchParams;
  const q = params.q?.trim() || "";
  const statusFilter = params.status?.toUpperCase() as MatterStatus | "ALL" | undefined;
  const sort = params.sort || "recent";

  const where: Prisma.MatterWhereInput = { userId };
  if (
    statusFilter &&
    statusFilter !== "ALL" &&
    (statusFilter === "ACTIVE" ||
      statusFilter === "ON_HOLD" ||
      statusFilter === "CLOSED")
  ) {
    where.status = statusFilter;
  }
  if (q) {
    where.OR = [
      { title: { contains: q, mode: "insensitive" } },
      { matterNumber: { contains: q, mode: "insensitive" } },
      { practiceArea: { contains: q, mode: "insensitive" } },
      { client: { name: { contains: q, mode: "insensitive" } } },
    ];
  }

  const orderBy: Prisma.MatterOrderByWithRelationInput =
    sort === "title"
      ? { title: "asc" }
      : sort === "client"
        ? { client: { name: "asc" } }
        : sort === "status"
          ? { status: "asc" }
          : sort === "opened"
            ? { openedAt: "desc" }
            : { updatedAt: "desc" };

  const [matters, counts] = await Promise.all([
    prisma.matter.findMany({
      where,
      include: { client: { select: { id: true, name: true } } },
      orderBy,
    }),
    prisma.matter.groupBy({
      by: ["status"],
      where: { userId },
      _count: { _all: true },
    }),
  ]);

  const countMap: Record<string, number> = { ALL: 0, ACTIVE: 0, ON_HOLD: 0, CLOSED: 0 };
  counts.forEach((c) => {
    countMap[c.status] = c._count._all;
    countMap.ALL += c._count._all;
  });

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 lg:px-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-display text-navy-800">Matters</h1>
          <p className="mt-2 text-navy-400">
            {countMap.ALL === 0
              ? "No matters yet."
              : `${countMap.ALL} total · ${countMap.ACTIVE} active`}
          </p>
        </div>
        <Link
          href="/matters/new"
          className="inline-flex min-h-touch items-center justify-center rounded-lg bg-navy-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-navy-600"
        >
          New matter
        </Link>
      </div>

      <MattersListClient
        matters={matters.map((m) => ({
          id: m.id,
          title: m.title,
          matterNumber: m.matterNumber,
          practiceArea: m.practiceArea,
          status: m.status,
          openedAt: m.openedAt.toISOString(),
          updatedAt: m.updatedAt.toISOString(),
          client: m.client,
        }))}
        counts={countMap}
        initialQ={q}
        initialStatus={statusFilter === "ALL" || !statusFilter ? "ALL" : statusFilter}
        initialSort={sort}
      />
    </div>
  );
}
