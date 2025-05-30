import type { MessageSchema } from '@/i18n/locales/en';
import type { ShapeOf } from '~/types/types/shape-of.type';
import type { RouteLocationNormalized } from 'vue-router';
import type { BreadcrumbItem } from '@nuxt/ui';

export interface IAppBreadcrumb extends BreadcrumbItem {
  label: ShapeOf<MessageSchema>;
  params?: Record<string, (route: RouteLocationNormalized) => string>;
}
