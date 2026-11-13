import { test, expect } from "@playwright/test";
import { skipIntro } from "./helpers";

test.beforeEach(async ({ page }) => skipIntro(page));

test("header shows the badge logo linking home", async ({ page }) => {
  await page.goto("/tr/projects/claff");
  const logo = page.getByRole("banner").getByRole("img", { name: "XVIIn" });
  await expect(logo).toBeVisible();
  await expect(logo).toHaveAttribute("src", /brand-rozet\.svg/);
});

test("home opens straight onto the projects", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByTestId("hero-logo")).toHaveCount(0);
  const box = await page.locator("#projects").boundingBox();
  expect(box!.y).toBeLessThan(200);
});

test("favicon, apple icon and og image are declared", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('link[rel="icon"]')).toHaveCount(1);
  await expect(page.locator('link[rel="apple-touch-icon"]')).toHaveCount(1);
  await expect(page.locator('meta[property="og:image"]')).toHaveCount(1);
});

test("intro shows the badge", async ({ browser }) => {
  const page = await (await browser.newContext()).newPage();
  await page.goto("/");
  await expect(page.getByTestId("intro-gate").getByRole("img", { name: "XVIIn" })).toBeVisible();
});
