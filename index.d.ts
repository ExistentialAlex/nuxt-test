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

// It is always important to ensure you import/export something when augmenting a type
export {};
