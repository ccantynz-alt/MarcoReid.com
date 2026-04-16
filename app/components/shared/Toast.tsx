"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type ToastVariant = "success" | "error" | "info" | "warning";

interface ToastItem {
  id: string;
  variant: ToastVariant;
  title: string;
  description?: string;
}

interface ToastContextValue {
  push: (variant: ToastVariant, title: string, description?: string) => void;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const variantStyles: Record<
  ToastVariant,
  { ring: string; dot: string; label: string }
> = {
  success: {
    ring: "border-forest-200",
    dot: "bg-forest-500",
    label: "Success",
  },
  error: {
    ring: "border-plum-200",
    dot: "bg-plum-500",
    label: "Error",
  },
  info: {
    ring: "border-navy-200",
    dot: "bg-navy-500",
    label: "Info",
  },
  warning: {
    ring: "border-gold-200",
    dot: "bg-gold-500",
    label: "Warning",
  },
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: string) => {
    setItems((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const push = useCallback(
    (variant: ToastVariant, title: string, description?: string) => {
      const id =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `t-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      setItems((prev) => [...prev, { id, variant, title, description }]);
      // Auto-dismiss after 5s
      setTimeout(() => {
        setItems((prev) => prev.filter((t) => t.id !== id));
      }, 5000);
    },
    []
  );

  // Bridge to module-level toast API
  useEffect(() => {
    bridge.push = push;
    bridge.dismiss = dismiss;
    return () => {
      if (bridge.push === push) bridge.push = null;
      if (bridge.dismiss === dismiss) bridge.dismiss = null;
    };
  }, [push, dismiss]);

  const value = useMemo(() => ({ push, dismiss }), [push, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="pointer-events-none fixed inset-x-0 top-4 z-[100] flex flex-col items-center gap-2 px-4 sm:top-6"
      >
        {items.map((t) => {
          const style = variantStyles[t.variant];
          return (
            <div
              key={t.id}
              role="status"
              className={`pointer-events-auto flex w-full max-w-md items-start gap-3 rounded-2xl border ${style.ring} bg-white px-4 py-3 shadow-card-hover`}
            >
              <span
                className={`mt-1.5 h-2 w-2 flex-shrink-0 rounded-full ${style.dot}`}
                aria-hidden="true"
              />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-navy-700">{t.title}</p>
                {t.description ? (
                  <p className="mt-0.5 text-sm text-navy-500">
                    {t.description}
                  </p>
                ) : null}
              </div>
              <button
                type="button"
                onClick={() => dismiss(t.id)}
                aria-label="Dismiss notification"
                className="ml-2 flex-shrink-0 rounded-md p-1 text-navy-400 transition-colors hover:bg-navy-50 hover:text-navy-600"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 2l10 10M12 2L2 12"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used inside <ToastProvider>");
  }
  return ctx;
}

// ── Module-level imperative API ───────────────────────────────────
// Allows `import { toast } from "@/app/components/shared/Toast"` and
// calling `toast.success(title, description?)` from anywhere on the
// client without threading the hook through props.

const bridge: {
  push: ToastContextValue["push"] | null;
  dismiss: ToastContextValue["dismiss"] | null;
} = {
  push: null,
  dismiss: null,
};

function call(variant: ToastVariant, title: string, description?: string) {
  if (bridge.push) {
    bridge.push(variant, title, description);
    return;
  }
  // Graceful fallback when provider hasn't mounted yet (e.g. SSR/build)
  if (typeof window !== "undefined" && typeof console !== "undefined") {
    // eslint-disable-next-line no-console
    console.info(`[toast:${variant}] ${title}${description ? ` — ${description}` : ""}`);
  }
}

export const toast = {
  success: (title: string, description?: string) =>
    call("success", title, description),
  error: (title: string, description?: string) =>
    call("error", title, description),
  info: (title: string, description?: string) =>
    call("info", title, description),
  warning: (title: string, description?: string) =>
    call("warning", title, description),
};
