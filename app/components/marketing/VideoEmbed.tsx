import Reveal from "@/app/components/effects/Reveal";

interface VideoEmbedProps {
  title: string;
  description: string;
  accentColor?: "navy" | "forest" | "plum";
}

export default function VideoEmbed({
  title,
  description,
  accentColor = "navy",
}: VideoEmbedProps) {
  const accentBg = {
    navy: "bg-navy-50",
    forest: "bg-forest-50",
    plum: "bg-plum-50",
  }[accentColor];

  const accentText = {
    navy: "text-navy-500",
    forest: "text-forest-500",
    plum: "text-plum-500",
  }[accentColor];

  return (
    <section className="py-16 sm:py-24" aria-label={title}>
      <div className="mx-auto max-w-4xl px-6 sm:px-8 lg:px-12">
        <Reveal>
          <div className={`overflow-hidden rounded-2xl ${accentBg}`}>
            {/* Video placeholder — 16:9 aspect ratio */}
            <div className="relative aspect-video w-full bg-navy-800">
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                {/* Play button */}
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-transform duration-200 hover:scale-110">
                  <svg
                    className="ml-1 h-6 w-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p className={`mt-4 text-sm font-semibold text-white/80`}>
                  Watch the demo
                </p>
              </div>
            </div>
            <div className="p-6 sm:p-8">
              <h3 className={`font-serif text-lg ${accentText}`}>{title}</h3>
              <p className="mt-2 text-sm text-navy-400">{description}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
