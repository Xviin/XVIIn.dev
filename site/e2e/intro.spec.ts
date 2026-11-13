import { test, expect } from "@playwright/test";

const overlay = (page: import("@playwright/test").Page) => page.getByTestId("intro-gate");

test("intro shows on first visit and click dismisses it", async ({ page }) => {
  await page.goto("/");
  await expect(overlay(page)).toBeVisible();
  await expect(overlay(page)).toContainText("XVIIn");
  await expect(overlay(page)).toContainText("click · skip");
  await overlay(page).click();
  await expect(overlay(page)).toHaveCount(0);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

test("intro not shown again in the same session", async ({ page }) => {
  await page.goto("/");
  await overlay(page).click();
  await expect(overlay(page)).toHaveCount(0);
  await page.reload();
  await page.waitForTimeout(300);
  await expect(overlay(page)).toHaveCount(0);
});

test("any key dismisses", async ({ page }) => {
  await page.goto("/");
  await expect(overlay(page)).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(overlay(page)).toHaveCount(0);
});

test("auto-dismisses after 9s", async ({ page }) => {
  await page.goto("/");
  await expect(overlay(page)).toBeVisible();
  await expect(overlay(page)).toHaveCount(0, { timeout: 10500 });
});

test("badge animation ends with the cursor blinking", async ({ page }) => {
  await page.goto("/");
  const cursor = page.getByTestId("intro-cursor");
  await expect(cursor).not.toHaveClass(/intro-cursor-on/);
  await expect(cursor).toHaveClass(/intro-cursor-on/, { timeout: 8500 });
});

test("turkish hint on /tr", async ({ page }) => {
  await page.goto("/tr");
  await expect(overlay(page)).toContainText("tıkla · geç");
});

test.describe("without javascript", () => {
  test.use({ javaScriptEnabled: false });
  test("content is reachable", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(overlay(page)).toBeHidden();
  });
});
