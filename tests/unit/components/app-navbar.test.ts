import { VueWrapper } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import AppNavbar from '~/components/app-navbar.vue';

describe('App Navbar', () => {
  let component: VueWrapper<InstanceType<typeof AppNavbar>>;

  beforeEach(async () => {
    component = await mountSuspended(AppNavbar, {
      props: {
        sidebar: false,
      },
      global: {
        stubs: {
          UTooltip: true,
        },
      },
    });
  });

  it('Should render the navbar', () => {
    // Assert
    expect(component).toBeDefined();
  });
});
