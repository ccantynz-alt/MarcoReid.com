import type { Metadata } from "next";
import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";
import Reveal from "@/app/components/effects/Reveal";
import SchemaMarkup from "@/app/components/shared/SchemaMarkup";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title:
    "AlecRae Community — Where Legal and Accounting Professionals Come Home",
  description:
    "A private, verified professional network exclusively for attorneys, lawyers, and accountants on AlecRae. Referrals, mentorship, practice area channels, and cross-border connections. The community that keeps professionals thriving.",
};

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "AlecRae Community",
  description:
    "Private professional network for verified legal and accounting professionals.",
  url: `${BRAND.url}/community`,
};

const features = [
  {
    title: "Verified professionals only",
    desc: "Every member has verified credentials \u2014 bar number, CPA licence, jurisdiction of admission. No anonymous accounts. No fake profiles. No noise. You know everyone in the room is a peer.",
    badge: "Trust",
  },
  {
    title: "Practice area channels",
    desc: "Immigration, corporate, tax, IP, family, criminal, audit, advisory \u2014 join the channels that match your work. Cross-discipline channels like \u201CLegal + Tax\u201D and \u201CIP + Corporate\u201D connect professionals who need each other.",
    badge: "Connect",
  },
  {
    title: "Referral network",
    desc: "A lawyer in Auckland gets a US tax question. They post in the community. Qualified CPAs get notified. The lawyer selects one, invites them to the shared matter. Both bill through the platform. Both earn. Every referral creates a connection that lasts.",
    badge: "Earn",
  },
  {
    title: "The Oracle in every conversation",
    desc: "Mid-discussion, someone asks a complex tax question. Hit \u2318K. The Oracle answers with verified citations. Right there in the thread. No switching tabs. No leaving the conversation. AI research embedded in the community.",
    badge: "Research",
  },
  {
    title: "Discussion forums",
    desc: "Long-form professional discussions. Case law analysis. Regulatory updates. Practice management. Technology adoption. Like a private, verified Reddit for professionals who actually know what they\u2019re talking about.",
    badge: "Learn",
  },
  {
    title: "Mentorship programme",
    desc: "Senior attorneys and CPAs mentor the next generation. Young professionals get paired with experienced practitioners. Mentors build reputation. Mentees get guidance. Both stay in the profession. Both stay on AlecRae.",
    badge: "Grow",
  },
  {
    title: "Events and CLE/CPD credits",
    desc: "Virtual meetups by practice area. Guest speakers \u2014 judges, regulators, industry leaders. Continuing education credits tracked automatically. Stay current. Stay connected. Stay engaged.",
    badge: "Develop",
  },
  {
    title: "Local and global communities",
    desc: "Auckland lawyers. Sydney CPAs. New York immigration attorneys. London corporate counsel. Local groups for meetups. Global channels for cross-border expertise. Your people, everywhere.",
    badge: "Belong",
  },
];

const referralSteps = [
  {
    step: "01",
    title: "A client needs help across borders",
    desc: "Your client in Auckland needs a US-qualified CPA for a cross-border corporate restructuring. You don\u2019t know one. On any other platform, you\u2019re stuck.",
  },
  {
    step: "02",
    title: "Post in the community",
    desc: "You post in the \u201CLegal + Tax\u201D channel: \u201CNeed a US-qualified CPA for NZ \u2192 US corporate restructuring.\u201D CPAs who match that profile get notified instantly.",
  },
  {
    step: "03",
    title: "Connect and collaborate",
    desc: "You select a CPA. Invite them to the shared matter inside AlecRae. Both of you see the same AI analysis. Both work on the same case. Both bill through the platform.",
  },
  {
    step: "04",
    title: "Both earn. Client wins.",
    desc: "The CPA earns. You earn. Your client gets a coordinated legal and tax strategy from professionals who are working together on one platform. Everyone wins.",
  },
  {
    step: "05",
    title: "The relationship lasts",
    desc: "Next time that CPA has a client who needs a NZ lawyer \u2014 they refer to you. The referral network compounds. The more you give, the more comes back. That\u2019s the flywheel.",
  },
];

