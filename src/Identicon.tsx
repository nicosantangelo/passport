/**
 * Deterministic 5x5 symmetric identicon, similar to GitHub/Ethereum avatars.
 * Uses a simple hash of the seed string to pick colors and fill a grid.
 */
export function Identicon({
  seed,
  className,
}: {
  seed: string;
  className?: string;
}) {
  const hash = simpleHash(seed);
  const [foreground, background] = pickColorPair(hash);
  const cells = buildSymmetricGrid(hash);

  return (
    <svg
      viewBox="0 0 5 5"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="5" height="5" fill={background} />

      {cells.map(([column, row]) => (
        <rect
          key={`${column}-${row}`}
          x={column}
          y={row}
          width="1"
          height="1"
          fill={foreground}
        />
      ))}
    </svg>
  );
}

/**
 * Simple 32-bit hash (djb2 variant) to derive deterministic values from a string.
 */
function simpleHash(input: string): number {
  let hash = 5381;

  for (let i = 0; i < input.length; i++) {
    hash = ((hash << 5) + hash + input.charCodeAt(i)) | 0;
  }

  return hash >>> 0;
}

/**
 * Pick a contrasting foreground/background pair.
 * Uses complementary hues (~180 degrees apart) and a guaranteed lightness gap.
 */
function pickColorPair(hash: number): [string, string] {
  const hue = hash % 360;
  const complementaryHue = (hue + 140 + (hash % 80)) % 360;

  const foreground = `hsl(${hue}, ${55 + (hash % 25)}%, ${45 + (hash % 15)}%)`;
  const background = `hsl(${complementaryHue}, ${30 + (hash % 20)}%, ${20 + (hash % 10)}%)`;

  return [foreground, background];
}

/**
 * Build a 5x5 grid with left-right symmetry.
 * Only the left 3 columns are generated; columns 3 and 4 mirror columns 1 and 0.
 */
function buildSymmetricGrid(hash: number): [number, number][] {
  const cells: [number, number][] = [];
  let bits = hash;

  for (let row = 0; row < 5; row++) {
    for (let column = 0; column < 3; column++) {
      if (bits & 1) {
        cells.push([column, row]);

        if (column < 2) {
          cells.push([4 - column, row]);
        }
      }

      bits >>>= 1;

      if (bits === 0) {
        bits = simpleHash(String(hash + row));
      }
    }
  }

  return cells;
}
