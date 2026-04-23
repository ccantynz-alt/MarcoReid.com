/**
 * lib/bankfeeds/index.ts — Bank feed adapter registry.
 *
 * Single entry point for "given this provider enum, hand me the adapter
 * that knows how to talk to it." Keeps the rest of the codebase free of
 * provider-specific imports.
 */

import { BankFeedProvider } from "@prisma/client";
import { BankFeedAdapter } from "./types";
import { akahuAdapter } from "./akahu";
import { basiqAdapter } from "./basiq";
import { plaidAdapter } from "./plaid";
import { truelayerAdapter } from "./truelayer";

export function getAdapter(provider: BankFeedProvider): BankFeedAdapter {
  switch (provider) {
    case "AKAHU":
      return akahuAdapter;
    case "BASIQ":
      return basiqAdapter;
    case "PLAID":
      return plaidAdapter;
    case "TRUELAYER":
      return truelayerAdapter;
  }
}

export const ALL_PROVIDERS: BankFeedProvider[] = ["AKAHU", "BASIQ", "PLAID", "TRUELAYER"];

export const PROVIDER_LABEL: Record<BankFeedProvider, string> = {
  AKAHU: "Akahu (New Zealand)",
  BASIQ: "Basiq (Australia)",
  PLAID: "Plaid (United States)",
  TRUELAYER: "TrueLayer (United Kingdom)",
};

export * from "./types";
