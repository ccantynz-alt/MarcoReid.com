import Anthropic from "@anthropic-ai/sdk";
import { prisma } from "@/lib/prisma";
import { verifyCitation } from "./verify";
import {
  OracleRequest,
  OracleResponse,
  OracleCitationResult,
  OracleDomain,
} from "./types";
import { AI_DISCLAIMER } from "@/lib/constants";

/**
 * The Oracle Engine — the brain of AlecRae.
 *
 * This is the core AI research system. It:
 * 1. Detects the query domain (legal, accounting, cross-domain, IP)
 * 2. Retrieves context from memory (previous queries, matter context)
 * 3. Sends the query to Claude with domain-specific system prompts
 * 4. Extracts citations from the response
 * 5. Verifies every citation against authoritative public sources
 * 6. Logs the query, response, and citations for the flywheel
 * 7. Returns verified results to the user
 */

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

/**
 * Detect the query domain based on keywords and context.
 */
function detectDomain(query: string, requestDomain?: OracleDomain): OracleDomain {
  if (requestDomain) return requestDomain;

  const q = query.toLowerCase();

  const legalSignals = [
    "case", "court", "statute", "plaintiff", "defendant", "motion",
    "filing", "jurisdiction", "precedent", "ruling", "appeal",
    "tort", "contract", "liability", "damages", "injunction",
    "habeas", "certiorari", "voir dire", "deposition",
  ];

  const accountingSignals = [
    "tax", "irs", "deduction", "depreciation", "gaap", "ifrs",
    "revenue", "expense", "audit", "cpa", "filing", "1099",
    "w-2", "section 199", "amortization", "capital gains",
    "withholding", "payroll", "gst", "vat",
  ];

  const ipSignals = [
    "patent", "trademark", "copyright", "trade secret", "ip",
    "intellectual property", "infringement", "prior art", "claims",
    "registration", "licensing", "royalty", "trade dress", "dmca",
    "fair use", "likelihood of confusion",
  ];

  const legalScore = legalSignals.filter((s) => q.includes(s)).length;
  const accountingScore = accountingSignals.filter((s) => q.includes(s)).length;
  const ipScore = ipSignals.filter((s) => q.includes(s)).length;

  // Cross-domain if both legal and accounting signals present
  if (legalScore > 0 && accountingScore > 0) return "CROSS_DOMAIN";
  if (ipScore > legalScore && ipScore > accountingScore) return "IP";
  if (accountingScore > legalScore) return "ACCOUNTING";
  return "LEGAL";
}

/**
 * Build the system prompt based on the domain.
 */
function buildSystemPrompt(domain: OracleDomain, jurisdiction?: string): string {
  const base = `You are The Oracle, the AI research engine built into AlecRae — the professional intelligence platform for law and accounting. You provide research assistance to licensed professionals.

CRITICAL RULES:
1. ONLY cite real cases, statutes, regulations, and rulings that actually exist.
2. For every citation, provide: the full case name or statute title, the formal citation, the court or source, and the date.
3. NEVER fabricate a citation. If you are not certain a case exists, say so explicitly.
4. Always specify the jurisdiction.
5. Provide practical analysis, not just citations.
6. You assist professionals — you do not provide legal or tax advice.`;

  const jurisdictionNote = jurisdiction
    ? `\nFocus on ${jurisdiction} law and regulations unless the query specifies otherwise.`
    : "";

  const domainPrompts: Record<OracleDomain, string> = {
    LEGAL: `${base}
${jurisdictionNote}
You specialise in legal research: case law, statutes, regulations, court rules, and legal analysis. You have knowledge of US federal and state law, NZ law, Australian law, and UK law. For every case you cite, provide the full citation including volume, reporter, and page number.`,

    ACCOUNTING: `${base}
${jurisdictionNote}
You specialise in accounting and tax research: IRS code sections, revenue rulings, Treasury regulations, GAAP standards, IFRS standards, state tax codes, and tax court decisions. For every tax provision, cite the specific IRC section, regulation, or ruling.`,

    CROSS_DOMAIN: `${base}
${jurisdictionNote}
You specialise in questions that span BOTH legal and accounting/tax domains simultaneously. This is your unique capability — no other research tool can answer questions that require both legal analysis and tax/accounting intelligence. Provide analysis from both perspectives and cite both legal and tax authorities.`,

    IP: `${base}
${jurisdictionNote}
You specialise in intellectual property law: patents, trademarks, copyright, trade secrets, and licensing. You can search USPTO records, analyse patent claims, assess trademark likelihood of confusion, and research IP case law. For patents, cite the patent number and key claims. For trademarks, cite the registration number and class.`,
  };

  return domainPrompts[domain];
}

/**
 * Extract citations from the AI response text.
 * Looks for case names, statute references, and regulatory citations.
 */
