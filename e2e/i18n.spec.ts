import { test, expect } from "@playwright/test";
import { skipIntro } from "./helpers";

test.beforeEach(async ({ page }) => skipIntro(page));

test("english is default at /", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByRole("navigation").getByText("Projects")).toBeVisible();
});

test("turkish at /tr", async ({ page }) => {
  await page.goto("/tr");
  await expect(page.locator("html")).toHaveAttribute("lang", "tr");
  await expect(page.getByRole("navigation").getByText("Projeler")).toBeVisible();
});

test("language switch toggles en <-> tr", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("lang-switch").click();
  await expect(page).toHaveURL(/\/tr$/);
  await page.getByTestId("lang-switch").click();
  await expect(page).toHaveURL(/localhost:3000\/?$/);
});

test("unknown locale is 404", async ({ page }) => {
  const res = await page.goto("/de");
  expect(res?.status()).toBe(404);
});
