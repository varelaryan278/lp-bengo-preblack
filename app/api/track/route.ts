import { K, hourNow, redis, today } from "@/lib/redis";

const EVENTS = ["view", "form_start", "redirect"] as const;
type TrackEvent = (typeof EVENTS)[number];

export const POST = async (request: Request) => {
  const body = (await request.json().catch(() => ({}))) as { type?: TrackEvent; vid?: string };
  if (!body.type || !EVENTS.includes(body.type)) return new Response(null, { status: 400 });

  const pipe = redis
    .pipeline()
    .hincrby(K.stats, body.type, 1)
    .hincrby(K.daily(body.type), today(), 1)
    .hincrby(K.hourly(body.type), hourNow(), 1);
  if (body.type === "view" && body.vid) pipe.pfadd(K.visitors, body.vid);
  await pipe.exec();

  return new Response(null, { status: 204 });
};
