import tailwindcss from '@tailwindcss/vite';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  ssr: false,
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/test-utils',
    'nuxt-auth-utils',
    '@vueuse/nuxt',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
  ],
  css: [
    '~/node_modules/@sky-uk/adtech-ui-components/dist/tailwind.css',
    '~/node_modules/@sky-uk/adtech-ui-components/dist/adtech-ui-components.css',
    '~/assets/css/index.css',
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
