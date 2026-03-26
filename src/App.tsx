import { useState } from "react";
import { Button } from "./components/ui/button";
import { generatePassport, type Passport } from "./lib/passport";

function App() {
  const [passport, setPassport] = useState<Passport>(generatePassport());

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-2xl flex flex-col gap-6 mt-16">
        <Passport passport={passport} />

        <Button
          className="w-full"
          onClick={() => setPassport(generatePassport())}
        >
          {passport ? "REGENERATE" : "GENERATE"}
        </Button>
      </div>
    </div>
  );
}

export function PassportRosette() {
  return (
    <div className="relative border-b overflow-hidden flex items-center justify-center h-43">
      <svg
        viewBox="0 0 300 180"
        className="absolute inset-0 w-full h-full text-primary opacity-20"
        preserveAspectRatio="xMidYMid meet"
      >
        {Array.from({ length: 24 }, (_, i) => (
          <ellipse
            key={`a${i}`}
            cx="150"
            cy="90"
            rx="85"
            ry="34"
            transform={`rotate(${i * 7.5} 150 90)`}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.7"
          />
        ))}
        {Array.from({ length: 24 }, (_, i) => (
          <ellipse
            key={`b${i}`}
            cx="150"
            cy="90"
            rx="55"
            ry="22"
            transform={`rotate(${i * 7.5} 150 90)`}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
          />
        ))}
        {Array.from({ length: 24 }, (_, i) => (
          <ellipse
            key={`c${i}`}
            cx="150"
            cy="90"
            rx="26"
            ry="11"
            transform={`rotate(${i * 7.5} 150 90)`}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.4"
          />
        ))}
        <circle
          cx="150"
          cy="90"
          r="88"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.4"
        />
        <circle
          cx="150"
          cy="90"
          r="60"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.3"
        />
      </svg>
      <span className="absolute top-3 right-4 font-mono text-[10px] text-neutral-400 tracking-widest">
        AA03 0123456789
      </span>
      <div className="absolute bottom-3 right-4 text-right">
        <p className="text-[8px] tracking-widest uppercase text-neutral-400">
          Code of Country
        </p>
        <p className="font-mono text-xs font-bold text-neutral-500 tracking-wider">
          USA
        </p>
      </div>
    </div>
  );
}

function PassportMrz({ line1, line2 }: { line1: string; line2: string }) {
  const Row = ({ lines }: { lines: string[] }) => (
    <div className="flex justify-between w-full">
      {lines.map((character, index) => (
        <span key={index} className="font-mono text-xs text-muted-foreground">
          {character}
        </span>
      ))}
    </div>
  );

  return (
    <div className="border-t border-border px-5 py-5 flex flex-col gap-1.5">
      <Row lines={line1.split("")} />
      <Row lines={line2.split("")} />
    </div>
  );
}

function Passport({ passport }: { passport: Passport }) {
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
    <div className="bg-card rounded-xl overflow-hidden shadow-sm">
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

        <div className="flex gap-6">
          <div className="flex-1">
            <PassportField label="Username" value={passport.username} />
          </div>
          <div className="flex-1">
            <PassportField label="Password" value={passport.password} />
          </div>
        </div>
      </div>

      <PassportMrz line1={mrzLine1} line2={mrzLine2} />
    </div>
  );
}

function PassportField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs tracking-widest uppercase text-muted-foreground">
        {label}
      </span>
      <span className="font-mono text-md">{value}</span>
    </div>
  );
}

export default App;
