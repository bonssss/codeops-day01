import { test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { BugPage } from "../pages/BugPage";

test.describe("Bugs & Traceability E2E", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.selectDemoProfile("Bonsa Tesfaye");
    await page.click('button[type="submit"]');
    await loginPage.expectLoggedIn();
  });

  test("displays reported defects with traceability indicators", async ({
    page,
  }) => {
    const bugPage = new BugPage(page);
    await bugPage.goto();
    await bugPage.expectBugVisible("BUG-104");
  });
});
