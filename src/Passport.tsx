import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { PassportMrz } from "./PassportMrz";
import { type Passport } from "./lib/passport";
import { Identicon } from "./Identicon";

export function Passport({ passport }: { passport: Passport }) {
  return (
    <div className="bg-card rounded-none min-[720px]:rounded-xl min-[720px]:rounded-r-none overflow-hidden shadow-sm">
      {/* Data section */}
      <div className="px-5 py-10 flex flex-col gap-10">
        {/* Title + doc number + edit + photo */}
        <div className="flex gap-5">
          <div className="flex-1 flex flex-col gap-8">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xl tracking-[0.2em] uppercase font-semibold">
                  INTERNET PASSPORT
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-1">
                <PassportField label="Given Name" value={passport.firstName} />
              </div>
              <div className="flex-1">
                <PassportField label="Surname" value={passport.lastName} />
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-1">
                <PassportField label="Date of Birth" value={passport.dob} />
              </div>
              <div className="flex-1">
                <PassportField label="Phone" value={passport.phone} />
              </div>
            </div>
          </div>

          {/* Photo */}
          <div>
            <p className="font-mono text-[10px] text-muted-foreground mt-0.5 tracking-widest">
              AA03 0123456789
            </p>

            <Identicon
              seed={`${passport.firstName}${passport.lastName}${passport.dob}`}
              className="w-full h-28 rounded shrink-0 mt-2"
            />
          </div>
        </div>

        <PassportField label="Address" value={passport.address} />

        <div className="flex gap-6">
          <div className="flex-1">
            <PassportField
              label="Country"
              value={`${passport.countryFlag} ${passport.country}`}
            />
          </div>
          <div className="flex-1">
            <PassportField label="City" value={passport.city} />
          </div>
        </div>
        <div className="flex gap-6">
          <div className="flex-1">
            <PassportField label="State" value={passport.state} />
          </div>
          <div className="flex-1">
            <PassportField label="ZIP Code" value={passport.zip} />
          </div>
        </div>
      </div>

      <PassportMrz passport={passport} />
    </div>
  );
}

export function PassportField({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  const [isCopied, setIsCopied] = useState(false);

  const handleOnCopy = () => {
    if (isCopied) return;
    navigator.clipboard.writeText(value);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 800);
  };

  return (
    <div
      className="group/field flex flex-col gap-0.5 cursor-pointer"
      onClick={handleOnCopy}
    >
      <div className="flex items-center gap-1">
        <span className="text-xs tracking-widest uppercase text-muted-foreground">
          {label}
        </span>
        <div className="relative size-2.5 opacity-0 group-hover/field:opacity-100 transition-opacity text-muted-foreground hover:text-foreground cursor-pointer">
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
      <span className="font-mono text-md">{value}</span>
    </div>
  );
}
