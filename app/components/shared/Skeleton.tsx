interface SkeletonProps {
  className?: string;
  /** Render as a rounded square. Useful for avatars/icons. */
  circle?: boolean;
}

export default function Skeleton({ className = "", circle = false }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse bg-navy-100 ${
        circle ? "rounded-full" : "rounded-md"
      } ${className}`}
    />
  );
}
