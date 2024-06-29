import { test as setup, expect } from "@playwright/test";

setup("authenticate", async ({ page }) => {
  await page.goto(process.env.ADMIN_PATH + "/baser-core/users/login");
  await page.getByLabel("Eメール").fill(process.env.LOGIN_EMAIL);
  await page.getByLabel("パスワード").fill(process.env.LOGIN_PASSWORD);
  await page.getByRole("button", { name: "ログイン" }).click();
  await page.waitForURL(process.env.ADMIN_PATH);
  await page.context().storageState({ path: process.env.AUTH_COOKIE_PATH });
});
