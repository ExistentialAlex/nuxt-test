import { expect, test } from '@nuxt/test-utils/playwright';

test.describe('Login E2E Tests', () => {
  test('Should launch the application on the login page', async ({ page, goto }) => {
    // Arrange
    await goto('/', { waitUntil: 'hydration' });
    await page.waitForURL('**/login');
    await page.waitForSelector('[data-testid="login-form"]');

    // Assert
    expect(new URL(page.url()).pathname).toBe('/login');
    expect(page.getByTestId('login-form')).toBeVisible();
  });

  test('Should be possible to login with valid credentials', async ({ page, goto }) => {
    // Arrange
    await goto('/', { waitUntil: 'hydration' });
    await page.waitForURL('**/login');

    // Act
    await page.fill('[data-testid="login-form:email"]', 'admin@admin.com');
    await page.fill('[data-testid="login-form:password"]', 'iamtheadmin');
    await page.click('[data-testid="login-form:submit"]');
    await page.waitForURL('**/dashboard');
    await page.waitForSelector('[data-testid="dashboard"]');

    // Assert
    expect(new URL(page.url()).pathname).toBe('/dashboard');
    expect(page.getByTestId('dashboard')).toBeVisible();
  });
});
