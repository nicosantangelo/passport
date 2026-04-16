import { useState } from "react";
import { Check, ChevronDown, Copy, Pin } from "lucide-react";
import { Select } from "@base-ui/react/select";
import { LOCALES, getCountryFlag } from "./lib/passport";

export function CountryField({
  country,
  countryFlag,
  pinnedCountry,
  onPinCountry,
}: {
  country: string;
  countryFlag: string;
  pinnedCountry: string | null;
  onPinCountry: (iso2: string | null) => void;
}) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    if (isCopied) return;
    navigator.clipboard.writeText(`${countryFlag} ${country}`);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 800);
  };

  return (
    <div className="group/field flex flex-col gap-0.5">
      <div className="flex items-center gap-1 cursor-pointer" onClick={handleCopy}>
        <span className="text-xs tracking-widest uppercase text-muted-foreground">
          Country
        </span>

        <div className="relative size-2.5 opacity-0 group-hover/field:opacity-100 transition-opacity text-muted-foreground hover:text-foreground">
          <Copy
            size={10}
            className={`absolute transition-opacity duration-300 ${isCopied ? "opacity-0" : "opacity-100"}`}
          />
          <Check
            size={10}
            className={`absolute transition-opacity duration-300 ${isCopied ? "opacity-100" : "opacity-0"}`}
          />
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        <span
          className="font-mono text-md cursor-pointer"
          onClick={handleCopy}
        >
          {countryFlag} {country}
        </span>

        {pinnedCountry ? (
          <button
            className="text-primary hover:text-primary/70 transition-colors cursor-pointer"
            onClick={() => onPinCountry(null)}
          >
            <Pin size={12} fill="currentColor" />
          </button>
        ) : (
          <CountrySelect onSelect={onPinCountry} />
        )}
      </div>
    </div>
  );
}

function CountrySelect({
  onSelect,
}: {
  onSelect: (iso2: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Select.Root
      open={open}
      onOpenChange={setOpen}
      modal={false}
      onValueChange={(value) => {
        if (value) onSelect(value as string);
      }}
    >
      <Select.Trigger className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer data-[popup-open]:text-foreground">
        <ChevronDown size={14} />
      </Select.Trigger>

      <Select.Portal>
        <Select.Positioner side="bottom" align="start" className="z-50">
          <Select.Popup className="bg-popover border border-border rounded-md shadow-lg py-1 max-h-60 overflow-y-auto">
            <Select.Group>
              <Select.GroupLabel className="px-3 py-1.5 text-xs tracking-widest uppercase text-muted-foreground">
                Lock a country
              </Select.GroupLabel>

              {LOCALES.map((locale) => (
                <Select.Item
                  key={locale.iso2}
                  value={locale.iso2}
                  className="px-3 py-1.5 text-sm font-mono cursor-pointer text-popover-foreground hover:bg-accent hover:text-accent-foreground data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground outline-none"
                >
                  <Select.ItemText>
                    {getCountryFlag(locale.iso2)} {locale.name}
                  </Select.ItemText>
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  );
}
