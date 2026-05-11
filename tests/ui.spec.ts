import { test, expect } from '@playwright/test';

test('homepage visual check', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveScreenshot('homepage.png');
});