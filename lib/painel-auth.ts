import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const COOKIE = "painel_session";

const sha = (value: string) => createHash("sha256").update(value).digest();

export const sessionToken = () => createHmac("sha256", process.env.PAINEL_CODE ?? "").update("painel-preblack").digest("hex");

export const checkCode = (code: string) => timingSafeEqual(sha(code), sha(process.env.PAINEL_CODE ?? crypto.randomUUID()));

export const isAuthed = async () => {
  const value = (await cookies()).get(COOKIE)?.value;
  return !!value && !!process.env.PAINEL_CODE && timingSafeEqual(sha(value), sha(sessionToken()));
};
