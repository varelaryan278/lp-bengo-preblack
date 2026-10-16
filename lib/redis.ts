import { Redis } from "@upstash/redis";

export const redis = Redis.fromEnv();

export const K = {
  stats: "preblack:stats",
  visitors: "preblack:visitors",
  daily: (metric: string) => `preblack:daily:${metric}`,
  hourly: (metric: string) => `preblack:hourly:${metric}`,
  cities: "preblack:cities",
  sources: "preblack:sources",
  devices: "preblack:devices",
  leads: "preblack:leads",
  lead: (telefone: string) => `preblack:lead:${telefone}`,
  events: "preblack:events",
};

export const today = () => new Date().toLocaleDateString("sv-SE", { timeZone: "America/Sao_Paulo" });

export const hourNow = () =>
  new Date().toLocaleString("sv-SE", { timeZone: "America/Sao_Paulo", hour: "2-digit", hour12: false }).padStart(2, "0");
