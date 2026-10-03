import { type Page, expect } from "@playwright/test";

export class DashboardPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto("/dashboard");
  }

  async expectMetricsVisible() {
    await expect(
      this.page.locator("text=QA Analytics Dashboard"),
    ).toBeVisible();
    await expect(this.page.locator("text=Total Projects")).toBeVisible();
    await expect(this.page.locator("text=Overall Pass Rate")).toBeVisible();
  }
}
