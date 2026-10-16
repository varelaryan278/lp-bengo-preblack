import Image from "next/image";

type Props = { done: boolean; groupUrl?: string };

export const RedirectOverlay = ({ done, groupUrl }: Props) => (
  <div
    role="status"
    aria-live="polite"
    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-noite/95 px-6 text-center backdrop-blur-md animate-in fade-in-0 duration-300"
  >
    <div className="animate-glow absolute h-80 w-80 rounded-full bg-roxo/50 blur-3xl" />

    <div className="relative flex size-28 items-center justify-center">
      <span className="absolute inset-0 animate-spin rounded-full border-4 border-white/10 border-t-verde [animation-duration:900ms]" />
      <span className="absolute inset-3 animate-spin rounded-full border-4 border-transparent border-b-roxo-claro [animation-direction:reverse] [animation-duration:1400ms]" />
      <Image src="/images/simbolo-bengo.png" alt="" width={128} height={128} className="animate-float relative w-12" />
    </div>

    <p className="relative mt-8 font-display text-2xl font-black uppercase sm:text-3xl">
      {done ? (
        <>
          Vaga <span className="text-verde">garantida!</span>
        </>
      ) : (
        <>
          Garantindo sua <span className="text-verde">vaga...</span>
        </>
      )}
    </p>
    <p className="relative mt-2 max-w-sm text-white/70">
      {done ? "Abrindo o grupo VIP no WhatsApp." : "Só um instante, estamos registrando sua inscrição."}
    </p>

    {done && groupUrl && (
      <a
        href={groupUrl}
        className="btn-shine relative mt-8 inline-flex items-center justify-center rounded-xl bg-verde px-8 py-4 font-display text-lg font-bold uppercase tracking-wide text-noite transition hover:bg-verde-claro"
      >
        Não abriu? Toque aqui
      </a>
    )}
  </div>
);
