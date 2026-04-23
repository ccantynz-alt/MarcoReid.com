import { NextRequest, NextResponse } from "next/server";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { getUserId } from "@/lib/session";

export const runtime = "nodejs";

// Serves dev-mode uploaded files from ./.dev-uploads/<id>/<name>. Prod
// uploads are served by Crontech R2 once provisioned; this route will
// return 501 in that case.

const DEV_UPLOAD_DIR = path.join(process.cwd(), ".dev-uploads");

function isSafeSegment(segment: string): boolean {
  return /^[\w.\-]+$/.test(segment);
}

export async function GET(
  _req: NextRequest,
  ctx: { params: Promise<{ id: string; name: string }> }
) {
  const userId = await getUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      {
        error: "File storage pending Crontech R2 tenant provisioning",
        code: "STORAGE_NOT_CONFIGURED",
      },
      { status: 501 }
    );
  }

  const { id, name } = await ctx.params;
  if (!isSafeSegment(id) || !isSafeSegment(name)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const filePath = path.join(DEV_UPLOAD_DIR, id, name);
  // Defence-in-depth: resolved path must stay under DEV_UPLOAD_DIR.
  const resolved = path.resolve(filePath);
  if (!resolved.startsWith(path.resolve(DEV_UPLOAD_DIR) + path.sep)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  try {
    const st = await stat(resolved);
    if (!st.isFile()) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    const data = await readFile(resolved);
    const body = new Uint8Array(data);
    return new NextResponse(body, {
      status: 200,
      headers: {
        "Content-Length": String(st.size),
        "Cache-Control": "private, max-age=60",
      },
    });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
