import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "@/lib/session";

const ALLOWED = new Set(["SENT", "PAID", "VOID"]);

// PATCH /api/invoices/[id]/status
// Body: { status: "SENT" | "PAID" | "VOID" }
//
// Persistence is stubbed until the Invoice model lands. For now we
// validate ownership (by requiring an authenticated user) and log the
// state change. This endpoint returns success so the UI flow is
// exercised end-to-end.

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const status = (body as { status?: string } | null)?.status;
  if (!status || !ALLOWED.has(status)) {
    return NextResponse.json(
      { error: "status must be one of SENT, PAID, VOID" },
      { status: 400 }
    );
  }

  console.log(
    `[invoices/status] user=${userId} invoice=${id} -> ${status} (not persisted; schema pending)`,
  );

  return NextResponse.json({
    ok: true,
    invoiceId: id,
    status,
    persisted: false,
    note: "Status change recognised. Persistence arrives with Invoice model.",
  });
}