export default function CommunityPage() {
  return (
    <>
      <SchemaMarkup schema={schema} />

      {/* Hero */}
      <section className="bg-navy-500 pt-32 pb-20 sm:pt-40 sm:pb-28">
        <Container className="text-center">
          <Reveal>
            <p className="text-sm font-semibold tracking-wider text-forest-300">
              AlecRae Community
            </p>
            <h1 className="mt-6 font-serif text-hero text-white">
              This is not a platform.
              <br />
              This is home.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-xl text-navy-200">
              A private, verified professional network exclusively for attorneys,
              lawyers, and accountants. Referrals. Mentorship. Practice area channels.
              Cross-border connections. The community where professionals thrive.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10 flex justify-center gap-4">
              <Button href="/pricing" size="lg">
                Join the community
              </Button>
              <Button href="/contact" variant="secondary" size="lg">
                Learn more
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* The problem */}
      <section className="py-24 sm:py-36" aria-label="The problem">
        <Container narrow>
          <Reveal>
            <h2 className="font-serif text-display text-navy-800">
              Every other tool treats you like you&rsquo;re alone.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 text-xl leading-relaxed text-navy-400">
              Westlaw doesn&rsquo;t know that an immigration lawyer in Auckland and a
              tax attorney in New York are working on the same type of matter.
              Clio doesn&rsquo;t connect attorneys who could refer work to each other.
              QuickBooks doesn&rsquo;t know that two CPAs in Sydney specialise in the
              same industry. Every professional on every platform is isolated.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 text-xl leading-relaxed text-navy-400">
              That changes here. AlecRae Community is where legal and accounting
              professionals find each other, help each other, refer work to each
              other, and build careers together. Not on LinkedIn where anyone can
              claim to be anything. Here, everyone is verified. Everyone is real.
              Everyone is a peer.
            </p>
          </Reveal>
        </Container>
      </section>

      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        <div className="h-px bg-navy-100" />
      </div>

      {/* Features */}
      <section className="py-24 sm:py-36" aria-label="Features">
        <Container>
          <Reveal>
            <h2 className="font-serif text-display text-navy-800">
              Everything a professional community needs.
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-navy-400">
              Built into the platform. Not bolted on. Not a separate app.
              The community lives where you work.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-4 sm:grid-cols-2">
            {features.map((f) => (
              <Reveal key={f.title} delay={0.05}>
                <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-semibold text-navy-700">{f.title}</h3>
                    <span className="shrink-0 rounded-full bg-forest-50 px-3 py-1 text-xs font-bold text-forest-600">
                      {f.badge}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-navy-400">
                    {f.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        <div className="h-px bg-navy-100" />
      </div>

      {/* Referral workflow */}
      <section className="py-24 sm:py-36" aria-label="How referrals work">
        <Container>
          <Reveal>
            <h2 className="font-serif text-display text-navy-800">
              How the referral network works.
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-navy-400">
              Every referral creates a connection. Every connection creates more
              referrals. The network compounds. The more you give, the more
              comes back.
            </p>
          </Reveal>

          <div className="mt-16 space-y-4">
            {referralSteps.map((s) => (
              <Reveal key={s.step} delay={0.05}>
                <div className="flex gap-6 rounded-xl border border-navy-100 bg-white p-6 shadow-card">
                  <span className="text-4xl font-bold text-forest-500/20">
                    {s.step}
                  </span>
                  <div>
                    <h3 className="font-semibold text-navy-700">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-navy-400">
                      {s.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* The emotional moat */}
      <section className="bg-navy-50 py-24 sm:py-36" aria-label="Why this matters">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <div>
                <h2 className="font-serif text-display text-navy-800">
                  Technical features can be copied.
                  <br />
                  Community cannot.
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-navy-400">
                  Once you&rsquo;ve built relationships, earned a reputation, and
                  established a referral network inside AlecRae &mdash; the cost
                  of leaving is not a subscription fee. It&rsquo;s losing your
                  professional community. Your mentors. Your referral partners.
                  Your peers who understand your work.
                </p>
                <p className="mt-4 text-lg leading-relaxed text-navy-400">
                  That&rsquo;s not a lock-in. That&rsquo;s a home.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="space-y-4">
                {[
                  {
                    quote:
                      "I found my best referral partner on AlecRae. A CPA in New York who handles the tax side of every cross-border matter I send her. We\u2019ve done 30 matters together.",
                    role: "Immigration attorney, Auckland",
                  },
                  {
                    quote:
                      "I joined as a solo practitioner with zero connections. The mentorship programme paired me with a partner at a mid-size firm. Six months later, I had a full client list.",
                    role: "Junior attorney, Sydney",
                  },
                  {
                    quote:
                      "The practice area channels are better than any CLE I\u2019ve attended. Real professionals discussing real cases. And The Oracle is right there when someone asks a tricky question.",
                    role: "Corporate counsel, London",
                  },
                ].map((t) => (
                  <div
                    key={t.role}
                    className="rounded-xl border border-navy-100 bg-white p-5 shadow-card"
                  >
                    <p className="text-sm italic leading-relaxed text-navy-500">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <p className="mt-3 text-xs font-semibold text-navy-400">
                      &mdash; {t.role}
                    </p>
                  </div>
                ))}
                <p className="text-xs text-navy-300">
                  Testimonials represent anticipated user experiences. AlecRae Community is launching in 2026.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* AlecRae Careers */}
      <section className="py-24 sm:py-36" aria-label="Careers">
        <Container>
          <Reveal>
            <p className="text-sm font-semibold tracking-wider text-forest-600">
              AlecRae Careers
            </p>
            <h2 className="mt-4 font-serif text-display text-navy-800">
              Your first job. Found here.
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-navy-400">
              Law school is over. Accounting exams are done. Now what? Apply to 200
              firms and hear nothing? Pay for job boards that don&rsquo;t understand your
              specialisation? Network on LinkedIn where nobody replies?
            </p>
          </Reveal>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Free for graduates",
                desc: "Create a profile with your school, specialisation, languages, and interests. You pay nothing. Ever. Not until you\u2019re employed and earning. The firm pays the placement fee \u2014 not you.",
              },
              {
                title: "AI-powered matching",
                desc: "AlecRae knows which firms are overloaded. It tracks their matter volume, active cases, and workload patterns. When a firm needs an immigration specialist and you\u2019re one \u2014 the match is automatic.",
              },
              {
                title: "80% cheaper than recruiters",
                desc: "Legal recruiters charge 20\u201330% of first-year salary. That\u2019s $15,000\u2013$40,000 per hire. AlecRae placement fees are a fraction of that. Firms save. Graduates get hired. Everyone wins.",
              },
              {
                title: "Mentorship from day one",
                desc: "Get paired with a senior practitioner in your interest area before you even start your first job. Learn the real practice of law or accounting from someone who does it every day.",
              },
              {
                title: "Already trained on the tools",
                desc: "You\u2019ve been using AlecRae since university. You know the platform. You know The Oracle. You know Voice. When you walk into your first firm, you\u2019re productive on day one.",
              },
              {
                title: "A career, not just a job",
                desc: "Graduate \u2192 junior \u2192 mid-level \u2192 senior \u2192 mentor. Every stage happens on AlecRae. Your reputation grows with every contribution. Your referral network compounds. The community is your career.",
              },
            ].map((item) => (
              <Reveal key={item.title} delay={0.05}>
                <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5">
                  <h3 className="font-semibold text-navy-700">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy-400">
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        <div className="h-px bg-navy-100" />
      </div>

      {/* University partnerships */}
      <section className="bg-navy-50 py-24 sm:py-36" aria-label="Universities">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <div>
                <p className="text-sm font-semibold tracking-wider text-forest-600">
                  University Partnerships
                </p>
                <h2 className="mt-4 font-serif text-display text-navy-800">
                  Learn on the platform you&rsquo;ll use for your career.
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-navy-400">
                  We partner directly with law schools and accounting programmes.
                  Students learn on AlecRae during their studies. They graduate
                  already knowing the platform, already having a community profile,
                  already connected to potential employers.
                </p>
                <p className="mt-4 text-lg leading-relaxed text-navy-400">
                  When they start their first job, there&rsquo;s zero onboarding
                  friction. They&rsquo;re productive from hour one. That&rsquo;s value
                  for the firm. That&rsquo;s confidence for the graduate.
                  That&rsquo;s the pipeline that feeds both sides of the marketplace
                  forever.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="grid grid-cols-2 gap-3">
                {[
                  "Auckland University",
                  "Victoria University Wellington",
                  "University of Sydney",
                  "Melbourne University",
                  "Columbia Law School",
                  "Georgetown Law",
                  "NYU School of Law",
                  "London School of Economics",
                ].map((uni) => (
                  <div
                    key={uni}
                    className="rounded-xl border border-navy-100 bg-white p-4 text-center shadow-card"
                  >
                    <p className="text-sm font-medium text-navy-600">{uni}</p>
                    <p className="mt-1 text-xs text-navy-400">Target partner</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* For the next generation */}
      <section className="py-24 sm:py-36" aria-label="Next generation">
        <Container narrow>
          <Reveal>
            <h2 className="font-serif text-display text-navy-800">
              For the next generation.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 text-xl leading-relaxed text-navy-400">
              300,000 accountants left the profession since 2020. Young lawyers are
              burning out before 30. They didn&rsquo;t leave because the work was hard.
              They left because they felt alone, overwhelmed, and unsupported.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 text-xl leading-relaxed text-navy-400">
              The AlecRae Community gives the next generation something no other
              platform offers: a place to belong. Mentors who care. Peers who
              understand. A first job found through AI matching, not cold applications.
              A career that starts on the platform and grows with every year.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 text-xl font-medium leading-relaxed text-navy-700">
              A law graduate with $100,000 in student debt and zero connections gets a
              free account, a mentor, AI research tools, direct visibility to firms
              that need exactly their skills, and a job. That is hope. That is real.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-navy-500 py-24 sm:py-36">
        <Container className="text-center">
          <Reveal>
            <h2 className="font-serif text-display text-white">
              Come home.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-xl text-navy-200">
              Join the only professional network built exclusively for verified
              legal and accounting professionals. Referrals. Mentorship. Community.
              All inside the platform where you already work.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10 flex justify-center gap-4">
              <Button href="/pricing" size="lg">
                Join AlecRae
              </Button>
              <Button href="/services" variant="secondary" size="lg">
                Explore services
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
