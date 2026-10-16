import { K, hourNow, redis, today } from "./redis";

export type Lead = { nome: string; telefone: string; cidade: string };

export type LeadMeta = {
  vid: string;
  source: string;
  medium: string;
  campaign: string;
  referrer: string;
  device: string;
};

type WebhookStatus = "created" | "duplicate" | "inactive" | "error" | "http_error" | "timeout" | "network_error";

const ORIGEM = "LP Pré-Black";
const TIMEOUT = 6000;

const withTimeout = <T,>(promise: Promise<T>) =>
  Promise.race([promise, new Promise<never>((_, reject) => setTimeout(() => reject(new Error("timeout")), TIMEOUT))]);

const sendToWebhook = async (lead: Lead): Promise<{ status: WebhookStatus; detail?: string }> => {
  try {
    const res = await fetch(process.env.LEAD_WEBHOOK_URL!, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Webhook-Token": process.env.LEAD_WEBHOOK_TOKEN ?? "" },
      body: JSON.stringify({
        ...lead,
        origem: ORIGEM,
        observacoes: `Cidade: ${lead.cidade} · Inscrito no grupo VIP da live Pré-Black`,
      }),
      signal: AbortSignal.timeout(TIMEOUT),
    });
    const text = await res.text();
    if (!res.ok) return { status: "http_error", detail: `HTTP ${res.status} ${text.slice(0, 200)}` };
    const body = JSON.parse(text) as { status?: WebhookStatus; leadId?: string };
    return { status: body.status ?? "created", detail: body.leadId };
  } catch (e) {
    const err = e as Error;
    return { status: err.name === "TimeoutError" ? "timeout" : "network_error", detail: err.message.slice(0, 200) };
  }
};

const saveLead = (lead: Lead, meta: LeadMeta) => {
  const day = today();
  return redis
    .pipeline()
    .hset(K.lead(lead.telefone), { ...lead, ...meta, origem: ORIGEM, createdAt: new Date().toISOString(), webhookStatus: "pending" })
    .zadd(K.leads, { score: Date.now(), member: lead.telefone })
    .hincrby(K.stats, "submits", 1)
    .hincrby(K.daily("submits"), day, 1)
    .hincrby(K.hourly("submits"), hourNow(), 1)
    .zincrby(K.cities, 1, lead.cidade)
    .zincrby(K.sources, 1, meta.source || "direto")
    .hincrby(K.devices, meta.device, 1)
    .exec();
};

const recordWebhook = (lead: Lead, result: { status: WebhookStatus; detail?: string }, redisOk: boolean) => {
  const isError = !["created", "duplicate"].includes(result.status);
  const pipe = redis
    .pipeline()
    .hset(K.lead(lead.telefone), { webhookStatus: result.status, webhookDetail: result.detail ?? "", redisOk: redisOk ? "1" : "0" })
    .hincrby(K.stats, `webhook:${result.status}`, 1);
  if (isError) {
    pipe
      .lpush(K.events, JSON.stringify({ at: new Date().toISOString(), type: "webhook", status: result.status, detail: result.detail, telefone: lead.telefone, nome: lead.nome }))
      .ltrim(K.events, 0, 499);
  }
  if (!redisOk) pipe.hincrby(K.stats, "redis:retry", 1).zadd(K.leads, { score: Date.now(), member: lead.telefone });
  return pipe.exec();
};

export const persistLead = async (lead: Lead, meta: LeadMeta) => {
  const [saved, webhook] = await Promise.allSettled([withTimeout(saveLead(lead, meta)), sendToWebhook(lead)]);
  const result = webhook.status === "fulfilled" ? webhook.value : { status: "network_error" as const };
  await withTimeout(recordWebhook(lead, result, saved.status === "fulfilled")).catch(() => null);
};

export const recordInvalid = (reason: string) =>
  withTimeout(redis.pipeline().hincrby(K.stats, "invalid", 1).hincrby(K.stats, `invalid:${reason}`, 1).exec()).catch(() => null);
