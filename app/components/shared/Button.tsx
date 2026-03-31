import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  href?: string;
  className?: string;
}

const variants = {
  primary:
    "bg-navy-500 text-white hover:bg-navy-600 focus-visible:ring-navy-500",
  secondary:
    "bg-forest-500 text-white hover:bg-forest-600 focus-visible:ring-forest-500",
  outline:
    "border-2 border-navy-500 text-navy-500 hover:bg-navy-50 focus-visible:ring-navy-500",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  className = "",
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center min-h-touch min-w-touch rounded-lg font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return <button className={classes}>{children}</button>;
}
