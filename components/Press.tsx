import Image from "next/image";
import { Reveal } from "./Reveal";

export const Press = () => (
  <section className="py-16 sm:py-24">
    <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-widest text-verde">Na mídia</p>
      <h2 className="mx-auto mt-3 max-w-2xl font-display text-3xl font-bold uppercase leading-tight sm:text-5xl">
        R$ 31 milhões de faturamento na rede
      </h2>
      <Reveal className="relative mx-auto mt-10 max-w-4xl">
        <div className="absolute inset-x-10 inset-y-10 -z-10 rounded-full bg-roxo/40 blur-3xl" />
        <Image
          src="/images/reportagens-1024.png"
          alt="Reportagens sobre a Bengô Açaí no g1, PEGN, Imirante e O Norte"
          width={1024}
          height={576}
          sizes="(min-width: 1024px) 896px, 100vw"
          className="h-auto w-full"
        />
      </Reveal>
    </div>
  </section>
);
