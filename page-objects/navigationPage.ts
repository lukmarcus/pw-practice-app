import { Page, Locator } from "@playwright/test";

export class NavigationPage {
  readonly page: Page;
  readonly formLayoutsMenuItem: Locator;
  readonly datePickerMenuItem: Locator;
  readonly smartTableMenuItem: Locator;
  readonly toastMenuItem: Locator;
  readonly tooltipMenuItem: Locator;

  constructor(page: Page) {
    this.page = page;
    this.formLayoutsMenuItem = this.page.getByText("Form Layouts");
    this.datePickerMenuItem = this.page.getByText("Datepicker");
    this.smartTableMenuItem = this.page.getByText("Smart Table");
    this.toastMenuItem = this.page.getByText("Toastr");
    this.tooltipMenuItem = this.page.getByText("Tooltip");
  }

  async formLayoutsPage() {
    await this.selectGroupMenuItem("Forms");
    await this.formLayoutsMenuItem.click();
  }

  async datePickerPage() {
    await this.selectGroupMenuItem("Forms");
    await this.datePickerMenuItem.click();
  }

  async smartTablePage() {
    await this.selectGroupMenuItem("Tables & Data");
    await this.smartTableMenuItem.click();
  }

  async toastPage() {
    await this.selectGroupMenuItem("Modal & Overlays");
    await this.toastMenuItem.click();
  }

  async tooltipPage() {
    await this.selectGroupMenuItem("Modal & Overlays");
    await this.tooltipMenuItem.click();
  }

  private async selectGroupMenuItem(groupItemTitle: string) {
    const groupMenuItem = this.page.getByTitle(groupItemTitle);
    const expandedState = await groupMenuItem.getAttribute("aria-expanded");
    if (expandedState === "false") {
      await groupMenuItem.click();
    }
  }
}
