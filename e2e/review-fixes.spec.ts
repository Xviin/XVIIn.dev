import { test, expect } from "@playwright/test";
import { skipIntro } from "./helpers";

test.describe("language switch href (server html)", () => {
  test("on english project page points to tr version", async ({ request }) => {
    const html = await (await request.get("/projects/claff")).text();
    expect(html).not.toContain('href="/tr/en');
    expect(html).toContain('href="/tr/projects/claff"');
  });
  test("on english home points to /tr", async ({ request }) => {
    const html = await (await request.get("/")).text();
    expect(html).not.toContain('href="/tr/en');
  });
});

test.describe("locale param is validated", () => {
  test("traversal in locale is 404 and leaks nothing", async ({ request }) => {
    const res = await request.get("/..%2F..%2F..%2Fsrc%2Flib%2F__fixtures__%2Fprojects%2Falpha%2Ftr/projects/claff");
    expect(res.status()).toBe(404);
    expect(await res.text()).not.toContain("Alfa");
  });
  test("traversal to a broken file is not a 500", async ({ request }) => {
    const res = await request.get("/..%2F..%2F..%2Fsrc%2Flib%2F__fixtures__%2Fbroken%2Fbroken%2Fen/projects/claff");
    expect(res.status()).toBe(404);
  });
});

test.describe("unmatched paths render a proper 404 page", () => {
  test("/de is a full html document", async ({ page }) => {
    await skipIntro(page);
    const res = await page.goto("/de");
    expect(res?.status()).toBe(404);
    const raw = await res!.text();
    expect(raw.toLowerCase()).toContain("<html");
    await expect(page.getByText("Page not found")).toBeVisible();
  });
  test("/tr/foo shows turkish 404", async ({ page }) => {
    const res = await page.goto("/tr/foo");
    expect(res?.status()).toBe(404);
    await expect(page.getByText("Sayfa bulunamadı")).toBeVisible();
  });
});

test.describe("intro has no content flash", () => {
  test("overlay is in the server html for first visit", async ({ request }) => {
    const html = await (await request.get("/")).text();
    expect(html).toContain('data-testid="intro-gate"');
    expect(html).toContain("intro-pending");
  });
  test("navigating home from a project page does not pop the intro", async ({ page }) => {
    await page.goto("/projects/claff");
    await page.getByRole("link", { name: /Back/ }).click();
    await expect(page).toHaveURL(/\/#projects$/);
    await expect(page.getByTestId("intro-gate")).toBeHidden();
  });
});
