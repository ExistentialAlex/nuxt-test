import tailwindcss from '@tailwindcss/vite';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/test-utils',
    'nuxt-auth-utils',
    '@vueuse/nuxt',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    '@nuxt/ui',
  ],
  css: ['~/assets/css/index.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  'adt-auth': {
    redirectPath: '/dashboard',
  },
  i18n: {
    bundle: {
      optimizeTranslationDirective: false,
    },
  },
});
