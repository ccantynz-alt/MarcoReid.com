// Shape of the questionnaire answers the wizard collects.
export interface FormationIntakeInput {
  homeJurisdiction: "NZ" | "AU";
  proposedName?: string;
  alternateName?: string;
  purpose: string;
  industry?: string;
  founders: FounderInput[];
  operatingCountries: string[];
  salesMarkets: string[];
  productType: "SOFTWARE" | "PHYSICAL_GOODS" | "SERVICES" | "DIGITAL_CONTENT" | "MIXED";
  ipValue: "HIGH" | "MEDIUM" | "LOW";
  investorAppetite: "BOOTSTRAP" | "ANGEL" | "VC" | "PE";
  assetProtectionLevel: "STANDARD" | "AGGRESSIVE" | "MAXIMUM";
  expectedAnnualRevenueCents?: number;
  willHaveEmployees: boolean;
  willTakeInvestment: boolean;
  isNonProfit: boolean;
  registeredOffice?: string;
}

export interface FounderInput {
  name: string;
  email: string;
  equityPct: number;
  role?: string;
  address?: string;
}

// The recommender's output. Captures a multi-entity structure, the
// ownership graph, IP licensing flows, the tax-flow summary, and the
// ordered setup sequence.
export interface StructurePlan {
  entities: PlanEntity[];
  ownership: OwnershipEdge[];
  ipLicensing: IpLicenseEdge[];
  tradingFlow: TradingEdge[];
  tax: TaxSummary;
  setupOrder: SetupStep[];
  signoffJurisdictions: string[];
  assetProtectionTier: "STANDARD" | "AGGRESSIVE" | "MAXIMUM";
}

export interface PlanEntity {
  id: string;
  role: "HOLDING" | "OPERATING" | "IP_HOLDING" | "TRUSTEE" | "TRUST" | "SUBSIDIARY";
  jurisdiction: string;
  type: string;
  name: string;
  purpose: string;
  rationale: string;
}

export interface OwnershipEdge {
  ownerId: string;
  ownedId: string;
  equityPct: number;
  notes?: string;
}

export interface IpLicenseEdge {
  licensorId: string;
  licenseeId: string;
  ipDescription: string;
  royaltyBasis: string;
}

export interface TradingEdge {
  sellerId: string;
  marketDescription: string;
  paymentRailNotes: string;
}

export interface TaxSummary {
  primaryResidencyJurisdiction: string;
  treatyConsiderations: string[];
  transferPricingNotes: string[];
  gstVatNotes: string[];
  caveats: string[];
}

export interface SetupStep {
  order: number;
  jurisdiction: string;
  action: string;
  responsible: "MARCO" | "HOME_LAWYER" | "LOCAL_ATTORNEY" | "ACCOUNTANT" | "CITIZEN";
  deliverable: string;
}
