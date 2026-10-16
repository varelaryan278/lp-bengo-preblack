import Image from "next/image";
import { ArrowUpRightIcon } from "lucide-react";
import { PRESS } from "@/lib/press";
import { Reveal } from "./Reveal";

const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00-03:00`).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

export const Press = () => (
  <section className="py-16 sm:py-24">
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-verde">
          Na mídia
        </p>
        <h2 className="mx-auto mt-3 max-w-3xl font-display text-3xl font-bold uppercase leading-tight sm:text-5xl">
          Projeção de <span className="text-verde">R$ 146 milhões</span> em 2026
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-white/60">
          Estimativa de faturamento da rede para 2026, divulgada pela própria
          Bengô Açaí e repercutida na imprensa.
        </p>
      </div>

      <div className="mt-10 grid gap-3 md:grid-cols-3">
        {PRESS.map((item, i) => (
          <Reveal key={item.url} delay={i * 120}>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-noite-2 transition hover:-translate-y-1 hover:border-verde/40"
            >
              <div className="relative aspect-[3/2] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-noite-2 via-transparent to-transparent" />
                <span className="absolute bottom-2 right-2 rounded bg-noite/70 px-1.5 py-0.5 text-[10px] text-white/60">
                  Foto: {item.credit}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center justify-between gap-2 text-xs uppercase tracking-wider text-white/50">
                  <span className="font-semibold text-verde">
                    {item.outlet}
                  </span>
                  <time dateTime={item.date}>{formatDate(item.date)}</time>
                </div>
                <p className="mt-3 flex-1 font-display text-lg font-semibold leading-snug">
                  {item.title}
                </p>
                <span className="mt-4 flex items-center gap-1 text-sm text-white/60 transition group-hover:text-verde">
                  Ler matéria <ArrowUpRightIcon className="size-4" />
                </span>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
