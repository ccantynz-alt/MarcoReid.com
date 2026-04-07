import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, role, court, jurisdiction, email, phone, products, useCase } = body ?? {};

    if (!name || !role || !court || !jurisdiction || !email || !useCase) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await prisma.courtPilotRequest.create({
      data: {
        name,
        role,
        court,
        jurisdiction,
        email,
        phone: phone ?? null,
        products: Array.isArray(products) ? products : [],
        useCase,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[courts/pilot] error", err);
    return NextResponse.json({ error: "Submission failed" }, { status: 500 });
  }
}
