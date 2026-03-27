export function PassportMrz({
  line1,
  line2,
}: {
  line1: string;
  line2: string;
}) {
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
    <div className="border-t border-border px-5 py-5 flex flex-col gap-1.5">
      <Row lines={line1.split("")} />
      <Row lines={line2.split("")} />
    </div>
  );
}
