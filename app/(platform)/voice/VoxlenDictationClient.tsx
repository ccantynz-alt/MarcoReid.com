"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/app/components/shared/Toast";
import {
  processVoiceCommands,
  executeVoiceCommand,
  applyTextCommand,
  exportAsText,
  exportAsMarkdown,
  exportAsJson,
  exportAsSrt,
  VOICE_COMMANDS_HELP,
} from "@/lib/voice-commands";

export interface TranscriptItem {
  id: string;
  text: string;
  language: string | null;
  durationMs: number | null;
  createdAt: string;
}

type RecordingStatus = "idle" | "recording" | "processing" | "error";

interface Props {
  initialTranscripts: TranscriptItem[];
}

export default function VoxlenDictationClient({ initialTranscripts }: Props) {
  const router = useRouter();
  const toast = useToast();

  // Recording state
  const [status, setStatus] = useState<RecordingStatus>("idle");
  const [durationMs, setDurationMs] = useState(0);
  const [inputLevel, setInputLevel] = useState(0);
  const [waveformData, setWaveformData] = useState<number[]>(new Array(64).fill(0));

  // Transcript state
  const [latestText, setLatestText] = useState(initialTranscripts[0]?.text ?? "");
  const [detectedLanguage, setDetectedLanguage] = useState<string | null>(null);
  const [transcripts, setTranscripts] = useState<TranscriptItem[]>(initialTranscripts);
  const [wordCount, setWordCount] = useState(0);

  // UI state
  const [showCommands, setShowCommands] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [copied, setCopied] = useState(false);
  const [language, setLanguage] = useState("en");
  const [surface, setSurface] = useState("dashboard");

  // Refs for audio
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationRef = useRef<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Update word count when text changes
  useEffect(() => {
    setWordCount(latestText.split(/\s+/).filter(Boolean).length);
  }, [latestText]);

  // Waveform drawing — ported from Voxlen
  const drawWaveform = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;
    const barCount = 64;
    const barW = w / barCount;
    const gap = 2;
    const effW = barW - gap;
    const centerY = h / 2;

    ctx.clearRect(0, 0, w, h);

    for (let i = 0; i < barCount; i++) {
      let amp = waveformData[i] || 0;
      if (status === "recording") {
        amp = Math.max(amp, 0.02 + Math.sin(Date.now() / 300 + i * 0.3) * 0.015);
      } else {
        amp = 0.01 + Math.sin(Date.now() / 800 + i * 0.5) * 0.008;
      }

      const norm = Math.min(amp * 8, 1);
      const barH = Math.max(2, norm * (h * 0.8));
      const x = i * barW + gap / 2;

      // Navy palette for idle, forest for recording
      if (status === "recording") {
        ctx.fillStyle = `rgba(45, 106, 79, ${0.4 + norm * 0.6})`;
      } else if (status === "processing") {
        ctx.fillStyle = `rgba(139, 92, 246, ${0.3 + norm * 0.5})`;
      } else {
        ctx.fillStyle = `rgba(118, 129, 160, ${0.2 + norm * 0.3})`;
      }

      const r = Math.min(effW / 2, 2);
      ctx.beginPath();
      ctx.moveTo(x + r, centerY - barH / 2);
      ctx.lineTo(x + effW - r, centerY - barH / 2);
      ctx.quadraticCurveTo(x + effW, centerY - barH / 2, x + effW, centerY - barH / 2 + r);
      ctx.lineTo(x + effW, centerY + barH / 2 - r);
      ctx.quadraticCurveTo(x + effW, centerY + barH / 2, x + effW - r, centerY + barH / 2);
      ctx.lineTo(x + r, centerY + barH / 2);
      ctx.quadraticCurveTo(x, centerY + barH / 2, x, centerY + barH / 2 - r);
      ctx.lineTo(x, centerY - barH / 2 + r);
      ctx.quadraticCurveTo(x, centerY - barH / 2, x + r, centerY - barH / 2);
      ctx.closePath();
      ctx.fill();
    }

    if (status === "recording" || status === "processing") {
      animationRef.current = requestAnimationFrame(drawWaveform);
    }
  }, [waveformData, status]);

  useEffect(() => {
    drawWaveform();
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [drawWaveform]);

  // Start recording with Web Audio API
  async function startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioContext = new AudioContext();
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      analyserRef.current = analyser;

      // Update waveform data from analyser
      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      function updateLevels() {
        if (!analyserRef.current) return;
        analyserRef.current.getByteFrequencyData(dataArray);
        const avg = dataArray.reduce((s, v) => s + v, 0) / dataArray.length / 255;
        setInputLevel(avg);
        const normalized = Array.from(dataArray.slice(0, 64)).map((v) => v / 255);
        setWaveformData(normalized);
        if (mediaRecorderRef.current?.state === "recording") {
          requestAnimationFrame(updateLevels);
        }
      }

      const recorder = new MediaRecorder(stream, {
        mimeType: MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
          ? "audio/webm;codecs=opus"
          : "audio/webm",
      });
      mediaRecorderRef.current = recorder;
      audioChunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      recorder.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        audioContext.close();
        analyserRef.current = null;

        const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        if (blob.size < 100) {
          setStatus("idle");
          return;
        }
        await transcribeAudio(blob);
      };

      recorder.start();
      startTimeRef.current = Date.now();
      setStatus("recording");
      setDurationMs(0);

      // Duration timer
      timerRef.current = setInterval(() => {
        setDurationMs(Date.now() - startTimeRef.current);
      }, 100);

      updateLevels();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Microphone access denied";
      toast.error("Could not start recording", msg);
      setStatus("error");
    }
  }

  function stopRecording() {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.stop();
      setStatus("processing");
    }
  }

  async function transcribeAudio(blob: Blob) {
    setStatus("processing");
    try {
      const formData = new FormData();
      formData.append("audio", new File([blob], "recording.webm", { type: blob.type }));
      formData.append("language", language);
      formData.append("surface", surface);

      const res = await fetch("/api/voice/transcribe", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Transcription failed (${res.status})`);
      }

      const data = await res.json();
      let text = data.text || "";

      // Process voice commands — ported from Voxlen
      const cmdResult = processVoiceCommands(text);
      if (cmdResult.matched && cmdResult.action) {
        const output = executeVoiceCommand(cmdResult.action);
        text = applyTextCommand(cmdResult.remainingText, output);
        if (cmdResult.action === "stop") {
          setStatus("idle");
          return;
        }
      }

      if (text.trim()) {
        setLatestText((prev) => (prev ? prev + " " + text : text));
      }

      setDetectedLanguage(data.language || null);
      toast.success("Transcribed", `${text.split(/\s+/).length} words captured`);

      // Refresh transcript list
      refreshList();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Transcription failed";
      toast.error("Transcription error", msg);
    } finally {
      setStatus("idle");
      setInputLevel(0);
      setWaveformData(new Array(64).fill(0));
    }
  }

  async function refreshList() {
    try {
      const res = await fetch("/api/voice/transcripts", { cache: "no-store" });
      if (!res.ok) return;
      const data = await res.json();
      setTranscripts(data.transcripts ?? []);
    } catch { /* ignore */ }
  }

  async function saveTranscript() {
    if (!latestText.trim()) return;
    try {
      const res = await fetch("/api/voice/transcripts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: latestText.trim(),
          durationMs: durationMs || null,
          language: detectedLanguage || language,
          surface,
        }),
      });
      if (res.ok) {
        toast.success("Saved", "Transcript stored in your history");
        refreshList();
        router.refresh();
      }
    } catch { /* ignore */ }
  }

  async function handleCopy() {
    if (!latestText) return;
    try {
      await navigator.clipboard.writeText(latestText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch { /* ignore */ }
  }

  function handleExport(format: "txt" | "md" | "json" | "srt") {
    const meta = {
      language: detectedLanguage || language,
      duration: durationMs,
      date: new Date().toISOString(),
      wordCount,
    };
    let content: string;
    let ext: string;
    let mime: string;
    switch (format) {
      case "txt": content = exportAsText(latestText); ext = "txt"; mime = "text/plain"; break;
      case "md": content = exportAsMarkdown(latestText, meta); ext = "md"; mime = "text/markdown"; break;
      case "json": content = exportAsJson(latestText, meta); ext = "json"; mime = "application/json"; break;
      case "srt": content = exportAsSrt(latestText, durationMs); ext = "srt"; mime = "text/plain"; break;
    }
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `transcript-${Date.now()}.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Exported", `Downloaded as .${ext}`);
    setShowExport(false);
  }

  const formatTime = (ms: number) => {
    const s = Math.floor(ms / 1000);
    const m = Math.floor(s / 60);
    return `${m}:${String(s % 60).padStart(2, "0")}`;
  };

  const isRecording = status === "recording";
  const isProcessing = status === "processing";

  return (
    <div className="space-y-8">
      {/* Recorder */}
      <div className="flex flex-col items-center gap-6">
        {/* Language + surface selectors */}
        <div className="flex items-center gap-3">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="rounded-lg border border-navy-200 bg-white px-3 py-2 text-sm text-navy-700 focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500"
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="zh">Mandarin</option>
            <option value="hi">Hindi</option>
            <option value="ja">Japanese</option>
            <option value="fr">French</option>
            <option value="ar">Arabic</option>
            <option value="pt">Portuguese</option>
            <option value="ko">Korean</option>
          </select>
          <select
            value={surface}
            onChange={(e) => setSurface(e.target.value)}
            className="rounded-lg border border-navy-200 bg-white px-3 py-2 text-sm text-navy-700 focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500"
          >
            <option value="dashboard">Dashboard</option>
            <option value="matter">Matter</option>
            <option value="document">Document</option>
            <option value="email">Email</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Mic button — Voxlen style */}
        <div className="relative">
          {isRecording && (
            <div className="absolute inset-0 rounded-full animate-ping bg-forest-500/20" />
          )}
          <button
            onClick={isRecording ? stopRecording : startRecording}
            disabled={isProcessing}
            className={`relative z-10 flex h-24 w-24 items-center justify-center rounded-full transition-all duration-300 ${
              isRecording
                ? "bg-forest-500 text-white shadow-lg shadow-forest-500/30 scale-110"
                : isProcessing
                  ? "bg-plum-500 text-white animate-pulse"
                  : "bg-navy-100 text-navy-700 hover:bg-navy-200 hover:scale-105"
            }`}
            aria-label={isRecording ? "Stop recording" : "Start recording"}
          >
            {isProcessing ? (
              <svg className="h-8 w-8 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
                <path d="M12 2a10 10 0 019.95 9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
            ) : isRecording ? (
              <svg viewBox="0 0 24 24" className="h-8 w-8" fill="currentColor">
                <rect x="6" y="6" width="12" height="12" rx="2" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
                <path d="M19 10v2a7 7 0 01-14 0v-2" strokeLinecap="round" />
                <line x1="12" y1="19" x2="12" y2="23" strokeLinecap="round" />
                <line x1="8" y1="23" x2="16" y2="23" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>

        <p className="text-sm text-navy-500">
          {isRecording
            ? "Recording... click to stop"
            : isProcessing
              ? "Transcribing with Marco..."
              : "Click to start dictating"}
        </p>

        {/* Waveform — ported from Voxlen */}
        <canvas
          ref={canvasRef}
          className="w-full max-w-lg"
          style={{ height: "60px" }}
        />

        {/* Status bar */}
        <div className="flex items-center gap-6 text-xs text-navy-400">
          <span>{formatTime(durationMs)}</span>
          <span>{wordCount} words</span>
          {inputLevel > 0 && (
            <span>{Math.round(inputLevel * 100)}% level</span>
          )}
          {detectedLanguage && (
            <span>{detectedLanguage.toUpperCase()}</span>
          )}
        </div>
      </div>

      {/* Transcript area */}
      <div>
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-2xl text-navy-700">Transcript</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowCommands(!showCommands)}
              className="rounded-lg border border-navy-200 bg-white px-3 py-1.5 text-xs font-medium text-navy-600 hover:bg-navy-50"
            >
              {showCommands ? "Hide" : "Voice"} commands
            </button>
            <button
              onClick={() => setShowExport(!showExport)}
              disabled={!latestText}
              className="rounded-lg border border-navy-200 bg-white px-3 py-1.5 text-xs font-medium text-navy-600 hover:bg-navy-50 disabled:opacity-40"
            >
              Export
            </button>
            <button
              onClick={handleCopy}
              disabled={!latestText}
              className="rounded-lg border border-navy-200 bg-white px-3 py-1.5 text-xs font-medium text-navy-600 hover:bg-navy-50 disabled:opacity-40"
            >
              {copied ? "Copied" : "Copy"}
            </button>
            <button
              onClick={saveTranscript}
              disabled={!latestText.trim()}
              className="rounded-lg bg-navy-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-navy-600 disabled:opacity-40"
            >
              Save
            </button>
          </div>
        </div>

        {/* Export dropdown */}
        {showExport && (
          <div className="mt-2 flex items-center gap-2 rounded-lg border border-navy-100 bg-white p-3">
            {(["txt", "md", "json", "srt"] as const).map((fmt) => (
              <button
                key={fmt}
                onClick={() => handleExport(fmt)}
                className="rounded-lg border border-navy-200 bg-white px-3 py-1.5 text-xs font-medium text-navy-600 hover:bg-navy-50"
              >
                .{fmt}
              </button>
            ))}
          </div>
        )}

        {/* Voice commands panel */}
        {showCommands && (
          <div className="mt-3 rounded-2xl border border-navy-100 bg-navy-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
              Say these while dictating
            </p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {VOICE_COMMANDS_HELP.map((cmd) => (
                <div key={cmd.command} className="rounded-lg bg-white px-3 py-2 text-sm">
                  <span className="font-medium text-navy-700">
                    &ldquo;{cmd.command}&rdquo;
                  </span>
                  <span className="ml-2 text-navy-400">{cmd.action}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <textarea
          value={latestText}
          onChange={(e) => setLatestText(e.target.value)}
          placeholder="Your transcribed text will appear here..."
          className="mt-4 h-48 w-full rounded-2xl border border-navy-100 bg-white p-5 text-base leading-relaxed text-navy-700 shadow-card focus:border-forest-400 focus:outline-none"
        />
      </div>

      {/* Recent dictations */}
      <div>
        <h2 className="font-serif text-2xl text-navy-700">History</h2>
        {transcripts.length === 0 ? (
          <p className="mt-4 text-sm text-navy-400">
            No dictations yet. Start recording above.
          </p>
        ) : (
          <ul className="mt-4 space-y-3">
            {transcripts.slice(0, 10).map((t) => (
              <li
                key={t.id}
                className="cursor-pointer rounded-xl border border-navy-100 bg-white p-4 shadow-card transition-colors hover:border-navy-200"
                onClick={() => setLatestText(t.text)}
              >
                <div className="flex items-center justify-between text-xs text-navy-400">
                  <span>{new Date(t.createdAt).toLocaleString()}</span>
                  <span>
                    {t.language ? t.language.toUpperCase() : ""}
                    {t.durationMs ? ` · ${(t.durationMs / 1000).toFixed(1)}s` : ""}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-navy-700 line-clamp-3">
                  {t.text}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
