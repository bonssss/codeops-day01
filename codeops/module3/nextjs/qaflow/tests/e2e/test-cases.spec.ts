import { test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { TestCasePage } from "../pages/TestCasePage";

test.describe("Test Cases E2E", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.selectDemoProfile("Bonsa Tesfaye");
    await page.click('button[type="submit"]');
    await loginPage.expectLoggedIn();
  });

  test("displays repository test cases", async ({ page }) => {
    const testCasePage = new TestCasePage(page);
    await testCasePage.goto();
    await testCasePage.expectTestCaseVisible("TC-AUTH-001");
  });
});
