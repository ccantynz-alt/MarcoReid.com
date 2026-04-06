import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import BillingActions from "./BillingActions";

export const dynamic = "force-dynamic";

function formatMoney(cents: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(cents / 100);
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    requires_capture: "bg-amber-100 text-amber-800",
    captured: "bg-forest-100 text-forest-800",
    refunded: "bg-navy-100 text-navy-700",
    canceled: "bg-red-100 text-red-800",
  };
  const cls = colors[status] || "bg-navy-100 text-navy-700";
  return (
    <span className={`inline-block rounded px-2 py-0.5 text-xs font-semibold ${cls}`}>
      {status}
    </span>
  );
}

export default async function BillingPage() {
  const session = await getServerSession(authOptions);
  const sessionUser = session?.user as { id?: string } | undefined;
  if (!sessionUser?.id) {
    redirect("/login?next=/billing");
  }

  const user = await prisma.user.findUnique({
    where: { id: sessionUser.id },
  });
  if (!user) {
    redirect("/login");
  }

  const payments = await prisma.marketplacePayment.findMany({
    where: { professionalUserId: user.id },
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="font-serif text-4xl text-navy-800">Billing</h1>

      <section className="mt-10 rounded-2xl border border-navy-100 bg-white p-8 shadow-card">
        <h2 className="text-xl font-semibold text-navy-800">Subscription</h2>
        <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-navy-400">Status</dt>
            <dd className="text-navy-700">{user.subscriptionStatus || "No active subscription"}</dd>
          </div>
          <div>
            <dt className="text-navy-400">Plan</dt>
            <dd className="text-navy-700">{user.stripePriceId || "—"}</dd>
          </div>
          <div>
            <dt className="text-navy-400">Renews</dt>
            <dd className="text-navy-700">
              {user.subscriptionPeriodEnd
                ? user.subscriptionPeriodEnd.toLocaleDateString()
                : "—"}
            </dd>
          </div>
        </dl>
        <BillingActions
          hasCustomer={Boolean(user.stripeCustomerId)}
          connectOnboarded={user.connectOnboarded}
        />
      </section>

      <section className="mt-10 rounded-2xl border border-navy-100 bg-white p-8 shadow-card">
        <h2 className="text-xl font-semibold text-navy-800">
          Marketplace payments received
        </h2>
        {payments.length === 0 ? (
          <p className="mt-4 text-sm text-navy-400">No payments yet.</p>
        ) : (
          <ul className="mt-4 divide-y divide-navy-100">
            {payments.map((p) => (
              <li
                key={p.id}
                className="flex items-center justify-between py-3 text-sm"
              >
                <div>
                  <div className="font-semibold text-navy-700">
                    {formatMoney(p.amountCents, p.currency)}
                  </div>
                  <div className="text-navy-400">
                    {p.description || p.stripePaymentIntentId}
                  </div>
                  <div className="text-xs text-navy-400">
                    {p.createdAt.toLocaleString()}
                  </div>
                </div>
                <StatusBadge status={p.status} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
