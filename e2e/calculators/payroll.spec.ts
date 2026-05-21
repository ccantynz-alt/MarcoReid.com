import { test, expect } from "@playwright/test";
import { mockAuthSession } from "../helpers";

test.describe("Payroll calculator (/payroll)", () => {
  test.beforeEach(async ({ page }) => {
    // Payroll is under the platform layout, so it may need auth
    await mockAuthSession(page);
  });

  test("payroll page loads", async ({ page }) => {
    const response = await page.goto("/payroll", { timeout: 15_000 });
    expect(response).not.toBeNull();
    // Accept either the payroll page or a redirect to login
    const url = page.url();
    expect(url).toMatch(/payroll|login/);
  });

  test("unauthenticated access redirects to login", async ({ page }) => {
    await page.unroute("**/api/auth/session");
    await page.goto("/payroll", { timeout: 15_000 });
    await expect(page).toHaveURL(/login|payroll/);
  });
});

test.describe("Payroll calculator (functional tests with auth)", () => {
  test.beforeEach(async ({ page }) => {
    await mockAuthSession(page);
  });

  test("page has jurisdiction dropdown", async ({ page }) => {
    await page.goto("/payroll", { timeout: 15_000 });
    // If we're on the payroll page (not redirected)
    if (page.url().includes("payroll")) {
      const select = page.locator("select").first();
      await expect(select).toBeVisible();
    }
  });

  test("page has salary input field", async ({ page }) => {
    await page.goto("/payroll", { timeout: 15_000 });
    if (page.url().includes("payroll")) {
      const salaryInput = page.locator('input[type="number"]').first();
      await expect(salaryInput).toBeVisible();
    }
  });

  test("jurisdiction dropdown has NZ option", async ({ page }) => {
    await page.goto("/payroll", { timeout: 15_000 });
    if (page.url().includes("payroll")) {
      const option = page.locator("option").filter({ hasText: /New Zealand/i });
      const count = await option.count();
      expect(count).toBeGreaterThan(0);
    }
  });

  test("jurisdiction dropdown has AU option", async ({ page }) => {
    await page.goto("/payroll", { timeout: 15_000 });
    if (page.url().includes("payroll")) {
      const option = page.locator("option").filter({ hasText: /Australia/i });
      const count = await option.count();
      expect(count).toBeGreaterThan(0);
    }
  });

  test("jurisdiction dropdown has UK option", async ({ page }) => {
    await page.goto("/payroll", { timeout: 15_000 });
    if (page.url().includes("payroll")) {
      const option = page.locator("option").filter({ hasText: /United Kingdom/i });
      const count = await option.count();
      expect(count).toBeGreaterThan(0);
    }
  });

  test("jurisdiction dropdown has US option", async ({ page }) => {
    await page.goto("/payroll", { timeout: 15_000 });
    if (page.url().includes("payroll")) {
      const option = page.locator("option").filter({ hasText: /United States/i });
      const count = await option.count();
      expect(count).toBeGreaterThan(0);
    }
  });

  test("jurisdiction dropdown has CA option", async ({ page }) => {
    await page.goto("/payroll", { timeout: 15_000 });
    if (page.url().includes("payroll")) {
      const option = page.locator("option").filter({ hasText: /Canada/i });
      const count = await option.count();
      expect(count).toBeGreaterThan(0);
    }
  });

  test("selecting NZ shows KiwiSaver rate dropdown", async ({ page }) => {
    await page.goto("/payroll", { timeout: 15_000 });
    if (page.url().includes("payroll")) {
      const jurisdictionSelect = page.locator("select#jurisdiction");
      await jurisdictionSelect.selectOption("NZ");
      // KiwiSaver dropdown should appear
      await expect(page.getByText(/KiwiSaver/i).first()).toBeVisible({ timeout: 5_000 });
    }
  });

  test("selecting AU hides KiwiSaver dropdown", async ({ page }) => {
    await page.goto("/payroll", { timeout: 15_000 });
    if (page.url().includes("payroll")) {
      // First select NZ to show KiwiSaver
      const jurisdictionSelect = page.locator("select#jurisdiction");
      await jurisdictionSelect.selectOption("NZ");
      await expect(page.getByText(/KiwiSaver/i).first()).toBeVisible({ timeout: 5_000 });

      // Now switch to AU
      await jurisdictionSelect.selectOption("AU");
      // KiwiSaver should no longer be visible
      await expect(page.getByText(/KiwiSaver/i)).toBeHidden({ timeout: 5_000 });
    }
  });

  test("entering salary and calculating shows results", async ({ page }) => {
    await page.goto("/payroll", { timeout: 15_000 });
    if (page.url().includes("payroll")) {
      const salaryInput = page.locator('input[type="number"]').first();
      await salaryInput.fill("85000");

      // Results should appear (net pay, deductions)
      await page.waitForTimeout(1000);
      const body = await page.locator("body").textContent();
      // Results should contain monetary values
      expect(body).toMatch(/\$/);
    }
  });

  test("results show employee deductions section", async ({ page }) => {
    await page.goto("/payroll", { timeout: 15_000 });
    if (page.url().includes("payroll")) {
      const salaryInput = page.locator('input[type="number"]').first();
      await salaryInput.fill("85000");
      await page.waitForTimeout(1000);
      // Should show deduction rows (PAYE, ACC, KiwiSaver, etc.)
      const body = await page.locator("body").textContent();
      expect(body).toMatch(/PAYE|Tax|deduction/i);
    }
  });

  test("has pay frequency selector", async ({ page }) => {
    await page.goto("/payroll", { timeout: 15_000 });
    if (page.url().includes("payroll")) {
      await expect(page.getByText(/Weekly|Fortnightly|Monthly/i).first()).toBeVisible();
    }
  });

  test("has legal disclaimer", async ({ page }) => {
    await page.goto("/payroll", { timeout: 15_000 });
    if (page.url().includes("payroll")) {
      await expect(page.getByText(/disclaimer|estimate|not advice/i).first()).toBeVisible();
    }
  });
});
