/**
 * lib/bankfeeds/truelayer.ts — TrueLayer (UK open banking) adapter.
 *
 * TrueLayer is the UK open-banking aggregator regulated under the
 * Open Banking Implementation Entity standard. We hit
 * `https://api.truelayer.com/data/v1/` with a per-connection
 * `access_token` issued via the OAuth flow on auth.truelayer.com.
 *
 * Scaffold posture: real endpoint shapes (`/accounts`,
 * `/accounts/{id}/transactions`, `/accounts/{id}/balance`). If
 * `TRUELAYER_CLIENT_ID` is missing the adapter returns a clear "not
 * configured" result.
 */

import {
  AdapterResult,
  BankFeedAdapter,
  ConnectResult,
  ProviderAccount,
  ProviderTransaction,
  ADAPTER_TIMEOUT_MS,
} from "./types";

const TRUELAYER_DATA_BASE = "https://api.truelayer.com/data/v1";

interface TrueLayerAccount {
  account_id: string;
  display_name?: string;
  account_type?: string;
  currency?: string;
  account_number?: { number?: string; sort_code?: string };
  provider?: { display_name?: string };
}

interface TrueLayerBalance {
  current?: number;
  available?: number;
  currency?: string;
}

interface TrueLayerTransaction {
  transaction_id: string;
  amount: number;
  currency: string;
  description: string;
  merchant_name?: string;
  transaction_category?: string;
  timestamp: string;
}

function clientId(): string | undefined {
  return process.env.TRUELAYER_CLIENT_ID || undefined;
}

function clientSecret(): string | undefined {
  return process.env.TRUELAYER_CLIENT_SECRET || undefined;
}

function notConfigured(): { error: string; code: string } {
  console.warn(
    "[bankfeeds/truelayer] TRUELAYER_CLIENT_ID is not set — TrueLayer adapter is in scaffold mode.",
  );
  return { error: "TrueLayer not configured", code: "TRUELAYER_NOT_CONFIGURED" };
}

function mapAccountType(type?: string): ProviderAccount["accountType"] {
  const t = (type || "").toUpperCase();
  if (t.includes("CREDIT")) return "CREDIT_CARD";
  if (t.includes("LOAN") || t.includes("MORTGAGE")) return "LOAN";
  if (t.includes("SAVINGS")) return "SAVINGS";
  if (t.includes("TRANSACTION") || t.includes("CURRENT")) return "CHECKING";
  return "OTHER";
}

function mask(account?: { number?: string }): string {
  const n = account?.number ?? "";
  return n.length >= 4 ? `****${n.slice(-4)}` : "****";
}

async function tlFetch(
  path: string,
  accessToken: string,
  init?: RequestInit,
): Promise<Response> {
  return fetch(`${TRUELAYER_DATA_BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
      ...(init?.headers ?? {}),
    },
    signal: AbortSignal.timeout(ADAPTER_TIMEOUT_MS),
  });
}

export const truelayerAdapter: BankFeedAdapter = {
  name: "TrueLayer",

  isConfigured(): boolean {
    return Boolean(clientId() && clientSecret());
  },

  async connect(authPayload): Promise<AdapterResult<ConnectResult>> {
    if (!this.isConfigured()) return notConfigured();
    const accessToken = (authPayload?.accessToken as string) || "";
    if (!accessToken) return { error: "accessToken is required" };

    try {
      const res = await tlFetch("/accounts", accessToken);
      if (!res.ok) return { error: `TrueLayer /accounts ${res.status}` };
      const body = (await res.json()) as { results?: TrueLayerAccount[] };
      const items = body.results ?? [];
      // TrueLayer returns balances per-account; fetch them in parallel.
      const accounts: ProviderAccount[] = await Promise.all(
        items.map(async (a) => {
          const balRes = await tlFetch(`/accounts/${a.account_id}/balance`, accessToken);
          let bal: TrueLayerBalance | undefined;
          if (balRes.ok) {
            const balBody = (await balRes.json()) as { results?: TrueLayerBalance[] };
            bal = balBody.results?.[0];
          }
          return {
            providerAccountId: a.account_id,
            name: a.display_name ?? "Account",
            accountNumberMasked: mask(a.account_number),
            accountType: mapAccountType(a.account_type),
            currency: a.currency ?? "GBP",
            currentBalance: bal?.current?.toString(),
            availableBalance: bal?.available?.toString(),
            institutionName: a.provider?.display_name,
          };
        }),
      );
      return {
        providerAccountId: (authPayload?.connectionId as string) || items[0]?.account_id || "",
        institutionName: items[0]?.provider?.display_name ?? "TrueLayer Connection",
        accounts,
      };
    } catch (err) {
      return { error: err instanceof Error ? err.message : "TrueLayer connect failed" };
    }
  },

  async listTransactions(
    connectionId,
    since,
  ): Promise<AdapterResult<ProviderTransaction[]>> {
    if (!this.isConfigured()) return notConfigured();
    try {
      // connectionId is the per-firm encrypted access token.
      const accessToken = connectionId;
      const accountsRes = await tlFetch("/accounts", accessToken);
      if (!accountsRes.ok) return { error: `TrueLayer /accounts ${accountsRes.status}` };
      const accountsBody = (await accountsRes.json()) as { results?: TrueLayerAccount[] };

      const fromIso = since.toISOString().slice(0, 10);
      const toIso = new Date().toISOString().slice(0, 10);

      const all: ProviderTransaction[] = [];
      for (const a of accountsBody.results ?? []) {
        const txRes = await tlFetch(
          `/accounts/${a.account_id}/transactions?from=${fromIso}&to=${toIso}`,
          accessToken,
        );
        if (!txRes.ok) continue;
        const txBody = (await txRes.json()) as { results?: TrueLayerTransaction[] };
        for (const t of txBody.results ?? []) {
          all.push({
            providerTxId: t.transaction_id,
            providerAccountId: a.account_id,
            amount: t.amount.toString(),
            currency: t.currency || "GBP",
            description: t.description,
            merchantName: t.merchant_name,
            category: t.transaction_category,
            occurredAt: new Date(t.timestamp),
          });
        }
      }
      return all;
    } catch (err) {
      return { error: err instanceof Error ? err.message : "TrueLayer listTransactions failed" };
    }
  },

  async refreshBalances(connectionId): Promise<AdapterResult<ProviderAccount[]>> {
    if (!this.isConfigured()) return notConfigured();
    try {
      const accessToken = connectionId;
      const res = await tlFetch("/accounts", accessToken);
      if (!res.ok) return { error: `TrueLayer /accounts ${res.status}` };
      const body = (await res.json()) as { results?: TrueLayerAccount[] };
      return Promise.all(
        (body.results ?? []).map(async (a) => {
          const balRes = await tlFetch(`/accounts/${a.account_id}/balance`, accessToken);
          let bal: TrueLayerBalance | undefined;
          if (balRes.ok) {
            const balBody = (await balRes.json()) as { results?: TrueLayerBalance[] };
            bal = balBody.results?.[0];
          }
          return {
            providerAccountId: a.account_id,
            name: a.display_name ?? "Account",
            accountNumberMasked: mask(a.account_number),
            accountType: mapAccountType(a.account_type),
            currency: a.currency ?? "GBP",
            currentBalance: bal?.current?.toString(),
            availableBalance: bal?.available?.toString(),
          };
        }),
      );
    } catch (err) {
      return { error: err instanceof Error ? err.message : "TrueLayer refreshBalances failed" };
    }
  },
};
