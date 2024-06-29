import { test, expect } from "@playwright/test";

test("[フロント] ブログ一覧", async ({ page }) => {
  await page.goto("/news/");
  await expect(page.getByRole("heading", { name: "NEWS" })).toBeVisible();
});

test("[フロント] ブログ詳細", async ({ page }) => {
  await page.goto("/news/archives/1");
  await expect(
    page.getByRole("heading", { name: "メールフォーム機能について説明します" })
  ).toBeVisible();
});

test("[フロント] ブログ詳細 - コメント", async ({ page }) => {
  await page.goto("/news/archives/1");
  await page.getByLabel("お名前 / ニックネーム").fill("test");
  await page.getByLabel("メールアドレス").fill("test@example.com");
  await page.getByLabel("URL").fill("https://example.com");
  await page.getByLabel("コメント").fill("コメントTEST");
  await page.getByRole("button", { name: "送信する" }).click();
  await expect(page.getByRole("main")).toContainText("コメントTEST");
});

test("[フロント] ブログ詳細 - 必須エラー", async ({ page }) => {
  page.on("dialog", async (dialog) => {
    expect(dialog.message()).toContain("入力してください");
    await dialog.accept();
  });
  await page.goto("/news/archives/1");
  await page.getByRole("button", { name: "送信する" }).click();
});
