import { test, expect } from "@playwright/test";

test("sitemap lists both locales and project pages", async ({ request }) => {
  const res = await request.get("/sitemap.xml");
  expect(res.ok()).toBe(true);
  const xml = await res.text();
  expect(xml).toContain("/projects/claff");
  expect(xml).toContain("/tr/projects/claff");
});

test("robots.txt points to sitemap", async ({ request }) => {
  const txt = await (await request.get("/robots.txt")).text();
  expect(txt).toMatch(/Sitemap: .*\/sitemap\.xml/);
});

test("home declares hreflang alternates", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('link[rel="alternate"][hreflang="tr"]')).toHaveCount(1);
});
