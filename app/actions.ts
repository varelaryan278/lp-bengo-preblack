"use server";

import { isValidPhoneNumber } from "react-phone-number-input";
import { WHATSAPP_GROUP_URL } from "@/lib/event";

export type LeadState = {
  ok: boolean;
  error?: string;
  groupUrl?: string;
};

const clean = (value: FormDataEntryValue | null) => String(value ?? "").trim();

export const submitLead = async (_prev: LeadState, formData: FormData): Promise<LeadState> => {
  const nome = clean(formData.get("nome"));
  const telefone = clean(formData.get("telefone"));
  const cidade = clean(formData.get("cidade"));

  if (nome.length < 3) return { ok: false, error: "Informe seu nome completo." };
  if (!isValidPhoneNumber(telefone)) return { ok: false, error: "Informe um WhatsApp válido com DDD." };
  if (cidade.length < 2) return { ok: false, error: "Selecione sua cidade." };

  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (webhook) {
    await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, telefone, cidade, origem: "lp-pre-black", data: new Date().toISOString() }),
    }).catch(() => null);
  }

  return { ok: true, groupUrl: WHATSAPP_GROUP_URL };
};
