import { en } from './locales/en';

export default defineI18nConfig(() => {
  return {
    locale: 'en',
    legacy: false,
    messages: {
      en,
    },
  };
});
