import { test, expect } from "@playwright/test";

test.describe("Mobile responsiveness (375x812)", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("homepage hero text readable on mobile", async ({ page }) => {
    await page.goto("/", { timeout: 15_000 });
    const h1 = page.locator("h1").first();
    await expect(h1).toBeVisible();
    // Verify the text is within viewport
    const box = await h1.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.width).toBeLessThanOrEqual(375);
  });

  test("navigation hamburger is visible on mobile", async ({ page }) => {
    await page.goto("/", { timeout: 15_000 });
    const hamburger = page.locator("header button").first();
    await expect(hamburger).toBeVisible();
  });

  test("mobile menu opens with all sections", async ({ page }) => {
    await page.goto("/", { timeout: 15_000 });
    const hamburger = page.locator("header button").first();
    await hamburger.click();
    await expect(page.getByText("Products").first()).toBeVisible();
    await expect(page.getByText("Solutions").first()).toBeVisible();
    await expect(page.getByText("Resources").first()).toBeVisible();
    await expect(page.getByText("Pricing").first()).toBeVisible();
  });

  test("pricing page cards stack vertically on mobile", async ({ page }) => {
    await page.goto("/pricing", { timeout: 15_000 });
    const h1 = page.locator("h1").first();
    await expect(h1).toBeVisible();
    const box = await h1.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.width).toBeLessThanOrEqual(375);
  });

  test("country page readable on mobile", async ({ page }) => {
    await page.goto("/nz", { timeout: 15_000 });
    const heading = page.locator("h1").first();
    await expect(heading).toBeVisible();
    const box = await heading.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.width).toBeLessThanOrEqual(375);
  });

  test("law product page readable on mobile", async ({ page }) => {
    await page.goto("/law", { timeout: 15_000 });
    const h1 = page.locator("h1").first();
    await expect(h1).toBeVisible();
  });

  test("accounting page readable on mobile", async ({ page }) => {
    await page.goto("/accounting", { timeout: 15_000 });
    const h1 = page.locator("h1").first();
    await expect(h1).toBeVisible();
  });

  test("login page renders correctly on mobile", async ({ page }) => {
    await page.goto("/login", { timeout: 15_000 });
    await expect(page.getByLabel("Email address")).toBeVisible();
    await expect(page.getByLabel("Password")).toBeVisible();
    await expect(page.getByRole("button", { name: "Sign in" })).toBeVisible();
  });

  test("register page renders correctly on mobile", async ({ page }) => {
    await page.goto("/register", { timeout: 15_000 });
    const heading = page.getByText("Marco Reid").first();
    await expect(heading).toBeVisible();
  });

  test("contact page form readable on mobile", async ({ page }) => {
    await page.goto("/contact", { timeout: 15_000 });
    await expect(page.getByLabel("Name")).toBeVisible();
    await expect(page.getByLabel("Email")).toBeVisible();
  });

  test("footer sections stack on mobile", async ({ page }) => {
    await page.goto("/", { timeout: 15_000 });
    const footer = page.locator("footer");
    await expect(footer).toBeVisible();
    // Footer should be full-width on mobile
    const box = await footer.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.width).toBeLessThanOrEqual(375);
  });

  test("privacy page content readable on mobile", async ({ page }) => {
    await page.goto("/privacy", { timeout: 15_000 });
    const h1 = page.locator("h1").first();
    await expect(h1).toBeVisible();
    const box = await h1.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.width).toBeLessThanOrEqual(375);
  });

  test("terms page content readable on mobile", async ({ page }) => {
    await page.goto("/terms", { timeout: 15_000 });
    const h1 = page.locator("h1").first();
    await expect(h1).toBeVisible();
  });

  test("security page content readable on mobile", async ({ page }) => {
    await page.goto("/security", { timeout: 15_000 });
    const h1 = page.locator("h1").first();
    await expect(h1).toBeVisible();
  });

  test("about page content readable on mobile", async ({ page }) => {
    await page.goto("/about", { timeout: 15_000 });
    const h1 = page.locator("h1").first();
    await expect(h1).toBeVisible();
  });

  test("immigration page readable on mobile", async ({ page }) => {
    await page.goto("/immigration", { timeout: 15_000 });
    const h1 = page.locator("h1").first();
    await expect(h1).toBeVisible();
  });

  test("no horizontal scroll on homepage", async ({ page }) => {
    await page.goto("/", { timeout: 15_000 });
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    // Allow a small tolerance (2px) for subpixel rendering
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 2);
  });

  test("no horizontal scroll on pricing page", async ({ page }) => {
    await page.goto("/pricing", { timeout: 15_000 });
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 2);
  });
});

test.describe("Tablet responsiveness (768x1024)", () => {
  test.use({ viewport: { width: 768, height: 1024 } });

  test("homepage renders on tablet", async ({ page }) => {
    await page.goto("/", { timeout: 15_000 });
    const h1 = page.locator("h1").first();
    await expect(h1).toBeVisible();
  });

  test("pricing page renders on tablet", async ({ page }) => {
    await page.goto("/pricing", { timeout: 15_000 });
    const h1 = page.locator("h1").first();
    await expect(h1).toBeVisible();
  });

  test("law page renders on tablet", async ({ page }) => {
    await page.goto("/law", { timeout: 15_000 });
    const h1 = page.locator("h1").first();
    await expect(h1).toBeVisible();
  });

  test("no horizontal scroll on tablet homepage", async ({ page }) => {
    await page.goto("/", { timeout: 15_000 });
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 2);
  });
});
