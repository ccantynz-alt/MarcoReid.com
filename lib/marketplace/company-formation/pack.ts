import type { FormationIntakeInput, StructurePlan, PlanEntity } from "./types";

// Renders the structure plan as a markdown formation pack. This is the
// document that a reviewing lawyer signs off on and the citizen emails
// to any local attorney handling a foreign entity. It deliberately
// includes all rationale, tax flow, and registration steps inline so
// nothing has to be reconstructed downstream.
export function renderFormationPack(
  input: FormationIntakeInput,
  plan: StructurePlan,
  rationale: string,
): string {
  const lines: string[] = [];
  const name = input.proposedName || "NewCo";

  // ---------- Cover ----------
  lines.push(`# Formation Pack — ${name}`);
  lines.push("");
  lines.push(`_Prepared by Marco Reid for ${input.homeJurisdiction}-based founders. Requires professional sign-off before any entity is formed._`);
  lines.push("");
  lines.push(`**Home jurisdiction:** ${input.homeJurisdiction}`);
  lines.push(`**Asset-protection tier:** ${plan.assetProtectionTier}`);
  lines.push(`**Sign-off required in:** ${plan.signoffJurisdictions.join(", ")}`);
  lines.push("");

  // ---------- Executive summary ----------
  lines.push("## Executive summary");
  lines.push("");
  lines.push(rationale);
  lines.push("");

  // ---------- Founders ----------
  lines.push("## Founders");
  lines.push("");
  lines.push("| Name | Email | Equity % | Role |");
  lines.push("|---|---|---|---|");
  for (const f of input.founders) {
    lines.push(`| ${f.name} | ${f.email} | ${f.equityPct}% | ${f.role || "—"} |`);
  }
  lines.push("");

  // ---------- Business profile ----------
  lines.push("## Business profile");
  lines.push("");
  lines.push(`**Purpose.** ${input.purpose}`);
  if (input.industry) lines.push(`**Industry.** ${input.industry}`);
  lines.push(`**Product type.** ${input.productType}`);
  lines.push(`**Operating countries.** ${input.operatingCountries.join(", ") || input.homeJurisdiction}`);
  lines.push(`**Sales markets.** ${input.salesMarkets.join(", ") || input.homeJurisdiction}`);
  lines.push(`**IP value.** ${input.ipValue}`);
  lines.push(`**Investor appetite.** ${input.investorAppetite}`);
  lines.push(`**Employees planned.** ${input.willHaveEmployees ? "Yes" : "No"}`);
  lines.push(`**Takes outside investment.** ${input.willTakeInvestment ? "Yes" : "No"}`);
  if (input.expectedAnnualRevenueCents != null) {
    lines.push(`**Expected annual revenue.** ${formatMoney(input.expectedAnnualRevenueCents, input.homeJurisdiction)}`);
  }
  lines.push("");

  // ---------- Structure ----------
  lines.push("## Recommended structure");
  lines.push("");
  for (const e of plan.entities) {
    lines.push(`### ${e.name} — ${e.type} (${e.jurisdiction})`);
    lines.push("");
    lines.push(`**Role.** ${roleLabel(e.role)}`);
    lines.push("");
    lines.push(`**Purpose.** ${e.purpose}`);
    lines.push("");
    lines.push(`**Rationale.** ${e.rationale}`);
    lines.push("");
  }

  // ---------- Ownership graph ----------
  if (plan.ownership.length > 0) {
    lines.push("## Ownership");
    lines.push("");
    lines.push("| Owner | Owns | Equity | Notes |");
    lines.push("|---|---|---|---|");
    for (const edge of plan.ownership) {
      const owner = entityLabel(plan.entities, edge.ownerId);
      const owned = entityLabel(plan.entities, edge.ownedId);
      const pct = edge.equityPct > 0 ? `${edge.equityPct}%` : "—";
      lines.push(`| ${owner} | ${owned} | ${pct} | ${edge.notes || ""} |`);
    }
    lines.push("");
  }

  // ---------- IP licensing ----------
  if (plan.ipLicensing.length > 0) {
    lines.push("## IP licensing");
    lines.push("");
    lines.push("| Licensor | Licensee | IP | Royalty basis |");
    lines.push("|---|---|---|---|");
    for (const l of plan.ipLicensing) {
      lines.push(
        `| ${entityLabel(plan.entities, l.licensorId)} | ${entityLabel(plan.entities, l.licenseeId)} | ${l.ipDescription} | ${l.royaltyBasis} |`,
      );
    }
    lines.push("");
  }

  // ---------- Trading flow ----------
  if (plan.tradingFlow.length > 0) {
    lines.push("## Trading flow");
    lines.push("");
    for (const t of plan.tradingFlow) {
      lines.push(`- **${entityLabel(plan.entities, t.sellerId)}** sells into **${t.marketDescription}**.`);
      lines.push(`  - ${t.paymentRailNotes}`);
    }
    lines.push("");
  }

  // ---------- Tax flow ----------
  lines.push("## Tax flow summary");
  lines.push("");
  lines.push(`**Primary residency jurisdiction.** ${plan.tax.primaryResidencyJurisdiction}`);
  lines.push("");
  if (plan.tax.treatyConsiderations.length > 0) {
    lines.push("**Treaty considerations.**");
    for (const t of plan.tax.treatyConsiderations) lines.push(`- ${t}`);
    lines.push("");
  }
  if (plan.tax.transferPricingNotes.length > 0) {
    lines.push("**Transfer pricing.**");
    for (const t of plan.tax.transferPricingNotes) lines.push(`- ${t}`);
    lines.push("");
  }
  if (plan.tax.gstVatNotes.length > 0) {
    lines.push("**GST / VAT / sales tax.**");
    for (const t of plan.tax.gstVatNotes) lines.push(`- ${t}`);
    lines.push("");
  }

  // ---------- Setup sequence ----------
  lines.push("## Setup sequence");
  lines.push("");
  lines.push("| # | Jurisdiction | Action | Responsible | Deliverable |");
  lines.push("|---|---|---|---|---|");
  for (const s of plan.setupOrder) {
    lines.push(`| ${s.order} | ${s.jurisdiction} | ${s.action} | ${s.responsible} | ${s.deliverable} |`);
  }
  lines.push("");

  // ---------- Registration checklists per jurisdiction ----------
  lines.push("## Registration checklists");
  lines.push("");
  const jurisdictions = new Set(plan.entities.map((e) => e.jurisdiction));
  for (const j of jurisdictions) {
    lines.push(`### ${j}`);
    lines.push("");
    for (const item of checklistFor(j)) {
      lines.push(`- [ ] ${item}`);
    }
    lines.push("");
  }

  // ---------- Initial resolutions (home opco) ----------
  lines.push("## Initial director resolutions — home operating company");
  lines.push("");
  lines.push("1. Appointment of directors as named in the incorporation application.");
  lines.push("2. Adoption of the constitution attached to this pack.");
  lines.push("3. Opening of a bank account with the company's primary banking partner.");
  lines.push("4. Appointment of the company's registered office at the address specified in this pack.");
  lines.push("5. Authorisation of any intercompany agreements referenced in the IP licensing and trading-flow sections.");
  lines.push("6. Authorisation of GST / BAS registration (if applicable) and any tax agent engagement.");
  lines.push("");

  // ---------- Caveats + disclaimers ----------
  lines.push("## Caveats and disclaimers");
  lines.push("");
  for (const c of plan.tax.caveats) lines.push(`- ${c}`);
  lines.push("- This pack is draft output prepared by Marco Reid. It is not legal or tax advice until a qualified professional has reviewed, amended, and signed it off.");
  lines.push("- The sha256 fingerprint on the signed copy is a tamper-evidence hash; if the document is altered after release, the hash mismatch will expose the change.");
  lines.push("");

  return lines.join("\n");
}

