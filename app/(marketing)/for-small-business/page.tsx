import type { Metadata } from "next";
import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
import Reveal from "@/app/components/effects/Reveal";

export const metadata: Metadata = {
  title: "Marco Reid for Small Business — Legal and Accounting Made Simple",
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
            technology ever built. When you work with a Marco Reid professional,
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
              { title: "Faster research", desc: "Your lawyer uses Marco — the most advanced legal research AI ever built. That means faster answers, more thorough research, and better outcomes for your matter." },
              { title: "Real-time tax intelligence", desc: "Your accountant works with AI that reads every tax code change in real time. Your CPA never misses a deduction that affects you." },
              { title: "Transparent communication", desc: "Track your matter status, view documents, message your professional, and sign documents through the secure client portal. No more chasing for updates." },
              { title: "Better accuracy", desc: "Every citation and regulation your professional relies on is verified against authoritative public sources. Zero hallucinated case law. Zero fabricated tax rulings." },
              { title: "Lower costs", desc: "When your lawyer saves 15–20 hours per week, those savings can be passed to you. Marco Reid professionals are more efficient, which means better value." },
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

      <section className="py-24 sm:py-36" aria-label="How it works">
        <Container>
          <Reveal>
            <h2 className="font-serif text-display text-navy-800">
              How it works.
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-6 sm:grid-cols-3">
            {[
              { step: "1", title: "Your lawyer or accountant uses Marco Reid", desc: "They work on the most advanced legal and accounting platform ever built. That intelligence benefits you directly." },
              { step: "2", title: "You get a client portal", desc: "Real-time status updates, secure messaging, and document sharing. Everything about your matter in one place." },
              { step: "3", title: "Faster results, lower bills, complete transparency", desc: "When your professional is more efficient, you get better outcomes, better value, and total visibility into your matter." },
            ].map((s) => (
              <Reveal key={s.step} delay={0.05}>
                <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card">
                  <p className="text-xs font-bold text-gold-400">Step {s.step}</p>
                  <h3 className="mt-2 font-semibold text-navy-700">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy-400">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-navy-50 py-20 sm:py-28" aria-label="Testimonial">
        <div className="mx-auto max-w-3xl px-6 sm:px-8 lg:px-12 text-center">
          <Reveal>
            <p className="text-4xl text-gold-400">&ldquo;</p>
            <p className="mt-2 font-serif text-xl italic leading-relaxed text-navy-600">
              My lawyer switched to Marco Reid and my case moved twice as fast. I could see
              everything in the portal — no more chasing updates by phone.
            </p>
            <p className="mt-6 text-sm font-semibold text-navy-700">Rachel Torres</p>
            <p className="text-xs text-navy-400">Small Business Owner</p>
          </Reveal>
        </div>
      </section>

      <section className="py-24 sm:py-36" aria-label="Get in touch">
        <Container className="text-center">
          <Reveal>
            <h2 className="font-serif text-display text-navy-800">
              Ready to find a Marco Reid professional?
            </h2>
            <p className="mt-4 text-lg text-navy-400">
              Connect with a lawyer or accountant who uses the most advanced tools available.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10 flex justify-center gap-4">
              <Button href="/contact" size="lg">Get in touch</Button>
            </div>
          </Reveal>
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
