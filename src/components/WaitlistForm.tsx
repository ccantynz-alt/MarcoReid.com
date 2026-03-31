"use client";

export default function WaitlistForm() {
  return (
    <form
      className="mt-10 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="email"
        placeholder="you@yourfirm.com"
        className="flex-1 rounded-lg border border-white/10 bg-navy-light/50 px-4 py-3 text-sm text-white placeholder:text-slate focus:outline-none focus:border-gold/50 transition-colors"
        required
      />
      <button
        type="submit"
        className="rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-navy hover:bg-gold-light transition-colors whitespace-nowrap"
      >
        Join Waitlist
      </button>
    </form>
  );
}