function extractCitations(text: string): OracleCitationResult[] {
  const citations: OracleCitationResult[] = [];

  // Match case citations: "Name v. Name (Year)" or "Name v. Name, Vol Reporter Page"
  const casePattern =
    /([A-Z][a-zA-Z\s.]+v\.\s+[A-Z][a-zA-Z\s.]+?)(?:,\s*(\d+\s+[A-Za-z.]+\s+\d+)|\s*\((\d{4})\))/g;
  let match;

  while ((match = casePattern.exec(text)) !== null) {
    citations.push({
      title: match[1].trim(),
      citation: match[0].trim(),
      sourceUrl: null,
      sourceDb: "Pending verification",
      status: "UNVERIFIED",
      excerpt: "",
      jurisdiction: null,
      dateDecided: match[3] || null,
    });
  }

  // Match IRC sections: "IRC § 199A" or "26 U.S.C. § 199A"
  const ircPattern = /(?:IRC|I\.R\.C\.|26\s+U\.S\.C\.)\s*§\s*(\d+[A-Z]?(?:\([a-z0-9]+\))*)/gi;
  while ((match = ircPattern.exec(text)) !== null) {
    citations.push({
      title: `Internal Revenue Code Section ${match[1]}`,
      citation: match[0].trim(),
      sourceUrl: null,
      sourceDb: "Pending verification",
      status: "UNVERIFIED",
      excerpt: "",
      jurisdiction: "US Federal",
      dateDecided: null,
    });
  }

  // Match Treasury Regulations
  const treasPattern = /Treas\.?\s*Reg\.?\s*§?\s*([\d.]+(?:\([a-z0-9]+\))*)/gi;
  while ((match = treasPattern.exec(text)) !== null) {
    citations.push({
      title: `Treasury Regulation ${match[1]}`,
      citation: match[0].trim(),
      sourceUrl: null,
      sourceDb: "Pending verification",
      status: "UNVERIFIED",
      excerpt: "",
      jurisdiction: "US Federal",
      dateDecided: null,
    });
  }

  // Match patent numbers
  const patentPattern = /(?:US\s*Patent\s*(?:No\.?)?\s*|US)(\d[\d,]+)/gi;
  while ((match = patentPattern.exec(text)) !== null) {
    citations.push({
      title: `US Patent ${match[1]}`,
      citation: match[0].trim(),
      sourceUrl: null,
      sourceDb: "Pending verification",
      status: "UNVERIFIED",
      excerpt: "",
      jurisdiction: "US Federal",
      dateDecided: null,
    });
  }

  // Deduplicate by citation string
  const seen = new Set<string>();
  return citations.filter((c) => {
    if (seen.has(c.citation)) return false;
    seen.add(c.citation);
    return true;
  });
}

/**
 * Retrieve memory context for a user — previous queries on the same
 * topic or matter, to give The Oracle continuity.
 */
async function getMemoryContext(
  userId: string,
  query: string,
  matterId?: string
): Promise<string> {
  const recentQueries = await prisma.oracleQuery.findMany({
    where: {
      userId,
      ...(matterId ? { matterId } : {}),
    },
    orderBy: { createdAt: "desc" },
    take: 5,
    select: {
      query: true,
      response: true,
      domain: true,
      createdAt: true,
    },
  });

  if (recentQueries.length === 0) return "";

  const context = recentQueries
    .map(
      (q) =>
        `[Previous query - ${q.domain} - ${q.createdAt.toISOString().split("T")[0]}]: "${q.query}" → Summary: ${q.response.substring(0, 200)}...`
    )
    .join("\n");

  return `\n\nCONTEXT FROM PREVIOUS RESEARCH (this user's recent queries):\n${context}`;
}

/**
 * Log the query and update the flywheel.
 */
async function logQuery(
  userId: string,
  request: OracleRequest,
  response: OracleResponse,
  verifiedCitations: OracleCitationResult[]
): Promise<string> {
  // Save the query
  const savedQuery = await prisma.oracleQuery.create({
    data: {
      userId,
      query: request.query,
      domain: response.domain,
      jurisdiction: request.jurisdiction,
      context: request.context,
      response: response.answer,
      matterId: request.matterId,
      surface: request.surface,
      responseTimeMs: response.responseTimeMs,
      citations: {
        create: verifiedCitations.map((c) => ({
          title: c.title,
          citation: c.citation,
          sourceUrl: c.sourceUrl,
          sourceDb: c.sourceDb,
          status: c.status,
          excerpt: c.excerpt || "",
          jurisdiction: c.jurisdiction,
          dateDecided: c.dateDecided,
        })),
      },
    },
  });

  // Update query patterns for the flywheel
  const normalised = request.query.toLowerCase().trim().substring(0, 200);
  await prisma.queryPattern.upsert({
    where: {
      pattern_domain: {
        pattern: normalised,
        domain: response.domain,
      },
    },
    update: {
      count: { increment: 1 },
      lastQueried: new Date(),
    },
    create: {
      pattern: normalised,
      domain: response.domain,
      count: 1,
    },
  });

  return savedQuery.id;
}

/**
 * THE MAIN ORACLE FUNCTION.
 *
 * This is the brain. It takes a query, thinks about it, researches it,
 * verifies every citation, logs everything for learning, and returns
 * a verified response.
 */
export async function queryOracle(
  userId: string,
  request: OracleRequest
): Promise<OracleResponse> {
  const startTime = Date.now();

  // 1. Detect domain
  const domain = detectDomain(request.query, request.domain);

  // 2. Get memory context
  const memoryContext = await getMemoryContext(
    userId,
    request.query,
    request.matterId
  );

  // 3. Build the prompt
  const systemPrompt = buildSystemPrompt(domain, request.jurisdiction);
  const userMessage = `${request.query}${memoryContext}${
    request.context ? `\n\nAdditional context: ${request.context}` : ""
  }`;

  // 4. Query Claude
  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 4096,
    system: systemPrompt,
    messages: [{ role: "user", content: userMessage }],
  });

  const answer =
    message.content[0].type === "text" ? message.content[0].text : "";

  // 5. Extract citations from the response
  const rawCitations = extractCitations(answer);

  // 6. Verify EVERY citation against authoritative sources
  const verifiedCitations = await Promise.all(
    rawCitations.map((c) => verifyCitation(c))
  );

  const responseTimeMs = Date.now() - startTime;

  // 7. Build the response
  const response: OracleResponse = {
    answer,
    citations: verifiedCitations,
    domain,
    responseTimeMs,
    disclaimer: AI_DISCLAIMER,
  };

  // 8. Log everything for the flywheel
  await logQuery(userId, request, response, verifiedCitations);

  return response;
}
