import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Container from "@/app/components/shared/Container";
import VoiceDictationClient, {
  type TranscriptItem,
} from "./VoiceDictationClient";

export const metadata = {
  title: "Marco Reid Voice — Dictate anywhere",
};

export default async function VoicePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  const userId = (session.user as unknown as { id: string }).id;

  const rows = await prisma.voiceTranscript.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  const initialTranscripts: TranscriptItem[] = rows.map((r) => ({
    id: r.id,
    text: r.text,
    language: r.language,
    durationMs: r.durationMs,
    createdAt: r.createdAt.toISOString(),
  }));

  return (
    <Container className="py-12">
      <div className="mb-10">
        <p className="text-xs font-medium uppercase tracking-widest text-navy-500">
          Marco Reid Voice
        </p>
        <h1 className="mt-4 font-serif text-display text-navy-800">
          Speak. It is done.
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-navy-400">
          Universal speech-to-text dictation for legal and accounting
          professionals. Record, transcribe, and paste anywhere.
        </p>
      </div>

      <VoiceDictationClient initialTranscripts={initialTranscripts} />
    </Container>
  );
}
