import tailwindcss from '@tailwindcss/vite';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  telemetry: false,
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    'nuxt-auth-utils',
    '@vueuse/nuxt',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    '@nuxt/ui',
    '@nuxt/icon',
    '@nuxt/fonts',
    '@nuxtjs/color-mode',
    '@nuxt/devtools',
    '@nuxt/test-utils/module',
  ],
  pages: {
    pattern: ['**/*.vue', '!**/components/**'],
  },
  components: [
    '~/components',
    {
      path: '~/pages',
      pattern: '**/components/**',
      pathPrefix: false,
    },
  ],
  css: ['~/assets/css/index.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  'adt-auth': {
    redirectPath: '/dashboard',
  },
  i18n: {
    defaultLocale: 'en',
    locales: [{ code: 'en', name: 'English', file: 'en.ts' }],
    strategy: 'no_prefix',
    bundle: {
      optimizeTranslationDirective: false,
    },
  },
});
