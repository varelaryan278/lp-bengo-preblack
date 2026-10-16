"use client";

import { ChevronDownIcon, Loader2Icon, MapPinIcon } from "lucide-react";
import { useMemo, useState } from "react";

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type City = { nome: string; uf: string; key: string };

const normalize = (text: string) =>
  text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();

let cache: Promise<City[]> | null = null;

const loadCities = () => {
  cache ??= fetch("/cidades.json")
    .then((r) => r.json() as Promise<string[]>)
    .then((list) =>
      list.map((item) => {
        const [nome, uf] = item.split("|");
        return { nome, uf, key: normalize(`${nome} ${uf}`) };
      }),
    );
  return cache;
};

export const CityCombobox = ({ name }: { name: string }) => {
  const [open, setOpen] = useState(false);
  const [cities, setCities] = useState<City[] | null>(null);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState("");

  const results = useMemo(() => {
    if (!cities) return [];
    const q = normalize(search.trim());
    if (!q) return cities.slice(0, 40);
    const starts = cities.filter((c) => c.key.startsWith(q));
    const contains = cities.filter((c) => !c.key.startsWith(q) && c.key.includes(q));
    return [...starts, ...contains].slice(0, 40);
  }, [cities, search]);

  const handleOpen = (next: boolean) => {
    setOpen(next);
    if (next && !cities) loadCities().then(setCities);
  };

  const pick = (value: string) => {
    setSelected(value);
    setSearch("");
    setOpen(false);
  };

  return (
    <>
      <input type="hidden" name={name} value={selected} />
      <Popover open={open} onOpenChange={handleOpen}>
        <PopoverTrigger
          className={cn(
            "flex h-[52px] w-full items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 text-left text-base outline-none transition hover:bg-white/10 focus-visible:border-verde focus-visible:ring-2 focus-visible:ring-verde/30 data-popup-open:border-verde data-popup-open:bg-white/10",
            selected ? "text-white" : "text-white/40",
          )}
        >
          <MapPinIcon className={cn("size-4 shrink-0", selected ? "text-verde" : "text-white/40")} />
          <span className="flex-1 truncate">{selected || "Sua cidade"}</span>
          <ChevronDownIcon className="size-4 shrink-0 text-white/50 transition [[data-popup-open]_&]:rotate-180" />
        </PopoverTrigger>
        <PopoverContent align="start" className="w-(--anchor-width) min-w-72 border border-white/10 p-0 shadow-2xl shadow-roxo/40">
          <Command shouldFilter={false}>
            <CommandInput placeholder="Digite o nome da cidade..." value={search} onValueChange={setSearch} />
            <CommandList className="max-h-72">
              {!cities ? (
                <div className="flex items-center justify-center gap-2 py-6 text-sm text-white/50">
                  <Loader2Icon className="size-4 animate-spin" /> Carregando cidades...
                </div>
              ) : (
                <>
                  <CommandEmpty>
                    {search.trim().length > 1 ? (
                      <button type="button" className="text-verde hover:underline" onClick={() => pick(search.trim())}>
                        Usar &quot;{search.trim()}&quot;
                      </button>
                    ) : (
                      "Nenhuma cidade encontrada."
                    )}
                  </CommandEmpty>
                  <CommandGroup heading={search ? undefined : "Comece a digitar"}>
                    {results.map((c) => {
                      const value = `${c.nome}/${c.uf}`;
                      return (
                        <CommandItem key={value} value={value} data-checked={value === selected} className="gap-2 py-2" onSelect={() => pick(value)}>
                          <span className="flex-1 truncate">{c.nome}</span>
                          <span className="rounded bg-roxo/50 px-1.5 py-0.5 text-[10px] font-semibold tracking-wider text-white/80">{c.uf}</span>
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                </>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
};
