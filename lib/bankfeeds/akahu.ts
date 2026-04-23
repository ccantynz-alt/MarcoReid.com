/**
 * lib/bankfeeds/akahu.ts — Akahu (NZ open banking) adapter.
 *
 * Akahu is the New Zealand open-banking aggregator. We hit the public
 * `https://api.akahu.io/v1/` REST surface using:
 *
 *   X-Akahu-Id: <AKAHU_APP_TOKEN>     (app identifier)
 *   Authorization: Bearer <user token> (per-end-user OAuth token)
 *
 * Scaffold posture: real HTTP shapes and real path/header structure so
 * production wiring is just a matter of setting env vars and exchanging
 * a real OAuth token. If `AKAHU_APP_TOKEN` is missing the adapter
 * returns a clear "not configured" result instead of throwing — this
 * keeps the platform booting in environments without bank-feed keys.
 */

import {
  AdapterResult,
  BankFeedAdapter,
  ConnectResult,
  ProviderAccount,
  ProviderTransaction,
  ADAPTER_TIMEOUT_MS,
} from "./types";

const AKAHU_BASE = "https://api.akahu.io/v1";

interface AkahuAccount {
  _id: string;
  name: string;
  formatted_account?: string;
  type: string;
  attributes?: string[];
  balance?: { current?: number; available?: number; currency?: string };
  connection?: { name?: string };
}

interface AkahuTransaction {
  _id: string;
  _account: string;
  amount: number;
  date: string;
  description: string;
  merchant?: { name?: string };
  category?: { name?: string };
}

function appToken(): string | undefined {
  return process.env.AKAHU_APP_TOKEN || undefined;
}

function appSecret(): string | undefined {
  return process.env.AKAHU_APP_SECRET || undefined;
}

function notConfigured(): { error: string; code: string } {
  console.warn("[bankfeeds/akahu] AKAHU_APP_TOKEN is not set — Akahu adapter is in scaffold mode.");
  return { error: "Akahu not configured", code: "AKAHU_NOT_CONFIGURED" };
}

function mapAccountType(type: string): ProviderAccount["accountType"] {
  const t = (type || "").toUpperCase();
  if (t.includes("CREDIT")) return "CREDIT_CARD";
  if (t.includes("LOAN") || t.includes("MORTGAGE")) return "LOAN";
  if (t.includes("SAVINGS")) return "SAVINGS";
  if (t.includes("CHECKING") || t.includes("TRANSACTION") || t.includes("DEBIT")) return "CHECKING";
  return "OTHER";
}

function mask(formatted?: string): string {
  if (!formatted) return "****";
  const digits = formatted.replace(/[^0-9]/g, "");
  return digits.length >= 4 ? `****${digits.slice(-4)}` : "****";
}

async function akahuFetch(
  path: string,
  userToken: string,
  init?: RequestInit,
): Promise<Response> {
  const id = appToken();
  if (!id) throw new Error("AKAHU_APP_TOKEN not set");
  return fetch(`${AKAHU_BASE}${path}`, {
    ...init,
    headers: {
      "X-Akahu-Id": id,
      Authorization: `Bearer ${userToken}`,
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    signal: AbortSignal.timeout(ADAPTER_TIMEOUT_MS),
  });
}

export const akahuAdapter: BankFeedAdapter = {
  name: "Akahu",

  isConfigured(): boolean {
    return Boolean(appToken());
  },

  async connect(authPayload): Promise<AdapterResult<ConnectResult>> {
    if (!appToken() || !appSecret()) return notConfigured();
    const userToken = (authPayload?.userToken as string) || "";
    if (!userToken) return { error: "userToken is required" };

    try {
      const res = await akahuFetch("/accounts", userToken);
      if (!res.ok) {
        return { error: `Akahu /accounts ${res.status}` };
      }
      const body = (await res.json()) as { items?: AkahuAccount[] };
      const items = body.items ?? [];
      const accounts: ProviderAccount[] = items.map((a) => ({
        providerAccountId: a._id,
        name: a.name,
        accountNumberMasked: mask(a.formatted_account),
        accountType: mapAccountType(a.type),
        currency: a.balance?.currency ?? "NZD",
        currentBalance: a.balance?.current?.toString(),
        availableBalance: a.balance?.available?.toString(),
        institutionName: a.connection?.name,
      }));
      return {
        providerAccountId: (authPayload?.connectionId as string) || items[0]?._id || "",
        institutionName: items[0]?.connection?.name ?? "Akahu Connection",
        accounts,
      };
    } catch (err) {
      return { error: err instanceof Error ? err.message : "Akahu connect failed" };
    }
  },

  async listTransactions(
    connectionId,
    since,
  ): Promise<AdapterResult<ProviderTransaction[]>> {
    if (!appToken()) return notConfigured();
    // `connectionId` here is the per-firm encrypted user token; in
    // production this is decrypted via the secret store before use.
    const userToken = connectionId;
    try {
      const url = `/transactions?start=${encodeURIComponent(since.toISOString())}`;
      const res = await akahuFetch(url, userToken);
      if (!res.ok) return { error: `Akahu /transactions ${res.status}` };
      const body = (await res.json()) as { items?: AkahuTransaction[] };
      return (body.items ?? []).map((t) => ({
        providerTxId: t._id,
        providerAccountId: t._account,
        amount: t.amount.toString(),
        currency: "NZD",
        description: t.description,
        merchantName: t.merchant?.name,
        category: t.category?.name,
        occurredAt: new Date(t.date),
      }));
    } catch (err) {
      return { error: err instanceof Error ? err.message : "Akahu listTransactions failed" };
    }
  },

  async refreshBalances(connectionId): Promise<AdapterResult<ProviderAccount[]>> {
    if (!appToken()) return notConfigured();
    const userToken = connectionId;
    try {
      const res = await akahuFetch("/accounts", userToken);
      if (!res.ok) return { error: `Akahu /accounts ${res.status}` };
      const body = (await res.json()) as { items?: AkahuAccount[] };
      return (body.items ?? []).map((a) => ({
        providerAccountId: a._id,
        name: a.name,
        accountNumberMasked: mask(a.formatted_account),
        accountType: mapAccountType(a.type),
        currency: a.balance?.currency ?? "NZD",
        currentBalance: a.balance?.current?.toString(),
        availableBalance: a.balance?.available?.toString(),
      }));
    } catch (err) {
      return { error: err instanceof Error ? err.message : "Akahu refreshBalances failed" };
    }
  },
};
