import { defineVitestConfig } from '@nuxt/test-utils/config';

export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    setupFiles: ['./tests/setup/i18n.setup.ts'],
    root: './',
    coverage: {
      provider: 'istanbul',
      include: ['app/**/*.{ts,vue}', 'modules/**/*.{ts,vue}', 'shared/**/*.ts'],
      exclude: ['shared/types/**'],
      thresholds: {
        statements: 80,
        branches: 80,
        functions: 80,
        lines: 80,
      },
    },
  },
});
