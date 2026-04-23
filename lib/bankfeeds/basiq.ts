/**
 * lib/bankfeeds/basiq.ts — Basiq (AU open banking / CDR) adapter.
 *
 * Basiq is the Australian open-banking aggregator built on the Consumer
 * Data Right framework. We hit `https://au-api.basiq.io/` using:
 *
 *   1. POST /token with `Basic <BASIQ_API_KEY>` to mint a server token.
 *   2. Bearer that token on every subsequent call.
 *
 * Scaffold posture: real HTTP shapes, but if `BASIQ_API_KEY` is missing
 * the adapter returns a clear "not configured" result rather than
 * throwing. Token caching is intentionally not implemented yet — that
 * lands when we wire production keys.
 */

import {
  AdapterResult,
  BankFeedAdapter,
  ConnectResult,
  ProviderAccount,
  ProviderTransaction,
  ADAPTER_TIMEOUT_MS,
} from "./types";

const BASIQ_BASE = "https://au-api.basiq.io";

interface BasiqAccount {
  id: string;
  accountNo?: string;
  name: string;
  class?: { type?: string };
  currency?: string;
  balance?: string;
  availableFunds?: string;
  institution?: string;
}

interface BasiqTransaction {
  id: string;
  account: string;
  amount: string;
  description: string;
  postDate?: string;
  transactionDate?: string;
  subClass?: { title?: string };
}

function apiKey(): string | undefined {
  return process.env.BASIQ_API_KEY || undefined;
}

function notConfigured(): { error: string; code: string } {
  console.warn("[bankfeeds/basiq] BASIQ_API_KEY is not set — Basiq adapter is in scaffold mode.");
  return { error: "Basiq not configured", code: "BASIQ_NOT_CONFIGURED" };
}

function mapAccountType(klass?: string): ProviderAccount["accountType"] {
  const k = (klass || "").toLowerCase();
  if (k.includes("credit-card") || k.includes("credit_card")) return "CREDIT_CARD";
  if (k.includes("loan") || k.includes("mortgage")) return "LOAN";
  if (k.includes("savings")) return "SAVINGS";
  if (k.includes("transaction")) return "CHECKING";
  return "OTHER";
}

function mask(accountNo?: string): string {
  if (!accountNo) return "****";
  const digits = accountNo.replace(/[^0-9]/g, "");
  return digits.length >= 4 ? `****${digits.slice(-4)}` : "****";
}

async function getServerToken(): Promise<string> {
  const key = apiKey();
  if (!key) throw new Error("BASIQ_API_KEY not set");
  const res = await fetch(`${BASIQ_BASE}/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${key}`,
      "basiq-version": "3.0",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "scope=SERVER_ACCESS",
    signal: AbortSignal.timeout(ADAPTER_TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`Basiq token ${res.status}`);
  const body = (await res.json()) as { access_token: string };
  return body.access_token;
}

async function basiqFetch(
  path: string,
  token: string,
  init?: RequestInit,
): Promise<Response> {
  return fetch(`${BASIQ_BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    signal: AbortSignal.timeout(ADAPTER_TIMEOUT_MS),
  });
}

export const basiqAdapter: BankFeedAdapter = {
  name: "Basiq",

  isConfigured(): boolean {
    return Boolean(apiKey());
  },

  async connect(authPayload): Promise<AdapterResult<ConnectResult>> {
    if (!apiKey()) return notConfigured();
    const userId = (authPayload?.userId as string) || "";
    if (!userId) return { error: "userId is required" };

    try {
      const token = await getServerToken();
      const res = await basiqFetch(`/users/${encodeURIComponent(userId)}/accounts`, token);
      if (!res.ok) return { error: `Basiq /accounts ${res.status}` };
      const body = (await res.json()) as { data?: BasiqAccount[] };
      const items = body.data ?? [];
      const accounts: ProviderAccount[] = items.map((a) => ({
        providerAccountId: a.id,
        name: a.name,
        accountNumberMasked: mask(a.accountNo),
        accountType: mapAccountType(a.class?.type),
        currency: a.currency ?? "AUD",
        currentBalance: a.balance,
        availableBalance: a.availableFunds,
        institutionName: a.institution,
      }));
      return {
        providerAccountId: userId,
        institutionName: items[0]?.institution ?? "Basiq Connection",
        accounts,
      };
    } catch (err) {
      return { error: err instanceof Error ? err.message : "Basiq connect failed" };
    }
  },

  async listTransactions(
    connectionId,
    since,
  ): Promise<AdapterResult<ProviderTransaction[]>> {
    if (!apiKey()) return notConfigured();
    try {
      const token = await getServerToken();
      // connectionId is the Basiq user id.
      const filter = encodeURIComponent(`transaction.postDate.gt('${since.toISOString().slice(0, 10)}')`);
      const res = await basiqFetch(
        `/users/${encodeURIComponent(connectionId)}/transactions?filter=${filter}`,
        token,
      );
      if (!res.ok) return { error: `Basiq /transactions ${res.status}` };
      const body = (await res.json()) as { data?: BasiqTransaction[] };
      return (body.data ?? []).map((t) => ({
        providerTxId: t.id,
        providerAccountId: t.account,
        amount: t.amount,
        currency: "AUD",
        description: t.description,
        merchantName: undefined,
        category: t.subClass?.title,
        occurredAt: new Date(t.postDate ?? t.transactionDate ?? Date.now()),
      }));
    } catch (err) {
      return { error: err instanceof Error ? err.message : "Basiq listTransactions failed" };
    }
  },

  async refreshBalances(connectionId): Promise<AdapterResult<ProviderAccount[]>> {
    if (!apiKey()) return notConfigured();
    try {
      const token = await getServerToken();
      const res = await basiqFetch(`/users/${encodeURIComponent(connectionId)}/accounts`, token);
      if (!res.ok) return { error: `Basiq /accounts ${res.status}` };
      const body = (await res.json()) as { data?: BasiqAccount[] };
      return (body.data ?? []).map((a) => ({
        providerAccountId: a.id,
        name: a.name,
        accountNumberMasked: mask(a.accountNo),
        accountType: mapAccountType(a.class?.type),
        currency: a.currency ?? "AUD",
        currentBalance: a.balance,
        availableBalance: a.availableFunds,
      }));
    } catch (err) {
      return { error: err instanceof Error ? err.message : "Basiq refreshBalances failed" };
    }
  },
};
