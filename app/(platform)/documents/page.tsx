import { redirect } from "next/navigation";
import type { Prisma } from "@prisma/client";
import { DocumentKind } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";
import DocumentsListClient, {
  type DocumentRow,
} from "@/app/components/platform/DocumentsListClient";

export const dynamic = "force-dynamic";

const VALID_KINDS = new Set<DocumentKind>([
  "CONTRACT",
  "LETTER",
  "COURT_FILING",
  "EVIDENCE",
  "INVOICE",
  "RECEIPT",
  "OTHER",
]);

type SortKey = "recent" | "title" | "size" | "kind";
const VALID_SORTS = new Set<SortKey>(["recent", "title", "size", "kind"]);

interface PageProps {
  searchParams: Promise<{
    q?: string;
    kind?: string;
    sort?: string;
  }>;
}

export default async function DocumentsPage({ searchParams }: PageProps) {
  const userId = await getUserId();
  if (!userId) redirect("/login");

  const sp = await searchParams;
  const q = (sp.q ?? "").trim();
  const kindRaw = sp.kind ?? "";
  const kind = (VALID_KINDS as Set<string>).has(kindRaw)
    ? (kindRaw as DocumentKind)
    : null;
  const sort: SortKey = (VALID_SORTS as Set<string>).has(sp.sort ?? "")
    ? (sp.sort as SortKey)
    : "recent";

  const where: Prisma.DocumentWhereInput = {
    userId,
    ...(kind ? { kind } : {}),
    ...(q
      ? {
          OR: [
            { title: { contains: q, mode: "insensitive" } },
            { fileName: { contains: q, mode: "insensitive" } },
          ],
        }
      : {}),
  };

  const orderBy: Prisma.DocumentOrderByWithRelationInput =
    sort === "title"
      ? { title: "asc" }
      : sort === "size"
        ? { fileSize: "desc" }
        : sort === "kind"
          ? { kind: "asc" }
          : { createdAt: "desc" };

  const [documents, kindCounts, totalAll] = await Promise.all([
    prisma.document.findMany({
      where,
      include: {
        matter: { select: { id: true, title: true } },
        client: { select: { id: true, name: true } },
      },
      orderBy,
      take: 200,
    }),
    prisma.document.groupBy({
      by: ["kind"],
      where: { userId },
      _count: { _all: true },
    }),
    prisma.document.count({ where: { userId } }),
  ]);

  const counts: Record<"ALL" | DocumentKind, number> = {
    ALL: totalAll,
    CONTRACT: 0,
    LETTER: 0,
    COURT_FILING: 0,
    EVIDENCE: 0,
    INVOICE: 0,
    RECEIPT: 0,
    ENGAGEMENT_LETTER: 0,
    WILL: 0,
    OTHER: 0,
  };
  for (const row of kindCounts) {
    counts[row.kind] = row._count._all;
  }

  const rows: DocumentRow[] = documents.map((d) => ({
    id: d.id,
    title: d.title,
    fileName: d.fileName,
    fileSize: d.fileSize,
    mimeType: d.mimeType,
    kind: d.kind,
    createdAt: d.createdAt.toISOString(),
    matter: d.matter ? { id: d.matter.id, title: d.matter.title } : null,
    client: d.client ? { id: d.client.id, name: d.client.name } : null,
  }));

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 lg:px-12">
      <DocumentsListClient
        documents={rows}
        counts={counts}
        initialQuery={q}
        initialKind={kind ?? "ALL"}
        initialSort={sort}
      />
    </div>
  );
}
