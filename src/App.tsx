import { ChangeEvent, useState } from "react";
import { Pencil, Check } from "lucide-react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import {
  randFirstName,
  randLastName,
  randStreetAddress,
  randCity,
  randStateAbbr,
  randZipCode,
  randBetweenDate,
  randUserName,
  randPassword,
  randNumber,
} from "@ngneat/falso";

type Passport = {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  country: string;
  city: string;
  state: string;
  zip: string;
  dob: string;
  username: string;
  password: string;
};

function generatePassport(): Passport {
  const now = new Date();
  const from = new Date(now.getFullYear() - 80, 0, 1);
  const to = new Date(now.getFullYear() - 18, 11, 31);
  const dob = randBetweenDate({ from, to });
  const month = String(dob.getMonth() + 1).padStart(2, "0");
  const day = String(dob.getDate()).padStart(2, "0");
  const year = dob.getFullYear();

  const areaCode = randNumber({ min: 200, max: 999 });
  const prefix = randNumber({ min: 200, max: 999 });
  const line = String(randNumber({ min: 0, max: 9999 })).padStart(4, "0");

  return {
    firstName: randFirstName(),
    lastName: randLastName(),
    phone: `+1 (${areaCode}) ${prefix}-${line}`,
    address: randStreetAddress(),
    country: "United States of America",
    city: randCity(),
    state: randStateAbbr(),
    zip: randZipCode(),
    dob: `${month}/${day}/${year}`,
    username: randUserName(),
    password: randPassword(),
  };
}

function App() {
  const [passport, setPassport] = useState<Passport>(generatePassport());

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-2xl flex flex-col gap-6 mt-16">
        {passport && <Passport passport={passport} onChange={setPassport} />}

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
    <div className="relative bg-slate-50 border-b border-neutral-200 overflow-hidden flex items-center justify-center h-44">
      <svg
        viewBox="0 0 300 180"
        className="absolute inset-0 w-full h-full text-teal-500 opacity-20"
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
  const Row = ({ line }: { line: string }) => (
    <div className="flex justify-between w-full">
      {line.split("").map((ch, i) => (
        <span key={i} className="font-mono text-xs text-muted-foreground">
          {ch}
        </span>
      ))}
    </div>
  );

  return (
    <div className="border-t border-border bg-card px-5 py-3 flex flex-col gap-1.5">
      <Row line={line1} />
      <Row line={line2} />
    </div>
  );
}

function Passport({
  passport,
  onChange,
}: {
  passport: Passport;
  onChange: (passport: Passport) => void;
}) {
  const [editing, setEditing] = useState(false);

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

  const handleOnFieldChange = (value: string, field: string) => {
    onChange({ ...passport, [field]: value });
  };

  const handleEditClick = () => {
    setEditing((editing) => !editing);
  };

  const PassportField = ({
    label,
    value,
    field,
  }: {
    label: string;
    value: string;
    field: keyof Passport;
  }) => (
    <Field
      label={label}
      value={value}
      field={field}
      isEditing={editing}
      onChange={handleOnFieldChange}
    />
  );

  return (
    <div className="bg-card rounded-xl overflow-hidden shadow-sm">
      <PassportRosette />

      {/* Data section */}
      <div className="p-5 flex flex-col gap-8">
        {/* Title + doc number + edit + photo */}
        <div className="flex gap-5">
          <div className="flex-1 flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs tracking-[0.2em] uppercase font-semibold">
                  INTERNATIONAL PASSPORT
                </p>
                <p className="text-xs tracking-widest text-muted-foreground uppercase">
                  passport Document
                </p>
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 shrink-0"
                onClick={handleEditClick}
              >
                {editing ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Pencil className="h-4 w-4" />
                )}
              </Button>
            </div>

            <div className="flex gap-6">
              <PassportField
                label="Given Name"
                value={passport.firstName}
                field="firstName"
              />
              <PassportField
                label="Surname"
                value={passport.lastName}
                field="lastName"
              />
            </div>

            <div className="flex gap-6">
              <PassportField label="Nationality" value="CITIZEN" field="city" />
            </div>

            <div className="flex gap-6">
              <PassportField
                label="Date of Birth"
                value={passport.dob}
                field="dob"
              />
              <PassportField
                label="Phone"
                value={passport.phone}
                field="phone"
              />
            </div>
          </div>

          {/* Photo */}
          <div>
            <p className="font-mono text-[10px] text-muted-foreground mt-0.5 tracking-widest">
              AA03 0123456789
            </p>
            <div className="w-full h-28 rounded bg-teal-600 shrink-0 mt-2" />
          </div>
        </div>

        <div className="flex gap-6">
          <div className="flex-1">
            <PassportField label="Sex" value="—" field="username" />
          </div>
          <div className="flex-1">
            <PassportField
              label="Place of Birth"
              value={`${passport.city}, ${passport.state}`}
              field="city"
            />
          </div>
          <div className="flex-1">
            <PassportField
              label="Holder's Signature"
              value={passport.username}
              field="username"
            />
          </div>
        </div>

        <PassportField
          label="Address"
          value={passport.address}
          field="address"
        />

        <div className="flex gap-4">
          <div className="flex-1">
            <PassportField
              label="Country"
              value={passport.country}
              field="city"
            />
          </div>
          <div className="flex-1">
            <PassportField label="City" value={passport.city} field="city" />
          </div>
          <div className="flex-1">
            <PassportField label="State" value={passport.state} field="state" />
          </div>
          <div className="flex-1">
            <PassportField label="ZIP" value={passport.zip} field="zip" />
          </div>
        </div>

        <div className="flex gap-6">
          <div className="flex-1">
            <PassportField
              label="Username"
              value={passport.username}
              field="username"
            />
          </div>
          <div className="flex-1">
            <PassportField
              label="Password"
              value={passport.password}
              field="password"
            />
          </div>
        </div>
      </div>

      <PassportMrz line1={mrzLine1} line2={mrzLine2} />
    </div>
  );
}

function Field({
  label,
  value,
  field,
  isEditing,
  onChange,
}: {
  label: string;
  value: string;
  field: keyof Passport;
  isEditing: boolean;
  onChange: (value: string, field: string) => void;
}) {
  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value, field);
  };

  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs tracking-widest uppercase text-muted-foreground">
        {label}
      </span>
      {isEditing ? (
        <Input
          className="font-mono h-7 px-2 py-1 text-sm"
          value={value}
          onChange={handleOnChange}
        />
      ) : (
        <span className="font-mono text-sm">{value}</span>
      )}
    </div>
  );
}

export default App;
