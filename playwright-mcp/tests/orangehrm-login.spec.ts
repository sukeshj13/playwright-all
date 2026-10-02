import { test, expect } from '@playwright/test';
import { DashboardPage } from '../pages/DashboardPage';
import { LoginPage } from '../pages/LoginPage';

test('Admin can log in and view the dashboard', async ({ page }) => {
  test.setTimeout(60_000);

  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);

  await loginPage.navigate();
  await loginPage.login('Admin', 'admin123');

  await expect(page).toHaveURL(/\/web\/index\.php\/dashboard\/index$/, { timeout: 30_000 });
  await expect(dashboardPage.heading).toBeVisible();
});