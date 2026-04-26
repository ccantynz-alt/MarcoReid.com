"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";

interface Command {
  id: string;
  label: string;
  description?: string;
  section: string;
  action: () => void;
  keywords?: string[];
}

interface CommandPaletteContextValue {
  open: () => void;
  close: () => void;
  isOpen: boolean;
}

const CommandPaletteContext = createContext<CommandPaletteContextValue | null>(
  null,
);

export function useCommandPalette() {
  const ctx = useContext(CommandPaletteContext);
  if (!ctx) {
    throw new Error(
      "useCommandPalette must be used inside <CommandPaletteProvider>",
    );
  }
  return ctx;
}

export function CommandPaletteProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const open = useCallback(() => {
    setIsOpen(true);
    setQuery("");
    setActiveIndex(0);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Global keyboard shortcut
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) close();
        else open();
        return;
      }
      if (!isOpen) return;
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, open, close]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [isOpen]);

  const commands: Command[] = useMemo(() => {
    const nav = (path: string) => () => {
      router.push(path);
      close();
    };

    return [
      // Navigate
      {
        id: "nav-dashboard",
        label: "Go to Dashboard",
        section: "Navigate",
        action: nav("/dashboard"),
        keywords: ["home"],
      },
      {
        id: "nav-marco",
        label: "Ask Marco",
        description: "Open the AI research assistant",
        section: "Navigate",
        action: nav("/dashboard/marco"),
        keywords: ["ai", "research", "marco", "query"],
      },
      {
        id: "nav-matters",
        label: "Go to Matters",
        section: "Navigate",
        action: nav("/matters"),
        keywords: ["cases", "engagements"],
      },
      {
        id: "nav-clients",
        label: "Go to Clients",
        section: "Navigate",
        action: nav("/clients"),
        keywords: ["contacts", "directory"],
      },
      {
        id: "nav-documents",
        label: "Go to Documents",
        section: "Navigate",
        action: nav("/documents"),
        keywords: ["files", "drafts"],
      },
      {
        id: "nav-trust",
        label: "Go to Trust accounts",
        section: "Navigate",
        action: nav("/trust"),
        keywords: ["iolta", "ledger"],
      },
      {
        id: "nav-voice",
        label: "Open Voice dictation",
        section: "Navigate",
        action: nav("/voice"),
        keywords: ["dictation", "speech", "audio"],
      },
      {
        id: "nav-billing",
        label: "Go to Billing",
        section: "Navigate",
        action: nav("/billing"),
        keywords: ["invoices", "payments", "subscription"],
      },

      // Actions
      {
        id: "action-new-matter",
        label: "New matter",
        description: "Open a new matter",
        section: "Create",
        action: nav("/matters/new"),
      },
      {
        id: "action-new-client",
        label: "New client",
        description: "Add a new client",
        section: "Create",
        action: nav("/clients/new"),
      },
      {
        id: "action-upload-doc",
        label: "Upload document",
        section: "Create",
        action: nav("/documents/upload"),
      },

      // Settings
      {
        id: "settings-profile",
        label: "Profile settings",
        section: "Settings",
        action: nav("/settings/profile"),
      },
      {
        id: "settings-firm",
        label: "Firm settings",
        section: "Settings",
        action: nav("/settings/firm"),
      },
      {
        id: "settings-billing",
        label: "Billing settings",
        section: "Settings",
        action: nav("/settings/billing"),
      },
      {
        id: "settings-security",
        label: "Security settings",
        section: "Settings",
        action: nav("/settings/security"),
      },
      {
        id: "settings-integrations",
        label: "Integrations",
        section: "Settings",
        action: nav("/settings/integrations"),
      },

      // Help
      {
        id: "help-centre",
        label: "Help centre",
        section: "Help",
        action: nav("/help"),
      },
      {
        id: "help-faq",
        label: "FAQ",
        section: "Help",
        action: nav("/help/faq"),
      },
      {
        id: "help-getting-started",
        label: "Getting started guide",
        section: "Help",
        action: nav("/help/getting-started"),
      },
      {
        id: "help-status",
        label: "System status",
        section: "Help",
        action: nav("/status"),
      },
    ];
  }, [router, close]);

  const filtered = useMemo(() => {
    if (!query.trim()) return commands;
    const q = query.toLowerCase();
    return commands.filter((cmd) => {
      const haystack = [
        cmd.label,
        cmd.description || "",
        cmd.section,
        ...(cmd.keywords || []),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [query, commands]);

  // Reset active index when filter changes
  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(filtered.length - 1, i + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(0, i - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      filtered[activeIndex]?.action();
    }
  };

  // Group filtered results by section, preserving order
  const grouped = useMemo(() => {
    const map = new Map<string, Command[]>();
    filtered.forEach((cmd) => {
      const arr = map.get(cmd.section) ?? [];
      arr.push(cmd);
      map.set(cmd.section, arr);
    });
    return Array.from(map.entries());
  }, [filtered]);

  // Flat index for active styling
  const flatIndex = (cmd: Command) =>
    filtered.findIndex((c) => c.id === cmd.id);

  return (
    <CommandPaletteContext.Provider value={{ open, close, isOpen }}>
      {children}

      {isOpen && (
        <div
          className="fixed inset-0 z-[200] flex items-start justify-center bg-navy-900/40 p-4 pt-[15vh] backdrop-blur-sm"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
        >
          <div
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-navy-200 bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-navy-100 px-4 py-3">
              <svg
                viewBox="0 0 20 20"
                className="h-5 w-5 flex-shrink-0 text-navy-400"
                fill="none"
              >
                <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="2" />
                <path
                  d="M14 14l3 3"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Jump to anything or ask Marco..."
                className="flex-1 bg-transparent text-navy-700 placeholder-navy-400 focus:outline-none"
              />
              <kbd className="hidden rounded border border-navy-200 bg-navy-50 px-1.5 py-0.5 font-mono text-xs text-navy-500 sm:inline">
                ESC
              </kbd>
            </div>

            <div className="max-h-[50vh] overflow-y-auto p-2">
              {filtered.length === 0 ? (
                <p className="px-3 py-8 text-center text-sm text-navy-400">
                  No matches for &ldquo;{query}&rdquo;
                </p>
              ) : (
                grouped.map(([section, items]) => (
                  <div key={section} className="mb-2 last:mb-0">
                    <p className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-navy-400">
                      {section}
                    </p>
                    <ul>
                      {items.map((cmd) => {
                        const active = flatIndex(cmd) === activeIndex;
                        return (
                          <li key={cmd.id}>
                            <button
                              type="button"
                              onClick={() => cmd.action()}
                              onMouseEnter={() =>
                                setActiveIndex(flatIndex(cmd))
                              }
                              className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                                active
                                  ? "bg-navy-50 text-navy-800"
                                  : "text-navy-600 hover:bg-navy-50/50"
                              }`}
                            >
                              <div className="min-w-0 flex-1">
                                <p className="truncate font-medium">
                                  {cmd.label}
                                </p>
                                {cmd.description && (
                                  <p className="mt-0.5 truncate text-xs text-navy-400">
                                    {cmd.description}
                                  </p>
                                )}
                              </div>
                              {active && (
                                <span className="ml-2 text-navy-400">
                                  &larr;&#x23CE;
                                </span>
                              )}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))
              )}
            </div>

            <div className="flex items-center justify-between border-t border-navy-100 bg-navy-50/50 px-4 py-2 text-xs text-navy-400">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="rounded border border-navy-200 bg-white px-1.5 py-0.5 font-mono">↑↓</kbd>
                  Navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="rounded border border-navy-200 bg-white px-1.5 py-0.5 font-mono">↵</kbd>
                  Select
                </span>
              </div>
              <span>Marco Reid</span>
            </div>
          </div>
        </div>
      )}
    </CommandPaletteContext.Provider>
  );
}
