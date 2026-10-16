"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { Value } from "react-phone-number-input";
import { submitLead, type LeadState } from "@/app/actions";
import { PhoneInput } from "./phone-input";
import { CityCombobox } from "./CityCombobox";
import { RedirectOverlay } from "./RedirectOverlay";
import { appendTrackingContext, track } from "@/lib/tracking";

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/5 h-[52px] px-4 text-base text-white placeholder:text-white/40 outline-none transition focus:border-verde focus:bg-white/10 focus:ring-2 focus:ring-verde/30";

const initialState: LeadState = { ok: false };

export const LeadForm = ({ id }: { id?: string }) => {
  const [state, action, pending] = useActionState(submitLead, initialState);
  const [phone, setPhone] = useState<Value>("" as Value);

  const started = useRef(false);

  useEffect(() => {
    if (!state.ok || !state.groupUrl) return;
    track("redirect");
    window.location.href = state.groupUrl;
  }, [state]);

  const submit = (formData: FormData) => {
    appendTrackingContext(formData);
    action(formData);
  };

  const handleFocus = () => {
    if (started.current) return;
    started.current = true;
    track("form_start");
  };

  const showOverlay = pending || state.ok;

  return (
    <>
      {showOverlay &&
        createPortal(
          <RedirectOverlay
            done={state.ok && !pending}
            groupUrl={state.groupUrl}
          />,
          document.body,
        )}
      <form
        id={id}
        action={submit}
        onFocus={handleFocus}
        className="border-spin scroll-mt-24 rounded-2xl bg-noite-2 p-6 shadow-2xl shadow-roxo/40 backdrop-blur sm:p-8"
      >
        <p className="font-display text-xl font-bold uppercase leading-tight sm:text-2xl">
          Garanta sua vaga no <span className="text-verde">grupo VIP</span>
        </p>
        <p className="mt-1 text-sm text-white/60">
          O link da live sai só lá dentro.
        </p>

        <div className="mt-6 space-y-3">
          <label className="block">
            <span className="sr-only">Nome</span>
            <input
              name="nome"
              required
              minLength={3}
              autoComplete="name"
              placeholder="Seu nome"
              className={inputClass}
            />
          </label>
          <div>
            <span className="sr-only">WhatsApp</span>
            <input type="hidden" name="telefone" value={phone} />
            <PhoneInput
              defaultCountry="BR"
              value={phone}
              onChange={setPhone}
              placeholder="WhatsApp com DDD"
              autoComplete="tel"
              required
            />
          </div>
          <div>
            <span className="sr-only">Cidade</span>
            <CityCombobox name="cidade" />
          </div>
        </div>

        {state.error && (
          <p className="mt-3 text-sm font-medium text-red-400">{state.error}</p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="btn-shine animate-pulse-ring mt-5 w-full rounded-xl bg-verde px-6 py-4 font-display text-lg font-bold uppercase tracking-wide text-noite transition hover:bg-verde-claro disabled:opacity-60"
        >
          {pending ? "Enviando..." : "Quero entrar no grupo"}
        </button>

        <p className="mt-3 text-center text-xs text-white/40">
          Ao enviar, você concorda em receber contato da Bengô Açaí sobre a
          franquia. Seus dados não serão compartilhados.
        </p>
      </form>
    </>
  );
};
