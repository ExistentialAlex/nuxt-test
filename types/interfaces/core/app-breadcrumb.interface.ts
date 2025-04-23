import type { MessageSchema } from '@/i18n/locales/en';
import type { ShapeOf } from '@/types/types/shape-of.type';
import type { IAdtRoute } from '@sky-uk/adtech-ui-components';
import type { RouteLocationNormalized } from 'vue-router';

export interface IAppBreadcrumb extends IAdtRoute {
  title: ShapeOf<MessageSchema>;
  params?: Record<string, (route: RouteLocationNormalized) => string>;
}
