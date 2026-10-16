import Image from "next/image";
import { Reveal } from "./Reveal";

const photos = [
  { src: "/images/loja-fachada-768.webp", alt: "Fachada de loja Bengô Açaí" },
  { src: "/images/loja-salao-768.webp", alt: "Salão de loja Bengô Açaí" },
  { src: "/images/loja-balcao-768.webp", alt: "Balcão de açaí Bengô" },
  { src: "/images/loja-jardim-768.webp", alt: "Ambiente com jardim em loja Bengô" },
];

export const Stores = () => (
  <section className="bg-noite-2 py-16 sm:py-24">
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-verde">Padrão Bengô</p>
          <h2 className="mt-3 max-w-xl font-display text-3xl font-bold uppercase leading-tight sm:text-5xl">
            Sua loja pode ser a <span className="text-verde">próxima</span>
          </h2>
        </div>
        <p className="max-w-sm text-white/60">
          Projeto arquitetônico, mobiliário, enxoval e marketing de inauguração já inclusos no investimento.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
        {photos.map((p, i) => (
          <Reveal key={p.src} delay={i * 120}>
            <div className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10">
              <Image src={p.src} alt={p.alt} fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover transition duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-roxo/60 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
