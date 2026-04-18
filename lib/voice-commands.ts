// Voice commands system — ported from Voxlen.
// Pure JS, no platform dependencies. Works in browser and Tauri.

export interface VoiceCommandResult {
  matched: boolean;
  command?: string;
  action?: string;
  remainingText: string;
}

const COMMAND_MAP: Record<string, () => string> = {
  insert_newline: () => "\n",
  insert_paragraph: () => "\n\n",
  insert_period: () => ".",
  insert_comma: () => ",",
  insert_question: () => "?",
  insert_exclamation: () => "!",
  insert_colon: () => ":",
  insert_semicolon: () => ";",
  insert_dash: () => " — ",
  insert_open_quote: () => "\u201C",
  insert_close_quote: () => "\u201D",
  insert_tab: () => "\t",
  insert_space: () => " ",
};

const EXTENDED_COMMANDS: Array<{ patterns: string[]; action: string }> = [
  { patterns: ["new line", "newline", "next line"], action: "insert_newline" },
  { patterns: ["new paragraph", "next paragraph"], action: "insert_paragraph" },
  { patterns: ["period", "full stop", "dot"], action: "insert_period" },
  { patterns: ["comma"], action: "insert_comma" },
  { patterns: ["question mark"], action: "insert_question" },
  { patterns: ["exclamation mark", "exclamation point"], action: "insert_exclamation" },
  { patterns: ["colon"], action: "insert_colon" },
  { patterns: ["semicolon", "semi colon"], action: "insert_semicolon" },
  { patterns: ["dash", "em dash"], action: "insert_dash" },
  { patterns: ["open quote", "begin quote", "quote"], action: "insert_open_quote" },
  { patterns: ["close quote", "end quote", "unquote"], action: "insert_close_quote" },
  { patterns: ["delete that", "scratch that", "remove that"], action: "delete_last" },
  { patterns: ["undo", "undo that"], action: "undo" },
  { patterns: ["select all"], action: "select_all" },
  { patterns: ["copy that", "copy text"], action: "copy" },
  { patterns: ["stop listening", "stop dictation", "stop recording"], action: "stop" },
  { patterns: ["caps on", "all caps", "capitalise"], action: "caps_on" },
  { patterns: ["caps off", "no caps"], action: "caps_off" },
  { patterns: ["tab", "tab key"], action: "insert_tab" },
  { patterns: ["space", "spacebar"], action: "insert_space" },
];

export function processVoiceCommands(text: string): VoiceCommandResult {
  const lower = text.toLowerCase().trim();

  for (const cmd of EXTENDED_COMMANDS) {
    for (const pattern of cmd.patterns) {
      if (lower === pattern) {
        return { matched: true, command: pattern, action: cmd.action, remainingText: "" };
      }
      if (lower.endsWith(` ${pattern}`)) {
        const remaining = text.slice(0, text.length - pattern.length - 1).trim();
        return { matched: true, command: pattern, action: cmd.action, remainingText: remaining };
      }
      if (lower.startsWith(`${pattern} `)) {
        const remaining = text.slice(pattern.length + 1).trim();
        return { matched: true, command: pattern, action: cmd.action, remainingText: remaining };
      }
    }
  }

  return { matched: false, remainingText: text };
}

export function executeVoiceCommand(action: string): string | null {
  const handler = COMMAND_MAP[action];
  if (handler) return handler();

  switch (action) {
    case "delete_last":
    case "undo":
    case "select_all":
    case "copy":
    case "stop":
    case "caps_on":
    case "caps_off":
      return null; // Handled by the calling component's state management
    default:
      return null;
  }
}

export function applyTextCommand(
  existingText: string,
  commandOutput: string | null,
): string {
  if (commandOutput === null) return existingText;
  if ([".","!","?",",",":",";"].includes(commandOutput)) {
    return existingText.trimEnd() + commandOutput + " ";
  }
  return existingText + commandOutput;
}

// All available voice commands for help display
export const VOICE_COMMANDS_HELP = EXTENDED_COMMANDS.map((cmd) => ({
  command: cmd.patterns[0],
  aliases: cmd.patterns.slice(1),
  action: cmd.action
    .replace("insert_", "")
    .replace("_", " "),
}));

// Export format helpers — ported from Voxlen
export function exportAsText(text: string): string {
  return text;
}

export function exportAsMarkdown(
  text: string,
  meta?: { language?: string; duration?: number; date?: string },
): string {
  const lines = [
    "# Voice Transcript",
    "",
    meta?.date ? `**Date:** ${meta.date}` : "",
    meta?.language ? `**Language:** ${meta.language}` : "",
    meta?.duration
      ? `**Duration:** ${Math.round(meta.duration / 1000)}s`
      : "",
    "",
    "---",
    "",
    text,
  ].filter(Boolean);
  return lines.join("\n");
}

export function exportAsJson(
  text: string,
  meta?: {
    language?: string;
    duration?: number;
    date?: string;
    wordCount?: number;
  },
): string {
  return JSON.stringify(
    {
      transcript: text,
      language: meta?.language ?? null,
      durationMs: meta?.duration ?? null,
      wordCount: meta?.wordCount ?? text.split(/\s+/).filter(Boolean).length,
      exportedAt: new Date().toISOString(),
    },
    null,
    2,
  );
}

export function exportAsSrt(
  text: string,
  durationMs?: number,
): string {
  // Simple SRT: one block for the whole transcript.
  // For real SRT, you'd need segment-level timestamps.
  const dur = durationMs ?? 60000;
  const end = formatSrtTime(dur);
  return `1\n00:00:00,000 --> ${end}\n${text}\n`;
}

function formatSrtTime(ms: number): string {
  const s = Math.floor(ms / 1000);
  const m = Math.floor(s / 60);
  const h = Math.floor(m / 60);
  const rem = ms % 1000;
  return [
    String(h).padStart(2, "0"),
    String(m % 60).padStart(2, "0"),
    String(s % 60).padStart(2, "0"),
  ].join(":") + "," + String(rem).padStart(3, "0");
}
