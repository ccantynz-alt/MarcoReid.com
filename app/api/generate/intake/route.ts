import { NextResponse } from "next/server";
import { createHash } from "node:crypto";
import { prisma } from "@/lib/prisma";
import { writeAuditLog } from "@/lib/audit";
import { rateLimit, rateLimitResponse, LIMITS } from "@/lib/rate-limit";
import {
  findTemplate,
  wrapWithWatermark,
  type Jurisdiction as TemplateJurisdiction,
} from "@/lib/templates";

export const runtime = "nodejs";

const MIN_SITUATION_LENGTH = 30;
const MAX_SITUATION_LENGTH = 4000;
const VALID_JURISDICTIONS = ["NZ", "AU", "UK", "US"] as const;

type Jurisdiction = (typeof VALID_JURISDICTIONS)[number];

// Heuristic document-type detection. The AI extraction layer (Wave 2) will
// replace this with a Claude call; for now we keyword-match so the public
// front-door is functional immediately. Returns the most likely document
// slug + whether the situation is unambiguous enough to draft.
function classifyDocType(situation: string): {
  slug: string;
  label: string;
  confidence: "HIGH" | "MEDIUM" | "LOW";
} {
  const lower = situation.toLowerCase();

  const matchers: Array<{
    slug: string;
    label: string;
    needles: string[];
  }> = [
    {
      slug: "tenancy-notice",
      label: "Tenancy notice / dispute",
      needles: ["tenant", "rent", "tenancy", "landlord", "eviction", "bond"],
    },
    {
      slug: "employment-agreement",
      label: "Employment agreement",
      needles: ["employee", "employer", "employment", "salary", "wages"],
    },
    {
      slug: "shareholders-agreement",
      label: "Shareholders agreement",
      needles: ["shareholder", "share", "vesting", "co-founder", "equity"],
    },
    {
      slug: "nda",
      label: "Non-disclosure agreement",
      needles: ["nda", "confidentiality", "non-disclosure", "confidential"],
    },
    {
      slug: "will",
      label: "Will + testamentary trust",
      needles: ["will", "testamentary", "executor", "estate", "beneficiary"],
    },
    {
      slug: "lease",
      label: "Lease agreement",
      needles: ["lease", "leasing", "commercial property", "premises"],
    },
    {
      slug: "voluntary-tax-disclosure",
      label: "Voluntary tax disclosure",
      needles: ["tax", "ird", "ato", "irs", "hmrc", "voluntary disclosure", "back tax"],
    },
    {
      slug: "directors-resolution",
      label: "Director's resolution",
      needles: ["director", "resolution", "board"],
    },
    {
      slug: "power-of-attorney",
      label: "Power of attorney",
      needles: ["power of attorney", "poa", "enduring"],
    },
    {
      slug: "statutory-demand",
      label: "Statutory demand",
      needles: ["statutory demand", "creditor", "debt"],
    },
    {
      slug: "sale-of-goods",
      label: "Sale of goods contract",
      needles: ["sale of goods", "goods", "supplier contract"],
    },
  ];

  let best: { slug: string; label: string; hits: number } = {
    slug: "general-contract",
    label: "General contract",
    hits: 0,
  };
  for (const m of matchers) {
    const hits = m.needles.reduce(
      (n, needle) => (lower.includes(needle) ? n + 1 : n),
      0,
    );
    if (hits > best.hits) {
      best = { slug: m.slug, label: m.label, hits };
    }
  }

  const confidence: "HIGH" | "MEDIUM" | "LOW" =
    best.hits >= 3 ? "HIGH" : best.hits >= 1 ? "MEDIUM" : "LOW";

  return { slug: best.slug, label: best.label, confidence };
}

