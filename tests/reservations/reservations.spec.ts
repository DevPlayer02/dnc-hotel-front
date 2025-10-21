import { test, expect } from "@playwright/test";

const getFormattedDate = (date: Date) => {
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const year = date.getFullYear()

  return `${year}-${month}-${day}`
}

test("It should be able to make a reservation successfully.", async ({
  page,
}) => {
  await page.goto("http://localhost:3001/");

  await expect(page).toHaveURL("http://localhost:3001/login");

  await page.getByLabel(/e-mail/i).fill("fulano@dnc.com");
  await page.getByLabel(/^password/i).fill("12345");
  await page.getByRole("button", { name: /^login/i }).click();

  await expect(page).toHaveURL("http://localhost:3001/");

  await page.getByText(/hotel sururu/i).first().click();

  await expect(page).toHaveURL("http://localhost:3001/hotels/1");

  const today = new Date();
  const tomorrow = new Date(new Date().setDate(today.getDate() + 1))
  const nextWeek = new Date(new Date().setDate(tomorrow.getDate() + 7))

  const formattedTomorrow = getFormattedDate(tomorrow)
  const formattedNextWeek = getFormattedDate(nextWeek)

  await page.getByRole('textbox', { name: /check-in date/i }).fill(formattedTomorrow);
  await page.getByRole('textbox', { name: /check-out date/i }).fill(formattedNextWeek);
  await page.getByRole('button', { name: /book now/i }).click();

  await expect(page).toHaveURL('http://localhost:3001/reservations/1/success');
  await expect(page.getByText(/Your reservation request for Hotel Narara has been sent!/i)).toBeDefined();
});
