"use client";

import { ChevronDownIcon } from "lucide-react";
import * as React from "react";
import * as RPNInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import ptBR from "react-phone-number-input/locale/pt-BR.json";

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type PhoneInputProps = Omit<React.ComponentProps<"input">, "onChange" | "value" | "ref"> &
  Omit<RPNInput.Props<typeof RPNInput.default>, "onChange"> & {
    onChange?: (value: RPNInput.Value) => void;
  };

const PhoneInput = ({ className, onChange, value, ...props }: PhoneInputProps) => (
  <RPNInput.default
    className={cn("group/phone flex", className)}
    flagComponent={FlagComponent}
    countrySelectComponent={CountrySelect}
    inputComponent={InputComponent}
    labels={ptBR}
    smartCaret={false}
    value={value || undefined}
    onChange={(v) => onChange?.(v || ("" as RPNInput.Value))}
    {...props}
  />
);

const InputComponent = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "h-[52px] w-full min-w-0 rounded-e-xl border border-white/10 bg-white/5 px-4 text-base text-white outline-none transition placeholder:text-white/40 focus:border-verde focus:bg-white/10 focus:ring-2 focus:ring-verde/30",
      className,
    )}
    {...props}
  />
));
InputComponent.displayName = "InputComponent";

type CountryEntry = { label: string; value: RPNInput.Country | undefined };

type CountrySelectProps = {
  disabled?: boolean;
  value: RPNInput.Country;
  options: CountryEntry[];
  onChange: (country: RPNInput.Country) => void;
};

const CountrySelect = ({ disabled, value: selectedCountry, options, onChange }: CountrySelectProps) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        disabled={disabled}
        aria-label="Selecionar país"
        className="flex h-[52px] shrink-0 items-center gap-1.5 rounded-s-xl border border-e-0 border-white/10 bg-white/10 px-3 text-white outline-none transition hover:bg-white/15 focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-verde/40 data-popup-open:bg-roxo/40"
      >
        <FlagComponent country={selectedCountry} countryName={selectedCountry} />
        <span className="text-sm text-white/70">+{RPNInput.getCountryCallingCode(selectedCountry)}</span>
        <ChevronDownIcon className="size-4 text-white/50 transition [[data-popup-open]_&]:rotate-180" />
      </PopoverTrigger>
      <PopoverContent align="start" className="w-80 border border-white/10 p-0 shadow-2xl shadow-roxo/40">
        <Command>
          <CommandInput placeholder="Buscar país..." />
          <CommandList className="max-h-72">
            <CommandEmpty>Nenhum país encontrado.</CommandEmpty>
            <CommandGroup>
              {options.map(({ value, label }) =>
                value ? (
                  <CommandItem
                    key={value}
                    value={`${label} +${RPNInput.getCountryCallingCode(value)}`}
                    data-checked={value === selectedCountry}
                    className="gap-2.5 py-2"
                    onSelect={() => {
                      onChange(value);
                      setOpen(false);
                    }}
                  >
                    <FlagComponent country={value} countryName={label} />
                    <span className="flex-1 truncate">{label}</span>
                    <span className="text-xs text-white/40">+{RPNInput.getCountryCallingCode(value)}</span>
                  </CommandItem>
                ) : null,
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
  const Flag = flags[country];

  return (
    <span className="flex h-4 w-6 shrink-0 overflow-hidden rounded-[3px] bg-white/20 [&_svg:not([class*='size-'])]:size-full">
      {Flag && <Flag title={countryName} />}
    </span>
  );
};

export { PhoneInput };
