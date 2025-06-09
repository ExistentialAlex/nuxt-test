import type { ShapeOf } from '../../types/shape-of.type';
import type { RouteLocationNormalized } from 'vue-router';
import type { BreadcrumbItem } from '@nuxt/ui';
import type { MessageSchema } from '~~/i18n/message-schema';

export interface IAppBreadcrumb extends BreadcrumbItem {
  label: ShapeOf<MessageSchema>;
  params?: Record<string, (route: RouteLocationNormalized) => string>;
}
