import { type Passport } from "./lib/passport";

export function PassportMrz({ passport }: { passport: Passport }) {
  const surname = passport.lastName.toUpperCase().replace(/[^A-Z]/g, "");
  const given = passport.firstName.toUpperCase().replace(/[^A-Z]/g, "");
  const nameField = `${surname}<<${given}`.padEnd(39, "<").slice(0, 39);
  const icao = passport.countryCode.padEnd(3, "<");
  const line1 = `P<${icao}${nameField}`.slice(0, 44);

  const dobParts = passport.dob.split("/");
  const mrzDob =
    dobParts.length === 3
      ? `${dobParts[2].slice(2)}${dobParts[0]}${dobParts[1]}`
      : "000000";
  const line2 = `ID0000000<0${icao}${mrzDob}0F3001010<<<<<<<<<<<<00`
    .padEnd(44, "<")
    .slice(0, 44);

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
    <div className="border-t border-border px-5 py-5 flex flex-col gap-1.5 bg-white/3">
      <Row lines={line1.split("")} />
      <Row lines={line2.split("")} />
    </div>
  );
}
