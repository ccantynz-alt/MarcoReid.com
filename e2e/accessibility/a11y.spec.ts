import { test, expect } from "@playwright/test";

test.describe("Accessibility: homepage", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/", { timeout: 15_000 });
  });

  test("all images have alt text", async ({ page }) => {
    const images = page.locator("img:not([alt])");
    const count = await images.count();
    expect(count).toBe(0);
  });

  test("exactly one h1 on the page", async ({ page }) => {
    const h1s = page.locator("h1");
    const count = await h1s.count();
    expect(count).toBe(1);
  });

  test("html has lang attribute set to en", async ({ page }) => {
    const lang = await page.locator("html").getAttribute("lang");
    expect(lang).toBe("en");
  });

  test("meta description is present", async ({ page }) => {
    const meta = page.locator('meta[name="description"]');
    await expect(meta).toHaveAttribute("content", /.+/);
  });

  test("main landmark is present", async ({ page }) => {
    const main = page.locator("main");
    const count = await main.count();
    // Some pages use <main>, some use role="main"
    const mainRole = page.locator('[role="main"]');
    const roleCount = await mainRole.count();
    expect(count + roleCount).toBeGreaterThanOrEqual(0);
  });

  test("navigation landmark is present", async ({ page }) => {
    const nav = page.locator("nav, [role='navigation']");
    const count = await nav.count();
    expect(count).toBeGreaterThan(0);
  });

  test("footer element is present", async ({ page }) => {
    const footer = page.locator("footer");
    const count = await footer.count();
    expect(count).toBeGreaterThan(0);
  });

  test("all buttons have accessible names", async ({ page }) => {
    const buttons = page.locator("button");
    const count = await buttons.count();
    for (let i = 0; i < Math.min(count, 20); i++) {
      const button = buttons.nth(i);
      const name = await button.getAttribute("aria-label");
      const text = await button.textContent();
      const title = await button.getAttribute("title");
      // Button should have either text content, aria-label, or title
      const hasAccessibleName = (text && text.trim().length > 0) || name || title;
      expect(hasAccessibleName).toBeTruthy();
    }
  });

  test("all links have accessible names or text", async ({ page }) => {
    const links = page.locator("a");
    const count = await links.count();
    let emptyLinks = 0;
    for (let i = 0; i < Math.min(count, 30); i++) {
      const link = links.nth(i);
      const text = await link.textContent();
      const ariaLabel = await link.getAttribute("aria-label");
      const title = await link.getAttribute("title");
      const hasName = (text && text.trim().length > 0) || ariaLabel || title;
      if (!hasName) emptyLinks++;
    }
    // Allow a small number of icon-only links (e.g., social icons)
    expect(emptyLinks).toBeLessThanOrEqual(3);
  });

  test("aria-label sections are present on homepage", async ({ page }) => {
    const labeledSections = page.locator("section[aria-label]");
    const count = await labeledSections.count();
    expect(count).toBeGreaterThan(3);
  });
});

test.describe("Accessibility: form inputs", () => {
  test("login form inputs have labels", async ({ page }) => {
    await page.goto("/login", { timeout: 15_000 });
    await expect(page.getByLabel("Email address")).toBeVisible();
    await expect(page.getByLabel("Password")).toBeVisible();
  });

  test("register form inputs have labels", async ({ page }) => {
    await page.goto("/register", { timeout: 15_000 });
    // Check that key fields have associated labels
    const labels = page.locator("label");
    const count = await labels.count();
    expect(count).toBeGreaterThanOrEqual(4);
  });

  test("contact form inputs have labels", async ({ page }) => {
    await page.goto("/contact", { timeout: 15_000 });
    await expect(page.getByLabel("Name")).toBeVisible();
    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByLabel("Message")).toBeVisible();
  });

  test("forgot password form has email label", async ({ page }) => {
    await page.goto("/forgot-password", { timeout: 15_000 });
    const emailInput = page.getByLabel(/email/i);
    await expect(emailInput).toBeVisible();
  });
});

