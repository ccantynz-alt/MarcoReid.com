import Link from "next/link";
import { redirect } from "next/navigation";
import { getUserId } from "@/lib/session";
import { listJurisdictions } from "@/lib/trust/jurisdiction-rules";
import NewAccountForm from "./NewAccountForm";

export const dynamic = "force-dynamic";

export default async function NewTrustAccountPage() {
  const userId = await getUserId();
  if (!userId) redirect("/login");

  const jurisdictions = listJurisdictions().map((j) => ({
    value: j.jurisdiction,
    label: `${j.jurisdiction.replace("_", " ")} — ${j.regulator}`,
    citation: j.citation,
  }));

  return (
    <div className="mx-auto max-w-3xl px-6 py-12 sm:px-8 lg:px-12">
      <div className="text-xs text-navy-400">
        <Link href="/trust-engine" className="hover:text-navy-600">
          Trust accounts
        </Link>
        <span className="mx-2">/</span>
        <span className="text-navy-500">New</span>
      </div>

      <h1 className="mt-3 font-serif text-display text-navy-800">
        New trust account
      </h1>
      <p className="mt-2 text-navy-400">
        Configure the bank account and the jurisdiction whose statutory
        framework governs it. The engine will apply the correct hold period,
        interest treatment, and reconciliation cadence.
      </p>

      <NewAccountForm jurisdictions={jurisdictions} />
    </div>
  );
}
