import Image from "next/image";
import { Reveal } from "./Reveal";
import { LIVE_LABEL } from "@/lib/event";

export const FinalCta = () => (
  <section className="relative isolate overflow-hidden py-20 sm:py-28">
    <div className="absolute inset-0 -z-10 bg-gradient-to-br from-roxo via-noite to-noite" />
    <Image
      src="/images/simbolo-bengo.png"
      alt=""
      width={128}
      height={128}
      className="animate-float absolute -right-16 -top-10 -z-10 h-auto w-72 opacity-10 sm:w-96"
    />
    <Reveal className="mx-auto max-w-3xl px-4 text-center sm:px-6">
      <h2 className="font-display text-4xl font-black uppercase leading-[0.95] sm:text-6xl">
        A Black é ao vivo.
        <br />
        <span className="text-verde">O acesso é pelo grupo.</span>
      </h2>
      <p className="mx-auto mt-6 max-w-xl text-lg text-white/75">
        Live exclusiva em {LIVE_LABEL}. Entre agora para não perder o link e a condição liberada só durante a transmissão.
      </p>
      <a
        href="#inscricao"
        className="btn-shine animate-pulse-ring mt-10 inline-flex items-center justify-center rounded-xl bg-verde px-10 py-5 font-display text-lg font-bold uppercase tracking-wide text-noite transition hover:bg-verde-claro"
      >
        Quero minha vaga no grupo
      </a>
    </Reveal>
  </section>
);