function entityLabel(entities: PlanEntity[], id: string): string {
  if (id.startsWith("founder-")) return id.replace("founder-", "Founder: ");
  const e = entities.find((x) => x.id === id);
  return e ? e.name : id;
}

function roleLabel(role: string): string {
  switch (role) {
    case "HOLDING": return "Holding entity";
    case "OPERATING": return "Operating entity";
    case "IP_HOLDING": return "IP-holding entity";
    case "TRUSTEE": return "Corporate trustee";
    case "TRUST": return "Trust";
    case "SUBSIDIARY": return "Subsidiary";
    default: return role;
  }
}

function formatMoney(cents: number, jurisdiction: string): string {
  const cur = jurisdiction === "NZ" ? "NZD" : jurisdiction === "AU" ? "AUD" : "USD";
  return `${cur} $${(cents / 100).toLocaleString()}`;
}

function checklistFor(jurisdiction: string): string[] {
  switch (jurisdiction) {
    case "NZ":
      return [
        "Reserve company name with the Companies Office (NZ).",
        "File incorporation application (INC1) with the Companies Office.",
        "Obtain an NZBN.",
        "Register with IRD for income tax; register for GST if turnover > NZD 60k.",
        "Open a domestic bank account (ASB, ANZ, BNZ, Westpac, Kiwibank).",
        "Register as an employer with IRD if hiring staff (PAYE + KiwiSaver).",
        "File an Annual Return with the Companies Office each year.",
      ];
    case "AU":
      return [
        "Apply for an Australian Company Number (ACN) via ASIC Form 201.",
        "Apply for an Australian Business Number (ABN) via the ABR.",
        "Register for GST if turnover > AUD 75k.",
        "Register for PAYG withholding if hiring staff.",
        "Open a domestic bank account (CBA, NAB, ANZ, Westpac).",
        "Register for superannuation guarantee obligations if hiring staff.",
        "Lodge an annual company statement with ASIC.",
      ];
    case "US-WY":
      return [
        "File Articles of Organization with the Wyoming Secretary of State.",
        "Appoint a Wyoming registered agent.",
        "Adopt an LLC operating agreement.",
        "Obtain an EIN from the IRS (Form SS-4 — foreign-owned single-member LLC must file by fax).",
        "Open a US business bank account (Mercury, Relay, or similar).",
        "Register for state sales tax in any state that crosses economic-nexus thresholds.",
        "File Form 5472 + pro-forma 1120 annually for foreign-owned single-member LLC.",
      ];
    case "US-DE":
      return [
        "File Certificate of Incorporation with the Delaware Secretary of State.",
        "Appoint a Delaware registered agent.",
        "Adopt bylaws and hold an organisational board meeting.",
        "Issue founder shares; file 83(b) elections within 30 days of issue.",
        "Obtain an EIN from the IRS (Form SS-4).",
        "Register for Delaware franchise tax (due annually by 1 March).",
        "Open a US business bank account (Mercury, Brex, or similar).",
        "Register for state sales tax in any state that crosses economic-nexus thresholds.",
      ];
    default:
      return [`Consult a licensed attorney admitted in ${jurisdiction} to execute all local filings.`];
  }
}

// SHA-256 tamper-evidence hash of the pack. Callers write the hash
// alongside the pack so any downstream tampering can be detected.
export async function hashPack(pack: string): Promise<string> {
  const { createHash } = await import("node:crypto");
  return createHash("sha256").update(pack, "utf8").digest("hex");
}
