import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
});

test.describe("Form Layouts page", () => {
  test.beforeEach(async ({ page }) => {
    await page.getByText("Forms").click();
    await page.getByText("Form Layouts").click();
  });

  test("Input fields", async ({ page }) => {
    const usingTheGridEmailInput = page
      .locator("nb-card", { hasText: "Using the grid" })
      .getByRole("textbox", { name: "email" });

    await usingTheGridEmailInput.fill("test@test.com");
    await usingTheGridEmailInput.clear();
    await usingTheGridEmailInput.pressSequentially("test2@test.com", {
      delay: 500,
    });

    const inputValue = await usingTheGridEmailInput.inputValue();
    expect(inputValue).toEqual("test2@test.com");

    await expect(usingTheGridEmailInput).toHaveValue("test2@test.com");

    const successButton = page.locator(".bg-success");
    await successButton.click();

    await successButton.waitFor({ state: "attached" });
    const text = await successButton.allTextContents();
    expect(text).toContain("Data loaded with AJAX get request.");
    await expect(successButton).toHaveText(
      "Data loaded with AJAX get request.",
      {
        timeout: 20000,
      }
    );
  });

  test("Radio buttons", async ({ page }) => {
    const usingTheGridForm = page.locator("nb-card", {
      hasText: "Using the grid",
    });

    await usingTheGridForm.getByLabel("Option 1").check({ force: true });
    await usingTheGridForm
      .getByRole("radio", { name: "Option 1" })
      .check({ force: true });
    const radioStatus = await usingTheGridForm
      .getByRole("radio", { name: "Option 1" })
      .isChecked();
    expect(radioStatus).toBeTruthy();
    await expect(
      usingTheGridForm.getByRole("radio", { name: "Option 1" })
    ).toBeChecked();

    await usingTheGridForm
      .getByRole("radio", { name: "Option 2" })
      .check({ force: true });
    expect(
      usingTheGridForm.getByRole("radio", { name: "Option 1" }).isChecked()
    ).toBeFalsy();
    expect(
      usingTheGridForm.getByRole("radio", { name: "Option 2" }).isChecked()
    ).toBeTruthy();
  });
});

test("Checkboxes", async ({ page }) => {
  await page.getByText("Modal & Overlays").click();
  await page.getByText("Toastr").click();

  await page
    .getByRole("checkbox", { name: "Hide on click" })
    .uncheck({ force: true });
  await page
    .getByRole("checkbox", { name: "Prevent arising of duplicate toast" })
    .check({ force: true });

  const allBoxes = page.getByRole("checkbox");
  for (const box of await allBoxes.all()) {
    await box.check({ force: true });
    expect(await box.isChecked()).toBeTruthy();
  }
});

test("Lists & dropdowns", async ({ page }) => {
  const dropDownMenu = page.locator("ngx-header nb-select");
  await dropDownMenu.click();

  // const optionList = page.getByRole('list').locator('nb-option')
  const optionList = page.locator("nb-option-list nb-option");
  await expect(optionList).toHaveText(["Light", "Dark", "Cosmic", "Corporate"]);
  await optionList.filter({ hasText: "Cosmic" }).click();

  const header = page.locator("nb-layout-header");
  await expect(header).toHaveCSS("background-color", "rgb(50, 50, 89");

  const colors = {
    Light: "rgb(255, 255, 255)",
    Dark: "rgb(34, 43, 69)",
    Cosmic: "rgb(50, 50, 89)",
    Corporate: "rgb(255, 255, 255)",
  };

  for (const color in colors) {
    await dropDownMenu.click();
    await optionList.filter({ hasText: color }).click();
    await expect(header).toHaveCSS("background-color", colors[color]);
  }
});

test("Tooltips", async ({ page }) => {
  await page.getByText("Modal & Overlays").click();
  await page.getByText("Tooltip").click();

  const tooltipCard = page.locator("nb-card", {
    hasText: "Tooltip Placements",
  });
  await tooltipCard.getByRole("button", { name: "TOP" }).hover();

  const tooltip = await page.locator("nb-tooltip").textContent();
  expect(tooltip).toEqual("This is a tooltip");
});

