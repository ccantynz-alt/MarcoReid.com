import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "text";
  size?: "sm" | "md" | "lg";
  href?: string;
  className?: string;
}

const variants = {
  primary:
    "bg-neutral-950 text-white hover:bg-neutral-800 focus-visible:ring-neutral-950",
  secondary:
    "bg-neutral-200 text-neutral-950 hover:bg-neutral-300 focus-visible:ring-neutral-400",
  text: "text-accent hover:opacity-80 focus-visible:ring-accent",
};

const sizes = {
  sm: "px-5 py-2.5 text-sm",
  md: "px-7 py-3.5 text-base",
  lg: "px-9 py-4 text-lg",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  className = "",
}: ButtonProps) {
  const base =
    variant === "text"
      ? "inline-flex items-center min-h-touch font-medium transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
      : "inline-flex items-center justify-center min-h-touch rounded-full font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

  const classes = `${base} ${variants[variant]} ${variant !== "text" ? sizes[size] : ""} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return <button className={classes}>{children}</button>;
}
