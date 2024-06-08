import { test, expect } from "@playwright/test";

test("[フロント] トップページ", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle("My Site");
});
