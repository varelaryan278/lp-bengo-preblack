import Image from "next/image";
import { CountUp } from "./CountUp";
import { Reveal } from "./Reveal";

const stats = [
  { to: 140, prefix: "+", suffix: "", label: "lojas vendidas" },
  { to: 10, prefix: "", suffix: "", label: "estados com presença" },
  { to: 80, prefix: "R$ ", suffix: " mil", label: "faturamento médio mensal por loja*" },
  { to: 25, prefix: "até ", suffix: "%", label: "de margem de lucro*" },
];

export const Numbers = () => (
  <section className="relative overflow-hidden py-16 sm:py-24">
    <div className="animate-glow absolute -right-40 top-0 -z-10 h-[500px] w-[500px] rounded-full bg-roxo/40 blur-3xl" />
    <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
      <div>
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-widest text-verde">Por que Bengô</p>
          <h2 className="mt-3 font-display text-3xl font-bold uppercase leading-tight sm:text-5xl">
            Uma rede que <span className="text-verde">não para de crescer</span>
          </h2>
          <p className="mt-4 max-w-lg text-lg text-white/70">
            Fabricação e logística próprias, mais de 40 acompanhamentos exclusivos e suporte completo do ponto à inauguração. Entre as 100
            melhores franquias do Brasil (PEGN 2025).
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-3">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 120}>
              <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:-translate-y-1 hover:border-verde/40">
                <p className="font-display text-3xl font-black tabular-nums text-verde sm:text-4xl">
                  <CountUp to={s.to} prefix={s.prefix} suffix={s.suffix} />
                </p>
                <p className="mt-1 text-sm text-white/60">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <Reveal delay={200} className="relative mx-auto w-full max-w-lg">
        <Image
          src="/images/mapa-brasil-964.png"
          alt="Mapa do Brasil com a presença da Bengô Açaí"
          width={964}
          height={1024}
          sizes="(min-width: 1024px) 512px, 90vw"
          className="h-auto w-full [filter:invert(0.88)_hue-rotate(235deg)_saturate(2.2)_brightness(1.25)]"
        />
      </Reveal>
    </div>
  </section>
);
