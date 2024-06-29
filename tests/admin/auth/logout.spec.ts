import { test, expect } from "@playwright/test";

test("ログアウト", async ({ page }) => {
  await page.goto(process.env.ADMIN_PATH);
  await page.getByRole("link", { name: "admin" }).click();
  await page.getByRole("link", { name: "ログアウト" }).click();
  await expect(page.getByRole("main")).toContainText("ログアウトしました");
});
