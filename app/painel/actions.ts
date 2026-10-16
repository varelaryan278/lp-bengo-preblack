"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { COOKIE, checkCode, sessionToken } from "@/lib/painel-auth";

export const login = async (_prev: { error?: string }, formData: FormData): Promise<{ error?: string }> => {
  await new Promise((r) => setTimeout(r, 600));
  if (!checkCode(String(formData.get("code") ?? ""))) return { error: "Código inválido." };

  (await cookies()).set(COOKIE, sessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/painel",
    maxAge: 60 * 60 * 24 * 7,
  });
  redirect("/painel");
};

export const logout = async () => {
  (await cookies()).delete({ name: COOKIE, path: "/painel" });
  redirect("/painel");
};
