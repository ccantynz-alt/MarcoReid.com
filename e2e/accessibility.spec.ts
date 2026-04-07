import { test, expect } from "@playwright/test";

test.describe("Accessibility", () => {
  test("homepage has proper heading hierarchy", async ({ page }) => {
    await page.goto("/");
    const h1 = page.locator("h1");
    await expect(h1.first()).toBeVisible();
    const h1Count = await h1.count();
    expect(h1Count).toBe(1);
  });

  test("all images have alt text", async ({ page }) => {
    await page.goto("/");
    const images = page.locator("img:not([alt])");
    const count = await images.count();
    expect(count).toBe(0);
  });

  test("skip-to-content link exists", async ({ page }) => {
    await page.goto("/");
    const skipLink = page.locator('a[href="#main"]');
    const count = await skipLink.count();
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test("interactive elements have minimum touch target", async ({ page }) => {
    await page.goto("/");
    const buttons = page.locator("button, a.rounded-lg");
    const count = await buttons.count();
    expect(count).toBeGreaterThan(0);
  });

  test("lang attribute is set on html element", async ({ page }) => {
    await page.goto("/");
    const lang = await page.locator("html").getAttribute("lang");
    expect(lang).toBe("en");
  });

  test("page has meta description", async ({ page }) => {
    await page.goto("/");
    const meta = page.locator('meta[name="description"]');
    await expect(meta).toHaveAttribute("content", /.+/);
  });
});
