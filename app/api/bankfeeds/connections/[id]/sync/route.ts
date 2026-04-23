/**
 * POST /api/bankfeeds/connections/[id]/sync — pull latest transactions
 * for a connection and run the suggestion pass.
 */

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";
import { importTransactions } from "@/lib/bankfeeds/import";
import { runCategorisation } from "@/lib/bankfeeds/categorise";

export async function POST(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await ctx.params;
  const conn = await prisma.bankConnection.findFirst({
    where: { id, firmId: userId },
  });
  if (!conn) return NextResponse.json({ error: "Connection not found" }, { status: 404 });

  const importResult = await importTransactions(id);
  const categoriseResult = await runCategorisation(userId, 100);

  return NextResponse.json({ import: importResult, categorise: categoriseResult });
}
