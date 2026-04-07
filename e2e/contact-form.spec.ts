import { test, expect } from "@playwright/test";

test.describe("Contact form", () => {
  test("renders all form fields", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.getByLabel("Name")).toBeVisible();
    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByLabel("Firm name")).toBeVisible();
    await expect(page.getByLabel("Subject")).toBeVisible();
    await expect(page.getByLabel("Message")).toBeVisible();
    await expect(page.getByRole("button", { name: "Send message" })).toBeVisible();
  });

  test("requires name, email, and message", async ({ page }) => {
    await page.goto("/contact");
    const nameInput = page.getByLabel("Name");
    const emailInput = page.getByLabel("Email");
    const messageInput = page.getByLabel("Message");

    await expect(nameInput).toHaveAttribute("required", "");
    await expect(emailInput).toHaveAttribute("required", "");
    await expect(messageInput).toHaveAttribute("required", "");
  });

  test("submit button shows loading state", async ({ page }) => {
    await page.goto("/contact");
    await page.getByLabel("Name").fill("Test User");
    await page.getByLabel("Email").fill("test@example.com");
    await page.getByLabel("Message").fill("Test message");

    await page.route("/api/contact", async (route) => {
      await new Promise((r) => setTimeout(r, 500));
      await route.fulfill({ status: 200, body: JSON.stringify({ success: true }) });
    });

    await page.getByRole("button", { name: "Send message" }).click();
    await expect(page.getByText("Sending")).toBeVisible();
  });

  test("shows success state after submission", async ({ page }) => {
    await page.goto("/contact");
    await page.getByLabel("Name").fill("Test User");
    await page.getByLabel("Email").fill("test@example.com");
    await page.getByLabel("Message").fill("Test message");

    await page.route("/api/contact", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true, message: "Received" }),
      });
    });

    await page.getByRole("button", { name: "Send message" }).click();
    await expect(page.getByText("Message sent.")).toBeVisible();
  });
});
