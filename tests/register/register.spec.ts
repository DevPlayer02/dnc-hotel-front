import { test, expect } from "@playwright/test";

test("It should register a user successfully.", async ({ page }) => {
  await page.goto("http://localhost:3001/register");

  await expect(page).toHaveTitle(/Hotel DNC/i);
  await page.getByLabel(/Enter your full name/i).fill("Test DNC");
  await page.getByLabel(/e-mail/i).fill("test@dnc.com");
  await page.getByLabel(/^password/i).fill("12345");
  await page.getByLabel(/confirm password/i).fill("12345");
  await page.getByLabel(/^yes/i).click();
  await page.getByRole("button", { name: /^register/i }).click();
  await expect(page).toHaveURL("http://localhost:3001/login");
});
