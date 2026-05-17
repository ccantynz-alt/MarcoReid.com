import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "@/lib/session";
import { verifyAuditChain } from "@/lib/audit";

export async function POST(req: NextRequest) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const { clientId } = body ?? {};

    const result = await verifyAuditChain(userId, clientId || undefined);

    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
