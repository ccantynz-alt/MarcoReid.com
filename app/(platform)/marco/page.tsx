import MarcoChat from "@/app/components/marco/MarcoChat";

export const metadata = {
  title: "Marco — Marco Reid",
  description:
    "Ask Marco anything. Cross-domain legal and accounting research with verified citations.",
};

export default function MarcoPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12 sm:px-8 lg:px-12">
      <div className="mb-8">
        <h1 className="font-serif text-display text-navy-800">Marco</h1>
        <p className="mt-2 text-lg text-navy-400">
          The greatest AI-generated mind for law and accountancy.
        </p>
      </div>
      <MarcoChat />
    </div>
  );
}
