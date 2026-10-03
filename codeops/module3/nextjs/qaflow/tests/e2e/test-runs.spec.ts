import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

test.describe("Test Runs & Execution E2E", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.selectDemoProfile("Bonsa Tesfaye");
    await page.click('button[type="submit"]');
    await loginPage.expectLoggedIn();
  });

  test("navigates to execution runner and displays checklist", async ({
    page,
  }) => {
    await page.goto("/test-runs/run-24/execute/tc-1");
    await expect(page.locator("text=TC-PAY-021")).toBeVisible();
    await expect(page.locator("text=PASS")).toBeVisible();
    await expect(page.locator("text=FAIL")).toBeVisible();
    await expect(page.locator("text=BLOCKED")).toBeVisible();
  });
});
