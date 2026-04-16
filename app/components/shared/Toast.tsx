"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type ToastVariant = "success" | "error" | "info";

interface ToastItem {
  id: number;
  message: string;
  variant: ToastVariant;
}

interface ToastContextValue {
  show: (message: string, variant?: ToastVariant) => void;
  success: (message: string) => void;
  error: (message: string) => void;
  info: (message: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const show = useCallback((message: string, variant: ToastVariant = "info") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, variant }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  }, []);

  const value: ToastContextValue = {
    show,
    success: (m) => show(m, "success"),
    error: (m) => show(m, "error"),
    info: (m) => show(m, "info"),
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="pointer-events-none fixed bottom-6 right-6 z-50 flex w-full max-w-sm flex-col gap-3"
      >
        {toasts.map((t) => (
          <ToastCard key={t.id} toast={t} onDismiss={() =>
            setToasts((prev) => prev.filter((x) => x.id !== t.id))
          } />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function ToastCard({
  toast,
  onDismiss,
}: {
  toast: ToastItem;
  onDismiss: () => void;
}) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 10);
    return () => clearTimeout(t);
  }, []);

  const styles: Record<ToastVariant, string> = {
    success: "border-forest-300 bg-white text-navy-800",
    error: "border-red-300 bg-white text-navy-800",
    info: "border-navy-200 bg-white text-navy-800",
  };
  const dot: Record<ToastVariant, string> = {
    success: "bg-forest-500",
    error: "bg-red-500",
    info: "bg-navy-400",
  };

  return (
    <div
      role="status"
      className={`pointer-events-auto flex items-start gap-3 rounded-2xl border px-4 py-3 shadow-card transition-all duration-200 ${
        show ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
      } ${styles[toast.variant]}`}
    >
      <span
        className={`mt-1.5 inline-block h-2 w-2 flex-shrink-0 rounded-full ${dot[toast.variant]}`}
        aria-hidden="true"
      />
      <p className="flex-1 text-sm">{toast.message}</p>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss notification"
        className="text-navy-400 transition-colors hover:text-navy-700"
      >
        <svg
          aria-hidden="true"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    // Safe fallback so it doesn't crash if used outside the provider
    return {
      show: (m) => console.warn("[toast:no-provider]", m),
      success: (m) => console.warn("[toast:no-provider]", m),
      error: (m) => console.warn("[toast:no-provider]", m),
      info: (m) => console.warn("[toast:no-provider]", m),
    };
  }
  return ctx;
}
