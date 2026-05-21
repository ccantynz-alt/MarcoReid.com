import { type Page, expect } from "@playwright/test";

export const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

/**
 * Navigate to a page and wait for it to be ready.
 * Passes `{ timeout }` to `page.goto` so slow SSR builds don't flake.
 */
export async function navigateTo(page: Page, path: string, timeout = 15_000) {
  const response = await page.goto(path, { timeout, waitUntil: "domcontentloaded" });
  return response;
}

/**
 * Attempt to log in via the UI login form.
 * Useful for authenticated tests. The caller should mock `/api/auth` if no
 * real back-end is running.
 */
export async function loginViaUI(
  page: Page,
  email = "test@example.com",
  password = "TestPassword123!",
) {
  await page.goto("/login");
  await page.getByLabel("Email address").fill(email);
  await page.getByLabel("Password").fill(password);
  await page.getByRole("button", { name: "Sign in" }).click();
}

/**
 * Assert that a page returned a specific HTTP status code.
 */
export function expectStatus(response: Awaited<ReturnType<Page["goto"]>>, status: number) {
  expect(response?.status()).toBe(status);
}
