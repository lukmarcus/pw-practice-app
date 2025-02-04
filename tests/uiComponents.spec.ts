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
});

