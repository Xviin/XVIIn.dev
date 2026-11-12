import { test, expect } from "@playwright/test";

test("home has black background and XVIIn", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("XVIIn");
  const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  expect(bg).toBe("rgb(5, 6, 8)");
});
