import { type Page, expect } from "@playwright/test";

export class TestCasePage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto("/test-cases");
  }

  async openCreateModal() {
    await this.page.click("text=New Test Case");
  }

  async expectTestCaseVisible(key: string) {
    await expect(this.page.locator(`text=${key}`)).toBeVisible();
  }
}
