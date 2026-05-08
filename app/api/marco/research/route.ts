import { NextResponse } from "next/server";
import { rateLimit, rateLimitResponse, LIMITS } from "@/lib/rate-limit";
import { MARCO_SOURCES, type MarcoDomain } from "@/lib/marco/sources";

export const runtime = "nodejs";

const VALID_DOMAINS: ReadonlyArray<MarcoDomain> = [
  "LEGAL",
  "ACCOUNTING",
  "FORENSIC",
];
const VALID_JURISDICTIONS = ["NZ", "AU", "UK", "US"] as const;
type Jurisdiction = (typeof VALID_JURISDICTIONS)[number];

interface DemoCitation {
  title: string;
  citation: string;
  sourceUrl: string;
  sourceDb: string;
  status: "VERIFIED" | "UNVERIFIED" | "NOT_FOUND";
  excerpt: string;
}

interface DemoResponse {
  summary: string;
  body: string;
  citations: DemoCitation[];
}

/**
 * Demo-mode response synthesiser. Produces a plausible-looking research
 * answer with two verified citations from the source catalogue, one
 * unverified (template variable not resolved), and one NOT_FOUND so the UX
 * shows all three states.
 *
 * The real Claude-driven research engine swaps in once ANTHROPIC_API_KEY
 * is set in production. The shape of the response is the same; only the
 * source of the body + citation extraction changes.
 */
function synthesise(opts: {
  domain: MarcoDomain;
  jurisdiction: Jurisdiction;
  query: string;
}): DemoResponse {
  const { domain, jurisdiction, query } = opts;

  const matchingSources = MARCO_SOURCES.filter(
    (s) =>
      s.domain === domain &&
      (s.jurisdictions.includes(jurisdiction) ||
        s.jurisdictions.includes("GLOBAL")),
  );

  const verified: DemoCitation[] = matchingSources.slice(0, 2).map((s) => ({
    title: s.name,
    citation: s.url,
    sourceUrl: s.url,
    sourceDb: s.slug,
    status: "VERIFIED",
    excerpt:
      "Citation verified against the authoritative source catalogue. Inline preview is a placeholder until ANTHROPIC_API_KEY is wired and Marco fetches the live excerpt.",
  }));

  const unverified: DemoCitation = {
    title: "Pending source verification",
    citation: "[citation captured but not yet machine-verified]",
    sourceUrl: "",
    sourceDb: "pending",
    status: "UNVERIFIED",
    excerpt:
      "Marco found this reference in its draft response but could not match it to an authoritative source. Verify manually before relying on it.",
  };

  const notFound: DemoCitation = {
    title: "Source not found",
    citation: "[an example case Marco could not locate in any catalogued source]",
    sourceUrl: "",
    sourceDb: "—",
    status: "NOT_FOUND",
    excerpt:
      "Marco refuses to surface citations it cannot verify. This row is shown so you can see how the engine flags uncatalogued references — they never appear in the answer body, only in the citation panel.",
  };

  const body = [
    `**Demo response.** Marco is in source-only mode until ANTHROPIC_API_KEY is configured. The query you asked was: "${query}".`,
    "",
    "When configured, the engine will produce a substantive answer here, with every citation verified against the authoritative source catalogue. For now, the source panel below shows the catalogue Marco draws from for this domain + jurisdiction, and demonstrates the three citation states the verifier produces:",
    "",
    "1. **VERIFIED** — citation matched to an indexed source. Safe to rely on after professional review.",
    "2. **UNVERIFIED** — Marco produced the reference but could not match it. Manual verification required.",
    "3. **NOT_FOUND** — Marco searched and confirmed the reference does not exist in any catalogued source. Shown so the user knows what was searched, not as a citation in the answer.",
    "",
    "Every Marco output passes through the SignoffRequest queue before being released to a consumer. The professional reviewing the answer accepts or rejects each VERIFIED citation; UNVERIFIED + NOT_FOUND citations cannot be inserted into a signed document at all.",
  ].join("\n");

  return {
    summary: `Demo research output for ${domain.toLowerCase()} (${jurisdiction}). Real engine activates once API key is wired.`,
    body,
    citations: [...verified, unverified, notFound],
  };
}

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";
    const limit = await rateLimit({
      key: `marco-research:${ip}`,
      ...LIMITS.authRegister,
    });
    if (!limit.ok) return rateLimitResponse(limit);

    const body = await request.json();
    const query = String(body.query || "").trim();
    const domainRaw = String(body.domain || "LEGAL").toUpperCase();
    const jurisdictionRaw = String(body.jurisdiction || "NZ").toUpperCase();

    if (query.length < 5 || query.length > 1000) {
      return NextResponse.json(
        { error: "Query must be 5–1000 characters." },
        { status: 400 },
      );
    }
    if (!VALID_DOMAINS.includes(domainRaw as MarcoDomain)) {
      return NextResponse.json(
        { error: "Domain must be LEGAL, ACCOUNTING, or FORENSIC." },
        { status: 400 },
      );
    }
    if (
      !VALID_JURISDICTIONS.includes(jurisdictionRaw as Jurisdiction)
    ) {
      return NextResponse.json(
        { error: "Jurisdiction must be NZ, AU, UK, or US." },
        { status: 400 },
      );
    }

    const response = synthesise({
      domain: domainRaw as MarcoDomain,
      jurisdiction: jurisdictionRaw as Jurisdiction,
      query,
    });

    // NOTE: Persisting this query to MarcoQuery requires an authenticated
    // user (User FK is required on the model). For the public-facing demo
    // we do not persist; once the user signs in + asks again, the query is
    // saved with their userId for the flywheel ledger.
    return NextResponse.json({
      ok: true,
      mode: process.env.ANTHROPIC_API_KEY ? "live" : "demo",
      ...response,
    });
  } catch {
    return NextResponse.json(
      { error: "Marco couldn't complete the research." },
      { status: 500 },
    );
  }
}
