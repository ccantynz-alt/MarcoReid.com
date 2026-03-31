import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  className?: string;
}

const variants = {
  primary:
    "bg-white text-surface font-semibold hover:bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.25)] focus-visible:ring-white",
  secondary:
    "bg-surface-overlay text-text-primary border border-surface-border hover:border-surface-border-light hover:bg-surface-subtle focus-visible:ring-white/50",
  ghost:
    "text-text-secondary hover:text-text-primary focus-visible:ring-white/50",
};

const sizes = {
  sm: "px-5 py-2.5 text-sm",
  md: "px-7 py-3.5 text-sm",
  lg: "px-9 py-4 text-base",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  className = "",
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center min-h-touch rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-surface";

  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return <button className={classes}>{children}</button>;
}
