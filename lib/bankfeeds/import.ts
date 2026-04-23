/**
 * lib/bankfeeds/import.ts — Pull and persist bank transactions.
 *
 * Fetches new transactions from the right adapter for a given
 * `BankConnection`, dedupes against `(bankAccountId, providerTxId)`,
 * and inserts the new ones as `UNCATEGORISED` `BankTransaction` rows.
 *
 * Watermark: we use `lastSyncedAt` on the connection (or fall back to
 * 90 days ago) so a fresh connection picks up history without us having
 * to hardcode anywhere. After a successful import we move the
 * watermark forward.
 */

import { BankFeedStatus, BankTransactionStatus, Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { getAdapter } from "./index";
import { isAdapterError } from "./types";

const NINETY_DAYS_MS = 90 * 24 * 60 * 60 * 1000;

export interface ImportResult {
  inserted: number;
  skipped: number;
  errors: number;
  message?: string;
}

export async function importTransactions(bankConnectionId: string): Promise<ImportResult> {
  const connection = await prisma.bankConnection.findUnique({
    where: { id: bankConnectionId },
    include: { bankAccounts: true },
  });
  if (!connection) {
    return { inserted: 0, skipped: 0, errors: 1, message: "Bank connection not found" };
  }

  const adapter = getAdapter(connection.provider);
  if (!adapter.isConfigured()) {
    await prisma.bankConnection.update({
      where: { id: bankConnectionId },
      data: { status: BankFeedStatus.ERROR, errorMessage: `${adapter.name} adapter not configured` },
    });
    return { inserted: 0, skipped: 0, errors: 1, message: `${adapter.name} adapter not configured` };
  }

  const since = connection.lastSyncedAt ?? new Date(Date.now() - NINETY_DAYS_MS);
  // The encrypted access token is what the adapter uses as `connectionId`.
  // It's stored on `BankConnection.encryptedAccessToken`. We hand the raw
  // value to the adapter; in production this is decrypted via the secret
  // store before this call.
  const tokenForAdapter = connection.encryptedAccessToken ?? connection.providerAccountId;
  const result = await adapter.listTransactions(tokenForAdapter, since);

  if (isAdapterError(result)) {
    await prisma.bankConnection.update({
      where: { id: bankConnectionId },
      data: { status: BankFeedStatus.ERROR, errorMessage: result.error },
    });
    return { inserted: 0, skipped: 0, errors: 1, message: result.error };
  }

  // Map provider account ids to our internal BankAccount ids.
  const accountByProviderId = new Map<string, string>();
  for (const acc of connection.bankAccounts) {
    if (acc.providerAccountId) accountByProviderId.set(acc.providerAccountId, acc.id);
  }

  let inserted = 0;
  let skipped = 0;
  let errors = 0;

  for (const tx of result) {
    const internalAccountId = accountByProviderId.get(tx.providerAccountId);
    if (!internalAccountId) {
      // Transaction belongs to an account we haven't synced yet; skip
      // rather than fail the whole batch.
      skipped += 1;
      continue;
    }
    try {
      const created = await prisma.bankTransaction.upsert({
        where: {
          bankAccountId_providerTxId: {
            bankAccountId: internalAccountId,
            providerTxId: tx.providerTxId,
          },
        },
        update: {}, // dedup — never overwrite an imported row
        create: {
          bankAccountId: internalAccountId,
          providerTxId: tx.providerTxId,
          amount: new Prisma.Decimal(tx.amount),
          currency: tx.currency,
          description: tx.description,
          merchantName: tx.merchantName,
          category: tx.category,
          occurredAt: tx.occurredAt,
          status: BankTransactionStatus.UNCATEGORISED,
        },
      });
      // `upsert` returns the row regardless; check `importedAt` to know
      // whether we just created or just touched it.
      if (created.importedAt.getTime() > Date.now() - 5_000) {
        inserted += 1;
      } else {
        skipped += 1;
      }
    } catch (err) {
      console.error("[bankfeeds/import] failed to upsert transaction", err);
      errors += 1;
    }
  }

  await prisma.bankConnection.update({
    where: { id: bankConnectionId },
    data: {
      lastSyncedAt: new Date(),
      status: errors > 0 ? BankFeedStatus.ERROR : BankFeedStatus.ACTIVE,
      errorMessage: errors > 0 ? `${errors} transaction(s) failed to import` : null,
    },
  });

  return { inserted, skipped, errors };
}
