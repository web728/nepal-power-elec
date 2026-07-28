import { describe, it, expect } from "vitest";
import { checkRateLimit, generateReferenceNumber, isDuplicateSubmission } from "./rate-limit";

describe("checkRateLimit", () => {
  it("allows requests under the limit and blocks once exceeded", () => {
    const key = `test-key-${Math.random()}`;
    const results = Array.from({ length: 6 }, () => checkRateLimit(key));
    expect(results.slice(0, 5).every((r) => r.allowed)).toBe(true);
    expect(results[5].allowed).toBe(false);
  });

  it("tracks separate keys independently", () => {
    const a = checkRateLimit(`independent-a-${Math.random()}`);
    const b = checkRateLimit(`independent-b-${Math.random()}`);
    expect(a.allowed).toBe(true);
    expect(b.allowed).toBe(true);
  });
});

describe("isDuplicateSubmission", () => {
  it("allows the first submission of a given payload", () => {
    const payload = { email: `unique-${Math.random()}@example.com`, fullName: "First Timer" };
    expect(isDuplicateSubmission("test_table", payload)).toBe(false);
  });

  it("flags an identical resubmission of the same payload to the same table", () => {
    const payload = { email: `dup-${Math.random()}@example.com`, fullName: "Double Clicker" };
    expect(isDuplicateSubmission("test_table_dup", payload)).toBe(false);
    expect(isDuplicateSubmission("test_table_dup", payload)).toBe(true);
  });

  it("does not flag the same payload submitted to a different table", () => {
    const payload = { email: `cross-${Math.random()}@example.com`, fullName: "Cross Table" };
    expect(isDuplicateSubmission("table_a", payload)).toBe(false);
    expect(isDuplicateSubmission("table_b", payload)).toBe(false);
  });

  it("does not flag a genuinely different payload", () => {
    const base = { email: `diff-${Math.random()}@example.com` };
    expect(isDuplicateSubmission("test_table_diff", { ...base, fullName: "Person A" })).toBe(false);
    expect(isDuplicateSubmission("test_table_diff", { ...base, fullName: "Person B" })).toBe(false);
  });
});

describe("generateReferenceNumber", () => {
  it("includes the given prefix and is unique across calls", () => {
    const a = generateReferenceNumber("EXH");
    const b = generateReferenceNumber("EXH");
    expect(a.startsWith("EXH-")).toBe(true);
    expect(a).not.toBe(b);
  });
});
