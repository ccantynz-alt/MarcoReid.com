/**
 * lib/bankfeeds/plaid.ts — Plaid (US) adapter.
 *
 * Plaid is the US open-banking aggregator. We hit the JSON API at
 * `https://${PLAID_ENV}.plaid.com/` (sandbox / development / production)
 * with `client_id` + `secret` in the request body — Plaid does not use
 * Authorization headers for server-side calls.
 *
 * Scaffold posture: real endpoint shapes (`/item/public_token/exchange`,
 * `/accounts/get`, `/transactions/get`). If `PLAID_CLIENT_ID` is missing
 * the adapter returns a clear "not configured" result.
 */

import {
  AdapterResult,
  BankFeedAdapter,
  ConnectResult,
  ProviderAccount,
  ProviderTransaction,
  ADAPTER_TIMEOUT_MS,
} from "./types";

interface PlaidAccount {
  account_id: string;
  name: string;
  mask?: string;
  type?: string;
  subtype?: string;
  balances?: { current?: number; available?: number; iso_currency_code?: string };
}

interface PlaidTransaction {
  transaction_id: string;
  account_id: string;
  amount: number;
  iso_currency_code?: string | null;
  unofficial_currency_code?: string | null;
  date: string;
  authorized_date?: string | null;
  name: string;
  merchant_name?: string | null;
  category?: string[] | null;
}

function clientId(): string | undefined {
  return process.env.PLAID_CLIENT_ID || undefined;
}

function secret(): string | undefined {
  return process.env.PLAID_SECRET || undefined;
}

function envHost(): string {
  return process.env.PLAID_ENV || "sandbox";
}

function notConfigured(): { error: string; code: string } {
  console.warn("[bankfeeds/plaid] PLAID_CLIENT_ID is not set — Plaid adapter is in scaffold mode.");
  return { error: "Plaid not configured", code: "PLAID_NOT_CONFIGURED" };
}

function plaidBase(): string {
  return `https://${envHost()}.plaid.com`;
}

function mapAccountType(type?: string, subtype?: string): ProviderAccount["accountType"] {
  const t = (type || "").toLowerCase();
  const s = (subtype || "").toLowerCase();
  if (t === "credit") return "CREDIT_CARD";
  if (t === "loan" || s === "mortgage" || s === "student") return "LOAN";
  if (s === "savings") return "SAVINGS";
  if (s === "checking" || t === "depository") return "CHECKING";
  return "OTHER";
}

async function plaidPost<T>(path: string, body: Record<string, unknown>): Promise<T> {
  const cid = clientId();
  const sec = secret();
  if (!cid || !sec) throw new Error("Plaid not configured");
  const res = await fetch(`${plaidBase()}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ client_id: cid, secret: sec, ...body }),
    signal: AbortSignal.timeout(ADAPTER_TIMEOUT_MS),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Plaid ${path} ${res.status}: ${text.slice(0, 200)}`);
  }
  return (await res.json()) as T;
}

export const plaidAdapter: BankFeedAdapter = {
  name: "Plaid",

  isConfigured(): boolean {
    return Boolean(clientId() && secret());
  },

  async connect(authPayload): Promise<AdapterResult<ConnectResult>> {
    if (!this.isConfigured()) return notConfigured();
    const publicToken = (authPayload?.publicToken as string) || "";
    if (!publicToken) return { error: "publicToken is required" };

    try {
      const exchanged = await plaidPost<{ access_token: string; item_id: string }>(
        "/item/public_token/exchange",
        { public_token: publicToken },
      );
      const accountsBody = await plaidPost<{ accounts: PlaidAccount[]; item: { institution_id?: string } }>(
        "/accounts/get",
        { access_token: exchanged.access_token },
      );
      return {
        providerAccountId: exchanged.item_id,
        institutionName: accountsBody.item.institution_id ?? "Plaid Connection",
        accounts: accountsBody.accounts.map((a) => ({
          providerAccountId: a.account_id,
          name: a.name,
          accountNumberMasked: a.mask ? `****${a.mask}` : "****",
          accountType: mapAccountType(a.type, a.subtype),
          currency: a.balances?.iso_currency_code ?? "USD",
          currentBalance: a.balances?.current?.toString(),
          availableBalance: a.balances?.available?.toString(),
        })),
      };
    } catch (err) {
      return { error: err instanceof Error ? err.message : "Plaid connect failed" };
    }
  },

  async listTransactions(
    connectionId,
    since,
  ): Promise<AdapterResult<ProviderTransaction[]>> {
    if (!this.isConfigured()) return notConfigured();
    try {
      // connectionId stores the Plaid `access_token` (encrypted at rest).
      const body = await plaidPost<{ transactions: PlaidTransaction[] }>("/transactions/get", {
        access_token: connectionId,
        start_date: since.toISOString().slice(0, 10),
        end_date: new Date().toISOString().slice(0, 10),
      });
      return body.transactions.map((t) => ({
        providerTxId: t.transaction_id,
        providerAccountId: t.account_id,
        // Plaid uses positive for outflows; flip sign so positive = money in.
        amount: (-t.amount).toString(),
        currency: t.iso_currency_code ?? t.unofficial_currency_code ?? "USD",
        description: t.name,
        merchantName: t.merchant_name ?? undefined,
        category: t.category?.join(" / "),
        occurredAt: new Date(t.authorized_date ?? t.date),
      }));
    } catch (err) {
      return { error: err instanceof Error ? err.message : "Plaid listTransactions failed" };
    }
  },

  async refreshBalances(connectionId): Promise<AdapterResult<ProviderAccount[]>> {
    if (!this.isConfigured()) return notConfigured();
    try {
      const body = await plaidPost<{ accounts: PlaidAccount[] }>("/accounts/balance/get", {
        access_token: connectionId,
      });
      return body.accounts.map((a) => ({
        providerAccountId: a.account_id,
        name: a.name,
        accountNumberMasked: a.mask ? `****${a.mask}` : "****",
        accountType: mapAccountType(a.type, a.subtype),
        currency: a.balances?.iso_currency_code ?? "USD",
        currentBalance: a.balances?.current?.toString(),
        availableBalance: a.balances?.available?.toString(),
      }));
    } catch (err) {
      return { error: err instanceof Error ? err.message : "Plaid refreshBalances failed" };
    }
  },
};
