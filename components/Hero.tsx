import Image from "next/image";
import { Countdown } from "./Countdown";
import { LeadForm } from "./LeadForm";
import { LIVE_LABEL } from "@/lib/event";

const delay = (ms: number) => ({ animationDelay: `${ms}ms` });

export const Hero = () => (
  <section className="relative isolate overflow-hidden">
    <Image
      src="/images/hero-pote.png"
      alt=""
      fill
      priority
      sizes="100vw"
      className="-z-20 object-cover object-[78%_center] opacity-35 lg:opacity-60"
    />
    <div className="absolute inset-0 -z-10 bg-gradient-to-b from-noite/70 via-noite/85 to-noite lg:bg-gradient-to-r lg:from-noite lg:via-noite/90 lg:to-noite/30" />
    <div className="animate-glow absolute -left-40 top-20 -z-10 h-96 w-96 rounded-full bg-roxo/60 blur-3xl" />
    <div className="animate-glow absolute -bottom-20 right-1/3 -z-10 h-72 w-72 rounded-full bg-verde/20 blur-3xl" style={delay(2500)} />
    <Image
      src="/images/simbolo-bengo.png"
      alt=""
      width={128}
      height={128}
      className="animate-float pointer-events-none absolute right-4 top-6 -z-10 w-16 opacity-60 sm:w-20 lg:left-[46%] lg:right-auto lg:top-16"
    />

    <div className="mx-auto grid max-w-6xl gap-10 px-4 pb-16 pt-8 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-14 lg:pb-24 lg:pt-12">
      <div>
        <div className="animate-rise" style={delay(0)}>
          <Image src="/images/logo-bengo.png" alt="Bengô Açaí" width={150} height={35} priority className="h-auto w-32 sm:w-36" />
        </div>

        <div
          className="animate-rise mt-8 inline-flex items-center gap-2 rounded-full border border-verde/40 bg-verde/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-verde sm:text-sm"
          style={delay(150)}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-verde opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-verde" />
          </span>
          Evento fechado · Live {LIVE_LABEL}
        </div>

        <h1 className="mt-5 font-display text-6xl font-black uppercase leading-[0.88] tracking-tight sm:text-7xl lg:text-8xl">
          <span className="animate-rise block text-white/90" style={delay(300)}>
            Pré
          </span>
          <span className="animate-slam block origin-left text-white" style={delay(550)}>
            Black
          </span>
          <span className="animate-rise block" style={delay(900)}>
            <span className="animate-shimmer bg-gradient-to-r from-verde via-white to-verde bg-clip-text text-transparent">Bengô</span>
          </span>
        </h1>

        <p className="animate-rise mt-6 max-w-xl text-lg leading-relaxed text-white/80 sm:text-xl" style={delay(1100)}>
          A franquia de açaí que mais cresce no Brasil vai abrir, <strong className="text-white">ao vivo e só para o grupo</strong>, a condição
          mais agressiva do ano para novos franqueados.
        </p>

        <div className="animate-rise mt-8" style={delay(1250)}>
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-white/50">A live começa em</p>
          <Countdown />
        </div>
      </div>

      <div className="animate-rise" style={delay(700)}>
        <LeadForm id="inscricao" />
      </div>
    </div>
  </section>
);
