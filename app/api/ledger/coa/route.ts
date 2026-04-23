/**
 * GET  /api/ledger/coa — list this firm's chart of accounts.
 * POST /api/ledger/coa — create a new account.
 *
 * Firm scoping: until multi-user firms ship, `firmId === userId`. The
 * schema accepts any string, so this swap is invisible if/when we
 * promote `Firm` to a real model.
 */

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";
import { AccountType, AccountSubType } from "@prisma/client";

export async function GET() {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const accounts = await prisma.chartOfAccounts.findMany({
    where: { firmId: userId },
    orderBy: { code: "asc" },
  });
  return NextResponse.json({ accounts });
}

export async function POST(req: NextRequest) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const { code, name, type, subType, parentId, description } = body ?? {};
    if (!code || !name || !type || !subType) {
      return NextResponse.json({ error: "code, name, type, subType required" }, { status: 400 });
    }
    if (!Object.values(AccountType).includes(type)) {
      return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    }
    if (!Object.values(AccountSubType).includes(subType)) {
      return NextResponse.json({ error: "Invalid subType" }, { status: 400 });
    }

    const account = await prisma.chartOfAccounts.create({
      data: {
        firmId: userId,
        code,
        name,
        type,
        subType,
        parentId: parentId || null,
        description: description || null,
      },
    });
    return NextResponse.json({ account }, { status: 201 });
  } catch (err) {
    if (err && typeof err === "object" && "code" in err && (err as { code?: string }).code === "P2002") {
      return NextResponse.json({ error: "Account code already exists" }, { status: 409 });
    }
    console.error(err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
