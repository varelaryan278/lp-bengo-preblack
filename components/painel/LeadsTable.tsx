"use client";

import { DownloadIcon, SearchIcon } from "lucide-react";
import { useMemo, useState } from "react";
import type { LeadRow } from "@/lib/metrics";

const STATUS: Record<string, { label: string; className: string }> = {
  created: { label: "Enviado", className: "bg-verde/15 text-verde" },
  duplicate: { label: "Duplicado", className: "bg-sky-400/15 text-sky-300" },
  pending: { label: "Pendente", className: "bg-yellow-400/15 text-yellow-300" },
};

const statusOf = (status: string) => STATUS[status] ?? { label: `Erro · ${status}`, className: "bg-red-500/15 text-red-300" };

const formatDate = (iso: string) =>
  new Date(iso).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo", day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });

const toCsv = (leads: LeadRow[]) => {
  const cols: (keyof LeadRow)[] = ["createdAt", "nome", "telefone", "cidade", "source", "device", "webhookStatus", "webhookDetail"];
  const escape = (v: unknown) => {
    const s = String(v ?? "");
    const safe = /^[=+\-@\t\r]/.test(s) && !/^\+\d+$/.test(s) ? `'${s}` : s;
    return `"${safe.replace(/"/g, '""')}"`;
  };
  return [cols.join(";"), ...leads.map((l) => cols.map((c) => escape(l[c])).join(";"))].join("\n");
};

export const LeadsTable = ({ leads }: { leads: LeadRow[] }) => {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "ok" | "error">("all");

  const rows = useMemo(() => {
    const q = query.toLowerCase();
    return leads.filter((l) => {
      const ok = ["created", "duplicate"].includes(l.webhookStatus);
      if (filter === "ok" && !ok) return false;
      if (filter === "error" && ok) return false;
      return !q || `${l.nome} ${l.telefone} ${l.cidade}`.toLowerCase().includes(q);
    });
  }, [leads, query, filter]);

  const download = () => {
    const blob = new Blob(["﻿" + toCsv(rows)], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `leads-preblack-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  return (
    <div>
      <div className="mb-4 flex flex-col gap-2 sm:flex-row">
        <label className="flex h-10 flex-1 items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 focus-within:border-verde">
          <SearchIcon className="size-4 text-white/40" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar nome, telefone ou cidade"
            className="w-full bg-transparent text-sm outline-none placeholder:text-white/40"
          />
        </label>
        <div className="flex gap-2">
          {(["all", "ok", "error"] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`h-10 rounded-lg px-3 text-sm transition ${filter === f ? "bg-verde font-semibold text-noite" : "border border-white/10 bg-white/5 text-white/70 hover:bg-white/10"}`}
            >
              {f === "all" ? "Todos" : f === "ok" ? "Sucesso" : "Erro"}
            </button>
          ))}
          <button
            type="button"
            onClick={download}
            className="flex h-10 items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-white/70 hover:bg-white/10"
          >
            <DownloadIcon className="size-4" /> CSV
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-white/5 text-xs uppercase tracking-wider text-white/50">
            <tr>
              <th className="px-3 py-2.5 font-semibold">Data</th>
              <th className="px-3 py-2.5 font-semibold">Nome</th>
              <th className="px-3 py-2.5 font-semibold">WhatsApp</th>
              <th className="px-3 py-2.5 font-semibold">Cidade</th>
              <th className="px-3 py-2.5 font-semibold">Origem</th>
              <th className="px-3 py-2.5 font-semibold">Disp.</th>
              <th className="px-3 py-2.5 font-semibold">CRM</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {rows.map((l) => {
              const st = statusOf(String(l.webhookStatus));
              return (
                <tr key={String(l.telefone)} className="hover:bg-white/[0.03]">
                  <td className="whitespace-nowrap px-3 py-2.5 tabular-nums text-white/60">{formatDate(l.createdAt)}</td>
                  <td className="px-3 py-2.5">{l.nome}</td>
                  <td className="whitespace-nowrap px-3 py-2.5 tabular-nums">
                    <a href={`https://wa.me/${String(l.telefone).replace(/\D/g, "")}`} target="_blank" rel="noreferrer" className="hover:text-verde">
                      {String(l.telefone)}
                    </a>
                  </td>
                  <td className="px-3 py-2.5">{l.cidade}</td>
                  <td className="px-3 py-2.5 text-white/60">{l.source || "direto"}</td>
                  <td className="px-3 py-2.5 text-white/60">{l.device}</td>
                  <td className="px-3 py-2.5">
                    <span title={String(l.webhookDetail ?? "")} className={`rounded-md px-2 py-0.5 text-xs font-medium ${st.className}`}>
                      {st.label}
                    </span>
                  </td>
                </tr>
              );
            })}
            {!rows.length && (
              <tr>
                <td colSpan={7} className="px-3 py-8 text-center text-white/40">
                  Nenhum lead encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-white/40">Mostrando {rows.length} de {leads.length} (últimos 200).</p>
    </div>
  );
};
