"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

export type ToastKind = "success" | "error" | "info" | "warning";

export interface Toast {
  id: string;
  kind: ToastKind;
  title: string;
  description?: string;
  duration?: number;
}

interface ToastContextValue {
  toast: (opts: Omit<Toast, "id">) => void;
  success: (title: string, description?: string) => void;
  error: (title: string, description?: string) => void;
  info: (title: string, description?: string) => void;
  warning: (title: string, description?: string) => void;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used inside <ToastProvider>");
  }
  return ctx;
}

const kindStyles: Record<ToastKind, { bar: string; icon: React.ReactNode }> = {
  success: {
    bar: "bg-forest-500",
    icon: (
      <svg viewBox="0 0 20 20" className="h-5 w-5 text-forest-500" fill="none">
        <path
          d="M5 10l3.5 3.5L15 7"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  error: {
    bar: "bg-red-500",
    icon: (
      <svg viewBox="0 0 20 20" className="h-5 w-5 text-red-500" fill="none">
        <path
          d="M6 6l8 8M14 6l-8 8"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  info: {
    bar: "bg-navy-500",
    icon: (
      <svg viewBox="0 0 20 20" className="h-5 w-5 text-navy-500" fill="none">
        <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2" />
        <path
          d="M10 9v5M10 6v.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  warning: {
    bar: "bg-plum-500",
    icon: (
      <svg viewBox="0 0 20 20" className="h-5 w-5 text-plum-500" fill="none">
        <path
          d="M10 3l8 14H2L10 3z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M10 9v3M10 15v.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    const timer = timers.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timers.current.delete(id);
    }
  }, []);

  const toast = useCallback(
    (opts: Omit<Toast, "id">) => {
      const id = Math.random().toString(36).slice(2);
      const t: Toast = { id, duration: 4500, ...opts };
      setToasts((prev) => [...prev, t]);
      if (t.duration && t.duration > 0) {
        const timer = setTimeout(() => dismiss(id), t.duration);
        timers.current.set(id, timer);
      }
    },
    [dismiss],
  );

  const api: ToastContextValue = {
    toast,
    success: (title, description) => toast({ kind: "success", title, description }),
    error: (title, description) => toast({ kind: "error", title, description }),
    info: (title, description) => toast({ kind: "info", title, description }),
    warning: (title, description) => toast({ kind: "warning", title, description }),
    dismiss,
  };

  useEffect(() => {
    return () => {
      timers.current.forEach((timer) => clearTimeout(timer));
      timers.current.clear();
    };
  }, []);

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="pointer-events-none fixed top-4 right-4 z-[100] flex w-full max-w-sm flex-col gap-3 sm:top-6 sm:right-6"
      >
        {toasts.map((t) => {
          const s = kindStyles[t.kind];
          return (
            <div
              key={t.id}
              role="status"
              className="pointer-events-auto overflow-hidden rounded-xl border border-navy-100 bg-white shadow-lg ring-1 ring-black/5 animate-in slide-in-from-right-5 fade-in duration-300"
            >
              <div className="flex gap-3 p-4">
                <div className={`h-full w-1 flex-shrink-0 rounded-full ${s.bar}`} />
                <div className="mt-0.5 flex-shrink-0">{s.icon}</div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-navy-700">
                    {t.title}
                  </p>
                  {t.description && (
                    <p className="mt-1 text-sm text-navy-500">{t.description}</p>
                  )}
                </div>
                <button
                  onClick={() => dismiss(t.id)}
                  className="flex-shrink-0 text-navy-300 transition-colors hover:text-navy-600"
                  aria-label="Dismiss"
                >
                  <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none">
                    <path
                      d="M5 5l10 10M15 5L5 15"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}
