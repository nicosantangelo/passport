import { PassportMrz } from "./PassportMrz";
import { type Passport } from "./lib/passport";

export function Passport({ passport }: { passport: Passport }) {
  // 44-char TD3 MRZ lines
  const surname = passport.lastName.toUpperCase().replace(/[^A-Z]/g, "");
  const given = passport.firstName.toUpperCase().replace(/[^A-Z]/g, "");
  const nameField = `${surname}<<${given}`.padEnd(39, "<").slice(0, 39);
  const mrzLine1 = `P<USA${nameField}`;
  const dobParts = passport.dob.split("/");
  const mrzDob =
    dobParts.length === 3
      ? `${dobParts[2].slice(2)}${dobParts[0]}${dobParts[1]}`
      : "000000";
  const mrzLine2 = `ID0000000<0USA${mrzDob}0F3001010<<<<<<<<<<<<00`
    .padEnd(44, "<")
    .slice(0, 44);

  return (
    <div className="bg-card rounded-l-xl overflow-hidden shadow-sm">
      {/*<PassportRosette />*/}

      {/* Data section */}
      <div className="px-5 py-8 flex flex-col gap-8">
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

            <div className="w-full h-28 rounded bg-primary shrink-0 mt-2" />
          </div>
        </div>

        <PassportField label="Address" value={passport.address} />

        <div className="flex gap-6">
          <div className="flex-1">
            <PassportField label="Country" value={passport.country} />
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

      <PassportMrz line1={mrzLine1} line2={mrzLine2} />
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
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs tracking-widest uppercase text-muted-foreground">
        {label}
      </span>
      <span className="font-mono text-md">{value}</span>
    </div>
  );
}