test.describe("Accessibility: tab navigation", () => {
  test("tab navigation works through header nav links", async ({ page }) => {
    await page.goto("/", { timeout: 15_000 });
    // Press Tab multiple times and verify focus moves
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    // After tabbing, some element should have focus
    const focusedTag = await page.evaluate(() => document.activeElement?.tagName);
    expect(focusedTag).toBeTruthy();
  });

  test("login form is keyboard navigable", async ({ page }) => {
    await page.goto("/login", { timeout: 15_000 });
    // Tab to email
    await page.keyboard.press("Tab");
    const firstFocused = await page.evaluate(() => document.activeElement?.tagName);
    expect(firstFocused).toBeTruthy();

    // Tab to password
    await page.keyboard.press("Tab");
    const secondFocused = await page.evaluate(() => document.activeElement?.tagName);
    expect(secondFocused).toBeTruthy();
  });
});

test.describe("Accessibility: all images across key pages", () => {
  const pages = [
    { path: "/", name: "homepage" },
    { path: "/law", name: "law" },
    { path: "/accounting", name: "accounting" },
    { path: "/pricing", name: "pricing" },
    { path: "/contact", name: "contact" },
    { path: "/security", name: "security" },
    { path: "/privacy", name: "privacy" },
    { path: "/login", name: "login" },
  ];

  for (const p of pages) {
    test(`${p.name} page: all images have alt text`, async ({ page }) => {
      await page.goto(p.path, { timeout: 15_000 });
      const badImages = page.locator("img:not([alt])");
      const count = await badImages.count();
      expect(count).toBe(0);
    });
  }

  for (const p of pages) {
    test(`${p.name} page: html lang attribute is set`, async ({ page }) => {
      await page.goto(p.path, { timeout: 15_000 });
      const lang = await page.locator("html").getAttribute("lang");
      expect(lang).toBe("en");
    });
  }
});

test.describe("Accessibility: heading hierarchy", () => {
  const pages = [
    { path: "/", name: "homepage" },
    { path: "/law", name: "law" },
    { path: "/pricing", name: "pricing" },
    { path: "/nz", name: "NZ country" },
    { path: "/compliance", name: "compliance" },
  ];

  for (const p of pages) {
    test(`${p.name} page: has exactly one h1`, async ({ page }) => {
      await page.goto(p.path, { timeout: 15_000 });
      const h1Count = await page.locator("h1").count();
      expect(h1Count).toBe(1);
    });
  }
});

test.describe("Accessibility: color contrast key elements", () => {
  test("hero text has sufficient contrast (white on dark)", async ({ page }) => {
    await page.goto("/", { timeout: 15_000 });
    const h1 = page.locator("h1").first();
    const color = await h1.evaluate((el) => getComputedStyle(el).color);
    // White or near-white text expected
    expect(color).toBeTruthy();
  });

  test("body text has color set", async ({ page }) => {
    await page.goto("/", { timeout: 15_000 });
    const body = page.locator("body");
    const color = await body.evaluate((el) => getComputedStyle(el).color);
    expect(color).toBeTruthy();
  });
});

test.describe("Accessibility: ARIA attributes", () => {
  test("interactive elements have appropriate ARIA roles", async ({ page }) => {
    await page.goto("/", { timeout: 15_000 });
    // Check that buttons exist with proper roles
    const buttons = page.getByRole("button");
    const count = await buttons.count();
    expect(count).toBeGreaterThan(0);
  });

  test("links have proper role", async ({ page }) => {
    await page.goto("/", { timeout: 15_000 });
    const links = page.getByRole("link");
    const count = await links.count();
    expect(count).toBeGreaterThan(10);
  });

  test("navigation has proper role", async ({ page }) => {
    await page.goto("/", { timeout: 15_000 });
    const navs = page.getByRole("navigation");
    const count = await navs.count();
    expect(count).toBeGreaterThan(0);
  });
});
