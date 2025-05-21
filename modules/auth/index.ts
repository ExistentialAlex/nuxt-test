import {
  addServerHandler,
  createResolver,
  defineNuxtModule,
  extendPages,
} from 'nuxt/kit';

export default defineNuxtModule({
  meta: {
    name: 'auth',
    configKey: 'adt-auth',
  },
  defaults: {
    redirectPath: '/',
  },
  setup(options) {
    const { resolve } = createResolver(import.meta.url);

    addServerHandler({
      route: '/auth/github',
      method: 'get',
      handler: resolve('./runtime/server/auth/github.get'),
    });

    addServerHandler({
      route: '/api/login',
      method: 'post',
      handler: resolve('./runtime/server/api/login.post'),
    });

    extendPages((pages) => {
      pages.unshift({
        name: 'login',
        path: '/login',
        file: resolve('./runtime/pages/login-page.vue'),
        meta: {
          redirectPath: options.redirectPath,
        },
      });
    });
  },
});
