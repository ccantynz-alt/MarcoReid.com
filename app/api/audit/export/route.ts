import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "@/lib/session";
import { exportClientAuditTrail } from "@/lib/audit";

export async function POST(req: NextRequest) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const { clientId } = body ?? {};

    if (!clientId) {
      return NextResponse.json({ error: "clientId is required" }, { status: 400 });
    }

    const trail = await exportClientAuditTrail(userId, clientId);

    return NextResponse.json(trail);
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
