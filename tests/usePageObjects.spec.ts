import { test } from "@playwright/test";
import { PageManager } from "../page-objects/pageManager";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
});

test("Navigate to form page", async ({ page }) => {
  const pm = new PageManager(page);
  await pm.navigateTo.formLayoutsPage();
  await pm.navigateTo.datePickerPage();
  await pm.navigateTo.smartTablePage();
  await pm.navigateTo.toastPage();
  await pm.navigateTo.tooltipPage();
});

test("Parametrized methods", async ({ page }) => {
  const pm = new PageManager(page);

  await pm.navigateTo.formLayoutsPage();
  await pm.onFormsLayoutsPage.submitUsingTheGridFormWithCredentialsAndSelectOption(
    "test@test.com",
    "Welcome1",
    "Option 2"
  );
  await pm.onFormsLayoutsPage.submitInlineFormWithNameEmailAndCheckbox(
    "John Smith",
    "john@test.com",
    true
  );
  await pm.navigateTo.datePickerPage();
  await pm.onDatePickerPage.selectCommonDatePickerDateFromToday(5);
  await pm.onDatePickerPage.selectDatepickerWithRangeFromToday(6, 15);
});
