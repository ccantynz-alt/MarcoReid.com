import { test, expect } from "@playwright/test";

test.describe("Product page: Legal (/law)", () => {
  test("loads with correct title", async ({ page }) => {
    const response = await page.goto("/law", { timeout: 15_000 });
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle(/Legal/);
  });

  test("has Marco Reid Legal heading", async ({ page }) => {
    await page.goto("/law", { timeout: 15_000 });
    await expect(page.getByText("Marco Reid Legal").first()).toBeVisible();
  });

  test("has hero heading about operating system", async ({ page }) => {
    await page.goto("/law", { timeout: 15_000 });
    const h1 = page.locator("h1").first();
    await expect(h1).toBeVisible();
    await expect(h1).toContainText("operating system");
  });

  test("has pricing CTA", async ({ page }) => {
    await page.goto("/law", { timeout: 15_000 });
    await expect(page.getByRole("link", { name: /pricing/i }).first()).toBeVisible();
  });
});

test.describe("Product page: Accounting (/accounting)", () => {
  test("loads with correct title", async ({ page }) => {
    const response = await page.goto("/accounting", { timeout: 15_000 });
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle(/Accounting/);
  });

  test("has Marco Reid Accounting heading", async ({ page }) => {
    await page.goto("/accounting", { timeout: 15_000 });
    await expect(page.getByText("Marco Reid Accounting").first()).toBeVisible();
  });

  test("has h1 visible", async ({ page }) => {
    await page.goto("/accounting", { timeout: 15_000 });
    const h1 = page.locator("h1").first();
    await expect(h1).toBeVisible();
  });
});

test.describe("Product page: Courtroom (/courtroom)", () => {
  test("loads with correct title", async ({ page }) => {
    const response = await page.goto("/courtroom", { timeout: 15_000 });
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle(/Courtroom/);
  });

  test("has Marco Reid Courtroom heading", async ({ page }) => {
    await page.goto("/courtroom", { timeout: 15_000 });
    await expect(page.getByText("Marco Reid Courtroom").first()).toBeVisible();
  });

  test("has h1 visible", async ({ page }) => {
    await page.goto("/courtroom", { timeout: 15_000 });
    const h1 = page.locator("h1").first();
    await expect(h1).toBeVisible();
  });
});

test.describe("Product page: Voice (/dictation)", () => {
  test("loads with correct title", async ({ page }) => {
    const response = await page.goto("/dictation", { timeout: 15_000 });
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle(/Voice/);
  });

  test("has Marco Reid Voice heading", async ({ page }) => {
    await page.goto("/dictation", { timeout: 15_000 });
    await expect(page.getByText("Marco Reid Voice").first()).toBeVisible();
  });

  test("has h1 visible", async ({ page }) => {
    await page.goto("/dictation", { timeout: 15_000 });
    const h1 = page.locator("h1").first();
    await expect(h1).toBeVisible();
  });
});

test.describe("Product page: Marco / Oracle (/oracle)", () => {
  test("loads successfully", async ({ page }) => {
    const response = await page.goto("/oracle", { timeout: 15_000 });
    expect(response?.status()).toBe(200);
  });

  test("has Marco heading", async ({ page }) => {
    await page.goto("/oracle", { timeout: 15_000 });
    await expect(page.getByText("Marco").first()).toBeVisible();
  });

  test("has h1 visible", async ({ page }) => {
    await page.goto("/oracle", { timeout: 15_000 });
    const h1 = page.locator("h1").first();
    await expect(h1).toBeVisible();
  });
});

test.describe("Product page: Marco research (/marco)", () => {
  test("loads successfully", async ({ page }) => {
    const response = await page.goto("/marco", { timeout: 15_000 });
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle(/Marco/);
  });

  test("has h1 visible", async ({ page }) => {
    await page.goto("/marco", { timeout: 15_000 });
    const h1 = page.locator("h1").first();
    await expect(h1).toBeVisible();
  });
});

test.describe("Pricing page (/pricing)", () => {
  test("loads with correct title", async ({ page }) => {
    const response = await page.goto("/pricing", { timeout: 15_000 });
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle(/Pricing/);
  });

  test("has pricing heading", async ({ page }) => {
    await page.goto("/pricing", { timeout: 15_000 });
    const h1 = page.locator("h1").first();
    await expect(h1).toBeVisible();
    await expect(h1).toContainText("pricing");
  });

  test("shows Legal pricing tier cards", async ({ page }) => {
    await page.goto("/pricing", { timeout: 15_000 });
    await expect(page.getByText("Marco Reid Legal").first()).toBeVisible();
  });

  test("shows Accounting pricing tier cards", async ({ page }) => {
    await page.goto("/pricing", { timeout: 15_000 });
    await expect(page.getByText("Marco Reid Accounting").first()).toBeVisible();
  });

  test("shows Marco pricing tier cards", async ({ page }) => {
    await page.goto("/pricing", { timeout: 15_000 });
    // The Oracle/Marco research pricing should be present
    await expect(page.getByText("Marco").first()).toBeVisible();
  });

  test("has currency selector", async ({ page }) => {
    await page.goto("/pricing", { timeout: 15_000 });
    // Look for currency selector buttons (NZD, AUD, USD, GBP, CAD)
    const currencyBtns = page.locator("button").filter({ hasText: /NZD|AUD|USD|GBP|CAD/ });
    const count = await currencyBtns.count();
    expect(count).toBeGreaterThan(0);
  });
});

test.describe("Immigration pages", () => {
  test("/immigration loads with immigration content", async ({ page }) => {
    const response = await page.goto("/immigration", { timeout: 15_000 });
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1").first()).toBeVisible();
  });

  test("/immigration/nz loads with NZ-specific content", async ({ page }) => {
    const response = await page.goto("/immigration/nz", { timeout: 15_000 });
    expect(response?.status()).toBe(200);
    await expect(page.getByText(/New Zealand/i).first()).toBeVisible();
  });

  test("/immigration/au loads with AU-specific content", async ({ page }) => {
    const response = await page.goto("/immigration/au", { timeout: 15_000 });
    expect(response?.status()).toBe(200);
    await expect(page.getByText(/Australia/i).first()).toBeVisible();
  });

  test("/immigration/uk loads with UK-specific content", async ({ page }) => {
    const response = await page.goto("/immigration/uk", { timeout: 15_000 });
    expect(response?.status()).toBe(200);
    await expect(page.getByText(/United Kingdom/i).first()).toBeVisible();
  });

  test("/immigration/ca loads with CA-specific content", async ({ page }) => {
    const response = await page.goto("/immigration/ca", { timeout: 15_000 });
    expect(response?.status()).toBe(200);
    await expect(page.getByText(/Canada/i).first()).toBeVisible();
  });
});
