import Link from "next/link";
import { redirect } from "next/navigation";
import { getUserId } from "@/lib/session";

// Citizen route group — used for people posting matters to the marketplace,
// distinct from the firm-facing (platform) shell.
export default async function CitizenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userId = await getUserId();
  if (!userId) {
    redirect("/login?callbackUrl=/post-matter");
  }

  return (
    <div className="min-h-screen bg-navy-50">
      <header className="border-b border-navy-100 bg-white">
        <div className="gold-divider" />
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2 font-serif text-xl text-navy-500">
            <span className="text-gold-500">&diams;</span>
            Marco Reid
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/my-matters" className="text-navy-500 hover:text-navy-700">
              My matters
            </Link>
            <Link href="/post-matter" className="font-semibold text-navy-700 hover:text-navy-900">
              Post a matter
            </Link>
          </nav>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
