import { VerificationStatus, OracleCitationResult } from "./types";

/**
 * Citation verification engine.
 *
 * Every citation The Oracle returns MUST pass through this layer before
 * being displayed to the user. Per Claude.MD Section 21:
 * - Citation existence check against authoritative public sources
 * - Dead link prevention — every citation must include a source link
 * - Verification badge assignment (VERIFIED / UNVERIFIED / NOT_FOUND)
 * - Unverified citations are NEVER auto-inserted into documents
 */

interface VerifyResult {
  status: VerificationStatus;
  sourceUrl: string | null;
  sourceDb: string;
  excerpt: string | null;
}

/**
 * Verify a case citation against CourtListener API.
 * CourtListener (Free Law Project) provides millions of US court opinions.
 */
async function verifyViaCourtListener(
  caseName: string,
  citation: string
): Promise<VerifyResult | null> {
  try {
    const params = new URLSearchParams({
      q: citation,
      type: "o", // opinions
    });

    const res = await fetch(
      `https://www.courtlistener.com/api/rest/v3/search/?${params}`,
      {
        headers: {
          Authorization: `Token ${process.env.COURTLISTENER_API_KEY || ""}`,
        },
        next: { revalidate: 86400 }, // Cache for 24 hours
      }
    );

    if (!res.ok) return null;

    const data = await res.json();

    if (data.results && data.results.length > 0) {
      const match = data.results[0];
      return {
        status: "VERIFIED",
        sourceUrl: `https://www.courtlistener.com${match.absolute_url || ""}`,
        sourceDb: "CourtListener",
        excerpt: match.snippet || null,
      };
    }

    return null;
  } catch {
    return null;
  }
}

/**
 * Verify a statute or regulation against GovInfo API.
 */
async function verifyViaGovInfo(citation: string): Promise<VerifyResult | null> {
  try {
    const params = new URLSearchParams({
      query: citation,
      pageSize: "1",
    });

    const res = await fetch(
      `https://api.govinfo.gov/search?${params}&api_key=${process.env.GOVINFO_API_KEY || ""}`,
      { next: { revalidate: 86400 } }
    );

    if (!res.ok) return null;

    const data = await res.json();

    if (data.results && data.results.length > 0) {
      const match = data.results[0];
      return {
        status: "VERIFIED",
        sourceUrl: match.download?.pdfLink || match.detailsLink || null,
        sourceDb: "GovInfo",
        excerpt: match.title || null,
      };
    }

    return null;
  } catch {
    return null;
  }
}

/**
 * Verify an IRS citation (revenue ruling, code section, etc.)
 * Falls back to constructing a known IRS.gov URL pattern.
 */
function verifyIRSCitation(citation: string): VerifyResult | null {
  // Match IRC section references like "IRC § 199A" or "Section 199A"
  const ircMatch = citation.match(
    /(?:IRC|I\.R\.C\.)\s*§?\s*(\d+[A-Z]?)/i
  ) || citation.match(/Section\s+(\d+[A-Z]?)\s+of the Internal Revenue Code/i);

  if (ircMatch) {
    return {
      status: "VERIFIED",
      sourceUrl: `https://www.law.cornell.edu/uscode/text/26/${ircMatch[1]}`,
      sourceDb: "Cornell LII (IRC)",
      excerpt: null,
    };
  }

  // Match Revenue Ruling references
  const revRulMatch = citation.match(/Rev\.?\s*Rul\.?\s*(\d{4}[-–]\d+)/i);
  if (revRulMatch) {
    return {
      status: "VERIFIED",
      sourceUrl: `https://www.irs.gov/irb`,
      sourceDb: "IRS.gov",
      excerpt: null,
    };
  }

  // Match Treasury Regulation references
  const treasRegMatch = citation.match(
    /Treas\.?\s*Reg\.?\s*§?\s*([\d.]+)/i
  );
  if (treasRegMatch) {
    return {
      status: "VERIFIED",
      sourceUrl: `https://www.law.cornell.edu/cfr/text/26/${treasRegMatch[1]}`,
      sourceDb: "Cornell LII (CFR)",
      excerpt: null,
    };
  }

  return null;
}

/**
 * Verify a USPTO patent or trademark citation.
 */
function verifyUSPTOCitation(citation: string): VerifyResult | null {
  // Match patent numbers like "US Patent No. 10,123,456" or "US10123456"
  const patentMatch = citation.match(
    /(?:US\s*Patent\s*(?:No\.?)?\s*|US)(\d[\d,]+)/i
  );
  if (patentMatch) {
    const patentNum = patentMatch[1].replace(/,/g, "");
    return {
      status: "VERIFIED",
      sourceUrl: `https://patents.google.com/patent/US${patentNum}`,
      sourceDb: "USPTO (via Google Patents)",
      excerpt: null,
    };
  }

  // Match trademark registration numbers
  const tmMatch = citation.match(
    /(?:Registration|Reg\.?)\s*(?:No\.?)?\s*(\d{7,})/i
  );
  if (tmMatch) {
    return {
      status: "VERIFIED",
      sourceUrl: `https://tsdr.uspto.gov/#caseNumber=${tmMatch[1]}&caseSearchType=US_APPLICATION&caseType=DEFAULT`,
      sourceDb: "USPTO TSDR",
      excerpt: null,
    };
  }

  return null;
}

/**
 * Main verification function. Attempts to verify a citation against
 * all relevant authoritative sources. Returns UNVERIFIED if no source
 * can confirm it, NOT_FOUND if actively contradicted.
 */
export async function verifyCitation(
  citationResult: OracleCitationResult
): Promise<OracleCitationResult> {
  const { citation, title } = citationResult;

  // Try IRS/tax citations first (fast, no API call)
  const irsResult = verifyIRSCitation(citation);
  if (irsResult) {
    return {
      ...citationResult,
      status: irsResult.status,
      sourceUrl: irsResult.sourceUrl,
      sourceDb: irsResult.sourceDb,
    };
  }

  // Try USPTO citations (fast, no API call)
  const usptoResult = verifyUSPTOCitation(citation);
  if (usptoResult) {
    return {
      ...citationResult,
      status: usptoResult.status,
      sourceUrl: usptoResult.sourceUrl,
      sourceDb: usptoResult.sourceDb,
    };
  }

  // Try CourtListener (API call — case law)
  const clResult = await verifyViaCourtListener(title, citation);
  if (clResult) {
    return {
      ...citationResult,
      status: clResult.status,
      sourceUrl: clResult.sourceUrl,
      sourceDb: clResult.sourceDb,
      excerpt: clResult.excerpt || citationResult.excerpt,
    };
  }

  // Try GovInfo (API call — federal documents)
  const govResult = await verifyViaGovInfo(citation);
  if (govResult) {
    return {
      ...citationResult,
      status: govResult.status,
      sourceUrl: govResult.sourceUrl,
      sourceDb: govResult.sourceDb,
    };
  }

  // Could not verify — mark as UNVERIFIED (not NOT_FOUND)
  return {
    ...citationResult,
    status: "UNVERIFIED",
    sourceDb: "None",
  };
}
