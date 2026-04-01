"use client";

import { useInView } from "./useInView";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function Reveal({
  children,
  className = "",
  delay = 0,
}: RevealProps) {
  const { ref, isInView } = useInView(0.1);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: isInView ? "translateY(0)" : "translateY(40px)",
        opacity: isInView ? 1 : 0,
        transition: `all 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}
