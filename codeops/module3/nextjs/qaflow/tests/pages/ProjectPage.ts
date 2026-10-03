import { type Page, expect } from "@playwright/test";

export class ProjectPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto("/projects");
  }

  async openCreateModal() {
    await this.page.click("text=Create Project");
  }

  async createProject(name: string, key: string, description?: string) {
    await this.openCreateModal();
    await this.page.fill("#proj-name", name);
    await this.page.fill("#proj-key", key);
    if (description) await this.page.fill("#proj-desc", description);
    await this.page.click('button:has-text("Create Workspace")');
  }

  async expectProjectListed(name: string) {
    await expect(this.page.locator(`text=${name}`)).toBeVisible();
  }
}
