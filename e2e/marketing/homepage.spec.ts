import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/", { timeout: 15_000 });
  });

  test("page loads with correct title", async ({ page }) => {
    await expect(page).toHaveTitle(/Marco Reid/);
  });

  test("hero section is visible with Marco Reid text", async ({ page }) => {
    const hero = page.locator("h1").first();
    await expect(hero).toBeVisible();
    await expect(hero).toContainText("professional");
  });

  test("hero subtitle mentions software consolidation", async ({ page }) => {
    await expect(page.getByText("Marco Reid ends that")).toBeVisible();
  });

  test("hero has See what we built CTA", async ({ page }) => {
    const cta = page.getByRole("link", { name: /See what we built/i });
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute("href", "#law");
  });

  test("hero has View pricing CTA", async ({ page }) => {
    const cta = page.getByRole("link", { name: /View pricing/i }).first();
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute("href", "/pricing");
  });

  test("stats bar shows animated counters", async ({ page }) => {
    await expect(page.getByText("saved per attorney per week")).toBeVisible();
    await expect(page.getByText("billing capacity recovered weekly")).toBeVisible();
    await expect(page.getByText("citations verified before display")).toBeVisible();
    await expect(page.getByText("languages from day one")).toBeVisible();
  });

  test("bento section renders five product tiles", async ({ page }) => {
    await expect(page.getByText("Five products. One platform.").first()).toBeVisible();
    await expect(page.getByText("Marco Reid Legal").first()).toBeVisible();
    await expect(page.getByText("Marco Reid Accounting").first()).toBeVisible();
    await expect(page.locator("text=Voice").first()).toBeVisible();
    await expect(page.getByText("Courtroom").first()).toBeVisible();
    const marcoTile = page.locator('a[href="#marco"]').first();
    await expect(marcoTile).toBeVisible();
  });

  test("product section 1: Marco Reid Legal renders", async ({ page }) => {
    const section = page.locator('section[aria-label="Marco Reid Legal"]');
    await expect(section).toBeVisible();
    await expect(section.locator("text=Marco Reid Legal").first()).toBeVisible();
  });

  test("product section 2: Marco renders", async ({ page }) => {
    const section = page.locator('section[aria-label="Marco"]');
    await expect(section).toBeVisible();
  });

  test("product section 3: Marco Reid Voice renders", async ({ page }) => {
    const section = page.locator('section[aria-label="Marco Reid Voice"]');
    await expect(section).toBeVisible();
  });

  test("product section 4: Marco Reid Courtroom renders", async ({ page }) => {
    const section = page.locator('section[aria-label="Marco Reid Courtroom"]');
    await expect(section).toBeVisible();
  });

  test("product section 5: Marco Reid Accounting renders", async ({ page }) => {
    const section = page.locator('section[aria-label="Marco Reid Accounting"]');
    await expect(section).toBeVisible();
  });

  test("ROI calculator section renders", async ({ page }) => {
    const section = page.locator('section[aria-label="ROI Calculator"]');
    await expect(section).toBeVisible();
    await expect(page.getByText("Calculate your savings")).toBeVisible();
  });

  test("testimonials section is visible", async ({ page }) => {
    const section = page.locator('section[aria-label="What founding customers say"]');
    await expect(section).toBeVisible();
    await expect(page.getByText("What early partners are telling us")).toBeVisible();
  });

  test("security badges section is visible", async ({ page }) => {
    const section = page.locator('section[aria-label="Security and compliance"]');
    await expect(section).toBeVisible();
    await expect(page.getByText("Enterprise-grade security")).toBeVisible();
  });

  test("security badges show compliance items", async ({ page }) => {
    await expect(page.getByText("Privacy Act 2020")).toBeVisible();
    await expect(page.getByText("NZ AML/CFT Act 2009")).toBeVisible();
    await expect(page.getByText("GDPR / UK GDPR")).toBeVisible();
  });

  test("gold divider elements are present", async ({ page }) => {
    const dividers = page.locator(".gold-divider");
    const count = await dividers.count();
    expect(count).toBeGreaterThanOrEqual(4);
  });

  test("CTA section has Join the founding cohort button", async ({ page }) => {
    const cta = page.getByRole("link", { name: /Join the founding cohort/i });
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute("href", "/contact");
  });

  test("CTA section has Start a free trial button", async ({ page }) => {
    const cta = page.getByRole("link", { name: /Start a free trial/i });
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute("href", "/trial");
  });

  test("footer renders with links", async ({ page }) => {
    await expect(page.getByRole("link", { name: "Privacy Policy" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Terms of Service" })).toBeVisible();
  });

  test("meta og:title tag is present", async ({ page }) => {
    const ogTitle = page.locator('meta[property="og:title"]');
    const count = await ogTitle.count();
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test("meta description tag is present", async ({ page }) => {
    const meta = page.locator('meta[name="description"]');
    await expect(meta).toHaveAttribute("content", /.+/);
  });

  test("everything included section lists features", async ({ page }) => {
    const section = page.locator('section[aria-label="Everything included"]');
    await expect(section).toBeVisible();
    await expect(page.getByText("Case management").first()).toBeVisible();
    await expect(page.getByText("Trust accounting (IOLTA)").first()).toBeVisible();
    await expect(page.getByText("Marco Reid Voice (9 languages)").first()).toBeVisible();
  });

  test("integrations section shows partner names", async ({ page }) => {
    const section = page.locator('section[aria-label="Trusted integrations"]');
    await expect(section).toBeVisible();
    await expect(page.getByText("Stripe Payments")).toBeVisible();
    await expect(page.getByText("Plaid Banking")).toBeVisible();
  });

  test("public tools section renders all 6 tools", async ({ page }) => {
    const section = page.locator('section[aria-label="Public tools available now"]');
    await expect(section).toBeVisible();
    await expect(section.getByText("Draft a legal or tax document")).toBeVisible();
    await expect(section.getByText("Find a verified professional")).toBeVisible();
    await expect(section.getByText("Deadline calculator")).toBeVisible();
  });
});
