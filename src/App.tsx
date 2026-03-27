import { useState } from "react";
import { Button } from "./components/ui/button";
import {
  generatePassport,
  type Passport as PassportType,
  type Provider,
  EMAIL_PROVIDERS,
  SMS_PROVIDERS,
} from "./lib/passport";
import { Passport } from "./Passport";
import { PassportField } from "./Passport";
import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";

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

function App() {
  const [passport, setPassport] = useState<PassportType>(generatePassport());

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-6xl flex flex-col gap-6 mt-16 px-4">
        <div className="flex items-stretch ">
          <div className="flex-1">
            <Passport passport={passport} />
          </div>

          <DigitalPassport passport={passport} />
        </div>

        <Button
          className="w-full"
          onClick={() => setPassport(generatePassport())}
        >
          REGENERATE
        </Button>
      </div>
    </div>
  );
}

function DigitalPassport({ passport }: { passport: PassportType }) {
  const [selectedEmail, setSelectedEmail] = useState(0);
  const [selectedSms, setSelectedSms] = useState(0);

  return (
    <div className="flex-1 bg-card rounded-r-xl overflow-hidden shadow-sm px-5 py-8 flex flex-col gap-8 [box-shadow:inset_5px_0_12px_-8px_var(--color-border)]">
      <p className="text-xl tracking-[0.2em] uppercase font-semibold">
        DIGITAL VISA
      </p>

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

export default App;
