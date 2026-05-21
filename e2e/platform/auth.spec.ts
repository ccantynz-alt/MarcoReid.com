import { test, expect } from "@playwright/test";

test.describe("Login page (/login)", () => {
  test("renders with email and password fields", async ({ page }) => {
    const response = await page.goto("/login", { timeout: 15_000 });
    expect(response?.status()).toBe(200);

    await expect(page.getByLabel("Email address")).toBeVisible();
    await expect(page.getByLabel("Password")).toBeVisible();
  });

  test("has Marco Reid branding", async ({ page }) => {
    await page.goto("/login", { timeout: 15_000 });
    await expect(page.getByText("Marco Reid").first()).toBeVisible();
    await expect(page.getByText("Sign in to your account")).toBeVisible();
  });

  test("has Sign in button", async ({ page }) => {
    await page.goto("/login", { timeout: 15_000 });
    await expect(page.getByRole("button", { name: "Sign in" })).toBeVisible();
  });

  test("has link to register page", async ({ page }) => {
    await page.goto("/login", { timeout: 15_000 });
    const registerLink = page.getByRole("link", { name: /create|register|sign up/i });
    await expect(registerLink).toBeVisible();
  });

  test("has link to forgot password page", async ({ page }) => {
    await page.goto("/login", { timeout: 15_000 });
    const forgotLink = page.getByRole("link", { name: /forgot|reset/i });
    await expect(forgotLink).toBeVisible();
  });

  test("invalid credentials show error message", async ({ page }) => {
    await page.goto("/login", { timeout: 15_000 });

    await page.route("**/api/auth/callback/credentials", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          error: "CredentialsSignin",
          status: 401,
          ok: false,
          url: null,
        }),
      });
    });

    await page.getByLabel("Email address").fill("wrong@example.com");
    await page.getByLabel("Password").fill("WrongPassword123!");
    await page.getByRole("button", { name: "Sign in" }).click();

    await expect(page.getByText(/Invalid email or password/i)).toBeVisible({ timeout: 10_000 });
  });
});

test.describe("Register page (/register)", () => {
  test("renders with all required fields", async ({ page }) => {
    const response = await page.goto("/register", { timeout: 15_000 });
    expect(response?.status()).toBe(200);

    await expect(page.getByLabel("Name", { exact: true }).or(page.getByLabel("Full name"))).toBeVisible();
    await expect(page.getByLabel("Email", { exact: true }).or(page.getByLabel("Email address"))).toBeVisible();
    await expect(page.getByLabel("Password", { exact: true })).toBeVisible();
  });

  test("has Marco Reid branding", async ({ page }) => {
    await page.goto("/register", { timeout: 15_000 });
    await expect(page.getByText("Marco Reid").first()).toBeVisible();
  });

  test("has firm name field", async ({ page }) => {
    await page.goto("/register", { timeout: 15_000 });
    await expect(page.getByLabel(/Firm/i)).toBeVisible();
  });

  test("has password confirmation field", async ({ page }) => {
    await page.goto("/register", { timeout: 15_000 });
    await expect(page.getByLabel(/Confirm/i)).toBeVisible();
  });

  test("has terms checkbox", async ({ page }) => {
    await page.goto("/register", { timeout: 15_000 });
    const checkbox = page.locator('input[type="checkbox"]').first();
    await expect(checkbox).toBeVisible();
  });

  test("has create account button", async ({ page }) => {
    await page.goto("/register", { timeout: 15_000 });
    const btn = page.getByRole("button", { name: /create|register|sign up/i });
    await expect(btn).toBeVisible();
  });

  test("has link to login page", async ({ page }) => {
    await page.goto("/register", { timeout: 15_000 });
    const loginLink = page.getByRole("link", { name: /sign in|log in/i });
    await expect(loginLink).toBeVisible();
  });
});

test.describe("Forgot password page (/forgot-password)", () => {
  test("renders with email field", async ({ page }) => {
    const response = await page.goto("/forgot-password", { timeout: 15_000 });
    expect(response?.status()).toBe(200);

    await expect(page.getByLabel(/email/i)).toBeVisible();
  });

  test("has Marco Reid branding", async ({ page }) => {
    await page.goto("/forgot-password", { timeout: 15_000 });
    await expect(page.getByText("Marco Reid").first()).toBeVisible();
    await expect(page.getByText("Reset your password")).toBeVisible();
  });

  test("has reset/submit button", async ({ page }) => {
    await page.goto("/forgot-password", { timeout: 15_000 });
    const btn = page.getByRole("button", { name: /reset|send|submit/i });
    await expect(btn).toBeVisible();
  });

  test("has link back to login", async ({ page }) => {
    await page.goto("/forgot-password", { timeout: 15_000 });
    const backLink = page.getByRole("link", { name: /sign in|log in|back/i });
    await expect(backLink).toBeVisible();
  });
});

test.describe("Auth protection — unauthenticated redirects", () => {
  test("unauthenticated /dashboard redirects to /login", async ({ page }) => {
    await page.goto("/dashboard", { timeout: 15_000 });
    await expect(page).toHaveURL(/login/);
  });

  test("unauthenticated /matters redirects to /login", async ({ page }) => {
    await page.goto("/matters", { timeout: 15_000 });
    await expect(page).toHaveURL(/login/);
  });

  test("unauthenticated /clients redirects to /login", async ({ page }) => {
    await page.goto("/clients", { timeout: 15_000 });
    await expect(page).toHaveURL(/login/);
  });

  test("unauthenticated /documents redirects to /login", async ({ page }) => {
    await page.goto("/documents", { timeout: 15_000 });
    await expect(page).toHaveURL(/login/);
  });

  test("unauthenticated /billing redirects to /login", async ({ page }) => {
    await page.goto("/billing", { timeout: 15_000 });
    await expect(page).toHaveURL(/login/);
  });

  test("unauthenticated /settings redirects to /login", async ({ page }) => {
    await page.goto("/settings", { timeout: 15_000 });
    await expect(page).toHaveURL(/login/);
  });

  test("unauthenticated /time redirects to /login", async ({ page }) => {
    await page.goto("/time", { timeout: 15_000 });
    await expect(page).toHaveURL(/login/);
  });

  test("unauthenticated /admin redirects to /login", async ({ page }) => {
    await page.goto("/admin", { timeout: 15_000 });
    await expect(page).toHaveURL(/login/);
  });
});
