"use client";

import { useState, useRef, useEffect } from "react";
import type { OracleResponse, OracleDomain } from "@/lib/oracle/types";

type Message =
  | { role: "user"; content: string; id: string }
  | { role: "marco"; response: OracleResponse; id: string }
  | { role: "error"; content: string; id: string };

const DOMAIN_LABELS: Record<OracleDomain, string> = {
  LEGAL: "Legal",
  ACCOUNTING: "Accounting",
  CROSS_DOMAIN: "Cross-domain",
  IP: "Intellectual Property",
};

const STATUS_STYLES: Record<string, string> = {
  VERIFIED: "bg-forest-50 text-forest-700 border-forest-200",
  UNVERIFIED: "bg-navy-50 text-navy-500 border-navy-200",
  NOT_FOUND: "bg-red-50 text-red-700 border-red-200",
};

export default function MarcoChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [domain, setDomain] = useState<OracleDomain | "">("");
  const [jurisdiction, setJurisdiction] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const query = input.trim();
    if (!query || loading) return;

    const userMsg: Message = {
      role: "user",
      content: query,
      id: `u-${Date.now()}`,
    };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/oracle/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query,
          domain: domain || undefined,
          jurisdiction: jurisdiction || undefined,
          surface: "marco-chat",
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `Request failed (${res.status})`);
      }

      const response: OracleResponse = await res.json();
      setMessages((m) => [
        ...m,
        { role: "marco", response, id: `m-${Date.now()}` },
      ]);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong.";
      setMessages((m) => [
        ...m,
        { role: "error", content: msg, id: `e-${Date.now()}` },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-full flex-col rounded-2xl border border-navy-100 bg-white shadow-card">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-navy-100 px-6 py-4">
        <div>
          <h2 className="font-serif text-xl text-navy-700">Marco</h2>
          <p className="text-xs text-navy-400">
            The greatest AI-generated mind for law and accountancy
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={domain}
            onChange={(e) => setDomain(e.target.value as OracleDomain | "")}
            className="rounded-lg border border-navy-200 bg-white px-3 py-1.5 text-xs text-navy-600 focus:border-navy-400 focus:outline-none"
            aria-label="Domain"
          >
            <option value="">Auto-detect</option>
            <option value="LEGAL">Legal</option>
            <option value="ACCOUNTING">Accounting</option>
            <option value="CROSS_DOMAIN">Cross-domain</option>
            <option value="IP">IP</option>
          </select>
          <input
            type="text"
            placeholder="Jurisdiction"
            value={jurisdiction}
            onChange={(e) => setJurisdiction(e.target.value)}
            className="w-32 rounded-lg border border-navy-200 bg-white px-3 py-1.5 text-xs text-navy-600 placeholder:text-navy-300 focus:border-navy-400 focus:outline-none"
          />
        </div>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 space-y-4 overflow-y-auto px-6 py-6"
        style={{ minHeight: "400px", maxHeight: "60vh" }}
      >
        {messages.length === 0 && !loading && (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <div className="font-serif text-2xl text-navy-700">
              Ask Marco anything.
            </div>
            <p className="mt-2 max-w-md text-sm text-navy-400">
              Legal research, tax questions, cross-domain analysis. Every
              citation verified against authoritative public sources.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {[
                "California non-compete enforceability for tech employees",
                "Section 199A QBI deduction threshold for 2025",
                "Immigration tax implications of an H-1B holder forming an LLC",
              ].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setInput(s)}
                  className="rounded-full border border-navy-200 bg-navy-50 px-3 py-1.5 text-xs text-navy-600 transition-colors hover:bg-navy-100"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg) => {
          if (msg.role === "user") {
            return (
              <div key={msg.id} className="flex justify-end">
                <div className="max-w-[80%] rounded-2xl rounded-tr-md bg-navy-500 px-4 py-2.5 text-sm text-white">
                  {msg.content}
                </div>
              </div>
            );
          }

          if (msg.role === "error") {
            return (
              <div key={msg.id} className="flex justify-start">
                <div className="max-w-[80%] rounded-2xl rounded-tl-md border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700">
                  {msg.content}
                </div>
              </div>
            );
          }

          const r = msg.response;
          return (
            <div key={msg.id} className="flex justify-start">
              <div className="w-full max-w-[90%] space-y-3">
                <div className="rounded-2xl rounded-tl-md border border-navy-100 bg-navy-50 px-5 py-4">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="rounded-full bg-plum-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-plum-600">
                      {DOMAIN_LABELS[r.domain]}
                    </span>
                    <span className="text-[10px] text-navy-400">
                      {(r.responseTimeMs / 1000).toFixed(1)}s
                    </span>
                  </div>
                  <div className="whitespace-pre-wrap text-sm leading-relaxed text-navy-700">
                    {r.answer}
                  </div>
                </div>

                {r.citations.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-navy-400">
                      {r.citations.length} citation
                      {r.citations.length === 1 ? "" : "s"}
                    </p>
                    {r.citations.map((c, i) => (
                      <div
                        key={`${msg.id}-c-${i}`}
                        className="rounded-xl border border-navy-100 bg-white p-3"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-navy-700">
                              {c.title}
                            </p>
                            <p className="mt-0.5 text-xs text-navy-400">
                              {c.citation}
                              {c.sourceDb && c.sourceDb !== "None"
                                ? ` · ${c.sourceDb}`
                                : ""}
                            </p>
                          </div>
                          <span
                            className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-bold ${
                              STATUS_STYLES[c.status] || STATUS_STYLES.UNVERIFIED
                            }`}
                          >
                            {c.status}
                          </span>
                        </div>
                        {c.sourceUrl && (
                          <a
                            href={c.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 inline-block text-xs font-semibold text-navy-500 hover:text-navy-700"
                          >
                            View source &rarr;
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                <p className="text-[10px] italic text-navy-300">
                  {r.disclaimer}
                </p>
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex justify-start">
            <div className="rounded-2xl rounded-tl-md border border-navy-100 bg-navy-50 px-5 py-4">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="h-2 w-2 animate-bounce rounded-full bg-navy-400 [animation-delay:-0.3s]" />
                  <div className="h-2 w-2 animate-bounce rounded-full bg-navy-400 [animation-delay:-0.15s]" />
                  <div className="h-2 w-2 animate-bounce rounded-full bg-navy-400" />
                </div>
                <span className="text-xs text-navy-400">
                  Marco is researching&hellip;
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="border-t border-navy-100 px-6 py-4"
      >
        <div className="flex items-end gap-3">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            placeholder="Ask Marco a legal or accounting question…"
            rows={2}
            disabled={loading}
            className="min-h-[60px] flex-1 resize-none rounded-xl border border-navy-200 bg-white px-4 py-3 text-sm text-navy-700 placeholder:text-navy-300 focus:border-navy-400 focus:outline-none disabled:opacity-50"
            maxLength={2000}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="min-h-touch shrink-0 rounded-xl bg-navy-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Asking…" : "Ask"}
          </button>
        </div>
        <p className="mt-2 text-[10px] text-navy-300">
          Press Enter to send · Shift+Enter for new line · {input.length}/2000
        </p>
      </form>
    </div>
  );
}
