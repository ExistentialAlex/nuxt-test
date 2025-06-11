import { mockNuxtImport, mountSuspended, registerEndpoint } from '@nuxt/test-utils/runtime';
import { flushPromises, type VueWrapper } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi, type Mock } from 'vitest';
import LoginPage from '~~/modules/auth/runtime/pages/login-page.vue';
import { navigateTo } from '#imports';

registerEndpoint('/api/login', () => ({
  method: 'post',
  handler: async () => ({}),
}));

mockNuxtImport('useUserSession', () => {
  return () => ({
    fetch: vi.fn(),
    loggedIn: vi.fn(() => false), // Simulate not logged in
  });
});

mockNuxtImport('navigateTo', () => vi.fn());

mockNuxtImport('useRoute', () =>
  vi.fn(() => ({
    name: RouteNames.home,
    params: {},
    query: {},
    meta: { redirectPath: '/dashboard' },
  }))
);

describe('Login Page', () => {
  let wrapper: VueWrapper<InstanceType<typeof LoginPage>>;

  beforeEach(async () => {
    wrapper = await mountSuspended(LoginPage, {});
  });

  it('should render the login form', () => {
    // Assert
    expect(wrapper).toBeDefined();
    expect(wrapper.exists()).toBe(true);
  });

  it('Should be possible to login using basic credentials', async () => {
    // Arrange
    const emailInput = wrapper.find('[data-testid="login-form:email"]');
    const passwordInput = wrapper.find('[data-testid="login-form:password"]');
    const form = wrapper.find('[data-testid="login-form"] form');

    // Act
    await emailInput.setValue('admin@admin.com');
    await passwordInput.setValue('iamtheadmin');
    await form.trigger('submit');

    // Have to wait for promises to flush twice
    await flushPromises();
    await flushPromises();

    // Assert
    expect(navigateTo).toBeCalledWith('/dashboard');
  });
});
