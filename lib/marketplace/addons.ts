import { MatterAddonKind } from "@prisma/client";

export interface AddonPricing {
  cents: number;
  label: string;
  description: string;
}

// Per-jurisdiction prices. NZD for NZ; AUD for AU. Currency is derived
// from the matter's jurisdiction/practice-area, never the client.
const NZ_PRICES: Record<MatterAddonKind, AddonPricing> = {
  EXPEDITED_SIGNOFF: {
    cents: 2900,
    label: "Expedited sign-off",
    description: "Your pro commits to a 24-hour sign-off window.",
  },
  SECOND_OPINION: {
    cents: 9900,
    label: "Second opinion",
    description: "An independent verified pro reviews the output before release.",
  },
  ESIGNATURE_BUNDLE: {
    cents: 4900,
    label: "E-signature bundle",
    description: "Witnessed e-signatures on released documents with evidentiary trail.",
  },
};

const AU_PRICES: Record<MatterAddonKind, AddonPricing> = {
  EXPEDITED_SIGNOFF: {
    cents: 4900,
    label: "Expedited sign-off",
    description: "Your pro commits to a 24-hour sign-off window.",
  },
  SECOND_OPINION: {
    cents: 14900,
    label: "Second opinion",
    description: "An independent verified pro reviews the output before release.",
  },
  ESIGNATURE_BUNDLE: {
    cents: 7900,
    label: "E-signature bundle",
    description: "Witnessed e-signatures on released documents with evidentiary trail.",
  },
};

export function addonsForJurisdiction(jurisdiction: string): Record<MatterAddonKind, AddonPricing> {
  return jurisdiction === "AU" ? AU_PRICES : NZ_PRICES;
}

export function priceForAddon(
  jurisdiction: string,
  kind: MatterAddonKind,
): AddonPricing {
  return addonsForJurisdiction(jurisdiction)[kind];
}

// Type-guard that narrows a client-supplied string to a MatterAddonKind.
// Anything outside the enum is silently dropped at the caller.
export function isMatterAddonKind(value: unknown): value is MatterAddonKind {
  return (
    value === "EXPEDITED_SIGNOFF" ||
    value === "SECOND_OPINION" ||
    value === "ESIGNATURE_BUNDLE"
  );
}
