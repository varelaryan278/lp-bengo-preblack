import { GroupLink } from "./GroupLink";

export const GroupCard = ({ id }: { id?: string }) => (
  <div id={id} className="border-spin scroll-mt-24 rounded-2xl bg-noite-2 p-6 shadow-2xl shadow-roxo/40 backdrop-blur sm:p-8">
    <p className="font-display text-xl font-bold uppercase leading-tight sm:text-2xl">
      Garanta sua vaga no <span className="text-verde">grupo VIP</span>
    </p>
    <p className="mt-1 text-sm text-white/60">O link da live sai só lá dentro.</p>

    <GroupLink className="btn-shine animate-pulse-ring mt-6 flex w-full items-center justify-center rounded-xl bg-verde px-6 py-4 font-display text-lg font-bold uppercase tracking-wide text-noite transition hover:bg-verde-claro">
      Quero entrar no grupo
    </GroupLink>
  </div>
);
