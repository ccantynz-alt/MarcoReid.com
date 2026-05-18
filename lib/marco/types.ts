export type MarcoDomain = "LEGAL" | "ACCOUNTING" | "CROSS_DOMAIN" | "IP";

export type VerificationStatus = "VERIFIED" | "UNVERIFIED" | "NOT_FOUND";

export interface MarcoRequest {
  query: string;
  domain?: MarcoDomain;
  jurisdiction?: string;
  matterId?: string;
  surface?: string; // "document", "email", "cmd-k", "billing", "message"
  context?: string; // Previous queries or matter context for memory
}

export interface MarcoCitationResult {
  title: string;
  citation: string;
  sourceUrl: string | null;
  sourceDb: string;
  status: VerificationStatus;
  excerpt: string;
  jurisdiction: string | null;
  dateDecided: string | null;
}

export interface MarcoResponse {
  answer: string;
  citations: MarcoCitationResult[];
  domain: MarcoDomain;
  responseTimeMs: number;
  disclaimer: string;
}

// Data source configurations for each legal/accounting database
export interface DataSourceConfig {
  name: string;
  domain: MarcoDomain;
  baseUrl: string;
  searchEndpoint: string;
  verifyEndpoint?: string;
  description?: string;
}

export const DATA_SOURCES: DataSourceConfig[] = [
  // Legal sources
  {
    name: "CourtListener",
    domain: "LEGAL",
    baseUrl: "https://www.courtlistener.com/api/rest/v3",
    searchEndpoint: "/search/",
  },
  {
    name: "Congress.gov",
    domain: "LEGAL",
    baseUrl: "https://api.congress.gov/v3",
    searchEndpoint: "/bill",
  },
  {
    name: "Cornell LII",
    domain: "LEGAL",
    baseUrl: "https://www.law.cornell.edu",
    searchEndpoint: "/uscode/text",
  },
  // Accounting/Tax sources
  {
    name: "IRS.gov",
    domain: "ACCOUNTING",
    baseUrl: "https://www.irs.gov",
    searchEndpoint: "/search",
  },
  {
    name: "GovInfo",
    domain: "ACCOUNTING",
    baseUrl: "https://api.govinfo.gov",
    searchEndpoint: "/search",
  },
  // IP sources
  {
    name: "USPTO",
    domain: "IP",
    baseUrl: "https://developer.uspto.gov/api",
    searchEndpoint: "/search/patent",
  },
  {
    name: "USPTO TESS",
    domain: "IP",
    baseUrl: "https://tmsearch.uspto.gov",
    searchEndpoint: "/search",
  },
  // NZ/AU sources (Phase 1 launch markets)
  {
    name: "NZLII",
    domain: "LEGAL",
    baseUrl: "https://www.nzlii.org",
    searchEndpoint: "/cgi-bin/sinosrch.cgi",
  },
  {
    name: "AustLII",
    domain: "LEGAL",
    baseUrl: "https://www.austlii.edu.au",
    searchEndpoint: "/cgi-bin/sinosrch.cgi",
  },
  // UK/Canada sources
  {
    name: "BAILII",
    domain: "LEGAL",
    baseUrl: "https://www.bailii.org/cgi-bin/markup.cgi",
    searchEndpoint: "/form/search_cases.html",
    description: "British and Irish Legal Information Institute — UK and Irish court decisions, legislation, and law reform reports",
  },
  {
    name: "CanLII",
    domain: "LEGAL",
    baseUrl: "https://www.canlii.org/en",
    searchEndpoint: "/search",
    description: "Canadian Legal Information Institute — Canadian court decisions, legislation, and tribunal rulings across all provinces and territories",
  },
];
