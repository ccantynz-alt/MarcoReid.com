import { test, expect } from "@playwright/test";

test.describe("Marketing site navigation", () => {
  test("homepage loads with correct title", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Marco Reid/);
  });

  test("homepage has hero section", async ({ page }) => {
    await page.goto("/");
    const hero = page.locator("h1").first();
    await expect(hero).toBeVisible();
  });

  test("header navigation links are visible", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("link", { name: "Legal" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Pricing" })).toBeVisible();
  });

  test("footer links work", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("link", { name: "Privacy Policy" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Terms of Service" })).toBeVisible();
  });

  const routes = [
    { path: "/law", title: /Legal/ },
    { path: "/accounting", title: /Accounting/ },
    { path: "/marco", title: /Marco/ },
    { path: "/dictation", title: /Voice/ },
    { path: "/courtroom", title: /Courtroom/ },
    { path: "/pricing", title: /Pricing/ },
    { path: "/about", title: /About/ },
    { path: "/contact", title: /Contact/ },
    { path: "/security", title: /Security/ },
    { path: "/privacy", title: /Privacy/ },
    { path: "/terms", title: /Terms/ },
    { path: "/for-small-business", title: /Small Business/ },
    { path: "/for-startups", title: /Startup/ },
    { path: "/compare/westlaw", title: /Westlaw/i },
    { path: "/compare/clio", title: /Clio/i },
    { path: "/compare/quickbooks", title: /QuickBooks/i },
    { path: "/compare/lexisnexis", title: /LexisNexis/i },
  ];

  for (const route of routes) {
    test(`${route.path} loads successfully`, async ({ page }) => {
      const response = await page.goto(route.path);
      expect(response?.status()).toBe(200);
      await expect(page).toHaveTitle(route.title);
    });
  }
});
