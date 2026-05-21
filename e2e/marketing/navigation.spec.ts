import { test, expect } from "@playwright/test";

test.describe("Marketing navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/", { timeout: 15_000 });
  });

  test("logo links to homepage", async ({ page }) => {
    const logo = page.getByRole("link", { name: /Marco Reid/i }).first();
    await expect(logo).toBeVisible();
    await expect(logo).toHaveAttribute("href", "/");
  });

  test("Products dropdown opens and shows all 7 products", async ({ page }) => {
    const productsBtn = page.locator("header").getByText("Products");
    await productsBtn.click();

    await expect(page.getByRole("link", { name: "Marco Reid Legal" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Marco Reid Accounting" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Catch-Up Centre" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Marco (AI Research)" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Marco Reid Voice" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Marco Reid Courtroom" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Court Technology" })).toBeVisible();
  });

  test("Solutions dropdown shows all 5 solutions", async ({ page }) => {
    const solutionsBtn = page.locator("header").getByText("Solutions");
    await solutionsBtn.click();

    await expect(page.getByRole("link", { name: "For Lawyers" })).toBeVisible();
    await expect(page.getByRole("link", { name: "For Accountants" })).toBeVisible();
    await expect(page.getByRole("link", { name: "For Small Business" })).toBeVisible();
    await expect(page.getByRole("link", { name: "For Startups" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Immigration" })).toBeVisible();
  });

  test("Resources dropdown shows all 9 resources", async ({ page }) => {
    const resourcesBtn = page.locator("header").getByText("Resources");
    await resourcesBtn.click();

    await expect(page.getByRole("link", { name: "Help Centre" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Getting Started" })).toBeVisible();
    await expect(page.getByRole("link", { name: "FAQ" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Case Studies" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Changelog" })).toBeVisible();
    await expect(page.getByRole("link", { name: "System Status" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Compare Clio" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Compare Westlaw" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Compare QuickBooks" })).toBeVisible();
  });

  test("Trust & Compliance dropdown shows all 5 items", async ({ page }) => {
    const trustBtn = page.locator("header").getByText("Trust & Compliance");
    await trustBtn.click();

    await expect(page.getByRole("link", { name: "Security" }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: "Trust Centre" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Compliance" }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: "Jurisdictions" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Legal Notices" })).toBeVisible();
  });

  test("Academy link navigates to /academy", async ({ page }) => {
    const academy = page.locator("header").getByRole("link", { name: "Academy" });
    await expect(academy).toBeVisible();
    await expect(academy).toHaveAttribute("href", "/academy");
  });

  test("Pricing link navigates to /pricing", async ({ page }) => {
    const pricing = page.locator("header").getByRole("link", { name: "Pricing" });
    await expect(pricing).toBeVisible();
    await expect(pricing).toHaveAttribute("href", "/pricing");
  });

  test("Book a Demo button navigates to /contact", async ({ page }) => {
    const demo = page.locator("header").getByRole("link", { name: /Book a demo/i });
    await expect(demo).toBeVisible();
    await expect(demo).toHaveAttribute("href", "/contact");
  });

  test("Sign in link navigates to /login", async ({ page }) => {
    const signIn = page.locator("header").getByRole("link", { name: /Sign in/i });
    await expect(signIn).toBeVisible();
    await expect(signIn).toHaveAttribute("href", "/login");
  });
});

test.describe("Mobile navigation", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("hamburger menu is visible on mobile", async ({ page }) => {
    await page.goto("/", { timeout: 15_000 });
    const hamburger = page.locator("header button").first();
    await expect(hamburger).toBeVisible();
  });

  test("mobile menu opens on hamburger click", async ({ page }) => {
    await page.goto("/", { timeout: 15_000 });
    const hamburger = page.locator("header button").first();
    await hamburger.click();
    // After click, the mobile menu panel should be visible
    await expect(page.getByText("Products").first()).toBeVisible();
    await expect(page.getByText("Solutions").first()).toBeVisible();
    await expect(page.getByText("Resources").first()).toBeVisible();
  });

  test("mobile menu shows sections as expandable groups", async ({ page }) => {
    await page.goto("/", { timeout: 15_000 });
    const hamburger = page.locator("header button").first();
    await hamburger.click();

    // Click Products to expand
    await page.getByText("Products").first().click();
    await expect(page.getByRole("link", { name: "Marco Reid Legal" })).toBeVisible();
  });

  test("mobile menu has pricing link", async ({ page }) => {
    await page.goto("/", { timeout: 15_000 });
    const hamburger = page.locator("header button").first();
    await hamburger.click();
    await expect(page.getByText("Pricing").first()).toBeVisible();
  });

  test("mobile menu has sign in link", async ({ page }) => {
    await page.goto("/", { timeout: 15_000 });
    const hamburger = page.locator("header button").first();
    await hamburger.click();
    await expect(page.getByText(/Sign in/i).first()).toBeVisible();
  });
});
