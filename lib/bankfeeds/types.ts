/**
 * lib/bankfeeds/types.ts — Provider-agnostic bank-feed adapter contract.
 *
 * Bank feeds in Marco Reid arrive direct from neutral open-banking
 * infrastructure providers (Akahu in NZ, Basiq in AU, Plaid in US,
 * TrueLayer in UK). Each adapter normalises the provider's payload into
 * `ProviderAccount` and `ProviderTransaction` shapes so the rest of the
 * platform never has to care which provider sourced a row.
 *
 * `providerTxId` is the durable dedup key — `(bankAccountId,
 * providerTxId)` is unique on `BankTransaction`, so re-running an
 * import is a no-op for already-seen transactions.
 */

export interface ProviderAccount {
  providerAccountId: string;
  name: string;
  accountNumberMasked: string; // last-4 only
  accountType: "CHECKING" | "SAVINGS" | "CREDIT_CARD" | "LOAN" | "OTHER";
  currency: string;
  currentBalance?: string;
  availableBalance?: string;
  institutionName?: string;
}

export interface ProviderTransaction {
  providerTxId: string;
  providerAccountId: string;
  amount: string; // signed: positive = money in, negative = money out
  currency: string;
  description: string;
  merchantName?: string;
  category?: string;
  occurredAt: Date;
}

export interface ConnectResult {
  providerAccountId: string; // provider connection / item identifier
  institutionName: string;
  accounts: ProviderAccount[];
}

export interface AdapterError {
  error: string;
  code?: string;
}

export type AdapterResult<T> = T | AdapterError;

export function isAdapterError<T>(value: AdapterResult<T>): value is AdapterError {
  return typeof value === "object" && value !== null && "error" in (value as object);
}

export interface BankFeedAdapter {
  /** The provider's display name. */
  readonly name: string;

  /** Whether the adapter has the env vars it needs to operate. */
  isConfigured(): boolean;

  /** Exchange the provider's auth payload for a connection + accounts. */
  connect(authPayload: Record<string, unknown>): Promise<AdapterResult<ConnectResult>>;

  /** Pull transactions for a connection since the given watermark. */
  listTransactions(
    connectionId: string,
    since: Date,
  ): Promise<AdapterResult<ProviderTransaction[]>>;

  /** Refresh balances on a connection. Returns updated accounts. */
  refreshBalances(connectionId: string): Promise<AdapterResult<ProviderAccount[]>>;
}

export const ADAPTER_TIMEOUT_MS = 10_000;
