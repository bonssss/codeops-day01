import { type Page, expect } from "@playwright/test";

export class BugPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto("/bugs");
  }

  async expectBugVisible(key: string) {
    await expect(this.page.locator(`text=${key}`)).toBeVisible();
  }
}
