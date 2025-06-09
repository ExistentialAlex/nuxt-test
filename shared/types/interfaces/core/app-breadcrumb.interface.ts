import type { ShapeOf } from '../../types/shape-of.type';
import type { RouteLocationNormalized } from 'vue-router';
import type { BreadcrumbItem } from '@nuxt/ui';
import En from '~~/i18n/locales/en';

export interface IAppBreadcrumb extends BreadcrumbItem {
  label: ShapeOf<typeof En>;
  params?: Record<string, (route: RouteLocationNormalized) => string>;
}
