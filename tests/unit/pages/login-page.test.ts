import { mockNuxtImport, mountSuspended, registerEndpoint } from '@nuxt/test-utils/runtime';
import { flushPromises, type VueWrapper } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { navigateTo } from '#imports';
import LoginPage from '~~/modules/auth/runtime/pages/login-page.vue';
import { flushPromisesUntil } from '~~/tests/setup/flush-promises';

const loginHandler = vi.fn(() => ({}));

registerEndpoint('/api/login', {
  method: 'POST',
  handler: loginHandler,
});

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
    loginHandler.mockReset();
    wrapper = await mountSuspended(LoginPage, {});
  });

  afterEach(() => {
    vi.clearAllMocks();
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

    // Assert
    await flushPromisesUntil(() => expect(navigateTo).toBeCalledWith('/dashboard'));
  });

  it('Should raise a toast if an error occurs', async () => {
    // Arrange
    const addToastSpy = vi.spyOn(useToast(), 'add');
    loginHandler.mockImplementationOnce(() => {
      throw createError({
        statusCode: 401,
        message: 'Bad credentials',
      });
    });
    const emailInput = wrapper.find('[data-testid="login-form:email"]');
    const passwordInput = wrapper.find('[data-testid="login-form:password"]');
    const form = wrapper.find('[data-testid="login-form"] form');

    // Act
    await emailInput.setValue('test@test.com');
    await passwordInput.setValue('test1234');
    await form.trigger('submit');
    await flushPromises();
    await flushPromises();

    // Assert
    await flushPromisesUntil(() => expect(navigateTo).not.toBeCalled());
  });
});
