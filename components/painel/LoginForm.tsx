"use client";

import Image from "next/image";
import { LockIcon } from "lucide-react";
import { useActionState } from "react";
import { login } from "@/app/painel/actions";

export const LoginForm = () => {
  const [state, action, pending] = useActionState(login, {});

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4">
      <div className="animate-glow absolute h-96 w-96 rounded-full bg-roxo/50 blur-3xl" />
      <form action={action} className="border-spin relative w-full max-w-sm rounded-2xl bg-noite-2 p-8 shadow-2xl shadow-roxo/40">
        <Image src="/images/logo-bengo.png" alt="Bengô Açaí" width={150} height={35} className="mx-auto h-auto w-28" />
        <h1 className="mt-6 text-center font-display text-2xl font-black uppercase">
          Painel <span className="text-verde">Pré-Black</span>
        </h1>
        <p className="mt-1 text-center text-sm text-white/50">Acesso restrito</p>

        <label className="mt-6 flex h-[52px] items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 focus-within:border-verde focus-within:ring-2 focus-within:ring-verde/30">
          <LockIcon className="size-4 text-white/40" />
          <input
            name="code"
            type="password"
            required
            autoFocus
            autoComplete="current-password"
            placeholder="Código de acesso"
            className="w-full bg-transparent text-base text-white outline-none placeholder:text-white/40"
          />
        </label>

        {state.error && <p className="mt-3 text-sm font-medium text-red-400">{state.error}</p>}

        <button
          type="submit"
          disabled={pending}
          className="btn-shine mt-5 w-full rounded-xl bg-verde py-4 font-display text-base font-bold uppercase tracking-wide text-noite transition hover:bg-verde-claro disabled:opacity-60"
        >
          {pending ? "Verificando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
};
