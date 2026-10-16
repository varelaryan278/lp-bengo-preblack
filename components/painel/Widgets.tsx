import type { ReactNode } from "react";

const pct = (part: number, total: number) => (total ? `${((part / total) * 100).toFixed(1)}%` : "—");

export const Card = ({ title, children, className = "" }: { title: string; children: ReactNode; className?: string }) => (
  <section className={`rounded-2xl border border-white/10 bg-noite-2 p-5 ${className}`}>
    <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/50">{title}</h2>
    {children}
  </section>
);

export const Kpi = ({ label, value, hint, accent }: { label: string; value: number | string; hint?: string; accent?: "verde" | "red" | "roxo" }) => (
  <div className="rounded-2xl border border-white/10 bg-noite-2 p-5">
    <p className="text-xs font-semibold uppercase tracking-widest text-white/50">{label}</p>
    <p
      className={`mt-2 font-display text-3xl font-black tabular-nums sm:text-4xl ${
        accent === "verde" ? "text-verde" : accent === "red" ? "text-red-400" : accent === "roxo" ? "text-roxo-claro" : "text-white"
      }`}
    >
      {typeof value === "number" ? value.toLocaleString("pt-BR") : value}
    </p>
    {hint && <p className="mt-1 text-xs text-white/40">{hint}</p>}
  </div>
);

export const BarList = ({ items, total, empty = "Sem dados ainda." }: { items: { name: string; value: number }[]; total?: number; empty?: string }) => {
  if (!items.length) return <p className="text-sm text-white/40">{empty}</p>;
  const max = Math.max(...items.map((i) => i.value));
  const sum = total ?? items.reduce((acc, i) => acc + i.value, 0);
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item.name} className="relative overflow-hidden rounded-lg bg-white/[0.03] px-3 py-2">
          <div className="absolute inset-y-0 left-0 rounded-lg bg-gradient-to-r from-roxo/70 to-roxo/20" style={{ width: `${(item.value / max) * 100}%` }} />
          <div className="relative flex items-center justify-between gap-3 text-sm">
            <span className="truncate">{item.name}</span>
            <span className="shrink-0 tabular-nums text-white/70">
              {item.value} <span className="text-white/40">· {pct(item.value, sum)}</span>
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
};

export const Funnel = ({ steps }: { steps: { label: string; value: number }[] }) => {
  const top = steps[0]?.value || 1;
  return (
    <div className="space-y-3">
      {steps.map((step, i) => (
        <div key={step.label}>
          <div className="mb-1 flex justify-between text-sm">
            <span>{step.label}</span>
            <span className="tabular-nums text-white/70">
              {step.value.toLocaleString("pt-BR")}
              {i > 0 && <span className="ml-2 text-xs text-verde">{pct(step.value, steps[i - 1].value)}</span>}
            </span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-white/5">
            <div className="h-full rounded-full bg-gradient-to-r from-verde to-verde/60" style={{ width: `${(step.value / top) * 100}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
};

export const Timeline = ({ data, labelFormat }: { data: { key: string; views: number; submits: number }[]; labelFormat: (key: string) => string }) => {
  if (!data.some((d) => d.views || d.submits)) return <p className="text-sm text-white/40">Sem dados ainda.</p>;
  const max = Math.max(...data.map((d) => Math.max(d.views, d.submits)), 1);
  return (
    <div>
      <div className="flex h-44 items-end gap-1">
        {data.map((d) => (
          <div key={d.key} className="group relative flex h-full max-w-10 flex-1 items-end justify-center gap-px">
            <div className="w-1/2 rounded-t bg-roxo-claro/70" style={{ height: `${(d.views / max) * 100}%` }} />
            <div className="w-1/2 rounded-t bg-verde" style={{ height: `${(d.submits / max) * 100}%` }} />
            <div className="pointer-events-none absolute -top-14 z-10 hidden whitespace-nowrap rounded-md bg-black/90 px-2 py-1 text-xs group-hover:block">
              {labelFormat(d.key)}
              <br />
              {d.views} visitas humanas · {d.submits} leads
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2 flex gap-1 text-[10px] text-white/40">
        {data.map((d, i) => (
          <span key={d.key} className="max-w-10 flex-1 text-center">
            {data.length <= 14 || i % 3 === 0 ? labelFormat(d.key) : ""}
          </span>
        ))}
      </div>
      <div className="mt-3 flex gap-4 text-xs text-white/60">
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-sm bg-roxo-claro/70" /> Visitas humanas
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-sm bg-verde" /> Leads
        </span>
      </div>
    </div>
  );
};
