import { Reveal } from "./Reveal";

const steps = [
  {
    n: "01",
    title: "Entre no grupo VIP",
    text: "Preencha o formulário e entre no grupo de WhatsApp da Pré-Black. É a única porta de entrada.",
  },
  {
    n: "02",
    title: "Receba o link da live",
    text: "O acesso à live exclusiva é enviado somente para quem está no grupo. Não vai ter link público.",
  },
  {
    n: "03",
    title: "Garanta a condição Black",
    text: "Durante a live liberamos uma condição de franquia que nunca foi aberta, com vagas limitadas por região.",
  },
];

export const WhyJoin = () => (
  <section className="relative border-y border-white/5 bg-noite-2 py-16 sm:py-24">
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <Reveal>
        <p className="text-sm font-semibold uppercase tracking-widest text-verde">Como funciona</p>
        <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold uppercase leading-tight sm:text-5xl">
          Quem não estiver no grupo <span className="text-verde">fica de fora</span>
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {steps.map((s, i) => (
          <Reveal key={s.n} delay={i * 150}>
            <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-roxo/30 to-transparent p-6 transition duration-300 hover:-translate-y-2 hover:border-verde/50 hover:shadow-2xl hover:shadow-verde/10 sm:p-8">
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-verde/0 blur-2xl transition duration-500 group-hover:bg-verde/20" />
              <span className="font-display text-6xl font-black text-white/10 transition group-hover:text-verde/40">{s.n}</span>
              <h3 className="mt-2 font-display text-xl font-bold uppercase">{s.title}</h3>
              <p className="mt-2 leading-relaxed text-white/70">{s.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
