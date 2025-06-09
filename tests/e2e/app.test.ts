import { expect, test } from '@nuxt/test-utils/playwright';

test.describe('App E2E Tests', () => {
  test('Should launch the application on the login page', async ({ page, goto }) => {
    // Arrange
    await goto('/', { waitUntil: 'hydration' });
    await page.waitForURL('**/login');
    await page.waitForSelector('[data-testid="login-form"]');

    // Assert
    expect(new URL(page.url()).pathname).toBe('/login');
    expect(page.getByTestId('login-form')).toBeVisible();
  });
});
