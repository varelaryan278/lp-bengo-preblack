import Image from "next/image";
import { ArrowUpRightIcon } from "lucide-react";
import { PRESS } from "@/lib/press";
import { Reveal } from "./Reveal";

const formatDate = (iso: string) => new Date(`${iso}T12:00:00-03:00`).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });

export const Press = () => (
  <section className="py-16 sm:py-24">
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-verde">Na mídia</p>
        <h2 className="mx-auto mt-3 max-w-3xl font-display text-3xl font-bold uppercase leading-tight sm:text-5xl">
          Projeção de <span className="text-verde">R$ 146 milhões</span> em 2026
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-white/60">
          Estimativa de faturamento da rede para 2026, divulgada pela própria Bengô Açaí e repercutida na imprensa.
        </p>
      </div>

      <div className="mt-10 grid gap-3 md:grid-cols-3">
        {PRESS.map((item, i) => (
          <Reveal key={item.url} delay={i * 120}>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col rounded-2xl border border-white/10 bg-noite-2 p-5 transition hover:-translate-y-1 hover:border-verde/40"
            >
              <div className="flex items-center justify-between gap-2 text-xs uppercase tracking-wider text-white/50">
                <span className="font-semibold text-verde">{item.outlet}</span>
                <time dateTime={item.date}>{formatDate(item.date)}</time>
              </div>
              <p className="mt-3 flex-1 font-display text-lg font-semibold leading-snug">{item.title}</p>
              <span className="mt-4 flex items-center gap-1 text-sm text-white/60 transition group-hover:text-verde">
                Ler matéria <ArrowUpRightIcon className="size-4" />
              </span>
            </a>
          </Reveal>
        ))}
      </div>

      <Reveal className="relative mx-auto mt-14 max-w-4xl">
        <p className="mb-4 text-center text-sm font-semibold uppercase tracking-widest text-white/50">Reportagens anteriores</p>
        <div className="absolute inset-x-10 inset-y-10 -z-10 rounded-full bg-roxo/40 blur-3xl" />
        <Image
          src="/images/reportagens-1024.png"
          alt="Reportagens anteriores sobre a Bengô Açaí no g1, PEGN, Imirante e O Norte"
          width={1024}
          height={576}
          sizes="(min-width: 1024px) 896px, 100vw"
          className="h-auto w-full"
        />
      </Reveal>
    </div>
  </section>
);
