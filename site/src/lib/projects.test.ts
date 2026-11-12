import { describe, it, expect } from "vitest";
import path from "node:path";
import { getAllProjects, getProject } from "./projects";

const dir = path.join(__dirname, "__fixtures__/projects");
const brokenDir = path.join(__dirname, "__fixtures__/broken");

describe("projects", () => {
  it("lists all projects sorted by order", async () => {
    const all = await getAllProjects("en", dir);
    expect(all.map((p) => p.slug)).toEqual(["only-en", "alpha"]);
  });

  it("uses the locale file when present", async () => {
    const p = await getProject("alpha", "tr", dir);
    expect(p?.meta.title).toBe("Alfa");
    expect(p?.meta.locale).toBe("tr");
    expect(p?.meta.isFallback).toBe(false);
    expect(p?.body.trim()).toBe("Alfa gövde TR");
  });

  it("falls back to english when the locale file is missing", async () => {
    const p = await getProject("only-en", "tr", dir);
    expect(p?.meta.locale).toBe("en");
    expect(p?.meta.isFallback).toBe(true);
  });

  it("lists fallback projects on tr too", async () => {
    const all = await getAllProjects("tr", dir);
    expect(all).toHaveLength(2);
  });

  it("returns null for unknown slug", async () => {
    expect(await getProject("missing", "en", dir)).toBeNull();
  });

  it("rejects slugs with path tricks", async () => {
    expect(await getProject("../broken", "en", dir)).toBeNull();
  });

  it("throws naming the file when a required field is missing", async () => {
    await expect(getAllProjects("en", brokenDir)).rejects.toThrow(/broken\/en\.mdx.*title/);
  });
});