test("Dialog box", async ({ page }) => {
  await page.getByText("Tables & Data").click();
  await page.getByText("Smart Table").click();

  page.on("dialog", (dialog) => {
    expect(dialog.message).toEqual("Are you sure you want to delete?");
    dialog.accept();
  });

  await page
    .getByRole("table")
    .locator("tr", { hasText: "mdo@gmail.com" })
    .locator(".nb-trash")
    .click();
  await expect(page.locator("table tr").first()).not.toHaveText(
    "mdo@gmail.com"
  );
});

test("Web tables", async ({ page }) => {
  await page.getByText("Tables & Data").click();
  await page.getByText("Smart Table").click();

  const targetRow = page.getByRole("row", { name: "twitter@outlook.com" });
  await targetRow.locator(".nb-edit").click();
  await page.locator("input-editor").getByPlaceholder("Age").clear();
  await page.locator("input-editor").getByPlaceholder("Age").fill("35");
  await page.locator(".nb-checkmark").click();

  await page.locator(".ng2-smart-pagination-nav").getByText("2").click();
  const targetRowById = page
    .getByRole("row", { name: "11" })
    .filter({ has: page.locator("td").nth(1).getByText("11") });
  await targetRowById.locator(".nb-edit").click();
  await page.locator("input-editor").getByPlaceholder("E-mail").clear();
  await page
    .locator("input-editor")
    .getByPlaceholder("E-mail")
    .fill("test@test.com");
  await page.locator(".nb-checkmark").click();
  await expect(targetRowById.locator("td").nth(6)).toHaveText("test@test.com");

  const ages = ["20", "30", "40", "200"];

  for (let age of ages) {
    await page.locator("input-filter").getByPlaceholder("Age").clear();
    await page.locator("input-filter").getByPlaceholder("Age").fill(age);
    await page.waitForTimeout(500);
    const ageRows = page.locator("tbody tr");

    for (let row of await ageRows.all()) {
      const cellValue = await row.locator("td").last().textContent();

      if (age == "200") {
        expect(await page.getByRole("table").textContent()).toContain(
          "No data found"
        );
      } else {
        expect(cellValue).toEqual(age);
      }
    }
  }
});

test("Datepicker", async ({ page }) => {
  await page.getByText("Forms").click();
  await page.getByText("Datepicker").click();

  const calendarInputField = page.getByPlaceholder("Form Picker");
  await calendarInputField.click();

  let date = new Date();
  date.setDate(date.getDate() + 7);
  const expectedDate = date.getDate().toString();
  const expectedMonthShort = date.toLocaleString("En-US", { month: "short" });
  const expectedMonthLong = date.toLocaleString("En-US", { month: "long" });
  const expectedYear = date.getFullYear();
  const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`;

  let calendarmonthAndYear = await page
    .locator("nb-calendar-view-model")
    .textContent();
  const expectedMonthAndYear = ` ${expectedMonthLong} ${expectedYear}`;

  while (!calendarmonthAndYear.includes(expectedMonthAndYear)) {
    await page
      .locator('nb-calendar-pageable-navigation [data-name="chevron-right"]')
      .click();
    calendarmonthAndYear = await page
      .locator("nb-calendar-view-model")
      .textContent();
  }

  await page
    .locator("[class='day-cell ng-star-inserted]")
    .getByText(expectedDate, { exact: true })
    .click();
  await expect(calendarInputField).toHaveValue(dateToAssert);
});

test("Sliders", async ({ page }) => {
  const tempGauge = page.locator(
    '[tabtitle="Temperature"] ngx-temperature-dragger circle'
  );
  await tempGauge.evaluate((node) => {
    node.setAttribute("cx", "232.630");
    node.setAttribute("cy", "232.630");
  });
  await tempGauge.click();

  const tempBox = page.locator(
    '[tabtitle="Temperature"] ngx-temperature-dragger'
  );
  await tempBox.scrollIntoViewIfNeeded();

  const box = await tempBox.boundingBox();
  const x = box.x + box.width / 2;
  const y = box.y + box.height / 2;
  await page.mouse.move(x, y);
  await page.mouse.down();
  await page.mouse.move(x + 100, y);
  await page.mouse.move(x + 100, y + 100);
  await page.mouse.up();

  await expect(tempBox).toContainText("30");
});
