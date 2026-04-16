import { useState } from "react";
import {
  generatePassport,
  type Passport as PassportType,
} from "./lib/passport";
import { Passport } from "./Passport";
import { DigitalPassport } from "./DigitalPassport";
import { PassportStamp } from "./PassportStamp";
import { TooltipProvider } from "./components/ui/tooltip";

function App() {
  const [passport, setPassport] = useState<PassportType>(generatePassport());

  return (
    <TooltipProvider>
      <div className="flex flex-col items-center justify-center min-h-screen py-8 min-[720px]:py-0">
        <div className="w-full max-w-6xl flex flex-col gap-6 px-4">
          <div className="relative flex flex-col gap-0 min-[720px]:flex-row min-[720px]:items-stretch min-[720px]:shadow-[8px_8px_30px_rgba(0,0,0,0.6)] min-[720px]:rounded-xl">
            <div className="min-[720px]:flex-1">
              <Passport passport={passport} />
            </div>

            <DigitalPassport passport={passport} />

            <div className="hidden min-[720px]:block absolute bottom-2 right-2 rotate-12">
              <PassportStamp onClick={() => setPassport(generatePassport())} />
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}

export default App;
