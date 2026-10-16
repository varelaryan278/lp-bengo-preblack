const words = ["Pré-Black", "Live exclusiva", "Pré-Black", "Só no grupo"];

const Row = ({ reverse, outline }: { reverse?: boolean; outline?: boolean }) => (
  <div className="flex overflow-hidden">
    <div
      className="animate-marquee flex w-max shrink-0 gap-8 pr-8"
      style={reverse ? { animationDirection: "reverse" } : undefined}
    >
      {[...words, ...words, ...words, ...words].map((w, i) => (
        <span
          key={i}
          className={`whitespace-nowrap font-display text-6xl font-black uppercase italic sm:text-8xl ${
            outline ? "text-outline" : i % 2 ? "text-verde" : "text-white"
          }`}
        >
          {w} <span className="text-roxo-claro">✦</span>
        </span>
      ))}
    </div>
  </div>
);

export const BigMarquee = () => (
  <div aria-hidden className="relative -rotate-2 space-y-2 overflow-hidden border-y border-verde/20 bg-noite py-6 sm:py-8">
    <Row />
    <Row reverse outline />
  </div>
);
