import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "@/lib/session";
import { generateProgramTemplate } from "@/lib/aml/program-template";
import type { AmlJurisdiction } from "@prisma/client";

const ALLOWED: AmlJurisdiction[] = [
  "NZ_DIA",
  "AU_AUSTRAC",
  "UK_HMRC",
  "US_FINCEN",
];

export async function GET(req: NextRequest) {
  const userId = await getUserId();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const url = new URL(req.url);
  const j = url.searchParams.get("jurisdiction") as AmlJurisdiction | null;
  if (!j || !ALLOWED.includes(j)) {
    return NextResponse.json(
      { error: "jurisdiction query param required (NZ_DIA | AU_AUSTRAC | UK_HMRC | US_FINCEN)" },
      { status: 400 },
    );
  }
  const template = generateProgramTemplate(j);
  return NextResponse.json({ template });
}
