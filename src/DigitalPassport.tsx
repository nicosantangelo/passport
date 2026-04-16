import { useState } from "react";
import { ExternalLink, RefreshCw } from "lucide-react";
import { cn } from "./lib/utils";
import {
  type Passport as PassportType,
  EMAIL_PROVIDERS,
  Provider,
  SMS_PROVIDERS,
} from "./lib/passport";
import { PassportField } from "./Passport";
import { Button } from "./components/ui/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "./components/ui/tooltip";

export function DigitalPassport({
  passport,
  onRegenerate,
}: {
  passport: PassportType;
  onRegenerate: () => void;
}) {
  const [selectedEmail, setSelectedEmail] = useState(0);
  const [selectedSms, setSelectedSms] = useState(0);

  return (
    <div className="min-[720px]:flex-1 bg-card rounded-xl min-[720px]:rounded-l-none overflow-hidden shadow-sm px-5 py-10 flex flex-col gap-10 min-[720px]:[box-shadow:inset_8px_0_12px_-8px_var(--color-border)]">
      <div className="flex items-start justify-between">
        <p className="text-xl tracking-[0.2em] uppercase font-semibold">
          DIGITAL VISA
        </p>

        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                variant="ghost"
                size="icon-sm"
                className="hidden min-[720px]:inline-flex"
                onClick={onRegenerate}
              />
            }
          >
            <RefreshCw size={14} className="text-muted-foreground" />
          </TooltipTrigger>
          <TooltipContent>Generate new identity</TooltipContent>
        </Tooltip>
      </div>

      <PassportField label="Username" value={passport.username} />
      <PassportField label="Password" value={passport.password} />

      <ProviderSection
        label="Temp Email"
        providers={EMAIL_PROVIDERS}
        selectedIndex={selectedEmail}
        onSelect={setSelectedEmail}
      />

      <ProviderSection
        label="SMS Receiver"
        providers={SMS_PROVIDERS}
        selectedIndex={selectedSms}
        onSelect={setSelectedSms}
      />
    </div>
  );
}

function ProviderSection({
  label,
  providers,
  selectedIndex,
  onSelect,
}: {
  label: string;
  providers: Provider[];
  selectedIndex: number;
  onSelect: (i: number) => void;
}) {
  const handleOpenExternalLink = () => {
    window.open(providers[selectedIndex].url, "_blank");
  };

  return (
    <div className="flex flex-col gap-2">
      <div
        className="text-xs tracking-widest uppercase text-muted-foreground flex flex-row gap-1"
        onClick={handleOpenExternalLink}
      >
        {label}
        <div className="text-primary cursor-pointer">
          <ExternalLink size={14} />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {providers.map((p, i) => (
          <button
            key={p.name}
            onClick={() => onSelect(i)}
            className={cn(
              "px-3 py-1.5 rounded-lg border text-xs font-mono transition-colors cursor-pointer border-border text-muted-foreground hover:text-foreground",
              i === selectedIndex &&
                "border-primary bg-primary/10 text-foreground",
            )}
          >
            {p.name}
          </button>
        ))}
      </div>
    </div>
  );
}
