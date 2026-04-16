import { describe, it, expect } from "vitest";
import { generatePassport } from "../src/lib/passport";
import { formatPassport, formatJson } from "./index";

describe("CLI output", () => {
  it("json output contains all passport fields", () => {
    const passport = generatePassport();
    const json = formatJson(passport);
    const parsed = JSON.parse(json);

    expect(parsed.firstName).toBeTruthy();
    expect(parsed.lastName).toBeTruthy();
    expect(parsed.country).toBeTruthy();
    expect(parsed.username).toBeTruthy();
    expect(parsed.password).toBeTruthy();
    expect(parsed.dob).toMatch(/^\d{2}\/\d{2}\/\d{4}$/);
  });

  it("pretty output contains passport and visa sections", () => {
    const passport = generatePassport();
    const output = formatPassport(passport);

    expect(output).toContain("INTERNET PASSPORT");
    expect(output).toContain("DIGITAL VISA");
    expect(output).toContain("P<");
    expect(output).toContain(passport.firstName);
    expect(output).toContain(passport.username);
  });
});
