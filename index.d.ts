import { DefineLocaleMessage } from 'vue-i18n';
import { MessageSchema } from './i18n/message-schema';

interface RouteRolePermission {
  has?: string;
  hasAll?: string[];
  hasAny?: string[];
}

declare module '#app' {
  interface PageMeta {
    roles?: RouteRolePermission;
    permissions?: RouteRolePermission;
    requiresAuth?: boolean;
    breadcrumbs?: IAppBreadcrumb[];
  }
}

declare module 'vue-i18n' {
  export interface DefineLocaleMessage extends MessageSchema {}
}

// It is always important to ensure you import/export something when augmenting a type
export {};
