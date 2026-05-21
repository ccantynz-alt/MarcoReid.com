export type OracleDomain = "LEGAL" | "ACCOUNTING" | "CROSS_DOMAIN" | "IP";

export type VerificationStatus = "VERIFIED" | "UNVERIFIED" | "NOT_FOUND";

export interface OracleRequest {
  query: string;
  domain?: OracleDomain;
  jurisdiction?: string;
  matterId?: string;
  surface?: string; // "document", "email", "cmd-k", "billing", "message"
  context?: string; // Previous queries or matter context for memory
}

export interface OracleCitationResult {
  title: string;
  citation: string;
  sourceUrl: string | null;
  sourceDb: string;
  status: VerificationStatus;
  excerpt: string;
  jurisdiction: string | null;
  dateDecided: string | null;
}

export interface OracleResponse {
  answer: string;
  citations: OracleCitationResult[];
  domain: OracleDomain;
  responseTimeMs: number;
  disclaimer: string;
}

// Data source configurations for each legal/accounting database
export interface DataSourceConfig {
  name: string;
  domain: OracleDomain;
  baseUrl: string;
  searchEndpoint: string;
  verifyEndpoint?: string;
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
];
