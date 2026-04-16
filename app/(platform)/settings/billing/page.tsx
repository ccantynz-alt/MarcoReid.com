import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import BillingActions from "@/app/(platform)/billing/BillingActions";
import SectionHeader from "../SectionHeader";

export const dynamic = "force-dynamic";

function planName(priceId: string | null | undefined): string {
  if (!priceId) return "No active plan";
  const id = priceId.toLowerCase();
  if (id.includes("starter")) return "Starter";
  if (id.includes("professional")) return "Professional";
  if (id.includes("firm")) return "Firm";
  if (id.includes("enterprise")) return "Enterprise";
  return "Active plan";
}

function statusTone(status: string | null | undefined): string {
  switch (status) {
    case "active":
    case "trialing":
      return "bg-forest-100 text-forest-800";
    case "past_due":
    case "unpaid":
      return "bg-amber-100 text-amber-800";
    case "canceled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-navy-100 text-navy-700";
  }
}

export default async function BillingSettingsPage() {
  const session = await getServerSession(authOptions);
  const sessionUser = session?.user as { id?: string } | undefined;
  if (!sessionUser?.id) {
    redirect("/login?next=/settings/billing");
  }

  const user = await prisma.user.findUnique({
    where: { id: sessionUser.id },
    select: {
      stripeCustomerId: true,
      stripePriceId: true,
      stripeSubscriptionId: true,
      subscriptionStatus: true,
      subscriptionPeriodEnd: true,
      connectOnboarded: true,
    },
  });

  if (!user) {
    redirect("/login");
  }

  const since = new Date();
  since.setDate(1);
  since.setHours(0, 0, 0, 0);

  const [queriesThisMonth, voiceTranscripts] = await Promise.all([
    prisma.oracleQuery.count({
      where: { userId: sessionUser.id, createdAt: { gte: since } },
    }),
    prisma.voiceTranscript.findMany({
      where: { userId: sessionUser.id, createdAt: { gte: since } },
      select: { durationMs: true },
    }),
  ]);

  const voiceMinutes = Math.round(
    voiceTranscripts.reduce((sum, t) => sum + (t.durationMs ?? 0), 0) / 60000
  );

  const plan = planName(user.stripePriceId);
  const status = user.subscriptionStatus ?? "inactive";

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Billing"
        description="Your subscription, payment methods, invoices, and usage."
      />

      <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-navy-400">
              Current plan
            </p>
            <p className="mt-1 font-serif text-3xl text-navy-800">{plan}</p>
            <span
              className={`mt-2 inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusTone(
                status
              )}`}
            >
              {status}
            </span>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-wide text-navy-400">
              Next billing date
            </p>
            <p className="mt-1 text-lg font-medium text-navy-700">
              {user.subscriptionPeriodEnd
                ? user.subscriptionPeriodEnd.toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })
                : "—"}
            </p>
          </div>
        </div>

        <BillingActions
          hasCustomer={Boolean(user.stripeCustomerId)}
          connectOnboarded={user.connectOnboarded}
        />

        <div className="mt-6 flex flex-wrap gap-3 border-t border-navy-100 pt-6">
          <Link
            href="/pricing"
            className="rounded-lg border border-navy-200 px-4 py-2 text-sm font-medium text-navy-700 transition-colors hover:bg-navy-50"
          >
            Upgrade plan
          </Link>
          <Link
            href="/refunds"
            className="rounded-lg border border-navy-200 px-4 py-2 text-sm font-medium text-navy-700 transition-colors hover:bg-navy-50"
          >
            Refunds policy
          </Link>
        </div>
      </div>

      <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card sm:p-8">
        <h3 className="font-serif text-lg text-navy-800">Payment method</h3>
        <div className="mt-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div
              aria-hidden="true"
              className="flex h-10 w-14 items-center justify-center rounded-md border border-navy-200 bg-navy-50 text-xs font-semibold text-navy-700"
            >
              VISA
            </div>
            <div>
              <p className="text-sm font-medium text-navy-700">•••• 4242</p>
              <p className="text-xs text-navy-400">Expires 12 / 2027</p>
            </div>
          </div>
          <p className="text-xs text-navy-400">
            Manage cards in the Stripe portal.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card sm:p-8">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-lg text-navy-800">Usage this month</h3>
          <p className="text-xs text-navy-400">
            Resets on the first of each month.
          </p>
        </div>
        <dl className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-navy-100 bg-navy-50 p-5">
            <dt className="text-xs uppercase tracking-wide text-navy-400">
              Marco queries
            </dt>
            <dd className="mt-2 font-serif text-3xl text-navy-800">
              {queriesThisMonth.toLocaleString("en-GB")}
            </dd>
          </div>
          <div className="rounded-xl border border-navy-100 bg-navy-50 p-5">
            <dt className="text-xs uppercase tracking-wide text-navy-400">
              Voice minutes
            </dt>
            <dd className="mt-2 font-serif text-3xl text-navy-800">
              {voiceMinutes.toLocaleString("en-GB")}
            </dd>
          </div>
        </dl>
      </div>

      <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card sm:p-8">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-lg text-navy-800">Invoices</h3>
          <Link
            href="/billing"
            className="text-sm font-medium text-navy-500 hover:text-navy-700"
          >
            View payments
          </Link>
        </div>
        <p className="mt-4 text-sm text-navy-400">
          Invoice history coming soon. In the meantime your full receipt history
          is available in the Stripe portal.
        </p>
      </div>

      <div className="rounded-2xl border border-red-200 bg-red-50/40 p-6 sm:p-8">
        <h3 className="font-serif text-lg text-navy-800">Cancel subscription</h3>
        <p className="mt-2 text-sm text-navy-700">
          You can cancel any time from the Stripe portal. Your access continues
          through the end of your current billing period.
        </p>
      </div>
    </div>
  );
}
