import { useState } from "react";
import { Button } from "./components/ui/button";
import {
  generatePassport,
  type Passport as PassportType,
} from "./lib/passport";
import { Passport } from "./Passport";
import { DigitalPassport } from "./DigitalPassport";

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

export default App;
