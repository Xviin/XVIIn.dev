import type { Page } from "@playwright/test";

/** Mark the intro as already seen so tests can interact with the page underneath. */
export async function skipIntro(page: Page) {
  await page.addInitScript(() => sessionStorage.setItem("xviin:intro-seen", "1"));
}
