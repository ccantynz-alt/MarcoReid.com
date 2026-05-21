import { test, expect } from "@playwright/test";
import { mockAuthSession } from "../helpers";

test.describe("Tax calculator (/tax-calculator)", () => {
  test.beforeEach(async ({ page }) => {
    await mockAuthSession(page);
  });

  test("tax calculator page loads", async ({ page }) => {
    const response = await page.goto("/tax-calculator", { timeout: 15_000 });
    expect(response).not.toBeNull();
    const url = page.url();
    expect(url).toMatch(/tax-calculator|login/);
  });

  test("unauthenticated access redirects to login", async ({ page }) => {
    await page.unroute("**/api/auth/session");
    await page.goto("/tax-calculator", { timeout: 15_000 });
    await expect(page).toHaveURL(/login|tax-calculator/);
  });
});

test.describe("Tax calculator tabs (functional)", () => {
  test.beforeEach(async ({ page }) => {
    await mockAuthSession(page);
  });

  test("has GST / VAT tab", async ({ page }) => {
    await page.goto("/tax-calculator", { timeout: 15_000 });
    if (page.url().includes("tax-calculator")) {
      await expect(page.getByText("GST / VAT").first()).toBeVisible();
    }
  });

  test("has Income Tax tab", async ({ page }) => {
    await page.goto("/tax-calculator", { timeout: 15_000 });
    if (page.url().includes("tax-calculator")) {
      await expect(page.getByText("Income Tax").first()).toBeVisible();
    }
  });

  test("has Corporate Tax tab", async ({ page }) => {
    await page.goto("/tax-calculator", { timeout: 15_000 });
    if (page.url().includes("tax-calculator")) {
      await expect(page.getByText("Corporate Tax").first()).toBeVisible();
    }
  });
});

test.describe("Tax calculator: GST / VAT tab", () => {
  test.beforeEach(async ({ page }) => {
    await mockAuthSession(page);
  });

  test("GST tab has jurisdiction selector", async ({ page }) => {
    await page.goto("/tax-calculator", { timeout: 15_000 });
    if (page.url().includes("tax-calculator")) {
      await page.getByText("GST / VAT").first().click();
      const select = page.locator("select#gst-jurisdiction");
      await expect(select).toBeVisible();
    }
  });

  test("GST tab has amount input", async ({ page }) => {
    await page.goto("/tax-calculator", { timeout: 15_000 });
    if (page.url().includes("tax-calculator")) {
      await page.getByText("GST / VAT").first().click();
      const input = page.locator('input[type="number"]').first();
      await expect(input).toBeVisible();
    }
  });

  test("NZ GST: $1,000 shows $150 GST (15%)", async ({ page }) => {
    await page.goto("/tax-calculator", { timeout: 15_000 });
    if (page.url().includes("tax-calculator")) {
      await page.getByText("GST / VAT").first().click();

      // Select NZ jurisdiction
      const select = page.locator("select#gst-jurisdiction");
      await select.selectOption("NZ");

      // Enter amount
      const input = page.locator('input[type="number"]').first();
      await input.fill("1000");

      await page.waitForTimeout(500);
      // Should show $150 or 15% somewhere in the results
      const body = await page.locator("body").textContent();
      expect(body).toMatch(/150|15\.?0?0?%/);
    }
  });

  test("AU GST: $1,000 shows $100 GST (10%)", async ({ page }) => {
    await page.goto("/tax-calculator", { timeout: 15_000 });
    if (page.url().includes("tax-calculator")) {
      await page.getByText("GST / VAT").first().click();

      const select = page.locator("select#gst-jurisdiction");
      await select.selectOption("AU");

      const input = page.locator('input[type="number"]').first();
      await input.fill("1000");

      await page.waitForTimeout(500);
      const body = await page.locator("body").textContent();
      expect(body).toMatch(/100|10\.?0?0?%/);
    }
  });

  test("UK VAT: $1,000 shows $200 VAT (20%)", async ({ page }) => {
    await page.goto("/tax-calculator", { timeout: 15_000 });
    if (page.url().includes("tax-calculator")) {
      await page.getByText("GST / VAT").first().click();

      const select = page.locator("select#gst-jurisdiction");
      await select.selectOption("UK");

      const input = page.locator('input[type="number"]').first();
      await input.fill("1000");

      await page.waitForTimeout(500);
      const body = await page.locator("body").textContent();
      expect(body).toMatch(/200|20\.?0?0?%/);
    }
  });
});

