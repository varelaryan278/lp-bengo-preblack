"use client";

import { RefreshCwIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";

const INTERVAL = 15000;

export const AutoRefresh = () => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    const timer = setInterval(() => startTransition(() => router.refresh()), INTERVAL);
    return () => clearInterval(timer);
  }, [router]);

  return (
    <button
      type="button"
      onClick={() => startTransition(() => router.refresh())}
      className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/70 transition hover:bg-white/10"
    >
      <span className="relative flex size-2">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-verde opacity-75" />
        <span className="relative inline-flex size-2 rounded-full bg-verde" />
      </span>
      Ao vivo
      <RefreshCwIcon className={`size-3.5 ${pending ? "animate-spin" : ""}`} />
    </button>
  );
};
