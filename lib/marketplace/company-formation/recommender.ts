import type {
  FormationIntakeInput,
  StructurePlan,
  PlanEntity,
  OwnershipEdge,
  IpLicenseEdge,
  TradingEdge,
  SetupStep,
} from "./types";

// Deterministic structure recommender. Given the citizen's intake, it
// returns a multi-entity cross-border plan tuned to the asset-protection
// tier they asked for. The rules are readable rather than clever: a pro
// reviews every output before it goes out, and the rationale is part of
// the sign-off record.
export function recommendStructure(input: FormationIntakeInput): {
  plan: StructurePlan;
  rationale: string;
} {
  const entities: PlanEntity[] = [];
  const ownership: OwnershipEdge[] = [];
  const ipLicensing: IpLicenseEdge[] = [];
  const tradingFlow: TradingEdge[] = [];
  const setupOrder: SetupStep[] = [];
  const signoffJurisdictions = new Set<string>([input.homeJurisdiction]);

  const homeIsNZ = input.homeJurisdiction === "NZ";
  const homeCoType = homeIsNZ ? "Limited Company (Ltd)" : "Proprietary Limited (Pty Ltd)";
  const homeRegulator = homeIsNZ ? "Companies Office (NZ)" : "ASIC (AU)";
  const homeCurrency = homeIsNZ ? "NZD" : "AUD";
  const trustType = homeIsNZ ? "Discretionary Family Trust (NZ)" : "Discretionary Trust (AU)";

  const sellsToUS = input.salesMarkets.includes("US");
  const highIp = input.ipValue === "HIGH";
  const wantsVc = input.investorAppetite === "VC" || input.investorAppetite === "PE";
  const aggressive = input.assetProtectionLevel !== "STANDARD";

  const name = input.proposedName || "NewCo";

  // Entity 1 — home-jurisdiction operating company. Always present.
  entities.push({
    id: "home-opco",
    role: "OPERATING",
    jurisdiction: input.homeJurisdiction,
    type: homeCoType,
    name: `${name} ${homeIsNZ ? "Limited" : "Pty Ltd"}`,
    purpose: "Primary operating entity for home-market trading, payroll, and local contracts.",
    rationale: `Limited liability, clean local tax residency, and the only vehicle recognised by ${homeRegulator} for local employment and GST/BAS registration.`,
  });

  // Entity 2 — holding trust for aggressive/maximum tiers. The trust
  // owns the opco shares so a personal judgment against a founder cannot
  // directly reach the business.
  if (aggressive) {
    entities.push({
      id: "home-trust",
      role: "TRUST",
      jurisdiction: input.homeJurisdiction,
      type: trustType,
      name: `${name} Family Trust`,
      purpose: "Owns the operating company's shares; distributes income to beneficiaries.",
      rationale:
        "Separates founder's personal balance sheet from the business. A creditor pursuing the founder personally reaches the founder's beneficial interest in the trust, not the company itself.",
    });
    entities.push({
      id: "home-trustee",
      role: "TRUSTEE",
      jurisdiction: input.homeJurisdiction,
      type: homeCoType,
      name: `${name} Trustee ${homeIsNZ ? "Limited" : "Pty Ltd"}`,
      purpose: "Corporate trustee of the family trust.",
      rationale:
        "A corporate trustee keeps personal founders off the companies-office register as trustees, adding a second layer of separation and simplifying succession.",
    });
    ownership.push({ ownerId: "home-trust", ownedId: "home-opco", equityPct: 100 });
    ownership.push({
      ownerId: "home-trustee",
      ownedId: "home-trust",
      equityPct: 0,
      notes: "Corporate trustee holds legal title; beneficiaries hold beneficial interest.",
    });
  } else {
    // Standard tier: founders own the opco directly.
    for (const f of input.founders) {
      ownership.push({
        ownerId: `founder-${f.email}`,
        ownedId: "home-opco",
        equityPct: f.equityPct,
      });
    }
  }

  // Entity 3 — US operating entity. Triggered by US sales. Wyoming LLC
  // for bootstrap/angel (strong charging-order protection, no state
  // income tax, anonymous ownership). Delaware C-Corp for VC/PE
  // (investor-standard, 83(b)-friendly, QSBS-eligible).
  if (sellsToUS) {
    const usIsCorp = wantsVc;
    const usEntity: PlanEntity = usIsCorp
      ? {
          id: "us-opco",
          role: "OPERATING",
          jurisdiction: "US-DE",
          type: "Delaware C-Corporation",
          name: `${name}, Inc.`,
          purpose: "US-facing operating entity; investor-ready vehicle for US venture capital.",
          rationale:
            "Delaware C-Corp is the universal standard for US VC rounds — preferred-share classes, 83(b) elections, and QSBS eligibility. C-corp double taxation is tolerable because investors are the primary shareholders.",
        }
      : {
          id: "us-opco",
          role: "OPERATING",
          jurisdiction: "US-WY",
          type: "Wyoming LLC",
          name: `${name} LLC`,
          purpose: "US-facing operating entity; takes US customer payments and US contracts.",
          rationale:
            "Wyoming LLCs offer the strongest charging-order protection in the US, no state income tax, no franchise tax on gross receipts, and permit anonymous ownership via registered agent — the best-in-class bootstrap protection wrapper for a foreign owner.",
        };
    entities.push(usEntity);
    ownership.push({
      ownerId: aggressive ? "home-opco" : "home-opco",
      ownedId: "us-opco",
      equityPct: 100,
    });
    tradingFlow.push({
      sellerId: "us-opco",
      marketDescription: "United States customers",
      paymentRailNotes:
        "US bank account (Mercury, Relay, or similar), Stripe US, EIN-based 1099s. Avoids routing US dollars through a foreign-of-record entity, which triggers W-8 withholding friction.",
    });
    signoffJurisdictions.add("US");
  }

  // Entity 4 — IP-holding entity for HIGH IP value. The IP entity
  // licenses to every operating entity for a royalty, keeping the
  // crown jewels in one clean, judgment-proofable vehicle.
  if (highIp) {
    entities.push({
      id: "ip-holdco",
      role: "IP_HOLDING",
      jurisdiction: input.homeJurisdiction,
      type: homeCoType,
      name: `${name} IP ${homeIsNZ ? "Limited" : "Pty Ltd"}`,
      purpose: "Holds trademarks, copyrights, source code, and patents; licenses them to operating entities for a royalty.",
      rationale:
        "Isolating IP in a separate entity means an operating-entity lawsuit cannot reach the IP. A royalty agreement between IP co and operating co also routes profit to the home jurisdiction in a transfer-pricing-defensible way.",
    });
    ownership.push({
      ownerId: aggressive ? "home-trust" : "home-opco",
      ownedId: "ip-holdco",
      equityPct: 100,
    });
    ipLicensing.push({
      licensorId: "ip-holdco",
      licenseeId: "home-opco",
      ipDescription: "All trademarks, copyrights, software, and know-how",
      royaltyBasis: "Arm's-length royalty — OECD-compliant, benchmarked against comparable uncontrolled transactions.",
    });
    if (sellsToUS) {
      ipLicensing.push({
        licensorId: "ip-holdco",
        licenseeId: "us-opco",
        ipDescription: "All trademarks, copyrights, software, and know-how",
        royaltyBasis: "Arm's-length royalty via ${homeCo} → US-WY LLC or US-DE C-Corp. Requires a US-resident W-8BEN-E filing.",
      });
    }
  }

  // ----- Setup order: home first, then US -----
  let order = 1;
  if (aggressive) {
    setupOrder.push({
      order: order++,
      jurisdiction: input.homeJurisdiction,
      action: `Incorporate ${name} Trustee ${homeIsNZ ? "Limited" : "Pty Ltd"} with ${homeRegulator}.`,
      responsible: "MARCO",
      deliverable: "Incorporation application, constitution, director consents, shareholder resolution.",
    });
    setupOrder.push({
      order: order++,
      jurisdiction: input.homeJurisdiction,
      action: `Settle ${name} Family Trust with the trustee company as trustee.`,
      responsible: "HOME_LAWYER",
      deliverable: "Trust deed, settlor declaration, first trustee resolution, IRD/ATO registration.",
    });
  }
  setupOrder.push({
    order: order++,
    jurisdiction: input.homeJurisdiction,
    action: `Incorporate ${name} ${homeIsNZ ? "Limited" : "Pty Ltd"} with ${homeRegulator}; ${aggressive ? "issue all shares to the trust" : "issue shares to founders per the equity split"}.`,
    responsible: "MARCO",
    deliverable: "Incorporation application, constitution, shareholders' agreement, initial director resolutions.",
  });
  if (highIp) {
    setupOrder.push({
      order: order++,
      jurisdiction: input.homeJurisdiction,
      action: `Incorporate ${name} IP ${homeIsNZ ? "Limited" : "Pty Ltd"}; assign existing IP in.`,
      responsible: "HOME_LAWYER",
      deliverable: "IP co incorporation, deed of assignment (IP → IP co), license agreement (IP co → opco).",
    });
  }
  if (sellsToUS) {
    const usLabel = wantsVc ? "Delaware C-Corporation" : "Wyoming LLC";
    setupOrder.push({
      order: order++,
      jurisdiction: "US",
      action: `Form ${name}${wantsVc ? ", Inc." : " LLC"} — ${usLabel}.`,
      responsible: "LOCAL_ATTORNEY",
      deliverable: `${usLabel} certificate of formation/incorporation, operating agreement/bylaws, EIN (SS-4), registered agent appointment.`,
    });
    setupOrder.push({
      order: order++,
      jurisdiction: "US",
      action: `Open US bank account (Mercury or Relay) and Stripe US for ${name}${wantsVc ? ", Inc." : " LLC"}.`,
      responsible: "CITIZEN",
      deliverable: "Opened bank account, active Stripe US, payment processor integration.",
    });
  }
  setupOrder.push({
    order: order++,
    jurisdiction: input.homeJurisdiction,
    action: "Executive tax-flow review with a chartered accountant / registered tax agent.",
    responsible: "ACCOUNTANT",
    deliverable:
      "Transfer-pricing memo, CFC/FIF analysis, GST/BAS registration confirmations, royalty-rate benchmarking.",
  });

  // ----- Tax summary -----
  const treaty: string[] = [];
  if (sellsToUS) {
    treaty.push(
      homeIsNZ
        ? "NZ–US Double Tax Agreement (2008) governs withholding on royalties (5% under treaty for most cases) and permanent establishment risk."
        : "Australia–US Double Tax Agreement (1982, 2001 protocol) governs withholding on royalties (5% under treaty) and permanent establishment risk.",
    );
  }
  treaty.push(
    homeIsNZ
      ? "Check NZ CFC rules (attributed foreign income) for any US entity you control and the active-business exemption."
      : "Check AU CFC rules (active/passive income attribution) for any US entity you control.",
  );

  const transferPricing: string[] = [];
  if (highIp) {
    transferPricing.push(
      "Intercompany royalty must be set at an arm's-length rate, benchmarked using CUP, TNMM, or profit-split and documented contemporaneously.",
    );
  }
  if (sellsToUS) {
    transferPricing.push(
      "Any services charged between US opco and home opco (e.g. management fees, cost-plus engineering) must be documented with an intercompany services agreement.",
    );
  }

  const gstVat: string[] = [];
  if (homeIsNZ) {
    gstVat.push("Register for GST when turnover exceeds NZD 60k in any 12-month period.");
  } else {
    gstVat.push("Register for GST when turnover exceeds AUD 75k in any 12-month period.");
  }
  if (sellsToUS) {
    gstVat.push(
      "US has no federal VAT. State-level sales tax (economic nexus) applies when a state threshold is crossed (generally USD 100k in sales or 200 transactions).",
    );
  }

  const caveats: string[] = [
    "Every structure recommendation requires independent confirmation by a chartered accountant / registered tax agent before any entity is formed.",
    "Asset-protection tiers are design goals, not guarantees; a determined creditor with a court order can reach most assets — proper structure raises cost and difficulty.",
  ];

  // ----- Rationale (one paragraph; surfaced to citizen + sign-off) -----
  const rationaleParts: string[] = [];
  rationaleParts.push(
    `Home operating company (${homeCoType}) anchored in ${input.homeJurisdiction} for clean local tax residency and employment.`,
  );
  if (aggressive) {
    rationaleParts.push(
      `Home trust + corporate trustee layer so a personal judgment against a founder cannot reach the business.`,
    );
  }
  if (sellsToUS) {
    rationaleParts.push(
      wantsVc
        ? `Delaware C-Corporation as the US operating entity because investor-readiness trumps double taxation at VC stage.`
        : `Wyoming LLC as the US operating entity for best-in-class charging-order protection, no state income tax, and anonymous ownership.`,
    );
  }
  if (highIp) {
    rationaleParts.push(
      `Separate IP-holding company licensing the IP to every operating entity — crown jewels isolated from operating liability.`,
    );
  }
  const rationale = rationaleParts.join(" ");

  return {
    plan: {
      entities,
      ownership,
      ipLicensing,
      tradingFlow,
      tax: {
        primaryResidencyJurisdiction: input.homeJurisdiction,
        treatyConsiderations: treaty,
        transferPricingNotes: transferPricing,
        gstVatNotes: gstVat,
        caveats,
      },
      setupOrder,
      signoffJurisdictions: Array.from(signoffJurisdictions),
      assetProtectionTier: input.assetProtectionLevel,
    },
    rationale,
  };
}
