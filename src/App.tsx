import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";

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
  return (
    <div className="w-2xl border border-neutral-500 rounded-md p-7 flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="username">Username</Label>
        <Input type="text" id="username" placeholder="johndoe" />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="password">Password</Label>
        <Input type="password" id="password" placeholder="••••••••" />
      </div>

      <div className="flex gap-4">
        <div className="flex flex-col gap-1.5 flex-1">
          <Label htmlFor="first-name">First name</Label>
          <Input type="text" id="first-name" placeholder="John" />
        </div>
        <div className="flex flex-col gap-1.5 flex-1">
          <Label htmlFor="last-name">Last name</Label>
          <Input type="text" id="last-name" placeholder="Doe" />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="phone-number">Phone number</Label>
        <Input type="text" id="phone-number" placeholder="+1 (555) 000-0000" />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="address">Address</Label>
        <Input type="text" id="address" placeholder="123 Main St" />
      </div>

      <div className="flex gap-4">
        <div className="flex flex-col gap-1.5 flex-1">
          <Label htmlFor="city">City</Label>
          <Input type="text" id="city" placeholder="New York" />
        </div>
        <div className="flex flex-col gap-1.5 w-24">
          <Label htmlFor="state">State</Label>
          <Input type="text" id="state" placeholder="NY" />
        </div>
        <div className="flex flex-col gap-1.5 w-28">
          <Label htmlFor="zip-code">ZIP Code</Label>
          <Input type="text" id="zip-code" placeholder="10001" />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="date-of-birth">Date of Birth</Label>
        <Input type="text" id="date-of-birth" placeholder="MM/DD/YYYY" />
      </div>

      <Button className="w-full mt-3">Hey</Button>
    </div>
  );
}

export default App;
