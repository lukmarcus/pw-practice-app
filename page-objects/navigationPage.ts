import { Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class NavigationPage extends HelperBase {
  formLayoutsMenuItem = this.page.getByText("Form Layouts");
  datePickerMenuItem = this.page.getByText("Datepicker");
  smartTableMenuItem = this.page.getByText("Smart Table");
  toastMenuItem = this.page.getByText("Toastr");
  tooltipMenuItem = this.page.getByText("Tooltip");

  constructor(page: Page) {
    super(page);
  }

  async formLayoutsPage() {
    await this.selectGroupMenuItem("Forms");
    await this.formLayoutsMenuItem.click();
    await this.waitForNumberOfSeconds(2);
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
