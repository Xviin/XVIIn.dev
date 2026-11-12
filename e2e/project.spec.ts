import { test, expect } from "@playwright/test";

test("project page renders title and tagline", async ({ page }) => {
  await page.goto("/projects/claff");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Claff");
  await expect(page.getByText("never miss a due date")).toBeVisible();
  await expect(page).toHaveTitle("Claff — XVIIn");
});

test("tr page falls back to english with a note", async ({ page }) => {
  await page.goto("/tr/projects/mac-network-tool");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Mac Network Tool");
  await expect(page.getByText("henüz Türkçe değil")).toBeVisible();
});

test("tr page uses turkish file when present", async ({ page }) => {
  await page.goto("/tr/projects/claff");
  await expect(page.getByText("Faturalar ve Ödemeler")).toBeVisible();
});

test("unknown project is 404", async ({ page }) => {
  const res = await page.goto("/projects/nope");
  expect(res?.status()).toBe(404);
  await expect(page.getByText("Page not found")).toBeVisible();
});

test("no horizontal scroll at 375px", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/projects/claff");
  const ok = await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth);
  expect(ok).toBe(true);
});
