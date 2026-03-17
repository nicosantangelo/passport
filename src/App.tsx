import { useState } from "react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
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

interface Identity {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  dob: string;
  username: string;
  password: string;
}

function generateIdentity(): Identity {
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
    city: randCity(),
    state: randStateAbbr(),
    zip: randZipCode(),
    dob: `${month}/${day}/${year}`,
    username: randUserName(),
    password: randPassword(),
  };
}

function App() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div>
        <h1 className="mt-7 mb-7 font-medium">Identity</h1>
        <IdentityForm />
      </div>
    </div>
  );
}

function IdentityForm() {
  const [identity, setIdentity] = useState<Identity>({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    dob: "",
    username: "",
    password: "",
  });

  return (
    <div className="w-2xl border border-neutral-500 rounded-md p-7 flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="username">Username</Label>
        <Input
          type="text"
          id="username"
          placeholder="johndoe"
          value={identity.username}
          onChange={(e) => setIdentity({ ...identity, username: e.target.value })}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="password">Password</Label>
        <Input
          type="text"
          id="password"
          placeholder="••••••••"
          value={identity.password}
          onChange={(e) => setIdentity({ ...identity, password: e.target.value })}
        />
      </div>

      <div className="flex gap-4">
        <div className="flex flex-col gap-1.5 flex-1">
          <Label htmlFor="first-name">First name</Label>
          <Input
            type="text"
            id="first-name"
            placeholder="John"
            value={identity.firstName}
            onChange={(e) => setIdentity({ ...identity, firstName: e.target.value })}
          />
        </div>
        <div className="flex flex-col gap-1.5 flex-1">
          <Label htmlFor="last-name">Last name</Label>
          <Input
            type="text"
            id="last-name"
            placeholder="Doe"
            value={identity.lastName}
            onChange={(e) => setIdentity({ ...identity, lastName: e.target.value })}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="phone-number">Phone number</Label>
        <Input
          type="text"
          id="phone-number"
          placeholder="+1 (555) 000-0000"
          value={identity.phone}
          onChange={(e) => setIdentity({ ...identity, phone: e.target.value })}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="address">Address</Label>
        <Input
          type="text"
          id="address"
          placeholder="123 Main St"
          value={identity.address}
          onChange={(e) => setIdentity({ ...identity, address: e.target.value })}
        />
      </div>

      <div className="flex gap-4">
        <div className="flex flex-col gap-1.5 flex-1">
          <Label htmlFor="city">City</Label>
          <Input
            type="text"
            id="city"
            placeholder="New York"
            value={identity.city}
            onChange={(e) => setIdentity({ ...identity, city: e.target.value })}
          />
        </div>
        <div className="flex flex-col gap-1.5 w-24">
          <Label htmlFor="state">State</Label>
          <Input
            type="text"
            id="state"
            placeholder="NY"
            value={identity.state}
            onChange={(e) => setIdentity({ ...identity, state: e.target.value })}
          />
        </div>
        <div className="flex flex-col gap-1.5 w-28">
          <Label htmlFor="zip-code">ZIP Code</Label>
          <Input
            type="text"
            id="zip-code"
            placeholder="10001"
            value={identity.zip}
            onChange={(e) => setIdentity({ ...identity, zip: e.target.value })}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="date-of-birth">Date of Birth</Label>
        <Input
          type="text"
          id="date-of-birth"
          placeholder="MM/DD/YYYY"
          value={identity.dob}
          onChange={(e) => setIdentity({ ...identity, dob: e.target.value })}
        />
      </div>

      <Button className="w-full mt-3" onClick={() => setIdentity(generateIdentity())}>
        GENERATE
      </Button>
    </div>
  );
}

export default App;
