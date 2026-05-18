import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { recordEvent } from "@/lib/flywheel";
import type { MigrationSourceSystem } from "@prisma/client";

const ALLOWED_SOURCES: MigrationSourceSystem[] = [
  "CLIO",
  "LEAP",
  "ACTIONSTEP",
  "XERO",
  "MYOB",
  "QUICKBOOKS",
  "IRESS",
  "AFFINITY",
  "OTHER",
];

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const email = String(body.email || "").trim();
    const fromSystem = String(body.fromSystem || "") as MigrationSourceSystem;

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }
    if (!ALLOWED_SOURCES.includes(fromSystem)) {
      return NextResponse.json(
        { error: "Source system is required." },
        { status: 400 }
      );
    }

    const intake = await prisma.migrationIntake.create({
      data: {
        email,
        fromSystem,
        contactName: body.contactName || null,
        firmName: body.firmName || null,
        jurisdiction: body.jurisdiction || null,
        estimatedClients: body.estimatedClients || null,
        estimatedMatters: body.estimatedMatters || null,
        needsTrustData: Boolean(body.needsTrustData),
        needsTimeData: Boolean(body.needsTimeData),
        needsDocuments: Boolean(body.needsDocuments),
        notes: body.notes || null,
      },
    });

    await recordEvent({
      kind: "USAGE",
      surface: "migration-intake",
      jurisdiction: body.jurisdiction || undefined,
      payload: {
        fromSystem,
        firmName: body.firmName || null,
        intakeId: intake.id,
      },
    });

    return NextResponse.json({ ok: true, id: intake.id });
  } catch (err) {
    console.error("Migration intake error:", err);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
