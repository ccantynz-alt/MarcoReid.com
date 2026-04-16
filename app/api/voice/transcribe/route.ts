import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import OpenAI from "openai";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { rateLimit, rateLimitResponse, LIMITS } from "@/lib/rate-limit";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: "Authentication required." },
        { status: 401 }
      );
    }

    const userId = (session.user as unknown as { id: string }).id;

    // Per-user rate limit on voice transcription — controls Whisper API cost.
    const limit = await rateLimit({
      key: `voice:${userId}`,
      ...LIMITS.voiceTranscribe,
    });
    if (!limit.ok) return rateLimitResponse(limit);

    const formData = await request.formData();
    const audio = formData.get("audio");
    const language = formData.get("language");
    const surface = formData.get("surface");
    const matterId = formData.get("matterId");

    if (!audio || !(audio instanceof File)) {
      return NextResponse.json(
        { error: "Missing audio file." },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "Voice transcription is not configured." },
        { status: 500 }
      );
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const result = await openai.audio.transcriptions.create({
      file: audio,
      model: "whisper-1",
      language: typeof language === "string" && language ? language : undefined,
      response_format: "verbose_json",
    });

    const text = (result as unknown as { text: string }).text ?? "";
    const detectedLanguage =
      (result as unknown as { language?: string }).language ??
      (typeof language === "string" ? language : undefined) ??
      null;
    const durationSeconds = (result as unknown as { duration?: number }).duration;
    const durationMs =
      typeof durationSeconds === "number" ? Math.round(durationSeconds * 1000) : null;

    const saved = await prisma.voiceTranscript.create({
      data: {
        userId,
        text,
        durationMs: durationMs ?? undefined,
        language: detectedLanguage ?? undefined,
        surface: typeof surface === "string" && surface ? surface : undefined,
        matterId: typeof matterId === "string" && matterId ? matterId : undefined,
      },
    });

    return NextResponse.json({
      id: saved.id,
      text: saved.text,
      durationMs: saved.durationMs,
      language: saved.language,
    });
  } catch (error) {
    console.error("Voice transcribe error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to transcribe audio.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
