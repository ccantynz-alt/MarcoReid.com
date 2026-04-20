import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as { role?: string })?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const professionals = await prisma.professional.findMany({
    include: {
      user: { select: { email: true, name: true } },
      practiceAreas: {
        include: {
          practiceArea: { select: { name: true, jurisdiction: true, domain: true } },
        },
      },
    },
    orderBy: [{ verifiedAt: "asc" }, { createdAt: "desc" }],
  });

  return NextResponse.json({ professionals });
}
