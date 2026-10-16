import Image from "next/image";
import { LogOutIcon } from "lucide-react";
import { logout } from "@/app/painel/actions";
import type { Dashboard as Data } from "@/lib/metrics";
import { AutoRefresh } from "./AutoRefresh";
import { LeadsTable } from "./LeadsTable";
import { BarList, Card, Funnel, Kpi, Timeline } from "./Widgets";

const pct = (part: number, total: number) => (total ? `${((part / total) * 100).toFixed(1)}%` : "—");

const WEBHOOK_LABELS: Record<string, string> = {
  created: "Criado no CRM",
  duplicate: "Duplicado (já existia)",
  inactive: "Integração inativa",
  error: "Erro de extração (IA)",
  http_error: "Erro HTTP",
  timeout: "Timeout",
  network_error: "Erro de rede",
};

const formatDay = (key: string) => key.slice(8, 10) + "/" + key.slice(5, 7);

export const Dashboard = ({ data }: { data: Data }) => (
  <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
    <header className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <Image src="/images/logo-bengo.png" alt="Bengô Açaí" width={150} height={35} className="h-auto w-24" />
        <h1 className="font-display text-xl font-black uppercase sm:text-2xl">
          Painel <span className="text-verde">Pré-Black</span>
        </h1>
      </div>
      <div className="flex items-center gap-2">
        <AutoRefresh />
        <form action={logout}>
          <button type="submit" className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/70 hover:bg-white/10">
            <LogOutIcon className="size-3.5" /> Sair
          </button>
        </form>
      </div>
    </header>

    <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
      <Kpi label="Visitas humanas" value={data.humans} hint={`${data.views} brutas · ${data.botBlocked} robôs barrados`} />
      <Kpi label="Visitantes únicos" value={data.visitors} hint="Aproximado (HyperLogLog)" accent="roxo" />
      <Kpi label="Iniciaram o form" value={data.formStarts} hint={`${pct(data.formStarts, data.humans)} das visitas humanas`} />
      <Kpi label="Leads enviados" value={data.submits} hint={`Conversão ${pct(data.submits, data.humans)}`} accent="verde" />
      <Kpi label="CRM sucesso" value={data.webhookOk} hint={`${pct(data.webhookOk, data.submits)} dos leads`} accent="verde" />
      <Kpi label="CRM erro" value={data.webhookFail} hint={`${pct(data.webhookFail, data.submits)} dos leads`} accent={data.webhookFail ? "red" : undefined} />
    </div>

    <div className="mt-3 grid gap-3 lg:grid-cols-3">
      <Card title="Funil" className="lg:col-span-1">
        <Funnel
          steps={[
            { label: "Visitas humanas", value: data.humans },
            { label: "Iniciaram o formulário", value: data.formStarts },
            { label: "Enviaram (válidos)", value: data.submits },
            { label: "Redirecionados ao grupo", value: data.redirects },
          ]}
        />
        <div className="mt-5 rounded-lg bg-white/[0.03] p-3 text-xs text-white/60">
          Tentativas inválidas: <strong className="text-white">{data.invalid}</strong> (nome {data.invalidBy.nome} · telefone {data.invalidBy.telefone} · cidade{" "}
          {data.invalidBy.cidade}) · Envios de robô barrados: <strong className="text-white">{data.botSubmits}</strong>
        </div>
        <div className="mt-2 rounded-lg bg-white/[0.03] p-3 text-xs text-white/60">
          Cidade auto-detectada em <strong className="text-white">{data.geoDetected}</strong> leads · mantida em{" "}
          <strong className="text-verde">{data.geoKept}</strong> ({pct(data.geoKept, data.geoDetected)} de acerto)
        </div>
      </Card>

      <Card title="Visitas x leads por dia" className="lg:col-span-2">
        <Timeline data={data.daily} labelFormat={formatDay} />
      </Card>
    </div>

    <div className="mt-3 grid gap-3 lg:grid-cols-3">
      <Card title="Top cidades" className="lg:col-span-1">
        <BarList items={data.cities} total={data.submits} />
      </Card>
      <Card title="Visitas x leads por hora (BRT)" className="lg:col-span-2">
        <Timeline data={data.hourly} labelFormat={(h) => `${h}h`} />
      </Card>
    </div>

    <div className="mt-3 grid gap-3 md:grid-cols-3">
      <Card title="Status no CRM (webhook)">
        <BarList items={Object.entries(data.webhook).map(([k, v]) => ({ name: WEBHOOK_LABELS[k] ?? k, value: v })).filter((i) => i.value)} />
        {data.redisRetry > 0 && <p className="mt-3 text-xs text-yellow-300">{data.redisRetry} lead(s) gravados no Redis só na 2ª tentativa.</p>}
      </Card>
      <Card title="Origem (utm_source)">
        <BarList items={data.sources} />
      </Card>
      <Card title="Dispositivo">
        <BarList items={data.devices} />
      </Card>
    </div>

    <Card title="Leads" className="mt-3">
      <LeadsTable leads={data.leads} />
    </Card>

    <Card title="Log de erros (CRM)" className="mt-3">
      {data.events.length ? (
        <ul className="max-h-80 space-y-2 overflow-y-auto text-sm">
          {data.events.map((e, i) => (
            <li key={i} className="rounded-lg border border-red-500/20 bg-red-500/5 px-3 py-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded bg-red-500/20 px-1.5 py-0.5 text-xs text-red-300">{WEBHOOK_LABELS[e.status] ?? e.status}</span>
                <span className="text-white/50 tabular-nums">{new Date(e.at).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}</span>
                <span>
                  {e.nome} · {String(e.telefone)}
                </span>
              </div>
              {e.detail && <p className="mt-1 break-all font-mono text-xs text-white/50">{e.detail}</p>}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-verde">Nenhum erro registrado. 🎉</p>
      )}
    </Card>
  </div>
);
