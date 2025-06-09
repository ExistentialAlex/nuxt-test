import { mockNuxtImport } from '@nuxt/test-utils/runtime';
import { vi } from 'vitest';

/**
 * Mock the `useI18n` composable to return the i18n instance from the Nuxt app.
 * This is necessary because the i18n module is not available in the test environment via useI18n.
 * Instead, we use the Nuxt app's `$i18n` property to access the i18n instance.
 */
mockNuxtImport('useI18n', async () => {
  const actualNuxtAppImports = await vi.importActual<typeof import('#app')>('#app');

  return () => {
    return actualNuxtAppImports.useNuxtApp().$i18n;
  };
});
