import SettingsNav from "./SettingsNav";

export const metadata = {
  title: "Settings",
};

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-6xl px-6 py-10 sm:px-8 lg:px-12 lg:py-14">
      <header className="mb-8 lg:mb-12">
        <h1 className="font-serif text-4xl text-navy-800 sm:text-5xl">
          Settings
        </h1>
        <p className="mt-2 text-navy-400">
          Manage your account, your firm, and how Marco Reid works for you.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[220px_1fr] lg:gap-12">
        <SettingsNav />
        <section
          aria-label="Settings content"
          className="min-w-0"
        >
          {children}
        </section>
      </div>
    </div>
  );
}
