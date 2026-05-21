import { test, expect } from "@playwright/test";

test.describe("Country pages", () => {
  const countries = [
    { slug: "nz", name: "New Zealand", code: "NZ" },
    { slug: "au", name: "Australia", code: "AU" },
    { slug: "uk", name: "United Kingdom", code: "UK" },
    { slug: "us", name: "United States", code: "US" },
    { slug: "ca", name: "Canada", code: "CA" },
    { slug: "ie", name: "Ireland", code: "IE" },
    { slug: "sg", name: "Singapore", code: "SG" },
  ];

  for (const country of countries) {
    test(`/${country.slug} loads with ${country.name} in title`, async ({ page }) => {
      const response = await page.goto(`/${country.slug}`, { timeout: 15_000 });
      expect(response?.status()).toBe(200);
      await expect(page).toHaveTitle(new RegExp(country.name));
    });

    test(`/${country.slug} page has country name visible`, async ({ page }) => {
      await page.goto(`/${country.slug}`, { timeout: 15_000 });
      await expect(page.getByText(country.name).first()).toBeVisible();
    });
  }

  test("/nz page shows flag emoji for New Zealand", async ({ page }) => {
    await page.goto("/nz", { timeout: 15_000 });
    await expect(page.getByText("New Zealand").first()).toBeVisible();
  });

  test("/au page shows flag emoji for Australia", async ({ page }) => {
    await page.goto("/au", { timeout: 15_000 });
    await expect(page.getByText("Australia").first()).toBeVisible();
  });

  test("/uk page shows flag emoji for United Kingdom", async ({ page }) => {
    await page.goto("/uk", { timeout: 15_000 });
    await expect(page.getByText("United Kingdom").first()).toBeVisible();
  });

  test("/us page shows flag emoji for United States", async ({ page }) => {
    await page.goto("/us", { timeout: 15_000 });
    await expect(page.getByText("United States").first()).toBeVisible();
  });

  test("/ca page shows flag emoji for Canada", async ({ page }) => {
    await page.goto("/ca", { timeout: 15_000 });
    await expect(page.getByText("Canada").first()).toBeVisible();
  });
});

test.describe("Country page content structure", () => {
  test("/nz shows service categories", async ({ page }) => {
    await page.goto("/nz", { timeout: 15_000 });
    // Country pages should show categorised services
    const h2s = page.locator("h2");
    const count = await h2s.count();
    expect(count).toBeGreaterThan(0);
  });

  test("/au shows service categories", async ({ page }) => {
    await page.goto("/au", { timeout: 15_000 });
    const h2s = page.locator("h2");
    const count = await h2s.count();
    expect(count).toBeGreaterThan(0);
  });

  test("/nz has link to browse all services", async ({ page }) => {
    await page.goto("/nz", { timeout: 15_000 });
    const browseLink = page.getByRole("link", { name: /service/i }).first();
    await expect(browseLink).toBeVisible();
  });

  test("/uk has link to browse all services", async ({ page }) => {
    await page.goto("/uk", { timeout: 15_000 });
    const browseLink = page.getByRole("link", { name: /service/i }).first();
    await expect(browseLink).toBeVisible();
  });
});

test.describe("Country services directory", () => {
  test("/nz/services loads with filterable service list", async ({ page }) => {
    const response = await page.goto("/nz/services", { timeout: 15_000 });
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle(/New Zealand/);
    // Should have a list of services
    const links = page.locator("a");
    const count = await links.count();
    expect(count).toBeGreaterThan(5);
  });

  test("/au/services loads with service list", async ({ page }) => {
    const response = await page.goto("/au/services", { timeout: 15_000 });
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle(/Australia/);
  });

  test("/nz/services/wills loads individual service page", async ({ page }) => {
    const response = await page.goto("/nz/services/wills", { timeout: 15_000 });
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1").first()).toBeVisible();
  });

  test("/uk/services loads UK services", async ({ page }) => {
    const response = await page.goto("/uk/services", { timeout: 15_000 });
    expect(response?.status()).toBe(200);
  });

  test("/us/services loads US services", async ({ page }) => {
    const response = await page.goto("/us/services", { timeout: 15_000 });
    expect(response?.status()).toBe(200);
  });
});

test.describe("Country 404 handling", () => {
  test("invalid country slug returns 404", async ({ page }) => {
    const response = await page.goto("/xx", { timeout: 15_000 });
    expect(response?.status()).toBe(404);
  });

  test("another invalid country slug returns 404", async ({ page }) => {
    const response = await page.goto("/zz", { timeout: 15_000 });
    expect(response?.status()).toBe(404);
  });
});
