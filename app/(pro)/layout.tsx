import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";

// Pro route group — marketplace-side layout for verified professionals.
// Gates access at layout: must be signed in AND have a Professional profile.
// Unverified pros see the dashboard but are blocked from accepting matters
// at the API level; the UI surfaces the verification status.
export default async function ProLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userId = await getUserId();
  if (!userId) {
    redirect("/login?callbackUrl=/pro-dashboard");
  }

  const pro = await prisma.professional.findUnique({
    where: { userId },
    select: { id: true, displayName: true, verifiedAt: true, acceptingNewMatters: true },
  });

  if (!pro) {
    redirect("/marketplace");
  }

  return (
    <div className="min-h-screen bg-navy-50">
      <header className="border-b border-navy-100 bg-white">
        <div className="gold-divider" />
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2 font-serif text-xl text-navy-500">
            <span className="text-gold-500">&diams;</span>
            Marco Reid
          </Link>
          <nav className="flex items-center gap-5 text-sm">
            <Link href="/pro-dashboard" className="text-navy-500 hover:text-navy-700">
              Queue
            </Link>
            <Link href="/signoff" className="text-navy-500 hover:text-navy-700">
              Sign-off
            </Link>
            <span className="hidden items-center gap-2 rounded-full bg-navy-50 px-3 py-1 text-xs text-navy-600 sm:inline-flex">
              {pro.displayName}
              {pro.verifiedAt ? (
                <span className="rounded-full bg-forest-100 px-2 py-0.5 text-[10px] font-semibold text-forest-700">
                  Verified
                </span>
              ) : (
                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-800">
                  Pending review
                </span>
              )}
            </span>
          </nav>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
