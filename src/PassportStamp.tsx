import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "./components/ui/tooltip";

export function PassportStamp({ onClick }: { onClick: () => void }) {
  return (
    <div className="animate-stamp">
      <Tooltip>
        <TooltipTrigger
          render={
            <button
              onClick={onClick}
              className="cursor-pointer opacity-70 hover:opacity-85 active:scale-95 transition-all duration-150 focus:outline-none"
              aria-label="Generate new identity"
            />
          }
        >
          <svg
            width="99"
            height="99"
            viewBox="0 0 120 120"
            className="text-primary"
          >
            <defs>
              {/* CW circle for upper text — tops point outward (up) */}
              <path
                id="stamp-upper"
                d="M 60,60 m -40,0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"
              />

              {/* CCW circle for lower text — tops point inward (up toward center) */}
              <path
                id="stamp-lower"
                d="M 60,60 m 40,0 a 40,40 0 1,0 -80,0 a 40,40 0 1,0 80,0"
              />

              <filter id="stamp-rough">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.04"
                  numOctaves="4"
                  result="noise"
                />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" />
              </filter>
            </defs>

            <g filter="url(#stamp-rough)">
              {/* Single thick ring */}
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
              />

              {/* Upper arc text */}
              <text
                fill="currentColor"
                fontSize="9"
                fontWeight="600"
                letterSpacing="1.5"
              >
                <textPath
                  href="#stamp-upper"
                  startOffset="25%"
                  textAnchor="middle"
                >
                  INTERNET IDENTITY
                </textPath>
              </text>

              {/* Lower arc text */}
              <text
                fill="currentColor"
                fontSize="9"
                fontWeight="600"
                letterSpacing="1.5"
              >
                <textPath
                  href="#stamp-lower"
                  startOffset="75%"
                  textAnchor="middle"
                >
                  BUREAU OF ENTRY
                </textPath>
              </text>

              {/* Dot separators at 9 o'clock and 3 o'clock */}
              <circle cx="20" cy="60" r="2" fill="currentColor" />
              <circle cx="100" cy="60" r="2" fill="currentColor" />

              {/* Center: RefreshCw icon (Lucide), scaled and centered */}
              <g
                transform="translate(40, 40) scale(1.5)"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
                <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                <path d="M21 21v-5h-5" />
              </g>
            </g>
          </svg>
        </TooltipTrigger>
        <TooltipContent>Generate new identity</TooltipContent>
      </Tooltip>
    </div>
  );
}
