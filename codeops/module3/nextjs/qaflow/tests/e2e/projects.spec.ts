import { test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { ProjectPage } from "../pages/ProjectPage";

test.describe("Projects E2E", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.selectDemoProfile("Bonsa Tesfaye");
    await page.click('button[type="submit"]');
    await loginPage.expectLoggedIn();
  });

  test("displays active projects", async ({ page }) => {
    const projectPage = new ProjectPage(page);
    await projectPage.goto();
    await projectPage.expectProjectListed("E-Commerce Platform");
  });
});
