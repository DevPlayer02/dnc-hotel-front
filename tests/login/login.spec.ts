import { test, expect } from "@playwright/test";

test("It should perform authentication successfully.", async ({ page }) => {
  await page.goto("http://localhost:3001/");

  await expect(page).toHaveURL("http://localhost:3001/login");

  await page.getByLabel(/e-mail/i).fill("xohackudo@dnc.com");
  await page.getByLabel(/^password/i).fill("12345");
  await page.getByRole("button", { name: /^login/i }).click();

  await expect(page).toHaveURL("http://localhost:3001/");
});

test("It should keep the user on the login screen if the password is invalid.", async ({
  page,
}) => {
  await page.goto("http://localhost:3001/");

  await expect(page).toHaveURL("http://localhost:3001/login");

  await page.getByLabel(/e-mail/i).fill("xohackudo@dnc.com");
  await page.getByLabel(/^password/i).fill("passwordincorrect");
  await page.getByRole("button", { name: /^login/i }).click();

  await expect(page).toHaveURL("http://localhost:3001/login");
});

test("It should prompt to fill in the required fields.", async ({ page }) => {
  await page.goto("http://localhost:3001/");

  await expect(page).toHaveURL("http://localhost:3001/login");

  await page.getByLabel(/e-mail/i).fill("xohackudo@dnc.com");
  await page.getByRole("button", { name: /^login/i }).click();

  await expect(page).toHaveURL("http://localhost:3001/login");
  await expect(page.getByLabel(/^password/i)).toBeFocused();
});
