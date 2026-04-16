import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";
import { DocumentKind } from "@prisma/client";

const VALID_KINDS = new Set<string>([
  "CONTRACT",
  "LETTER",
  "COURT_FILING",
  "EVIDENCE",
  "INVOICE",
  "RECEIPT",
  "OTHER",
]);

const VALID_SORTS = new Set(["recent", "title", "size", "kind"]);

export async function GET(req: NextRequest) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const sp = req.nextUrl.searchParams;
    const q = sp.get("q")?.trim() ?? "";
    const kindParam = sp.get("kind") ?? "";
    const sortParam = sp.get("sort") ?? "recent";
    const matterId = sp.get("matterId") ?? undefined;
    const clientId = sp.get("clientId") ?? undefined;
    const page = Math.max(1, Number(sp.get("page") ?? "1") || 1);
    const pageSizeRaw = Number(sp.get("pageSize") ?? "50") || 50;
    const pageSize = Math.min(200, Math.max(1, pageSizeRaw));

    const kind = VALID_KINDS.has(kindParam) ? (kindParam as DocumentKind) : undefined;
    const sort = VALID_SORTS.has(sortParam) ? sortParam : "recent";

    const where: Prisma.DocumentWhereInput = {
      userId,
      ...(kind ? { kind } : {}),
      ...(matterId ? { matterId } : {}),
      ...(clientId ? { clientId } : {}),
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

    const [total, documents] = await Promise.all([
      prisma.document.count({ where }),
      prisma.document.findMany({
        where,
        include: {
          matter: { select: { id: true, title: true } },
          client: { select: { id: true, name: true } },
        },
        orderBy,
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
    ]);

    return NextResponse.json({
      documents,
      pagination: { total, page, pageSize, pageCount: Math.ceil(total / pageSize) },
    });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

/**
 * POST /api/documents
 *
 * Accepts either:
 *  - JSON body with { title, fileName, fileUrl, fileSize, mimeType, kind?, matterId?, clientId? }
 *  - multipart/form-data with `file` plus the metadata fields above
 *
 * NOTE: file storage backend (S3 / R2 / Vercel Blob) is not yet wired up.
 * If a real `file` blob is uploaded via FormData we currently return 501 so
 * the client can fall back to its preview-mode stub. JSON callers (with a
 * provided fileUrl) continue to work — that's how seed data and the
 * preview-mode client both create rows.
 */
export async function POST(req: NextRequest) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const contentType = req.headers.get("content-type") ?? "";

    let title: string | undefined;
    let fileName: string | undefined;
    let fileUrl: string | undefined;
    let fileSize: number | undefined;
    let mimeType: string | undefined;
    let kind: string | undefined;
    let matterId: string | null | undefined;
    let clientId: string | null | undefined;

    if (contentType.includes("multipart/form-data")) {
      const form = await req.formData();
      const file = form.get("file");

      title = (form.get("title") as string | null) ?? undefined;
      fileName = (form.get("fileName") as string | null) ?? undefined;
      fileUrl = (form.get("fileUrl") as string | null) ?? undefined;
      const sizeRaw = form.get("fileSize");
      fileSize = sizeRaw != null ? Number(sizeRaw) : undefined;
      mimeType = (form.get("mimeType") as string | null) ?? undefined;
      kind = (form.get("kind") as string | null) ?? undefined;
      matterId = (form.get("matterId") as string | null) || null;
      clientId = (form.get("clientId") as string | null) || null;

      if (file && typeof file === "object" && "size" in file) {
        // Real binary upload requested but no storage backend configured.
        return NextResponse.json(
          {
            error: "File storage not configured",
            code: "STORAGE_NOT_CONFIGURED",
            message:
              "Real file storage is being configured. The client will fall back to preview mode.",
          },
          { status: 501 }
        );
      }
    } else {
      const body = await req.json().catch(() => ({}));
      ({ title, fileName, fileUrl, fileSize, mimeType, kind, matterId, clientId } = body ?? {});
    }

    if (
      !title ||
      !fileName ||
      !fileUrl ||
      typeof fileSize !== "number" ||
      Number.isNaN(fileSize) ||
      !mimeType
    ) {
      return NextResponse.json(
        { error: "title, fileName, fileUrl, fileSize, mimeType required" },
        { status: 400 }
      );
    }

    if (matterId) {
      const m = await prisma.matter.findFirst({ where: { id: matterId, userId } });
      if (!m) return NextResponse.json({ error: "Invalid matter" }, { status: 400 });
    }
    if (clientId) {
      const c = await prisma.client.findFirst({ where: { id: clientId, userId } });
      if (!c) return NextResponse.json({ error: "Invalid client" }, { status: 400 });
    }

    const document = await prisma.document.create({
      data: {
        userId,
        title,
        fileName,
        fileUrl,
        fileSize,
        mimeType,
        kind: VALID_KINDS.has(kind ?? "") ? (kind as DocumentKind) : DocumentKind.OTHER,
        matterId: matterId || null,
        clientId: clientId || null,
      },
    });
    return NextResponse.json({ document }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
