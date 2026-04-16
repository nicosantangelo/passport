import { useState } from "react";
import {
  generatePassport,
  type Passport as PassportType,
} from "./lib/passport";
import { Passport } from "./Passport";
import { DigitalPassport } from "./DigitalPassport";
import { TooltipProvider } from "./components/ui/tooltip";

function App() {
  const [passport, setPassport] = useState<PassportType>(generatePassport());

  return (
    <TooltipProvider>
      <div className="flex flex-col items-center justify-center min-h-screen py-8 min-[720px]:py-0">
        <div className="w-full max-w-6xl flex flex-col gap-6 px-4">
          <div className="flex flex-col gap-8 min-[720px]:flex-row min-[720px]:gap-0 min-[720px]:items-stretch">
            <div className="min-[720px]:flex-1">
              <Passport passport={passport} />
            </div>

            <DigitalPassport
              passport={passport}
              onRegenerate={() => setPassport(generatePassport())}
            />
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}

export default App;
