import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import SecurityPanel from "./SecurityPanel";

export const dynamic = "force-dynamic";

export default async function SecuritySettingsPage() {
  const session = await getServerSession(authOptions);
  const sessionUser = session?.user as { id?: string; email?: string } | undefined;
  if (!sessionUser?.id) {
    redirect("/login?next=/settings/security");
  }

  return <SecurityPanel email={sessionUser.email ?? ""} />;
}
