import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";

interface ConflictResult {
  type: "client" | "matter";
  name: string;
  matchedOn: string;
  matterId?: string;
  clientId?: string;
}

export async function POST(req: NextRequest) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const { clientName, opposingParties, relatedEntities } = body ?? {};

    if (!clientName || typeof clientName !== "string" || !clientName.trim()) {
      return NextResponse.json({ error: "clientName is required" }, { status: 400 });
    }

    const searchName = clientName.trim().toLowerCase();

    // Build list of all names to search for
    const opposingNames: string[] = Array.isArray(opposingParties)
      ? opposingParties.map((n: string) => n.trim().toLowerCase()).filter(Boolean)
      : [];
    const entityNames: string[] = Array.isArray(relatedEntities)
      ? relatedEntities.map((n: string) => n.trim().toLowerCase()).filter(Boolean)
      : [];

    const allSearchNames = [searchName, ...opposingNames, ...entityNames];

    // Fetch all clients and matters for this user in parallel
    const [clients, matters] = await Promise.all([
      prisma.client.findMany({
        where: { userId },
        select: { id: true, name: true, companyName: true },
      }),
      prisma.matter.findMany({
        where: { userId },
        select: { id: true, title: true, clientId: true, client: { select: { name: true } } },
      }),
    ]);

    const conflicts: ConflictResult[] = [];

    // 1. Check if client name matches any existing client name
    for (const client of clients) {
      const clientNameLower = client.name.toLowerCase();
      if (clientNameLower.includes(searchName) || searchName.includes(clientNameLower)) {
        conflicts.push({
          type: "client",
          name: client.name,
          matchedOn: `Client name matches "${clientName}"`,
          clientId: client.id,
        });
      }
    }

    // 2. Check if opposing party names match any existing client names
    for (const opposing of opposingNames) {
      for (const client of clients) {
        const clientNameLower = client.name.toLowerCase();
        if (clientNameLower.includes(opposing) || opposing.includes(clientNameLower)) {
          conflicts.push({
            type: "client",
            name: client.name,
            matchedOn: `Existing client matches opposing party "${opposing}"`,
            clientId: client.id,
          });
        }
      }
    }

    // 3. Check if related entity names match any existing client company names
    for (const entity of entityNames) {
      for (const client of clients) {
        if (!client.companyName) continue;
        const companyLower = client.companyName.toLowerCase();
        if (companyLower.includes(entity) || entity.includes(companyLower)) {
          conflicts.push({
            type: "client",
            name: client.companyName,
            matchedOn: `Client company matches related entity "${entity}"`,
            clientId: client.id,
          });
        }
      }
    }

    // 4. Check if matter titles contain any of the party names
    for (const name of allSearchNames) {
      for (const matter of matters) {
        const titleLower = matter.title.toLowerCase();
        if (titleLower.includes(name)) {
          conflicts.push({
            type: "matter",
            name: matter.title,
            matchedOn: `Matter title contains "${name}"`,
            matterId: matter.id,
            clientId: matter.clientId,
          });
        }
      }
    }

    // Deduplicate by type+id combination
    const seen = new Set<string>();
    const uniqueConflicts = conflicts.filter((c) => {
      const key = `${c.type}-${c.clientId || ""}-${c.matterId || ""}-${c.matchedOn}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    return NextResponse.json({
      conflicts: uniqueConflicts,
      clear: uniqueConflicts.length === 0,
    });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
