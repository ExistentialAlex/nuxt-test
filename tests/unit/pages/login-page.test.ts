import { VueWrapper } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import LoginPage from '../../../modules/auth/runtime/pages/login-page.vue';

describe('Login Page', () => {
  let component: VueWrapper<InstanceType<typeof LoginPage>>;

  beforeEach(async () => {
    component = await mountSuspended(LoginPage, {});
  });

  it('Should render the page', () => {
    // Assert
    expect(component).toBeDefined();
  });
});
