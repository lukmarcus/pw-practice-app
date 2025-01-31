import { test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4200/');
  await page.getByText("Forms").click()
  await page.getByText("Form Layouts").click()
})

test('User facing locators', async ({ page }) => {
  await page.getByRole('textbox', {name: "Email"}).first().click()
  await page.getByRole('button', {name: "Sign in"}).first().click()
  await page.getByLabel('Email').first().click()
  await page.getByPlaceholder('Jane Doe').click()
  await page.getByText('Using the Grid').click()
  await page.getByTestId('Using the Grid').click()
  await page.getByTitle('IoT Dashboard').click()
});

test('Locating child elements', async ({ page }) => {
  await page.locator('nb-card nb-radio :text-is("Option 1")').click()
  await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()
  await page.locator('nb-card').getByRole('button', {name: 'Sign in'}).first().click()
  await page.locator('nb-card').nth(3).getByRole('button').click()
});

test('Locating parent elements', async ({ page }) => {
  await page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"}).click()
  await page.locator('nb-card', {has: page.locator('#inputEmail1')}).getByRole('textbox', {name: "Email"}).click()
  await page.locator('nb-card').filter({hasText: 'Basic form'}).getByRole('textbox', {name: "Email"}).click()
  await page.locator('nb-card').filter({has: page.locator('.status-danger')}).getByRole('textbox', {name: "Password"}).click()
  await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: 'Sign in'}).getByRole('textbox', {name: "Email"}).click()
  await page.locator(':text-is("Using the grid")').locator('..').getByRole('textbox', {name: "Email"}).click()
})