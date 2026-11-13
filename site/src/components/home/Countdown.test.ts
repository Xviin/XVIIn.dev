import { describe, expect, it } from "vitest";
import { daysUntil } from "./Countdown";

describe("daysUntil", () => {
  it("counts whole Istanbul days", () => {
    expect(daysUntil("2026-11-16", new Date("2026-11-13T09:00:00+03:00"))).toBe(3);
    expect(daysUntil("2026-11-16", new Date("2026-11-15T23:30:00+03:00"))).toBe(1);
    expect(daysUntil("2026-11-16", new Date("2026-11-16T00:10:00+03:00"))).toBe(0);
    expect(daysUntil("2026-11-16", new Date("2026-11-17T10:00:00+03:00"))).toBe(-1);
  });
  it("uses Istanbul time, not UTC", () => {
    // 22:30 UTC on the 15th is already the 16th in Istanbul
    expect(daysUntil("2026-11-16", new Date("2026-11-15T22:30:00Z"))).toBe(0);
  });
});
