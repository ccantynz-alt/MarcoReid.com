/**
 * seed-demo.ts
 *
 * Seeds a trial account with demo data so users have something real to drive
 * against from the first minute. Called fire-and-forget after registration —
 * failures are logged but never surface to the user.
 *
 * Demo naming convention: all demo record names are prefixed "Demo — " so
 * they are identifiable and can be cleaned up on trial expiry.
 */

import { prisma } from "@/lib/prisma";

export async function seedDemoData(userId: string): Promise<void> {
  try {
    await prisma.$transaction(async (tx) => {
      // 1. Demo client
      const client = await tx.client.create({
        data: {
          userId,
          name: "Demo — Patel Family Trust",
          email: "demo-client@example.com",
          phone: "+1 555 000 0001",
          companyName: "Patel Family Trust",
          notes:
            "Demo client created automatically when your trial started. Safe to explore — no real data.",
          kycStatus: "verified",
          kycVerifiedAt: new Date(),
          kycRiskLevel: "low",
          sourceOfFunds: "investment",
        },
      });

      // 2. Demo matter linked to the client
      const matter = await tx.matter.create({
        data: {
          userId,
          clientId: client.id,
          title: "Demo — Patel Family Trust — Conveyancing Settlement",
          matterNumber: "DEMO-001",
          practiceArea: "Conveyancing",
          jurisdiction: "NZ",
          status: "ACTIVE",
          description:
            "Demo matter created automatically. Use this to explore case management, time tracking, billing, and trust accounting.",
        },
      });

      // 3. Demo time entry linked to the matter
      await tx.timeEntry.create({
        data: {
          userId,
          matterId: matter.id,
          description: "Demo — Initial client consultation",
          minutes: 90, // 1.5 hours
          rateInCents: 35000, // $350/hour
          date: new Date(),
          billable: true,
          invoiced: false,
        },
      });

      // 4. Demo trust account linked to the client
      await tx.trustAccount.create({
        data: {
          userId,
          clientId: client.id,
          balanceInCents: 1500000, // $15,000
          currency: "NZD",
          jurisdiction: "NZ",
          transactions: {
            create: {
              type: "DEPOSIT",
              amountInCents: 1500000,
              description: "Demo — Initial settlement deposit from Patel Family Trust",
              matterId: matter.id,
            },
          },
        },
      });

      // 5. Demo deadline linked to the matter
      await tx.deadline.create({
        data: {
          userId,
          matterId: matter.id,
          title: "Demo — Settlement date — Patel Family Trust",
          description:
            "Demo deadline. Explore how Marco Reid tracks court deadlines and sends reminders.",
          dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
          jurisdiction: "NZ",
          status: "upcoming",
          priority: "high",
          reminderDays: 3,
        },
      });
    });
  } catch (err) {
    // Fire-and-forget — log but never throw. Demo seeding failure must never
    // block registration. The user gets a clean account and can add their own data.
    console.error("[seed-demo] Failed to seed demo data for user", userId, err);
  }
}
