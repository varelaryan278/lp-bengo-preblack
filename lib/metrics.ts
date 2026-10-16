import { K, redis } from "./redis";

export type LeadRow = {
  nome: string;
  telefone: string;
  cidade: string;
  source: string;
  device: string;
  createdAt: string;
  webhookStatus: string;
  webhookDetail: string;
};

export type ErrorEvent = { at: string; status: string; detail?: string; nome?: string; telefone?: string };

export type Ranked = { name: string; value: number };

const num = (value: unknown) => Number(value ?? 0) || 0;

const ranked = (flat: (string | number)[]): Ranked[] => {
  const out: Ranked[] = [];
  for (let i = 0; i < flat.length; i += 2) out.push({ name: String(flat[i]), value: num(flat[i + 1]) });
  return out;
};

type Hash = Record<string, unknown> | null;

const merge = (keys: string[], views: Hash, submits: Hash) =>
  keys.map((key) => ({ key, views: num(views?.[key]), submits: num(submits?.[key]) }));

const dayKeys = (views: Hash, submits: Hash) => [...new Set([...Object.keys(views ?? {}), ...Object.keys(submits ?? {})])].sort();

const HOURS = Array.from({ length: 24 }, (_, h) => String(h).padStart(2, "0"));

export const getDashboard = async () => {
  const [stats, visitors, cities, sources, devices, dailyViews, dailySubmits, hourlyViews, hourlySubmits, phones, events] = await redis
    .pipeline()
    .hgetall<Record<string, unknown>>(K.stats)
    .pfcount(K.visitors)
    .zrange(K.cities, 0, 29, { rev: true, withScores: true })
    .zrange(K.sources, 0, 14, { rev: true, withScores: true })
    .hgetall<Record<string, unknown>>(K.devices)
    .hgetall<Record<string, unknown>>(K.daily("view"))
    .hgetall<Record<string, unknown>>(K.daily("submits"))
    .hgetall<Record<string, unknown>>(K.hourly("view"))
    .hgetall<Record<string, unknown>>(K.hourly("submits"))
    .zrange(K.leads, 0, 199, { rev: true })
    .lrange(K.events, 0, 99)
    .exec<
      [
        Record<string, unknown> | null,
        number,
        (string | number)[],
        (string | number)[],
        Record<string, unknown> | null,
        Record<string, unknown> | null,
        Record<string, unknown> | null,
        Record<string, unknown> | null,
        Record<string, unknown> | null,
        string[],
        (string | ErrorEvent)[],
      ]
    >();

  const leadsPipe = redis.pipeline();
  phones.forEach((phone) => leadsPipe.hgetall<LeadRow>(K.lead(phone)));
  const leads = phones.length ? ((await leadsPipe.exec()) as (LeadRow | null)[]).filter((l): l is LeadRow => !!l) : [];

  const s = stats ?? {};
  const webhook = {
    created: num(s["webhook:created"]),
    duplicate: num(s["webhook:duplicate"]),
    inactive: num(s["webhook:inactive"]),
    error: num(s["webhook:error"]),
    http_error: num(s["webhook:http_error"]),
    timeout: num(s["webhook:timeout"]),
    network_error: num(s["webhook:network_error"]),
  };

  return {
    views: num(s.view),
    visitors: num(visitors),
    formStarts: num(s.form_start),
    submits: num(s.submits),
    redirects: num(s.redirect),
    invalid: num(s.invalid),
    invalidBy: { nome: num(s["invalid:nome"]), telefone: num(s["invalid:telefone"]), cidade: num(s["invalid:cidade"]) },
    redisRetry: num(s["redis:retry"]),
    webhook,
    webhookOk: webhook.created + webhook.duplicate,
    webhookFail: webhook.inactive + webhook.error + webhook.http_error + webhook.timeout + webhook.network_error,
    cities: ranked(cities),
    sources: ranked(sources),
    devices: Object.entries(devices ?? {}).map(([name, value]) => ({ name, value: num(value) })),
    daily: merge(dayKeys(dailyViews, dailySubmits), dailyViews, dailySubmits),
    hourly: merge(HOURS, hourlyViews, hourlySubmits),
    leads,
    events: events.map((e) => (typeof e === "string" ? (JSON.parse(e) as ErrorEvent) : e)),
  };
};

export type Dashboard = Awaited<ReturnType<typeof getDashboard>>;
