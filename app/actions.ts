"use server";

import { isValidPhoneNumber } from "libphonenumber-js";
import { headers } from "next/headers";
import { WHATSAPP_GROUP_URL } from "@/lib/event";
import { persistLead, recordInvalid } from "@/lib/leads";

export type LeadState = {
  ok: boolean;
  error?: string;
  groupUrl?: string;
};

const clean = (value: FormDataEntryValue | null) => String(value ?? "").trim();

const detectDevice = (ua: string) => (/iPad|Tablet/i.test(ua) ? "tablet" : /Mobi|Android|iPhone/i.test(ua) ? "mobile" : "desktop");

export const submitLead = async (_prev: LeadState, formData: FormData): Promise<LeadState> => {
  const nome = clean(formData.get("nome"));
  const telefone = clean(formData.get("telefone"));
  const cidade = clean(formData.get("cidade"));

  if (nome.length < 3) {
    await recordInvalid("nome");
    return { ok: false, error: "Informe seu nome completo." };
  }
  if (!isValidPhoneNumber(telefone)) {
    await recordInvalid("telefone");
    return { ok: false, error: "Informe um WhatsApp válido com DDD." };
  }
  if (cidade.length < 2) {
    await recordInvalid("cidade");
    return { ok: false, error: "Selecione sua cidade." };
  }

  const ua = (await headers()).get("user-agent") ?? "";

  await persistLead(
    { nome, telefone, cidade },
    {
      vid: clean(formData.get("vid")),
      source: clean(formData.get("utm_source")),
      medium: clean(formData.get("utm_medium")),
      campaign: clean(formData.get("utm_campaign")),
      referrer: clean(formData.get("referrer")),
      device: detectDevice(ua),
    },
  );

  return { ok: true, groupUrl: WHATSAPP_GROUP_URL };
};
