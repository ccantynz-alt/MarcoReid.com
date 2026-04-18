import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "@/lib/session";
import { deriveInvoicesForUser, type InvoiceStatus } from "@/lib/invoices";

const VALID_STATUSES = new Set<InvoiceStatus>([
  "DRAFT",
  "SENT",
  "PAID",
  "VOID",
  "OVERDUE",
]);

export async function GET(req: NextRequest) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const q = req.nextUrl.searchParams.get("q") ?? undefined;
    const rawStatus = req.nextUrl.searchParams.get("status");
    const clientId = req.nextUrl.searchParams.get("clientId") ?? undefined;
    const status =
      rawStatus && VALID_STATUSES.has(rawStatus as InvoiceStatus)
        ? (rawStatus as InvoiceStatus)
        : undefined;

    const invoices = await deriveInvoicesForUser({ userId, q, status, clientId });
    return NextResponse.json({ invoices });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
