interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-navy-100 bg-white p-6 sm:p-8 ${className}`}
    >
      {children}
    </div>
  );
}
