import { test, expect } from "@playwright/test";

test("[フロント] ブログ一覧", async ({ page }) => {
  await page.goto("/news/");

  await expect(
    await page.locator(".bs-blog-post > article").count()
  ).toBeGreaterThan(0);
});

test("[フロント] ブログ詳細", async ({ page }) => {
  await page.goto("/news/archives/1");

  await expect(page.locator(".bs-blog-post-title")).toHaveText(
    "メールフォーム機能について説明します"
  );
});
