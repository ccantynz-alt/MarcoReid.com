interface SkeletonProps {
  className?: string;
  rounded?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  /** Render an inline-block instead of block. */
  inline?: boolean;
}

const roundedMap: Record<NonNullable<SkeletonProps["rounded"]>, string> = {
  sm: "rounded",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  full: "rounded-full",
};

/**
 * Skeleton — a calm shimmer placeholder for loading states.
 * Default block element; pass `inline` to flow inside text.
 */
export default function Skeleton({
  className = "",
  rounded = "md",
  inline = false,
}: SkeletonProps) {
  const display = inline ? "inline-block align-middle" : "block";
  return (
    <span
      aria-hidden="true"
      className={`${display} ${roundedMap[rounded]} animate-pulse bg-navy-100 ${className}`}
    />
  );
}

export function SkeletonText({
  lines = 3,
  className = "",
}: {
  lines?: number;
  className?: string;
}) {
  return (
    <div className={`space-y-2 ${className}`} aria-hidden="true">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={`h-3 ${i === lines - 1 ? "w-2/3" : "w-full"}`}
        />
      ))}
    </div>
  );
}

export function SkeletonRow() {
  return (
    <div
      className="flex items-center gap-4 border-b border-navy-50 px-6 py-4 last:border-0"
      aria-hidden="true"
    >
      <Skeleton className="h-10 w-10" rounded="lg" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-3 w-1/3" />
        <Skeleton className="h-3 w-1/2" />
      </div>
      <Skeleton className="h-3 w-16" />
      <Skeleton className="h-3 w-20" />
    </div>
  );
}
