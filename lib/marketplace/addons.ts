import { MatterAddonKind } from "@prisma/client";

export interface AddonPricing {
  cents: number;
  label: string;
  description: string;
}

// One catalog entry per add-on kind. Labels and descriptions are shared
// across jurisdictions; only the price varies (NZD for NZ, AUD for AU).
// Non-NZ/AU jurisdictions fall back to NZ pricing — we only serve NZ+AU
// on soft launch.
interface AddonCatalogEntry {
  label: string;
  description: string;
  pricesByJurisdiction: Record<string, number>;
}

const ADDON_CATALOG: Record<MatterAddonKind, AddonCatalogEntry> = {
  EXPEDITED_SIGNOFF: {
    label: "Expedited sign-off",
    description: "Your pro commits to a 24-hour sign-off window.",
    pricesByJurisdiction: { NZ: 2900, AU: 4900 },
  },
  SECOND_OPINION: {
    label: "Second opinion",
    description: "An independent verified pro reviews the output before release.",
    pricesByJurisdiction: { NZ: 9900, AU: 14900 },
  },
  ESIGNATURE_BUNDLE: {
    label: "E-signature bundle",
    description: "Witnessed e-signatures on released documents with evidentiary trail.",
    pricesByJurisdiction: { NZ: 4900, AU: 7900 },
  },
};

const ADDON_KINDS = Object.keys(ADDON_CATALOG) as MatterAddonKind[];

export function priceForAddon(
  jurisdiction: string,
  kind: MatterAddonKind,
): AddonPricing {
  const entry = ADDON_CATALOG[kind];
  const cents = entry.pricesByJurisdiction[jurisdiction] ?? entry.pricesByJurisdiction.NZ;
  return { cents, label: entry.label, description: entry.description };
}

export function addonsForJurisdiction(
  jurisdiction: string,
): Record<MatterAddonKind, AddonPricing> {
  return Object.fromEntries(
    ADDON_KINDS.map((kind) => [kind, priceForAddon(jurisdiction, kind)]),
  ) as Record<MatterAddonKind, AddonPricing>;
}

export function addonEntriesForJurisdiction(
  jurisdiction: string,
): Array<[MatterAddonKind, AddonPricing]> {
  return ADDON_KINDS.map((kind) => [kind, priceForAddon(jurisdiction, kind)]);
}

// Narrow a client-supplied value to a MatterAddonKind. Unknown values drop
// silently — callers always pair with Set-dedupe so the bill can't be
// inflated by repeating the same kind.
export function isMatterAddonKind(value: unknown): value is MatterAddonKind {
  return typeof value === "string" && (ADDON_KINDS as string[]).includes(value);
}

export function parseAddonKinds(input: unknown): MatterAddonKind[] {
  if (!Array.isArray(input)) return [];
  return Array.from(new Set(input.filter(isMatterAddonKind)));
}
