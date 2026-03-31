interface CardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}

export default function Card({
  children,
  className = "",
  glow = false,
}: CardProps) {
  return (
    <div className={`${glow ? "card-glow" : "card-dark"} ${className}`}>
      {children}
    </div>
  );
}
