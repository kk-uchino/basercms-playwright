import { test, expect } from "@playwright/test";

test("[管理画面] ログイン", async ({ page }) => {
  await page.goto(process.env.ADMIN_PATH + "/baser-core/users/login");

  await page.locator("#email").fill(process.env.LOGIN_EMAIL);
  await page.locator("#password").fill(process.env.LOGIN_PASSWORD);
  await page.locator("#BtnLogin").click();
  await page.waitForURL(process.env.ADMIN_PATH);

  await expect(page.locator("#flashMessage")).toHaveClass(/info-message/);
});

test("[管理画面] パスワードのリセット", async ({ page }) => {
  await page.goto(
    process.env.ADMIN_PATH + "/baser-core/password_requests/entry"
  );

  await page.locator("#email").fill(process.env.LOGIN_EMAIL);
  await page.locator("#BtnSave").click();
  await page.waitForURL(
    process.env.ADMIN_PATH + "/baser-core/password_requests/entry"
  );

  await expect(page.locator("#flashMessage")).toHaveClass(/notice-message/);
});

test("ログアウト", async ({ page }) => {
  // TODO
});
