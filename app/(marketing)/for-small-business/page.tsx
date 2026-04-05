import type { Metadata } from "next";
import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
import Reveal from "@/app/components/effects/Reveal";

export const metadata: Metadata = {
  title: "Marco Reid for Small Business \u2014 Legal and Accounting Made Simple",
  description:
    "Find a lawyer. Find an accountant. Get the professional help your business needs. Marco Reid connects small businesses with professionals who use the most advanced tools available.",
};

export default function ForSmallBusinessPage() {
  return (
    <>
      <section className="bg-navy-500 pt-32 pb-20 sm:pt-40 sm:pb-28">
        <Container className="text-center">
          <h1 className="font-serif text-hero text-white">
            Your business deserves
            <br />
            the best professionals.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-xl text-navy-200">
            Marco Reid professionals use the most advanced legal and accounting
            technology ever built. When you work with an Marco Reid professional,
            your business gets the benefit of that intelligence.
          </p>
        </Container>
      </section>

      <section className="py-24 sm:py-36" aria-label="Why Marco Reid professionals">
        <Container>
          <Reveal>
            <h2 className="font-serif text-display text-navy-800">
              Why Marco Reid professionals are different.
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Faster research", desc: "Your lawyer uses The Oracle \u2014 the most advanced legal research AI ever built. That means faster answers, more thorough research, and better outcomes for your matter." },
              { title: "Real-time tax intelligence", desc: "Your accountant works with AI that reads every tax code change in real time. Your CPA never misses a deduction that affects you." },
              { title: "Transparent communication", desc: "Track your matter status, view documents, message your professional, and sign documents through the secure client portal. No more chasing for updates." },
              { title: "Better accuracy", desc: "Every citation and regulation your professional relies on is verified against authoritative public sources. Zero hallucinated case law. Zero fabricated tax rulings." },
              { title: "Lower costs", desc: "When your lawyer saves 15\u201320 hours per week, those savings can be passed to you. Marco Reid professionals are more efficient, which means better value." },
              { title: "One platform", desc: "Your lawyer and accountant can collaborate on your matter inside the same platform. No more information lost between disconnected systems." },
            ].map((f) => (
              <Reveal key={f.title} delay={0.05}>
                <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card">
                  <h3 className="font-semibold text-navy-700">{f.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy-400">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-navy-50 py-24 sm:py-36" aria-label="For professionals">
        <Container className="text-center">
          <Reveal>
            <h2 className="font-serif text-display text-navy-800">
              Are you a professional?
            </h2>
            <p className="mt-4 text-lg text-navy-400">
              Join the platform that gives you your profession back.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10 flex justify-center gap-4">
              <Button href="/law" size="lg">Explore Marco Reid Legal</Button>
              <Button href="/accounting" variant="secondary" size="lg">Explore Accounting</Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
