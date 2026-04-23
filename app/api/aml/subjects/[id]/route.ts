import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "@/lib/session";
import { getSubject } from "@/lib/aml/cdd";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const userId = await getUserId();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const subject = await getSubject(id);
  if (!subject || subject.firmId !== userId) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ subject });
}
