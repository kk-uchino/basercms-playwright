import { test, expect } from "@playwright/test";

test("[フロント] 固定ページ", async ({ page }) => {
  await page.goto("/about");

  await expect(page.locator(".bs-main-contents > h2")).toHaveText("会社案内");
});
