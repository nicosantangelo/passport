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
