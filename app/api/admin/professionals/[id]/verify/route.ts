import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// POST /api/admin/professionals/:id/verify
// Body: { action: "verify" | "unverify" }
// Only admins. Stamps verifiedAt + verifiedBy (admin User.id).
export async function POST(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const session = await getServerSession(authOptions);
  const adminId = (session?.user as { id?: string; role?: string } | undefined)?.id;
  const adminRole = (session?.user as { role?: string } | undefined)?.role;
  if (!adminId || adminRole !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const { action } = (body ?? {}) as { action?: "verify" | "unverify" };
  if (action !== "verify" && action !== "unverify") {
    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  }

  const pro = await prisma.professional.findUnique({ where: { id }, select: { id: true } });
  if (!pro) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const updated = await prisma.professional.update({
    where: { id },
    data:
      action === "verify"
        ? { verifiedAt: new Date(), verifiedBy: adminId }
        : { verifiedAt: null, verifiedBy: null },
  });

  return NextResponse.json({ ok: true, professional: updated });
}
