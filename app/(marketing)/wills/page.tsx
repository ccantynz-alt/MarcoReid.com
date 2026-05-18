import type { Metadata } from "next";
import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
import Reveal from "@/app/components/effects/Reveal";

export const metadata: Metadata = {
  title: "Wills register & estate planning",
  description:
    "Searchable will register for firms holding wills in safe custody. Find a will when the testator dies, track supersessions, link to the matter, encrypt the document at rest.",
};

const features = [
  { title: "Searchable register", body: "Find a will by testator name, date of birth, will date, or storage reference. Even the partner who took instructions ten years ago can be retired." },
  { title: "Storage tracking", body: "Where the will lives. Safe Custody, Off-site Vault, Client Held. Reference number per location. No more 'we think it's in the green safe.'" },
  { title: "Supersession chain", body: "Each new will marks the prior one superseded automatically. Read the chronology of every testator's testamentary plan in one view." },
  { title: "Executors and beneficiaries summary", body: "Top-line structured data so you can answer 'who are the executors?' without unsealing the document. The full will stays encrypted at rest." },
  { title: "Cross-links to matters", body: "Estate-administration matters opened on the testator's death surface the will register record automatically. No hunt." },
  { title: "Annual review prompts", body: "Wills more than seven years old surface for an annual review prompt. The dashboard tells the partner which clients to call this month." },
];

export default function WillsPage() {
  return (
    <>
      <section className="bg-navy-500 pt-32 pb-20 sm:pt-40">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">
              Wills register
            </p>
            <h1 className="mt-6 font-serif text-hero text-white">
              Find any will. Without unsealing the safe.
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-white/90">
              Wills in safe custody is high-trust work and high-frequency at
              the moment of death — when a family member rings the firm at
              eight in the evening. Marco Reid keeps a searchable, encrypted
              register so the partner on call can confirm what the firm holds
              and where it is, in seconds.
            </p>
            <div className="mt-10">
              <Button href="/trial" variant="gold" size="lg">
                Try the register &rarr;
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <Reveal>
            <h2 className="text-center font-serif text-display text-navy-800">
              The register.
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <Reveal key={f.title} delay={0.05}>
                <div className="flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5">
                  <h3 className="font-serif text-lg text-navy-800">{f.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy-500">{f.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-navy-50 py-20 sm:py-28">
        <Container narrow>
          <Reveal>
            <h2 className="font-serif text-display text-navy-800">
              Privacy and storage.
            </h2>
          </Reveal>
          <p className="mt-4 text-lg text-navy-500">
            The will document itself is held encrypted at rest in your firm's
            data-residency region. Only the testator and the partner of record
            can open it. The register surfaces only the metadata needed to
            find and identify the will, never the substantive contents.
          </p>
          <p className="mt-4 text-sm text-navy-400">
            See the <a className="font-semibold text-navy-600 hover:text-navy-800" href="/data-residency">data-residency page</a> for where your firm's wills are physically stored.
          </p>
        </Container>
      </section>
    </>
  );
}
