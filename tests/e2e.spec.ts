import { test, expect } from "@playwright/test";

test("homepage shows greeting and API responds", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Hello, .* World/ })).toBeVisible();

  const res = await page.request.get("/api/hello");
  expect(res.ok()).toBeTruthy();
  const json = await res.json();
  expect(json.message).toContain("Hello");
});