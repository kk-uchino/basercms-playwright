import { test, expect } from "@playwright/test";

test("[管理画面] ログイン", async ({ page }) => {
  await page.goto(process.env.ADMIN_PATH + "/baser-core/users/login");
  await page.getByLabel("Eメール").fill(process.env.LOGIN_EMAIL);
  await page.getByLabel("パスワード").fill(process.env.LOGIN_PASSWORD);
  await page.getByRole("button", { name: "ログイン" }).click();
  await expect(page.getByRole("main")).toContainText(/ようこそ、.*さん。/);
});

test("[管理画面] ログイン - 失敗", async ({ page }) => {
  await page.goto(process.env.ADMIN_PATH + "/baser-core/users/login");
  await page.getByLabel("Eメール").fill(process.env.LOGIN_EMAIL);
  await page
    .getByLabel("パスワード")
    .fill(process.env.LOGIN_PASSWORD + "_fail");
  await page.getByRole("button", { name: "ログイン" }).click();
  await expect(page.getByRole("main")).toContainText(
    "Eメール、または、パスワードが間違っています。"
  );
});

test("[管理画面] パスワードのリセット", async ({ page }) => {
  await page.goto(
    process.env.ADMIN_PATH + "/baser-core/password_requests/entry"
  );
  await page
    .getByPlaceholder("yourname@example.com")
    .fill(process.env.LOGIN_EMAIL);
  await page.getByRole("button").click();
  await expect(page.getByRole("main")).toContainText(
    "パスワードのリセットを受付ました。"
  );
});
