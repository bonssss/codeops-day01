import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

test.describe("Authentication E2E", () => {
  test("allows user to log in with 1-click demo profile", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.selectDemoProfile("Bonsa Tesfaye");
    await page.click('button[type="submit"]');
    await loginPage.expectLoggedIn();
  });

  test("redirects unauthenticated users to login page", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(page).toHaveURL(/.*login/);
  });
});
