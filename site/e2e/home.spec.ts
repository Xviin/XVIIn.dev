import { test, expect } from "@playwright/test";
import { skipIntro } from "./helpers";

test.beforeEach(async ({ page }) => skipIntro(page));

test("home shows projects and contact sections", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Projects", level: 2 })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Contact", level: 2 })).toBeVisible();
});

test("project card links to its page (en and tr)", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: /Claff/ })).toHaveAttribute("href", "/projects/claff");
  await page.goto("/tr");
  await expect(page.getByRole("link", { name: /Claff/ })).toHaveAttribute("href", "/tr/projects/claff");
});

test("footer has GitHub and Email", async ({ page }) => {
  await page.goto("/");
  const footer = page.getByRole("contentinfo");
  await expect(footer.getByText("GitHub")).toBeVisible();
  await expect(footer.getByText("Email")).toBeVisible();
});

test("no horizontal scroll at 375px", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  const ok = await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth);
  expect(ok).toBe(true);
});
