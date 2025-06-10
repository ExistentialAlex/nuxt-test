import { createPage, setup, url, type NuxtPage } from '@nuxt/test-utils/e2e';
import { beforeEach, describe, expect, it } from 'vitest';

describe('Login E2E Tests', async () => {
  await setup({ browser: true, server: true });

  let page: NuxtPage;

  beforeEach(async () => {
    page = await createPage();
    await page.goto(url('/'), { waitUntil: 'hydration' });
  });

  it('Should launch the application on the login page', async () => {
    // Assert
    expect(new URL(page.url()).pathname).toBe('/login');
    expect(page.getByTestId('login-form')).toBeDefined();
  });

  it('Should be possible to login with valid credentials', async () => {
    // Arrange
    const emailInput = page.getByTestId('login-form:email');
    const passwordInput = page.getByTestId('login-form:password');
    const submitButton = page.getByTestId('login-form:submit');

    // Act
    await emailInput.fill('admin@admin.com');
    await passwordInput.fill('iamtheadmin');
    await submitButton.click();
    await page.waitForURL('**/dashboard');
    await page.waitForSelector('[data-testid="dashboard"]');

    // Assert
    expect(new URL(page.url()).pathname).toBe('/dashboard');
    expect(page.getByTestId('dashboard')).toBeDefined();
  });
});
