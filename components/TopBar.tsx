import { LIVE_LABEL } from "@/lib/event";

const items = [
  "Pré-Black Bengô Açaí",
  `Live exclusiva · ${LIVE_LABEL}`,
  "Condição nunca liberada",
  "Acesso só pelo grupo VIP",
  "Vagas limitadas por região",
];

export const TopBar = () => (
  <div className="overflow-hidden border-b border-verde/30 bg-verde text-noite">
    <div className="animate-marquee flex w-max gap-10 py-2 font-display text-sm font-semibold uppercase tracking-wider">
      {[...items, ...items, ...items, ...items].map((item, i) => (
        <span key={i} className="flex items-center gap-10 whitespace-nowrap">
          {item}
          <span aria-hidden>●</span>
        </span>
      ))}
    </div>
  </div>
);
