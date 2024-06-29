import { test, expect } from "@playwright/test";

test("[フロント] 固定ページ", async ({ page }) => {
  await page.goto("/about");
  await expect(page.getByRole("heading", { name: "会社案内" })).toBeVisible();
});
