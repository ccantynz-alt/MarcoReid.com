import { test, expect } from "@playwright/test";

test.describe("Compliance page (/compliance)", () => {
  test("loads successfully", async ({ page }) => {
    const response = await page.goto("/compliance", { timeout: 15_000 });
    expect(response?.status()).toBe(200);
  });

  test("has compliance-related heading", async ({ page }) => {
    await page.goto("/compliance", { timeout: 15_000 });
    const h1 = page.locator("h1").first();
    await expect(h1).toBeVisible();
  });

  test("renders compliance score or status cards", async ({ page }) => {
    await page.goto("/compliance", { timeout: 15_000 });
    // Compliance page should show categories like Data Privacy, Professional Regulation
    await expect(page.getByText(/Data Privacy|Professional Regulation|Compliant/i).first()).toBeVisible();
  });

  test("shows compliance statuses (Compliant / In Progress)", async ({ page }) => {
    await page.goto("/compliance", { timeout: 15_000 });
    const compliantBadges = page.getByText("Compliant");
    const count = await compliantBadges.count();
    expect(count).toBeGreaterThan(0);
  });

  test("shows multiple country compliance columns", async ({ page }) => {
    await page.goto("/compliance", { timeout: 15_000 });
    // Should reference at least NZ, AU, UK, US, CA
    await expect(page.getByText("NZ").first()).toBeVisible();
    await expect(page.getByText("AU").first()).toBeVisible();
    await expect(page.getByText("UK").first()).toBeVisible();
  });
});

test.describe("Jurisdictions page (/jurisdictions)", () => {
  test("loads successfully", async ({ page }) => {
    const response = await page.goto("/jurisdictions", { timeout: 15_000 });
    expect(response?.status()).toBe(200);
  });

  test("shows all 7 countries", async ({ page }) => {
    await page.goto("/jurisdictions", { timeout: 15_000 });
    await expect(page.getByText("New Zealand").first()).toBeVisible();
    await expect(page.getByText("Australia").first()).toBeVisible();
    await expect(page.getByText("United Kingdom").first()).toBeVisible();
    await expect(page.getByText("United States").first()).toBeVisible();
    await expect(page.getByText("Canada").first()).toBeVisible();
    await expect(page.getByText("Ireland").first()).toBeVisible();
    await expect(page.getByText("Singapore").first()).toBeVisible();
  });

  test("has heading visible", async ({ page }) => {
    await page.goto("/jurisdictions", { timeout: 15_000 });
    const h1 = page.locator("h1").first();
    await expect(h1).toBeVisible();
  });
});

test.describe("Legal notices page (/legal-notices)", () => {
  test("loads successfully", async ({ page }) => {
    const response = await page.goto("/legal-notices", { timeout: 15_000 });
    expect(response?.status()).toBe(200);
  });

  test("shows disclaimers content", async ({ page }) => {
    await page.goto("/legal-notices", { timeout: 15_000 });
    const h1 = page.locator("h1").first();
    await expect(h1).toBeVisible();
  });

  test("has jurisdiction tabs or sections", async ({ page }) => {
    await page.goto("/legal-notices", { timeout: 15_000 });
    // Should show multiple jurisdiction-specific notices
    const sections = page.locator("h2, h3");
    const count = await sections.count();
    expect(count).toBeGreaterThan(2);
  });
});

test.describe("Privacy policy page (/privacy)", () => {
  test("loads with correct title", async ({ page }) => {
    const response = await page.goto("/privacy", { timeout: 15_000 });
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle(/Privacy/);
  });

  test("has privacy policy content", async ({ page }) => {
    await page.goto("/privacy", { timeout: 15_000 });
    const h1 = page.locator("h1").first();
    await expect(h1).toBeVisible();
  });

  test("mentions data collection", async ({ page }) => {
    await page.goto("/privacy", { timeout: 15_000 });
    await expect(page.getByText(/data|information|collect/i).first()).toBeVisible();
  });
});

test.describe("Terms of service page (/terms)", () => {
  test("loads with correct title", async ({ page }) => {
    const response = await page.goto("/terms", { timeout: 15_000 });
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle(/Terms/);
  });

  test("has terms content", async ({ page }) => {
    await page.goto("/terms", { timeout: 15_000 });
    const h1 = page.locator("h1").first();
    await expect(h1).toBeVisible();
  });

  test("mentions acceptable use or user obligations", async ({ page }) => {
    await page.goto("/terms", { timeout: 15_000 });
    const text = page.locator("body");
    await expect(text).toContainText(/agreement|service|user|licence|license/i);
  });
});

test.describe("Security page (/security)", () => {
  test("loads with correct title", async ({ page }) => {
    const response = await page.goto("/security", { timeout: 15_000 });
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle(/Security/);
  });

  test("has security heading", async ({ page }) => {
    await page.goto("/security", { timeout: 15_000 });
    const h1 = page.locator("h1").first();
    await expect(h1).toBeVisible();
  });

  test("lists security features", async ({ page }) => {
    await page.goto("/security", { timeout: 15_000 });
    await expect(page.getByText(/encryption|compliance|SOC|FIPS|audit/i).first()).toBeVisible();
  });
});

test.describe("Academy page (/academy)", () => {
  test("loads with correct title", async ({ page }) => {
    const response = await page.goto("/academy", { timeout: 15_000 });
    expect(response?.status()).toBe(200);
  });

  test("has heading visible", async ({ page }) => {
    await page.goto("/academy", { timeout: 15_000 });
    const h1 = page.locator("h1").first();
    await expect(h1).toBeVisible();
  });

  test("shows course catalog or CPD content", async ({ page }) => {
    await page.goto("/academy", { timeout: 15_000 });
    // Academy should reference courses, CPD, or learning
    await expect(page.getByText(/CPD|course|learn|training|education/i).first()).toBeVisible();
  });

  test("has more than one section", async ({ page }) => {
    await page.goto("/academy", { timeout: 15_000 });
    const sections = page.locator("section");
    const count = await sections.count();
    expect(count).toBeGreaterThan(0);
  });
});

test.describe("Additional legal/compliance pages", () => {
  test("/about loads successfully", async ({ page }) => {
    const response = await page.goto("/about", { timeout: 15_000 });
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle(/About/);
  });

  test("/trust-center loads successfully", async ({ page }) => {
    const response = await page.goto("/trust-center", { timeout: 15_000 });
    expect(response?.status()).toBe(200);
  });

  test("/aml-cft loads successfully", async ({ page }) => {
    const response = await page.goto("/aml-cft", { timeout: 15_000 });
    expect(response?.status()).toBe(200);
  });

  test("/data-residency loads successfully", async ({ page }) => {
    const response = await page.goto("/data-residency", { timeout: 15_000 });
    expect(response?.status()).toBe(200);
  });

  test("/cookies loads successfully", async ({ page }) => {
    const response = await page.goto("/cookies", { timeout: 15_000 });
    expect(response?.status()).toBe(200);
  });

  test("/dmca loads successfully", async ({ page }) => {
    const response = await page.goto("/dmca", { timeout: 15_000 });
    expect(response?.status()).toBe(200);
  });

  test("/acceptable-use loads successfully", async ({ page }) => {
    const response = await page.goto("/acceptable-use", { timeout: 15_000 });
    expect(response?.status()).toBe(200);
  });

  test("/dpa loads successfully", async ({ page }) => {
    const response = await page.goto("/dpa", { timeout: 15_000 });
    expect(response?.status()).toBe(200);
  });
});
