"use client";

import { useEffect, useRef, useState } from "react";

type RecorderState = "idle" | "recording" | "processing" | "error" | "success";

interface VoiceRecorderProps {
  onTranscript: (text: string) => void;
  surface?: string;
  matterId?: string;
  placeholder?: string;
}

export default function VoiceRecorder({
  onTranscript,
  surface,
  matterId,
  placeholder,
}: VoiceRecorderProps) {
  const [state, setState] = useState<RecorderState>("idle");
  const [error, setError] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const startedAtRef = useRef<number>(0);
  const cancelledRef = useRef<boolean>(false);

  useEffect(() => {
    return () => {
      stopStream();
    };
  }, []);

  function stopStream() {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
  }

  async function handleStart() {
    setError(null);
    cancelledRef.current = false;
    if (typeof window === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      setState("error");
      setError("Microphone access is not supported in this browser.");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const mimeType = pickMimeType();
      const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
      chunksRef.current = [];
      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) chunksRef.current.push(e.data);
      };
      recorder.onstop = async () => {
        stopStream();
        if (cancelledRef.current) {
          setState("idle");
          return;
        }
        const blob = new Blob(chunksRef.current, {
          type: recorder.mimeType || "audio/webm",
        });
        await uploadBlob(blob);
      };
      recorder.start();
      mediaRecorderRef.current = recorder;
      startedAtRef.current = Date.now();
      setState("recording");
    } catch (err) {
      console.error(err);
      setState("error");
      setError(
        err instanceof Error && err.name === "NotAllowedError"
          ? "Microphone permission denied. Please allow access and try again."
          : "Could not access microphone."
      );
    }
  }

  function handleStop() {
    const recorder = mediaRecorderRef.current;
    if (recorder && recorder.state !== "inactive") {
      setState("processing");
      recorder.stop();
    }
  }

  function handleCancel() {
    cancelledRef.current = true;
    const recorder = mediaRecorderRef.current;
    if (recorder && recorder.state !== "inactive") {
      recorder.stop();
    }
    stopStream();
    setState("idle");
  }

  async function uploadBlob(blob: Blob) {
    try {
      setState("processing");
      const form = new FormData();
      const ext = blob.type.includes("mp4")
        ? "mp4"
        : blob.type.includes("ogg")
          ? "ogg"
          : "webm";
      form.append("audio", blob, `recording.${ext}`);
      if (surface) form.append("surface", surface);
      if (matterId) form.append("matterId", matterId);
      const res = await fetch("/api/voice/transcribe", {
        method: "POST",
        body: form,
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Transcription failed.");
      }
      const data = (await res.json()) as { text: string };
      onTranscript(data.text);
      setState("success");
      setTimeout(() => {
        setState((s) => (s === "success" ? "idle" : s));
      }, 2000);
    } catch (err) {
      console.error(err);
      setState("error");
      setError(err instanceof Error ? err.message : "Transcription failed.");
    }
  }

  const isRecording = state === "recording";
  const isProcessing = state === "processing";

  return (
    <div className="rounded-2xl border border-forest-200 bg-forest-50 p-5 sm:p-6">
      <div className="flex items-center gap-4">
        <div className="flex h-8 items-end gap-[3px]">
          {Array.from({ length: 24 }).map((_, i) => (
            <div
              key={i}
              className="waveform-bar w-[3px] rounded-full bg-forest-500"
              style={{
                height: isRecording ? "100%" : "25%",
                animationPlayState: isRecording ? "running" : "paused",
                animationDelay: `${i * 0.05}s`,
                opacity: isRecording ? 1 : 0.5,
              }}
            />
          ))}
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-forest-700">
            Marco Reid Voice
            {isRecording && " — Recording"}
            {isProcessing && " — Transcribing…"}
            {state === "success" && " — Transcribed"}
          </p>
          <p className="mt-0.5 text-xs text-forest-500">
            {placeholder || "Press Start and speak naturally. Whisper will transcribe."}
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        {!isRecording && !isProcessing && (
          <button
            type="button"
            onClick={handleStart}
            className="inline-flex min-h-touch items-center justify-center rounded-full bg-forest-500 px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-forest-600"
          >
            Start recording
          </button>
        )}
        {isRecording && (
          <>
            <button
              type="button"
              onClick={handleStop}
              className="inline-flex min-h-touch items-center justify-center rounded-full bg-navy-700 px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-navy-800"
            >
              Stop & transcribe
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="inline-flex min-h-touch items-center justify-center rounded-full border border-navy-200 bg-white px-6 py-2 text-sm font-semibold text-navy-700 transition-colors hover:bg-navy-50"
            >
              Cancel
            </button>
          </>
        )}
        {isProcessing && (
          <span className="inline-flex min-h-touch items-center text-sm text-navy-500">
            Sending to Whisper…
          </span>
        )}
      </div>

      {error && (
        <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

function pickMimeType(): string | undefined {
  if (typeof MediaRecorder === "undefined") return undefined;
  const candidates = [
    "audio/webm;codecs=opus",
    "audio/webm",
    "audio/mp4",
    "audio/ogg;codecs=opus",
  ];
  for (const c of candidates) {
    if (MediaRecorder.isTypeSupported?.(c)) return c;
  }
  return undefined;
}
