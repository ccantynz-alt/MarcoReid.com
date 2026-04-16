import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import DataPanel from "./DataPanel";

export const dynamic = "force-dynamic";

export default async function DataSettingsPage() {
  const session = await getServerSession(authOptions);
  const sessionUser = session?.user as { id?: string; email?: string } | undefined;
  if (!sessionUser?.id) {
    redirect("/login?next=/settings/data");
  }

  return <DataPanel email={sessionUser.email ?? ""} />;
}
