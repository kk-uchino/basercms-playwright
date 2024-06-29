import { test, expect } from "@playwright/test";

test("[フロント] フォーム", async ({ page }) => {
  await page.goto("/contact/");
  await expect(
    page.getByRole("heading", { name: "お問い合わせ" })
  ).toBeVisible();

  await page.getByPlaceholder("姓").fill("test");
  await page.getByPlaceholder("名", { exact: true }).fill("test");
  await page.getByText("男性").click();
  await page.locator('input[name="email_1"]').fill("example.com");
  await page.locator('input[name="email_1"]').fill("test@example.com");
  await page
    .getByPlaceholder("確認のためもう一度入力して下さい")
    .fill("test@example.com");
  await page
    .getByPlaceholder("ハイフン抜きで入力して下さい")
    .fill("08000000000");
  await page
    .getByPlaceholder("〒 郵便番号をハイフン抜きで入力してください")
    .fill("1000000");
  await page.getByPlaceholder("市区町村・番地").fill("千代田区");
  await page.getByPlaceholder("建物名").fill("test");
  await page.getByText("資料請求").click();
  await page.getByText("問い合わせ", { exact: true }).click();
  await page.locator('textarea[name="message"]').fill("test");
  await page.locator('select[name="root"]').selectOption("検索エンジン");
  await page.getByRole("button", { name: "入力内容を確認する" }).click();
  await expect(
    page.getByRole("heading", { name: "入力内容の確認" })
  ).toBeVisible();

  await page.getByRole("button", { name: "書き直す" }).click();
  await expect(
    page.getByRole("heading", { name: "入力フォーム" })
  ).toBeVisible();

  await page.getByRole("button", { name: "入力内容を確認する" }).click();
  await expect(
    page.getByRole("heading", { name: "入力内容の確認" })
  ).toBeVisible();

  await page.getByRole("button", { name: "送信する" }).click();
  await expect(
    page.getByRole("heading", { name: "メール送信完了" })
  ).toBeVisible();
});

test("[フロント] フォーム - 必須エラー", async ({ page }) => {
  await page.goto("/contact/");
  await expect(
    page.getByRole("heading", { name: "お問い合わせ" })
  ).toBeVisible();

  await page.getByRole("button", { name: "入力内容を確認する" }).click();
  await expect(page.getByRole("main")).toContainText(
    "エラー : 入力内容を確認して再度送信してください。"
  );
});