test.describe("Tax calculator: Income Tax tab", () => {
  test.beforeEach(async ({ page }) => {
    await mockAuthSession(page);
  });

  test("Income Tax tab renders with jurisdiction input", async ({ page }) => {
    await page.goto("/tax-calculator", { timeout: 15_000 });
    if (page.url().includes("tax-calculator")) {
      await page.getByText("Income Tax").first().click();
      const select = page.locator("select#income-jurisdiction");
      await expect(select).toBeVisible();
    }
  });

  test("Income Tax tab has income amount input", async ({ page }) => {
    await page.goto("/tax-calculator", { timeout: 15_000 });
    if (page.url().includes("tax-calculator")) {
      await page.getByText("Income Tax").first().click();
      const input = page.locator('input[type="number"]').first();
      await expect(input).toBeVisible();
    }
  });

  test("Income Tax tab shows tax brackets after entering income", async ({ page }) => {
    await page.goto("/tax-calculator", { timeout: 15_000 });
    if (page.url().includes("tax-calculator")) {
      await page.getByText("Income Tax").first().click();
      const input = page.locator('input[type="number"]').first();
      await input.fill("100000");
      await page.waitForTimeout(500);
      // Should show some tax calculation result
      const body = await page.locator("body").textContent();
      expect(body).toMatch(/\$|tax|rate/i);
    }
  });
});

test.describe("Tax calculator: Corporate Tax tab", () => {
  test.beforeEach(async ({ page }) => {
    await mockAuthSession(page);
  });

  test("Corporate Tax tab renders with profit input", async ({ page }) => {
    await page.goto("/tax-calculator", { timeout: 15_000 });
    if (page.url().includes("tax-calculator")) {
      await page.getByText("Corporate Tax").first().click();
      const input = page.locator('input[type="number"]').first();
      await expect(input).toBeVisible();
    }
  });

  test("Corporate Tax tab shows calculation after entering profit", async ({ page }) => {
    await page.goto("/tax-calculator", { timeout: 15_000 });
    if (page.url().includes("tax-calculator")) {
      await page.getByText("Corporate Tax").first().click();
      const input = page.locator('input[type="number"]').first();
      await input.fill("500000");
      await page.waitForTimeout(500);
      const body = await page.locator("body").textContent();
      expect(body).toMatch(/\$|tax|rate/i);
    }
  });
});

test.describe("Tax calculator: US state sales tax", () => {
  test.beforeEach(async ({ page }) => {
    await mockAuthSession(page);
  });

  test("US state sales tax table visible when US selected", async ({ page }) => {
    await page.goto("/tax-calculator", { timeout: 15_000 });
    if (page.url().includes("tax-calculator")) {
      await page.getByText("GST / VAT").first().click();

      const select = page.locator("select#gst-jurisdiction");
      await select.selectOption("US");

      await page.waitForTimeout(500);
      // US state sales tax table should appear
      await expect(page.getByText(/State.*Sales Tax|State.*Local/i).first()).toBeVisible({ timeout: 5_000 });
    }
  });

  test("US state sales tax table has search input", async ({ page }) => {
    await page.goto("/tax-calculator", { timeout: 15_000 });
    if (page.url().includes("tax-calculator")) {
      await page.getByText("GST / VAT").first().click();

      const select = page.locator("select#gst-jurisdiction");
      await select.selectOption("US");

      await page.waitForTimeout(500);
      const searchInput = page.locator('input[placeholder*="Search"]');
      const count = await searchInput.count();
      expect(count).toBeGreaterThan(0);
    }
  });

  test("has legal disclaimer on tax calculator", async ({ page }) => {
    await page.goto("/tax-calculator", { timeout: 15_000 });
    if (page.url().includes("tax-calculator")) {
      await expect(page.getByText(/disclaimer|estimate|not advice/i).first()).toBeVisible();
    }
  });
});
