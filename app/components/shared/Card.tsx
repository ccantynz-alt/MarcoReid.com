interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`rounded-3xl bg-neutral-200 p-8 sm:p-10 ${className}`}>
      {children}
    </div>
  );
}
