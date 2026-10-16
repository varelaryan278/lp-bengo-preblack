"use client";

import { useSyncExternalStore } from "react";
import { LIVE_DATE } from "@/lib/event";

const target = new Date(LIVE_DATE).getTime();

const split = (ms: number) => {
  const s = Math.max(0, Math.floor(ms / 1000));
  return [
    { label: "dias", value: Math.floor(s / 86400) },
    { label: "horas", value: Math.floor((s % 86400) / 3600) },
    { label: "min", value: Math.floor((s % 3600) / 60) },
    { label: "seg", value: s % 60 },
  ];
};

const subscribe = (callback: () => void) => {
  const timer = setInterval(callback, 1000);
  return () => clearInterval(timer);
};

const getSnapshot = () => Math.floor(Date.now() / 1000) * 1000;

const getServerSnapshot = () => null;

export const Countdown = () => {
  const now = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const parts = now === null ? split(0).map((p) => ({ ...p, value: null })) : split(target - now);

  return (
    <div className="flex gap-2 sm:gap-3" aria-label="Contagem regressiva para a live">
      {parts.map((p) => (
        <div
          key={p.label}
          className="flex w-16 flex-col items-center overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-roxo/40 to-white/5 py-2 shadow-lg shadow-roxo/30 sm:w-20 sm:py-3"
        >
          <span key={p.value} className="animate-tick font-display text-2xl font-bold tabular-nums text-white sm:text-3xl">
            {p.value === null ? "--" : String(p.value).padStart(2, "0")}
          </span>
          <span className="text-[10px] uppercase tracking-widest text-white/50 sm:text-xs">{p.label}</span>
        </div>
      ))}
    </div>
  );
};