// Stub draft body — Wave 2 swaps this for an actual template render driven
// by LegalDocumentTemplate + the extracted variables. The point right now is
// to ship the end-to-end flow so the public can see the watermarked-draft +
// pay-for-signoff loop work.
function renderStubDraft(opts: {
  jurisdiction: Jurisdiction;
  docTypeLabel: string;
  situation: string;
}): string {
  const { jurisdiction, docTypeLabel, situation } = opts;
  return [
    `# ${docTypeLabel}`,
    "",
    `**Jurisdiction:** ${jurisdiction}`,
    `**Document type:** ${docTypeLabel}`,
    "",
    "---",
    "",
    "## Background",
    "",
    situation,
    "",
    "---",
    "",
    "## Draft body",
    "",
    "_This is a placeholder draft. The full template rendering layer is",
    "being built — see Wave 2 in SESSION-STATE.md._",
    "",
    "When the template engine ships, this section will contain a fully",
    `drafted ${docTypeLabel.toLowerCase()} against ${jurisdiction} law,`,
    "with the parties, key terms, and statutory references the situation",
    "above implies. Until a verified professional reviews and signs this",
    "draft, every page is watermarked and the document carries no legal",
    "weight.",
    "",
    "---",
    "",
    "## Watermark",
    "",
    "**DRAFT — Not legal/tax advice. Pending professional review.**",
    "",
    "Marco Reid is a tooling vendor. This document is not legally binding",
    "until reviewed and signed by a licensed professional in",
    `${jurisdiction}. Once signed, the professional's name, credential,`,
    "and date will be stamped on every page.",
  ].join("\n");
}

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    const limit = await rateLimit({
      key: `generate-intake:${ip}`,
      ...LIMITS.authRegister,
    });
    if (!limit.ok) return rateLimitResponse(limit);

    const body = await request.json();
    const situationRaw = String(body.situation || "");
    const jurisdictionRaw = String(body.jurisdiction || "NZ");
    const contactEmailRaw = String(body.contactEmail || "")
      .toLowerCase()
      .trim();

    const situation = situationRaw.trim();
    if (
      situation.length < MIN_SITUATION_LENGTH ||
      situation.length > MAX_SITUATION_LENGTH
    ) {
      return NextResponse.json(
        {
          error: `Tell us about your situation in 30–${MAX_SITUATION_LENGTH} characters.`,
        },
        { status: 400 },
      );
    }

    if (
      !VALID_JURISDICTIONS.includes(jurisdictionRaw as Jurisdiction)
    ) {
      return NextResponse.json(
        { error: "Pick a supported jurisdiction (NZ, AU, UK, US)." },
        { status: 400 },
      );
    }
    const jurisdiction = jurisdictionRaw as Jurisdiction;

    const contactEmail =
      contactEmailRaw && contactEmailRaw.includes("@")
        ? contactEmailRaw
        : null;

    const docType = classifyDocType(situation);

    // Try the real template engine first. If a template is registered for
    // the (slug, jurisdiction) pair, render it with empty values (the
    // engine substitutes [Label] placeholders for missing required fields,
    // which becomes the natural prompt list for the citizen + reviewer).
    // If no template is registered, fall back to the stub body so the
    // pipeline still produces output the watermark + sign-off can attach to.
    const template = findTemplate(
      docType.slug,
      jurisdiction as TemplateJurisdiction,
    );

    let draftBody: string;
    if (template) {
      const rendered = template.render({});
      draftBody = wrapWithWatermark({
        body: rendered,
        jurisdiction: jurisdiction as TemplateJurisdiction,
        templateLabel: template.label,
      });
    } else {
      draftBody = renderStubDraft({
        jurisdiction,
        docTypeLabel: docType.label,
        situation,
      });
    }
    const bodyHash = createHash("sha256").update(draftBody).digest("hex");
    const userAgent =
      request.headers.get("user-agent")?.slice(0, 512) ?? null;

    const draft = await prisma.documentDraft.create({
      data: {
        contactEmail,
        jurisdiction,
        situation,
        extracted: {
          docTypeSlug: docType.slug,
          docTypeLabel: docType.label,
          confidence: docType.confidence,
          extractedBy: "heuristic-v1",
          templateRendered: Boolean(template),
          templateLabel: template?.label ?? null,
        },
        body: draftBody,
        bodyHash,
        status: "READY_FOR_REVIEW",
        ipAddress: ip === "unknown" ? null : ip,
        userAgent,
        // Drafts auto-expire in 30 days unless the owner claims them.
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
    });

    await writeAuditLog({
      actorEmail: contactEmail,
      action: "CREATE",
      resourceType: "DocumentDraft",
      resourceId: draft.id,
      after: {
        jurisdiction,
        docTypeSlug: docType.slug,
        confidence: docType.confidence,
      },
      ipAddress: ip === "unknown" ? null : ip,
      userAgent,
    });

    return NextResponse.json({
      draftId: draft.id,
      jurisdiction,
      docType: docType.label,
      confidence: docType.confidence,
    });
  } catch {
    return NextResponse.json(
      { error: "Could not start your draft. Please try again." },
      { status: 500 },
    );
  }
}
