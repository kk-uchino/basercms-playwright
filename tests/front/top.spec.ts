import { test, expect } from "@playwright/test";

test("[フロント] トップページ", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "baserCMSサンプルテーマ" })
  ).toBeVisible();
});

test("[フロント] トップページ - サイト内検索", async ({ page }) => {
  await page.goto("/");
  await page.getByPlaceholder("キーワード").fill("会社案内");
  await page.getByRole("button", { name: "検索" }).click();
  await expect(page.getByRole("main")).toContainText("会社案内 で検索した結果");
});

test("[フロント] トップページ - サイト内検索 - 未入力", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "検索" }).click();
  await expect(page.getByRole("main")).toContainText(
    "検索キーワードを入力してください。"
  );
});
