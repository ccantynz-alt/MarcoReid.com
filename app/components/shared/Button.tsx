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
    "bg-navy-500 text-white hover:bg-navy-600 shadow-sm hover:shadow-md focus-visible:ring-navy-500 dark:bg-navy-500 dark:hover:bg-navy-400",
  secondary:
    "bg-forest-500 text-white hover:bg-forest-600 shadow-sm hover:shadow-md focus-visible:ring-forest-500 dark:bg-forest-600 dark:hover:bg-forest-500",
  ghost:
    "text-navy-500 hover:text-navy-700 focus-visible:ring-navy-500 dark:text-navy-300 dark:hover:text-white",
};

const sizes = {
  sm: "px-5 py-2.5 text-sm",
  md: "px-7 py-3 text-sm",
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
    variant === "ghost"
      ? "inline-flex items-center min-h-touch font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
      : "inline-flex items-center justify-center min-h-touch rounded-lg font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

  const classes = `${base} ${variants[variant]} ${variant !== "ghost" ? sizes[size] : ""} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return <button className={classes}>{children}</button>;
}
