/**
 * lib/bankfeeds/categorise.ts — Suggestion-only categorisation.
 *
 * Two-pass:
 *   1. Apply firm-defined `CategorisationRule` rows (regex / contains
 *      against DESCRIPTION, MERCHANT, or CATEGORY). First match wins
 *      and `hits` is incremented for the rule.
 *   2. Fall back to a Claude suggestion using the firm's chart of
 *      accounts as the candidate set. The model is asked to return a
 *      single account code; we look that code up before persisting.
 *
 * We never auto-post. The output of this pass is a `suggestedAccountId`
 * and a `SUGGESTED` status — a human confirms via the UI in chunk 4 and
 * only then is a `JournalEntry` created.
 */

import Anthropic from "@anthropic-ai/sdk";
import { BankTransactionStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";

const ANTHROPIC_TIMEOUT_MS = 8_000;

interface RuleMatchInput {
  description: string;
  merchantName?: string | null;
  category?: string | null;
}

function ruleMatches(
  pattern: string,
  field: "DESCRIPTION" | "MERCHANT" | "CATEGORY",
  tx: RuleMatchInput,
): boolean {
  const target = (
    field === "DESCRIPTION" ? tx.description : field === "MERCHANT" ? tx.merchantName : tx.category
  ) || "";
  if (!target) return false;
  // Try regex first; fall back to a case-insensitive contains check.
  try {
    const re = new RegExp(pattern, "i");
    if (re.test(target)) return true;
  } catch {
    /* ignore — fall through to contains */
  }
  return target.toLowerCase().includes(pattern.toLowerCase());
}

let _anthropic: Anthropic | null = null;
function anthropic(): Anthropic | null {
  if (!process.env.ANTHROPIC_API_KEY) return null;
  if (!_anthropic) _anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  return _anthropic;
}

export interface CategorisationResult {
  scanned: number;
  ruleMatched: number;
  aiSuggested: number;
  unmatched: number;
}

export async function runCategorisation(
  firmId: string,
  batchSize = 100,
): Promise<CategorisationResult> {
  const accounts = await prisma.chartOfAccounts.findMany({
    where: { firmId, isActive: true },
    select: { id: true, code: true, name: true, type: true, subType: true },
    orderBy: { code: "asc" },
  });
  const accountByCode = new Map(accounts.map((a) => [a.code, a]));

  const rules = await prisma.categorisationRule.findMany({
    where: { firmId, isActive: true },
    orderBy: { createdAt: "asc" },
  });

  const transactions = await prisma.bankTransaction.findMany({
    where: {
      status: BankTransactionStatus.UNCATEGORISED,
      bankAccount: { firmId },
    },
    take: batchSize,
    orderBy: { occurredAt: "desc" },
  });

  const out: CategorisationResult = {
    scanned: transactions.length,
    ruleMatched: 0,
    aiSuggested: 0,
    unmatched: 0,
  };

  const ai = anthropic();
  const coaPrompt = accounts
    .map((a) => `${a.code} ${a.name} (${a.type}/${a.subType})`)
    .join("\n");

  for (const tx of transactions) {
    let matchedAccountId: string | null = null;

    for (const rule of rules) {
      if (
        ruleMatches(
          rule.matchPattern,
          rule.matchField as "DESCRIPTION" | "MERCHANT" | "CATEGORY",
          {
            description: tx.description,
            merchantName: tx.merchantName,
            category: tx.category,
          },
        )
      ) {
        matchedAccountId = rule.accountId;
        await prisma.categorisationRule.update({
          where: { id: rule.id },
          data: { hits: { increment: 1 } },
        });
        break;
      }
    }

    if (matchedAccountId) {
      await prisma.bankTransaction.update({
        where: { id: tx.id },
        data: {
          suggestedAccountId: matchedAccountId,
          status: BankTransactionStatus.SUGGESTED,
        },
      });
      out.ruleMatched += 1;
      continue;
    }

    if (!ai) {
      out.unmatched += 1;
      continue;
    }

    try {
      const message = await ai.messages.create(
        {
          model: "claude-3-5-haiku-20241022",
          max_tokens: 32,
          system:
            "You are a bookkeeping classifier. Given a chart of accounts and a single bank transaction, return ONLY the account code (no prose, no punctuation). If you cannot determine an account confidently, return NONE.",
          messages: [
            {
              role: "user",
              content: `Chart of accounts:\n${coaPrompt}\n\nTransaction:\n  Date: ${tx.occurredAt.toISOString().slice(0, 10)}\n  Amount: ${tx.amount.toString()} ${tx.currency}\n  Description: ${tx.description}\n  Merchant: ${tx.merchantName ?? "-"}\n  Provider category: ${tx.category ?? "-"}\n\nReturn the single best account code from the list above.`,
            },
          ],
        },
        { signal: AbortSignal.timeout(ANTHROPIC_TIMEOUT_MS) },
      );

      const text = message.content
        .map((c) => (c.type === "text" ? c.text.trim() : ""))
        .join("");
      const code = text.replace(/[^A-Za-z0-9]/g, "");
      const account = accountByCode.get(code);
      if (account) {
        await prisma.bankTransaction.update({
          where: { id: tx.id },
          data: {
            suggestedAccountId: account.id,
            status: BankTransactionStatus.SUGGESTED,
          },
        });
        out.aiSuggested += 1;
      } else {
        out.unmatched += 1;
      }
    } catch (err) {
      console.warn("[bankfeeds/categorise] AI suggestion failed", err);
      out.unmatched += 1;
    }
  }

  return out;
}
