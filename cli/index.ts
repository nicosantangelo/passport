import pc from "picocolors";
import {
  generatePassport,
  EMAIL_PROVIDERS,
  SMS_PROVIDERS,
  type Passport,
} from "../src/lib/passport";

const BOX_WIDTH = 48;

function formatMrz(passport: Passport): { line1: string; line2: string } {
  const surname = passport.lastName.toUpperCase().replace(/[^A-Z]/g, "");
  const given = passport.firstName.toUpperCase().replace(/[^A-Z]/g, "");
  const nameField = `${surname}<<${given}`.padEnd(39, "<").slice(0, 39);
  const icao = passport.countryCode.padEnd(3, "<");
  const line1 = `P<${icao}${nameField}`.slice(0, 44);

  const dobParts = passport.dob.split("/");
  const mrzDob =
    dobParts.length === 3
      ? `${dobParts[2].slice(2)}${dobParts[0]}${dobParts[1]}`
      : "000000";
  const line2 = `ID0000000<0${icao}${mrzDob}0F3001010<<<<<<<<<<<<00`
    .padEnd(44, "<")
    .slice(0, 44);

  return { line1, line2 };
}

function boxLine(content: string, rawLength: number): string {
  const padding = BOX_WIDTH - 4 - rawLength;
  return `  ${pc.dim("│")}  ${content}${" ".repeat(Math.max(0, padding))}${pc.dim("│")}`;
}

function emptyLine(): string {
  return `  ${pc.dim("│")}${" ".repeat(BOX_WIDTH - 2)}${pc.dim("│")}`;
}

function separatorLine(): string {
  return `  ${pc.dim("├" + "─".repeat(BOX_WIDTH - 2) + "┤")}`;
}

function topLine(): string {
  return `  ${pc.dim("┌" + "─".repeat(BOX_WIDTH - 2) + "┐")}`;
}

function bottomLine(): string {
  return `  ${pc.dim("└" + "─".repeat(BOX_WIDTH - 2) + "┘")}`;
}

function field(label: string, value: string): string {
  const labelWidth = 18;
  const paddedLabel = label.padEnd(labelWidth);
  const rawLength = paddedLabel.length + value.length;
  return boxLine(`${pc.dim(paddedLabel)}${pc.bold(value)}`, rawLength);
}

function providerLine(value: string, isFirst: boolean, label: string): string {
  if (isFirst) {
    const labelWidth = 18;
    const paddedLabel = label.padEnd(labelWidth);
    const rawLength = paddedLabel.length + value.length;
    return boxLine(`${pc.dim(paddedLabel)}${value}`, rawLength);
  }

  const indent = 18;
  const rawLength = indent + value.length;
  return boxLine(`${" ".repeat(indent)}${value}`, rawLength);
}

export function formatPassport(passport: Passport): string {
  const mrz = formatMrz(passport);
  const lines: string[] = [];

  lines.push("");
  lines.push(topLine());

  // Header
  const header = "INTERNET PASSPORT";
  const flag = passport.countryFlag;
  const flagVisualWidth = 2;
  const headerGap = BOX_WIDTH - 4 - header.length - flagVisualWidth - 1;
  lines.push(
    boxLine(
      `${pc.bold(header)}${" ".repeat(Math.max(0, headerGap))}${flag} `,
      header.length + Math.max(0, headerGap) + flagVisualWidth + 1,
    ),
  );

  lines.push(separatorLine());

  // Identity fields
  lines.push(field("GIVEN NAME", passport.firstName));
  lines.push(field("SURNAME", passport.lastName));
  lines.push(field("DATE OF BIRTH", passport.dob));
  lines.push(field("SEX", passport.sex));
  lines.push(field("PHONE", passport.phone));
  lines.push(field("ADDRESS", passport.address));
  lines.push(field("COUNTRY", passport.country));
  lines.push(field("CITY", passport.city));
  lines.push(field("STATE", passport.state));
  lines.push(field("ZIP CODE", passport.zip));

  // MRZ
  lines.push(emptyLine());
  lines.push(boxLine(pc.dim(mrz.line1), mrz.line1.length));
  lines.push(boxLine(pc.dim(mrz.line2), mrz.line2.length));

  // Digital visa section
  lines.push(separatorLine());
  lines.push(boxLine(pc.bold("DIGITAL VISA"), "DIGITAL VISA".length));
  lines.push(separatorLine());

  lines.push(field("USERNAME", passport.username));
  lines.push(field("PASSWORD", passport.password));

  // Temp email providers
  lines.push(emptyLine());
  EMAIL_PROVIDERS.forEach((provider, index) => {
    lines.push(providerLine(provider.name, index === 0, "TEMP EMAIL"));
  });

  // SMS providers
  lines.push(emptyLine());
  SMS_PROVIDERS.forEach((provider, index) => {
    lines.push(providerLine(provider.name, index === 0, "SMS RECEIVER"));
  });

  lines.push(bottomLine());
  lines.push("");

  return lines.join("\n");
}

export function formatJson(passport: Passport): string {
  const { email, ...rest } = passport;
  return JSON.stringify(rest, null, 2);
}

function printHelp(): void {
  console.log(`Usage: ./passport [--json] [--help]

Generate a fake identity for temporary signups and testing.
Run again for a new identity.

Options:
  --json    Output as JSON (for piping)
  --help    Show this message`);
}

function main(): void {
  const args = process.argv.slice(2);

  if (args.includes("--help") || args.includes("-h")) {
    printHelp();
    return;
  }

  const passport = generatePassport();

  if (args.includes("--json")) {
    console.log(formatJson(passport));
  } else {
    console.log(formatPassport(passport));
  }
}

const isDirectRun =
  process.argv[1]?.endsWith("/cli/index.ts") ||
  process.argv[1]?.endsWith("/cli/index");

if (isDirectRun) {
  main();
}
